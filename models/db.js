var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  id: Number,
  username: String,
  passwordHash: String
});
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
mongoose.model('University', UniversitySchema);

var RatingSchema = new mongoose.Schema({
  id: Number,
  courseId: Number,
  professorId: Number,
  author: String,
  rating: Number,
  easiness: Number,
  workload: Number,
  advice: String,
  costs: Number
});
mongoose.model('Rating', RatingSchema);

var SaleSchema = new mongoose.Schema({
  id: Number,
  courseId: Number,
  ownerId: Number,
  cost: Number,
  type: String,
  links: Array
});
mongoose.model('Sale', SaleSchema);

var ProfessorSchema = new mongoose.Schema({
  id: Number,
  name: String,
  clarity: Number,
  engagement: Number,
  approachability: Number,
  helpfulness: Number,
  takesAttendance: Boolean
});
mongoose.model('Professor', ProfessorSchema);

var CourseSchema = new mongoose.Schema({
  id: Number,
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
mongoose.model('Course', CourseSchema);

mongoose.connect('mongodb://localhost:27017/db')
