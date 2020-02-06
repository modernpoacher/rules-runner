import assert from 'assert'
import RulesRunner from '@modernpoacher/rules-runner'

describe('`RulesRunner`', () => {
  describe('Outcome keys end with `[]`', () => {
    it('populates an array of outcomes', () => {
      const config = {
        'Must be 21 or older': {
          if: {
            'person.age': { lessThan: 21 }
          },
          then: {
            'errors[]': 'Must be 21 or older'
          }
        },
        'Must be employed': {
          if: {
            'person.isCitizen': false
          },
          then: {
            'errors[]': 'Must be a citizen'
          }
        }
      }

      const values = {
        person: {
          age: 20,
          isCitizen: false
        }
      }

      const rulesRunner = new RulesRunner(config)
      const { errors } = rulesRunner.run(values)

      assert.deepEqual(errors, [
        'Must be 21 or older',
        'Must be a citizen'
      ])
    })
  })

  describe('Outcome keys do not end with `[]`', () => {
    it('populates an outcome', () => {
      const config = {
        'Must be 21 or older': {
          if: {
            'person.age': {
              lessThan: 21
            }
          },
          then: {
            'person.error': 'Must be 21 or older'
          }
        },
        'Must be employed': {
          if: {
            'company.isEmployed': false
          },
          then: {
            'company.error': 'Must be employed'
          }
        }
      }

      const values = {
        person: {
          age: 20
        },
        company: {
          isEmployed: false
        }
      }

      const rulesRunner = new RulesRunner(config)
      const { person: { error } } = rulesRunner.run(values)

      assert.equal(error, 'Must be 21 or older')
    })
  })

  describe('Outcome keys both do and do not end with `[]`', () => {
    it('populates an outcome and an array of outcomes', () => {
      const config = {
        'Must be 21 or older': {
          if: {
            'person.age': {
              lessThan: 21
            }
          },
          then: {
            'person.error': 'Must be 21 or older',
            'person.errors[]': 'Age less than 21'
          }
        },
        'Must be employed': {
          if: {
            'company.isEmployed': false
          },
          then: {
            'company.error': 'Must be employed',
            'company.errors[]': 'Unemployed'
          }
        }
      }

      const values = {
        person: {
          age: 20
        },
        company: {
          isEmployed: false
        }
      }

      const rulesRunner = new RulesRunner(config)
      const outcomes = rulesRunner.run(values)

      {
        const { person: { error, errors } } = outcomes

        assert.equal(error, 'Must be 21 or older')
        assert.deepEqual(errors, ['Age less than 21'])
      }

      {
        const { company: { error, errors } } = outcomes

        assert.equal(error, 'Must be employed')
        assert.deepEqual(errors, ['Unemployed'])
      }
    })
  })

  describe('Otherwise', () => {
    describe('Outcome keys do not end with `[]`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Person will be in house if person is tired or hungry': {
            if: {
              'person.tired': true
            },
            then: {
              'person.location': 'Home'
            },
            otherwise: {
              'person.error': 'Not home',
              'person.errors[]': 'Work'
            }
          }
        }

        const values = {
          person: {
            tired: false
          }
        }

        const rulesRunner = new RulesRunner(config)
        const { person: { error, errors } } = rulesRunner.run(values)

        assert.equal(error, 'Not home')
        assert.deepEqual(errors, ['Work'])
      })
    })

    describe('Outcome keys both do and do not end with `[]`', () => {
      it('populates an outcome and an array of outcomes', () => {
        const config = {
          'Must be 21 or older': {
            if: {
              'person.age': {
                greaterThan: 21
              }
            },
            then: {
              'person.isEligible': true
            },
            otherwise: {
              'person.error': 'Must be 21 or older',
              'person.errors[]': 'Age less than 21'
            }
          },
          'Must be employed': {
            if: {
              'company.isEmployed': true
            },
            then: {
              'company.notEmployed': true
            },
            otherwise: {
              'company.error': 'Must be employed',
              'company.errors[]': 'Unemployed'
            }
          }
        }

        const values = {
          person: {
            age: 20
          },
          company: {
            isEmployed: false
          }
        }

        const rulesRunner = new RulesRunner(config)
        const outcomes = rulesRunner.run(values)

        {
          const { person: { error, errors } } = outcomes

          assert.equal(error, 'Must be 21 or older')
          assert.deepEqual(errors, ['Age less than 21'])
        }

        {
          const { company: { error, errors } } = outcomes

          assert.equal(error, 'Must be employed')
          assert.deepEqual(errors, ['Unemployed'])
        }
      })
    })
  })
})
