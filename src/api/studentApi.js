// src/api/studentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const env = import.meta.env
const baseUrl = env.VITE_APP_DEV_API;

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: "/manage-students",
        method: "POST",
        body: student,
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetStudentsQuery, useAddStudentMutation, useDeleteStudentMutation } = studentApi;
