import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import useProjects from "../Hooks/project/useProjects";

const ProjectCount = () => {
  const [totalRepos, setTotalRepos] = useState(0);
  const { totalProjects } = useProjects();
  const dummyClients = 4;

  useEffect(() => {
    fetch("https://api.github.com/users/Genta-arya")
      .then((response) => response.json())
      .then((data) => setTotalRepos(data.public_repos))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex items-center justify-center gap-8 lg:pb-24 md:pb-24 lg:py-0 md:py-0 pb-12 mt-4 dark:text-white lg:px-0 md:px-0 px-6 ">
      <a
        className="flex flex-col items-center w-40"
        href="https://github.com/Genta-arya?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className="lg:text-xl md:text-xl text-sm font-semibold mb-2">
          Repositories
        </h3>

        <CountUp
          end={totalRepos}
          duration={3}
          className="lg:text-4xl md:text-4xl text-3xl text-blue-500 hover:text-blue-700"
        />
      </a>
      <div className="flex flex-col items-center w-40 ">
        <h3 className="lg:text-xl md:text-xl text-sm  font-semibold mb-2">
          Projects
        </h3>
        <CountUp
          className="lg:text-4xl md:text-4xl text-3xl text-green-500"
          end={totalProjects}
          duration={3}
        />
      </div>
      <div className="flex flex-col items-center w-40">
        <h3 className="lg:text-xl md:text-xl text-sm font-semibold mb-2">
          Client
        </h3>
        <CountUp
          className="lg:text-4xl md:text-4xl text-3xl text-red-500"
          end={dummyClients}
          duration={3}
        />
      </div>
    </div>
  );
};

export default ProjectCount;
