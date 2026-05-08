import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  lensSpecs,
  apertureGuide,
  sensorCompatibility,
  useCaseGuide,
} from "@/lib/lensSpecsData";
import { Filter, Zap, Eye, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function LensSpecs() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "wide" | "standard" | "telephoto">(
    "all"
  );

  const filteredLenses =
    selectedCategory === "all"
      ? lensSpecs
      : lensSpecs.filter((lens) => lens.category === selectedCategory);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "wide":
        return "광각";
      case "standard":
        return "표준";
      case "telephoto":
        return "망원";
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "wide":
        return "bg-blue-100 text-blue-800";
      case "standard":
        return "bg-green-100 text-green-800";
      case "telephoto":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
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
              className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
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

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">M12 렌즈 스펙 가이드</h1>
          <p className="text-lg text-blue-100">
            라즈베리 파이 및 산업용 카메라용 M12 렌즈의 상세 스펙 비교
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="products">제품 비교</TabsTrigger>
            <TabsTrigger value="aperture">조리개 가이드</TabsTrigger>
            <TabsTrigger value="sensor">센서 호환성</TabsTrigger>
            <TabsTrigger value="usecase">용도별 추천</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setSelectedCategory("wide")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === "wide"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                광각 (1.68~3.6mm)
              </button>
              <button
                onClick={() => setSelectedCategory("standard")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === "standard"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                표준 (4~8mm)
              </button>
              <button
                onClick={() => setSelectedCategory("telephoto")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === "telephoto"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                망원 (12~50mm)
              </button>
            </div>

            {/* Lens Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLenses.map((lens) => (
                <Card key={lens.id} className="shadow-lg hover:shadow-xl transition">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{lens.name}</CardTitle>
                        <CardDescription>{lens.use_case}</CardDescription>
                      </div>
                      <Badge className={getCategoryColor(lens.category)}>
                        {getCategoryLabel(lens.category)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Main Specs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-xs text-gray-600">초점거리</p>
                        <p className="text-lg font-bold text-blue-600">{lens.focalLength}mm</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-xs text-gray-600">조리개</p>
                        <p className="text-lg font-bold text-green-600">{lens.aperture}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded">
                        <p className="text-xs text-gray-600">화각</p>
                        <p className="text-lg font-bold text-orange-600">{lens.fov}°</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded">
                        <p className="text-xs text-gray-600">센서</p>
                        <p className="text-lg font-bold text-purple-600">{lens.sensor}</p>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">왜곡:</span>
                        <span className="font-medium">{lens.distortion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">백포커스:</span>
                        <span className="font-medium">{lens.bfl}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">가격대:</span>
                        <span className="font-medium text-green-600">{lens.price}</span>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Aperture Tab */}
          <TabsContent value="aperture">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  조리개(Aperture) 가이드
                </CardTitle>
                <CardDescription>
                  조리개 값이 렌즈 성능에 미치는 영향
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">조리개</th>
                        <th className="px-4 py-2 text-left font-semibold">광량</th>
                        <th className="px-4 py-2 text-left font-semibold">용도</th>
                        <th className="px-4 py-2 text-left font-semibold">심도</th>
                        <th className="px-4 py-2 text-left font-semibold">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apertureGuide.map((guide, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold text-blue-600">{guide.range}</td>
                          <td className="px-4 py-3">{guide.lightIntake}</td>
                          <td className="px-4 py-3">{guide.useCase}</td>
                          <td className="px-4 py-3">{guide.depthOfField}</td>
                          <td className="px-4 py-3 text-gray-600">{guide.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>권장:</strong> 일반 용도는 F2.0 ~ F2.4, 야간 감시는 F1.6 ~ F2.0
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sensor Tab */}
          <TabsContent value="sensor">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  센서 포맷별 호환성
                </CardTitle>
                <CardDescription>
                  센서 크기와 렌즈 포맷 매칭 가이드
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sensorCompatibility.map((sensor, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold text-lg text-blue-600">{sensor.format}</h4>
                        <Badge variant="outline">{sensor.feature}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">이미지 원 크기</p>
                          <p className="font-semibold">{sensor.imageCircle}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">권장 렌즈</p>
                          <p className="font-semibold">{sensor.recommendedLens}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-gray-600">용도</p>
                          <p className="font-semibold">{sensor.useCase}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Use Case Tab */}
          <TabsContent value="usecase">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>용도별 렌즈 추천</CardTitle>
                <CardDescription>
                  애플리케이션에 맞는 최적의 렌즈 선택
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {useCaseGuide.map((useCase, idx) => (
                    <div key={idx} className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white">
                      <h4 className="font-bold text-lg mb-3 text-gray-800">{useCase.title}</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-600">초점거리</p>
                          <p className="font-semibold text-blue-600">{useCase.focalLength}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">조리개</p>
                          <p className="font-semibold text-green-600">{useCase.aperture}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">화각</p>
                          <p className="font-semibold text-orange-600">{useCase.fov}</p>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-gray-600">예시 제품</p>
                          <p className="font-semibold text-purple-600">{useCase.example}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Back to Comparator */}
        <div className="mt-12 py-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            비교 도구로 돌아가기
          </button>
        </div>

        {/* Important Notes */}
        <Card className="mt-12 shadow-lg border-2 border-orange-200">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-orange-800">구매 시 주의사항</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-orange-600 font-bold">✓</span>
                <span>
                  <strong>센서 포맷 반드시 확인:</strong> 1/2.3" 센서면 1/2.3" 렌즈를 선택해야 합니다
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-600 font-bold">✓</span>
                <span>
                  <strong>백포커스 호환성:</strong> 카메라 모듈의 백포커스와 렌즈의 BFL이 일치해야 합니다
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-600 font-bold">✓</span>
                <span>
                  <strong>IR Cut 필터:</strong> 야간 촬영이 필요하면 IR Cut 필터 유무를 확인하세요
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-600 font-bold">✓</span>
                <span>
                  <strong>조리개 고정/가변:</strong> 대부분의 M12 렌즈는 고정 조리개입니다
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-600 font-bold">✓</span>
                <span>
                  <strong>왜곡 레벨:</strong> 정밀 측정이 필요하면 저왜곡 렌즈(&lt;1%)를 선택하세요
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            RPi Camera & Lens Comparator | M12 렌즈 스펙 가이드
          </p>
          <p className="text-xs text-gray-500 mt-2">© 2026 ATIX.Co.Ltd</p>
        </div>
      </footer>
    </div>
  );
}
