import debug from 'debug'

const log = debug('@modernpoacher/rules-runner/comparators/one-of')

log('`oneOf` is awake')

export default function oneOf ({ oneOf: values = null }, actual) {
  log('oneOf')

  if (!Array.isArray(values)) throw new Error(`"${values}" is not an array`)

  if (!Array.isArray(actual)) throw new Error(`"${actual}" is not an array`)

  return values.some((alpha, index, array) => actual.includes(alpha) && array.filter((omega) => alpha !== omega).every((item) => !actual.includes(item)))
}
