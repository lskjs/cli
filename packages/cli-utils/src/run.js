const { log } = require('./log');

const run = async (main) => {
  if (!process.pathexec) process.pathexec = {};
  let isRootRun = false;
  if (!process.pathexec.rootRun) {
    isRootRun = true;
    const [shell, filename, ...args] = process.argv;
    process.pathexec.rootRun = {
      shell,
      filename,
      args,
    };
  }

  // TODO: context
  // const options = { asdasd: 12312 };

  const runnable = (props = {}) => {  //eslint-disable-line
    // let props = {};
    // if (isRootRun) {
    //   props.rootRun = process.pathexec.rootRun;
    //   props.args = props.rootRun.args;
    // } else {
    //   props = options2;
    // }
    // const props = { shell, filename, args, argv: process.argv };
    // console.log('run CONTEXT?', { shell, filename, args, options2, props });
    // console.log('run CONTEXT?', { options2, props });
    return main(props).catch((err) => {
      console.log(err, props);
      log.fatal(`========= ERR${err.code ? ` (CODE: ${err.code})` : ''}  ${123} filename?? =======`);
      if (!err.code) log.error(err);
      if (err.stdout) log.error(err.stdout);
      if (err.stderr) log.error(err.stderr);
      process.exit(1);
    });
  };

  if (isRootRun) {
    const props = {
      rootRun: process.pathexec.rootRun,
      args: process.pathexec.rootRun.args,
    };
    return runnable(props);
  }
  return { main: runnable };
};

module.exports = {
  run,
};
