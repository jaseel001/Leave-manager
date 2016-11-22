var React = require('react');
var Teachers = require('../components/Teachers');
var superAdminHelpers = require('../utils/superAdminHelpers');
var Header = require('../components/Header');

var TeachersContainer = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      teachers: [],
      menu: false
    }
  },
  componentDidMount: function () {
    superAdminHelpers.getTeachers()
      .then(function (teachers) {
        this.setState({
          teachers: teachers.data.data,
          isLoading: false
        })
      }.bind(this))
  },
  handleUserApproval: function(id) {
    superAdminHelpers.approveTeacher(id)
      .then(function(info){
        console.log(info);
      })
  },
  handleMenu: function(){
    this.setState({
      menu: !this.state.menu
    })
  },
  render: function () {
    return (
      <div>
        <Header OnClickMenu={this.handleMenu} menu={this.state.menu} />
        <Teachers
          isLoading={this.state.isLoading}
          teachers={this.state.teachers}
          approveUser={this.handleUserApproval} />
      </div>
    )
  }
});

module.exports = TeachersContainer;