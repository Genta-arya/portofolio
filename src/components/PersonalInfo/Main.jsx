import React from "react";
import Tab from "./components/Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faWarning } from "@fortawesome/free-solid-svg-icons";

const PersonalInfo = () => {
  return (
    <div className="dark:bg-black dark:text-white ">
      <hr className="mt-24 dark:border-gray-500"></hr>
      <div className="flex justify-center items-center gap-4 mt-10 lg:mb-16">
        <FontAwesomeIcon icon={faGlobe} className="text-red-500 lg:text-2xl" />

        <p className=" font-bold lg:text-3xl ">Tentang Saya</p>
      </div>
      <Tab />
    </div>
  );
};

export default PersonalInfo;
