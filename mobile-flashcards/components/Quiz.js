import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QuizCard from './QuizCard';
import QuizScore from './QuizScore';

export default function Quiz({ navigation, route }) {
    const { deck: { title, questions } } = route.params
    const [cardIndex, setCardIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);

    const remainingCards = questions.length - cardIndex;

    const handleCorrectAnswer = () => {
      setCorrectAnswers(correctAnswers + 1)
      setCardIndex(cardIndex + 1)
    }

    const handleIncorrectAnswer = () => {
      setIncorrectAnswers(incorrectAnswers + 1)
      setCardIndex(cardIndex + 1)
    }

    const restartQuiz = () => {
      setCorrectAnswers(0)
      setIncorrectAnswers(0)
      setCardIndex(0)
    }

    const returnToDeck = () => {
      setCorrectAnswers(0)
      setIncorrectAnswers(0)
      setCardIndex(0)

      navigation.navigate('Deck', {
        title,
        questions
      })
    }

    return (
      <View style={styles.container}>
        { remainingCards === 0
          ? <QuizScore
              score={correctAnswers}
              total={questions.length}
              restartQuiz={restartQuiz}
              returnToDeck={returnToDeck}
            />
          : <QuizCard
              card={questions[cardIndex]}
              cardIndex={cardIndex}
              total={questions.length}
              handleCorrectAnswer={handleCorrectAnswer}
              handleIncorrectAnswer={handleIncorrectAnswer}
          />
        }
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    padding: 20
  }
});