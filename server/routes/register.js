var jwt = require('jwt-simple');
var User = require('../models/user.js');
var auth = require('./auth.js');
var Promise = require('bluebird')
var register = {

  signup: function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';
    var firstname = req.body.firstname || '';
    var lastname = req.body.lastname || '';
    var stud_or_teacher = req.body.is_teacher || req.body.is_student || false;
    var Userrole;
    if (username == '' || password == '' || firstname == '' || lastname == '' || stud_or_teacher == false) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid details"
      });
      return;
    }
    if(req.body.is_teacher){
      Userrole = 'admin'
    }
    if(req.body.is_student){
      Userrole = 'user'
    }
    // create a new user
      var newUser = User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        role: Userrole,
        approved : false,
        created_at: new Date()
      });

      // save the user
      newUser.saveAsync().then(function(result) {
        var user = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username
        }
        res.json({
          "status": 200,
          "message": "User created",
          "data": genToken(user)
        });
      }).catch(e => {
        res.json({
          "status": 401,
          "message": "User already exist"
        });
      });
  },

}
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = register;