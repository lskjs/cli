const { shell } = require('./shell');
const fs = require('fs');

function rsync(from, to, { options = '-aEp', cwd, ignoreMissingFiles } = {}) {
  // eslint-disable-next-line no-param-reassign
  if (!cwd) cwd = process.cwd();
  // const cwd = options.cwd || process.cwd();
  if (!to) throw '!to';
  let items = [];
  if (Array.isArray(from)) {
    items = from;
  } else if (typeof from === 'string') {
    items = from.trim().split(' ').filter(Boolean);
  }
  if (!items.length) throw '!from';
  if (ignoreMissingFiles) {
    items = items.filter((p) => fs.existsSync(p));
  }
  const paths = items.join(' ');
  if (!paths) return null;

  return shell(`rsync ${options} ${paths} ${to}`);
}

module.exports = { rsync };
