/**
 * Fit App - Goals & Weight Progression Management View
 * Allows selecting fitness goals, adjusting progressive overload parameters, calculating 1RM,
 * and saving weight baselines that are propagated across the whole plan
 */

import { FITNESS_GOALS, getGoalById } from '../data/goals.js';
import { storage } from '../services/storage.js';
import { EXERCISES, getExerciseById } from '../data/exercises.js';
import {
  estimate1RM,
  getWeightForGoal,
  hasLoggedPerformance,
  buildPlanWeightSync
} from '../engine/progression.js';

export class GoalsView {
  constructor(containerId, onGoalChanged) {
    this.container = document.getElementById(containerId);
    this.onGoalChanged = onGoalChanged;
    this.calcExerciseId = 'barbell-bench-press';
    this.calcWeight = 70;
    this.calcReps = 8;
    this.syncPlanId = null;
    this.baselineSnapshot = null;
    this.overrideEditorId = null;
  }

  render() {
    const profile = storage.getProfile();
    const currentGoalId = profile.selectedGoal || 'hypertrophy';
    const currentGoal = getGoalById(currentGoalId);
    const plans = storage.getPlans();

    if (!this.syncPlanId) this.syncPlanId = profile.activePlanId || (plans[0] && plans[0].id);

    // Pre-fill the calculator with the baseline already stored for this movement
    const storedBaseline = storage.getExerciseBaseline(this.calcExerciseId);
    if (storedBaseline && storedBaseline.source === 'manual' && storedBaseline.weight > 0) {
      this.calcWeight = storedBaseline.weight;
      this.calcReps = storedBaseline.reps || this.calcReps;
    }

    const est1RM = estimate1RM(this.calcWeight, this.calcReps);
    const targetWorkingWeight = getWeightForGoal(est1RM, currentGoalId);

    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title">🎯 เป้าหมาย & ระบบบริหารน้ำหนัก (Goal & Weight Progression)</h2>
          <p class="view-subtitle">เลือกเป้าหมายหลักเพื่อปรับจำนวนครั้ง (Reps), เวลาพัก (Rest Time), และระบบคำนวณ Progressive Overload อัตโนมัติ</p>
        </div>
      </div>

      <!-- Current Active Goal Banner -->
      <div class="active-goal-banner">
        <div class="goal-banner-icon">${currentGoal.icon}</div>
        <div class="goal-banner-info">
          <div class="d-flex align-center gap-2">
            <span class="badge-cat">เป้าหมายปัจจุบันของคุณ</span>
            <span class="badge-highlight">${currentGoal.badge}</span>
          </div>
          <h3 class="banner-title">${currentGoal.name}</h3>
          <p class="banner-desc">${currentGoal.shortDesc}</p>
          <div class="banner-stats">
            <div class="stat-box">
              <span class="stat-label">ช่วงจำนวนครั้งที่แนะนำ</span>
              <span class="stat-value">${currentGoal.repRange}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">ความเข้มข้น (% 1RM)</span>
              <span class="stat-value">${currentGoal.intensityPct}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">เวลาพักระหว่างเซ็ต</span>
              <span class="stat-value">${currentGoal.restDescription}</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">RPE เป้าหมาย</span>
              <span class="stat-value">RPE ${currentGoal.rpeTarget}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Goal Selection Cards Grid -->
      <h3 class="section-title mt-4">เลือกเปลี่ยนเป้าหมายการฝึกซ้อม:</h3>
      <div class="goals-grid">
        ${FITNESS_GOALS.map(goal => {
          const isSelected = goal.id === currentGoalId;
          return `
            <div class="goal-card ${isSelected ? 'selected' : ''}" data-goal-id="${goal.id}">
              <div class="goal-card-top">
                <span class="goal-icon">${goal.icon}</span>
                ${isSelected ? '<span class="selected-pill">✓ ใช้งานอยู่</span>' : '<span class="select-pill">เลือกเป้าหมายนี้</span>'}
              </div>
              <h4 class="goal-card-title">${goal.name}</h4>
              <p class="goal-card-desc">${goal.shortDesc}</p>

              <div class="goal-specs">
                <div class="spec-row">
                  <span>เป้าหมายจำนวนครั้ง:</span>
                  <strong>${goal.repRange}</strong>
                </div>
                <div class="spec-row">
                  <span>ความเข้มข้น:</span>
                  <strong>${goal.intensityPct}</strong>
                </div>
                <div class="spec-row">
                  <span>เวลาพัก:</span>
                  <strong>${goal.restDescription}</strong>
                </div>
              </div>

              <div class="goal-rule-box">
                <span class="rule-tag">กฎการเพิ่มน้ำหนัก:</span>
                <p class="rule-text">${goal.progressionRule}</p>
              </div>

              <button class="btn ${isSelected ? 'btn-success' : 'btn-outline'} btn-block mt-3 select-goal-btn" data-goal-id="${goal.id}">
                ${isSelected ? 'กำลังใช้งานเป้าหมายนี้' : 'เปลี่ยนเป็นเป้าหมายนี้'}
              </button>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Interactive 1RM & Progressive Overload Calculator -->
      <div class="card card-elevated mt-4">
        <div class="card-header">
          <h3 class="card-title">🧮 เครื่องคำนวณ 1RM & ระบบจำลองการปรับน้ำหนัก (Progressive Overload Simulator)</h3>
          <p class="card-subtitle">ใส่น้ำหนักและจำนวนครั้งที่คุณเคยยกได้ แล้วกดบันทึก เพื่อให้ระบบปรับทุกท่าในแผนให้สอดคล้องกับเป้าหมาย ${currentGoal.name}</p>
        </div>

        <div class="calculator-body">
          <div class="calc-inputs-row">
            <div class="form-group flex-1">
              <label for="calcExerciseSelect">เลือกท่าออกกำลังกาย:</label>
              <select id="calcExerciseSelect" class="form-control">
                ${EXERCISES.map(e => `
                  <option value="${e.id}" ${e.id === this.calcExerciseId ? 'selected' : ''}>${e.nameTh}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group flex-1">
              <label for="calcWeightInput">น้ำหนักที่ยกได้ (กก.):</label>
              <input type="number" id="calcWeightInput" class="form-control" value="${this.calcWeight}" min="1" max="500" step="2.5" />
            </div>

            <div class="form-group flex-1">
              <label for="calcRepsInput">จำนวนครั้งที่ทำได้ (Reps):</label>
              <input type="number" id="calcRepsInput" class="form-control" value="${this.calcReps}" min="1" max="30" />
            </div>
          </div>

          <div class="calc-results-grid mt-3">
            <div class="result-tile primary-tile">
              <span class="tile-label">ประมาณการ 1RM (น้ำหนักสูงสุด 1 ครั้ง)</span>
              <span class="tile-value text-accent" id="res1RMVal">${est1RM} กก.</span>
              <span class="tile-sub">คำนวณจากสูตรผสม Epley & Brzycki</span>
            </div>

            <div class="result-tile success-tile">
              <span class="tile-label">น้ำหนัก Working Set ที่เหมาะสม (${currentGoal.name})</span>
              <span class="tile-value text-success" id="resTargetVal">${targetWorkingWeight} กก.</span>
              <span class="tile-sub">ทำเซ็ตละ ${currentGoal.repRange} (พัก ${currentGoal.recommendedRest} วิ)</span>
            </div>

            <div class="result-tile info-tile">
              <span class="tile-label">กลยุทธ์การก้าวหน้า (Next Progression)</span>
              <span class="tile-value text-info">+2.5 - 5.0 กก.</span>
              <span class="tile-sub">เมื่อยกแตะ ${currentGoal.maxReps} ครั้งครบทุกเซ็ต</span>
            </div>
          </div>

          <!-- Save baseline & propagate to the whole plan -->
          <div class="calc-save-bar">
            <div class="calc-save-status" id="calcBaselineStatus"></div>
            <div class="d-flex gap-2 flex-wrap">
              <button class="btn btn-outline" id="revertSyncBtn" style="display:none;">↩️ ย้อนกลับค่าก่อนหน้า</button>
              <button class="btn btn-success" id="saveCalcBaselineBtn">💾 บันทึกเกณฑ์ &amp; ปรับแผนทั้งหมด</button>
            </div>
          </div>

          <div class="sync-panel">
            <div class="sync-panel-head">
              <div class="sync-plan-picker">
                <label for="syncPlanSelect">แผนที่จะปรับให้สอดคล้อง:</label>
                <select id="syncPlanSelect" class="form-control form-control-sm">
                  ${plans.map(p => `<option value="${p.id}" ${p.id === this.syncPlanId ? 'selected' : ''}>${p.name}</option>`).join('')}
                </select>
              </div>
              <span class="text-muted text-sm" id="syncSummary"></span>
            </div>

            <div id="syncTableWrap"></div>

            <p class="tab-note">
              • ท่าที่ <strong>บันทึกการออกกำลังกายจริงแล้ว</strong> ระบบจะยึดข้อมูลจริงเป็นหลัก และไม่ถูกแก้ไข<br />
              • ท่าที่<strong>ยังไม่เคยบันทึก</strong> ระบบจะเทียบสัดส่วนจาก <strong>ข้อมูลจริงของคุณเอง</strong> ในท่าที่คล้ายกันก่อน (เช่น คุณยก Deadlift ได้ต่ำกว่าสัดส่วนมาตรฐานเมื่อเทียบกับ Bench ระบบก็จะลดน้ำหนักของท่าดึงอื่น ๆ ลงตามสัดส่วน)<br />
              • หากยังไม่มีข้อมูลจริงพอ ระบบจะใช้เกณฑ์มาตรฐานเทียบเคียงแทน (เช่น Deadlift ≈ 1.5 × Bench Press) และค่อย ๆ เปลี่ยนเป็นสัดส่วนของคุณเองเมื่อคุณบันทึกเพิ่ม<br />
              • กด <strong>⚙️ ตั้งเอง</strong> ในคอลัมน์ “ปรับมือ” เพื่อล็อกน้ำหนักของท่านั้นไว้เป็นตัวเลขของคุณเอง ระบบจะไม่แก้ไขจนกว่าจะกด 🔓 ปลดล็อก
            </p>
            <p class="tab-note" id="syncMetaNote"></p>
          </div>

          <!-- Scientific RPE Scale Helper -->
          <div class="rpe-scale-guide mt-4">
            <h4 class="section-title">📊 ทำความเข้าใจมาตรวัด RPE (Rate of Perceived Exertion)</h4>
            <p class="tab-note">RPE คือระดับความเหนื่อยล้าในการยก ระบบของ Fit App ใช้ RPE เพื่อประเมินว่าจะให้คุณเพิ่มน้ำหนักหรือรักษาน้ำหนักเดิม:</p>

            <div class="rpe-bar-list">
              <div class="rpe-item"><span class="rpe-badge rpe-10">RPE 10</span> <strong>หมดแรงสมบูรณ์แบบ (Max Effort):</strong> ไม่สามารถทำเพิ่มได้อีกแม้แต่ครั้งเดียว</div>
              <div class="rpe-item"><span class="rpe-badge rpe-9">RPE 9</span> <strong>หนักมาก:</strong> ยังเหลือแรงทำได้อีกเพียง 1 ครั้ง (1 Rep in Reserve - RIR)</div>
              <div class="rpe-item"><span class="rpe-badge rpe-8">RPE 8</span> <strong>ระดับทองคำ (Optimal Zone):</strong> หนักกำลังดี ยังเหลือแรงทำได้อีก 2 ครั้ง (แนะนำสำหรับสร้างกล้ามเนื้อ)</div>
              <div class="rpe-item"><span class="rpe-badge rpe-7">RPE 7</span> <strong>ปานกลาง:</strong> น้ำหนักเคลื่อนที่ได้เร็ว ยังเหลือแรงทำได้อีก 3 ครั้ง</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.renderSyncPreview();
  }

  bindEvents() {
    // Select Goal buttons
    const selectBtns = this.container.querySelectorAll('.select-goal-btn, .goal-card');
    selectBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const goalId = btn.dataset.goalId;
        if (goalId) {
          storage.updateProfile({ selectedGoal: goalId });
          if (this.onGoalChanged) this.onGoalChanged(goalId);
          this.render();
        }
      });
    });

    // Calculator inputs
    const exSelect = this.container.querySelector('#calcExerciseSelect');
    const weightInput = this.container.querySelector('#calcWeightInput');
    const repsInput = this.container.querySelector('#calcRepsInput');
    const planSelect = this.container.querySelector('#syncPlanSelect');
    const saveBtn = this.container.querySelector('#saveCalcBaselineBtn');
    const revertBtn = this.container.querySelector('#revertSyncBtn');

    if (exSelect) {
      exSelect.addEventListener('change', (e) => {
        this.calcExerciseId = e.target.value;
        const stored = storage.getExerciseBaseline(this.calcExerciseId);
        if (stored && stored.source === 'manual' && stored.weight > 0) {
          this.calcWeight = stored.weight;
          this.calcReps = stored.reps || this.calcReps;
          if (weightInput) weightInput.value = this.calcWeight;
          if (repsInput) repsInput.value = this.calcReps;
        }
        this.updateCalcResults();
      });
    }
    if (weightInput) {
      weightInput.addEventListener('input', (e) => {
        this.calcWeight = parseFloat(e.target.value) || 0;
        this.updateCalcResults();
      });
    }
    if (repsInput) {
      repsInput.addEventListener('input', (e) => {
        this.calcReps = parseInt(e.target.value, 10) || 1;
        this.updateCalcResults();
      });
    }
    if (planSelect) {
      planSelect.addEventListener('change', (e) => {
        this.syncPlanId = e.target.value;
        this.renderSyncPreview();
      });
    }

    // Save: store the entered value and propagate it to every unlogged movement of the plan
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (!this.calcWeight || this.calcWeight <= 0) {
          alert('กรุณากรอกน้ำหนักที่ยกได้ก่อนบันทึกเกณฑ์');
          return;
        }

        const { rows, est } = this.computeSync();
        this.baselineSnapshot = JSON.stringify(storage.getExerciseBaselines());

        const entries = [{
          exerciseId: this.calcExerciseId,
          weight: this.calcWeight,
          reps: this.calcReps,
          est1RM: est,
          source: 'manual',
          anchorId: this.calcExerciseId
        }];

        rows.filter(r => !r.isAnchor && !r.hasHistory && !r.lockedByUser).forEach(r => {
          entries.push({
            exerciseId: r.exerciseId,
            weight: r.derivedWeight,
            reps: null,
            est1RM: r.derived1RM,
            source: 'derived',
            anchorId: this.calcExerciseId
          });
        });

        storage.saveExerciseBaseline(entries);
        if (revertBtn) revertBtn.style.display = '';
        this.renderSyncPreview();
      });
    }

    // Revert: restore the baselines that were stored before the last save
    if (revertBtn) {
      revertBtn.addEventListener('click', () => {
        if (!this.baselineSnapshot) return;
        const restored = JSON.parse(this.baselineSnapshot);
        storage.saveExerciseBaselines(restored);
        this.baselineSnapshot = null;
        revertBtn.style.display = 'none';

        const restoredAnchor = restored[this.calcExerciseId];
        if (restoredAnchor && restoredAnchor.source === 'manual' && restoredAnchor.weight > 0) {
          this.calcWeight = restoredAnchor.weight;
          this.calcReps = restoredAnchor.reps || this.calcReps;
          const weightInput = this.container.querySelector('#calcWeightInput');
          const repsInput = this.container.querySelector('#calcRepsInput');
          if (weightInput) weightInput.value = this.calcWeight;
          if (repsInput) repsInput.value = this.calcReps;
        }
        this.updateCalcResults();
      });
    }
  }

  getCurrentGoalId() {
    const profile = storage.getProfile();
    return profile.selectedGoal || 'hypertrophy';
  }

  computeSync() {
    const plan = storage.getPlanById(this.syncPlanId);
    const est = estimate1RM(this.calcWeight, this.calcReps);
    const rows = buildPlanWeightSync(
      plan,
      this.calcExerciseId,
      est,
      this.getCurrentGoalId(),
      (id) => storage.getExerciseHistory(id),
      storage.getExerciseBaselines()
    );
    return { plan, est, rows };
  }

  ratioSourceTag(row) {
    if (row.isAnchor) return { text: 'ท่าที่คุณบันทึก', cls: 'anchor' };
    if (row.lockedByUser) return { text: 'ตั้งค่าเอง (ล็อก)', cls: 'override' };
    if (row.hasHistory) return { text: 'ยึดข้อมูลจริง', cls: 'logged' };
    if (row.ratioMode === 'own') return { text: 'สัดส่วนจริงของคุณ', cls: 'own' };
    if (row.ratioMode === 'personal') return { text: 'สัดส่วนของคุณ', cls: 'personal' };
    if (row.ratioMode === 'blend') return { text: 'ผสมสัดส่วนของคุณ', cls: 'blend' };
    return { text: 'เกณฑ์มาตรฐาน', cls: 'standard' };
  }

  ratioDetailHtml(row) {
    if (row.isAnchor) return '';
    if (row.lockedByUser) {
      return `<em class="ratio-detail">คุณล็อกค่านี้ไว้ — ระบบจะไม่แก้ไขอัตโนมัติจนกว่าจะกดปลดล็อก</em>`;
    }
    const factorNote = row.ratioFactor && row.ratioFactor !== 1 ? ` × ${row.ratioFactor}` : '';
    if (row.ratioMode === 'standard') {
      return `<em class="ratio-detail">เกณฑ์มาตรฐาน ${row.stdRatio}× Bench</em>`;
    }
    if (row.ratioMode === 'own') {
      return `<em class="ratio-detail">จากสัดส่วนจริงของท่านี้ (มาตรฐาน ${row.stdRatio}×${factorNote})</em>`;
    }
    const names = (row.usedSamples || []).slice(0, 1).join(', ');
    const more = (row.usedSamples || []).length > 2 ? ' ฯลฯ' : '';
    const basis = names ? `จาก ${names}${more}` : 'จากท่าที่บันทึกคล้ายกัน';
    return `<em class="ratio-detail">มาตรฐาน ${row.stdRatio}×${factorNote} → ${row.ratio}× (${basis})</em>`;
  }

  syncRowHtml(row) {
    const fmt1RM = (n) => Math.round(n * 10) / 10;
    const delta = (row.currentWeight != null) ? row.derivedWeight - row.currentWeight : null;
    const locked = (row.hasHistory || row.lockedByUser) && !row.isAnchor;
    const source = this.ratioSourceTag(row);

    let deltaClass = 'fresh';
    let deltaText = 'ใหม่';
    if (row.lockedByUser) {
      deltaClass = 'locked';
      deltaText = 'ค่าที่คุณตั้ง';
    } else if (locked) {
      deltaClass = 'locked';
      deltaText = 'ยึดข้อมูลจริง';
    } else if (delta != null) {
      deltaClass = delta > 0 ? 'up' : delta < 0 ? 'down' : 'same';
      deltaText = delta === 0 ? 'คงเดิม' : `${delta > 0 ? '+' : ''}${delta} กก.`;
    }

    const overrideCell = this.overrideEditorId === row.exerciseId
      ? `<div class="override-editor">
          <input type="number" class="form-control form-control-sm override-input" min="0" max="500" step="0.5" value="${row.derivedWeight}" />
          <button class="btn btn-xs btn-success override-save-btn">บันทึก</button>
          <button class="btn btn-xs btn-outline override-cancel-btn">ยกเลิก</button>
        </div>`
      : (row.lockedByUser
        ? `<button class="btn btn-xs btn-outline override-btn">🔓 ปลดล็อก</button>`
        : `<button class="btn btn-xs btn-outline override-btn">⚙️ ตั้งเอง</button>`);

    return `
      <tr class="sync-row ${row.isAnchor ? 'is-anchor' : ''} ${row.lockedByUser ? 'is-locked' : ''}">
        <td class="text-muted text-sm" data-label="วันฝึก">${row.dayName}</td>
        <td data-label="ท่า"><strong>${row.name}</strong>${row.note ? ` <span class="text-muted text-sm">(${row.note})</span>` : ''}</td>
        <td data-label="น้ำหนักเดิม">${row.currentWeight != null ? `${row.currentWeight} กก.` : '<span class="text-muted">ยังไม่มีข้อมูล</span>'}</td>
        <td data-label="น้ำหนักที่ระบบเสนอ">
          <strong class="${locked ? 'text-muted' : 'text-accent'}">${row.derivedWeight} กก.</strong>
          <em class="text-muted text-sm">(1RM ≈ ${fmt1RM(row.derived1RM)} กก.)</em>
          <div>${this.ratioDetailHtml(row)}</div>
        </td>
        <td data-label="เปลี่ยนแปลง"><span class="sync-delta ${deltaClass}">${deltaText}</span></td>
        <td data-label="ที่มาของตัวเลข"><span class="source-tag ${source.cls}">${source.text}</span></td>
        <td data-label="ปรับมือ">${overrideCell}</td>
      </tr>
    `;
  }

  renderSyncPreview() {
    const statusEl = this.container.querySelector('#calcBaselineStatus');
    const summaryEl = this.container.querySelector('#syncSummary');
    const tableWrap = this.container.querySelector('#syncTableWrap');
    if (!statusEl || !summaryEl || !tableWrap) return;

    const { plan, est, rows } = this.computeSync();
    if (!plan) return;
    this.lastSyncRows = rows;

    const anchorEx = getExerciseById(this.calcExerciseId);
    const anchorName = anchorEx ? anchorEx.nameTh : this.calcExerciseId;
    const baseline = storage.getExerciseBaseline(this.calcExerciseId);
    const loggedHere = hasLoggedPerformance(storage.getExerciseHistory(this.calcExerciseId));
    const affected = rows.filter(r =>
      !r.isAnchor && !r.hasHistory && !r.lockedByUser && r.derivedWeight !== r.currentWeight
    );

    statusEl.innerHTML = baseline
      ? `เกณฑ์ที่บันทึกไว้ของ ${anchorName}: <strong>${baseline.weight} กก. × ${baseline.reps} ครั้ง</strong> (1RM ≈ ${baseline.est1RM} กก.) ${loggedHere ? '<span class="source-tag logged">มีข้อมูลการออกกำลังกายจริงแล้ว — ระบบจะใช้ข้อมูลจริงเป็นหลัก</span>' : ''}`
      : `ยังไม่เคยบันทึกเกณฑ์ของ ${anchorName} — กดปุ่มบันทึกเพื่อให้ระบบใช้ค่านี้เป็นพื้นฐานของแผนทั้งหมด`;

    const personalised = rows.filter(r =>
      !r.isAnchor && !r.lockedByUser && (r.ratioMode === 'personal' || r.ratioMode === 'own' || r.ratioMode === 'blend')
    ).length;
    const lockedCount = rows.filter(r => r.lockedByUser).length;
    const summaryBase = affected.length > 0
      ? `คำนวณจาก 1RM ≈ ${est} กก. • จะปรับ ${affected.length} ท่าในแผน ${plan.name}`
      : (baseline
        ? `คำนวณจาก 1RM ≈ ${est} กก. • บันทึกแล้ว แผน ${plan.name} สอดคล้องกับเกณฑ์ของคุณ`
        : `คำนวณจาก 1RM ≈ ${est} กก. • แผน ${plan.name} ยังไม่ถูกปรับ กดปุ่มบันทึกเพื่อใช้เกณฑ์นี้`);

    const extras = [];
    if (personalised > 0) extras.push(`<span class="text-success">🎯 ปรับอัตโนมัติจากสัดส่วนจริงของคุณเองใน ${personalised} ท่า</span>`);
    if (lockedCount > 0) extras.push(`<span class="text-info">🔒 คุณล็อกน้ำหนักเองไว้ ${lockedCount} ท่า</span>`);

    summaryEl.innerHTML = extras.length ? `${summaryBase}<br />${extras.join('<br />')}` : summaryBase;

    const lastSync = storage.getProfile().lastModelSyncAt;
    const syncNoteEl = this.container.querySelector('#syncMetaNote');
    if (syncNoteEl) {
      syncNoteEl.innerHTML = lastSync
        ? `📚 อัปเดตโมเดลล่าสุดจากการบันทึกการออกกำลังกายเมื่อ ${new Date(lastSync).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}`
        : '📚 ยังไม่เคยบันทึกการออกกำลังกาย — ระบบยังใช้เกณฑ์มาตรฐานเป็นหลัก แล้วจะค่อย ๆ เปลี่ยนเป็นสัดส่วนของคุณเอง';
    }

    tableWrap.innerHTML = rows.length
      ? `<table class="table-sync">
          <thead>
            <tr>
              <th>วันฝึก</th>
              <th>ท่าออกกำลังกาย</th>
              <th>น้ำหนักเดิมที่ระบบใช้</th>
              <th>น้ำหนักที่ระบบเสนอ</th>
              <th>เปลี่ยนแปลง</th>
              <th>ที่มาของตัวเลข</th>
              <th>ปรับมือ</th>
            </tr>
          </thead>
          <tbody>${rows.map(row => this.syncRowHtml(row)).join('')}</tbody>
        </table>`
      : '<p class="text-muted">แผนนี้ยังไม่มีท่าออกกำลังกายให้ปรับ</p>';

    this.bindOverrideControls();
  }

  bindOverrideControls() {
    const tableWrap = this.container.querySelector('#syncTableWrap');
    if (!tableWrap) return;

    const rows = this.lastSyncRows || [];

    tableWrap.querySelectorAll('.sync-row').forEach(tr => {
      const idx = Array.prototype.indexOf.call(tr.parentNode.children, tr);
      const row = rows[idx];
      if (!row) return;

      const startBtn = tr.querySelector('.override-btn');
      if (startBtn) {
        startBtn.addEventListener('click', () => {
          this.overrideEditorId = row.exerciseId;
          this.renderSyncPreview();
        });
      }

      const cancelBtn = tr.querySelector('.override-cancel-btn');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          this.overrideEditorId = null;
          this.renderSyncPreview();
        });
      }

      const saveBtn = tr.querySelector('.override-save-btn');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          const input = tr.querySelector('.override-input');
          const weight = parseFloat(input && input.value);
          if (!weight || weight <= 0) {
            alert('กรุณากรอกน้ำหนักที่ต้องการตั้งไว้');
            return;
          }
          if (row.lockedByUser) {
            // Unlock -> drop the manual entry and let the model take over again
            const baselines = storage.getExerciseBaselines();
            delete baselines[row.exerciseId];
            storage.saveExerciseBaselines(baselines);
          } else {
            storage.saveExerciseBaseline({
              exerciseId: row.exerciseId,
              weight,
              reps: null,
              est1RM: null,
              source: 'override',
              anchorId: null
            });
          }
          this.overrideEditorId = null;
          this.renderSyncPreview();
        });
      }
    });
  }

  updateCalcResults() {
    const profile = storage.getProfile();
    const currentGoalId = profile.selectedGoal || 'hypertrophy';
    const est1RM = estimate1RM(this.calcWeight, this.calcReps);
    const targetWeight = getWeightForGoal(est1RM, currentGoalId);

    const est1RMEl = this.container.querySelector('#res1RMVal');
    const targetEl = this.container.querySelector('#resTargetVal');

    if (est1RMEl) est1RMEl.textContent = `${est1RM} กก.`;
    if (targetEl) targetEl.textContent = `${targetWeight} กก.`;

    this.renderSyncPreview();
  }
}