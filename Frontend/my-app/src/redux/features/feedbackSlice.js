import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rating: 0,
  comment: "",
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setRating(state, action) {
      state.rating = action.payload;
    },
    setComment(state, action) {
      state.comment = action.payload;
    },
    resetFeedback(state) {
      state.rating = 0;
      state.comment = "";
    },
  },
});

export const {
  setRating,
  setComment,
  resetFeedback,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
