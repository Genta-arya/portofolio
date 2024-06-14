import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faStar,
  faCog,
  faDashboard,
  faGlobe,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setActiveMenu } from "../../../Redux/Slices/MenuSlice";
import { faDochub, faLetterboxd } from "@fortawesome/free-brands-svg-icons";

const Menu = () => {
  const activeMenu = useSelector((state) => state.menu.activeMenu);
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  const handleMenuClick = (menu) => {
    dispatch(setActiveMenu(menu));

    localStorage.setItem("activeMenu", menu);
  };

  return (
    <ul
      className={`flex flex-col  ${sidebarOpen ? "gap-6" : "gap-4"} mt-4 px-2`}
    >
      <li
        className={`duration-300 flex items-center ${
          sidebarOpen ? "justify-center mt-4 ml-1" : ""
        } cursor-pointer ${
          activeMenu === "project" && !sidebarOpen
            ? "rounded-full border-2 border-oren"
            : "text-gray-600"
        } hover:text-gray-900`}
        onClick={() => handleMenuClick("project")}
      >
        <FontAwesomeIcon
          icon={faDashboard}
          className={`  ${
            sidebarOpen ? "text-3xl  " : "text-base mr-3 ml-3 p-1"
          } ${
            activeMenu === "project" && sidebarOpen
              ? "border-b-2 border-oren text-oren  "
              : "text-gray-500"
          } hover:text-orenMuda `}
        />
        {!sidebarOpen && (
          <span
            className={` text-center md:text-xs  lg:text-sm ${
              activeMenu === "project"
                ? "text-oren font-bold"
                : "text-gray-600 font-semibold "
            }`}
          >
            Project Saya
          </span>
        )}
      </li>

      <li
        className={`duration-300 flex items-center ${
          sidebarOpen ? "justify-center mt-4 ml-1" : ""
        } cursor-pointer ${
          activeMenu === "cv" && !sidebarOpen
            ? "rounded-full border-2 border-oren"
            : "text-gray-600"
        } hover:text-gray-900`}
        onClick={() => handleMenuClick("cv")}
      >
        <FontAwesomeIcon
          icon={faPaperclip}
          className={`  ${
            sidebarOpen ? "text-3xl  " : "text-base mr-3 ml-3 p-1"
          }  ${
            activeMenu === "cv" && sidebarOpen
              ? "border-b-2 border-oren text-oren  "
              : "text-gray-500"
          } hover:text-orenMuda `}
        />
        {!sidebarOpen && (
          <span
            className={` text-center md:text-xs  lg:text-sm ${
              activeMenu === "cv"
                ? "text-oren font-bold"
                : "text-gray-600 font-semibold "
            }`}
          >
            Cv Saya
          </span>
        )}
      </li>
    </ul>
  );
};

export default Menu;
