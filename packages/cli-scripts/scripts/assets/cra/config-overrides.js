/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved
const eslintConfig = require('../../../.eslintrc.js');
const path = require('path');

module.exports = function override(config) {
  const appPath = path.resolve(__dirname, '../');
  const srcPath = `${appPath}/src`;

  // Change entry point
  config.entry = `${srcPath}/index.js`;

  // Add resolve parent node_modules
  config.resolve.modules.push(`${appPath}/node_modules`);

  // Babel loader with runtime
  const bLWR = config.module.rules[1].oneOf[3];
  config.module.rules[1].oneOf[3].include = [srcPath];
  config.module.rules[1].oneOf[3].options = {
    babelrc: false,
    cacheIdentifier: bLWR.options.cacheIdentifier,
    cacheDirectory: true,
    cacheCompression: false,
    compact: false,
    configFile: `${appPath}/.babelrc.js`,
  };

  // Babel loader without runtime
  const bLWoR = config.module.rules[1].oneOf[2];
  config.module.rules[1].oneOf[2].test = /\.(jsx?|mjs)$/;
  config.module.rules[1].oneOf[2].type = 'javascript/auto'; // Shit hack from: https://github.com/thysultan/stylis.js/issues/254
  config.module.rules[1].oneOf[2].include = [srcPath];
  config.module.rules[1].oneOf[2].options = {
    babelrc: false,
    compact: false,
    configFile: `${appPath}/.babelrc.js`,
    cacheDirectory: true,
    cacheCompression: false,
    cacheIdentifier: bLWoR.options.cacheIdentifier,
    sourceMaps: true,
    inputSourceMap: true,
  };

  // ModuleNotFoundPlugin
  config.plugins[2].appPath = appPath;

  // WatchMissingNodeModulesPlugin
  config.plugins[7].nodeModulesPath = `${appPath}/node_modules`;

  // ESLintWebpackPlugin
  config.plugins[10].baseConfig = eslintConfig;

  // ModuleScopePlugin
  config.resolve.plugins[1].appSrcs[0] = srcPath;
  config.resolve.plugins[1].allowedFiles.add(`${appPath}/package.json`);

  return config;
};
