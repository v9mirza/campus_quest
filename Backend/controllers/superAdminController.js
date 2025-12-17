// http://localhost:3000/api/superadmin/register



// {
//   "name": "Dr. Faizan",
//   "email": "faizan@college.com",
//   "password": "Faizan123",
//   "department": "Computer Application"
// }

// {
//   "superAdminId": "CA-SUP-2025-XXXX",
//   "password": "Faizan123"
// }


const SuperAdmin = require("../models/superAdminModel");
const bcrypt = require("bcryptjs");



exports.registerSuperAdmin = async (req, res) => {
  try {
    const { name,facultyId, email, password, department } = req.body;
    console.log(req.body);

    if (!name || !email || !password || !department || !facultyId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await SuperAdmin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const generatedId = generateSuperAdminId(department);

    const admin = new SuperAdmin({
      superAdminId: generatedId,
      name,
      facultyId,
      email,
      password: hashedPassword,
      department
    });

    await admin.save();

    return res.status(201).json({
      message: "Super Admin registered successfully.",
      facultyId: admin.facultyId,
      name: admin.name,
      email: admin.email,
      department: admin.department 
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};


exports.loginSuperAdmin = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    if (!facultyId || !password) {
      return res.status(400).json({ message: "ID and Password required." });
    }

    const admin = await SuperAdmin.findOne({ facultyId });
    if (!admin) {
      return res.status(400).json({ message: "Invalid ID." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    return res.status(200).json({
      message: "Login successful.",
      admin: {
        facultyId: admin.facultyId,
        name: admin.name,
        email: admin.email,
        department: admin.department
      }
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};
