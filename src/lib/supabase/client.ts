"use client";

import { createClient } from "@supabase/supabase-js";
import { getRequiredPublicEnv } from "@/lib/env";

export const supabase = createClient(
  getRequiredPublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
  getRequiredPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);


