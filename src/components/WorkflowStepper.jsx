// ==========================================================================
// AURA Central Workflow Stepper Component
// TRACK -> DETECT -> INVESTIGATE -> PREDICT -> SIMULATE -> ACT -> EXPLAIN
// ==========================================================================

import React from 'react';
import { Radio, AlertTriangle, Eye, TrendingUp, Cpu, Zap, BrainCircuit, ChevronRight } from 'lucide-react';

const WORKFLOW_STEPS = [
  { id: 'TRACK', label: '1. TRACK', icon: Radio, description: 'Real-time Ambulance Telemetry' },
  { id: 'DETECT', label: '2. DETECT', icon: AlertTriangle, description: 'Route Anomaly & Slowdown' },
  { id: 'INVESTIGATE', label: '3. INVESTIGATE', icon: Eye, description: 'Multi-Source Cause Fusion' },
  { id: 'PREDICT', label: '4. PREDICT', icon: TrendingUp, description: 'Explainable Delay Modeling' },
  { id: 'SIMULATE', label: '5. SIMULATE', icon: Cpu, description: 'What-If Corridor Sandbox' },
  { id: 'ACT', label: '6. ACT', icon: Zap, description: 'Signal Override & Dispatch' },
  { id: 'EXPLAIN', label: '7. EXPLAIN', icon: BrainCircuit, description: 'Tree-of-Thought XAI Rationale' }
];

export default function WorkflowStepper({ activeStep, onSelectStep }) {
  return (
    <div className="workflow-stepper-bar">
      {WORKFLOW_STEPS.map((step, idx) => {
        const IconComponent = step.icon;
        const isActive = activeStep === step.id;

        return (
          <React.Fragment key={step.id}>
            <button
              className={`stepper-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectStep(step.id)}
              title={step.description}
            >
              <div className="stepper-number">
                <IconComponent size={12} />
              </div>
              <span>{step.label}</span>
            </button>
            {idx < WORKFLOW_STEPS.length - 1 && (
              <ChevronRight className="stepper-arrow" size={14} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
