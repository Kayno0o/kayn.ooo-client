const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  rules: {
    'prefer-global/process': 'off',
    'node/prefer-global/process': 'off',
  },
})
