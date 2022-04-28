import React from "react";
import { useRouteData } from "remix-utils";
import type { RootLoaderData } from "~/root";

export const TokenLogo = ({
  tokenAddress,
  ...imgProps
}: {
  tokenAddress: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) => {
  const tokenImageListData = useRouteData<RootLoaderData>("root");

  const tokenImageList = tokenImageListData?.tokenImageList;

  const tokenImage =
    tokenImageList?.find(
      (tokenImage) => tokenImage.address.toLowerCase() === tokenAddress
    )?.logoURI ??
    "https://raw.githubusercontent.com/sushiswap/icons/master/token/unknown.png";

  return <img src={tokenImage} {...imgProps} />;
};
