import { ArrowLeftIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

export default function Index() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2 rounded-md border border-night-800 bg-[#131D2E] xl:flex-row xl:space-x-2 xl:space-y-0">
      <ArrowLeftIcon className="hidden h-4 w-4 animate-bounce-right-to-left text-night-600 xl:block" />
      <ArrowUpIcon className="block h-4 w-4 animate-bounce-bottom-to-top text-night-600 xl:hidden" />
      <p className="hidden text-night-500 xl:block">
        Select a pool from the left
      </p>
      <p className="block text-night-500 xl:hidden">
        Select a pool from the top
      </p>
    </div>
  );
}
