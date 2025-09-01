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
            invalidatesTags: ["USER", "AGENT", "ADMIN"]
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
            invalidatesTags: ["USER", "AGENT", "ADMIN"]
        }),
        // logout: builder.mutation({
        //     query: () => ({
        //         url: "/auth/logout",
        //         method: "POST",
        //     }),
        //     invalidatesTags: ["USER", "AGENT", "ADMIN"]
        // }),

        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                credentials: "include",
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(baseApi.util.resetApiState());
                // eslint-disable-next-line no-empty
                } catch { }
            },
        }),

        getEmail: builder.query({
            query: (phone) => ({
                url: `/auth/get-email?phone=${phone}`,
                method: "GET",
            }),
            providesTags: ["USER", "AGENT", "ADMIN"]
        }),
        usrInfo: builder.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["USER", "AGENT", "ADMIN"]
        }),
    })
})

export const { useRegisterMutation, useUsrInfoQuery, useLogoutMutation,
    useLoginMutation, useGetEmailQuery, useSendOtpMutation, useVerifyOtpMutation } = authApi
