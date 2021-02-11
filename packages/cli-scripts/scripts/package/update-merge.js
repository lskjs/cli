#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */
const { run, findPath, mergePackageJson } = require('@lskjs/cli-utils');

const main = async () => {
  await mergePackageJson(`${process.cwd()}/package.json`, findPath('/assets/package.json'));
};

run(main);
