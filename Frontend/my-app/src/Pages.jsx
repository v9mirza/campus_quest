import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CreateQuiz from './pages/CreateQuiz';

const Pages = () => {
  return (
    <div>
        <Routes>
        <Route path="/create-quiz" element={<CreateQuiz />} />

        </Routes>
    </div>
  )
}

export default Pages