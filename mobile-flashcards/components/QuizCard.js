import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function QuizCard({ card, cardIndex, handleCorrectAnswer, handleIncorrectAnswer, total, showAnswer, setShowAnswer }) {
    const { question, answer } = card

    return (
      <View style={styles.main}>
        <View style={styles.container}>
            { showAnswer
            ? (
                <>
                <Text style={styles.title} >{answer}</Text>
                <TouchableOpacity onPress={() => setShowAnswer(false)} style={styles.showBtn}>
                    <Text>Show Question</Text>
                    </TouchableOpacity>
                </>)
            : (
                <>
                <Text style={styles.title} >{question}</Text>
                <TouchableOpacity onPress={() => setShowAnswer(true)} style={styles.showBtn}>
                    <Text>Show Answer</Text>
                    </TouchableOpacity>
                </>)
            }
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleCorrectAnswer} style={styles.correctBtn}>
                    <Text style={{color: 'white'}}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIncorrectAnswer} style={styles.incorrectBtn}>
                    <Text style={{color: 'white'}}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.containerBottom}>
            <Text style={{fontSize: 15}}>{cardIndex + 1} / {total} </Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: 'space-around'
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    containerBottom: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 18,
      padding: 15
    },
    btnContainer: {
      flexDirection: 'row',
    },
    correctBtn: {
      padding: 20,
      backgroundColor: 'green',
      margin: 15,
    },
    incorrectBtn: {
      padding: 20,
      backgroundColor: 'red',
      margin: 15,
    },
    showBtn: {
      padding: 5,
      borderWidth: 1,
      borderColor: 'black',
      marginTop: 10,
      marginBottom: 10
    }
  });