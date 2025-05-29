import React from "react";

export default function Title({ text1, text2 }) {
  return (
    <div className="inline-flex gap-2 items-center">
      <p className="text-gray-600">
        {text1}
        <span className="text-gray-700 font-medium ">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-800"></p>
    </div>
  );
}
