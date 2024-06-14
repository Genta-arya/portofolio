import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setActiveMenu } from "../../../Redux/Slices/MenuSlice";
import Project from "../Project/Page";
import CvPage from "../Cv/CvPage";

const Content = () => {
  const activeMenu = useSelector((state) => state.menu.activeMenu);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem("activeMenu");
    if (storedActiveMenu) {
      dispatch(setActiveMenu(storedActiveMenu));
    }
  }, []);

  return (
    <div className=" ">
      <div className="lg:px-10 pb-8">
        {activeMenu === "project" && <Project />}
        {activeMenu === "cv" && <CvPage />}
      </div>
    </div>
  );
};

export default Content;
