import React, { useState } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { deleteDeckData, fetchAllDecks } from '../utils/api';

export default function Deck({ navigation, route }) {
    const { title, questions } = route.params
    const [error, setError] = useState(null)

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: (props) => (
          <HeaderBackButton
            {...props}
            onPress={() => {
              fetchAllDecks().then((decksList) => {
                navigation.navigate('DeckList', {
                  decksList
                });
              })
            }}
          />
        ),
      });
    }, [navigation]);

    const startQuiz = () => {
      if(questions.length === 0) {
        setError('No cards exist for quiz')
      }
      else {
        navigation.navigate('Quiz', {
          deck: {
            title,
            questions
          }
        })
      }
    }

    const addCard = () => {
      setError(null)
      navigation.navigate('NewCard', {
        title,
        questions
      })
    }

    const deleteDeck = () => {
      deleteDeckData(title).then((res) => {
        fetchAllDecks().then((decksList) => {
          navigation.navigate('DeckList', {
            decksList
          });
        })
      });
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{questions.length} cards</Text>
        <TouchableOpacity style={styles.startQuizBtn} onPress={startQuiz}>
          <Text style={{color: 'white'}}>Start Quiz</Text>
        </TouchableOpacity>
        {error !== null && <Text style={styles.error}> {error} </Text> }
        <TouchableOpacity style={styles.addCardBtn} onPress={addCard}>
          <Text style={{color: 'white'}}>Add New Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteDeckBtn} onPress={deleteDeck}>
          <Text>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
    padding: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30
  },
  subtitle: {
    fontSize: 18
  },
  startQuizBtn: {
    padding: 20,
    backgroundColor: 'purple',
    marginTop: 10
  },
  addCardBtn: {
    padding: 20,
    backgroundColor: 'grey',
    marginTop: 10
  },
  deleteDeckBtn: {
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'red'
  },
  error: {
    marginTop: 10,
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold'
  }
});