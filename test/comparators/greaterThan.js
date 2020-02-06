import assert from 'assert'
import Rules from '@modernpoacher/rules-runner/Rules'

describe('`greaterThan`', () => {
  describe('The value is greater than `greaterThan`', () => {
    it('populates the outcomes', () => {
      const config = {
        'Older than 25 gets a bonus': {
          if: {
            'person.age': { greaterThan: 25 }
          },
          then: { 'person.getsBonus': true }
        }
      }

      const values = { person: { age: 26 } }

      const rules = new Rules(config)
      const { person: { getsBonus } } = rules.run(values)

      assert.equal(getsBonus, true)
    })
  })

  describe('The value is not greater than `greaterThan`', () => {
    describe('The value is equal to `greaterThan`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Older than 25 gets a bonus': {
            if: {
              'person.age': { greaterThan: 25 }
            },
            then: { 'person.getsBonus': true }
          }
        }

        const values = { person: { age: 25 } }

        const rules = new Rules(config)
        const { person: { getsBonus } } = rules.run(values)

        assert.equal(getsBonus, undefined)
      })
    })

    describe('The value is less than `greaterThan`', () => {
      it('populates the outcomes', () => {
        const config = {
          'Older than 25 gets a bonus': {
            if: {
              'person.age': { greaterThan: 25 }
            },
            then: { 'person.getsBonus': true }
          }
        }

        const values = { person: { age: 24 } }

        const rules = new Rules(config)
        const { person: { getsBonus } } = rules.run(values)

        assert.equal(getsBonus, undefined)
      })
    })
  })

  describe('Otherwise', () => {
    describe('The value is not greater than `greaterThan`', () => {
      describe('The value is equal to `greaterThan`', () => {
        it('populates the outcomes', () => {
          const config = {
            'Older than 25 gets a bonus': {
              if: {
                'person.age': { greaterThan: 25 }
              },
              then: { 'person.getsBonus': true },
              otherwise: { 'person.getsBonus': false }
            }
          }

          const values = { person: { age: 25 } }

          const rules = new Rules(config)
          const { person: { getsBonus } } = rules.run(values)

          assert.equal(getsBonus, false)
        })
      })

      describe('The value is less than `greaterThan`', () => {
        it('populates the outcomes', () => {
          const config = {
            'Older than 25 gets a bonus': {
              if: {
                'person.age': { greaterThan: 25 }
              },
              then: { 'person.getsBonus': true },
              otherwise: { 'person.getsBonus': false }
            }
          }

          const values = { person: { age: 24 } }

          const rules = new Rules(config)
          const { person: { getsBonus } } = rules.run(values)

          assert.equal(getsBonus, false)
        })
      })
    })
  })

  describe('Transforming strings to numbers', () => {
    describe('The value is a string representation of an integer', () => {
      describe('The value is greater than `greaterThan`', () => {
        it('populates the outcomes', () => {
          const config = {
            'Older than 25 gets a bonus': {
              if: {
                'person.age': { greaterThan: 25 }
              },
              then: { 'person.getsBonus': true }
            }
          }

          const values = { person: { age: '26' } }

          const rules = new Rules(config)
          const { person: { getsBonus } } = rules.run(values)

          assert.equal(getsBonus, true)
        })
      })

      describe('The value is not greater than `greaterThan`', () => {
        describe('The value is equal to `greaterThan`', () => {
          it('populates the outcomes', () => {
            const config = {
              'Older than 25 gets a bonus': {
                if: {
                  'person.age': { greaterThan: 25 }
                },
                then: { 'person.getsBonus': true }
              }
            }

            const values = { person: { age: '25' } }

            const rules = new Rules(config)
            const { person: { getsBonus } } = rules.run(values)

            assert.equal(getsBonus, undefined)
          })
        })

        describe('The value is less than `greaterThan`', () => {
          it('populates the outcomes', () => {
            const config = {
              'Older than 25 gets a bonus': {
                if: {
                  'person.age': { greaterThan: 25 }
                },
                then: { 'person.getsBonus': true }
              }
            }

            const values = { person: { age: '24' } }

            const rules = new Rules(config)
            const { person: { getsBonus } } = rules.run(values)

            assert.equal(getsBonus, undefined)
          })
        })
      })

      describe('Otherwise', () => {
        describe('The value is not greater than `greaterThan`', () => {
          describe('The value is equal to `greaterThan`', () => {
            it('populates the outcomes', () => {
              const config = {
                'Older than 25 gets a bonus': {
                  if: {
                    'person.age': { greaterThan: 25 }
                  },
                  then: { 'person.getsBonus': true },
                  otherwise: { 'person.getsBonus': false }
                }
              }

              const values = { person: { age: '25' } }

              const rules = new Rules(config)
              const { person: { getsBonus } } = rules.run(values)

              assert.equal(getsBonus, false)
            })
          })

          describe('The value is less than `greaterThan`', () => {
            it('populates the outcomes', () => {
              const config = {
                'Older than 25 gets a bonus': {
                  if: {
                    'person.age': { greaterThan: 25 }
                  },
                  then: { 'person.getsBonus': true },
                  otherwise: { 'person.getsBonus': false }
                }
              }

              const values = { person: { age: '24' } }

              const rules = new Rules(config)
              const { person: { getsBonus } } = rules.run(values)

              assert.equal(getsBonus, false)
            })
          })
        })
      })
    })

    describe('The value is a string representation of a float', () => {
      describe('The value is greater than `greaterThan`', () => {
        it('populates the outcomes', () => {
          const config = {
            'Older than 25 gets a bonus': {
              if: {
                'person.age': { greaterThan: 25.225 }
              },
              then: { 'person.getsBonus': true }
            }
          }

          const values = { person: { age: '26.225' } }

          const rules = new Rules(config)
          const { person: { getsBonus } } = rules.run(values)

          assert.equal(getsBonus, true)
        })
      })

      describe('The value is not greater than `greaterThan`', () => {
        describe('The value is equal to `greaterThan`', () => {
          it('populates the outcomes', () => {
            const config = {
              'Older than 25 gets a bonus': {
                if: {
                  'person.age': { greaterThan: 25.225 }
                },
                then: { 'person.getsBonus': true }
              }
            }

            const values = { person: { age: '25.225' } }

            const rules = new Rules(config)
            const { person: { getsBonus } } = rules.run(values)

            assert.equal(getsBonus, undefined)
          })
        })

        describe('The value is less than `greaterThan`', () => {
          it('populates the outcomes', () => {
            const config = {
              'Older than 25 gets a bonus': {
                if: {
                  'person.age': { greaterThan: 25.225 }
                },
                then: { 'person.getsBonus': true }
              }
            }

            const values = { person: { age: '24.225' } }

            const rules = new Rules(config)
            const { person: { getsBonus } } = rules.run(values)

            assert.equal(getsBonus, undefined)
          })
        })
      })

      describe('Otherwise', () => {
        describe('The value is not greater than `greaterThan`', () => {
          describe('The value is equal to `greaterThan`', () => {
            it('populates the outcomes', () => {
              const config = {
                'Older than 25 gets a bonus': {
                  if: {
                    'person.age': { greaterThan: 25.225 }
                  },
                  then: { 'person.getsBonus': true },
                  otherwise: { 'person.getsBonus': false }
                }
              }

              const values = { person: { age: '25.225' } }

              const rules = new Rules(config)
              const { person: { getsBonus } } = rules.run(values)

              assert.equal(getsBonus, false)
            })
          })

          describe('The value is less than `greaterThan`', () => {
            it('populates the outcomes', () => {
              const config = {
                'Older than 25 gets a bonus': {
                  if: {
                    'person.age': { greaterThan: 25.225 }
                  },
                  then: { 'person.getsBonus': true },
                  otherwise: { 'person.getsBonus': false }
                }
              }

              const values = { person: { age: '24.225' } }

              const rules = new Rules(config)
              const { person: { getsBonus } } = rules.run(values)

              assert.equal(getsBonus, false)
            })
          })
        })
      })
    })

    describe('The value is not a string representation of a number', () => {
      it('throws', () => {
        const config = {
          'Older than 25 gets a bonus': {
            if: {
              'person.age': { greaterThan: 25 }
            },
            then: { 'person.getsBonus': true }
          }
        }

        const values = { person: { age: 'Twenty-Five' } }

        const rules = new Rules(config)

        assert.throws(() => rules.run(values))
      })
    })
  })

  describe('Undefined', () => {
    it('throws', () => {
      const config = {
        'Older than 25 gets a bonus': {
          if: {
            'person.age': { greaterThan: 25 }
          },
          then: { 'person.getsBonus': true }
        }
      }

      const values = { person: { age: undefined } }

      const rules = new Rules(config)

      assert.throws(() => rules.run(values))
    })
  })

  describe('Null', () => {
    it('throws', () => {
      const config = {
        'Older than 25 gets a bonus': {
          if: {
            'person.age': { greaterThan: 25 }
          },
          then: { 'person.getsBonus': true }
        }
      }

      const values = { person: { age: null } }

      const rules = new Rules(config)

      assert.throws(() => rules.run(values))
    })
  })
})
