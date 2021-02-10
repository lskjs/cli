#!/usr/bin/env node
const { run, shell, findPath } = require('@lskjs/cli/utils');

const findExternal = (name) => findPath({ name, local: 0 });

const main = async () => {
  // await shell(`rm -rf scripts/assets scripts/opt scripts/package scripts/run scripts/utils scripts/update-starter-kit`);
  await shell(
    `rsync -aEp --exclude-from='${findPath('scripts/hooks/update-starter-kit-exclude.txt')}' ${findExternal('')}/ .`,
  );
  const lightCopyFiles = [
    '.lskjs.js',
    '.all-contributorsrc',
    'docker-stack.yml',
    'docker-compose.yml',
    '.gitlab.ci.yml',
    '.github',
  ]
    .map(findExternal)
    .join(' ');
  // await shell(`rsync -aEp --ignore-existing ${lightCopyFiles} .`);
  // await shell(`rsync -aEp ${findExternal('scripts/assets')}/ ./scripts/assets`);

  // eslint-disable-next-line no-console
  console.log(`
===========================================
        All OK, now you need to do:
npm install && npm run bootstrap && npm run update
===========================================
  `);
};

run(main);
