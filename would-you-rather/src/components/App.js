import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/shared";

import Login from "./Login";
import Dashboard from './Dashboard'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import ErrorPage from './ErrorPage';
import PollCard from './PollCard';

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
            <Switch>
              <Route path='/' exact component={Dashboard} />
              <Route path = '/new' exact component={NewQuestion} />
              <Route path= '/questions/:question_id' component={PollCard} />
              <Route path = '/leaderboard' exact component={Leaderboard} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        )
        }
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
