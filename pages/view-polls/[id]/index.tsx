import PollCard from "@/components/pollCard";
import Layout from "@/components/layout";
import { pollsDate } from "@/data";
import { useParams } from "next/navigation";
import React from "react";

export default function SinglePoll() {
 const params = useParams();
 const pollId = params?.id;

 const singlePoll = pollsDate.find((poll) => Number(poll.id) === Number(pollId));

  if (!singlePoll) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-xl text-gray-500">Poll not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
     
        <PollCard  {...singlePoll} />
   
    </Layout>
  );
}
