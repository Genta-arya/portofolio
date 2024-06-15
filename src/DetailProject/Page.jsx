import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import useProjects from "../Hooks/project/useProjects";
import Footer from "../components/Footer";
import ModalPreviewImage from "./components/ModalPreviewImage";
import { motion, AnimatePresence } from "framer-motion";
import { FRAMEWORKS } from "../Admin/Dashboard/Project/modal/Data";
import SkeletonGrid from "../Admin/Dashboard/Project/components/SkeletonGrid";
import ReactGA from "react-ga4";
const DetailProject = () => {
  let { id } = useParams();
  const { projects: projectById, loading, error } = useProjects(id);
  const data = projectById[0];
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage("");
  };
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });

    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <>
        <div className="h-screen dark:bg-black dark:text-white">
          <Navbar />

          <div className=" mt-8">
            <SkeletonGrid />
          </div>
        </div>
      </>
    );
  }

  const getFrameworkName = (frameworkId) => {
    const framework = FRAMEWORKS.find((fw) => fw.id === frameworkId);
    return framework ? framework.name : "";
  };

  const getFrameworkImage = (frameworkId) => {
    const framework = FRAMEWORKS.find((fw) => fw.id === frameworkId);
    return framework ? framework.image : null;
  };

  return (
    <>
      <Helmet>
        <title>{data ? data.name : "Project Detail"}</title>
      </Helmet>
      <div className="dark:bg-black">
        <Navbar />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "circIn", duration: 0.6 }}
        className="lg:px-32 md:px-12 py-8 px-8 dark:bg-black dark:text-white min-h-dvh"
      >
        {data ? (
          <motion.div
            className=""
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-2">
              Project : {data.name}
            </h3>
            <a
              href={data.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold rounded-md text-sm py-1 bg-sky-500 px-4"
            >
              Lihat Project
            </a>
            <p className="mb-4 text-sm md:text-base lg:text-base mt-4">
              {data.description}
            </p>
            <div className="mt-4 flex justify-center">
              <div className="flex flex-wrap justify-center lg:w-96  mb-12 gap-4  md:mt-12 mt-8 lg:mt-12">
                {data.frameworks.map((frameworkId, idx) => (
                  <div
                    key={idx}
                    className="flex items-center dark:bg-black rounded-lg p-2  "
                  >
                    {getFrameworkImage(frameworkId) && (
                      <img
                        src={getFrameworkImage(frameworkId)}
                        alt={getFrameworkName(frameworkId)}
                        className="w-10 h-10 md:w-20 md:h-20 border mr-2 bg-white rounded-full p-2 lg:h-20 lg:w-20"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {data.images
                .slice()
                .reverse()
                .map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    onClick={() => openModal(image)}
                    className="max-w-[40%] lg:w-[20%] border border-gray-400 lg:h-full md:max-w-[25%] object-cover rounded-md mb-4 hover:shadow-sky-400 hover:shadow-2xl cursor-pointer hover:scale-95 transition-all ease-in"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeIn",
                      delay: index * 0.2,
                    }}
                  />
                ))}
            </div>
          </motion.div>
        ) : (
          <>
            <p className="h-screen flex justify-center items-center">
              404 - Project Tidak ditemukan
            </p>
          </>
        )}
      </motion.div>
      <Footer />
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 backdrop-blur-sm"
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: 500 }}
          >
            <ModalPreviewImage
              closeModal={closeModal}
              selectedImage={selectedImage}
              showModal={showModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DetailProject;
