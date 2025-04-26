"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary-blue ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-primary-foreground")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

type ControlledCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  isRequired?: boolean;
  error?: boolean;
  checked?: boolean;
};

function ControlledCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  isRequired,
  error,
  ...inputProps
}: ControlledCheckboxProps<TFieldValues, TName>) {
  const {
    field: { value, onChange, ref },
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        value={value}
        {...inputProps}
        checked={value}
        onCheckedChange={onChange}
        ref={ref}
        className="peer h-4 w-4 shrink-0 rounded-sm border border-primary-blue"
      />
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-primary-foreground">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {fieldError || error ? (
        <p className="text-sm text-red-500">{fieldError?.message || error}</p>
      ) : null}
    </div>
  );
}

export { Checkbox, ControlledCheckbox };
