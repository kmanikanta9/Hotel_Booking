import React from "react";
import { assets } from "../../assets/data/assets";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ];
  return (
    <div className="w-20 md:w-64 border-r h-full text-base border-gray-300 pt-6 flex flex-col bg-white shadow-sm">
  {sidebarLinks.map((item, index) => (
    <NavLink
      to={item.path}
      key={index}
      end={item.path === "/owner"} // only exact match for dashboard
      className={({ isActive }) =>
        `flex items-center py-3 px-4 md:px-6 gap-4 rounded-r-full transition-all duration-200 
        ${isActive
          ? "bg-blue-100 text-blue-600 font-semibold border-r-4 border-blue-600"
          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"}`
      }
    >
      <img src={item.icon} alt={item.name} className="h-6 w-6" />
      <p className="hidden md:block">{item.name}</p>
    </NavLink>
  ))}
</div>

  );
};

export default Sidebar;
