import assert from 'assert'
import RulesRunner from '@modernpoacher/rules-runner'

describe('`anyOf`', () => {
  describe('The value is an item in `anyOf`', () => {
    it('populates the outcome', () => {
      const config = {
        'Any of these values win a prize': {
          if: {
            any: { anyOf: [1, 'a', true] }
          },
          then: { winsAPrize: true }
        }
      };

      [{ any: 1 }, { any: 'a' }, { any: true }]
        .forEach((values) => {
          const rulesRunner = new RulesRunner(config)
          const { winsAPrize } = rulesRunner.run(values)

          assert.equal(winsAPrize, true)
        })
    })
  })

  describe('The value is not an item in `anyOf`', () => {
    it('populates the outcome', () => {
      const config = {
        'Any of these values win a prize': {
          if: {
            any: { anyOf: [1, 'a', undefined] }
          },
          then: { winsAPrize: true }
        }
      };

      [{ any: 2 }, { any: 'b' }, { any: NaN }]
        .forEach((values) => {
          const rulesRunner = new RulesRunner(config)
          const { winsAPrize } = rulesRunner.run(values)

          assert.equal(winsAPrize, undefined)
        })
    })
  })

  describe('Otherwise', () => {
    describe('The value is an item in `anyOf`', () => {
      it('populates the outcome', () => {
        const config = {
          'Any of these values win a prize': {
            if: {
              any: { anyOf: [1, 'a', true] }
            },
            then: { winsAPrize: true },
            otherwise: { winsAPrize: false }
          }
        };

        [{ any: 1 }, { any: 'a' }, { any: true }]
          .forEach((values) => {
            const rulesRunner = new RulesRunner(config)
            const { winsAPrize } = rulesRunner.run(values)

            assert.equal(winsAPrize, true)
          })
      })
    })

    describe('The value is not an item in `anyOf`', () => {
      it('populates the outcome', () => {
        const config = {
          'Any of these values win a prize': {
            if: {
              any: { anyOf: [1, 'a', undefined] }
            },
            then: { winsAPrize: true },
            otherwise: { winsAPrize: false }
          }
        };

        [{ any: 2 }, { any: 'b' }, { any: NaN }]
          .forEach((values) => {
            const rulesRunner = new RulesRunner(config)
            const { winsAPrize } = rulesRunner.run(values)

            assert.equal(winsAPrize, false)
          })
      })
    })
  })
})
