import cn from "clsx";

const colors = {
  0: "bg-night-100 text-night-800",
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
      ? "bg-ruby-100 text-ruby-800"
      : colors[enumValue] || colors[0],
    "inline-flex items-center rounded-md bg-night-100 px-1.5 py-0.5 md:px-2.5 md:py-0.5 xl:text-xs text-[0.4rem]"
  );
  return <span className={className}>{text}</span>;
};
