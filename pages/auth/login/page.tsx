import AuthLayouts from "@/components/authLayouts";
import Button from "@/components/button";
import FormInput from "@/components/input";
import FormInputPassword from "@/components/passwordInput";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import { toast } from "sonner";
import { useGetProfileQuery, useLoginUserMutation } from "@/services";

export default function Login() {
  const [isLoginUser, { isLoading }] = useLoginUserMutation();
  const { data: getProfile, refetch: refetchProfile } = useGetProfileQuery();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter a valid em ,ail address"),

      password: Yup.string()
        .required("Password is required")
        .min(2, "Password must be at least 8 characters long")
        .matches(/^\S*$/, "Password must not contain spaces"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await isLoginUser({
          email: values.email,
          password: values.password,
        }).unwrap();
      const access = response.access;
      const refresh = response.refresh;

      if (typeof window !== "undefined") {
        if (access || refresh) {
          if (access !== undefined && refresh !== undefined ) {
            sessionStorage.setItem("token", String(access));
             sessionStorage.setItem("refresh_token", String(refresh));
          }
    
        }
      }
        // refetchProfile?.();
         await refetchProfile();
        
        toast.success("Login successful!");
        //check if role is voter or admin redirect to respective dashboard
        if (getProfile?.role === "voter") {
          toast.success("Login successful!");
          router.push("/polls");
          return;
        } else if (getProfile?.role === "admin") {
          toast.success("Login successful!");
          router.push("/dashboard");
          return;
        }
      } catch (err: any) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // .then((response: any) => {
        //   const access = response.access
        //   const refresh = response.refresh

        //   if (typeof window !== "undefined") {
        //     if (access)
        //       sessionStorage.setItem("token", access);
        //       sessionStorage.setItem("refresh_token", refresh);

        //   }

        //   refetchProfile?.();

        //   //check if role is voter or admin redirect to respective dashboard
        //   if (getProfile?.role === "voter") {
        //   toast.success("Login successful!");
        //   router.push("/polls");
        //     return;
        //   }else if (getProfile?.role === "admin") {
        //     toast.success("Login successful!");
        //      router.push("/dashboard");
        //     return;
        //   }

        // })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error(
          err.data?.email ||
            err.data?.detail ||
            "Invalid email or password. Please try again."
        );
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
            <Button text="Login" disabled={isLoading} />
          </form>
        </div>
      </div>
    </AuthLayouts>
  );
}
