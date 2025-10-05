import AdminLayout from "@/components/AdminLayout";
import PollCard from "@/components/pollCard";
import React, { useEffect, useState } from "react";
import { viewPolls } from "../api/polls";

type PollType = {
  id: string;
  title: string;
  description: string;
  created_by: string;
  expires_at: string;
  //@typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[]; 
}
export default  function Poll() {
const [pollsData, setPollsData] = useState<PollType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await viewPolls();
        setPollsData(response.data.results);
      } catch {
        setError("Failed to load polls.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []); 

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-center mt-10">Loading polls...</p>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <p className="text-center text-red-500 mt-10">{error}</p>
      </AdminLayout>
    );
  }



  return (
    <AdminLayout>
      <div className="pt-22 bg-white mx-10">
        <h1 className="text-[#001124] text-5xl text-center py-4">
          Active Polls
        </h1>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {pollsData.map((pollDate, index) => (
            <PollCard key={index} id={pollDate.id} title={pollDate.title} description={pollDate.description	} 
            created_by={pollDate.created_by} expires_at={pollDate.expires_at} options={pollDate.options} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
