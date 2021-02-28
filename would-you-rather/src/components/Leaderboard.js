import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    return (
      <div>
        {this.props.leaderboardResults.map((user) => (
          <div className="card" key={user.id}>
            <img src={user.avatarURL} alt="Avatar" className="avatar" />
            <div className="userInfo">
              <h4 className="leader-title">{user.name}</h4>
              <p className="question-info">Questions Asked: {user.questionsAsked}</p>
              <p className="question-info">Questions Answered: {user.questionsAnswered}</p>
              <h4 className="score-title">
                Score: <span className="score-card">{user.userScore}</span>
              </h4>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({users}) {
  const usersList = Object.values(users)
  const leaderboardResults = usersList.map((user) => ({
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    questionsAsked: user.questions.length,
    questionsAnswered: Object.keys(user.answers).length,
    userScore: user.questions.length + Object.keys(user.answers).length
  })).sort((a, b) => b.userScore - a.userScore)
  return {
    leaderboardResults
  }
}

export default connect(mapStateToProps)(Leaderboard);
