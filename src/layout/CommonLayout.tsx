import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import type React from "react";

const CommonLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default CommonLayout;
