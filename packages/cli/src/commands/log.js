#!/usr/bin/env node
const { Command } = require('@oclif/command');
const split = require('split');
const through = require('through');
const { Logger } = require('@lskjs/log2/Logger');
const { tryJSONparse } = require('@lskjs/log2/utils/tryJSONparse');

const log = new Logger();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { stdin } = process;

class LogCommand extends Command {
  async run() {
    process.stdin
      .pipe(split())
      .pipe(
        through(function (raw) {
          if (!raw) {
            this.emit('data', `${raw}\n`);
            return;
          }
          // console.log('raw', { raw });
          // this.emit('data', `${raw.toUpperCase()}\n`);

          // console.log(line.toUpperCase());
          const data = tryJSONparse(raw);
          if (data) {
            log.prettyLog(data);
            // console.log('======');
            // console.log({ data });
            // console.log('======');
          } else {
            log.log(raw);
          }
          // this.emit('data', `${raw.toUpperCase()}\n`);
        }),
      )
      .pipe(process.stdout);
  }
}

module.exports = LogCommand;
