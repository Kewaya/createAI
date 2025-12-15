"use client";

import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthCard } from "@/components/auth/AuthCard";
import { supabase } from "@/lib/supabase/client";

function isEmailVerified(user: { email_confirmed_at?: string | null; confirmed_at?: string | null }) {
  return Boolean(user.email_confirmed_at || user.confirmed_at);
}

export function AuthGate({ title, children }: { title?: string; children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [resendStatus, setResendStatus] = React.useState<string | null>(null);
  const [resendError, setResendError] = React.useState<string | null>(null);
  const [isResending, setIsResending] = React.useState(false);

  async function resendVerification() {
    if (!user?.email) return;
    setIsResending(true);
    setResendStatus(null);
    setResendError(null);
    try {
      const { error } = await supabase.auth.resend({ type: "signup", email: user.email });
      if (error) throw error;
      setResendStatus("Verification email re-sent. Please check your inbox.");
    } catch (err) {
      setResendError(err instanceof Error ? err.message : "Failed to resend verification email.");
    } finally {
      setIsResending(false);
    }
  }

  if (isLoading) {
    return (
      <div className="card">
        <div className="cardInner">
          <p className="lead">Loading session…</p>
        </div>
      </div>
    );
  }

  if (!user) return <AuthCard title={title} />;

  if (!isEmailVerified(user)) {
    return (
      <div className="card">
        <div className="cardInner">
          <h1 className="h1" style={{ fontSize: 28 }}>
            Confirm your email
          </h1>
          <p className="lead">
            Email verification is required. Please confirm your address, then refresh this page.
          </p>
          <div className="btnRow">
            <button className="btn btnPrimary" onClick={resendVerification} disabled={isResending}>
              {isResending ? "Sending…" : "Resend verification email"}
            </button>
          </div>
          {resendStatus ? <p className="lead">{resendStatus}</p> : null}
          {resendError ? (
            <p className="lead" style={{ color: "var(--danger)" }}>
              {resendError}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}


