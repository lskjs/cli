/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
/* eslint-disable global-require */
const { getPaths } = require("./getPaths");

const fs = require("fs");

const rootPath = (path) => `../../${path}`;
const packagePath = (path) => path;

const getLskConfig = () => {
  const paths = getPaths({ name: ".lskjs" });
  const [path] = paths;
  if (!path) return {};
  try {
    return require(path);
  } catch (error) {
    console.error(`parse .lskjs.js err ${path}`, error);
    return {};
  }
};

const hasCra = () => fs.existsSync(packagePath("cra"));
const run = (fn) => {
  fn().catch((err) => {
    console.error(`========= ERR (${err.code} ) ========`);
    if (err.stdout) console.error(err.stdout);
    if (err.stderr) console.error(err.stderr);
    console.error("========= ERR ========");
    process.exit(1);
  });
};

module.exports = {
  getPaths,
  rootPath,
  packagePath,
  getLskConfig,
  hasCra,
  run,
};
