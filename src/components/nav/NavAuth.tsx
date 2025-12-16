"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export function NavAuth() {
  const { user, signOut, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="navAuth" aria-label="Account">
        <span className="navAuthStatus">Checking session…</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="navAuth" aria-label="Account">
        <Link className="btn btnSmall" href="/assessment">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="navAuth" aria-label="Account">
      <Link className="btn btnSmall" href="/assessment">
        Assessment
      </Link>
      <span className="navAuthEmail" title={user.email ?? undefined}>
        {user.email ?? "Signed in"}
      </span>
      <button className="btn btnSmall" onClick={() => void signOut()}>
        Log out
      </button>
    </div>
  );
}


