import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — Kawaya Academy",
  description: "Privacy policy for Kawaya Academy.",
};

export default function PrivacyPage() {
  return (
    <main className="stack">
      <section className="card">
        <div className="cardInner prose">
          <div className="kicker">Privacy</div>
          <h1 className="h1">Privacy policy</h1>
          <p>
            We only collect what we need to operate the site and deliver programs or hiring assessments. If you create an
            account, your progress and submissions are tied to that account so you can resume later.
          </p>
          <p>
            If you upload files as part of an assessment, they are stored securely and used only for evaluation and
            review. Do not upload sensitive personal data you do not want reviewed by the hiring team.
          </p>
          <p>
            This page is a general policy statement. Replace it with your official legal privacy policy before running
            paid campaigns or collecting regulated data.
          </p>
        </div>
      </section>
    </main>
  );
}


