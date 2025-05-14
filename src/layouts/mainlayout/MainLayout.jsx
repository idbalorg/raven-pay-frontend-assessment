import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
