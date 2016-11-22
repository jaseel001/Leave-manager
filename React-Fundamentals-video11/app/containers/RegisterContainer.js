var React = require('react');
var Home = require('../components/Register');
var userEntryHelpers = require('../utils/userEntryHelpers');
var WebStorage = require('react-webstorage')
var webStorage = new WebStorage(window.sessionStorage);


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
      teacher_selection_content : false,
      teachername : '',
      isLoading: true,
      teachers: []
    }
  },
  componentDidMount: function () {
    userEntryHelpers.teachersList()
      .then(function (teachers) {
        this.setState({
          teachers: teachers,
          isLoading: false
        })
      }.bind(this))
  },
  handleSubmitUser: function (e) {
    e.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    var firstname = this.state.firstname;
    var lastname = this.state.lastname;
    var is_teacher= this.state.is_teacher;
    var is_student= this.state.is_student;
    var teachername = this.state.teachername;
    var teacher_selection_content= this.state.teacher_selection_content;
    this.setState({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      is_teacher: false,
      is_student: false,
      teacher_selection_content : false,
      teachername : ''
    });
    var that = this;
    userEntryHelpers.signup(this.state)
     .then(function(user){
       if(user.status === 200){
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
    var teacher_selection_content = event.target.checked == true? true: false;
    this.setState({
      is_student: event.target.checked,
      teacher_selection_content: teacher_selection_content
    });
  },
  handleupdateTeachername: function(event){
    this.setState({
      teachername: event.target.value
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
        onUpdateTeacherName={this.handleupdateTeachername}
        username={this.state.username} password={this.state.password}
        firstname={this.state.firstname} lastname={this.state.lastname}
        is_teacher={this.state.is_teacher} is_student={this.state.is_student}
        teacher_selection_content = {this.state.teacher_selection_content}
        teachername={this.state.teachername}
        teachers = {this.state.teachers}/>
    )
  }
});

module.exports = PromptContainer;