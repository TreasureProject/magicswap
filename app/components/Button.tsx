export const Button = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="inline-flex w-full items-center justify-center rounded border border-transparent bg-red-600 px-2.5 py-3 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-lg"
      {...props}
    >
      {children}
    </button>
  );
};
