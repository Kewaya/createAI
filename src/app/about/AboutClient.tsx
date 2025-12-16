"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function AboutClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const pillars = useMemo(
    () => [92, 84, 78, 70, 62, 54, 46, 34, 18, 34, 46, 54, 62, 70, 78, 84, 92],
    []
  );

  return (
    <main className="stack">
      <section className="aboutHero">
        <div aria-hidden className="aboutHeroBg" />
        <div aria-hidden className="aboutHeroGrid" />

        <div className="aboutHeroInner card glass">
          <div className={`aboutHeroCopy ${mounted ? "aboutHeroIn" : ""}`}>
            <span className="badge">
              <span className="badgeDot" /> About Kawaya
            </span>
            <h1 className="h1">
              We help builders ship{" "}
              <span className="gradientText">reliable AI</span>—not demos.
            </h1>
            <p className="lead">
              Kawaya Academy teaches AI generation, creation, and automation grounded in software
              fundamentals. You’ll learn how to build workflows that can be tested, handed off, and
              improved—so what you ship actually holds up in production.
            </p>

            <div className="btnRow">
              <Link className="btn btnPrimary" href="/programs">
                Explore programs
              </Link>
              <Link className="btn" href="/admissions">
                Admissions
              </Link>
              <Link className="btn" href="/apply">
                Apply (Hiring)
              </Link>
            </div>

            <div className="aboutHeroPartners" aria-label="Trusted patterns we teach">
              {["eval", "rag", "apis", "pipelines", "guardrails", "automation"].map((t) => (
                <span key={t} className="aboutHeroChip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="aboutHeroSide">
            <div className="stats">
              <div className="statRow">
                <div className="statLabel">Focus</div>
                <div className="statValue">Outcomes</div>
              </div>
              <div className="statRow">
                <div className="statLabel">Method</div>
                <div className="statValue">Artifacts</div>
              </div>
              <div className="statRow">
                <div className="statLabel">Standard</div>
                <div className="statValue">Repeatable</div>
              </div>
            </div>

            <div className="aboutPillarsWrap" aria-hidden>
              <div className="aboutGlow" />
              <div className="aboutPillars">
                {pillars.map((h, i) => (
                  <div
                    key={i}
                    className="aboutPillar"
                    style={{
                      height: mounted ? `${h}%` : "0%",
                      transitionDelay: `${Math.abs(i - Math.floor(pillars.length / 2)) * 55}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="aboutPillarsFade" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid2">
        <div className="card">
          <div className="cardInner prose">
            <h2 className="h2">What we believe</h2>
            <p>
              AI skills become credible when you can show your work: constraints, evaluation, and the
              decisions you made when things broke. That’s why our learning is artifact-led and
              documentation-heavy.
            </p>
            <p>
              We care about repeatability. If a workflow can’t be handed off, tested, and improved, it
              isn’t done.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="cardInner">
            <h2 className="h2">What you’ll learn</h2>
            <ul className="list">
              <li>Prompting patterns, tool use, and retrieval (RAG) basics</li>
              <li>Evaluation, guardrails, and quality control for LLM outputs</li>
              <li>Automation design: inputs → logic → actions → logging</li>
              <li>APIs, data handling, and software engineering fundamentals</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="cardInner">
          <div className="kicker">Credibility</div>
          <h2 className="h2">Built for outcomes, not hype.</h2>
          <p className="lead">
            We avoid inflated promises. Instead, we focus on practical capability: can you build something
            useful, explain it clearly, and iterate based on feedback?
          </p>
          <div className="btnRow">
            <Link className="btn" href="/contact">
              Contact us
            </Link>
            <Link className="btn" href="/careers">
              Open roles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


