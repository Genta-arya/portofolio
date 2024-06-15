import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PersonalInfo from "./components/PersonalInfo/Main";
import useProjects from "./Hooks/project/useProjects";
import ListProject from "./components/Project";
import { Helmet } from "react-helmet";

function App() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [listProjectRef, listProjectInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="h-screen flex flex-col dark:bg-black">
      <Helmet>
        <title>Genta - Beranda</title>
      </Helmet>
      <Navbar />

      <Header />

      <PersonalInfo />

      <ListProject />

      <Footer />
    </div>
  );
}

export default App;
