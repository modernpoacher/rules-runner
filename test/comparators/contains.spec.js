import assert from 'assert'
import RulesRunner from '@modernpoacher/rules-runner'

describe('`contains`', () => {
  describe('The value is in `contains`', () => {
    it('populates the outcomes', () => {
      const config = {
        'Anything to do with nursing is a good thing': {
          if: {
            job: { contains: 'Drawing' }
          },
          then: { 'status.hasGoodJob': true }
        }
      };
      [
        { job: 'I like Drawing' },
        { job: 'Drawing specialist' }
      ].forEach((values) => {
        const rulesRunner = new RulesRunner(config)
        const { status: { hasGoodJob } } = rulesRunner.run(values)

        assert.equal(hasGoodJob, true)
      })
    })
  })

  describe('The value is not in `contains`', () => {
    it('populates the outcomes', () => {
      const config = {
        'Anything to do with nursing is a good thing': {
          if: {
            job: { contains: 'Drawing' }
          },
          then: { 'status.hasGoodJob': true }
        }
      };
      [
        { job: 'I like painting' },
        { job: 'Painting specialist' }
      ].forEach((values) => {
        const rulesRunner = new RulesRunner(config)
        const { status: { hasGoodJob } = {} } = rulesRunner.run(values)

        assert.equal(hasGoodJob, undefined)
      })
    })
  })

  describe('Otherwise', () => {
    describe('The value is in `contains`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Anything to do with nursing is a good thing': {
            if: {
              job: { contains: 'Drawing' }
            },
            then: { 'status.hasGoodJob': true },
            otherwise: { 'status.hasGoodJob': false }
          }
        };
        [
          { job: 'I like Drawing' },
          { job: 'Drawing specialist' }
        ].forEach((values) => {
          const rulesRunner = new RulesRunner(config)
          const { status: { hasGoodJob } } = rulesRunner.run(values)

          assert.equal(hasGoodJob, true)
        })
      })
    })

    describe('The value is not in `contains`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Anything to do with nursing is a good thing': {
            if: {
              job: { contains: 'Drawing' }
            },
            then: { 'status.hasGoodJob': true },
            otherwise: { 'status.hasGoodJob': false }
          }
        };
        [
          { job: 'I like painting' },
          { job: 'Painting specialist' }
        ].forEach((values) => {
          const rulesRunner = new RulesRunner(config)
          const { status: { hasGoodJob } = {} } = rulesRunner.run(values)

          assert.equal(hasGoodJob, false)
        })
      })
    })
  })
})
