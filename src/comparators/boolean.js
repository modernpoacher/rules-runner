import { toBoolean } from '@modernpoacher/rules-runner/common'

export default function (expected, actual) {
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
