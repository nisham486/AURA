// ==========================================================================
// AURA IEEE Computer Society Girl Geeks 2026 Use Case 02 Proposal Spec Modal
// ==========================================================================

import React from 'react';
import { X, Sparkles, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function IEEEDocumentationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles color="var(--cyan-primary)" size={22} />
            <div>
              <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                IEEE GIRL GEEKS 2026 PROPOSAL SPECIFICATION
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--cyan-primary)' }}>
                Official Use Case 02: GeoAgentic Framework to Support Emergency Vehicle Movement
              </p>
            </div>
          </div>

          <button className="btn-secondary" onClick={onClose} style={{ padding: 6 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6 }}>
          <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1px solid var(--border-glow)', borderRadius: 10, padding: 14 }}>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, marginBottom: 4 }}>
              System Designation & Prototype Scope
            </h4>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              AURA is a <b>proposed decision-support prototype</b> and <b>simulated framework</b> engineered for control-room operators. It addresses urban ambulance gridlock by unifying real-time trajectory tracking, computer vision CCTV analysis, IoT traffic signal preemption, and explainable AI (XAI) rationale transparency.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Layers size={16} color="var(--purple-xai)" /> Central 7-Stage Workflow Alignment
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div className="metric-tile">
                <span style={{ fontWeight: 700, color: 'var(--cyan-primary)' }}>1. TRACK</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>High-frequency telemetry & vitals stream</span>
              </div>
              <div className="metric-tile">
                <span style={{ fontWeight: 700, color: 'var(--red-critical)' }}>2. DETECT</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Autonomous anomaly & slowdown flags</span>
              </div>
              <div className="metric-tile">
                <span style={{ fontWeight: 700, color: 'var(--amber-warning)' }}>3. INVESTIGATE</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CCTV vision & IoT cause attribution</span>
              </div>
              <div className="metric-tile">
                <span style={{ fontWeight: 700, color: 'var(--cyan-secondary)' }}>4. PREDICT</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ML delay modeling & SpO2 risk score</span>
              </div>
              <div className="metric-tile">
                <span style={{ fontWeight: 700, color: 'var(--purple-xai)' }}>5. SIMULATE</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>What-if preemption & reroute sandbox</span>
              </div>
              <div className="metric-tile">
                <span style={{ fontWeight: 700, color: 'var(--emerald-success)' }}>6. ACT</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>1-click signal override & HUD sync</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={16} color="var(--emerald-success)" /> Innovation & Explainability Highlights
            </h4>
            <ul style={{ paddingLeft: 18, fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li><b>Geo-Spatial Tree of Thought (ToT):</b> Evaluates multiple spatial corridors simultaneously, pruning high-risk nodes.</li>
              <li><b>Shapley Feature Attribution:</b> Quantifies why a route was selected (Distance, Signal Preemption Readiness, Weather).</li>
              <li><b>Counterfactual Auditability:</b> Provides audit logs for regulatory compliance and post-incident analysis.</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 20, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', textAlign: 'right' }}>
          <button className="btn-primary" onClick={onClose}>
            <span>CLOSE SPECIFICATION</span>
          </button>
        </div>
      </div>
    </div>
  );
}
