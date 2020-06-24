const debug = require('debug')

const log = debug('@modernpoacher/rules-runner')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

log('`modernpoacher/rules-runner` is awake')

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

const presets = [
  [
    '@babel/env', {
      useBuiltIns: 'entry',
      targets: {
        node: '12.18.1'
      },
      corejs: 3
    }
  ]
]

const plugins = [
  '@babel/proposal-export-default-from',
  [
    'module-resolver', {
      alias: {
        '@modernpoacher/rules-runner': './src'
      }
    }
  ]
]

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    compact: true,
    comments: false,
    presets,
    plugins
  }
}
