import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendMoney, ISendOtp, IVerifyOtp } from "@/types";



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




    })
})

export const { useGetOverViewQuery, useGetAllAgentQuery,
    useGetAllTransactionQuery, useGetAllUserQuery, useDeleteUserMutation } = adminApi
