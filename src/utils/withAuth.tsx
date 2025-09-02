import { useUsrInfoQuery } from "@/redux/features/auth/auth.api"
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth=(Componet:ComponentType, requiredRole?:TRole)=>{
return function AuthWraper(){
    const {data, isLoading}= useUsrInfoQuery(undefined)
    if(!isLoading &&!data?.data?.email){
        return <Navigate to="/login"/>
