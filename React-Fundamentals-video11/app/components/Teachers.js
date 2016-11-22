var React = require('react');
var PropTypes = React.PropTypes;
var styles = require('../styles');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link
var Loading = require('./Loading');

function Teachers (props) {
  if (props.isLoading === true) {
    return <Loading />
  }

  else {
    var Teachers = props.teachers.map(function(teacher) {
      return (
        <div key={teacher._id} className="col-sm-3 user-container">
          <img src="app/images/profile.png" className="profile-pic"/>
          <p>{teacher.firstname}&nbsp;{teacher.lastname}</p>
          {!teacher.approved && <button className="btn btn-success" key={teacher._id} onClick={props.approveUser.bind(null,teacher._id)}>Approve</button>}
          {!teacher.approved && <button className="btn btn-success btn-decline">Decline</button>}
          {teacher.approved && <button className="btn btn-success btn-info">Leaves</button>}
        </div>
      );
    });
    return (
      <div className="col-sm-12 container-div">
        {Teachers}
      </div>
    )
  }
}

Teachers.propTypes = {
  teachers: PropTypes.array.isRequired,
  approveUser: PropTypes.func.isRequired
}

module.exports = Teachers;