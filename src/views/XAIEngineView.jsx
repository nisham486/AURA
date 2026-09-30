// ==========================================================================
// AURA Explainable AI (XAI) Rationale & Tree-of-Thought Engine View
// Interactive Decision Tree, Feature Attribution Weights, & Counterfactuals
// ==========================================================================

import React, { useState } from 'react';
import { BrainCircuit, GitBranch, Volume2, VolumeX, CheckCircle, XCircle, Sparkles, HelpCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { speakXAIRationale, stopVoiceSpeech } from '../utils/audioUtils';

export default function XAIEngineView({
  treeOfThought,
  featureAttributions,
  evidence
}) {
  const [selectedNodeId, setSelectedNodeId] = useState('TOT-004');
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);

  const selectedNode = treeOfThought.find(n => n.id === selectedNodeId) || treeOfThought[3];

  // Feature Attribution Data for Chart
  const featureData = featureAttributions.map(f => ({
    name: f.featureName,
    weight: Math.round(f.importanceWeight * 100),
    polarity: f.polarity
  }));

  const handleVoiceToggle = () => {
    if (isPlayingSpeech) {
      stopVoiceSpeech();
      setIsPlayingSpeech(false);
    } else {
      setIsPlayingSpeech(true);
      const explanationText = `GeoAgent Explainable Rationale: AMB 101 encountered an 11.3 minute delay on Hosur Road due to double-parked trucks and waterlogging. The system evaluated three corridors using a Tree of Thought search algorithm. Corridor Beta via Madiwala Flyover was selected with 96% confidence because it provides high elevation above flood zones and four signal green wave preemption nodes, reducing arrival time to 11.2 minutes.`;
      speakXAIRationale(explanationText, () => setIsPlayingSpeech(false));
    }
  };

  return (
    <div style={{ padding: 24, overflowY: 'auto', width: '100%', height: '100%', background: 'var(--bg-main)' }}>
      {/* Header Bar */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 10 }}>
            <BrainCircuit color="var(--purple-xai)" size={24} />
            EXPLAINABLE AI (XAI) RATIONALE & DECISION ENGINE
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Transparent Multi-Agent Reasoning • Tree-of-Thought Exploration • Feature Attribution • Counterfactual Audit
          </p>
        </div>

        <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)', boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }} onClick={handleVoiceToggle}>
          {isPlayingSpeech ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span>{isPlayingSpeech ? 'STOP VOICE READOUT' : 'LISTEN TO XAI RATIONALE'}</span>
        </button>
      </div>

      {/* Main Grid: Tree of Thought + Feature Weights & Counterfactual */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Left: Tree of Thought Interactive Visualizer */}
        <div className="panel-card" style={{ margin: 0, borderColor: 'rgba(168, 85, 247, 0.3)' }}>
          <div className="panel-title-bar">
            <div className="panel-title" style={{ color: 'var(--purple-xai)' }}>
              <GitBranch size={16} />
              <span>TREE-OF-THOUGHT (TOT) DECISION GRAPH</span>
            </div>
            <span className="log-tag obs">4 BRANCHES EVALUATED</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {treeOfThought.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isPruned = node.status === 'PRUNED';

              return (
                <div
                  key={node.id}
                  className={`tot-node ${isSelected ? 'selected' : ''} ${isPruned ? 'pruned' : ''}`}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--purple-xai)' }}>
                        {node.id}
                      </span>
                      <span className={`log-tag ${isPruned ? 'warn' : 'act'}`}>
                        {node.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isPruned ? 'var(--red-critical)' : 'var(--emerald-success)' }}>
                      EVAL SCORE: {(node.evaluationScore * 100).toFixed(0)}%
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 600, marginBottom: 6 }}>
                    "{node.thoughtText}"
                  </p>

                  <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {node.rationale}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Feature Attribution Weights & Counterfactual Rationale */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Feature Importance Bar Chart */}
          <div className="panel-card" style={{ margin: 0, height: 260 }}>
            <div className="panel-title-bar">
              <div className="panel-title">
                <Sparkles size={16} color="var(--cyan-primary)" />
                <span>SHAPLEY FEATURE IMPORTANCE WEIGHTS</span>
              </div>
            </div>

            <div style={{ width: '100%', height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 50]} stroke="#64748b" fontSize={11} unit="%" />
                  <YAxis dataKey="name" type="category" width={150} stroke="#94a3b8" fontSize={10} />
                  <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: 8, color: '#ffffff' }} />
                  <Bar dataKey="weight" radius={[0, 4, 4, 0]} barSize={18}>
                    {featureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.polarity === 'POSITIVE' ? '#00e676' : '#ff2a5f'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Counterfactual Rationale Card */}
          <div className="panel-card" style={{ margin: 0, background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
            <div className="panel-title-bar">
              <div className="panel-title" style={{ color: 'var(--cyan-primary)' }}>
                <HelpCircle size={16} />
                <span>COUNTERFACTUAL RATIONALE</span>
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', marginBottom: 12 }}>
              <span style={{ color: 'var(--text-muted)' }}>Question: </span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>"Why was Hosur Road Primary Corridor rejected?"</span>
            </div>

            <div style={{ background: 'rgba(255, 42, 95, 0.1)', border: '1px solid rgba(255, 42, 95, 0.3)', borderRadius: 8, padding: 12, marginBottom: 12 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--red-critical)', fontWeight: 700, marginBottom: 4 }}>
                COUNTERFACTUAL AUDIT RESULT
              </div>
              <p style={{ fontSize: '0.76rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                If the ambulance remained on Hosur Road, patient SpO2 level would drop to 84% before arrival due to 24.8 min transit time. CCTV Cam 24 confirmed physical block by 2 container trucks.
              </p>
            </div>

            <div style={{ fontSize: '0.74rem', color: 'var(--emerald-success)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
              <CheckCircle size={14} />
              <span>Corridor Beta guarantees patient arrival within SpO2 stability margin (&gt;90%).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
