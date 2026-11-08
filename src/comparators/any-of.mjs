import debug from 'debug'

const log = debug('@modernpoacher/rules-runner/comparators/any-of')

log('`@modernpoacher/rules-runner` is awake')

/**
 * @param {{ anyOf?: unknown[] | null }} expected
 * @param {unknown} actual
 * @returns {boolean}
 */
export default function anyOf ({ anyOf: values = null }, actual) {
  log('anyOf')

  if (!Array.isArray(values)) throw new Error(`"${values}" is not an array`)

  return values.includes(actual)
}
