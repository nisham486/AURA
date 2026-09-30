// ==========================================================================
// AURA Command Header Component
// Operational indicators, IEEE Girl Geeks 2026 badge, live tickers, & sound toggles
// ==========================================================================

import React from 'react';
import { Activity, ShieldAlert, Volume2, VolumeX, FileText, Sparkles, AlertCircle } from 'lucide-react';

export default function Header({
  workflowStep,
  systemStatus,
  soundEnabled,
  onToggleSound,
  onOpenIEEEModal,
  ambulance
}) {
  return (
    <header className="aura-header">
      {/* Brand Identity */}
      <div className="brand-section">
        <div className="brand-logo-badge">
          <span>A</span>
        </div>
        <div>
          <div className="brand-title">AURA GEOAGENT</div>
          <div className="brand-subtitle">Adaptive Urban Response Agent</div>
        </div>

        <button className="ieee-badge" onClick={onOpenIEEEModal} title="Click to view IEEE Proposal Specification">
          <Sparkles size={13} />
          <span>IEEE Girl Geeks 2026: Use Case 02</span>
        </button>
      </div>

      {/* Center Operational Status Ticker */}
      <div className="header-center-info">
        <div className={`status-pill ${systemStatus === 'ANOMALY_DETECTED' ? 'critical' : 'operational'}`}>
          <span className="pulse-dot"></span>
          <span>{systemStatus === 'ANOMALY_DETECTED' ? 'ANOMALY DETECTED: ROUTE DELAY' : 'GEOAGENT ACTIVE (99.4%)'}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>CITY: </span>
            <span className="font-mono" style={{ color: '#ffffff', fontWeight: 600 }}>BANGALORE METRO</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>WEATHER: </span>
            <span className="font-mono" style={{ color: 'var(--amber-warning)', fontWeight: 600 }}>RAIN 42mm/h</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>UNIT: </span>
            <span className="font-mono" style={{ color: 'var(--cyan-primary)', fontWeight: 600 }}>{ambulance?.id || 'AMB-101'}</span>
          </div>
        </div>
      </div>

      {/* Right Quick Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          className="btn-secondary"
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Audio Alerts' : 'Enable Audio Alerts'}
        >
          {soundEnabled ? <Volume2 size={16} color="var(--cyan-primary)" /> : <VolumeX size={16} color="var(--text-muted)" />}
          <span style={{ fontSize: '0.75rem' }}>{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
        </button>

        <button className="btn-secondary" onClick={onOpenIEEEModal}>
          <FileText size={15} />
          <span>SYSTEM SPEC</span>
        </button>
      </div>
    </header>
  );
}
