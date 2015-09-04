var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/new', function(req, res, next) {
  res.render('index', { title: 'BigPigs' });
});

module.exports = router;
