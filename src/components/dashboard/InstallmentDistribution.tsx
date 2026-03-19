"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as PieIcon } from "lucide-react";
import type { InstallmentDistribution as InstallmentDistributionType } from "@/types/dashboard";

interface InstallmentDistributionProps {
  distribution: InstallmentDistributionType;
}

const statusConfig = [
  {
    key: "pending" as const,
    label: "Pending",
    color: "#94a3b8", // slate-400
  },
  {
    key: "partial" as const,
    label: "Partial",
    color: "#f59e0b", // amber-500
  },
  {
    key: "paid" as const,
    label: "Paid",
    color: "#10b981", // emerald-500
  },
  {
    key: "overdue" as const,
    label: "Overdue",
    color: "#ef4444", // red-500
  },
];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { fill: string } }>;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border rounded-lg shadow-lg px-3 py-2">
        <p className="text-sm font-semibold flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: payload[0].payload.fill }}
          />
          {payload[0].name}:{" "}
          <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
}

export function InstallmentDistribution({
  distribution,
}: InstallmentDistributionProps) {
  const total =
    distribution.pending +
    distribution.partial +
    distribution.paid +
    distribution.overdue;

  const chartData = statusConfig
    .map((cfg) => ({
      name: cfg.label,
      value: distribution[cfg.key],
      fill: cfg.color,
    }))
    .filter((d) => d.value > 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <PieIcon size={18} className="text-primary" />
          Installment Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No installments registered
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="h-[200px] w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {statusConfig.map((cfg) => {
                const val = distribution[cfg.key];
                const pct = total > 0 ? ((val / total) * 100).toFixed(0) : "0";
                return (
                  <div key={cfg.key} className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: cfg.color }}
                    />
                    <span className="text-muted-foreground w-20">
                      {cfg.label}
                    </span>
                    <span className="font-bold text-foreground">{val}</span>
                    <span className="text-muted-foreground text-xs">
                      ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
