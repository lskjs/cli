#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const { run, shellParallel, getCwdInfo, shell, findBin } = require('@lskjs/cli-utils');
const { omitNull, mapValues } = require('@lskjs/algos');

const main = async ({ isRoot, args, log, cwd, ctx } = {}) => {
  if (isRoot) {
    await shellParallel(`lsk run fix ${args.join(' ')}`, { ctx });
  }
  const pack = require(`${cwd}/package.json`);

  if (args.includes('--workspaceDeps')) {
    pack.dependencies = omitNull(
      mapValues(pack.dependencies, (v) => {
        if (v.startsWith('workspace:')) return v.slice('workspace:'.length);
        return v;
      }),
    );
  }

  if (args.includes('--package')) {
    const { isLib, isTs } = getCwdInfo({ cwd });
    if (!pack.scripts) {
      if (isLib) {
        pack.scripts = {
          build: '          lsk run build',
          dev: '            lsk run dev',
          release: '        lsk run release',
          test: '           lsk run test',
        };
      } else {
        pack.scripts = {
          start: '          lsk run start',
          build: '          lsk run build',
          dev: '            lsk run dev',
          release: '        lsk run release',
          test: '           lsk run test',
        };
      }
    }
    if (!pack.eslintconfig) {
      pack.eslintconfig = {
        extends: '@lskjs/eslint-config',
      };
    }
    if (!pack.dependencies) {
      pack.dependencies = {};
    }
    if (!pack.devDependencies) {
      pack.devDependencies = {};
    }

    if (isLib) {
      if (!pack.main) pack.main = 'lib/index.js';
      if (isTs && !pack.types) pack.main = 'lib/index.d.ts';
      if (!pack.exports) {
        pack.exports = {
          '.': {
            import: './lib/index.mjs',
            types: './lib/index.d.ts',
            default: './lib/index.js',
          },
          './*': {
            import: './lib/*.mjs',
            types: './lib/*.d.ts',
            default: './lib/*.js',
          },
        };
      }
      if (!pack['size-limit']) {
        pack['size-limit'] = [
          {
            path: 'lib/index.js',
            limit: '1kb',
          },
        ];
      }
      if (!pack.description) {
        log.error('!description');
      }
      if (!pack.keywords || !pack.keywords.length) {
        log.error('!keywords');
      }
      if (!pack.files) {
        pack.files = ['lib', 'README.md', 'LICENCE'];
      }
      if (!pack.license && pack.access === 'public') {
        pack.license = 'MIT';
      }
      if (!pack.author || pack.author.includes('Igor Suvorov')) {
        pack.author = 'Igor Suvorov <hi@isuvorov.com> (https://github.com/isuvorov)';
      }
      if (!pack.access && pack.publishConfig && pack.publishConfig.access) {
        pack.access = pack.publishConfig.access;
        delete pack.publishConfig.access;
        delete pack.publishConfig.registry;
        if (Object.keys(pack.publishConfig).length === 0) delete pack.publishConfig;
      }

      if (!pack.repository) {
        // TODO:
        // "homepage": "https://github.com/isuvorov/macrobe",
        // "repository": "https://github.com/isuvorov/macrobe",
        // "bugs": "http://github.com/isuvorov/macrobe/issues",
      }
      delete pack.jest;
    }
    if (!pack.workspaces) {
      pack.workspaces = ['packages/*'];
    }
    await shell(`${findBin('eslint')} --fix package.json`, { ctx });
  }
};

module.exports = run(main);

// await shell('rm -rf ./lib/* ./coverage ./package', { ctx });
