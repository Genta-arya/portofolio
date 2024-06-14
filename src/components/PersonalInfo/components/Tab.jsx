import React, { useState } from "react";
import InfoSaya from "./InfoSaya";
import Qualifikasi from "./Qualifikasi";
import Skills from "./Skills";

const Tab = () => {
  const [activeTab, setActiveTab] = useState("info"); // State untuk mengatur tab aktif

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-8 ">
      {/* Tab Navigation */}
      <div className="flex justify-center  md:space-x-3 space-x-2 lg:space-x-3 px-4 lg:px-0 md:px-0">
        <button
          className={`lg:text-base text-xs font-medium md:w-36 w-32   lg:w-36 rounded-lg py-1 transition-all ease-in  ${
            activeTab === "info"
              ? "text-white bg-oren"
              : "bg-gray-500 text-white   "
          } focus:outline-none`}
          onClick={() => handleTabClick("info")}
        >
          Personal Info
        </button>
        <button
          className={`lg:text-base text-xs font-medium md:w-36 w-32   lg:w-36  rounded-lg py-1 transition-all ease-in  ${
            activeTab === "qualification"
              ? "text-white bg-oren"
              : "bg-gray-500 text-white   "
          } focus:outline-none`}
          onClick={() => handleTabClick("qualification")}
        >
          Qualifications
        </button>
        <button
          className={`lg:text-base text-xs font-medium md:w-36 w-32   lg:w-36  rounded-lg py-1 transition-all ease-in  ${
            activeTab === "skills"
              ? "text-white bg-oren"
              : "bg-gray-500 text-white   "
          } focus:outline-none`}
          onClick={() => handleTabClick("skills")}
        >
          Skills
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "info" && (
          <div className="flex justify-center px-5 lg:px-0 md:px-0 pb-4">
            <InfoSaya />
          </div>
        )}
        {activeTab === "qualification" && (
          <div className="flex justify-center px-8 lg:px-0 md:px-0 pb-4">
            <Qualifikasi />
          </div>
        )}
        {activeTab === "skills" && (
          <div className="flex justify-center">
            <Skills />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
