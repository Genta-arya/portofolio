import React from "react";
import { Link } from "react-router-dom";
import { formatProjectName, truncateName } from "../../utils/utils";

const MobileProject = ({ project }) => {
  const formattedProjectName = formatProjectName(project.name);

  return (
    <>
      <div className="overflow-hidden   ">
        <div className="font-bold md:w-64 w-40 text-sm md:text-xl mb-2 shadow-none lg:hidden">
          {truncateName(project.name, 35)}
        </div>
        <div className="font-bold w-80 text-sm md:text-xl mb-4 shadow-none lg:block hidden md:hidden">
          {truncateName(project.name, 28)}
        </div>

        <div className="relative aspect-w-16 aspect-h-9 ">
          <img
            className="object-cover w-full lg:w-96  hover:rounded-t-none rounded-md"
            src={project.thumb}
            alt={`Thumbnail for ${project.title}`}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50">
            <Link
              to={`/project/${formattedProjectName}/${project.id}`}
              className="text-white lg:text-sm text-xs md:text-sm lg:px-4 px-3 py-1 lg:py-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-colors"
            >
              Lihat Project
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileProject;
