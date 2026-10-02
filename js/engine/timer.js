/**
 * Fit App - Rest Timer Engine with Web Audio API sound synthesis
 * Runs countdown, updates UI, triggers sound beeps and haptic vibration
 */

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

/**
 * Play a synthesizer tone using Web Audio API
 * @param {number} freq - Frequency in Hz
 * @param {number} duration - Duration in seconds
 * @param {string} type - 'sine' | 'square' | 'triangle'
 */
export function playTone(freq = 660, duration = 0.15, type = 'sine') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Smooth envelope to avoid clicks
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn('Audio tone play error:', err);
  }
}

export function playShortBeep() {
  playTone(520, 0.1, 'sine');
}

export function playCompletionBeep() {
  // Joyful dual chime
  playTone(880, 0.2, 'triangle');
  setTimeout(() => playTone(1174.66, 0.4, 'sine'), 150);
}

class RestTimer {
  constructor() {
    this.remainingSeconds = 0;
    this.totalSeconds = 0;
    this.timerId = null;
    this.isRunning = false;
    this.listeners = new Set();
  }

  start(seconds) {
    this.stop();
    this.totalSeconds = seconds;
    this.remainingSeconds = seconds;
    this.isRunning = true;

    // Wake audio context
    getAudioContext();

    this.notify();

    this.timerId = setInterval(() => {
      this.remainingSeconds--;

      // Sound alerts at 3, 2, 1
      if (this.remainingSeconds <= 3 && this.remainingSeconds > 0) {
        playShortBeep();
      }

      if (this.remainingSeconds <= 0) {
        this.stop();
        playCompletionBeep();
        if ('vibrate' in navigator) {
          try { navigator.vibrate([200, 100, 200, 100, 400]); } catch (e) {}
        }
      }

      this.notify();
    }, 1000);
  }

  addSeconds(sec = 30) {
    this.remainingSeconds += sec;
    this.totalSeconds += sec;
    this.notify();
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isRunning = false;
    this.notify();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.getState());
    return () => this.listeners.delete(callback);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach(cb => {
      try { cb(state); } catch (e) { console.error(e); }
    });
  }

  getState() {
    const mins = Math.floor(Math.max(0, this.remainingSeconds) / 60);
    const secs = Math.max(0, this.remainingSeconds) % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const progress = this.totalSeconds > 0 ? (this.remainingSeconds / this.totalSeconds) : 0;

    return {
      isRunning: this.isRunning,
      remainingSeconds: this.remainingSeconds,
      totalSeconds: this.totalSeconds,
      formatted,
      progress
    };
  }
}

export const globalTimer = new RestTimer();
