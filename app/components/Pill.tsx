import cn from "clsx";

const colors = {
  0: "bg-gray-100 text-gray-800",
  1: "bg-yellow-100 text-yellow-800",
  2: "bg-green-100 text-green-800",
  3: "bg-blue-100 text-blue-800",
  4: "bg-indigo-100 text-indigo-800",
  5: "bg-purple-100 text-purple-800",
} as { [key: number]: string };

export const Pill = ({
  text,
  enumValue,
}: {
  text: string;
  enumValue: number;
}) => {
  const className = cn(
    text === "MAGIC"
      ? "bg-red-100 text-red-800"
      : colors[enumValue] || colors[0],
    "inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 sm:text-xs text-[0.6rem]"
  );
  return <span className={className}>{text}</span>;
};
