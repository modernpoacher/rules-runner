import assert from 'assert'
import RulesRunner from '#rules-runner'

describe('`oneOf`', () => {
  describe('One item is an item in `oneOf`', () => {
    it('populates the outcome', () => {
      const config = {
        'One of these values wins a prize': {
          if: {
            one: { oneOf: [1, 'a', true] }
          },
          then: { winsAPrize: true }
        }
      }

      const values = { one: [2, 'b', true] }

      const rulesRunner = new RulesRunner(config)
      const { winsAPrize } = rulesRunner.run(values)

      assert.equal(winsAPrize, true)
    })
  })

  describe('No item is an item in `oneOf`', () => {
    it('populates the outcome', () => {
      const config = {
        'One of these values wins a prize': {
          if: {
            one: { oneOf: [1, 'a', true] }
          },
          then: { winsAPrize: true }
        }
      }

      const values = { one: [2, 'b', NaN] }

      const rulesRunner = new RulesRunner(config)
      const { winsAPrize } = rulesRunner.run(values)

      assert.equal(winsAPrize, undefined)
    })
  })

  describe('Every item is an item in `oneOf`', () => {
    it('populates the outcome', () => {
      const config = {
        'One of these values wins a prize': {
          if: {
            one: { oneOf: [1, 'a', true] }
          },
          then: { winsAPrize: true }
        }
      }

      const values = { one: [1, 'a', true] }

      const rulesRunner = new RulesRunner(config)
      const { winsAPrize } = rulesRunner.run(values)

      assert.equal(winsAPrize, undefined)
    })
  })

  describe('Otherwise', () => {
    describe('One item is an item in `oneOf`', () => {
      it('populates the outcome', () => {
        const config = {
          'One of these values wins a prize': {
            if: {
              one: { oneOf: [1, 'a', true] }
            },
            then: { winsAPrize: true },
            otherwise: { winsAPrize: false }
          }
        }

        const values = { one: [2, 'b', true] }

        const rulesRunner = new RulesRunner(config)
        const { winsAPrize } = rulesRunner.run(values)

        assert.equal(winsAPrize, true)
      })
    })

    describe('No item is an item in `oneOf`', () => {
      it('populates the outcome', () => {
        const config = {
          'One of these values wins a prize': {
            if: {
              one: { oneOf: [1, 'a', true] }
            },
            then: { winsAPrize: true },
            otherwise: { winsAPrize: false }
          }
        }

        const values = { one: [2, 'b', NaN] }
        const rulesRunner = new RulesRunner(config)
        const { winsAPrize } = rulesRunner.run(values)

        assert.equal(winsAPrize, false)
      })
    })

    describe('Every item is an item in `oneOf`', () => {
      it('populates the outcome', () => {
        const config = {
          'One of these values wins a prize': {
            if: {
              one: { oneOf: [1, 'a', true] }
            },
            then: { winsAPrize: true },
            otherwise: { winsAPrize: false }
          }
        }

        const values = { one: [1, 'a', true] }

        const rulesRunner = new RulesRunner(config)
        const { winsAPrize } = rulesRunner.run(values)

        assert.equal(winsAPrize, false)
      })
    })
  })
})
