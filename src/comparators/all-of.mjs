import debug from 'debug'

const log = debug('@modernpoacher/rules-runner/comparators/all-of')

log('`@modernpoacher/rules-runner` is awake')

export default function allOf ({ allOf: values = null }, actual) {
  log('allOf')

  if (!Array.isArray(values)) throw new Error(`"${values}" is not an array`)

  if (!Array.isArray(actual)) throw new Error(`"${actual}" is not an array`)

  return values.every((item) => actual.includes(item))
}
