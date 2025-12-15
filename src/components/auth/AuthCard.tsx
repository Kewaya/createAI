"use client";

import React, { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Mode = "login" | "signup";

function getErrorMessage(err: unknown) {
  if (!err) return "Unknown error";
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  return "Unknown error";
}

export function AuthCard({ title }: { title?: string }) {
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => email.trim().length > 3 && password.length >= 8, [email, password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus(null);
    setIsSubmitting(true);
    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({ email: email.trim(), password });
        if (signUpError) throw signUpError;
        setStatus("Account created. Check your email to confirm, then log in.");
        setMode("login");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (signInError) throw signInError;
        setStatus("Signed in.");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="card">
      <div className="cardInner">
        <h1 className="h1" style={{ fontSize: 28 }}>
          {title ?? "Sign in"}
        </h1>
        <p className="lead">
          Use email + password. Your progress is tied to your account so you can resume later.
        </p>

        <div className="btnRow" style={{ marginTop: 0 }}>
          <button
            className={`btn ${mode === "signup" ? "btnPrimary" : ""}`}
            type="button"
            onClick={() => setMode("signup")}
            disabled={isSubmitting}
          >
            Create account
          </button>
          <button
            className={`btn ${mode === "login" ? "btnPrimary" : ""}`}
            type="button"
            onClick={() => setMode("login")}
            disabled={isSubmitting}
          >
            Log in
          </button>
        </div>

        <form onSubmit={onSubmit} style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span className="sectionTitle">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              style={{
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.03)",
                color: "var(--fg)",
                padding: "10px 12px",
                borderRadius: 12,
                outline: "none",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span className="sectionTitle">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              placeholder="Minimum 8 characters"
              style={{
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.03)",
                color: "var(--fg)",
                padding: "10px 12px",
                borderRadius: 12,
                outline: "none",
              }}
            />
          </label>

          <div className="btnRow">
            <button className="btn btnPrimary" type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}
            </button>
          </div>

          {status ? <p className="lead" style={{ marginTop: 6 }}>{status}</p> : null}
          {error ? (
            <p className="lead" style={{ marginTop: 6, color: "var(--danger)" }}>
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}


