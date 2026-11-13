"use client";

import { useMemo, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatConvertedValue } from "@/lib/converters/unit-conversions";
import { ConverterSlug } from "@/types/converter";

interface CategoryToolProps {
  categorySlug: ConverterSlug;
  precision: number;
}

interface ResultItemProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

function ResultItem({ label, value, emphasis }: ResultItemProps) {
  return (
    <div className={`rounded-lg border px-4 py-3 ${emphasis ? "bg-foreground text-background" : "bg-muted/30"}`}>
      <p className={`text-xs ${emphasis ? "text-background/70" : "text-muted-foreground"}`}>{label}</p>
      <p className="mt-1 break-all text-lg font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function ToolHeader({ title, description }: { title: string; description: string }) {
  return (
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription className="leading-6">{description}</CardDescription>
    </CardHeader>
  );
}

function LengthScaleTool({ precision }: { precision: number }) {
  const [drawingLength, setDrawingLength] = useState(32);
  const [scale, setScale] = useState(100);
  const actualMeters = (drawingLength / 1000) * scale;

  return (
    <Card>
      <ToolHeader title="축척 계산기" description="도면의 길이와 축척을 입력해 실제 길이를 계산합니다. 눈금자를 움직여 도면 길이를 조절할 수 있습니다." />
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="drawing-length">도면 길이 (mm)</Label>
            <Input id="drawing-length" type="number" min={0.1} max={200} step={0.1} value={drawingLength} onChange={(event) => setDrawingLength(Math.max(0.1, event.target.valueAsNumber || 0.1))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="drawing-scale">축척 (1 : N)</Label>
            <Input id="drawing-scale" type="number" min={1} max={10000} step={1} value={scale} onChange={(event) => setScale(Math.max(1, event.target.valueAsNumber || 1))} />
          </div>
        </div>

        <div className="space-y-5 rounded-xl border bg-muted/20 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-medium">도면 눈금자</p>
            <p className="text-sm text-muted-foreground">현재 {formatConvertedValue(drawingLength, precision)} mm</p>
          </div>
          <div className="relative h-14 border-b-2 border-foreground/70 bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(10%_-_1px),color-mix(in_oklab,var(--foreground)_35%,transparent)_calc(10%_-_1px),color-mix(in_oklab,var(--foreground)_35%,transparent)_10%)]">
            <div className="absolute inset-x-0 bottom-0 flex justify-between pb-2 text-[10px] text-muted-foreground">
              <span>0</span><span>40</span><span>80</span><span>120</span><span>160</span><span>200mm</span>
            </div>
          </div>
          <input aria-label="도면 길이 조절" type="range" min={1} max={200} step={0.5} value={drawingLength} onChange={(event) => setDrawingLength(Number(event.target.value))} className="w-full accent-foreground" />
          <div className="flex items-center justify-center rounded-lg bg-background px-4 py-3 text-center text-sm">
            <span className="font-medium">도면 {formatConvertedValue(drawingLength, precision)} mm</span>
            <span className="mx-3 text-muted-foreground">×</span>
            <span className="font-medium">축척 {formatConvertedValue(scale, 0)}</span>
            <span className="mx-3 text-muted-foreground">=</span>
            <span className="font-semibold">실제 {formatConvertedValue(actualMeters, precision)} m</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <ResultItem label="실제 길이" value={`${formatConvertedValue(actualMeters, precision)} m`} emphasis />
          <ResultItem label="센티미터" value={`${formatConvertedValue(actualMeters * 100, precision)} cm`} />
          <ResultItem label="피트" value={`${formatConvertedValue(actualMeters / 0.3048, precision)} ft`} />
        </div>
      </CardContent>
    </Card>
  );
}

type WeightUnit = "g" | "kg" | "oz" | "lb";
interface WeightItem { id: number; name: string; weight: number; unit: WeightUnit; count: number; }

function weightToKilograms(weight: number, unit: WeightUnit) {
  const factors: Record<WeightUnit, number> = { g: 0.001, kg: 1, oz: 0.028349523125, lb: 0.45359237 };
  return weight * factors[unit];
}

function WeightSumTool({ precision }: { precision: number }) {
  const [items, setItems] = useState<WeightItem[]>([
    { id: 1, name: "항목 1", weight: 500, unit: "g", count: 2 },
    { id: 2, name: "항목 2", weight: 1.2, unit: "kg", count: 1 },
  ]);
  const [shareCount, setShareCount] = useState(4);
  const totalKilograms = items.reduce((sum, item) => sum + weightToKilograms(item.weight, item.unit) * item.count, 0);

  const updateItem = (id: number, patch: Partial<WeightItem>) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const addItem = () => setItems((current) => [...current, { id: Math.max(0, ...current.map((item) => item.id)) + 1, name: `항목 ${current.length + 1}`, weight: 100, unit: "g", count: 1 }]);
  const removeItem = (id: number) => setItems((current) => current.length > 1 ? current.filter((item) => item.id !== id) : current);

  return (
    <Card>
      <ToolHeader title="무게 합산·배분" description="여러 물건이나 재료의 무게와 수량을 더하고, 원하는 개수만큼 균등하게 나눕니다." />
      <CardContent className="space-y-5">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="grid gap-2 rounded-xl border bg-muted/20 p-3 sm:grid-cols-[1.3fr_1fr_110px_80px_36px] sm:items-end">
              <div className="space-y-1.5"><Label htmlFor={`weight-name-${item.id}`}>항목</Label><Input id={`weight-name-${item.id}`} value={item.name} onChange={(event) => updateItem(item.id, { name: event.target.value })} /></div>
              <div className="space-y-1.5"><Label htmlFor={`weight-value-${item.id}`}>무게</Label><Input id={`weight-value-${item.id}`} type="number" min={0} step="any" value={item.weight} onChange={(event) => updateItem(item.id, { weight: Math.max(0, event.target.valueAsNumber || 0) })} /></div>
              <div className="space-y-1.5"><Label>단위</Label><Select value={item.unit} onValueChange={(unit: WeightUnit) => updateItem(item.id, { unit })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="g">그램</SelectItem><SelectItem value="kg">킬로그램</SelectItem><SelectItem value="oz">온스</SelectItem><SelectItem value="lb">파운드</SelectItem></SelectContent></Select></div>
              <div className="space-y-1.5"><Label htmlFor={`weight-count-${item.id}`}>수량</Label><Input id={`weight-count-${item.id}`} type="number" min={1} step={1} value={item.count} onChange={(event) => updateItem(item.id, { count: Math.max(1, Math.trunc(event.target.valueAsNumber || 1)) })} /></div>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(item.id)} disabled={items.length === 1} aria-label={`${item.name} 삭제`}><Trash2 /></Button>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addItem}><Plus />항목 추가</Button>

        <div className="space-y-2 rounded-xl border p-4">
          <div className="flex items-center justify-between gap-4"><Label htmlFor="share-count">균등 배분 개수</Label><Input id="share-count" type="number" min={1} step={1} value={shareCount} onChange={(event) => setShareCount(Math.max(1, Math.trunc(event.target.valueAsNumber || 1)))} className="w-24" /></div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            {items.map((item) => {
              const ratio = totalKilograms ? (weightToKilograms(item.weight, item.unit) * item.count / totalKilograms) * 100 : 0;
              return <span key={item.id} className="inline-block h-full border-r border-background bg-blue-600/70" style={{ width: `${ratio}%` }} title={`${item.name} ${formatConvertedValue(ratio, 1)}%`} />;
            })}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <ResultItem label="전체 무게" value={`${formatConvertedValue(totalKilograms, precision)} kg`} emphasis />
          <ResultItem label="그램" value={`${formatConvertedValue(totalKilograms * 1000, precision)} g`} />
          <ResultItem label={`1개당 (${shareCount}등분)`} value={`${formatConvertedValue((totalKilograms * 1000) / shareCount, precision)} g`} />
        </div>
      </CardContent>
    </Card>
  );
}

function TemperatureTool({ precision }: { precision: number }) {
  const [mode, setMode] = useState<"absolute" | "difference">("absolute");
  const [celsius, setCelsius] = useState(20);
  const min = mode === "absolute" ? -50 : -100;
  const max = mode === "absolute" ? 150 : 100;
  const fahrenheit = mode === "absolute" ? (celsius * 9) / 5 + 32 : (celsius * 9) / 5;
  const kelvin = mode === "absolute" ? celsius + 273.15 : celsius;
  const fill = ((Math.min(max, Math.max(min, celsius)) - min) / (max - min)) * 100;
  const presets = mode === "absolute" ? [-40, 0, 20, 37, 100] : [-20, -10, 5, 10, 20];

  return (
    <Card>
      <ToolHeader title="온도계·온도 차이" description="온도계를 움직여 세 온도 단위를 비교하고, 절대 온도와 온도 차이를 구분해 계산합니다." />
      <CardContent className="space-y-6">
        <div className="inline-flex rounded-lg border bg-muted/30 p-1">
          <button type="button" onClick={() => setMode("absolute")} className={`rounded-md px-4 py-2 text-sm transition-colors ${mode === "absolute" ? "bg-background font-medium shadow-sm" : "text-muted-foreground"}`}>절대 온도</button>
          <button type="button" onClick={() => setMode("difference")} className={`rounded-md px-4 py-2 text-sm transition-colors ${mode === "difference" ? "bg-background font-medium shadow-sm" : "text-muted-foreground"}`}>온도 차이</button>
        </div>

        <div className="grid gap-6 md:grid-cols-[100px_1fr] md:items-center">
          <div className="mx-auto flex h-56 w-20 flex-col items-center justify-end">
            <div className="relative h-44 w-6 rounded-t-full border-2 border-b-0 bg-muted/40">
              <div className="absolute bottom-0 left-1/2 w-3 -translate-x-1/2 rounded-t-full bg-gradient-to-t from-blue-600 to-red-500 transition-[height]" style={{ height: `${Math.max(3, fill)}%` }} />
            </div>
            <div className="relative -mt-1 h-16 w-16 rounded-full border-2 bg-background"><div className="absolute inset-2 rounded-full bg-blue-600" /></div>
          </div>
          <div className="space-y-5">
            <div className="space-y-2"><Label htmlFor="temperature-celsius">{mode === "absolute" ? "섭씨 온도" : "섭씨 온도 차이"} (°C)</Label><Input id="temperature-celsius" type="number" step="any" value={celsius} onChange={(event) => setCelsius(event.target.valueAsNumber || 0)} /></div>
            <input aria-label="온도 조절" type="range" min={min} max={max} step={0.5} value={Math.min(max, Math.max(min, celsius))} onChange={(event) => setCelsius(Number(event.target.value))} className="w-full accent-blue-600" />
            <div className="flex flex-wrap gap-2">{presets.map((preset) => <Button key={preset} type="button" variant="outline" size="sm" onClick={() => setCelsius(preset)}>{preset}°C</Button>)}</div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <ResultItem label="섭씨" value={`${formatConvertedValue(celsius, precision)} °C`} emphasis />
          <ResultItem label="화씨" value={`${formatConvertedValue(fahrenheit, precision)} °F`} />
          <ResultItem label={mode === "absolute" ? "켈빈" : "켈빈 온도 차이"} value={`${formatConvertedValue(kelvin, precision)} K`} />
        </div>
      </CardContent>
    </Card>
  );
}

type DimensionUnit = "m" | "cm" | "ft";
const dimensionFactors: Record<DimensionUnit, number> = { m: 1, cm: 0.01, ft: 0.3048 };

function AreaRectangleTool({ precision }: { precision: number }) {
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(6);
  const [unit, setUnit] = useState<DimensionUnit>("m");
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const widthPixels = Math.max(8, Math.min(240, (width / 20) * 240));
  const heightPixels = Math.max(8, Math.min(150, (height / 20) * 150));
  const factor = dimensionFactors[unit];
  const widthMeters = width * factor;
  const heightMeters = height * factor;
  const areaSquareMeters = widthMeters * heightMeters;
  const perimeterMeters = (widthMeters + heightMeters) * 2;

  const resizeFromPointer = (event: React.PointerEvent<SVGCircleElement>) => {
    if (!draggingRef.current || !svgRef.current) return;
    const bounds = svgRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 320;
    const y = ((event.clientY - bounds.top) / bounds.height) * 220;
    setWidth(Number(Math.max(0.5, Math.min(20, ((x - 35) / 240) * 20)).toFixed(1)));
    setHeight(Number(Math.max(0.5, Math.min(20, ((190 - y) / 150) * 20)).toFixed(1)));
  };

  return (
    <Card>
      <ToolHeader title="드래그 면적 계산기" description="직사각형의 오른쪽 위 손잡이를 끌거나 가로·세로를 입력해 면적과 둘레를 계산합니다." />
      <CardContent className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-xl border bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:20px_20px]">
            <svg ref={svgRef} viewBox="0 0 320 220" className="h-auto w-full touch-none" role="img" aria-label={`가로 ${width}${unit}, 세로 ${height}${unit} 직사각형`}>
              <rect x="35" y={190 - heightPixels} width={widthPixels} height={heightPixels} rx="4" className="fill-blue-600/20 stroke-blue-600" strokeWidth="2" />
              <line x1="35" y1="198" x2={35 + widthPixels} y2="198" className="stroke-foreground/40" strokeWidth="1" />
              <text x={35 + widthPixels / 2} y="213" textAnchor="middle" className="fill-foreground text-[11px]">{width} {unit}</text>
              <text x="25" y={190 - heightPixels / 2} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[11px]" transform={`rotate(-90 25 ${190 - heightPixels / 2})`}>{height} {unit}</text>
              <circle
                cx={35 + widthPixels}
                cy={190 - heightPixels}
                r="9"
                className={`cursor-nwse-resize fill-blue-600 stroke-background ${dragging ? "drop-shadow-md" : ""}`}
                strokeWidth="3"
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  draggingRef.current = true;
                  setDragging(true);
                }}
                onPointerMove={resizeFromPointer}
                onPointerUp={() => {
                  draggingRef.current = false;
                  setDragging(false);
                }}
                onPointerCancel={() => {
                  draggingRef.current = false;
                  setDragging(false);
                }}
              />
            </svg>
          </div>
          <div className="space-y-4">
            <div className="space-y-2"><Label>길이 단위</Label><Select value={unit} onValueChange={(value: DimensionUnit) => setUnit(value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="m">미터 (m)</SelectItem><SelectItem value="cm">센티미터 (cm)</SelectItem><SelectItem value="ft">피트 (ft)</SelectItem></SelectContent></Select></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label htmlFor="area-width">가로</Label><Input id="area-width" type="number" min={0.1} step={0.1} value={width} onChange={(event) => setWidth(Math.max(0.1, event.target.valueAsNumber || 0.1))} /></div>
              <div className="space-y-2"><Label htmlFor="area-height">세로</Label><Input id="area-height" type="number" min={0.1} step={0.1} value={height} onChange={(event) => setHeight(Math.max(0.1, event.target.valueAsNumber || 0.1))} /></div>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">손잡이 드래그 범위는 0.5~20{unit}입니다. 입력란에는 더 큰 값도 직접 입력할 수 있습니다.</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ResultItem label="면적" value={`${formatConvertedValue(areaSquareMeters, precision)} m²`} emphasis />
          <ResultItem label="평" value={`${formatConvertedValue(areaSquareMeters / (400 / 121), precision)} 평`} />
          <ResultItem label="제곱피트" value={`${formatConvertedValue(areaSquareMeters / 0.09290304, precision)} ft²`} />
          <ResultItem label="둘레" value={`${formatConvertedValue(perimeterMeters, precision)} m`} />
        </div>
      </CardContent>
    </Card>
  );
}

function VolumeContainerTool({ precision }: { precision: number }) {
  const [shape, setShape] = useState<"box" | "cylinder">("box");
  const [unit, setUnit] = useState<"cm" | "m">("cm");
  const [width, setWidth] = useState(60);
  const [depth, setDepth] = useState(30);
  const [height, setHeight] = useState(40);
  const [radius, setRadius] = useState(20);
  const [fillPercent, setFillPercent] = useState(70);
  const factor = unit === "cm" ? 0.01 : 1;
  const totalCubicMeters = shape === "box"
    ? width * factor * depth * factor * height * factor
    : Math.PI * Math.pow(radius * factor, 2) * height * factor;
  const totalLiters = totalCubicMeters * 1000;
  const filledLiters = totalLiters * (fillPercent / 100);
  const remainingLiters = totalLiters - filledLiters;

  return (
    <Card>
      <ToolHeader title="용기 부피·채움량" description="용기의 형태와 치수를 입력하고 수위를 움직여 전체 용량, 현재 양, 남은 용량을 계산합니다." />
      <CardContent className="space-y-6">
        <div className="inline-flex rounded-lg border bg-muted/30 p-1">
          <button type="button" onClick={() => setShape("box")} className={`rounded-md px-4 py-2 text-sm transition-colors ${shape === "box" ? "bg-background font-medium shadow-sm" : "text-muted-foreground"}`}>직육면체</button>
          <button type="button" onClick={() => setShape("cylinder")} className={`rounded-md px-4 py-2 text-sm transition-colors ${shape === "cylinder" ? "bg-background font-medium shadow-sm" : "text-muted-foreground"}`}>원통</button>
        </div>

        <div className="grid gap-7 md:grid-cols-[180px_1fr] md:items-center">
          <div className="mx-auto flex flex-col items-center gap-3">
            <div className={`relative h-56 w-36 overflow-hidden border-2 border-foreground/60 bg-muted/20 ${shape === "cylinder" ? "rounded-[50%/10%]" : "rounded-lg"}`}>
              <div className="absolute inset-x-0 bottom-0 bg-blue-500/65 transition-[height] duration-300" style={{ height: `${fillPercent}%` }}>
                <div className="h-2 -translate-y-1 rounded-[50%] bg-blue-400/80" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">{fillPercent}%</div>
            </div>
            <input aria-label="용기 수위" type="range" min={0} max={100} step={1} value={fillPercent} onChange={(event) => setFillPercent(Number(event.target.value))} className="w-40 accent-blue-600" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2"><Label>치수 단위</Label><Select value={unit} onValueChange={(value: "cm" | "m") => setUnit(value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="cm">센티미터 (cm)</SelectItem><SelectItem value="m">미터 (m)</SelectItem></SelectContent></Select></div>
            {shape === "box" ? (
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label htmlFor="volume-width">가로</Label><Input id="volume-width" type="number" min={0.1} step="any" value={width} onChange={(event) => setWidth(Math.max(0.1, event.target.valueAsNumber || 0.1))} /></div>
                <div className="space-y-2"><Label htmlFor="volume-depth">세로</Label><Input id="volume-depth" type="number" min={0.1} step="any" value={depth} onChange={(event) => setDepth(Math.max(0.1, event.target.valueAsNumber || 0.1))} /></div>
                <div className="space-y-2"><Label htmlFor="volume-height">높이</Label><Input id="volume-height" type="number" min={0.1} step="any" value={height} onChange={(event) => setHeight(Math.max(0.1, event.target.valueAsNumber || 0.1))} /></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label htmlFor="volume-radius">반지름</Label><Input id="volume-radius" type="number" min={0.1} step="any" value={radius} onChange={(event) => setRadius(Math.max(0.1, event.target.valueAsNumber || 0.1))} /></div>
                <div className="space-y-2"><Label htmlFor="volume-cylinder-height">높이</Label><Input id="volume-cylinder-height" type="number" min={0.1} step="any" value={height} onChange={(event) => setHeight(Math.max(0.1, event.target.valueAsNumber || 0.1))} /></div>
              </div>
            )}
            <div className="space-y-2"><div className="flex justify-between text-sm"><Label htmlFor="fill-percent">채움 비율</Label><span className="font-medium">{fillPercent}%</span></div><Input id="fill-percent" type="number" min={0} max={100} step={1} value={fillPercent} onChange={(event) => setFillPercent(Math.min(100, Math.max(0, event.target.valueAsNumber || 0)))} /></div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ResultItem label="전체 용량" value={`${formatConvertedValue(totalLiters, precision)} L`} emphasis />
          <ResultItem label="현재 채움량" value={`${formatConvertedValue(filledLiters, precision)} L`} />
          <ResultItem label="남은 용량" value={`${formatConvertedValue(remainingLiters, precision)} L`} />
          <ResultItem label="미국 갤런" value={`${formatConvertedValue(totalLiters / 3.785411784, precision)} gal`} />
        </div>
      </CardContent>
    </Card>
  );
}

export default function CategoryTool({ categorySlug, precision }: CategoryToolProps) {
  const tool = useMemo(() => {
    switch (categorySlug) {
      case "length-converter": return <LengthScaleTool precision={precision} />;
      case "weight-converter": return <WeightSumTool precision={precision} />;
      case "temperature-converter": return <TemperatureTool precision={precision} />;
      case "area-converter": return <AreaRectangleTool precision={precision} />;
      case "volume-converter": return <VolumeContainerTool precision={precision} />;
    }
  }, [categorySlug, precision]);

  return (
    <section aria-labelledby="category-tool-title" className="space-y-4">
      <div>
        <p className="text-sm font-medium text-foreground">계산 도구</p>
        <h2 id="category-tool-title" className="mt-1 text-2xl font-semibold tracking-tight">분야별 계산 도구</h2>
        <p className="mt-1 text-sm text-muted-foreground">단순 변환을 넘어 실제 상황에 필요한 값을 직접 계산해 보세요.</p>
      </div>
      {tool}
    </section>
  );
}
