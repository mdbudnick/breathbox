module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false
        }
      ],
      'babel-preset-expo',
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-typescript',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties'
    ],
    env: {
      production: {
        only: ['src'],
        plugins: [
          [
            'transform-react-remove-prop-types',
            {
              removeImport: true
            }
          ],
          '@babel/plugin-transform-react-inline-elements',
          '@babel/plugin-transform-react-constant-elements'
        ]
      }
    }
  }
}
