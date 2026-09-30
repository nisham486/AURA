// ==========================================================================
// AURA Leaflet Emergency Command & Control Map Component
// Dark mode tile renderer with animated ambulance, signal nodes, & dynamic corridors
// ==========================================================================

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { BANGALORE_CORRIDOR_WAYPOINTS } from '../data/auraState';

export default function LeafletEmergencyMap({
  ambulance,
  activeRouteId,
  signals,
  selectedSignalId,
  onSelectSignal,
  onSelectCCTV,
  simulationRunning
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const ambulanceMarkerRef = useRef(null);
  const routePolylinesRef = useRef({});
  const signalMarkersRef = useRef([]);

  // Initialize Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double init

    // Center map around Bangalore Silk Board - NIMHANS Corridor
    const map = L.map(mapContainerRef.current, {
      center: [12.9280, 77.6100],
      zoom: 14,
      zoomControl: false,
      attributionControl: false
    });

    // Dark Matter CartoDB Basemap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    // Add Custom Zoom Control to Bottom Right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Route Polylines
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing polylines
    Object.values(routePolylinesRef.current).forEach(line => map.removeLayer(line));
    routePolylinesRef.current = {};

    // 1. Draw Route A (Hosur Road Degraded)
    const lineA = L.polyline(BANGALORE_CORRIDOR_WAYPOINTS['ROUTE-A'], {
      color: '#ff2a5f',
      weight: activeRouteId === 'ROUTE-A' ? 6 : 3,
      opacity: activeRouteId === 'ROUTE-A' ? 0.9 : 0.4,
      dashArray: '8, 8'
    }).addTo(map);
    lineA.bindTooltip('Primary Route A: Hosur Road (Obstructed)', { sticky: true });
    routePolylinesRef.current['ROUTE-A'] = lineA;

    // 2. Draw Route B (AURA Recommended - Corridor Beta)
    const lineB = L.polyline(BANGALORE_CORRIDOR_WAYPOINTS['ROUTE-B'], {
      color: '#00e676',
      weight: activeRouteId === 'ROUTE-B' ? 7 : 4,
      opacity: activeRouteId === 'ROUTE-B' ? 1.0 : 0.5
    }).addTo(map);
    lineB.bindTooltip('Corridor Beta: AURA Green Wave Corridor', { sticky: true });
    routePolylinesRef.current['ROUTE-B'] = lineB;

    // 3. Draw Route C (ORR Expressway)
    const lineC = L.polyline(BANGALORE_CORRIDOR_WAYPOINTS['ROUTE-C'], {
      color: '#00f2fe',
      weight: activeRouteId === 'ROUTE-C' ? 6 : 3,
      opacity: activeRouteId === 'ROUTE-C' ? 0.8 : 0.35,
      dashArray: '4, 4'
    }).addTo(map);
    lineC.bindTooltip('Corridor Gamma: ORR Expressway', { sticky: true });
    routePolylinesRef.current['ROUTE-C'] = lineC;

  }, [activeRouteId]);

  // Render & Update Signal Junction Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old signal markers
    signalMarkersRef.current.forEach(m => map.removeLayer(m));
    signalMarkersRef.current = [];

    signals.forEach(sig => {
      let signalColor = '#ff2a5f'; // Red default
      let bgStyle = 'rgba(255, 42, 95, 0.2)';
      let labelText = 'RED';

      if (sig.currentState === 'GREEN') {
        signalColor = '#00e676';
        bgStyle = 'rgba(0, 230, 118, 0.2)';
        labelText = 'GREEN';
      } else if (sig.currentState === 'PREEMPTED_GREEN') {
        signalColor = '#00f2fe';
        bgStyle = 'rgba(0, 242, 254, 0.35)';
        labelText = 'PREEMPTED';
      } else if (sig.currentState === 'AMBER') {
        signalColor = '#ffb703';
        bgStyle = 'rgba(255, 183, 3, 0.2)';
        labelText = 'AMBER';
      }

      const isSelected = selectedSignalId === sig.id;

      const html = `
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${bgStyle};
          border: 2px solid ${signalColor};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: ${isSelected ? `0 0 20px ${signalColor}` : 'none'};
          cursor: pointer;
        ">
          <div style="
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: ${signalColor};
            box-shadow: 0 0 8px ${signalColor};
          "></div>
        </div>
      `;

      const signalIcon = L.divIcon({
        html: html,
        className: 'custom-signal-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([sig.location.lat, sig.location.lng], { icon: signalIcon }).addTo(map);

      marker.bindTooltip(`<b>${sig.name}</b><br/>State: <span style="color:${signalColor}">${labelText}</span><br/>Queue: ${sig.queueLengthMeters}m`, {
        direction: 'top',
        offset: [0, -10]
      });

      marker.on('click', () => {
        if (onSelectSignal) onSelectSignal(sig.id);
      });

      signalMarkersRef.current.push(marker);
    });

  }, [signals, selectedSignalId, onSelectSignal]);

  // Render Ambulance & Hazard Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !ambulance) return;

    const latLng = [ambulance.currentLocation.latitude, ambulance.currentLocation.longitude];

    const ambHtml = `
      <div class="siren-glow-ring">
        <div style="
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          color: #060911;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 11px;
          box-shadow: 0 0 10px #00f2fe;
        ">
          🚑
        </div>
      </div>
    `;

    const ambIcon = L.divIcon({
      html: ambHtml,
      className: 'custom-ambulance-icon',
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    if (!ambulanceMarkerRef.current) {
      ambulanceMarkerRef.current = L.marker(latLng, { icon: ambIcon }).addTo(map);
      ambulanceMarkerRef.current.bindPopup(`
        <div style="font-family: var(--font-ui); color: #060911; padding: 4px;">
          <h4 style="margin: 0; font-size: 14px; font-weight: 700;">${ambulance.id} (${ambulance.callSign})</h4>
          <p style="margin: 4px 0; font-size: 12px; color: #475569;">${ambulance.vehicleType}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 6px 0;"/>
          <p style="margin: 2px 0; font-size: 11px;"><b>Patient:</b> ${ambulance.patientVitals.patientName}</p>
          <p style="margin: 2px 0; font-size: 11px;"><b>Condition:</b> ${ambulance.patientVitals.condition}</p>
          <p style="margin: 2px 0; font-size: 11px;"><b>Speed:</b> ${ambulance.currentLocation.speedKmH} km/h</p>
          <p style="margin: 2px 0; font-size: 11px;"><b>Predicted ETA:</b> <span style="color:#ff2a5f; font-weight:700;">${ambulance.etaPredictedMinutes} min</span></p>
        </div>
      `);
    } else {
      ambulanceMarkerRef.current.setLatLng(latLng);
    }

  }, [ambulance]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* Map Dynamic Legend Box */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: 20,
        zIndex: 500,
        background: 'rgba(11, 17, 30, 0.92)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        padding: '10px 14px',
        backdropFilter: 'blur(12px)',
        fontSize: '0.74rem',
        color: '#94a3b8'
      }}>
        <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 6, textTransform: 'uppercase' }}>
          Corridor Legend & Map Layers
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 4, background: '#00e676', borderRadius: 2 }}></span>
            <span>Corridor Beta (AURA Green Wave)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 4, background: '#ff2a5f', borderRadius: 2, borderStyle: 'dashed' }}></span>
            <span>Primary Route A (Hosur Road Waterlog Block)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 4, background: '#00f2fe', borderRadius: 2 }}></span>
            <span>Corridor Gamma (ORR Express)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00f2fe', boxShadow: '0 0 6px #00f2fe' }}></span>
            <span>Preempted Traffic Signal Node</span>
          </div>
        </div>
      </div>
    </div>
  );
}
