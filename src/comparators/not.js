import debug from '@modernpoacher/rules-runner/common/debug'

const log = debug('@modernpoacher/rules-runner:comparators:not')

log('`not` is awake')

export default function not (expected, actual) {
  log('not')

  return !(this.runTest(expected.not, actual))
}
