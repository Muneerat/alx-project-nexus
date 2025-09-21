import Navbar from "@/components/navbar";
import PollCard from "@/components/pollCard";
import UserLayout from "@/components/userLayout";
import { pollsDate } from "@/data";
import React from "react";

export default function Poll() {
  return (
    <UserLayout>
      <div className="pt-22 bg-white mx-10">
        <h1 className="text-[#001124] text-4xl text-center py-4">
          Active Polls
        </h1>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {pollsDate.map((pollDate, index) => (
            <PollCard key={index} {...pollDate} />
          ))}
        </div>
      </div>
    </UserLayout>
  );
}
