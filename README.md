# 🚑 AURA — GeoAgentic Emergency Response & Routing Platform

> **IEEE Computer Society Bangalore Chapter Girl Geeks 2026 — Use Case 02 Prototype**  
> *Autonomous Urban Response & Routing Agent with Multi-Source Intelligence & Explainable AI (XAI)*

---

## 🌟 Overview

**AURA (Autonomous Urban Response & Routing Agent)** is an advanced AI-powered emergency response and intelligent traffic management platform. Designed specifically for critical healthcare dispatch scenarios, AURA continuously monitors emergency ambulances, fuses multi-source sensor intelligence, predicts bottleneck delays, and dynamically preempts urban traffic signals to create **uninterrupted "Green Wave" corridors**.

---

## 🚀 Key Features & Architectural Viewports

1. **📡 Real-Time Command Center**
   - Live Leaflet GIS map with telemetry tracking (GPS, velocity, ETA, patient triage level).
   - Real-time traffic signal junction monitoring and automated alert feeds.

2. **👁️ Multi-Source Intelligence Fusion**
   - Integrates acoustic siren sensors, CCTV computer vision, citizen mobile reports, and drone aerial feeds.
   - Calculates cross-verified evidence confidence metrics before triggering actions.

3. **🎮 Interactive "What-If" Simulation Sandbox**
   - Simulates alternative dispatch corridors (Corridor Alpha vs. Corridor Beta vs. Drone Escort).
   - Evaluates risk trade-offs, estimated time saved (minutes), and patient survival impact.

4. **🧠 Explainable AI (XAI) & Tree-of-Thought Engine**
   - Transparent Tree-of-Thought reasoning steps explaining *why* a reroute was chosen.
   - Feature attribution breakdowns (traffic density, road width, hospital proximity, acoustic signals).

5. **⚡ Control & Dispatch Hub**
   - Manual & autonomous traffic signal preemption override system for traffic controllers.
   - Preempts multi-junction traffic signals to `PREEMPTED_GREEN`.

6. **📜 Black-Box Incident Replay & Audit Log**
   - Full time-series timeline replay for post-event auditability and compliance.

---

## ⚖️ How AURA Differs From Existing Systems

| Feature / Dimension | 🛑 Traditional Emergency Systems (Google Maps / Legacy Dispatch) | ⚡ AURA (GeoAgentic Platform) |
| :--- | :--- | :--- |
| **Data Source** | Passive historical & mobile GPS speed data | **Multi-Source Real-Time Fusion** (CCTV Vision + Acoustic Sirens + Drones + IoT) |
| **Traffic Signals** | Static signal timers (Ambulances stuck at red lights) | **Dynamic Green-Wave Preemption** (Automated signal override downstream) |
| **Routing Strategy** | Reacts after traffic jams build up | **Proactive Bottleneck Prediction & Pre-emptive Rerouting** |
| **AI Transparency** | Black-box algorithms without explanation | **Explainable AI (XAI)** with Tree-of-Thought & Feature Attributions |
| **Dispatcher Control** | Manual voice coordination across disparate tools | **Unified Single-Pane-of-Glass Command & What-If Sandbox** |
| **Auditability** | Fragmented logs and verbal radio transcripts | **Black-Box Time-Series Incident Replay** |

---

## 🛠️ Tech Stack & Setup

- **Frontend Core**: React 19, Vite, Javascript
- **GIS Mapping**: Leaflet & React-Leaflet
- **Data Visualization**: Recharts
- **Icons & Styling**: Lucide React, Custom Dark Mode / Modern Glassmorphism CSS

### 💻 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nisham486/AURA.git
   cd AURA
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

© 2026 AURA Emergency Response Platform — Built for IEEE Girl Geeks 2026

