import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CreateQuiz from './pages/CreateQuiz';
import QuestionsPage from './pages/QuestionsPage';
import Login from './pages/student/auth/Login';
import Signup from './pages/student/auth/Signup';
import Otp from "./pages/student/auth/Otp";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/questions" element={<QuestionsPage/>}/>
        <Route path="/student/login" element={<Login />} />
        <Route path="/student/signup" element={<Signup />} />
        <Route path="/verifyOtp" element={<Otp/>}/>
      </Routes>
    </div>
  )
}

export default Pages;
