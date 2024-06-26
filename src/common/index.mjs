import debug from 'debug'

const log = debug('@modernpoacher/rules-runner/common')

log('`@modernpoacher/rules-runner` is awake')

export const isBoolean = (v) => (typeof v === 'boolean' || v === 'true' || v === 'false')

export const isObject = (v) => (v || false).constructor === Object && !Array.isArray(v)

export function toNull (v) {
  log('toNull')

  if (v === null || v === 'null') return null

  throw new Error('Invalid `null`')
}

export function toRegExp (v) {
  log('toRegExp')

  if (v instanceof RegExp) return v

  if (typeof v === 'string') {
    if (/^\/(.*)\/(\w*)$/.test(v)) {
      const [
        match,
        expression,
        flags
      ] = v.match(/^\/(.*)\/(\w*)$/)

      if (match) return new RegExp(expression, flags)
    }
  }

  throw new Error('Invalid `reg exp`')
}

export function toBoolean (v) {
  log('toBoolean')

  if (typeof v === 'boolean') return v
  if (v === 'true') return true
  if (v === 'false') return false

  throw new Error('Invalid `boolean`')
}

export function toString (v) {
  log('toString')

  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)

  return JSON.stringify(v)
}

export function toNumber (v) {
  log('toNumber')

  if (typeof v === 'number') return v

  if (v) {
    const n = Number(v) // +v // unary operator
    if (!isNaN(n)) return n
  }

  throw new Error('Invalid `number`')
}
