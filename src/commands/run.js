require("@lskjs/utils/polyfill");
const { Command } = require("@oclif/command");
const fs = require("fs");
const path = require("path");
const { shell } = require("@lskjs/sh/shell");

const addExts = (file) => [
  `${file}.sh`,
  `${file}.js`,
  `${file}/run.sh`,
  `${file}/run.js`,
];

class RunCommand extends Command {
  async run() {
    const {
      args: { script: npmScriptName },
    } = this.parse(RunCommand);
    const script = npmScriptName.replace(/:/g, "-");

    const cwd = process.cwd();

    const isPackage = fs.existsSync(`${cwd}/../../lerna.json`);
    // const isPackage = !isLernaRoot
    const dirname = isPackage ? "package" : "run";
    const lernaRootCwd = `${cwd}${isPackage ? "/../.." : ""}`;
    const lskRootCwd = `${lernaRootCwd}/../lib-starter-kit`;

    const scriptPaths = [
      ...addExts(`${cwd}/scripts/${dirname}/${script}`),
      ...(isPackage
        ? addExts(`${lernaRootCwd}/scripts/${dirname}/${script}`)
        : []),
      ...addExts(`${lskRootCwd}/scripts/${dirname}/${script}`),
      ...addExts(
        `${lernaRootCwd}/node_modules/lsk/scripts/${dirname}/${script}`
      ),
    ].map((a) => path.resolve(a));
    const filtered = scriptPaths.filter((a) => fs.existsSync(a));

    // this.log({scriptPaths, filtered})

    const [scriptPath] = filtered;
    if (!scriptPath) {
      this.log("script path not found in paths: ", scriptPaths);
      this.error("scriptPath not found");
      this.exit(1);
      return;
    }
    // this.error('asdasdasd not found: ', scriptPaths)

    await shell(scriptPath, [], {
      log: this.log.bind(this),
      error: this.log.bind(this),
    });
  }
}

RunCommand.args = [
  {
    name: "script",
    required: true,
  },
];

module.exports = RunCommand;
