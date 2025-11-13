"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { getResult } from "@/pages/api/polls"

// const chartData = [
//   { month: "January", desktop: 186,  },
//   { month: "February", desktop: 305,  },
//   { month: "March", desktop: 237,  },
//   { month: "April", desktop: 73,  },
//   { month: "May", desktop: 209,  },
//   { month: "June", desktop: 214,  },
//   {
//   "month": "Blue",
//   "votes": 1
// }
// ]



const chartConfig = {
  desktop: {
    label: "Votes",
    color: "#2563eb",
  },
} satisfies ChartConfig

//@typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartBar(pollId: any) {
const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const id = pollId.pollId

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getResult(id);
        console.log(response,"chat response")
        
        // Transform the API response data for the chart
        //@typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedData = response.data.options.map((option: any) => ({
          name: option.text,
          votes: option.votes_count,
        }));
  
        
        setChartData(transformedData);
      } catch (err) {
        console.error("Failed to get poll results:", err);
        setError("Failed to load poll results.");
      } finally {
        setLoading(false);
      }
    };

    if (pollId) {
      fetchResults();
    }
  }, [pollId,chartData,id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] w-full">
        <p>Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] w-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-1/5 z-0">
      <BarChart accessibilityLayer data={chartData}>
         <CartesianGrid vertical={false} />
         <XAxis
      dataKey="name"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 100)}
    />
     <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="votes" fill="var(--color-secondary)" radius={4} className="w-4/5 gap-3" />
      </BarChart>
    </ChartContainer>
  )
}
