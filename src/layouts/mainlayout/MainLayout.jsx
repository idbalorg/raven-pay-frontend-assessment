import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import Main from "../../components/main/Main";
import style from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <div className={style.container}>
      <Navigation />
      <Main />
      <Footer />
    </div>
  );
};

export default MainLayout;
