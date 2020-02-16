import assert from 'assert'
import RulesRunner from '@modernpoacher/rules-runner'

describe('`between`', () => {
  describe('The value is equal to or greater than `lowerBound` and equal to or less than `upperBound`', () => {
    it('populates the outcome', () => {
      const config = {
        'Between these values win a prize': {
          if: {
            val: { between: { lowerBound: 20, upperBound: 30 } }
          },
          then: { winsAPrize: true }
        }
      };

      [{ val: 20 }, { val: 25 }, { val: 30 }]
        .forEach((values) => {
          const rulesRunner = new RulesRunner(config)
          const { winsAPrize } = rulesRunner.run(values)

          assert.equal(winsAPrize, true)
        })
    })
  })

  describe('The value is not equal to or greater than `lowerBound` and not equal to or less than `upperBound`', () => {
    describe('The value is less than `lowerBound`', () => {
      it('populates the outcome', () => {
        const config = {
          'Between these values win a prize': {
            if: {
              val: { between: { lowerBound: 20, upperBound: 30 } }
            },
            then: { winsAPrize: true }
          }
        };

        [{ val: +19 }, { val: -19 }, { val: 0 }]
          .forEach((values) => {
            const rulesRunner = new RulesRunner(config)
            const { winsAPrize } = rulesRunner.run(values)

            assert.equal(winsAPrize, undefined)
          })
      })
    })

    describe('The value is greater than `upperBound`', () => {
      it('populates the outcome', () => {
        const config = {
          'Between these values win a prize': {
            if: {
              val: { between: { lowerBound: 20, upperBound: 30 } }
            },
            then: { winsAPrize: false }
          }
        };

        [{ val: -31 }, { val: +31 }, { val: 100 }]
          .forEach((values) => {
            const rulesRunner = new RulesRunner(config)
            const { winsAPrize } = rulesRunner.run(values)

            assert.equal(winsAPrize, undefined)
          })
      })
    })
  })

  describe('Otherwise', () => {
    describe('The value is equal to or greater than `lowerBound` and equal to or less than `upperBound`', () => {
      it('populates the outcome', () => {
        const config = {
          'Between these values win a prize': {
            if: {
              val: { between: { lowerBound: 20, upperBound: 30 } }
            },
            then: { winsAPrize: true },
            otherwise: { winsAPrize: false }
          }
        };

        [{ val: 20 }, { val: 25 }, { val: 30 }]
          .forEach((values) => {
            const rulesRunner = new RulesRunner(config)
            const { winsAPrize } = rulesRunner.run(values)

            assert.equal(winsAPrize, true)
          })
      })
    })

    describe('The value is not equal to or greater than `lowerBound` and not equal to or less than `upperBound`', () => {
      describe('The value is below `lowerBound`', () => {
        it('populates the outcome', () => {
          const config = {
            'Between these values win a prize': {
              if: {
                val: { between: { lowerBound: 20, upperBound: 30 } }
              },
              then: { winsAPrize: true },
              otherwise: { winsAPrize: false }
            }
          };

          [{ val: +19 }, { val: -19 }, { val: 0 }]
            .forEach((values) => {
              const rulesRunner = new RulesRunner(config)
              const { winsAPrize } = rulesRunner.run(values)

              assert.equal(winsAPrize, false)
            })
        })
      })

      describe('The value is above `upperBound`', () => {
        it('populates the outcome', () => {
          const config = {
            'Between these values win a prize': {
              if: {
                val: { between: { lowerBound: 20, upperBound: 30 } }
              },
              then: { winsAPrize: false },
              otherwise: { winsAPrize: false }
            }
          };

          [{ val: -31 }, { val: +31 }, { val: 100 }]
            .forEach((values) => {
              const rulesRunner = new RulesRunner(config)
              const { winsAPrize } = rulesRunner.run(values)

              assert.equal(winsAPrize, false)
            })
        })
      })
    })
  })
})
