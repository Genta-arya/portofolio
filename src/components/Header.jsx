import React, { useEffect } from "react";
import profil from "../asset/profil.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEnvelope,
  faPaperPlane,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import SocialMedia from "./SocialMedia";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import ProjectCount from "./ProjectCount";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useCv from "../Hooks/Cv/useCv";
import ReactGA from "react-ga4";
const Header = () => {
  const { document } = useCv();

  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [descriptionRef, descriptionInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const handleDownloadCV = () => {
    if (document && document.url) {
      window.open(document.url, "_blank");
    } else {
      console.error("Error: CV document URL is not available.");
    }
    ReactGA.event({
      category: "Cv Click",
      action: "Click",
      label: "Cv Click",
    });
  };

  const handleCallme = () => {
    ReactGA.event({
      category: "Hubungi saya Click",
      action: "Click",
      label: "Hubungi saya Click",
    });

    const phoneNumber = "6289618601348";
    const message = "Hello Genta";
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="flex items-center md:justify-around md:flex-row flex-col md:py-12 py-4 px-4 dark:bg-black dark:text-white">
        <div className="md:w-[50%] px-1 md:px-0">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: -50 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }
            }
            transition={{ duration: 0.5 }}
          >
            <h1 className="leading-relaxed tracking-wide text-oren font-semibold pb-10">
              FULLSTACK DEVELOPER
            </h1>
          </motion.div>
          <div className="md:hidden lg:hidden item-center flex justify-start gap-4">
            <img
              src={profil}
              alt="Profile"
              className="lg:w-80 md:w-56 w-20 rounded-full bg-orenMuda"
            />
            <div className="flex flex-col items-start">
              <h1 className="text-base font-bold lg:hidden md:hidden">
                Hai Saya{" "}
              </h1>
              <p>Gentha Arya Pratama</p>
            </div>
          </div>
          <motion.div
            ref={descriptionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={
              descriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.5 }}
          >
            <h1 className="lg:text-5xl md:text-3xl font-bold hidden lg:block md:block">
              Hai, Saya Gentha Arya Pratama
            </h1>
            <p className="text-sm md:text-base lg:text-base text-gray-700 dark:text-gray-400 mt-5">
              Memiliki pengalaman selama 1 tahun sebagai seorang Fullstack
              Developer di platform mobile ataupun website. Saya dapat
              beradaptasi dengan teknologi-teknologi terkini dan memiliki
              kemampuan dalam mengembangkan solusi yang inovatif dan efisien
              untuk berbagai kebutuhan proyek aplikasi.
            </p>
          </motion.div>
          <div className="hidden md:hidden lg:block">
            <p className="mt-12 mb-8">Social Media</p>
            <div className="flex gap-4 justify-start">
              <a
                href="https://github.com/Genta-arya"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-gray-700 dark:text-gray-300 text-3xl hover:text-blue-500 dark:hover:text-blue-400"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/m-gentha-arya-pratama-37b419231/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-gray-700 dark:text-gray-300 text-3xl hover:text-blue-500 dark:hover:text-blue-400"
                />
              </a>
              <a
                href="https://www.instagram.com/mgentaarya/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-gray-700 dark:text-gray-300 text-3xl hover:text-blue-500 dark:hover:text-blue-400"
                />
              </a>

              <a
                href="mailto:mgentaaryap@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-gray-700 dark:text-gray-300 text-3xl hover:text-red-300 dark:hover:text-red-300"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="ml-5 hidden md:block lg:block">
          <img
            src={profil}
            alt="Profile"
            className="lg:w-80 md:w-56 rounded-full bg-orenMuda"
          />
        </div>
      </div>

      <ProjectCount />

      <motion.div
        className="flex justify-center gap-5 text-white text-xs lg:text-base md:text-base"
        ref={headerRef}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={
          headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.5 }}
      >
        <button className="bg-oren px-6 py-2 rounded-md hover:bg-orange-500 ease-in transition-all">
          <div className="flex items-center gap-2" onClick={handleDownloadCV}>
            <p>Download CV</p>
            <FontAwesomeIcon icon={faDownload} />
          </div>
        </button>
        <button
          className="border-oren border px-6 py-2 rounded-md ease-in transition-all dark:text-white text-oren dark:hover:text-orenMuda"
          onClick={handleCallme}
        >
          <div className="flex items-center gap-2">
            <p>Hubungi Saya</p>
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        </button>
      </motion.div>

      <SocialMedia />
    </>
  );
};

export default Header;
