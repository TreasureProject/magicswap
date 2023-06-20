import { Popover as ReactPopover, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

export const Popover = ReactPopover;

export const PopoverTrigger = Popover.Button;

type Props = {
  className?: string;
  children: ReactNode;
};

export const PopoverContent = ({ children, className }: Props) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-200"
    enterFrom="opacity-0 translate-y-1"
    enterTo="opacity-100 translate-y-0"
    leave="transition ease-in duration-150"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 translate-y-1"
  >
    <Popover.Panel
      // align="center"
      // sideOffset={5}
      className={twMerge("bg-night-900", className)}
    >
      {({ close }) => (
        <>
          {children}
          <button
            className="absolute right-3.5 top-3.5 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring focus-visible:ring-ruby-500 focus-visible:ring-opacity-75"
            onClick={() => close()}
          >
            <XMarkIcon className="h-4 w-4 text-night-500 hover:text-night-400" />
          </button>
        </>
      )}
    </Popover.Panel>
  </Transition>
);

PopoverContent.displayName = "PopoverContent";
