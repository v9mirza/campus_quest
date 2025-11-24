const express = require("express");
const router = express.Router();

const {
  createOrMergeCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

// Create or merge course
router.post("/add", createOrMergeCourse);

// Get all courses
router.get("/", getAllCourses);

// Get course by id
router.get("/:id", getCourseById);

// Update course
router.put("/:id", updateCourse);

// Delete course
router.delete("/:id", deleteCourse);

module.exports = router;
