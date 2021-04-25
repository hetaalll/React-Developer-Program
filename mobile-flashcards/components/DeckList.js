import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, Animated } from 'react-native';
import { fetchAllDecks } from '../utils/api';

export default function DeckList({ navigation, route }) {
    const [allDecks, setAllDecks] = useState([]);
    const bounceValue = new Animated.Value(1);

    useEffect(() => {
      if(route.params !== undefined) {
        const { decksList } = route.params
        const decksListArray = convertObjectToArray(decksList)
        setAllDecks(decksListArray)
      }
      else {
        fetchAllDecks()
        .then(convertObjectToArray)
        .then(setAllDecks);
      }
    }, [route])

    const convertObjectToArray = (decks) => {
      const arr = Object.entries(decks)
      const decksArray = []
      for(let i = 0; i < arr.length; i++) {
        decksArray.push(arr[i][1])
      }
      return decksArray;
    }

    const openDeck = (title, questions) => {
      Animated.sequence([
        Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
        Animated.spring(bounceValue, { toValue: 1, friction: 4})
      ]).start()

      setTimeout(() => {
        navigation.navigate('Deck', {
          title,
          questions
        })
      }, 500);
    }

    const addNewDeck = () => {
      navigation.navigate('NewDeck')
    }

    const renderDeckList = ({ item }) => (
      <TouchableOpacity
        onPress={() => openDeck(item.title, item.questions)}
      >
        <Animated.View style={[styles.row, {transform: [{scale: bounceValue}]}]}>
          <Text style={styles.title}>{ item.title }</Text>
          <Text>{ item.questions.length } cards </Text>
        </Animated.View>
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
