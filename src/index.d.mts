declare class RulesRunner {
  constructor (config?: object)
  run (values?: object, decisions?: object): object
  runTests (expectations?: object, values?: object): object
  runTest (expectation?: object): object
  runOutcomes (outcomes?: object, accumulator?: object): object
}

declare module '@modernpoacher/rules-runner' {
  export default RulesRunner
}
