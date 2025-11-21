
// http://localhost:3000/api/superadmin/faculty/add

// {
  //  "facultyId": "CA-F01",
//   "name": "Anam Sheikh",
//   "email": "anam@college.com",
//   "mobileNumber": "9876543210",
//   "department": "Computer Application",
//   "designation": "Assistant Professor",
//   "password": "Temp@123"
// }

// delete
//http://localhost:3000/api/superadmin/faculty/delete/F001

// get faculty
// http://localhost:3000/api/superadmin/faculty/all
 // http://localhost:3000/api/superadmin/faculty/all?department=Computer%20Application&page=1&limit=10&sortBy=name&sortOrder=asc



 
const Faculty = require("../../models/FacultyModel");
const bcrypt = require("bcryptjs");

/* =========================
   ADD FACULTY (HOD WORK)
========================= */
exports.addFaculty = async (req, res) => {
  try {
    const { 
      facultyId, name, email, mobileNumber, department, designation, password 
    } = req.body;

    if (!facultyId || !name || !email || !mobileNumber || !department || !designation || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingEmail = await Faculty.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Faculty already exists with this email." });
    }

    const existingId = await Faculty.findOne({ facultyId });
    if (existingId) {
      return res.status(400).json({ message: "Faculty ID already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = new Faculty({
      facultyId,
      name,
      email,
      mobileNumber,
      department,
      designation,
      password: hashedPassword,
      isTempPassword: true
    });

    await newFaculty.save();

    return res.status(201).json({
      message: "Faculty added successfully.",
      facultyId
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

/* =========================
   DELETE FACULTY
========================= */
exports.deleteFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const faculty = await Faculty.findOneAndDelete({ facultyId });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    return res.status(200).json({ message: "Faculty deleted successfully." });

  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

/* =========================
   HOD - VIEW FACULTY (FILTER + SORT + PAGINATION)
========================= */
exports.getAllFaculty = async (req, res) => {
  try {
    const {
      facultyId,
      name,
      email,
      mobileNumber,
      department,
      designation,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 20
    } = req.query;

    const query = {};

    if (facultyId) query.facultyId = facultyId;
    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };
    if (mobileNumber) query.mobileNumber = mobileNumber;
    if (department) query.department = department;
    if (designation) query.designation = designation;

    const sortQuery = {};
    sortQuery[sortBy] = sortOrder === "asc" ? 1 : -1;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const facultyList = await Faculty.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNumber)
      .select("-password -__v");

    const total = await Faculty.countDocuments(query);

    return res.status(200).json({
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      faculty: facultyList
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};
