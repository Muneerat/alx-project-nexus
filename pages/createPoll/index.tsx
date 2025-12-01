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
  useCreatePollMutation,
} from "@/services/pollsService";

export default function CreatePoll() {
  const [createPoll, { isLoading: isCreatingPoll }] = useCreatePollMutation();
  // const [createPollOptions, { isLoading: isCreatingPollOption }] =
  //   useCreatePollOptionsMutation();
  const isSubmitting = isCreatingPoll ;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [errorMessage, setErrorMessage] = useState('');


  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      description: "",
      expires_at: "",
      options: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Poll title is required"),
      description: Yup.string().required("Description is required"),
      expires_at: Yup.date()
        .required("Expiration date is required")
        .min(new Date(), "Expiration date must be in the future"),
      options: Yup.array()
        .of(Yup.string().required("Option cannot be empty"))
        .min(2, "At least two options are required"),
    }),
    onSubmit: async (values) => {
      const pollDate = {
        title: values.title,
        description: values.description,
        expires_at: values.expires_at,
         options: values.options
           // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter((optionText: any) => optionText.trim() !== "")
        .map((optionText: any) => ({ text: optionText.trim() }))
      };
      // const optionPayload = values.options
      //   .filter((optionText: any) => optionText.trim() !== "")
      //   .map((optionText: any) => ({ text: optionText.trim() }));

      try {
        console.log("got here")
        // call the mutation and await the unwrapped result so we get the created poll object
        const pollResponse = await createPoll(pollDate).unwrap();
        
        console.log(pollResponse, "id");
        // const pollId = pollResponse;
        // console.log(pollId, "pollId");
  // const pollId =
  //         (pollResponse && (pollResponse as any).data && (pollResponse as any).data.id) ||
  //         (pollResponse && (pollResponse as any).id) ||
  //         (typeof pollResponse === "string" || typeof pollResponse === "number" ? pollResponse : undefined);

        // if (!pollId) {
        //   throw new Error("Poll ID missing");
        // }

        // console.log("New Poll ID:", pollId);
        // await createPollOptions({ pollId, option: optionPayload }).unwrap();
        toast.success("Poll created successfully!");
        formik.resetForm();
      } catch (error: any) {
        const apiError =
          error?.data?.detail ||
          error?.data?.title?.[0] ||
          error?.message ||
          "Failed to create poll. Please try again.";
        console.error("Poll Creation Error:", error);
        toast.error(apiError);
        // toast.error("Failed to create poll. Please check your form and try again.");
      }
         

      // try {
      //   // Step 1: Create the poll without options 
      //   const pollResponse = await createPoll({
      //     id: values.id + 1,
      //     title: values.title,
      //     description: values.description,
      //     expires_at: values.expires_at,
      //     options: values.options.map((optionText) => ({ text: optionText })),
      //   });

      //   // Extract the new poll ID from the response
      //   const newPollId = pollResponse.data.id;

      //   console.log("New Poll ID:", newPollId);

      //   // Format and add the options using the new poll ID
      //   const optionsPayload = values.options.map((optionText) => ({
      //     text: optionText,
      //   }));
      //   toast.success("Poll created successfully!");
      //   await addPollOptions(newPollId, optionsPayload);
      // } catch (error) {
      //   //   toast.error("Failed to create poll. Please check your form and try again.")
      //   // setErrorMessage('Failed to create poll. Please check your form and try again.');
      //   console.log(error);
      // } finally {
      //   setLoading(false);
      // }
    },
  });

  const handleAddOption = () => {
    formik.setFieldValue("options", [...formik.values.options, ""]);
  };
  const handleRemoveOption = (index: number) => {
    const newOptions = formik.values.options.filter((_, i) => i !== index);
    formik.setFieldValue('options', newOptions);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#001124]">
            Create a New Poll
          </h1>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              label="Poll Title"
              name="title"
              id="title"
              placeholder="Enter the title of your poll"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.title && formik.errors.title
                  ? formik.errors.title
                  : ""
              }
            />
            <FormInput
              label="Description"
              name="description"
              id="description"
              placeholder="Enter a brief description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : ""
              }
            />
            <FormInput
              label="Expiration Date"
              placeholder="Select expiration date and time"
              name="expires_at"
              id="expires_at"
              type="date"
              value={formik.values.expires_at}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.expires_at && formik.errors.expires_at
                  ? formik.errors.expires_at
                  : ""
              }
            />
            <h2 className="text-xl font-semibold mt-6 mb-4 text-[#001124]">
              Poll Options
            </h2>
            {formik.values.options.length === 0 && (
              <p className="text-[#001124] mb-2">
                Click below to add your first option.
              </p>
            )}
            {formik.values.options.length < 2 && (
              <p className="text-red-500 mb-2">
                At least two options are required
              </p>
            )}
            {formik.values.options.map((option, index) => (
              <div key={index} className='mb-4 flex items-start'>
                <div className='flex-grow'>
              {/* <div key={index} className="mb-4"> */}
                <FormInput
                  label={`Option ${index + 1}`}
                  name={`options[${index}]`}
                  id={`options[${index}]`}
                  placeholder="Enter option text"
                  value={option}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.options?.[index] && formik.errors.options?.[index]
                    // formik.errors.options?.[index]
                    //   ? formik.errors.options[index]
                    //   : ""
                  }
                />
              </div>
              {formik.values.options.length > 2 && (
                    <button
                        type='button'
                        onClick={() => handleRemoveOption(index)}
                        className='mt-8 text-red-500 hover:text-red-700 font-semibold'
                        aria-label={`Remove option ${index + 1}`}
                    >
                        &times;
                    </button>
                )}
                </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddOption}
                className="text-blue-600 font-semibold hover:underline"
              >
                + Add Another Option
              </button>
            </div>
            <div className="mt-8">
              <Button
                text={isSubmitting ? "Creating..." : "Create Poll"}
                disabled={isSubmitting || !formik.isValid}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
