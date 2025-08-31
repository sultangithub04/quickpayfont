import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendMoney, ISendOtp, IVerifyOtp } from "@/types";



export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        toUpMoney: builder.mutation({
            query: (addInfo) => ({
                url: "/transactions/topup",
                method: "PATCH",
                data: addInfo

            }),
            invalidatesTags: ["USER"]
        }),
        withDraw: builder.mutation<IResponse<null>, ISendOtp>({
            query: (withDrawInfo) => ({
                url: "/transactions/withdraw",
                method: "PATCH",
                data: withDrawInfo,
            }),
            invalidatesTags: ["USER"]
        }),
        cashwithDrawbyUser: builder.mutation<IResponse<null>, ISendOtp>({
            query: (withDrawInfo) => ({
                url: "/transactions/cash-out-user",
                method: "PATCH",
                data: withDrawInfo,
            }),
            invalidatesTags: ["USER"]
        }),
        cashDepositbyUser: builder.mutation<IResponse<null>, ISendOtp>({
            query: (withDrawInfo) => ({
                url: "/transactions/cash-in-user",
                method: "PATCH",
                data: withDrawInfo,
            }),
            invalidatesTags: ["USER"]
        }),
        sendMoney: builder.mutation<IResponse<null>, ISendMoney>({
            query: (sendMoneyInfo) => ({
                url: "/transactions/send",
                method: "PATCH",
                data: sendMoneyInfo,
            }),
            invalidatesTags: ["USER"]
        }),

        transactionInfo: builder.query({
            query: (params) => ({
                url: "/transactions/me",
                method: "GET",
                params
            }),
            providesTags: ["USER"],
            transformResponse: (response) => response.data

        }),
        waletInfo: builder.query({
            query: () => ({
                url: "/wallets/me",
                method: "GET",
            }),
            providesTags: ["USER"],
            transformResponse: (response) => response.data

        }),
        sendMail: builder.mutation({
            query: (userInfo) => ({
                url: "/users/sendmail",
                method: "POST",
                data: userInfo,
            }),
            invalidatesTags: ["USER"],
            transformResponse: (response) => response.data

        }),
        updateUser: builder.mutation({
            query: (userInfo) => ({
                url: "/users/update",
                method: "PATCH",
                data: userInfo,
            }),
            invalidatesTags: ["USER"],
            transformResponse: (response) => response.data

        }),

    })
})

export const {useCashDepositbyUserMutation,useCashwithDrawbyUserMutation,useUpdateUserMutation,useSendMailMutation, useToUpMoneyMutation, useTransactionInfoQuery, useWithDrawMutation, useWaletInfoQuery, useSendMoneyMutation} = userApi
