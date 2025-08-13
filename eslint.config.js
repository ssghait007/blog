import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: false,
  },
  dirs: {
    src: [
      './components',
      './composables',
      './layouts',
      './pages',
      './plugins',
      './utils'
    ]
  }
}).append(
  // Custom rules for optimization
  {
    rules: {
      // Warn about unused variables and imports
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',

      // Prefer modern JavaScript features
      'prefer-const': 'warn',
      'no-var': 'error',

      // Vue specific optimizations
      'vue/no-unused-vars': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/multi-word-component-names': 'off'


    }
  }
)
