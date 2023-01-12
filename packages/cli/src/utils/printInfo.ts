// @ts-ignore
export function printInfo({ config, log } = {}) {
  log('Version:  ', config.version);
  log('System:   ', config.userAgent);
  log('Root:     ', config.root);
  // log("Scripts: ", config.version);
  // log("Scripts: ", config.version);
  log('Cwd:      ', process.cwd());
  log('printInfo:', __dirname);
  // eslint-disable-next-line no-console
  if (process.env.DEBUG) console.log(config);
}

export default printInfo;
