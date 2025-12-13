const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const multer = require('multer');


const upload = multer({
 storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024 
  }
});

router.post('/create-quiz',upload.any(), quizController.createQuiz);

router.get('/all-quizzes', quizController.getAllQuizzes);

router.get('/:quizId', quizController.getQuizById);

router.put('/:quizId', quizController.updateQuizById);

router.delete('/:quizId', quizController.deleteQuizById);

router.post('/:quizId/register-student', quizController.registerStudentForQuiz);

router.get('/department/:departmentName', quizController.getQuizzesByDepartment);

router.post('/:quizId/submit', quizController.submitQuiz);

router.get('/:quizId/start', quizController.QuizAttempt);

module.exports = router;