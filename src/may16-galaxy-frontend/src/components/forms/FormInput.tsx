import { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Input, InputProps } from "@/components/daisyui";

import { cn } from "@/helpers/utils/cn";

type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<InputProps, "name"> & {
  control: Control<TFieldValues>;
  name: TName;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder,
  className,
  startIcon,
  endIcon,
  ...other
}: FormInputProps<TFieldValues>) => {
  const fieldState = {}
  const field = {}
  
  return (
    <>
      <div
        className={cn(
          "form-control flex flex-row items-center rounded-box border border-base-content/20 px-3",
          {
            "border-error/60": fieldState.invalid,
          },
        )}>
        {startIcon}
        <Input
          {...field}
          {...other}
          placeholder={fieldState.invalid ? " " : placeholder}
          className={cn(className, "transition-all", {
            " focus:!-outline-offset-1 focus:outline-red-500": fieldState.invalid,
          })}
        />
        {endIcon}
      </div>
      {fieldState.invalid && <span className="mt-1 text-sm text-error">{fieldState.error?.message}</span>}
    </>
  );
};

export default FormInput;
