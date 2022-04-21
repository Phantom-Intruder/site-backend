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
<<<<<<< HEAD
    let buff = Buffer.from("Z2hwX0h0anBTN3dSVWJFSHJFU0taZjd4NzZ3b2I2ejlJSDJYT1hmQw==", 'base64');  
    let text = buff.toString('utf-8');
    execProcess.result('cd site && git commit -am "New block commited." && git push https://Phantom-Intruder:' + text + '@github.com/Phantom-Intruder/site.git topic/work-on-site', (err, response) => {
=======
    execProcess.result('git diff', (err, response) => {
    });
    execProcess.result('cd site && git commit -am "New block commited." && git push https://Phantom-Intruder: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@github.com/Phantom-Intruder/site.git topic/work-on-site', (err, response) => {
>>>>>>> 3d3d2a0efce8de471b2e2318185f655c2d932cc8
        if (!err) {
            console.log(response);
            return false;
        } else {
            console.log(err);
            return true;
        }
    });
}