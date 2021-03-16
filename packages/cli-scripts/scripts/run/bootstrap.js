#!/usr/bin/env node
const { shell, run, getLskConfig, findBin } = require('@lskjs/cli-utils');

const main = async () => {
  const config = getLskConfig();
  if (config && config.storybook) {
    await shell('lsk run bootstrap:storybook');
  }
  await shell(`${findBin('lerna')} exec --parallel --no-prefix -- lsk run bootstrap`);
};

run(main);
