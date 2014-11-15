var express = require('express');
var router = express.router();
var universities = require('../models/universities');

router.get('/averageRating/:uid', function (req, res) {
  var uid = parseInt(req.params['uid']);
  universities.averageRating(uid, function (err, average) {
    if (err) {
      res.send({
        error: 'Could not compute the average rating for university with id ' + uid,
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

router.get('/courses/:uid', function (req, res) {
  var uid = parseInt(req.params['uid']);
  universities.courses(uid, function (err, courses) {
    if (err) {
      res.send({
        error: 'Could not find courses for university with id ' + uid,
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
