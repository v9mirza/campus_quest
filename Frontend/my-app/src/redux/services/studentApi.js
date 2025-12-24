import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/students",
    credentials: "include", // IMPORTANT for refresh token cookies
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Student", "Feedback"],

  endpoints: (builder) => ({
    /* ================= AUTH ================= */

    registerStudent: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp:builder.mutation({
      query:(data)=>({
        url:"/resend-otp",
        method:"POST",
        body:data,
      })
    }),
    loginStudent: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    /* ================= STUDENTS ================= */

    getAllStudents: builder.query({
      query: () => "/",
      providesTags: ["Student"],
    }),

    getStudentById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Student", id }],
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),

    /* ================= FEEDBACK ================= */

    submitFeedback: builder.mutation({
      query: (data) => ({
        url: "/feedback",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),

    getAllFeedbacks: builder.query({
      query: () => "/all-feedbacks",
      providesTags: ["Feedback"],
    }),
  }),
});

export const {
  useRegisterStudentMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useLoginStudentMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useDeleteStudentMutation,

  useSubmitFeedbackMutation,
  useGetAllFeedbacksQuery,
} = studentApi;
