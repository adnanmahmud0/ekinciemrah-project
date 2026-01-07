"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Only keep mobile data and rename it to "visitors" for clarity
const chartData = [
  { date: "2024-04-01", visitors: 150 },
  { date: "2024-04-02", visitors: 180 },
  { date: "2024-04-03", visitors: 120 },
  { date: "2024-04-04", visitors: 260 },
  { date: "2024-04-05", visitors: 290 },
  { date: "2024-04-06", visitors: 340 },
  { date: "2024-04-07", visitors: 180 },
  { date: "2024-04-08", visitors: 320 },
  { date: "2024-04-09", visitors: 110 },
  { date: "2024-04-10", visitors: 190 },
  { date: "2024-04-11", visitors: 350 },
  { date: "2024-04-12", visitors: 210 },
  { date: "2024-04-13", visitors: 380 },
  { date: "2024-04-14", visitors: 220 },
  { date: "2024-04-15", visitors: 170 },
  { date: "2024-04-16", visitors: 190 },
  { date: "2024-04-17", visitors: 360 },
  { date: "2024-04-18", visitors: 410 },
  { date: "2024-04-19", visitors: 180 },
  { date: "2024-04-20", visitors: 150 },
  { date: "2024-04-21", visitors: 200 },
  { date: "2024-04-22", visitors: 170 },
  { date: "2024-04-23", visitors: 230 },
  { date: "2024-04-24", visitors: 290 },
  { date: "2024-04-25", visitors: 250 },
  { date: "2024-04-26", visitors: 130 },
  { date: "2024-04-27", visitors: 420 },
  { date: "2024-04-28", visitors: 180 },
  { date: "2024-04-29", visitors: 240 },
  { date: "2024-04-30", visitors: 380 },
  { date: "2024-05-01", visitors: 220 },
  { date: "2024-05-02", visitors: 310 },
  { date: "2024-05-03", visitors: 190 },
  { date: "2024-05-04", visitors: 420 },
  { date: "2024-05-05", visitors: 390 },
  { date: "2024-05-06", visitors: 520 },
  { date: "2024-05-07", visitors: 300 },
  { date: "2024-05-08", visitors: 210 },
  { date: "2024-05-09", visitors: 180 },
  { date: "2024-05-10", visitors: 330 },
  { date: "2024-05-11", visitors: 270 },
  { date: "2024-05-12", visitors: 240 },
  { date: "2024-05-13", visitors: 160 },
  { date: "2024-05-14", visitors: 490 },
  { date: "2024-05-15", visitors: 380 },
  { date: "2024-05-16", visitors: 400 },
  { date: "2024-05-17", visitors: 420 },
  { date: "2024-05-18", visitors: 350 },
  { date: "2024-05-19", visitors: 180 },
  { date: "2024-05-20", visitors: 230 },
  { date: "2024-05-21", visitors: 140 },
  { date: "2024-05-22", visitors: 120 },
  { date: "2024-05-23", visitors: 290 },
  { date: "2024-05-24", visitors: 220 },
  { date: "2024-05-25", visitors: 250 },
  { date: "2024-05-26", visitors: 170 },
  { date: "2024-05-27", visitors: 460 },
  { date: "2024-05-28", visitors: 190 },
  { date: "2024-05-29", visitors: 130 },
  { date: "2024-05-30", visitors: 280 },
  { date: "2024-05-31", visitors: 230 },
  { date: "2024-06-01", visitors: 200 },
  { date: "2024-06-02", visitors: 410 },
  { date: "2024-06-03", visitors: 160 },
  { date: "2024-06-04", visitors: 380 },
  { date: "2024-06-05", visitors: 140 },
  { date: "2024-06-06", visitors: 250 },
  { date: "2024-06-07", visitors: 370 },
  { date: "2024-06-08", visitors: 320 },
  { date: "2024-06-09", visitors: 480 },
  { date: "2024-06-10", visitors: 200 },
  { date: "2024-06-11", visitors: 150 },
  { date: "2024-06-12", visitors: 420 },
  { date: "2024-06-13", visitors: 130 },
  { date: "2024-06-14", visitors: 380 },
  { date: "2024-06-15", visitors: 350 },
  { date: "2024-06-16", visitors: 310 },
  { date: "2024-06-17", visitors: 520 },
  { date: "2024-06-18", visitors: 170 },
  { date: "2024-06-19", visitors: 290 },
  { date: "2024-06-20", visitors: 450 },
  { date: "2024-06-21", visitors: 210 },
  { date: "2024-06-22", visitors: 270 },
  { date: "2024-06-23", visitors: 530 },
  { date: "2024-06-24", visitors: 180 },
  { date: "2024-06-25", visitors: 190 },
  { date: "2024-06-26", visitors: 380 },
  { date: "2024-06-27", visitors: 490 },
  { date: "2024-06-28", visitors: 200 },
  { date: "2024-06-29", visitors: 160 },
  { date: "2024-06-30", visitors: 400 },
];

const chartConfig = {
  visitors: {
    label: "Mobile Visitors",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    return chartData.filter((item) => {
      const date = new Date(item.date);
      const referenceDate = new Date("2024-06-30");
      let daysToSubtract = 90;
      if (timeRange === "30d") daysToSubtract = 30;
      if (timeRange === "7d") daysToSubtract = 7;

      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - daysToSubtract);
      return date >= startDate;
    });
  }, [timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Mobile Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-40 @[767px]/card:hidden"
              size="sm"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="visitors"
              type="natural"
              fill="url(#fillVisitors)"
              stroke="var(--color-visitors)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
