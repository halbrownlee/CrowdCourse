var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
  res.render('index', {title: 'Crowd Course', data: ''});
});

router.post('/login', function(req, res) {
  res.render('index', {title: 'Login successful', data: ''});
});

module.exports = router;
