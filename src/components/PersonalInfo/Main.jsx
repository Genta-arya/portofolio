import React from "react";
import Tab from "./components/Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { motion, useInView } from "framer-motion";

const PersonalInfo = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.5 });

  return (
    <div className="dark:bg-black dark:text-white">
      <hr className="mt-24 dark:border-gray-500"></hr>
      <motion.div
        ref={ref}
        initial={{ opacity: 1, y: 100 , scale:0.8 }}
        animate={isInView ? { opacity: 1, y: 0 , scale:1} : { opacity: 1, y: 100 , scale:0.8 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center gap-4 mt-10 lg:mb-16">
          <FontAwesomeIcon
            icon={faGlobe}
            className="text-red-500 lg:text-2xl"
          />
          <p className="font-bold lg:text-3xl">Tentang Saya</p>
        </div>
        <Tab />
      </motion.div>
    </div>
  );
};

export default PersonalInfo;
