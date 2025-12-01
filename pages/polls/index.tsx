
import PollCard from "@/components/pollCard";
import React from "react";
import UserLayout from "@/components/layout";
import { Vote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetActivePollsQuery } from "@/services/pollsService";
import { PollType } from "@/services/types";




export default  function Poll() {
  const {data,isLoading,isError} =  useGetActivePollsQuery();
  const getActivePolls = data?.results as PollType[] | undefined;

  return (
    <UserLayout>
      <div className="pt-22 bg-white px-10 min-h-screen bg-gradient-to-br from-[#09111f] via-background to-[#09111f]">
         <h1 className="text-4xl font-bold neon-text my-2">Active Polls</h1>
          <p className="text-muted-foreground mb-10">
            Cast your vote and see the results
          </p>
          {isLoading &&  <p className="text-center text-white mt-10">Loading polls...</p>}
           {isError &&  <p className="text-center text-red-500 mt-10">Error try again</p> } 
         {getActivePolls?.length === 0 && (
          <Card className="glass-effect border-border/50 p-12 text-center">
            <Vote className="w-16 h-16 mx-auto mb-4 text-secondary" />
            <h3 className="text-xl font-semibold  text-white">No Active Polls</h3>
            <p className="text-muted-foreground">
              There are no polls available at the moment. Check back later!
            </p>
          </Card>
        )}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-4">
          
          {getActivePolls?.map((getActivePoll: any, index: any) => (
            <PollCard key={index} id={getActivePoll.id} title={getActivePoll.title} description={getActivePoll.description	} 
            created_by={getActivePoll.created_by} expires_at={getActivePoll.expires_at} options={getActivePoll.options} />
          ))}

        </div>
      </div>
    </UserLayout>
  );
}
