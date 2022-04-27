import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...buttonProps }: Props) => {
  const { disabled } = buttonProps;
  return (
    <button
      className={clsx(
        "inline-flex w-full items-center justify-center rounded border border-transparent bg-red-600 px-2.5 py-3 text-xs font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-lg",
        className,
        disabled ? "opacity-50" : "hover:bg-red-700"
      )}
      {...buttonProps}
    />
  );
};
