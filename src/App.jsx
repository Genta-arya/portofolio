import React, { useEffect, useState } from "react";
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
import ReactGA from "react-ga4";
function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });
  }, []);

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
    <div className="h-screen flex flex-col dark:bg-black">
      <Helmet>
        <title>Genta - Beranda</title>
      </Helmet>
      <Navbar />

      <Header />

      <PersonalInfo />

      <ListProject />

      <Footer />

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
}

export default App;
