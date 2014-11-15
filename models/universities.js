var mongoose = require('mongoose');

var University = mongoose.model('University');

var MUN = new University({
  id: 0,
  name: "Memorial University",
  address: "230 Elizabeth Avenue"
});

MUN.save();

exports.getMUN = function(callback){
  University.find({'id': 0}, function (err, mun) {
    if (err) {
      callback(err);
    } else {
      console.log(mun);
      callback(null, mun);
    }
  });
}
