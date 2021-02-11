/* eslint-disable import/no-dynamic-require */
const pickBy = require("lodash/pickBy");
const omit = require("lodash/omit");
const isPlainObject = require("lodash/isPlainObject");
const { omitNull, isNotNull } = require("@lskjs/utils/omitNull");

// TODO: отказаться от utils и lodash

const omitNullOrEmpty = (items) =>
  pickBy(items, (item) => {
    if (!isNotNull(item)) return false;
    if (isPlainObject(item)) return !!Object.keys(item).length;
    return true;
  });

const mergePackageJson = (target, base) => {
  const json = require(target);
  const baseJson = require(base);
  const newJson = omitNullOrEmpty({
    ...omit(baseJson, [
      "scripts",
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ]),
    ...json,
    scripts: omitNull({
      ...(json.scripts || {}),
      ...(baseJson.scripts || {}),
    }),
    dependencies: omitNull({
      ...(json.dependencies || {}),
      ...(baseJson.dependencies || {}),
    }),
    devDependencies: omitNull({
      ...(json.devDependencies || {}),
      ...(baseJson.devDependencies || {}),
    }),
    peerDependencies: omitNull({
      ...(json.peerDependencies || {}),
      ...(baseJson.peerDependencies || {}),
    }),
    optionalDependencies: omitNull({
      ...(json.optionalDependencies || {}),
      ...(baseJson.optionalDependencies || {}),
    }),
  });
  require("fs").writeFileSync(
    "./package.json",
    JSON.stringify(newJson, null, 2)
  );
};

module.exports = {
  mergePackageJson,
};
