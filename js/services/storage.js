/**
 * Fit App - LocalStorage Data Management & State Service
 * Handles persistence, workout history, PRs, active drafts, and export/import
 */

import { DEFAULT_PLANS } from '../data/plans.js';
import { estimate1RM } from '../engine/progression.js';

const STORAGE_KEYS = {
  USER_PROFILE: 'fit_user_profile_v1',
  PLANS: 'fit_plans_v1',
  HISTORY: 'fit_workout_history_v1',
  ACTIVE_WORKOUT: 'fit_active_workout_v1',
  PRS: 'fit_personal_records_v1',
  BASELINES: 'fit_exercise_baselines_v1'
};

const DEFAULT_PROFILE = {
  name: 'Fit Lifter',
  selectedGoal: 'hypertrophy',
  bodyWeight: 72,
  unit: 'kg',
  activePlanId: 'ppl-classic-3day',
  soundEnabled: true,
  lastModelSyncAt: null // บันทึกครั้งล่าสุดที่ระบบเรียนรู้สัดส่วนน้ำหนักจากการออกกำลังกายจริง
};

export class StorageService {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) {
      this.saveProfile(DEFAULT_PROFILE);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PLANS)) {
      this.savePlans(DEFAULT_PLANS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
      this.seedInitialSampleData();
    }
  }

  // --- Profile ---
  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  }

  saveProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  }

  updateProfile(partial) {
    const current = this.getProfile();
    const updated = { ...current, ...partial };
    this.saveProfile(updated);
    return updated;
  }

  // --- Plans ---
  getPlans() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLANS);
      return data ? JSON.parse(data) : DEFAULT_PLANS;
    } catch (e) {
      return DEFAULT_PLANS;
    }
  }

  savePlans(plans) {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans));
  }

  getPlanById(id) {
    const plans = this.getPlans();
    return plans.find(p => p.id === id) || plans[0];
  }

  savePlan(plan) {
    const plans = this.getPlans();
    const index = plans.findIndex(p => p.id === plan.id);
    if (index >= 0) {
      plans[index] = plan;
    } else {
      plans.push(plan);
    }
    this.savePlans(plans);
  }

  // --- Workout History & Logs ---
  getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveHistory(history) {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    this.recalculatePRs(history);
  }

  addWorkoutToHistory(workout) {
    const history = this.getHistory();
    // Add unique ID and timestamp if missing
    if (!workout.id) workout.id = 'workout_' + Date.now();
    if (!workout.date) workout.date = new Date().toISOString();

    // Calculate total volume (kg lifted)
    let totalVolume = 0;
    (workout.exercises || []).forEach(ex => {
      (ex.sets || []).forEach(s => {
        if (s.completed && s.weight > 0 && s.reps > 0) {
          totalVolume += (s.weight * s.reps);
        }
      });
    });
    workout.totalVolumeKg = Math.round(totalVolume);

    history.unshift(workout);
    this.saveHistory(history);
    this.clearActiveWorkout();
    return workout;
  }

  getExerciseHistory(exerciseId) {
    const history = this.getHistory();
    const sessions = [];

    // Traverse from oldest to newest for progression analysis
    [...history].reverse().forEach(workout => {
      const match = (workout.exercises || []).find(e => e.exerciseId === exerciseId);
      if (match && match.sets && match.sets.length > 0) {
        sessions.push({
          date: workout.date,
          workoutName: workout.dayName || workout.planName,
          sets: match.sets
        });
      }
    });

    return sessions;
  }

  // --- PRs (Personal Records) ---
  getPRs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  recalculatePRs(history = this.getHistory()) {
    const prs = {};

    history.forEach(workout => {
      (workout.exercises || []).forEach(ex => {
        const exId = ex.exerciseId;
        if (!prs[exId]) {
          prs[exId] = {
            maxWeight: 0,
            maxRepsAtWeight: 0,
            estimated1RM: 0,
            highestSetVolume: 0,
            date: workout.date
          };
        }

        (ex.sets || []).forEach(s => {
          if (s.completed && s.weight > 0 && s.reps > 0) {
            const e1rm = estimate1RM(s.weight, s.reps);
            const setVol = s.weight * s.reps;

            if (s.weight > prs[exId].maxWeight) {
              prs[exId].maxWeight = s.weight;
              prs[exId].maxRepsAtWeight = s.reps;
              prs[exId].date = workout.date;
            }
            if (e1rm > prs[exId].estimated1RM) {
              prs[exId].estimated1RM = e1rm;
            }
            if (setVol > prs[exId].highestSetVolume) {
              prs[exId].highestSetVolume = setVol;
            }
          }
        });
      });
    });

    localStorage.setItem(STORAGE_KEYS.PRS, JSON.stringify(prs));
    return prs;
  }

  // --- Weight Baselines (เกณฑ์น้ำหนักพื้นฐานต่อท่า) ---
  getExerciseBaselines() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BASELINES);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  getExerciseBaseline(exerciseId) {
    return this.getExerciseBaselines()[exerciseId] || null;
  }

  saveExerciseBaselines(baselines) {
    localStorage.setItem(STORAGE_KEYS.BASELINES, JSON.stringify(baselines || {}));
  }

  // Upsert one or many baselines: { exerciseId, weight, reps, est1RM, source, anchorId }
  saveExerciseBaseline(entries) {
    const baselines = this.getExerciseBaselines();
    const list = Array.isArray(entries) ? entries : [entries];
    list.forEach(entry => {
      if (!entry || !entry.exerciseId) return;
      const previous = baselines[entry.exerciseId] || {};
      baselines[entry.exerciseId] = {
        ...previous,
        ...entry,
        updatedAt: new Date().toISOString()
      };
    });
    this.saveExerciseBaselines(baselines);
    return baselines;
  }

  // --- In-Progress Active Workout Draft ---
  getActiveWorkout() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveActiveWorkout(workout) {
    if (!workout) {
      this.clearActiveWorkout();
      return;
    }
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(workout));
  }

  clearActiveWorkout() {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
  }

  // --- Sample Data Seeding ---
  seedInitialSampleData() {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    const sampleWorkouts = [
      {
        id: 'sample_1',
        date: new Date(now - 4 * oneDay).toISOString(),
        planName: 'Push Pull Legs (PPL) - 3 วัน / สัปดาห์',
        dayName: 'วัน Push (อก, หัวไหล่, หลังแขน)',
        durationMinutes: 52,
        totalVolumeKg: 6420,
        exercises: [
          {
            exerciseId: 'barbell-bench-press',
            sets: [
              { setNum: 1, weight: 60, reps: 10, rpe: 7.5, completed: true },
              { setNum: 2, weight: 60, reps: 10, rpe: 8.0, completed: true },
              { setNum: 3, weight: 60, reps: 10, rpe: 8.0, completed: true },
              { setNum: 4, weight: 60, reps: 10, rpe: 8.5, completed: true }
            ]
          },
          {
            exerciseId: 'incline-dumbbell-press',
            sets: [
              { setNum: 1, weight: 22, reps: 10, rpe: 8.0, completed: true },
              { setNum: 2, weight: 22, reps: 10, rpe: 8.5, completed: true },
              { setNum: 3, weight: 22, reps: 9, rpe: 9.0, completed: true }
            ]
          },
          {
            exerciseId: 'overhead-shoulder-press',
            sets: [
              { setNum: 1, weight: 40, reps: 8, rpe: 8.0, completed: true },
              { setNum: 2, weight: 40, reps: 8, rpe: 8.5, completed: true },
              { setNum: 3, weight: 40, reps: 7, rpe: 9.0, completed: true }
            ]
          },
          {
            exerciseId: 'tricep-rope-pushdown',
            sets: [
              { setNum: 1, weight: 20, reps: 12, rpe: 8.0, completed: true },
              { setNum: 2, weight: 20, reps: 12, rpe: 8.5, completed: true },
              { setNum: 3, weight: 20, reps: 11, rpe: 9.0, completed: true }
            ]
          }
        ]
      },
      {
        id: 'sample_2',
        date: new Date(now - 2 * oneDay).toISOString(),
        planName: 'Push Pull Legs (PPL) - 3 วัน / สัปดาห์',
        dayName: 'วัน Pull (แผ่นหลัง, ปีก, หน้าแขน)',
        durationMinutes: 58,
        totalVolumeKg: 7850,
        exercises: [
          {
            exerciseId: 'barbell-deadlift',
            sets: [
              { setNum: 1, weight: 100, reps: 5, rpe: 7.5, completed: true },
              { setNum: 2, weight: 100, reps: 5, rpe: 8.0, completed: true },
              { setNum: 3, weight: 100, reps: 5, rpe: 8.0, completed: true }
            ]
          },
          {
            exerciseId: 'barbell-bent-over-row',
            sets: [
              { setNum: 1, weight: 60, reps: 8, rpe: 8.0, completed: true },
              { setNum: 2, weight: 60, reps: 8, rpe: 8.0, completed: true },
              { setNum: 3, weight: 60, reps: 8, rpe: 8.5, completed: true }
            ]
          },
          {
            exerciseId: 'lat-pulldown',
            sets: [
              { setNum: 1, weight: 50, reps: 10, rpe: 8.0, completed: true },
              { setNum: 2, weight: 50, reps: 10, rpe: 8.5, completed: true },
              { setNum: 3, weight: 50, reps: 10, rpe: 8.5, completed: true }
            ]
          },
          {
            exerciseId: 'barbell-bicep-curl',
            sets: [
              { setNum: 1, weight: 25, reps: 10, rpe: 8.0, completed: true },
              { setNum: 2, weight: 25, reps: 10, rpe: 8.5, completed: true },
              { setNum: 3, weight: 25, reps: 9, rpe: 9.0, completed: true }
            ]
          }
        ]
      }
    ];

    this.saveHistory(sampleWorkouts);
  }

  // --- Export & Import ---
  exportAllDataJSON() {
    const data = {
      profile: this.getProfile(),
      plans: this.getPlans(),
      history: this.getHistory(),
      prs: this.getPRs(),
      baselines: this.getExerciseBaselines(),
      exportDate: new Date().toISOString(),
      version: '1.1'
    };
    return JSON.stringify(data, null, 2);
  }

  importDataJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) this.saveProfile(data.profile);
      if (data.plans) this.savePlans(data.plans);
      if (data.history) this.saveHistory(data.history);
      if (data.baselines) this.saveExerciseBaselines(data.baselines);
      return { success: true, count: data.history ? data.history.length : 0 };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PLANS);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
    localStorage.removeItem(STORAGE_KEYS.PRS);
    localStorage.removeItem(STORAGE_KEYS.BASELINES);
    this.init();
  }
}

export const storage = new StorageService();
