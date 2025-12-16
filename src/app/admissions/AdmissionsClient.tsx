"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function AdmissionsClient() {
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
              <span className="badgeDot" /> Admissions
            </span>
            <h1 className="h1">
              A simple process, focused on{" "}
              <span className="gradientText">fit</span>.
            </h1>
            <p className="lead">
              We optimize for learners who can follow constraints, communicate clearly, and finish what they
              start. If that’s you, you’ll do well here.
            </p>

            <div className="btnRow">
              <Link className="btn btnPrimary" href="/contact">
                Request information
              </Link>
              <Link className="btn" href="/programs">
                View programs
              </Link>
              <Link className="btn" href="/apply">
                Hiring application
              </Link>
            </div>

            <div className="neoHeroChips" aria-label="What we value">
              {["clarity", "constraints", "iteration", "execution", "documentation"].map((t) => (
                <span key={t} className="neoHeroChip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="neoHeroSide">
            <div className="card" style={{ boxShadow: "none", background: "rgba(255,255,255,0.02)" }}>
              <div className="cardInner">
                <h3 className="sectionTitle">How it works</h3>
                <div className="stats">
                  <div className="statRow">
                    <div className="statLabel">Step 1</div>
                    <div className="statValue">Request info</div>
                  </div>
                  <div className="statRow">
                    <div className="statLabel">Step 2</div>
                    <div className="statValue">Confirm fit</div>
                  </div>
                  <div className="statRow">
                    <div className="statLabel">Step 3</div>
                    <div className="statValue">Start shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid2">
        <div className="card">
          <div className="cardInner">
            <h2 className="h2">Who it’s for</h2>
            <ul className="list">
              <li>Builders who want practical AI + automation outcomes</li>
              <li>Learners comfortable with writing, documentation, and iteration</li>
              <li>People who can follow instructions and respect constraints</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="cardInner">
            <h2 className="h2">What we look for</h2>
            <ul className="list">
              <li>Consistency: you finish projects</li>
              <li>Clarity: you explain decisions and tradeoffs</li>
              <li>Systems thinking: you design repeatable workflows</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="cardInner prose">
          <h2 className="h2">How to prepare</h2>
          <p>
            You don’t need to be an expert. You do need to be ready to work in public: ship artifacts, write
            clearly, and take feedback.
          </p>
          <p>
            If you’re applying for our hiring role instead of a learning program, use the hiring application
            flow. It’s a separate path.
          </p>
          <div className="btnRow">
            <Link className="btn" href="/apply">
              Apply for the job role
            </Link>
            <Link className="btn btnPrimary" href="/programs">
              Explore learning tracks
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


