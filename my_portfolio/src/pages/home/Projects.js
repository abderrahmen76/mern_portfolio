import React, { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image

  // Fetch the portfolioData from Redux store
  const { portfolioData } = useSelector((state) => state.root);

  // Ensure portfolioData exists and access the correct project key (singular)
  const projects = portfolioData?.project || [];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setSelectedImage(null); // Reset the selected image
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set the selected image for zoom
  };

  return (
    <div
      id="projects"
      className="bg-primary min-h-screen flex items-center justify-center px-8 text-center py-10"
    >
      <div className="w-full max-w-screen-xl">
        <SectionTitle title="Projects" />
        {projects.length === 0 ? (
          <p>No projects available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {projects.map((project) => (
              <div
                key={project._id?.$oid || project._id}
                className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <h3 className="text-xl font-bold text-yellow-500 mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-yellow-500 text-black text-sm font-semibold py-1 px-3 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 font-semibold hover:underline"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleCloseModal} // Close when clicking on the background
        >
          <div
            className="bg-white p-6 rounded-lg w-3/4 md:w-2/3 lg:w-1/2"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {selectedProject.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {selectedProject.media.map((item, index) => {
                const isVideo = item.endsWith(".mp4");
                return isVideo ? (
                  <video
                    key={index}
                    controls
                    className="w-full sm:w-1/3 lg:w-1/4 h-auto rounded-lg shadow-lg"
                  >
                    <source src={item} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    key={index}
                    src={item}
                    alt={`${selectedProject.title} screenshot ${index + 1}`}
                    className="w-full sm:w-1/3 lg:w-1/4 h-auto rounded-lg shadow-lg cursor-pointer"
                    onClick={() => handleImageClick(item)} // Click to enlarge image
                  />
                );
              })}
            </div>

            {/* Enlarged Image Modal */}
            {selectedImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                onClick={handleCloseModal} // Close when clicking on the background
              >
                <div
                  className="bg-white p-6 rounded-lg max-w-4xl max-h-full flex justify-center"
                  onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
                >
                  <img
                    src={selectedImage}
                    alt="Enlarged Image"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            )}

            <button
              className="mt-4 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-400"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
