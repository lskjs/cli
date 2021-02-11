#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */
const { run, findPath, mergePackageJson } = require("@lskjs/cli-utils");

const main = async () => {
  const from = findPath("scripts/assets/package.json");
  if (!from) throw "CANT FIND package.json";
  await mergePackageJson(`${process.cwd()}/package.json`, from);
};

run(main);
