import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quizSlice";
import courseReducer from "../features/courseSlice";
import departmentReducer from "../features/departmentSlice";
import studentReducer from "../features/studentSlice";
import authReducer from "../features/authSlice";

import { quizApi } from "../services/quizApi";
import { courseApi } from "../services/coursesApi";
import { departmentApi } from "../services/departmentApi";
import { chatApi } from "../services/chatApi";
import { studentApi } from "../services/studentApi";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

/* ✅ Persist ONLY quiz slice */
const quizPersistConfig = {
  key: "quiz",
  storage,
};

const persistedQuizReducer = persistReducer(
  quizPersistConfig,
  quizReducer
);

export const store = configureStore({
  reducer: {
    quiz: persistedQuizReducer,     // ✅ persisted
    course: courseReducer,
    department: departmentReducer,
    student: studentReducer,
    auth: authReducer,              // ❌ not persisted

    [quizApi.reducerPath]: quizApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(
      quizApi.middleware,
      courseApi.middleware,
      departmentApi.middleware,
      chatApi.middleware,
      studentApi.middleware
    ),

  devTools: true,
});

export const persistor = persistStore(store);
