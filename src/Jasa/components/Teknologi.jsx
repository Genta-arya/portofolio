import React from "react";
import reactIcon from "../../asset/svg/reactjs.svg";
import androidIcon from "../../asset/svg/android.svg";
import expressIcon from "../../asset/svg/express.svg";
import firebaseIcon from "../../asset/svg/firebase.svg";

const Teknologi = () => {
  const technologies = [
    { name: "ReactJS", icon: reactIcon },
    { name: "Android", icon: androidIcon },
    { name: "Express", icon: expressIcon },
    { name: "Firebase", icon: firebaseIcon },
  ];

  return (
    <div className="mt-28 lg:mt-16 md:-mt-24 dark:text-white ">
      <h2 className="text-xl font-bold text-center mb-4 px-2">
        Teknologi yang Gunakan untuk pengembangan aplikasi
      </h2>
      <div className="flex flex-wrap justify-center">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className=" rounded- p-2 flex flex-col items-center"
          >
            <img
              src={tech.icon}
              alt={`${tech.name} icon`}
              className="w-16 mb-4 bg-white border rounded-full p-2"
            />
            <h3 className="text-sm font-semibold">{tech.name}</h3>
          </div>
        ))}
      </div>
      <hr className="mt-8 "></hr>
    </div>
  );
};

export default Teknologi;
