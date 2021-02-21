import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/shared";

import Login from "./Login";
import Dashboard from './Dashboard'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        {this.props.authedUser === null ? <Login />
        : (
          <div>
            <Nav />
            <Route path='/' exact component={Dashboard} />
            <Route path = "/new" component={NewQuestion}></Route>
            <Route path = "/leaderboard" component={Leaderboard}></Route>
          </div>
        )
        }
        {/* <NewQuestion /> */}
      </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
      authedUser
  };
}

export default connect(mapStateToProps)(App);
