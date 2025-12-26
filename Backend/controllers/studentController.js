const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

/* ================= REGISTER STUDENT ================= */
exports.registerStudent = async (req, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    if(!req.body.email.includes("@student.iul.ac.in")){
      return res.status(400).json({message:"Enter University Email"});
    }
    const student = await Student.create({
      ...req.body,
      emailVerificationCode: otp,
      emailVerificationExpires: Date.now() + 10 * 60 * 1000 // 10 min
    });
    await student.save();
   await sendEmail(
  student.email,
  "Verify your Campus Quest email",
  `
    <div style="font-family: Arial, sans-serif;">
      <h2>Email Verification</h2>
      <p>Your OTP for Campus Quest is:</p>
      <h1 style="color:#4F46E5;">${otp}</h1>
      <p>This code is valid for 5 minutes.</p>
    </div>
  `
);
    res.status(201).json({
      message: "Registration successful. Verification code sent to email."
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.resendOtp = async(req,res)=>{
try{
  const {email} = req.body;
 const otp = Math.floor(1000 + Math.random() * 9000).toString();
 const student = await Student.findOne({email:email});
 if (!student) return res.status(404).json({ msg: "Student not found" });
student.emailVerificationCode = otp;
student.emailVerificationExpires = Date.now() + 10 * 60 * 1000;
 await student.save();
  await sendEmail(
  email,
  "Verify your Campus Quest email",
  `
    <div style="font-family: Arial, sans-serif;">
      <h2>Email Verification</h2>
      <p>Your OTP for Campus Quest is:</p>
      <h1 style="color:#4F46E5;">${otp}</h1>
      <p>This code is valid for 5 minutes.</p>
    </div>
  `
);
res.status(201).json({msg:"Verification code sent to Email"});
}
catch(err){
   res.status(400).json({ error: err.message });
}
};

/* ================= VERIFY EMAIL ================= */
exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    if (
      student.emailVerificationCode !== otp ||
      student.emailVerificationExpires < Date.now()
    ) {
      return res.status(400).json({ msg: "Invalid or expired code" });
    }

    student.emailVerified = true;
    student.emailVerificationCode = null;
    student.emailVerificationExpires = null;

    await student.save();

    res.json({ msg: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ================= LOGIN STUDENT ================= */
exports.loginStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    if (!student.emailVerified) {
      return res.status(403).json({ msg: "Please verify your email first" });
    }

    const match = await bcrypt.compare(req.body.password, student.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    const accessToken = jwt.sign(
      { id: student._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: student._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    student.refreshToken = refreshToken;
    await student.save();

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ================= REFRESH TOKEN ================= */
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ msg: "Refresh token required" });

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const student = await Student.findById(decoded.id);
    if (!student || student.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: student._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ msg: "Invalid refresh token" });
  }
};

/* ================= GET ALL STUDENTS ================= */
exports.getAllStudents = async (req, res) => {
  const students = await Student.find().select("-password -refreshToken");
  res.json(students);
};

/* ================= GET ONE STUDENT ================= */
exports.getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id).select(
    "-password -refreshToken"
  );
  res.json(student);
};

/* ================= DELETE STUDENT ================= */
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ================= FORGOT PASSWORD ================= */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const resetToken = jwt.sign(
      { id: student._id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "15m" }
    );

    student.resetToken = resetToken;
    student.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await student.save();

    const resetLink = `http://localhost:3000/student/reset-password/${resetToken}`;

   await sendEmail(
  email,
  "Reset Your Campus Quest Password",
  `
  <div style="font-family: Arial, sans-serif; max-width: 420px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <h2 style="color:#4F46E5; margin-bottom: 10px;">Campus Quest</h2>

    <p style="font-size: 15px;">Hello <strong>${student.name}</strong>,</p>

    <p style="font-size: 14px; color: #374151;">
      Click the button below to reset your password.
    </p>

    <a
      href="${resetLink}"
      style="
        display: inline-block;
        margin: 16px 0;
        padding: 10px 20px;
        background: #4F46E5;
        color: #ffffff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        font-size: 14px;
      "
    >
      Reset Password
    </a>

    <p style="font-size: 12px; color: #6b7280;">
      This link is valid for 15 minutes.
    </p>
  </div>
  `
);

    res.json({ msg: "Password reset email sent" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ================= RESET PASSWORD ================= */
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const student = await Student.findById(decoded.id);
    if (
      !student ||
      student.resetToken !== token ||
      student.resetTokenExpiry < Date.now()
    ) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    student.password = newPassword;
    student.resetToken = null;
    student.resetTokenExpiry = null;

    await student.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};
