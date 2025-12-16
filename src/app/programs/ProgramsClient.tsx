"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function ProgramsClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="stack">
      <section className="neoHero">
        <div aria-hidden className="neoHeroBg" />
        <div aria-hidden className="neoHeroGrid" />

        <div className="neoHeroInner card glass">
          <div className={`neoHeroCopy ${mounted ? "neoHeroIn" : ""}`}>
            <span className="badge">
              <span className="badgeDot" /> Programs
            </span>
            <h1 className="h1">
              Practical tracks for{" "}
              <span className="gradientText">AI builders</span>.
            </h1>
            <p className="lead">
              Pick a track, ship real artifacts, and build confidence through constraints. Each program is
              designed around deliverables you can show: workflows, demos, repos, and written case studies.
            </p>

            <div className="btnRow">
              <Link className="btn btnPrimary" href="/admissions">
                Apply for a program
              </Link>
              <Link className="btn" href="/contact">
                Ask a question
              </Link>
            </div>

            <div className="neoHeroChips" aria-label="Core focus areas">
              {["generation", "creation", "automation", "fundamentals", "evaluation"].map((t) => (
                <span key={t} className="neoHeroChip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="neoHeroSide">
            <div className="card" style={{ boxShadow: "none", background: "rgba(255,255,255,0.02)" }}>
              <div className="cardInner">
                <h3 className="sectionTitle">What you leave with</h3>
                <ul className="list">
                  <li>Artifacts you can demo in interviews</li>
                  <li>Clear documentation + decision logs</li>
                  <li>Repeatable workflows you can extend</li>
                  <li>A stronger engineering foundation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid3">
        <div className="card">
          <div className="cardInner">
            <h2 className="h2">AI Generation Track</h2>
            <p className="lead">
              Build reliable generative workflows: prompting, tools, retrieval, and evaluation. Learn how to
              reduce hallucinations, enforce structure, and measure quality.
            </p>
            <div className="divider" />
            <h3 className="sectionTitle">Example artifacts</h3>
            <ul className="list">
              <li>Prompt + evaluation harness</li>
              <li>RAG prototype with citations</li>
              <li>Guardrails + fallback strategy</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="cardInner">
            <h2 className="h2">AI Creation Track</h2>
            <p className="lead">
              Turn ideas into usable products: assistants, copilots, and small apps that integrate AI into
              real user flows.
            </p>
            <div className="divider" />
            <h3 className="sectionTitle">Example artifacts</h3>
            <ul className="list">
              <li>Assistant spec + conversation design</li>
              <li>Simple app using model APIs</li>
              <li>Case study write-up</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="cardInner">
            <h2 className="h2">AI Automation Track</h2>
            <p className="lead">
              Automate real processes end-to-end using APIs, webhooks, and workflows. Focus on reliability,
              observability, and handoff.
            </p>
            <div className="divider" />
            <h3 className="sectionTitle">Example artifacts</h3>
            <ul className="list">
              <li>Workflow map + SOP</li>
              <li>Automation with logging + alerts</li>
              <li>Metrics and iteration plan</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="cardInner">
          <div className="kicker">Foundations</div>
          <h2 className="h2">Software fundamentals are not optional.</h2>
          <p className="lead">
            No matter the track, you’ll practice the basics that make AI systems real: data handling, APIs,
            version control, testing mindset, and clear documentation.
          </p>
          <div className="btnRow">
            <Link className="btn btnPrimary" href="/admissions">
              Apply for a program
            </Link>
            <Link className="btn" href="/contact">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


