export const createMetaTags = (
  title = "Swap | MagicSwap",
  description = "The gateway to the cross-game economy",
  image = "/img/banner.jpg"
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
