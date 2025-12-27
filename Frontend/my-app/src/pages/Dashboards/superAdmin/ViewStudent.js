import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewStudent.css";

import {
  useGetAllStudentsQuery,
  useDeleteStudentMutation,
} from "../../../redux/services/studentApi";

const ViewStudent = () => {
  const navigate = useNavigate();

  /* =====================
     LOCAL UI STATE
     ===================== */
  const [search, setSearch] = useState("");
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  /* =====================
     API CALLS (RTK QUERY)
     ===================== */
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetAllStudentsQuery();

  const [deleteStudent] = useDeleteStudentMutation();

  const students = Array.isArray(data)
    ? data
    : data?.students || [];

  /* =====================
     HANDLERS
     ===================== */
  const handleEdit = (id) => navigate(`/students/edit/${id}`);

  const confirmDelete = (id, name) =>
    setDeleteConfirm({ id, name });

  const cancelDelete = () => setDeleteConfirm(null);

  const handleDelete = async (id, name) => {
    try {
      await deleteStudent(id).unwrap();
      setDeleteConfirm(null);
      alert(`✅ Student "${name}" deleted successfully`);
    } catch (err) {
      alert("❌ Failed to delete student");
    }
  };

  /* =====================
     FILTER + SORT
     ===================== */
  const filtered = students
    .filter((s) =>
      `${s.name} ${s.studentId} ${s.email} ${s.group} ${s.course}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  /* =====================
     GROUP BY COURSE
     ===================== */
  const groupedByCourse = filtered.reduce((acc, student) => {
    acc[student.course] = acc[student.course] || [];
    acc[student.course].push(student);
    return acc;
  }, {});

  /* =====================
     LOADING / ERROR UI
     ===================== */
  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading students...</p>
      </div>
    );

  if (error)
    return (
      <div className="status-text error">
        Failed to load students
        <button onClick={refetch}>Retry</button>
      </div>
    );

  /* =====================
     JSX
     ===================== */
  return (
    <div className="student-page">

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete student{" "}
                <strong>{deleteConfirm.name}</strong>?
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="modal-confirm-btn"
                onClick={() =>
                  handleDelete(
                    deleteConfirm.id,
                    deleteConfirm.name
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="student-header">
        <div className="header-content">
          <h1 className="page-title">Student Management</h1>
          <p className="page-subtitle">
            View and manage all registered students (
            {students.length} total)
          </p>
        </div>
        <button
          className="add-btn"
          onClick={() => navigate("/students/signup")}
        >
          + Add New Student
        </button>
      </div>

      {/* CONTROLS */}
      <div className="student-controls">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, course, group, or student ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="control-actions">
          <label>Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Name (A → Z)</option>
            <option value="desc">Name (Z → A)</option>
          </select>

          <button onClick={refetch}>Refresh</button>
        </div>
      </div>

      {/* COURSE SECTIONS */}
      {Object.keys(groupedByCourse).length === 0 ? (
        <div className="empty-state">
          <h3>No students found</h3>
          <p>Try adjusting your search or add a new student.</p>
        </div>
      ) : (
        <div className="course-sections">
          {Object.keys(groupedByCourse).map((course) => (
            <div key={course} className="course-card">
              <div
                className="course-header"
                onClick={() =>
                  setExpandedCourse(
                    expandedCourse === course ? null : course
                  )
                }
              >
                <h3>{course}</h3>
                <span>
                  {groupedByCourse[course].length} students
                </span>
              </div>

              {expandedCourse === course && (
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Student ID</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Group</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedByCourse[course].map((s, i) => (
                      <tr key={s._id}>
                        <td>{i + 1}</td>
                        <td>{s.name}</td>
                        <td>{s.studentId || "—"}</td>
                        <td>{s.email}</td>
                        <td>{s.course}</td>
                        <td>{s.group || "—"}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(s._id)}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              confirmDelete(s._id, s.name)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div className="student-footer">
        <p>
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{students.length}</strong> students across{" "}
          <strong>
            {Object.keys(groupedByCourse).length}
          </strong>{" "}
          courses
        </p>
      </div>
    </div>
  );
};

export default ViewStudent;
