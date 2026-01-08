/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DollarSign, FileText, ShoppingBag, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/datatable/DataTable";
import { PageHeader } from "@/components/page-header";
import { columns, CustomerInsight } from "./columns";
import data from "./data.json";

// Mock data for charts
const areaChartData = [
  { month: "JAN", sales: 1500 },
  { month: "FEB", sales: 2200 },
  { month: "MAR", sales: 1600 },
  { month: "APR", sales: 2400 },
  { month: "MAY", sales: 3000 },
  { month: "JUN", sales: 2600 },
  { month: "JUL", sales: 3200 },
  { month: "AUG", sales: 2800 },
  { month: "SEP", sales: 2000 },
  { month: "OCT", sales: 2100 },
  { month: "NOV", sales: 1800 },
  { month: "DEC", sales: 2600 },
];

const pieChartData = [
  { name: "Report", value: 32, fill: "#3b82f6" }, // Blue
  { name: "Remaining", value: 68, fill: "#e5e7eb" }, // Gray
];

const summaryData = [
  {
    title: "Total Sales",
    value: "$124,563",
    change: "+12.5%",
    isPositive: true,
    icon: DollarSign,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    title: "Active Customer",
    value: "12",
    change: "+8.3%",
    isPositive: true,
    icon: Users,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    title: "Total Orders",
    value: "15,842",
    change: "+12.5%",
    isPositive: true,
    icon: FileText,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
  {
    title: "Total Reports",
    value: "15,842",
    change: "-2.1%",
    isPositive: false,
    icon: ShoppingBag,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-black p-2 text-white shadow-lg">
        <p className="text-sm font-medium">{`$${payload[0].value} Sales`}</p>
      </div>
    );
  }
  return null;
};

export default function ReportsAnalyticsPage() {
  const customerData: CustomerInsight[] = data as CustomerInsight[];

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Report & Analytics</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">Export Report</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className={`rounded-full p-2 ${item.iconBg}`}>
                  <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <span
                  className={`text-sm font-medium ${
                    item.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <h3 className="text-2xl font-bold">{item.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Area Chart */}
        <Card className="md:col-span-2 shadow-sm">
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={areaChartData}
                  margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#000", strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#000"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Donut Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-center text-lg font-medium">Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text (Optional - visual only) */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">32%</span>
              </div> */}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-sm font-medium text-gray-700">Report : 32%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customer Insights Table */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">Top Customer Insights</h3>
        <DataTable columns={columns} data={customerData} searchKey="customer" />
      </div>
    </div>
  );
}
