import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/users'
import ErrorPage from './ErrorPage'

class PollCard extends Component {
    state = {
        userAnswer: ''
    }
    onChange = (e) => {
        this.setState({
            userAnswer: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props
        if (this.state.userAnswer !== ''){
            dispatch(handleSaveAnswer(this.props.authedUser, this.props.question_id, this.state.userAnswer))
        }
    }
  render() {
    const {authedUser, question, question_id, avatar, author, users} = this.props
    if(question === null) {
        return <ErrorPage />
    }

    const isAnswered = Object.keys(users[authedUser].answers).includes(question_id)
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOneVotePercentage = (optionOneVotes / totalVotes) * 100;
    const optionTwoVotePercentage = (optionTwoVotes / totalVotes) * 100;

    const userAnswer = users[authedUser].answers[question_id]

    return (
        <div className="poll-card"> <span> {author} asks: </span>
            <div className="card-flex">
            <img src={avatar} alt="Avatar" className="avatar" />
            {!isAnswered ?
                (<form className="userInfo" onSubmit={this.handleSubmit}>
                    <h3 className="title">Would You Rather...</h3>
                    <input
                        type="radio"
                        value="optionOne"
                        checked={this.state.userAnswer === 'optionOne'}
                        onChange={this.onChange}
                    />
                    <label>{question.optionOne.text}</label>
                    <br />
                    <input
                        type="radio"
                        value="optionTwo"
                        checked={this.state.userAnswer === 'optionTwo'}
                        onChange={this.onChange}
                    />
                    <label>{question.optionTwo.text}</label>
                    <button className="form-btn" type="submit">Submit</button>
                </form>)
                : (<div className="userInfo">
                    <h3 className="title">Results</h3>
                    <p>Would you rather {question.optionOne.text}</p>
                    <div id="progressbar">
                        <div style={{width: `${optionOneVotePercentage}%`}}>
                          <span style={{paddingLeft: '5px'}}>{optionOneVotePercentage}%</span>
                        </div>
                    </div>
                    <span> {optionOneVotes} out of {totalVotes} </span>
                    <p>Would you rather {question.optionTwo.text}</p>
                    <div id="progressbar">
                        <div style={{width: `${optionTwoVotePercentage}%`}}>
                          <span style={{paddingLeft: '5px'}}>{optionTwoVotePercentage}%</span>
                        </div>
                    </div>
                    <span> {optionTwoVotes} out of {totalVotes} </span>
                </div>
                )}
            </div>
            {isAnswered && <span className="youVoted">You voted for: <b>{question[userAnswer].text}</b> </span>}
        </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}, {match}) {
    const question_id = match.params.question_id
    const question = questions[question_id] ? questions[question_id] : null
    const avatar = question ? users[question.author].avatarURL : null
    const author = question ? users[question.author].name : null
    return {
        authedUser,
        question,
        question_id,
        avatar,
        author,
        users
    };
  }

export default connect(mapStateToProps)(PollCard);
