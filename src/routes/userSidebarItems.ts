import SendMoney from "@/pages/User/SendMoney";
import UserTransactionhistory from "@/pages/User/UserTransactionhistory";
import type { ISidebarItem } from "@/types";
import UpdateUser from "@/pages/User/UpdateUser";
import WithDrawMoney from "@/pages/User/WithDrawMoney";
import CashDeposit from "@/pages/User/CashDeposit";
import Overview from "@/pages/User/Overview";
export const userSidebarItems: ISidebarItem[] = [
  {
    title: "User Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user",
        component: Overview
      },

      {
        title: "Deposit money",
        url: "/user/deposit",
        component: CashDeposit
      },
      {

        title: "WithDrawMony ",
        url: "/user/withdrawmoney",
        component: WithDrawMoney
      },
      {
        title: "Send money",
        url: "/user/sendmoney",
        component: SendMoney
      },
      {
        title: "Transaction history",
        url: "/user/history",
        component: UserTransactionhistory
      },
      {
        title: "Profile management",
        url: "/user/updateprofile",
        component: UpdateUser
      },
    ],
  },

]