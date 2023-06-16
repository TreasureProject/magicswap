import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

import "./polyfills";

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      // disable StrictMode for react-aria - https://github.com/adobe/react-spectrum/issues/4281
      // <StrictMode>
      <RemixBrowser />
      // </StrictMode>
    );
  });
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
