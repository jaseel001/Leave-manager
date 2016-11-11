var jwt = require('jwt-simple');
var User = require('../models/user.js');
var auth = {

  login: function(req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
    var dbUserObj;
    // Fire a query to your DB and check if the credentials are valid
    auth.validate(username, password).then(function(result){
        auth.tokenGenerate(result, res);
    }).catch(function(error){
        console.log(error);
    })

  },

  validate: function(username, password) {
    // spoofing the DB response for simplicity
    return new Promise(function(resolve, reject) {
        User.findOne({ username: username, password: password }, function(err, user) {
            if (err) return reject(error);
            // object of the user
            resolve(user);

        });
    });


  },

  tokenGenerate: function(result, res){
      if (!result) { // If authentication fails, we send a 401 back
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }

      if(result.role != 'superadmin' && result.approved == false){
        var higherAuthority = result.role == 'admin'? 'principal' : 'teacher';
        res.status(401);
        res.json({
          "status": 401,
          "message": "Your account waiting for approval from " + higherAuthority,
        });
        return;
      }

      if (result) {
        // If authentication is success, we will generate a token
        // and dispatch it to the client
        res.json({
          "status": 200,
          "message": "Login successfull",
          "data": genToken(result)
        });
      }
    },

  validateUser: function(username) {
    return new Promise(function(resolve, reject) {
        User.findOne({ username: username}, function(err, user) {
            if (err) return reject(error);
            // object of the user
            resolve(user);

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

module.exports = auth;