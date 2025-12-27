import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HodProfile.css";

import {
  useGetSuperAdminQuery,
  useChangePasswordMutation,
} from "../../../redux/services/superAdminApi";

const HodProfile = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading } = useGetSuperAdminQuery();
  const [changePassword] = useChangePasswordMutation();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleLogout = () => {
    navigate("/login");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();

      alert("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(err?.data?.message || "Failed to change password");
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="spinner-ring">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="avatar-placeholder"></div>
          </div>
          <h3>Loading Profile</h3>
          <p>Please wait while we fetch your details...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <>
      <div className="hod-profile-container">
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="profile-main">
          <div className="profile-card-elegant">
            <div className="card-header">
              <div className="header-decoration">
                <div className="decoration-line"></div>
                <div className="academic-icon">🎓</div>
                <div className="decoration-line"></div>
              </div>

              <div className="profile-avatar-section">
                <div className="avatar-wrapper">
                  <div className="avatar-glow"></div>
                  <div className="profile-avatar-main">
                    <span className="avatar-initials">
                      {profile.facultyName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="avatar-status">
                    <div className="status-dot"></div>
                    <span className="status-text">HOD</span>
                  </div>
                </div>

                <div className="profile-titles-main">
                  <h1 className="profile-name-main">
                    {profile.facultyName}
                  </h1>
                  <div className="profile-subtitles">
                    <span className="subtitle-item">
                      💼 {profile.designation}
                    </span>
                    <span className="subtitle-item">
                      🏛️ {profile.department}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-details-elegant">
              <div className="info-grid-elegant">
                <div className="info-card">
                  <label>Faculty ID</label>
                  <h4>{profile.facultyId}</h4>
                </div>
                <div className="info-card">
                  <label>Email</label>
                  <h4>{profile.email}</h4>
                </div>
              </div>
            </div>

            <div className="action-buttons-elegant">
              <button
                className="action-btn btn-change-password"
                onClick={() => setShowPasswordModal(true)}
              >
                🔑 Change Password
              </button>

              <button
                className="action-btn btn-logout"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        {showPasswordModal && (
          <div
            className="modal-overlay-elegant"
            onClick={() => setShowPasswordModal(false)}
          >
            <div
              className="modal-content-elegant"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handlePasswordChange}>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <button type="submit">Update Password</button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HodProfile;
