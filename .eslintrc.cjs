module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    importScripts: 'readonly',
    __uv$config: 'readonly',
    UVServiceWorker: 'readonly',
    Dynamic: 'readonly',
    Ultraviolet: 'readonly',
    particlesJS: 'readonly',
    goBack: 'readonly',
    erudaToggle: 'readonly',
    goForward: 'readonly',
    reload: 'readonly',
    userKey: 'readonly',
  },
  ignorePatterns: ['/static/dy/', '/static/m/'],
}
