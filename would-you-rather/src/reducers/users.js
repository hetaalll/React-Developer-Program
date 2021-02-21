import { RECEIVE_USERS, USER_QUESTIONS_UPDATE } from '../actions/users'

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
    default :
      return state
  }
}