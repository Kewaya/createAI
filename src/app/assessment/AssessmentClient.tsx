"use client";

import { AuthGate } from "@/components/auth/AuthGate";
import { useAuth } from "@/components/auth/AuthProvider";
import { ASSESSMENT_SECTIONS, type AssessmentQuestionType } from "@/lib/assessment/sections";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React from "react";

export function AssessmentClient() {
  const { user } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(true);
  const [activeId, setActiveId] = React.useState<string>(ASSESSMENT_SECTIONS[0]?.id ?? "");
  const [answers, setAnswers] = React.useState<Record<string, unknown>>({});
  const [saveStateBySection, setSaveStateBySection] = React.useState<
    Record<string, "idle" | "saving" | "saved" | "error">
  >({});
  const [errorBySection, setErrorBySection] = React.useState<Record<string, string | null>>({});
  const [uploadStateBySection, setUploadStateBySection] = React.useState<
    Record<string, "idle" | "uploading" | "uploaded" | "error">
  >({});
  const [uploadErrorBySection, setUploadErrorBySection] = React.useState<Record<string, string | null>>({});
  const timeoutsRef = React.useRef<Record<string, number>>({});

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("assessment_responses")
          .select("section_id,response_data")
          .eq("user_id", user.id);
        if (error) throw error;

        const map: Record<string, unknown> = {};
        for (const row of data ?? []) {
          // Convention: response_data = { answer: ... } or { file_path: ... }
          map[row.section_id] = (row.response_data as any)?.answer ?? (row.response_data as any)?.file_path ?? "";
        }

        // Pick first incomplete section as starting point
        const firstIncomplete =
          ASSESSMENT_SECTIONS.find((s) => !isCompleted(s.id, map[s.id]))?.id ?? ASSESSMENT_SECTIONS[0]?.id ?? "";

        if (!cancelled) {
          setAnswers(map);
          setActiveId(firstIncomplete);
        }
      } catch (e) {
        // allow UI to render even if read fails
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  function scheduleSave(sectionId: string, value: unknown, type: AssessmentQuestionType) {
    if (!user) return;
    setSaveStateBySection((prev) => ({ ...prev, [sectionId]: "saving" }));
    setErrorBySection((prev) => ({ ...prev, [sectionId]: null }));

    const existing = timeoutsRef.current[sectionId];
    if (existing) window.clearTimeout(existing);

    const t = window.setTimeout(async () => {
      try {
        const response_data =
          type === "file_upload"
            ? { file_path: typeof value === "string" ? value : "" }
            : { answer: typeof value === "string" ? value : "" };
        const { error } = await supabase.from("assessment_responses").upsert(
          {
            user_id: user.id,
            section_id: sectionId,
            response_data,
          },
          { onConflict: "user_id,section_id" }
        );
        if (error) throw error;
        setSaveStateBySection((prev) => ({ ...prev, [sectionId]: "saved" }));
      } catch (e) {
        setSaveStateBySection((prev) => ({ ...prev, [sectionId]: "error" }));
        setErrorBySection((prev) => ({
          ...prev,
          [sectionId]: e instanceof Error ? e.message : "Failed to save.",
        }));
      }
    }, 800);

    timeoutsRef.current[sectionId] = t;
  }

  function updateAnswer(sectionId: string, value: unknown, type: AssessmentQuestionType) {
    setAnswers((prev) => ({ ...prev, [sectionId]: value }));
    scheduleSave(sectionId, value, type);
  }

  async function uploadFile(sectionId: string, file: File) {
    if (!user) return;
    setUploadStateBySection((prev) => ({ ...prev, [sectionId]: "uploading" }));
    setUploadErrorBySection((prev) => ({ ...prev, [sectionId]: null }));

    try {
      const maxBytes = 25 * 1024 * 1024;
      if (file.size > maxBytes) throw new Error("File is too large. Max size is 25MB.");

      const allowedExt = ["pdf", "png", "jpg", "jpeg", "docx", "txt", "md", "zip"];
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!allowedExt.includes(ext)) {
        throw new Error(`Unsupported file type .${ext}. Allowed: ${allowedExt.join(", ")}`);
      }

      const safeName = file.name.replace(/[^\w.\-]+/g, "_");
      const objectPath = `${user.id}/${crypto.randomUUID()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("assessment-uploads")
        .upload(objectPath, file, { cacheControl: "3600", upsert: false });
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("uploads").insert({
        user_id: user.id,
        file_path: objectPath,
      });
      if (insertError) throw insertError;

      updateAnswer(sectionId, objectPath, "file_upload");
      setUploadStateBySection((prev) => ({ ...prev, [sectionId]: "uploaded" }));
    } catch (e) {
      setUploadStateBySection((prev) => ({ ...prev, [sectionId]: "error" }));
      setUploadErrorBySection((prev) => ({
        ...prev,
        [sectionId]: e instanceof Error ? e.message : "Upload failed.",
      }));
    }
  }

  async function openDownload(sectionId: string) {
    const path = String(answers[sectionId] ?? "");
    if (!path) return;
    const { data, error } = await supabase.storage.from("assessment-uploads").createSignedUrl(path, 60);
    if (error) return;
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  const section = ASSESSMENT_SECTIONS.find((s) => s.id === activeId) ?? ASSESSMENT_SECTIONS[0];
  const activeIndex = Math.max(0, ASSESSMENT_SECTIONS.findIndex((s) => s.id === activeId));

  async function finalize() {
    if (!user) return;
    // Minimal finalization: mark application status (if present), then go to thank-you.
    const { data: existing, error: readError } = await supabase
      .from("applications")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (readError) {
      // Best-effort; still allow redirect if status update fails.
    } else if (existing?.id) {
      await supabase.from("applications").update({ status: "assessment_submitted" }).eq("user_id", user.id);
    } else {
      await supabase
        .from("applications")
        .insert({ user_id: user.id, status: "assessment_submitted", application_data: {} });
    }
    router.push("/thank-you");
  }

  return (
    <AuthGate title="Sign in to access the assessment">
      <main className="grid2">
        <aside className="card">
          <div className="cardInner">
            <h2 className="sectionTitle">Sections</h2>
            <div style={{ display: "grid", gap: 8 }}>
              {ASSESSMENT_SECTIONS.map((s) => {
                const completed = isCompleted(s.id, answers[s.id]);
                return (
                  <button
                    key={s.id}
                    className="btn"
                    type="button"
                    onClick={() => setActiveId(s.id)}
                    style={{
                      textAlign: "left",
                      borderColor: s.id === activeId ? "rgba(10,132,255,0.35)" : undefined,
                      background: s.id === activeId ? "rgba(10,132,255,0.12)" : undefined,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <span>
                        {s.title}
                        {s.tier === "advanced_optional" ? " (optional)" : ""}
                      </span>
                      <span style={{ color: completed ? "rgba(245,245,247,0.85)" : "rgba(245,245,247,0.45)" }}>
                        {completed ? "Done" : "—"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ height: 14 }} />
            <h2 className="sectionTitle">Progress</h2>
            <p className="lead" style={{ marginBottom: 0 }}>
              {countCompleted(answers)} / {ASSESSMENT_SECTIONS.length} sections completed.
            </p>
          </div>
        </aside>

        <section className="card">
          <div className="cardInner">
            {isLoading ? (
              <p className="lead">Loading your saved responses…</p>
            ) : (
              <>
                <div className="pill" style={{ marginBottom: 12 }}>
                  {saveStateBySection[section.id] === "saving"
                    ? "Saving…"
                    : saveStateBySection[section.id] === "saved"
                    ? "Saved"
                    : saveStateBySection[section.id] === "error"
                    ? "Save error"
                    : "Ready"}
                </div>

                <h1 className="h1" style={{ marginTop: 0 }}>
                  {section.title}
                </h1>
                <p className="lead">{section.purpose}</p>

                {errorBySection[section.id] ? (
                  <p className="lead" style={{ color: "var(--danger)" }}>
                    {errorBySection[section.id]}
                  </p>
                ) : null}

                {section.questions.map((q, idx) => (
                  <div key={`${section.id}-${idx}`} style={{ display: "grid", gap: 8 }}>
                    <p className="lead" style={{ marginBottom: 0 }}>
                      {q.prompt}
                    </p>

                    {q.type === "short_text" ? (
                      <textarea
                        rows={6}
                        value={String(answers[section.id] ?? "")}
                        onChange={(e) => updateAnswer(section.id, e.target.value, q.type)}
                        placeholder="Write your answer here…"
                        style={inputStyle()}
                      />
                    ) : q.type === "file_upload" ? (
                      <div style={{ display: "grid", gap: 8 }}>
                        <div className="pill">
                          {uploadStateBySection[section.id] === "uploading"
                            ? "Uploading…"
                            : uploadStateBySection[section.id] === "uploaded"
                            ? "Uploaded"
                            : uploadStateBySection[section.id] === "error"
                            ? "Upload error"
                            : "Upload a file (optional)"}
                        </div>

                        {uploadErrorBySection[section.id] ? (
                          <p className="lead" style={{ color: "var(--danger)", marginTop: 0 }}>
                            {uploadErrorBySection[section.id]}
                          </p>
                        ) : null}

                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg,.docx,.txt,.md,.zip"
                          disabled={uploadStateBySection[section.id] === "uploading"}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            void uploadFile(section.id, f);
                            e.currentTarget.value = "";
                          }}
                          style={inputStyle()}
                        />

                        {String(answers[section.id] ?? "") ? (
                          <div style={{ display: "grid", gap: 8 }}>
                            <p className="lead" style={{ marginTop: 0 }}>
                              Stored file path: <code>{String(answers[section.id])}</code>
                            </p>
                            <div className="btnRow" style={{ marginTop: 0 }}>
                              <button className="btn" type="button" onClick={() => void openDownload(section.id)}>
                                Open download link (60s)
                              </button>
                              <button
                                className="btn"
                                type="button"
                                onClick={() => void navigator.clipboard.writeText(String(answers[section.id]))}
                              >
                                Copy path
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <textarea
                        rows={10}
                        value={String(answers[section.id] ?? "")}
                        onChange={(e) => updateAnswer(section.id, e.target.value, q.type)}
                        placeholder={q.type === "structured_text" ? "Follow the required format exactly." : "Write your answer here…"}
                        style={inputStyle()}
                      />
                    )}
                  </div>
                ))}

                <div className="btnRow">
                  <button
                    className="btn"
                    type="button"
                    disabled={activeIndex === 0}
                    onClick={() => setActiveId(ASSESSMENT_SECTIONS[Math.max(0, activeIndex - 1)]!.id)}
                  >
                    Back
                  </button>
                  {activeIndex < ASSESSMENT_SECTIONS.length - 1 ? (
                    <button
                      className="btn btnPrimary"
                      type="button"
                      onClick={() => setActiveId(ASSESSMENT_SECTIONS[Math.min(ASSESSMENT_SECTIONS.length - 1, activeIndex + 1)]!.id)}
                    >
                      Next
                    </button>
                  ) : (
                    <button className="btn btnPrimary" type="button" onClick={() => void finalize()}>
                      Submit assessment
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </AuthGate>
  );
}

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

function isCompleted(sectionId: string, value: unknown) {
  // Basic heuristic: any non-empty string counts as completed for now.
  if (typeof value === "string") return value.trim().length > 0;
  if (value == null) return false;
  return true;
}

function countCompleted(answers: Record<string, unknown>) {
  return ASSESSMENT_SECTIONS.filter((s) => isCompleted(s.id, answers[s.id])).length;
}


