"use client";

import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.back()}>Close Modal</button>
      <div>{children}</div>
    </>
  );
}
