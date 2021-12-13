#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitDownload = void 0;
/* eslint-disable max-len */
// @ts-ignore
const cli_utils_1 = require("@lskjs/cli-utils");
const err_1 = require("@lskjs/err");
// @ts-ignore
async function gitDownload(uri, { dest, depth = 1, rm = true } = {}) {
    if (!uri)
        throw new err_1.default('!uri');
    if (!dest)
        throw new err_1.default('!dest');
    let url;
    let git;
    let branch;
    try {
        url = new URL(uri);
    }
    catch (err) {
        git = 'https://github.com/lskjs/kit.git';
        branch = uri;
    }
    if (url) {
        if (url.hostname === 'github.com') {
            const paths = url.pathname.split('/');
            if (!paths[1])
                throw '!invalid url';
            git = `https://github.com/${paths[0]}/${paths[1]}.git`;
            if (paths[2] === 'tree') {
                // eslint-disable-next-line prefer-destructuring
                branch = paths[3];
            }
        }
        else {
            throw '!github';
        }
    }
    await (0, cli_utils_1.shell)(`git clone --depth=${depth} ${branch ? `-b ${branch}` : ''} ${git} ${dest}`);
    if (rm)
        await (0, cli_utils_1.shell)(`rm -rf ${dest}/.git`, { debug: 1 });
}
exports.gitDownload = gitDownload;
exports.default = gitDownload;
