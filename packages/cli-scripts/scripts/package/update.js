#!/usr/bin/env node

const { shell } = require('@lskjs/cli-utils');
const { run, hasCra, rootPath, packagePath } = require('@lskjs/cli-utils');

const main = async () => {
  await shell(
    // eslint-disable-next-line max-len
    'rm -rf .babelrc .babelrc.js .eslintrc.js styleguide.config.js tsconfig.json tsconfig.types.json .storybook bump.txt .storybook',
  );

  const files = ['tsconfig.json', 'tsconfig.types.json', '.babelrc.js'].map(rootPath).join(' ');
  await shell(`rsync -aEp ${files} ${packagePath('.')}`);
  await shell(`lsk run update:merge`);
  if (hasCra()) {
    await shell(`lsk run update:cra`);
  }
  await shell(`lsk run npm:update`);
};
run(main);
