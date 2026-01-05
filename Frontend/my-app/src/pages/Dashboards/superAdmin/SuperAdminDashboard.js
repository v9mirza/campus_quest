





// import React, { useState, useEffect } from "react";
// import "./superAdminDashboard.css";
// import { useNavigate } from "react-router-dom";

// import {
//   Users,
//   BookOpen,
//   GraduationCap,
//   TrendingUp,
//   Award,
//   MoreVertical,
//   Clock as ClockIcon,
//   Calendar as CalendarIcon,
//   UserCheck
// } from "lucide-react";

// import { useGetAllCoursesQuery } from "../../../redux/services/coursesApi";
// import { useGetAllStudentsQuery } from "../../../redux/services/studentApi";
// import { useGetAllFacultyQuery } from "../../../redux/services/facultyApi";


// const SuperAdminDashboard = () => {
//   const navigate = useNavigate();
//   const [activeQuizTab, setActiveQuizTab] = useState("upcoming");
//   const [loading, setLoading] = useState(true);

//   /* ================= STATS ================= */
//   const [stats, setStats] = useState({
//     totalFaculties: 0,
//     totalStudents: 0,   // TEMP
//     activeCourses: 0,
//     totalQuizzes: 0     // TEMP
//   });

//   /* ================= QUIZZES ================= */
//   const [quizzes, setQuizzes] = useState({
//     upcoming: [],
//     ongoing: [],
//     completed: []
//   });

//   /* ================= ACTION CARDS ================= */
//   const actionCards = [
//     {
//       id: 1,
//       title: "Add Faculty",
//       path: "/superadmin/add-faculty",
//       icon: <UserPlus />,
//       description: "Register new faculty members with detailed profiles",
//       count: `${stats.totalFaculties} Active`
//     },
//     {
//       id: 2,
//       title: "Add Course",
//       path: "/superadmin/course-management",
//       icon: <BookOpen />,
//       description: "Create and manage academic courses",
//       count: `${stats.activeCourses} Courses`
//     },
//     {
//       id: 3,
//       title: "View Faculty",
//       path: "/superadmin/view-faculty",
//       icon: <Users />,
//       description: "Browse complete faculty directory",
//       count: `${stats.totalFaculties} Faculty`
//     },
//     {
//       id: 4,
//       title: "View Students",
//       path: "/students",
//       icon: <GraduationCap />,
//       description: "Access student management portal",
//       count: stats.totalStudents ? `${stats.totalStudents} Students` : "Backend Pending"
//     }
//   ];

//   /* ================= FETCH DASHBOARD DATA ================= */
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);

//         // ✅ FACULTY (ACTUAL)
//         const facultyRes = await axios.get(
//           "http://localhost:5000/api/faculty/all",
//           { withCredentials: true }
//         );

//         // ✅ COURSES (ACTUAL)
//         const courseRes = await axios.get(
//           "http://localhost:5000/api/course",
//           { withCredentials: true }
//         );

//         // 🟡 STUDENTS (TEMP ROUTE)
//         let studentCount = 0;
//         try {
//           const studentRes = await axios.get(
//             "http://localhost:5000/api/students/count",
//             { withCredentials: true }
//           );
//           studentCount = studentRes.data.total || 0;
//         } catch {
//           studentCount = 0;
//         }

//         // 🟡 QUIZZES (TEMP ROUTE)
//         let quizCount = 0;
//         try {
//           const quizRes = await axios.get(
//             "http://localhost:5000/api/quizzes/count",
//             { withCredentials: true }
//           );
//           quizCount = quizRes.data.total || 0;
//         } catch {
//           quizCount = 0;
//         }

//         setStats({
//           totalFaculties: facultyRes.data.total || 0,
//           activeCourses: courseRes.data.total || 0,
//           totalStudents: studentCount,
//           totalQuizzes: quizCount
//         });

//         // 🟡 QUIZ LIST TEMP (EMPTY – BACKEND READY)
//         setQuizzes({
//           upcoming: [],
//           ongoing: [],
//           completed: []
//         });

//       } catch (err) {
//         console.error("Dashboard Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const currentQuizzes = quizzes[activeQuizTab] || [];

//   return (
//     <div className="superadmin-container">

//       {/* ===== HEADER ===== */}
//       <header className="superadmin-header">
//         <div className="header-content">
//           <div className="header-left">
//             <h1>Super Admin Dashboard</h1>
//             <p>Welcome back! Manage your university efficiently</p>
//           </div>

//           <div
//             className="profile-section"
//             onClick={() => navigate("/superadmin/profile")}
//           >
//             <div className="profile-avatar">SA</div>
//             <div className="profile-info">
//               <h4>University Admin</h4>
//               <p>Administrator</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* ===== MAIN CONTENT ===== */}
//       <div className="main-content">

//         {/* ===== STATISTICS ===== */}
//         <div className="stats-overview">
//           {loading ? (
//             Array.from({ length: 4 }).map((_, i) => (
//               <div key={i} className="stat-item loading-shimmer" />
//             ))
//           ) : (
//             <>
//               <div className="stat-item">
//                 <h4>Total Faculty</h4>
//                 <div className="value">{stats.totalFaculties}</div>
//                 <div className="stat-trend trend-up">
//                   <TrendingUp size={16} />
//                   <span>Live from backend</span>
//                 </div>
//               </div>

//               <div className="stat-item">
//                 <h4>Total Students</h4>
//                 <div className="value">
//                   {stats.totalStudents || "—"}
//                 </div>
//                 <div className="stat-trend">
//                   <span>Temp route</span>
//                 </div>
//               </div>

//               <div className="stat-item">
//                 <h4>Active Courses</h4>
//                 <div className="value">{stats.activeCourses}</div>
//                 <div className="stat-trend trend-up">
//                   <TrendingUp size={16} />
//                   <span>Live from backend</span>
//                 </div>
//               </div>

//               <div className="stat-item">
//                 <h4>Total Quizzes</h4>
//                 <div className="value">
//                   {stats.totalQuizzes || "—"}
//                 </div>
//                 <div className="stat-trend">
//                   <span>Temp route</span>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* ===== QUICK ACTIONS ===== */}
//         <section className="actions-section">
//           <h2 className="section-title">Quick Actions</h2>

//           <div className="action-cards">
//             {actionCards.map(card => (
//               <div
//                 key={card.id}
//                 className="action-card"
//                 onClick={() => navigate(card.path)}
//               >
//                 <div className="action-card-inner">
//                   <div className="action-icon">{card.icon}</div>
//                   <h3>{card.title}</h3>
//                   <p>{card.description}</p>
//                   <span className="action-count">{card.count}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ===== QUIZ MANAGEMENT ===== */}
//         <section className="quiz-management-section">
//           <div className="quiz-header">
//             <h2>
//               <Target size={28} />
//               Quiz Management
//             </h2>
//             <p>Monitor and manage all departmental quizzes</p>
//           </div>

//           <div className="quiz-tabs">
//             {["upcoming", "ongoing", "completed"].map(tab => (
//               <button
//                 key={tab}
//                 className={`quiz-tab ${activeQuizTab === tab ? "active" : ""}`}
//                 onClick={() => setActiveQuizTab(tab)}
//               >
//                 {tab.toUpperCase()}
//                 <span className="tab-badge">{quizzes[tab].length}</span>
//               </button>
//             ))}
//           </div>

//           <div className="quiz-content">
//             {loading ? (
//               <div className="empty-state">
//                 <div className="loading-shimmer" style={{ height: 300 }} />
//               </div>
//             ) : currentQuizzes.length === 0 ? (
//               <div className="empty-state">
//                 <Target size={48} />
//                 <h3>No quizzes found</h3>
//                 <p>Backend integration pending</p>
//               </div>
//             ) : null}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;








import React, { useState, useEffect } from "react";
import "./superAdminDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Activity,
  BarChart3,
  ShieldCheck,
  Layers,
  Moon,
  Sun,
  Settings,
  Bell,
  ChevronRight,
  Clock,
  User,
  LogOut,
  Database,
  Server,
  Shield
} from "lucide-react";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  const [stats, setStats] = useState({
    totalFaculties: 0,
    totalStudents: 0,
    activeCourses: 0,
    totalQuizzes: 0
  });

  const [activities, setActivities] = useState([
    {
      _id: "1",
      message: "New faculty member registered - Dr. Sarah Johnson",
      performedBy: "System",
      createdAt: new Date(Date.now() - 3600000),
      type: "success",
      icon: <User size={16} />
    },
    {
      _id: "2",
      message: "System maintenance completed successfully",
      performedBy: "Automated",
      createdAt: new Date(Date.now() - 7200000),
      type: "info",
      icon: <Server size={16} />
    },
    {
      _id: "3",
      message: "Security audit passed with 99.8% score",
      performedBy: "Security Bot",
      createdAt: new Date(Date.now() - 10800000),
      type: "warning",
      icon: <Shield size={16} />
    },
    {
      _id: "4",
      message: "Database backup completed - 2.4GB",
      performedBy: "Backup System",
      createdAt: new Date(Date.now() - 14400000),
      type: "info",
      icon: <Database size={16} />
    }
  ]);

  const actionCards = [
    {
      title: "Advanced Analytics",
      icon: <BarChart3 size={24} />,
      path: "/superadmin/analytics",
      description: "Detailed system insights",
      gradient: "gradient-blue"
    },
    {
      title: "Course Management",
      icon: <BookOpen size={24} />,
      path: "/superadmin/course-management",
      description: "Manage all courses",
      gradient: "gradient-purple"
    },
    {
      title: "Faculty Control",
      icon: <Users size={24} />,
      path: "/superadmin/view-faculty",
      description: "Faculty administration",
      gradient: "gradient-green"
    },
    {
      title: "Student Oversight",
      icon: <GraduationCap size={24} />,
      path: "/students",
      description: "Student management",
      gradient: "gradient-orange"
    }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const facultyRes = await axios.get(
          "http://localhost:5000/api/faculty/all",
          { withCredentials: true }
        );

        const courseRes = await axios.get(
          "http://localhost:5000/api/course",
          { withCredentials: true }
        );

        let studentCount = 0;
        try {
          const studentRes = await axios.get(
            "http://localhost:5000/students/registered-students",
            { withCredentials: true }
          );
          studentCount = studentRes.data.totalRegistered || 0;
        } catch {}

        let quizCount = 0;
        try {
          const quizRes = await axios.get(
            "http://localhost:5000/quiz/all-quizzes",
            { withCredentials: true }
          );
          quizCount = quizRes.data.length || 0;
        } catch {}

        const activityRes = await axios.get(
          "http://localhost:5000/api/activity/recent",
          { withCredentials: true }
        );

        setStats({
          totalFaculties: facultyRes.data.total || 0,
          activeCourses: courseRes.data.total || 0,
          totalStudents: studentCount,
          totalQuizzes: quizCount
        });

        // Merge API activities with mock ones
        if (activityRes.data && activityRes.data.length > 0) {
          const apiActivities = activityRes.data.map(act => ({
            ...act,
            icon: <User size={16} />,
            type: "info"
          }));
          setActivities(prev => [...apiActivities, ...prev.slice(0, 4)]);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('superadmin-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('superadmin-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('superadmin-theme', 'light');
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <div className={`superadmin-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      {/* TOP NAVIGATION BAR */}
      <div className="top-navbar">
        <div className="brand-section">
          <div className="brand-logo">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h5 className="brand-title">University Management System</h5>
            <span className="brand-subtitle">Super Admin Console</span>
          </div>
        </div>

        <div className="nav-controls">
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="notification-btn" title="Notifications">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </button>

          <button 
            className="settings-btn"
            onClick={() => navigate("/superadmin/settings")}
            title="Settings"
          >
            <Settings size={20} />
          </button>

          <button 
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT */}
      <div className="container-fluid py-4">
        {/* HEADER WITH PROFILE */}
        <div className="dashboard-header mb-4">
          <div className="header-content">
            <h1 className="display-6 fw-bold mb-2">
              <Shield className="me-3" size={32} />
              Super Admin Control Panel
            </h1>
            <p className="lead text-muted mb-0">
              University System Oversight & Governance
            </p>
          </div>

          <div 
            className="admin-profile-card"
            onClick={() => navigate("/superadmin/profile")}
          >
            <div className="profile-avatar">
              <span className="avatar-badge">
                <ShieldCheck size={12} />
              </span>
              <div className="avatar-initials">SA</div>
            </div>
            <div className="profile-info">
              <h6 className="mb-0 fw-bold">System Super Admin</h6>
              <small className="text-muted">Full System Privileges</small>
              <div className="profile-status">
                <span className="status-indicator active"></span>
                <span>Administrator</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted ms-3" />
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="row g-4 mb-5">
          <div className="col-xl-3 col-md-6">
            <div className="stat-card premium-card border-start border-primary border-4">
              <div className="stat-icon bg-primary bg-opacity-10">
                <Users className="text-primary" size={24} />
              </div>
              <div className="stat-content">
                <h2 className="display-5 fw-bold mb-1">{stats.totalFaculties}</h2>
                <p className="text-muted mb-0">Total Faculties</p>
                <small className="text-success">
                  <TrendingUp size={14} /> +12% this month
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="stat-card premium-card border-start border-success border-4">
              <div className="stat-icon bg-success bg-opacity-10">
                <GraduationCap className="text-success" size={24} />
              </div>
              <div className="stat-content">
                <h2 className="display-5 fw-bold mb-1">{stats.totalStudents}</h2>
                <p className="text-muted mb-0">Total Students</p>
                <small className="text-success">
                  <TrendingUp size={14} /> 
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="stat-card premium-card border-start border-info border-4">
              <div className="stat-icon bg-info bg-opacity-10">
                <Layers className="text-info" size={24} />
              </div>
              <div className="stat-content">
                <h2 className="display-5 fw-bold mb-1">{stats.activeCourses}</h2>
                <p className="text-muted mb-0">Active Courses</p>
                <small className="text-warning">
                  <Activity size={14} /> 3 new this week
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6">
            <div className="stat-card premium-card border-start border-warning border-4">
              <div className="stat-icon bg-warning bg-opacity-10">
                <ShieldCheck className="text-warning" size={24} />
              </div>
              <div className="stat-content">
                <h2 className="display-5 fw-bold mb-1">{stats.totalQuizzes}</h2>
                <p className="text-muted mb-0">Total Quizzes</p>
                <small className="text-info">
                  <Activity size={14} /> 15 active now
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="row g-4 mb-5">
          <div className="col-12">
            <div className="section-header mb-4">
              <h3 className="fw-bold">
                <TrendingUp className="me-2" size={24} />
                Administrative Actions
              </h3>
              <p className="text-muted mb-0">Quick access to management panels</p>
            </div>
          </div>
          
          {actionCards.map((card, idx) => (
            <div key={idx} className="col-xl-3 col-md-6">
              <div 
                className={`action-card ${card.gradient}`}
                onClick={() => navigate(card.path)}
              >
                <div className="action-icon">
                  {card.icon}
                </div>
                <div className="action-content">
                  <h5 className="fw-bold mb-1">{card.title}</h5>
                  <p className="text-muted small mb-2">{card.description}</p>
                  <span className="action-link">
                    Access Panel <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ENHANCED ACTIVITY LOG */}
        <div className="row">
          <div className="col-12">
            <div className="premium-card activity-container">
              <div className="activity-header">
                <div>
                  <h3 className="fw-bold mb-1">
                    <Activity className="me-2" size={24} />
                    System Activity Log
                  </h3>
                  <p className="text-muted mb-0">Real-time system activities and events</p>
                </div>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate("/superadmin/activity-log")}
                >
                  View Full Log
                </button>
              </div>

              <div className="activity-timeline">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading system activity...</p>
                  </div>
                ) : activities.length === 0 ? (
                  <div className="text-center py-5">
                    <Activity size={48} className="text-muted mb-3" />
                    <p className="text-muted">No recent activities recorded</p>
                  </div>
                ) : (
                  activities.map((act) => (
                    <div key={act._id} className="activity-item">
                      <div className="activity-timeline-marker">
                        <div className={`marker-dot ${act.type}`}>
                          {act.icon}
                        </div>
                        <div className="timeline-line"></div>
                      </div>
                      
                      <div className="activity-content">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <p className="mb-1 fw-medium">{act.message}</p>
                            <div className="activity-meta">
                              <span className="activity-user">
                                <User size={12} className="me-1" />
                                {act.performedBy}
                              </span>
                              <span className="activity-time">
                                <Clock size={12} className="me-1" />
                                {new Date(act.createdAt).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                              <span className="activity-date">
                                {new Date(act.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span className={`activity-badge ${act.type}`}>
                            {act.type.charAt(0).toUpperCase() + act.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {activities.length > 0 && (
                <div className="activity-footer text-center py-3">
                  <button 
                    className="btn btn-link text-decoration-none"
                    onClick={() => navigate("/superadmin/activity-log")}
                  >
                    Load More Activities <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;