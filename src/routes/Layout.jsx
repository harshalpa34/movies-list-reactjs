import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar"; // Adjust the import based on your Sidebar component location

const Layout = () => {
  return (
    <div className="content-wrapper">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
