var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link
var transparentBg = require('../styles').transparentBg;
var MainContainer = require('./MainContainer');

function Home () {
  return (
    <MainContainer>
      <Link to='/login'>
        <button type='button' className='btn btn-lg btn-success'>Student Login</button>
      </Link>
      <br />
      <br />
      <Link to='/login'>
        <button type='button' className='btn btn-lg btn-success'>Staff Login</button>
      </Link>
    </MainContainer>
  )
}

module.exports = Home;