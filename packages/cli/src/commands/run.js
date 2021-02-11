const { Command, flags } = require("@oclif/command");
const fs = require("fs");
const { shell, findPath, getPaths } = require("@lskjs/cli-utils");

class RunCommand extends Command {
  async run() {
    if (process.env.DEBUG) {
      this.log("> run ");
    }
    const {
      args: { script: npmScriptName },
      flags: { explain },
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
    const paths = getPaths(pathOptions);
    const scriptPath = findPath(pathOptions);

    if (scriptPath) {
      if (explain) {
        this.log(`script path found  ${scriptPath} in paths: `, paths);
      }
    } else {
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

RunCommand.flags = {
  explain: flags.string({
    char: "e",
    description: "explain of path",
  }),
};

module.exports = RunCommand;
