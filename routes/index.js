var express = require('express');
var router = express.Router();

const commitController = require('../controllers/commit');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/so', (req, res, next) => {
  res.writeHead(301,{Location: "http://expressjs.com/en/starter/basic-routing.html"});
});

router.get('/li', (req, res, next) => {
  res.send("Redirecting you to my LinkedIn page");
  setTimeout(() => {
    res.writeHead(301,{Location: "http://expressjs.com/en/starter/basic-routing.html"});
    //window.location.href='https://www.upwork.com/freelancers/~0170c47a314ef06a17';
  }, 3000);
});

router.post('/commit', commitController.postCommit)

module.exports = router;
