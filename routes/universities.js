var express = require('express');
var router = express.Router();
var universities = require('../models/universities');

router.get('/averageRating/:name', function (req, res) {
  var name = req.params['name'];
  universities.averageRating(name, function (err, average) {
    if (err) {
      res.send({
        error: 'Could not compute the average rating for university with name ' + name,
        data: null
      });
    } else {
      res.send({
        error: null,
        data: average
      });
    }
  });
});

router.get('/courses/:name', function (req, res) {
  var name = req.params['name'];
  universities.courses(name, function (err, courses) {
    if (err) {
      res.send({
        error: 'Could not find courses for university with name ' + name,
        data: null
      });
    } else {
      res.send({
        error: null,
        data: courses
      });
    }
  })
});

router.post('/create', function (req, res) {
  var name = req.params['name'], address = req.params['address'];
  universities.create(name, address, function (err) {
    if (err) {
      res.send({ error: 'Could not create university.', success: false });
    } else {
      res.send({ error: null, success: true });
    }
  });
});

module.exports = router;
