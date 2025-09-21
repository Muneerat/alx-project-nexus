'use client';

import React, { useState } from 'react';
import { PollsProps } from '@/interface';
import Link from 'next/link';

export default function PollCard({
    id,
  title,
  description,
  created_by,
  expires_at,
  options,
}: PollsProps) {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  console.log(selectedOption,"f")

  return (
    <div className='bg-white rounded-lg shadow-md p-6 text-[#001124] border border-[#001124]'>
      <h1 className='text-2xl font-bold mb-2'>{title}</h1>
      <p className='text-gray-600 mb-4'>{description}</p>

      <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
        <p>Created by: {created_by}</p>
        <p>Expires: {expires_at}</p>
      </div>

      <div className='space-y-3 mb-6'>
        {options.map((option) => (
          <label
            key={option.id}
            htmlFor={`option-${option.id}`}
            className={`
              w-full flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer
              transition-colors
              border ${selectedOption === option.id ? 'border-[#015FC7] bg-blue-50' : 'border-gray-300 hover:bg-gray-100'}
            `}
          >
            <input
              type='radio'
              id={`option-${option.id}`}
              name=''
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => setSelectedOption(option.id)}
              className='form-radio text-[#015FC7] h-4 w-4'
            />
            {option.text}
          </label>
        ))}
      </div>

      <button
        onClick={() => console.log('Selected:', selectedOption)}
        disabled={!selectedOption}
        className={`w-full text-white py-3 rounded-lg font-semibold transition-colors
          ${!selectedOption ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#001124] hover:bg-blue-9'}
        `}
      >
        Submit Vote
      </button>
      <div className='flex justify-end justify-items-end-safe text-right '>
          <Link
          href={`poll/${id}`}
          className='  w-fit text-right text-[#015FC7] py-2 rounded-lg font-semibold transition-colors hover:text-[#001124]'
        >
          View Results
        </Link>
      </div>
     
    </div>
  );
}