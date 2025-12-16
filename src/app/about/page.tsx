import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Kawaya Academy",
  description:
    "Kawaya Academy helps learners build practical AI generation, creation, and automation skills—grounded in strong software fundamentals.",
};

export default function AboutPage() {
  return <AboutClient />;
}


