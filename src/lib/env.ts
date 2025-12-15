export function getRequiredPublicEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required env var ${name}. Set it in your GitHub Pages build environment (Actions) or local .env.local.`
    );
  }
  return value;
}


