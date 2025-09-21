import AuthLayouts from "@/components/authLayouts";
import Button from "@/components/button";
import FormInput from "@/components/input";
import FormInputPassword from "@/components/passwordInput";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import * as Yup from "yup";

export default function Login() {
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
        .min(8, "Password must be at least 8 characters long"),
    }),
    onSubmit: (values) => {
      console.log(values, "");
      router.push("/poll");
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
          <Button text="Login" />
          </form>
        </div>
      </div>
    </AuthLayouts>
  );
}
