var mongoose = require('mongoose');

var University = Universities = mongoose.model('Universities');
var Rating = Ratings = mongoose.model('Ratings');
var Course = Courses = mongoose.model('Courses');

exports.averageRating = function (name, callback) {
  Universities.findOne({ name: name }, function (err, univerity) {
    if (err) {
      callback('Could not find ' + name, null);
    } else {
      Ratings.findOne({ universityId: university.id }, function (err, ratings) {
        if (err) {
          callback('Could not find ratings for ' + name, null);
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
    });
  }
};

exports.courses = function (name, callback) {
  Universities.findOne({ name: name }, function (err, university) {
    if (err) {
      callback('Could not find ' + name, null);
    } else {
      Courses.findOne({ universityId: university.id }, function (err, courses) {
        if (err) {
          callback('Could not find courses for ' + name, null);
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
    });
  }
};

exports.create = function (name, address, callback) {
  var newUni = new University({ name: name, address: address, averageRating: 0.0 });
  newUni.save(function (err) {
    if (err) callback(err);
    else callback(null);
  });
};
