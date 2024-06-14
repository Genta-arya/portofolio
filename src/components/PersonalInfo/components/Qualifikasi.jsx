import {
  faBagShopping,
  faCalendar,
  faGraduationCap,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { motion } from "framer-motion";
const Qualifikasi = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="item-center flex flex-row justify-center">
        <div className="flex flex-row items-start mt-4 gap-12">
          <motion.div
            className="flex flex-col "
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex item-center gap-4 text-sm">
              <FontAwesomeIcon icon={faBagShopping} className="text-oren" />
              <p>Pengalaman</p>
            </div>
            <p className=" md:text-base text-sm lg:text-base mt-4">
              Studi Independen - Bangkit Academy
            </p>
            <p className="text-xs text-gray-500">Android Developer - Kotlin</p>
            <div className="flex item-center gap-4 text-xs mt-2">
              <FontAwesomeIcon icon={faCalendar} className="text-sky-400" />
              <p>2022-2022</p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex item-center gap-4 text-sm">
              <FontAwesomeIcon icon={faGraduationCap} className="text-oren" />
              <p>Pendidikan</p>
            </div>

            <p className="md:text-base text-sm lg:text-base mt-4">
              Universitas Dian Nuswantoro
            </p>
            <p className="text-xs text-gray-500">S1 - Teknik Informatika</p>
            <div className="flex item-center gap-4 text-xs mt-2">
              <FontAwesomeIcon icon={faCalendar} className="text-sky-400" />
              <p>2019-2023</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Qualifikasi;
