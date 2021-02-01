import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';
import AlternativesForm from '../src/components/AlternativesForm';


function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>
      <Widget.Content>
        <p>Você Acertou
        {' '}
        {results.filter((x) => x).length}
        {' '}
        perguntas</p>
        <ul>
          {results.map((result, index) => 
            <li key={`result__${result}`}>
              #{index+1}{' '}
              {result === true ? 'ACERTOU' : 'ERROU'}
            </li>
          )}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        Carregando...
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ 
  question, 
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionID = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
        <Widget.Header>
          <h1>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </h1>
        </Widget.Header>

        <img
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover'
          }}
          src={question.image}
        ></img>

        <Widget.Content>
          <h2>{question.title}</h2>
          <p>{question.description}</p>

          <AlternativesForm
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              setIsQuestionSubmited(true);
              setTimeout(() => {
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmited(false);
                setSelectedAlternative(undefined);
              }, 3 * 1000);
            }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
                const alternativeID = `alternative__${alternativeIndex}`;
                const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                const isSelected = selectedAlternative === alternativeIndex;
                return (
                  <Widget.Topic 
                    as="label"
                    key={alternativeID}
                    htmlFor={alternativeID}
                    data-selected={isSelected}
                    data-status={isQuestionSubmited && alternativeStatus}
                  >
                    <input 
                      id={alternativeID} 
                      name={questionID}
                      type="radio"
                      style={{ display: 'none' }}
                      onChange={() => setSelectedAlternative(alternativeIndex)}
                    />
                    {alternative}
                  </Widget.Topic>
                );
              }
            )}
            
            <Button type="submit" disabled={!hasAlternativeSelected}>
              Confirmar
            </Button>

            <p>{selectedAlternative}</p>

            {isQuestionSubmited && isCorrect && <p>Acertou!</p>}
            {isQuestionSubmited && !isCorrect && <p>Errou!</p>}

          </AlternativesForm>

        </Widget.Content>

      </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function PageQuiz() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  
  function addResult(result) {
      setResults([
        ...results,
        result,
      ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if(nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }
  
  return (
    <QuizBackground backgroundImage={db.bg}>

      <Link href="/">
        <a>Voltar Para Home</a>
      </Link>
      
      <QuizContainer>
        <QuizLogo />

        { screenState === screenStates.QUIZ && (
          <QuestionWidget 
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        ) }

        { screenState === screenStates.LOADING && <LoadingWidget /> }

        { screenState === screenStates.RESULT && <ResultWidget results={results} /> }
        
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/robinhosjc" />

    </QuizBackground>
  );
}
