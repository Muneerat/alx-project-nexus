import { FormInputPassProps } from "@/interface";
import React from "react";



export default function FormInputPassword({
  placeholder,
  label,
  value,
  error,
  ...props
}: FormInputPassProps) {
  return (
    <div className="flex flex-col md:w-4/6 w-5/6 mx-auto my-2 ">
      <label className="text-base font-normal text-main">{label}</label>
      <input
        type="password"
        placeholder={placeholder}
        value={value}
        className="bg-white text-main px-1.5 py-3 rounded-lg w-full my-1 border-main border-1 focus:border-2 focus:outline-main focus-visible:outline-0"
        {...props}
      />
       <span className="text-red-600 text-xs">{error}</span>
    </div>
  );
}
