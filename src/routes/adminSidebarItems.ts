import Adjustsystemfees from "@/pages/Admin/Adjustsystemfees";
import AdmOverView from "@/pages/Admin/AdmOverView";
import GetAllUser from "@/pages/Admin/GetAllUser";
import Manageagents from "@/pages/Admin/Manageagents";
import ViewAllTransaction from "@/pages/Admin/ViewAllTransaction";
import Overview from "@/pages/User/Overview";
import UpdateUser from "@/pages/User/UpdateUser";
import Welcome from "@/pages/User/UpdateUser";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "OverView",
        url: "/admin",
        component: AdmOverView
      },
      {
        title: "Manage users",
        url: "/admin/allUser",
        component: GetAllUser
      },
      {
        title: "Manage agents",
        url: "/admin/agent",
        component: Manageagents
      },
      {
        title: "View all transactions",
        url: "/admin/alltransction",
        component: ViewAllTransaction
      },
      {
        title: "Adjust System Fees",
        url: "/admin/commission",
        component: Adjustsystemfees
      },
      {
        title: "Profile management",
        url: "/admin/updateprofile",
        component: UpdateUser
      },
    ],
  },


]