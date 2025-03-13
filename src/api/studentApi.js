// src/api/studentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const env = import.meta.env
const baseUrl = env.VITE_APP_DEV_API;

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Students"], // Define a tag for auto-refetch

  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/manage-students",
      providesTags: ["Students"], // Marks this query with "Students" tag
    }),

    addStudent: builder.mutation({
      query: (student) => ({
        url: "/manage-students",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Students"], // Auto-refetch student list
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/manage-students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"], // Auto-refetch after delete
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
} = studentApi;

