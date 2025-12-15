"use client";

import { AuthGate } from "@/components/auth/AuthGate";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React from "react";

type ApplicationData = {
  full_name: string;
  email: string;
  country: string;
  current_status: "student" | "graduate" | "other" | "";
  background: "tech" | "AI" | "no-code" | "mixed" | "";
  availability: "full-time" | "part-time" | "";
  prior_discord_experience: string;
  prior_automation_experience: string;
  portfolio_links?: string;
};

const DEFAULT_DATA: ApplicationData = {
  full_name: "",
  email: "",
  country: "",
  current_status: "",
  background: "",
  availability: "",
  prior_discord_experience: "",
  prior_automation_experience: "",
  portfolio_links: "",
};

function inputStyle(): React.CSSProperties {
  return {
    border: "1px solid var(--border)",
    background: "rgba(255,255,255,0.03)",
    color: "var(--fg)",
    padding: "10px 12px",
    borderRadius: 12,
    outline: "none",
    width: "100%",
  };
}

export function ApplyClient() {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = React.useState<ApplicationData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = React.useState(true);
  const [saveState, setSaveState] = React.useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const { data: row, error } = await supabase
          .from("applications")
          .select("application_data,status")
          .eq("user_id", user.id)
          .maybeSingle();
        if (error) throw error;
        const base: ApplicationData = {
          ...DEFAULT_DATA,
          email: user.email ?? "",
          ...(row?.application_data ?? {}),
        };
        if (!cancelled) setData(base);
      } catch (e) {
        // keep the form usable even if load fails
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  React.useEffect(() => {
    if (!user) return;
    if (isLoading) return;

    setSaveState("saving");
    setSaveError(null);
    const t = window.setTimeout(async () => {
      try {
        const payload = {
          user_id: user.id,
          application_data: data,
          status: "draft",
        };
        const { error } = await supabase.from("applications").upsert(payload, { onConflict: "user_id" });
        if (error) throw error;
        setSaveState("saved");
      } catch (e) {
        setSaveState("error");
        setSaveError(e instanceof Error ? e.message : "Failed to save.");
      }
    }, 800);

    return () => window.clearTimeout(t);
  }, [data, user, isLoading]);

  function update<K extends keyof ApplicationData>(key: K, value: ApplicationData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function validate(d: ApplicationData): string | null {
    if (!d.full_name.trim()) return "Full name is required.";
    if (!d.email.trim()) return "Email is required.";
    if (!d.country.trim()) return "Country is required.";
    if (!d.current_status) return "Current status is required.";
    if (!d.background) return "Background is required.";
    if (!d.availability) return "Availability is required.";
    if (!d.prior_discord_experience.trim()) return "Discord experience is required.";
    if (!d.prior_automation_experience.trim()) return "Automation experience is required.";
    return null;
  }

  async function submit() {
    if (!user) return;
    const err = validate(data);
    if (err) {
      setSaveState("error");
      setSaveError(err);
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        user_id: user.id,
        application_data: data,
        status: "submitted",
      };
      const { error } = await supabase.from("applications").upsert(payload, { onConflict: "user_id" });
      if (error) throw error;
      router.push("/assessment");
    } catch (e) {
      setSaveState("error");
      setSaveError(e instanceof Error ? e.message : "Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthGate title="Sign in to apply">
      <main className="card">
        <div className="cardInner">
          <h1 className="h1">Application</h1>
          <p className="lead">
            Fill this out carefully. It autosaves and you can resume later. After submission, you’ll be
            redirected to the assessment.
          </p>

          <div className="pill" style={{ marginBottom: 14 }}>
            {saveState === "saving"
              ? "Saving…"
              : saveState === "saved"
              ? "Saved"
              : saveState === "error"
              ? "Needs attention"
              : "Ready"}
          </div>

          {saveError ? (
            <p className="lead" style={{ color: "var(--danger)" }}>
              {saveError}
            </p>
          ) : null}

          {isLoading ? (
            <p className="lead">Loading your saved application…</p>
          ) : (
            <form style={{ display: "grid", gap: 12 }}>
              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Full name</span>
                <input value={data.full_name} onChange={(e) => update("full_name", e.target.value)} style={inputStyle()} />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Email</span>
                <input value={data.email} readOnly style={{ ...inputStyle(), opacity: 0.85 }} />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Country</span>
                <input value={data.country} onChange={(e) => update("country", e.target.value)} style={inputStyle()} />
              </label>

              <div className="grid2" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={{ display: "grid", gap: 6 }}>
                  <span className="sectionTitle">Current status</span>
                  <select
                    value={data.current_status}
                    onChange={(e) => update("current_status", e.target.value as ApplicationData["current_status"])}
                    style={inputStyle()}
                  >
                    <option value="">Select</option>
                    <option value="student">Student</option>
                    <option value="graduate">Graduate</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label style={{ display: "grid", gap: 6 }}>
                  <span className="sectionTitle">Availability</span>
                  <select
                    value={data.availability}
                    onChange={(e) => update("availability", e.target.value as ApplicationData["availability"])}
                    style={inputStyle()}
                  >
                    <option value="">Select</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                  </select>
                </label>
              </div>

              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Background</span>
                <select
                  value={data.background}
                  onChange={(e) => update("background", e.target.value as ApplicationData["background"])}
                  style={inputStyle()}
                >
                  <option value="">Select</option>
                  <option value="tech">Tech</option>
                  <option value="AI">AI</option>
                  <option value="no-code">No-code</option>
                  <option value="mixed">Mixed</option>
                </select>
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Prior Discord experience</span>
                <textarea
                  value={data.prior_discord_experience}
                  onChange={(e) => update("prior_discord_experience", e.target.value)}
                  rows={4}
                  style={inputStyle()}
                />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Prior automation experience</span>
                <textarea
                  value={data.prior_automation_experience}
                  onChange={(e) => update("prior_automation_experience", e.target.value)}
                  rows={4}
                  style={inputStyle()}
                />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Portfolio links (optional)</span>
                <input
                  value={data.portfolio_links ?? ""}
                  onChange={(e) => update("portfolio_links", e.target.value)}
                  placeholder="https://…"
                  style={inputStyle()}
                />
              </label>

              <div className="btnRow">
                <button className="btn btnPrimary" type="button" onClick={() => void submit()} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting…" : "Submit and continue"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </AuthGate>
  );
}


