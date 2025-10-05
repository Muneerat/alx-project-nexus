import AuthLayouts from "@/components/authLayouts";
import Button from "@/components/button";
import FormInput from "@/components/input";
import FormInputPassword from "@/components/passwordInput";
import { adminLogin } from "@/pages/api/auth";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "sonner"

export default function Login() {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      surname: "",
      password: "",
      email: "",
      confirmEmail: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter a valid email address"),

      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
             .matches(/^\S*$/, "Password must not contain spaces"),
    }),

    onSubmit: async (values) => {
           setLoading(true);
         setError("");
       try{
           const response = await adminLogin(values)
           console.log(response.data.access,"response")
         // Save tokens on successful login
           localStorage.setItem('access_token', response.data.access);
           localStorage.setItem('refresh_token', response.data.refresh);
            toast.success("Login successful!")
    
           router.push("/poll");
         } 
         //@typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
         catch (err: string | any) {
          toast.error(err.response.data.detail || "Invalid email or password. Please try again.")
           setError("Invalid email or password. Please try again.");
         } finally {
           setLoading(false);
         }
        
       },
  });
  return (
    <AuthLayouts>
      <div className="w-full my-auto ">
        <div className="bg-white  w-full mx-auto h-screen rounded-xl md:px-3 flex flex-col justify-center py-16 ">
          <h1 className="text-4xl text-[#001124] text-center font-bold ">
            Login
          </h1>
          <form onSubmit={formik.handleSubmit}>
          <FormInput
            label="Email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            id="email"
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />

          <FormInputPassword
            label="Password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            id="password"
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          />

          <p className="text-[#001124] md:w-4/6 w-5/6 mx-auto">
            Not a user?{" "}
            <Link href="/auth/register">
              <span className="text-[#499FFE]">Register now</span>
            </Link>
          </p>
          <Button text="Login"   disabled={loading} />
          </form>
        </div>
      </div>
    </AuthLayouts>
  );
}
