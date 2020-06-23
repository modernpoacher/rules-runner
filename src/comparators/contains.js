import debug from '@modernpoacher/rules-runner/common/debug'

import { toString } from '@modernpoacher/rules-runner/common'

const log = debug('@modernpoacher/rules-runner:comparators:contains')

log('`contains` is awake')

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
