import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { sensors, lenses, calculatePPM, getPerformanceStatus, getFOVWidth, getFOVAngle } from "@/lib/cameraData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Zap, Eye, Focus } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [location, navigate] = useLocation();
  const [selectedSensorId, setSelectedSensorId] = useState(sensors[0].id);
  const [selectedLensId, setSelectedLensId] = useState(lenses[0].id);

  // URL 쿼리 파라미터에서 렌즈 ID 추출
  useEffect(() => {
    try {
      // Wouter의 location은 전체 경로를 포함하므로 URL 객체로 파싱
      const url = new URL(location, 'http://localhost');
      const lensId = url.searchParams.get('lens');
      if (lensId) {
        const foundLens = lenses.find(l => l.id === lensId);
        if (foundLens) {
          setSelectedLensId(lensId);
        }
      }
    } catch (e) {
      // URL 파싱 실패 시 무시
    }
  }, [location]);

  const selectedSensor = useMemo(
    () => sensors.find((s) => s.id === selectedSensorId) || sensors[0],
    [selectedSensorId]
  );

  const selectedLens = useMemo(
    () => lenses.find((l) => l.id === selectedLensId) || lenses[0],
    [selectedLensId]
  );

  const ppm100 = useMemo(
    () => calculatePPM(selectedLens.focalLength, 100, selectedSensor.sensorWidth, selectedSensor.imageWidth),
    [selectedSensor, selectedLens]
  );

  const ppm300 = useMemo(
    () => calculatePPM(selectedLens.focalLength, 300, selectedSensor.sensorWidth, selectedSensor.imageWidth),
    [selectedSensor, selectedLens]
  );

  const fov100 = useMemo(
    () => getFOVWidth(selectedLens.focalLength, 100, selectedSensor.sensorWidth),
    [selectedSensor, selectedLens]
  );

  const fov300 = useMemo(
    () => getFOVWidth(selectedLens.focalLength, 300, selectedSensor.sensorWidth),
    [selectedSensor, selectedLens]
  );

  const fovAngle = useMemo(
    () => getFOVAngle(selectedLens.focalLength, selectedSensor.sensorWidth),
    [selectedSensor, selectedLens]
  );

  const status100 = getPerformanceStatus(ppm100, 100);
  const status300 = getPerformanceStatus(ppm300, 300);

  const chartData = [
    { distance: "100m (식별)", ppm: Math.round(ppm100), threshold: 150 },
    { distance: "300m (인식)", ppm: Math.round(ppm300), threshold: 60 },
  ];

  const focalLengthData = lenses.map((lens) => ({
    name: `${lens.focalLength}mm`,
    ppm100: Math.round(calculatePPM(lens.focalLength, 100, selectedSensor.sensorWidth, selectedSensor.imageWidth)),
    ppm300: Math.round(calculatePPM(lens.focalLength, 300, selectedSensor.sensorWidth, selectedSensor.imageWidth)),
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-100 text-green-800";
      case "adequate":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "optimal":
        return "최적";
      case "adequate":
        return "적정";
      default:
        return "부족";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-600">RPi Camera Comparator</h2>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              비교 도구
            </button>
            <button
              onClick={() => navigate("/lens-specs")}
              className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              렌즈 스펙
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative w-full h-96 bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/105869869/iYWUV4juEzVjUxw3magmPY/hero-camera-tech-fhMgN4NGMWSrvknLq4rDJR.webp')`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">RPi 카메라 & 렌즈 비교 도구</h1>
          <p className="text-xl text-gray-100">센서와 렌즈 조합의 성능을 실시간으로 분석하세요</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Selection Panel */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              구성 선택
            </CardTitle>
            <CardDescription>센서와 렌즈를 선택하세요</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  카메라 센서
                </label>
                <Select value={selectedSensorId} onValueChange={setSelectedSensorId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sensors.map((sensor) => (
                      <SelectItem key={sensor.id} value={sensor.id}>
                        {sensor.name} ({sensor.megapixels}MP)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-2">
                  공식 M12 마운트 버전, 가장 높은 해상도
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  M12 렌즈
                </label>
                <Select value={selectedLensId} onValueChange={setSelectedLensId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lenses.map((lens) => (
                      <SelectItem key={lens.id} value={lens.id}>
                        {lens.name} ({lens.focalLength}mm)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-2">
                  M12 규격 렌즈, 초점거리별 선택 가능
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Lens Specs */}
        <Card className="mb-8 shadow-lg border-2 border-purple-200">
          <CardHeader className="bg-purple-50">
            <CardTitle>선택된 렌즈 상세 스펙</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold">초점거리</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{selectedLens.focalLength}mm</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold">조리개</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{selectedLens.aperture}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold">센서 포맷</p>
                <p className="text-lg font-bold text-orange-600 mt-1">{selectedLens.sensorFormat}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold">가격대</p>
                <p className="text-lg font-bold text-red-600 mt-1">{selectedLens.price}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">
                <strong>설명:</strong> {selectedLens.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 100m Performance */}
          <Card className={`shadow-lg border-2 ${status100 === "optimal" ? "border-green-300" : status100 === "adequate" ? "border-yellow-300" : "border-red-300"}`}>
            <CardHeader className={status100 === "optimal" ? "bg-green-50" : status100 === "adequate" ? "bg-yellow-50" : "bg-red-50"}>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                100m 식별 성능
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-blue-600">{Math.round(ppm100)}</div>
                <div className="text-sm text-gray-600">PPM (Pixels/Meter)</div>
              </div>
              <div className={`p-3 rounded-lg ${getStatusColor(status100)}`}>
                <p className="font-semibold">{getStatusLabel(status100)}</p>
                <p className="text-xs">필요: 150+ PPM</p>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">화각:</span>
                  <span className="font-semibold">{fov100.toFixed(1)}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">화각(각도):</span>
                  <span className="font-semibold">{fovAngle.toFixed(1)}°</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 300m Performance */}
          <Card className={`shadow-lg border-2 ${status300 === "optimal" ? "border-green-300" : status300 === "adequate" ? "border-yellow-300" : "border-red-300"}`}>
            <CardHeader className={status300 === "optimal" ? "bg-green-50" : status300 === "adequate" ? "bg-yellow-50" : "bg-red-50"}>
              <CardTitle className="flex items-center gap-2">
                <Focus className="w-5 h-5" />
                300m 인식 성능
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-orange-600">{Math.round(ppm300)}</div>
                <div className="text-sm text-gray-600">PPM (Pixels/Meter)</div>
              </div>
              <div className={`p-3 rounded-lg ${getStatusColor(status300)}`}>
                <p className="font-semibold">{getStatusLabel(status300)}</p>
                <p className="text-xs">필요: 60+ PPM</p>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">화각:</span>
                  <span className="font-semibold">{fov300.toFixed(1)}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">화각(각도):</span>
                  <span className="font-semibold">{fovAngle.toFixed(1)}°</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* PPM Comparison Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>거리별 PPM 비교</CardTitle>
              <CardDescription>100m 식별 vs 300m 인식</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="distance" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ppm" fill="#3b82f6" name="실제 PPM" />
                  <Bar dataKey="threshold" fill="#ef4444" name="필요 PPM" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Focal Length Analysis */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>렌즈별 성능 분석</CardTitle>
              <CardDescription>초점거리에 따른 PPM 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={focalLengthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="ppm100" stroke="#10b981" name="100m PPM" strokeWidth={2} />
                  <Line type="monotone" dataKey="ppm300" stroke="#f59e0b" name="300m PPM" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="shadow-lg border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle>추천 사항</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {status100 === "optimal" && status300 === "optimal" ? (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-800">
                    ✓ 완벽한 구성입니다!
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    100m에서 식별, 300m에서 인식이 모두 가능합니다.
                  </p>
                </div>
              ) : status100 === "adequate" || status300 === "adequate" ? (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="font-semibold text-yellow-800">
                    ⚠ 적절한 구성입니다.
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    대부분의 용도에 적합하지만, 극도의 정밀도가 필요한 경우 더 긴 초점거리의 렌즈를 고려하세요.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-semibold text-red-800">
                    ✗ 성능이 부족합니다.
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    더 긴 초점거리의 렌즈(25mm 이상)를 선택하거나, 더 높은 해상도의 센서를 고려하세요.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            RPi Camera & Lens Comparator | 라즈베리 파이 카메라 성능 비교 도구
          </p>
          <p className="text-xs text-gray-500 mt-2">© 2026 ATIX.Co.Ltd</p>
        </div>
      </footer>
    </div>
  );
}
