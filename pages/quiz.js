import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export default function PageQuiz() {
  return (
    <QuizBackground backgroundImage={db.bg}>

      <Link href="/">
        <a>Voltar Para Home</a>
      </Link>

    </QuizBackground>
  );
}
