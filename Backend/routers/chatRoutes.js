const express = require("express");
const router = express.Router();
const {generateQuizQuestion}  = require('../controllers/chatController');

router.post('/generate-questions',generateQuizQuestion);


module.exports = router;