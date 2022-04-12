var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/so', (req, res, next) => {
  res.writeHead(301,{Location: "http://expressjs.com/en/starter/basic-routing.html"});
});

module.exports = router;
