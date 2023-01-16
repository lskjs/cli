const { shell } = require('./shell');
const { lernaParallel } = require('./lernaParallel');
const { Err } = require('@lskjs/err');

async function shellParallel(command, options = {}) {
  const npmClient = options.npmClient || 'pnpm';
  if (npmClient === 'lerna') {
    return lernaParallel(`exec ${options.noPrefix ? '--no-prefix' : ''} -- ${command}`);
  }
  if (npmClient === 'pnpm') {
    return shell(`pnpm -r exec ${command}`);
  }

  throw new Err('LSK_NPM_CLIEN', `Unknown npmClient: ${npmClient}`);
}

module.exports = {
  shellParallel,
};
