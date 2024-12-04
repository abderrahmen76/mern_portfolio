import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";

function About() {
  const { portfolioData } = useSelector((state) => state.root);

  // Access the first item in the `about` array safely
  const aboutData = portfolioData.about && portfolioData.about[0];

  // Safely extract values
  const aboutDesc = aboutData?.aboutDesc || "";
  const yellowHighlights = aboutData?.yellowHilights || [];
  const boldHighlights = aboutData?.boldHilights || [];

  // Function to wrap highlight matches in spans
  const highlightText = (text, yellowHighlights, boldHighlights) => {
    // Combine all highlights and escape special characters for regex
    const allHighlights = [
      ...yellowHighlights.map((word) => word.trim()),
      ...boldHighlights.map((word) => word.trim()),
    ].join("|");

    // Create a regex to match words in highlights
    const regex = new RegExp(`\\b(${allHighlights})\\b`, "gi");

    // Split and map over matches
    return text.split(regex).map((word, index) => {
      if (yellowHighlights.includes(word)) {
        return (
          <span key={index} className="text-secondary">
            {word}
          </span>
        );
      }
      if (boldHighlights.includes(word)) {
        return (
          <span key={index} className="font-bold">
            {word}
          </span>
        );
      }
      return word; // Default word
    });
  };

  return (
    <div
      id="about"
      className="bg-primary flex items-center justify-center h-[80vh] text-center px-6 text-4xl"
    >
      <div className="max-w-4xl">
        <SectionTitle title="About" />
        <p className="text-white text-lg leading-relaxed">
          {highlightText(aboutDesc, yellowHighlights, boldHighlights)}
        </p>
      </div>
    </div>
  );
}

export default About;
