# PHASE 1: FOUNDATION (Week 1-2)

**Objective:** Build the technical foundation for ResearchOS

## Task Checklist

### ✅ TASK 1: Repository Setup (Monday)
- [ ] Create GitHub repo: `daniandraaa/researchos`
- [ ] Initialize monorepo structure
- [ ] Setup Branch protection + PR requirements
- [ ] Add .gitignore, README

```bash
# Command
gh repo create researchos --public
git init
```

### ✅ TASK 2: Frontend Setup (Tuesday)
- [ ] Create Next.js 16 project (TypeScript)
- [ ] Install: React 19, Tailwind CSS, Shadcn/ui, Recharts
- [ ] Setup layout, auth flow pages
- [ ] Install: next-auth, @supabase/auth-helpers-nextjs

```bash
# Command
cd researchos
npx create-next-app@latest frontend --typescript --tailwind
cd frontend
npm install recharts @shadcn-ui/components next-auth @supabase/auth-helpers-nextjs
```

### ✅ TASK 3: Backend Setup (Tuesday)
- [ ] Create Node.js Express project (TypeScript)
- [ ] Install: express, typescript, dotenv, cors, helmet
- [ ] Setup: request logging, error handling middleware
- [ ] Install: @supabase/supabase-js, stripe (payments)

```bash
# Command
cd researchos
mkdir backend
cd backend
npm init -y
npm install express typescript ts-node dotenv cors helmet
npm install @supabase/supabase-js stripe
npx tsc --init
```

### ✅ TASK 4: Database & Auth Setup (Wednesday)
- [ ] Create Supabase project
- [ ] Setup PostgreSQL schema (SQL migration files)
- [ ] Configure RLS policies (users, orgs, projects)
- [ ] Setup NextAuth.js + Google OAuth provider
- [ ] Test auth flow (login, signup, callback)

**SQL Schema File:** `backend/migrations/001_initial_schema.sql`

```sql
-- Users & Organizations
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subscription_tier TEXT DEFAULT 'free',
  seats INT DEFAULT 5,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY users_own_data ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY org_members_can_view ON organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE org_id = organizations.id
      AND user_id = auth.uid()
    )
  );
```

### ✅ TASK 5: API Scaffold (Thursday)
- [ ] Create Express server (port 5000)
- [ ] Setup API routes: `/api/auth`, `/api/projects`, `/api/datasets`
- [ ] Add request validation (zod)
- [ ] Setup error handling & logging

**Key Endpoints:**
```
POST   /api/auth/login          (OAuth)
POST   /api/auth/logout         
GET    /api/projects            (list user's projects)
POST   /api/projects            (create project)
GET    /api/projects/:id        (get project)
POST   /api/datasets/:project_id (upload dataset)
GET    /api/datasets/:project_id (list datasets)
```

### ✅ TASK 6: Deployment Infrastructure (Friday)
- [ ] Setup Vercel deployment for frontend
- [ ] Setup VPS backend deployment (port 5000)
- [ ] Configure environment variables (.env)
- [ ] Setup GitHub Actions CI/CD

**GitHub Actions:** `.github/workflows/deploy.yml`
```yaml
on: [push]
jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
      - name: Deploy to Vercel
        run: vercel --prod
```

### ✅ TASK 7: Dashboard UI Scaffold (Friday-Saturday)
- [ ] Create landing page component
- [ ] Create login/signup page
- [ ] Create dashboard layout (sidebar + main)
- [ ] Create project list page
- [ ] Add loading states & error handling

**Components to Create:**
```
components/
  ├── Navigation.tsx
  ├── Sidebar.tsx
  ├── ProjectCard.tsx
  ├── DatasetUpload.tsx
pages/
  ├── index.tsx (landing)
  ├── auth/login.tsx
  ├── auth/signup.tsx
  ├── dashboard/index.tsx
  ├── dashboard/projects/[id].tsx
```

---

## 📊 DELIVERABLES (End of Week 2)

✅ GitHub repo with monorepo structure  
✅ Next.js frontend deployed on Vercel  
✅ Express backend ready on VPS  
✅ Supabase PostgreSQL + RLS configured  
✅ Google OAuth working  
✅ Dashboard scaffold (login → project list)  
✅ CI/CD pipeline active  

---

## 🚨 RISKS & MITIGATION

| Risk | Mitigation |
|------|-----------|
| Supabase RLS complexity | Start simple, iterate on policies |
| OAuth flow issues | Test locally first, use ngrok if needed |
| Database schema changes | Use migrations, version control DB |
| Deployment delays | Pre-test VPS setup, use Vercel for safety |

---

## 📅 TIMELINE

- **Monday:** GitHub repo + tech decisions
- **Tuesday:** Frontend + Backend projects created
- **Wednesday:** Supabase + Auth integration
- **Thursday:** API scaffold + first endpoints
- **Friday:** Deployment setup + CI/CD
- **Saturday-Sunday:** Dashboard UI + polish

---

## 🔗 DEPENDENCIES

- GitHub account ✅
- Supabase account ✅
- Vercel account ✅
- VPS access (20.219.30.151) ✅
- Google OAuth credentials (create via Google Cloud Console)
- Stripe account (optional, for payments)

---

**Status:** Ready to Start  
**Lead:** Pak Daniandra  
**Support:** Daffa (CEO Agent) + Elara (Ops)  

