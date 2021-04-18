import AsyncStorage from '@react-native-async-storage/async-storage';

export const FLASHCARD_STORAGE_KEY = 'Udacity:flashcards'

const setDummyData = () => {
    const dummyDecks = {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        Javascript: {
          title: 'Javascript',
          questions: [ ]
        }
    }

    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(dummyDecks))

    return dummyDecks
}

export const formatData = (data) => {
    // console.log(data)
    return data === null
        ? setDummyData()
        : JSON.parse(data);
}

export const getDeck = (data, title) => {
    const parsedData = JSON.parse(data)
    return parsedData[title];
}