import React from "react";
import "./styles/CreateQuiz.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCoursesQuery } from "../redux/services/coursesApi";
import { useGetAllDepartmentsQuery } from "../redux/services/departmentApi";
import { useNavigate } from "react-router-dom";
import {
  setQuizTitle,
  setSubject,
  setDescription,
  setDepartment,
  setSelectedCourses,
  setSelectedYears,
  setSelectedGroups,
  setTotalQuestions,
  setPassingMarks,
  setMarksPerQuestion,
  setNegativeMark,
  setNegativeMarksPerQuestion,
  setStartDate,
  setStartTime,
  setEndDate,
  setEndTime,
  setDurationMinutes,
} from "../redux/features/quizSlice";

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    quizTitle,
    subject,
    description,
    department,
    selectedCourses,
    selectedYears,
    selectedGroups,
    totalQuestions,
    passingMarks,
    marksPerQuestion,
    negativeMark,
    negativeMarksPerQuestion,
    startDate,
    startTime,
    endDate,
    endTime,
    durationMinutes,
  } = useSelector((state) => state.quiz);

  const { data: courses, isLoading: coursesLoading } =
    useGetAllCoursesQuery();

  const { data: departments, isLoading: departmentsLoading } =
    useGetAllDepartmentsQuery();

  if (coursesLoading || departmentsLoading) return <p>Loading...</p>;

  const departmentList =
    departments?.data?.[0]?.departmentNames || [];

  const allCourses = courses?.courses || [];

  const courseOptions = allCourses.flatMap((doc) =>
    doc.courseName.map((name) => ({
      value: name,
      label: name,
      yrs: doc.year,
      grps: doc.groups,
    }))
  );

  const yearOptions = Array.from(
    new Set(selectedCourses.flatMap((c) => c.yrs || []))
  ).map((yr) => ({
    value: yr,
    label: `Year ${yr}`,
  }));

  const groupOptions = Array.from(
    new Set(selectedCourses.flatMap((c) => c.grps || []))
  ).map((grp) => ({
    value: grp,
    label: grp,
  }));

return (
  <div className="cq-page">
    <div className="cq-card">
      <h2>Create Quiz</h2>
      <p className="cq-subtitle">
        Configure quiz details and audience
      </p>

      <div className="cq-grid">
        <input
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => dispatch(setQuizTitle(e.target.value))}
        />

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => dispatch(setSubject(e.target.value))}
        />
      </div>

      <textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
      />

      <select
        value={department}
        onChange={(e) => dispatch(setDepartment(e.target.value))}
      >
        <option value="">Select Department</option>
        {departmentList.map((d, i) => (
          <option key={i} value={d}>{d}</option>
        ))}
      </select>

      <h4>Target Audience(optional)</h4>

      {/* <Select
        isMulti
        options={courseOptions}
        value={selectedCourses}
        onChange={(v) => dispatch(setSelectedCourses(v))}
        placeholder="Select Courses"
        classNamePrefix="cq-select"
      /> */}
      <Select
  isMulti
  options={courseOptions}
  value={selectedCourses}
  onChange={(v) => dispatch(setSelectedCourses(v))}
  placeholder="Select Courses"
  classNamePrefix="cq-select"
  menuPortalTarget={document.body}
  menuPosition="fixed"
/>


      <div className="cq-grid">
        <Select
          isMulti
          options={yearOptions}
          value={selectedYears}
          onChange={(v) => dispatch(setSelectedYears(v))}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          placeholder="Select Years"
          classNamePrefix="cq-select"
        />

        <Select
          isMulti
          options={groupOptions}
          value={selectedGroups}
          onChange={(v) => dispatch(setSelectedGroups(v))}
          placeholder="Select Groups"
          menuPortalTarget={document.body}
          menuPosition="fixed"
          classNamePrefix="cq-select"
        />
      </div>

      <div className="cq-grid">
        <select
          value={totalQuestions}
          onChange={(e) =>
            dispatch(setTotalQuestions(Number(e.target.value)))
          }
        >
          {[0, 10, 20, 30, 40, 50].map((n) => (
            <option key={n} value={n}>
              {n} Questions
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Passing Marks"
          value={passingMarks || ""}
          onChange={(e) =>
            dispatch(setPassingMarks(Number(e.target.value)))
          }
        />
      </div>

      <input
        type="number"
        placeholder="Marks per Question"
        value={marksPerQuestion || ""}
        onChange={(e) =>
          dispatch(setMarksPerQuestion(Number(e.target.value)))
        }
      />

      <label className="cq-checkbox">
        <input
          type="checkbox"
          checked={negativeMark}
          onChange={(e) =>
            dispatch(setNegativeMark(e.target.checked))
          }
        />
        Enable Negative Marking
      </label>

      {negativeMark && (
        <input
          type="number"
          placeholder="Negative Marks per Question"
          value={negativeMarksPerQuestion || ""}
          onChange={(e) =>
            dispatch(setNegativeMarksPerQuestion(Number(e.target.value)))
          }
        />
      )}

      <h4>Schedule</h4>

      <div className="cq-grid">
        <input
          type="date"
          value={startDate}
          onChange={(e) => dispatch(setStartDate(e.target.value))}
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => dispatch(setStartTime(e.target.value))}
        />
      </div>

      <div className="cq-grid">
        <input
          type="date"
          value={endDate}
          onChange={(e) => dispatch(setEndDate(e.target.value))}
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => dispatch(setEndTime(e.target.value))}
        />
      </div>

      <input
        type="number"
        placeholder="Duration (minutes)"
        value={durationMinutes||""}
        onChange={(e) =>
          dispatch(setDurationMinutes(Number(e.target.value)))
        }
      />

      <button className="cq-btn" onClick={() => navigate("/questions")}>
        Next
      </button>
    </div>
  </div>
);
};

export default CreateQuiz;
