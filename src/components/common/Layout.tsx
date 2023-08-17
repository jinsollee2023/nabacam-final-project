import React from "react";
import Navbar from "./navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ flex: 1, marginLeft: "35px" }}>{children}</div>
    </div>
  );
};

export default Layout;
