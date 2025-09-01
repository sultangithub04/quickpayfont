import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { agentSidebarItems } from "./agentSidebarItems";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import HeroSection from "@/components/modules/Homepage/HeroSection";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/Faq";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: HeroSection,
                path: "/"
            },
            {
                Component: About,
                path: "about"
            },
            {
                Component: Features,
                path: "features"
            },
            {
                Component: Pricing,
                path: "pricing"
            },
            {
                Component: Contact,
                path: "contact"
            },
            {
                Component: FAQ,
                path: "faq"
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.admin as TRole),
        // Component: DashboardLayout,
        path: "/admin",
        children: [...generateRoutes(adminSidebarItems),]
    },
    {
        Component: withAuth(DashboardLayout, role.user as TRole),
        path: "/user",
        children: [ ...generateRoutes(userSidebarItems), ]
    },

    {
        Component: withAuth(DashboardLayout, role.agent as TRole),
        path: "/agent",
        children: [ ...generateRoutes(agentSidebarItems)]
    },
    {
        Component: Login,
        path: "/login"
    },

    {
        Component: Register,
        path: "/register"
    },
    {
        Component: Verify,
        path: "/verify"
    },
    {
        Component: Unauthorized,
        path: "/unauthorized"
    },
    {
        Component: NotFound,
        path: "*"
    },


])