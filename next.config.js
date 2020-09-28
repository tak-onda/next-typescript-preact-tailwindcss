const withPrefresh = require('@prefresh/next')
const path = require('path')

/**
 * @see https://github.com/JoviDeCroock/prefresh/blob/main/packages/next/example/next.config.js
 */
module.exports = withPrefresh({
  experimental: {
    modern: true,
    polyfillsOptimization: true,
  },

  webpack(config, { dev, isServer }) {
    const splitChunks = config.optimization && config.optimization.splitChunks
    if (splitChunks) {
      const cacheGroups = splitChunks.cacheGroups
      const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
      if (cacheGroups.framework) {
        cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
          test: preactModules,
        })
        cacheGroups.commons.name = 'framework'
      } else {
        cacheGroups.preact = {
          name: 'commons',
          chunks: 'all',
          test: preactModules,
        }
      }
    }

    // if (isServer) {
    //   // mark `preact` stuffs as external for server bundle to prevent duplicate copies of preact
    //   config.externals.push(
    //     /^(preact|preact-render-to-string|preact-context-provider)([\\/]|$)/
    //   )
    // }

    // Install webpack aliases:
    const aliases = config.resolve.alias || (config.resolve.alias = {})
    aliases.react = aliases['react-dom'] = 'preact/compat'
    aliases.preact = path.resolve(__dirname, 'node_modules', 'preact')

    // inject Preact DevTools
    if (dev && !isServer) {
      const entry = config.entry
      config.entry = () =>
        entry().then((entries) => {
          entries['main.js'] = ['preact/debug'].concat(entries['main.js'] || [])
          return entries
        })
    }

    return config
  },
})
