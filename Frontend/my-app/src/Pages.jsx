import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CreateQuiz from './pages/CreateQuiz';
<<<<<<< HEAD
import QuestionsPage from './pages/QuestionsPage';
=======
import Login from './pages/Login';
import Signup from './pages/Signup';
>>>>>>> df18ba1920e9fab43f2fe66e6b588cd5e1350568

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/create-quiz" element={<CreateQuiz />} />
<<<<<<< HEAD
        <Route path="/questions" element={<QuestionsPage/>}/>
        </Routes>
=======
        <Route path="/student/login" element={<Login />} />
        <Route path="/student/signup" element={<Signup />} />
      </Routes>
>>>>>>> df18ba1920e9fab43f2fe66e6b588cd5e1350568
    </div>
  )
}

export default Pages