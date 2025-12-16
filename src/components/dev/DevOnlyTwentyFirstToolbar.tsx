"use client";

import dynamic from "next/dynamic";

const Toolbar = dynamic(
  () =>
    import("@/components/dev/TwentyFirstDevToolbar").then(
      (m) => m.TwentyFirstDevToolbar
    ),
  { ssr: false }
);

export function DevOnlyTwentyFirstToolbar() {
  if (process.env.NODE_ENV !== "development") return null;
  return <Toolbar />;
}


