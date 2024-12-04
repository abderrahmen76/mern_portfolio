import React from "react";

function SectionTitle({ title }) {
  return (
    <div className="flex gap-10 items-center py-10">
      <h1 className="text-3xl text-red-700 ">{title}</h1>
      <div className="w-60 h-[1px] bg-red-700"></div>
    </div>
  );
}
export default SectionTitle;
