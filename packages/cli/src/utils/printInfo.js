function printInfo(ctx) {
  ctx.log('Version: ', ctx.config.version);
  ctx.log('System:  ', ctx.config.userAgent);
  ctx.log('Path:    ', __dirname);
  ctx.log('Root:    ', ctx.config.root);
  // ctx.log("Scripts: ", ctx.config.version);
  // ctx.log("Scripts: ", ctx.config.version);
  ctx.log('Cwd:     ', process.cwd());
  // eslint-disable-next-line no-console
  if (process.env.DEBUG) console.log(ctx.config);
}

module.exports = { printInfo };
