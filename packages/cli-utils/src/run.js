const { Logger } = require('@lskjs/log2');

const logger = new Logger({
  ns: 'cli',
});

const run = (fn) => {
  const [shell, filename, ...argv] = process.argv;
  fn({ shell, filename, argv }).catch((err) => {
    logger.fatal(`========= ERR${err.code ? ` (CODE: ${err.code})` : ''} =======`);
    if (!err.code) logger.error(err);
    if (err.stdout) logger.error(err.stdout);
    if (err.stderr) logger.error(err.stderr);
    process.exit(1);
  });
};

module.exports = {
  run,
};
