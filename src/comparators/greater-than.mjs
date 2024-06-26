import debug from 'debug'

import { toNumber } from '#rules-runner/common'

const log = debug('@modernpoacher/rules-runner/comparators/greater-than')

log('`@modernpoacher/rules-runner` is awake')

export default function greaterThan ({ greaterThan }, actual) {
  log('greaterThan')

  let g
  try {
    g = toNumber(greaterThan)
  } catch (e) {
    throw new Error(`"${greaterThan}" is not a number or does not transform to a number`)
  }

  const value = toNumber(actual)
  if (!isNaN(value)) return value > g

  throw new Error(`Unexpected value for "greaterThan": "${actual}" must be a number or transform to a number`)
}
