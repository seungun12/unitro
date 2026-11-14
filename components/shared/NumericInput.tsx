"use client";

import { useEffect, useRef } from "react";
import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";

interface NumericInputProps extends Omit<ComponentProps<typeof Input>, "type" | "value" | "defaultValue" | "onChange" | "onBlur"> {
  value: number;
  onValueChange: (value: number) => void;
  emptyValue?: number;
  integer?: boolean;
}

/** Keep unfinished edits in the native input until they can be committed. */
export default function NumericInput({ value, onValueChange, emptyValue, integer = false, min, max, ...props }: NumericInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const minimum = min === undefined ? -Infinity : Number(min);
  const maximum = max === undefined ? Infinity : Number(max);

  useEffect(() => {
    const input = inputRef.current;
    if (input && document.activeElement !== input) input.value = String(value);
  }, [value]);

  return (
    <Input
      {...props}
      ref={inputRef}
      type="number"
      min={min}
      max={max}
      defaultValue={value}
      onChange={(event) => {
        const input = event.currentTarget;
        if (input.value === "" && !input.validity.badInput && emptyValue !== undefined) {
          onValueChange(emptyValue);
          return;
        }
        const next = input.valueAsNumber;
        if (Number.isFinite(next) && next >= minimum && next <= maximum && (!integer || Number.isInteger(next))) {
          onValueChange(next);
        }
      }}
      onBlur={(event) => {
        const input = event.currentTarget;
        const parsed = input.valueAsNumber;
        const next = Number.isFinite(parsed) ? parsed : (emptyValue ?? value);
        const normalized = Math.min(maximum, Math.max(minimum, integer ? Math.trunc(next) : next));
        input.value = String(normalized);
        onValueChange(normalized);
      }}
    />
  );
}
