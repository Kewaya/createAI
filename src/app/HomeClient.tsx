"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function HomeClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const pillars = useMemo(
    () => [86, 78, 72, 64, 56, 48, 40, 30, 18, 30, 40, 48, 56, 64, 72, 78, 86],
    []
  );

  return (
    <main className="stack">
      <section className="neoHero">
        <div aria-hidden className="neoHeroBg" />
        <div aria-hidden className="neoHeroGrid" />

        <div className="neoHeroInner card glass">
          <div className={`neoHeroCopy ${mounted ? "neoHeroIn" : ""}`}>
            <span className="badge">
              <span className="badgeDot" /> Kawaya Academy
            </span>
            <h1 className="h1">
              Learn to build with AI—
              <span className="gradientText"> generation</span>, creation, and automation.
            </h1>
            <p className="lead">
              Go from “I watched the tutorials” to shipping real workflows and products. We teach prompting,
              evaluation, APIs, data, and software fundamentals—then you prove it through artifacts and
              skills-first assessments.
            </p>

            <div className="btnRow">
              <Link className="btn btnPrimary" href="/programs">
                Explore programs
              </Link>
              <Link className="btn" href="/admissions">
                Admissions
              </Link>
              <Link className="btn" href="/careers">
                We’re hiring
              </Link>
            </div>

            <div className="neoHeroChips" aria-label="What you'll build">
              {["workflows", "eval harnesses", "rag prototypes", "automations", "case studies"].map((t) => (
                <span key={t} className="neoHeroChip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="neoHeroSide">
            <div className="stats">
              <div className="statRow">
                <div className="statLabel">Artifacts</div>
                <div className="statValue">Portfolio-ready</div>
              </div>
              <div className="statRow">
                <div className="statLabel">Process</div>
                <div className="statValue">Skills-first</div>
              </div>
              <div className="statRow">
                <div className="statLabel">Standard</div>
                <div className="statValue">Repeatable</div>
              </div>
            </div>

            <div className="neoPillarsWrap" aria-hidden>
              <div className="neoGlow" />
              <div className="neoPillars">
                {pillars.map((h, i) => (
                  <div
                    key={i}
                    className="neoPillar"
                    style={{
                      height: mounted ? `${h}%` : "0%",
                      transitionDelay: `${Math.abs(i - Math.floor(pillars.length / 2)) * 55}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="neoPillarsFade" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid3">
        <div className="card">
          <div className="cardInner">
            <h2 className="h2">AI generation</h2>
            <p className="lead">
              Design reliable generative workflows: prompts, tools, retrieval, guardrails, and evaluation—so
              outputs are usable in real products.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="cardInner">
            <h2 className="h2">AI creation</h2>
            <p className="lead">
              Build deliverables: assistants, internal copilots, content systems, prototypes, and small apps
              that integrate models into real user journeys.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="cardInner">
            <h2 className="h2">AI automation</h2>
            <p className="lead">
              Automate processes end-to-end: intake → reasoning → actions → logging. Expect workflows, APIs,
              and measurable outcomes—not “vibes.”
            </p>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="cardInner">
          <div className="kicker">How we teach</div>
          <h2 className="h2">Skills-first learning: build, document, and defend your work.</h2>
          <div className="divider" />
          <div className="grid2">
            <div className="prose">
              <p>
                Every module ends with an artifact you can show: a workflow, a repo, a technical write-up, or
                a demo. We focus on clarity, constraints, and repeatability—because that’s what employers and
                clients care about.
              </p>
              <p>
                You’ll practice the full loop: define requirements, ship, measure, and iterate. If you can
                explain it clearly, you can scale it.
              </p>
            </div>
            <div className="card" style={{ boxShadow: "none", background: "rgba(255,255,255,0.02)" }}>
              <div className="cardInner">
                <h3 className="sectionTitle">What you’ll produce</h3>
                <ul className="list">
                  <li>Automation playbooks with clear SOPs</li>
                  <li>AI assistants with evaluation + guardrails</li>
                  <li>Small apps using APIs + data pipelines</li>
                  <li>Portfolio-ready case studies</li>
                </ul>
                <div style={{ height: 10 }} />
                <Link className="btn" href="/programs">
                  See programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid2">
        <div className="card">
          <div className="cardInner">
            <div className="kicker">Hiring</div>
            <h2 className="h2">Job opening: Community Growth & Automation Operator</h2>
            <p className="lead">
              We run a structured hiring process with a multi-stage assessment. If you’re strong at systems,
              automation, and shipping, apply and we’ll guide you from application → assessment.
            </p>
            <div className="btnRow">
              <Link className="btn btnPrimary" href="/apply">
                Apply
              </Link>
              <Link className="btn" href="/assessment">
                Assessment (after login)
              </Link>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="cardInner">
            <h3 className="sectionTitle">Assessment philosophy</h3>
            <ul className="list">
              <li>Clear constraints and real-world scenarios</li>
              <li>Autosave + resume (no one-shot tests)</li>
              <li>Optional advanced artifact upload</li>
              <li>Focus on decision-making and quality</li>
            </ul>
            <div style={{ height: 10 }} />
            <Link className="btn" href="/careers">
              See role details
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


