import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import type { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { useUser } from "~/context/userContext";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  requiresConnect?: boolean;
};

export const Button = ({
  requiresConnect = false,
  className,
  disabled,
  onClick,
  children,
  ...buttonProps
}: Props) => {
  const { isConnected, unsupported } = useUser();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const isConnectButton = requiresConnect && (!isConnected || unsupported);
  const isDisabled = disabled && !isConnectButton;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isConnectButton) {
      if (unsupported) {
        openChainModal?.();
      } else {
        openConnectModal?.();
      }
    } else {
      onClick?.(e);
    }
  };

  return (
    <button
      className={twMerge(
        "inline-flex w-full items-center justify-center rounded-button border border-transparent bg-ruby-900 px-6.5 py-3 text-sm font-semibold text-white shadow-sm ring-offset-ruby-800 focus:outline-none focus:ring-2 focus:ring-ruby-500 focus:ring-offset-2 sm:text-lg",
        className,
        isDisabled ? "opacity-50" : "hover:bg-ruby-1000",
      )}
      disabled={isDisabled}
      onClick={handleClick}
      {...buttonProps}
    >
      {isConnectButton
        ? unsupported
          ? "Wrong Network"
          : "Connect Wallet"
        : children}
    </button>
  );
};
