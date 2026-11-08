import debug from 'debug'

import objectPath from 'object-path'

import {
  isBoolean,
  isObject
} from './common/index.mjs'

import * as comparators from './comparators/index.mjs'

const log = debug('@modernpoacher/rules-runner')

log('`@modernpoacher/rules-runner` is awake')

const hasArrayKey = (key) => /^(.*)\[\]$/.test(key)

function getArrayKey (key) {
  const [,
    arrayKey
  ] = key.match(/^(.*)\[\]$/)

  return arrayKey
}

export default class RulesRunner {
  constructor (config) {
    this.config = config
  }

  run (values = {}, decisions = {}) {
    return (
      Object
        .values(this.config)
        .reduce((accumulator, rule) => {
          if ('if' in rule) {
            const { if: IF } = rule

            if (this.runTests(IF, values)) {
              if ('then' in rule) {
                const { then: THEN } = rule

                return this.runOutcomes(THEN, accumulator)
              }
            } else {
              if ('otherwise' in rule) {
                const { otherwise: OTHERWISE } = rule

                return this.runOutcomes(OTHERWISE, accumulator)
              }
            }

            return accumulator
          }

          throw new Error('A rule must have an `if` and a `then`')
        }, decisions)
    )
  }

  runTests (expectations = {}, values = {}) {
    return (
      Object
        .entries(expectations)
        .every(([key, expectation]) => {
          if (objectPath.has(values, key)) {
            const actual = objectPath.get(values, key)

            return this.runTest(expectation, actual)
          }

          throw new Error(`Unknown path "${key}"`)
        })
    )
  }

  runTest (expectation, ...actual) {
    if (expectation === null) throw new Error('Expectation is `null`')
    if (expectation === undefined) throw new Error('Expectation is `undefined`')

    if (isObject(expectation)) {
      return (
        Object
          .entries(expectation)
          .some(([key, value]) => {
            if (key in comparators) {
              const comparator = comparators[key]

              return comparator.call(this, { [key]: value }, ...actual)
            }

            throw new Error(`Unknown comparator "${key}"`)
          })
      )
    }

    if (isBoolean(expectation)) {
      const {
        boolean
      } = comparators

      return boolean.call(this, expectation, ...actual)
    }

    const {
      equals
    } = comparators

    return equals.call(this, expectation, ...actual)
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
