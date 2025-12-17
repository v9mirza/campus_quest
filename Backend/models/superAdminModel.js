const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    facultyId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    designation: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
   departmentQuizzes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
  }
],
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
module.exports = SuperAdmin;