import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: [], // { questionId, selectedAnswer }
};

const quizAnswerSlice = createSlice({
  name: "quizAnswer",
  initialState,
  reducers: {
    saveAnswer: (state, action) => {
      const { questionId, selectedAnswer } = action.payload;

      const existing = state.answers.find(
        (a) => a.questionId === questionId
      );

      if (existing) {
        existing.selectedAnswer = selectedAnswer;
      } else {
        state.answers.push({ questionId, selectedAnswer });
      }
    },

    resetQuizAnswers: () => initialState,
  },
});

export const { saveAnswer, resetQuizAnswers } =
  quizAnswerSlice.actions;

export default quizAnswerSlice.reducer;
