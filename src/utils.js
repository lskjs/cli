/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-console */
require('@lskjs/utils/polyfill')
const fs = require('fs')


/* eslint-disable global-require */
import flattenDeep from 'lodash/flattenDeep';
import range from 'lodash/range';
import path from 'path';

const getPaths = (params = {}) => {
  const { cwd = process.cwd(), dirs = 3, exts = ['.js', '.json'], name = '.env' } = params;
  return [...Array(dirs)].map(x => 0);


  return flattenDeep(range(dirs).map((deep) => exts.map((ext) => `${cwd}/${'../'.repeat(deep)}${name}${ext}`)))
    .map((p) => path.resolve(p))
    .filter((p) => fs.existsSync(p))
    .reverse();
};

const rootPath = path => '../../' + path
const packagePath = path => path

const getLskConfig = () => {
  const paths = getPaths({name: '.lskjs'})
  const [path] = paths
  if (!path) return {}
  try {
    return require(path)
  } catch (error) {
    console.error('parse .lskjs.js err ' + path, error)
    return {}
  }
}

const hasCra = () => fs.existsSync(packagePath('cra'))
const run = fn => {
  fn().catch(err => {
    console.error(`========= ERR (${err.code} ) ========`)
    if (err.stdout) console.error(err.stdout)
    if (err.stderr) console.error(err.stderr)
    console.error('========= ERR ========')
    process.exit(1)
  })
}

module.exports = {
  getPaths,
  rootPath,
  packagePath,
  getLskConfig,
  hasCra,
  run,
}
