const Bluebird = require('bluebird');
const { log } = require('./log');
const { shell } = require('./shell');

async function checkSoft(name) {
  if (Array.isArray(name)) return Bluebird.each(name, checkSoft);
  return shell(`where ${name}`, { silence: true }).catch((err) => {
    if (err.code !== 127) {
      log.fatal(err);
      return;
    }
    if (name === 'watchexec') {
      log.fatal(
        `Command "${name}" not found. 
        
Try to install it: 
>>> brew install watchexec <<<

More info: https://github.com/watchexec/watchexec
`,
      );
      return;
    }
    log.fatal(`Command ${name} not found`);
  });
}

module.exports = { checkSoft };
