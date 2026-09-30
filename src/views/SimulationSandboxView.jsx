// ==========================================================================
// AURA What-If Simulation & Alternative Route Evaluation Sandbox
// Interactive Parameter Sliders (Signal Preemption, Traffic Density, Escort)
// ==========================================================================

import React, { useState } from 'react';
import { Cpu, Sliders, Zap, CheckCircle2, Shield, AlertTriangle, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function SimulationSandboxView({
  rerouteOptions,
  activeRouteId,
  onExecuteReroute
}) {
  // Interactive Simulation Controls State
  const [signalPreemptionLevel, setSignalPreemptionLevel] = useState(100); // 0 - 100%
  const [trafficDensityReduction, setTrafficDensityReduction] = useState(35); // % cleared
  const [policeEscortActive, setPoliceEscortActive] = useState(true);
  const [rainIntensity, setRainIntensity] = useState(42); // mm/h

  // Compute Simulated ETAs dynamically based on slider parameters
  const preemptionBonus = (signalPreemptionLevel / 100) * 4.2; // saves up to 4.2 mins
  const densityBonus = (trafficDensityReduction / 100) * 3.8; // saves up to 3.8 mins
  const escortBonus = policeEscortActive ? 2.5 : 0; // saves 2.5 mins
  const rainPenalty = (rainIntensity / 50) * 1.5; // adds up to 1.5 mins

  const simulatedRoutes = rerouteOptions.map(r => {
    let simTime = r.estimatedTimeMinutes;

    if (r.id === 'ROUTE-B') {
      // Primary recommended corridor benefits most from preemption & escort
      simTime = Math.max(8.5, parseFloat((r.estimatedTimeMinutes - preemptionBonus - densityBonus - escortBonus + rainPenalty).toFixed(1)));
    } else if (r.id === 'ROUTE-A') {
      // Degraded corridor benefits less due to physical truck block
      simTime = Math.max(18.0, parseFloat((r.estimatedTimeMinutes - (densityBonus * 0.3) + rainPenalty).toFixed(1)));
    } else if (r.id === 'ROUTE-C') {
      simTime = Math.max(12.0, parseFloat((r.estimatedTimeMinutes - preemptionBonus * 0.6 - escortBonus * 0.5 + rainPenalty).toFixed(1)));
    }

    return {
      ...r,
      simulatedTime: simTime,
      simulatedTimeSaved: parseFloat((24.8 - simTime).toFixed(1))
    };
  });

  const chartData = simulatedRoutes.map(r => ({
    name: r.id === 'ROUTE-B' ? 'Corridor Beta (AURA)' : r.id === 'ROUTE-A' ? 'Route A (Hosur)' : 'Route C (ORR)',
    'Baseline ETA': r.estimatedTimeMinutes,
    'Simulated ETA': r.simulatedTime
  }));

  return (
    <div style={{ padding: 24, overflowY: 'auto', width: '100%', height: '100%', background: 'var(--bg-main)' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Cpu color="var(--cyan-primary)" size={24} />
            WHAT-IF EMERGENCY RESPONSE SIMULATION SANDBOX
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Simulate dynamic signal preemption, traffic diversion, police escort, and micro-climate parameters in real-time.
          </p>
        </div>

        <div className="status-pill operational">
          <span className="pulse-dot"></span>
          <span>SIMULATION ENGINE: ONLINE</span>
        </div>
      </div>

      {/* Main Grid: Parameters Control Panel + Route Comparison Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, marginBottom: 24 }}>
        {/* Left: Interactive Control Sliders */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-title-bar">
            <div className="panel-title">
              <Sliders size={16} color="var(--cyan-primary)" />
              <span>SIMULATION PARAMETERS</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Slider 1: Signal Preemption Readiness */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 6 }}>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>Signal Preemption Readiness</span>
                <span className="font-mono" style={{ color: 'var(--cyan-primary)', fontWeight: 700 }}>{signalPreemptionLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={signalPreemptionLevel}
                onChange={e => setSignalPreemptionLevel(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Sets green wave priority across 4 signal nodes</span>
            </div>

            {/* Slider 2: Corridor Traffic Clearance */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 6 }}>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>Dynamic Corridor Clearance</span>
                <span className="font-mono" style={{ color: 'var(--emerald-success)', fontWeight: 700 }}>{trafficDensityReduction}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={trafficDensityReduction}
                onChange={e => setTrafficDensityReduction(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--emerald-success)', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Simulates driver pull-over compliance</span>
            </div>

            {/* Toggle: Traffic Police Mobile Escort */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15, 23, 42, 0.6)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#ffffff' }}>Traffic Police Intercept</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Motorcycle escort clears Madiwala junction</div>
              </div>
              <input
                type="checkbox"
                checked={policeEscortActive}
                onChange={e => setPoliceEscortActive(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 3: Monsoon Rain Intensity */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 6 }}>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>Rain Intensity Impact</span>
                <span className="font-mono" style={{ color: 'var(--amber-warning)', fontWeight: 700 }}>{rainIntensity} mm/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={rainIntensity}
                onChange={e => setRainIntensity(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--amber-warning)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Right: Comparative Chart & Corridor Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Comparison Bar Chart */}
          <div className="panel-card" style={{ margin: 0, height: 260 }}>
            <div className="panel-title-bar">
              <div className="panel-title">
                <BarChart size={16} color="var(--emerald-success)" />
                <span>ETA COMPARISON: BASELINE VS SIMULATED PREEMPTION</span>
              </div>
            </div>

            <div style={{ width: '100%', height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} unit=" min" />
                  <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: 8, color: '#ffffff' }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Baseline ETA" fill="#ff2a5f" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Simulated ETA" fill="#00e676" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cards for each candidate corridor */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {simulatedRoutes.map(route => {
              const isSelected = activeRouteId === route.id;
              const isRecommended = route.isRecommended;

              return (
                <div
                  key={route.id}
                  className="panel-card"
                  style={{
                    margin: 0,
                    borderColor: isSelected ? 'var(--emerald-success)' : isRecommended ? 'var(--cyan-primary)' : 'var(--border-subtle)',
                    background: isSelected ? 'rgba(0, 230, 118, 0.08)' : 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: isRecommended ? 'var(--cyan-primary)' : 'var(--text-muted)' }}>
                      {route.id}
                    </span>
                    {isRecommended && <span className="log-tag obs">OPTIMAL</span>}
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>
                    {route.name}
                  </div>

                  <div className="metrics-grid-2x2" style={{ marginBottom: 12 }}>
                    <div className="metric-tile">
                      <span className="metric-label">SIMULATED ETA</span>
                      <span className={`metric-value ${isRecommended ? 'emerald' : 'amber'}`}>
                        {route.simulatedTime} min
                      </span>
                    </div>
                    <div className="metric-tile">
                      <span className="metric-label">RISK INDEX</span>
                      <span className={`metric-value ${route.riskScore < 3 ? 'emerald' : 'red'}`}>
                        {route.riskScore}/10
                      </span>
                    </div>
                  </div>

                  {isRecommended && !isSelected && (
                    <button className="btn-primary" style={{ width: '100%', padding: '6px 10px', fontSize: '0.75rem' }} onClick={onExecuteReroute}>
                      <Zap size={14} /> DISPATCH THIS REROUTE
                    </button>
                  )}
                  {isSelected && (
                    <div style={{ textAlign: 'center', fontSize: '0.74rem', color: 'var(--emerald-success)', fontWeight: 700 }}>
                      ✓ ACTIVE DISPATCH CORRIDOR
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
