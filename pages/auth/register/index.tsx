import AuthLayouts from "@/components/authLayouts";
import Button from "@/components/button";
import FormInput from "@/components/input";
import FormInputPassword from "@/components/passwordInput";
import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createUser } from "@/pages/api/auth";
import { toast } from "sonner"
import { useRegisterUserMutation } from "@/services";

export default  function Register() {
  const [registerUser, {isLoading,}] = useRegisterUserMutation();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("")
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      first_name: "",
      surname: "",
      password: "",
      email: "",
      confirm_email: "",
      confirm_password: "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("Firstname is required"),
      surname: Yup.string().required("Lastname is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter a valid email address"),
      confirm_email: Yup.string()
        .oneOf([Yup.ref("email")], "Email must match")
        .required("Enter a valid email address")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        //check for white space in password using regex
        .matches(/^\S*$/, "Password must not contain spaces"),
        
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password must match")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      await registerUser({
        first_name: values.first_name ,
        surname: values.surname,
        email: values.email,
        confirm_email: values.confirm_email,
        password: values.password,
        confirm_password: values.confirm_password

      })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
      .unwrap()
      .then((response: any) => {
        console.log(response, "response")
        toast("Registration successful! You can now log in.");
        router.push("/");
      })
      .catch((err: any) => {
        console.log(err.data, "error")
        toast.error(err.data?.email || "Invalid email or password. Please try again");
        setError("Registration failed. Please try again.");
      })

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
              id="first_name"
              placeholder="Enter your first name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              name="first_name"
              error={formik.errors.first_name && formik.touched.first_name ? formik.errors.first_name : ""}
            />
            <FormInput
              label="Lastname"
              placeholder="Enter your last name"
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
              value={formik.values.confirm_email}
              onChange={formik.handleChange}
              name="confirm_email"
              id="confirm_email"
              error={
                formik.touched.confirm_email && formik.errors.confirm_email
                  ? formik.errors.confirm_email
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
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              name="confirm_password"
              id="confirm_password"
              error={
                formik.touched.confirm_password && formik.errors.confirm_password
                  ? formik.errors.confirm_password
                  : ""
              }
            />
            <p className="text-[#001124] md:w-4/6 w-5/6 mx-auto">
              Already have an account?{" "}
              <Link href="/">
                <span className="text-[#499FFE]">Login now</span>
              </Link>
            </p>
            <Button text="Register" 

            disabled={isLoading}/>
          </form>
        </div>
      </div>
    </AuthLayouts>
  );
}
