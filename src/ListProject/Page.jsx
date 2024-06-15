import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import TabProject from "./components/Tab";
import Navbar from "../components/Navbar";
import {motion} from "framer-motion"

const PageProject = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="dark:bg-black dark:text-white h-screen">
      <Helmet>
        <title>Genta - Project</title>
      </Helmet>
      <Navbar />
      <TabProject />
      {showScrollButton && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-12 right-5 z-50 text-3xl text-white p-2 rounded-full "
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          ⬆️
        </motion.button>
      )}
    </div>
  );
};

export default PageProject;
