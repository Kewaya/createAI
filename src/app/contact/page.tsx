import type { Metadata } from "next";
import { ContactClient } from "@/app/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact — Kawaya Academy",
  description: "Contact Kawaya Academy for admissions questions, partnerships, or hiring inquiries.",
};

export default function ContactPage() {
  return <ContactClient />;
}


