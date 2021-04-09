const { Logger } = require('@lskjs/log2');

const log = new Logger({
  ns: 'cli',
});

module.exports = { log };
