"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printInfo = void 0;
// @ts-ignore
function printInfo({ config, log } = {}) {
    log('Version:  ', config.version);
    log('System:   ', config.userAgent);
    log('Root:     ', config.root);
    // log("Scripts: ", config.version);
    // log("Scripts: ", config.version);
    log('Cwd:      ', process.cwd());
    log('printInfo:', __dirname);
    // eslint-disable-next-line no-console
    if (process.env.DEBUG)
        console.log(config);
}
exports.printInfo = printInfo;
exports.default = printInfo;
