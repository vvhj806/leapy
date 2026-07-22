const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export class SupabaseConfigError extends Error {
  constructor(missingKeys: string[]) {
    super(
      `Supabase environment variables are missing: ${missingKeys.join(", ")}`,
    );
    this.name = "SupabaseConfigError";
  }
}

export function hasSupabaseEnv() {
  return Boolean(supabaseUrl?.trim() && supabasePublishableKey?.trim());
}

export function getSupabaseEnv() {
  const missingKeys: string[] = [];

  if (!supabaseUrl?.trim()) {
    missingKeys.push("NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabasePublishableKey?.trim()) {
    missingKeys.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }

  if (missingKeys.length > 0) {
    throw new SupabaseConfigError(missingKeys);
  }

  return {
    url: supabaseUrl as string,
    publishableKey: supabasePublishableKey as string,
  };
}
