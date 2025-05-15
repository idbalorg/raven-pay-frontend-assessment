import React from "react";
import { Outlet } from "react-router-dom";
import style from "./Main.module.scss";
import Markets from "../market/Market";

const Main = () => {
  return (
    <main className={style.main}>
      <Markets />
      <Outlet />
    </main>
  );
};

export default Main;
