import assert from 'assert'
import RulesRunner from '#rules-runner'

describe('`not`', () => {
  describe('String', () => {
    describe('The value is `not`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Walmart Males are eligible for Walmart-male-scholarship': {
            if: {
              'person.profile.gender': { not: 'M' },
              'company.name': { not: 'Walmart' }
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

        const rulesRunner = new RulesRunner(config)
        const { status: { eligible } = {} } = rulesRunner.run(values)

        assert.equal(eligible, undefined)
      })
    })

    describe('The value is not `not`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Walmart Males are eligible for Walmart-male-scholarship': {
            if: {
              'person.profile.gender': { not: 'F' },
              'company.name': { not: 'Tesco' }
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

        const rulesRunner = new RulesRunner(config)
        const { status: { eligible } = {} } = rulesRunner.run(values)

        assert.equal(eligible, 'Walmart-male-scholarship')
      })
    })

    describe('Otherwise', () => {
      describe('The value is `not`', () => {
        it('populates the outcomes', () => {
          const config = {
            'Walmart Males are eligible for Walmart-male-scholarship': {
              if: {
                'person.profile.gender': { not: 'M' },
                'company.name': { not: 'Walmart' }
              },
              then: {
                'status.eligible': 'Walmart-male-scholarship'
              },
              otherwise: {
                'status.eligible': 'Walmart-female-scholarship'
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

          const rulesRunner = new RulesRunner(config)
          const { status: { eligible } = {} } = rulesRunner.run(values)

          assert.equal(eligible, 'Walmart-female-scholarship')
        })
      })

      describe('The value is not `not`', () => {
        it('populates the outcomes', () => {
          const config = {
            'Walmart Males are eligible for Walmart-male-scholarship': {
              if: {
                'person.profile.gender': { not: 'F' },
                'company.name': { not: 'Walmart' }
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

          const rulesRunner = new RulesRunner(config)
          const { status: { eligible } = {} } = rulesRunner.run(values)

          assert.equal(eligible, 'Walmart-male-scholarship')
        })
      })
    })
  })

  describe('Number', () => {
    describe('The value is `not`', () => {
      it('populates the outcomes', () => {
        const config = {
          '25 Year Old Employees of Walmart Get a Bonus': {
            if: {
              'person.profile.age': { not: 25 },
              'company.name': { not: 'Walmart' }
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

        const rulesRunner = new RulesRunner(config)
        const { status: { bonus } = {} } = rulesRunner.run(values)

        assert.equal(bonus, undefined)
      })
    })

    describe('The value is not `not`', () => {
      it('populates the outcomes', () => {
        const config = {
          '25 Year Old Employees of Walmart Get a Bonus': {
            if: {
              'person.profile.age': { not: 25 },
              'company.name': { not: 'Tesco' }
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

        const rulesRunner = new RulesRunner(config)
        const { status: { bonus } = {} } = rulesRunner.run(values)

        assert.equal(bonus, 500)
      })
    })

    describe('Otherwise', () => {
      describe('The value is `not`', () => {
        it('populates the outcomes', () => {
          const config = {
            '25 Year Old Employees of Walmart Get a Bonus': {
              if: {
                'person.profile.age': { not: 25 },
                'company.name': { not: 'Walmart' }
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
                age: 25
              }
            },
            company: {
              name: 'Walmart'
            }
          }

          const rulesRunner = new RulesRunner(config)
          const { status: { bonus } = {} } = rulesRunner.run(values)

          assert.equal(bonus, 0)
        })
      })

      describe('The value is not `not`', () => {
        it('populates the outcomes', () => {
          const config = {
            '25 Year Old Employees of Walmart Get a Bonus': {
              if: {
                'person.profile.age': { not: 25 },
                'company.name': { not: 'Tesco' }
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

          const rulesRunner = new RulesRunner(config)
          const { status: { bonus } = {} } = rulesRunner.run(values)

          assert.equal(bonus, 500)
        })
      })
    })
  })

  describe('Boolean', () => {
    describe('The value is `not`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Living Employees of Walmart Get a Bonus': {
            if: {
              'person.profile.alive': { not: true },
              'company.name': { not: 'Walmart' }
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

        const rulesRunner = new RulesRunner(config)
        const { status: { bonus } = {} } = rulesRunner.run(values)

        assert.equal(bonus, undefined)
      })
    })

    describe('The value is not `not`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Living Employees of Walmart Get a Bonus': {
            if: {
              'person.profile.living': { not: true },
              'company.name': { not: 'Walmart' }
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

        const rulesRunner = new RulesRunner(config)
        const { status: { bonus } = {} } = rulesRunner.run(values)

        assert.equal(bonus, undefined)
      })
    })

    describe('Otherwise', () => {
      describe('The value is `not`', () => {
        it('populates the outcomes', () => {
          const config = {
            'Living Employees of Walmart Get a Bonus': {
              if: {
                'person.profile.alive': { not: true },
                'company.name': { not: 'Walmart' }
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
                alive: true
              }
            },
            company: {
              name: 'Walmart'
            }
          }

          const rulesRunner = new RulesRunner(config)
          const { status: { bonus } = {} } = rulesRunner.run(values)

          assert.equal(bonus, 0)
        })
      })

      describe('The value is not `not`', () => {
        it('populates the outcomes', () => {
          const config = {
            'Living Employees of Walmart Get a Bonus': {
              if: {
                'person.profile.living': { not: true },
                'company.name': { not: 'Walmart' }
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

          const rulesRunner = new RulesRunner(config)
          const { status: { bonus } = {} } = rulesRunner.run(values)

          assert.equal(bonus, 0)
        })
      })
    })
  })

  describe('Null', () => {
    it('throws', () => {
      const config = {
        'Null profile gets a flag': {
          if: {
            'person.profile': { not: null }
          },
          then: {
            'status.flag': true
          }
        }
      }

      const values = { person: { profile: null } }

      const rulesRunner = new RulesRunner(config)

      assert.throws(() => rulesRunner.run(values)) // , 'Throws `Expectation is null`')
    })
  })

  describe('Undefined', () => {
    it('throws', () => {
      const config = {
        'Null profile gets a flag': {
          if: {
            'person.profile': { not: undefined }
          },
          then: {
            'status.flag': true
          }
        }
      }

      const values = { person: { profile: undefined } }

      const rulesRunner = new RulesRunner(config)

      assert.throws(() => rulesRunner.run(values)) // , 'Unknown comparator "undefined"')
    })
  })
})
