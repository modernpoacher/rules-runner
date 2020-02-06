import assert from 'assert'
import Rules from '@modernpoacher/rules-runner/Rules'

describe('`equals`', () => {
  describe('String', () => {
    describe('The value is equal to `equals`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Walmart Males are eligible for Walmart-male-scholarship': {
            if: {
              'person.profile.gender': 'M',
              'company.name': 'Walmart'
            },
            then: {
              'status.eligible': 'Walmart-male-scholarship'
            }
          }
        }

        const values = {
          person: {
            profile: {
              gender: 'M'
            }
          },
          company: {
            name: 'Walmart'
          }
        }

        const rules = new Rules(config)
        const { status: { eligible } } = rules.run(values)

        assert.equal(eligible, 'Walmart-male-scholarship')
      })
    })

    describe('The value is not equal to `equals`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Walmart Males are eligible for Walmart-male-scholarship': {
            if: {
              'person.profile.gender': 'F',
              'company.name': 'Walmart'
            },
            then: {
              'status.eligible': 'Walmart-male-scholarship'
            }
          }
        }

        const values = {
          person: {
            profile: {
              gender: 'M'
            }
          },
          company: {
            name: 'Walmart'
          }
        }

        const rules = new Rules(config)
        const { status: { eligible } = {} } = rules.run(values)

        assert.equal(eligible, undefined)
      })
    })

    describe('Otherwise', () => {
      it('populates the outcomes', () => {
        const config = {
          'Walmart Males are eligible for Walmart-male-scholarship': {
            if: {
              'person.profile.gender': 'F',
              'company.name': 'Walmart'
            },
            then: {
              'status.eligible': 'Walmart-female-scholarship'
            },
            otherwise: {
              'status.eligible': 'Walmart-male-scholarship'
            }
          }
        }

        const values = {
          person: {
            profile: {
              gender: 'M'
            }
          },
          company: {
            name: 'Walmart'
          }
        }

        const rules = new Rules(config)
        const { status: { eligible } = {} } = rules.run(values)

        assert.equal(eligible, 'Walmart-male-scholarship')
      })
    })
  })

  describe('Number', () => {
    describe('The value is equal to `equals`', () => {
      it('populates the outcomes', () => {
        const config = {
          '25 Year Old Employees of Walmart Get a Bonus': {
            if: {
              'person.profile.age': 25,
              'company.name': 'Walmart'
            },
            then: {
              'status.bonus': 500
            }
          }
        }

        const values = {
          person: {
            profile: {
              age: 25
            }
          },
          company: {
            name: 'Walmart'
          }
        }

        const rules = new Rules(config)
        const { status: { bonus } } = rules.run(values)

        assert.equal(bonus, 500)
      })
    })

    describe('The value is not equal to `equals`', () => {
      it('populates the outcomes', () => {
        const config = {
          '25 Year Old Employees of Walmart Get a Bonus': {
            if: {
              'person.profile.age': 25,
              'company.name': 'Walmart'
            },
            then: {
              'status.bonus': 500
            }
          }
        }

        const values = {
          person: {
            profile: {
              age: 26
            }
          },
          company: {
            name: 'Walmart'
          }
        }

        const rules = new Rules(config)
        const { status: { bonus } = {} } = rules.run(values)

        assert.equal(bonus, undefined)
      })
    })

    describe('Otherwise', () => {
      it('populates the outcomes', () => {
        const config = {
          '25 Year Old Employees of Walmart Get a Bonus': {
            if: {
              'person.profile.age': 25,
              'company.name': 'Walmart'
            },
            then: {
              'status.bonus': 500
            },
            otherwise: {
              'status.bonus': 0
            }
          }
        }

        const values = {
          person: {
            profile: {
              age: 26
            }
          },
          company: {
            name: 'Walmart'
          }
        }

        const rules = new Rules(config)
        const { status: { bonus } = {} } = rules.run(values)

        assert.equal(bonus, 0)
      })
    })
  })

  describe('Boolean', () => {
    describe('The value is equal to `equals`', () => {
      it('populates the outcomes', () => {
        const config = {
          '25 Year Old Employees of Walmart Get a Bonus': {
            if: {
              'person.profile.alive': true,
              'company.name': 'Walmart'
            },
            then: {
              'status.bonus': 500
            }
          }
        }

        const values = {
          person: {
            profile: {
              alive: true
            }
          },
          company: {
            name: 'Walmart'
          }
        }

        const rules = new Rules(config)
        const { status: { bonus } } = rules.run(values)

        assert.equal(bonus, 500)
      })
    })

    describe('The value is not equal to `equals`', () => {
      it('populates the outcomes', () => {
        const config = {
          '25 Year Old Employees of Walmart Get a Bonus': {
            if: {
              'person.profile.living': true,
              'company.name': 'Walmart'
            },
            then: {
              'status.bonus': 500
            }
          }
        }

        const values = {
          person: {
            profile: {
              living: false
            }
          },
          company: {
            name: 'Walmart'
          }
        }

        const rules = new Rules(config)
        const { status: { bonus } = {} } = rules.run(values)

        assert.equal(bonus, undefined)
      })
    })

    describe('Otherwise', () => {
      it('populates the outcomes', () => {
        const config = {
          '25 Year Old Employees of Walmart Get a Bonus': {
            if: {
              'person.profile.living': true,
              'company.name': 'Walmart'
            },
            then: {
              'status.bonus': 500
            },
            otherwise: {
              'status.bonus': 0
            }
          }
        }

        const values = {
          person: {
            profile: {
              living: false
            }
          },
          company: {
            name: 'Walmart'
          }
        }

        const rules = new Rules(config)
        const { status: { bonus } = {} } = rules.run(values)

        assert.equal(bonus, 0)
      })
    })
  })

  describe('Null', () => {
    it('throws', () => {
      const config = {
        'Null profile gets a flag': {
          if: {
            'person.profile': null
          },
          then: {
            'status.flag': true
          }
        }
      }

      const values = { person: { profile: null } }

      const rules = new Rules(config)

      assert.throws(() => rules.run(values)) // , 'Throws `Expectation is null`')
    })
  })

  describe('Undefined', () => {
    it('throws', () => {
      const config = {
        'Null profile gets a flag': {
          if: {
            'person.profile': undefined
          },
          then: {
            'status.flag': true
          }
        }
      }

      const values = { person: { profile: undefined } }

      const rules = new Rules(config)

      assert.throws(() => rules.run(values)) // , 'Unknown comparator "undefined"')
    })
  })
})
