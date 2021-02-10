const { Command } = require("@oclif/command");
const fs = require("fs");
const { shell, findPath, getPaths } = require("@lskjs/cli-utils");

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

    const name = `scripts/${dirname}/${script}`;
    const pathOptions = {
      name,
      exts: [".sh", ".js"],
      nodemodules: 1,
      local: 1,
    };
    const scriptPath = findPath(pathOptions);

    if (!scriptPath) {
      this.log("script path not found in paths: ", getPaths(pathOptions));
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
