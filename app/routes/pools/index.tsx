import { ArrowLeftIcon, ArrowUpIcon } from "@heroicons/react/outline";

export default function Index() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2 xl:flex-row xl:space-y-0 xl:space-x-2">
      <ArrowLeftIcon className="hidden h-4 w-4 animate-bounce-right-to-left text-gray-600 xl:block" />
      <ArrowUpIcon className="block h-4 w-4 animate-bounce-bottom-to-top text-gray-600 xl:hidden" />
      <p className="hidden text-gray-500 xl:block">
        Select a pool from the left
      </p>
      <p className="block text-gray-500 xl:hidden">
        Select a pool from the top
      </p>
    </div>
  );
}
