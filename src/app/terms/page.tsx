import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms — Kawaya Academy",
  description: "Terms of service for Kawaya Academy.",
};

export default function TermsPage() {
  return (
    <main className="stack">
      <section className="card">
        <div className="cardInner prose">
          <div className="kicker">Terms</div>
          <h1 className="h1">Terms of service</h1>
          <p>
            By using this website, you agree not to misuse the platform, attempt unauthorized access, or interfere with
            other users’ submissions.
          </p>
          <p>
            For hiring assessments, you agree to submit work that is your own and to follow any constraints listed in the
            instructions. We may disqualify submissions that violate rules or appear fraudulent.
          </p>
          <p>
            This page is a general placeholder. Replace it with your official legal terms before public launch.
          </p>
        </div>
      </section>
    </main>
  );
}


