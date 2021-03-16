#!/usr/bin/env node
const { run, findPath, findBin, shell } = require('@lskjs/cli-utils');

const main = async () => {
  const config = findPath('scripts/.all-contributors.json', {
    dirs: 1,
    nodemodules: 0,
  });
  if (!config) {
    await shell(`rm -rf scripts/templates/contributors.md`);
    return;
  }
  await shell(`${findBin('all-contributors')} generate --config ${config}`);
};

module.exports = run(main);
