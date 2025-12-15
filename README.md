# Kawaya Academy Operator Competition Hiring Platform

Minimal, self-filtering hiring + assessment website (static frontend on GitHub Pages, backend on Supabase).

## Tech stack

- **Frontend**: Next.js static export (GitHub Pages)
- **Backend**: Supabase (Auth email+password + email confirmation, Postgres, Storage)

## Supabase setup

1. **Create a Supabase project**.
2. **Auth settings**
   - Enable **Email confirmations**.
   - Set **Auth → URL Configuration**:
     - **Site URL**: `https://<github_user>.github.io/<repo>/`
     - **Redirect URLs**:
       - `https://<github_user>.github.io/<repo>/`
       - `https://<github_user>.github.io/<repo>/apply/`
       - `https://<github_user>.github.io/<repo>/assessment/`
       - `https://<github_user>.github.io/<repo>/thank-you/`
     - (Optional for local dev) `http://localhost:3000/` and the same paths.
3. **Database schema**
   - In Supabase **SQL Editor**, run the SQL in [`supabase/schema.sql`](supabase/schema.sql).
4. **Storage**
   - Ensure Storage is enabled.
   - The schema SQL attempts to create the bucket `assessment-uploads` and policies. If your project blocks that, create the bucket in the UI and then run the storage policy statements.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# For local dev, keep this empty:
NEXT_PUBLIC_BASE_PATH=
```

3. Run:

```bash
npm run dev
```

## GitHub Pages deployment

### 1) Repo settings

- In GitHub: **Settings → Pages**
  - **Source**: GitHub Actions
  - Ensure your default branch is `main` (the deploy workflow triggers on `main` pushes).

### 2) Add build-time env vars

Add these as **Repository secrets** (Settings → Secrets and variables → Actions → Secrets):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Add this as an **Actions variable** (Settings → Secrets and variables → Actions → Variables):

- `NEXT_PUBLIC_BASE_PATH`
  - For project pages (most repos): set to `/<repo-name>`
  - For a user/organization pages repo like `<user>.github.io`: leave empty

### 3) Deploy

Push to `main`. The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) will build a static export to `out/` and deploy to GitHub Pages.

Note: This repo includes `public/.nojekyll` so GitHub Pages serves Next’s `_next/` assets correctly.

## Upload constraints

- **Max size**: 25MB
- **Allowed types**: pdf, png, jpg, jpeg, docx, txt, md, zip


