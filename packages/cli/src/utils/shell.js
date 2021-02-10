const { spawn: nativeSpawn } = require("child_process");
const { Logger } = require("@lskjs/log2");

// https://github.com/shelljs/shelljs/issues/86
// https://docs.google.com/document/d/1UFm10TONaNWok3aEPzUP_OjZ6lEvwlYqyJBUcugLfso/edit#heading=h.u8gil4dopy47

function spawn(command, args = [], options = {}) {
  const cwd = process.cwd();
  let [packageName] = cwd.split("/packages/").reverse();
  if (packageName[0] === "/") packageName = null;
  const logger = new Logger({
    ns: "cli",
    name: packageName,
  });
  const {
    debug = logger.debug.bind(logger), // eslint-disable-line no-console
    log = logger.debug.bind(logger), // eslint-disable-line no-console
    error = logger.error.bind(logger), // eslint-disable-line no-console
    fatal = logger.fatal.bind(logger), // eslint-disable-line no-console
    // cwd = process.cwd(),
    ...otherOptions
  } = options;

  if (debug) {
    if (packageName && packageName[0] === "/") packageName = null;
    debug(`${command}`, args.join(" "));
  }
  return new Promise((resolve, reject) => {
    const proc = nativeSpawn(command, args, otherOptions);
    if (proc.stdout) {
      proc.stdout.on("data", (data) => {
        const res = data.toString().trim();
        if (log) log(res);
      });
    }
    if (proc.stderr) {
      proc.stderr.on("data", (data) => {
        const res = data.toString().trim();
        if (error) error(res);
      });
    }
    proc.on("exit", (code) => {
      // if (trace) {
      // trace("<<<", command, args.join(" "));
      // }
      if (code) fatal({ code });
      if (!code) return resolve(proc);
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject({ proc, code });
    });
  });
}

function shell(command, initOptions = {}) {
  const { args = [], ...options } = initOptions;
  return spawn(command, args, {
    shell: true,
    stdio: "inherit",
    ...options,
  });
}

module.exports = {
  spawn,
  shell,
};
