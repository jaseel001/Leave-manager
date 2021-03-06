var React = require('react');
var Home = require('../components/Home');
var userEntryHelpers = require('../utils/userEntryHelpers');
var WebStorage = require('react-webstorage')
var webStorage = new WebStorage(window.sessionStorage);


var PromptContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      username: '',
      password: ''
    }
  },
  handleSubmitUser: function (e) {
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    this.setState({
      username: '',
      password: ''
    });
    var that = this;
    userEntryHelpers.login(this.state)
     .then(function(user){
       if(user.status === 200){
          console.log(user);
          webStorage.setItem('token', user.data.data.token);
          webStorage.setItem('user', user.data.data.user.username);
          that.context.router.push({
            pathname: '/dashboard',
            query: {
              data: user
            }
          })

       }
     })
  },
  handleUpdateUsername: function (event) {
    this.setState({
      username: event.target.value
    });
  },
  handleUpdatePassword: function (event) {
    this.setState({
      password: event.target.value
    });
  },
  render: function () {
    return (
      <Home
        onSubmitUser={this.handleSubmitUser}
        onUpdateUsername={this.handleUpdateUsername}
        onUpdatePassword={this.handleUpdatePassword}
        username={this.state.username} password={this.state.password} />
    )
  }
});

module.exports = PromptContainer;