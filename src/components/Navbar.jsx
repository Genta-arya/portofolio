import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [theme, setTheme] = useState("light");
  const [showBackButton, setShowBackButton] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    // Check if pathname matches /project/:id
    if (location.pathname.startsWith("/project/")) {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate("/"); // Navigate back to the previous location
  };

  return (
    <motion.nav
    
      className="flex justify-between  lg:text-base md:text-base text-xs lg:px-32 px-5 py-4  md:px-12 items-center bg-white dark:bg-black dark:text-white border-b dark:border-gray-500 border-gray-300"
    >
      {showBackButton ? (
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-gray-900 dark:text-gray-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="font-bold">Beranda</span>
        </button>
      ) : (
        <nav className="flex space-x-4 lg:gap-6">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "border-b-2 border-oren font-bold "
                : ""
            }text-gray-900 dark:text-gray-300  `}
          >
            Beranda
          </Link>
          <Link
            to="/project"
            className={`${
              location.pathname === "/project"
                ? "border-b-2 border-oren font-bold "
                : ""
            }text-gray-900 dark:text-gray-300  `}
          >
            Project
          </Link>

          <Link
            to="/jasa"
            className={`${
              location.pathname === "/jasa"
                ? "border-b-2 border-oren font-bold "
                : ""
            }text-gray-900 dark:text-gray-300  `}
          >
            Service
          </Link>
        </nav>
      )}

      <label className="inline-flex items-center cursor-pointer">
        <span className="mr-3 text-xs md:text-sm font-bold">Tema</span>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-oren peer-focus:ring-4  dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-oren after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-oren peer-checked:bg-oren" />
      </label>
    </motion.nav>
  );
};

export default Navbar;
