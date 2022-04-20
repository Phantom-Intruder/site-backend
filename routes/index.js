var express = require('express');
var router = express.Router();

const commitController = require('../controllers/commit');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/so', (req, res, next) => {
  res.redirect("https://stackoverflow.com/users/3730626/m-b");
});

router.get('/li', (req, res, next) => {
  res.redirect("https://linkedin.com/in/mewantha-bandara/");
});

router.get('/gh', (req, res, next) => {
  res.redirect("https://github.com/Phantom-Intruder/");
})

router.get('/uw', (req, res, next) => {
  res.redirect("https://www.upwork.com/freelancers/~0170c47a314ef06a17");
})

router.post('/commit', commitController.postCommit)

module.exports = router;
