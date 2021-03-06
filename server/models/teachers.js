var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  created_at: { type: Date, required: true, select: false },
  updated_at: Date,
  role: { type: String, required: true},
  skills: {
    skill: { type: String}
  }
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;