//const Commit = require('../models/commit');

var fs = require('fs');

exports.postCommit = (req, res, next) => {
    const commitText = req.body.commitText;
    //Commit(commitText).
    var execProcess = require("./exec_process.js");
    execProcess.result("git clone https://github.com/Phantom-Intruder/site.git", function(err, response){
        if(!err){
            console.log(response);
            var logStream = fs.createWriteStream('../site/src/app/app.component.html', {flags: 'a'});
            logStream.write('<p>This is a commit block</p>');
        }else {
            console.log(err);
        }
    })
}

performGitCommand = (command) => {
    if (shell.exec(command).code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
    }
}