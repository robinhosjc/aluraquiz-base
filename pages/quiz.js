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



function QuestionWidget({ question, totalQuestions, questionIndex }) {
  const questionID = `question__${questionIndex}`;

  return (
    <Widget>
        <Widget.Header>
          <h3>
            {`Pergunta ${questionIndex + 1} de ${db.questions.length}`}
          </h3>
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

          <form>
            {question.alternatives.map((alternative, alternativeIndex) => {
                const alternativeID = `alternative__${alternativeIndex}`;
                return (
                  <Widget.Topic 
                    as="label"
                    htmlFor={alternativeID}
                  >
                    <input 
                      id={alternativeID} 
                      name={questionID}
                      type="radio"
                    />
                    {alternative}
                  </Widget.Topic>
                );
              }
            )}
            
            <Button type="submit">
              Confirmar
            </Button>
          </form>

        </Widget.Content>

      </Widget>
  );
}

export default function PageQuiz() {
  const totalQuestions = db.questions.length;
  const questionIndex = 0;
  const question = db.questions[questionIndex];
  

  return (
    <QuizBackground backgroundImage={db.bg}>

      <Link href="/">
        <a>Voltar Para Home</a>
      </Link>
      
      <QuizContainer>
        <QuizLogo />

        <QuestionWidget 
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
        />
        
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/robinhosjc" />

    </QuizBackground>
  );
}
