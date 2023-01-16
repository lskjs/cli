// @ts-ignore
const { existsSync } = require('fs');
const path = require('path');

// TODO: передалать универсально
const isRoot = ({ cwd }) => existsSync(`${cwd}/lerna.json`) || existsSync(`${cwd}/pnpm-workspace.yaml`);

const getRootPath = ({ cwd: packageCwd }) => {
  let cwd = packageCwd;
  for (let i = 0; i < 10; i += 1) {
    // console.log('[getRootPath]', { packageCwd, cwd, i });
    if (isRoot({ cwd })) return cwd;
    cwd = path.resolve(`${cwd}/..`);
    if (cwd === '/') return null;
  }
  return null;
};

// TODO: передалать универсально
const isPackage = ({ cwd }) => !isRoot({ cwd }) && !!getRootPath({ cwd });

// TODO: передалать универсально
const getPackageName = ({ cwd }) => {
  const rootPath = getRootPath({ cwd }) || cwd;
  const packageName = cwd.substr(rootPath.length + 1);
  return packageName;
};

const getCwdInfo = ({ cwd }) => {
  const isJs = existsSync(`${cwd}/.babelrc`);
  const isTs = existsSync(`${cwd}/tsconfig.json`);
  // eslint-disable-next-line import/no-dynamic-require
  const isLib = !!require(`${cwd}/package.json`).scripts?.start;
  const isNest = existsSync(`${cwd}/nest-cli.json`);
  // const isRoot = isRoot({ cwd });
  // const isPackage = isPackage({ cwd });
  // const isApp = isPackage && !isLib;
  // const isModule = isPackage && isLib;
  // const isWorkspace = isRoot &
  return { isJs, isTs, isLib, isNest, isRoot: isRoot({ cwd }) };
};

module.exports = {
  isRoot,
  getRootPath,
  isPackage,
  getPackageName,
  getCwdInfo,
};
