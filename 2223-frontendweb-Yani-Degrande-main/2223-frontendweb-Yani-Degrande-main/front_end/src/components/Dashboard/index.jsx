import "./index.scss";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";



export default function Dashboard() {
  return (
    <div className="dashboard grid">
      <Sidebar/>
      <div className="dashboard__content">
        <Outlet/>
      </div>
    </div>
  );
}
