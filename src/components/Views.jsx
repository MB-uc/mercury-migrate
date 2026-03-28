import { useState } from 'react';
import MetricCards from './MetricCards';
import ScatterPlot from './ScatterPlot';
import {
  METRICS, DUPLICATE_PAIRS, GAP_MATRIX, BACKLOG_COLUMNS, REDIRECTS, AUDIENCE_SEGMENTS
} from '../data';

const SITE_COLORS = [
  { color: '#3b6fe8', label: 'AA Global' },
  { color: '#e05a2b', label: 'Teck' },
  { color: '#2d9e60', label: 'AA Peru' },
  { color: '#7c52cc', label: 'AA South Africa' },
  { color: '#c47a10', label: 'AA Australia' },
  { color: '#1a9e8c', label: 'Other sites' },
];

const ACTION_STYLES = {
  merge: { bg: '#dbeafe', color: '#1e40af' },
  review: { bg: '#fef3c7', color: '#92400e' },
  keep: { bg: '#dcfce7', color: '#166534' },
  retire: { bg: '#fee2e2', color: '#991b1b' },
  low: { bg: '#fee2e2', color: '#991b1b' },
  ready: { bg: '#dcfce7', color: '#166534' },
};

const COVERAGE_STYLES = {
  good: { bg: '#dcfce7', dot: '#16a34a' },
  thin: { bg: '#fef3c7', dot: '#ca8a04' },
  none: { bg: '#fee2e2', dot: '#dc2626' },
};

const STATUS_LABELS = {
  intact: { label: 'Intact', bg: '#dcfce7', color: '#166534' },
  risk: { label: 'At risk', bg: '#fef3c7', color: '#92400e' },
  broken: { label: 'Broken', bg: '#fee2e2', color: '#991b1b' },
};

function Badge({ type, label }) {
  const s = ACTION_STYLES[type] || ACTION_STYLES.review;
  return (
    <span style={{
      fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 500,
      background: s.bg, color: s.color, whiteSpace: 'nowrap',
    }}>{label || type}</span>
  );
}

function Card({ title, children, style }) {
  return (
    <div style={{
      background: 'var(--surface-1)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '14px 16px',
      marginBottom: 14,
      ...style,
    }}>
      {title && (
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

function FilterBar({ children }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {children}
    </div>
  );
}

function Select({ children }) {
  return (
    <select style={{
      fontSize: 12, padding: '5px 10px', borderRadius: 6,
      border: '1px solid var(--border)', background: 'var(--surface-2)',
      color: 'var(--text-1)', cursor: 'pointer',
    }}>
      {children}
    </select>
  );
}

// ─── VIEWS ───────────────────────────────────────────────────────────────────

export function LandscapeView() {
  return (
    <div>
      <MetricCards metrics={METRICS.landscape} />
      <Card title="Semantic landscape — all pages">
        <FilterBar>
          <Select>
            <option>All sites</option>
            <option>Anglo American (global)</option>
            <option>Teck Resources</option>
            <option>AA Peru</option>
            <option>AA South Africa</option>
          </Select>
          <Select>
            <option>All clusters</option>
            <option>Sustainability</option>
            <option>Operations</option>
            <option>Investor relations</option>
            <option>Community</option>
            <option>Careers</option>
          </Select>
        </FilterBar>
        <ScatterPlot />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          {SITE_COLORS.map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-2)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              {s.label}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function DuplicatesView() {
  return (
    <div>
      <MetricCards metrics={METRICS.duplicates} />
      <Card title="Near-duplicate pairs — sorted by similarity">
        <FilterBar>
          <Select>
            <option>All actions</option>
            <option>Merge recommended</option>
            <option>Keep both</option>
            <option>Needs review</option>
          </Select>
          <Select>
            <option>Score &gt; 0.90</option>
            <option>Score &gt; 0.85</option>
            <option>Score &gt; 0.75</option>
          </Select>
        </FilterBar>
        {DUPLICATE_PAIRS.map((pair, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 1fr 56px 90px',
            gap: 10, alignItems: 'center',
            padding: '10px 0',
            borderBottom: i < DUPLICATE_PAIRS.length - 1 ? '1px solid var(--border)' : 'none',
            fontSize: 12,
          }}>
            <div>
              <div style={{ color: 'var(--text-1)', fontWeight: 500, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pair.a.title}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{pair.a.site} · {pair.a.views} views · {pair.a.cos} co. visits</div>
            </div>
            <div style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 16 }}>⇄</div>
            <div>
              <div style={{ color: 'var(--text-1)', fontWeight: 500, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pair.b.title}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{pair.b.site} · {pair.b.views} views · {pair.b.cos} co. visits</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: pair.score > 0.93 ? '#1e40af' : '#2563eb', textAlign: 'right' }}>
              {pair.score.toFixed(2)}
            </div>
            <Badge type={pair.action} label={pair.actionLabel} />
          </div>
        ))}
      </Card>
    </div>
  );
}

export function GapsView() {
  const cols = ['AA Global', 'Teck', 'AA Regional', 'Merged', 'Action'];
  return (
    <div>
      <MetricCards metrics={METRICS.gaps} />
      <Card title="Coverage matrix — content clusters vs companies">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '160px repeat(5, 1fr)',
          gap: 1,
          background: 'var(--border)',
          borderRadius: 8,
          overflow: 'hidden',
          fontSize: 11,
        }}>
          <div style={{ background: 'var(--surface-2)', padding: '7px 10px', fontWeight: 600, color: 'var(--text-2)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Cluster</div>
          {cols.map(c => (
            <div key={c} style={{ background: 'var(--surface-2)', padding: '7px 8px', textAlign: 'center', fontWeight: 600, color: 'var(--text-2)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{c}</div>
          ))}
          {GAP_MATRIX.map((row, i) => {
            const cells = [row.aa, row.teck, row.regional, row.merged];
            const actionStyle = ACTION_STYLES[row.action === 'Merge' ? 'merge' : row.action === 'Keep AA' ? 'keep' : row.action === 'Integrate' ? 'review' : 'review'];
            return [
              <div key={`l${i}`} style={{ background: 'var(--surface-2)', padding: '7px 10px', color: 'var(--text-1)', fontSize: 11 }}>{row.cluster}</div>,
              ...cells.map((val, j) => {
                const cs = COVERAGE_STYLES[val];
                return (
                  <div key={`c${i}${j}`} style={{ background: cs.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 32 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: cs.dot }} />
                  </div>
                );
              }),
              <div key={`a${i}`} style={{ background: actionStyle.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 10, color: actionStyle.color, fontWeight: 500 }}>{row.action}</span>
              </div>,
            ];
          })}
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 11, color: 'var(--text-2)' }}>
          {[['#16a34a', 'Good coverage'], ['#ca8a04', 'Thin coverage'], ['#dc2626', 'Not present']].map(([c, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              {l}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function BacklogView() {
  return (
    <div>
      <MetricCards metrics={METRICS.backlog} />
      <Card title="Migration backlog">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
          {BACKLOG_COLUMNS.map(col => (
            <div key={col.id} style={{ background: 'var(--surface-2)', borderRadius: 8, padding: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{col.label}</span>
                <span style={{ fontSize: 10, background: 'var(--surface-1)', borderRadius: 8, padding: '1px 7px', color: 'var(--text-3)' }}>{col.count.toLocaleString()}</span>
              </div>
              {col.cards.map((card, i) => (
                <div key={i} style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '8px 10px',
                  marginBottom: 7,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-1)', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.title}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>
                    {card.badge ? <Badge type={card.badge} label={card.badge.charAt(0).toUpperCase() + card.badge.slice(1)} /> : card.meta}
                  </div>
                </div>
              ))}
              {col.overflow && (
                <div style={{ fontSize: 10, color: 'var(--text-3)', textAlign: 'center', padding: '8px 0' }}>+ {col.overflow.toLocaleString()} more</div>
              )}
              {col.empty && (
                <div style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center', padding: '16px 8px', border: '1px dashed var(--border)', borderRadius: 8 }}>{col.empty}</div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function RedirectsView() {
  return (
    <div>
      <MetricCards metrics={METRICS.redirects} />
      <Card title="Redirect map — sample">
        <FilterBar>
          <Select>
            <option>All confidence</option>
            <option>High (&gt;0.88)</option>
            <option>Medium</option>
            <option>Low</option>
          </Select>
          <Select>
            <option>All sources</option>
            <option>Teck.com</option>
            <option>AA Global</option>
            <option>AA Peru</option>
          </Select>
        </FilterBar>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 20px 1fr 56px 80px', gap: 10, padding: '4px 0 8px', fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--border)' }}>
          <div>Old URL</div><div /><div>New destination</div><div>Score</div><div>Status</div>
        </div>
        {REDIRECTS.map((r, i) => {
          const conf = r.score > 0.88 ? 'high' : r.score > 0.65 ? 'mid' : 'low';
          const confColor = conf === 'high' ? '#16a34a' : conf === 'mid' ? '#ca8a04' : '#dc2626';
          return (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 20px 1fr 56px 80px',
              gap: 10, alignItems: 'center',
              padding: '9px 0',
              borderBottom: i < REDIRECTS.length - 1 ? '1px solid var(--border)' : 'none',
              fontSize: 11,
            }}>
              <div style={{ color: 'var(--text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.from}</div>
              <div style={{ color: 'var(--text-3)', textAlign: 'center' }}>→</div>
              <div style={{ color: 'var(--text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.to}</div>
              <div style={{ fontWeight: 600, color: confColor }}>{r.score.toFixed(2)}</div>
              <Badge type={r.status} label={r.status === 'ready' ? 'Ready' : r.status === 'review' ? 'Review' : 'Low conf.'} />
            </div>
          );
        })}
      </Card>
    </div>
  );
}

export function JourneysView() {
  return (
    <div>
      <div style={{
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderLeft: '3px solid #3b82f6',
        borderRadius: 8,
        padding: '10px 14px',
        marginBottom: 14,
        fontSize: 12,
        color: '#1e40af',
      }}>
        Three-embedding option only. Journey continuity requires session-level embeddings derived from GA4 BigQuery export joined with Leadfeeder company data.
      </div>
      <MetricCards metrics={METRICS.journeys} />
      <Card title="Investor due-diligence journey — AA Global">
        <JourneySankey />
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>
          Entry → early → mid → late → exit. Width = session volume. Colour = journey cluster.
        </div>
      </Card>
      <Card title="Journey risk flags">
        {[
          { journey: 'Investors → results → sustainability report → Quellaveco', site: 'AA Global · 340 sessions · 18 institutional visitors', badge: 'broken', note: 'Quellaveco page proposed for retirement — breaks journey' },
          { journey: 'Homepage → copper → operations → trail operations', site: 'Teck · 210 sessions · 9 institutional visitors', badge: 'review', note: 'Trail operations redirect confidence: 0.61' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 12, padding: '10px 0', borderBottom: i === 0 ? '1px solid var(--border)' : 'none', alignItems: 'center', fontSize: 12 }}>
            <div>
              <div style={{ color: 'var(--text-1)', fontWeight: 500, marginBottom: 2 }}>{r.journey}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{r.site}</div>
            </div>
            <Badge type={r.badge} label={r.badge === 'broken' ? 'At risk' : 'Review'} />
            <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{r.note}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function JourneySankey() {
  const stages = ['Entry', 'Early', 'Mid', 'Late', 'Exit'];
  const nodes = [
    [{ label: 'Investors home', h: 60, y: 30, c: '#3b6fe8' }, { label: 'Direct search', h: 30, y: 105, c: '#7c52cc' }],
    [{ label: 'Results & reports', h: 50, y: 20, c: '#3b6fe8' }, { label: 'About / leadership', h: 25, y: 90, c: '#1a9e8c' }, { label: 'Products', h: 15, y: 130, c: '#c47a10' }],
    [{ label: '2024 results PDF', h: 40, y: 15, c: '#3b6fe8' }, { label: 'Sustainability', h: 30, y: 75, c: '#2d9e60' }, { label: 'Copper overview', h: 20, y: 120, c: '#e05a2b' }],
    [{ label: 'Quellaveco', h: 25, y: 10, c: '#2d9e60' }, { label: 'ESG data', h: 25, y: 55, c: '#2d9e60' }, { label: 'Financials', h: 25, y: 100, c: '#3b6fe8' }],
    [{ label: 'Download / exit', h: 45, y: 10, c: '#c47a10' }, { label: 'Careers / other', h: 25, y: 70, c: '#7c52cc' }],
  ];

  return (
    <svg width="100%" viewBox="0 0 700 170" style={{ display: 'block', borderRadius: 6, background: 'var(--surface-2)' }}>
      {nodes.map((col, ci) => {
        const xStep = 700 / 6;
        const x = xStep * (ci + 0.5);
        return (
          <g key={ci}>
            {col.map((n, ni) => (
              <g key={ni}>
                <rect x={x - 45} y={n.y} width={90} height={n.h} rx={4} fill={n.c + '33'} stroke={n.c} strokeWidth={1} />
                <text x={x} y={n.y + n.h / 2 + 3} textAnchor="middle" fontSize={8} fill={n.c} fontFamily="DM Sans, sans-serif">{n.label}</text>
                {ci < nodes.length - 1 && (() => {
                  const nx = xStep * (ci + 1.5);
                  const target = nodes[ci + 1][Math.min(ni, nodes[ci + 1].length - 1)];
                  const x1 = x + 45, y1 = n.y + n.h / 2;
                  const x2 = nx - 45, y2 = target.y + target.h / 2;
                  return (
                    <path
                      d={`M${x1},${y1} C${x1 + 40},${y1} ${x2 - 40},${y2} ${x2},${y2}`}
                      fill="none"
                      stroke={n.c + '66'}
                      strokeWidth={Math.max(2, n.h * 0.28)}
                    />
                  );
                })()}
              </g>
            ))}
            <text x={x} y={162} textAnchor="middle" fontSize={9} fill="#999" fontFamily="DM Sans, sans-serif">{stages[ci]}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function AudienceView() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <div>
      <div style={{
        background: '#fff7ed',
        border: '1px solid #fed7aa',
        borderLeft: '3px solid #f97316',
        borderRadius: 8,
        padding: '10px 14px',
        marginBottom: 14,
        fontSize: 12,
        color: '#9a3412',
      }}>
        Three-embedding option only. Journey continuity is assessed by matching each segment's typical session sequence against the proposed merged site architecture.
      </div>
      <MetricCards metrics={METRICS.audience} />
      <Card title="Audience continuity — high-value segments">
        <div style={{ display: 'grid', gridTemplateColumns: '180px 80px 1fr 80px 100px', gap: 12, padding: '4px 0 10px', fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--border)' }}>
          <div>Audience segment</div><div>Sessions</div><div>Typical journey</div><div>Status</div><div />
        </div>
        {AUDIENCE_SEGMENTS.map((seg) => {
          const st = STATUS_LABELS[seg.status];
          const isOpen = expanded === seg.id;
          return (
            <div key={seg.id}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '180px 80px 1fr 80px 100px',
                gap: 12, alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
                fontSize: 12,
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-1)', marginBottom: 2 }}>{seg.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{seg.companies}</div>
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text-1)' }}>
                  {seg.sessions}
                  <span style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 400, marginLeft: 3 }}>{seg.cos} cos</span>
                </div>
                <div style={{ display: 'flex', gap: 2, alignItems: 'center', height: 18 }}>
                  {seg.journey.map((j, ji) => (
                    <div key={ji} title={j.label} style={{
                      width: `${j.pct}%`, height: '100%', borderRadius: 2,
                      background: j.color,
                      fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.8)', overflow: 'hidden',
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 10, fontWeight: 600, background: st.bg, color: st.color, textAlign: 'center' }}>
                  {st.label}
                </span>
                <button
                  onClick={() => toggle(seg.id)}
                  style={{
                    fontSize: 11, padding: '4px 10px', borderRadius: 6, cursor: 'pointer',
                    border: '1px solid var(--border)', background: 'var(--surface-2)',
                    color: 'var(--text-2)',
                  }}
                >
                  {isOpen ? 'Hide pages ↑' : 'See pages ↓'}
                </button>
              </div>
              {isOpen && (
                <div style={{ background: 'var(--surface-2)', borderRadius: 8, padding: '10px 14px', margin: '4px 0 8px', gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-1)', marginBottom: 8 }}>Journey pages — {seg.name.toLowerCase()}</div>
                  {seg.pages.map((p, pi) => {
                    const ps = STATUS_LABELS[p.status];
                    return (
                      <div key={pi} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', borderBottom: pi < seg.pages.length - 1 ? '1px solid var(--border)' : 'none' }}>
                        <div style={{ flex: 1, fontSize: 11, color: 'var(--text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.url}</div>
                        {p.note && <div style={{ fontSize: 10, color: 'var(--text-3)', flexShrink: 0, maxWidth: 200 }}>{p.note}</div>}
                        <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: ps.bg, color: ps.color, fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>{ps.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 11, color: 'var(--text-2)' }}>
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 24, height: 10, borderRadius: 2, background: v.bg, border: `1px solid ${v.color}40` }} />
              {v.label}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
