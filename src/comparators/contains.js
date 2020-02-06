import { toString } from '@modernpoacher/rules-runner/common'

export default function ({ contains }, actual) {
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
