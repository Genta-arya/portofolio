import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import ikon pencarian dari react-icons
import { motion } from "framer-motion"; // Import framer-motion
import useProjects from "../../Hooks/project/useProjects";
import WebProject from "./webProject";
import MobileProject from "./mobileProject";
import SkeletonGrid from "../../Admin/Dashboard/Project/components/SkeletonGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const ListProject = ({ active }) => {
  const { webProjects, mobileProjects, loading } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");

  const renderSkeletonGrids = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <SkeletonGrid key={index} />
    ));
  };

  const filterProjectsByName = (projects) => {
    return projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderNoProjectsFound = () => {
    return (
      <div className="text-center  flex justify-center mt-24">
        <p className="text-gray-500">Tidak ada proyek yang ditemukan.</p>
      </div>
    );
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 40 , scale:0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale:1,
      transition: {
        delay: i * 0.3,
        duration:0.8
      },
    }),
  };

  return (
    <>
      <div className="mb-2 flex flex-col md:flex-row md:justify-between -mt-4 lg:mt-0 md:mt-0 items-center dark:bg-black ">
        <div className="flex justify-center items-center gap-4">
          <FontAwesomeIcon icon={faCircle} className="text-xs text-red-500" />
          <p className="md:font-bold md:text-xl">
            {active === "web" ? "Web Developer" : "Mobile Developer"}
          </p>
        </div>
        <div className="relative w-96 px-8  md:mt-0 mt-4 md:w-72 lg:w-80">
          <input
            type="text"
            placeholder="Cari Nama Project"
            className="w-full  rounded-full  py-2 text-xs lg:text-sm md:text-sm md:px-10  lg:px-10 lg:py-2 pl-10 text-black border dark:text-white dark:bg-black border-gray-300  focus:outline-none focus:ring-2 dark:focus:ring-white focus:ring-oren"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-12 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
        </div>
      </div>
      <hr className="mt-12 dark:border-gray-500 border-gray-300"></hr>

      {loading && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
          {loading && renderSkeletonGrids()}
        </div>
      )}

      <div>
        {!loading &&
          (active === "web" ? (
            filterProjectsByName(webProjects).length === 0 ? (
              renderNoProjectsFound()
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 md:gap-8 gap-4 items-center md:py-16 py-8">
                {filterProjectsByName(webProjects).map((project, index) => (
                  <motion.div
                    key={project.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={projectVariants}
                  >
                    <WebProject project={project} />
                  </motion.div>
                ))}
              </div>
            )
          ) : active === "mobile" ? (
            filterProjectsByName(mobileProjects).length === 0 ? (
              <div className="flex justify-center">
                {renderNoProjectsFound()}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center md:py-16 py-8">
                {filterProjectsByName(mobileProjects).map((project, index) => (
                  <motion.div
                    key={project.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={projectVariants}
                  >
                    <MobileProject project={project} />
                  </motion.div>
                ))}
              </div>
            )
          ) : null)}
      </div>
    </>
  );
};

export default ListProject;
