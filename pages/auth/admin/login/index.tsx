import AuthLayouts from "@/components/authLayouts";
import Button from "@/components/button";
import FormInput from "@/components/input";
import FormInputPassword from "@/components/passwordInput";
import { adminLogin } from "@/pages/api/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

export default function Login() {
  //ts-ignore
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: ""
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter a valid email address"),

      password: Yup.string()
        .required("Password is required")
        .min(3, "Password must be at least 8 characters long"),
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
        // Redirect
        router.push("/dashboard");
      } catch (err: any) {
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

       
          <Button text="Login" disabled={loading || !formik.isValid} />
          </form>
        </div>
      </div>
    </AuthLayouts>
  );
}
