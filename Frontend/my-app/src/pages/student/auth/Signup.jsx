import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setStudentField,
  resetStudentForm,
} from "../../../redux/features/studentSlice";
import { useRegisterStudentMutation } from "../../../redux/services/studentApi";
import { useGetAllDepartmentsQuery } from "../../../redux/services/departmentApi";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ SAFE destructuring (prevents crash)
  const {
    enrollmentNumber = "",
    name = "",
    gender = "",
    email = "",
    mobileNumber = "",
    department = "",
    course = "",
    semester = "",
    group = "",
    password = "",
    confirmPassword = "",
  } = useSelector((state) => state.student || {});

  const [registerStudent, { isLoading }] =
    useRegisterStudentMutation();

  // 🔹 Departments API
  const {
    data: departments,
    isLoading: departmentsLoading,
    isError: departmentsError,
  } = useGetAllDepartmentsQuery();

  const departmentList =
    departments?.data?.[0]?.departmentNames || [];

  // 🔹 Handle input change
  const handleChange = (e) => {
    dispatch(
      setStudentField({
        field: e.target.name,
        value: e.target.value,
      })
    );
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!email.endsWith("@student.iul.ac.in")) {
      alert("Only college email is allowed");
      return;
    }

    try {
      const payload = {
        enrollmentNumber,
        name,
        gender,
        email,
        mobileNumber,
        department,
        course,
        semester,
        group,
        password,
      };

      const res = await registerStudent(payload).unwrap();

      if (res) {
        dispatch(resetStudentForm());
        navigate("/verifyOtp", {
          state: { email },
        });
      }
    } catch (err) {
      console.error(err);
      alert(err?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: "800px" }}>
        <h2 className="auth-title">Student Registration</h2>
        <p className="auth-subtitle">
          Join the Campus Quest community
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="signup-grid">
            <input
              name="enrollmentNumber"
              placeholder="Enrollment Number"
              value={enrollmentNumber}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <input
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="student@student.iul.ac.in"
              value={email}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <input
              name="mobileNumber"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <select
              name="gender"
              value={gender}
              onChange={handleChange}
              className="auth-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* ✅ FIXED department select */}
            <select
              name="department"
              value={department}
              onChange={handleChange}
              className="auth-select"
              disabled={departmentsLoading}
              required
            >
              <option value="">
                {departmentsLoading
                  ? "Loading departments..."
                  : "Select Department"}
              </option>

              {!departmentsLoading &&
                departmentList.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>

            {departmentsError && (
              <p style={{ color: "red" }}>
                Failed to load departments
              </p>
            )}

            <input
              name="course"
              placeholder="Course"
              value={course}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <input
              name="semester"
              type="number"
              placeholder="Semester"
              value={semester}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <input
              name="group"
              placeholder="Group"
              value={group}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>

          <div className="signup-grid">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>

          <button className="auth-button" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/student/login" className="auth-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
