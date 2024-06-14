import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModalPreviewImage = ({ showModal, closeModal, selectedImage }) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="max-w-4xl w-full mx-auto p-4 "
          >
            <div className="flex justify-center ">
              <button
                onClick={closeModal}
                className="bg-oren border  text-sm lg:text-base md:text-base lg:mt-0 mt-12 z-50 text-white rounded-full px-3 py-1.5 focus:outline-none hover:border-white transition-colors"
              >
                Tutup
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={selectedImage}
                alt="Preview"
                className="lg:max-h-screen lg:max-w-full  md:max-h-screen md:h-auto md:max-w-full md:w-auto lg:w-auto   lg:-mt-20  md:-mt-28 md:p-24 w-80 rounded shadow-lg lg:p-16 pb-10 lg:pb-0 md:pb-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalPreviewImage;
