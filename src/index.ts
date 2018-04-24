import { Command, flags } from "@oclif/command";
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function createBranch(branchName: string) {
  const { stdout, stderr } = await exec(`git checkout -b ${branchName}`);
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}

class RebaseToMaster extends Command {
  static description = "describe the command here";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    name: flags.string({
      char: "b",
      description: "input the branch to be rebased on"
    }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "file" }];

  async run() {
    const { args, flags } = this.parse(RebaseToMaster);

    createBranch(args.name);
  }
}

export = RebaseToMaster;
