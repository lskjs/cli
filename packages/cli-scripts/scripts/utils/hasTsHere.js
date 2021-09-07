#!/usr/bin/env node
const { hasTs } = require('@lskjs/cli-utils');

const hasTsHere = async () => {
  const tsGrepPath = `${process.cwd()}/src/**/*.ts`;
  const isHasTs = hasTs(tsGrepPath) || hasTs(`${tsGrepPath}x`);
  return isHasTs;
};

module.exports = { hasTsHere };
