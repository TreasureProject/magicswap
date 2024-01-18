export const createMetaTags = (
  title = "Magicswap | Powered by Treasure",
  description = "The gateway to the cross-game economy. Swap, pool, and earn tokens in the decentralized exchanged powered by Treasure and MAGIC.",
  image = "/img/banner.png",
) => [
  { title },
  { name: "description", content: description },
  { property: "og:type", content: "website" },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:image", content: image },
  { property: "twitter:card", content: "summary_large_image" },
  { property: "twitter:title", content: title },
  { property: "twitter:description", content: description },
  { property: "twitter:image", content: image },
];
