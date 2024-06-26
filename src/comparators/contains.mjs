import debug from 'debug'

import { toString } from '#rules-runner/common'

const log = debug('@modernpoacher/rules-runner/comparators/contains')

log('`@modernpoacher/rules-runner` is awake')

export default function contains ({ contains }, actual) {
  log('contains')

  let c
  try {
    c = toString(contains)
  } catch (e) {
    throw new Error(`"${contains}" is not a string or does not transform to a string`)
  }

  try {
    const value = toString(actual)

    return value.includes(c)
  } catch (e) {
    throw new Error(`Unexpected value for "contains": "${actual}" must be a string or transform to a string`)
  }
}
