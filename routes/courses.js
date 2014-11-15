var express = require('express');
var router = express.Router();
var courses = require('../models/courses');

router.get('/averageRating/:name', function (req, res) {
    var name = req.params['name'];
    courses.averageRating(name, function (err, average) {
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

router.get('/list/:name', function (req, res) {
  var name = req.params['name'];
  courses.list(name, function (err, courses) {
    if (err) {
      res.send({
        error: 'Could not find search for courses with name ' + name,
        data: null
      });
    } else {
      res.send({
        error: null,
        data: courses
      });
    }
  });
});

router.post('/create', function (req, res) {
  var name = req.params['name'];
  courses.create(name, function (Err) {
    if (err) {
      res.send({ error: 'Could not create course.', success: false });
    } else {
      res.send({ error: null, success: true });
    }
  });
});

module.exports = router;
