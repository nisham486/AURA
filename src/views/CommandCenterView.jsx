// ==========================================================================
// AURA Command Center View
// Primary Tactical Command Room (Map + Telemetry + Agent Stream + Trigger Sandbox)
// ==========================================================================

import React from 'react';
import LeafletEmergencyMap from '../components/LeafletEmergencyMap';
import { Activity, Heart, ShieldAlert, Zap, Navigation, ArrowUpRight, Cpu, CheckCircle2 } from 'lucide-react';

export default function CommandCenterView({
  ambulance,
  activeRouteId,
  signals,
  selectedSignalId,
  onSelectSignal,
  agentLogs,
  rerouteOptions,
  onExecuteReroute,
  onTriggerAnomaly,
  workflowStep,
  onStepChange
}) {
  const recommendedRoute = rerouteOptions.find(r => r.isRecommended) || rerouteOptions[1];
  const isRerouted = activeRouteId === 'ROUTE-B';

  return (
    <div className="command-center-layout">
      {/* Left Sidebar: Telemetry & Patient Vitals */}
      <div className="left-telemetry-sidebar">
        {/* Ambulance Telemetry Card */}
        <div className="panel-card">
          <div className="panel-title-bar">
            <div className="panel-title">
              <Navigation size={16} color="var(--cyan-primary)" />
              <span>VEHICLE TELEMETRY</span>
            </div>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--cyan-primary)', fontWeight: 700 }}>
              {ambulance.id}
            </span>
          </div>

          <div style={{ fontSize: '0.82rem', marginBottom: 10 }}>
            <div style={{ fontWeight: 700, color: '#ffffff' }}>{ambulance.callSign}</div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{ambulance.vehicleType}</div>
          </div>

          <div className="metrics-grid-2x2">
            <div className="metric-tile">
              <span className="metric-label">SPEED</span>
              <span className={`metric-value ${ambulance.currentLocation.speedKmH < 15 ? 'red' : 'emerald'}`}>
                {ambulance.currentLocation.speedKmH} km/h
              </span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">HEADING</span>
              <span className="metric-value">{ambulance.currentLocation.heading}° NW</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">BASELINE ETA</span>
              <span className="metric-value">{ambulance.etaBaselineMinutes} min</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">PREDICTED ETA</span>
              <span className={`metric-value ${isRerouted ? 'emerald' : 'red'}`}>
                {ambulance.etaPredictedMinutes} min
              </span>
            </div>
          </div>
        </div>

        {/* Patient Vitals Card */}
        <div className="panel-card" style={{ borderColor: 'rgba(255, 42, 95, 0.3)' }}>
          <div className="panel-title-bar">
            <div className="panel-title" style={{ color: 'var(--red-critical)' }}>
              <Heart size={16} />
              <span>PATIENT CRITICAL MONITOR</span>
            </div>
            <span className="log-tag warn">ALS TRIAGE 1</span>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#f8fafc', fontWeight: 600, marginBottom: 8 }}>
            {ambulance.patientVitals.patientName}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--amber-warning)', marginBottom: 12 }}>
            Condition: {ambulance.patientVitals.condition}
          </div>

          <div className="metrics-grid-2x2">
            <div className="metric-tile">
              <span className="metric-label">HEART RATE</span>
              <span className="metric-value red">{ambulance.patientVitals.heartRateBpm} BPM</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">SpO2 LEVEL</span>
              <span className="metric-value amber">{ambulance.patientVitals.spO2Percentage}%</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">BLOOD PRESSURE</span>
              <span className="metric-value" style={{ fontSize: '0.92rem' }}>{ambulance.patientVitals.bloodPressure}</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">O2 RESERVE</span>
              <span className="metric-value red">{ambulance.patientVitals.oxygenLevelRemaining}%</span>
            </div>
          </div>
        </div>

        {/* Transit Destination Card */}
        <div className="panel-card">
          <div className="panel-title-bar">
            <div className="panel-title">
              <ArrowUpRight size={16} color="var(--emerald-success)" />
              <span>TRAUMA CENTER TARGET</span>
            </div>
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
            {ambulance.destinationHospital}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Trauma Bay #02 Pre-alert Sent • Emergency Team Standby
          </div>
        </div>
      </div>

      {/* Center: Interactive Leaflet Map & Quick Action Overlay */}
      <div className="center-map-container">
        {/* Floating Top Banner Alert */}
        <div className="map-floating-overlay" style={{ left: 16, right: 'auto', top: 16 }}>
          <div className="map-control-box" style={{ borderColor: isRerouted ? 'var(--emerald-success)' : 'var(--red-critical)' }}>
            <div className={`pulse-dot`} style={{ background: isRerouted ? 'var(--emerald-success)' : 'var(--red-critical)' }}></div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>
                {isRerouted ? 'CORRIDOR BETA ACTIVE (GREEN WAVE PREEMPTED)' : 'ANOMALY DETECTED: HOSUR ROAD WATERLOG & CONTAINER BLOCK'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                {isRerouted ? 'ETA reduced from 24.8m to 11.2m (-54.8%)' : 'Delay Penalty: +11.3 min. GeoAgent recommends Immediate Reroute.'}
              </div>
            </div>
            {!isRerouted ? (
              <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={onExecuteReroute}>
                <Zap size={14} /> ACTIVATE CORRIDOR BETA
              </button>
            ) : (
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', color: 'var(--emerald-success)' }} onClick={() => onStepChange('EXPLAIN')}>
                <CheckCircle2 size={14} /> VIEW XAI RATIONALE
              </button>
            )}
          </div>
        </div>

        <LeafletEmergencyMap
          ambulance={ambulance}
          activeRouteId={activeRouteId}
          signals={signals}
          selectedSignalId={selectedSignalId}
          onSelectSignal={onSelectSignal}
        />
      </div>

      {/* Right Sidebar: GeoAgent Stream & Explainable Recommendation */}
      <div className="right-agent-stream-sidebar">
        {/* Recommended Corridor Card */}
        <div className="panel-card" style={{ borderColor: isRerouted ? 'var(--emerald-success)' : 'var(--cyan-primary)' }}>
          <div className="panel-title-bar">
            <div className="panel-title" style={{ color: 'var(--cyan-primary)' }}>
              <Cpu size={16} />
              <span>GEOAGENT RECOMMENDATION</span>
            </div>
            <span className="log-tag obs">CONFIDENCE 94%</span>
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>
            {recommendedRoute.name}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.4 }}>
            {recommendedRoute.keyAdvantage}
          </p>

          <div className="metrics-grid-2x2" style={{ marginBottom: 12 }}>
            <div className="metric-tile">
              <span className="metric-label">NEW ETA</span>
              <span className="metric-value emerald">{recommendedRoute.estimatedTimeMinutes} min</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">TIME SAVED</span>
              <span className="metric-value emerald">13.6 min</span>
            </div>
          </div>

          {!isRerouted ? (
            <button className="btn-primary" style={{ width: '100%' }} onClick={onExecuteReroute}>
              <Zap size={16} /> EXECUTE REROUTE & SIGNAL PREEMPT
            </button>
          ) : (
            <div style={{ background: 'rgba(0, 230, 118, 0.1)', border: '1px solid var(--emerald-success)', borderRadius: 8, padding: 10, textAlign: 'center', fontSize: '0.78rem', color: 'var(--emerald-success)', fontWeight: 700 }}>
              ✓ CORRIDOR BETA DISPATCHED & PREEMPTED
            </div>
          )}
        </div>

        {/* Live GeoAgent Thinking Stream */}
        <div className="panel-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="panel-title-bar">
            <div className="panel-title">
              <Activity size={16} color="var(--purple-xai)" />
              <span>AGENT THOUGHT STREAM</span>
            </div>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>LIVE INGEST</span>
          </div>

          <div className="agent-thinking-stream" style={{ flex: 1 }}>
            {agentLogs.map(log => (
              <div key={log.id} className="log-entry">
                <span className="log-timestamp">{log.timestamp}</span>
                <span className={`log-tag ${log.type}`}>{log.type}</span>
                <span style={{ color: '#e2e8f0', flex: 1 }}>{log.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
