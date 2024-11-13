import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next.js",
};

export default function Page() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <></>
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <></>
      </Suspense>
    </section>
  );
}
