import * as React from "react";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

const InputElement = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 dark:text-black",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

InputElement.displayName = "InputElement";

interface InputProps
  extends React.ComponentPropsWithoutRef<typeof InputElement> {
  form: any;
  label: string;
  placeholder: string;
  name: string; // Required to bind the input to the form field
}

export function Input({
  form,
  label,
  placeholder,
  name,
  ...props
}: InputProps) {
  console.log("hello");
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputElement placeholder={placeholder} {...field} {...props} />
          </FormControl>
          {/* Uncomment if a description is needed */}
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
