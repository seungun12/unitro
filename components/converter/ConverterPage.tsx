"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, MousePointerClick } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CopyButton from "@/components/shared/CopyButton";
import NumericInput from "@/components/shared/NumericInput";
import CategoryTool from "@/components/converter/CategoryTool";
import { convertUnitValue, formatConvertedValue, formatInputValue, getConverterCategory } from "@/lib/converters/unit-conversions";
import { ConverterSlug } from "@/types/converter";

interface ConverterPageProps { categorySlug: ConverterSlug; }
type InputSide = "left" | "right";

export default function ConverterPage({ categorySlug }: ConverterPageProps) {
  const category = getConverterCategory(categorySlug)!;
  const [activeInput, setActiveInput] = useState("1");
  const [activeSide, setActiveSide] = useState<InputSide>("left");
  const [precision, setPrecision] = useState(2);
  const [leftUnitId, setLeftUnitId] = useState(category.units[0].id);
  const [rightUnitId, setRightUnitId] = useState(category.units[1].id);
  const leftUnit = category.units.find((unit) => unit.id === leftUnitId) ?? category.units[0];
  const rightUnit = category.units.find((unit) => unit.id === rightUnitId) ?? category.units[1];

  const commonConversions = useMemo(
    () => leftUnit.commonValues.map((value, index) => {
      const leftValue = Number(formatInputValue(value, precision));
      return {
        id: `${leftUnit.id}-${index}`,
        leftValue,
        rightValue: convertUnitValue(leftValue, leftUnit, rightUnit),
      };
    }),
    [leftUnit, precision, rightUnit]
  );

  const conversion = useMemo(() => {
    const trimmedInput = activeInput.trim();
    if (!trimmedInput) return { convertedValue: "", message: "" };
    const numericValue = Number(trimmedInput);
    if (!Number.isFinite(numericValue)) return { convertedValue: "", message: "올바른 숫자를 입력해 주세요." };
    if (numericValue < 0 && !category.allowsNegative) return { convertedValue: "", message: "0 이상의 값을 입력해 주세요." };
    const sourceUnit = activeSide === "left" ? leftUnit : rightUnit;
    const targetUnit = activeSide === "left" ? rightUnit : leftUnit;
    return {
      convertedValue: formatInputValue(convertUnitValue(numericValue, sourceUnit, targetUnit), precision),
      message: "",
    };
  }, [activeInput, activeSide, category.allowsNegative, leftUnit, precision, rightUnit]);

  const leftValue = activeSide === "left" ? activeInput : conversion.convertedValue;
  const rightValue = activeSide === "right" ? activeInput : conversion.convertedValue;

  const handleSwap = () => {
    setLeftUnitId(rightUnit.id);
    setRightUnitId(leftUnit.id);
    setActiveSide((side) => side === "left" ? "right" : "left");
  };
  const handleInputChange = (side: InputSide, value: string) => {
    setActiveSide(side);
    setActiveInput(value);
  };
  const setInputFromNumber = (side: InputSide, value: number) => {
    setActiveSide(side);
    setActiveInput(formatInputValue(value, precision));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="tracking-tight">단위 선택</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleSwap}><ArrowLeftRight className="mr-2 h-4 w-4" />서로 바꾸기</Button>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <div className="space-y-2">
            <Label htmlFor="left-unit">A 단위</Label>
            <Select value={leftUnit.id} onValueChange={(unitId) => unitId !== rightUnit.id && setLeftUnitId(unitId)}>
              <SelectTrigger id="left-unit" className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>{category.units.filter((unit) => unit.id !== rightUnit.id).map((unit) => <SelectItem key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="hidden pb-2 text-center text-muted-foreground md:block">↔</div>
          <div className="space-y-2">
            <Label htmlFor="right-unit">B 단위</Label>
            <Select value={rightUnit.id} onValueChange={(unitId) => unitId !== leftUnit.id && setRightUnitId(unitId)}>
              <SelectTrigger id="right-unit" className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>{category.units.filter((unit) => unit.id !== leftUnit.id).map((unit) => <SelectItem key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-4 border-t pt-4 md:col-span-3">
            <div>
              <Label htmlFor="decimal-precision">소수점 정확도</Label>
              <p id="precision-help" className="mt-1 text-sm text-muted-foreground">계산값에 표시할 소수점 자릿수를 설정하세요.</p>
            </div>
            <div className="flex items-center gap-2">
              <NumericInput
                id="decimal-precision"
                min={0}
                max={10}
                step={1}
                integer
                value={precision}
                emptyValue={2}
                onValueChange={setPrecision}
                className="h-9 w-20 text-center"
                aria-describedby="precision-help"
              />
              <span className="text-sm text-muted-foreground">자리</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle className="text-lg">{leftUnit.label}</CardTitle>
            <CopyButton text={leftValue ? `${leftValue} ${leftUnit.symbol}` : ""} label="값 복사" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="left-value">값 ({leftUnit.symbol})</Label>
            <Input id="left-value" value={leftValue} onChange={(event) => handleInputChange("left", event.target.value)} inputMode="decimal" placeholder="값을 입력하세요" aria-describedby="conversion-help conversion-error" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle className="text-lg">{rightUnit.label}</CardTitle>
            <CopyButton text={rightValue ? `${rightValue} ${rightUnit.symbol}` : ""} label="값 복사" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="right-value">값 ({rightUnit.symbol})</Label>
            <Input id="right-value" value={rightValue} onChange={(event) => handleInputChange("right", event.target.value)} inputMode="decimal" placeholder="값을 입력하세요" aria-describedby="conversion-help conversion-error" />
          </CardContent>
        </Card>
      </div>
      <div className="-mt-2 px-1 text-sm" aria-live="polite">
        <p id="conversion-help" className="text-muted-foreground">어느 쪽 값을 수정해도 설정한 소수점 정확도로 반대쪽 값이 바로 계산됩니다.</p>
        {conversion.message && <p id="conversion-error" className="mt-1 text-destructive">{conversion.message}</p>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">자주 쓰는 변환값</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <MousePointerClick className="h-4 w-4" />
            원하는 값을 누르면 해당 입력란에 바로 적용됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-1/2 px-3">{leftUnit.label} ({leftUnit.symbol})</TableHead>
                  <TableHead className="w-1/2 px-3">{rightUnit.label} ({rightUnit.symbol})</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commonConversions.map(({ id, leftValue: commonLeftValue, rightValue: commonRightValue }) => (
                  <TableRow key={id}>
                    <TableCell className="p-0">
                      <button
                        type="button"
                        className="w-full px-3 py-3 text-left font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                        onClick={() => setInputFromNumber("left", commonLeftValue)}
                        aria-label={`${leftUnit.label} 입력란에 ${formatConvertedValue(commonLeftValue, precision)} ${leftUnit.symbol} 적용`}
                      >
                        {formatConvertedValue(commonLeftValue, precision)} <span className="text-muted-foreground">{leftUnit.symbol}</span>
                      </button>
                    </TableCell>
                    <TableCell className="p-0">
                      <button
                        type="button"
                        className="w-full px-3 py-3 text-left font-medium transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                        onClick={() => setInputFromNumber("right", commonRightValue)}
                        aria-label={`${rightUnit.label} 입력란에 ${formatConvertedValue(commonRightValue, precision)} ${rightUnit.symbol} 적용`}
                      >
                        {formatConvertedValue(commonRightValue, precision)} <span className="text-muted-foreground">{rightUnit.symbol}</span>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="pt-10 md:pt-14">
        <CategoryTool categorySlug={categorySlug} precision={precision} />
      </div>

      <section aria-labelledby="unit-guide-title" className="space-y-4">
        <div>
          <h2 id="unit-guide-title" className="text-2xl font-semibold tracking-tight">선택한 단위 알아보기</h2>
          <p className="mt-1 text-sm text-muted-foreground">현재 선택한 두 단위의 의미와 기준을 확인해 보세요.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { unit: leftUnit, role: "A 단위", otherUnit: rightUnit },
            { unit: rightUnit, role: "B 단위", otherUnit: leftUnit },
          ].map(({ unit, role, otherUnit }) => (
            <Card key={`${role}-${unit.id}`} className="gap-4">
              <CardHeader>
                <div className="mb-1 w-fit rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{role}</div>
                <CardTitle className="text-xl">{unit.label} <span className="font-normal text-muted-foreground">({unit.symbol})</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-6 text-muted-foreground">{unit.description}</p>
                <p className="border-t pt-4 text-sm font-medium">
                  1 {unit.symbol} = {formatConvertedValue(convertUnitValue(1, unit, otherUnit), precision)} {otherUnit.symbol}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
