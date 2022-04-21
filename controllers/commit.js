//const Commit = require('../models/commit');

var fs = require('fs');

exports.postCommit = (req, res, next) => {
    console.log(req.body);
    const commitText = req.body.commitText;
    //Commit(commitText).
    var execProcess = require("./exec_process.js");
    execProcess.result('git config --global user.email "you@mewantha.net" && git config --global user.name "You"', (err) => {
        if (err){
            res.status(500).json({
                message: 'Server error!'
            })
        }
    });
    execProcess.result("git clone https://github.com/Phantom-Intruder/site.git && cd site && git checkout -b topic/work-on-site", (err) => {
        if (err){
            execProcess.result("cd site && git checkout topic/work-on-site && git reset --hard && git pull origin topic/work-on-site", (err) => {
                if(!err){
                    var isRequestError = changeFileAndCommit(execProcess, commitText);
                    if (isRequestError) {
                        res.status(500).json({
                            message: 'Server error!'
                        })
                    } else {
                        res.status(201).json({
                            message: 'Process successfull!'
                        })
                    }
                }else {
                    console.log(err);
                    console.log("There was an err in method")
                    res.status(500).json({
                        message: 'Server error!'
                    })
                }
            });
        } else {
            var isRequestError = changeFileAndCommit(execProcess, commitText);
            if (isRequestError) {
                res.status(500).json({
                    message: 'Server error!'
                })
            } else {
                res.status(201).json({
                    message: 'Process successfull!'
                })
            }
        }
    });
}

changeFileAndCommit = (execProcess, commitText) => {
    var logStream = fs.createWriteStream('site/src/app/app.component.html', { flags: 'a' });
    logStream.write('<br/><p>' + commitText + '</p>');
    execProcess.result('git diff', (err, response) => {
    });
    execProcess.result('cd site && git commit -am "New block commited." && git push https://Phantom-Intruder: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@github.com/Phantom-Intruder/site.git topic/work-on-site', (err, response) => {
        if (!err) {
            console.log(response);
            return false;
        } else {
            console.log(err);
            return true;
        }
    });
}
