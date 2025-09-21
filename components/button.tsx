import React from "react";

export interface ButtonProps {
  text: string;
  value?: string;
}
export default function Button({ text }: ButtonProps) {
  return (
    <button
      type="submit"
      className="bg-[#001124] text-white md:w-4/6 w-5/6 flex justify-center mx-auto text-center py-3 px-1.5 my-6 rounded-lg cursor-pointer"
    >
      {text}
    </button>
  );
}
