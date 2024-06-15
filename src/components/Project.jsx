import React, { useEffect, useState } from "react";
import useProjects from "../Hooks/project/useProjects";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SkeletonGrid from "../Admin/Dashboard/Project/components/SkeletonGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatProjectName } from "../utils/utils";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ListProjectCarousel = () => {
  const { webProjects: projects, loading } = useProjects();
  const ref = React.useRef(null);

  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const handleBeforeChange = (oldIndex, newIndex) => {
    setActiveIndex(newIndex);
  };

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    fade: true,
    beforeChange: handleBeforeChange,
    appendDots: (dots) => (
      <>
        <div className="cursor-default flex justify-center mt-5">
          {dots.map((dot, index) => (
            <button
              key={index}
              className={`dot ${
                index === activeIndex ? "bg-orange-500" : "bg-gray-500"
              } lg:w-3 lg:h-3 h-2 w-2 rounded-full mx-2 focus:outline-none cursor-default`}
            ></button>
          ))}
        </div>
      </>
    ),
  };

  return (
    <div className="dark:bg-black dark:text-white ">
      <hr className=" dark:border-gray-500 border-gray-300 mt-12 lg:block md:block hidden"></hr>
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 100 }}
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-2 lg:px-8">
          <div className=" px-4 py-8 mt-12">
            <motion.div className="flex justify-between items-center pb-16">
              <motion.h2 className="text-md font-bold md:text-xl lg:px-24 flex items-center gap-1 lg:gap-4 ">
                <FontAwesomeIcon
                  icon={faStar}
                  className="mr-2 text-red-500 lg:text-2xl"
                />
                <p className="text-xl lg:text-2xl md:text-2xl">Project Saya</p>
              </motion.h2>
              <motion.div>
                <Link
                  to={"/project"}
                  className="bg-sky-500 px-3 lg:px-4 md:px-4 py-1 text-sm rounded-full hover:scale-95 transition-all ease-in hover:bg-sky-600 font-bold text-white"
                >
                  {" "}
                  Lihat semua
                </Link>
              </motion.div>
            </motion.div>
            {loading ? (
              <p>
                <SkeletonGrid />
              </p>
            ) : (
              <motion.div className="">
                <Slider {...settings} className="">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      className=""
                      to={`/project/${formatProjectName(project.name)}/${
                        project.id
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-2 flex justify-center text-oren">
                        {project.name}
                      </h3>
                      <div className="flex justify-center">
                        <img
                          src={project.thumb}
                          alt={project.name}
                          className="w-full lg:w-[55%] rounded-lg mb-4"
                        />
                      </div>
                    </Link>
                  ))}
                </Slider>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ListProjectCarousel;
