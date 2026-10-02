/**
 * Fit App - Gym Screen Dimmer
 * Keeps the phone awake between sets and blacks out the screen so the bright
 * display does not ruin your night vision in a dark gym.
 *
 * - Screen Wake Lock API keeps the display on while the mode is active
 * - A full-screen overlay dims everything the user chose how dark
 * - Tapping the dimmed screen "peeks" back to full brightness for a few seconds
 * - A floating HUD stays above the overlay so the rest timer is readable
 *   without lifting the phone
 */

export const DIMMER_STORAGE_KEY = 'fit_dimmer_v1';

// Opacity per level: ต่ำ / กลาง / สูง
const LEVEL_OPACITY = [0.45, 0.68, 0.86];
const PEEK_OPACITY = 0.12;
const AUTO_DEEP_BONUS = 0.1;
const MAX_OPACITY = 0.93;

export class ScreenDimmer {
  constructor() {
    this.settings = {
      enabled: false,
      level: 1,
      autoDeepDim: true,
      peekSec: 8
    };
    this.load();

    this.wakeLock = null;
    this.peekTimer = null;
    this.isPeeking = false;
    this.isResting = false;
    this.lockFailed = false;
    this.hasPeeked = false;
    this.context = { exerciseName: '', setLabel: '', setsDone: 0, setsTotal: 0 };

    this.overlay = null;
    this.hud = null;
    this.inject();
    this.bind();
    this.apply();
  }

  // ----- persistence -----

  load() {
    try {
      const raw = localStorage.getItem(DIMMER_STORAGE_KEY);
      if (raw) Object.assign(this.settings, JSON.parse(raw));
    } catch (err) {
      // ใช้ค่าเริ่มต้นต่อไป
    }
  }

  save() {
    try {
      localStorage.setItem(DIMMER_STORAGE_KEY, JSON.stringify(this.settings));
    } catch (err) {
      // ไม่บันทึกได้ก็ปล่อยไป ไม่ทำให้การฝึกพัง
    }
  }

  // ----- DOM -----

  inject() {
    this.overlay = document.getElementById('screenDimOverlay');
    this.hud = document.getElementById('screenDimHud');

    if (this.overlay && this.hud) return;

    this.overlay = document.createElement('div');
    this.overlay.id = 'screenDimOverlay';
    this.overlay.className = 'screen-dim-overlay';
    this.overlay.setAttribute('aria-hidden', 'true');
    this.overlay.innerHTML = '<span class="screen-dim-hint">👆 แตะที่ใดก็ได้เพื่อดูชั่วคราว</span>';

    this.hud = document.createElement('div');
    this.hud.id = 'screenDimHud';
    this.hud.className = 'screen-dim-hud';
    this.hud.innerHTML = `
      <div class="dim-hud-main">
        <span class="dim-hud-label" id="dimHudLabel">เซ็ตที่เหลือ</span>
        <strong class="dim-hud-clock" id="dimHudClock">--:--</strong>
        <span class="dim-hud-ctx" id="dimHudContext">—</span>
      </div>
      <div class="dim-hud-bar"><span class="dim-hud-bar-fill" id="dimHudBarFill"></span></div>
      <div class="dim-hud-foot">
        <span class="dim-hud-lock" id="dimHudLock"></span>
        <div class="dim-hud-controls">
          <div class="dim-hud-levels" role="group" aria-label="ระดับความมืด">
            <button class="dim-level-btn" data-level="0">ต่ำ</button>
            <button class="dim-level-btn" data-level="1">กลาง</button>
            <button class="dim-level-btn" data-level="2">สูง</button>
          </div>
          <button class="dim-hud-close" id="dimHudCloseBtn">☀️ สว่าง</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.overlay);
    document.body.appendChild(this.hud);
  }

  bind() {
    if (this._bound) return;
    this._bound = true;

    // แตะที่หน้าจอมืดเพื่อดูชั่วคราว
    this.overlay.addEventListener('click', () => this.peek());

    this.hud.querySelectorAll('.dim-level-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setLevel(Number(btn.dataset.level)));
    });

    const closeBtn = this.hud.querySelector('#dimHudCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.setEnabled(false));

    // หน้าจอถูกล็อกใหม่หลังสลับแท็บกลับมา ต้องขอ Wake Lock ใหม่
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.settings.enabled) {
        this.requestWakeLock();
      }
    });
  }

  // ----- opacity / visuals -----

  currentOpacity() {
    if (!this.settings.enabled) return 0;
    if (this.isPeeking) return PEEK_OPACITY;
    let o = LEVEL_OPACITY[this.settings.level] ?? LEVEL_OPACITY[1];
    if (this.settings.autoDeepDim && this.isResting) o += AUTO_DEEP_BONUS;
    return Math.min(MAX_OPACITY, o);
  }

  apply() {
    const on = this.settings.enabled;

    this.overlay.classList.toggle('is-active', on);
    this.overlay.classList.toggle('is-peek', on && this.isPeeking);
    this.overlay.style.opacity = String(this.currentOpacity());

    this.hud.classList.toggle('is-active', on);
    this.hud.classList.toggle('is-peeking', on && this.isPeeking);

    this.hud.querySelectorAll('.dim-level-btn').forEach(btn => {
      btn.classList.toggle('active', Number(btn.dataset.level) === this.settings.level);
      btn.setAttribute('aria-pressed', String(Number(btn.dataset.level) === this.settings.level));
    });

    this.updateStatus();

    // ปุ่มสลับโหมดใน session bar
    document.querySelectorAll('.dimmer-toggle-btn').forEach(btn => {
      btn.classList.toggle('active', on);
      btn.textContent = on ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', String(on));
      btn.title = on ? 'ปิดโหมดโค้ดหน้าจอ' : 'เปิดโหมดโค้ดหน้าจอ (กันหน้าจอดับ)';
    });
  }

  updateStatus() {
    const el = this.hud.querySelector('#dimHudLock');
    if (!el) return;
    if (!this.settings.enabled) {
      el.textContent = '';
      el.className = 'dim-hud-lock';
      return;
    }
    const supported = 'wakeLock' in navigator;
    if (this.wakeLock) {
      el.textContent = '🔒 กันหน้าจอดับแล้ว';
      el.className = 'dim-hud-lock is-on';
    } else if (this.lockFailed) {
      el.textContent = '⚠️ ขอสิทธิ์กันหน้าจอดับไม่สำเร็จ — แตะจอเพื่อลองใหม่';
      el.className = 'dim-hud-lock is-warn';
    } else if (supported) {
      el.textContent = '⏳ กำลังขอสิทธิ์กันหน้าจอดับ…';
      el.className = 'dim-hud-lock';
    } else {
      el.textContent = '⚠️ เบราว์เซอร์นี้กันหน้าจอดับไม่ได้';
      el.className = 'dim-hud-lock is-warn';
    }
  }

  // ----- wake lock -----

  async requestWakeLock() {
    if (!('wakeLock' in navigator)) {
      this.lockFailed = false;
      this.updateStatus();
      return;
    }
    if (this.wakeLock && !this.wakeLock.released) return;

    this.lockFailed = false;
    this.updateStatus();

    try {
      this.wakeLock = await navigator.wakeLock.request('screen');
      this.lockFailed = false;
      this.wakeLock.addEventListener('release', () => {
        this.wakeLock = null;
        this.updateStatus();
      });
    } catch (err) {
      this.wakeLock = null;
      this.lockFailed = true;
    }
    this.updateStatus();
  }

  releaseWakeLock() {
    if (this.wakeLock) {
      try { this.wakeLock.release(); } catch (err) { /* ignore */ }
      this.wakeLock = null;
    }
    this.updateStatus();
  }

  // ----- public API -----

  toggle() {
    this.setEnabled(!this.settings.enabled);
  }

  setEnabled(on) {
    this.settings.enabled = !!on;
    this.save();

    if (this.peekTimer) {
      clearTimeout(this.peekTimer);
      this.peekTimer = null;
    }
    this.isPeeking = false;

    if (this.settings.enabled) {
      this.requestWakeLock();
    } else {
      this.releaseWakeLock();
      this.lockFailed = false;
      this.isResting = false;
    }
    this.apply();
  }

  setLevel(level) {
    const next = Math.min(2, Math.max(0, Number(level) || 0));
    if (next === this.settings.level) return;
    this.settings.level = next;
    this.save();
    this.apply();
  }

  // แตะแล้วสว่างกลับมาชั่วคราว แล้วคืนความมืดเอง
  peek() {
    if (!this.settings.enabled || this.isPeeking) return;

    // เผื่อขอ Wake Lock ไม่สำเร็จตอนเปิดโหมด ให้ลองใหม่ตอนผู้ใช้แตะจอ
    if (!this.wakeLock) this.requestWakeLock();

    this.isPeeking = true;
    this.hasPeeked = true;
    this.overlay.classList.add('hint-hidden');
    this.apply();

    if (this.peekTimer) clearTimeout(this.peekTimer);
    this.peekTimer = setTimeout(() => {
      this.isPeeking = false;
      this.peekTimer = null;
      this.apply();
    }, this.settings.peekSec * 1000);
  }

  // ข้อมูลประจำเซ็ตที่กำลังจะทำ เพื่อแสดงบน HUD
  setContext(context) {
    this.context = Object.assign({}, this.context, context || {});
    this.renderContext();
  }

  renderContext() {
    const el = this.hud.querySelector('#dimHudContext');
    if (!el) return;
    const { exerciseName, setLabel, setsDone, setsTotal } = this.context;
    const parts = [];
    if (exerciseName) parts.push(exerciseName);
    if (setLabel) parts.push(setLabel);
    if (setsTotal > 0) parts.push(`${setsDone}/${setsTotal}`);
    el.textContent = parts.join(' · ') || '—';
  }

  // อัปเดตตัวจับเวลาพักบน HUD
  updateTimer(state) {
    if (!state) return;
    this.isResting = state.isRunning;

    const labelEl = this.hud.querySelector('#dimHudLabel');
    const clockEl = this.hud.querySelector('#dimHudClock');
    const fillEl = this.hud.querySelector('#dimHudBarFill');

    if (labelEl) labelEl.textContent = state.isRunning ? 'พักเหลือ' : 'เซ็ตที่เหลือ';
    if (clockEl) {
      clockEl.textContent = state.isRunning ? state.formatted : `${this.context.setsDone}/${this.context.setsTotal}`;
    }
    if (fillEl) {
      const pct = state.isRunning
        ? Math.max(0, Math.min(1, state.progress))
        : (this.context.setsTotal ? this.context.setsDone / this.context.setsTotal : 0);
      fillEl.style.width = `${Math.round(pct * 100)}%`;
    }

    this.renderContext();
    if (this.settings.enabled) this.apply();
  }

  // ปิดทิ้งตอนจบ/ยกเลิกเซสชัน (ค่าความสูงไว้ ผู้ใช้เปิดใหม่ได้เอง)
  shutdown() {
    if (this.peekTimer) clearTimeout(this.peekTimer);
    this.peekTimer = null;
    this.isPeeking = false;
    this.isResting = false;
    this.releaseWakeLock();
    this.settings.enabled = false;
    this.save();
    this.apply();
  }
}