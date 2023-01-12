const { spawn } = require('./spawn');
const { pathexec } = require('./pathexec');

function shell(command, initOptions = {}) {
  if (command.startsWith('lsk run ')) {
    return pathexec(command.slice('lsk run '.length), initOptions);
  }
  if (command.startsWith('pathexec ')) {
    return pathexec(command.slice('pathexec '.length), initOptions);
  }
  const { args = [], ...options } = initOptions;
  return spawn(command, args, {
    shell: true,
    stdio: 'inherit',
    ...options,
  });
}

module.exports = {
  shell,
};
