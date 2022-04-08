import { ArrowForwardIcon, StarIcon } from "~/components/Icons";

export default function Index() {
  return (
    <div className="flex items-center flex-col">
      <StarIcon className="w-8 h-8" />
      {/* Make this dynamic */}
      <h2 className="text-base sm:text-lg font-bold mt-14">
        Swap MAGIC to Token
      </h2>
      <p className="text-gray-500 text-sm sm:text-base">
        The easiest way to swap your tokens
      </p>
      <div className="flex w-full mt-14">
        <div className="flex-1 p-2 bg-gray-800 rounded-md">
          <div>
            <label htmlFor="balance" className="sr-only">
              Balance
            </label>
            <div className="mt-1 border-b relative border-gray-600 focus-within:border-red-600">
              <div className="absolute inset-y-0 left-0 pl-3 pb-4 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="balance"
                id="balance"
                className="block pl-7 pr-12 w-full pb-6 border-0 border-b border-transparent bg-gray-800 focus:border-red-600 focus:ring-0 sm:text-lg"
                placeholder="0.00"
              />
              <div className="absolute left-0 pl-3 bottom-2 flex flex-col items-end pointer-events-none">
                <span className="text-gray-500 text-xs" id="price-currency">
                  ~ $123.45
                </span>
              </div>
              <div className="absolute bottom-2 right-0 pr-3 flex flex-col items-end pointer-events-none">
                <span
                  className="text-gray-200 sm:text-sm mb-1"
                  id="price-currency"
                >
                  MAGIC
                </span>
                <span className="text-gray-500 text-xs" id="price-currency">
                  Balance: 123123
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-36 flex items-center justify-center">
          <ArrowForwardIcon className="w-6 h-6" />
        </div>
        <div className="flex-1 p-2 bg-gray-800 rounded-md">
          <div>
            <label htmlFor="balance" className="sr-only">
              Balance
            </label>
            <div className="mt-1 border-b relative border-gray-600 focus-within:border-red-600">
              <div className="absolute inset-y-0 left-0 pl-3 pb-4 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="balance"
                id="balance"
                className="block pl-7 pr-12 w-full pb-6 border-0 border-b border-transparent bg-gray-800 focus:border-red-600 focus:ring-0 sm:text-lg"
                placeholder="0.00"
              />
              <div className="absolute left-0 pl-3 bottom-2 flex flex-col items-end pointer-events-none">
                <span className="text-gray-500 text-xs" id="price-currency">
                  ~ $123.45
                </span>
              </div>
              <div className="absolute bottom-2 right-0 pr-3 flex flex-col items-end pointer-events-none">
                <span
                  className="text-gray-200 sm:text-sm mb-1"
                  id="price-currency"
                >
                  TOKEN
                </span>
                <span className="text-gray-500 text-xs" id="price-currency">
                  Balance: 123123
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
