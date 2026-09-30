// ==========================================================================
// AURA Multi-Source Intelligence & Cause Investigation View
// CCTV Computer Vision Feed Simulator, IoT Sensors, & Cause Attribution
// ==========================================================================

import React from 'react';
import { Camera, Radio, AlertOctagon, CloudRain, Eye, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function MultiSourceIntelView({ evidence }) {
  const attributionData = evidence.rootCauseAttribution.map(item => ({
    name: item.cause,
    value: item.contributionPercentage
  }));

  const COLORS = ['#ff2a5f', '#ffb703', '#00f2fe'];

  return (
    <div style={{ padding: 24, overflowY: 'auto', width: '100%', height: '100%', background: 'var(--bg-main)' }}>
      {/* Page Title Bar */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Eye color="var(--cyan-primary)" size={24} />
            MULTI-SOURCE INTELLIGENCE & CAUSE INVESTIGATION
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Real-time Sensor Fusion Engine • CCTV Vision Analysis • IoT Density Mesh • Civic Incident Ingest
          </p>
        </div>

        <div className="status-pill warning">
          <span className="pulse-dot"></span>
          <span>INVESTIGATION COMPLETE: 3 ROOT CAUSES IDENTIFIED</span>
        </div>
      </div>

      {/* Top Grid: CCTV Simulator + Cause Attribution Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20, marginBottom: 24 }}>
        {/* CCTV Vision AI Simulation Canvas */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-title-bar">
            <div className="panel-title">
              <Camera size={16} color="var(--cyan-primary)" />
              <span>CCTV COMPUTER VISION FEED (CAM #24 - HOSUR ROAD)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: 'var(--red-critical)' }}>
              <span className="cctv-rec-dot"></span>
              <span className="font-mono">LIVE AI ANALYTICS</span>
            </div>
          </div>

          <div className="cctv-canvas-frame" style={{ height: 280 }}>
            <div className="cctv-hud-overlay">
              <span>CAM-24-HOSUR-SOUTH</span>
              <span>19:45:14 IST • AI CONFIDENCE: 94.2%</span>
            </div>

            {/* Simulated Street Canvas with Overlays */}
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Grid Lines */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(0, 242, 254, 0.15) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />

              {/* Bounding Box 1: Stalled Truck */}
              <div style={{
                position: 'absolute',
                left: '25%',
                top: '20%',
                width: '180px',
                height: '110px',
                border: '2px solid #ff2a5f',
                background: 'rgba(255, 42, 95, 0.15)',
                borderRadius: 4,
                padding: 4
              }}>
                <span className="log-tag warn" style={{ fontSize: '0.65rem' }}>
                  OBSTACLE: STALLED TRUCK (96%)
                </span>
              </div>

              {/* Bounding Box 2: Waterlogging */}
              <div style={{
                position: 'absolute',
                left: '10%',
                bottom: '15%',
                width: '320px',
                height: '70px',
                border: '2px dashed #ffb703',
                background: 'rgba(255, 183, 3, 0.15)',
                borderRadius: 4,
                padding: 4
              }}>
                <span className="log-tag" style={{ background: 'rgba(255, 183, 3, 0.3)', color: '#ffb703', fontSize: '0.65rem' }}>
                  HAZARD: WATERLOGGING 45CM (91%)
                </span>
              </div>

              {/* Bounding Box 3: Double Parking */}
              <div style={{
                position: 'absolute',
                right: '15%',
                top: '30%',
                width: '130px',
                height: '90px',
                border: '2px solid #00f2fe',
                background: 'rgba(0, 242, 254, 0.15)',
                borderRadius: 4,
                padding: 4
              }}>
                <span className="log-tag obs" style={{ fontSize: '0.65rem' }}>
                  ILLEGAL PARKING (88%)
                </span>
              </div>

              <div style={{ position: 'relative', zIndex: 2, color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>
                [HOSUR ROAD SOUTHBOUND CARRIAGEWAY FEED]
              </div>
            </div>
          </div>
        </div>

        {/* Cause Attribution Chart */}
        <div className="panel-card" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="panel-title-bar">
            <div className="panel-title">
              <Layers size={16} color="var(--purple-xai)" />
              <span>ROOT CAUSE ATTRIBUTION WEIGHTS</span>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 220, paddingTop: 10 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attributionData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={11} unit="%" />
                <YAxis dataKey="name" type="category" width={140} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: 8, color: '#ffffff' }}
                  formatter={(val) => [`${val}%`, 'Contribution Weight']}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
                  {attributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Grid: IoT Sensors + Civic Report + Micro Weather */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {/* IoT Traffic Loop Grid */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-title-bar">
            <div className="panel-title">
              <Radio size={16} color="var(--cyan-primary)" />
              <span>IOT TRAFFIC MESH</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="metric-tile">
              <span className="metric-label">SENSOR NODE</span>
              <span className="metric-value">{evidence.iotSensorData.sensorId}</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">VEHICLE FLOW RATE</span>
              <span className="metric-value red">{evidence.iotSensorData.vehicleCountPerMin} veh/min</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">GRID CAPACITY RATIO</span>
              <span className="metric-value red">{evidence.iotSensorData.densityPercentage}% (OVER CAPACITY)</span>
            </div>
          </div>
        </div>

        {/* Civic Incident Feed */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-title-bar">
            <div className="panel-title">
              <AlertOctagon size={16} color="var(--amber-warning)" />
              <span>CIVIC INCIDENT REPORT</span>
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--amber-warning)', fontWeight: 700, marginBottom: 6 }}>
            {evidence.civicReport.source}
          </div>
          <p style={{ fontSize: '0.8rem', color: '#e2e8f0', marginBottom: 12, lineHeight: 1.5 }}>
            "{evidence.civicReport.description}"
          </p>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }} className="font-mono">
            TIMESTAMP: {evidence.civicReport.timestamp} IST
          </div>
        </div>

        {/* Weather Impact Radar */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-title-bar">
            <div className="panel-title">
              <CloudRain size={16} color="var(--cyan-secondary)" />
              <span>MICRO-WEATHER IMPACT</span>
            </div>
          </div>

          <div className="metrics-grid-2x2">
            <div className="metric-tile">
              <span className="metric-label">RAINFALL INTENSITY</span>
              <span className="metric-value amber">{evidence.weatherImpact.rainfallMmH} mm/h</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">VISIBILITY</span>
              <span className="metric-value">{evidence.weatherImpact.visibilityMeters} m</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">ROAD GRIP FACTOR</span>
              <span className="metric-value red">{evidence.weatherImpact.roadGripFactor}</span>
            </div>
            <div className="metric-tile">
              <span className="metric-label">DRAINAGE INDEX</span>
              <span className="metric-value red">DEGRADED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
