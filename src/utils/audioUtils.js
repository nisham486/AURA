// ==========================================================================
// AURA Tactical Audio & Web Speech Synthesizer Utility
// Clean Web Audio API pings & Web Speech API rationale readouts
// ==========================================================================

// Web Audio API Context
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Play Emergency Siren Ping / Alert Pulse
export function playAlertSound(type = 'WARNING') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'CRITICAL') {
      // High-pitch dual tone alarm
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'DISPATCH') {
      // Tactical activation chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.start(now);
      osc.stop(now + 0.5);
    } else {
      // Standard notification click / ping
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch (e) {
    console.warn('Web Audio warning:', e);
  }
}

// 2. Web Speech API Voice Synthesizer for Explainable AI
export function speakXAIRationale(text, onEndCallback) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.05;
  utterance.volume = 0.9;

  // Try to pick a natural English voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural') || v.lang.startsWith('en'));
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  if (onEndCallback) {
    utterance.onend = onEndCallback;
    utterance.onerror = onEndCallback;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopVoiceSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
