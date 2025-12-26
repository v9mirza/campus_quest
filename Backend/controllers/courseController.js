const Course = require("../models/courseModel");

function normalizeInput(data) {
  return {
    department: data.department ? String(data.department).trim() : "",
    courseName: data.courseName ? String(data.courseName).trim() : "",
    year: Number(data.year),
    groups: Array.isArray(data.groups)
      ? data.groups.map(g => String(g).trim()).filter(Boolean)
      : [],
    createdBy: data.createdBy
  };
}


exports.createCourse = async(req,res)=>{
  try{
    // const {createdBy} = req.superAdmin;
    const {department, courseName, year, groups} = req.body;
    const newCourse = new Course({
      department: department ? String(department).trim() : "",
      courseName: Array.isArray(courseName) ? courseName.map(cn => String(cn).trim()).filter(Boolean) : [],
      year: Array.isArray(year) ? year.map(yr => Number(yr)) : [],
      groups: Array.isArray(groups) ? groups.map(g => String(g).trim()).filter(Boolean) : [],
      createdBy: createdBy
    });
    const savedCourse = await newCourse.save();
    console.log("Saved Course:", savedCourse);
    return res.status(201).json({
      message: "Course created successfully.",
      course: savedCourse
    });
  }catch(err){
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Course with the same details already exists."
      });
    }
  }
}
/***********************************
 * GET ALL COURSES (Filtered)
 ***********************************/
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();    
    return res.status(200).json({ total: courses.length, courses });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/***********************************
 * GET ONE Course
 ***********************************/
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ message: "Course not found." });

    return res.status(200).json(course);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/***********************************
 * UPDATE Course
 ***********************************/
exports.updateCourse = async (req, res) => {
  try {
    const body = normalizeInput(req.body);

    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Course not found." });

    return res.status(200).json({
      message: "Course updated successfully.",
      course: updated
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Update would create a duplicate course."
      });
    }
    return res.status(500).json({ error: err.message });
  }
};

/***********************************
 * DELETE Course
 ***********************************/
exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Course not found." });

    return res.status(200).json({ message: "Course deleted." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const {courseName, year } = req.body;
    if (!courseName || !year) {
      return res.status(400).json({ message: "courseName and year are required." });
    }
   const course = await Course.findOne({
      courseName: String(courseName).trim(),
      year: Number(year)
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    return res.status(200).json({ groups: course.groups });
  } 
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.createCoursesBulk = async (req, res) => {
  try {
    const { courses } = req.body;

    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({
        message: "Courses array is required"
      });
    }

    const created = [];
    const skipped = [];

    for (const item of courses) {
      const { department, courseName, year, groups } = item;

      if (!department || !Array.isArray(courseName)) {
        skipped.push({ department, reason: "Invalid data" });
        continue;
      }

      const exists = await Course.findOne({ department });

      if (exists) {
        skipped.push({ department, reason: "Already exists" });
        continue;
      }

      const newCourse = new Course({
        department: department.trim(),
        courseName: courseName.map(c => c.trim()),
        year: year || [],
        groups: groups || []
        // createdBy: req.superAdmin._id
      });

      const saved = await newCourse.save();
      created.push(saved);
    }

    return res.status(201).json({
      message: "Bulk course creation completed",
      createdCount: created.length,
      skippedCount: skipped.length,
      skipped
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
      error: err.message
    });
  }
};
