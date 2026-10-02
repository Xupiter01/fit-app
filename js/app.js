/**
 * Fit App - Main Application Controller
 * Coordinates views, navigation, workout flow, and global UI state
 */

import { storage } from './services/storage.js';
import { PlansView } from './views/plansView.js';
import { WorkoutView } from './views/workoutView.js';
import { ExercisesView } from './views/exercisesView.js';
import { GoalsView } from './views/goalsView.js';
import { HistoryView } from './views/historyView.js';

class FitApp {
  constructor() {
    this.currentTab = 'plans';
    this.views = {};
  }

  init() {
    // Instantiate Views
    this.views.exercises = new ExercisesView('view-exercises');

    this.views.plans = new PlansView('view-plans', (plan, day) => {
      this.startWorkoutFromPlan(plan, day);
    });

    this.views.workout = new WorkoutView(
      'view-workout',
      () => {
        // When workout is finished, switch to history tab
        this.switchTab('history');
      },
      (exerciseId) => {
        // Open exercise detail modal
        this.views.exercises.openExerciseModal(exerciseId);
      }
    );

    this.views.goals = new GoalsView('view-goals', (newGoalId) => {
      this.onGoalUpdated(newGoalId);
    });

    this.views.history = new HistoryView('view-history');

    // Bind Navigation Bar tabs (Top desktop & Bottom mobile)
    this.bindNavigation();

    // Check for draft active workout
    const activeWorkout = storage.getActiveWorkout();
    if (activeWorkout) {
      this.views.workout.resumeSession(activeWorkout);
      this.showResumeBanner();
    }

    // Initial render of default view
    this.switchTab('plans');
  }

  bindNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn, .bottom-nav-item');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    // Update active nav button state
    document.querySelectorAll('.nav-btn, .bottom-nav-item').forEach(btn => {
      if (btn.dataset.tab === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Hide all view containers, show target view container
    document.querySelectorAll('.app-view').forEach(viewEl => {
      viewEl.classList.add('hidden');
    });

    const targetEl = document.getElementById(`view-${tabName}`);
    if (targetEl) {
      targetEl.classList.remove('hidden');
    }

    // Re-render target view to reflect latest state
    if (this.views[tabName] && typeof this.views[tabName].render === 'function') {
      this.views[tabName].render();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  startWorkoutFromPlan(plan, day) {
    this.switchTab('workout');
    this.views.workout.startSession(plan, day);
  }

  onGoalUpdated(newGoalId) {
    // Rerender plans and other views if needed
    if (this.views.plans) this.views.plans.render();
  }

  showResumeBanner() {
    const banner = document.getElementById('resumeWorkoutBanner');
    if (banner) {
      banner.classList.remove('hidden');
      const resumeBtn = document.getElementById('resumeBtn');
      if (resumeBtn) {
        resumeBtn.onclick = () => {
          banner.classList.add('hidden');
          this.switchTab('workout');
        };
      }
    }
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.fitApp = new FitApp();
  window.fitApp.init();
});
