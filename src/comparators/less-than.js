import debug from 'debug'

import { toNumber } from '@modernpoacher/rules-runner/common'

const log = debug('@modernpoacher/rules-runner:comparators:less-than')

log('`lessThan` is awake')

export default function lessThan ({ lessThan }, actual) {
  log('lessThan')

  let l
  try {
    l = toNumber(lessThan)
  } catch (e) {
    throw new Error(`"${lessThan}" is not a number or does not transform to a number`)
  }

  const value = toNumber(actual)
  if (!isNaN(value)) return value < l

  throw new Error(`Unexpected value for "lessThan": "${actual}" must be a number or transform to a number`)
}
