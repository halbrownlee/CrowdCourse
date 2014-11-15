var express = require('express');
var router = express.Router();
var users = require('../models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = users.userModel;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users');
});

router.post('/signup', function(req, res) {
  var username = req.param('username');
  var password = req.param('password');

  var user = new User({username: username, email: "N/A", password: password});
  user.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('user: ' + user.username + " added.");
    }
  });
  res.redirect('/')
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) { return next(err) }
    if (!user) {
      console.log("unknown user.");
      return res.redirect('/users')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
