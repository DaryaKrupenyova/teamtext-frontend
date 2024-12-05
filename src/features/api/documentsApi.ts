import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Document } from "../../entities/documents/model/types";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    // @ts-ignore
    baseUrl: import.meta.env.VITE_APP_API_URL || "%VITE_APP_API_URL%",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFiles: builder.query<Document[], void>({
      query: () => ({
        url: `/documents`,
        method: "GET",
      }),
    }),
    getFile: builder.query<Document, { id: number }>({
      query: (args) => ({
        url: `/documents/${args.id}`,
        method: "GET",
      }),
    }),
    addCollaborator: builder.mutation({
      query: (args) => ({
        url: `/documents/sharing`,
        method: "GET",
        params: { token: args.token },
      }),
    }),
    createFile: builder.mutation({
      query: (args) => ({
        url: `/documents/`,
        method: "POST",
        body: { title: args.title },
      }),
    }),

    renameFile: builder.mutation({
      query: (args) => ({
        url: `/documents/${args.id}/`,
        method: "PATCH",
        body: { id: args.id, title: args.title },
      }),
    }),
    editFile: builder.mutation({
      query: (args) => ({
        url: `/documents/${args.id}/`,
        method: "PATCH",
        body: { id: args.id, content: args.content },
      }),
    }),
    shareFile: builder.mutation({
      query: (args) => ({
        url: `/documents/${args.id}/`,
        method: "PATCH",
        body: { id: args.id, is_sharing: args.is_sharing, is_editor: args.is_editor },
      }),
    }),
    deleteFile: builder.mutation({
      query: (args) => ({
        url: `/documents/${args.id}`,
        method: "DELETE",
        body: { id: args.id },
      }),
    }),
  }),
});

export const { useGetFilesQuery, useGetFileQuery, useCreateFileMutation, useAddCollaboratorMutation, useRenameFileMutation, useEditFileMutation, useShareFileMutation, useDeleteFileMutation } = documentsApi;
