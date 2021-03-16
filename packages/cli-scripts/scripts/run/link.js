#!/usr/bin/env node
/* eslint-disable no-console */
const { run, shell } = require('@lskjs/cli-utils');

const main = async () => {
  console.log('You can override me here: scrips/run/link.js');
  console.log('========== EXAMPLE  START ==========');
  await shell(`cat ${__dirname}/../hooks/link-all.js`);
  console.log('========== EXAMPLE FINISH ==========');
};

run(main);
