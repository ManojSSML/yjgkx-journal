# YJGKX Journal Clone

A pixel-perfect clone of the Journal of Basic Science and Engineering website, built with **Next.js 14 + Sanity CMS**, deployable to **Vercel**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| CMS | Sanity v3 |
| Styling | Tailwind CSS |
| Deployment | Vercel |
| Language | TypeScript |

---

## Project Structure

```
yjgkx-clone/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (server component)
│   ├── globals.css
│   └── studio/[[...tool]]/ # Sanity Studio at /studio
├── components/
│   ├── Header.tsx          # Top banner + nav
│   ├── Footer.tsx
│   ├── Sidebar.tsx         # Submit + Indexed By
│   ├── JournalInfoTable.tsx
│   └── ArticleCard.tsx
├── lib/
│   ├── sanity.ts           # Sanity client
│   └── queries.ts          # GROQ queries
├── sanity/
│   └── schemas/
│       ├── index.ts
│       ├── journalInfo.ts
│       ├── issue.ts
│       └── article.ts
├── sanity.config.ts        # Sanity Studio config
├── next.config.js
├── tailwind.config.js
└── vercel.json
```

---

## Setup Instructions

### Step 1: Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create a free account
2. Run: `npx sanity@latest init` inside this folder (or use Sanity dashboard)
3. Copy your **Project ID** from the Sanity dashboard

### Step 2: Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_read_token_here   # optional for public data
```

To get a token: Sanity Dashboard → API → Tokens → Add API token (Viewer role is enough)

### Step 3: Install & Run Locally

```bash
npm install
npm run dev
```

- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

### Step 4: Add Content in Sanity Studio

1. Open http://localhost:3000/studio
2. Create a **Journal Info** document with your journal details
3. Create **Article** documents for each paper
4. Create an **Issue** document and link the articles to it

### Step 5: Deploy to Vercel

#### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```

#### Option B: GitHub + Vercel Dashboard
1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
4. Deploy!

### Step 6: Configure Sanity CORS (Important!)

In the Sanity dashboard → API → CORS Origins, add:
- `http://localhost:3000` (for development)
- `https://your-vercel-domain.vercel.app` (for production)

---

## CMS Content Structure

### Journal Info
- Title, Chinese title, Publisher, ISSN, Subject Area
- Email, SJR Score, Quartile, Copyright Year

### Issue
- Volume, Number, Year
- List of linked Articles

### Article
- Title, Authors (array), Page Start/End
- PDF URL or PDF File upload
- Abstract, Keywords
- Reference to parent Issue

---

## Customization

- **Colors**: Edit `tailwind.config.js` → `colors.primary`
- **Nav links**: Edit `components/Header.tsx` → `navLinks` array
- **Fallback data**: Edit `app/page.tsx` → `fallbackJournalInfo` / `fallbackIssue`
- **Indexed by logos**: Edit `components/Sidebar.tsx`

---

## Notes

- The site works **without Sanity** using hardcoded fallback data (matching the screenshot)
- Once Sanity env vars are set, it switches to live CMS data automatically
- Pages revalidate every 60 seconds (ISR) for fast performance + fresh content
- Sanity Studio is embedded at `/studio` route — protect it in production if needed
