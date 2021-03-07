import { RECEIVE_USERS, SAVE_USER_ANSWER, USER_QUESTIONS_UPDATE } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case USER_QUESTIONS_UPDATE:
      return{
          ...state,
          [action.author]: {
              ...state[action.author],
              questions: state[action.author].questions.concat(action.id)
          }
      }
    case SAVE_USER_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
                ...state[action.authedUser].answers,
                [action.qid]: action.answer
            }
        }
      }
    default :
      return state
  }
}