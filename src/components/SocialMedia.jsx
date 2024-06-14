import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const SocialMedia = () => {
  return (
    <>
      <div className="flex justify-center items-center gap-3 mt-12 dark:text-white lg:hidden mb-24 ">
        <hr className="border dark:border-gray-500 border-gray-200 flex-grow"></hr>
        <p className="text-gray-900 dark:text-gray-300 text-lg font-bold">
          Social Media
        </p>
        <hr className="border dark:border-gray-500 border-gray-200 flex-grow"></hr>
      </div>
      <div className="flex gap-4 justify-center  lg:hidden  ">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon
            icon={faGithub}
            className="text-gray-700 dark:text-gray-300 text-3xl hover:text-blue-500 dark:hover:text-blue-400"
          />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="text-gray-700 dark:text-gray-300 text-3xl hover:text-blue-500 dark:hover:text-blue-400"
          />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-gray-700 dark:text-gray-300 text-3xl hover:text-blue-500 dark:hover:text-blue-400"
          />
        </a>
        <a
          href="https://api.whatsapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="text-gray-700 dark:text-gray-300 text-3xl hover:text-green-500 dark:hover:text-green-400"
          />
        </a>
        <a
          href="mailto:youremail@example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-gray-700 dark:text-gray-300 text-3xl hover:text-red-300 dark:hover:text-red-300"
          />
        </a>
      </div>
    </>
  );
};

export default SocialMedia;
