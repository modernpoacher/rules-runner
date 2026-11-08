import debug from 'debug'

const log = debug('@modernpoacher/rules-runner/comparators/not')

log('`@modernpoacher/rules-runner` is awake')

/**
 * @this {{ runTest: (expectation: unknown, ...actual: unknown[]) => boolean }}
 * @param {{ not: unknown }} expected
 * @param {unknown} actual
 * @returns {boolean}
 */
export default function not (expected, actual) {
  log('not')

  return !(this.runTest(expected.not, actual))
}
