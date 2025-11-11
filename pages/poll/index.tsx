
import PollCard from "@/components/pollCard";
import React, { useEffect, useState } from "react";
import { viewPolls } from "../api/polls";
import UserLayout from "@/components/userLayout";
import { toast } from "sonner";
import { Vote } from "lucide-react";
import { Card } from "@/components/ui/card";


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
        toast.success("Polls loaded successfully!");
        setPollsData(response.data.results);
      } catch  {
        toast.error("Failed to load polls.");
        setError("Failed to load polls.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []); 

  if (loading) {
    return (
      <UserLayout>
        <p className="text-center text-white mt-10">Loading polls...</p>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <p className="text-center text-red-500 mt-10">{error}</p>
      </UserLayout>
    );
  }



  return (
    <UserLayout>
      <div className="pt-22 bg-white px-10 min-h-screen bg-gradient-to-br from-[#09111f] via-background to-[#09111f]">
         <h1 className="text-4xl font-bold neon-text my-2">Active Polls</h1>
          <p className="text-muted-foreground mb-10">
            Cast your vote and see the results
          </p>
         {pollsData.length == 0 && (
          <Card className="glass-effect border-border/50 p-12 text-center">
            <Vote className="w-16 h-16 mx-auto mb-4 text-secondary" />
            <h3 className="text-xl font-semibold  text-white">No Active Polls</h3>
            <p className="text-muted-foreground">
              There are no polls available at the moment. Check back later!
            </p>
          </Card>
        )}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-4">
          {pollsData.map((pollDate, index) => (
            <PollCard key={index} id={pollDate.id} title={pollDate.title} description={pollDate.description	} 
            created_by={pollDate.created_by} expires_at={pollDate.expires_at} options={pollDate.options} />
          ))}

        </div>
      </div>
    </UserLayout>
  );
}
