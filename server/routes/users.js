var User = require('../models/user.js');
var users = {

  getAll: function(req, res) {
    allusers().then(function(result){
      res.json({
        "status": 200,
        "data": result
      })
    }).catch(function(error){
      console.log(error);
    })
  },

  getOne: function(req, res) {
    var id = req.params.id;
    var user = data[0]; // Spoof a DB call
    res.json(user);
  },

  create: function(req, res) {
    var newuser = req.body;
    data.push(newuser); // Spoof a DB call
    res.json(newuser);
  },

  update: function(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    data[id] = updateuser // Spoof a DB call
    res.json(updateuser);
  },

  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};

allusers = function(){
  return new Promise(function(resolve, reject) {
    User.find({},{},function(err, user) {
      if (err) return reject(error);
        // object of the user
        resolve(user);

    });
  });
}
module.exports = users;
