#!/usr/bin/env node
const { run, shell, shellParallel } = require('@lskjs/cli-utils');

async function main({ isRoot, ctx } = {}) {
  if (isRoot) {
    await shellParallel(`lsk run buiild:ts`, { ctx });
    return ;
  } 
    await shell('tsup', { ctx });
  
}

module.exports = run(main);
