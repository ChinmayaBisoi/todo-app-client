import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="">
        <Sidebar isMain />
        <div className="mb-20 md:ml-[200px] px-4 py-8 md:p-8">{children}</div>
      </div>
    </>
  );
};

export default Layout;
