import assert from 'assert'
import RulesRunner from '@modernpoacher/rules-runner'

describe('`matches`', () => {
  describe('`matches` is a regular expression', () => {
    describe('The value is matched by the regular expression', () => {
      describe('With flags', () => {
        it('populates the outcomes', () => {
          const config = {
            'Any of these people have great names': {
              if: {
                val: { matches: /(John|Bob|Mary)/i }
              },
              then: { hasGreatName: true }
            }
          };

          [{ val: 'john' }, { val: 'bob' }, { val: 'mary' }]
            .forEach((values) => {
              const rulesRunner = new RulesRunner(config)
              const { hasGreatName } = rulesRunner.run(values)

              assert.equal(hasGreatName, true)
            })
        })
      })

      describe('Without flags', () => {
        it('populates the outcomes', () => {
          const config = {
            'Any of these people have great names': {
              if: {
                val: { matches: /(John|Bob|Mary)/ }
              },
              then: { hasGreatName: true }
            }
          };

          [{ val: 'John' }, { val: 'Bob' }, { val: 'Mary' }]
            .forEach((values) => {
              const rulesRunner = new RulesRunner(config)
              const { hasGreatName } = rulesRunner.run(values)

              assert.equal(hasGreatName, true)
            })
        })
      })
    })

    describe('The value is not matched by the regular expression', () => {
      describe('With flags', () => {
        it('populates the outcomes', () => {
          const config = {
            'Any of these people have great names': {
              if: {
                val: { matches: /(John|Bob|Mary)/i }
              },
              then: { hasGreatName: true }
            }
          };

          [{ val: 'Juanito' }, { val: 'Frank' }, { val: 'Beatrice' }]
            .forEach((values) => {
              const rulesRunner = new RulesRunner(config)
              const { hasGreatName } = rulesRunner.run(values)

              assert.equal(hasGreatName, undefined)
            })
        })
      })

      describe('Without flags', () => {
        it('populates the outcomes', () => {
          const config = {
            'Any of these people have great names': {
              if: {
                val: { matches: /(John|Bob|Mary)/ }
              },
              then: { hasGreatName: true }
            }
          };

          [{ val: 'Juanito' }, { val: 'Frank' }, { val: 'Beatrice' }]
            .forEach((values) => {
              const rulesRunner = new RulesRunner(config)
              const { hasGreatName } = rulesRunner.run(values)

              assert.equal(hasGreatName, undefined)
            })
        })
      })
    })

    describe('Otherwise', () => {
      describe('The value is matched by the regular expression', () => {
        describe('With flags', () => {
          it('populates the outcomes', () => {
            const config = {
              'Any of these people have great names': {
                if: {
                  val: { matches: /(John|Bob|Mary)/i }
                },
                then: { hasGreatName: true },
                otherwise: { hasGreatName: false }
              }
            };

            [{ val: 'john' }, { val: 'bob' }, { val: 'mary' }]
              .forEach((values) => {
                const rulesRunner = new RulesRunner(config)
                const { hasGreatName } = rulesRunner.run(values)

                assert.equal(hasGreatName, true)
              })
          })
        })

        describe('Without flags', () => {
          it('populates the outcomes', () => {
            const config = {
              'Any of these people have great names': {
                if: {
                  val: { matches: /(John|Bob|Mary)/ }
                },
                then: { hasGreatName: true },
                otherwise: { hasGreatName: false }
              }
            };

            [{ val: 'John' }, { val: 'Bob' }, { val: 'Mary' }]
              .forEach((values) => {
                const rulesRunner = new RulesRunner(config)
                const { hasGreatName } = rulesRunner.run(values)

                assert.equal(hasGreatName, true)
              })
          })
        })
      })

      describe('The value is not matched by the regular expression', () => {
        describe('With flags', () => {
          it('populates the outcomes', () => {
            const config = {
              'Any of these people have great names': {
                if: {
                  val: { matches: /(John|Bob|Mary)/i }
                },
                then: { hasGreatName: true },
                otherwise: { hasGreatName: false }
              }
            };

            [{ val: 'Juanito' }, { val: 'Frank' }, { val: 'Beatrice' }]
              .forEach((values) => {
                const rulesRunner = new RulesRunner(config)
                const { hasGreatName } = rulesRunner.run(values)

                assert.equal(hasGreatName, false)
              })
          })
        })

        describe('Without flags', () => {
          it('populates the outcomes', () => {
            const config = {
              'Any of these people have great names': {
                if: {
                  val: { matches: /(John|Bob|Mary)/ }
                },
                then: { hasGreatName: true },
                otherwise: { hasGreatName: false }
              }
            };

            [{ val: 'Juanito' }, { val: 'Frank' }, { val: 'Beatrice' }]
              .forEach((values) => {
                const rulesRunner = new RulesRunner(config)
                const { hasGreatName } = rulesRunner.run(values)

                assert.equal(hasGreatName, false)
              })
          })
        })
      })
    })
  })

  describe('`matches` is a string representation of a regular expression', () => {
    describe('The value is matched by the regular expression', () => {
      describe('With flags', () => {
        it('populates the outcomes', () => {
          const config = {
            'Any of these people have great names': {
              if: {
                val: { matches: '/(John|Bob|Mary)/i' }
              },
              then: { hasGreatName: true }
            }
          };

          [{ val: 'john' }, { val: 'bob' }, { val: 'mary' }]
            .forEach((values) => {
              const rulesRunner = new RulesRunner(config)
              const { hasGreatName } = rulesRunner.run(values)

              assert.equal(hasGreatName, true)
            })
        })
      })

      describe('Without flags', () => {
        it('populates the outcomes', () => {
          const config = {
            'Any of these people have great names': {
              if: {
                val: { matches: '/(John|Bob|Mary)/' }
              },
              then: { hasGreatName: true }
            }
          };

          [{ val: 'John' }, { val: 'Bob' }, { val: 'Mary' }]
            .forEach((values) => {
              const rulesRunner = new RulesRunner(config)
              const { hasGreatName } = rulesRunner.run(values)

              assert.equal(hasGreatName, true)
            })
        })
      })
    })

    describe('The value is not matched by the regular expression', () => {
      it('populates the outcomes', () => {
        const config = {
          'Any of these people have great names': {
            if: {
              val: { matches: '/(John|Bob|Mary)/i' }
            },
            then: { hasGreatName: true }
          }
        };

        [{ val: 'Juanito' }, { val: 'Frank' }, { val: 'Beatrice' }]
          .forEach((values) => {
            const rulesRunner = new RulesRunner(config)
            const { hasGreatName } = rulesRunner.run(values)

            assert.equal(hasGreatName, undefined)
          })
      })
    })

    describe('Otherwise', () => {
      describe('The value is matched by the regular expression', () => {
        describe('With flags', () => {
          it('populates the outcomes', () => {
            const config = {
              'Any of these people have great names': {
                if: {
                  val: { matches: '/(John|Bob|Mary)/i' }
                },
                then: { hasGreatName: true },
                otherwise: { hasGreatName: false }
              }
            };

            [{ val: 'john' }, { val: 'bob' }, { val: 'mary' }]
              .forEach((values) => {
                const rulesRunner = new RulesRunner(config)
                const { hasGreatName } = rulesRunner.run(values)

                assert.equal(hasGreatName, true)
              })
          })
        })

        describe('Without flags', () => {
          it('populates the outcomes', () => {
            const config = {
              'Any of these people have great names': {
                if: {
                  val: { matches: '/(John|Bob|Mary)/' }
                },
                then: { hasGreatName: true },
                otherwise: { hasGreatName: false }
              }
            };

            [{ val: 'John' }, { val: 'Bob' }, { val: 'Mary' }]
              .forEach((values) => {
                const rulesRunner = new RulesRunner(config)
                const { hasGreatName } = rulesRunner.run(values)

                assert.equal(hasGreatName, true)
              })
          })
        })
      })

      describe('The value is not matched by the regular expression', () => {
        describe('With flags', () => {
          it('populates the outcomes', () => {
            const config = {
              'Any of these people have great names': {
                if: {
                  val: { matches: /(John|Bob|Mary)/i }
                },
                then: { hasGreatName: true },
                otherwise: { hasGreatName: false }
              }
            };

            [{ val: 'Juanito' }, { val: 'Frank' }, { val: 'Beatrice' }]
              .forEach((values) => {
                const rulesRunner = new RulesRunner(config)
                const { hasGreatName } = rulesRunner.run(values)

                assert.equal(hasGreatName, false)
              })
          })
        })

        describe('Without flags', () => {
          it('populates the outcomes', () => {
            const config = {
              'Any of these people have great names': {
                if: {
                  val: { matches: /(John|Bob|Mary)/ }
                },
                then: { hasGreatName: true },
                otherwise: { hasGreatName: false }
              }
            };

            [{ val: 'Juanito' }, { val: 'Frank' }, { val: 'Beatrice' }]
              .forEach((values) => {
                const rulesRunner = new RulesRunner(config)
                const { hasGreatName } = rulesRunner.run(values)

                assert.equal(hasGreatName, false)
              })
          })
        })
      })
    })
  })
})
