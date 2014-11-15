var mongoose = require('mongoose');

var Course = Courses = mongoose.model('Courses');
var Rating = Ratings = mongoose.model('Ratings');

exports.averageRating = function (name, callback) {
  Courses.findOne({ name: name }, function (err, course) {
    if (err) {
      callback('Could not find ' + name, null);
    } else if (typeof course === 'undefined' || course === null) {
      callback('No course found.', null);
    } else {
      Ratings.find({ courseId: course.id }, function (err, ratings) {
        if (err) {
          callback('Could not retrieve ratings for ' + name, null);
        } else {
          var sum = 0.0;
          for (var i = 0, len = ratings.length; i < len; i++) {
            sum += ratings[i].rating;
          }
          callback(null, sum);
        }
      });
    }
  });
};

exports.list = function (name, callback) {
  Courses.find({ name: name }, function (err, courses) {
    if (err) {
      callback('Found no courses with name "' + name + '"', null);
    } else {
      callback(null, courses);
    }
  });
};

exports.create = function (name, callback) {
  var course = new Course({ name: name });
  course.save(function (err) {
    callback(err);
  });
};
