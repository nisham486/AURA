// ==========================================================================
// AURA Data Model & Initial State Repository
// Bangalore Emergency Transit Context (IEEE Girl Geeks 2026 - Use Case 02)
// ==========================================================================

export const INITIAL_AMBULANCE_DATA = {
  id: 'AMB-101',
  callSign: 'Alpha-Red 101',
  vehicleType: 'Type C ALS (Advanced Life Support)',
  driverName: 'Ramesh Kumar',
  driverPhone: '+91 98450 12345',
  status: 'DEVIATED_SLOWDOWN', // 'TRANSIT_PATIENT', 'DEVIATED_SLOWDOWN', 'REROUTED', 'ARRIVED_HOSPITAL'
  originName: 'Silk Board Junction Emergency Pickup',
  destinationHospital: 'NIMHANS Neuro & Cardiac Trauma Center',
  currentLocation: {
    latitude: 12.9172,
    longitude: 77.6228,
    heading: 315, // degrees NW
    speedKmH: 6.4,
    acceleration: -2.1,
    timestamp: '19:45:12'
  },
  patientVitals: {
    patientName: 'Subhashini M. (Age 58)',
    condition: 'Acute STEMI / Cardiac Ischemia',
    heartRateBpm: 118,
    spO2Percentage: 91,
    bloodPressure: '148/96 mmHg',
    triageSeverity: 'LEVEL_1_CRITICAL',
    oxygenLevelRemaining: 34 // %
  },
  etaBaselineMinutes: 13.5,
  etaPredictedMinutes: 24.8, // Degraded delay
  delayAccumulatedMinutes: 11.3,
  sirenActive: true,
  activeRouteId: 'ROUTE-A'
};

export const BANGALORE_CORRIDOR_WAYPOINTS = {
  'ROUTE-A': [
    [12.9172, 77.6228], // Silk Board Junction
    [12.9215, 77.6210], // Hosur Road Bottleneck (CCTV Cam 24)
    [12.9260, 77.6180], // St John's Junction
    [12.9310, 77.6140], // Madiwala Police Station
    [12.9360, 77.6080], // Forum Mall Junction
    [12.9410, 77.6010], // Diary Circle
    [12.9440, 77.5970]  // NIMHANS Hospital
  ],
  'ROUTE-B': [
    [12.9172, 77.6228], // Silk Board Junction
    [12.9195, 77.6150], // Madiwala Flyover Slip Road (Bypass)
    [12.9280, 77.6090], // Tavarekere Main Road
    [12.9370, 77.6030], // BTM Layout 1st Stage Bypass
    [12.9425, 77.5990], // Bannerghatta Road Green Corridor
    [12.9440, 77.5970]  // NIMHANS Hospital
  ],
  'ROUTE-C': [
    [12.9172, 77.6228], // Silk Board
    [12.9100, 77.6350], // HSR Layout ORR Slip
    [12.9250, 77.6400], // Agara Flyover
    [12.9350, 77.6300], // Koramangala 100ft Road
    [12.9440, 77.5970]  // NIMHANS Hospital
  ]
};

export const TRAFFIC_SIGNALS = [
  {
    id: 'JUNC-SILKBOARD-01',
    name: 'Silk Board Central Flyover Junction',
    location: { lat: 12.9172, lng: 77.6228 },
    currentState: 'RED',
    cycleTimeRemainingSeconds: 42,
    preemptionStatus: 'IDLE',
    queueLengthMeters: 280
  },
  {
    id: 'JUNC-HOSUR-02',
    name: 'St. John’s Medical College Gate Signal',
    location: { lat: 12.9260, lng: 77.6180 },
    currentState: 'RED',
    cycleTimeRemainingSeconds: 18,
    preemptionStatus: 'IDLE',
    queueLengthMeters: 410
  },
  {
    id: 'JUNC-MADIWALA-03',
    name: 'Madiwala Market Underpass Signal',
    location: { lat: 12.9310, lng: 77.6140 },
    currentState: 'AMBER',
    cycleTimeRemainingSeconds: 5,
    preemptionStatus: 'IDLE',
    queueLengthMeters: 190
  },
  {
    id: 'JUNC-DIARY-04',
    name: 'Diary Circle Main Intersection',
    location: { lat: 12.9410, lng: 77.6010 },
    currentState: 'RED',
    cycleTimeRemainingSeconds: 55,
    preemptionStatus: 'IDLE',
    queueLengthMeters: 320
  },
  {
    id: 'JUNC-NIMHANS-05',
    name: 'NIMHANS Emergency Gate Express Corridor',
    location: { lat: 12.9435, lng: 77.5980 },
    currentState: 'GREEN',
    cycleTimeRemainingSeconds: 12,
    preemptionStatus: 'IDLE',
    queueLengthMeters: 45
  }
];

export const REROUTE_OPTIONS = [
  {
    id: 'ROUTE-A',
    name: 'Primary Corridor: Hosur Road (Current)',
    distanceKm: 7.2,
    estimatedTimeMinutes: 24.8,
    riskScore: 8.6,
    signalJunctionCount: 5,
    preemptionFeasibilityScore: 28,
    keyAdvantage: 'Direct line, but severely obstructed by waterlogging',
    isRecommended: false
  },
  {
    id: 'ROUTE-B',
    name: 'Corridor Beta: Madiwala Flyover & Bannerghatta Link',
    distanceKm: 6.8,
    estimatedTimeMinutes: 11.2,
    riskScore: 2.1,
    signalJunctionCount: 4,
    preemptionFeasibilityScore: 94,
    keyAdvantage: 'High elevation, clear drainage, 4 signal green-wave ready',
    isRecommended: true
  },
  {
    id: 'ROUTE-C',
    name: 'Corridor Gamma: Outer Ring Road Express Bypass',
    distanceKm: 9.4,
    estimatedTimeMinutes: 17.5,
    riskScore: 4.8,
    signalJunctionCount: 5,
    preemptionFeasibilityScore: 65,
    keyAdvantage: 'Higher speed limit, but +2.6 km longer distance',
    isRecommended: false
  }
];

export const MULTI_SOURCE_EVIDENCE = {
  cctvStream: {
    cameraId: 'CAM-24-HOSUR-SOUTH',
    locationName: 'Hosur Road Km 4.2 (Near Madiwala Market)',
    detectedObstacles: [
      { label: 'Stalled Commercial Container Truck', confidence: 0.96, boundingBox: [120, 80, 240, 180] },
      { label: 'Localized Waterlogging (40-50cm)', confidence: 0.91, boundingBox: [50, 200, 320, 110] },
      { label: 'Double-Parked Delivery Vans', confidence: 0.88, boundingBox: [310, 140, 120, 90] }
    ]
  },
  iotSensorData: {
    sensorId: 'IOT-GRID-HOSUR-908',
    vehicleCountPerMin: 148, // Normal capacity 80
    avgSpeedKmH: 5.2,
    densityPercentage: 185
  },
  civicReport: {
    source: 'Bangalore Traffic Police Control Room Feed',
    description: 'Tree branch collision and localized water drainage blockage on Hosur Road northbound carriageway.',
    timestamp: '19:41:05'
  },
  weatherImpact: {
    rainfallMmH: 42,
    visibilityMeters: 400,
    roadGripFactor: 0.58
  },
  rootCauseAttribution: [
    { cause: 'Stalled Vehicle & Illegal Parking', contributionPercentage: 54 },
    { cause: 'Monsoon Flash Waterlogging', contributionPercentage: 31 },
    { cause: 'Uncoordinated Red Signal Cycles', contributionPercentage: 15 }
  ]
};

export const XAI_TREE_OF_THOUGHT = [
  {
    id: 'TOT-001',
    thoughtText: 'Detect anomaly: AMB-101 speed dropped below 10 km/h on Hosur Road. Calculate delay impact.',
    evaluationScore: 0.98,
    status: 'SELECTED',
    rationale: 'Telemetry verified speed drop from 48 km/h to 6.4 km/h over 300 meters.'
  },
  {
    id: 'TOT-002',
    parentId: 'TOT-001',
    thoughtText: 'Candidate Option 1: Maintain Hosur Road & request emergency lane clearance.',
    evaluationScore: 0.22,
    status: 'PRUNED',
    rationale: 'Rejected. CCTV Cam 24 confirms physical block by 2 container trucks. Estimated clearance time > 25 mins.'
  },
  {
    id: 'TOT-003',
    parentId: 'TOT-001',
    thoughtText: 'Candidate Option 2: Divert via Outer Ring Road Express Bypass.',
    evaluationScore: 0.54,
    status: 'PRUNED',
    rationale: 'Rejected. Additional 2.6 km distance pushes arrival time beyond patient cardiac stability window (SpO2 91%).'
  },
  {
    id: 'TOT-004',
    parentId: 'TOT-001',
    thoughtText: 'Candidate Option 3: Reroute via Corridor Beta (Madiwala Flyover + Bannerghatta Link) + Green Wave Signal Preemption.',
    evaluationScore: 0.96,
    status: 'SELECTED',
    rationale: 'Optimal path. Flyover is free of waterlogging. 4 signals can be preempted via IoT mesh to guarantee 11.2 min arrival.'
  }
];

export const XAI_FEATURE_ATTRIBUTIONS = [
  { featureName: 'Hospital Arrival Time Delta', importanceWeight: 0.38, polarity: 'POSITIVE' },
  { featureName: 'Signal Preemption Compatibility', importanceWeight: 0.28, polarity: 'POSITIVE' },
  { featureName: 'Physical Road Obstruction Risk', importanceWeight: 0.18, polarity: 'NEGATIVE' },
  { featureName: 'Patient SpO2 Degradation Rate', importanceWeight: 0.10, polarity: 'POSITIVE' },
  { featureName: 'Micro-Weather Rain Intensity', importanceWeight: 0.06, polarity: 'NEGATIVE' }
];

export const INITIAL_AGENT_LOGS = [
  { id: 1, timestamp: '19:42:01', type: 'obs', text: 'Telemetry ingest active. AMB-101 departing Silk Board Junction.' },
  { id: 2, timestamp: '19:44:15', type: 'warn', text: 'ANOMALY DETECTED: Rapid deceleration flag on Hosur Road (48 -> 6.4 km/h).' },
  { id: 3, timestamp: '19:44:18', type: 'obs', text: 'Fusing multi-source data: CCTV Cam #24 confirms container truck blockage.' },
  { id: 4, timestamp: '19:44:22', type: 'reason', text: 'GeoAgent Tree-of-Thought evaluating 3 candidate corridors for NIMHANS transit.' },
  { id: 5, timestamp: '19:44:25', type: 'act', text: 'Recommendation ready: Reroute to Corridor Beta. Signal Green-Wave preemption available.' }
];
