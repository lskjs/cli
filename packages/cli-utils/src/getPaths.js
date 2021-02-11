/* eslint-disable array-callback-return */
const path = require("path");

const getPaths = (params = {}) => {
  // eslint-disable-next-line no-param-reassign
  if (typeof params === "string") params = { name: params };
  let { exts } = params;
  const {
    cwd = process.cwd(),
    dirs = 3,
    local = true,
    nodemodules = true,
    name = "",
  } = params;

  const globalNodemodules = [
    process.env.NPM_PACKAGES ? `${process.env.NPM_PACKAGES}/lib` : null,
    `/usr/local/lib`,
  ].filter(Boolean); // TODO: npm root -g
  const nodemodulesSuffix = "/node_modules/@lskjs/cli-scripts";

  if (!exts) exts = [""];
  const paths = [];
  if (local) {
    [...Array(dirs)].map((_, deep) => {
      const dir = `${cwd}/${"../".repeat(deep)}`;
      paths.push(...exts.map((ext) => path.resolve(`${dir}/${name}${ext}`)));
      if (nodemodules) {
        paths.push(
          ...exts.map((ext) =>
            path.resolve(`${dir}/${nodemodulesSuffix}/${name}${ext}`)
          )
        );
      }
    });
  }
  if (nodemodules) {
    paths.push(
      ...exts.map((ext) =>
        path.resolve(
          `${process.env.HOME}/projects/lskjs-cli/packages/cli-scripts/${name}${ext}`
        )
      )
    );
    globalNodemodules.forEach((dir) => {
      paths.push(
        ...exts.map((ext) =>
          path.resolve(`${dir}${nodemodulesSuffix}/${name}${ext}`)
        )
      );
    });
    globalNodemodules.forEach((dir) => {
      paths.push(
        ...exts.map((ext) =>
          path.resolve(
            `${dir}/node_modules/@lskjs/cli/${nodemodulesSuffix}/${name}${ext}`
          )
        )
      );
    });
    globalNodemodules.forEach((dir) => {
      paths.push(
        ...exts.map((ext) =>
          path.resolve(
            `${dir}/node_modules/lsk/node_modules/@lskjs/cli/${nodemodulesSuffix}/${name}${ext}`
          )
        )
      );
    });
  }

  return paths;
};

module.exports = {
  getPaths,
};
