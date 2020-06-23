import debug from '@modernpoacher/rules-runner/common/debug'

import { toBoolean } from '@modernpoacher/rules-runner/common'

const log = debug('@modernpoacher/rules-runner:boolean')

log('`boolean` is awake')

export default function boolean (expected, actual) {
  log('boolean')

  let b
  try {
    b = toBoolean(expected)
  } catch (e) {
    throw new Error(`"${expected}" is not a boolean or does not transform to a boolean`)
  }

  try {
    const value = toBoolean(actual)

    return b === value
  } catch (e) {
    throw new Error(`Unexpected value for "boolean": "${actual}" must be a boolean or transform to a boolean`)
  }
}
