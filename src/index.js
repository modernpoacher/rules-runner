import cloneDeep from 'clone-deep'
import objectPath from 'object-path'
import {
  isBoolean,
  isObject
} from './common'
import * as comparators from './comparators'

const hasArrayKey = (key) => /^(.*)\[\]$/.test(key)

function getArrayKey (key) {
  const [,
    arrayKey
  ] = key.match(/^(.*)\[\]$/)

  return arrayKey
}

export default class RulesRunner {
  constructor (config, options = {}) {
    this.config = config
    this.options = options
  }

  run (values = {}) {
    return (
      Object
        .values(this.config)
        .reduce((accumulator, rule) => {
          if (Reflect.has(rule, 'if')) {
            const IF = Reflect.get(rule, 'if')

            if (this.runTests(IF, accumulator)) {
              if (Reflect.has(rule, 'then')) {
                const THEN = Reflect.get(rule, 'then')

                return this.runOutcomes(THEN, accumulator)
              }
            } else {
              if (Reflect.has(rule, 'otherwise')) {
                const OTHERWISE = Reflect.get(rule, 'otherwise')

                return this.runOutcomes(OTHERWISE, accumulator)
              }
            }

            return accumulator
          }

          throw new Error('A rule must have an `if` and a `then`')
        }, cloneDeep(values))
    )
  }

  runTests (expectations = {}, accumulator = {}) {
    return (
      Object
        .entries(expectations)
        .every(([key, expected]) => {
          if (objectPath.has(accumulator, key)) {
            const actual = objectPath.get(accumulator, key)

            return this.runTest(expected, actual)
          }
        })
    )
  }

  runTest (expected = {}, ...args) {
    if (expected === null) throw new Error('Expectation is `null`')

    if (isObject(expected)) {
      const [
        comparator
      ] = Object.keys(expected)

      if (Reflect.has(comparators, comparator)) {
        return Reflect.get(comparators, comparator).call(this, expected, ...args)
      }

      throw new Error(`Unknown comparator "${comparator}"`)
    }

    if (isBoolean(expected)) {
      const {
        boolean
      } = comparators

      return boolean.call(this, expected, ...args)
    }

    const {
      equals
    } = comparators

    return equals.call(this, expected, ...args)
  }

  runOutcomes (outcomes = {}, accumulator = {}) {
    return (
      Object
        .entries(outcomes)
        .reduce((accumulator, [key, outcome]) => {
          if (hasArrayKey(key)) {
            objectPath.push(accumulator, getArrayKey(key), outcome)
          } else {
            objectPath.set(accumulator, key, outcome)
          }

          return accumulator
        }, accumulator)
    )
  }
}
