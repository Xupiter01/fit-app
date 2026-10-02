/**
 * Fit App - Progressive Overload & Weight Management Engine
 * Calculates 1RM, Progressive Overload weights, warm-up sets, and plate breakdowns
 */

import { getGoalById } from '../data/goals.js';
import { EXERCISES, getExerciseById } from '../data/exercises.js';

/**
 * Estimate 1 Rep Max using combined Epley & Brzycki formula
 * @param {number} weight - Weight lifted in kg
 * @param {number} reps - Repetitions performed
 * @returns {number} Estimated 1RM rounded to 1 decimal place
 */
export function estimate1RM(weight, reps) {
  if (!weight || weight <= 0) return 0;
  if (reps <= 1) return weight;
  
  // Epley formula: w * (1 + r / 30)
  const epley = weight * (1 + reps / 30);
  // Brzycki formula: w * (36 / (37 - r))
  const brzycki = reps < 37 ? weight * (36 / (37 - reps)) : epley;
  
  return Math.round(((epley + brzycki) / 2) * 10) / 10;
}

/**
 * Calculate recommended working weight based on 1RM and target goal
 * @param {number} oneRM - 1 Rep Max in kg
 * @param {string} goalId - Goal identifier
 * @returns {number} Recommended weight rounded to 2.5kg increments
 */
export function getWeightForGoal(oneRM, goalId) {
  if (!oneRM || oneRM <= 0) return 20; // default empty barbell
  
  let percentage = 0.70; // default hypertrophy
  if (goalId === 'strength') percentage = 0.85;
  else if (goalId === 'fat-loss') percentage = 0.60;
  else if (goalId === 'beginner') percentage = 0.55;

  const rawWeight = oneRM * percentage;
  // Round to nearest 2.5kg increment
  return Math.round(rawWeight / 2.5) * 2.5;
}

/**
 * Reference strength standards: expected 1RM of each movement expressed as a ratio of the
 * Barbell Bench Press 1RM, plus the plate increment used when rounding the derived number.
 */
export const BENCH_REFERENCE_RATIOS = {
  'barbell-bench-press': { ratio: 1.0, inc: 2.5 },
  'incline-dumbbell-press': { ratio: 0.5, inc: 1.25, note: 'ต่อดัมเบลล์' },
  'overhead-shoulder-press': { ratio: 0.65, inc: 2.5 },
  'dumbbell-lateral-raise': { ratio: 0.2, inc: 1.25, note: 'ต่อดัมเบลล์' },
  'tricep-rope-pushdown': { ratio: 0.35, inc: 2.5 },
  'cable-chest-fly': { ratio: 0.3, inc: 2.5 },
  'barbell-deadlift': { ratio: 1.5, inc: 2.5 },
  'barbell-bent-over-row': { ratio: 0.9, inc: 2.5 },
  'lat-pulldown': { ratio: 0.9, inc: 2.5 },
  'face-pull': { ratio: 0.3, inc: 2.5 },
  'barbell-bicep-curl': { ratio: 0.35, inc: 2.5 },
  'incline-hammer-curl': { ratio: 0.25, inc: 1.25, note: 'ต่อดัมเบลล์' },
  'barbell-back-squat': { ratio: 1.25, inc: 2.5 },
  'romanian-deadlift': { ratio: 0.8, inc: 2.5 },
  'leg-press': { ratio: 1.6, inc: 2.5 },
  'leg-extension': { ratio: 0.45, inc: 2.5 },
  'seated-or-standing-calf-raise': { ratio: 0.9, inc: 2.5 },
  'hanging-leg-raise': { ratio: 0.3, inc: 2.5 }
};

const CATEGORY_REFERENCE_RATIOS = { push: 0.6, pull: 0.8, legs: 1.2, core: 0.3 };

/**
 * Round a weight to the closest plate/dumbbell increment
 */
export function roundToIncrement(value, increment = 2.5) {
  const inc = increment > 0 ? increment : 2.5;
  return Math.max(inc, Math.round(value / inc) * inc);
}

/**
 * Get the reference ratio (and increment) used to derive a weight from the anchor 1RM
 * @param {string} exerciseId
 * @returns {Object} { ratio, inc, note? }
 */
export function getReferenceRatio(exerciseId) {
  if (BENCH_REFERENCE_RATIOS[exerciseId]) return BENCH_REFERENCE_RATIOS[exerciseId];
  const exercise = getExerciseById(exerciseId);
  return { ratio: CATEGORY_REFERENCE_RATIOS[exercise?.category] || 0.6, inc: 2.5 };
}

/**
 * True when the lifter already has at least one completed set logged for this movement
 */
export function hasLoggedPerformance(historySessions) {
  if (!historySessions || historySessions.length === 0) return false;
  const lastSession = historySessions[historySessions.length - 1];
  return (lastSession.sets || []).some(s => s.completed && s.weight > 0 && s.reps > 0);
}

/**
 * Best estimated 1RM found across every logged session of one movement
 * @param {Array} historySessions
 * @returns {Object} { est1RM, sessions, loggedSets }
 */
export function getLogged1RM(historySessions) {
  const sessions = historySessions || [];
  let est1RM = 0;
  let loggedSets = 0;

  sessions.forEach(session => {
    (session.sets || []).forEach(set => {
      if (set.completed && set.weight > 0 && set.reps > 0) {
        loggedSets++;
        const e = estimate1RM(set.weight, set.reps);
        if (e > est1RM) est1RM = e;
      }
    });
  });

  return {
    est1RM: Math.round(est1RM * 10) / 10,
    sessions: sessions.length,
    loggedSets
  };
}

/**
 * How similar two movements are, used to transfer the lifter's own strength profile
 * onto movements they have never logged.
 */
export function getMovementSimilarity(a, b) {
  if (!a || !b) return 0;
  let score = 0;
  if (a.category === b.category) score += 1;
  if (a.type === b.type) score += 0.3;
  const aMain = (a.equipment || '').split('+')[0].trim();
  const bMain = (b.equipment || '').split('+')[0].trim();
  if (aMain && aMain === bMain) score += 0.2;
  return score;
}

// Guard rails so a single odd log can never produce an absurd plan
export const PERSONAL_FACTOR_LIMITS = { min: 0.6, max: 1.7 };

// Each individual sample is winsorized before combining, and no single sample may
// contribute more than this share of the final factor
const SAMPLE_FACTOR_LIMITS = { min: 0.7, max: 1.4 };
const MAX_SAMPLE_SHARE = 0.45;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function roundRatio(value) {
  return Math.round(value * 100) / 100;
}

/**
 * Build the lifter's personal strength profile from every movement they have already logged.
 * Each sample records how far their real 1RM sits from the standard model prediction for the
 * anchor 1RM (e.g. "you squat below the textbook ratio relative to your bench press").
 * @param {string} anchorId
 * @param {number} anchor1RM - 1RM the user typed in the calculator
 * @param {Function} getHistoryFor - (exerciseId) => history sessions
 * @returns {Object} { anchorId, reference1RM, anchorSource, samples }
 */export function buildPersonalFactorModel(anchorId, anchor1RM, getHistoryFor) {
    const anchorLogged = getLogged1RM(getHistoryFor ? getHistoryFor(anchorId) : []);
    // The value the user just typed is their declared level, so it wins over logged work
    const reference1RM = anchor1RM > 0 ? anchor1RM : anchorLogged.est1RM;
    const samples = [];

    if (reference1RM > 0 && getHistoryFor) {
      EXERCISES.forEach(ex => {
        if (ex.id === anchorId) return;
        const logged = getLogged1RM(getHistoryFor(ex.id));
        if (logged.est1RM <= 0) return;
        const expected = reference1RM * getReferenceRatio(ex.id).ratio;
        if (expected <= 0) return;
        samples.push({
          exerciseId: ex.id,
          name: ex.nameTh,
          exercise: ex,
          factor: logged.est1RM / expected,
          sessions: logged.sessions
        });
      });
    }

    return {
      anchorId,
      reference1RM,
      anchorSource: anchor1RM > 0 ? 'baseline' : 'logged',
      samples
    };
  }

/**
 * Ratio to derive one movement from the anchor, personalised with the lifter's own numbers.
 * Priority: the movement's own logged ratio > ratio calibrated from similar logged
 * movements > the standard strength ratio.
 * @returns {Object} { ratio, stdRatio, factor, mode, sampleCount, usedSamples }
 */
export function getPersonalizedRatio(exerciseId, model, ownLogged1RM = 0) {
  const exercise = getExerciseById(exerciseId);
  const stdRatio = getReferenceRatio(exerciseId).ratio;

  // The movement itself has been logged: the lifter's own ratio is the most accurate source
  if (ownLogged1RM > 0 && model && model.reference1RM > 0) {
    const ownRatio = ownLogged1RM / model.reference1RM;
    const confidence = model.samples.length >= 2 ? 1 : 0.8;
    const blended = ownRatio * confidence + stdRatio * (1 - confidence);
    return {
      ratio: roundRatio(blended),
      stdRatio,
      factor: roundRatio(ownRatio / stdRatio),
      mode: confidence === 1 ? 'own' : 'blend',
      sampleCount: model.samples.length + 1,
      usedSamples: ['ตัวท่าเอง']
    };
  }

  if (!model || model.samples.length === 0) {
    return { ratio: stdRatio, stdRatio, factor: 1, mode: 'standard', sampleCount: 0, usedSamples: [] };
  }// Weight each sample by movement similarity and data amount, then winsorize the
    // sample factors and cap how much a single sample can dominate the result
    const weightedSamples = [];
    model.samples.forEach(sample => {
      const similarity = getMovementSimilarity(exercise, sample.exercise);
      if (similarity <= 0) return;
      weightedSamples.push({
        name: sample.name,
        weight: similarity * Math.min(1, 0.5 + 0.2 * sample.sessions),
        factor: clamp(sample.factor, SAMPLE_FACTOR_LIMITS.min, SAMPLE_FACTOR_LIMITS.max)
      });
    });

    if (weightedSamples.length === 0) {
      return { ratio: stdRatio, stdRatio, factor: 1, mode: 'standard', sampleCount: model.samples.length, usedSamples: [] };
    }

    const rawTotal = weightedSamples.reduce((acc, s) => acc + s.weight, 0);
    const maxWeight = Math.max(0.01, rawTotal * MAX_SAMPLE_SHARE);
    let cappedTotal = 0;
    weightedSamples.forEach(s => {
      s.effectiveWeight = Math.min(s.weight, maxWeight);
      cappedTotal += s.effectiveWeight;
    });

    const blended = weightedSamples.reduce((acc, s) => acc + s.effectiveWeight * s.factor, 0) / cappedTotal;
    const factor = clamp(blended, PERSONAL_FACTOR_LIMITS.min, PERSONAL_FACTOR_LIMITS.max);return {
      ratio: roundRatio(stdRatio * factor),
      stdRatio,
      factor: roundRatio(factor),
      mode: weightedSamples.length >= 2 ? 'personal' : 'blend',
      sampleCount: weightedSamples.length,
      usedSamples: weightedSamples.map(s => s.name)
    };
}

/**
 * Compare every exercise of a plan against the 1RM the user just saved in the calculator.
 * Movements with real logged history keep their own numbers (logs always win), while the
 * remaining ones get a derived weight so the whole plan stays consistent.
 * @param {Object} plan
 * @param {string} anchorId - Exercise the user entered in the calculator
 * @param {number} anchorEst1RM - Estimated 1RM of the anchor exercise
 * @param {string} goalId
 * @param {Function} getHistoryFor - (exerciseId) => history sessions
 * @param {Object} baselines - { [exerciseId]: baseline }
 * @returns {Array} One row per exercise occurrence inside the plan
 */
export function buildPlanWeightSync(plan, anchorId, anchorEst1RM, goalId, getHistoryFor, baselines = {}) {
  const rows = [];
  if (!plan || !anchorEst1RM || anchorEst1RM <= 0) return rows;

  const model = buildPersonalFactorModel(anchorId, anchorEst1RM, getHistoryFor);

  (plan.days || []).forEach(day => {
    (day.exercises || []).forEach(item => {
      const exId = item.exerciseId;
      const exercise = getExerciseById(exId);
      const history = getHistoryFor ? (getHistoryFor(exId) || []) : [];
      const baseline = baselines[exId];
      const logged = hasLoggedPerformance(history);

      const currentWeight = logged
        ? getProgressiveOverloadRecommendation(exId, history, goalId, baseline).suggestedWeight
        : (baseline ? getWeightForGoal(baseline.est1RM || baseline.weight, goalId) : null);

      if (exId === anchorId) {
        rows.push({
          exerciseId: exId,
          name: exercise ? exercise.nameTh : exId,
          dayName: day.name,
          isAnchor: true,
          hasHistory: logged,
          currentWeight,
          derivedWeight: getWeightForGoal(anchorEst1RM, goalId),
          derived1RM: anchorEst1RM,
          ratio: 1,
          stdRatio: 1,
          ratioFactor: 1,
          ratioMode: 'anchor',
          lockedByUser: false,
          sampleCount: 0,
          usedSamples: [],
          note: null
        });
        return;
      }

      // Locked by the user: keep their exact number, whatever the model suggests
      if (baseline && baseline.source === 'override' && baseline.weight > 0) {
        rows.push({
          exerciseId: exId,
          name: exercise ? exercise.nameTh : exId,
          dayName: day.name,
          isAnchor: false,
          hasHistory: logged,
          currentWeight: baseline.weight,
          derivedWeight: baseline.weight,
          derived1RM: estimate1RM(baseline.weight, getGoalById(goalId).maxReps),
          ratio: null,
          stdRatio: getReferenceRatio(exId).ratio,
          ratioFactor: null,
          ratioMode: 'override',
          lockedByUser: true,
          sampleCount: 0,
          usedSamples: [],
          note: getReferenceRatio(exId).note || null
        });
        return;
      }

      const ref = getReferenceRatio(exId);
      const personal = getPersonalizedRatio(exId, model, logged ? getLogged1RM(history).est1RM : 0);
      const derived1RM = roundToIncrement(anchorEst1RM * personal.ratio, ref.inc);

      rows.push({
        exerciseId: exId,
        name: exercise ? exercise.nameTh : exId,
        dayName: day.name,
        isAnchor: false,
        hasHistory: logged,
        currentWeight,
        derivedWeight: getWeightForGoal(derived1RM, goalId),
        derived1RM,
        ratio: personal.ratio,
        stdRatio: personal.stdRatio,
        ratioFactor: personal.factor,
        ratioMode: personal.mode,
        lockedByUser: false,
        sampleCount: personal.sampleCount,
        usedSamples: personal.usedSamples,
        note: ref.note || null
      });
    });
  });

  return rows;
}

/**
 * Smart Progressive Overload Engine
 * Analyzes previous exercise history and recommends next session weights.
 * Real logged sessions always win; the saved baseline is the fallback when nothing was logged yet.
 * @param {string} exerciseId
 * @param {Array} historySessions - Past completed sessions with sets: [{ weight, reps, rpe }]
 * @param {string} goalId
 * @param {Object} baseline - Baseline saved from the Goals calculator
 * @returns {Object} Recommendation object
 */
export function getProgressiveOverloadRecommendation(exerciseId, historySessions, goalId = 'hypertrophy', baseline = null) {
  const exercise = getExerciseById(exerciseId);
  const goal = getGoalById(goalId);

  // An explicit per-exercise lock from the Goals view always wins
  if (baseline && baseline.source === 'override' && baseline.weight > 0) {
    const logged = getLogged1RM(historySessions);
    const loggedEquivalent = logged.est1RM > 0 ? getWeightForGoal(logged.est1RM, goalId) : null;

    return {
      status: 'override',
      suggestedWeight: baseline.weight,
      targetReps: goal.repRange,
      increment: 0,
      reason: `คุณตั้งน้ำหนักนี้เองไว้ที่ ${baseline.weight} กก. ระบบจะใช้ค่านี้ทุกครั้งจนกว่าจะกดปลดล็อกที่หน้าเป้าหมาย & บริหารน้ำหนัก${loggedEquivalent !== null ? ` (ข้อมูลล่าสุดที่บันทึกไว้เทียบได้ประมาณ ${loggedEquivalent} กก.)` : ''}`,
      color: '#f59e0b',
      badge: 'ตั้งค่าเอง (ล็อกไว้)'
    };
  }

  // No logged session yet, but the user saved a baseline for this movement
  if ((!historySessions || historySessions.length === 0) && baseline && (baseline.est1RM > 0 || baseline.weight > 0)) {
    const baseline1RM = baseline.est1RM || estimate1RM(baseline.weight, baseline.reps || 1);
    const workingWeight = getWeightForGoal(baseline1RM, goalId);
    const anchorEx = baseline.anchorId ? getExerciseById(baseline.anchorId) : null;
    const isManual = baseline.source === 'manual';

    return {
      status: 'baseline',
      suggestedWeight: workingWeight,
      targetReps: goal.repRange,
      increment: 0,
      reason: isManual
        ? `ใช้เกณฑ์ที่คุณบันทึกไว้เองในหน้าเป้าหมาย & บริหารน้ำหนัก: ยกได้ ${baseline.weight} กก. × ${baseline.reps} ครั้ง (1RM ≈ ${baseline1RM} กก.) จึงแนะนำ Working Set ${workingWeight} กก. และเมื่อบันทึกการออกกำลังกายจริงแล้วระบบจะเปลี่ยนไปใช้ข้อมูลจริงแทน`
        : `ยังไม่มีการบันทึกการออกกำลังกายของท่านี้ ระบบจึงอ้างอิงจากเกณฑ์ของ ${anchorEx ? anchorEx.nameTh : 'ท่าอ้างอิง'} ที่คุณบันทึกไว้ (1RM ≈ ${baseline1RM} กก.) เสนอเริ่มที่ ${workingWeight} กก.`,
      color: '#8b5cf6',
      badge: 'อ้างอิงเกณฑ์ที่บันทึกไว้'
    };
  }

  // Default fallback if no history
  if (!historySessions || historySessions.length === 0) {
    let startingWeight = 20; // empty barbell
    if (exercise?.category === 'legs') startingWeight = 40;
    if (exercise?.equipment?.includes('ดัมเบลล์')) startingWeight = 10;
    if (exercise?.equipment?.includes('เชือก') || exercise?.equipment?.includes('เคเบิล')) startingWeight = 15;

    return {
      status: 'new',
      suggestedWeight: startingWeight,
      targetReps: goal.repRange,
      increment: 0,
      reason: 'การฝึกครั้งแรกสำหรับท่านี้ แนะนำเริ่มด้วยน้ำหนักปานกลางเพื่อทดสอบฟอร์ม',
      color: '#3b82f6',
      badge: 'เริ่มบันทึกครั้งแรก'
    };
  }

  // Get most recent session
  const lastSession = historySessions[historySessions.length - 1];
  const lastSets = lastSession.sets || [];
  if (lastSets.length === 0) {
    return {
      status: 'maintain',
      suggestedWeight: 20,
      targetReps: goal.repRange,
      increment: 0,
      reason: 'ใช้น้ำหนักเดิมเพื่อหาจุดสมดุล',
      color: '#3b82f6',
      badge: 'คงน้ำหนัก'
    };
  }

  // Calculate stats from last session
  const validSets = lastSets.filter(s => s.completed && s.weight > 0 && s.reps > 0);
  if (validSets.length === 0) {
    return {
      status: 'maintain',
      suggestedWeight: lastSets[0]?.weight || 20,
      targetReps: goal.repRange,
      increment: 0,
      reason: 'ใช้น้ำหนักเดิมและบันทึกเซ็ตที่สมบูรณ์',
      color: '#3b82f6',
      badge: 'คงน้ำหนัก'
    };
  }

  const highestWeight = Math.max(...validSets.map(s => s.weight));
  const avgReps = validSets.reduce((acc, s) => acc + s.reps, 0) / validSets.length;
  const avgRpe = validSets.reduce((acc, s) => acc + (s.rpe || 8), 0) / validSets.length;
  const allHitMaxReps = validSets.every(s => s.reps >= goal.maxReps);
  const allHitMinReps = validSets.every(s => s.reps >= goal.minReps);

  const isLowerBody = exercise?.category === 'legs' || exerciseId.includes('deadlift') || exerciseId.includes('squat');
  const standardIncrement = isLowerBody ? 5.0 : 2.5;

  // 1. Double Progression Rule: Hit top of rep range across all sets with comfortable RPE (< 8.5)
  if (allHitMaxReps && avgRpe <= 8.5) {
    const nextWeight = highestWeight + standardIncrement;
    return {
      status: 'increase',
      suggestedWeight: nextWeight,
      targetReps: `${goal.minReps} - ${goal.maxReps} ครั้ง`,
      increment: standardIncrement,
      reason: `ยอดเยี่ยมมาก! ครั้งที่แล้วคุณทำได้ถึง ${goal.maxReps} ครั้งครบทุกเซ็ต (RPE ${avgRpe.toFixed(1)}) แนะนำเพิ่มน้ำหนัก +${standardIncrement} กก. เพื่อพัฒนาการตามหลัก Progressive Overload`,
      color: '#10b981',
      badge: `แนะนำเพิ่ม +${standardIncrement} กก.`
    };
  }

  // 2. Consistent performance within target rep range
  if (allHitMinReps) {
    return {
      status: 'maintain',
      suggestedWeight: highestWeight,
      targetReps: `${Math.min(goal.maxReps, Math.ceil(avgReps + 1))} ครั้ง`,
      increment: 0,
      reason: `กำลังไปได้สวย! ทำได้เฉลี่ย ${avgReps.toFixed(1)} ครั้ง (เป้าหมาย ${goal.repRange}) แนะนำใช้น้ำหนักเดิม ${highestWeight} กก. แต่ตั้งเป้าเพิ่มจำนวนครั้งให้แตะ ${goal.maxReps} ครั้งในทุกเซ็ต`,
      color: '#3b82f6',
      badge: 'คงน้ำหนัก / เพิ่ม Reps'
    };
  }

  // 3. Failed to hit minimum reps or very high fatigue (RPE >= 9.5)
  if (!allHitMinReps && avgRpe >= 9.5) {
    // If failed multiple sessions, suggest slight deload
    return {
      status: 'deload',
      suggestedWeight: Math.max(isLowerBody ? 20 : 10, highestWeight - standardIncrement),
      targetReps: `${goal.minReps} - ${goal.maxReps} ครั้ง`,
      increment: -standardIncrement,
      reason: `ครั้งก่อนแรงหมดและต่ำกว่าเป้าหมายขั้นต่ำ (${avgReps.toFixed(1)} ครั้ง, RPE ${avgRpe.toFixed(1)}) แนะนำผ่อนน้ำหนักลง -${standardIncrement} กก. เพื่อฟื้นฟูระบบประสาทและโฟกัสฟอร์มให้สมบูรณ์`,
      color: '#f59e0b',
      badge: `ลดน้ำหนักเพื่อฟอร์ม -${standardIncrement} กก.`
    };
  }

  // Default: maintain
  return {
    status: 'maintain',
    suggestedWeight: highestWeight,
    targetReps: goal.repRange,
    increment: 0,
    reason: `รักษาน้ำหนักเดิม ${highestWeight} กก. โฟกัสการเกร็งกล้ามเนื้อและรักษาฟอร์มตามเทคนิค`,
    color: '#3b82f6',
    badge: 'คงน้ำหนัก'
  };
}

/**
 * Generate smart warm-up sets leading up to the working weight
 * @param {number} workingWeight - Target working weight in kg
 * @param {number} barWeight - Default empty bar weight (default 20kg)
 * @returns {Array} Array of warm-up sets
 */
export function generateWarmUpSets(workingWeight, barWeight = 20) {
  if (workingWeight <= barWeight) {
    return [
      { step: 1, pct: 100, weight: barWeight, reps: 10, note: 'วอร์มข้อต่อด้วยบาร์เปล่า' }
    ];
  }

  const sets = [
    { step: 1, pct: 'บาร์เปล่า', weight: barWeight, reps: 10, restSec: 45, note: 'อบอุ่นข้อต่อและสร้างแนวการเคลื่อนไหว' }
  ];

  const diff = workingWeight - barWeight;

  if (workingWeight >= 40) {
    const w1 = Math.round((barWeight + diff * 0.4) / 2.5) * 2.5;
    sets.push({ step: 2, pct: '50%', weight: w1, reps: 6, restSec: 60, note: 'กระตุ้นการไหลเวียนโลหิต' });
  }

  if (workingWeight >= 60) {
    const w2 = Math.round((barWeight + diff * 0.7) / 2.5) * 2.5;
    sets.push({ step: 3, pct: '75%', weight: w2, reps: 3, restSec: 90, note: 'ปลุกระบบประสาทสั่งการ' });
  }

  if (workingWeight >= 80) {
    const w3 = Math.round((barWeight + diff * 0.9) / 2.5) * 2.5;
    sets.push({ step: 4, pct: '90%', weight: w3, reps: 1, restSec: 120, note: 'ทดสอบความพร้อมทางจิตวิทยา (Potentiation)' });
  }

  return sets;
}

/**
 * Calculate Olympic plate combination per side for a barbell
 * @param {number} totalWeight - Total weight in kg (including 20kg bar)
 * @param {number} barWeight - Bar weight (default 20kg)
 * @returns {Object} { perSideWeight, plates: [{ plate: 20, count: 1 }, ...] }
 */
export function calculateBarbellPlates(totalWeight, barWeight = 20) {
  if (totalWeight <= barWeight) {
    return { perSideWeight: 0, plates: [], barWeight };
  }

  let weightPerSide = (totalWeight - barWeight) / 2;
  const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
  const plates = [];

  for (const plate of availablePlates) {
    const count = Math.floor(weightPerSide / plate);
    if (count > 0) {
      plates.push({ plate, count });
      weightPerSide -= count * plate;
    }
  }

  return {
    perSideWeight: (totalWeight - barWeight) / 2,
    plates,
    barWeight
  };
}
