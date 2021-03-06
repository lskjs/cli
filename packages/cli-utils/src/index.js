const { getPaths } = require('./getPaths');
const { checkSoft } = require('./checkSoft');
const { log } = require('./log');
const { findPaths } = require('./findPaths');
const { findPath } = require('./findPath');
const { findBin } = require('./findBin');
const { shell } = require('./shell');
const { rsync } = require('./rsync');
const { run } = require('./run');
const { replaceAll } = require('./replaceAll');
const { drawLogo } = require('./drawLogo');
const { getLskConfig } = require('./getLskConfig');
const { getNpmGlobal } = require('./getNpmGlobal');
const { rootPath } = require('./rootPath');
const { packagePath } = require('./packagePath');
const { hasCra } = require('./hasCra');
const { isDev } = require('./isDev');
const { isDebug } = require('./isDebug');
const { hasTs } = require('./hasTs');
const { mergePackageJson } = require('./mergePackageJson');
const { lerna } = require('./lerna');

module.exports = {
  mergePackageJson,
  hasTs,
  isDev,
  isDebug,
  getPaths,
  findPaths,
  findPath,
  findBin,
  lerna,
  rootPath,
  packagePath,
  getLskConfig,
  getNpmGlobal,
  hasCra,
  run,
  replaceAll,
  shell,
  rsync,
  drawLogo,
  checkSoft,
  log,
};
