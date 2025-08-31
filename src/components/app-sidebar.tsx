import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/assets/icons/Logo"
import { Link } from "react-router"
import { adminSidebarItems } from "@/routes/adminSidebarItems"
import { userSidebarItems } from "@/routes/userSidebarItems"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { role } from "@/constants/role"
import { useUsrInfoQuery } from "@/redux/features/auth/auth.api"

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUsrInfoQuery(undefined)
  // console.log(userData?.data?.role);

  const data = {

    navMain: getSidebarItems(userData?.data?.role),
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex gap-3 pt-4">
          <Link to="/">
            <Logo />

          </Link>
          <p className="text-2xl font-bold">Quick Pay</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
