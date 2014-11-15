var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated,function(req, res) {
  res.render('index', { title: 'Crowd Course'});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/users')
}

module.exports = router;
