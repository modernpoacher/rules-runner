import debug from 'debug'

const log = debug('@modernpoacher/rules-runner/comparators/not')

log('`@modernpoacher/rules-runner` is awake')

export default function not (expected, actual) {
  log('not')

  return !(this.runTest(expected.not, actual))
}
