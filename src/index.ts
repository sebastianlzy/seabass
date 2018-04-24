import { Command, flags } from "@oclif/command";
import { runInDebugContext } from "vm";
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function createBranch(branchName: string) {
  console.log(`Created new branch : feature/${branchName}`);
  const { stdout, stderr } = await exec(
    `git checkout -b feature/${branchName}`
  );
}

async function rebaseBranch(branchName: string) {
  console.log(`Rebasing against origin ${branchName}`);
  const { stdout, stderr } = await exec(
    `git pull --rebase origin ${branchName}`
  );
}

async function listBranches() {
  console.log(`Listing all branches :`);
  const { stdout, stderr } = await exec("git branch");
  console.log(stdout);
}

async function deleteBranch(branchName: string) {
  console.log(`Deleting branch : ${branchName}`);
  const { stdout, stderr } = await exec(`git branch -d feature/${branchName}`);
}

async function gitHistory() {
  const { stdout, stderr } = await exec(
    "git log --oneline --abbrev-commit --all --graph --decorate --color -n 100"
  );
  console.log(stdout);
}

class RebaseToMaster extends Command {
  static description = "describe the command here";

  static args = [
    {
      name: "branchName",
      description: "input branch name"
    }
  ];

  static flags = {
    create: flags.boolean({ char: "c" }),
    rebase: flags.boolean({ char: "r" }),
    delete: flags.boolean({ char: "d" }),
    list: flags.boolean({ char: "l" }),
    history: flags.boolean({ char: "h" })
  };

  async run() {
    const { args, flags } = this.parse(RebaseToMaster);

    if (flags.create && args.branchName) {
      return createBranch(args.branchName);
    }
    if (flags.rebase && args.branchName) {
      return rebaseBranch(args.branchName);
    }
    if (flags.delete && args.branchName) {
      return deleteBranch(args.branchName);
    }
    if (flags.history) {
      return gitHistory();
    }
    if (flags.list) {
      return listBranches();
    }
  }
}

export = RebaseToMaster;
