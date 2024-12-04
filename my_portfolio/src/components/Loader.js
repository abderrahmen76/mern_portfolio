import React from "react";

function Loader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center fixed inset-0 bg-primary z-[100]">
      <h1 className="flex gap-5 text-4xl text-white font-semibold">
        <span className="a1">A</span>
        <span className="b">B</span>
        <span className="d">D</span>
        <span className="r1">R</span>
        <span className="r2">R</span>
        <span className="a2">A</span>
        <span className="h">H</span>
        <span className="m">M</span>
        <span className="e">E</span>
        <span className="n">N</span>
        <span className="dot">.</span>
        <span className="z">Z</span>
      </h1>
    </div>
  );
}

export default Loader;
