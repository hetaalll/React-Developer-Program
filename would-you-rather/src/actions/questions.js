import { saveQuestion } from '../utils/api'
import { updateUserQuestionsArray } from './users'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const data = {
            author: authedUser,
            optionOneText,
            optionTwoText,
        }
        return saveQuestion(data).then((question)=>{
            dispatch(addQuestion(question))
            dispatch(updateUserQuestionsArray(question))
        }).catch((error)=>{
            console.warn('ERROR!! Could not add a new question:(',error)
        })
    }
}