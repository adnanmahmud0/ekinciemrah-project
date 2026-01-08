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

// Revenue data
const chartData = [
  { date: "2024-04-01", revenue: 1500 },
  { date: "2024-04-02", revenue: 1800 },
  { date: "2024-04-03", revenue: 1200 },
  { date: "2024-04-04", revenue: 2600 },
  { date: "2024-04-05", revenue: 2900 },
  { date: "2024-04-06", revenue: 3400 },
  { date: "2024-04-07", revenue: 1800 },
  { date: "2024-04-08", revenue: 3200 },
  { date: "2024-04-09", revenue: 1100 },
  { date: "2024-04-10", revenue: 1900 },
  { date: "2024-04-11", revenue: 3500 },
  { date: "2024-04-12", revenue: 2100 },
  { date: "2024-04-13", revenue: 3800 },
  { date: "2024-04-14", revenue: 2200 },
  { date: "2024-04-15", revenue: 1700 },
  { date: "2024-04-16", revenue: 1900 },
  { date: "2024-04-17", revenue: 3600 },
  { date: "2024-04-18", revenue: 4100 },
  { date: "2024-04-19", revenue: 1800 },
  { date: "2024-04-20", revenue: 1500 },
  { date: "2024-04-21", revenue: 2000 },
  { date: "2024-04-22", revenue: 1700 },
  { date: "2024-04-23", revenue: 2300 },
  { date: "2024-04-24", revenue: 2900 },
  { date: "2024-04-25", revenue: 2500 },
  { date: "2024-04-26", revenue: 1300 },
  { date: "2024-04-27", revenue: 4200 },
  { date: "2024-04-28", revenue: 1800 },
  { date: "2024-04-29", revenue: 2400 },
  { date: "2024-04-30", revenue: 3800 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    return chartData.filter((item) => {
      const date = new Date(item.date);
      const referenceDate = new Date("2024-04-30");
      let days = 90;

      if (timeRange === "30d") days = 30;
      if (timeRange === "7d") days = 7;

      const startDate = new Date(referenceDate);
      startDate.setDate(startDate.getDate() - days);

      return date >= startDate;
    });
  }, [timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total revenue for selected period
          </span>
          <span className="@[540px]/card:hidden">Revenue summary</span>
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
            <SelectTrigger className="w-40 @[767px]/card:hidden" size="sm">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
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
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
              }
            />

            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
