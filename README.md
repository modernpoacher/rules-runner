# @modernpoacher/rules-runner

Encapsulate rules in an easily comprehended JSON/JavaScript object literal format.

## Install
`npm i -P @modernpoacher/rules-runner`

## Examples

`if` the conditions are met `then` will execute.

```javascript
const RulesRunner = require('@modernpoacher/rules-runner')

const config = {
  'Must be 16 or older if no adult is present': {
    if: {
      'person.age': {
        lessThan: 16
      },
      'person.adultPresent': false
    },
    then: {
      'person.error': 'Must be 16 or older if no adult is present',
      'errors.all[]': 'person'
    }
  },
  'Must be employed': {
    if: {
      'company.isEmployed': false
    },
    then: {
      'company.error': 'Must be employed',
      'errors.all[]': 'company'
    }
  }
}

const rulesRunner = new RulesRunner(config)

const values = {
  person: {
    age: 15,
    adultPresent: false
  },
  company: {
    isEmployed: false
  }
}

rulesRunner.run(values)

assert.equal(values.person.error, 'Must be 16 or older if no adult is present')
assert.equal(values.company.error, 'Must be employed')
assert.deepEqual(values.errors.all, ['person', 'company'])
```

`if` the conditions are not met `otherwise` will execute.

```javascript
const RulesRunner = require('@modernpoacher/rules-runner')

const config = {
  'Person will be in house if person is tired or hungry': {
    if: {
      'person.age': {
        lessThan: 16
      },
      'person.adultPresent': false
    },
    then: {
      'person.location': 'house'
    },
    otherwise: {
      'person.location': 'work'
    }
  }
}

const rulesRunner = new RulesRunner(config)

const values = {
  person: {
    age: 17,
    adultPresent: true
  }
}

rulesRunner.run(values)

assert.equal(values.person.location, 'work')
```

## Comparators

- equals

```javascript
'person.exists': true
```

```javascript
'person.firstName': 'John'
```

```javascript
'person.age': 21
```

- boolean

```javascript
'person.exists': false
```

- between

```javascript
'person.age': { between: [1, 20] }
```

- contains

```javascript
'person.name': { contains: 'Jr' }
```

- lessThan

```javascript
'person.age': { lessThan: 21 }
```

- greaterThan

```javascript
'person.age': { greaterThan: 20 }
```

- oneOf

```javascript
'person.state': { oneOf: ['CA', 'TX', 'NY'] }
```

- anyOf

```javascript
'person.state': { anyOf: ['CA', 'TX', 'NY'] }
```

- allOf

```javascript
'person.state': { allOf: ['CA', 'TX', 'NY'] }
```

- matches

```javascript
'person.name': { matches: '/(john|bob|mary)/i' }
```

- not

```javascript
'person.state': { not: 'CA' }`
```

```javascript
'person.state': { not: { oneOf: ['CA', 'TX'] } }
```
