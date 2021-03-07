import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard'

class Dashboard extends Component {
  state = {
    tab: 'unanswered',
    button1: 'unanswered-active',
    button2: ''
  }

  onTabChange = (tab) => {
    let button1 = ''
    let button2 = ''
    if(tab === 'unanswered'){
      button1 = 'unanswered-active'
    }
    else {
      button2 = 'answered-active'
    }
    this.setState(() => ({
      tab,
      button1,
      button2
    }))
  }

  render() {
    const { answeredQuestions, unansweredQuestions } = this.props
    return (
      <div>
        <div className="dashboard-btns">
          <button className={this.state.button1} onClick={() => this.onTabChange('unanswered')}>Unanswered Question</button>
          <button className={this.state.button2} onClick={() => this.onTabChange('answered')}>Answered Question</button>
        </div>
        {this.state.tab === 'unanswered' ?
          unansweredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              author = {this.props.users[question.author].name}
              avatar={this.props.users[question.author].avatarURL}
            />
          )) :
          answeredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              author = {this.props.users[question.author].name}
              avatar={this.props.users[question.author].avatarURL}
            />
          ))
        }
      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}) {
  const answeredQuestionsIds = Object.keys(users[authedUser].answers)
  const answeredQuestions = answeredQuestionsIds.map(
    (questionID) => questions[questionID]).sort((a, b) => b.timestamp - a.timestamp);
  const unansweredQuestions = Object.values(questions).filter((question) => !answeredQuestionsIds.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp);

  return {
    answeredQuestions,
    unansweredQuestions,
    users
  }
}

export default connect(mapStateToProps)(Dashboard);
