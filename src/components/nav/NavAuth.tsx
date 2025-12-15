"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export function NavAuth() {
  const { user, signOut, isLoading } = useAuth();

  return (
    <div className="pill" style={{ gap: 10 }}>
      <span>Operator Competition</span>
      <span aria-hidden="true">•</span>
      <Link href="/apply">Apply</Link>
      <span aria-hidden="true">•</span>
      <Link href="/assessment">Assessment</Link>
      {isLoading ? null : user ? (
        <>
          <span aria-hidden="true">•</span>
          <button className="btn" style={{ padding: "6px 10px" }} onClick={() => void signOut()}>
            Log out
          </button>
        </>
      ) : null}
    </div>
  );
}


