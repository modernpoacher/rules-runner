const debug = require('debug')

const log = debug('@modernpoacher/rules-runner')

const {
  env: {
    DEBUG = '@modernpoacher/rules-runner',
    NODE_ENV = 'development'
  }
} = process

debug.enable(DEBUG)

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
        node: 'current'
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
