var axios = require('axios');
var WebStorage = require('react-webstorage')
/*, dispatcher = require('./path/to/app-dispatcher');*/

var webStorage = new WebStorage(window.sessionStorage);
var helpers = {
  getTeachers: function(){
    return axios.get('http://localhost:3000/api/v1/superadmin/teachers').then(function(info) {
      return info;
    })
    .catch(function (err) {console.warn('Error in getting teachers lis', err)})
  },
  approveTeacher: function(id){
    return axios.put('http://localhost:3000/api/v1/superadmin/approveteacher/' + id).then(function(info){
      return info;
    })
    .catch(function(err){
      console.warn('Error in approving teacher', err)
    })
  }
};


axios.interceptors.request.use(function (config, $window, sessionStorage) {
    // Do something before request is sent
    if(webStorage.getItem('token')){
    	config.headers['X-Access-Token'] = webStorage.getItem('token');
    	config.headers['X-Key'] = webStorage.getItem('user');
    	config.headers['Content-Type'] = "application/json";
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


module.exports = helpers;


