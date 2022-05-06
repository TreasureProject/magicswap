import { forwardRef } from "react";
import type { ElementRef, ComponentProps } from "react";
import { XIcon } from "@heroicons/react/outline";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import cn from "clsx";

export const PopoverTrigger = PopoverPrimitive.Trigger;

export const Popover = PopoverPrimitive.Popover;

export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentProps<typeof PopoverPrimitive.Content>
>(({ children, className, ...props }, forwardRef) => (
  <PopoverPrimitive.Content
    align="center"
    sideOffset={5}
    className={cn(
      "bg-gray-900 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
      className
    )}
    {...props}
    ref={forwardRef}
  >
    <PopoverPrimitive.Arrow offset={7} className="fill-current text-gray-900" />
    {children}
    <PopoverPrimitive.Close className="absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
      <XIcon className="h-4 w-4 text-gray-500 hover:text-gray-400" />
    </PopoverPrimitive.Close>
  </PopoverPrimitive.Content>
));

PopoverContent.displayName = "PopoverContent";
