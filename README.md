# Content migration dashboard — Anglo American × Teck

A React dashboard for visualising the content migration pipeline across 13 corporate websites.

## Views

**Analysis**
- Content landscape — UMAP scatter of all 2,451 pages by semantic cluster
- Duplicates — near-duplicate page pairs with behavioural metadata
- Gap analysis — coverage matrix showing content missing from one or both companies

**Workflow**
- Migration backlog — kanban board for editorial triage
- Redirect map — old URLs mapped to new destinations with confidence scores

**Three-embedding only**
- Journey flows — session-level Sankey diagrams showing user navigation patterns
- Audience continuity — high-value segment journey preservation status

## Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm install -g vercel
npm install
vercel
```

### Option 2 — GitHub + Vercel UI
1. Push this folder to a GitHub repository
2. Go to vercel.com → New project → Import your repo
3. Framework will be auto-detected as Create React App
4. Click Deploy

### Option 3 — Drag and drop
```bash
npm install
npm run build
```
Then drag the `build/` folder to vercel.com/new

## Local development
```bash
npm install
npm start
```
Opens at http://localhost:3000

## Stack
- React 18
- Create React App
- DM Sans (Google Fonts)
- Canvas API for scatter plot
- SVG for Sankey diagram
- No external chart libraries — all rendering is bespoke
