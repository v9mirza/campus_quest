const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");

const {
  addFaculty,
  loginFaculty,
  changePassword,
  deleteFaculty,
  getAllFaculty,
  refreshToken
} = require("../controllers/facultyController");



router.post("/add",addFaculty);
router.post("/login", loginFaculty);
router.put("/update-password",changePassword);
router.delete("/delete/:facultyId",authSuperAdmin,deleteFaculty);
router.get("/all",getAllFaculty);
router.post("/refresh_token",refreshToken);
module.exports = router;

