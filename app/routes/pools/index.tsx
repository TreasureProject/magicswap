import { ArrowLeftIcon, ArrowUpIcon } from "@heroicons/react/outline";
import { useCatch, useParams } from "@remix-run/react";

export default function Manage() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
      <ArrowLeftIcon className="hidden h-4 w-4 animate-bounce-right-to-left text-gray-600 lg:block" />
      <ArrowUpIcon className="block h-4 w-4 animate-bounce-bottom-to-top text-gray-600 lg:hidden" />
      <p className="hidden text-gray-500 lg:block">
        Select a pool from the left
      </p>
      <p className="block text-gray-500 lg:hidden">
        Select a pool from the top
      </p>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-[0.6rem] text-gray-500 sm:text-base">
          {params.poolId} not found.
        </p>
      </div>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}
