import assert from 'assert'
import RulesRunner from '#rules-runner'

describe('`allOf`', () => {
  describe('Every item is an item in `allOf`', () => {
    it('populates the outcome', () => {
      const config = {
        'All of these values wins a prize': {
          if: {
            all: { allOf: [1, 'a', true] }
          },
          then: { winsAPrize: true }
        }
      }

      const values = { all: [1, 'a', true] }

      const rulesRunner = new RulesRunner(config)
      const { winsAPrize } = rulesRunner.run(values)

      assert.equal(winsAPrize, true)
    })
  })

  describe('No item is an item in `allOf`', () => {
    it('populates the outcome', () => {
      const config = {
        'All of these values wins a prize': {
          if: {
            all: { allOf: [1, 'a', undefined] }
          },
          then: { winsAPrize: true }
        }
      }

      const values = { all: [2, 'b', NaN] }

      const rulesRunner = new RulesRunner(config)
      const { winsAPrize } = rulesRunner.run(values)

      assert.equal(winsAPrize, undefined)
    })
  })

  describe('One item is an item in `allOf`', () => {
    it('populates the outcome', () => {
      const config = {
        'All of these values wins a prize': {
          if: {
            all: { allOf: [1, 'a', true] }
          },
          then: { winsAPrize: true }
        }
      }

      const values = { all: [2, 'b', true] }

      const rulesRunner = new RulesRunner(config)
      const { winsAPrize } = rulesRunner.run(values)

      assert.equal(winsAPrize, undefined)
    })
  })

  describe('Otherwise', () => {
    describe('Every item is an item in `allOf`', () => {
      it('populates the outcome', () => {
        const config = {
          'All of these values wins a prize': {
            if: {
              all: { allOf: [1, 'a', true] }
            },
            then: { winsAPrize: true },
            otherwise: { winsAPrize: false }
          }
        }

        const values = { all: [1, 'a', true] }

        const rulesRunner = new RulesRunner(config)
        const { winsAPrize } = rulesRunner.run(values)

        assert.equal(winsAPrize, true)
      })
    })

    describe('No item is an item in `allOf`', () => {
      it('populates the outcome', () => {
        const config = {
          'All of these values wins a prize': {
            if: {
              all: { allOf: [1, 'a', undefined] }
            },
            then: { winsAPrize: true },
            otherwise: { winsAPrize: false }
          }
        }

        const values = { all: [2, 'b', NaN] }
        const rulesRunner = new RulesRunner(config)
        const { winsAPrize } = rulesRunner.run(values)

        assert.equal(winsAPrize, false)
      })
    })

    describe('One item is an item in `allOf`', () => {
      it('populates the outcome', () => {
        const config = {
          'All of these values wins a prize': {
            if: {
              all: { allOf: [1, 'a', true] }
            },
            then: { winsAPrize: true },
            otherwise: { winsAPrize: false }
          }
        }

        const values = { all: [2, 'b', true] }

        const rulesRunner = new RulesRunner(config)
        const { winsAPrize } = rulesRunner.run(values)

        assert.equal(winsAPrize, false)
      })
    })
  })
})
