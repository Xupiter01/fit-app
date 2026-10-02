/**
 * Fit App - Exercise Library View & Detail Modal
 * Displays searchable exercise cards, category tabs, anatomical maps, and detailed technique modals
 */

import { EXERCISES, getExerciseById, getExercisesByCategory } from '../data/exercises.js';
import { renderMuscleAnatomyMap, renderExerciseIllustration } from './visuals.js';
import { generateWarmUpSets, calculateBarbellPlates } from '../engine/progression.js';

export class ExercisesView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentCategory = 'all';
    this.searchQuery = '';
  }

  render() {
    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title">คลังท่าออกกำลังกาย (Exercise Library)</h2>
          <p class="view-subtitle">รวบรวมท่าฝึกระดับสากล พร้อมภาพประกอบ กายวิภาคกล้ามเนื้อ และเทคนิคแบบละเอียด</p>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="filter-bar">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input type="text" id="exerciseSearchInput" class="search-input" placeholder="ค้นหาชื่อท่า, กลุ่มกล้ามเนื้อ, หรืออุปกรณ์..." value="${this.searchQuery}" />
          ${this.searchQuery ? `<button id="clearSearchBtn" class="clear-btn">✕</button>` : ''}
        </div>
        <div class="category-tabs">
          <button class="cat-pill ${this.currentCategory === 'all' ? 'active' : ''}" data-cat="all">ทั้งหมด (${EXERCISES.length})</button>
          <button class="cat-pill ${this.currentCategory === 'push' ? 'active' : ''}" data-cat="push">Push (อก/ไหล่/หลังแขน)</button>
          <button class="cat-pill ${this.currentCategory === 'pull' ? 'active' : ''}" data-cat="pull">Pull (หลัง/ปีก/หน้าแขน)</button>
          <button class="cat-pill ${this.currentCategory === 'legs' ? 'active' : ''}" data-cat="legs">Legs (ขา/ก้น/น่อง)</button>
          <button class="cat-pill ${this.currentCategory === 'core' ? 'active' : ''}" data-cat="core">Core (หน้าท้อง)</button>
        </div>
      </div>

      <!-- Exercise Cards Grid -->
      <div class="exercise-grid" id="exerciseCardsGrid">
        ${this.renderExerciseCards()}
      </div>

      <!-- Modal Container -->
      <div id="exerciseModal" class="modal-backdrop hidden">
        <div class="modal-content modal-lg" id="exerciseModalBody"></div>
      </div>
    `;

    this.bindEvents();
  }

  renderExerciseCards() {
    let filtered = getExercisesByCategory(this.currentCategory);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(e => 
        e.nameTh.toLowerCase().includes(q) ||
        e.nameEn.toLowerCase().includes(q) ||
        e.equipment.toLowerCase().includes(q) ||
        e.primaryMuscles.some(m => m.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>ไม่พบท่าออกกำลังกายที่ค้นหา</h3>
          <p>ลองค้นหาด้วยคำอื่น หรือกดดูทุกหมวดหมู่</p>
        </div>
      `;
    }

    return filtered.map(exercise => {
      const categoryColor = exercise.category === 'push' ? '#3b82f6' : exercise.category === 'pull' ? '#8b5cf6' : '#10b981';
      const thumb = exercise.images && exercise.images.length > 0 ? exercise.images[0] : '';
      return `
        <div class="exercise-card" data-exercise-id="${exercise.id}">
          <div class="exercise-card-header">
            <span class="badge-cat" style="background: ${categoryColor}22; color: ${categoryColor}; border: 1px solid ${categoryColor}44">
              ${exercise.category.toUpperCase()}
            </span>
            <span class="badge-diff">${exercise.difficulty}</span>
          </div>
          
          ${thumb ? `<div class="exercise-card-thumb-wrapper"><img src="${thumb}" alt="${exercise.nameEn}" class="exercise-card-thumb" loading="lazy" /></div>` : ''}

          <h3 class="exercise-name-th">${exercise.nameTh}</h3>
          <p class="exercise-name-en">${exercise.nameEn}</p>

          <div class="exercise-tags">
            ${exercise.primaryMuscles.map(m => `<span class="tag-muscle">🎯 ${m}</span>`).join('')}
          </div>

          <div class="exercise-meta">
            <span class="meta-item">🛠️ ${exercise.equipment}</span>
          </div>

          <button class="btn btn-secondary btn-block view-tech-btn" data-exercise-id="${exercise.id}">
            📷 ดูภาพถ่าย & เทคนิคอย่างละเอียด
          </button>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    const searchInput = document.getElementById('exerciseSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const grid = document.getElementById('exerciseCardsGrid');
        if (grid) grid.innerHTML = this.renderExerciseCards();
        this.bindCardClicks();
      });
    }

    const clearSearch = document.getElementById('clearSearchBtn');
    if (clearSearch) {
      clearSearch.addEventListener('click', () => {
        this.searchQuery = '';
        this.render();
      });
    }

    const catPills = this.container.querySelectorAll('.cat-pill');
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.currentCategory = pill.dataset.cat;
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const grid = document.getElementById('exerciseCardsGrid');
        if (grid) grid.innerHTML = this.renderExerciseCards();
        this.bindCardClicks();
      });
    });

    this.bindCardClicks();

    // Close modal on backdrop click
    const modalBackdrop = document.getElementById('exerciseModal');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          this.closeModal();
        }
      });
    }
  }

  bindCardClicks() {
    const btns = this.container.querySelectorAll('.view-tech-btn, .exercise-card');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Prevent double triggers
        const card = btn.closest('.exercise-card');
        if (card) {
          const id = card.dataset.exerciseId;
          this.openExerciseModal(id);
        }
      });
    });
  }

  openExerciseModal(exerciseId) {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return;

    // Use the root-level global modal so it works from ANY tab (fixes hidden-container bug)
    const modal = document.getElementById('globalExerciseModal');
    const modalBody = document.getElementById('globalExerciseModalBody');
    if (!modal || !modalBody) {
      // Fallback: try the in-view modal if global doesn't exist
      const localModal = document.getElementById('exerciseModal');
      const localBody = document.getElementById('exerciseModalBody');
      if (localModal && localBody) {
        localModal.classList.remove('hidden');
      }
      return;
    }

    const warmupSets = generateWarmUpSets(60);
    const plates = calculateBarbellPlates(60);

    const images = exercise.images && exercise.images.length > 0 ? exercise.images : [];
    const hasImages = images.length > 0;
    const img0 = hasImages ? images[0] : '';
    const img1 = hasImages && images.length > 1 ? images[1] : img0;

    modalBody.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="badge-cat mb-1">${exercise.category.toUpperCase()} • ${exercise.equipment}</span>
          <h2 class="modal-title">${exercise.nameTh}</h2>
          <p class="modal-subtitle">${exercise.nameEn}</p>
        </div>
        <button class="modal-close-btn" id="closeGlobalModalBtn" title="ปิดหน้าต่าง">✕</button>
      </div>

      <div class="modal-tabs">
        <button class="modal-tab-btn active" data-tab="technique">📷 ภาพการเคลื่อนไหว & เทคนิค</button>
        <button class="modal-tab-btn" data-tab="anatomy">🧬 กายวิภาคกล้ามเนื้อ</button>
        <button class="modal-tab-btn" data-tab="warmup">🔥 เซ็ตวอร์มอัพ & แผ่นน้ำหนัก</button>
      </div>

      <div class="modal-tab-content active" id="tab-technique">
        <!-- Real Exercise Motion Showcase Player from Open Exercise API -->
        ${hasImages ? `
          <div class="motion-showcase-card">
            <div class="motion-showcase-header">
              <div class="d-flex align-center gap-2">
                <span class="badge-source">📷 ภาพถ่ายจริงจาก Open Exercise API</span>
                <span class="motion-state-badge" id="motionStepLabel">จังหวะที่ 1: ท่าเริ่มต้น (Starting Position)</span>
              </div>
              <div class="motion-controls">
                <button class="btn btn-xs btn-primary" id="motionPlayToggleBtn">▶️ เล่นแอนิเมชัน</button>
                <div class="btn-group-xs">
                  <button class="btn btn-xs btn-outline active-step" id="motionPick0Btn">จังหวะ 1</button>
                  <button class="btn btn-xs btn-outline" id="motionPick1Btn">จังหวะ 2</button>
                </div>
              </div>
            </div>
            <div class="motion-stage-display">
              <div class="motion-img-container">
                <img id="motionHeroImg" src="${img0}" alt="${exercise.nameEn}" class="motion-main-img" />
                <div class="motion-overlay-step" id="motionOverlayBadge">
                  <span>จังหวะที่ 1: ท่าเริ่มต้นและการจัดระเบียบร่างกาย</span>
                  <span class="text-accent text-sm">คลิก "เล่นแอนิเมชัน" เพื่อดูท่าเคลื่อนไหว</span>
                </div>
              </div>
              <div class="motion-thumbs-row">
                <div class="motion-thumb-item active" id="thumbCard0">
                  <img src="${img0}" alt="Stage 1" />
                  <div>
                    <span>1. ท่าเริ่มต้น (Setup)</span>
                    <p class="text-muted text-xs">ยืดกล้ามเนื้อและเตรียมออกแรง</p>
                  </div>
                </div>
                <div class="motion-thumb-item" id="thumbCard1">
                  <img src="${img1}" alt="Stage 2" />
                  <div>
                    <span>2. จุดสิ้นสุด (Peak)</span>
                    <p class="text-muted text-xs">หดเกร็งกล้ามเนื้อสูงสุด</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : `
          <div class="illustration-wrapper">
            ${renderExerciseIllustration(exercise.svgType)}
          </div>
        `}

        <div class="tech-section"><h4 class="section-title">📝 คำอธิบายภาพรวม</h4><p class="section-text">${exercise.description}</p></div>
        <div class="tech-section"><h4 class="section-title">1️⃣ ท่าเตรียม & จุดเริ่มต้น (Setup)</h4><ul class="step-list">${exercise.technique.setup.map(s => `<li><span class="step-bullet">✓</span> ${s}</li>`).join('')}</ul></div>
        <div class="tech-section"><h4 class="section-title">2️⃣ ขั้นตอนการออกแรง (Execution)</h4><ul class="step-list">${exercise.technique.execution.map(s => `<li><span class="step-bullet">✓</span> ${s}</li>`).join('')}</ul></div>
        <div class="tech-section"><h4 class="section-title">🫁 จังหวะการหายใจที่ถูกต้อง (Breathing)</h4><div class="callout callout-info">${exercise.technique.breathing}</div></div>
        <div class="tech-section"><h4 class="section-title error-text">⚠️ ข้อผิดพลาดที่พบบ่อย (Common Mistakes)</h4><ul class="mistake-list">${exercise.commonMistakes.map(m => `<li><span class="cross-bullet">✕</span> ${m}</li>`).join('')}</ul></div>
        <div class="tech-section"><h4 class="section-title highlight-text">💡 คำแนะนำระดับโปร (Pro Tips)</h4><div class="pro-tips-card">${exercise.proTips.map(t => `<p>✨ ${t}</p>`).join('')}</div></div>
      </div>

      <div class="modal-tab-content hidden" id="tab-anatomy">
        <p class="tab-note">กล้ามเนื้อที่ถูกกระตุ้นระหว่างทำท่านี้ (สีเขียว = กล้ามเนื้อมัดหลัก, สีม่วง = กล้ามเนื้อช่วยเสริม):</p>
        ${renderMuscleAnatomyMap(exercise.primaryMuscles, exercise.secondaryMuscles, exercise.category)}
        <div class="anatomy-breakdown">
          <div class="breakdown-card"><h4>🎯 กล้ามเนื้อมัดหลัก (Primary Targets)</h4><ul>${exercise.primaryMuscles.map(m => `<li><strong>${m}</strong></li>`).join('')}</ul></div>
          <div class="breakdown-card"><h4>🤝 กล้ามเนื้อช่วยเสริม (Secondary Targets)</h4><ul>${exercise.secondaryMuscles.length > 0 ? exercise.secondaryMuscles.map(m => `<li>${m}</li>`).join('') : '<li>ไม่มี (ท่าแยกกล้ามเนื้อมัดเดียว)</li>'}</ul></div>
        </div>
      </div>

      <div class="modal-tab-content hidden" id="tab-warmup">
        <div class="warmup-calculator">
          <h4 class="section-title">เครื่องคำนวณเซ็ตวอร์มอัพ (Warm-Up Sets Calculator)</h4>
          <p class="tab-note">การวอร์มอัพข้อต่อและระบบประสาทช่วยป้องกันการบาดเจ็บและทำให้ยก Working Weight ได้หนักขึ้น</p>
          <div class="form-group inline-group mt-3">
            <label for="warmupTargetWeightInput">น้ำหนัก Working Weight เป้าหมาย (กก.):</label>
            <input type="number" id="warmupTargetWeightInput" class="form-control form-control-sm" value="60" min="20" max="300" step="2.5" />
          </div>
          <div id="warmupResultsContainer" class="mt-3">
            ${this.renderWarmupTable(warmupSets, plates, 60)}
          </div>
        </div>
      </div>
    `;

    // Modal tab switching
    const modalTabs = modalBody.querySelectorAll('.modal-tab-btn');
    modalTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        modalTabs.forEach(b => b.classList.remove('active'));
        modalBody.querySelectorAll('.modal-tab-content').forEach(c => c.classList.add('hidden'));
        btn.classList.add('active');
        const targetTab = modalBody.querySelector(`#tab-${btn.dataset.tab}`);
        if (targetTab) targetTab.classList.remove('hidden');
      });
    });

    // Close button
    const closeBtn = modalBody.querySelector('#closeGlobalModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

    // Motion player controls (only when images exist)
    if (hasImages) {
      const heroImg = modalBody.querySelector('#motionHeroImg');
      const overlayBadge = modalBody.querySelector('#motionOverlayBadge');
      const stepLabel = modalBody.querySelector('#motionStepLabel');
      const playBtn = modalBody.querySelector('#motionPlayToggleBtn');
      const pick0 = modalBody.querySelector('#motionPick0Btn');
      const pick1 = modalBody.querySelector('#motionPick1Btn');
      const thumb0 = modalBody.querySelector('#thumbCard0');
      const thumb1 = modalBody.querySelector('#thumbCard1');

      const imgs = [img0, img1];
      const stepLabels = [
        'จังหวะที่ 1: ท่าเริ่มต้น (Starting Position)',
        'จังหวะที่ 2: จุดสูงสุด (Peak Contraction)'
      ];
      const overlayTexts = [
        'จังหวะที่ 1: ท่าเริ่มต้นและการจัดระเบียบร่างกาย',
        'จังหวะที่ 2: หดเกร็งกล้ามเนื้อสูงสุด (Peak)'
      ];

      let activeIdx = 0;
      let motionTimer = null;

      const showFrame = (idx) => {
        activeIdx = idx;
        if (heroImg) heroImg.src = imgs[idx];
        if (stepLabel) stepLabel.textContent = stepLabels[idx];
        if (overlayBadge) overlayBadge.querySelector('span').textContent = overlayTexts[idx];
        [pick0, pick1].forEach((b, i) => b && b.classList.toggle('active-step', i === idx));
        [thumb0, thumb1].forEach((c, i) => c && c.classList.toggle('active', i === idx));
      };

      if (pick0) pick0.addEventListener('click', () => { showFrame(0); stopMotion(); });
      if (pick1) pick1.addEventListener('click', () => { showFrame(1); stopMotion(); });

      const stopMotion = () => {
        if (motionTimer) { clearInterval(motionTimer); motionTimer = null; }
        if (playBtn) playBtn.textContent = '▶️ เล่นแอนิเมชัน';
      };

      if (playBtn) {
        playBtn.addEventListener('click', () => {
          if (motionTimer) {
            stopMotion();
          } else {
            playBtn.textContent = '⏸ หยุดชั่วคราว';
            motionTimer = setInterval(() => showFrame(activeIdx === 0 ? 1 : 0), 1200);
          }
        });
      }
    }

    // Dynamic warmup calculator
    const warmupInput = modalBody.querySelector('#warmupTargetWeightInput');
    if (warmupInput) {
      warmupInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) || 20;
        const newWarmupSets = generateWarmUpSets(val);
        const newPlates = calculateBarbellPlates(val);
        const results = modalBody.querySelector('#warmupResultsContainer');
        if (results) results.innerHTML = this.renderWarmupTable(newWarmupSets, newPlates, val);
      });
    }

    modal.classList.remove('hidden');

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal();
    }, { once: true });

  renderWarmupTable(sets, plates, targetWeight) {
    return `
      <div class="table-responsive">
        <table class="table-warmup">
          <thead>
            <tr>
              <th>เซ็ต</th>
              <th>ความเข้มข้น</th>
              <th>น้ำหนัก (กก.)</th>
              <th>จำนวนครั้ง</th>
              <th>เวลาพัก</th>
              <th>จุดประสงค์</th>
            </tr>
          </thead>
          <tbody>
            ${sets.map(s => `
              <tr>
                <td><strong>เซ็ตที่ ${s.step}</strong></td>
                <td><span class="badge-sub">${s.pct}</span></td>
                <td><strong class="highlight-text">${s.weight} กก.</strong></td>
                <td>${s.reps} ครั้ง</td>
                <td>${s.restSec ? s.restSec + ' วิ' : '30 วิ'}</td>
                <td class="text-muted">${s.note}</td>
              </tr>
            `).join('')}
            <tr class="table-highlight-row">
              <td><strong>🔥 Working Set</strong></td>
              <td>100%</td>
              <td><strong class="text-success">${targetWeight} กก.</strong></td>
              <td>ตามเป้าหมาย</td>
              <td>2 - 3 นาที</td>
              <td>เซ็ตจริงบันทึกผล</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="plate-breakdown-card mt-3">
        <h4>🏋️ การใส่แผ่นน้ำหนักสำหรับบาร์เบลโอลิมปิก (บาร์ 20 กก.):</h4>
        ${plates.plates.length > 0 ? `
          <p>ต้องใส่น้ำหนักข้างละ <strong>${plates.perSideWeight} กก.</strong>:</p>
          <div class="plate-tags">
            ${plates.plates.map(p => `
              <span class="plate-tag">แผ่น ${p.plate} กก. x ${p.count} แผ่น</span>
            `).join('')}
          </div>
        ` : `
          <p class="text-muted">ใช้บาร์เปล่า 20 กก. โดยไม่ต้องใส่แผ่นน้ำหนัก</p>
        `}
      </div>
    `;
  }

  closeModal() {
    // Close the root-level global modal
    const globalModal = document.getElementById('globalExerciseModal');
    if (globalModal) globalModal.classList.add('hidden');
    // Also close local modal if it exists (fallback)
    const localModal = document.getElementById('exerciseModal');
    if (localModal) localModal.classList.add('hidden');
  }
}
