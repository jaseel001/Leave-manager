var React = require('react');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router');
var Link = ReactRouter.Link
var Styles = require('../styles');

function Header (props) {
  return (
      <div className="col-sm-12 padding-0">
        <div className="col-sm-12 header padding-right-30">
          <div className="col-sm-3 padding-0">
            <Link to='/dashboard'>
              <img src="app/images/logo.png" className="profile-pic"/>
            </Link>
          </div>
          <div className="col-sm-9 content-right padding-0">
            <Link to='/register' className='header-link'>
              <span>Profile</span>
            </Link>
            <Link to='/register' className='header-link'>
              <span>Students</span>
            </Link>
            <Link to='/teachers' className='header-link'>
              <span>Teachers</span>
            </Link>
            <Link to='/register' className='header-link'>
              <span>Leaves</span>
            </Link>
            <img src="app/images/profile.png" className="profile-pic" onClick={props.OnClickMenu}/>
          </div>
        </div>
        <div className="col-sm-3 drop-menu">
            {props.menu &&
              <ul>
                <li>profile</li>
                <li>logout</li>
              </ul>}
        </div>
      </div>
  )
}

module.exports = Header