import assert from 'assert'
import Rules from '@modernpoacher/rules-runner/Rules'

describe('`between`', () => {
  describe('The value of is equal to or greater than `lowerBound` and equal to or less than `upperBound`', () => {
    it('populates the outcome', () => {
      const config = {
        'Any of these values win a prize': {
          if: {
            val: { between: { lowerBound: 20, upperBound: 30 } }
          },
          then: { winsAPrize: true }
        }
      };

      [{ val: 20 }, { val: 25 }, { val: 30 }]
        .forEach((values) => {
          const rules = new Rules(config)
          const { winsAPrize } = rules.run(values)

          assert.equal(winsAPrize, true)
        })
    })
  })

  describe('The value of is not equal to or greater than `lowerBound` and not equal to or less than `upperBound`', () => {
    describe('Rules have `otherwise`', () => {
      describe('The value is below `lowerBound`', () => {
        it('populates the outcome', () => {
          const config = {
            'Any of these values win a prize': {
              if: {
                val: { between: { lowerBound: 20, upperBound: 30 } }
              },
              then: { winsAPrize: true },
              otherwise: { winsAPrize: false }
            }
          };

          [{ val: 19 }, { val: -19 }, { val: 0 }]
            .forEach((values) => {
              const rules = new Rules(config)
              const { winsAPrize } = rules.run(values)

              assert.equal(winsAPrize, false)
            })
        })
      })

      describe('The value is above `upperBound`', () => {
        it('populates the outcome', () => {
          const config = {
            'Any of these values win a prize': {
              if: {
                val: { between: { lowerBound: 20, upperBound: 30 } }
              },
              then: { winsAPrize: false },
              otherwise: { winsAPrize: false }
            }
          };

          [{ val: 31 }, { val: +31 }, { val: 100 }]
            .forEach((values) => {
              const rules = new Rules(config)
              const { winsAPrize } = rules.run(values)

              assert.equal(winsAPrize, false)
            })
        })
      })
    })

    describe('Rules do not not have `otherwise`', () => {
      describe('The value is less than `lowerBound`', () => {
        it('does not populate the outcome', () => {
          const config = {
            'Any of these values win a prize': {
              if: {
                val: { between: { lowerBound: 20, upperBound: 30 } }
              },
              then: { winsAPrize: true }
            }
          };

          [{ val: 19 }, { val: -19 }, { val: 0 }]
            .forEach((values) => {
              const rules = new Rules(config)
              const { winsAPrize } = rules.run(values)

              assert.equal(winsAPrize, undefined)
            })
        })
      })

      describe('The value is greater than `upperBound`', () => {
        it('does not populate the outcome', () => {
          const config = {
            'Any of these values win a prize': {
              if: {
                val: { between: { lowerBound: 20, upperBound: 30 } }
              },
              then: { winsAPrize: false }
            }
          };

          [{ val: 31 }, { val: +31 }, { val: 100 }]
            .forEach((values) => {
              const rules = new Rules(config)
              const { winsAPrize } = rules.run(values)

              assert.equal(winsAPrize, undefined)
            })
        })
      })
    })
  })
})
