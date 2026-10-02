/**
 * Fit App - Plans View & Workout Plan Designer
 * Select, customize, and launch Push Pull Legs (PPL) and other splits
 */

import { storage } from '../services/storage.js';
import { getExerciseById, EXERCISES } from '../data/exercises.js';
import { getProgressiveOverloadRecommendation } from '../engine/progression.js';

export class PlansView {
  constructor(containerId, onStartWorkout) {
    this.container = document.getElementById(containerId);
    this.onStartWorkout = onStartWorkout;
    this.selectedPlanId = null;
    this.editingDayId = null;
  }

  render() {
    const plans = storage.getPlans();
    const profile = storage.getProfile();
    const planGoalId = profile.selectedGoal || 'hypertrophy';
    this.selectedPlanId = this.selectedPlanId || profile.activePlanId || plans[0].id;
    const activePlan = plans.find(p => p.id === this.selectedPlanId) || plans[0];

    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title">🏋️ แผนการฝึกซ้อม (Workout Plans)</h2>
          <p class="view-subtitle">เลือกและออกแบบตารางฝึกยอดนิยม เช่น Push Pull Legs (PPL) เพื่อสร้างกล้ามเนื้อและพัฒนาความแข็งแกร่ง</p>
        </div>
        <div>
          <button class="btn btn-outline" id="createNewPlanBtn">
            ➕ ออกแบบแผนใหม่
          </button>
        </div>
      </div>

      <!-- Plan Selector Tabs -->
      <div class="plan-tabs-bar">
        ${plans.map(p => `
          <button class="plan-tab-item ${p.id === activePlan.id ? 'active' : ''}" data-plan-id="${p.id}">
            <span class="plan-tab-title">${p.name}</span>
            <span class="plan-tab-badge">${p.badge || 'ตารางฝึก'}</span>
          </button>
        `).join('')}
      </div>

      <!-- Active Plan Overview Banner -->
      <div class="plan-hero-banner">
        <div class="d-flex justify-between align-center flex-wrap gap-2">
          <div>
            <div class="d-flex align-center gap-2">
              <span class="badge-cat">แผนที่กำลังเปิดดู</span>
              ${profile.activePlanId === activePlan.id ? '<span class="badge-success">✓ เป็นแผนหลักปัจจุบัน</span>' : ''}
            </div>
            <h3 class="plan-hero-title">${activePlan.name}</h3>
            <p class="plan-hero-desc">${activePlan.description}</p>
            <p class="plan-frequency-text">📅 ความถี่ที่แนะนำ: <strong>${activePlan.frequency || '3-6 วัน/สัปดาห์'}</strong></p>
          </div>
          <div class="banner-actions">
            ${profile.activePlanId !== activePlan.id ? `
              <button class="btn btn-primary" id="setActivePlanBtn" data-plan-id="${activePlan.id}">
                ⭐ ตั้งเป็นแผนหลักของฉัน
              </button>
            ` : `
              <button class="btn btn-success" disabled>
                ✓ แผนหลักพร้อมใช้งาน
              </button>
            `}
          </div>
        </div>
      </div>

      <!-- Days Grid of this Plan -->
      <h3 class="section-title mt-4">ตารางการฝึกแต่ละวัน (${activePlan.days.length} วันฝึก):</h3>
      <div class="plan-days-grid">
        ${activePlan.days.map((day, dayIndex) => {
          return `
            <div class="plan-day-card" style="border-top: 4px solid ${day.color || '#3b82f6'};">
              <div class="day-card-header">
                <div>
                  <h4 class="day-title">${day.name}</h4>
                  <p class="day-desc">${day.description}</p>
                </div>
                <span class="day-num-badge">วันที ${dayIndex + 1}</span>
              </div>

              <!-- Exercise List Preview — clickable rows with real exercise photos -->
              <div class="day-exercises-list">
                ${day.exercises.map((item, idx) => {
                  const ex = getExerciseById(item.exerciseId);
                  const thumb = ex && ex.images ? ex.images[0] : '';
                  const reco = getProgressiveOverloadRecommendation(
                    item.exerciseId,
                    storage.getExerciseHistory(item.exerciseId),
                    planGoalId,
                    storage.getExerciseBaseline(item.exerciseId)
                  );
                  return `
                    <div class="day-ex-row" data-exercise-id="${item.exerciseId}" title="คลิกเพื่อดูท่าฝึกและเทคนิค">
                      <div class="day-ex-main">
                        <span class="ex-idx">${idx + 1}.</span>
                        ${thumb ? `<img class="day-ex-thumb" src="${thumb}" alt="${ex ? ex.nameEn : ''}" loading="lazy" />` : ''}
                        <div class="ex-info">
                          <strong class="ex-name">${ex ? ex.nameTh : item.exerciseId}</strong>
                          <span class="ex-specs">${item.sets} เซ็ต × ${item.targetReps} ครั้ง • พัก ${item.restSec}วิ</span>
                          <span class="ex-weight-chip" title="${reco.badge}">
                            ⚖️ ${reco.suggestedWeight} กก. × ${reco.targetReps}
                            <em class="ex-weight-source">${reco.status === 'override' ? 'ตั้งค่าเอง' : reco.status === 'baseline' ? 'อ้างอิงเกณฑ์' : reco.status === 'new' ? 'ยังไม่มีข้อมูล' : 'จากการบันทึกจริง'}</em>
                          </span>
                        </div>
                      </div>
                      <span class="ex-action-hint">👁️ ดูท่า & เทคนิค</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <div class="day-card-footer">
                <button class="btn btn-primary btn-block start-day-btn" data-plan-id="${activePlan.id}" data-day-id="${day.id}">
                  ▶ เริ่มออกกำลังกายวันนี้
                </button>
                <button class="btn btn-secondary btn-block edit-day-btn mt-2" data-plan-id="${activePlan.id}" data-day-id="${day.id}">
                  ✏️ ปรับแต่งท่าฝึกในวันนี้
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Edit Day Modal -->
      <div id="editDayModal" class="modal-backdrop hidden">
        <div class="modal-content modal-lg" id="editDayModalBody"></div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Switch plan tabs
    const planTabs = this.container.querySelectorAll('.plan-tab-item');
    planTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.selectedPlanId = tab.dataset.planId;
        this.render();
      });
    });

    // Set Active Plan button
    const setBtn = this.container.querySelector('#setActivePlanBtn');
    if (setBtn) {
      setBtn.addEventListener('click', () => {
        const id = setBtn.dataset.planId;
        storage.updateProfile({ activePlanId: id });
        this.render();
      });
    }

    // Start Day Workout
    const startBtns = this.container.querySelectorAll('.start-day-btn');
    startBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const planId = btn.dataset.planId;
        const dayId = btn.dataset.dayId;
        const plan = storage.getPlanById(planId);
        const day = plan.days.find(d => d.id === dayId);
        if (day && this.onStartWorkout) {
          this.onStartWorkout(plan, day);
        }
      });
    });

    // Edit Day exercises
    const editBtns = this.container.querySelectorAll('.edit-day-btn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const planId = btn.dataset.planId;
        const dayId = btn.dataset.dayId;
        this.openEditDayModal(planId, dayId);
      });
    });

    // Create New Plan
    const newPlanBtn = this.container.querySelector('#createNewPlanBtn');
    if (newPlanBtn) {
      newPlanBtn.addEventListener('click', () => {
        this.createNewCustomPlan();
      });
    }

    // CRITICAL: Bind click on ALL exercise rows to open global exercise modal
    this.container.querySelectorAll('.day-ex-row').forEach(row => {
      row.addEventListener('click', () => {
        const exId = row.dataset.exerciseId;
        if (!exId) return;
        // Use global modal function exposed by bundle.js, or fallback to modular modal
        if (typeof window.openGlobalExerciseModal === 'function') {
          window.openGlobalExerciseModal(exId);
        } else {
          this._openFallbackModal(exId);
        }
      });
    });
  }

  openEditDayModal(planId, dayId) {
    const plan = storage.getPlanById(planId);
    const day = plan.days.find(d => d.id === dayId);
    if (!day) return;

    const modal = document.getElementById('editDayModal');
    const modalBody = document.getElementById('editDayModalBody');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-header">
        <div>
          <h2 class="modal-title">✏️ ปรับแต่งท่าฝึก: ${day.name}</h2>
          <p class="modal-subtitle">เพิ่ม/ลดท่าฝึก ปรับจำนวนเซ็ตและจำนวนครั้งตามต้องการ</p>
        </div>
        <button class="modal-close-btn" id="closeEditModalBtn">✕</button>
      </div>

      <div class="edit-day-content">
        <div class="exercise-editor-list" id="editorExList">
          ${day.exercises.map((item, idx) => {
            const ex = getExerciseById(item.exerciseId);
            return `
              <div class="editor-row" data-index="${idx}">
                <div class="editor-ex-main">
                  <span class="ex-idx">${idx + 1}.</span>
                  <strong>${ex ? ex.nameTh : item.exerciseId}</strong>
                </div>
                <div class="editor-controls">
                  <div class="input-inline">
                    <label>เซ็ต:</label>
                    <input type="number" class="edit-sets form-control form-control-sm" value="${item.sets}" min="1" max="10" />
                  </div>
                  <div class="input-inline">
                    <label>ครั้ง:</label>
                    <input type="text" class="edit-reps form-control form-control-sm" value="${item.targetReps}" />
                  </div>
                  <div class="input-inline">
                    <label>พัก (วิ):</label>
                    <input type="number" class="edit-rest form-control form-control-sm" value="${item.restSec}" min="15" max="300" step="15" />
                  </div>
                  <button class="btn btn-danger btn-sm remove-ex-btn" title="ลบท่านี้">🗑️</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="add-exercise-section mt-3">
          <h4>➕ เพิ่มท่าออกกำลังกายใหม่เข้าในวันนี้:</h4>
          <div class="d-flex gap-2 mt-2">
            <select id="newExSelect" class="form-control">
              ${EXERCISES.map(e => `
                <option value="${e.id}">${e.nameTh} (${e.category.toUpperCase()})</option>
              `).join('')}
            </select>
            <button class="btn btn-outline" id="addNewExBtn">เพิ่มเข้าตาราง</button>
          </div>
        </div>

        <div class="modal-footer mt-4 d-flex justify-between">
          <button class="btn btn-secondary" id="cancelEditModalBtn">ยกเลิก</button>
          <button class="btn btn-success" id="saveDayChangesBtn">💾 บันทึกการเปลี่ยนแปลง</button>
        </div>
      </div>
    `;

    // Bind edit modal buttons
    const closeBtn = modalBody.querySelector('#closeEditModalBtn');
    const cancelBtn = modalBody.querySelector('#cancelEditModalBtn');
    const closeHandler = () => modal.classList.add('hidden');
    if (closeBtn) closeBtn.addEventListener('click', closeHandler);
    if (cancelBtn) cancelBtn.addEventListener('click', closeHandler);

    // Remove buttons
    const removeBtns = modalBody.querySelectorAll('.remove-ex-btn');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const row = btn.closest('.editor-row');
        if (row) row.remove();
      });
    });

    // Add new exercise
    const addBtn = modalBody.querySelector('#addNewExBtn');
    const select = modalBody.querySelector('#newExSelect');
    if (addBtn && select) {
      addBtn.addEventListener('click', () => {
        const selectedId = select.value;
        const ex = getExerciseById(selectedId);
        const list = modalBody.querySelector('#editorExList');
        const count = list.children.length;

        const newRow = document.createElement('div');
        newRow.className = 'editor-row';
        newRow.dataset.index = count;
        newRow.dataset.newId = selectedId;
        newRow.innerHTML = `
          <div class="editor-ex-main">
            <span class="ex-idx">${count + 1}.</span>
            <strong>${ex ? ex.nameTh : selectedId}</strong>
          </div>
          <div class="editor-controls">
            <div class="input-inline">
              <label>เซ็ต:</label>
              <input type="number" class="edit-sets form-control form-control-sm" value="3" min="1" max="10" />
            </div>
            <div class="input-inline">
              <label>ครั้ง:</label>
              <input type="text" class="edit-reps form-control form-control-sm" value="8-12" />
            </div>
            <div class="input-inline">
              <label>พัก (วิ):</label>
              <input type="number" class="edit-rest form-control form-control-sm" value="90" min="15" max="300" step="15" />
            </div>
            <button class="btn btn-danger btn-sm remove-ex-btn" title="ลบท่านี้">🗑️</button>
          </div>
        `;
        newRow.querySelector('.remove-ex-btn').addEventListener('click', () => newRow.remove());
        list.appendChild(newRow);
      });
    }

    // Save changes
    const saveBtn = modalBody.querySelector('#saveDayChangesBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const rows = modalBody.querySelectorAll('.editor-row');
        const newExercises = [];

        rows.forEach(row => {
          const idx = parseInt(row.dataset.index, 10);
          const origItem = day.exercises[idx];
          const exId = row.dataset.newId || (origItem ? origItem.exerciseId : null);
          const sets = parseInt(row.querySelector('.edit-sets').value, 10) || 3;
          const targetReps = row.querySelector('.edit-reps').value.trim() || '8-12';
          const restSec = parseInt(row.querySelector('.edit-rest').value, 10) || 90;

          if (exId) {
            newExercises.push({
              exerciseId: exId,
              sets,
              targetReps,
              rpe: 8,
              restSec
            });
          }
        });

        day.exercises = newExercises;
        storage.savePlan(plan);
        modal.classList.add('hidden');
        this.render();
      });
    }

    modal.classList.remove('hidden');
  }

  createNewCustomPlan() {
    const plans = storage.getPlans();
    const newId = 'custom-plan-' + Date.now();
    const newPlan = {
      id: newId,
      name: 'ตารางฝึกที่กำหนดเอง (My Custom Split)',
      badge: 'กำหนดเอง',
      description: 'ตารางฝึกที่คุณสามารถออกแบบท่า เซ็ต และจำนวนครั้งได้ตามใจชอบ',
      frequency: '3 วันต่อสัปดาห์',
      days: [
        {
          id: newId + '-day1',
          name: 'Day 1: อก & หลังแขน (Push)',
          description: 'เน้นอกและหลังแขน',
          color: '#3b82f6',
          exercises: [
            { exerciseId: 'barbell-bench-press', sets: 4, targetReps: '8-10', rpe: 8, restSec: 90 },
            { exerciseId: 'incline-dumbbell-press', sets: 3, targetReps: '10-12', rpe: 8, restSec: 75 },
            { exerciseId: 'tricep-rope-pushdown', sets: 3, targetReps: '10-12', rpe: 8.5, restSec: 60 }
          ]
        },
        {
          id: newId + '-day2',
          name: 'Day 2: หลัง & หน้าแขน (Pull)',
          description: 'เน้นแผ่นหลังและไบเซป',
          color: '#8b5cf6',
          exercises: [
            { exerciseId: 'barbell-bent-over-row', sets: 4, targetReps: '8-10', rpe: 8, restSec: 90 },
            { exerciseId: 'lat-pulldown', sets: 3, targetReps: '10-12', rpe: 8, restSec: 75 },
            { exerciseId: 'barbell-bicep-curl', sets: 3, targetReps: '10-12', rpe: 8.5, restSec: 60 }
          ]
        },
        {
          id: newId + '-day3',
          name: 'Day 3: ขา & แกนกลาง (Legs)',
          description: 'เน้นขาและหน้าท้อง',
          color: '#10b981',
          exercises: [
            { exerciseId: 'barbell-back-squat', sets: 4, targetReps: '6-8', rpe: 8, restSec: 120 },
            { exerciseId: 'leg-press', sets: 3, targetReps: '10-12', rpe: 8.5, restSec: 90 },
            { exerciseId: 'hanging-leg-raise', sets: 3, targetReps: '12-15', rpe: 8.5, restSec: 60 }
          ]
        }
      ]
    };

    plans.push(newPlan);
    storage.savePlans(plans);
    this.selectedPlanId = newId;
    this.render();
  }
}
