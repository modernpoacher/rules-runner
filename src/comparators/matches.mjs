import debug from 'debug'

import { toRegExp, toString } from '#rules-runner/common'

const log = debug('@modernpoacher/rules-runner/comparators/matches')

log('`matches` is awake')

export default function matches ({ matches }, actual) {
  log('matches')

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
