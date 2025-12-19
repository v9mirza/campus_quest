const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");

const {
  addFaculty,
  loginFaculty,
  changePassword,
  deleteFaculty,
  getAllFaculty,
  refreshToken,
  forgotPassword,       
  resetPassword         
} = require("../controllers/facultyController");




router.post("/add",addFaculty);
router.post("/login", loginFaculty);
router.put("/update-password",changePassword );
router.delete("/delete/:facultyId",authSuperAdmin,deleteFaculty);
router.get("/all",getAllFaculty);
router.post("/refresh_token",refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;

