import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatData, getDeck, FLASHCARD_STORAGE_KEY } from './helper';

// fetchAllDecks: return all of the decks along with their titles, questions, and answers.
export const fetchAllDecks = async () => {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(formatData)
}

// fetchDeck: take in a single title argument and return the deck associated with that title.
export function fetchDeck(title) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then((data) => getDeck(data, title))
}

// saveDeck: take in a single title argument and add it to the decks.
export function saveDeck(title) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
      }))
}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardtoDeck(title, existingQuestions , newCard) {
    const updatedQuestions = existingQuestions.length === 0
        ? [ newCard ]
        : [ ...existingQuestions, newCard ]

    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: updatedQuestions
        }
      }))
}

// deleteDeckData: takes in the title of the deck and will delete it
export function deleteDeckData(title) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    })
}