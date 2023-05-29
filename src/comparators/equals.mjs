import debug from 'debug'

const log = debug('@modernpoacher/rules-runner/comparators/equals')

log('`@modernpoacher/rules-runner` is awake')

export default function equals (expected, actual) {
  log('equals')

  return (
    expected === actual
  )
}
