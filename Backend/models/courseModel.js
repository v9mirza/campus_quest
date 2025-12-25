// CourseModel.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    /**
     * Department name, e.g., CA, CS, IT
     * Stored in uppercase for consistent filtering and search
     */
    department: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    /**
     * Course name, e.g., BCA, MCA
     */
    courseName: {
      type: String,
      required: true,
      trim: true
    },

    /**
     * Normalized course name (lowercase) for case-insensitive search
     */
    normalizedCourseName: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },

    /**
     * Duration or max year of course
     */
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    /**
     * Groups (A, B, C...) only meaningful for single-course quizzes
     */
    groups: [
      {
        type: String,
        trim: true,
        uppercase: true,
        require:true
      }
    ],

    /**
     * Who added this course (HOD / SuperAdmin)
     */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
      required: true
    }
  },
  { timestamps: true }
);

/**
 * Pre-save hook to normalize course name
 */
courseSchema.pre("save", function (next) {
  if (this.isModified("courseName")) {
    this.normalizedCourseName = this.courseName.toLowerCase();
  }
  next();
});

/**
 * Unique index to prevent duplicate course in same department
 */
courseSchema.index(
  { department: 1, normalizedCourseName: 1 },
  { unique: true }
);

 module.exports = mongoose.model("Course", courseSchema);

