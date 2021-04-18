import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import { fetchAllDecks } from '../utils/api';

export default function DeckList({ navigation }) {
    const [allDecks, setAllDecks] = useState([]);

    useEffect(() => {
      fetchAllDecks()
        .then(convertObjectToArray)
        .then(setAllDecks);
    }, [])

    console.log(allDecks)

    const convertObjectToArray = (decks) => {
      const arr = Object.entries(decks)
      const decksArray = []
      for(let i = 0; i < arr.length; i++) {
        decksArray.push(arr[i][1])
      }
      return decksArray;
    }

    const openDeck = (title, questions) => {
      navigation.navigate('Deck', {
        title,
        questions
      })
    }

    const addNewDeck = () => {
      navigation.navigate('NewDeck')
    }

    const renderDeckList = ({ item }) => (
      <TouchableOpacity
        onPress={() => openDeck(item.title, item.questions)}
      >
      <View style={styles.row}>
        <Text style={styles.title}>{ item.title }</Text>
        <Text>{ item.questions.length } cards </Text>
      </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={allDecks}
          keyExtractor={(deck) => deck.title}
          renderItem={renderDeckList}
        />
        <Button
          title="Add New Deck"
          color="purple"
          onPress={addNewDeck}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 20,
      padding: 20,
    },
    row: {
      margin: 15,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#eee',
      borderRadius: 7,
      padding: 20,
      marginTop: 10,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontWeight: 'bold'
    }
});
