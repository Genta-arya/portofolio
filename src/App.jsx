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
  const [personalInfoRef, personalInfoInView] = useInView({
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
      <motion.div
        className="dark:bg-black"
        ref={headerRef}
        initial={{ opacity: 0, y: -50 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 1, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
      </motion.div>
      <motion.div
        className="dark:bg-black"
        ref={personalInfoRef}
        initial={{ opacity: 1, y: 50 }}
        animate={
          personalInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.5 }}
      >
        <PersonalInfo />
      </motion.div>
      <motion.div
        className="dark:bg-black"
        ref={listProjectRef}
        initial={{ opacity: 1, y: 50 }}
        animate={
          listProjectInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }
        }
        transition={{ duration: 0.5 }}
      >
        <ListProject />
      </motion.div>
      <Footer />
    </div>
  );
}

export default App;
