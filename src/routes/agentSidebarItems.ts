import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
import GetCommission from "@/pages/Agent/GetCommission";
import Overview from "@/pages/User/Overview";
import UpdateUser from "@/pages/User/UpdateUser";
import UserTransactionhistory from "@/pages/User/UserTransactionhistory";

import type { ISidebarItem } from "@/types";


export const agentSidebarItems: ISidebarItem[]=[
    {
      title: "Agent Dashboard",
      items: [
        {
          title: "Overview",
          url: "/agent",
          component: Overview
        },
        {
          title: "Add money",
          url: "/agent/addmoney",
          component: CashIn
        },
        {
          title: "Withdraw money",
          url: "/agent/withdrawmoney",
          component: CashOut
        },
        {
          title: "View all transactions",
          url: "/agent/transaction",
          component: UserTransactionhistory
        },
        {
          title: "Commission History",
          url: "/agent/commission",
          component: GetCommission
        },
        {
            title: "Profile management",
            url: "/agent/updateprofile",
            component: UpdateUser
        },
      ],
    },
 
  ]