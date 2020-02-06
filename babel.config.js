module.exports = {
  compact: true,
  comments: false,
  presets: [
    [
      '@babel/env', {
        useBuiltIns: 'entry',
        targets: {
          node: 'current'
        },
        corejs: 3
      }
    ]
  ],
  plugins: [
    '@babel/proposal-export-default-from',
    [
      'module-resolver', {
        alias: {
          '@modernpoacher/rules-runner': './src'
        }
      }
    ]
  ]
}
