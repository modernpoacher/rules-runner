type ObjectType = Record<PropertyKey, unknown>

declare class RulesRunner {
  constructor (config: ObjectType)
  run (values?: ObjectType, decisions?: ObjectType): ObjectType
  runTests (expectations?: ObjectType, values?: ObjectType): boolean
  runTest (expectation: unknown, ...actual: unknown[]): boolean
  runOutcomes (outcomes?: ObjectType, accumulator?: ObjectType): ObjectType
}

declare module '@modernpoacher/rules-runner' {
  export default RulesRunner
}
