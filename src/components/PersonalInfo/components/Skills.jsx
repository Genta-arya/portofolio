import React from "react";
import mysqlLogo from "../../../asset/svg/mysql.svg";
import microsoft from "../../../asset/svg/microsoft.svg";
import nodejsLogo from "../../../asset/svg/nodejs.svg";
import nextjsLogo from "../../../asset/svg/nextjs.svg";
import reactjsLogo from "../../../asset/svg/reactjs.svg";
import firebaseLogo from "../../../asset/svg/firebase.svg";
import android from "../../../asset/svg/android.svg";
import time from "../../../asset/svg/time.svg";
import postman from "../../../asset/svg/postman.svg";
import vscode from "../../../asset/svg/vscode.svg";
import git from "../../../asset/svg/git.svg";
import { motion } from "framer-motion";
const Skills = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Skill
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 p-4">
          <SkillCard image={reactjsLogo} alt="React.js">
            React.js
          </SkillCard>
          <SkillCard image={nodejsLogo} alt="Node.js">
            Node.js
          </SkillCard>
          <SkillCard image={mysqlLogo} alt="MySQL">
            MySQL
          </SkillCard>
          <SkillCard image={firebaseLogo} alt="Firebase">
            Firebase
          </SkillCard>
          <SkillCard image={nextjsLogo} alt="Next.js">
            Next.js
          </SkillCard>
          <SkillCard image={android} alt="Android - Kotlin">
            Android - Kotlin
          </SkillCard>
          <SkillCard image={reactjsLogo} alt="React Native">
            React Native
          </SkillCard>
          <SkillCard image={microsoft} alt="Microsoft Office">
            Microsoft Office
          </SkillCard>

          <SkillCard image={time} alt="Microsoft Office">
            Time Management
          </SkillCard>
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tools
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 lg:gap-4 mt-4 p-4 lg:p-2 md:p-2">
          <SkillCard image={vscode} alt="React.js">
            VsCode
          </SkillCard>
          <SkillCard image={postman} alt="Node.js">
            Postman
          </SkillCard>
          <SkillCard image={git} alt="Node.js">
            Git
          </SkillCard>
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ image, alt, children }) => {
  return (
    <motion.div
      className="flex items-center bg-white dark:bg-gray-800 dark:text-white  p-2 lg:p-4  rounded-lg shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={image} alt={alt} className="lg:w-10 md:w-10 w-8  lg:mr-3 md:mr-3 mr-2" />
      <span className="lg:text-sm text-xs font-semibold">{children}</span>
    </motion.div>
  );
};

export default Skills;
