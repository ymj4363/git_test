import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  sensor: string;
  lens: string;
  ppm100: number;
  ppm300: number;
  isOptimal: boolean;
  notes: string[];
}

export function RecommendationCard({
  title,
  sensor,
  lens,
  ppm100,
  ppm300,
  isOptimal,
  notes,
}: RecommendationCardProps) {
  return (
    <Card className={`shadow-lg ${isOptimal ? "border-2 border-green-300" : "border-2 border-blue-200"}`}>
      <CardHeader className={isOptimal ? "bg-green-100" : "bg-blue-100"}>
        <CardTitle className="flex items-center gap-2">
          {isOptimal ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-blue-600" />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">카메라</p>
          <p className="text-lg font-semibold text-gray-800">{sensor}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">렌즈</p>
          <p className="text-lg font-semibold text-gray-800">{lens}</p>
        </div>
        <div className={`p-3 rounded ${isOptimal ? "bg-green-50" : "bg-blue-50"}`}>
          <p className={`text-sm font-semibold ${isOptimal ? "text-green-800" : "text-blue-800"}`}>
            100m 식별: {Math.round(ppm100)} PPM
          </p>
          <p className={`text-sm font-semibold ${isOptimal ? "text-green-800" : "text-blue-800"}`}>
            300m 인식: {Math.round(ppm300)} PPM
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700">주의사항:</p>
          <ul className="space-y-1">
            {notes.map((note, idx) => (
              <li key={idx} className="flex gap-2 text-xs text-gray-700">
                <span className="text-orange-600 font-bold">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
