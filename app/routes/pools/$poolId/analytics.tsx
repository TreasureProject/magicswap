import { ArrowRightIcon } from "@heroicons/react/solid";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { LineGraph } from "~/components/Graph";
import { Pill } from "~/components/Pill";

const transactions = [
  {
    type: "Swapped MAGIC/SMOL",
    amount: "$1000",
    in: "SMOL",
    inPrice: "4 SMOL",
    from: "MAGIC",
    fromPrice: "0.1 MAGIC",
    txnId: "2x3y...QfD",
    date: "1 day ago",
  },
  {
    type: "Swapped MAGIC/SMOL",
    amount: "$983.44",
    in: "MAGIC",
    inPrice: "4 MAGIC",
    from: "SMOL",
    fromPrice: "0.1 SMOL",
    txnId: "2x3y...QfD",
    date: "1 day ago",
  },
  {
    type: "Swapped MAGIC/SMOL",
    amount: "$997",
    in: "MAGIC",
    inPrice: "4 MAGIC",
    from: "SMOL",
    fromPrice: "0.1 SMOL",
    txnId: "2x3y...QfD",
    date: "1 day ago",
  },
];

type LoaderData = {
  randomNumber: number;
};

export const loader: LoaderFunction = async () => {
  const randomNumber = Math.floor(Math.random() * 6);

  return json<LoaderData>({ randomNumber });
};

export default function Analytics() {
  const { randomNumber } = useLoaderData<LoaderData>();

  return (
    <div>
      <div className="flex flex-col divide-y divide-gray-700 sm:flex-row sm:divide-y-0 sm:divide-x">
        {Array.from({ length: 2 }).map(() => (
          // eslint-disable-next-line react/jsx-key
          <div className="grid flex-1 grid-cols-6 p-4">
            <p className="col-span-4 text-xs text-gray-500">Locked</p>
            <p className="col-span-2 text-xs text-gray-500">Past 24h</p>
            <h3 className="col-span-4 font-semibold">Liquidity</h3>
            <p className="col-span-2 font-semibold">$34,349,390</p>
            <div className="col-span-6 h-32">
              <LineGraph
                gradient={{
                  from: "#96e4df",
                  to: "#21d190",
                }}
                data={[
                  {
                    x: 0.4,
                    y: 0.5,
                  },
                  {
                    x: 0.6,
                    y: 0.4,
                  },
                  {
                    x: 0.7,
                    y: 0.5,
                  },
                  {
                    x: 0.9,
                    y: 0.6,
                  },
                  {
                    x: 1.2,
                    y: 0.5,
                  },
                  {
                    x: 1.6,
                    y: 0.2,
                  },
                  {
                    x: 2.0,
                    y: 0.9,
                  },
                  {
                    x: 2.4,
                    y: 0.6,
                  },
                  {
                    x: 2.8,
                    y: 0.7,
                  },
                ]}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="overflow-hidden border-t border-gray-700 sm:-mx-6 md:mx-0">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-[0.6rem] font-semibold text-gray-400 sm:pl-6 sm:text-xs"
              >
                Swap
              </th>
              <th
                scope="col"
                className="table-cell px-3 py-3.5 text-left text-[0.6rem] font-semibold text-gray-400 sm:text-xs"
              >
                Amount
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-[0.6rem] font-semibold text-gray-400 sm:table-cell sm:text-xs"
              >
                In
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-[0.6rem] font-semibold text-gray-400 sm:table-cell sm:text-xs"
              >
                From
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-[0.6rem] font-semibold text-gray-400 sm:text-xs"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.amount}>
                <td className="whitespace-nowrap py-2.5 pl-4 pr-3 text-sm font-medium sm:pl-6">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <Pill text={transaction.in} enumValue={randomNumber} />
                    <ArrowRightIcon className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                    <Pill text={transaction.from} enumValue={randomNumber} />
                  </div>
                </td>
                <td className="table-cell whitespace-nowrap px-3 py-2.5 text-[0.6rem] font-semibold text-gray-200 sm:text-sm">
                  {transaction.amount}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-2.5 text-sm text-gray-400 sm:table-cell">
                  {transaction.inPrice}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-2.5 text-sm text-gray-400 sm:table-cell">
                  {transaction.fromPrice}
                </td>
                <td className="whitespace-nowrap px-3 py-2.5 text-[0.6rem] text-gray-500 sm:text-sm">
                  {transaction.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
