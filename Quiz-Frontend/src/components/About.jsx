import React from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'

function About() {
  const { userId } = useParams();
  return (
    <>
      <Header user={userId} />
      <div>
        <h1>About Page has to be completed</h1>
      </div>
    </>
  )
}

export default About
