var express = require('express');
var router = express.Router();

const app = express();
const createError = require('http-errors');

const path = require('path');
const cookieParser = require('cookie-parser');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Express' });
});
router.get('/index1.ejs', function(req, res, next) {
  res.render('index1', { title: 'Express' });
});
router.get('/login.ejs', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
