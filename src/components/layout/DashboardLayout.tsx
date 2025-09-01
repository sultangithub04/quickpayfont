import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {  Outlet, useNavigate } from "react-router"
import { Button } from "../ui/button"
import { authApi, useLogoutMutation, useUsrInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { toast } from "sonner"

export default function DashboardLayout() {
    const { data } = useUsrInfoQuery(undefined)
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleLogOut = () => {
        logout(undefined)
        dispatch(authApi.util.resetApiState())
        toast.success("Log Out successfully")
        navigate("/")
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between pr-10">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
            
                    <div >
                        {data?.data?.email && (
                            <Button onClick={handleLogOut} className="text-sm  bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 text-white transition-colors duration-300">
                                Logout
                            </Button>
                        )}
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
