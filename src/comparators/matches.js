import { toRegExp, toString } from '@modernpoacher/rules-runner/common'

export default function ({ matches } = {}, actual) {
  let p
  try {
    p = toRegExp(matches)
  } catch (e) {
    throw new Error(`"${matches}" is not a regular expression or does not transform to a regular expression`)
  }

  try {
    const value = toString(actual)

    return p.test(value)
  } catch (e) {
    throw new Error(`Unexpected value for "matches": "${actual}" must be a string or transform to a string`)
  }
}
