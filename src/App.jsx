import { useState } from 'react';
import {
  LandscapeView, DuplicatesView, GapsView,
  BacklogView, RedirectsView, JourneysView, AudienceView
} from './components/Views';

const NAV = [
  {
    section: 'Analysis',
    items: [
      { id: 'landscape', label: 'Content landscape', color: '#3b6fe8', view: LandscapeView },
      { id: 'duplicates', label: 'Duplicates', color: '#e05a2b', view: DuplicatesView },
      { id: 'gaps', label: 'Gap analysis', color: '#2d9e60', view: GapsView },
    ],
  },
  {
    section: 'Workflow',
    items: [
      { id: 'backlog', label: 'Migration backlog', color: '#c47a10', view: BacklogView },
      { id: 'redirects', label: 'Redirect map', color: '#7c52cc', view: RedirectsView },
    ],
  },
  {
    section: 'Three-embedding only',
    sectionColor: '#e05a2b',
    items: [
      { id: 'journeys', label: 'Journey flows', color: '#e05a2b', view: JourneysView },
      { id: 'audience', label: 'Audience continuity', color: '#e05a2b', view: AudienceView },
    ],
  },
];

const VIEW_META = {
  landscape: 'Semantic clusters across all 13 sites',
  duplicates: 'Near-duplicate page pairs ranked by similarity',
  gaps: 'Content clusters missing from one or both companies',
  backlog: 'Editorial workflow — triage and decisions',
  redirects: 'Old URLs mapped to new destinations',
  journeys: 'Session-level journey analysis — three-embedding only',
  audience: 'High-value audience journey continuity — three-embedding only',
};

export default function App() {
  const [active, setActive] = useState('landscape');

  const allItems = NAV.flatMap(n => n.items);
  const activeItem = allItems.find(i => i.id === active);
  const ActiveView = activeItem?.view;

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: '"DM Sans", "Helvetica Neue", sans-serif', background: 'var(--bg)', color: 'var(--text-1)', fontSize: 14 }}>

      {/* Sidebar */}
      <div style={{
        width: 200, minWidth: 200, borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        background: 'var(--surface-1)',
      }}>
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Content migration</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>Anglo American × Teck</div>
        </div>

        <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {NAV.map(group => (
            <div key={group.section}>
              <div style={{
                fontSize: 10, color: group.sectionColor || 'var(--text-3)',
                padding: '10px 16px 4px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>
                {group.section}
              </div>
              {group.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    width: '100%', padding: '7px 16px',
                    background: active === item.id ? 'var(--surface-2)' : 'transparent',
                    border: 'none', borderLeft: active === item.id ? `2px solid ${item.color}` : '2px solid transparent',
                    color: active === item.id ? 'var(--text-1)' : 'var(--text-2)',
                    fontWeight: active === item.id ? 600 : 400,
                    fontSize: 13, cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'inherit',
                    transition: 'all 0.12s',
                  }}
                >
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-3)' }}>
          2,451 pages · 13 sites<br />
          <span style={{ color: 'var(--text-3)' }}>March 2026</span>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '11px 20px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface-1)',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>{activeItem?.label}</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{VIEW_META[active]}</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {ActiveView && <ActiveView />}
        </div>
      </div>
    </div>
  );
}
