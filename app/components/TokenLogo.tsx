import React from "react";

import type { Token } from "~/types";

export const TokenLogo = ({
  token,
  ...imgProps
}: {
  token: Token;
} & React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src={
      token.image ??
      "https://raw.githubusercontent.com/sushiswap/icons/master/token/unknown.png"
    }
    alt={token.symbol}
    {...imgProps}
  />
);
