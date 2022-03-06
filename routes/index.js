var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index1.ejs', function(req, res, next) {
  res.render('index1', { title: 'Express' });
});
router.get('/login.ejs', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
