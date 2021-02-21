import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

  logoutUser = (e) => {
    e.preventDefault();
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
  }

  render() {
    const {authedUser, users} = this.props;

    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              LeaderBoard
            </NavLink>
          </li>
          <li className="navbar-right">
            <span>
              Welcome, {users[authedUser].name}
            </span>
            <button className='logout-btn' onClick={this.logoutUser}>
                Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
      authedUser, users
  };
}
export default connect(mapStateToProps)(Nav);
