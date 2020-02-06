import assert from 'assert'
import Rules from '@modernpoacher/rules-runner/Rules'

describe('`boolean`', () => {
  describe('The value is `true`', () => {
    it('populates the outcome', () => {
      const config = {
        'People at active companies get paid': {
          if: {
            'company.isActive': true
          },
          then: {
            'status.getsPaid': true
          }
        }
      }

      const values = {
        company: {
          isActive: true
        }
      }

      const rules = new Rules(config)
      const { status: { getsPaid } } = rules.run(values)

      assert.equal(getsPaid, true)
    })
  })

  describe('The value is `false`', () => {
    it('populates the outcome', () => {
      const config = {
        'Dead people do not get paid': {
          if: {
            'person.profile.isLiving': false
          },
          then: {
            'status.getsPaid': false
          }
        }
      }

      const values = {
        person: {
          profile: {
            isLiving: false
          }
        }
      }

      const rules = new Rules(config)
      const { status: { getsPaid } } = rules.run(values)

      assert.equal(getsPaid, false)
    })
  })

  describe('Rules have `otherwise`', () => {
    describe('The value is `true`', () => {
      it('populates the outcome', () => {
        const config = {
          'People at inactive companies get paid': {
            if: {
              'company.isActive': false
            },
            then: {
              'status.getsPaid': true
            },
            otherwise: {
              'status.getsPaid': false
            }
          }
        }

        const values = {
          company: {
            isActive: true
          }
        }

        const rules = new Rules(config)
        const { status: { getsPaid } } = rules.run(values)

        assert.equal(getsPaid, false)
      })
    })

    describe('The value is `false`', () => {
      it('populates the outcome', () => {
        const config = {
          'People do not get paid': {
            if: {
              'person.profile.isLiving': true
            },
            then: {
              'status.getsPaid': false
            },
            otherwise: {
              'status.getsPaid': true
            }
          }
        }

        const values = {
          person: {
            profile: {
              isLiving: false
            }
          }
        }

        const rules = new Rules(config)
        const { status: { getsPaid } } = rules.run(values)

        assert.equal(getsPaid, true)
      })
    })
  })

  describe('Rules do not have `otherwise`', () => {
    describe('The value is `true`', () => {
      it('populates the outcome', () => {
        const config = {
          'People at inactive companies get paid': {
            if: {
              'company.isActive': false
            },
            then: {
              'status.getsPaid': true
            }
          }
        }

        const values = {
          company: {
            isActive: true
          }
        }

        const rules = new Rules(config)
        const { status: { getsPaid } = {} } = rules.run(values)

        assert.equal(getsPaid, undefined)
      })
    })

    describe('The value is `false`', () => {
      it('populates the outcome', () => {
        const config = {
          'People do not get paid': {
            if: {
              'person.profile.isLiving': true
            },
            then: {
              'status.getsPaid': false
            }
          }
        }

        const values = {
          person: {
            profile: {
              isLiving: false
            }
          }
        }

        const rules = new Rules(config)
        const { status: { getsPaid } = {} } = rules.run(values)

        assert.equal(getsPaid, undefined)
      })
    })
  })
})
