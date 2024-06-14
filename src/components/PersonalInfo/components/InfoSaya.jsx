import { faCalendar, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { motion } from "framer-motion";
const InfoSaya = () => {
  return (
    <motion.div
      className="item-center flex flex-col justify-center "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-sm font-bold text-sky-400">
        Lulusan S1 Teknik Informatika di Universitas Dian Nuswantoro Semarang,
      </h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 w-full">
        saya memiliki pengetahuan dalam merancang sebuah aplikasi
      </p>

      <div className="flex flex-col items-start mt-4 gap-3">
        <div className="flex item-center gap-4 text-sm">
          <FontAwesomeIcon icon={faUser} className="text-oren" />
          <p>M.Gentha Arya Pratama</p>
        </div>

        <div className="flex item-center gap-4 text-sm">
          <FontAwesomeIcon icon={faPhone} className="text-oren" />
          <p>+62 1860-1348</p>
        </div>
        <div className="flex item-center gap-4 text-sm">
          <FontAwesomeIcon icon={faCalendar} className="text-oren" />
          <p>19-Oktober-2001</p>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoSaya;
