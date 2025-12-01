"use client";

import React, { useState } from "react";
import { PollsProps } from "@/interface";
import { toast, Toaster } from "sonner";
import { useVoteOnPollMutation } from "@/services/pollsService";
import { Spinner } from "./ui/spinner";

export default function PollCardDetail({
  id,
  title,
  description,
  created_by,
  expires_at,
  options,
  total_votes
}: PollsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [voting, setVoting] = useState(false);
  const [voteOnPoll, { isLoading }] = useVoteOnPollMutation();

  const handleSubmitVote = async () => {
    if (!selectedOption) {
      toast.error("Please select an option to vote.");
      return;
    }
    const pollId = id as string;
    const option_id = selectedOption as string;

    try {
      await voteOnPoll({ pollId, option_id }).unwrap();
      toast.success("Vote submitted successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error.data.poll || "Failed to submit vote. Please try again."
      );
    }
  };
  if (isLoading)  <Spinner />

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-main border border-main  hover:shadow-2xl transition-all duration-300 ">
      <Toaster position="top-right" richColors />
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <p>Created by: {created_by}</p>
        <p>Expires: {new Date(expires_at).toLocaleDateString()}</p>
      </div>

      <div className="space-y-3 mb-6">
        {options?.map((option) => (
          <label
            key={option.id}
            htmlFor={`option-${option.id}`}
            className={`
              w-full flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer
              transition-colors
              border ${
                selectedOption === option.id
                  ? "border-[#015FC7] bg-blue-50"
                  : "border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            <input
              type="radio"
              id={`option-${option.id}`}
              name=""
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => setSelectedOption(option.id)}
              className="form-radio text-[#015FC7] h-4 w-4"
            />
            {option.text}
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmitVote}
        disabled={!selectedOption || voting}
        className={`w-full text-white py-3 rounded-lg font-semibold transition-colors
                    ${
                      !selectedOption || voting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-main hover:bg-blue-9"
                    }
                `}
      >
        {voting ? "Submitting..." : "Submit Vote"}
      </button>

      <div className="flex justify-end py-5 font-bold justify-items-end-safe text-[#015FC7] ">
        <p>Total vote: {total_votes}</p>
      </div>
    </div>
  );
}
