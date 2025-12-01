import { ChartBar } from "@/components/chart";
import PollCardDetail from "@/components/pollCardDetail";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import UserLayout from "@/components/layout";
import { useGetActivePollQuery } from "@/services/pollsService";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function SinglePoll() {
  const params = useParams();
  const pollId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const {data: getActivePoll, isLoading,isError} = useGetActivePollQuery({pollId});
  type PollType = {
    id: string;
    title: string;
    description: string;
    created_by: string;
    expires_at: string;
    total_votes: string;
    //@typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any[];
  };

  // useEffect(() => {
  //   if (pollId) {
  //     const fetchSinglePoll = async () => {
  //       try {
  //         const response = await viewPoll(pollId as string);
  //         setSinglePoll(response.data);
  //       } catch (err) {
  //         console.error("Failed to fetch poll:", err);
  //         setError("Failed to load poll. It might not exist.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchSinglePoll();
  //   }
  // }, [pollId]);

  if (isLoading) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-[50vh]">
    <Spinner />
        </div>
      </UserLayout>
    );
  }

  if (isError) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-xl text-red-500">Try again</p>
        </div>
      </UserLayout>
    );
  }

  // If poll is not found after loading, show a specific message
    if (getActivePoll  === undefined) {
      return (
        <UserLayout>
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-xl text-gray-500">Poll not found.</p>
          </div>
        </UserLayout>
      );
    }

  return (
    <UserLayout>
      <div className=" p-10 pt-24  bg-gradient-to-br from-[#09111f] via-background to-[#09111f]">
        <div>
          <Link href="/polls">
            <Button variant="neon" className="mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Polls
            </Button>
          </Link>
        </div>
        <div className="max-w-5xl flex gap-10 justify-between ">
          <PollCardDetail {...(getActivePoll as unknown as PollType)} />
          <ChartBar pollId={pollId} />
        </div>
      </div>
    </UserLayout>
  );
}
