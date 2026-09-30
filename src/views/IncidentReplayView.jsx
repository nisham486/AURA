// ==========================================================================
// AURA Incident Replay & Post-Mission Analytics View
// Timeline Scrubber Playback, Telemetry Speed Delta Graph, Audit Logs
// ==========================================================================

import React, { useState, useEffect } from 'react';
import { History, Play, Pause, FastForward, RotateCcw, Award, CheckCircle2, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function IncidentReplayView({ ambulance }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [replayTimeIndex, setReplayTimeIndex] = useState(60); // 0 - 100% scrubber
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Playback timer effect
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setReplayTimeIndex(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 200 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Telemetry chart data representing speed over time during mission
  const telemetryHistory = [
    { time: '19:40', speed: 45, baselineDelay: 0, auraDelay: 0 },
    { time: '19:41', speed: 48, baselineDelay: 0, auraDelay: 0 },
    { time: '19:42', speed: 42, baselineDelay: 1, auraDelay: 0 },
    { time: '19:43', speed: 18, baselineDelay: 4, auraDelay: 1 },
    { time: '19:44', speed: 6.4, baselineDelay: 8, auraDelay: 2 }, // ANOMALY
    { time: '19:45', speed: 12, baselineDelay: 11, auraDelay: 2 }, // AURA DISPATCH
    { time: '19:46', speed: 46, baselineDelay: 15, auraDelay: 1.5 }, // GREEN WAVE ACTIVE
    { time: '19:47', speed: 52, baselineDelay: 19, auraDelay: 1 },
    { time: '19:48', speed: 55, baselineDelay: 22, auraDelay: 0.5 },
    { time: '19:49', speed: 48, baselineDelay: 25, auraDelay: 0 } // ARRIVAL
  ];

  return (
    <div style={{ padding: 24, overflowY: 'auto', width: '100%', height: '100%', background: 'var(--bg-main)' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 10 }}>
            <History color="var(--cyan-primary)" size={24} />
            INCIDENT REPLAY & POST-MISSION ANALYTICS
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Mission Audit #MISSION-2026-889 • Bangalore Silk Board - NIMHANS Transit
          </p>
        </div>

        <button className="btn-secondary" style={{ color: 'var(--cyan-primary)', borderColor: 'var(--border-glow)' }}>
          <FileSpreadsheet size={15} />
          <span>EXPORT MISSION COMPLIANCE REPORT</span>
        </button>
      </div>

      {/* Top Report Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="panel-card" style={{ margin: 0 }}>
          <span className="metric-label">TIME SAVED BY AURA</span>
          <div className="metric-value emerald" style={{ fontSize: '1.6rem', marginTop: 4 }}>
            13.6 MIN
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Reduced ETA from 24.8m to 11.2m</span>
        </div>

        <div className="panel-card" style={{ margin: 0 }}>
          <span className="metric-label">GREEN WAVE EFFICIENCY</span>
          <div className="metric-value emerald" style={{ fontSize: '1.6rem', marginTop: 4 }}>
            100% (4/4)
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Zero red signal stops encountered</span>
        </div>

        <div className="panel-card" style={{ margin: 0 }}>
          <span className="metric-label">PATIENT SPO2 STABILITY</span>
          <div className="metric-value emerald" style={{ fontSize: '1.6rem', marginTop: 4 }}>
            91% (STABLE)
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Prevented critical hypoxemic drop</span>
        </div>

        <div className="panel-card" style={{ margin: 0 }}>
          <span className="metric-label">DECISION AUDIT HASH</span>
          <div className="font-mono" style={{ fontSize: '0.82rem', color: 'var(--cyan-primary)', fontWeight: 700, marginTop: 8 }}>
            0x98f4...b2a1
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Verifiable GeoAgent Audit Trail</span>
        </div>
      </div>

      {/* Replay Timeline Controls Bar */}
      <div className="panel-card" style={{ margin: 0, marginBottom: 24, borderColor: 'var(--cyan-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div className="panel-title">
            <History size={16} color="var(--cyan-primary)" />
            <span>MISSION TIMELINE SCRUBBER</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="btn-secondary" onClick={() => { setReplayTimeIndex(0); setIsPlaying(false); }}>
              <RotateCcw size={14} />
            </button>
            <button className="btn-primary" style={{ padding: '6px 14px' }} onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY REPLAY'}</span>
            </button>
            <button className={`btn-secondary ${playbackSpeed === 2 ? 'active' : ''}`} onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 2 : 1)}>
              <FastForward size={14} />
              <span>{playbackSpeed}x</span>
            </button>
          </div>
        </div>

        {/* Timeline Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={replayTimeIndex}
          onChange={e => setReplayTimeIndex(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6 }} className="font-mono">
          <span>19:40:00 (Pickup)</span>
          <span style={{ color: 'var(--red-critical)', fontWeight: 700 }}>19:44:15 (Anomaly Flag)</span>
          <span style={{ color: 'var(--emerald-success)', fontWeight: 700 }}>19:45:20 (Corridor Beta Dispatched)</span>
          <span>19:49:12 (Hospital Arrival)</span>
        </div>
      </div>

      {/* Telemetry Line Chart */}
      <div className="panel-card" style={{ margin: 0, height: 280 }}>
        <div className="panel-title-bar">
          <div className="panel-title">
            <LineChart size={16} color="var(--cyan-primary)" />
            <span>VEHICLE SPEED & ACCUMULATED DELAY DELTA</span>
          </div>
        </div>

        <div style={{ width: '100%', height: 210 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: 8, color: '#ffffff' }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="speed" stroke="#00f2fe" strokeWidth={3} name="Speed (km/h)" />
              <Line type="monotone" dataKey="baselineDelay" stroke="#ff2a5f" strokeWidth={2} strokeDasharray="4 4" name="Baseline Delay (min)" />
              <Line type="monotone" dataKey="auraDelay" stroke="#00e676" strokeWidth={2.5} name="AURA Delay (min)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
