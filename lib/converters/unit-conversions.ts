import type {
  ConverterCategory,
  ConverterSlug,
  UnitDefinition,
} from "@/types/converter";

const linearUnit = (
  id: string,
  label: string,
  symbol: string,
  factor: number,
  description: string,
  commonValues: number[]
): UnitDefinition => ({
  id,
  label,
  symbol,
  description,
  commonValues,
  toBase: (value) => value * factor,
  fromBase: (value) => value / factor,
});

export const converterCategories: Record<ConverterSlug, ConverterCategory> = {
  "length-converter": {
    slug: "length-converter",
    title: "길이 변환기",
    description: "미터법과 야드파운드법에서 자주 사용하는 길이 단위를 변환합니다.",
    units: [
      linearUnit("millimeter", "밀리미터", "mm", 0.001, "1미터의 1,000분의 1에 해당하는 미터법 단위로, 작은 물체의 치수나 정밀 측정에 주로 사용합니다.", [1, 2, 5, 10, 20, 50, 100, 500, 1000, 10000]),
      linearUnit("centimeter", "센티미터", "cm", 0.01, "1미터의 100분의 1에 해당하는 미터법 단위로, 일상용품이나 신체 치수를 잴 때 자주 사용합니다.", [1, 2, 5, 10, 20, 30, 50, 100, 200, 500]),
      linearUnit("meter", "미터", "m", 1, "국제단위계의 길이 기본 단위로, 키와 공간의 크기, 일반적인 거리 측정에 널리 사용합니다.", [1, 2, 5, 10, 20, 50, 100, 500, 1000, 5000]),
      linearUnit("kilometer", "킬로미터", "km", 1000, "1,000미터에 해당하는 미터법 단위로, 도로와 지역 간 거리를 나타낼 때 주로 사용합니다.", [1, 2, 5, 10, 21.0975, 42.195, 50, 100, 500, 1000]),
      linearUnit("inch", "인치", "in", 0.0254, "정확히 2.54센티미터에 해당하는 단위로, 화면 크기나 작은 제품의 치수에 자주 사용합니다.", [1, 2, 3, 6, 12, 24, 36, 48, 60, 100]),
      linearUnit("foot", "피트", "ft", 0.3048, "12인치에 해당하는 단위로, 키와 건축물의 치수를 나타낼 때 널리 사용합니다.", [1, 2, 3, 5, 6, 10, 20, 50, 100, 1000]),
      linearUnit("yard", "야드", "yd", 0.9144, "3피트에 해당하는 단위로, 직물이나 경기장, 비교적 짧은 거리를 측정할 때 사용합니다.", [1, 2, 3, 5, 10, 25, 50, 100, 500, 1000]),
      linearUnit("mile", "마일", "mi", 1609.344, "5,280피트에 해당하는 단위로, 주로 도로와 이동 거리를 나타낼 때 사용합니다.", [1, 3.1, 5, 10, 13.1, 26.2, 50, 100, 500, 1000]),
    ],
  },
  "weight-converter": {
    slug: "weight-converter",
    title: "무게 변환기",
    description: "미터법과 야드파운드법에서 자주 사용하는 무게 단위를 변환합니다.",
    units: [
      linearUnit("milligram", "밀리그램", "mg", 0.000001, "1그램의 1,000분의 1에 해당하는 미터법 단위로, 의약품이나 영양제처럼 매우 가벼운 물질에 사용합니다.", [1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000]),
      linearUnit("gram", "그램", "g", 0.001, "1킬로그램의 1,000분의 1에 해당하는 미터법 단위로, 식재료와 가벼운 물건을 잴 때 자주 사용합니다.", [1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000]),
      linearUnit("kilogram", "킬로그램", "kg", 1, "국제단위계의 질량 기본 단위로, 체중과 식료품, 배송 물품의 무게를 나타낼 때 널리 사용합니다.", [0.5, 1, 2, 5, 10, 20, 50, 75, 100, 1000]),
      linearUnit("ounce", "온스", "oz", 0.028349523125, "1파운드의 16분의 1에 해당하는 단위로, 음식의 양이나 가벼운 물건의 무게에 자주 사용합니다.", [1, 2, 4, 8, 12, 16, 24, 32, 64, 100]),
      linearUnit("pound", "파운드", "lb", 0.45359237, "16온스에 해당하는 단위로, 체중이나 포장 상품의 무게를 나타낼 때 주로 사용합니다.", [1, 2, 5, 10, 20, 50, 100, 150, 200, 1000]),
    ],
  },
  "temperature-converter": {
    slug: "temperature-converter",
    title: "온도 변환기",
    description: "섭씨, 화씨, 켈빈을 정확한 공식으로 변환합니다.",
    allowsNegative: true,
    units: [
      { id: "celsius", label: "섭씨", symbol: "°C", description: "표준 기압에서 물이 0°C에 얼고 100°C에 끓도록 정한 온도 척도로, 전 세계에서 일상적으로 사용합니다.", commonValues: [-40, -20, 0, 10, 20, 25, 37, 50, 75, 100], toBase: (value) => value + 273.15, fromBase: (value) => value - 273.15 },
      { id: "fahrenheit", label: "화씨", symbol: "°F", description: "물이 32°F에 얼고 212°F에 끓도록 정한 온도 척도로, 주로 미국에서 사용합니다.", commonValues: [-40, 0, 32, 50, 68, 77, 98.6, 122, 167, 212], toBase: (value) => ((value - 32) * 5) / 9 + 273.15, fromBase: (value) => ((value - 273.15) * 9) / 5 + 32 },
      { id: "kelvin", label: "켈빈", symbol: "K", description: "절대영도를 0으로 삼는 국제단위계의 열역학적 온도 단위로, 섭씨와 눈금 간격이 같습니다.", commonValues: [0, 100, 200, 233.15, 273.15, 293.15, 298.15, 310.15, 323.15, 373.15], toBase: (value) => value, fromBase: (value) => value },
    ],
  },
  "area-converter": {
    slug: "area-converter",
    title: "면적 변환기",
    description: "제곱밀리미터부터 헥타르와 에이커까지 다양한 면적 단위를 변환합니다.",
    units: [
      linearUnit("square-millimeter", "제곱밀리미터", "mm²", 0.000001, "한 변이 1밀리미터인 정사각형의 면적으로, 매우 작은 표면이나 정밀 도면에 사용합니다.", [1, 10, 100, 500, 1000, 5000, 10000, 100000, 1000000, 10000000]),
      linearUnit("square-centimeter", "제곱센티미터", "cm²", 0.0001, "한 변이 1센티미터인 정사각형의 면적으로, 작은 물건이나 표면의 넓이를 나타낼 때 사용합니다.", [1, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000]),
      linearUnit("square-meter", "제곱미터", "m²", 1, "국제단위계의 면적 단위로, 방과 주택, 바닥, 부동산의 넓이를 나타낼 때 널리 사용합니다.", [1, 5, 10, 25, 50, 100, 250, 500, 1000, 10000]),
      linearUnit("pyeong", "평", "평", 400 / 121, "약 3.3058제곱미터에 해당하는 전통 면적 단위로, 국내에서 주택과 토지의 넓이를 쉽게 가늠할 때 자주 사용합니다.", [1, 5, 10, 15, 20, 25, 30, 50, 100, 1000]),
      linearUnit("square-kilometer", "제곱킬로미터", "km²", 1000000, "한 변이 1킬로미터인 정사각형의 면적으로, 도시나 지역처럼 넓은 지리적 범위에 사용합니다.", [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000]),
      linearUnit("square-inch", "제곱인치", "in²", 0.00064516, "한 변이 1인치인 정사각형의 면적으로, 작은 제품과 표면의 크기를 나타낼 때 사용합니다.", [1, 10, 25, 50, 100, 144, 500, 1000, 5000, 10000]),
      linearUnit("square-foot", "제곱피트", "ft²", 0.09290304, "한 변이 1피트인 정사각형의 면적으로, 주택과 사무실, 평면도의 넓이에 널리 사용합니다.", [1, 10, 50, 100, 250, 500, 1000, 2500, 5000, 10000]),
      linearUnit("square-yard", "제곱야드", "yd²", 0.83612736, "한 변이 1야드인 정사각형의 면적으로, 카펫과 조경, 직물의 넓이를 나타낼 때 사용합니다.", [1, 10, 50, 100, 250, 500, 1000, 2500, 4840, 10000]),
      linearUnit("acre", "에이커", "acre", 4046.8564224, "43,560제곱피트에 해당하는 토지 면적 단위로, 부동산과 농지의 크기를 나타낼 때 주로 사용합니다.", [1, 2, 5, 10, 20, 50, 100, 250, 500, 1000]),
      linearUnit("hectare", "헥타르", "ha", 10000, "10,000제곱미터에 해당하는 미터법 토지 면적 단위로, 농지와 대규모 부지에 널리 사용합니다.", [1, 2, 5, 10, 20, 50, 100, 250, 500, 1000]),
    ],
  },
  "volume-converter": {
    slug: "volume-converter",
    title: "부피 변환기",
    description: "미터법과 미국식 단위에서 자주 사용하는 부피 단위를 변환합니다.",
    units: [
      linearUnit("milliliter", "밀리리터", "mL", 0.001, "1리터의 1,000분의 1에 해당하는 미터법 단위로, 음료와 의약품, 요리 재료를 잴 때 자주 사용합니다.", [1, 5, 10, 15, 30, 50, 100, 250, 500, 1000]),
      linearUnit("liter", "리터", "L", 1, "음료와 연료를 비롯해 일상적인 액체의 양을 나타낼 때 널리 사용하는 미터법 단위입니다.", [0.25, 0.5, 1, 1.5, 2, 3, 5, 10, 20, 100]),
      linearUnit("cubic-centimeter", "세제곱센티미터", "cm³", 0.001, "한 변이 1센티미터인 정육면체의 부피로, 1세제곱센티미터는 1밀리리터와 같습니다.", [1, 5, 10, 50, 100, 250, 500, 1000, 5000, 10000]),
      linearUnit("cubic-meter", "세제곱미터", "m³", 1000, "국제단위계의 부피 단위로, 공간의 크기와 수도 사용량, 화물, 대형 용기의 부피에 사용합니다.", [0.1, 0.5, 1, 2, 5, 10, 50, 100, 500, 1000]),
      linearUnit("fluid-ounce", "미국 액량 온스", "fl oz", 0.0295735295625, "미국식 컵의 8분의 1에 해당하는 액체 부피 단위로, 음료와 요리법에서 자주 사용합니다.", [1, 2, 4, 8, 12, 16, 24, 32, 64, 128]),
      linearUnit("cup", "미국 컵", "cup", 0.2365882365, "8미국 액량 온스, 약 236.59밀리리터에 해당하는 미국식 요리 계량 단위입니다.", [0.25, 0.33, 0.5, 0.67, 0.75, 1, 1.5, 2, 4, 8]),
      linearUnit("pint", "미국 파인트", "pt", 0.473176473, "2컵 또는 16미국 액량 온스에 해당하는 미국식 액체 부피 단위입니다.", [0.5, 1, 2, 3, 4, 5, 8, 10, 20, 50]),
      linearUnit("quart", "미국 쿼트", "qt", 0.946352946, "2파인트 또는 4컵, 약 0.946리터에 해당하는 미국식 액체 부피 단위입니다.", [0.5, 1, 2, 3, 4, 5, 8, 10, 20, 50]),
      linearUnit("gallon", "미국 갤런", "gal", 3.785411784, "4쿼트 또는 약 3.785리터에 해당하는 미국식 액체 부피 단위입니다.", [0.5, 1, 2, 5, 10, 20, 50, 100, 500, 1000]),
    ],
  },
};

export const converterSlugs = Object.keys(converterCategories) as ConverterSlug[];

export function getConverterCategory(slug: string) {
  return converterCategories[slug as ConverterSlug];
}

export function convertUnitValue(value: number, from: UnitDefinition, to: UnitDefinition) {
  return to.fromBase(from.toBase(value));
}

const DEFAULT_FRACTION_DIGITS = 2;

function normalizeFractionDigits(fractionDigits: number) {
  return Math.min(10, Math.max(0, Math.trunc(fractionDigits)));
}

function formatScientificValue(value: number, fractionDigits: number) {
  const [mantissa, exponent] = value.toExponential(fractionDigits).split("e");
  return `${Number(mantissa)}e${Number(exponent)}`;
}

export function formatInputValue(value: number, fractionDigits = DEFAULT_FRACTION_DIGITS) {
  if (value === 0) return "0";
  const normalizedFractionDigits = normalizeFractionDigits(fractionDigits);
  const absoluteValue = Math.abs(value);
  if (absoluteValue >= 1_000_000_000) {
    return formatScientificValue(value, normalizedFractionDigits);
  }
  const formattedValue = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: normalizedFractionDigits,
    useGrouping: false,
  }).format(value);
  if (Number(formattedValue) === 0) {
    return formatScientificValue(value, normalizedFractionDigits);
  }
  return formattedValue;
}

export function formatConvertedValue(value: number, fractionDigits = DEFAULT_FRACTION_DIGITS) {
  if (value === 0) return "0";
  const normalizedFractionDigits = normalizeFractionDigits(fractionDigits);
  const absoluteValue = Math.abs(value);
  if (absoluteValue >= 1_000_000_000) {
    return formatScientificValue(value, normalizedFractionDigits);
  }
  const formattedValue = new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: normalizedFractionDigits,
  }).format(value);
  if (Number(formattedValue.replaceAll(",", "")) === 0) {
    return formatScientificValue(value, normalizedFractionDigits);
  }
  return formattedValue;
}
