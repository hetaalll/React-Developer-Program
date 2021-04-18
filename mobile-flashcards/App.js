import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DeckList">
        <Stack.Screen
          name="DeckList"
          component={DeckList}
          options={{ title: 'Flashcards' }}
        />
        <Stack.Screen
          name="Deck"
          component={Deck}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="NewDeck"
          component={NewDeck}
          options={{ title: 'Add New Deck' }}
        />
        <Stack.Screen
          name="NewCard"
          component={NewCard}
          options={{ title: 'Add New Card' }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ title: 'Quiz' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}