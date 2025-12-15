"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase/client";

export function ThankYouClient() {
  const { user } = useAuth();
  const [status, setStatus] = React.useState<"idle" | "updating" | "done">("idle");

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user) return;
      setStatus("updating");
      await supabase.from("applications").update({ status: "assessment_submitted" }).eq("user_id", user.id);
      if (!cancelled) setStatus("done");
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <main className="card">
      <div className="cardInner">
        <h1 className="h1">Submission complete</h1>
        <p className="lead">
          Thanks—your assessment is recorded. We’ll review it and follow up with next steps.
        </p>
        <p className="lead">
          Please do not re-submit unless asked. If you need to change something, reply to the follow-up email.
        </p>
        {user ? (
          <p className="lead" style={{ marginBottom: 0 }}>
            Status: {status === "updating" ? "Finalizing…" : "Finalized"} (signed in as {user.email})
          </p>
        ) : (
          <p className="lead" style={{ marginBottom: 0 }}>
            If you signed out, your submission is still saved to your account.
          </p>
        )}
        <div className="btnRow">
          <Link className="btn" href="/">
            Back to landing
          </Link>
          <Link className="btn" href="/apply">
            View application
          </Link>
        </div>
      </div>
    </main>
  );
}


