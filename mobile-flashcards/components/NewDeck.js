import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { saveDeck, fetchAllDecks } from '../utils/api';

export default function NewDeck({ navigation }) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null)

    const submitDeck = () => {
      if(title.length === 0) {
        setError('Title cannot be empty')
      }
      else {
        saveDeck(title)
        navigation.navigate('Deck', {
          title,
          questions: []
        })
      }
    }

    return (
      <View style={styles.container}>
      <Text style={styles.title}>What is the title of your deck?</Text>
      <TextInput
        style={styles.input}
        placeholder=''
        onChangeText={setTitle}
        value={title}
      />
      {title.length === 0 && <Text style={styles.error}>
        {error}
      </Text>
      }
      <Button title='Create Deck' color='purple' onPress={submitDeck}/>
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
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    marginTop: 10,
    marginBottom: 10
  },
  title: {
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
