import debug from 'debug'

const log = debug('@modernpoacher/rules-runner/common')

log('`@modernpoacher/rules-runner` is awake')

/**
 * @param {unknown} v
 * @returns {v is boolean | 'true' | 'false'} v is a boolean or string "true" or string "false"
 */
export const isBoolean = (v) => (typeof v === 'boolean' || v === 'true' || v === 'false')

/**
 * @param {unknown} v
 * @returns {v is object}
 */
export const isObject = (v) => (v || false).constructor === Object && !Array.isArray(v)

/**
 * @param {unknown} v
 * @returns {null}
 */
export function toNull (v) {
  log('toNull')

  if (v === null || v === 'null') return null

  throw new Error('Invalid `null`')
}

/**
 * @param {unknown} v
 * @returns {RegExp}
 */
export function toRegExp (v) {
  log('toRegExp')

  if (v instanceof RegExp) return v

  if (typeof v === 'string') {
    if (/^\/(.*)\/(\w*)$/.test(v)) {
      const [
        match,
        expression,
        flags
      ] = v.match(/^\/(.*)\/(\w*)$/) ?? []

      if (match) return new RegExp(expression, flags)
    }
  }

  throw new Error('Invalid `reg exp`')
}

/**
 * @param {unknown} v
 * @returns {boolean}
 */
export function toBoolean (v) {
  log('toBoolean')

  if (typeof v === 'boolean') return v
  if (v === 'true') return true
  if (v === 'false') return false

  throw new Error('Invalid `boolean`')
}

/**
 * @param {unknown} v
 * @returns {string}
 */
export function toString (v) {
  log('toString')

  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  if (v === undefined) return 'undefined'
  if (v instanceof Function || (v || false).constructor === Symbol) return String(v)

  return String(JSON.stringify(v)) // `{ toJSON () { return undefined } }`
}

/**
 * @param {unknown} v
 * @returns {number}
 */
export function toNumber (v) {
  log('toNumber')

  if (typeof v === 'number') return v

  if (v) {
    const n = Number(v) // +v // unary operator
    if (!isNaN(n)) return n
  }

  throw new Error('Invalid `number`')
}
