import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContentJasa from "./components/ContentJasa";
import Teknologi from "./components/Teknologi";
import PaketJasa from "./components/PaketJasa";
import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet";

const JasaPage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [headerRef2, headerInView2] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

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
    <>
    <Helmet>
        <title>Service - Genta Arya</title>
    </Helmet>
      <Navbar />
      <div className="dark:bg-black dark:text-white py-5 min-h-dvh">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 100 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {opacity: 0, y: 100}}
          transition={{ duration: 0.8 }}
        >
          <ContentJasa />
          <Teknologi />
        </motion.div>

        <motion.div
          ref={headerRef2}
          initial={{ opacity: 0, y: 100 }}
          animate={
            headerInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
          }
          transition={{ duration: 0.5}}
        >
          <PaketJasa />
        </motion.div>
      </div>
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
    </>
  );
};

export default JasaPage;
