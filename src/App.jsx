// ==========================================================================
// AURA Main Application Container (App.jsx)
// GeoAgentic Emergency Response Intelligence Platform
// IEEE Computer Society Bangalore Chapter Girl Geeks 2026 - Use Case 02 Prototype
// ==========================================================================

import React, { useState } from 'react';
import Header from './components/Header';
import WorkflowStepper from './components/WorkflowStepper';
import IEEEDocumentationModal from './components/IEEEDocumentationModal';
import CommandCenterView from './views/CommandCenterView';
import MultiSourceIntelView from './views/MultiSourceIntelView';
import SimulationSandboxView from './views/SimulationSandboxView';
import XAIEngineView from './views/XAIEngineView';
import ControlActionHubView from './views/ControlActionHubView';
import IncidentReplayView from './views/IncidentReplayView';

import {
  INITIAL_AMBULANCE_DATA,
  TRAFFIC_SIGNALS,
  REROUTE_OPTIONS,
  MULTI_SOURCE_EVIDENCE,
  XAI_TREE_OF_THOUGHT,
  XAI_FEATURE_ATTRIBUTIONS,
  INITIAL_AGENT_LOGS
} from './data/auraState';

import { playAlertSound } from './utils/audioUtils';

import { Monitor, Eye, Cpu, BrainCircuit, Zap, History } from 'lucide-react';

export default function App() {
  // Application State
  const [ambulance, setAmbulance] = useState(INITIAL_AMBULANCE_DATA);
  const [activeRouteId, setActiveRouteId] = useState('ROUTE-A');
  const [signals, setSignals] = useState(TRAFFIC_SIGNALS);
  const [selectedSignalId, setSelectedSignalId] = useState(null);
  const [agentLogs, setAgentLogs] = useState(INITIAL_AGENT_LOGS);
  const [workflowStep, setWorkflowStep] = useState('TRACK');
  const [activeTab, setActiveTab] = useState('COMMAND_CENTER');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [systemStatus, setSystemStatus] = useState('ANOMALY_DETECTED');
  const [isIEEEModalOpen, setIsIEEEModalOpen] = useState(false);

  // Execute Reroute Action Handler
  const handleExecuteReroute = () => {
    if (soundEnabled) playAlertSound('DISPATCH');

    setActiveRouteId('ROUTE-B');
    setSystemStatus('REROUTE_ACTIVE');

    // Preempt traffic signals along Corridor Beta
    setSignals(prev =>
      prev.map((sig, idx) => {
        if (idx < 4) {
          return { ...sig, currentState: 'PREEMPTED_GREEN', preemptionStatus: 'ACTIVE' };
        }
        return sig;
      })
    );

    // Update Ambulance Telemetry
    setAmbulance(prev => ({
      ...prev,
      status: 'REROUTED',
      etaPredictedMinutes: 11.2,
      delayAccumulatedMinutes: 0.8,
      currentLocation: {
        ...prev.currentLocation,
        latitude: 12.9195,
        longitude: 77.6150,
        speedKmH: 48.5
      }
    }));

    // Append Log
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }),
      type: 'act',
      text: 'DISPATCH EXECUTION: Corridor Beta activated. Signals JUNC-01 to 04 preempted to GREEN WAVE.'
    };
    setAgentLogs(prev => [newLog, ...prev]);

    setWorkflowStep('EXPLAIN');
  };

  // Workflow Stepper Navigation Sync
  const handleWorkflowStepChange = (stepId) => {
    if (soundEnabled) playAlertSound('CLICK');
    setWorkflowStep(stepId);

    // Auto switch corresponding workspace tab for fluid navigation
    if (stepId === 'TRACK' || stepId === 'DETECT') setActiveTab('COMMAND_CENTER');
    else if (stepId === 'INVESTIGATE') setActiveTab('MULTI_INTEL');
    else if (stepId === 'PREDICT' || stepId === 'SIMULATE') setActiveTab('SIM_SANDBOX');
    else if (stepId === 'ACT') setActiveTab('ACTION_HUB');
    else if (stepId === 'EXPLAIN') setActiveTab('XAI_ENGINE');
  };

  return (
    <div className="aura-app-container">
      {/* Header Bar */}
      <Header
        workflowStep={workflowStep}
        systemStatus={systemStatus}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenIEEEModal={() => setIsIEEEModalOpen(true)}
        ambulance={ambulance}
      />

      {/* 7-Stage GeoAgentic Workflow Stepper Bar */}
      <WorkflowStepper
        activeStep={workflowStep}
        onSelectStep={handleWorkflowStepChange}
      />

      {/* Primary Workspace Navigation Tabs */}
      <nav className="main-tab-bar">
        <button
          className={`tab-btn ${activeTab === 'COMMAND_CENTER' ? 'active' : ''}`}
          onClick={() => setActiveTab('COMMAND_CENTER')}
        >
          <Monitor size={15} />
          <span>COMMAND CENTER</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'MULTI_INTEL' ? 'active' : ''}`}
          onClick={() => setActiveTab('MULTI_INTEL')}
        >
          <Eye size={15} />
          <span>MULTI-SOURCE INTEL</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'SIM_SANDBOX' ? 'active' : ''}`}
          onClick={() => setActiveTab('SIM_SANDBOX')}
        >
          <Cpu size={15} />
          <span>WHAT-IF SANDBOX</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'XAI_ENGINE' ? 'active' : ''}`}
          onClick={() => setActiveTab('XAI_ENGINE')}
        >
          <BrainCircuit size={15} />
          <span>EXPLAINABLE AI (XAI)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'ACTION_HUB' ? 'active' : ''}`}
          onClick={() => setActiveTab('ACTION_HUB')}
        >
          <Zap size={15} />
          <span>CONTROL DISPATCH HUB</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'INCIDENT_REPLAY' ? 'active' : ''}`}
          onClick={() => setActiveTab('INCIDENT_REPLAY')}
        >
          <History size={15} />
          <span>INCIDENT REPLAY</span>
        </button>
      </nav>

      {/* Main Content Viewport */}
      <main className="main-content-viewport">
        {activeTab === 'COMMAND_CENTER' && (
          <CommandCenterView
            ambulance={ambulance}
            activeRouteId={activeRouteId}
            signals={signals}
            selectedSignalId={selectedSignalId}
            onSelectSignal={setSelectedSignalId}
            agentLogs={agentLogs}
            rerouteOptions={REROUTE_OPTIONS}
            onExecuteReroute={handleExecuteReroute}
            workflowStep={workflowStep}
            onStepChange={handleWorkflowStepChange}
          />
        )}

        {activeTab === 'MULTI_INTEL' && (
          <MultiSourceIntelView evidence={MULTI_SOURCE_EVIDENCE} />
        )}

        {activeTab === 'SIM_SANDBOX' && (
          <SimulationSandboxView
            rerouteOptions={REROUTE_OPTIONS}
            activeRouteId={activeRouteId}
            onExecuteReroute={handleExecuteReroute}
          />
        )}

        {activeTab === 'XAI_ENGINE' && (
          <XAIEngineView
            treeOfThought={XAI_TREE_OF_THOUGHT}
            featureAttributions={XAI_FEATURE_ATTRIBUTIONS}
            evidence={MULTI_SOURCE_EVIDENCE}
          />
        )}

        {activeTab === 'ACTION_HUB' && (
          <ControlActionHubView
            signals={signals}
            onExecuteReroute={handleExecuteReroute}
            activeRouteId={activeRouteId}
          />
        )}

        {activeTab === 'INCIDENT_REPLAY' && (
          <IncidentReplayView ambulance={ambulance} />
        )}
      </main>

      {/* System Specification Modal */}
      <IEEEDocumentationModal
        isOpen={isIEEEModalOpen}
        onClose={() => setIsIEEEModalOpen(false)}
      />
    </div>
  );
}
