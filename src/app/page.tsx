import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="grid2">
      <section className="card">
        <div className="cardInner">
          <div className="pill">Community Growth & Automation Operator</div>
          <h1 className="h1">We’re hiring an operator who scales people and systems.</h1>
          <p className="lead">
            This is not a “post and hope” community role. You will build workflows, automation, and repeatable
            systems that make a competition run cleanly at scale. If you like clarity, accountability, and
            shipping, you’ll feel at home.
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
      </section>

      <aside className="card">
        <div className="cardInner">
          <h2 className="sectionTitle">Who this is for</h2>
          <ul className="list">
            <li>You default to automation and tight systems.</li>
            <li>You can run operations without being chased.</li>
            <li>You can think in workflows and scale constraints.</li>
          </ul>

          <div style={{ height: 14 }} />

          <h2 className="sectionTitle">Who this is not for</h2>
          <ul className="list">
            <li>You avoid written instructions or skip constraints.</li>
            <li>You need constant supervision to move work forward.</li>
            <li>You want “vibes-based” operations with no metrics.</li>
          </ul>

          <div style={{ height: 14 }} />

          <h2 className="sectionTitle">Assessment overview</h2>
          <ul className="list">
            <li>Multi-step sections with autosave and resume.</li>
            <li>One optional advanced artifact upload.</li>
            <li>Time expectation: a few days.</li>
          </ul>
        </div>
      </aside>
    </main>
  );
}


