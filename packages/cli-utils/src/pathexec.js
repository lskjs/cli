// @ts-ignore
const { existsSync } = require('fs');
const path = require('path');

const { findPath } = require('./findPaths');
const { getPaths } = require('./getPaths');
const { createLogger } = require('./log');

// const { shell } = require('./shell');

// TODO: передалать универсально
const isRoot = ({ cwd }) => existsSync(`${cwd}/lerna.json`) || existsSync(`${cwd}/pnp-workspace.yaml`);
const getRootPath = ({ cwd: packageCwd }) => {
  let cwd = packageCwd;
  for (let i = 0; i < 10; i += 1) {
    // console.log('[getRootPath]', { packageCwd, cwd, i });
    if (isRoot({ cwd })) return cwd;
    cwd = path.resolve(`${cwd}/..`);
    if (cwd === '/') return null;
  }
  return null;
};

// TODO: передалать универсально
const isPackage = ({ cwd }) => !isRoot({ cwd }) && !!getRootPath({ cwd });

// TODO: передалать универсально
const getPackageName = ({ cwd }) => {
  const rootPath = getRootPath({ cwd }) || cwd;
  const packageName = cwd.substr(rootPath.length + 1);
  return packageName;
};

// pathexec some-script arg1 arg2 -- some bare args

// Execute some of node.js script from PATHS

// principles
// 1. if script is not found in paths - throw error

// 2. can run directly by path
// pathexec ./some-script arg1 arg2 -- some bare args

// command - script name that will find in paths and execute
// options.name  - name of package
// options.cwd - current working directory
// options.log || options.logger - logger

async function pathexec(command, options = {}) {
  // console.time('[pathexec]');
  // console.time('[pathexec] 1');
  const cwd = options.cwd || process.cwd();
  // console.log('[pathexec]', command, options, { cwd });
  let [script, ...args] = command.trim().split(' ').filter(Boolean);
  process.env.pathexec = { cwd };
  const packageName = options.name || getPackageName({ cwd });
  // if (args.length > 0) {
  //   console.log('args length > 0', args);
  //   // throw new Error('shell length > 0');
  // }
  script = script.replace(/:/g, '-');
  const log =
    options.log ||
    options.logger ||
    createLogger({
      name: packageName,
    });
  // console.timeEnd('[pathexec] 1');
  // console.time('[pathexec] 2');
  const {
    explain = false,
    silence = false,
    // debug = logger.debug.bind(logger), // eslint-disable-line no-console
    // log = logger.debug.bind(logger), // eslint-disable-line no-console
    // error = logger.error.bind(logger), // eslint-disable-line no-console
    // fatal = logger.fatal.bind(logger), // eslint-disable-line no-console
    printCommand = (a) => `lsk run ${a}`,
    // cwd = process.cwd(),
    // ...otherOptions
  } = options;

  // if (packageName && packageName[0] === '/') packageName = null;
  if (!silence) log.debug(`[>>] ${printCommand(command)}`, args.join(' '));

  // const argv = str.split(' ');
  // console.log('argv', argv);
  // let barePos = argv.indexOf('--');
  // const isRealBare = barePos === -1;
  // if (barePos === -1) {
  //   barePos = 0;
  // }
  // const argv = argv.slice(0, isRealBare ? 1 : barePos);
  // const bareArgv = argv.slice(barePos + 1);
  // const bareArgv = [];

  // console.log({argv,bareArgv })

  // const {
  //   args: { script: npmScriptName },
  //   flags: { explain },
  // } = this.parse(RunCommand, argv);
  // const script = npmScriptName.replace(/:/g, '-');

  // const isPackage = !isLernaRoot

  // console.time('[isPackage]');
  const dirname = isPackage({ cwd }) ? 'package' : 'run';
  // console.timeEnd('[isPackage]');

  const name = `scripts/${dirname}/${script}`;
  const pathOptions = {
    name,
    exts: ['.sh', '.js'],
    nodemodules: 1,
    local: 1,
  };
  // console.time('[getPaths]');
  // console.timeEnd('[getPaths]');
  // console.log({ paths });
  // console.time('[findPath]');
  const scriptPath = findPath(pathOptions);
  // console.timeEnd('[findPath]');
  // console.log({ scriptPath });
  // console.timeEnd('[pathexec] 2');

  if (scriptPath) {
    if (explain) {
      const paths = getPaths(pathOptions);
      log.error(`script path found  ${scriptPath} in paths: `, paths, pathOptions);
    }
  } else {
    const paths = getPaths(pathOptions);
    log.error(`script path found ${scriptPath} in paths: `, paths, pathOptions);
    throw new Error(`incorrectScriptPath`, {
      data: {
        pathOptions,
        paths: getPaths(pathOptions),
      },
    });
    // this.error('scriptPath not found');
    // this.exit(1);
    return;
  }
  // const cmd = [scriptPath, ...bareArgv].join(' ');

  // TODO: catch errors and log
  let res;
  try {
    // log.trace('[pathexec] START', command, { scriptPath, cwd, args, options });
    // eslint-disable-next-line import/no-dynamic-require
    const content = await require(scriptPath);
    if (!content) {
      return;
    }
    let runnable;
    if (typeof content === 'function') {
      runnable = content;
    } else if (content?.run && typeof content.run === 'function') {
      runnable = content.run;
    } else if (content?.main && typeof content.main === 'function') {
      runnable = content.main;
    }
    // console.log('[runnable]', content, runnable);
    if (runnable) {
      res = await runnable({ cwd, args, options });
    }
    // log.trace('[pathexec] FINISH', command, { scriptPath, cwd, args, options });
  } catch (err) {
    console.log('err', err);
    throw err;
  }
  // console.timeEnd('[pathexec]');
  return res;

  // return new Promise((resolve, reject) => {
  //   const proc = nativeSpawn(command, args, otherOptions);
  //   if (proc.stdout) {
  //     proc.stdout.on('data', (data) => {
  //       const res = data.toString().trim();
  //       if (!silence && log) log(res);
  //     });
  //   }
  //   if (proc.stderr) {
  //     proc.stderr.on('data', (data) => {
  //       const res = data.toString().trim();
  //       if (!silence && error) error(res);
  //     });
  //   }
  //   proc.on('error', (err) => {
  //     if (!silence) {
  //       if (err && err.code === 'ENOENT') {
  //         fatal(`NO SUCH DIRECTORY: ${cwd}`, err);
  //         return;
  //       }
  //       if (!silence && fatal) fatal(err);
  //     }
  //     reject(err);
  //   });
  //   proc.on('exit', (code) => {
  //     // if (trace) {
  //     // trace("<<<", command, args.join(" "));
  //     // }
  //     if (!silence && code && fatal) fatal({ code });
  //     if (!code) {
  //       resolve(proc);
  //       return;
  //     }
  //     // eslint-disable-next-line prefer-promise-reject-errors
  //     reject({ proc, code });
  //   });
  // });

  // console.log({cmd});
  // await shell(cmd, {
  //   log: log.bind(this),
  //   error: log.bind(this),
  //   printCommand: (command) => {
  //     if (isDebug()) return command;
  //     let str = command;
  //     str = replaceAll(str, `${cwd}/`, '');
  //     str = replaceAll(command, cwd, '.');
  //     str = replaceAll(command, 'node_modules/', '');
  //     return str;
  //   },
  // });
}

module.exports = {
  pathexec,
};
