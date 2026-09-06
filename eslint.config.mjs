import globals from 'globals'

import {
  configs as standard
} from '@sequencemedia/eslint-config-standard'

import {
  configs as typescript
} from '@sequencemedia/eslint-config-typescript'

export default [
  {
    ...standard.recommended,
    files: [
      '**/*.{mjs,cjs,mts,cts}'
    ],
    ignores: [
      'test',
      'src'
    ],
    languageOptions: {
      ...standard.recommended.languageOptions,
      globals: {
        ...globals.node
      }
    }
  },
  {
    ...standard.recommended,
    files: [
      'src/**/*.{mjs,cjs,mts,cts}'
    ],
    languageOptions: {
      ...standard.recommended.languageOptions,
      globals: {
        ...globals.browser
      }
    }
  },
  {
    ...standard.recommended,
    files: [
      'test/**/*.{mjs,cjs,mts,cts}'
    ],
    languageOptions: {
      ...standard.recommended.languageOptions,
      globals: {
        ...globals.mocha
      }
    }
  },
  {
    ...typescript.recommended,
    files: [
      '**/*.{mts,cts}'
    ],
    ignores: [
      'test',
      'src'
    ],
    languageOptions: {
      ...typescript.recommended.languageOptions,
      globals: {
        ...globals.node
      }
    }
  },
  {
    ...typescript.recommended,
    files: [
      'src/**/*.{mts,cts}'
    ],
    languageOptions: {
      ...typescript.recommended.languageOptions,
      globals: {
        ...globals.browser
      }
    }
  },
  {
    ...typescript.recommended,
    files: [
      'test/**/*.{mts,cts}'
    ],
    languageOptions: {
      ...typescript.recommended.languageOptions,
      globals: {
        ...globals.mocha
      }
    }
  }
]
