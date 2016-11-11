var User = require('../models/user.js');
var teachers = {

  getAll: function(req, res) {
    allteachers().then(function(result){
      res.json({
        "status": 200,
        "data": result
      })
    }).catch(function(error){
      console.log(error);
    })
  },

  approveTeacher: function(req, res) {
    var id = req.params.id;
    approveATeacher(id).then(function(result){
      res.json({
        "status" : 200,
        "data" : "user approved"
      })
    }).catch(function(error){
      console.log(error);
      res.json({
        "status" : 401,
        "data" : error
      })
    })
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

allteachers = function(){
  return new Promise(function(resolve, reject) {
    User.find({role: 'admin'},{},function(err, user) {
      if (err) return reject(error);
        // object of the user
        resolve(user);

    });
  });
}

approveATeacher = function(id){
  return new Promise(function(resolve,reject){
    User.update({"_id": id},{$set:{approved : true}},function(err, user){
      console.log(err,user);
      if (err) return reject(error);
      resolve(user);
    })
  })
}
module.exports = teachers;
