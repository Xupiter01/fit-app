/**
 * Fit App - Visuals & Diagram Generator
 * Provides SVG exercise diagrams with form cues and anatomical muscle maps
 */

/**
 * Render an Anatomical Human Muscle Diagram with highlighted target muscles
 * @param {Array} primaryMuscles
 * @param {Array} secondaryMuscles
 * @param {string} category - 'push' | 'pull' | 'legs' | 'core'
 * @returns {string} SVG HTML string
 */
export function renderMuscleAnatomyMap(primaryMuscles = [], secondaryMuscles = [], category = 'push') {
  const isPush = category === 'push';
  const isPull = category === 'pull';
  const isLegs = category === 'legs';
  const isCore = category === 'core';

  // Determine active highlights
  const chestActive = isPush && primaryMuscles.some(m => m.includes('อก'));
  const shoulderFrontActive = isPush || primaryMuscles.some(m => m.includes('ไหล่'));
  const tricepsActive = isPush || primaryMuscles.some(m => m.includes('หลังแขน'));
  const backActive = isPull || primaryMuscles.some(m => m.includes('หลัง') || m.includes('ปีก'));
  const bicepsActive = isPull && (primaryMuscles.some(m => m.includes('แขน') || m.includes('ไบเซป')) || secondaryMuscles.some(m => m.includes('หน้าแขน')));
  const quadsActive = isLegs && primaryMuscles.some(m => m.includes('หน้าขา') || m.includes('ขา'));
  const hamstringsActive = isLegs && (primaryMuscles.some(m => m.includes('หลังขา')) || secondaryMuscles.some(m => m.includes('หลังขา')));
  const glutesActive = isLegs && primaryMuscles.some(m => m.includes('ก้น') || m.includes('สะโพก'));
  const calvesActive = isLegs && primaryMuscles.some(m => m.includes('น่อง'));
  const coreActive = isCore || primaryMuscles.some(m => m.includes('ท้อง') || m.includes('แกนกลาง'));

  const primaryColor = '#10b981'; // vibrant emerald
  const secondaryColor = '#8b5cf6'; // vivid purple
  const neutralColor = '#334155'; // dark slate
  const bodyBaseColor = '#1e293b';

  return `
    <div class="anatomy-container">
      <div class="anatomy-view">
        <span class="anatomy-label">มุมมองด้านหน้า (Front View)</span>
        <svg viewBox="0 0 200 320" class="anatomy-svg" aria-label="กล้ามเนื้อด้านหน้า">
          <!-- Head / Neck -->
          <circle cx="100" cy="30" r="16" fill="${bodyBaseColor}" stroke="#475569" stroke-width="1.5" />
          <path d="M92 46 L108 46 L112 58 L88 58 Z" fill="${bodyBaseColor}" />
          
          <!-- Shoulders (Deltoids) -->
          <path d="M60 62 Q72 58 88 58 L85 75 Q70 82 58 75 Z" 
                fill="${shoulderFrontActive ? primaryColor : neutralColor}" 
                class="muscle-part ${shoulderFrontActive ? 'active-primary' : ''}">
            <title>หัวไหล่ซ้าย (Left Deltoid)</title>
          </path>
          <path d="M140 62 Q128 58 112 58 L115 75 Q130 82 142 75 Z" 
                fill="${shoulderFrontActive ? primaryColor : neutralColor}" 
                class="muscle-part ${shoulderFrontActive ? 'active-primary' : ''}">
            <title>หัวไหล่ขวา (Right Deltoid)</title>
          </path>

          <!-- Chest (Pectoralis Major) -->
          <path d="M88 60 L112 60 L114 86 Q100 94 86 86 Z" 
                fill="${chestActive ? primaryColor : (isPull ? neutralColor : neutralColor)}" 
                class="muscle-part ${chestActive ? 'active-primary' : ''}">
            <title>กล้ามเนื้อหน้าอก (Chest / Pectorals)</title>
          </path>

          <!-- Biceps -->
          <rect x="52" y="80" width="14" height="28" rx="6" 
                fill="${bicepsActive ? primaryColor : (tricepsActive ? secondaryColor : neutralColor)}" 
                class="muscle-part">
            <title>หน้าแขน / แขนท่อนบน</title>
          </rect>
          <rect x="134" y="80" width="14" height="28" rx="6" 
                fill="${bicepsActive ? primaryColor : (tricepsActive ? secondaryColor : neutralColor)}" 
                class="muscle-part">
            <title>หน้าแขน / แขนท่อนบน</title>
          </rect>

          <!-- Forearms -->
          <rect x="46" y="112" width="12" height="34" rx="5" fill="${neutralColor}" />
          <rect x="142" y="112" width="12" height="34" rx="5" fill="${neutralColor}" />

          <!-- Abs / Core (Rectus Abdominis) -->
          <path d="M88 90 L112 90 L110 145 L90 145 Z" 
                fill="${coreActive ? primaryColor : (isPush || isPull ? '#475569' : neutralColor)}" 
                class="muscle-part ${coreActive ? 'active-primary' : ''}">
            <title>แกนกลางลำตัว & หน้าท้อง (Abs / Core)</title>
          </path>
          <!-- Abs Grid Lines -->
          <line x1="100" y1="92" x2="100" y2="140" stroke="#0f172a" stroke-width="1.5" />
          <line x1="90" y1="105" x2="110" y2="105" stroke="#0f172a" stroke-width="1.5" />
          <line x1="90" y1="120" x2="110" y2="120" stroke="#0f172a" stroke-width="1.5" />

          <!-- Pelvis -->
          <path d="M88 145 L112 145 L118 165 L82 165 Z" fill="${bodyBaseColor}" />

          <!-- Quadriceps (Front Thighs) -->
          <path d="M78 170 Q82 225 84 235 L96 235 Q96 200 96 170 Z" 
                fill="${quadsActive ? primaryColor : neutralColor}" 
                class="muscle-part ${quadsActive ? 'active-primary' : ''}">
            <title>หน้าขาซ้าย (Quads)</title>
          </path>
          <path d="M122 170 Q118 225 116 235 L104 235 Q104 200 104 170 Z" 
                fill="${quadsActive ? primaryColor : neutralColor}" 
                class="muscle-part ${quadsActive ? 'active-primary' : ''}">
            <title>หน้าขาขวา (Quads)</title>
          </path>

          <!-- Knees -->
          <circle cx="90" cy="242" r="6" fill="${bodyBaseColor}" stroke="#475569" stroke-width="1" />
          <circle cx="110" cy="242" r="6" fill="${bodyBaseColor}" stroke="#475569" stroke-width="1" />

          <!-- Calves / Shins -->
          <path d="M84 250 L94 250 L92 295 L82 295 Z" 
                fill="${calvesActive ? (isLegs ? secondaryColor : neutralColor) : neutralColor}" />
          <path d="M116 250 L106 250 L108 295 L118 295 Z" 
                fill="${calvesActive ? (isLegs ? secondaryColor : neutralColor) : neutralColor}" />
        </svg>
      </div>

      <div class="anatomy-view">
        <span class="anatomy-label">มุมมองด้านหลัง (Back View)</span>
        <svg viewBox="0 0 200 320" class="anatomy-svg" aria-label="กล้ามเนื้อด้านหลัง">
          <!-- Head / Neck -->
          <circle cx="100" cy="30" r="16" fill="${bodyBaseColor}" stroke="#475569" stroke-width="1.5" />
          
          <!-- Trapezius (Upper Back) -->
          <path d="M100 46 L82 62 L100 78 L118 62 Z" 
                fill="${(backActive || shoulderFrontActive) ? (isPull ? primaryColor : secondaryColor) : neutralColor}" 
                class="muscle-part">
            <title>สะบักบน (Traps)</title>
          </path>

          <!-- Shoulders Rear (Rear Deltoid) -->
          <path d="M60 62 Q72 58 82 62 L80 76 Q68 80 58 75 Z" 
                fill="${(isPull || shoulderFrontActive) ? secondaryColor : neutralColor}" />
          <path d="M140 62 Q128 58 118 62 L120 76 Q132 80 142 75 Z" 
                fill="${(isPull || shoulderFrontActive) ? secondaryColor : neutralColor}" />

          <!-- Triceps (Back Arm) -->
          <rect x="50" y="80" width="14" height="28" rx="6" 
                fill="${tricepsActive ? (primaryMuscles.some(m => m.includes('หลังแขน')) ? primaryColor : secondaryColor) : neutralColor}" />
          <rect x="136" y="80" width="14" height="28" rx="6" 
                fill="${tricepsActive ? (primaryMuscles.some(m => m.includes('หลังแขน')) ? primaryColor : secondaryColor) : neutralColor}" />

          <!-- Lats (Latissimus Dorsi / Back Width) -->
          <path d="M82 78 Q90 125 94 135 L100 135 L106 135 Q110 125 118 78 L100 90 Z" 
                fill="${backActive ? primaryColor : neutralColor}" 
                class="muscle-part ${backActive ? 'active-primary' : ''}">
            <title>ปีกหลัง (Lats / Back)</title>
          </path>

          <!-- Lower Back (Erector Spinae) -->
          <rect x="94" y="136" width="12" height="20" rx="3" 
                fill="${(backActive || isLegs) ? secondaryColor : neutralColor}" />

          <!-- Glutes (Buttocks) -->
          <path d="M78 160 Q100 156 100 178 Q78 190 76 168 Z" 
                fill="${glutesActive ? primaryColor : neutralColor}" />
          <path d="M122 160 Q100 156 100 178 Q122 190 124 168 Z" 
                fill="${glutesActive ? primaryColor : neutralColor}" />

          <!-- Hamstrings (Back of Thighs) -->
          <path d="M78 185 Q82 225 84 235 L96 235 Q96 200 96 185 Z" 
                fill="${hamstringsActive ? primaryColor : neutralColor}" 
                class="muscle-part ${hamstringsActive ? 'active-primary' : ''}">
            <title>หลังขา (Hamstrings)</title>
          </path>
          <path d="M122 185 Q118 225 116 235 L104 235 Q104 200 104 185 Z" 
                fill="${hamstringsActive ? primaryColor : neutralColor}" 
                class="muscle-part ${hamstringsActive ? 'active-primary' : ''}">
            <title>หลังขา (Hamstrings)</title>
          </path>

          <!-- Calves (Gastrocnemius) -->
          <path d="M82 250 Q80 270 86 285 L94 285 Q96 270 94 250 Z" 
                fill="${calvesActive ? primaryColor : neutralColor}" 
                class="muscle-part ${calvesActive ? 'active-primary' : ''}">
            <title>น่อง (Calves)</title>
          </path>
          <path d="M118 250 Q120 270 114 285 L106 285 Q104 270 106 250 Z" 
                fill="${calvesActive ? primaryColor : neutralColor}" 
                class="muscle-part ${calvesActive ? 'active-primary' : ''}">
            <title>น่อง (Calves)</title>
          </path>
        </svg>
      </div>
    </div>
    
    <div class="anatomy-legend">
      <div class="legend-item"><span class="legend-color primary"></span> กล้ามเนื้อมัดหลัก (Primary Focus)</div>
      <div class="legend-item"><span class="legend-color secondary"></span> กล้ามเนื้อซัพพอร์ต (Secondary Focus)</div>
    </div>
  `;
}

/**
 * Generate visual posture & form illustration SVG for specific exercise
 * @param {string} svgType - Exercise SVG template identifier
 * @returns {string} SVG HTML string
 */
export function renderExerciseIllustration(svgType) {
  switch (svgType) {
    case 'bench-press':
      return `
        <svg viewBox="0 0 320 200" class="exercise-art-svg">
          <defs>
            <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#94a3b8" />
              <stop offset="50%" stop-color="#cbd5e1" />
              <stop offset="100%" stop-color="#94a3b8" />
            </linearGradient>
            <marker id="arrowUp" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,6 L3,0 L6,6 Z" fill="#10b981" />
            </marker>
          </defs>
          <!-- Ground line -->
          <line x1="20" y1="180" x2="300" y2="180" stroke="#334155" stroke-width="2" />
          <!-- Bench Stand & Pad -->
          <rect x="70" y="115" width="170" height="14" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <rect x="90" y="129" width="12" height="51" fill="#334155" />
          <rect x="208" y="129" width="12" height="51" fill="#334155" />
          <rect x="55" y="65" width="8" height="115" fill="#475569" /> <!-- Barbell upright -->
          <!-- Lifter on bench -->
          <!-- Torso with natural arch -->
          <path d="M100 115 Q145 106 190 115" fill="none" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
          <!-- Head -->
          <circle cx="85" cy="112" r="10" fill="#38bdf8" />
          <!-- Legs & Feet planted -->
          <path d="M190 115 L225 145 L225 180" fill="none" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Arms pressing -->
          <path d="M125 110 L140 85 L140 50" fill="none" stroke="#10b981" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Barbell & Plates -->
          <rect x="136" y="25" width="8" height="55" fill="url(#barGrad)" rx="2" transform="rotate(-90 140 52)" />
          <rect x="132" y="32" width="16" height="40" rx="3" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
          <line x1="30" y1="52" x2="250" y2="52" stroke="url(#barGrad)" stroke-width="6" stroke-linecap="round" />
          <!-- Movement trajectory arrow -->
          <path d="M140 100 L140 60" fill="none" stroke="#10b981" stroke-width="2.5" stroke-dasharray="4,3" marker-end="url(#arrowUp)" />
          <!-- Technical Badges -->
          <g transform="translate(180, 20)">
            <rect width="120" height="28" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1" />
            <text x="60" y="18" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">มุมศอก 45°-75°</text>
          </g>
          <g transform="translate(20, 20)">
            <rect width="100" height="28" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
            <text x="50" y="18" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">หนีบสะบักแน่น</text>
          </g>
        </svg>
      `;

    case 'squat':
      return `
        <svg viewBox="0 0 320 200" class="exercise-art-svg">
          <defs>
            <marker id="arrowSquatUp" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,6 L3,0 L6,6 Z" fill="#10b981" />
            </marker>
          </defs>
          <line x1="20" y1="180" x2="300" y2="180" stroke="#334155" stroke-width="2" />
          <!-- Depth guide line -->
          <line x1="70" y1="125" x2="250" y2="125" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,4" />
          <text x="255" y="128" fill="#ef4444" font-size="9">ระดับขนานพื้น (Parallel)</text>
          <!-- Squatting Silhouette -->
          <!-- Head -->
          <circle cx="135" cy="55" r="10" fill="#38bdf8" />
          <!-- Back / Torso (Angled, straight spine) -->
          <path d="M135 65 L115 125" fill="none" stroke="#38bdf8" stroke-width="14" stroke-linecap="round" />
          <!-- Thigh (Femur, below parallel) -->
          <path d="M115 125 L165 125" fill="none" stroke="#10b981" stroke-width="14" stroke-linecap="round" />
          <!-- Shin & Foot -->
          <path d="M165 125 L155 178 L175 178" fill="none" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Arms gripping bar -->
          <path d="M130 75 L125 70" fill="none" stroke="#94a3b8" stroke-width="6" />
          <!-- Barbell across traps -->
          <circle cx="128" cy="68" r="8" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
          <rect x="122" y="48" width="12" height="40" rx="3" fill="#ef4444" />
          <!-- Direction Arrow -->
          <path d="M140 145 L140 100" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="4,3" marker-end="url(#arrowSquatUp)" />
          <!-- Tech badge -->
          <g transform="translate(185, 20)">
            <rect width="120" height="28" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1" />
            <text x="60" y="18" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">เข่ากางตามปลายเท้า</text>
          </g>
          <g transform="translate(20, 20)">
            <rect width="110" height="28" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
            <text x="55" y="18" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">เกร็งหน้าท้อง Brace</text>
          </g>
        </svg>
      `;

    case 'deadlift':
      return `
        <svg viewBox="0 0 320 200" class="exercise-art-svg">
          <line x1="20" y1="180" x2="300" y2="180" stroke="#334155" stroke-width="2" />
          <!-- Deadlift starting hinge posture -->
          <!-- Head -->
          <circle cx="120" cy="65" r="10" fill="#38bdf8" />
          <!-- Torso straight spine -->
          <line x1="120" y1="75" x2="165" y2="115" stroke="#38bdf8" stroke-width="14" stroke-linecap="round" />
          <!-- Thigh / Hips back -->
          <line x1="165" y1="115" x2="140" y2="145" stroke="#10b981" stroke-width="12" stroke-linecap="round" />
          <!-- Shin vertical over bar -->
          <line x1="140" y1="145" x2="135" y2="178" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
          <!-- Arm hanging straight down -->
          <line x1="125" y1="80" x2="132" y2="145" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" />
          <!-- Barbell & Plate -->
          <circle cx="132" cy="150" r="26" fill="#ef4444" stroke="#b91c1c" stroke-width="3" />
          <circle cx="132" cy="150" r="7" fill="#cbd5e1" />
          <line x1="40" y1="150" x2="240" y2="150" stroke="#94a3b8" stroke-width="5" />
          <!-- Lift vector -->
          <path d="M132 120 L132 80" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="4,3" />
          <polygon points="128,80 132,70 136,80" fill="#10b981" />
          <!-- Badges -->
          <g transform="translate(180, 20)">
            <rect width="125" height="28" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1" />
            <text x="62" y="18" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">หลังตรง บาร์ชิดแข้ง</text>
          </g>
          <g transform="translate(20, 20)">
            <rect width="115" height="28" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
            <text x="57" y="18" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">ถีบพื้น ดันสะโพก</text>
          </g>
        </svg>
      `;

    case 'overhead-press':
      return `
        <svg viewBox="0 0 320 200" class="exercise-art-svg">
          <line x1="20" y1="185" x2="300" y2="185" stroke="#334155" stroke-width="2" />
          <!-- Standing lifter with bar pressed high -->
          <circle cx="160" cy="70" r="9" fill="#38bdf8" />
          <line x1="160" y1="80" x2="160" y2="135" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
          <!-- Legs straight & glutes tight -->
          <line x1="156" y1="135" x2="152" y2="183" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
          <line x1="164" y1="135" x2="168" y2="183" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
          <!-- Arms extended overhead -->
          <path d="M155 85 L145 55 L158 35" fill="none" stroke="#10b981" stroke-width="7" stroke-linecap="round" />
          <path d="M165 85 L175 55 L162 35" fill="none" stroke="#10b981" stroke-width="7" stroke-linecap="round" />
          <!-- Barbell overhead -->
          <line x1="70" y1="35" x2="250" y2="35" stroke="#cbd5e1" stroke-width="5" />
          <rect x="75" y="18" width="12" height="34" rx="2" fill="#ef4444" />
          <rect x="233" y="18" width="12" height="34" rx="2" fill="#ef4444" />
          <!-- Badges -->
          <g transform="translate(180, 70)">
            <rect width="125" height="28" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1" />
            <text x="62" y="18" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">ล็อกเหนือศีรษะ</text>
          </g>
          <g transform="translate(15, 70)">
            <rect width="115" height="28" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
            <text x="57" y="18" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">เกร็งก้น ไม่แอ่นหลัง</text>
          </g>
        </svg>
      `;

    case 'lat-pulldown':
      return `
        <svg viewBox="0 0 320 200" class="exercise-art-svg">
          <!-- Lat machine frame -->
          <line x1="160" y1="15" x2="160" y2="50" stroke="#475569" stroke-width="4" />
          <rect x="60" y="15" width="200" height="8" fill="#334155" rx="3" />
          <line x1="160" y1="50" x2="160" y2="60" stroke="#94a3b8" stroke-width="2" />
          <!-- Cable Pulldown Bar -->
          <path d="M100 65 Q160 58 220 65" fill="none" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" />
          <!-- Seated lifter -->
          <rect x="135" y="130" width="50" height="12" rx="3" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" />
          <circle cx="160" cy="95" r="9" fill="#38bdf8" />
          <!-- Torso slight lean back -->
          <line x1="160" y1="105" x2="155" y2="145" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
          <!-- Thigh locked under pads -->
          <line x1="155" y1="145" x2="185" y2="145" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
          <line x1="185" y1="145" x2="185" y2="180" stroke="#38bdf8" stroke-width="8" stroke-linecap="round" />
          <!-- Arms pulling down -->
          <path d="M155 105 L130 90 L115 65" fill="none" stroke="#10b981" stroke-width="6" stroke-linecap="round" />
          <path d="M165 105 L190 90 L205 65" fill="none" stroke="#10b981" stroke-width="6" stroke-linecap="round" />
          <!-- Badges -->
          <g transform="translate(185, 25)">
            <rect width="120" height="28" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1" />
            <text x="60" y="18" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">ดึงศอกลงหาเอว</text>
          </g>
        </svg>
      `;

    default:
      // Generic high-tech gym vector diagram
      return `
        <svg viewBox="0 0 320 200" class="exercise-art-svg">
          <defs>
            <radialGradient id="gymGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#10b981" stop-opacity="0.25" />
              <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="200" fill="url(#gymGlow)" />
          <circle cx="160" cy="90" r="55" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,4" />
          <circle cx="160" cy="90" r="40" fill="#1e293b" stroke="#10b981" stroke-width="2" />
          <path d="M145 90 L155 100 L175 80" fill="none" stroke="#10b981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <text x="160" y="160" fill="#94a3b8" font-size="12" font-weight="600" text-anchor="middle">ฟอร์มแม่นยำ ปลอดภัย โดนกล้ามเนื้อเต็มร้อย</text>
        </svg>
      `;
  }
}
