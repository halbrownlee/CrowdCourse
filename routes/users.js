var express = require('express');
var router = express.Router();
var university = require('../models/universities');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users');
});

router.post('/login', function(req, res) {
  university.getMUN(function (err, mun) {
    res.render('index', {
      title: 'Logged in!',
      data: mun.toString()
    })
  });
});

module.exports = router;
