const { Logger } = require('@lskjs/log2');

const log = new Logger({
  ns: 'cli',
  level: process.env.LOG_LEVEL || 'warn',
});

module.exports = { log };
