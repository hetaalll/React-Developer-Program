import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    return (
      <div>Leaderboard Component</div>
    )
  }
}

export default connect()(Leaderboard);
