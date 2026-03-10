"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { CollectionChartPoint } from "@/types/dashboard";

interface CollectionsChartProps {
  data: CollectionChartPoint[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 0,
  }).format(amount);
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border rounded-lg shadow-lg px-3 py-2">
        <p className="text-xs text-muted-foreground">
          {new Date(label ?? "").toLocaleDateString("es-DO", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          })}
        </p>
        <p className="text-sm font-bold text-primary">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
}

export function CollectionsChart({ data }: CollectionsChartProps) {
  const total = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            Cobros Últimos 30 Días
          </CardTitle>
          <span className="text-sm font-bold text-primary">
            {formatCurrency(total)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: string) => {
                  const d = new Date(val);
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
                interval="preserveStartEnd"
                minTickGap={30}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) =>
                  val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toString()
                }
                width={40}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "hsl(var(--muted) / 0.5)" }}
              />
              <Bar
                dataKey="amount"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                maxBarSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
