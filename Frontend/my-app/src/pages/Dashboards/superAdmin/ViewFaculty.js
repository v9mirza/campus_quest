import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewFaculty.css";
import {
  Search,
  Download,
  Eye,
  Edit2,
  Trash2,
  UserPlus,
  X,
  ChevronLeft,
  ChevronRight,
  Building,
  Mail,
  Award,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";

import {
  useGetAllFacultyQuery,
  useDeleteFacultyMutation,
} from "../../../redux/services/facultyApi";

import {
  useGetAllDepartmentsQuery,
} from "../../../redux/services/departmentApi";

const ViewFaculty = () => {
  const navigate = useNavigate();

  /* =====================
     LOCAL UI STATE
     ===================== */
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(null);

  const [filters, setFilters] = useState({
    department: "",
    designation: "",
    status: "",
  });

  const itemsPerPage = 10;

  /* =====================
     API CALLS
     ===================== */
  const {
    data: facultyData,
    isLoading: facultyLoading,
    error,
    refetch,
  } = useGetAllFacultyQuery();

  const {
    data: departmentData,
    isLoading: departmentLoading,
  } = useGetAllDepartmentsQuery();

  const [deleteFaculty] = useDeleteFacultyMutation();

  const faculties = facultyData?.faculty || [];

  const departmentList =
    departmentData?.data?.[0]?.departmentNames || [];

  const departments = ["All", ...departmentList];

  const designations = [
    "All",
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
    "Head of Department",
  ];

  const statuses = ["All", "Active", "Inactive"];

  /* =====================
     HANDLERS
     ===================== */
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "All" ? "" : value,
    }));
    setCurrentPage(1);
  };

  const handleDelete = async (facultyId) => {
    try {
      await deleteFaculty(facultyId).unwrap();
      setDeleteModal(null);
    } catch (err) {
      alert("❌ Failed to delete faculty");
    }
  };

  const clearFilters = () => {
    setFilters({
      department: "",
      designation: "",
      status: "",
    });
    setSearch("");
    setCurrentPage(1);
  };

  /* =====================
     FILTERING
     ===================== */
  const filteredFaculties = faculties.filter((f) => {
    const matchesSearch = `${f.name} ${f.facultyId} ${f.email}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      !filters.department ||
      f.department?.toLowerCase() ===
        filters.department.toLowerCase();

    const matchesDesignation =
      !filters.designation ||
      f.designation
        ?.toLowerCase()
        .includes(filters.designation.toLowerCase());

    const matchesStatus =
      !filters.status ||
      (filters.status === "Active" ? f.isActive : !f.isActive);

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesDesignation &&
      matchesStatus
    );
  });

  /* =====================
     PAGINATION
     ===================== */
  const totalPages = Math.ceil(
    filteredFaculties.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaculties = filteredFaculties.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* =====================
     HELPERS
     ===================== */
  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const exportToCSV = () => {
    const headers = [
      "Faculty ID",
      "Name",
      "Email",
      "Department",
      "Designation",
      "Status",
    ];

    const rows = filteredFaculties.map((f) =>
      [
        f.facultyId,
        `"${f.name}"`,
        f.email,
        f.department,
        f.designation || "N/A",
        f.isActive ? "Active" : "Inactive",
      ].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "faculty_list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* =====================
     LOADING / ERROR UI
     ===================== */
  if (facultyLoading || departmentLoading) {
    return (
      <div className="status-container">
        <div className="status-card">
          <div className="loading-spinner"></div>
          <p>Loading faculty data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container">
        <div className="status-card">
          <AlertCircle size={48} color="#f43f5e" />
          <p className="status-text error">
            Failed to load faculty data
          </p>
          <button className="secondary-btn" onClick={refetch}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* =====================
     JSX
     ===================== */
  return (
    <div className="faculty-page">

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button onClick={() => setDeleteModal(null)}>
                <X size={18} />
              </button>
            </div>
            <p>
              Delete <strong>{deleteModal.name}</strong> (ID:{" "}
              {deleteModal.id})?
            </p>
            <div className="modal-actions">
              <button onClick={() => setDeleteModal(null)}>
                Cancel
              </button>
              <button
                className="confirm-btn"
                onClick={() => handleDelete(deleteModal.id)}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="faculty-header">
        <div>
          <h2>
            <Users size={30} /> Faculty Management
          </h2>
          <p>View and manage all faculty members</p>
        </div>
        <button
          className="primary-btn"
          onClick={() => navigate("/superadmin/add-faculty")}
        >
          <UserPlus size={18} /> Add Faculty
        </button>
      </div>

      {/* FILTER SECTION */}
      <div className="filter-section">
        <div className="search-bar">
          <Search size={18} />
          <input
            placeholder="Search by name, email or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={filters.department || "All"}
          onChange={(e) =>
            handleFilterChange("department", e.target.value)
          }
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={filters.designation || "All"}
          onChange={(e) =>
            handleFilterChange("designation", e.target.value)
          }
        >
          {designations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={filters.status || "All"}
          onChange={(e) =>
            handleFilterChange("status", e.target.value)
          }
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button onClick={clearFilters}>
          <X size={14} /> Clear
        </button>

        <button onClick={exportToCSV}>
          <Download size={14} /> Export
        </button>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table className="faculty-table">
          <thead>
            <tr>
              <th>Faculty</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedFaculties.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No faculty found
                </td>
              </tr>
            ) : (
              paginatedFaculties.map((f) => (
                <tr key={f.facultyId}>
                  <td>
                    <div className="faculty-cell">
                      <div className="faculty-avatar">
                        {getInitials(f.name)}
                      </div>
                      <div>
                        <div className="faculty-name">
                          {f.name}
                        </div>
                        <div className="faculty-id">
                          ID: {f.facultyId}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <Mail size={14} /> {f.email}
                  </td>

                  <td>
                    <span className="department-badge">
                      {f.department}
                    </span>
                  </td>

                  <td>
                    <Award size={14} /> {f.designation || "—"}
                  </td>

                  <td>
                    {f.isActive ? (
                      <span className="status active">
                        <CheckCircle size={14} /> Active
                      </span>
                    ) : (
                      <span className="status inactive">
                        <AlertCircle size={14} /> Inactive
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        navigate(
                          `/superadmin/faculty/${f.facultyId}`
                        )
                      }
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() =>
                        navigate(
                          `/superadmin/edit-faculty/${f.facultyId}`
                        )
                      }
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() =>
                        setDeleteModal({
                          id: f.facultyId,
                          name: f.name,
                        })
                      }
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft size={14} />
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewFaculty;
