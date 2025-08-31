import { Outlet } from "react-router"
import CommonLayout from "./components/layout/CommonLayout"


function App() {
  // console.log(generateRoutes(adminSidebarItems));
  return (
    <div>
      
      <CommonLayout>
        <Outlet />
      </CommonLayout>

    </div>
  )
}

export default App