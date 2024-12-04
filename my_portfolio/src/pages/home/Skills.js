import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";

function Skills() {
  const { portfolioData } = useSelector((state) => state.root);

  // Safely access the skills array
  const skills = portfolioData.skills || [];

  return (
    <div
      id="skills"
      className="bg-primary min-h-screen flex items-center justify-center px-8 text-center py-10"
    >
      <div className="w-full max-w-screen-xl">
        <SectionTitle title="Skills" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id?.$oid || skill._id} // Use a unique key from _id
              className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-yellow-500 hover:text-black"
            >
              <img
                src={skill.imageSrc}
                alt={skill.alt}
                className="w-12 h-12 mb-4 transition-transform duration-300 transform group-hover:scale-110"
              />
              <p className="text-base font-semibold text-gray-200 group-hover:text-black">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
