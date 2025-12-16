"use client";

import React from "react";

const DEFAULT_TO_EMAIL = "hello@kawaya.academy";

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

export function ContactClient() {
  const [topic, setTopic] = React.useState<"Admissions" | "Programs" | "Partnerships" | "Hiring" | "Other">(
    "Admissions"
  );
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMsg = message.trim();
    if (!cleanName || !cleanEmail || !cleanMsg) {
      setStatus("Please fill in name, email, and message.");
      return;
    }

    const subject = encodeURIComponent(`[Kawaya Academy] ${topic} — ${cleanName}`);
    const body = encodeURIComponent(`Name: ${cleanName}\nEmail: ${cleanEmail}\nTopic: ${topic}\n\n${cleanMsg}\n`);
    window.location.href = `mailto:${DEFAULT_TO_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("Opening your email client…");
  }

  return (
    <main className="stack">
      <section className="card">
        <div className="cardInner">
          <div className="kicker">Contact</div>
          <h1 className="h1">Let’s talk.</h1>
          <p className="lead">
            Use the form below to reach Kawaya Academy. For hiring, you can also go directly to the application flow.
          </p>
        </div>
      </section>

      <section className="grid2">
        <div className="card">
          <div className="cardInner">
            <h2 className="h2">Send a message</h2>
            <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Topic</span>
                <select value={topic} onChange={(e) => setTopic(e.target.value as any)} style={inputStyle()}>
                  <option>Admissions</option>
                  <option>Programs</option>
                  <option>Partnerships</option>
                  <option>Hiring</option>
                  <option>Other</option>
                </select>
              </label>
              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle()} />
              </label>
              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  style={inputStyle()}
                />
              </label>
              <label style={{ display: "grid", gap: 6 }}>
                <span className="sectionTitle">Message</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={7} style={inputStyle()} />
              </label>

              <div className="btnRow">
                <button className="btn btnPrimary" type="submit">
                  Send
                </button>
              </div>
              {status ? <p className="lead" style={{ marginTop: 0 }}>{status}</p> : null}
            </form>
          </div>
        </div>

        <div className="card">
          <div className="cardInner">
            <h2 className="h2">Quick links</h2>
            <ul className="list">
              <li>Programs: AI generation, creation, and automation</li>
              <li>Admissions: fit-first, artifact-led learning</li>
              <li>Careers: structured, skills-first hiring</li>
            </ul>
            <div style={{ height: 12 }} />
            <div className="btnRow" style={{ marginTop: 0 }}>
              <a className="btn" href={`mailto:${DEFAULT_TO_EMAIL}`}>
                Email us
              </a>
              <a className="btn" href="/careers">
                Careers
              </a>
              <a className="btn" href="/apply">
                Hiring application
              </a>
            </div>
            <p className="lead" style={{ marginTop: 12 }}>
              Tip: update the destination email in <code>src/app/contact/ContactClient.tsx</code> to your official inbox.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


