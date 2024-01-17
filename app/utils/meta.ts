export const createMetaTags = (
  title = "Magicswap | Powered by Treasure",
  description = "The gateway to the cross-game economy. Swap, pool, and earn tokens in the decentralized exchanged powered by Treasure and MAGIC.",
  image = "/img/banner.png"
) => ({
  title,
  description,
  "og:type": "website",
  "og:title": title,
  "og:description": description,
  "og:image": image,
  "twitter:card": "summary_large_image",
  "twitter:title": title,
  "twitter:description": description,
  "twitter:image": image,
});
