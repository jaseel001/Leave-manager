var axios = require('axios');
var WebStorage = require('react-webstorage')
/*, dispatcher = require('./path/to/app-dispatcher');*/

var webStorage = new WebStorage(window.sessionStorage);
var helpers = {
  login: function (user) {
    return axios.post('http://localhost:3000/login',{
		username: user.username,
		password: user.password
   	}).then(function (info) {
        return info;
     })
    .catch(function (err) {console.warn('Error in Login: ', err)})
  },

  signup: function (user) {
    return axios.post('http://localhost:3000/register',{
		username: user.username,
		password: user.password,
		firstname: user.firstname,
        lastname: user.lastname,
        is_teacher: user.is_teacher,
        is_student: user.is_student
   	}).then(function (info) {
        return info;
     })
    .catch(function (err) {console.warn('Error in signup: ', err)})
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


