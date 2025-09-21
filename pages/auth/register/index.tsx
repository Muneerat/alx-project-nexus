import AuthLayouts from "@/components/authLayouts";
import Button from "@/components/button";
import FormInput from "@/components/input";
import FormInputPassword from "@/components/passwordInput";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter()
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
      firstname: Yup.string().required("Firstname is required"),
      surname: Yup.string().required("Lastname is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter a valid email address"),
      confirmEmail: Yup.string()
        .oneOf([Yup.ref("email")], "Email must match")
        .required("Enter a valid email address")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password must match")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values, "");
      router.push("/poll")

    },
  });
  return (
    <AuthLayouts>
      <div className="w-full my-auto ">
        <div className="bg-white md:w-full w-full mx-auto rounded-xl md:px-3 flex flex-col justify-center py-6 h-screen">
          <h1 className="text-4xl text-[#001124] text-center font-bold ">
            Registration form
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              label="Firstname"
              id="firstname"
              placeholder="Enter your firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              name="firstname"
              error={formik.errors.firstname}
            />
            <FormInput
              label="Lastname"
              placeholder="Enter your lastname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              name="surname"
              id="surname"
              error={
                formik.touched.surname && formik.errors.surname
                  ? formik.errors.surname
                  : ""
              }
            />
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
            <FormInput
              label="Confirm Email"
              placeholder="Confirm your email"
              value={formik.values.confirmEmail}
              onChange={formik.handleChange}
              name="confirmEmail"
              id="confirmEmail"
              error={
                formik.touched.confirmEmail && formik.errors.confirmEmail
                  ? formik.errors.confirmEmail
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
            <FormInputPassword
              label="confirm Password"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              name="confirmPassword"
              id="confirmPassword"
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ""
              }
            />
            <p className="text-[#001124] md:w-4/6 w-5/6 mx-auto">
              Already have an account?{" "}
              <Link href="/">
                <span className="text-[#499FFE]">Login now</span>
              </Link>
            </p>
            <Button text="Register" />
          </form>
        </div>
      </div>
    </AuthLayouts>
  );
}
