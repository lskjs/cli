const { spawn: nativeSpawn } = require("child_process");

function spawn(command, args = [], options = {}) {
  const {
    trace = console.log, // eslint-disable-line no-console
    log = console.log, // eslint-disable-line no-console
    error = console.error, // eslint-disable-line no-console
    // cwd = process.cwd(),
    ...otherOptions
  } = options;

  if (trace) {
    trace(">>>");
    trace(">>>", command, args.join(" "));
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
      if (trace) {
        trace("<<< ", command, args.join(" "), `<<< ${code || ""}`);
        trace("<<<");
      }
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
