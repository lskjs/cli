const { log } = require('./log');

const run = (fn) => {
  const [shell, filename, ...argv] = process.argv;
  fn({ shell, filename, argv }).catch((err) => {
    log.fatal(`========= ERR${err.code ? ` (CODE: ${err.code})` : ''} =======`);
    if (!err.code) log.error(err);
    if (err.stdout) log.error(err.stdout);
    if (err.stderr) log.error(err.stderr);
    process.exit(1);
  });
};

module.exports = {
  run,
};
