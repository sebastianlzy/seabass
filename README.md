# Seabass CLI

A list of commonly use CLI

<!-- toc -->

# Usage

<!-- usage -->

1.  npm install -g seabass

# Commands

<!-- commands -->

`seabass <flag> <branchName>`

### --rebase <branchName>

`seabass -r master`

This allows you to rebase your current branch on top of master. NOTE: Rebase will overwrites history to form a easy to read tree structure

### --create <branchName>

`seabass -c new-branch`

This allows you to create new branch which adhere to the format `feature/<branchName>`

### --delete <branchName>

`seabass -d new-branch`

This allows you to delete existing branch, `feature/<branchName>`

### --history <branchName>

`seabass -h`

This show the history of all commits

### --list

`seabass -l`

This show all branches for this repo
