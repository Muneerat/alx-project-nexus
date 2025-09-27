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
      <label className="text-base font-normal text-[#001124]">{label}</label>
      <input
        type="password"
        placeholder={placeholder}
        value={value}
        className="bg-white text-[#001124] px-1.5 py-3 rounded-lg w-full my-1 border-[#001124] border-1 focus:border-2 focus:outline-[#001124] focus-visible:outline-0"
        {...props}
      />
       <span className="text-red-600 text-xs">{error}</span>
    </div>
  );
}
