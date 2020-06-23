import debug from '@modernpoacher/rules-runner/common/debug'

const log = debug('@modernpoacher/rules-runner:comparators:any-of')

log('`anyOf` is awake')

export default function anyOf ({ anyOf: values = null } = {}, actual) {
  log('anyOf')

  if (!Array.isArray(values)) throw new Error(`"${values}" is not an array`)

  return values.includes(actual)
}
