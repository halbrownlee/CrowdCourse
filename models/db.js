var mongoose = require("mongoose");
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/db', function (err, res) {
  if (err) {
    throw Error('Can not connecting to db');
  } else {
    console.log('Successfully connected to db');
  }
});

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});
// Bcrypt middleware
UserSchema.pre('save', function(next) {
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});
// Password verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};
mongoose.model('User', UserSchema);

var UniversitySchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  averageTuition: Number,
  averageRating: Number,
  internationalTuition: Number,
  onCampusLivingExpenses: Number,
  offCampusLivingExpenses: Number,
  maxScholarships: Number,
  departments: Number,
  courses: Number,
  undergrads: Number,
  graduates: Number
});
mongoose.model('Universities', UniversitySchema);

var RatingSchema = new mongoose.Schema({
  id: Number,
  courseId: Number,
  professorId: Number,
  universityId: Number,
  author: String,
  rating: Number,
  easiness: Number,
  workload: Number,
  advice: String,
  costs: Number
});
mongoose.model('Ratings', RatingSchema);

var SaleSchema = new mongoose.Schema({
  id: Number,
  courseId: Number,
  ownerId: Number,
  cost: Number,
  type: String,
  links: Array
});
mongoose.model('Sales', SaleSchema);

var ProfessorSchema = new mongoose.Schema({
  id: Number,
  name: String,
  clarity: Number,
  engagement: Number,
  approachability: Number,
  helpfulness: Number,
  takesAttendance: Boolean
});
mongoose.model('Professors', ProfessorSchema);

var CourseSchema = new mongoose.Schema({
  id: Number,
  universityId: Number,
  name: String,
  number: Number,
  professor: String,
  credits: Number,
  easiness: Number,
  onlineNotes: Boolean,
  assignments: Number,
  assignmentDifficulty: Number,
  averageInterestRating: Number
});
mongoose.model('Courses', CourseSchema);
