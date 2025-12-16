import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { NavAuth } from "@/components/nav/NavAuth";
import { DevOnlyTwentyFirstToolbar } from "@/components/dev/DevOnlyTwentyFirstToolbar";

export const metadata: Metadata = {
  title: "Kawaya Academy — AI Generation, Creation & Automation",
  description:
    "Kawaya Academy helps learners build real AI products, automation systems, and strong software fundamentals—then prove it through projects and assessments.",
  openGraph: {
    title: "Kawaya Academy — AI Generation, Creation & Automation",
    description:
      "Learn AI generation, creation, and automation with practical projects, mentorship, and a skills-first assessment culture.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DevOnlyTwentyFirstToolbar />
        <AuthProvider>
          <div className="container">
            <header className="header">
              <div className="brand">
                <div className="logoMark" aria-hidden="true" />
                <Link href="/" className="brandText">
                  <strong>Kawaya Academy</strong>
                  <span>AI generation • creation • automation</span>
                </Link>
              </div>
              <nav className="navLinks" aria-label="Primary">
                <Link href="/about">About</Link>
                <Link href="/programs">Programs</Link>
                <Link href="/admissions">Admissions</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/contact">Contact</Link>
              </nav>
              <div className="navRight">
                <Link className="btn btnPrimary btnSmall" href="/apply">
                  Apply (Hiring)
                </Link>
                <NavAuth />
              </div>
            </header>
            {children}
            <footer className="footer">
              <div className="footerGrid">
                <div>
                  <div className="footerTitle">Kawaya Academy</div>
                  <p className="footerText">
                    Practical AI generation, creation, and automation—built on strong software fundamentals.
                  </p>
                </div>
                <div>
                  <div className="footerTitle">Explore</div>
                  <div className="footerLinks">
                    <Link href="/about">About</Link>
                    <Link href="/programs">Programs</Link>
                    <Link href="/admissions">Admissions</Link>
                    <Link href="/careers">Careers</Link>
                    <Link href="/contact">Contact</Link>
                  </div>
                </div>
                <div>
                  <div className="footerTitle">Hiring</div>
                  <div className="footerLinks">
                    <Link href="/careers">Open roles</Link>
                    <Link href="/apply">Apply</Link>
                    <Link href="/assessment">Assessment</Link>
                  </div>
                </div>
              </div>
              <div className="footerBottom">
                <span>© {new Date().getFullYear()} Kawaya Academy.</span>
                <span className="dot" aria-hidden="true">
                  •
                </span>
                <Link href="/privacy">Privacy</Link>
                <span className="dot" aria-hidden="true">
                  •
                </span>
                <Link href="/terms">Terms</Link>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}


