import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helper'

export default function QuizScore({ score, total, restartQuiz, returnToDeck }) {
    useEffect(() => {
      clearLocalNotification().then(setLocalNotification)
    }, [])

    return (
      <View style={styles.container}>
          <Text style={styles.title}> Score: { score } / {total} </Text>
          <TouchableOpacity onPress={restartQuiz} style={styles.restartBtn}>
            <Text style={{color: 'white'}}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={returnToDeck} style={styles.returnBtn}>
            <Text>Return to Deck</Text>
          </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      padding: 15
    },
    restartBtn: {
      padding: 20,
      backgroundColor: 'gray',
      margin: 15,
    },
    returnBtn: {
      padding: 20,
      borderWidth: 1,
      borderColor: 'black',
      margin: 15
    }
  });