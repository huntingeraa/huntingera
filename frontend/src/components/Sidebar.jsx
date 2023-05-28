import React, { useContext, useState } from "react";
import { SidebarContext } from "./SidebarContext";
import { useSelector } from "react-redux";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaUserSecret,
  FaUserCog,
  
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useContext(SidebarContext);
  const toggle = () => setIsOpen(!isOpen);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const vendorLogin = useSelector((state) => state.vendorLogin);
  const { vendorInfo } = vendorLogin;
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/about",
      name: "About",
      icon: <FaUserAlt />,
    },
    {
      path: userInfo ? "/user" : vendorInfo ? "/vendor" : "/login",
      name: "Security",
      icon: <FaUserSecret />,
    },
    
    {
      path: adminInfo ? "/admindash" : "/admin",
      name: "Admin",
      icon: <FaUserCog />,
    },
  ];
  return (
    <div className="containerside">
      <div
        style={{
          width: isOpen ? "200px" : "50px",
          position: "fixed",
          top: 80,
          left: 0,
          overflowY: "auto",
        }}
        className="sidebarside"
      >
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            PH
          </h1>
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
            onClick={() => {
              if (item.path === "/admin") {
                window.location.href = "/admin";
              }
              if (item.path === "/admindash"){
                window.location.href = "/admindash";
              }
            }}
          >
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? "200px" : "40px",
          width: isOpen ? "calc(100% - 0px)" : "100%",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
