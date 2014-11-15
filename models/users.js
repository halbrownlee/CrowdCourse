var mongoose = require('mongoose');

var User = mongoose.model('User');

var user = new User({username: 'admin', email: 'admin@example.com', password: 'admin'});
user.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('user: ' + user.username + " saved.");
  }
});

exports.userModel = User;