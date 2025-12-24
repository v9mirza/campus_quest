import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollmentNumber: "",
  name: "",
  gender: "",
  email: "",
  mobileNumber: "",
  department: "",
  course: "",
  semester: "",
  group: "",
  password: "",
  confirmPassword: "",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetStudentForm: () => initialState,
  },
});

export const { setStudentField, resetStudentForm } = studentSlice.actions;
export default studentSlice.reducer;
