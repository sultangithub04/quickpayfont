/* eslint-disable @typescript-eslint/no-empty-object-type */
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IStatus } from "@/types/auth.type";



export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/admin/delete/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["USER"]
        }),

        setCommission: builder.query({
            query: () => ({
                url: "/system/commission",
                method: "GET",

            }),
        }),
        getAllUser: builder.query({
            query: () => ({
                url: "/admin/users",
                method: "GET",

            }),
            providesTags: ["USER"],
        }),
        getAllAgent: builder.query({
            query: () => ({
                url: "/admin/agents",
                method: "GET",

            }),
            providesTags: ["USER"],
        }),
        getAllTransaction: builder.query({
            query: (params) => ({
                url: "/admin/transactions",
                method: "GET",
                params
            }),
            providesTags: ["USER"],
        }),
        getOverView: builder.query({
            query: () => ({
                url: "/admin/overview",
                method: "GET",
            }),
        }),
        updateAgentStatus: builder.mutation<IResponse<null>, IStatus>({
            query: (id) => ({
                url: `/agents/approve/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["USER"]
        }),
        changeStatus: builder.mutation<IResponse<null>, { userId: string; newStatus: string }>({
            query: ({ userId, newStatus }) => ({
                url: `/admin/status/${userId}`,
                method: "PATCH",
                data: { isActive: newStatus }, 
            }),
            invalidatesTags: ["USER"],
        }),
        adminVerify: builder.mutation<IResponse<null>, string>({
            query: (id) => ({
                url: `/admin/verify/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["USER"]
        }),




    })
})

export const { useGetOverViewQuery, useGetAllAgentQuery, useUpdateAgentStatusMutation, useChangeStatusMutation, useAdminVerifyMutation,
    useGetAllTransactionQuery, useGetAllUserQuery, useDeleteUserMutation } = adminApi
