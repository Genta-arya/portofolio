import React, { useState } from "react";

import ListProject from "./ListProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const TabProject = () => {
  const [activeTab, setActiveTab] = useState("web");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-8 lg:mt-16 dark:bg-black">
      {/* Tab Navigation */}
      <div className="flex justify-center  md:space-x-3 space-x-2 lg:space-x-3 px-4 lg:px-0 md:px-0">
        <button
          className={`lg:text-base md:text-base text-xs font-medium md:w-36 w-32   lg:w-36 rounded-lg py-2 transition-all ease-in  ${
            activeTab === "web"
              ? "text-white bg-oren"
              : "bg-gray-500 text-white   "
          } focus:outline-none`}
          onClick={() => handleTabClick("web")}
        >
          <FontAwesomeIcon icon={faGlobe} className="mr-2" />
          Website
        </button>
        <button
          className={`lg:text-base md:text-base text-xs font-medium md:w-36 w-32   lg:w-36  rounded-lg py-2 transition-all ease-in  ${
            activeTab === "mobile"
              ? "text-white bg-oren"
              : "bg-gray-500 text-white   "
          } focus:outline-none`}
          onClick={() => handleTabClick("mobile")}
        >
          <FontAwesomeIcon icon={faAndroid} className="mr-2 " />
          Mobile
        </button>
      </div>

      <div className="lg:py-24 md:py-12 py-12  md:px-12 px-4 lg:px-32">
        <div className="">
          <ListProject active={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default TabProject;
