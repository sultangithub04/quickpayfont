import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendMoney } from "@/types";



export const agentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        cashIn: builder.mutation<IResponse<null>, ISendMoney>({
            query: (sendMoneyInfo) => ({
                url: "/transactions/cash-in",
                method: "PATCH",
                data: sendMoneyInfo,
            }),
            invalidatesTags: ["USER"]
        }),
        cashOut: builder.mutation<IResponse<null>, ISendMoney>({
            query: (sendMoneyInfo) => ({
                url: "/transactions/cash-out",
                method: "PATCH",
                data: sendMoneyInfo,
            }),
            invalidatesTags: ["USER"]
        }),
        commissionDetails: builder.query({
            query: () => ({
                url: "/system/commission",
                method: "GET",
            
            }),
        }),


  

    })
})

export const { useCashInMutation,useCashOutMutation, useCommissionDetailsQuery} = agentApi
