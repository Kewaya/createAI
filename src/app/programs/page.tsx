import type { Metadata } from "next";
import { ProgramsClient } from "./ProgramsClient";

export const metadata: Metadata = {
  title: "Programs — Kawaya Academy",
  description:
    "Programs focused on AI generation, AI creation, and AI automation—supported by strong software fundamentals and portfolio artifacts.",
};

export default function ProgramsPage() {
  return <ProgramsClient />;
}


