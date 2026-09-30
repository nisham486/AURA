// ==========================================================================
// AURA Control Room Action Hub & Infrastructure Dispatch Suite
// 1-Click Execution for Signal Preemption, Police Push, Driver HUD, & Hospital
// ==========================================================================

import React, { useState } from 'react';
import { Zap, Radio, Shield, HeartHandshake, CheckCircle2, AlertCircle, PhoneCall } from 'lucide-react';
import { playAlertSound } from '../utils/audioUtils';

export default function ControlActionHubView({
  signals,
  onExecuteReroute,
  activeRouteId
}) {
  const [dispatchStatus, setDispatchStatus] = useState({
    signalPreemption: activeRouteId === 'ROUTE-B',
    driverHudSync: activeRouteId === 'ROUTE-B',
    policeDispatch: activeRouteId === 'ROUTE-B',
    hospitalAlert: activeRouteId === 'ROUTE-B'
  });

  const handleAction = (key, actionName) => {
    playAlertSound('DISPATCH');
    setDispatchStatus(prev => ({ ...prev, [key]: true }));
  };

  const handleDispatchAll = () => {
    playAlertSound('DISPATCH');
    setDispatchStatus({
      signalPreemption: true,
      driverHudSync: true,
      policeDispatch: true,
      hospitalAlert: true
    });
    if (onExecuteReroute) onExecuteReroute();
  };

  return (
    <div style={{ padding: 24, overflowY: 'auto', width: '100%', height: '100%', background: 'var(--bg-main)' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Zap color="var(--emerald-success)" size={24} />
            CONTROL ROOM DISPATCH & INFRASTRUCTURE ACTION HUB
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            One-Touch Execution Suite • Traffic Signal IoT Mesh • Traffic Police Push • Hospital Trauma Pre-Alert
          </p>
        </div>

        <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #00e676 0%, #10b981 100%)', boxShadow: '0 0 20px rgba(0, 230, 118, 0.4)' }} onClick={handleDispatchAll}>
          <Zap size={18} /> EXECUTE FULL EMERGENCY DISPATCH
        </button>
      </div>

      {/* Dispatch Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Action 1: Traffic Signal Green-Wave Override */}
        <div className="panel-card" style={{ margin: 0, borderColor: dispatchStatus.signalPreemption ? 'var(--emerald-success)' : 'var(--border-subtle)' }}>
          <div className="panel-title-bar">
            <div className="panel-title" style={{ color: 'var(--cyan-primary)' }}>
              <Radio size={16} />
              <span>1. TRAFFIC SIGNAL GREEN WAVE OVERRIDE</span>
            </div>
            {dispatchStatus.signalPreemption && <span className="log-tag act">PREEMPTED</span>}
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
            Overrides 4 sequential signals along Madiwala Corridor Beta (JUNC-01, JUNC-02, JUNC-03, JUNC-04) to guaranteed Green wave.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {signals.slice(0, 4).map(sig => (
              <div key={sig.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15, 23, 42, 0.6)', padding: '6px 10px', borderRadius: 6, fontSize: '0.75rem' }}>
                <span>{sig.name}</span>
                <span className="font-mono" style={{ color: dispatchStatus.signalPreemption ? 'var(--emerald-success)' : 'var(--amber-warning)', fontWeight: 700 }}>
                  {dispatchStatus.signalPreemption ? 'GREEN PREEMPTED' : 'STANDARD CYCLE'}
                </span>
              </div>
            ))}
          </div>

          <button
            className={`btn-${dispatchStatus.signalPreemption ? 'secondary' : 'primary'}`}
            style={{ width: '100%' }}
            onClick={() => handleAction('signalPreemption', 'Signal Preemption')}
          >
            {dispatchStatus.signalPreemption ? <CheckCircle2 size={16} color="var(--emerald-success)" /> : <Zap size={16} />}
            <span>{dispatchStatus.signalPreemption ? 'SIGNAL PREEMPTION ACTIVE' : 'PREEMPT TRAFFIC SIGNALS'}</span>
          </button>
        </div>

        {/* Action 2: Driver HUD Navigation Sync */}
        <div className="panel-card" style={{ margin: 0, borderColor: dispatchStatus.driverHudSync ? 'var(--emerald-success)' : 'var(--border-subtle)' }}>
          <div className="panel-title-bar">
            <div className="panel-title" style={{ color: 'var(--cyan-primary)' }}>
              <Radio size={16} />
              <span>2. AMBULANCE DRIVER HUD TRANSMISSION</span>
            </div>
            {dispatchStatus.driverHudSync && <span className="log-tag act">SYNCED</span>}
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
            Pushes dynamic turn-by-turn route to Ramesh Kumar's vehicle telemetry screen via encrypted WebSocket.
          </p>

          <div className="font-mono" style={{ background: 'rgba(6, 9, 17, 0.9)', border: '1px dashed var(--cyan-primary)', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: '0.76rem' }}>
            <div style={{ color: 'var(--cyan-primary)', fontWeight: 700, marginBottom: 4 }}>[DRIVER HUD MESSAGE]</div>
            <div style={{ color: '#ffffff' }}>&gt; TURN RIGHT in 200m onto Madiwala Flyover Bypass.</div>
            <div style={{ color: 'var(--emerald-success)' }}>&gt; Signal JUNC-02 set to Preempted Green. Maintain 50 km/h.</div>
          </div>

          <button
            className={`btn-${dispatchStatus.driverHudSync ? 'secondary' : 'primary'}`}
            style={{ width: '100%' }}
            onClick={() => handleAction('driverHudSync', 'Driver HUD Sync')}
          >
            {dispatchStatus.driverHudSync ? <CheckCircle2 size={16} color="var(--emerald-success)" /> : <Zap size={16} />}
            <span>{dispatchStatus.driverHudSync ? 'HUD TELEMETRY SYNCED' : 'PUSH ROUTE TO AMBULANCE HUD'}</span>
          </button>
        </div>

        {/* Action 3: Traffic Police Field Escort */}
        <div className="panel-card" style={{ margin: 0, borderColor: dispatchStatus.policeDispatch ? 'var(--emerald-success)' : 'var(--border-subtle)' }}>
          <div className="panel-title-bar">
            <div className="panel-title" style={{ color: 'var(--amber-warning)' }}>
              <Shield size={16} />
              <span>3. BANGALORE TRAFFIC POLICE MOBILE PUSH</span>
            </div>
            {dispatchStatus.policeDispatch && <span className="log-tag act">UNIT DISPATCHED</span>}
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
            Dispatches nearest BTP Motorcycle Patrol (Unit BTP-402) to clear bottlenecks at Tavarekere junction.
          </p>

          <div style={{ fontSize: '0.78rem', color: '#ffffff', marginBottom: 12 }}>
            <div><b>Assigned Patrol:</b> Unit BTP-402 (Head Constable Suresh)</div>
            <div style={{ color: 'var(--text-muted)' }}>Location: 400m from Madiwala Underpass</div>
          </div>

          <button
            className={`btn-${dispatchStatus.policeDispatch ? 'secondary' : 'primary'}`}
            style={{ width: '100%' }}
            onClick={() => handleAction('policeDispatch', 'Police Dispatch')}
          >
            {dispatchStatus.policeDispatch ? <CheckCircle2 size={16} color="var(--emerald-success)" /> : <Shield size={16} />}
            <span>{dispatchStatus.policeDispatch ? 'TRAFFIC POLICE EN ROUTE' : 'DISPATCH BTP MOBILE ESCORT'}</span>
          </button>
        </div>

        {/* Action 4: Receiving Hospital Trauma Bay Pre-Alert */}
        <div className="panel-card" style={{ margin: 0, borderColor: dispatchStatus.hospitalAlert ? 'var(--emerald-success)' : 'var(--border-subtle)' }}>
          <div className="panel-title-bar">
            <div className="panel-title" style={{ color: 'var(--red-critical)' }}>
              <HeartHandshake size={16} />
              <span>4. NIMHANS TRAUMA BAY PRE-ACTIVATION</span>
            </div>
            {dispatchStatus.hospitalAlert && <span className="log-tag act">BAY PREPARED</span>}
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
            Transmits real-time cardiac vitals (SpO2 91%, HR 118) and updated 11.2 min ETA to Emergency Cardiac Response Team.
          </p>

          <div style={{ fontSize: '0.78rem', color: '#ffffff', marginBottom: 12 }}>
            <div><b>Hospital:</b> NIMHANS Neuro & Cardiac Center</div>
            <div style={{ color: 'var(--emerald-success)' }}>Trauma Bay #02 Reserved • Cath Lab On Standby</div>
          </div>

          <button
            className={`btn-${dispatchStatus.hospitalAlert ? 'secondary' : 'primary'}`}
            style={{ width: '100%' }}
            onClick={() => handleAction('hospitalAlert', 'Hospital Alert')}
          >
            {dispatchStatus.hospitalAlert ? <CheckCircle2 size={16} color="var(--emerald-success)" /> : <PhoneCall size={16} />}
            <span>{dispatchStatus.hospitalAlert ? 'TRAUMA BAY PRE-ACTIVATED' : 'NOTIFY HOSPITAL TRAUMA TEAM'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
