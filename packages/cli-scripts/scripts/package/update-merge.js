#!/usr/bin/env node
const pickBy = require('lodash/pickBy');
const omit = require('lodash/omit');
const isPlainObject = require('lodash/isPlainObject');
const { omitNull, isNotNull } = require('@lskjs/utils/omitNull');

const omitNullOrEmpty = (items) =>
  pickBy(items, (item) => {
    if (!isNotNull(item)) return false;
    if (isPlainObject(item)) return !!Object.keys(item).length;
    return true;
  });

const json = require(process.cwd() + '/package.json'); // eslint-disable-line
const baseJson = require(__dirname + '/../assets/package.json'); // eslint-disable-line

const newJson = omitNullOrEmpty({
  ...omit(baseJson, ['scripts', 'dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']),
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

require('fs').writeFileSync('./package.json', JSON.stringify(newJson, null, 2));
