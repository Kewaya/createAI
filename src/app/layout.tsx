import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { NavAuth } from "@/components/nav/NavAuth";

export const metadata: Metadata = {
  title: "Kawaya Academy — Operator Competition Hiring Platform",
  description:
    "A self-filtering hiring platform and multi-stage assessment for a Community Growth & Automation Operator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="container">
            <div className="nav">
              <div className="brand">
                <Link href="/">Kawaya Academy</Link>
              </div>
              <NavAuth />
            </div>
            {children}
            <div className="footer">
              © {new Date().getFullYear()} Kawaya Academy. Minimal, no-nonsense assessment experience.
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}


