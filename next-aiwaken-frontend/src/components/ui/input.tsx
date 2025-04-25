"use client";

import * as React from "react";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            error && "border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

type ControlledInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  isRequired?: boolean;
  helperText?: string;
} & Omit<InputProps, "name">;

function ControlledInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  isRequired,
  helperText,
  type,
  ...inputProps
}: ControlledInputProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <div className="w-full">
          {label && (
            <label
              htmlFor={name}
              className="block text-sm font-medium text-primary-foreground mb-1"
            >
              {label}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          <Input
            style={{ zIndex: 99999 }}
            {...inputProps}
            id={name}
            type={type}
            onBlur={onBlur}
            onChange={(e) => {
              if (type === "file") {
                const files = e.target.files;
                if (files) {
                  onChange(files[0]);
                }
              } else {
                onChange(e.target.value);
              }
            }}
            ref={ref}
            error={error?.message}
            value={type === "file" ? undefined : value || ""}
          />
          {helperText && (
            <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
          )}
        </div>
      )}
    />
  );
}

export { Input, ControlledInput };