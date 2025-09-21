// src/components/CreatePoll.tsx
'use client';

import AdminLayout from '@/components/AdminLayout'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import FormInput from './input';
// import Button from './button';
// import UserLayout from './userLayout';
import { useRouter } from 'next/navigation';
// import { createPoll, addPollOptions } from '@/api/pollService';
import FormInput from '@/components/input';
import Button from '@/components/button';

export default function CreatePoll() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      options: ['', ''], // Start with two empty option fields
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Poll title is required'),
      description: Yup.string().required('Description is required'),
      options: Yup.array()
        .of(Yup.string().required('Option cannot be empty'))
        .min(2, 'At least two options are required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessage('');
    //   try {
    //     // Step 1: Create the poll
    //     const pollResponse = await createPoll({
    //       title: values.title,
    //       description: values.description,
    //     });

    //     // Get the new poll's ID from the response
    //     const newPollId = pollResponse.id;

    //     // Step 2: Format and add the options using the new poll ID
    //     const optionsPayload = values.options.map((optionText) => ({ text: optionText }));
    //     await addPollOptions(newPollId, optionsPayload);

    //     // Redirect to the dashboard or the new poll page on success
    //     router.push('/dashboard');
    //   } catch (error) {
    //     setErrorMessage('Failed to create poll. Please try again.');
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //   }
    },
  });

  const handleAddOption = () => {
    formik.setFieldValue('options', [...formik.values.options, '']);
  };

  return (
    <AdminLayout>
      <div className='flex justify-center items-center w-full min-h- p-4'>
        <div className='bg-white rounded-lg shadow-xl p-8 max-w-lg w-full'>
          <h1 className='text-3xl font-bold text-center mb-6 text-[#001124]'>Create a New Poll</h1>
          {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              label='Poll Title'
              name='title'
              id='title'
              placeholder='E.g., What is your favorite color?'
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && formik.errors.title ? formik.errors.title : ''}
            />
            <FormInput
              label='Description'
              name='description'
              id='description'
              placeholder='Give a brief description of the poll.'
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && formik.errors.description ? formik.errors.description : ''}
            />

            <h2 className='text-xl font-semibold mt-6 mb-4'>Poll Options</h2>
            {formik.values.options.map((option, index) => (
              <div key={index} className='mb-4'>
                <FormInput
                  label={`Option ${index + 1}`}
                  name={`options[${index}]`}
                  id={`options[${index}]`}
                  placeholder='E.g., Blue'
                  value={option}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.options?.[index] && formik.errors.options?.[index] ? formik.errors.options[index] : ''}
                />
              </div>
            ))}
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={handleAddOption}
                className='text-blue-600 font-semibold hover:underline'
              >
                + Add Another Option
              </button>
            </div>

            <div className='mt-8'>
              <Button  text={loading ? 'Creating...' : 'Create Poll'} disabled={loading} />
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}