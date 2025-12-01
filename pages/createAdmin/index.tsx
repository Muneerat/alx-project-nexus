// src/components/CreatePoll.tsx
"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "@/components/input";
import Button from "@/components/button";
import { toast } from "sonner";
import Layout from "@/components/layout";
import {
  useCreateUserMutation,
} from "@/services/pollsService";
import FormInputPassword from "@/components/passwordInput";
import { useRouter } from "next/navigation";

export default function CreateAdmin() {
  const [createAdmin, { isLoading }] = useCreateUserMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      surname: "",
      password: "",
      email: "",
      confirm_password: "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("Firstname is required"),
      surname: Yup.string().required("Lastname is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter a valid email address"),
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
      await createAdmin({
        first_name: values.first_name,
        surname: values.surname,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
      })
        .unwrap()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          console.log(response, "r");
          toast("Admin created successfully");
          router.push("/members");

        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
            console.log(err.data.detail, "error")
          toast.error(
            err.data?.email || err.data?.detail || "Unable to create user. Please try again"
          );
          setError("Registration failed. Please try again.");
        });
    },
  });

  return (
    <Layout>
      <div className="flex justify-center items-center w-full min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
          <h1 className="text-4xl font-bold text-center mb-6 text-[#001124]">
            Create Admin
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              label="Firstname"
              name="first_name"
              id="first_name"
              placeholder="Enter your firstame"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.first_name && formik.errors.first_name
                  ? formik.errors.first_name
                  : ""
              }
            />
            <FormInput
              label="Surname"
              name="surname"
              id="surname"
              placeholder="Enter your surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.surname && formik.errors.surname
                  ? formik.errors.surname
                  : ""
              }
            />
            <FormInput
              label="Email"
              placeholder="Enter your email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
            <FormInputPassword
              label="confirm Password"
              placeholder="Confirm your password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              name="confirm_password"
              id="confirm_password"
              error={
                formik.touched.confirm_password &&
                formik.errors.confirm_password
                  ? formik.errors.confirm_password
                  : ""
              }
            />

            <div className="mt-8">
              <Button
                text={isLoading ? "Creating..." : "Create Admin"}
                disabled={isLoading || !formik.isValid}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
