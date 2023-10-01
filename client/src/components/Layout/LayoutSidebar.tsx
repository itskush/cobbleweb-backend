import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutSidebar({ children }: LayoutProps) {
  return (
    <div className="overflow-hidden">
      <div className="flex relative">
        <div>
          <Sidebar />
        </div>
        <div className=" lg:pl-[18rem] bg-[#ffff] w-screen h-screen layout-sidebar  overflow-x-hidden">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
