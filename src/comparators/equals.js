import debug from '@modernpoacher/rules-runner/common/debug'

const log = debug('@modernpoacher/rules-runner:comparators:equals')

log('`equals` is awake')

export default function equals (expected, actual) {
  log('equals')

  return (
    expected === actual
  )
}
