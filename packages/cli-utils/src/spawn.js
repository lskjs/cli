const { spawn: nativeSpawn } = require('child_process');
const { createLogger } = require('./log');

// https://github.com/shelljs/shelljs/issues/86
// https://docs.google.com/document/d/1UFm10TONaNWok3aEPzUP_OjZ6lEvwlYqyJBUcugLfso/edit#heading=h.u8gil4dopy47

function spawn(command, args = [], options = {}) {
  const cwd = process.cwd();
  let [packageName] = cwd.split('/packages/').reverse();
  if (packageName[0] === '/') packageName = null;
  const logger = createLogger({
    name: packageName,
  });
  const {
    silence = false,
    debug = logger.debug.bind(logger), // eslint-disable-line no-console
    log = logger.debug.bind(logger), // eslint-disable-line no-console
    error = logger.error.bind(logger), // eslint-disable-line no-console
    fatal = logger.fatal.bind(logger), // eslint-disable-line no-console
    printCommand = (a) => a,
    // cwd = process.cwd(),
    ...otherOptions
  } = options;

  if (debug) {
    if (packageName && packageName[0] === '/') packageName = null;
    if (!silence && debug) debug(`${printCommand(command)}`, args.join(' '));
  }
  return new Promise((resolve, reject) => {
    const proc = nativeSpawn(command, args, otherOptions);
    if (proc.stdout) {
      proc.stdout.on('data', (data) => {
        const res = data.toString().trim();
        if (!silence && log) log(res);
      });
    }
    if (proc.stderr) {
      proc.stderr.on('data', (data) => {
        const res = data.toString().trim();
        if (!silence && error) error(res);
      });
    }
    proc.on('error', (err) => {
      if (!silence) {
        if (err && err.code === 'ENOENT') {
          fatal(`NO SUCH DIRECTORY: ${cwd}`, err);
          return;
        }
        if (!silence && fatal) fatal(err);
      }
      reject(err);
    });
    proc.on('exit', (code) => {
      // if (trace) {
      // trace("<<<", command, args.join(" "));
      // }
      if (!silence && code && fatal) fatal({ code });
      if (!code) {
        resolve(proc);
        return;
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ proc, code });
    });
  });
}

module.exports = {
  spawn,
};
