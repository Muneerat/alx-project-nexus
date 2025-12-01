
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetPollResultQuery } from "@/services/pollsService"
import { Spinner } from "./ui/spinner"




const chartConfig = {
  desktop: {
    label: "Votes",
    color: "#2563eb",
  },
} satisfies ChartConfig

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChartBar(pollId: any) {

  const id = pollId.pollId
  const {data: pollResult, isLoading,isError} = useGetPollResultQuery({id})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartData: any[] = (pollResult as any)?.options?.map((option: any) => ({
      name: option.text,
      votes: option.votes_count,
  }));

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] w-full">
       <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px] w-full">
        <p className="text-red-500">Try again</p>
      </div>
    );
  }

  
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-[40%] z-0">
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
