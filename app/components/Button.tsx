import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...buttonProps }: Props) => {
  const { disabled } = buttonProps;
  return (
    <button
      className={clsx(
        "inline-flex w-full items-center justify-center rounded-button border border-transparent bg-ruby-900 px-6.5 py-3 text-xs font-semibold text-white shadow-sm ring-offset-ruby-800 focus:outline-none focus:ring-2 focus:ring-ruby-500 focus:ring-offset-2 sm:text-lg",
        className,
        disabled ? "opacity-50" : "hover:bg-ruby-1000"
      )}
      {...buttonProps}
    />
  );
};
