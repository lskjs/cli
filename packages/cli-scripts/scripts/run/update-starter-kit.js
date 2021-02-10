#!/usr/bin/env node
const { run, shell, findPath } = require('@lskjs/cli-utils');

const findExternal = (name) => findPath({ name, local: 0 });

const main = async () => {
  await shell(`rsync -aEp ${findExternal('files')}/ .`);
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
