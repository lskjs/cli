#!/usr/bin/env node
const { run, shell, findPath } = require('@lskjs/cli-utils');

const findExternal = (name) => findPath({ name, local: 0 });

const main = async () => {
  await shell(
    // eslint-disable-next-line max-len
    `rm -rf .all-contributorsrc .czrc.js .eslintrc-package.js .lintstagedrc.js .huskyrc.json .release-it.js .remarkrc.js Dockerfile jsconfig.json styleguide.config.js coverage`,
  );
  await shell(`rsync -aEp --exclude CHANGELOG.md --exclude node_modules ${findExternal('files')}/ .`);
  await shell(`rsync -aEp --ignore-existing ${findExternal('softFiles')}/ .`);
  // eslint-disable-next-line no-console
  console.log(`
===========================================
        All OK, now you need to do:
npm install && npm run bootstrap && npm run update
===========================================
  `);
};

run(main);
