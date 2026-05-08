import { expandedLenses } from "./expandedLensData";

export interface Sensor {
  id: string;
  name: string;
  model: string;
  megapixels: number;
  sensorFormat: string; // e.g., "1/2.3\""
  sensorWidth: number; // mm
  imageWidth: number; // pixels
  description: string;
  price?: string;
  recommended: boolean;
}

export interface Lens {
  id: string;
  name: string;
  focalLength: number; // mm
  aperture: string; // e.g., "F2.5"
  sensorFormat: string; // e.g., "1/2.3\""
  description: string;
  price?: string;
  recommended: boolean;
}

export const sensors: Sensor[] = [
  {
    id: "rpi-hq-m12",
    name: "Raspberry Pi HQ Camera (M12 Mount)",
    model: "IMX477",
    megapixels: 12.3,
    sensorFormat: "1/2.3\"",
    sensorWidth: 6.287,
    imageWidth: 4056,
    description: "공식 M12 마운트 버전, 가장 높은 호환성 및 화질",
    price: "$50-60",
    recommended: true,
  },
  {
    id: "arducam-64mp",
    name: "Arducam 64MP Hawkeye",
    model: "64MP Autofocus",
    megapixels: 64,
    sensorFormat: "1/1.7\"",
    sensorWidth: 7.9,
    imageWidth: 9152,
    description: "초고해상도, M12 렌즈 교체 가능 (어댑터 필요할 수 있음)",
    price: "$80-100",
    recommended: false,
  },
  {
    id: "arducam-12mp",
    name: "Arducam 12MP IMX708",
    model: "IMX708",
    megapixels: 12,
    sensorFormat: "1/1.3\"",
    sensorWidth: 9.6,
    imageWidth: 4000,
    description: "고성능 12MP 센서, 우수한 저조도 성능",
    price: "$45-55",
    recommended: false,
  },
  {
    id: "arducam-5mp",
    name: "Arducam 5MP OV5647 (M12)",
    model: "OV5647",
    megapixels: 5,
    sensorFormat: "1/4\"",
    sensorWidth: 3.68,
    imageWidth: 2592,
    description: "저가형, M12 마운트 일체형 모델",
    price: "$20-30",
    recommended: false,
  },
];

// expandedLenses를 Lens 타입으로 변환
export const lenses: Lens[] = expandedLenses.map(lens => ({
  id: lens.id,
  name: lens.name,
  focalLength: lens.focalLength,
  aperture: lens.aperture,
  sensorFormat: lens.sensorFormat,
  description: lens.description,
  price: lens.price,
  recommended: lens.focalLength === 50 && lens.manufacturer === "Commonlands",
}));

// Performance thresholds
export const performanceThresholds = {
  recognition: { min: 60, ideal: 100 }, // PPM for 300m recognition
  identification: { min: 150, ideal: 250 }, // PPM for 100m identification
};

// Calculate PPM (Pixels Per Meter)
export function calculatePPM(
  focalLength: number,
  distance: number,
  sensorWidth: number,
  imageWidth: number
): number {
  if (focalLength === 0 || distance === 0 || sensorWidth === 0 || imageWidth === 0) {
    return 0;
  }

  // FOV (Field of View) in radians
  const fov = 2 * Math.atan(sensorWidth / (2 * focalLength));

  // Width at distance
  const widthAtDistance = 2 * distance * Math.tan(fov / 2) * 1000; // in mm

  // PPM = pixels / width at distance
  return imageWidth / widthAtDistance;
}

// Get performance status
export function getPerformanceStatus(
  ppm: number,
  type: "recognition" | "identification"
): "optimal" | "adequate" | "poor" {
  const threshold = performanceThresholds[type];
  if (ppm >= threshold.ideal) return "optimal";
  if (ppm >= threshold.min) return "adequate";
  return "poor";
}

// Calculate FOV width at distance
export function getFOVWidth(fovAngle: number, distance: number): number {
  return 2 * distance * Math.tan((fovAngle / 2) * (Math.PI / 180));
}

// Calculate FOV angle
export function getFOVAngle(focalLength: number, sensorWidth: number): number {
  return (2 * Math.atan(sensorWidth / (2 * focalLength)) * 180) / Math.PI;
}
