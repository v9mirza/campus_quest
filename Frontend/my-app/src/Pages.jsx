import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CreateQuiz from './pages/CreateQuiz';
import QuestionsPage from './pages/QuestionsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AI from './pages/AI';


const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/questions" element={<QuestionsPage/>}/>
        <Route path="/chat" element={<AI/>}/>
        <Route path="/student/login" element={<Login />} />
        <Route path="/student/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default Pages