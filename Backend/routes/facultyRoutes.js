// const express = require("express");
// const router = express.Router();

// const {
//   addFaculty,
//   loginFaculty,
//   updatePassword,
//   deleteFaculty,
//   getAllFaculty
// } = require("../controllers/faculty/facultyControllers");

// // HOD adds new faculty
// router.post("/add", addFaculty);

// // Faculty login
// router.post("/login", loginFaculty);

// // Faculty updates password on first login
// router.put("/update-password", updatePassword);

// // HOD delete faculty
// router.delete("/:facultyId", deleteFaculty);

// // Get all faculty (optional for dashboard)
// router.get("/all", getAllFaculty);

// module.exports = router;





// const express = require('express');
// const router = express.Router();

// // ✅ Correct require
// const facultyController = require('../controllers/faculty/facultyProfile');

// // Faculty login + password
// router.post('/faculty/login', facultyController.loginFaculty);
// router.post('/faculty/update-password', facultyController.updatePassword);

// module.exports = router;



const express = require('express');
const router = express.Router();

// Controllers
const facultyController = require('../controllers/faculty/facultyProfile');

// ===== Faculty Routes =====
router.post('/login', facultyController.loginFaculty);
router.post('/update-password', facultyController.updatePassword);

module.exports = router;
