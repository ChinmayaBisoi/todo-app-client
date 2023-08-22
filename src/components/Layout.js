import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <div className="h-[2000px] md:ml-[200px]">{children}</div>
      </div>
    </>
  );
};

export default Layout;
