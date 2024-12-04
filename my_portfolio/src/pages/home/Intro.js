import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSelector } from "react-redux";

function Intro() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const intro = portfolioData.intro && portfolioData.intro[0];

  // Safely extract values
  const lottieUrl = intro?.lottieUrl || "";
  const fullName = intro?.fullName || "";
  const occupation = intro?.occupation || "";
  const description = intro?.description || "";
  const cvButton = intro?.cvButton || "";

  useEffect(() => {
    console.log("portfolioData", portfolioData);
    console.log("intro", intro);
  }, [portfolioData, intro]);

  const onButtonClick = () => {
    const pdfUrl = cvButton;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = "Abderrahmen_zouari_cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-primary flex flex-col md:flex-row items-center justify-center h-[90vh] text-center md:text-left px-6">
      <div className="max-w-2xl">
        <p className="text-2xl font-bold text-white mb-4">Hello, I'm</p>
        <h1 className="text-6xl font-extrabold text-red-700 mb-4">
          {fullName || ""}
        </h1>
        <h2 className="text-4xl font-bold text-red-600 mb-6">
          {occupation || ""}
        </h2>
        <p className="text-xl text-white leading-relaxed mb-6">
          {description || ""}
        </p>
        <button
          className="px-12 py-3 text-xl font-bold text-white border-2 border-secondary rounded bg-secondary hover:bg-transparent hover:text-secondary transition duration-300"
          onClick={onButtonClick}
        >
          CV
        </button>
      </div>
      <div className="mt-8 md:mt-0 md:ml-12">
        <DotLottieReact
          src={lottieUrl || ""}
          loop
          autoplay
          className="w-[400px] md:w-[500px]"
        />
      </div>
    </div>
  );
}

export default Intro;
