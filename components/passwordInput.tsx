import { FormInputPassProps } from "@/interface";
import { Eye, EyeClosed, EyeIcon, EyeOff } from "lucide-react";
import React, { useState } from "react";

export default function FormInputPassword({
  placeholder,
  label,
  value,
  error,

  ...props
}: FormInputPassProps) {
  const [type, setType] = useState<"password" | "text">("password");
  return (
    <div className="flex flex-col md:w-4/6 w-5/6 mx-auto my-2 ">
      <label className="text-base font-normal text-main">{label}</label>
      <div className="relative border-main border-1 rounded-lg w-full focus:border-2 focus:outline-main">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          className="bg-white border-0 text-main px-1.5 py-2 rounded-lg w-full my-1 border-main  focus-visible:outline-0"
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-  inset-y-3 text-main"
          onClick={() => setType(type == "password" ? "text" : "password")}
        >
          {type === "password" ? <EyeIcon className="h-5 w-5"/>  : <EyeOff className="h-5 w-5" /> }
        </button>
      </div>

      <span className="text-red-600 text-xs">{error}</span>
    </div>
  );
}
