import React from 'react';
import Header from './Header';
import Links from './Links';
import { useParams } from 'react-router-dom';

export default function Home() {
  const { userId } = useParams();

  console.log('Rendered Home with userId:', userId);

  return (
    <>
      <Header user={userId} />
      <div className="start-title">
        <h1 id='start' className="text-4xl">Start Quiz....</h1>
        <Links />
      </div>
    </>
  );
}
