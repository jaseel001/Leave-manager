var React = require('react');
var Prompt = require('../components/Prompt');
var Header = require('../components/Header');
var PromptContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    console.log(this.props);
    return {
      username: ''
    }
  },
  handleSubmitUser: function (e) {
    e.preventDefault();
    var username = this.state.username;
    this.setState({
      username: ''
    });
    if (this.props.routeParams.playerOne) {
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne: this.props.routeParams.playerOne,
          playerTwo: this.state.username,
        }
      })
    } else {
      this.context.router.push('/playerTwo/' + this.state.username)
    }
  },
  handleUpdateUser: function (event) {
    this.setState({
      username: event.target.value
    });
  },
  render: function () {
    return (
    <div>
      <Header />
      <Prompt
        onSubmitUser={this.handleSubmitUser}
        onUpdateUser={this.handleUpdateUser}
        header={this.props.route.header}
        username={this.state.username} />
    </div>
    )
  }
});

module.exports = PromptContainer;