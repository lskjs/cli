#!/usr/bin/env node
const { run, shell, findPath } = require('@lskjs/cli/utils');

const findExternal = (name) => findPath({ name, local: 0 });

const main = async () => {
  const filesPath = findExternal('files');
  const lightCopyFiles = [
    '.lskjs.js',
    '.all-contributorsrc',
    'docker-stack.yml',
    'docker-compose.yml',
    '.gitlab.ci.yml',
    '.github',
  ];
  const exclude = lightCopyFiles.map((file) => `--exclude ${file}`).join(' ');
  const copy = lightCopyFiles.map((file) => `${filesPath}/${file}`).join(' ');
  await shell(`rsync -aEp ${exclude} ${filesPath}/ .`);
  await shell(`rsync -aEp --ignore-existing ${copy} .`);

  // eslint-disable-next-line no-console
  console.log(`
===========================================
        All OK, now you need to do:
npm install && npm run bootstrap && npm run update
===========================================
  `);
};

run(main);
