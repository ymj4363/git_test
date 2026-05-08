export interface LensSpec {
  id: string;
  name: string;
  focalLength: number;
  aperture: string;
  sensor: string;
  fov: number;
  price: string;
  category: "wide" | "standard" | "telephoto";
  distortion: string;
  bfl: string;
  use_case: string;
}

export const lensSpecs: LensSpec[] = [
  // Standard Lenses (비교 도구와 ID 통일)
  {
    id: "arducam-6mm",
    name: "Arducam 6mm Wide Angle",
    focalLength: 6,
    aperture: "F2.0",
    sensor: "1/2.3\"",
    fov: 65,
    price: "$15-25",
    category: "standard",
    distortion: "1-2%",
    bfl: "3mm",
    use_case: "광각 렌즈, 넓은 화각",
  },

  // Telephoto Lenses (비교 도구와 ID 통일)
  {
    id: "arducam-25mm",
    name: "Arducam 25mm Telephoto",
    focalLength: 25,
    aperture: "F2.4",
    sensor: "1/2.3\"",
    fov: 20,
    price: "$30-40",
    category: "telephoto",
    distortion: "<1%",
    bfl: "5mm",
    use_case: "중거리 망원 렌즈, 적절한 성능",
  },
  {
    id: "arducam-35mm",
    name: "Arducam 35mm Telephoto",
    focalLength: 35,
    aperture: "F2.4",
    sensor: "1/2.3\"",
    fov: 14,
    price: "$35-45",
    category: "telephoto",
    distortion: "<1%",
    bfl: "6mm",
    use_case: "35mm 망원 렌즈, 적정 성능",
  },
  {
    id: "commonlands-50mm",
    name: "Commonlands CIL051 50mm Telephoto",
    focalLength: 50,
    aperture: "F2.5",
    sensor: "1/2.3\"",
    fov: 7,
    price: "$60-80",
    category: "telephoto",
    distortion: "<1%",
    bfl: "7mm",
    use_case: "저왜곡 망원 렌즈, 최적의 장거리 성능",
  },
  {
    id: "ragecams-50mm",
    name: "RageCams 50mm Telephoto",
    focalLength: 50,
    aperture: "F2.8",
    sensor: "M12 범용",
    fov: 7,
    price: "$50-70",
    category: "telephoto",
    distortion: "1-2%",
    bfl: "6.5mm",
    use_case: "범용 50mm 망원 렌즈",
  },
];

export const apertureGuide = [
  {
    range: "F1.4 ~ F1.8",
    lightIntake: "매우 많음",
    useCase: "저조도, 야간 촬영",
    depthOfField: "얕음",
    note: "고가, 제한적",
  },
  {
    range: "F2.0 ~ F2.4",
    lightIntake: "많음",
    useCase: "일반 실내/야외",
    depthOfField: "중간",
    note: "가장 일반적",
  },
  {
    range: "F2.5 ~ F2.8",
    lightIntake: "중간",
    useCase: "실외 촬영",
    depthOfField: "깊음",
    note: "저가",
  },
  {
    range: "F4.0 이상",
    lightIntake: "적음",
    useCase: "밝은 환경",
    depthOfField: "매우 깊음",
    note: "저조도 부적합",
  },
];

export const sensorCompatibility = [
  {
    format: "1/4\"",
    imageCircle: "4.5mm",
    recommendedLens: "2.1mm ~ 6mm",
    useCase: "자동차 카메라, 초소형 드론",
    feature: "극도로 컴팩트",
  },
  {
    format: "1/3\"",
    imageCircle: "6mm",
    recommendedLens: "3.6mm ~ 8mm",
    useCase: "보안 카메라, 산업용",
    feature: "가장 널리 사용됨",
  },
  {
    format: "1/2.5\"",
    imageCircle: "7mm",
    recommendedLens: "4mm ~ 12mm",
    useCase: "라즈베리 파이 HQ, 고해상도 카메라",
    feature: "높은 해상도",
  },
  {
    format: "1/2.3\"",
    imageCircle: "7.9mm",
    recommendedLens: "4mm ~ 50mm",
    useCase: "고해상도 감시, 전문 촬영",
    feature: "최고 해상도 지원",
  },
  {
    format: "2/3\"",
    imageCircle: "11mm",
    recommendedLens: "6mm ~ 50mm+",
    useCase: "고급 산업용, 의료용",
    feature: "최고 화질, 고가",
  },
];

export const useCaseGuide = [
  {
    title: "광각 감시 (넓은 영역)",
    focalLength: "2.1mm ~ 3.6mm",
    aperture: "F2.0 ~ F2.5",
    example: "Arducam 3.6mm",
    fov: "120° 이상",
  },
  {
    title: "일반 감시/드론",
    focalLength: "4mm ~ 8mm",
    aperture: "F2.0 ~ F2.4",
    example: "Commonlands 6mm",
    fov: "50° ~ 90°",
  },
  {
    title: "번호판 인식 (100m 이상)",
    focalLength: "25mm ~ 50mm",
    aperture: "F2.0 ~ F2.5",
    example: "Commonlands 50mm",
    fov: "7° ~ 20°",
  },
  {
    title: "저조도 환경",
    focalLength: "4mm ~ 12mm",
    aperture: "F1.6 ~ F2.0",
    example: "Arducam 6mm F2.0",
    fov: "50° ~ 70°",
  },
  {
    title: "극도의 컴팩트",
    focalLength: "1.68mm ~ 3.6mm",
    aperture: "F2.0 ~ F2.5",
    example: "Arducam 1.68mm Fisheye",
    fov: "170° ~ 180°",
  },
];
