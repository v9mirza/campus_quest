// const express = require("express");
// const router = express.Router();
// const {
//   registerSuperAdmin,
//   loginSuperAdmin
// } = require("../controllers/superAdmin/superAdminController");

// // REGISTER (Not visible on main UI)
// router.post("/register", registerSuperAdmin);

// // LOGIN (Visible on main UI)
// router.post("/login", loginSuperAdmin);

// module.exports = router;





// const express = require('express');
// const router = express.Router();

// // ✅ Correct requires
// const superAdminController = require('../controllers/superAdmin/superAdminController');
// const facultyManageController = require('../controllers/superAdmin/facultyManagement');


// // Super Admin Auth
// router.post('/superadmin/register', superAdminController.registerSuperAdmin);
// router.post('/superadmin/login', superAdminController.loginSuperAdmin);

// // Faculty Management (HOD)
// router.post('/faculty/add', facultyManageController.addFaculty);
// router.delete('/faculty/delete/:facultyId', facultyManageController.deleteFaculty);
// router.get('/faculty/all', facultyManageController.getAllFaculty);

// module.exports = router;


const express = require('express');
const router = express.Router();

// Controllers
const superAdminController = require('../controllers/superAdmin/superAdminController');
const facultyManageController = require('../controllers/superAdmin/facultyManagement');

// ===== Super Admin Routes =====
router.post('/register', superAdminController.registerSuperAdmin);
router.post('/login', superAdminController.loginSuperAdmin);

// ===== Faculty Management (HOD) =====
router.post('/faculty/add', facultyManageController.addFaculty);
router.delete('/faculty/delete/:facultyId', facultyManageController.deleteFaculty);
router.get('/faculty/all', facultyManageController.getAllFaculty);

module.exports = router;
