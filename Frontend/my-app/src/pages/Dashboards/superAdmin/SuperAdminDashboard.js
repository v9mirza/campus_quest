import React, { useState } from "react";
import "./superAdminDashboard.css";
import { useNavigate } from "react-router-dom";

import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Target,
} from "lucide-react";
import { useGetAllCoursesQuery } from "../../../redux/services/coursesApi";
import { useGetAllStudentsQuery } from "../../../redux/services/studentApi";
import { useGetAllFacultyQuery } from "../../../redux/services/facultyApi";


const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeQuizTab, setActiveQuizTab] = useState("upcoming");

  const { data: facultyData, isLoading: fLoading } =
    useGetAllFacultyQuery();
  const { data: studentData, isLoading: sLoading } =
    useGetAllStudentsQuery();
  const { data: courseData, isLoading: cLoading } =
    useGetAllCoursesQuery();

  const loading = fLoading || sLoading || cLoading;

  const totalFaculties =
    facultyData?.total || facultyData?.faculty?.length || 0;

  const totalStudents = Array.isArray(studentData)
    ? studentData.length
    : studentData?.students?.length || 0;

  const totalCourses =
    courseData?.total || courseData?.courses?.length || 0;

  const actionCards = [
    {
      title: "Add Faculty",
      path: "/superadmin/add-faculty",
      icon: <Users />,
      count: `${totalFaculties} Faculty`,
    },
    {
      title: "Add Course",
      path: "/superadmin/course-management",
      icon: <BookOpen />,
      count: `${totalCourses} Courses`,
    },
    {
      title: "View Students",
      path: "/students",
      icon: <GraduationCap />,
      count: `${totalStudents} Students`,
    },
  ];

  return (
    <div className="superadmin-container">
      <header className="superadmin-header">
        <h1>Super Admin Dashboard</h1>
        <p>Welcome back! Manage your university efficiently</p>
      </header>

      <div className="stats-overview">
        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            <div className="stat-item">
              <h4>Total Faculty</h4>
              <div className="value">{totalFaculties}</div>
              <div className="stat-trend trend-up">
                <TrendingUp size={16} /> Live
              </div>
            </div>

            <div className="stat-item">
              <h4>Total Students</h4>
              <div className="value">{totalStudents}</div>
            </div>

            <div className="stat-item">
              <h4>Active Courses</h4>
              <div className="value">{totalCourses}</div>
            </div>
          </>
        )}
      </div>

      <section className="actions-section">
        <h2>Quick Actions</h2>
        <div className="action-cards">
          {actionCards.map((card) => (
            <div
              key={card.title}
              className="action-card"
              onClick={() => navigate(card.path)}
            >
              <div className="action-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <span>{card.count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="quiz-management-section">
        <h2>
          <Target /> Quiz Management
        </h2>
        <p>Backend integration pending</p>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;
