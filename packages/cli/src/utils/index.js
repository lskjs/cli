/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
/* eslint-disable global-require */
const { getPaths } = require("./getPaths");
const { shell } = require("./shell");
const { run } = require("./run");
const { drawLogo } = require("./drawLogo");

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

module.exports = {
  getPaths,
  rootPath,
  packagePath,
  getLskConfig,
  hasCra,
  run,
  shell,
  drawLogo,
};
