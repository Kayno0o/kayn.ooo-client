const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  rules: {
    'prefer-global/process': false,
  },
})
