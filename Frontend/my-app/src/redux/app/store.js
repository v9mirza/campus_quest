import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quizSlice";
import courseReducer from "../features/courseSlice";
import departmentReducer from "../features/departmentSlice";

import { quizApi } from "../services/quizApi";
import { courseApi } from "../services/coursesApi";
import { departmentApi } from "../services/departmentApi";
import {chatApi} from "../services/chatApi";

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
import { studentApi } from "../services/studentApi";
import studentReducer from "../features/studentSlice";

/* ✅ Persist only quiz slice */
const persistConfig = {
  key: "quiz",
  storage,
};

const persistedQuizReducer = persistReducer(
  persistConfig,
  quizReducer,
  studentReducer,
);

export const store = configureStore({
  reducer: {
    quiz: persistedQuizReducer,
    course: courseReducer,
    department: departmentReducer,
      student: studentReducer,

    [quizApi.reducerPath]: quizApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [chatApi.reducerPath]:chatApi.reducer,
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
