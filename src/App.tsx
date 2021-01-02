import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions, Difficulty, QuestionState} from './API';
import {GlobalStyle, Wrapper} from './App.styles';

const TOTAL_QUESTION = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct) setScore(prev => prev+1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }
  const nextQuestion = () => {
    const nextQuestionNumber = number + 1;
    if(nextQuestionNumber === TOTAL_QUESTION) setGameOver(true)
    else setNumber(nextQuestionNumber);
  }
  return (
    <>
    <GlobalStyle />
    <Wrapper className="App">
      <h1>REACT QUIZ</h1>
      {
        (gameOver || userAnswers.length === TOTAL_QUESTION)
        &&
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      }
      { !gameOver && <p className="score">Score: {score}</p> }
      { loading && <p>Loading Question...</p>}
      {
        (!loading && !gameOver)
        &&
       <QuestionCard 
        questionN={number + 1}
        totalQuestions={TOTAL_QUESTION}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> }
      {
        (!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1)
        &&
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      }  
    </Wrapper>
    </>
  );
}

export default App;