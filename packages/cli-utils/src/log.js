const { Logger } = require('@lskjs/log');

const level = (process.env.DEBUG || '').includes('lsk') ? 'trace' : process.env.LOG_LEVEL || 'debug';
const createLogger = (props = {}) =>
  new Logger({
    ns: 'cli',
    level,
    ...props,
  });

const log = createLogger();

module.exports = { log, createLogger };
