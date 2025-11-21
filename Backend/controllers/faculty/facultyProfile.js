
// http://localhost:3000/api/faculty/login
// {
//   "facultyId": "F001",
//   "password": "Temp1234"
// }

// http://localhost:3000/api/faculty/update-password

// {
//   "facultyId": "F001",
//   "newPassword": "NewPass123"
// }






const Faculty = require("../../models/FacultyModel");
const bcrypt = require("bcryptjs");

/* =========================
   FACULTY LOGIN
========================= */
exports.loginFaculty = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    if (!facultyId || !password) {
      return res.status(400).json({ message: "Faculty ID and password are required." });
    }

    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    return res.status(200).json({
      message: faculty.isTempPassword
        ? "Login successful. Please change your temporary password."
        : "Login successful.",
      requiresPasswordChange: faculty.isTempPassword
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

/* =========================
   UPDATE PASSWORD (FIRST LOGIN)
========================= */
exports.updatePassword = async (req, res) => {
  try {
    const { facultyId, newPassword } = req.body;

    if (!facultyId || !newPassword) {
      return res.status(400).json({ message: "Faculty ID and new password required." });
    }

    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    faculty.password = hashed;
    faculty.isTempPassword = false;

    await faculty.save();

    return res.status(200).json({ message: "Password updated successfully." });

  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};
