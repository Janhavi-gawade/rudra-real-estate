# 🚀 Rudra Property — GitHub & Vercel Deployment Guide

This guide walks you through deploying the **Rudra Property** website to **GitHub** and **Vercel** with a free hosted PostgreSQL database (via **Supabase** or **Neon**).

---

## Step 1: Push Code to GitHub

1. Go to [GitHub.com](https://github.com) and click **"New Repository"**.
2. Name your repository (e.g., `rudra-real-estate` or `rudra-property`).
3. Leave it **Public** or **Private**, and **do NOT** initialize with README or .gitignore (we already have them). Click **"Create repository"**.
4. In your terminal, run the following commands (replace `YOUR_GITHUB_USERNAME` and `REPO_NAME`):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/REPO_NAME.git
git push -u origin main
```

---

## Step 2: Set Up Free Cloud PostgreSQL (Supabase or Neon)

Because Vercel serverless functions have a read-only filesystem in production, we connect to a free hosted PostgreSQL database.

### Option A: Supabase (Recommended)
1. Go to [Supabase.com](https://supabase.com) and create a free account.
2. Click **"New Project"**, name it `rudra-property-db`, and set a strong database password.
3. Choose the region nearest to you: **South Asia (Mumbai)**.
4. Once created, go to **Project Settings ➔ Database ➔ Connection string ➔ URI**.
5. Copy the URI. It looks like:
   `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### Switch Prisma Provider to PostgreSQL:
In `prisma/schema.prisma`, update the datasource:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then run in your local terminal:
```bash
# Push schema to Supabase PostgreSQL
npx prisma db push

# Seed your Pune luxury listings into Supabase
npx tsx prisma/seed.ts
```

---

## Step 3: Deploy to Vercel (1-Click)

1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..." ➔ "Project"**.
3. Select your GitHub repository (`rudra-real-estate`) and click **"Import"**.
4. In the **Environment Variables** section, add:

| Key | Example Value |
| :--- | :--- |
| `DATABASE_URL` | Your Supabase or Neon PostgreSQL connection URI |
| `JWT_SECRET` | `rudra-luxury-real-estate-secret-key-2026` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` (or custom domain) |
| `NEXT_PUBLIC_BROKER_PHONE` | `7798504435` |
| `NEXT_PUBLIC_BROKER_WHATSAPP` | `917798504435` |
| `NEXT_PUBLIC_BROKER_EMAIL` | `rudrapropertypune@gmail.com` |
| `NEXT_PUBLIC_OFFICE_ADDRESS` | `Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa, Pune 411036` |

5. Click **"Deploy"**. Vercel will install dependencies, generate the Prisma client via `postinstall`, build the Next.js app, and provide your live production URL (e.g., `https://rudra-real-estate.vercel.app`)!

---

## Step 4: Connecting Your Custom Domain (e.g. `rudrapropertypune.com`)

1. Buy your domain on GoDaddy, Namecheap, or Hostinger (~₹800/yr).
2. On Vercel dashboard, go to **Settings ➔ Domains**.
3. Type your domain: `rudrapropertypune.com` and click **Add**.
4. Add the standard DNS records shown on Vercel to your domain registrar DNS panel:
   * **A Record:** `@` ➔ `76.76.21.21`
   * **CNAME Record:** `www` ➔ `cname.vercel-dns.com`
5. Vercel automatically issues a free SSL certificate within a few minutes!
