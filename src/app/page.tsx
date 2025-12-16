import { HomeClient } from "./HomeClient";

export default function LandingPage() {
  // Keep page as a Server Component; HomeClient handles client-only animations.
  return <HomeClient />;
}


