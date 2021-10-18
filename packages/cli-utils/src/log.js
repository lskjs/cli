const { Logger } = require('@lskjs/log');

const createLogger = (props = {}) =>
  new Logger({
    ns: 'cli',
    level: process.env.LOG_LEVEL || 'warn',
    ...props,
  });

const log = createLogger();

module.exports = { log, createLogger };
