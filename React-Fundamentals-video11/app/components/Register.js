var React = require('react');
var PropTypes = React.PropTypes;
var transparentBg = require('../styles');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link

function Conditionalinput (props) {
  if(props.condition === true){
    var Options = props.teachers.data.data.map(function(item) {
      return (
        <option key={item._id}>
          {item.firstname}&nbsp;{item.lastname}
        </option>
      );
    });

    return (
      <select
        className='form-control'
        onChange={props.updateTeacher}
        placeholder='Your teachers name'
        value={props.teachername} style={transparentBg.topmargin} >
        {Options}
        </select>
    )
  }
  return (
    <p></p>
  )
}

function Register (props) {
  return (
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg.transparentBg}>
      <div className="col-sm-12">
        <form onSubmit={props.onSubmitUser}>
          <div className="form-group">
            <input
              className='form-control'
              onChange={props.onUpdateFirstname}
              placeholder='First Name'
              type='text'
              value={props.firstname} />
            <input
              className='form-control'
              onChange={props.onUpdateLastname}
              placeholder='Last Name'
              type='text'
              value={props.lastname} style={transparentBg.topmargin}/>
            <input
              className='form-control'
              onChange={props.onUpdateUsername}
              placeholder='New user name'
              type='text'
              value={props.username} style={transparentBg.topmargin}/>
            <input
              className='form-control'
              onChange={props.onUpdatePassword}
              placeholder='Password'
              type='password'
              value={props.password} style={transparentBg.topmargin}/>
            <label for="is_teacher">I am a teacher</label>
            <input
              type='checkbox'
              onChange={props.onUpdateTeacher}
              checked= {props.is_teacher}
              id="is_teacher"
              style={transparentBg.checkBox} />
            <label for="is_student">I am a student</label>
            <input
              type='checkbox'
              onChange={props.onUpdateStudent}
              checked= {props.is_student}
              id="is_student"
              style={transparentBg.checkBox} />
            <Conditionalinput condition={props.teacher_selection_content}
            updateTeacher={props.onUpdateTeacherName} teachername={props.teachername}
            teachers={props.teachers} />
          </div>
          <div className="form-group col-sm-4 col-sm-offset-4">
            <button
              className="btn btn-block btn-success"
              type="submit">
                Signup
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

Register.propTypes = {
  onSubmitUser: PropTypes.func.isRequired,
  onUpdateFirstname: PropTypes.func.isRequired,
  onUpdateLastname: PropTypes.func.isRequired,
  onUpdateUsername: PropTypes.func.isRequired,
  onUpdatePassword: PropTypes.func.isRequired,
  onUpdateTeacher: PropTypes.func.isRequired,
  onUpdateStudent: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  is_teacher: PropTypes.bool.isRequired,
  is_student: PropTypes.bool.isRequired,
  teacher_selection_content: PropTypes.bool.isRequired
}

module.exports = Register