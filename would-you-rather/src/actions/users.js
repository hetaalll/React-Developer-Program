export const RECEIVE_USERS = 'RECEIVE_USERS'
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