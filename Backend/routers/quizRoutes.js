const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');



router.post('/create-quiz', quizController.createQuiz);

router.get('/all-quizzes', quizController.getAllQuizzes);

router.get('/:quizId', quizController.getQuizById);

router.put('/:quizId', quizController.updateQuizById);

router.delete('/:quizId', quizController.deleteQuizById);

router.post('/:quizId/register-student', quizController.registerStudentForQuiz);

router.get('/department/:departmentName', quizController.getQuizzesByDepartment);

router.post('/:quizId/submit', quizController.submitQuiz);

module.exports = router;