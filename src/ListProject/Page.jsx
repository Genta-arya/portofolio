import React from "react";
import { Helmet } from "react-helmet";
import TabProject from "./components/Tab";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PageProject = () => {
  return (
    <div className="dark:bg-black dark:text-white h-screen">
      <Helmet>
        <title>Genta - Project</title>
      </Helmet>
      <Navbar />
      <TabProject />

    </div>
  );
};

export default PageProject;
