import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

export const FLASHCARD_STORAGE_KEY = 'Udacity:flashcards'
const NOTIFICATION_KEY = 'Udacity:notifications'

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
    return data === null
        ? setDummyData()
        : JSON.parse(data);
}

export const getDeck = (data, title) => {
    const parsedData = JSON.parse(data)
    return parsedData[title];
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Quiz Time!',
    body: "Don't forget to study your flashcards today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
