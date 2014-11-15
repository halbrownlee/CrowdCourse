var mongoose = require('mongoose');

var University = Universities = mongoose.model('Universities');
var Rating = Ratings = mongoose.model('Ratings');
var Course = Courses = mongoose.model('Courses');

exports.averageRating = function (name, callback) {
  Ratings.findOne({ name: name }, function (err, ratings) {
    if (err) {
      callback(err, null);
    } else if (typeof ratings === 'undefined' || ratings === null) {
      callback(null, 0.0);
    } else {
      var sum = 0.0;
      for (var i = 0, len = ratings.length; i < len; i++) {
        sum += ratings[i].rating;
      }
      callback(null, sum / ratings.length);
    }
  });
};

exports.courses = function (name, callback) {
  Courses.findOne({ name: name }, function (err, courses) {
    if (err) {
      callback(err, null);
    } else {
      var courseList = new Array(courses.length);
      for (var i = 0, len = courses.length; i < len; i++) {
        courseList[i] = {
          name: courses[i].name,
          courseNumber: courses[i].number
        }
      }
      callback(null, courseList);
    }
  });
};

exports.create = function (name, address, callback) {
  var newUni = new University({ name: name, address: address, averageRating: 0.0 });
  newUni.save(function (err) {
    if (err) callback(err);
    else callback(null);
  });
};
