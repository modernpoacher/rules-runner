import { toNumber } from '@modernpoacher/rules-runner/common'

export default function ({ between: { lowerBound, upperBound } = {} }, actual) {
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
