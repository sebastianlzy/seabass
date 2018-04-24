import { Command, flags } from "@oclif/command";
import { runInDebugContext } from "vm";
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function createBranch(branchName: string) {
  console.log(`Created new branch : feature/${branchName}`);
  const { stdout, stderr } = await exec(
    `git checkout -b feature/${branchName}`
  );
  await list();
}

async function rebaseBranch(branchName: string) {
  console.log(`Rebasing against origin ${branchName}`);
  const { stdout, stderr } = await exec(
    `git pull --rebase origin ${branchName}`
  );
}

async function list() {
  console.log(`Listing all branches :`);
  const { stdout, stderr } = await exec("git branch");
  console.log(stdout);
}

async function deleteBranch(branchName: string) {
  console.log(`Deleting branch : ${branchName}`);
  const { stdout, stderr } = await exec(`git branch -d feature/${branchName}`);
}

class RebaseToMaster extends Command {
  static description = "describe the command here";

  static args = [
    {
      name: "branchName",
      required: true,
      description: "input the branch to be rebased on"
    }
  ];

  static flags = {
    create: flags.boolean({ char: "c" }),
    rebase: flags.boolean({ char: "r" }),
    delete: flags.boolean({ char: "d" })
  };

  async run() {
    const { args, flags } = this.parse(RebaseToMaster);
    if (flags.create) {
      createBranch(args.branchName);
    }
    if (flags.rebase) {
      rebaseBranch(args.branchName);
    }
    if (flags.delete) {
      deleteBranch(args.branchName);
    }
  }
}

export = RebaseToMaster;
