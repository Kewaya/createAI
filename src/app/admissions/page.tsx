import type { Metadata } from "next";
import { AdmissionsClient } from "./AdmissionsClient";

export const metadata: Metadata = {
  title: "Admissions — Kawaya Academy",
  description:
    "How admissions works at Kawaya Academy: who it’s for, what we look for, and how to prepare for skills-first learning.",
};

export default function AdmissionsPage() {
  return <AdmissionsClient />;
}


