import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers — Kawaya Academy",
  description:
    "Join Kawaya Academy. View open roles and apply through our structured, skills-first hiring process.",
};

export default function CareersPage() {
  return (
    <main className="stack">
      <section className="card">
        <div className="cardInner">
          <div className="kicker">Careers</div>
          <h1 className="h1">Build the academy. Build the system.</h1>
          <p className="lead">
            We hire for ownership, clarity, and execution. Our process is structured and skills-first: you’ll
            submit an application, then complete an assessment with autosave/resume.
          </p>
        </div>
      </section>

      <section className="card">
        <div className="cardInner">
          <div className="pill">Open role</div>
          <h2 className="h2">Community Growth & Automation Operator</h2>
          <p className="lead">
            You’ll build workflows, automation, and repeatable systems that help Kawaya Academy scale learners
            and operations. This is an operator role—measured outputs, clear constraints, and consistent
            shipping.
          </p>
          <div className="divider" />
          <div className="grid2">
            <div>
              <h3 className="sectionTitle">Core responsibilities</h3>
              <ul className="list">
                <li>Design and run repeatable community + ops workflows</li>
                <li>Automate manual processes (intake, tracking, reporting)</li>
                <li>Maintain quality: documentation, checklists, audits</li>
                <li>Build dashboards/metrics for accountability</li>
              </ul>
            </div>
            <div>
              <h3 className="sectionTitle">Signals you’ll do well</h3>
              <ul className="list">
                <li>You default to systems and automation</li>
                <li>You communicate clearly in writing</li>
                <li>You can execute without supervision</li>
                <li>You like constraints and measurable outcomes</li>
              </ul>
            </div>
          </div>
          <div className="btnRow">
            <Link className="btn btnPrimary" href="/apply">
              Apply
            </Link>
            <Link className="btn" href="/assessment">
              Assessment (after login)
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


