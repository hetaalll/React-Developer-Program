import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { addCardtoDeck } from '../utils/api';

export default function NewCard({ navigation, route }) {
    const { title, questions } = route.params

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const [error, setError] = useState(null)

    const submitDeck = () => {
      if(answer.length === 0 && question.length === 0) {
        setError('Cannot leave card details empty')
      }
      else if(answer.length === 0) {
        setError('Answer cannot be empty')
      }
      else if(question.length === 0) {
        setError('Question cannot be empty')
      }
      else {
        const card = {
          question,
          answer
        }
        addCardtoDeck(title, questions, card)
        navigation.navigate('Deck', {
          title,
          questions
        })
      }
    }

    return (
      <View style={styles.container}>
      <Text style={styles.question}>Question:</Text>
      <TextInput
        style={styles.input}
        placeholder=''
        onChangeText={setQuestion}
        value={question}
      />
      <Text style={styles.question}>Answer:</Text>
      <TextInput
        style={styles.input}
        placeholder=''
        onChangeText={setAnswer}
        value={answer}
      />
      {question.length === 0 && <Text style={styles.error}>
        {error}
      </Text>
      }
      <Button title='Submit' color='purple' onPress={submitDeck}/>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    marginTop: 10,
    marginBottom: 10
  },
  question: {
    fontWeight: 'bold',
    fontSize: 20
  },
  error: {
    marginBottom: 10,
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
