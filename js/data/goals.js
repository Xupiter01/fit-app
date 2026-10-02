/**
 * Fit App - Goals Database & Configuration
 * Provides scientific rep ranges, rest times, intensity (%1RM), and progression rules
 */

export const FITNESS_GOALS = [
  {
    id: 'hypertrophy',
    name: 'สร้างกล้ามเนื้อ (Muscle Hypertrophy)',
    badge: 'เน้นขนาด & มิติกล้าม',
    icon: '💪',
    shortDesc: 'เพิ่มขนาดกล้ามเนื้อให้เต็ม แน่น และชัดเจน',
    repRange: '8 - 12 ครั้ง',
    minReps: 8,
    maxReps: 12,
    intensityPct: '65% - 75% 1RM',
    recommendedRest: 90, // seconds
    restDescription: '60 - 90 วินาที',
    rpeTarget: 8,
    progressionRule: 'Double Progression: เมื่อทำได้ 12 ครั้งครบทุกเซ็ตด้วยฟอร์มดี ให้เพิ่มน้ำหนัก +2.5 กก. (ท่าส่วนบน) หรือ +5.0 กก. (ท่าส่วนล่าง) ในรอบถัดไป',
    advice: [
      'ให้ความสำคัญกับจังหวะ Eccentric (ผ่อนน้ำหนักลง 2-3 วินาที) เพื่อสร้าง Micro-tear ในกล้ามเนื้อ',
      'ทานโปรตีนให้เพียงพอ 1.6 - 2.2 กรัมต่อน้ำหนักตัว (กก.) ต่อวัน',
      'นอนหลับพักผ่อนให้ได้ 7-9 ชั่วโมง เพราะกล้ามเนื้อเติบโตตอนพักผ่อน'
    ]
  },
  {
    id: 'strength',
    name: 'เพิ่มพละกำลัง (Max Strength & Power)',
    badge: 'เน้นความแข็งแกร่ง & ยกหนัก',
    icon: '⚡',
    shortDesc: 'พัฒนาระบบประสาทและความแข็งแกร่งในการยกน้ำหนักสูงสุด (1RM)',
    repRange: '3 - 6 ครั้ง',
    minReps: 3,
    maxReps: 6,
    intensityPct: '80% - 90% 1RM',
    recommendedRest: 180, // seconds
    restDescription: '2 - 3 นาที',
    rpeTarget: 8.5,
    progressionRule: 'Linear Strength Progression: เพิ่มน้ำหนักตามตาราง +2.5 กก. เมื่อพิชิตเซ็ตเป้าหมายได้ โดยพักให้เต็มที่ระหว่างเซ็ต',
    advice: [
      'วอร์มอัพข้อต่อและค่อยๆ ไต่ระดับน้ำหนัก (Warm-up sets) ก่อนเข้า Working Set หนักเสมอ',
      'ฝึกการเกร็งหน้าท้องเบ่งลม (Valsalva Maneuver) เพื่อปกป้องกระดูกสันหลัง',
      'พักระหว่างเซ็ต 2-3 นาทีขึ้นไปเพื่อให้ระบบ ATP-CP ฟื้นตัวเต็มร้อย'
    ]
  },
  {
    id: 'fat-loss',
    name: 'ลดไขมัน & กระชับสัดส่วน (Fat Loss & Conditioning)',
    badge: 'เน้นเบิร์น & หัวใจแข็งแรง',
    icon: '🔥',
    shortDesc: 'เร่งการเผาผลาญพลังงาน รักษากล้ามเนื้อ และเพิ่มความทนทานของหลอดเลือดหัวใจ',
    repRange: '12 - 15+ ครั้ง',
    minReps: 12,
    maxReps: 15,
    intensityPct: '55% - 65% 1RM',
    recommendedRest: 45, // seconds
    restDescription: '30 - 60 วินาที',
    rpeTarget: 7.5,
    progressionRule: 'Density Progression: รักษาน้ำหนักให้คงที่ ลดเวลาพัก หรือเพิ่มจำนวนครั้งให้แตะ 15 ครั้ง ก่อนปรับน้ำหนักขึ้นทีละน้อย',
    advice: [
      'ควบคุมเวลาพักให้กระชับ เพื่อรักษาอัตราการเต้นของหัวใจ (Heart Rate) ให้อยู่ในโซนเผาผลาญ',
      'ควบคู่กับภาวะ Caloric Deficit (รับพลังงานน้อยกว่าที่ใช้เล็กน้อย) อย่างมีคุณภาพ',
      'ดื่มน้ำให้เพียงพอระหว่างฝึกซ้อมเพื่อลดอาการเมื่อยล้า'
    ]
  },
  {
    id: 'beginner',
    name: 'ผู้เริ่มต้นฝึกซ้อม (Beginner Foundation)',
    badge: 'สร้างพื้นฐาน & ปลอดภัย',
    icon: '🌱',
    shortDesc: 'เรียนรู้ฟอร์มการเล่นที่ถูกต้อง ป้องกันการบาดเจ็บ และสร้างวินัยระยะยาว',
    repRange: '10 - 12 ครั้ง',
    minReps: 10,
    maxReps: 12,
    intensityPct: '50% - 60% 1RM',
    recommendedRest: 90, // seconds
    restDescription: '60 - 90 วินาที',
    rpeTarget: 7,
    progressionRule: 'Technique Mastery: อย่าเพิ่งรีบเพิ่มน้ำหนักจนกว่าจะควบคุมฟอร์มได้นิ่งสนิท 100% เพิ่มน้ำหนักช้าๆ ครั้งละ 1 - 2.5 กก.',
    advice: [
      'ส่องกระจกหรือตั้งกล้องอัดคลิปเพื่อตรวจเช็กฟอร์มตามเช็กลิสต์ในแอป',
      'หากเริ่มรู้สึกล้าจนฟอร์มแกว่ง ให้หยุดเซ็ตทันทีเพื่อความปลอดภัย',
      'ความสม่ำเสมอชนะทุกสิ่ง ฝึกซ้อมอย่างน้อย 3 วันต่อสัปดาห์'
    ]
  }
];

export function getGoalById(id) {
  return FITNESS_GOALS.find(g => g.id === id) || FITNESS_GOALS[0];
}
