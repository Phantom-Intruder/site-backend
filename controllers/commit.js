//const Commit = require('../models/commit');

var fs = require('fs');

exports.postCommit = (req, res, next) => {
    const commitText = req.body.commitText;
    //Commit(commitText).
    var execProcess = require("./exec_process.js");
    execProcess.result("git clone https://github.com/Phantom-Intruder/site.git & git checkout -b topic/work-on-site", (err, response) => {
        if (err){
            execProcess.result("cd ../site & git checkout -b topic/work-on-site & git pull origin topic/work-on-site", (err, response) => {
                if(!err){
                    console.log(response);
                    //console.log(response);
                    var logStream = fs.createWriteStream('site/src/app/app.component.html', {flags: 'a'});
                    logStream.write('<br/><p>This is a commit block</p>');
                    execProcess.result('git add . & git commit -m "New block commited." & git push -u origin topic/work-on-site', (err, response) => {
                        if(!err){
                            console.log(response);
                        } else {
                            console.log(err);
                        }
                    });
                }else {
                    console.log(err);
                    console.log("There was an err in method")
                    return err
                    //console.log(err);
                }
            })
        }
    })
    .then(value => {
        console.log("asdadasdasdasd");
    })
    .catch(err => {
        console.log("There was an err in promise")
        console.log(err);
    })
}

performGitCommand = (command) => {
    if (shell.exec(command).code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
    }
}