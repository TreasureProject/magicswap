import type { ReactNode } from "react";

type Props = {
  title?: ReactNode;
  message?: ReactNode;
};

export const ToastContent = ({ title, message }: Props) => {
  return (
    <>
      {title ? (
        <p className="truncate text-sm font-medium text-white">{title}</p>
      ) : null}
      {message ? (
        <p className="mt-1 text-sm text-night-500">{message}</p>
      ) : null}
    </>
  );
};
