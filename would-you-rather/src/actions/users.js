import { saveQuestionAnswer } from '../utils/api'
import { updateUsersAnswersArray } from './questions'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'
export const USER_QUESTIONS_UPDATE = 'USER_QUESTIONS_UPDATE'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function updateUserQuestionsArray ({id, author}) {
  return {
    type: USER_QUESTIONS_UPDATE,
    id,
    author
  }
}

export function saveUserAnswer ({authedUser, qid, answer}) {
  return {
    type: SAVE_USER_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleSaveAnswer (authedUser, qid, answer) {
  return (dispatch) => {
    const data = {
      authedUser,
      qid,
      answer
    }
    return saveQuestionAnswer(data).then(() => {
      dispatch(updateUsersAnswersArray(data))
      dispatch(saveUserAnswer(data))
    }).catch((error)=>{
      console.warn('ERROR!! Could not save answer: ' ,error)
  })
  }
}