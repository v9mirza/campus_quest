const express = require("express");
const router = express.Router();

/* ================= CONTROLLERS ================= */
const studentController = require("../controllers/studentController");
const feedbackController = require("../controllers/feedbackController");

<<<<<<< HEAD
/* ================= MIDDLEWARE ================= */
const authUser = require("../middleware/authUser");
const authFacultyOrSuperAdmin = require("../middleware/authFacultyOrAdmin");

/* =================================================
   AUTH & ACCOUNT
================================================= */
=======
const authFacultyOrSuperAdmin = require("../middleware/authFacultyOrAdmin");

const authUser = require("../middleware/authUser");

/* ================= AUTH ================= */
>>>>>>> origin/faizan_branch

// REGISTER
router.post("/register", studentController.registerStudent);

<<<<<<< HEAD
// LOGIN
router.post("/login", studentController.loginStudent);
=======
// GET STUDENT PROFILE
router.get("/me", authUser, studentController.getStudentProfile);
>>>>>>> origin/faizan_branch

// VERIFY EMAIL (OTP)
router.post("/verify-email", studentController.verifyEmail);

<<<<<<< HEAD
// RESEND OTP
router.post("/resend-otp", studentController.resendOtp);
=======
// LOGIN - DUPLICATE ROUTES (COMMENTED ONE)
// router.post("/login", studentController.loginStudent);
router.post("/login", studentController.loginStudent);
>>>>>>> origin/faizan_branch

// REFRESH TOKEN
router.post("/refresh", studentController.refreshToken);

// FORGOT PASSWORD
router.post("/forgot-password", studentController.forgotPassword);

// RESET PASSWORD
router.post("/reset-password", studentController.resetPassword);

// LOGOUT
router.post("/logout", authUser, studentController.logoutStudent);

// GET LOGGED-IN USER PROFILE
router.get("/profile", authUser, studentController.getMe);

/* =================================================
   STUDENT MANAGEMENT (ADMIN / FACULTY)
================================================= */

// GET ALL STUDENTS
router.get("/", authFacultyOrSuperAdmin, studentController.getAllStudents);

// GET REGISTERED STUDENTS
router.get("/registered-students", authFacultyOrSuperAdmin, studentController.getRegisteredStudents);

// GET STUDENT QUIZZES
router.get("/students-quizzes/:id", authFacultyOrSuperAdmin, studentController.getStudentQuizzes);

// GET SINGLE STUDENT
router.get("/:id", authFacultyOrSuperAdmin, studentController.getStudent);

// DELETE STUDENT
router.delete("/:id", authFacultyOrSuperAdmin, studentController.deleteStudent);

<<<<<<< HEAD
/* =================================================
   FEEDBACK
================================================= */

// SUBMIT FEEDBACK (student → quiz)
router.post(
  "/:quizId/feedback",
  authUser,
  feedbackController.submitFeedback
);
=======
// Test route (commented in both files)
// router.get("/:id", (req, res) => {
//   console.log("Student ID requested:", req.params.id);
//   res.json({ ok: true });
// });

/* ================= FEEDBACK ================= */

// SUBMIT FEEDBACK - DUPLICATE ROUTES WITH DIFFERENT MIDDLEWARE
// router.post("/feedback", auth, feedbackController.submitFeedback);
router.post("/feedback", authUser, feedbackController.submitFeedback);

// GET QUIZ RATING
router.get("/rating/:quizId", feedbackController.getQuizRating);
>>>>>>> origin/faizan_branch

// GET QUIZ RATING
router.get(
  "/rating/:quizId",
  feedbackController.getQuizRating
);

// GET ALL FEEDBACKS (admin / faculty)
router.get(
  "/all-feedbacks",
  authFacultyOrSuperAdmin,
  feedbackController.getAllFeedbacks
);

module.exports = router;