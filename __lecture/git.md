                                            COMMITTING WORK THROUGH GIT

STEP 1: to create a new branch in GIT, the command is "git checkout -b Workspace". Checkout is the command for a new <something>, -b is the tag for branch. Workspace is the name of the new branch

STEP 2: before committing, we have to add the files to let the terminal know what we're committing. Command is "git add. ". The dot after "add" includes all files.

STEP 3: once work is done, we commit with the "git commit -m Sumary". Commit is the command to commit the branch to master, -m is the tag for master. Summary is the summary of the commit, small details/information.

STEP 4: we use the command "git remote --set-url origin <URL GOES HERE>". --set-url is a parameter that sets the path of the origin "file". This is important for the next step.

STEP 5: Once everything has been committed, we push everything with "git push origin HEAD". remote and HEAD are parameters tacked onto the command. We use HEAD instead of MASTER so it doesn't accidentally overwrite the master branch.