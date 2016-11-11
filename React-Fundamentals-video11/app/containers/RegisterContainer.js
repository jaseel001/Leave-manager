var React = require('react');
var Home = require('../components/Register');
var userEntryHelpers = require('../utils/userEntryHelpers');

var PromptContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      is_teacher: false,
      is_student : false,
      teacher_selection_content : null
    }
  },
  handleSubmitUser: function (e) {
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    var firstname = this.state.firstname;
    var lastname = this.state.lastname;
    var is_teacher= this.state.is_teacher;
    var is_student= this.state.is_student;
    var teacher_selection_content= this.state.teacher_selection_content;
    this.setState({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      is_teacher: false,
      is_student: false,
      teacher_selection_content : null
    });
    var that = this;
    userEntryHelpers.signup(this.state)
     .then(function(user){
       if(user.status === 200){
          that.context.router.push({
            pathname: '/playerOne',
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
  handleupdateFirstname: function (event) {
    this.setState({
      firstname: event.target.value
    });
  },
  handleupdateLastname: function (event) {
    this.setState({
      lastname: event.target.value
    });
  },
  handleupdateTeacher: function (event) {
    this.setState({
      is_teacher: event.target.checked
    });
  },
  handleupdateStudent: function (event) {
    var teacher_selection_content = event.target.checked == true?
     <input type="text" className='form-control' placeholder="Your teachers Name" onChange={this.props.onUpdateStudent}/>: null;
    this.setState({
      is_student: event.target.checked,
      teacher_selection_content: teacher_selection_content
    });
  },
  render: function () {
    return (
      <Home
        onSubmitUser={this.handleSubmitUser}
        onUpdateUsername={this.handleUpdateUsername}
        onUpdatePassword={this.handleUpdatePassword}
        onUpdateFirstname={this.handleupdateFirstname}
        onUpdateLastname={this.handleupdateLastname}
        onUpdateTeacher={this.handleupdateTeacher}
        onUpdateStudent={this.handleupdateStudent}
        username={this.state.username} password={this.state.password}
        firstname={this.state.firstname} lastname={this.state.lastname}
        is_teacher={this.state.is_teacher} is_student={this.state.is_student}
        teacher_selection_content = {this.state.teacher_selection_content} />
    )
  }
});

module.exports = PromptContainer;