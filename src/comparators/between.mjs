import debug from 'debug'

import { toNumber } from '#rules-runner/common'

const log = debug('@modernpoacher/rules-runner/comparators/between')

log('`between` is awake')

export default function between ({ between: { lowerBound, upperBound } = {} }, actual) {
  log('between')

  let l
  try {
    l = toNumber(lowerBound)
  } catch (e) {
    throw new Error(`Lower bound "${lowerBound}" is not a number or does not transform to a number`)
  }

  let b
  try {
    b = toNumber(upperBound)
  } catch (e) {
    throw new Error(`Upper bound "${upperBound}" is not a number or does not transform to a number`)
  }

  try {
    const value = toNumber(actual)

    return (
      value >= l &&
      value <= b
    )
  } catch (e) {
    throw new Error(`Unexpected value for "between": "${actual}" must be a number or transform to a number`)
  }
}
