/**
 * Fit App - Live Workout Session & Logger View
 * Interactive tracking of sets, reps, weight, RPE, live volume, rest timer, and auto progression
 */

import { storage } from '../services/storage.js';
import { getExerciseById } from '../data/exercises.js';
import { globalTimer, playCompletionBeep } from '../engine/timer.js';
import { ScreenDimmer } from '../engine/screenDimmer.js';
import { getProgressiveOverloadRecommendation, estimate1RM, getLogged1RM } from '../engine/progression.js';

export class WorkoutView {
  constructor(containerId, onWorkoutFinished, onOpenExerciseDetail) {
    this.container = document.getElementById(containerId);
    this.onWorkoutFinished = onWorkoutFinished;
    this.onOpenExerciseDetail = onOpenExerciseDetail;
    this.activeWorkout = null;
    this.elapsedSeconds = 0;
    this.elapsedTimerId = null;
    this.unsubscribeTimer = null;
    this.screenDimmer = null;
  }

  startSession(plan, day) {
    const profile = storage.getProfile();
    const currentGoalId = profile.selectedGoal || 'hypertrophy';

    // Construct fresh workout session with progressive overload suggestions preloaded
    const exercises = day.exercises.map(item => {
      const history = storage.getExerciseHistory(item.exerciseId);
      const recommendation = getProgressiveOverloadRecommendation(
        item.exerciseId,
        history,
        currentGoalId,
        storage.getExerciseBaseline(item.exerciseId)
      );
      const defaultWeight = recommendation.suggestedWeight || 20;

      // Extract numeric target reps if possible
      let defaultReps = 10;
      if (typeof item.targetReps === 'string' && item.targetReps.includes('-')) {
        defaultReps = parseInt(item.targetReps.split('-')[0], 10) || 10;
      } else if (typeof item.targetReps === 'number') {
        defaultReps = item.targetReps;
      }

      // Pre-fill sets
      const sets = [];
      for (let i = 1; i <= item.sets; i++) {
        sets.push({
          setNum: i,
          weight: defaultWeight,
          reps: defaultReps,
          rpe: item.rpe || 8,
          completed: false,
          previous: history.length > 0 && history[history.length - 1].sets[i - 1] 
            ? `${history[history.length - 1].sets[i - 1].weight} กก. × ${history[history.length - 1].sets[i - 1].reps}`
            : '-'
        });
      }

      return {
        exerciseId: item.exerciseId,
        targetReps: item.targetReps,
        restSec: item.restSec || 90,
        recommendation,
        sets
      };
    });

    this.activeWorkout = {
      id: 'workout_' + Date.now(),
      startTime: Date.now(),
      planId: plan.id,
      planName: plan.name,
      dayId: day.id,
      dayName: day.name,
      exercises
    };

    this.elapsedSeconds = 0;
    this.startElapsedTimer();
    storage.saveActiveWorkout(this.activeWorkout);
    this.render();
  }

  resumeSession(savedWorkout) {
    this.activeWorkout = savedWorkout;
    const elapsedMs = Date.now() - (savedWorkout.startTime || Date.now());
    this.elapsedSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
    this.startElapsedTimer();
    this.render();
  }

  startElapsedTimer() {
    if (this.elapsedTimerId) clearInterval(this.elapsedTimerId);
    this.elapsedTimerId = setInterval(() => {
      this.elapsedSeconds++;
      const el = document.getElementById('workoutElapsedDisplay');
      if (el) {
        el.textContent = this.formatDuration(this.elapsedSeconds);
      }
    }, 1000);
  }

  stopElapsedTimer() {
    if (this.elapsedTimerId) {
      clearInterval(this.elapsedTimerId);
      this.elapsedTimerId = null;
    }
  }

  formatDuration(totalSec) {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  render() {
    if (!this.activeWorkout) {
      this.renderNoActiveWorkout();
      return;
    }

    const currentVolume = this.calculateCurrentVolume();

    this.container.innerHTML = `
      <!-- Sticky Workout Status Header -->
      <div class="active-session-bar">
        <div class="session-left">
          <span class="live-dot"></span>
          <div>
            <h3 class="session-day-name">${this.activeWorkout.dayName}</h3>
            <span class="session-plan-name">${this.activeWorkout.planName}</span>
          </div>
        </div>

        <div class="session-metrics">
          <div class="metric-pill">
            <span class="metric-label">⏱️ เวลา</span>
            <span class="metric-val" id="workoutElapsedDisplay">${this.formatDuration(this.elapsedSeconds)}</span>
          </div>
          <div class="metric-pill">
            <span class="metric-label">⚖️ ปริมาณยกสะสม</span>
            <span class="metric-val text-success" id="workoutVolumeDisplay">${currentVolume.toLocaleString()} กก.</span>
          </div>
          <div class="metric-pill metric-pill-progress">
            <span class="metric-label">🎯 เซ็ตที่เหลือ</span>
            <span class="metric-val text-accent" id="workoutSetsLeft">${this.getTotalRemainingSets()}</span>
          </div>
        </div>

        <div class="session-actions">
          <button class="btn btn-outline btn-sm dimmer-toggle-btn" id="dimmerToggleBtn" aria-pressed="false"
            title="เปิดโหมดโค้ดหน้าจอ (กันหน้าจอดับ)">${this.screenDimmer && this.screenDimmer.settings.enabled ? '☀️' : '🌙'}</button>
          <button class="btn btn-success" id="finishWorkoutBtn">
            🏁 สรุปและบันทึก
          </button>
          <button class="btn btn-outline-danger btn-sm" id="cancelWorkoutBtn" title="ยกเลิกเซสชัน">
            ✕
          </button>
        </div>
      </div>

      <!-- Rest Timer Bar Component -->
      <div id="restTimerWidget" class="rest-timer-banner">
        <div class="timer-info">
          <span class="timer-icon">⏳</span>
          <span class="timer-label">ตัวจับเวลาพัก:</span>
          <strong class="timer-clock" id="timerClockDisplay">00:00</strong>
        </div>
        <div class="timer-controls">
          <button class="btn btn-sm btn-outline" id="timerAdd30Btn">+30 วิ</button>
          <button class="btn btn-sm btn-outline" id="timerSkipBtn">ข้าม</button>
        </div>
      </div>

      <!-- Workout Exercises List -->
      <div class="workout-exercises-container mt-3">
        ${this.activeWorkout.exercises.map((exItem, exIdx) => {
          const ex = getExerciseById(exItem.exerciseId);
          const reco = exItem.recommendation;

          return `
            <div class="card card-workout-ex" data-exercise-index="${exIdx}">
              <div class="workout-ex-header">
                <div>
                  <div class="d-flex align-center gap-2">
                    <span class="badge-cat">${ex ? ex.category.toUpperCase() : 'EXERCISE'}</span>
                    <span class="text-muted">เป้าหมาย: ${exItem.targetReps} ครั้ง</span>
                  </div>
                  <h3 class="workout-ex-title">${ex ? ex.nameTh : exItem.exerciseId}</h3>
                </div>

                <div class="ex-header-actions">
                  <button class="btn btn-sm btn-secondary open-tech-detail-btn" data-exercise-id="${exItem.exerciseId}">
                    📖 ดูเทคนิค & ท่าฝึก
                  </button>
                </div>
              </div>

              <!-- Progressive Overload Recommendation Box -->
              ${reco ? `
                <div class="progression-hint-box" style="border-left: 4px solid ${reco.color || '#10b981'};">
                  <div class="hint-header">
                    <span class="hint-badge" style="background: ${reco.color || '#10b981'}22; color: ${reco.color || '#10b981'};">
                      ${reco.badge}
                    </span>
                    <strong class="hint-target">แนะนำ: ${reco.suggestedWeight} กก. (${reco.targetReps})</strong>
                  </div>
                  <p class="hint-reason">${reco.reason}</p>
                </div>
              ` : ''}

              <!-- แถบเครื่องมือระหว่างเซ็ต (ออกแบบสำหรับมือถือ) -->
              <div class="quick-log-bar" data-ex-idx="${exIdx}">
                <div class="quick-progress">
                  <span class="quick-progress-label">เซ็ต</span>
                  <strong class="quick-progress-value" data-role="done">${exItem.sets.filter(s => s.completed).length}</strong>
                  <span class="quick-progress-sep">/</span>
                  <span class="quick-progress-total" data-role="total">${exItem.sets.length}</span>
                  <span class="quick-progress-left" data-role="left">เหลือ ${exItem.sets.filter(s => !s.completed).length} เซ็ต</span>
                </div>
                <div class="quick-actions">
                  <button class="btn btn-xs btn-secondary quick-repeat-btn" title="คัดลอกน้ำหนัก/จำนวนครั้งจากเซ็ตล่าสุดที่ทำสำเร็จ">
                    🔁 ซ้ำเซ็ตก่อน
                  </button>
                  <div class="weight-stepper" role="group" aria-label="ปรับน้ำหนัก">
                    <button class="step-btn" data-delta="-2.5">−2.5</button>
                    <button class="step-btn" data-delta="-1">−1</button>
                    <button class="step-btn" data-delta="1">+1</button>
                    <button class="step-btn" data-delta="2.5">+2.5</button>
                  </div>
                </div>
              </div>

              <!-- Sets Logger Table -->
              <div class="table-responsive mt-3">
                <table class="table-sets">
                  <thead>
                    <tr>
                      <th style="width: 45px;">เซ็ต</th>
                      <th>ครั้งก่อน</th>
                      <th>น้ำหนัก (กก.)</th>
                      <th>จำนวนครั้ง</th>
                      <th>RPE</th>
                      <th style="width: 65px; text-align: center;">สำเร็จ</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${exItem.sets.map((set, setIdx) => `
                      <tr class="set-row ${set.completed ? 'set-completed' : ''}" data-set-index="${setIdx}">
                        <td data-label="เซ็ตที่"><strong>${set.setNum}</strong></td>
                        <td class="text-muted" data-label="ครั้งก่อน">${set.previous || '-'}</td>
                        <td data-label="น้ำหนัก (กก.)">
                          <input type="number" class="set-input set-weight" value="${set.weight}" min="0" max="500" step="0.5" />
                        </td>
                        <td data-label="จำนวนครั้ง">
                          <input type="number" class="set-input set-reps" value="${set.reps}" min="1" max="50" />
                        </td>
                        <td data-label="RPE">
                          <select class="set-input set-rpe">
                            <option value="7" ${set.rpe === 7 ? 'selected' : ''}>7 (เหลือ 3)</option>
                            <option value="7.5" ${set.rpe === 7.5 ? 'selected' : ''}>7.5</option>
                            <option value="8" ${set.rpe === 8 ? 'selected' : ''}>8 (สมดุล)</option>
                            <option value="8.5" ${set.rpe === 8.5 ? 'selected' : ''}>8.5</option>
                            <option value="9" ${set.rpe === 9 ? 'selected' : ''}>9 (ตึงมาก)</option>
                            <option value="9.5" ${set.rpe === 9.5 ? 'selected' : ''}>9.5</option>
                            <option value="10" ${set.rpe === 10 ? 'selected' : ''}>10 (หมดแรง)</option>
                          </select>
                        </td>
                        <td data-label="สำเร็จ" style="text-align: center;">
                          <div class="set-check-wrap">
                            <button class="set-check-btn ${set.completed ? 'checked' : ''}" data-ex-idx="${exIdx}" data-set-idx="${setIdx}">
                              ${set.completed ? '✓' : '○'}
                            </button>
                            <button class="set-copy-btn" data-ex-idx="${exIdx}" data-set-idx="${setIdx}" title="คัดลอกเซ็ตนี้ไปเซ็ตถัดไป">⤴</button>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <!-- Add Set Button -->
              <div class="d-flex justify-between align-center mt-3">
                <button class="btn btn-outline btn-sm add-set-btn" data-ex-idx="${exIdx}">
                  ➕ เพิ่มเซ็ต
                </button>
                <span class="text-muted text-sm">พัก ${exItem.restSec} วินาทีอัตโนมัติเมื่อกดสำเร็จ</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Workout Complete Summary Modal -->
      <div id="workoutSummaryModal" class="modal-backdrop hidden">
        <div class="modal-content" id="workoutSummaryBody"></div>
      </div>
    `;

    this.bindEvents();
    this.bindTimer();
    this.updateQuickProgress();
    this.syncStickyOffsets();
  }

  // โหมดโค้ดหน้าจอสำหรับยิม (สร้างครั้งเดียวตอนแรกที่เปิดหน้านี้)
  ensureScreenDimmer() {
    if (!this.screenDimmer) {
      this.screenDimmer = new ScreenDimmer();
    }
    return this.screenDimmer;
  }

  renderNoActiveWorkout() {
    const plans = storage.getPlans();
    const profile = storage.getProfile();
    const activePlan = plans.find(p => p.id === profile.activePlanId) || plans[0];

    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title">⚡ บันทึกการออกกำลังกาย (Workout Tracker)</h2>
          <p class="view-subtitle">พร้อมเริ่มฝึกหรือยัง? เลือกตารางด้านล่างเพื่อเริ่มเซสชันและระบบแนะนำน้ำหนัก</p>
        </div>
      </div>

      <div class="empty-workout-state">
        <div class="empty-icon">🏋️‍♂️</div>
        <h3>ยังไม่มีการออกกำลังกายที่กำลังทำอยู่</h3>
        <p>เลือกวันฝึกจากแผน <strong>${activePlan.name}</strong> เพื่อเริ่มทันที:</p>

        <div class="quick-start-days-grid mt-4">
          ${activePlan.days.map(day => `
            <div class="quick-start-card" style="border-top: 4px solid ${day.color || '#3b82f6'};">
              <h4>${day.name}</h4>
              <p class="text-muted">${day.description}</p>
              <span class="badge-sub mt-2 mb-3">${day.exercises.length} ท่าฝึก</span>
              <button class="btn btn-primary btn-block quick-launch-btn" data-day-id="${day.id}">
                ▶ เริ่ม ${day.name}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Quick launch buttons
    this.container.querySelectorAll('.quick-launch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dayId = btn.dataset.dayId;
        const day = activePlan.days.find(d => d.id === dayId);
        if (day) {
          this.startSession(activePlan, day);
        }
      });
    });
  }

  bindTimer() {
    if (this.unsubscribeTimer) this.unsubscribeTimer();

    this.unsubscribeTimer = globalTimer.subscribe(state => {
      const clock = document.getElementById('timerClockDisplay');
      const widget = document.getElementById('restTimerWidget');
      if (clock) clock.textContent = state.formatted;
      if (widget) {
        if (state.isRunning) {
          widget.classList.add('active');
        } else {
          widget.classList.remove('active');
        }
      }
      if (this.screenDimmer) this.screenDimmer.updateTimer(state);
    });

    const add30 = document.getElementById('timerAdd30Btn');
    const skip = document.getElementById('timerSkipBtn');

    if (add30) add30.onclick = () => globalTimer.addSeconds(30);
    if (skip) skip.onclick = () => globalTimer.stop();
  }

  bindEvents() {
    // Inputs changes (Weight, Reps, RPE)
    this.container.querySelectorAll('.card-workout-ex').forEach(card => {
      const exIdx = parseInt(card.dataset.exerciseIndex, 10);
      const exItem = this.activeWorkout.exercises[exIdx];

      card.querySelectorAll('.set-row').forEach(row => {
        const setIdx = parseInt(row.dataset.setIndex, 10);
        const setObj = exItem.sets[setIdx];

        const wInput = row.querySelector('.set-weight');
        const rInput = row.querySelector('.set-reps');
        const rpeInput = row.querySelector('.set-rpe');

        if (wInput) {
          wInput.addEventListener('change', (e) => {
            setObj.weight = parseFloat(e.target.value) || 0;
            storage.saveActiveWorkout(this.activeWorkout);
            this.updateLiveVolume();
          });
        }

        if (rInput) {
          rInput.addEventListener('change', (e) => {
            setObj.reps = parseInt(e.target.value, 10) || 0;
            storage.saveActiveWorkout(this.activeWorkout);
            this.updateLiveVolume();
          });
        }

        if (rpeInput) {
          rpeInput.addEventListener('change', (e) => {
            setObj.rpe = parseFloat(e.target.value) || 8;
            storage.saveActiveWorkout(this.activeWorkout);
          });
        }
      });
    });

    // Check Set Completion buttons
    this.container.querySelectorAll('.set-check-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const exIdx = parseInt(btn.dataset.exIdx, 10);
        const setIdx = parseInt(btn.dataset.setIdx, 10);
        const exItem = this.activeWorkout.exercises[exIdx];
        const setObj = exItem.sets[setIdx];

        setObj.completed = !setObj.completed;
        storage.saveActiveWorkout(this.activeWorkout);

        const row = btn.closest('.set-row');
        if (row) {
          row.classList.toggle('set-completed', setObj.completed);
        }
        btn.classList.toggle('checked', setObj.completed);
        btn.textContent = setObj.completed ? '✓' : '○';

        this.updateLiveVolume();
        this.updateQuickProgress();

        // Start Rest Timer if newly completed
        if (setObj.completed) {
          globalTimer.start(exItem.restSec || 90);
          // เตรียมเซ็ตถัดไปให้เท่ากับเซ็ตที่เพิ่งทำสำเร็จ (Double Progression)
          this.applyLastCompletedToNext(exIdx);
        }
      });
    });

    // ปุ่ม "⤴": คัดลอกค่าเซ็ตนี้ไปยังเซ็ตถัดไปที่ยังไม่สำเร็จ
    this.container.querySelectorAll('.set-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.copySetToNext(
          parseInt(btn.dataset.exIdx, 10),
          parseInt(btn.dataset.setIdx, 10)
        );
      });
    });

    // ชุดเครื่องมือระหว่างเซ็ต
    this.container.querySelectorAll('.quick-log-bar').forEach(bar => {
      const exIdx = parseInt(bar.dataset.exIdx, 10);

      const repeatBtn = bar.querySelector('.quick-repeat-btn');
      if (repeatBtn) {
        repeatBtn.addEventListener('click', () => {
          const exItem = this.activeWorkout.exercises[exIdx];
          const source = exItem.sets.filter(s => s.completed).pop();
          if (!source) {
            // ยังไม่มีเซ็ตไหนสำเร็จเลย -> ใช้ค่าของเซ็ตที่มีน้ำหนักแทน
            const fallback = exItem.sets.find(s => s.weight > 0) || exItem.sets[0];
            this.fillPendingSetsWith(exIdx, fallback);
            return;
          }
          this.fillPendingSetsWith(exIdx, source);
        });
      }

      bar.querySelectorAll('.step-btn').forEach(stepBtn => {
        stepBtn.addEventListener('click', () => {
          const exItem = this.activeWorkout.exercises[exIdx];
          const targetIdx = this.findTargetSetIndex(exItem);
          const target = exItem.sets[targetIdx];
          const delta = parseFloat(stepBtn.dataset.delta) || 0;
          target.weight = Math.max(0, Math.round((target.weight + delta) * 2) / 2);

          const row = this.container.querySelector(
            `.card-workout-ex[data-exercise-index="${exIdx}"] .set-row[data-set-index="${targetIdx}"]`
          );
          const input = row && row.querySelector('.set-weight');
          if (input) input.value = target.weight;

          storage.saveActiveWorkout(this.activeWorkout);
          this.updateQuickProgress();
          this.updateLiveVolume();
        });
      });
    });

    this.updateQuickProgress();
    this.syncStickyOffsets();

    // Add Set button
    this.container.querySelectorAll('.add-set-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const exIdx = parseInt(btn.dataset.exIdx, 10);
        const exItem = this.activeWorkout.exercises[exIdx];
        const lastSet = exItem.sets[exItem.sets.length - 1];

        exItem.sets.push({
          setNum: exItem.sets.length + 1,
          weight: lastSet ? lastSet.weight : 20,
          reps: lastSet ? lastSet.reps : 10,
          rpe: 8,
          completed: false,
          previous: '-'
        });

        storage.saveActiveWorkout(this.activeWorkout);
        this.render();
      });
    });

    // Open Exercise Detail modal
    this.container.querySelectorAll('.open-tech-detail-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const exId = btn.dataset.exerciseId;
        if (this.onOpenExerciseDetail) {
          this.onOpenExerciseDetail(exId);
        }
      });
    });

    // Cancel Workout
    const cancelBtn = this.container.querySelector('#cancelWorkoutBtn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        if (confirm('ต้องการยกเลิกการออกกำลังกายครั้งนี้หรือไม่? ข้อมูลของเซสชันนี้จะไม่ถูกบันทึก')) {
          this.stopElapsedTimer();
          globalTimer.stop();
          if (this.screenDimmer) this.screenDimmer.shutdown();
          storage.clearActiveWorkout();
          this.activeWorkout = null;
          this.render();
        }
      });
    }

    // Finish Workout
    const finishBtn = this.container.querySelector('#finishWorkoutBtn');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        this.finishWorkout();
      });
    }

    // ปุ่มเปิด/ปิดโหมดโค้ดหน้าจอ (one-tap)
    this.ensureScreenDimmer();
    this.container.querySelectorAll('.dimmer-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.screenDimmer.toggle();
        if ('vibrate' in navigator) {
          try { navigator.vibrate(20); } catch (e) { /* ignore */ }
        }
      });
    });
  }

  // ===== Between-sets helpers (ออกแบบมาให้ใช้ง่ายบนมือถือระหว่างเซ็ต) =====
  getTotalRemainingSets() {
    if (!this.activeWorkout) return 0;
    let remaining = 0;
    this.activeWorkout.exercises.forEach(ex => {
      remaining += ex.sets.filter(s => !s.completed).length;
    });
    return remaining;
  }

  // เซ็ตที่กำลังจะทำ: เซ็ตแรกที่ยังไม่สำเร็จ ถ้าครบแล้วให้ใช้เซ็ตสุดท้าย
  findTargetSetIndex(exItem) {
    const pending = exItem.sets.findIndex(s => !s.completed);
    return pending === -1 ? exItem.sets.length - 1 : pending;
  }

  syncSetRowInputs(exIdx, setIdx) {
    const row = this.container.querySelector(
      `.card-workout-ex[data-exercise-index="${exIdx}"] .set-row[data-set-index="${setIdx}"]`
    );
    if (!row) return;
    const set = this.activeWorkout.exercises[exIdx].sets[setIdx];
    const w = row.querySelector('.set-weight');
    const r = row.querySelector('.set-reps');
    const p = row.querySelector('.set-rpe');
    if (w) w.value = set.weight;
    if (r) r.value = set.reps;
    if (p) p.value = set.rpe;
  }

  fillPendingSetsWith(exIdx, source) {
    const exItem = this.activeWorkout.exercises[exIdx];
    exItem.sets.forEach(s => {
      if (!s.completed) {
        s.weight = source.weight;
        s.reps = source.reps;
        s.rpe = source.rpe;
      }
    });
    storage.saveActiveWorkout(this.activeWorkout);
    this.render();
  }

  applyLastCompletedToNext(exIdx) {
    const exItem = this.activeWorkout.exercises[exIdx];
    const doneIdx = exItem.sets.findIndex(s => !s.completed);
    if (doneIdx === -1) return;

    const lastDone = exItem.sets[doneIdx - 1];
    if (!lastDone) return;

    const next = exItem.sets[doneIdx];
    next.weight = lastDone.weight;
    next.reps = lastDone.reps;
    next.rpe = lastDone.rpe;

    this.syncSetRowInputs(exIdx, doneIdx);
    storage.saveActiveWorkout(this.activeWorkout);
  }

  copySetToNext(exIdx, setIdx) {
    const exItem = this.activeWorkout.exercises[exIdx];
    const source = exItem.sets[setIdx];
    const nextIdx = exItem.sets.findIndex((s, i) => i > setIdx && !s.completed);
    if (nextIdx === -1) return;

    const next = exItem.sets[nextIdx];
    next.weight = source.weight;
    next.reps = source.reps;
    next.rpe = source.rpe;

    this.syncSetRowInputs(exIdx, nextIdx);
    storage.saveActiveWorkout(this.activeWorkout);
    this.updateQuickProgress();
  }

  highlightTargetSet(exIdx, setIdx) {
    const card = this.container.querySelector(`.card-workout-ex[data-exercise-index="${exIdx}"]`);
    if (!card) return;

    card.querySelectorAll('.set-row.is-target').forEach(row => row.classList.remove('is-target'));
    const row = card.querySelector(`.set-row[data-set-index="${setIdx}"]`);
    if (row) row.classList.add('is-target');
  }

  // อัปเดตตัวนับทุกช่องโดยไม่ต้องเรนเดอร์ใหม่ทั้งหน้า
  updateQuickProgress() {
    if (!this.activeWorkout || !this.container) return;

    this.activeWorkout.exercises.forEach((exItem, exIdx) => {
      const bar = this.container.querySelector(`.quick-log-bar[data-ex-idx="${exIdx}"]`);
      if (!bar) return;

      const done = exItem.sets.filter(s => s.completed).length;
      const total = exItem.sets.length;
      const left = total - done;

      const doneEl = bar.querySelector('[data-role="done"]');
      const totalEl = bar.querySelector('[data-role="total"]');
      const leftEl = bar.querySelector('[data-role="left"]');
      if (doneEl) doneEl.textContent = done;
      if (totalEl) totalEl.textContent = total;
      if (leftEl) leftEl.textContent = left > 0 ? `เหลือ ${left} เซ็ต` : 'ครบทุกเซ็ตแล้ว';

      bar.classList.toggle('is-complete', left === 0);
      this.highlightTargetSet(exIdx, this.findTargetSetIndex(exItem));
    });

    const leftEl = document.getElementById('workoutSetsLeft');
    if (leftEl) {
      const remaining = this.getTotalRemainingSets();
      leftEl.textContent = remaining;
      leftEl.classList.toggle('text-success', remaining === 0);
    }

    // ส่งบริบท "ท่าที่กำลังจะทำ" ไปยังหน้าจอโค้ดมืด
    if (this.screenDimmer) {
      let nextIdx = this.activeWorkout.exercises.findIndex(ex => ex.sets.some(s => !s.completed));
      if (nextIdx === -1) nextIdx = 0;
      const nextEx = this.activeWorkout.exercises[nextIdx];
      if (nextEx) {
        const nextSetIdx = this.findTargetSetIndex(nextEx);
        const meta = getExerciseById(nextEx.exerciseId);
        this.screenDimmer.setContext({
          exerciseName: meta ? meta.nameTh : nextEx.exerciseId,
          setLabel: nextEx.sets[nextSetIdx] ? `เซ็ตที่ ${nextEx.sets[nextSetIdx].setNum}` : '',
          setsDone: nextEx.sets.filter(s => s.completed).length,
          setsTotal: nextEx.sets.length
        });
      }
    }
  }

  // วัดความสูง header/nav จริง แล้วส่งให้ CSS ใช้เป็น offset ของ sticky quick bar
  syncStickyOffsets() {
    const header = document.querySelector('.app-header');
    const nav = document.querySelector('.bottom-nav');
    const sessionBar = this.container.querySelector('.active-session-bar');
    const root = document.documentElement.style;
    if (header) root.setProperty('--app-header-h', `${Math.round(header.offsetHeight)}px`);
    if (nav && getComputedStyle(nav).display !== 'none') {
      root.setProperty('--bottom-nav-h', `${Math.round(nav.offsetHeight)}px`);
    }
    // บนมือถือ session bar เลื่อนตามหน้า (static) จึงไม่ต้องกันพื้นที่ sticky
    const sessSticky = sessionBar && getComputedStyle(sessionBar).position === 'sticky';
    root.setProperty('--session-bar-h', sessSticky ? `${Math.round(sessionBar.offsetHeight)}px` : '0px');
  }

  calculateCurrentVolume() {
    if (!this.activeWorkout) return 0;
    let vol = 0;
    this.activeWorkout.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed && s.weight > 0 && s.reps > 0) {
          vol += (s.weight * s.reps);
        }
      });
    });
    return Math.round(vol);
  }

  updateLiveVolume() {
    const volEl = document.getElementById('workoutVolumeDisplay');
    if (volEl) {
      volEl.textContent = `${this.calculateCurrentVolume().toLocaleString()} กก.`;
    }
  }

  finishWorkout() {
    const totalVolume = this.calculateCurrentVolume();
    let completedSetsCount = 0;
    let totalSetsCount = 0;

    this.activeWorkout.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        totalSetsCount++;
        if (s.completed) completedSetsCount++;
      });
    });

    if (completedSetsCount === 0) {
      if (!confirm('คุณยังไม่ได้ทำเครื่องหมายเสร็จสิ้นในเซ็ตใดเลย ต้องการบันทึกหรือไม่?')) {
        return;
      }
    }

    this.stopElapsedTimer();
    globalTimer.stop();
    if (this.screenDimmer) this.screenDimmer.shutdown();
    playCompletionBeep();

    const durationMins = Math.max(1, Math.round(this.elapsedSeconds / 60));
    this.activeWorkout.durationMinutes = durationMins;
    this.activeWorkout.totalVolumeKg = totalVolume;

    // Save to permanent storage
    storage.addWorkoutToHistory(this.activeWorkout);

    // Feed the logged sets back into the personal ratio model
    const learned = this.collectLearnedUpdates(this.activeWorkout);
    if (learned.length > 0) {
      storage.updateProfile({ lastModelSyncAt: new Date().toISOString() });
    }

    // Show celebration modal
    this.showWorkoutCompleteModal(durationMins, totalVolume, completedSetsCount, learned);
  }

  // Summarise what this session taught the weight-progression model
  collectLearnedUpdates(workout) {
    const updates = [];
    (workout.exercises || []).forEach(ex => {
      const validSets = (ex.sets || []).filter(s => s.completed && s.weight > 0 && s.reps > 0);
      if (validSets.length === 0) return;

      const topSet = validSets.reduce((best, s) => (s.weight > best.weight ? s : best), validSets[0]);
      const logged = getLogged1RM([{ sets: validSets }]);
      const historyBefore = storage.getExerciseHistory(ex.exerciseId).length;
      const exercise = getExerciseById(ex.exerciseId);

      updates.push({
        exerciseId: ex.exerciseId,
        name: exercise ? exercise.nameTh : ex.exerciseId,
        topWeight: topSet.weight,
        topReps: topSet.reps,
        est1RM: logged.est1RM,
        isNew: historyBefore <= 1
      });
    });
    return updates;
  }

  showWorkoutCompleteModal(durationMins, totalVolume, completedSets, learned = []) {
    const modal = document.getElementById('workoutSummaryModal');
    const body = document.getElementById('workoutSummaryBody');
    if (!modal || !body) return;

    body.innerHTML = `
      <div class="celebration-content text-center">
        <div class="celebration-emoji">🏆</div>
        <h2 class="modal-title text-success">ยอดเยี่ยมมาก! สำเร็จการฝึกซ้อม</h2>
        <p class="modal-subtitle">บันทึกข้อมูลและอัปเดตสถิติ Progressive Overload เรียบร้อยแล้ว</p>

        <div class="summary-stats-grid mt-4">
          <div class="stat-card">
            <span class="stat-card-label">⏱️ ระยะเวลาฝึก</span>
            <span class="stat-card-val text-primary">${durationMins} นาที</span>
          </div>
          <div class="stat-card">
            <span class="stat-card-label">⚖️ ปริมาณยกทั้งหมด (Volume)</span>
            <span class="stat-card-val text-success">${totalVolume.toLocaleString()} กก.</span>
          </div>
          <div class="stat-card">
            <span class="stat-card-label">🎯 เซ็ตที่สำเร็จ</span>
            <span class="stat-card-val text-accent">${completedSets} เซ็ต</span>
          </div>
        </div>

        ${learned.length ? `
          <div class="learned-box mt-4">
            <h4 class="learned-title">📚 ระบบเรียนรู้จากครั้งนี้</h4>
            <p class="learned-sub">น้ำหนักที่เพิ่งบันทึกถูกใช้เป็นสัดส่วนส่วนตัว ท่าที่ยังไม่เคยบันทึกในแผนจะถูกปรับตามสัดส่วนใหม่นี้</p>
            <div class="learned-list">
              ${learned.map(item => `
                <div class="learned-item">
                  <strong>${item.name}</strong>
                  <span>${item.topWeight} กก. × ${item.topReps} ครั้ง → 1RM ≈ ${item.est1RM} กก.</span>
                  ${item.isNew ? '<span class="source-tag own">ข้อมูลใหม่</span>' : '<span class="source-tag logged">ปรับสัดส่วนแล้ว</span>'}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <p class="celebration-quote mt-4">
          "ความสม่ำเสมอคือหัวใจสำคัญในการสร้างกล้ามเนื้อและพละกำลัง อย่าลืมพักผ่อนและเติมโปรตีนให้เพียงพอ!"
        </p>

        <button class="btn btn-success btn-block btn-lg mt-4" id="closeSummaryModalBtn">
          ดูประวัติและสถิติภาพรวม
        </button>
      </div>
    `;

    const closeBtn = body.querySelector('#closeSummaryModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        this.activeWorkout = null;
        if (this.onWorkoutFinished) {
          this.onWorkoutFinished();
        }
      });
    }

    modal.classList.remove('hidden');
  }
}
