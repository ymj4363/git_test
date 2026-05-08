import React from "react";

interface PerformanceGaugeProps {
  value: number;
  max: number;
  label: string;
  unit?: string;
  status: "optimal" | "adequate" | "insufficient";
}

export function PerformanceGauge({
  value,
  max,
  label,
  unit = "PPM",
  status,
}: PerformanceGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const getStatusColor = (s: string) => {
    switch (s) {
      case "optimal":
        return "#10b981"; // green
      case "adequate":
        return "#f59e0b"; // amber
      default:
        return "#ef4444"; // red
    }
  };

  const getStatusBgColor = (s: string) => {
    switch (s) {
      case "optimal":
        return "#d1fae5";
      case "adequate":
        return "#fef3c7";
      default:
        return "#fee2e2";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getStatusColor(status)}
            strokeWidth="8"
            strokeDasharray={`${(percentage / 100) * 282.7} 282.7`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.3s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">{Math.round(value)}</div>
            <div className="text-xs text-gray-500">{unit}</div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-xs text-gray-500">Max: {max}</p>
      </div>
    </div>
  );
}
