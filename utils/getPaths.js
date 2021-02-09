/* eslint-disable array-callback-return */
const path = require("path");

const fs = require("fs");

const getPaths = (params = {}) => {
  const {
    cwd = process.cwd(),
    dirs = 3,
    exts = [".js", ".json"],
    name = ".env",
  } = params;
  const paths = [];
  [...Array(dirs)].map((_, deep) => {
    const dir = `${cwd}/${"../".repeat(deep)}`;
    paths.push(...exts.map((ext) => path.resolve(`${dir}/${name}${ext}`)));
  });

  return paths.filter((p) => fs.existsSync(p)).reverse();
};

module.exports = {
  getPaths,
};
