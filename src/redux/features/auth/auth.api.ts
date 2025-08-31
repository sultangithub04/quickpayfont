import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";



export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/register",
                method: "POST",
                data: userInfo
            }),
            invalidatesTags: ["USER", "AGENT"]
        }),
        sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
            query: (userInfo) => ({
                url: "/otp/send",
                method: "POST",
                data: userInfo,
            })
        }),
        verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
            query: (userInfo) => ({
                url: "/otp/verify",
                method: "POST",
                data: userInfo,
            })
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
            invalidatesTags: ["USER", "AGENT"]
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["USER", "AGENT"]
        }),
        getEmail: builder.query({
            query: (phone) => ({
                url: `/auth/get-email?phone=${phone}`,
                method: "GET",
            }),
            providesTags: ["USER", "AGENT"]
        }),
        usrInfo: builder.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["USER", "AGENT"]
        }),
    })
})

export const { useRegisterMutation, useUsrInfoQuery, useLogoutMutation,
    useLoginMutation, useGetEmailQuery, useSendOtpMutation, useVerifyOtpMutation } = authApi
