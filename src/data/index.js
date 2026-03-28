export const METRICS = {
  landscape: [
    { label: 'Total pages', value: '2,451', sub: 'across 13 sites' },
    { label: 'Semantic clusters', value: '34', sub: 'after UMAP reduction' },
    { label: 'Near-duplicates', value: '312', sub: '>0.85 similarity' },
    { label: 'Content gaps', value: '18', sub: 'clusters missing from one co.' },
  ],
  duplicates: [
    { label: 'Probable duplicates', value: '89', sub: '>0.92 similarity' },
    { label: 'Near-duplicates', value: '223', sub: '0.75 – 0.92' },
    { label: 'Auto-recommended', value: '61', sub: 'clear traffic winner' },
    { label: 'Needs review', value: '251', sub: 'competing signals' },
  ],
  gaps: [
    { label: 'New pages needed', value: '47', sub: 'gaps in merged estate' },
    { label: 'AA-only clusters', value: '11', sub: 'no Teck equivalent' },
    { label: 'Teck-only clusters', value: '7', sub: 'no AA equivalent' },
    { label: 'Multilingual gaps', value: '23', sub: 'EN content, no translation' },
  ],
  backlog: [
    { label: 'Total decisions', value: '2,451', sub: 'pages to triage' },
    { label: 'Complete', value: '341', sub: '14% done', progress: 14 },
    { label: 'In review', value: '128', sub: 'assigned to editors' },
    { label: 'Est. remaining', value: '6.2w', sub: 'at current pace' },
  ],
  redirects: [
    { label: 'Total redirects', value: '2,451', sub: 'old URLs to map' },
    { label: 'High confidence', value: '1,204', sub: '>0.88 match score' },
    { label: 'Low confidence', value: '389', sub: 'no good match found' },
    { label: 'Retire (no redirect)', value: '858', sub: '→ 404 / category page' },
  ],
  journeys: [
    { label: 'Session clusters', value: '12', sub: 'distinct journey types' },
    { label: 'Journeys at risk', value: '3', sub: 'broken by current plan' },
    { label: 'High-value journeys', value: '4', sub: 'institutional visitors' },
    { label: 'Redirect conflicts', value: '14', sub: 'journey role mismatch' },
  ],
  audience: [
    { label: 'Audience segments', value: '9', sub: 'via Leadfeeder matching' },
    { label: 'Journeys intact', value: '4', sub: 'fully preserved' },
    { label: 'Journeys at risk', value: '3', sub: 'pages changing mid-journey' },
    { label: 'Journeys broken', value: '2', sub: 'requires immediate action' },
  ],
};

export const DUPLICATE_PAIRS = [
  {
    a: { title: 'Copper operations overview', site: 'angloamerican.com', views: '4,210', cos: 3 },
    b: { title: 'Copper — our operations', site: 'teck.com', views: '1,840', cos: 1 },
    score: 0.96,
    action: 'merge',
    actionLabel: 'Merge →AA',
  },
  {
    a: { title: 'Sustainability strategy 2025', site: 'angloamerican.com', views: '6,102', cos: 12 },
    b: { title: 'Our approach to sustainability', site: 'teck.com', views: '3,900', cos: 7 },
    score: 0.94,
    action: 'review',
    actionLabel: 'Review',
  },
  {
    a: { title: 'Water stewardship programme', site: 'angloamerican.com', views: '820', cos: 0 },
    b: { title: 'Water management at our sites', site: 'teck.com', views: '1,100', cos: 2 },
    score: 0.91,
    action: 'merge',
    actionLabel: 'Merge →Teck',
  },
  {
    a: { title: 'Board of directors', site: 'angloamerican.com', views: '9,440', cos: 28 },
    b: { title: 'Board of directors', site: 'teck.com', views: '7,210', cos: 19 },
    score: 0.91,
    action: 'review',
    actionLabel: 'Review',
  },
  {
    a: { title: 'Health and safety report 2024', site: 'southafrica.angloamerican.com', views: '430', cos: 0 },
    b: { title: 'Safety performance 2024', site: 'teck.com', views: '390', cos: 0 },
    score: 0.90,
    action: 'merge',
    actionLabel: 'Merge →AA',
  },
];

export const GAP_MATRIX = [
  { cluster: 'Critical minerals', aa: 'good', teck: 'good', regional: 'thin', merged: 'good', action: 'Merge' },
  { cluster: 'Crop nutrients / Poly4', aa: 'good', teck: 'none', regional: 'thin', merged: 'thin', action: 'New pages' },
  { cluster: 'Canada operations', aa: 'none', teck: 'good', regional: 'none', merged: 'thin', action: 'Integrate' },
  { cluster: 'Quellaveco / Peru', aa: 'thin', teck: 'none', regional: 'good', merged: 'good', action: 'Keep AA' },
  { cluster: 'Sakatti / Finland', aa: 'thin', teck: 'none', regional: 'good', merged: 'thin', action: 'New pages' },
  { cluster: 'Investor relations', aa: 'good', teck: 'good', regional: 'thin', merged: 'good', action: 'Merge' },
];

export const BACKLOG_COLUMNS = [
  {
    id: 'unreviewed', label: 'Unreviewed', count: 1982,
    cards: [
      { title: 'Quellaveco community impact', meta: 'AA Peru · High priority · 2,100 views' },
      { title: 'Teck steelmaking coal archive', meta: 'Teck · Medium · 340 views' },
      { title: 'Minas-Rio pipeline update', meta: 'AA Brasil · High · 890 views' },
    ],
    overflow: 1979,
  },
  {
    id: 'review', label: 'In review', count: 128,
    cards: [
      { title: 'Sustainability strategy 2025', meta: 'AA Global · Sarah K. · Due today' },
      { title: 'Board of directors', meta: 'Both · James R. · Due Mon' },
      { title: 'Copper products overview', meta: 'AA Chile · Auto-rec: merge' },
    ],
  },
  {
    id: 'decided', label: 'Decided', count: 341,
    cards: [
      { title: 'Annual report 2024', meta: 'Keep AA · done', badge: 'keep' },
      { title: 'Water stewardship', meta: 'Merge · done', badge: 'merge' },
      { title: 'Legacy Sullivan mine', meta: 'Retire · done', badge: 'retire' },
    ],
  },
  {
    id: 'published', label: 'Published', count: 0,
    cards: [],
    empty: 'CMS injection begins when first batch is approved',
  },
];

export const REDIRECTS = [
  { from: 'teck.com/operations/copper', to: 'newsite.com/operations/copper', score: 0.96, status: 'ready' },
  { from: 'teck.com/sustainability/water', to: 'newsite.com/sustainability/water-stewardship', score: 0.91, status: 'ready' },
  { from: 'teck.com/about/board-of-directors', to: 'newsite.com/about/leadership', score: 0.79, status: 'review' },
  { from: 'teck.com/operations/legacy/sullivan-mine', to: 'newsite.com/history', score: 0.41, status: 'low' },
  { from: 'aa.com/crop-nutrients/woodsmith', to: 'newsite.com/crop-nutrients/woodsmith', score: 0.98, status: 'ready' },
];

export const AUDIENCE_SEGMENTS = [
  {
    id: 'analysts',
    name: 'Mining analysts',
    companies: 'Wood Mackenzie, Bernstein, BMO',
    sessions: 340, cos: 18,
    status: 'broken',
    journey: [
      { label: 'Investors', pct: 15, color: '#7c3aed' },
      { label: 'Results PDF', pct: 22, color: '#9d5aed' },
      { label: 'Sustainability', pct: 18, color: '#b07de0' },
      { label: 'Quellaveco', pct: 22, color: '#c4a0e8' },
      { label: 'Exit/DL', pct: 23, color: '#ddd6f3' },
    ],
    pages: [
      { url: 'angloamerican.com/investors', status: 'intact' },
      { url: 'angloamerican.com/~/media/.../2024-results-presentation.pdf', status: 'intact' },
      { url: 'angloamerican.com/sustainability', status: 'risk' },
      { url: 'peru.angloamerican.com/quellaveco/el-proyecto', status: 'broken', note: 'Proposed retirement — breaks journey' },
    ],
  },
  {
    id: 'institutional',
    name: 'Institutional investors',
    companies: 'BlackRock, Norges, Vanguard',
    sessions: 210, cos: 12,
    status: 'intact',
    journey: [
      { label: 'IR home', pct: 18, color: '#1d4ed8' },
      { label: 'Annual report', pct: 25, color: '#2563eb' },
      { label: 'ESG data', pct: 20, color: '#3b82f6' },
      { label: 'Leadership', pct: 20, color: '#60a5fa' },
      { label: 'Exit', pct: 17, color: '#bfdbfe' },
    ],
    pages: [
      { url: 'angloamerican.com/investors', status: 'intact' },
      { url: 'angloamerican.com/investors/annual-reporting', status: 'intact' },
      { url: 'angloamerican.com/sustainability/esg-data', status: 'intact' },
      { url: 'angloamerican.com/about-us/leadership-team', status: 'intact', note: 'Merging with Teck equivalent' },
    ],
  },
  {
    id: 'steel',
    name: 'Steel producers',
    companies: 'Nippon Steel, POSCO, Baowu',
    sessions: 190, cos: 9,
    status: 'risk',
    journey: [
      { label: 'Products', pct: 20, color: '#065f46' },
      { label: 'Iron ore', pct: 25, color: '#059669' },
      { label: 'Minas-Rio', pct: 20, color: '#34d399' },
      { label: 'Kumba', pct: 20, color: '#6ee7b7' },
      { label: 'Contact', pct: 15, color: '#d1fae5' },
    ],
    pages: [
      { url: 'singapore.angloamerican.com/products', status: 'risk', note: 'Site merge — redirect confidence 0.74' },
      { url: 'singapore.angloamerican.com/iron-ore', status: 'risk', note: 'Redirect confidence 0.71' },
      { url: 'brasil.angloamerican.com/minas-rio', status: 'intact' },
      { url: 'angloamericankumba.com/products', status: 'risk', note: 'Kumba consolidation — path unclear' },
    ],
  },
  {
    id: 'copper',
    name: 'Copper buyers',
    companies: 'Jiangxi Copper, Aurubis, KME',
    sessions: 155, cos: 7,
    status: 'intact',
    journey: [
      { label: 'Products', pct: 18, color: '#6d28d9' },
      { label: 'Copper', pct: 22, color: '#7c3aed' },
      { label: 'Quellaveco', pct: 22, color: '#a78bfa' },
      { label: 'Collahuasi', pct: 22, color: '#c4b5fd' },
      { label: 'Inquiry', pct: 16, color: '#ede9fe' },
    ],
    pages: [
      { url: 'angloamerican.com/our-portfolio/our-products/copper', status: 'intact' },
      { url: 'chile.angloamerican.com/quellaveco', status: 'intact' },
      { url: 'chile.angloamerican.com/collahuasi', status: 'intact' },
      { url: 'teck.com/products/products-inquiry-form', status: 'intact', note: 'Merging — high confidence 0.93' },
    ],
  },
  {
    id: 'swf',
    name: 'Sovereign wealth funds',
    companies: 'GIC, Mubadala, PIF',
    sessions: 98, cos: 6,
    status: 'risk',
    journey: [
      { label: 'IR home', pct: 20, color: '#1e3a8a' },
      { label: 'Strategy', pct: 20, color: '#1d4ed8' },
      { label: 'Crop nutrients', pct: 20, color: '#3b82f6' },
      { label: 'Woodsmith', pct: 22, color: '#93c5fd' },
      { label: 'Exit', pct: 18, color: '#dbeafe' },
    ],
    pages: [
      { url: 'angloamerican.com/investors', status: 'intact' },
      { url: 'angloamerican.com/about-us/our-strategy', status: 'intact' },
      { url: 'uk.angloamerican.com/crop-nutrients', status: 'risk', note: 'UK site consolidation — redirect TBD' },
      { url: 'uk.angloamerican.com/futureoffertiliser', status: 'risk', note: 'Redirect confidence 0.68' },
    ],
  },
  {
    id: 'agri',
    name: 'Fertiliser / agri buyers',
    companies: 'Yara, ICL, OCI',
    sessions: 74, cos: 5,
    status: 'broken',
    journey: [
      { label: 'Poly4 site', pct: 22, color: '#14532d' },
      { label: 'Product benefits', pct: 25, color: '#16a34a' },
      { label: 'Trial data', pct: 25, color: '#4ade80' },
      { label: 'Contact', pct: 28, color: '#bbf7d0' },
    ],
    pages: [
      { url: 'poly4.com', status: 'broken', note: 'Poly4 domain fate undecided — entire journey at risk' },
      { url: 'poly4.com/product-benefits', status: 'broken', note: 'No equivalent on merged site yet' },
      { url: 'poly4.com/trial-data', status: 'broken', note: 'No equivalent on merged site yet' },
      { url: 'poly4.com/contact', status: 'risk', note: 'Could redirect to Crop Nutrients contact' },
    ],
  },
];
