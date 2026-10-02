/**
 * Fit App - Workout Plans & Templates
 * Includes Push Pull Legs (PPL) 3-Day, PPL 6-Day, Upper/Lower, and Full Body
 */

export const DEFAULT_PLANS = [
  {
    id: 'ppl-classic-3day',
    name: 'Push Pull Legs (PPL) - 3 วัน / สัปดาห์',
    badge: 'ยอดนิยมสำหรับทุกคน',
    description: 'โปรแกรมมาตรฐานระดับสากล แบ่งการฝึกตามลักษณะการเคลื่อนไหว (ดัน-ดึง-ขา) พักผ่อนเพียงพอ กล้ามเนื้อฟื้นตัวได้เต็มที่',
    frequency: '3 วันต่อสัปดาห์ (เช่น จันทร์-พุธ-ศุกร์)',
    days: [
      {
        id: 'ppl-push',
        name: 'วัน Push (อก, หัวไหล่, หลังแขน)',
        description: 'เน้นการผลักและดัน พัฒนากล้ามเนื้อด้านหน้าลำตัวส่วนบน',
        color: '#3b82f6', // blue
        exercises: [
          { exerciseId: 'barbell-bench-press', sets: 4, targetReps: '8-10', rpe: 8, restSec: 90 },
          { exerciseId: 'incline-dumbbell-press', sets: 3, targetReps: '10-12', rpe: 8, restSec: 75 },
          { exerciseId: 'overhead-shoulder-press', sets: 3, targetReps: '8-10', rpe: 8, restSec: 90 },
          { exerciseId: 'dumbbell-lateral-raise', sets: 4, targetReps: '12-15', rpe: 8.5, restSec: 60 },
          { exerciseId: 'tricep-rope-pushdown', sets: 3, targetReps: '10-12', rpe: 8.5, restSec: 60 },
          { exerciseId: 'cable-chest-fly', sets: 3, targetReps: '12-15', rpe: 9, restSec: 60 }
        ]
      },
      {
        id: 'ppl-pull',
        name: 'วัน Pull (แผ่นหลัง, ปีก, หน้าแขน)',
        description: 'เน้นการดึง พัฒนาความหนาและความกว้างของแผ่นหลังและลูกหนู',
        color: '#8b5cf6', // purple
        exercises: [
          { exerciseId: 'barbell-deadlift', sets: 3, targetReps: '5-6', rpe: 8, restSec: 150 },
          { exerciseId: 'barbell-bent-over-row', sets: 4, targetReps: '8-10', rpe: 8, restSec: 90 },
          { exerciseId: 'lat-pulldown', sets: 3, targetReps: '10-12', rpe: 8, restSec: 75 },
          { exerciseId: 'face-pull', sets: 4, targetReps: '12-15', rpe: 8.5, restSec: 60 },
          { exerciseId: 'barbell-bicep-curl', sets: 3, targetReps: '10-12', rpe: 8.5, restSec: 60 },
          { exerciseId: 'incline-hammer-curl', sets: 3, targetReps: '10-12', rpe: 8.5, restSec: 60 }
        ]
      },
      {
        id: 'ppl-legs',
        name: 'วัน Legs & Core (ขา, ก้น, น่อง, หน้าท้อง)',
        description: 'เน้นกล้ามเนื้อช่วงล่างทั้งหมดเพื่อการเผาผลาญสูงสุดและสรีระที่สมส่วน',
        color: '#10b981', // emerald
        exercises: [
          { exerciseId: 'barbell-back-squat', sets: 4, targetReps: '6-8', rpe: 8, restSec: 120 },
          { exerciseId: 'romanian-deadlift', sets: 3, targetReps: '8-10', rpe: 8, restSec: 90 },
          { exerciseId: 'leg-press', sets: 3, targetReps: '10-12', rpe: 8.5, restSec: 90 },
          { exerciseId: 'leg-extension', sets: 3, targetReps: '12-15', rpe: 9, restSec: 60 },
          { exerciseId: 'seated-or-standing-calf-raise', sets: 4, targetReps: '15-20', rpe: 9, restSec: 60 },
          { exerciseId: 'hanging-leg-raise', sets: 3, targetReps: '12-15', rpe: 8.5, restSec: 60 }
        ]
      }
    ]
  },
  {
    id: 'ppl-hypertrophy-6day',
    name: 'Push Pull Legs (PPL) - 6 วัน (Hypertrophy Pro)',
    badge: 'สำหรับผู้มีประสบการณ์',
    description: 'ฝึกวน Push-Pull-Legs สองรอบต่อสัปดาห์ โดนกล้ามเนื้อ 2 ครั้ง/สัปดาห์ (Frequency 2x) เร่งการสร้างกล้ามเนื้อแบบติดสปีด',
    frequency: '6 วันต่อสัปดาห์ (Push-Pull-Legs-Push-Pull-Legs-Rest)',
    days: [
      {
        id: 'ppl6-push-a',
        name: 'Push A (Heavy Strength Focus)',
        description: 'เน้นความแข็งแรงด้วย Barbell Bench Press หนัก และ OHP',
        color: '#3b82f6',
        exercises: [
          { exerciseId: 'barbell-bench-press', sets: 4, targetReps: '5-6', rpe: 8.5, restSec: 120 },
          { exerciseId: 'overhead-shoulder-press', sets: 3, targetReps: '6-8', rpe: 8, restSec: 90 },
          { exerciseId: 'incline-dumbbell-press', sets: 3, targetReps: '8-10', rpe: 8, restSec: 90 },
          { exerciseId: 'dumbbell-lateral-raise', sets: 4, targetReps: '12-15', rpe: 8.5, restSec: 60 },
          { exerciseId: 'tricep-rope-pushdown', sets: 4, targetReps: '10-12', rpe: 8.5, restSec: 60 }
        ]
      },
      {
        id: 'ppl6-pull-a',
        name: 'Pull A (Deadlift & Upper Back)',
        description: 'เน้น Deadlift และ Barbell Row สำหรับความหนาของแผ่นหลัง',
        color: '#8b5cf6',
        exercises: [
          { exerciseId: 'barbell-deadlift', sets: 3, targetReps: '5', rpe: 8.5, restSec: 180 },
          { exerciseId: 'barbell-bent-over-row', sets: 4, targetReps: '6-8', rpe: 8, restSec: 90 },
          { exerciseId: 'lat-pulldown', sets: 3, targetReps: '10-12', rpe: 8, restSec: 75 },
          { exerciseId: 'face-pull', sets: 4, targetReps: '12-15', rpe: 8.5, restSec: 60 },
          { exerciseId: 'barbell-bicep-curl', sets: 3, targetReps: '8-10', rpe: 8.5, restSec: 60 }
        ]
      },
      {
        id: 'ppl6-legs-a',
        name: 'Legs A (Heavy Squat Focus)',
        description: 'เน้นการสควอทหนักพัฒนาหน้าขาและความแข็งแกร่งช่วงล่าง',
        color: '#10b981',
        exercises: [
          { exerciseId: 'barbell-back-squat', sets: 4, targetReps: '5-6', rpe: 8.5, restSec: 150 },
          { exerciseId: 'romanian-deadlift', sets: 3, targetReps: '8-10', rpe: 8, restSec: 90 },
          { exerciseId: 'leg-press', sets: 3, targetReps: '10-12', rpe: 8, restSec: 90 },
          { exerciseId: 'seated-or-standing-calf-raise', sets: 4, targetReps: '12-15', rpe: 9, restSec: 60 },
          { exerciseId: 'hanging-leg-raise', sets: 3, targetReps: '12-15', rpe: 8.5, restSec: 60 }
        ]
      },
      {
        id: 'ppl6-push-b',
        name: 'Push B (Incline & Pump Focus)',
        description: 'เน้นกล้ามอกบน มิติหัวไหล่ และการปั๊มกล้ามเนื้อ',
        color: '#0ea5e9',
        exercises: [
          { exerciseId: 'incline-dumbbell-press', sets: 4, targetReps: '8-10', rpe: 8, restSec: 90 },
          { exerciseId: 'cable-chest-fly', sets: 4, targetReps: '12-15', rpe: 8.5, restSec: 60 },
          { exerciseId: 'overhead-shoulder-press', sets: 3, targetReps: '10-12', rpe: 8, restSec: 75 },
          { exerciseId: 'dumbbell-lateral-raise', sets: 4, targetReps: '15-20', rpe: 9, restSec: 45 },
          { exerciseId: 'tricep-rope-pushdown', sets: 4, targetReps: '12-15', rpe: 9, restSec: 60 }
        ]
      },
      {
        id: 'ppl6-pull-b',
        name: 'Pull B (Lats Width & Biceps Pump)',
        description: 'เน้นปีกหลังให้กว้าง วีเชป และลูกหนูหน้าแขน',
        color: '#a855f7',
        exercises: [
          { exerciseId: 'lat-pulldown', sets: 4, targetReps: '8-10', rpe: 8, restSec: 75 },
          { exerciseId: 'barbell-bent-over-row', sets: 3, targetReps: '10-12', rpe: 8, restSec: 75 },
          { exerciseId: 'face-pull', sets: 4, targetReps: '15-20', rpe: 8.5, restSec: 60 },
          { exerciseId: 'incline-hammer-curl', sets: 4, targetReps: '10-12', rpe: 8.5, restSec: 60 },
          { exerciseId: 'barbell-bicep-curl', sets: 3, targetReps: '12-15', rpe: 9, restSec: 60 }
        ]
      },
      {
        id: 'ppl6-legs-b',
        name: 'Legs B (Hamstrings & Volume)',
        description: 'เน้นกล้ามเนื้อหลังขา บั้นท้าย และความคมชัดของขา',
        color: '#059669',
        exercises: [
          { exerciseId: 'romanian-deadlift', sets: 4, targetReps: '8-10', rpe: 8, restSec: 90 },
          { exerciseId: 'leg-press', sets: 4, targetReps: '12-15', rpe: 8.5, restSec: 75 },
          { exerciseId: 'leg-extension', sets: 4, targetReps: '12-15', rpe: 9, restSec: 60 },
          { exerciseId: 'seated-or-standing-calf-raise', sets: 4, targetReps: '15-20', rpe: 9, restSec: 45 },
          { exerciseId: 'hanging-leg-raise', sets: 4, targetReps: '15-20', rpe: 8.5, restSec: 60 }
        ]
      }
    ]
  },
  {
    id: 'upper-lower-4day',
    name: 'Upper / Lower Split - 4 วัน',
    badge: 'บาลานซ์ยอดเยี่ยม',
    description: 'แบ่งร่างกายเป็นท่อนบน (Upper) และท่อนล่าง (Lower) เหมาะอย่างยิ่งสำหรับผู้ที่ต้องการความสมดุลระหว่างผลลัพธ์และเวลาพัก',
    frequency: '4 วันต่อสัปดาห์ (Upper A, Lower A, พัก, Upper B, Lower B, พัก, พัก)',
    days: [
      {
        id: 'ul-upper-a',
        name: 'Upper Body A',
        description: 'อก หลัง ไหล่ แขน',
        color: '#3b82f6',
        exercises: [
          { exerciseId: 'barbell-bench-press', sets: 4, targetReps: '6-8', rpe: 8, restSec: 90 },
          { exerciseId: 'barbell-bent-over-row', sets: 4, targetReps: '6-8', rpe: 8, restSec: 90 },
          { exerciseId: 'overhead-shoulder-press', sets: 3, targetReps: '8-10', rpe: 8, restSec: 75 },
          { exerciseId: 'lat-pulldown', sets: 3, targetReps: '10-12', rpe: 8, restSec: 75 },
          { exerciseId: 'tricep-rope-pushdown', sets: 3, targetReps: '10-12', rpe: 8.5, restSec: 60 },
          { exerciseId: 'barbell-bicep-curl', sets: 3, targetReps: '10-12', rpe: 8.5, restSec: 60 }
        ]
      },
      {
        id: 'ul-lower-a',
        name: 'Lower Body A',
        description: 'สควอท ขา ก้น น่อง แกนกลาง',
        color: '#10b981',
        exercises: [
          { exerciseId: 'barbell-back-squat', sets: 4, targetReps: '6-8', rpe: 8, restSec: 120 },
          { exerciseId: 'romanian-deadlift', sets: 3, targetReps: '8-10', rpe: 8, restSec: 90 },
          { exerciseId: 'leg-press', sets: 3, targetReps: '10-12', rpe: 8, restSec: 75 },
          { exerciseId: 'seated-or-standing-calf-raise', sets: 4, targetReps: '12-15', rpe: 8.5, restSec: 60 },
          { exerciseId: 'hanging-leg-raise', sets: 3, targetReps: '12-15', rpe: 8, restSec: 60 }
        ]
      }
    ]
  }
];

export function getPlanById(id) {
  return DEFAULT_PLANS.find(p => p.id === id);
}
