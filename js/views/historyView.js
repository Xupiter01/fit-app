/**
 * Fit App - Workout History, Analytics & PRs View
 * Detailed logs, volume progression charts, personal record tracking, and JSON export/import
 */

import { storage } from '../services/storage.js';
import { getExerciseById } from '../data/exercises.js';

export class HistoryView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    const history = storage.getHistory();
    const prs = storage.getPRs();

    // Calculate aggregated metrics
    const totalWorkouts = history.length;
    const totalVolumeLifetime = history.reduce((acc, w) => acc + (w.totalVolumeKg || 0), 0);
    const totalMinutesLifetime = history.reduce((acc, w) => acc + (w.durationMinutes || 0), 0);

    this.container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title">📊 ประวัติและสถิติ (History & Analytics)</h2>
          <p class="view-subtitle">ติดตามพัฒนาการ บันทึกการฝึกซ้อม และสถิติส่วนบุคคล (Personal Records)</p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline" id="exportDataBtn">📥 ส่งออก JSON</button>
          <label class="btn btn-outline" style="cursor: pointer;">
            📤 นำเข้า JSON
            <input type="file" id="importDataInput" accept=".json" style="display: none;" />
          </label>
        </div>
      </div>

      <!-- Lifetime Stats Cards -->
      <div class="stats-overview-grid">
        <div class="metric-card">
          <div class="metric-icon">🏋️</div>
          <div>
            <span class="metric-title">จำนวนเซสชันที่ฝึก</span>
            <h3 class="metric-number">${totalWorkouts} ครั้ง</h3>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">⚖️</div>
          <div>
            <span class="metric-title">ปริมาณยกสะสมทั้งหมด</span>
            <h3 class="metric-number text-success">${totalVolumeLifetime.toLocaleString()} กก.</h3>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">⏳</div>
          <div>
            <span class="metric-title">เวลาที่อยู่ในยิมรวม</span>
            <h3 class="metric-number text-accent">${Math.round(totalMinutesLifetime / 60 * 10) / 10} ชม.</h3>
          </div>
        </div>
      </div>

      <!-- Volume Progression Chart (SVG) -->
      <div class="card card-elevated mt-4">
        <div class="card-header">
          <h3 class="card-title">📈 กราฟแนวโน้มปริมาณการยก (Workout Volume Over Time)</h3>
          <p class="card-subtitle">แสดงความก้าวหน้าของ Total Volume (กก.) ในแต่ละเซสชันเพื่อการสร้างกล้ามเนื้อ</p>
        </div>
        <div class="chart-container">
          ${this.renderVolumeChart(history)}
        </div>
      </div>

      <!-- Personal Records (PRs) Section -->
      <div class="card card-elevated mt-4">
        <div class="card-header">
          <h3 class="card-title">🏆 สถิติสูงสุดส่วนตัว (Personal Records - PRs)</h3>
          <p class="card-subtitle">สถิติน้ำหนักสูงสุดและประมาณการ 1RM ที่คุณเคยทำได้</p>
        </div>
        <div class="prs-table-wrapper">
          ${this.renderPRsTable(prs)}
        </div>
      </div>

      <!-- Workout History Timeline -->
      <h3 class="section-title mt-4">📅 บันทึกการฝึกซ้อมที่ผ่านมา (${history.length} รายการ):</h3>
      <div class="history-list">
        ${history.length === 0 ? `
          <div class="empty-state">
            <div class="empty-icon">📝</div>
            <h3>ยังไม่มีประวัติการฝึกซ้อม</h3>
            <p>เมื่อคุณออกกำลังกายและกด "สรุปและบันทึก" ข้อมูลทั้งหมดจะปรากฏที่นี่</p>
          </div>
        ` : history.map(w => this.renderHistoryItem(w)).join('')}
      </div>
    `;

    this.bindEvents();
  }

  renderVolumeChart(history) {
    if (!history || history.length === 0) {
      return `<p class="text-muted text-center py-4">ยังไม่มีข้อมูลเพียงพอสำหรับสร้างกราฟ</p>`;
    }

    // Take last 7 workouts in chronological order
    const dataPoints = [...history].reverse().slice(-7);
    const maxVol = Math.max(...dataPoints.map(d => d.totalVolumeKg || 0), 1000);
    const chartHeight = 160;
    const chartWidth = 560;
    const padding = 40;

    const points = dataPoints.map((d, idx) => {
      const x = padding + (idx * ((chartWidth - padding * 2) / Math.max(dataPoints.length - 1, 1)));
      const vol = d.totalVolumeKg || 0;
      const y = chartHeight - padding - ((vol / maxVol) * (chartHeight - padding * 1.5));
      return { x, y, vol, date: new Date(d.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) };
    });

    const pathD = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
    const fillArea = points.length > 1 
      ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z` 
      : '';

    return `
      <svg viewBox="0 0 ${chartWidth} ${chartHeight}" class="volume-chart-svg">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
          </linearGradient>
        </defs>

        <!-- Grid Lines -->
        <line x1="${padding}" y1="${chartHeight - padding}" x2="${chartWidth - padding}" y2="${chartHeight - padding}" stroke="#334155" stroke-width="1" />
        <line x1="${padding}" y1="${chartHeight - padding - (chartHeight - padding * 1.5) / 2}" x2="${chartWidth - padding}" y2="${chartHeight - padding - (chartHeight - padding * 1.5) / 2}" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="${padding}" y1="${padding * 0.5}" x2="${chartWidth - padding}" y2="${padding * 0.5}" stroke="#1e293b" stroke-width="1" stroke-dasharray="3,3" />

        ${fillArea ? `<path d="${fillArea}" fill="url(#chartGrad)" />` : ''}
        ${pathD ? `<path d="${pathD}" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />` : ''}

        <!-- Data circles and labels -->
        ${points.map(p => `
          <circle cx="${p.x}" cy="${p.y}" r="5" fill="#0f172a" stroke="#10b981" stroke-width="2.5" />
          <text x="${p.x}" y="${p.y - 10}" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">${p.vol.toLocaleString()} กก.</text>
          <text x="${p.x}" y="${chartHeight - 15}" fill="#94a3b8" font-size="10" text-anchor="middle">${p.date}</text>
        `).join('')}
      </svg>
    `;
  }

  renderPRsTable(prs) {
    const keys = Object.keys(prs);
    if (keys.length === 0) {
      return `<p class="text-muted text-center py-3">ยังไม่มีสถิติ PRs เมื่อออกกำลังกายครบเซ็ต ระบบจะบันทึกให้อัตโนมัติ</p>`;
    }

    return `
      <div class="table-responsive">
        <table class="table-prs">
          <thead>
            <tr>
              <th>ท่าออกกำลังกาย</th>
              <th>น้ำหนักสูงสุด (Weight)</th>
              <th>จำนวนครั้งที่ทำได้</th>
              <th>ประมาณการ 1RM</th>
              <th>วันที่ทำได้</th>
            </tr>
          </thead>
          <tbody>
            ${keys.map(id => {
              const ex = getExerciseById(id);
              const pr = prs[id];
              const dateStr = pr.date ? new Date(pr.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }) : '-';
              return `
                <tr>
                  <td><strong>${ex ? ex.nameTh : id}</strong></td>
                  <td><span class="pr-weight-badge">${pr.maxWeight} กก.</span></td>
                  <td>${pr.maxRepsAtWeight || '-'} ครั้ง</td>
                  <td><strong class="text-accent">${pr.estimated1RM} กก.</strong></td>
                  <td class="text-muted">${dateStr}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  renderHistoryItem(w) {
    const dateFormatted = new Date(w.date).toLocaleDateString('th-TH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <div class="history-card" data-workout-id="${w.id}">
        <div class="history-card-header">
          <div>
            <div class="d-flex align-center gap-2">
              <span class="badge-cat">${w.dayName}</span>
              <span class="text-muted text-sm">${dateFormatted}</span>
            </div>
            <h4 class="history-workout-title">${w.planName}</h4>
          </div>
          <div class="history-stats-pills">
            <span class="pill-stat">⏱️ ${w.durationMinutes || 45} นาที</span>
            <span class="pill-stat text-success">⚖️ ${(w.totalVolumeKg || 0).toLocaleString()} กก.</span>
            <button class="btn btn-outline-danger btn-xs delete-history-btn" data-workout-id="${w.id}" title="ลบบันทึกนี้">🗑️</button>
          </div>
        </div>

        <div class="history-exercises-summary">
          ${(w.exercises || []).map(exItem => {
            const ex = getExerciseById(exItem.exerciseId);
            const validSets = (exItem.sets || []).filter(s => s.completed);
            return `
              <div class="history-ex-pill">
                <strong>${ex ? ex.nameTh : exItem.exerciseId}:</strong>
                <span>${validSets.length} เซ็ต (${validSets.map(s => `${s.weight}×${s.reps}`).join(', ')})</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Delete workout from history
    this.container.querySelectorAll('.delete-history-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wId = btn.dataset.workoutId;
        if (confirm('ยืนยันที่จะลบบันทึกการฝึกซ้อมนี้หรือไม่?')) {
          const history = storage.getHistory().filter(w => w.id !== wId);
          storage.saveHistory(history);
          this.render();
        }
      });
    });

    // Export Data JSON
    const exportBtn = this.container.querySelector('#exportDataBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const json = storage.exportAllDataJSON();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fit-app-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    // Import Data JSON
    const importInput = this.container.querySelector('#importDataInput');
    if (importInput) {
      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const res = storage.importDataJSON(event.target.result);
          if (res.success) {
            alert(`นำเข้าข้อมูลเรียบร้อยแล้ว (${res.count} เซสชัน)`);
            this.render();
          } else {
            alert('เกิดข้อผิดพลาดในการนำเข้าไฟล์: ' + res.error);
          }
        };
        reader.readAsText(file);
      });
    }
  }
}
