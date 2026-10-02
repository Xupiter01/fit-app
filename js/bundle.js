/**
 * Fit App - Universal Standalone Bundle (v2.0)
 * Integrated with Open Exercise Database (free-exercise-db)
 * Real high-definition athlete motion photos, animation player, and interactive plan links
 */

(function () {
  'use strict';

  const BASE_IMG_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

  // ==========================================
  // 1. DATA: EXERCISES WITH REAL OPEN API IMAGES
  // ==========================================
  const EXERCISES = [
    // PUSH
    {
      id: 'barbell-bench-press',
      nameTh: 'บาร์เบล เบนช์เพรส (Barbell Bench Press)',
      nameEn: 'Barbell Bench Press',
      category: 'push',
      type: 'compound',
      primaryMuscles: ['หน้าอก (Pectoralis Major)', 'อกกลาง'],
      secondaryMuscles: ['หัวไหล่หน้า (Anterior Deltoid)', 'หลังแขน (Triceps)'],
      equipment: 'บาร์เบล + ม้านั่งราบ',
      difficulty: 'ปานกลาง',
      svgType: 'bench-press',
      images: [
        BASE_IMG_URL + 'Barbell_Bench_Press_-_Medium_Grip/0.jpg',
        BASE_IMG_URL + 'Barbell_Bench_Press_-_Medium_Grip/1.jpg'
      ],
      description: 'ท่ายอดนิยมราชาแห่งการฝึกกล้ามเนื้อหน้าอก ช่วยสร้างมวลกล้ามเนื้อและความแข็งแรงของช่วงบนอย่างสมบูรณ์แบบ',
      technique: {
        setup: [
          'นอนราบบนเบาะ ให้สายตาอยู่ตรงแนวเดียวกับบาร์เบล',
          'วางเท้าทั้งสองข้างราบสนิทกับพื้นอย่างมั่นคง ไม่ลอยเท้า',
          'หนีบสะบักเข้าหากัน (Retract Scapula) และกดไหล่ลง ดันอกขึ้นเล็กน้อย (Natural Arch)',
          'จับบาร์กว้างกว่าช่วงหัวไหล่เล็กน้อย นิ้วโป้งกำรอบบาร์อย่างปลอดภัย'
        ],
        execution: [
          'ปลดบาร์เบลออกจากแร็ค ค้างไว้เหนือช่วงอกตรงๆ แขนเหยียดตรงแต่ไม่ล็อกข้อศอก',
          'สูดลมหายใจเข้า เกร็งหน้าท้อง ค่อยๆ ลดบาร์ลงมาสัมผัสบริเวณกึ่งกลางหน้าอก (ระดับหัวนม)',
          'มุมข้อศอกควรกางทำมุมประมาณ 45-75 องศากับลำตัว (ไม่กาง 90 องศาเด็ดขาด)',
          'ดันบาร์กลับขึ้นด้านบนตามแนวโค้งเล็กน้อย พร้อมพ่นลมหายใจออกช้าๆ บีบอกที่จุดสูงสุด'
        ],
        breathing: 'สูดลมหายใจเข้าลึกๆ ตอนลดบาร์ลง (Eccentric) และพ่นลมหายใจออกตอนดันบาร์ขึ้น (Concentric)'
      },
      commonMistakes: [
        'กางศอกออก 90 องศา (เสี่ยงบาดเจ็บเอ็นหัวไหล่อย่างมาก)',
        'ปล่อยให้ข้อมือพับไปข้างหลัง ให้บาร์กดลงบนอุ้งมือตรงแนวกระดูกแขน',
        'เด้งบาร์ออกจากหน้าอกโดยใช้แรงส่งแทนการควบคุมกล้ามเนื้อ',
        'ยกสะโพกลอยขึ้นจากเบาะ'
      ],
      proTips: [
        'Leg Drive: กดปลายเท้าและส้นเท้าลงพื้นขณะดันขึ้นเพื่อสร้างแรงส่งจากพื้นดิน',
        'จินตนาการว่ากำลังพยายาม "หักบาร์" จะช่วยเปิดการทำงานของ Lats และรักษาตำแหน่งหัวไหล่ให้เสถียร'
      ]
    },
    {
      id: 'incline-dumbbell-press',
      nameTh: 'อินไคลน์ ดัมเบลล์เพรส (Incline Dumbbell Press)',
      nameEn: 'Incline Dumbbell Press',
      category: 'push',
      type: 'compound',
      primaryMuscles: ['อกบน (Clavicular Pectoralis)'],
      secondaryMuscles: ['หัวไหล่หน้า (Anterior Deltoid)', 'หลังแขน (Triceps)'],
      equipment: 'ดัมเบลล์ + ม้านั่งปรับเอียง (30-45 องศา)',
      difficulty: 'ปานกลาง',
      svgType: 'incline-press',
      images: [
        BASE_IMG_URL + 'Incline_Dumbbell_Press/0.jpg',
        BASE_IMG_URL + 'Incline_Dumbbell_Press/1.jpg'
      ],
      description: 'เน้นโฟกัสกล้ามเนื้อหน้าอกส่วนบนให้เต็มและหนาขึ้น ช่วยเสริมมิติให้หน้าอกดูสง่างาม',
      technique: {
        setup: [
          'ปรับม้านั่งเอียงประมาณ 30-45 องศา (ไม่ควรเกิน 45 องศาเพราะจะโดนหัวไหล่มากกว่าอก)',
          'นั่งลง ใช้เข่าช่วยดันดัมเบลล์ขึ้นมาในระดับอกบนทีละข้าง',
          'หนีบสะบักเข้าหากัน เปิดอก เท้าวางราบกับพื้น'
        ],
        execution: [
          'ดันดัมเบลล์ขึ้นตรงๆ เหนืออกบน ให้ดัมเบลล์เคลื่อนที่เข้าหากันเป็นรูปสามเหลี่ยมแต่ไม่ชนกัน',
          'ค่อยๆ ลดระดับดัมเบลล์ลงมาช้าๆ ประมาณ 2-3 วินาที จนรู้สึกตึงที่กล้ามเนื้ออกบน',
          'เกร็งกล้ามเนื้ออกบนแล้วดันดัมเบลล์ขึ้นด้านบนพร้อมเกร็งบีบอก'
        ],
        breathing: 'หายใจเข้าช้าๆ ขณะลดน้ำหนักลง หายใจออกอย่างมีพลังขณะดันดัมเบลล์ขึ้น'
      },
      commonMistakes: [
        'ปรับเบาะเอียงชันเกินไป (60 องศาขึ้นไป) ทำให้น้ำหนักตกที่ไหล่หน้าแทนอกบน',
        'ปล่อยให้ดัมเบลล์กระแทกกันที่จุดสูงสุด ทำให้สูญเสียความตึงเครียดของกล้ามเนื้อ (Tension)'
      ],
      proTips: [
        'ให้มุมของฝ่ามือเฉียงเข้าหากันเล็กน้อย 45 องศา จะช่วยลดแรงกดทับที่ข้อต่อหัวไหล่ได้อย่างดีเยี่ยม'
      ]
    },
    {
      id: 'overhead-shoulder-press',
      nameTh: 'โอเวอร์เฮด เพรส (Overhead Barbell/Dumbbell Press)',
      nameEn: 'Overhead Press (OHP)',
      category: 'push',
      type: 'compound',
      primaryMuscles: ['หัวไหล่หน้า (Anterior Deltoid)', 'หัวไหล่กลาง (Lateral Deltoid)'],
      secondaryMuscles: ['หลังแขน (Triceps)', 'แกนกลางลำตัว (Core)', 'สะบักบน (Trapezius)'],
      equipment: 'บาร์เบล หรือ ดัมเบลล์',
      difficulty: 'ปานกลาง - ขั้นสูง',
      svgType: 'overhead-press',
      images: [
        BASE_IMG_URL + 'Standing_Military_Press/0.jpg',
        BASE_IMG_URL + 'Standing_Military_Press/1.jpg'
      ],
      description: 'การฝึกความแข็งแรงของหัวไหล่และแกนกลางลำตัวแบบบรูทฟอร์ซ ช่วยให้หัวไหล่กว้างและหนา',
      technique: {
        setup: [
          'ยืนกางเท้ากว้างเท่าหัวไหล่ เกร็งก้นและแกนกลางลำตัวให้แน่น',
          'จับบาร์กว้างกว่าหัวไหล่เล็กน้อย บาร์วางพักอยู่ระดับกระดูกไหปลาร้า ข้อศอกชี้ไปข้างหน้าเล็กน้อย'
        ],
        execution: [
          'เอนศีรษะไปข้างหลังเล็กน้อยเพื่อเปิดทางให้บาร์ ดันบาร์ขึ้นเป็นเส้นตรงตรงดิ่งสู่เพดาน',
          'เมื่อบาร์ผ่านศีรษะ ให้เลื่อนศีรษะกลับมาตรงกลาง ดันบาร์ล็อกที่จุดสูงสุดเหนือกระหม่อม',
          'ค่อยๆ ลดบาร์ลงมาช้าๆ สู่จุดเริ่มต้นอย่างมีสมาธิ'
        ],
        breathing: 'สูดลมหายใจเบ่งหน้าท้องให้แน่นก่อนดัน (Bracing) พ่นลมหายใจออกเมื่อผ่านจุดติดขัด (Sticking point)'
      },
      commonMistakes: [
        'แอ่นหลังล่างเพื่อชดเชยน้ำหนักที่หนักเกินไป (อันตรายต่อหมอนรองกระดูกสันหลัง)',
        'ข้อศอกแบะไปด้านหลังขณะดันขึ้น'
      ],
      proTips: [
        'เกร็งกล้ามเนื้อก้น (Glutes) และหน้าท้องให้แน่นตลอดการเคลื่อนไหวเพื่อสร้างฐานที่มั่นคงดุจหินผา'
      ]
    },
    {
      id: 'dumbbell-lateral-raise',
      nameTh: 'ดัมเบลล์ ลาเทอรัลเรส (Dumbbell Lateral Raise)',
      nameEn: 'Dumbbell Lateral Raise',
      category: 'push',
      type: 'isolation',
      primaryMuscles: ['หัวไหล่ข้าง (Lateral Deltoid)'],
      secondaryMuscles: ['สะบักบน (Upper Trapezius)'],
      equipment: 'ดัมเบลล์',
      difficulty: 'เริ่มต้น',
      svgType: 'lateral-raise',
      images: [
        BASE_IMG_URL + 'Side_Lateral_Raise/0.jpg',
        BASE_IMG_URL + 'Side_Lateral_Raise/1.jpg'
      ],
      description: 'ท่าเอกลักษณ์ในการขยายมิติหัวไหล่ให้กว้างเป็นทรงลูกมะพร้าว (V-Taper Look)',
      technique: {
        setup: [
          'ยืนตรง เท้ากว้างเท่าสะโพก ถือดัมเบลล์ไว้ข้างลำตัว งอข้อศอกเล็กน้อยคงที่',
          'โน้มลำตัวไปข้างหน้าเล็กน้อยประมาณ 10-15 องศา เพื่อจัดแนวมัดกล้ามเนื้อไหล่ข้างให้อยู่ในระนาบแรงดึง'
        ],
        execution: [
          'กางแขนขึ้นด้านข้างในระนาบ Scaption (เยื้องไปข้างหน้า 15-20 องศา)',
          'ยกขึ้นจนระดับข้อศอกสูงเสมอหัวไหล่ จินตนาการว่ากำลังเทน้ำออกจากเหยือก',
          'ค้างไว้เสี้ยววินาที แล้วลดดัมเบลล์ลงมาช้าๆ ต้านแรงโน้มถ่วง'
        ],
        breathing: 'หายใจออกตอนยกดัมเบลล์ขึ้น หายใจเข้าตอนค่อยๆ ลดลง'
      },
      commonMistakes: [
        'ใช้แรงเหวี่ยงจากสะโพกหรือหลัง (Ego Lifting)',
        'ยักไหล่ขึ้นหาคอ ทำให้แรงไปโดนกล้ามเนื้อสะบัก (Traps) แทนไหล่ข้าง'
      ],
      proTips: [
        'คิดเสมอว่า "ดันข้อศอกออกไปหาผนังด้านข้าง" ไม่ใช่แค่การยกมือขึ้น'
      ]
    },
    {
      id: 'tricep-rope-pushdown',
      nameTh: 'ไตรเซป โรป พุชดาวน์ (Tricep Rope Pushdown)',
      nameEn: 'Tricep Rope Pushdown',
      category: 'push',
      type: 'isolation',
      primaryMuscles: ['หลังแขน (Triceps Lateral & Medial Head)'],
      secondaryMuscles: ['กล้ามเนื้อท่อนแขน (Forearms)'],
      equipment: 'สายเคเบิล + เชือก (Rope Attachment)',
      difficulty: 'เริ่มต้น',
      svgType: 'tricep-pushdown',
      images: [
        BASE_IMG_URL + 'Triceps_Pushdown_-_Rope_Attachment/0.jpg',
        BASE_IMG_URL + 'Triceps_Pushdown_-_Rope_Attachment/1.jpg'
      ],
      description: 'เน้นเสริมความคมชัดและมวลของกล้ามเนื้อหลังแขนด้านข้างให้เห็นเป็นรูปเกือกม้า',
      technique: {
        setup: [
          'ติดสายเชือกที่รอกบน ยืนก้าวเท้าหรือเท้าคู่ โน้มตัวไปข้างหน้าเล็กน้อย',
          'หนีบข้อศอกแนบข้างลำตัว ล็อกข้อศอกให้อยู่กับที่ ไม่เลื่อนไปข้างหน้าหรือหลัง'
        ],
        execution: [
          'ออกแรงกดเชือกลงมาตรงๆ จนแขนเหยียดตึง',
          'ที่จุดล่างสุด ให้กางปลายเชือกออกจากกันเล็กน้อยเพื่อบีบกล้ามเนื้อหลังแขนให้หดตัวสูงสุด',
          'ค่อยๆ ผ่อนแขนกลับขึ้นมาจนข้อศอกทำมุมประมาณ 90 องศา'
        ],
        breathing: 'หายใจออกเมื่อดันเชือกลง หายใจเข้าเมื่อผ่อนเชือกกลับขึ้น'
      },
      commonMistakes: [
        'ขยับข้อศอกไปมาตามสายเคเบิล ทำให้ใช้แรงจากหัวไหล่เข้ามาช่วย',
        'ใช้ลำตัวกดทับน้ำหนัก'
      ],
      proTips: [
        'ล็อกข้อศอกให้เป็นเสมือน "บานพับประตู" ที่หมุนได้เพียงแกนเดียว'
      ]
    },
    {
      id: 'cable-chest-fly',
      nameTh: 'เคเบิล เชสต์ฟลาย (Cable Chest Fly)',
      nameEn: 'Cable Chest Fly',
      category: 'push',
      type: 'isolation',
      primaryMuscles: ['อกกลางและอกใน (Inner / Sternal Pectoralis)'],
      secondaryMuscles: ['หัวไหล่หน้า (Anterior Deltoid)'],
      equipment: 'เครื่องเคเบิลครอสโอเวอร์ (Cable Crossover)',
      difficulty: 'เริ่มต้น - ปานกลาง',
      svgType: 'chest-fly',
      images: [
        BASE_IMG_URL + 'Cable_Crossover/0.jpg',
        BASE_IMG_URL + 'Cable_Crossover/1.jpg'
      ],
      description: 'ให้แรงตึงกล้ามเนื้อคงที่ตลอดการเคลื่อนไหว ยืดอกได้กว้างและบีบอกได้ลึกสุดขีด',
      technique: {
        setup: [
          'ปรับรอกเคเบิลระดับกลางหรืออก ก้าวขาข้างหนึ่งไปข้างหน้าเพื่อทรงตัว',
          'จับมือจับ กางแขนออก งอข้อศอกเล็กน้อยคงที่ ยืดหน้าอกรับแรงตึง'
        ],
        execution: [
          'โอบแขนเข้าหากันเหมือนกำลัง "กอดต้นไม้ใหญ่"',
          'บีบหน้าอกเข้าหากันที่จุดกึ่งกลาง ค้างไว้ 1 วินาที',
          'ค่อยๆ ผ่อนแขนเปิดออกช้าๆ จนรู้สึกตึงเต็มที่ที่หน้าอก'
        ],
        breathing: 'หายใจออกตอนบีบอกเข้าหากัน หายใจเข้าตอนกางแขนออก'
      },
      commonMistakes: [
        'งอและยืดข้อศอกเหมือนท่าเพรส ให้รักษามุมงอข้อศอกคงที่ตลอดท่า'
      ],
      proTips: [
        'เน้นแตะข้อศอกเข้าหากันในมโนภาพ จะทำให้หน้าอกหดตัวได้ลึกกว่าการแค่ให้มือแตะกัน'
      ]
    },

    // PULL
    {
      id: 'barbell-deadlift',
      nameTh: 'บาร์เบล เดดลิฟต์ (Barbell Conventional Deadlift)',
      nameEn: 'Barbell Deadlift',
      category: 'pull',
      type: 'compound',
      primaryMuscles: ['หลังส่วนล่าง (Erector Spinae)', 'ก้น (Gluteus Maximus)', 'หลังขา (Hamstrings)'],
      secondaryMuscles: ['ปีกหลัง (Latissimus Dorsi)', 'สะบัก (Traps)', 'แกนกลาง (Core)', 'แรงบีบมือ (Grip)'],
      equipment: 'บาร์เบล + แผ่นน้ำหนักโอลิมปิก',
      difficulty: 'ขั้นสูง',
      svgType: 'deadlift',
      images: [
        BASE_IMG_URL + 'Barbell_Deadlift/0.jpg',
        BASE_IMG_URL + 'Barbell_Deadlift/1.jpg'
      ],
      description: 'สุดยอดการทดสอบพลังกำลังทั้งตัว พัฒนา Posterior Chain ทั้งระบบและเพิ่มความแข็งแกร่งของกระดูกสันหลัง',
      technique: {
        setup: [
          'ยืนกางเท้ากว้างเท่าสะโพก บาร์เบลอยู่เหนือกึ่งกลางเท้า (Mid-foot ห่างหน้าแข้งประมาณ 1 นิ้ว)',
          'พับสะโพกไปข้างหลัง ย่อเข่าลงจับบาร์ มืออยู่นอกแนวหัวเข่าเล็กน้อย',
          'ดึงสะบักลง (Engage Lats) เปิดอกขึ้น ให้หลังตรงเป็นเส้นตรงธรรมชาติ',
          'ดึง Slack ออกจากบาร์จนได้ยินเสียงกริ๊กเบาๆ ก่อนเริ่มยก'
        ],
        execution: [
          'ถีบพื้นลงไปเหมือนกำลังดันโลกออกจากตัวด้วยแรงจากต้นขาและก้น',
          'เมื่อบาร์ผ่านระดับหัวเข่า ให้ดันสะโพกไปข้างหน้าและบีบก้นเพื่อล็อกท่าในท่ายืนตรง',
          'ลดน้ำหนักลงโดยการพับสะโพกไปข้างหลังก่อน แล้วค่อยงอเข่าเมื่อบาร์พ้นหัวเข่า'
        ],
        breathing: 'สูดลมหายใจเข้าลึก บล็อกหน้าท้องแน่นหนา (Valsalva Maneuver) ก่อนยก แล้วปล่อยลมออกเมื่อยืนตรง'
      },
      commonMistakes: [
        'หลังโก่งงอ (Cat Back) อันตรายอย่างยิ่งต่อกระดูกสันหลัง',
        'บาร์อยู่ห่างจากลำตัวมากเกินไป บาร์ควรเคลื่อนที่ชิดหน้าแข้งและต้นขาตลอดเวลา',
        'แอ่นหลังไปข้างหลังมากเกินไปที่จุดล็อก'
      ],
      proTips: [
        'จินตนาการว่ากำลัง "หนีบส้มโอไว้ใต้รักแร้" เพื่อเปิดการทำงานของกล้ามเนื้อปีกหลัง (Lats) ป้องกันกระดูกสันหลัง'
      ]
    },
    {
      id: 'barbell-bent-over-row',
      nameTh: 'บาร์เบล โรว์ (Barbell Bent-Over Row)',
      nameEn: 'Barbell Bent-Over Row',
      category: 'pull',
      type: 'compound',
      primaryMuscles: ['หลังส่วนกลาง (Rhomboids)', 'ปีกหลัง (Latissimus Dorsi)'],
      secondaryMuscles: ['กล้ามเนื้อหลังส่วนล่าง', 'หน้าแขน (Biceps)', 'หัวไหล่หลัง (Rear Deltoid)'],
      equipment: 'บาร์เบล',
      difficulty: 'ปานกลาง - ขั้นสูง',
      svgType: 'bent-row',
      images: [
        BASE_IMG_URL + 'Bent_Over_Barbell_Row/0.jpg',
        BASE_IMG_URL + 'Bent_Over_Barbell_Row/1.jpg'
      ],
      description: 'สร้างความหนาและลวดลายของกล้ามเนื้อแผ่นหลังอย่างทรงพลัง เสริมสร้างท่าทางและบุคลิกภาพ',
      technique: {
        setup: [
          'ยืนถือบาร์เบล กว้างเท่าหัวไหล่ พับสะโพกไปข้างหลัง ลำตัวทำมุมประมาณ 45 องศากับพื้น',
          'หลังตรงตลอดแนว คอเป็นแนวเดียวกับกระดูกสันหลัง เข่างอเล็กน้อย'
        ],
        execution: [
          'ดึงบาร์เข้าหาบริเวณสะดือหรือหน้าท้องส่วนล่าง โดยนำด้วยข้อศอก',
          'บีบสะบักเข้าหากันที่จุดบนสุด ค้างไว้ 1 วินาที',
          'ค่อยๆ ผ่อนบาร์ลงมาจนแขนเหยียดสุด รู้สึกถึงการยืดตัวของกล้ามเนื้อหลัง'
        ],
        breathing: 'หายใจออกขณะดึงบาร์ขึ้น หายใจเข้าขณะผ่อนบาร์ลง'
      },
      commonMistakes: [
        'ใช้แรงเหวี่ยงจากลำตัวขึ้นลงเพื่อช่วยยกน้ำหนัก',
        'ดึงเข้าหาหน้าอกบนแทนสะดือ (ทำให้โดนหัวไหล่มากกว่าแผ่นหลัง)'
      ],
      proTips: [
        'โฟกัสที่การ "ดึงข้อศอกไปข้างหลังลำตัว" ยิ่งดึงศอกไปลึกเท่าไหร่ หลังยิ่งหดตัวได้สมบูรณ์เท่านั้น'
      ]
    },
    {
      id: 'lat-pulldown',
      nameTh: 'แลท พูลดาวน์ (Lat Pulldown)',
      nameEn: 'Lat Pulldown',
      category: 'pull',
      type: 'compound',
      primaryMuscles: ['ปีกหลัง (Latissimus Dorsi)'],
      secondaryMuscles: ['หน้าแขน (Biceps)', 'หลังส่วนบน (Teres Major, Rhomboids)'],
      equipment: 'เครื่องเคเบิล Lat Pulldown',
      difficulty: 'เริ่มต้น - ปานกลาง',
      svgType: 'lat-pulldown',
      images: [
        BASE_IMG_URL + 'Wide-Grip_Lat_Pulldown/0.jpg',
        BASE_IMG_URL + 'Wide-Grip_Lat_Pulldown/1.jpg'
      ],
      description: 'เสริมสร้างปีกหลังให้กว้าง ขยายสรีระให้เป็นรูปตัว V (V-Taper) ควบคุมการโฟกัสได้ง่าย',
      technique: {
        setup: [
          'ปรับเบาะล็อกต้นขาให้กระชับพอดี ไม่ให้ตัวลอย',
          'จับบาร์กว้างกว่าช่วงหัวไหล่เล็กน้อย ดึงสะบักลงเล็กน้อยก่อนเริ่มดึง'
        ],
        execution: [
          'เอนลำตัวไปข้างหลังเล็กน้อย (ประมาณ 10-15 องศา) เปิดอกขึ้น',
          'ดึงบาร์ลงมาสู่ระดับกระดูกไหปลาร้าหรือหน้าอกบน นำด้วยข้อศอกลงและเข้าด้านใน',
          'บีบปีกหลังให้แน่น แล้วค่อยๆ คืนบาร์ขึ้นช้าๆ 2-3 วินาทีจนแขนยืดสุด'
        ],
        breathing: 'หายใจออกตอนดึงบาร์ลง หายใจเข้าตอนคืนบาร์ขึ้น'
      },
      commonMistakes: [
        'เอนหลังนอนไปกับเบาะเพื่อดึงน้ำหนักลงมา',
        'ดึงบาร์ไปไว้ข้างหลังคอ (Behind the neck) ซึ่งเสี่ยงต่อการบาดเจ็บของข้อต่อหัวไหล่'
      ],
      proTips: [
        'ใช้การจับแบบ Thumbless Grip จะช่วยลดการทำงานของหน้าแขนและส่งแรงตรงไปที่ปีกหลังได้ดียิ่งขึ้น'
      ]
    },
    {
      id: 'face-pull',
      nameTh: 'เฟซพูล (Cable Face Pull)',
      nameEn: 'Face Pull',
      category: 'pull',
      type: 'isolation',
      primaryMuscles: ['หัวไหล่หลัง (Rear Deltoid)', 'กล้ามเนื้อหมุนหัวไหล่ (Rotator Cuff)'],
      secondaryMuscles: ['สะบักกลางและบน (Middle/Upper Trapezius)', 'Rhomboids'],
      equipment: 'สายเคเบิล + เชือก (Rope)',
      difficulty: 'เริ่มต้น',
      svgType: 'face-pull',
      images: [
        BASE_IMG_URL + 'Face_Pull/0.jpg',
        BASE_IMG_URL + 'Face_Pull/1.jpg'
      ],
      description: 'ท่าฟื้นฟูและสร้างความสมดุลของหัวไหล่ ป้องกันไหล่ห่อและสร้างมิติไหล่ด้านหลังให้กลมสวย',
      technique: {
        setup: [
          'ปรับรอกเคเบิลให้อยู่ระดับสายตาหรือหน้าอก ถือปลายเชือกโดยให้นิ้วโป้งชี้เข้าหาตัว',
          'ก้าวถอยหลังมา 1-2 ก้าว ยืนให้มั่นคง'
        ],
        execution: [
          'ดึงเชือกเข้าหาใบหน้า (ระดับจมูกหรือหน้าผาก) พร้อมกับกางข้อศอกออกสูงและหมุนมือออกด้านนอก',
          'ที่จุดสิ้นสุด ให้มืออยู่ข้างใบหูและข้อศอกชี้ไปด้านข้าง บีบหลังส่วนบนแน่น',
          'ค่อยๆ ผ่อนกลับสู่ตำแหน่งเดิมอย่างช้าๆ'
        ],
        breathing: 'หายใจออกเมื่อดึงเข้าหาใบหน้า หายใจเข้าเมื่อผ่อนแขนออก'
      },
      commonMistakes: [
        'ใช้น้ำหนักหนักเกินไปจนต้องโยกลำตัว',
        'กดข้อศอกต่ำ ทำให้กลายเป็นท่าดึงแถวหลังแทนหัวไหล่หลัง'
      ],
      proTips: [
        'เน้นการหมุนแขนท่อนบนออกด้านนอกที่ปลายการดึง เพื่อกระตุ้นกล้ามเนื้อ Infraspinatus อย่างเต็มประสิทธิภาพ'
      ]
    },
    {
      id: 'barbell-bicep-curl',
      nameTh: 'บาร์เบล ไบเซป เคิร์ล (Barbell Bicep Curl)',
      nameEn: 'Barbell Bicep Curl',
      category: 'pull',
      type: 'isolation',
      primaryMuscles: ['หน้าแขน (Biceps Brachii)'],
      secondaryMuscles: ['กล้ามเนื้อแขนท่อนล่าง (Brachialis, Forearms)'],
      equipment: 'บาร์เบลตรง หรือ EZ-Bar',
      difficulty: 'เริ่มต้น',
      svgType: 'bicep-curl',
      images: [
        BASE_IMG_URL + 'Barbell_Curl/0.jpg',
        BASE_IMG_URL + 'Barbell_Curl/1.jpg'
      ],
      description: 'ท่าสร้างกล้ามเนื้อลูกหนูหน้าแขนให้มีขนาดยอดลูกหนู (Peak) ที่สูงและเต็มอิ่ม',
      technique: {
        setup: [
          'ยืนตัวตรง เท้ากว้างเท่าหัวไหล่ ถือบาร์เบลหงายมือ กว้างเท่าช่วงหัวไหล่',
          'ล็อกข้อศอกให้อยู่แนบข้างลำตัว ล็อกหัวไหล่ไม่ให้ยก'
        ],
        execution: [
          'ออกแรงเกร็งหน้าแขนม้วนบาร์เบลขึ้นมาข้างหน้า',
          'ขึ้นมาจนหน้าแขนหดตัวสูงสุด บีบเกร็งค้างไว้ 1 วินาที',
          'ค่อยๆ ควบคุมการลดบาร์เบลลงมาช้าๆ ต้านแรงโน้มถ่วงจนแขนเหยียดเกือบสุด'
        ],
        breathing: 'หายใจออกขณะม้วนบาร์ขึ้น หายใจเข้าขณะลดบาร์ลง'
      },
      commonMistakes: [
        'เหวี่ยงสะโพกและหลังเพื่อช่วยส่งน้ำหนัก',
        'ยกข้อศอกพุ่งไปข้างหน้าขณะยก ทำให้แรงตกไปที่หัวไหล่หน้าแทนหน้าแขน'
      ],
      proTips: [
        'ใช้ EZ-Bar หากรู้สึกเจ็บบริเวณข้อมือ เพราะมุมโค้งของบาร์จะสอดคล้องกับสรีระตามธรรมชาติมากกว่า'
      ]
    },
    {
      id: 'incline-hammer-curl',
      nameTh: 'อินไคลน์ แฮมเมอร์เคิร์ล (Incline Dumbbell Hammer Curl)',
      nameEn: 'Incline Hammer Curl',
      category: 'pull',
      type: 'isolation',
      primaryMuscles: ['กล้ามเนื้อแขนด้านนอก (Brachialis)', 'ปลายแขน (Brachioradialis)'],
      secondaryMuscles: ['ลูกหนูหน้าแขน (Biceps)'],
      equipment: 'ดัมเบลล์ + ม้านั่งปรับเอียง',
      difficulty: 'เริ่มต้น - ปานกลาง',
      svgType: 'hammer-curl',
      images: [
        BASE_IMG_URL + 'Alternate_Hammer_Curl/0.jpg',
        BASE_IMG_URL + 'Alternate_Hammer_Curl/1.jpg'
      ],
      description: 'เสริมความหนาของแขนมองจากด้านหน้าและด้านข้าง ดันลูกหนูให้ดูนูนโดดเด่นยิ่งขึ้น',
      technique: {
        setup: [
          'นอนเอนหลังบนเบาะปรับเอียงประมาณ 60 องศา แขนปล่อยทิ้งดิ่งลงข้างลำตัว',
          'จับดัมเบลล์แบบ Neutral Grip (หันฝ่ามือเข้าหากันเหมือนถือค้อน)'
        ],
        execution: [
          'ยกดัมเบลล์ขึ้นมาตรงๆ โดยรักษามุมฝ่ามือหันเข้าหากันตลอดเวลา',
          'บีบเกร็งกล้ามเนื้อแขนท่อนบนและหน้าแขนที่จุดสูงสุด',
          'ค่อยๆ ลดระดับลงมาช้าๆ จนรู้สึกยืดเต็มที่'
        ],
        breathing: 'หายใจออกตอนยกดัมเบลล์ขึ้น หายใจเข้าตอนลดระดับลง'
      },
      commonMistakes: [
        'หมุนข้อมือขณะยก (ให้รักษาระนาบค้อนไว้คงที่)'
      ],
      proTips: [
        'การนอนบนเบาะเอียงช่วยกำจัดแรงเหวี่ยงจากลำตัว และเพิ่มระยะการยืดตัวของกล้ามเนื้อแขน'
      ]
    },

    // LEGS
    {
      id: 'barbell-back-squat',
      nameTh: 'บาร์เบล แบ็คสควอท (Barbell Back Squat)',
      nameEn: 'Barbell Back Squat',
      category: 'legs',
      type: 'compound',
      primaryMuscles: ['หน้าขา (Quadriceps)', 'ก้น (Gluteus Maximus)'],
      secondaryMuscles: ['หลังขา (Hamstrings)', 'แกนกลางลำตัว (Core)', 'น่อง (Calves)'],
      equipment: 'บาร์เบล + สควอทแร็ค (Squat Rack)',
      difficulty: 'ปานกลาง - ขั้นสูง',
      svgType: 'squat',
      images: [
        BASE_IMG_URL + 'Barbell_Squat/0.jpg',
        BASE_IMG_URL + 'Barbell_Squat/1.jpg'
      ],
      description: 'ราชาแห่งการฝึกท่อนล่าง พัฒนากล้ามเนื้อต้นขา ก้น และความแข็งแกร่งของร่างกายแบบองค์รวม',
      technique: {
        setup: [
          'วางบาร์บนสะบักบน (High Bar) หรือกล้ามเนื้อสะบักหลัง (Low Bar) จับบาร์ให้มั่นคง',
          'ถอยออกจากแร็ค 2-3 ก้าว กางเท้ากว้างเท่าหรือกว้างกว่าหัวไหล่เล็กน้อย ปลายเท้าเปิดออก 15-30 องศา',
          'เกร็งหน้าท้อง หายใจเข้าบล็อกลมไว้ในช่องท้อง (Brace Core)'
        ],
        execution: [
          'พับสะโพกและงอเข่าพร้อมกัน ย่อตัวลงไปด้านล่าง ให้หัวเข่าชี้ไปในทิศทางเดียวกับปลายเท้า',
          'ลงลึกจนสะโพกต่ำกว่าระดับหัวเข่าเล็กน้อย (Parallel หรือ Deep Squat) โดยที่หลังไม่งอโค้ง',
          'กดฝ่าเท้าเต็มฝ่าเท้าแล้วถีบพื้นดันตัวขึ้นมา บีบก้นที่จุดบนสุด'
        ],
        breathing: 'หายใจเข้าเต็มปอดและเกร็งหน้าท้องก่อนย่อลง ย่อลงและกลั้นลมไว้ แล้วพ่นลมหายใจออกเมื่อถีบตัวพ้นจุดยากสุด'
      },
      commonMistakes: [
        'เข่าบิดเข้าหากัน (Knee Valgus) ต้องเปิดเข่าออกตามแนวปลายเท้าเสมอ',
        'ส้นเท้าลอยจากพื้น (เกิดจากข้อเท้าตึงหรือถ่ายน้ำหนักไปข้างหน้ามากเกินไป)',
        'ก้นงุ้มที่จุดล่างสุด (Butt Wink) มากจนหลังล่างงอ'
      ],
      proTips: [
        'จินตนาการว่า "แยกพื้นออกจากกันด้วยฝ่าเท้า" ระหว่างที่ถีบตัวขึ้นมา จะเปิดการทำงานของกล้ามเนื้อก้นได้อย่างยอดเยี่ยม'
      ]
    },
    {
      id: 'romanian-deadlift',
      nameTh: 'โรมาเนียน เดดลิฟต์ (Romanian Deadlift - RDL)',
      nameEn: 'Romanian Deadlift (RDL)',
      category: 'legs',
      type: 'compound',
      primaryMuscles: ['หลังขา (Hamstrings)', 'ก้น (Gluteus Maximus)'],
      secondaryMuscles: ['หลังส่วนล่าง (Erector Spinae)', 'แกนกลางลำตัว (Core)'],
      equipment: 'บาร์เบล หรือ ดัมเบลล์',
      difficulty: 'ปานกลาง',
      svgType: 'rdl',
      images: [
        BASE_IMG_URL + 'Romanian_Deadlift/0.jpg',
        BASE_IMG_URL + 'Romanian_Deadlift/1.jpg'
      ],
      description: 'สุดยอดท่าสร้างกล้ามเนื้อต้นขาด้านหลังและบั้นท้าย เน้นการยืดและตึงตัวของกล้ามเนื้อแบบเต็มช่วง',
      technique: {
        setup: [
          'ยืนถือบาร์หรือดัมเบลล์ เท้ากว้างเท่าสะโพก หลังตรง ไหล่เปิดดึงสะบักลง',
          'ปลดล็อกหัวเข่าเล็กน้อย (Soft Knees) และคงมุมนี้ไว้ตลอดการเคลื่อนไหว'
        ],
        execution: [
          'ดันสะโพกไปข้างหลังให้ไกลที่สุด (Hinge at the hips) เหมือนกำลังเอาก้นแตะผนังด้านหลัง',
          'ให้บาร์เลื่อนลงมาชิดแนบหน้าขา จนรู้สึกตึงแน่นที่กล้ามเนื้อต้นขาด้านหลัง (ระดับประมาณใต้เข่า)',
          'ดันสะโพกกลับมาข้างหน้า บีบก้นแน่นที่จุดยืนตรง'
        ],
        breathing: 'หายใจเข้าขณะพับสะโพกส่งตัวลง หายใจออกขณะดันสะโพกกลับมายืนตรง'
      },
      commonMistakes: [
        'งอเข่าจนกลายเป็นท่าสควอท (ทำให้แรงไม่ตกที่หลังขา)',
        'หลังโก่งงอเพื่อให้บาร์แตะพื้น (ระยะทางขึ้นอยู่กับความยืดหยุ่นของหลังขา ไม่จำเป็นต้องถึงพื้น)'
      ],
      proTips: [
        'คิดเสมอว่านี่คือท่า "ดันก้นไปข้างหลัง" ไม่ใช่ท่า "ก้มตัวลงข้างหน้า"'
      ]
    },
    {
      id: 'leg-press',
      nameTh: 'เลกเพรส (45-Degree Leg Press)',
      nameEn: 'Leg Press',
      category: 'legs',
      type: 'compound',
      primaryMuscles: ['หน้าขา (Quadriceps)', 'ก้น (Glutes)'],
      secondaryMuscles: ['หลังขา (Hamstrings)'],
      equipment: 'เครื่อง Leg Press',
      difficulty: 'เริ่มต้น - ปานกลาง',
      svgType: 'leg-press',
      images: [
        BASE_IMG_URL + 'Leg_Press/0.jpg',
        BASE_IMG_URL + 'Leg_Press/1.jpg'
      ],
      description: 'ฝึกกล้ามเนื้อขาด้วยน้ำหนักที่หนักได้อย่างปลอดภัยโดยไม่เพิ่มภาระให้กับกระดูกสันหลัง',
      technique: {
        setup: [
          'นั่งแนบหลังและสะโพกชิดเบาะ วางเท้ากว้างเท่าหัวไหล่บนแผ่นเหยียบ',
          'ปลดล็อกเซฟตี้ จับมือจับด้านข้างให้แน่นเพื่อดึงตัวให้แนบกับเบาะ'
        ],
        execution: [
          'ค่อยๆ ลดแผ่นน้ำหนักลงมาจนหัวเข่างอทำมุมประมาณ 90 องศา หรือลึกที่สุดเท่าที่สะโพกยังไม่ลอยจากเบาะ',
          'ออกแรงถีบแผ่นน้ำหนักกลับขึ้นไปด้วยส้นเท้าและกลางเท้า',
          'เหยียดขาขึ้นมาเกือบตึง แต่ห้ามล็อกหัวเข่าเด็ดขาด (Soft Lock)'
        ],
        breathing: 'หายใจเข้าตอนผ่อนน้ำหนักลง หายใจออกตอนถีบน้ำหนักขึ้น'
      },
      commonMistakes: [
        'ล็อกหัวเข่าตึงเปรี๊ยะที่จุดบนสุด (อันตรายอย่างยิ่งต่อข้อต่อหัวไหล่และเอ็นเข่า)',
        'สะโพกลอยหรือม้วนขึ้นจากเบาะขณะลงลึก (เสี่ยงต่อกระดูกสันหลังส่วนล่าง)'
      ],
      proTips: [
        'วางเท้าไว้ตำแหน่งบนของแผ่นเหยียบจะเน้นก้นและหลังขา วางต่ำจะเน้นหน้าขา'
      ]
    },
    {
      id: 'leg-extension',
      nameTh: 'เลก เอ็กซ์เทนชั่น (Leg Extension)',
      nameEn: 'Leg Extension',
      category: 'legs',
      type: 'isolation',
      primaryMuscles: ['หน้าขา (Quadriceps - ทั้ง 4 มัด)'],
      secondaryMuscles: [],
      equipment: 'เครื่อง Leg Extension Machine',
      difficulty: 'เริ่มต้น',
      svgType: 'leg-extension',
      images: [
        BASE_IMG_URL + 'Leg_Extensions/0.jpg',
        BASE_IMG_URL + 'Leg_Extensions/1.jpg'
      ],
      description: 'โฟกัสหน้าขาโดยเฉพาะ สร้างร่องกล้ามเนื้อหน้าขา (Teardrop) ให้คมชัด',
      technique: {
        setup: [
          'ปรับพนักพิงให้ข้อพับเข่าตรงกับแกนหมุนของเครื่องพอดี',
          'ปรับเบาะรองให้อยู่เหนือข้อเท้าเล็กน้อย จับมือจับให้แน่น'
        ],
        execution: [
          'ออกแรงเตะขาขึ้นมาจนขาเหยียดตรง ขนานกับพื้น',
          'เกร็งหน้าขาบีบค้างไว้ที่จุดสูงสุด 1-2 วินาที',
          'ค่อยๆ ผ่อนขากลับลงมาช้าๆ 2-3 วินาทีเพื่อสร้างแรงต้านเชิงลบ'
        ],
        breathing: 'หายใจออกตอนเตะขาขึ้น หายใจเข้าตอนลดขาลง'
      },
      commonMistakes: [
        'ใช้แรงเหวี่ยงหรือกระตุกขึ้นอย่างรวดเร็ว',
        'ยกสะโพกลอยจากเบาะเพื่อส่งแรง'
      ],
      proTips: [
        'เน้นการบีบเกร็ง (Peak Contraction) ที่ด้านบนให้แน่นที่สุด จะกระตุ้นกล้ามเนื้อ Rectus Femoris ได้อย่างยอดเยี่ยม'
      ]
    },
    {
      id: 'seated-or-standing-calf-raise',
      nameTh: 'คาล์ฟ เรส (Standing / Seated Calf Raise)',
      nameEn: 'Calf Raise',
      category: 'legs',
      type: 'isolation',
      primaryMuscles: ['น่อง (Gastrocnemius & Soleus)'],
      secondaryMuscles: ['เอ็นร้อยหวาย (Achilles)'],
      equipment: 'เครื่อง Calf Machine หรือ ดัมเบลล์ + แท่นยืน',
      difficulty: 'เริ่มต้น',
      svgType: 'calf-raise',
      images: [
        BASE_IMG_URL + 'Standing_Calf_Raises/0.jpg',
        BASE_IMG_URL + 'Standing_Calf_Raises/1.jpg'
      ],
      description: 'พัฒนากล้ามเนื้อน่องให้แน่นหนา มีเส้นสายที่ชัดเจนและเพิ่มพลังการกระโดดและการวิ่ง',
      technique: {
        setup: [
          'ยืนบนขอบแท่นยืนโดยให้ส้นเท้ายื่นออกมาลอยอยู่กลางอากาศ',
          'ลำตัวตรง เข่าไม่งอ (สำหรับ Standing) หรือนั่งล็อกเบาะ (สำหรับ Seated)'
        ],
        execution: [
          'เขย่งปลายเท้าขึ้นให้สูงที่สุดเท่าที่จะทำได้ บีบน่องที่จุดสูงสุดค้างไว้ 1 วินาที',
          'ค่อยๆ ลดส้นเท้าลงมาช้าๆ ต่ำกว่าระดับแท่นเพื่อยืดกล้ามเนื้อน่องจนสุด ค้างไว้ 1 วินาทีเพื่อกำจัดแรงสะท้อนของเอ็น'
        ],
        breathing: 'หายใจออกตอนเขย่งขึ้น หายใจเข้าตอนยืดลง'
      },
      commonMistakes: [
        'เด้งขึ้นเด้งลงเร็วๆ โดยอาศัยความยืดหยุ่นของเอ็นร้อยหวายแทนการออกแรงของกล้ามเนื้อน่อง',
        'เคลื่อนไหวไม่เต็มช่วง (Half Reps)'
      ],
      proTips: [
        'หยุดนิ่งที่จุดยืดล่างสุด 2 วินาทีเต็ม เพื่อให้กล้ามเนื้อน่องออกแรงยกเอง 100% โดยไร้แรงสะท้อน'
      ]
    },
    {
      id: 'hanging-leg-raise',
      nameTh: 'แฮงกิ้ง เลกเรส (Hanging Leg Raise)',
      nameEn: 'Hanging Leg Raise',
      category: 'core',
      type: 'compound',
      primaryMuscles: ['หน้าท้องล่าง (Lower Abs)', 'แกนกลางลำตัว (Core)'],
      secondaryMuscles: ['งอข้อสะโพก (Hip Flexors)', 'แรงจับบาร์ (Grip)'],
      equipment: 'บาร์โหน (Pull-Up Bar)',
      difficulty: 'ปานกลาง - ขั้นสูง',
      svgType: 'leg-raise',
      images: [
        BASE_IMG_URL + 'Hanging_Leg_Raise/0.jpg',
        BASE_IMG_URL + 'Hanging_Leg_Raise/1.jpg'
      ],
      description: 'ท่าสร้างกล้ามเนื้อหน้าท้องระดับฮาร์ดคอร์ ดึงกล้ามเนื้อ Six-pack มัดล่างให้ขึ้นชัดเจน',
      technique: {
        setup: [
          'โหนบาร์ แขนเหยียดตรง ไหล่ไม่งุ้ม ขาชิดกัน',
          'เกร็งหน้าท้องเพื่อหยุดแรงแกว่งของลำตัว'
        ],
        execution: [
          'เกร็งหน้าท้อง ม้วนสะโพกขึ้นมาข้างหน้า ยกขาหรือเข่าขึ้นจนต้นขาสูงกว่าระดับสะโพก',
          'เน้นการ "ม้วนกระดูกเชิงกรานเข้าหาซี่โครง" ไม่ใช่แค่การยกขาขึ้น',
          'ค่อยๆ ควบคุมการลดขาลงมาช้าๆ โดยไม่ปล่อยให้ตัวแกว่ง'
        ],
        breathing: 'หายใจออกตอนม้วนสะโพกยกขาขึ้น หายใจเข้าตอนลดขาลง'
      },
      commonMistakes: [
        'แกว่งตัวเหมือนชิงช้าเพื่อใช้แรงเหวี่ยง',
        'ยกแค่ขาโดยไม่ม้วนสะโพก ทำให้ใช้แต่กล้ามเนื้อข้อต่อสะโพก (Hip Flexors) แทนหน้าท้อง'
      ],
      proTips: [
        'หากยกขายืดตรงยากเกินไป ให้เริ่มจากการงอเข่าขึ้นมาหาอก (Hanging Knee Raise) ก่อน'
      ]
    }
  ];

  function getExerciseById(id) {
    return EXERCISES.find(e => e.id === id);
  }

  function getExercisesByCategory(category) {
    if (!category || category === 'all') return EXERCISES;
    return EXERCISES.filter(e => e.category === category);
  }

  // ==========================================
  // 2. DATA: GOALS
  // ==========================================
  const FITNESS_GOALS = [
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
      recommendedRest: 90,
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
      recommendedRest: 180,
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
      recommendedRest: 45,
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
      recommendedRest: 90,
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

  function getGoalById(id) {
    return FITNESS_GOALS.find(g => g.id === id) || FITNESS_GOALS[0];
  }

  // ==========================================
  // 3. DATA: DEFAULT PLANS
  // ==========================================
  const DEFAULT_PLANS = [
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
          color: '#3b82f6',
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
          color: '#8b5cf6',
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
          color: '#10b981',
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
      description: 'แบ่งร่างกายเป็นท่อนบน (Upper) และท่อนล่าง (Lower) เหมาะสำหรับผู้ที่ต้องการความสมดุลระหว่างผลลัพธ์และเวลาพัก',
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
            { exerciseId: 'leg-press', sets: 3, targetReps: '10-12', rpe: 8.5, restSec: 75 },
            { exerciseId: 'seated-or-standing-calf-raise', sets: 4, targetReps: '12-15', rpe: 8.5, restSec: 60 },
            { exerciseId: 'hanging-leg-raise', sets: 3, targetReps: '12-15', rpe: 8.5, restSec: 60 }
          ]
        }
      ]
    }
  ];

  // ==========================================
  // 4. ENGINE: PROGRESSIVE OVERLOAD
  // ==========================================
  function estimate1RM(weight, reps) {
    if (!weight || weight <= 0) return 0;
    if (reps <= 1) return weight;
    const epley = weight * (1 + reps / 30);
    const brzycki = reps < 37 ? weight * (36 / (37 - reps)) : epley;
    return Math.round(((epley + brzycki) / 2) * 10) / 10;
  }

  function getWeightForGoal(oneRM, goalId) {
    if (!oneRM || oneRM <= 0) return 20;
    let percentage = 0.70;
    if (goalId === 'strength') percentage = 0.85;
    else if (goalId === 'fat-loss') percentage = 0.60;
    else if (goalId === 'beginner') percentage = 0.55;
    return Math.round((oneRM * percentage) / 2.5) * 2.5;
  }

  // Reference strength standards: expected 1RM of each movement expressed as a ratio of the
  // Barbell Bench Press 1RM, plus the plate increment used when rounding the derived number.
  const BENCH_REFERENCE_RATIOS = {
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

  function roundToIncrement(value, increment = 2.5) {
    const inc = increment > 0 ? increment : 2.5;
    return Math.max(inc, Math.round(value / inc) * inc);
  }

  function getReferenceRatio(exerciseId) {
    if (BENCH_REFERENCE_RATIOS[exerciseId]) return BENCH_REFERENCE_RATIOS[exerciseId];
    const ex = getExerciseById(exerciseId);
    return { ratio: CATEGORY_REFERENCE_RATIOS[ex?.category] || 0.6, inc: 2.5 };
  }// True when the lifter already has at least one completed set logged for this movement.
  function hasLoggedPerformance(historySessions) {
    if (!historySessions || historySessions.length === 0) return false;
    const lastSession = historySessions[historySessions.length - 1];
    return (lastSession.sets || []).some(s => s.completed && s.weight > 0 && s.reps > 0);
  }

  // Best estimated 1RM found across every logged session of one movement
  function getLogged1RM(historySessions) {
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

  // How similar two movements are, used to transfer the lifter's own strength profile
  // onto movements they have never logged.
  function getMovementSimilarity(a, b) {
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
  const PERSONAL_FACTOR_LIMITS = { min: 0.6, max: 1.7 };

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
  */
  function buildPersonalFactorModel(anchorId, anchor1RM, getHistoryFor) {
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
  */
  function getPersonalizedRatio(exerciseId, model, ownLogged1RM = 0) {
    const exercise = getExerciseById(exerciseId);
    const stdRatio = getReferenceRatio(exerciseId).ratio;

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
    }

    // Weight each sample by movement similarity and data amount, then winsorize the
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
    const factor = clamp(blended, PERSONAL_FACTOR_LIMITS.min, PERSONAL_FACTOR_LIMITS.max);

    return {
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
  * @returns {Array} One row per exercise occurrence inside the plan
  */
  function buildPlanWeightSync(plan, anchorId, anchorEst1RM, goalId, getHistoryFor, baselines = {}) {
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

  function getProgressiveOverloadRecommendation(exerciseId, historySessions, goalId = 'hypertrophy', baseline = null) {
    const exercise = getExerciseById(exerciseId);
    const goal = getGoalById(goalId);

    // An explicit per-exercise lock from the Goals view always wins
    if (baseline && baseline.source === 'override' && baseline.weight > 0) {
      const locked = getLogged1RM(historySessions);
      const lockedEquivalent = locked.est1RM > 0 ? getWeightForGoal(locked.est1RM, goalId) : null;

      return {
        status: 'override',
        suggestedWeight: baseline.weight,
        targetReps: goal.repRange,
        increment: 0,
        reason: `คุณตั้งน้ำหนักนี้เองไว้ที่ ${baseline.weight} กก. ระบบจะใช้ค่านี้ทุกครั้งจนกว่าจะกดปลดล็อกที่หน้าเป้าหมาย & บริหารน้ำหนัก${lockedEquivalent !== null ? ` (ข้อมูลล่าสุดที่บันทึกไว้เทียบได้ประมาณ ${lockedEquivalent} กก.)` : ''}`,
        color: '#f59e0b',
        badge: 'ตั้งค่าเอง (ล็อกไว้)'
      };
    }

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
          : `ยังไม่มีการบันทึกการออกกำลังกายของท่านี้ ระบบจึงอ้างอิงจากเกณฑ์ของ ${anchorEx ? anchorEx.nameTh : 'ท่าอ้างอิง'} ที่คุณบันทึกไว้ (1RM ≈ ${anchorEx ? anchorEx.nameTh : ''} ${baseline1RM} กก.) เสนอเริ่มที่ ${workingWeight} กก.`,
        color: '#8b5cf6',
        badge: 'อ้างอิงเกณฑ์ที่บันทึกไว้'
      };
    }

    if (!historySessions || historySessions.length === 0) {
      let startingWeight = 20;
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

    const lastSession = historySessions[historySessions.length - 1];
    const lastSets = lastSession.sets || [];
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

    if (!allHitMinReps && avgRpe >= 9.5) {
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

  function generateWarmUpSets(workingWeight, barWeight = 20) {
    if (workingWeight <= barWeight) {
      return [{ step: 1, pct: 'บาร์เปล่า', weight: barWeight, reps: 10, restSec: 45, note: 'วอร์มข้อต่อด้วยบาร์เปล่า' }];
    }
    const sets = [{ step: 1, pct: 'บาร์เปล่า', weight: barWeight, reps: 10, restSec: 45, note: 'อบอุ่นข้อต่อและสร้างแนวการเคลื่อนไหว' }];
    const diff = workingWeight - barWeight;
    if (workingWeight >= 40) {
      sets.push({ step: 2, pct: '50%', weight: Math.round((barWeight + diff * 0.4) / 2.5) * 2.5, reps: 6, restSec: 60, note: 'กระตุ้นการไหลเวียนโลหิต' });
    }
    if (workingWeight >= 60) {
      sets.push({ step: 3, pct: '75%', weight: Math.round((barWeight + diff * 0.7) / 2.5) * 2.5, reps: 3, restSec: 90, note: 'ปลุกระบบประสาทสั่งการ' });
    }
    if (workingWeight >= 80) {
      sets.push({ step: 4, pct: '90%', weight: Math.round((barWeight + diff * 0.9) / 2.5) * 2.5, reps: 1, restSec: 120, note: 'ทดสอบความพร้อมทางจิตวิทยา (Potentiation)' });
    }
    return sets;
  }

  function calculateBarbellPlates(totalWeight, barWeight = 20) {
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
    return { perSideWeight: (totalWeight - barWeight) / 2, plates, barWeight };
  }

  // ==========================================
  // 5. ENGINE: REST TIMER & AUDIO SYNTHESIS
  // ==========================================
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq = 660, duration = 0.15, type = 'sine') {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (err) {}
  }

  function playShortBeep() { playTone(520, 0.1, 'sine'); }
  function playCompletionBeep() {
    playTone(880, 0.2, 'triangle');
    setTimeout(() => playTone(1174.66, 0.4, 'sine'), 150);
  }

  class RestTimer {
    constructor() {
      this.remainingSeconds = 0;
      this.totalSeconds = 0;
      this.timerId = null;
      this.isRunning = false;
      this.listeners = new Set();
    }
    start(seconds) {
      this.stop();
      this.totalSeconds = seconds;
      this.remainingSeconds = seconds;
      this.isRunning = true;
      getAudioContext();
      this.notify();
      this.timerId = setInterval(() => {
        this.remainingSeconds--;
        if (this.remainingSeconds <= 3 && this.remainingSeconds > 0) {
          playShortBeep();
        }
        if (this.remainingSeconds <= 0) {
          this.stop();
          playCompletionBeep();
          if ('vibrate' in navigator) {
            try { navigator.vibrate([200, 100, 200, 100, 400]); } catch (e) {}
          }
        }
        this.notify();
      }, 1000);
    }
    addSeconds(sec = 30) {
      this.remainingSeconds += sec;
      this.totalSeconds += sec;
      this.notify();
    }
    stop() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.isRunning = false;
      this.notify();
    }
    subscribe(callback) {
      this.listeners.add(callback);
      callback(this.getState());
      return () => this.listeners.delete(callback);
    }
    notify() {
      const state = this.getState();
      this.listeners.forEach(cb => { try { cb(state); } catch (e) {} });
    }
    getState() {
      const mins = Math.floor(Math.max(0, this.remainingSeconds) / 60);
      const secs = Math.max(0, this.remainingSeconds) % 60;
      return {
        isRunning: this.isRunning,
        remainingSeconds: this.remainingSeconds,
        totalSeconds: this.totalSeconds,
        formatted: `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
      };
    }
  }

  const globalTimer = new RestTimer();

  // ==========================================
  // 5.5 SCREEN DIMMER (mirror ของ js/engine/screenDimmer.js)
  // ==========================================
  const DIMMER_STORAGE_KEY = 'fit_dimmer_v1';
  const LEVEL_OPACITY = [0.45, 0.68, 0.86];
  const PEEK_OPACITY = 0.12;
  const AUTO_DEEP_BONUS = 0.1;
  const MAX_OPACITY = 0.93;

  class ScreenDimmer {
    constructor() {
      this.settings = { enabled: false, level: 1, autoDeepDim: true, peekSec: 8 };
      this.load();

      this.wakeLock = null;
      this.peekTimer = null;
      this.isPeeking = false;
      this.isResting = false;
      this.lockFailed = false;
      this.context = { exerciseName: '', setLabel: '', setsDone: 0, setsTotal: 0 };

      this.inject();
      this.bind();
      this.apply();
    }

    load() {
      try {
        const raw = localStorage.getItem(DIMMER_STORAGE_KEY);
        if (raw) Object.assign(this.settings, JSON.parse(raw));
      } catch (err) { /* ใช้ค่าเริ่มต้น */ }
    }

    save() {
      try {
        localStorage.setItem(DIMMER_STORAGE_KEY, JSON.stringify(this.settings));
      } catch (err) { /* ไม่ทำให้การฝึกพัง */ }
    }

    inject() {
      this.overlay = document.getElementById('screenDimOverlay');
      this.hud = document.getElementById('screenDimHud');
      if (this.overlay && this.hud) return;

      this.overlay = document.createElement('div');
      this.overlay.id = 'screenDimOverlay';
      this.overlay.className = 'screen-dim-overlay';
      this.overlay.setAttribute('aria-hidden', 'true');
      this.overlay.innerHTML = '<span class="screen-dim-hint">👆 แตะที่ใดก็ได้เพื่อดูชั่วคราว</span>';

      this.hud = document.createElement('div');
      this.hud.id = 'screenDimHud';
      this.hud.className = 'screen-dim-hud';
      this.hud.innerHTML = `
      <div class="dim-hud-main">
        <span class="dim-hud-label" id="dimHudLabel">เซ็ตที่เหลือ</span>
        <strong class="dim-hud-clock" id="dimHudClock">--:--</strong>
        <span class="dim-hud-ctx" id="dimHudContext">—</span>
      </div>
      <div class="dim-hud-bar"><span class="dim-hud-bar-fill" id="dimHudBarFill"></span></div>
      <div class="dim-hud-foot">
        <span class="dim-hud-lock" id="dimHudLock"></span>
        <div class="dim-hud-controls">
          <div class="dim-hud-levels" role="group" aria-label="ระดับความมืด">
            <button class="dim-level-btn" data-level="0">ต่ำ</button>
            <button class="dim-level-btn" data-level="1">กลาง</button>
            <button class="dim-level-btn" data-level="2">สูง</button>
          </div>
          <button class="dim-hud-close" id="dimHudCloseBtn">☀️ สว่าง</button>
        </div>
      </div>
    `;

      document.body.appendChild(this.overlay);
      document.body.appendChild(this.hud);
    }

    bind() {
      if (this._bound) return;
      this._bound = true;

      this.overlay.addEventListener('click', () => this.peek());

      this.hud.querySelectorAll('.dim-level-btn').forEach(btn => {
        btn.addEventListener('click', () => this.setLevel(Number(btn.dataset.level)));
      });

      const closeBtn = this.hud.querySelector('#dimHudCloseBtn');
      if (closeBtn) closeBtn.addEventListener('click', () => this.setEnabled(false));

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.settings.enabled) {
          this.requestWakeLock();
        }
      });
    }

    currentOpacity() {
      if (!this.settings.enabled) return 0;
      if (this.isPeeking) return PEEK_OPACITY;
      let o = LEVEL_OPACITY[this.settings.level] ?? LEVEL_OPACITY[1];
      if (this.settings.autoDeepDim && this.isResting) o += AUTO_DEEP_BONUS;
      return Math.min(MAX_OPACITY, o);
    }

    apply() {
      const on = this.settings.enabled;

      this.overlay.classList.toggle('is-active', on);
      this.overlay.classList.toggle('is-peek', on && this.isPeeking);
      this.overlay.style.opacity = String(this.currentOpacity());

      this.hud.classList.toggle('is-active', on);
      this.hud.classList.toggle('is-peeking', on && this.isPeeking);

      this.hud.querySelectorAll('.dim-level-btn').forEach(btn => {
        const active = Number(btn.dataset.level) === this.settings.level;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
      });

      this.updateStatus();

      document.querySelectorAll('.dimmer-toggle-btn').forEach(btn => {
        btn.classList.toggle('active', on);
        btn.textContent = on ? '☀️' : '🌙';
        btn.setAttribute('aria-pressed', String(on));
        btn.title = on ? 'ปิดโหมดโค้ดหน้าจอ' : 'เปิดโหมดโค้ดหน้าจอ (กันหน้าจอดับ)';
      });
    }

    updateStatus() {
      const el = this.hud.querySelector('#dimHudLock');
      if (!el) return;
      if (!this.settings.enabled) {
        el.textContent = '';
        el.className = 'dim-hud-lock';
        return;
      }
      if (this.wakeLock) {
        el.textContent = '🔒 กันหน้าจอดับแล้ว';
        el.className = 'dim-hud-lock is-on';
      } else if (this.lockFailed) {
        el.textContent = '⚠️ ขอสิทธิ์กันหน้าจอดับไม่สำเร็จ — แตะจอเพื่อลองใหม่';
        el.className = 'dim-hud-lock is-warn';
      } else if ('wakeLock' in navigator) {
        el.textContent = '⏳ กำลังขอสิทธิ์กันหน้าจอดับ…';
        el.className = 'dim-hud-lock';
      } else {
        el.textContent = '⚠️ เบราว์เซอร์นี้กันหน้าจอดับไม่ได้';
        el.className = 'dim-hud-lock is-warn';
      }
    }

    async requestWakeLock() {
      if (!('wakeLock' in navigator)) {
        this.lockFailed = false;
        this.updateStatus();
        return;
      }
      if (this.wakeLock && !this.wakeLock.released) return;

      this.lockFailed = false;
      this.updateStatus();

      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
        this.lockFailed = false;
        this.wakeLock.addEventListener('release', () => {
          this.wakeLock = null;
          this.updateStatus();
        });
      } catch (err) {
        this.wakeLock = null;
        this.lockFailed = true;
      }
      this.updateStatus();
    }

    releaseWakeLock() {
      if (this.wakeLock) {
        try { this.wakeLock.release(); } catch (err) { /* ignore */ }
        this.wakeLock = null;
      }
      this.updateStatus();
    }

    toggle() {
      this.setEnabled(!this.settings.enabled);
    }

    setEnabled(on) {
      this.settings.enabled = !!on;
      this.save();

      if (this.peekTimer) {
        clearTimeout(this.peekTimer);
        this.peekTimer = null;
      }
      this.isPeeking = false;

      if (this.settings.enabled) {
        this.requestWakeLock();
      } else {
        this.releaseWakeLock();
        this.lockFailed = false;
        this.isResting = false;
      }
      this.apply();
    }

    setLevel(level) {
      const next = Math.min(2, Math.max(0, Number(level) || 0));
      if (next === this.settings.level) return;
      this.settings.level = next;
      this.save();
      this.apply();
    }

    peek() {
      if (!this.settings.enabled || this.isPeeking) return;

      // เผื่อขอ Wake Lock ไม่สำเร็จตอนเปิดโหมด ให้ลองใหม่ตอนผู้ใช้แตะจอ
      if (!this.wakeLock) this.requestWakeLock();

      this.isPeeking = true;
      this.overlay.classList.add('hint-hidden');
      this.apply();

      if (this.peekTimer) clearTimeout(this.peekTimer);
      this.peekTimer = setTimeout(() => {
        this.isPeeking = false;
        this.peekTimer = null;
        this.apply();
      }, this.settings.peekSec * 1000);
    }

    setContext(context) {
      this.context = Object.assign({}, this.context, context || {});
      this.renderContext();
    }

    renderContext() {
      const el = this.hud.querySelector('#dimHudContext');
      if (!el) return;
      const { exerciseName, setLabel, setsDone, setsTotal } = this.context;
      const parts = [];
      if (exerciseName) parts.push(exerciseName);
      if (setLabel) parts.push(setLabel);
      if (setsTotal > 0) parts.push(`${setsDone}/${setsTotal}`);
      el.textContent = parts.join(' · ') || '—';
    }

    updateTimer(state) {
      if (!state) return;
      this.isResting = state.isRunning;

      const labelEl = this.hud.querySelector('#dimHudLabel');
      const clockEl = this.hud.querySelector('#dimHudClock');
      const fillEl = this.hud.querySelector('#dimHudBarFill');

      if (labelEl) labelEl.textContent = state.isRunning ? 'พักเหลือ' : 'เซ็ตที่เหลือ';
      if (clockEl) {
        clockEl.textContent = state.isRunning ? state.formatted : `${this.context.setsDone}/${this.context.setsTotal}`;
      }
      if (fillEl) {
        const pct = state.isRunning
          ? Math.max(0, Math.min(1, state.progress))
          : (this.context.setsTotal ? this.context.setsDone / this.context.setsTotal : 0);
        fillEl.style.width = `${Math.round(pct * 100)}%`;
      }

      this.renderContext();
      if (this.settings.enabled) this.apply();
    }

    shutdown() {
      if (this.peekTimer) clearTimeout(this.peekTimer);
      this.peekTimer = null;
      this.isPeeking = false;
      this.isResting = false;
      this.releaseWakeLock();
      this.settings.enabled = false;
      this.save();
      this.apply();
    }
  }

  // ==========================================
  // 6. STORAGE SERVICE
  // ==========================================
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

  class StorageService {
    constructor() { this.init(); }
    init() {
      if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) this.saveProfile(DEFAULT_PROFILE);
      if (!localStorage.getItem(STORAGE_KEYS.PLANS)) this.savePlans(DEFAULT_PLANS);
      if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) this.seedInitialSampleData();
    }
    getProfile() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
        return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE;
      } catch (e) { return DEFAULT_PROFILE; }
    }
    saveProfile(profile) { localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile)); }
    updateProfile(partial) {
      const updated = { ...this.getProfile(), ...partial };
      this.saveProfile(updated);
      return updated;
    }
    getPlans() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.PLANS);
        return data ? JSON.parse(data) : DEFAULT_PLANS;
      } catch (e) { return DEFAULT_PLANS; }
    }
    savePlans(plans) { localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans)); }
    getPlanById(id) {
      const plans = this.getPlans();
      return plans.find(p => p.id === id) || plans[0];
    }
    savePlan(plan) {
      const plans = this.getPlans();
      const index = plans.findIndex(p => p.id === plan.id);
      if (index >= 0) plans[index] = plan;
      else plans.push(plan);
      this.savePlans(plans);
    }
    getHistory() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
        return data ? JSON.parse(data) : [];
      } catch (e) { return []; }
    }
    saveHistory(history) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
      this.recalculatePRs(history);
    }
    addWorkoutToHistory(workout) {
      const history = this.getHistory();
      if (!workout.id) workout.id = 'workout_' + Date.now();
      if (!workout.date) workout.date = new Date().toISOString();
      let totalVolume = 0;
      (workout.exercises || []).forEach(ex => {
        (ex.sets || []).forEach(s => {
          if (s.completed && s.weight > 0 && s.reps > 0) totalVolume += (s.weight * s.reps);
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
      [...history].reverse().forEach(workout => {
        const match = (workout.exercises || []).find(e => e.exerciseId === exerciseId);
        if (match && match.sets && match.sets.length > 0) {
          sessions.push({ date: workout.date, workoutName: workout.dayName || workout.planName, sets: match.sets });
        }
      });
      return sessions;
    }
    getPRs() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.PRS);
        return data ? JSON.parse(data) : {};
      } catch (e) { return {}; }
    }
    recalculatePRs(history = this.getHistory()) {
      const prs = {};
      history.forEach(workout => {
        (workout.exercises || []).forEach(ex => {
          const exId = ex.exerciseId;
          if (!prs[exId]) {
            prs[exId] = { maxWeight: 0, maxRepsAtWeight: 0, estimated1RM: 0, highestSetVolume: 0, date: workout.date };
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
              if (e1rm > prs[exId].estimated1RM) prs[exId].estimated1RM = e1rm;
              if (setVol > prs[exId].highestSetVolume) prs[exId].highestSetVolume = setVol;
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
      } catch (e) { return {}; }
    }
    getExerciseBaseline(exerciseId) {
      return this.getExerciseBaselines()[exerciseId] || null;
    }
    saveExerciseBaselines(baselines) {
      localStorage.setItem(STORAGE_KEYS.BASELINES, JSON.stringify(baselines || {}));
    }
    // Upsert one or many baselines: { [exerciseId]: { weight, reps, est1RM, source, anchorId, updatedAt } }
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
    getActiveWorkout() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT);
        return data ? JSON.parse(data) : null;
      } catch (e) { return null; }
    }
    saveActiveWorkout(workout) {
      if (!workout) { this.clearActiveWorkout(); return; }
      localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(workout));
    }
    clearActiveWorkout() { localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT); }
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
              exerciseId: 'tricep-rope-pushdown',
              sets: [
                { setNum: 1, weight: 20, reps: 12, rpe: 8.0, completed: true },
                { setNum: 2, weight: 20, reps: 12, rpe: 8.5, completed: true }
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
              exerciseId: 'barbell-bicep-curl',
              sets: [
                { setNum: 1, weight: 25, reps: 10, rpe: 8.0, completed: true },
                { setNum: 2, weight: 25, reps: 10, rpe: 8.5, completed: true }
              ]
            }
          ]
        }
      ];
      this.saveHistory(sampleWorkouts);
    }
    exportAllDataJSON() {
      return JSON.stringify({
        profile: this.getProfile(),
        plans: this.getPlans(),
        history: this.getHistory(),
        prs: this.getPRs(),
        baselines: this.getExerciseBaselines(),
        exportDate: new Date().toISOString(),
        version: '2.1'
      }, null, 2);
    }
    importDataJSON(jsonString) {
      try {
        const data = JSON.parse(jsonString);
        if (data.profile) this.saveProfile(data.profile);
        if (data.plans) this.savePlans(data.plans);
        if (data.history) this.saveHistory(data.history);
        if (data.baselines) this.saveExerciseBaselines(data.baselines);
        return { success: true, count: data.history ? data.history.length : 0 };
      } catch (err) { return { success: false, error: err.message }; }
    }
  }

  const storage = new StorageService();

  // ==========================================
  // 7. VISUALS: ANATOMY & SVG ILLUSTRATIONS
  // ==========================================
  function renderMuscleAnatomyMap(primaryMuscles = [], secondaryMuscles = [], category = 'push') {
    const isPush = category === 'push';
    const isPull = category === 'pull';
    const isLegs = category === 'legs';
    const isCore = category === 'core';

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

    const primaryColor = '#10b981';
    const secondaryColor = '#8b5cf6';
    const neutralColor = '#334155';
    const bodyBaseColor = '#1e293b';

    return `
      <div class="anatomy-container">
        <div class="anatomy-view">
          <span class="anatomy-label">มุมมองด้านหน้า (Front View)</span>
          <svg viewBox="0 0 200 320" class="anatomy-svg" aria-label="กล้ามเนื้อด้านหน้า">
            <circle cx="100" cy="30" r="16" fill="${bodyBaseColor}" stroke="#475569" stroke-width="1.5" />
            <path d="M92 46 L108 46 L112 58 L88 58 Z" fill="${bodyBaseColor}" />
            <path d="M60 62 Q72 58 88 58 L85 75 Q70 82 58 75 Z" fill="${shoulderFrontActive ? primaryColor : neutralColor}" class="muscle-part ${shoulderFrontActive ? 'active-primary' : ''}"><title>หัวไหล่ซ้าย</title></path>
            <path d="M140 62 Q128 58 112 58 L115 75 Q130 82 142 75 Z" fill="${shoulderFrontActive ? primaryColor : neutralColor}" class="muscle-part ${shoulderFrontActive ? 'active-primary' : ''}"><title>หัวไหล่ขวา</title></path>
            <path d="M88 60 L112 60 L114 86 Q100 94 86 86 Z" fill="${chestActive ? primaryColor : neutralColor}" class="muscle-part ${chestActive ? 'active-primary' : ''}"><title>หน้าอก</title></path>
            <rect x="52" y="80" width="14" height="28" rx="6" fill="${bicepsActive ? primaryColor : (tricepsActive ? secondaryColor : neutralColor)}" class="muscle-part" />
            <rect x="134" y="80" width="14" height="28" rx="6" fill="${bicepsActive ? primaryColor : (tricepsActive ? secondaryColor : neutralColor)}" class="muscle-part" />
            <rect x="46" y="112" width="12" height="34" rx="5" fill="${neutralColor}" />
            <rect x="142" y="112" width="12" height="34" rx="5" fill="${neutralColor}" />
            <path d="M88 90 L112 90 L110 145 L90 145 Z" fill="${coreActive ? primaryColor : neutralColor}" class="muscle-part ${coreActive ? 'active-primary' : ''}" />
            <line x1="100" y1="92" x2="100" y2="140" stroke="#0f172a" stroke-width="1.5" />
            <line x1="90" y1="105" x2="110" y2="105" stroke="#0f172a" stroke-width="1.5" />
            <line x1="90" y1="120" x2="110" y2="120" stroke="#0f172a" stroke-width="1.5" />
            <path d="M88 145 L112 145 L118 165 L82 165 Z" fill="${bodyBaseColor}" />
            <path d="M78 170 Q82 225 84 235 L96 235 Q96 200 96 170 Z" fill="${quadsActive ? primaryColor : neutralColor}" class="muscle-part ${quadsActive ? 'active-primary' : ''}" />
            <path d="M122 170 Q118 225 116 235 L104 235 Q104 200 104 170 Z" fill="${quadsActive ? primaryColor : neutralColor}" class="muscle-part ${quadsActive ? 'active-primary' : ''}" />
            <circle cx="90" cy="242" r="6" fill="${bodyBaseColor}" stroke="#475569" stroke-width="1" />
            <circle cx="110" cy="242" r="6" fill="${bodyBaseColor}" stroke="#475569" stroke-width="1" />
            <path d="M84 250 L94 250 L92 295 L82 295 Z" fill="${calvesActive ? (isLegs ? secondaryColor : neutralColor) : neutralColor}" />
            <path d="M116 250 L106 250 L108 295 L118 295 Z" fill="${calvesActive ? (isLegs ? secondaryColor : neutralColor) : neutralColor}" />
          </svg>
        </div>

        <div class="anatomy-view">
          <span class="anatomy-label">มุมมองด้านหลัง (Back View)</span>
          <svg viewBox="0 0 200 320" class="anatomy-svg" aria-label="กล้ามเนื้อด้านหลัง">
            <circle cx="100" cy="30" r="16" fill="${bodyBaseColor}" stroke="#475569" stroke-width="1.5" />
            <path d="M100 46 L82 62 L100 78 L118 62 Z" fill="${(backActive || shoulderFrontActive) ? (isPull ? primaryColor : secondaryColor) : neutralColor}" class="muscle-part" />
            <path d="M60 62 Q72 58 82 62 L80 76 Q68 80 58 75 Z" fill="${(isPull || shoulderFrontActive) ? secondaryColor : neutralColor}" />
            <path d="M140 62 Q128 58 118 62 L120 76 Q132 80 142 75 Z" fill="${(isPull || shoulderFrontActive) ? secondaryColor : neutralColor}" />
            <rect x="50" y="80" width="14" height="28" rx="6" fill="${tricepsActive ? (primaryMuscles.some(m => m.includes('หลังแขน')) ? primaryColor : secondaryColor) : neutralColor}" />
            <rect x="136" y="80" width="14" height="28" rx="6" fill="${tricepsActive ? (primaryMuscles.some(m => m.includes('หลังแขน')) ? primaryColor : secondaryColor) : neutralColor}" />
            <path d="M82 78 Q90 125 94 135 L100 135 L106 135 Q110 125 118 78 L100 90 Z" fill="${backActive ? primaryColor : neutralColor}" class="muscle-part ${backActive ? 'active-primary' : ''}" />
            <rect x="94" y="136" width="12" height="20" rx="3" fill="${(backActive || isLegs) ? secondaryColor : neutralColor}" />
            <path d="M78 160 Q100 156 100 178 Q78 190 76 168 Z" fill="${glutesActive ? primaryColor : neutralColor}" />
            <path d="M122 160 Q100 156 100 178 Q122 190 124 168 Z" fill="${glutesActive ? primaryColor : neutralColor}" />
            <path d="M78 185 Q82 225 84 235 L96 235 Q96 200 96 185 Z" fill="${hamstringsActive ? primaryColor : neutralColor}" class="muscle-part ${hamstringsActive ? 'active-primary' : ''}" />
            <path d="M122 185 Q118 225 116 235 L104 235 Q104 200 104 185 Z" fill="${hamstringsActive ? primaryColor : neutralColor}" class="muscle-part ${hamstringsActive ? 'active-primary' : ''}" />
            <path d="M82 250 Q80 270 86 285 L94 285 Q96 270 94 250 Z" fill="${calvesActive ? primaryColor : neutralColor}" class="muscle-part ${calvesActive ? 'active-primary' : ''}" />
            <path d="M118 250 Q120 270 114 285 L106 285 Q104 270 106 250 Z" fill="${calvesActive ? primaryColor : neutralColor}" class="muscle-part ${calvesActive ? 'active-primary' : ''}" />
          </svg>
        </div>
      </div>
      <div class="anatomy-legend">
        <div class="legend-item"><span class="legend-color primary"></span> กล้ามเนื้อมัดหลัก (Primary Focus)</div>
        <div class="legend-item"><span class="legend-color secondary"></span> กล้ามเนื้อช่วยเสริม (Secondary Focus)</div>
      </div>
    `;
  }

  function renderExerciseIllustration(svgType) {
    if (svgType === 'bench-press') {
      return `
        <svg viewBox="0 0 320 200" class="exercise-art-svg">
          <line x1="20" y1="180" x2="300" y2="180" stroke="#334155" stroke-width="2" />
          <rect x="70" y="115" width="170" height="14" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
          <rect x="90" y="129" width="12" height="51" fill="#334155" />
          <rect x="208" y="129" width="12" height="51" fill="#334155" />
          <rect x="55" y="65" width="8" height="115" fill="#475569" />
          <path d="M100 115 Q145 106 190 115" fill="none" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
          <circle cx="85" cy="112" r="10" fill="#38bdf8" />
          <path d="M190 115 L225 145 L225 180" fill="none" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M125 110 L140 85 L140 50" fill="none" stroke="#10b981" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <line x1="30" y1="52" x2="250" y2="52" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" />
          <rect x="132" y="32" width="16" height="40" rx="3" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
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
    } else if (svgType === 'squat') {
      return `
        <svg viewBox="0 0 320 200" class="exercise-art-svg">
          <line x1="20" y1="180" x2="300" y2="180" stroke="#334155" stroke-width="2" />
          <line x1="70" y1="125" x2="250" y2="125" stroke="#ef4444" stroke-width="1" stroke-dasharray="4,4" />
          <text x="255" y="128" fill="#ef4444" font-size="9">ระดับขนานพื้น (Parallel)</text>
          <circle cx="135" cy="55" r="10" fill="#38bdf8" />
          <path d="M135 65 L115 125" fill="none" stroke="#38bdf8" stroke-width="14" stroke-linecap="round" />
          <path d="M115 125 L165 125" fill="none" stroke="#10b981" stroke-width="14" stroke-linecap="round" />
          <path d="M165 125 L155 178 L175 178" fill="none" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="128" cy="68" r="8" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
          <rect x="122" y="48" width="12" height="40" rx="3" fill="#ef4444" />
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
    } else if (svgType === 'deadlift') {
      return `
        <svg viewBox="0 0 320 200" class="exercise-art-svg">
          <line x1="20" y1="180" x2="300" y2="180" stroke="#334155" stroke-width="2" />
          <circle cx="120" cy="65" r="10" fill="#38bdf8" />
          <line x1="120" y1="75" x2="165" y2="115" stroke="#38bdf8" stroke-width="14" stroke-linecap="round" />
          <line x1="165" y1="115" x2="140" y2="145" stroke="#10b981" stroke-width="12" stroke-linecap="round" />
          <line x1="140" y1="145" x2="135" y2="178" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
          <circle cx="132" cy="150" r="26" fill="#ef4444" stroke="#b91c1c" stroke-width="3" />
          <circle cx="132" cy="150" r="7" fill="#cbd5e1" />
          <line x1="40" y1="150" x2="240" y2="150" stroke="#94a3b8" stroke-width="5" />
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
    }

    return `
      <svg viewBox="0 0 320 200" class="exercise-art-svg">
        <circle cx="160" cy="90" r="45" fill="#1e293b" stroke="#10b981" stroke-width="2" />
        <path d="M145 90 L155 100 L175 80" fill="none" stroke="#10b981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <text x="160" y="160" fill="#94a3b8" font-size="12" font-weight="600" text-anchor="middle">ฟอร์มแม่นยำ ปลอดภัย โดนกล้ามเนื้อเต็มร้อย</text>
      </svg>
    `;
  }

  // ==========================================
  // 8. GLOBAL EXERCISE DETAIL & MOTION MODAL
  // ==========================================
  let motionAnimationTimer = null;
  let activeMotionIndex = 0;

  function openGlobalExerciseModal(exerciseId) {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return;

    const modal = document.getElementById('globalExerciseModal');
    const modalBody = document.getElementById('globalExerciseModalBody');
    if (!modal || !modalBody) return;

    // Clear any previous animation
    if (motionAnimationTimer) {
      clearInterval(motionAnimationTimer);
      motionAnimationTimer = null;
    }
    activeMotionIndex = 0;

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
        <button class="modal-tab-btn" data-tab="warmup">🔥 เซ็ตวอร์มอัพ</button>
        <button class="modal-tab-btn" data-tab="diagram">📐 แผนผังชีวกลศาสตร์</button>
      </div>

      <div class="modal-tab-content active" id="tab-technique">
        <!-- Real Exercise Motion Showcase Player -->
        ${hasImages ? `
          <div class="motion-showcase-card">
            <div class="motion-showcase-header">
              <div class="motion-header-left">
                <span class="badge-source">📷 Open Exercise API</span>
                <span class="motion-state-badge" id="motionStepLabel">▶ จังหวะ 1</span>
              </div>
              <div class="motion-controls">
                <button class="btn btn-xs btn-primary" id="motionPlayToggleBtn">▶️ เล่น</button>
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
                  <span id="motionOverlayText">ท่าเริ่มต้น (Starting Position)</span>
                </div>
              </div>
              <div class="motion-thumbs-row">
                <div class="motion-thumb-item active" id="thumbCard0">
                  <img src="${img0}" alt="Stage 1" />
                  <div>
                    <span>1. ท่าเริ่มต้น</span>
                    <p>Setup</p>
                  </div>
                </div>
                <div class="motion-thumb-item" id="thumbCard1">
                  <img src="${img1}" alt="Stage 2" />
                  <div>
                    <span>2. จุดสิ้นสุด</span>
                    <p>Peak</p>
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
        <div class="anatomy-breakdown mt-3">
          <div class="breakdown-card"><h4>🎯 กล้ามเนื้อมัดหลัก (Primary Focus)</h4><ul>${exercise.primaryMuscles.map(m => `<li><strong>${m}</strong></li>`).join('')}</ul></div>
          <div class="breakdown-card"><h4>🤝 กล้ามเนื้อช่วยเสริม (Secondary Focus)</h4><ul>${exercise.secondaryMuscles.length > 0 ? exercise.secondaryMuscles.map(m => `<li>${m}</li>`).join('') : '<li>ไม่มี (ท่าแยกมัดเดียว)</li>'}</ul></div>
        </div>
      </div>

      <div class="modal-tab-content hidden" id="tab-warmup">
        <div class="warmup-calculator">
          <h4 class="section-title">เครื่องคำนวณเซ็ตวอร์มอัพ (Warm-Up Sets Calculator)</h4>
          <p class="tab-note">การวอร์มอัพข้อต่อและระบบประสาทช่วยป้องกันการบาดเจ็บและทำให้ยก Working Set ได้หนักขึ้น</p>
          <div class="form-group inline-group mt-3">
            <label>น้ำหนัก Working Weight เป้าหมาย (กก.):</label>
            <input type="number" id="globalWarmupWeightInput" class="form-control form-control-sm" value="60" min="20" max="300" step="2.5" />
          </div>
          <div id="globalWarmupResultContainer" class="mt-3"></div>
        </div>
      </div>

      <div class="modal-tab-content hidden" id="tab-diagram">
        <p class="tab-note">แผนผังเวกเตอร์แสดงมุมข้อต่อและแนววิถีแรงดึง (Biomechanical Path):</p>
        <div class="illustration-wrapper">
          ${renderExerciseIllustration(exercise.svgType)}
        </div>
      </div>
    `;

    // Bind Motion Player controls if images exist
    if (hasImages) {
      const heroImg = modalBody.querySelector('#motionHeroImg');
      const stepLabel = modalBody.querySelector('#motionStepLabel');
      const overlayText = modalBody.querySelector('#motionOverlayText');
      const playBtn = modalBody.querySelector('#motionPlayToggleBtn');
      const pick0 = modalBody.querySelector('#motionPick0Btn');
      const pick1 = modalBody.querySelector('#motionPick1Btn');
      const thumb0 = modalBody.querySelector('#thumbCard0');
      const thumb1 = modalBody.querySelector('#thumbCard1');

      // Short, fixed-width labels — same character count keeps header stable
      const STEP_LABELS = ['▶ จังหวะ 1', '▶ จังหวะ 2'];
      const OVERLAY_LABELS = ['ท่าเริ่มต้น (Starting Position)', 'จุดสูงสุด (Peak Contraction)'];

      function setStep(idx) {
        activeMotionIndex = idx;
        if (heroImg) heroImg.src = idx === 0 ? img0 : img1;
        // Update only textContent — never change innerHTML or element structure
        if (stepLabel) stepLabel.textContent = STEP_LABELS[idx];
        if (overlayText) overlayText.textContent = OVERLAY_LABELS[idx];
        if (pick0) pick0.classList.toggle('active-step', idx === 0);
        if (pick1) pick1.classList.toggle('active-step', idx === 1);
        if (thumb0) thumb0.classList.toggle('active', idx === 0);
        if (thumb1) thumb1.classList.toggle('active', idx === 1);
      }

      function togglePlay() {
        if (motionAnimationTimer) {
          clearInterval(motionAnimationTimer);
          motionAnimationTimer = null;
          if (playBtn) {
            playBtn.textContent = '▶️ เล่น';
            playBtn.classList.remove('btn-success');
            playBtn.classList.add('btn-primary');
          }
        } else {
          motionAnimationTimer = setInterval(() => {
            setStep(activeMotionIndex === 0 ? 1 : 0);
          }, 850);
          if (playBtn) {
            playBtn.textContent = '⏸️ หยุด';
            playBtn.classList.remove('btn-primary');
            playBtn.classList.add('btn-success');
          }
        }
      }

      if (playBtn) playBtn.onclick = togglePlay;
      if (pick0) pick0.onclick = () => { if (motionAnimationTimer) togglePlay(); setStep(0); };
      if (pick1) pick1.onclick = () => { if (motionAnimationTimer) togglePlay(); setStep(1); };
      if (thumb0) thumb0.onclick = () => { if (motionAnimationTimer) togglePlay(); setStep(0); };
      if (thumb1) thumb1.onclick = () => { if (motionAnimationTimer) togglePlay(); setStep(1); };
    }

    // Warmup Calculator binding
    function updateWarmupTable(w) {
      const sets = generateWarmUpSets(w);
      const plates = calculateBarbellPlates(w);
      const res = modalBody.querySelector('#globalWarmupResultContainer');
      if (res) {
        res.innerHTML = `
          <table class="table-warmup">
            <thead><tr><th>เซ็ต</th><th>น้ำหนัก</th><th>จำนวนครั้ง</th><th>เวลาพัก</th><th>จุดประสงค์</th></tr></thead>
            <tbody>
              ${sets.map(s => `<tr><td>เซ็ตที่ ${s.step}</td><td><strong class="highlight-text">${s.weight} กก.</strong></td><td>${s.reps} ครั้ง</td><td>${s.restSec} วิ</td><td>${s.note}</td></tr>`).join('')}
              <tr class="table-highlight-row"><td><strong>🔥 Working Set</strong></td><td><strong class="text-success">${w} กก.</strong></td><td>ตามเป้าหมาย</td><td>2-3 นาที</td><td>เซ็ตจริง</td></tr>
            </tbody>
          </table>
          <div class="plate-breakdown-card mt-3">
            <h4>🏋️ แผ่นน้ำหนักบาร์เบล (ข้างละ):</h4>
            <p>${plates.plates.length > 0 ? plates.plates.map(p => `<span class="plate-tag">${p.plate} กก. x ${p.count}</span>`).join(' ') : 'บาร์เปล่า 20 กก.'}</p>
          </div>
        `;
      }
    }
    updateWarmupTable(60);
    const win = modalBody.querySelector('#globalWarmupWeightInput');
    if (win) win.oninput = (e) => updateWarmupTable(parseFloat(e.target.value) || 20);

    // Modal Tabs
    modalBody.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.onclick = () => {
        modalBody.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
        modalBody.querySelectorAll('.modal-tab-content').forEach(c => c.classList.add('hidden'));
        btn.classList.add('active');
        const t = modalBody.querySelector(`#tab-${btn.dataset.tab}`);
        if (t) t.classList.remove('hidden');
      };
    });

    // Close Modal handler
    const closeHandler = () => {
      if (motionAnimationTimer) {
        clearInterval(motionAnimationTimer);
        motionAnimationTimer = null;
      }
      modal.classList.add('hidden');
    };

    const closeBtn = modalBody.querySelector('#closeGlobalModalBtn');
    if (closeBtn) closeBtn.onclick = closeHandler;
    modal.onclick = (e) => {
      if (e.target === modal) closeHandler();
    };

    modal.classList.remove('hidden');
  }

  // ==========================================
  // 9. VIEW CONTROLLER & TAB SWITCHING
  // ==========================================
  let currentCategory = 'all';
  let exerciseSearchQuery = '';
  let activeWorkoutState = null;
  let workoutElapsedSec = 0;
  let workoutInterval = null;
  let selectedPlanId = 'ppl-classic-3day';
  let calcExerciseId = 'barbell-bench-press';
  let calcWeight = 70;
  let calcReps = 8;
  let syncPlanId = null;
  let baselineSnapshot = null;
  let overrideEditorId = null;
  let lastSyncRows = [];

  function switchTab(tabName) {
    document.querySelectorAll('.nav-btn, .bottom-nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.app-view').forEach(viewEl => viewEl.classList.add('hidden'));
    const targetEl = document.getElementById(`view-${tabName}`);
    if (targetEl) targetEl.classList.remove('hidden');

    if (tabName === 'plans') renderPlansView();
    else if (tabName === 'workout') renderWorkoutView();
    else if (tabName === 'goals') renderGoalsView();
    else if (tabName === 'exercises') renderExercisesView();
    else if (tabName === 'history') renderHistoryView();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- RENDER PLANS ---
  function renderPlansView() {
    const container = document.getElementById('view-plans');
    if (!container) return;

    const plans = storage.getPlans();
    const profile = storage.getProfile();
    const planGoalId = profile.selectedGoal || 'hypertrophy';
    const activePlan = plans.find(p => p.id === selectedPlanId) || plans[0];

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title">🏋️ แผนการฝึกซ้อม (Workout Plans)</h2>
          <p class="view-subtitle">เลือกและออกแบบตารางฝึกยอดนิยม เช่น Push Pull Legs (PPL) เพื่อสร้างกล้ามเนื้อและพัฒนาความแข็งแกร่ง</p>
        </div>
        <button class="btn btn-outline" id="createNewPlanBtn">➕ ออกแบบแผนใหม่</button>
      </div>

      <div class="plan-tabs-bar">
        ${plans.map(p => `
          <button class="plan-tab-item ${p.id === activePlan.id ? 'active' : ''}" data-plan-id="${p.id}">
            <span class="plan-tab-title">${p.name}</span>
            <span class="plan-tab-badge">${p.badge || 'ตารางฝึก'}</span>
          </button>
        `).join('')}
      </div>

      <div class="plan-hero-banner">
        <div class="d-flex justify-between align-center flex-wrap gap-2">
          <div>
            <div class="d-flex align-center gap-2">
              <span class="badge-cat">แผนที่กำลังเปิดดู</span>
              ${profile.activePlanId === activePlan.id ? '<span class="badge-success">✓ แผนหลักปัจจุบัน</span>' : ''}
            </div>
            <h3 class="plan-hero-title">${activePlan.name}</h3>
            <p class="plan-hero-desc">${activePlan.description}</p>
            <p class="plan-frequency-text">📅 ความถี่ที่แนะนำ: <strong>${activePlan.frequency || '3-6 วัน/สัปดาห์'}</strong></p>
          </div>
          <div class="banner-actions">
            ${profile.activePlanId !== activePlan.id ? `
              <button class="btn btn-primary" id="setActivePlanBtn" data-plan-id="${activePlan.id}">⭐ ตั้งเป็นแผนหลัก</button>
            ` : `
              <button class="btn btn-success" disabled>✓ แผนหลักพร้อมใช้งาน</button>
            `}
          </div>
        </div>
      </div>

      <h3 class="section-title mt-4">ตารางการฝึกแต่ละวัน (คลิกที่ท่าฝึกเพื่อดูภาพถ่าย & เทคนิค):</h3>
      <div class="plan-days-grid">
        ${activePlan.days.map((day, idx) => `
          <div class="plan-day-card" style="border-top: 4px solid ${day.color || '#3b82f6'};">
            <div class="day-card-header">
              <div>
                <h4 class="day-title">${day.name}</h4>
                <p class="day-desc">${day.description}</p>
              </div>
              <span class="day-num-badge">วันที่ ${idx + 1}</span>
            </div>

            <!-- Clickable exercises list with real photos -->
            <div class="day-exercises-list">
              ${day.exercises.map((item, i) => {
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
                      <span class="ex-idx">${i + 1}.</span>
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
              <button class="btn btn-primary btn-block start-day-btn" data-plan-id="${activePlan.id}" data-day-id="${day.id}">▶ เริ่มออกกำลังกายวันนี้</button>
              <button class="btn btn-secondary btn-block edit-day-btn mt-2" data-plan-id="${activePlan.id}" data-day-id="${day.id}">✏️ ปรับแต่งท่าฝึกในวันนี้</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div id="editDayModal" class="modal-backdrop hidden"><div class="modal-content modal-lg" id="editDayModalBody"></div></div>
    `;

    // 1. Bind Plan Tabs
    container.querySelectorAll('.plan-tab-item').forEach(tab => {
      tab.onclick = () => { selectedPlanId = tab.dataset.planId; renderPlansView(); };
    });

    // 2. Set as active plan button
    const setBtn = container.querySelector('#setActivePlanBtn');
    if (setBtn) {
      setBtn.onclick = () => { storage.updateProfile({ activePlanId: setBtn.dataset.planId }); renderPlansView(); };
    }

    // 3. CRITICAL: Bind click on ALL exercise rows in the plan!
    container.querySelectorAll('.day-ex-row').forEach(row => {
      row.onclick = (e) => {
        const exId = row.dataset.exerciseId;
        if (exId) {
          openGlobalExerciseModal(exId);
        }
      };
    });

    // 4. Start workout button
    container.querySelectorAll('.start-day-btn').forEach(btn => {
      btn.onclick = () => {
        const plan = storage.getPlanById(btn.dataset.planId);
        const day = plan.days.find(d => d.id === btn.dataset.dayId);
        if (day) startLiveWorkout(plan, day);
      };
    });

    // 5. Edit day exercises
    container.querySelectorAll('.edit-day-btn').forEach(btn => {
      btn.onclick = () => openEditDayModal(btn.dataset.planId, btn.dataset.dayId);
    });

    // 6. Create custom plan
    const newPlanBtn = container.querySelector('#createNewPlanBtn');
    if (newPlanBtn) {
      newPlanBtn.onclick = () => createCustomPlan();
    }
  }

  function createCustomPlan() {
    const plans = storage.getPlans();
    const newId = 'custom-plan-' + Date.now();
    plans.push({
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
    });
    storage.savePlans(plans);
    selectedPlanId = newId;
    renderPlansView();
  }

  function openEditDayModal(planId, dayId) {
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
          <p class="modal-subtitle">เพิ่ม/ลดท่าฝึก ปรับจำนวนเซ็ตและจำนวนครั้ง</p>
        </div>
        <button class="modal-close-btn" id="closeEditModalBtn">✕</button>
      </div>
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
                <div class="input-inline"><label>เซ็ต:</label><input type="number" class="edit-sets form-control form-control-sm" value="${item.sets}" min="1" max="10" /></div>
                <div class="input-inline"><label>ครั้ง:</label><input type="text" class="edit-reps form-control form-control-sm" value="${item.targetReps}" /></div>
                <div class="input-inline"><label>พัก:</label><input type="number" class="edit-rest form-control form-control-sm" value="${item.restSec}" min="15" max="300" step="15" /></div>
                <button class="btn btn-danger btn-sm remove-ex-btn">🗑️</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="add-exercise-section mt-3">
        <h4>➕ เพิ่มท่าออกกำลังกายใหม่:</h4>
        <div class="d-flex gap-2 mt-2">
          <select id="newExSelect" class="form-control">
            ${EXERCISES.map(e => `<option value="${e.id}">${e.nameTh} (${e.category.toUpperCase()})</option>`).join('')}
          </select>
          <button class="btn btn-outline" id="addNewExBtn">เพิ่มเข้าตาราง</button>
        </div>
      </div>
      <div class="modal-footer mt-4 d-flex justify-between">
        <button class="btn btn-secondary" id="cancelEditModalBtn">ยกเลิก</button>
        <button class="btn btn-success" id="saveDayChangesBtn">💾 บันทึกการเปลี่ยนแปลง</button>
      </div>
    `;

    const closeHandler = () => modal.classList.add('hidden');
    modalBody.querySelector('#closeEditModalBtn').onclick = closeHandler;
    modalBody.querySelector('#cancelEditModalBtn').onclick = closeHandler;

    modalBody.querySelectorAll('.remove-ex-btn').forEach(btn => {
      btn.onclick = () => btn.closest('.editor-row').remove();
    });

    const addBtn = modalBody.querySelector('#addNewExBtn');
    const select = modalBody.querySelector('#newExSelect');
    if (addBtn && select) {
      addBtn.onclick = () => {
        const id = select.value;
        const ex = getExerciseById(id);
        const list = modalBody.querySelector('#editorExList');
        const count = list.children.length;
        const newRow = document.createElement('div');
        newRow.className = 'editor-row';
        newRow.dataset.newId = id;
        newRow.innerHTML = `
          <div class="editor-ex-main"><span class="ex-idx">${count + 1}.</span><strong>${ex ? ex.nameTh : id}</strong></div>
          <div class="editor-controls">
            <div class="input-inline"><label>เซ็ต:</label><input type="number" class="edit-sets form-control form-control-sm" value="3" min="1" max="10" /></div>
            <div class="input-inline"><label>ครั้ง:</label><input type="text" class="edit-reps form-control form-control-sm" value="8-12" /></div>
            <div class="input-inline"><label>พัก:</label><input type="number" class="edit-rest form-control form-control-sm" value="90" min="15" max="300" step="15" /></div>
            <button class="btn btn-danger btn-sm remove-ex-btn">🗑️</button>
          </div>
        `;
        newRow.querySelector('.remove-ex-btn').onclick = () => newRow.remove();
        list.appendChild(newRow);
      };
    }

    modalBody.querySelector('#saveDayChangesBtn').onclick = () => {
      const rows = modalBody.querySelectorAll('.editor-row');
      const newExercises = [];
      rows.forEach(row => {
        const idx = parseInt(row.dataset.index, 10);
        const origItem = day.exercises[idx];
        const exId = row.dataset.newId || (origItem ? origItem.exerciseId : null);
        const sets = parseInt(row.querySelector('.edit-sets').value, 10) || 3;
        const targetReps = row.querySelector('.edit-reps').value.trim() || '8-12';
        const restSec = parseInt(row.querySelector('.edit-rest').value, 10) || 90;
        if (exId) newExercises.push({ exerciseId: exId, sets, targetReps, rpe: 8, restSec });
      });
      day.exercises = newExercises;
      storage.savePlan(plan);
      modal.classList.add('hidden');
      renderPlansView();
    };

    modal.classList.remove('hidden');
  }

  // --- RENDER LIVE WORKOUT ---
  function startLiveWorkout(plan, day) {
    const profile = storage.getProfile();
    const currentGoalId = profile.selectedGoal || 'hypertrophy';

    const exercises = day.exercises.map(item => {
      const history = storage.getExerciseHistory(item.exerciseId);
      const recommendation = getProgressiveOverloadRecommendation(
        item.exerciseId,
        history,
        currentGoalId,
        storage.getExerciseBaseline(item.exerciseId)
      );
      const defaultWeight = recommendation.suggestedWeight || 20;

      let defaultReps = 10;
      if (typeof item.targetReps === 'string' && item.targetReps.includes('-')) {
        defaultReps = parseInt(item.targetReps.split('-')[0], 10) || 10;
      }

      const sets = [];
      for (let i = 1; i <= item.sets; i++) {
        sets.push({
          setNum: i,
          weight: defaultWeight,
          reps: defaultReps,
          rpe: item.rpe || 8,
          completed: false,
          previous: history.length > 0 && history[history.length - 1].sets[i - 1]
            ? `${history[history.length - 1].sets[i - 1].weight} กก. × ${history[history.length - 1].sets[i - 1].reps}`
            : '-'
        });
      }
      return { exerciseId: item.exerciseId, targetReps: item.targetReps, restSec: item.restSec || 90, recommendation, sets };
    });

    activeWorkoutState = {
      id: 'workout_' + Date.now(),
      startTime: Date.now(),
      planId: plan.id,
      planName: plan.name,
      dayId: day.id,
      dayName: day.name,
      exercises
    };

    workoutElapsedSec = 0;
    if (workoutInterval) clearInterval(workoutInterval);
    workoutInterval = setInterval(() => {
      workoutElapsedSec++;
      const el = document.getElementById('workoutElapsedDisplay');
      if (el) el.textContent = formatDuration(workoutElapsedSec);
    }, 1000);

    storage.saveActiveWorkout(activeWorkoutState);
    switchTab('workout');
  }

  function formatDuration(sec) {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function renderWorkoutView() {
    const container = document.getElementById('view-workout');
    if (!container) return;

    if (!activeWorkoutState) {
      const saved = storage.getActiveWorkout();
      if (saved) {
        activeWorkoutState = saved;
        workoutElapsedSec = Math.max(0, Math.floor((Date.now() - saved.startTime) / 1000));
        if (workoutInterval) clearInterval(workoutInterval);
        workoutInterval = setInterval(() => {
          workoutElapsedSec++;
          const el = document.getElementById('workoutElapsedDisplay');
          if (el) el.textContent = formatDuration(workoutElapsedSec);
        }, 1000);
      }
    }

    if (!activeWorkoutState) {
      const plans = storage.getPlans();
      const profile = storage.getProfile();
      const activePlan = plans.find(p => p.id === profile.activePlanId) || plans[0];

      container.innerHTML = `
        <div class="view-header">
          <div>
            <h2 class="view-title">⚡ บันทึกการออกกำลังกาย (Workout Tracker)</h2>
            <p class="view-subtitle">พร้อมเริ่มฝึกหรือยัง? เลือกวันฝึกจากแผน <strong>${activePlan.name}</strong> ด้านล่าง</p>
          </div>
        </div>
        <div class="empty-workout-state">
          <div class="empty-icon">🏋️‍♂️</div>
          <h3>ยังไม่มีเซสชันที่กำลังดำเนินการ</h3>
          <div class="quick-start-days-grid mt-4">
            ${activePlan.days.map(d => `
              <div class="quick-start-card" style="border-top: 4px solid ${d.color || '#3b82f6'};">
                <h4>${d.name}</h4>
                <p class="text-muted text-sm">${d.description}</p>
                <button class="btn btn-primary btn-block quick-launch-btn mt-3" data-day-id="${d.id}">▶ เริ่ม ${d.name}</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      container.querySelectorAll('.quick-launch-btn').forEach(btn => {
        btn.onclick = () => {
          const day = activePlan.days.find(d => d.id === btn.dataset.dayId);
          if (day) startLiveWorkout(activePlan, day);
        };
      });
      return;
    }

    let currentVolume = 0;
    activeWorkoutState.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed && s.weight > 0 && s.reps > 0) currentVolume += (s.weight * s.reps);
      });
    });

    container.innerHTML = `
      <div class="active-session-bar">
        <div class="session-left">
          <span class="live-dot"></span>
          <div>
            <h3 class="session-day-name">${activeWorkoutState.dayName}</h3>
            <span class="session-plan-name">${activeWorkoutState.planName}</span>
          </div>
        </div>
        <div class="session-metrics">
          <div class="metric-pill">
            <span class="metric-label">⏱️ เวลา</span>
            <span class="metric-val" id="workoutElapsedDisplay">${formatDuration(workoutElapsedSec)}</span>
          </div>
          <div class="metric-pill">
            <span class="metric-label">⚖️ ปริมาณยก</span>
            <span class="metric-val text-success" id="workoutVolumeDisplay">${currentVolume.toLocaleString()} กก.</span>
          </div>
          <div class="metric-pill metric-pill-progress">
            <span class="metric-label">🎯 เซ็ตที่เหลือ</span>
            <span class="metric-val text-accent" id="workoutSetsLeft">${getTotalRemainingSets()}</span>
          </div>
        </div>
        <div class="session-actions">
          <button class="btn btn-outline btn-sm dimmer-toggle-btn" id="dimmerToggleBtn" aria-pressed="false" title="เปิดโหมดโค้ดหน้าจอ (กันหน้าจอดับ)">${screenDimmer.settings.enabled ? '☀️' : '🌙'}</button>
          <button class="btn btn-success" id="finishWorkoutBtn">🏁 สรุปและบันทึก</button>
          <button class="btn btn-outline-danger btn-sm" id="cancelWorkoutBtn" title="ยกเลิก">✕</button>
        </div>
      </div>

      <div id="restTimerWidget" class="rest-timer-banner">
        <div class="timer-info">
          <span class="timer-icon">⏳</span>
          <span class="timer-label">ตัวจับเวลาพัก:</span>
          <strong class="timer-clock" id="timerClockDisplay">00:00</strong>
        </div>
        <div class="timer-controls">
          <button class="btn btn-sm btn-outline" id="timerAdd30Btn">+30 วิ</button>
          <button class="btn btn-sm btn-outline" id="timerSkipBtn">ข้าม</button>
        </div>
      </div>

      <div class="workout-exercises-container mt-3">
        ${activeWorkoutState.exercises.map((exItem, exIdx) => {
          const ex = getExerciseById(exItem.exerciseId);
          const reco = exItem.recommendation;
          const thumb = ex && ex.images ? ex.images[0] : '';
          return `
            <div class="card card-workout-ex" data-exercise-index="${exIdx}">
              <div class="workout-ex-header">
                <div class="d-flex align-center gap-2">
                  ${thumb ? `<img src="${thumb}" class="day-ex-thumb" style="width:48px;height:48px;" alt="" />` : ''}
                  <div>
                    <span class="badge-cat">${ex ? ex.category.toUpperCase() : 'EXERCISE'}</span>
                    <h3 class="workout-ex-title">${ex ? ex.nameTh : exItem.exerciseId}</h3>
                  </div>
                </div>
                <button class="btn btn-sm btn-secondary open-tech-btn" data-exercise-id="${exItem.exerciseId}">📖 ดูเทคนิค & ท่าฝึก</button>
              </div>

              ${reco ? `
                <div class="progression-hint-box" style="border-left: 4px solid ${reco.color || '#10b981'};">
                  <div class="hint-header">
                    <span class="hint-badge" style="background: ${reco.color || '#10b981'}22; color: ${reco.color || '#10b981'};">${reco.badge}</span>
                    <strong class="hint-target">แนะนำ: ${reco.suggestedWeight} กก. (${reco.targetReps})</strong>
                  </div>
                  <p class="hint-reason">${reco.reason}</p>
                </div>
              ` : ''}

              <!-- ชุดเครื่องมือ "ระหว่างเซ็ต": ดูความคืบหน้า ทำซ้ำเซ็ตก่อน และปรับน้ำหนักเร็ว ๆ -->
              <div class="quick-log-bar" data-ex-idx="${exIdx}">
                <div class="quick-progress">
                  <span class="quick-progress-label">เซ็ต</span>
                  <strong class="quick-progress-value" data-role="done">0</strong>
                  <span class="quick-progress-sep">/</span>
                  <span class="quick-progress-total" data-role="total">${exItem.sets.length}</span>
                  <span class="quick-progress-left" data-role="left">เหลือ ${exItem.sets.length} เซ็ต</span>
                </div>
                <div class="quick-actions">
                  <button class="btn btn-xs btn-secondary quick-repeat-btn" title="คัดลอกน้ำหนัก/จำนวนครั้งจากเซ็ตล่าสุดที่ทำสำเร็จ">
                    🔁 ซ้ำเซ็ตก่อน
                  </button>
                  <div class="weight-stepper" role="group" aria-label="ปรับน้ำหนัก">
                    <button class="step-btn" data-delta="-2.5">−2.5</button>
                    <button class="step-btn" data-delta="-1">−1</button>
                    <button class="step-btn" data-delta="1">+1</button>
                    <button class="step-btn" data-delta="2.5">+2.5</button>
                  </div>
                </div>
              </div>

              <div class="table-responsive mt-3">
                <table class="table-sets">
                  <thead>
                    <tr>
                      <th style="width: 45px;">เซ็ต</th>
                      <th>ครั้งก่อน</th>
                      <th>น้ำหนัก (กก.)</th>
                      <th>จำนวนครั้ง</th>
                      <th>RPE</th>
                      <th style="width: 65px; text-align: center;">สำเร็จ</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${exItem.sets.map((set, setIdx) => `
                      <tr class="set-row ${set.completed ? 'set-completed' : ''}" data-set-index="${setIdx}">
                        <td data-label="เซ็ตที่"><strong>${set.setNum}</strong></td>
                        <td class="text-muted" data-label="ครั้งก่อน">${set.previous || '-'}</td>
                        <td data-label="น้ำหนัก (กก.)"><input type="number" class="set-input set-weight" value="${set.weight}" min="0" max="500" step="0.5" /></td>
                        <td data-label="จำนวนครั้ง"><input type="number" class="set-input set-reps" value="${set.reps}" min="1" max="50" /></td>
                        <td data-label="RPE">
                          <select class="set-input set-rpe">
                            <option value="7" ${set.rpe === 7 ? 'selected' : ''}>7</option>
                            <option value="8" ${set.rpe === 8 ? 'selected' : ''}>8 (แนะนำ)</option>
                            <option value="8.5" ${set.rpe === 8.5 ? 'selected' : ''}>8.5</option>
                            <option value="9" ${set.rpe === 9 ? 'selected' : ''}>9</option>
                            <option value="10" ${set.rpe === 10 ? 'selected' : ''}>10</option>
                          </select>
                        </td>
                        <td data-label="สำเร็จ" style="text-align: center;">
                          <div class="set-check-wrap">
                            <button class="set-check-btn ${set.completed ? 'checked' : ''}" data-ex-idx="${exIdx}" data-set-idx="${setIdx}">
                              ${set.completed ? '✓' : '○'}
                            </button>
                            <button class="set-copy-btn" data-ex-idx="${exIdx}" data-set-idx="${setIdx}" title="คัดลอกค่าจากเซ็ตนี้ไปยังเซ็ตถัดไป">⤵</button>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-between align-center mt-3">
                <button class="btn btn-outline btn-sm add-set-btn" data-ex-idx="${exIdx}">➕ เพิ่มเซ็ต</button>
                <span class="text-muted text-sm">พัก ${exItem.restSec} วิ อัตโนมัติ</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div id="workoutSummaryModal" class="modal-backdrop hidden"><div class="modal-content" id="workoutSummaryBody"></div></div>
    `;

    // Connect rest timer
    globalTimer.subscribe(state => {
      const clock = document.getElementById('timerClockDisplay');
      const widget = document.getElementById('restTimerWidget');
      if (clock) clock.textContent = state.formatted;
      if (widget) widget.classList.toggle('active', state.isRunning);
      screenDimmer.updateTimer(state);
    });

    const add30 = document.getElementById('timerAdd30Btn');
    const skip = document.getElementById('timerSkipBtn');
    if (add30) add30.onclick = () => globalTimer.addSeconds(30);
    if (skip) skip.onclick = () => globalTimer.stop();

    // Table inputs & completion buttons
    container.querySelectorAll('.card-workout-ex').forEach(card => {
      const exIdx = parseInt(card.dataset.exerciseIndex, 10);
      const exItem = activeWorkoutState.exercises[exIdx];

      card.querySelectorAll('.set-row').forEach(row => {
        const setIdx = parseInt(row.dataset.setIndex, 10);
        const setObj = exItem.sets[setIdx];

        const wInput = row.querySelector('.set-weight');
        const rInput = row.querySelector('.set-reps');
        const rpeInput = row.querySelector('.set-rpe');

        if (wInput) wInput.onchange = (e) => { setObj.weight = parseFloat(e.target.value) || 0; storage.saveActiveWorkout(activeWorkoutState); updateVolumeDisplay(); };
        if (rInput) rInput.onchange = (e) => { setObj.reps = parseInt(e.target.value, 10) || 0; storage.saveActiveWorkout(activeWorkoutState); updateVolumeDisplay(); };
        if (rpeInput) rpeInput.onchange = (e) => { setObj.rpe = parseFloat(e.target.value) || 8; storage.saveActiveWorkout(activeWorkoutState); };
      });
    });

    container.querySelectorAll('.set-check-btn').forEach(btn => {
      btn.onclick = () => {
        const exIdx = parseInt(btn.dataset.exIdx, 10);
        const setIdx = parseInt(btn.dataset.setIdx, 10);
        const exItem = activeWorkoutState.exercises[exIdx];
        const setObj = exItem.sets[setIdx];

        setObj.completed = !setObj.completed;
        storage.saveActiveWorkout(activeWorkoutState);
        btn.classList.toggle('checked', setObj.completed);
        btn.textContent = setObj.completed ? '✓' : '○';
        btn.closest('.set-row').classList.toggle('set-completed', setObj.completed);

        updateVolumeDisplay();
        updateQuickProgress();

        if (setObj.completed) {
          globalTimer.start(exItem.restSec || 90);
          // เตรียมเซ็ตถัดไปให้เท่ากับเซ็ตที่เพิ่งทำสำเร็จ (Progressive Overload แบบ Double Progression)
          applyLastCompletedToNext(exIdx);
        }
      };
    });

    // ปุ่ม "⤴": คัดลอกค่าเซ็ตนี้ไปยังเซ็ตถัดไปที่ยังไม่สำเร็จ
    container.querySelectorAll('.set-copy-btn').forEach(btn => {
      btn.onclick = () => {
        const exIdx = parseInt(btn.dataset.exIdx, 10);
        const setIdx = parseInt(btn.dataset.setIdx, 10);
        copySetToNext(exIdx, setIdx);
      };
    });

    // ชุดเครื่องมือระหว่างเซ็ต
    container.querySelectorAll('.quick-log-bar').forEach(bar => {
      const exIdx = parseInt(bar.dataset.exIdx, 10);

      const repeatBtn = bar.querySelector('.quick-repeat-btn');
      if (repeatBtn) {
        repeatBtn.onclick = () => {
          const exItem = activeWorkoutState.exercises[exIdx];
          const source = exItem.sets.filter(s => s.completed).pop();
          if (!source) {
            // ยังไม่มีเซ็ตไหนสำเร็จเลย -> ใช้ค่าของเซ็ตก่อนหน้าในเซสชันนี้แทน
            const fallback = exItem.sets.find(s => s.weight > 0) || exItem.sets[0];
            fillPendingSetsWith(exIdx, fallback);
            return;
          }
          fillPendingSetsWith(exIdx, source);
        };
      }

      bar.querySelectorAll('.step-btn').forEach(stepBtn => {
        stepBtn.onclick = () => {
          const exItem = activeWorkoutState.exercises[exIdx];
          const targetIdx = findTargetSetIndex(exItem);
          const target = exItem.sets[targetIdx];
          const delta = parseFloat(stepBtn.dataset.delta) || 0;
          target.weight = Math.max(0, Math.round((target.weight + delta) * 2) / 2);

          const row = container.querySelector(`.set-row[data-set-index="${targetIdx}"]`);
          const input = row && row.querySelector('.set-weight');
          if (input) input.value = target.weight;

          storage.saveActiveWorkout(activeWorkoutState);
          updateQuickProgress();
          updateVolumeDisplay();
        };
      });
    });

    updateQuickProgress();
    syncStickyOffsets();

    container.querySelectorAll('.add-set-btn').forEach(btn => {
      btn.onclick = () => {
        const exIdx = parseInt(btn.dataset.exIdx, 10);
        const exItem = activeWorkoutState.exercises[exIdx];
        const last = exItem.sets[exItem.sets.length - 1];
        exItem.sets.push({
          setNum: exItem.sets.length + 1,
          weight: last ? last.weight : 20,
          reps: last ? last.reps : 10,
          rpe: 8,
          completed: false,
          previous: '-'
        });
        storage.saveActiveWorkout(activeWorkoutState);
        renderWorkoutView();
      };
    });

    container.querySelectorAll('.open-tech-btn').forEach(btn => {
      btn.onclick = () => openGlobalExerciseModal(btn.dataset.exerciseId);
    });

    const cancelBtn = container.querySelector('#cancelWorkoutBtn');
    if (cancelBtn) {
      cancelBtn.onclick = () => {
        if (confirm('ต้องการยกเลิกการออกกำลังกายครั้งนี้หรือไม่?')) {
          if (workoutInterval) clearInterval(workoutInterval);
          globalTimer.stop();
          screenDimmer.shutdown();
          storage.clearActiveWorkout();
          activeWorkoutState = null;
          renderWorkoutView();
        }
      };
    }

    const finishBtn = container.querySelector('#finishWorkoutBtn');
    if (finishBtn) {
      finishBtn.onclick = () => finishCurrentWorkout();
    }

    // ปุ่มเปิด/ปิดโหมดโค้ดหน้าจอ (one-tap)
    container.querySelectorAll('.dimmer-toggle-btn').forEach(btn => {
      btn.onclick = () => {
        screenDimmer.toggle();
        if ('vibrate' in navigator) {
          try { navigator.vibrate(20); } catch (e) { /* ignore */ }
        }
      };
    });

    // ปิดโหมดโค้ดหน้าจออัตโนมัติเมื่อเปลี่ยนแท็บ/ออกจากหน้าออกกำลังกาย
    screenDimmer.updateTimer(globalTimer.getState());
  }

  function updateVolumeDisplay() {
    if (!activeWorkoutState) return;
    let vol = 0;
    activeWorkoutState.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed && s.weight > 0 && s.reps > 0) vol += (s.weight * s.reps);
      });
    });
    const el = document.getElementById('workoutVolumeDisplay');
    if (el) el.textContent = `${Math.round(vol).toLocaleString()} กก.`;
  }

  // ===== Between-sets helpers (ออกแบบมาให้ใช้ง่ายบนมือถือระหว่างเซ็ต) =====
  function getTotalRemainingSets() {
    let remaining = 0;
    activeWorkoutState.exercises.forEach(ex => {
      remaining += ex.sets.filter(s => !s.completed).length;
    });
    return remaining;
  }

  // เซ็ตที่กำลังจะทำ: เซ็ตแรกที่ยังไม่สำเร็จ ถ้าครบแล้วให้ใช้เซ็ตสุดท้าย
  function findTargetSetIndex(exItem) {
    const pending = exItem.sets.findIndex(s => !s.completed);
    return pending === -1 ? exItem.sets.length - 1 : pending;
  }

  function syncSetRowInputs(exIdx, setIdx) {
    const row = document.querySelector(
      `#view-workout .card-workout-ex[data-exercise-index="${exIdx}"] .set-row[data-set-index="${setIdx}"]`
    );
    if (!row) return;
    const set = activeWorkoutState.exercises[exIdx].sets[setIdx];
    const w = row.querySelector('.set-weight');
    const r = row.querySelector('.set-reps');
    const p = row.querySelector('.set-rpe');
    if (w) w.value = set.weight;
    if (r) r.value = set.reps;
    if (p) p.value = set.rpe;
  }

  function fillPendingSetsWith(exIdx, source) {
    const exItem = activeWorkoutState.exercises[exIdx];
    exItem.sets.forEach(s => {
      if (!s.completed) {
        s.weight = source.weight;
        s.reps = source.reps;
        s.rpe = source.rpe;
      }
    });
    storage.saveActiveWorkout(activeWorkoutState);
    renderWorkoutView();
  }

  function applyLastCompletedToNext(exIdx) {
    const exItem = activeWorkoutState.exercises[exIdx];
    const doneIdx = exItem.sets.findIndex(s => !s.completed);
    if (doneIdx === -1) return;

    const lastDone = exItem.sets[doneIdx - 1];
    if (!lastDone) return;

    const next = exItem.sets[doneIdx];
    next.weight = lastDone.weight;
    next.reps = lastDone.reps;
    next.rpe = lastDone.rpe;

    syncSetRowInputs(exIdx, doneIdx);
    storage.saveActiveWorkout(activeWorkoutState);
  }

  function copySetToNext(exIdx, setIdx) {
    const exItem = activeWorkoutState.exercises[exIdx];
    const source = exItem.sets[setIdx];
    const nextIdx = exItem.sets.findIndex((s, i) => i > setIdx && !s.completed);
    if (nextIdx === -1) return;

    const next = exItem.sets[nextIdx];
    next.weight = source.weight;
    next.reps = source.reps;
    next.rpe = source.rpe;

    syncSetRowInputs(exIdx, nextIdx);
    storage.saveActiveWorkout(activeWorkoutState);
    updateQuickProgress();
  }

  function highlightTargetSet(exIdx, setIdx) {
    const container = document.getElementById('view-workout');
    if (!container) return;

    const card = container.querySelector(`.card-workout-ex[data-exercise-index="${exIdx}"]`);
    if (!card) return;

    card.querySelectorAll('.set-row.is-target').forEach(row => row.classList.remove('is-target'));
    const row = card.querySelector(`.set-row[data-set-index="${setIdx}"]`);
    if (row) row.classList.add('is-target');
  }

  // อัปเดตตัวนับทุกช่องโดยไม่ต้องเรนเดอร์ใหม่ทั้งหน้า
  function updateQuickProgress() {
    const container = document.getElementById('view-workout');
    if (!container || !activeWorkoutState) return;

    activeWorkoutState.exercises.forEach((exItem, exIdx) => {
      const bar = container.querySelector(`.quick-log-bar[data-ex-idx="${exIdx}"]`);
      if (!bar) return;

      const done = exItem.sets.filter(s => s.completed).length;
      const total = exItem.sets.length;
      const left = total - done;

      const doneEl = bar.querySelector('[data-role="done"]');
      const totalEl = bar.querySelector('[data-role="total"]');
      const leftEl = bar.querySelector('[data-role="left"]');
      if (doneEl) doneEl.textContent = done;
      if (totalEl) totalEl.textContent = total;
      if (leftEl) leftEl.textContent = left > 0 ? `เหลือ ${left} เซ็ต` : 'ครบทุกเซ็ตแล้ว';

      bar.classList.toggle('is-complete', left === 0);
      highlightTargetSet(exIdx, findTargetSetIndex(exItem));
    });

    const leftEl = document.getElementById('workoutSetsLeft');
    if (leftEl) {
      const remaining = getTotalRemainingSets();
      leftEl.textContent = remaining;
      leftEl.classList.toggle('text-success', remaining === 0);
    }

    // ส่งบริบท "ท่าที่กำลังจะทำ" ไปยังหน้าจอโค้ดมืด
    let nextIdx = activeWorkoutState.exercises.findIndex(ex => ex.sets.some(s => !s.completed));
    if (nextIdx === -1) nextIdx = 0;
    const nextEx = activeWorkoutState.exercises[nextIdx];
    if (nextEx) {
      const nextSetIdx = findTargetSetIndex(nextEx);
      const meta = getExerciseById(nextEx.exerciseId);
      screenDimmer.setContext({
        exerciseName: meta ? meta.nameTh : nextEx.exerciseId,
        setLabel: nextEx.sets[nextSetIdx] ? `เซ็ตที่ ${nextEx.sets[nextSetIdx].setNum}` : '',
        setsDone: nextEx.sets.filter(s => s.completed).length,
        setsTotal: nextEx.sets.length
      });
    }
  }

  // Summarise what this session taught the weight-progression model
  function collectLearnedUpdates(workout) {
    const updates = [];
    (workout.exercises || []).forEach(ex => {
      const validSets = (ex.sets || []).filter(s => s.completed && s.weight > 0 && s.reps > 0);
      if (validSets.length === 0) return;

      const topSet = validSets.reduce((best, s) => (s.weight > best.weight ? s : best), validSets[0]);
      const logged = getLogged1RM([{ sets: validSets }]);
      const historyBefore = storage.getExerciseHistory(ex.exerciseId).length;
      const exercise = getExerciseById(ex.exerciseId);

      updates.push({
        exerciseId: ex.exerciseId,
        name: exercise ? exercise.nameTh : ex.exerciseId,
        topWeight: topSet.weight,
        topReps: topSet.reps,
        est1RM: logged.est1RM,
        isNew: historyBefore <= 1
      });
    });
    return updates;
  }

  function finishCurrentWorkout() {
    let vol = 0;
    let completedSets = 0;
    activeWorkoutState.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed) {
          completedSets++;
          if (s.weight > 0 && s.reps > 0) vol += (s.weight * s.reps);
        }
      });
    });

    if (workoutInterval) clearInterval(workoutInterval);
    globalTimer.stop();
    screenDimmer.shutdown();
    playCompletionBeep();

    const durationMins = Math.max(1, Math.round(workoutElapsedSec / 60));
    activeWorkoutState.durationMinutes = durationMins;
    activeWorkoutState.totalVolumeKg = Math.round(vol);

    storage.addWorkoutToHistory(activeWorkoutState);

    // Feed the logged sets back into the personal ratio model
    const learned = collectLearnedUpdates(activeWorkoutState);
    if (learned.length > 0) {
      storage.updateProfile({ lastModelSyncAt: new Date().toISOString() });
    }

    const modal = document.getElementById('workoutSummaryModal');
    const body = document.getElementById('workoutSummaryBody');
    if (modal && body) {
      body.innerHTML = `
        <div class="celebration-content text-center">
          <div class="celebration-emoji">🏆</div>
          <h2 class="modal-title text-success">ยอดเยี่ยมมาก! สำเร็จการฝึกซ้อม</h2>
          <p class="modal-subtitle">บันทึกข้อมูลและอัปเดตสถิติ Progressive Overload เรียบร้อยแล้ว</p>
          <div class="summary-stats-grid mt-4">
            <div class="stat-card"><span class="stat-card-label">⏱️ ระยะเวลา</span><span class="stat-card-val text-primary">${durationMins} นาที</span></div>
            <div class="stat-card"><span class="stat-card-label">⚖️ ปริมาณยก</span><span class="stat-card-val text-success">${vol.toLocaleString()} กก.</span></div>
            <div class="stat-card"><span class="stat-card-label">🎯 เซ็ตสำเร็จ</span><span class="stat-card-val text-accent">${completedSets} เซ็ต</span></div>
          </div>

          ${learned.length ? `
            <div class="learned-box mt-4">
              <h4 class="learned-title">📚 ระบบเรียนรู้จากครั้งนี้</h4>
              <p class="learned-sub">น้ำหนักที่เพิ่งบันทึกถูกใช้เป็นสัดส่วนส่วนตัว ท่าที่ยังไม่เคยบันทึกในแผนจะถูกปรับตามสัดส่วนใหม่นี้</p>
              <div class="learned-list">
                ${learned.map(item => `
                  <div class="learned-item">
                    <strong>${item.name}</strong>
                    <span>${item.topWeight} กก. × ${item.topReps} ครั้ง → 1RM ≈ ${item.est1RM} กก.</span>
                    ${item.isNew ? '<span class="source-tag own">ข้อมูลใหม่</span>' : '<span class="source-tag logged">ปรับสัดส่วนแล้ว</span>'}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          <button class="btn btn-success btn-block btn-lg mt-4" id="closeSummaryModalBtn">ดูประวัติและสถิติภาพรวม</button>
        </div>
      `;
      body.querySelector('#closeSummaryModalBtn').onclick = () => {
        modal.classList.add('hidden');
        activeWorkoutState = null;
        switchTab('history');
      };
      modal.classList.remove('hidden');
    }
  }

  // --- RENDER GOALS & PROGRESSION ---
  function renderGoalsView() {
    const container = document.getElementById('view-goals');
    if (!container) return;

    const profile = storage.getProfile();
    const currentGoalId = profile.selectedGoal || 'hypertrophy';
    const currentGoal = getGoalById(currentGoalId);

    if (!syncPlanId) syncPlanId = profile.activePlanId || (storage.getPlans()[0] && storage.getPlans()[0].id);

    // Pre-fill the calculator with the baseline already stored for this movement
    const storedBaseline = storage.getExerciseBaseline(calcExerciseId);
    if (storedBaseline && storedBaseline.source === 'manual' && storedBaseline.weight > 0) {
      calcWeight = storedBaseline.weight;
      calcReps = storedBaseline.reps || calcReps;
    }

    const est1RM = estimate1RM(calcWeight, calcReps);
    const targetWorkingWeight = getWeightForGoal(est1RM, currentGoalId);

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title">🎯 เป้าหมาย & ระบบบริหารน้ำหนัก (Goal & Progression)</h2>
          <p class="view-subtitle">เลือกเป้าหมายหลักเพื่อปรับจำนวนครั้ง (Reps), เวลาพัก, และระบบคำนวณ Progressive Overload อัตโนมัติ</p>
        </div>
      </div>

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
            <div class="stat-box"><span class="stat-label">ช่วงจำนวนครั้ง</span><span class="stat-value">${currentGoal.repRange}</span></div>
            <div class="stat-box"><span class="stat-label">ความเข้มข้น</span><span class="stat-value">${currentGoal.intensityPct}</span></div>
            <div class="stat-box"><span class="stat-label">เวลาพัก</span><span class="stat-value">${currentGoal.restDescription}</span></div>
            <div class="stat-box"><span class="stat-label">RPE เป้าหมาย</span><span class="stat-value">RPE ${currentGoal.rpeTarget}</span></div>
          </div>
        </div>
      </div>

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
                <div class="spec-row"><span>เป้าหมายจำนวนครั้ง:</span><strong>${goal.repRange}</strong></div>
                <div class="spec-row"><span>ความเข้มข้น:</span><strong>${goal.intensityPct}</strong></div>
                <div class="spec-row"><span>เวลาพัก:</span><strong>${goal.restDescription}</strong></div>
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

      <div class="card card-elevated mt-4">
        <div class="card-header">
          <h3 class="card-title">🧮 เครื่องคำนวณ 1RM & ระบบจำลองการปรับน้ำหนัก (Progressive Overload Simulator)</h3>
          <p class="card-subtitle">ใส่น้ำหนักและจำนวนครั้งที่คุณเคยยกได้ เพื่อให้ระบบคำนวณน้ำหนักที่เหมาะสมที่สุดสำหรับเป้าหมาย ${currentGoal.name}</p>
        </div>
        <div class="calculator-body">
          <div class="calc-inputs-row">
            <div class="form-group flex-1">
              <label for="calcExerciseSelect">เลือกท่าออกกำลังกาย:</label>
              <select id="calcExerciseSelect" class="form-control">
                ${EXERCISES.map(e => `<option value="${e.id}" ${e.id === calcExerciseId ? 'selected' : ''}>${e.nameTh}</option>`).join('')}
              </select>
            </div>
            <div class="form-group flex-1">
              <label for="calcWeightInput">น้ำหนักที่ยกได้ (กก.):</label>
              <input type="number" id="calcWeightInput" class="form-control" value="${calcWeight}" min="1" max="500" step="2.5" />
            </div>
            <div class="form-group flex-1">
              <label for="calcRepsInput">จำนวนครั้งที่ทำได้ (Reps):</label>
              <input type="number" id="calcRepsInput" class="form-control" value="${calcReps}" min="1" max="30" />
            </div>
          </div>
          <div class="calc-results-grid mt-3">
            <div class="result-tile primary-tile">
              <span class="tile-label">ประมาณการ 1RM</span>
              <span class="tile-value text-accent" id="res1RMVal">${est1RM} กก.</span>
              <span class="tile-sub">สูตรผสม Epley & Brzycki</span>
            </div>
            <div class="result-tile success-tile">
              <span class="tile-label">น้ำหนัก Working Set ที่เหมาะสม</span>
              <span class="tile-value text-success" id="resTargetVal">${targetWorkingWeight} กก.</span>
              <span class="tile-sub">ทำเซ็ตละ ${currentGoal.repRange} (พัก ${currentGoal.recommendedRest} วิ)</span>
            </div>
            <div class="result-tile info-tile">
              <span class="tile-label">กลยุทธ์การก้าวหน้า</span>
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
                  ${storage.getPlans().map(p => `<option value="${p.id}" ${p.id === syncPlanId ? 'selected' : ''}>${p.name}</option>`).join('')}
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
        </div>
      </div>
    `;

    container.querySelectorAll('.select-goal-btn, .goal-card').forEach(btn => {
      btn.onclick = () => {
        const gid = btn.dataset.goalId;
        if (gid) { storage.updateProfile({ selectedGoal: gid }); renderGoalsView(); }
      };
    });

    const exSel = container.querySelector('#calcExerciseSelect');
    const wIn = container.querySelector('#calcWeightInput');
    const rIn = container.querySelector('#calcRepsInput');
    const planSel = container.querySelector('#syncPlanSelect');
    const saveBtn = container.querySelector('#saveCalcBaselineBtn');
    const revertBtn = container.querySelector('#revertSyncBtn');
    const statusEl = container.querySelector('#calcBaselineStatus');
    const summaryEl = container.querySelector('#syncSummary');
    const tableWrap = container.querySelector('#syncTableWrap');

    function getCurrentGoalId() {
      return storage.getProfile().selectedGoal || 'hypertrophy';
    }

    function computeSync() {
      const plan = storage.getPlanById(syncPlanId);
      const est = estimate1RM(calcWeight, calcReps);
      const rows = buildPlanWeightSync(
        plan,
        calcExerciseId,
        est,
        getCurrentGoalId(),
        (id) => storage.getExerciseHistory(id),
        storage.getExerciseBaselines()
      );
      return { plan, est, rows };
    }

    function ratioSourceTag(row) {
      if (row.isAnchor) return { text: 'ท่าที่คุณบันทึก', cls: 'anchor' };
      if (row.lockedByUser) return { text: 'ตั้งค่าเอง (ล็อก)', cls: 'override' };
      if (row.hasHistory) return { text: 'ยึดข้อมูลจริง', cls: 'logged' };
      if (row.ratioMode === 'own') return { text: 'สัดส่วนจริงของคุณ', cls: 'own' };
      if (row.ratioMode === 'personal') return { text: 'สัดส่วนของคุณ', cls: 'personal' };
      if (row.ratioMode === 'blend') return { text: 'ผสมสัดส่วนของคุณ', cls: 'blend' };
      return { text: 'เกณฑ์มาตรฐาน', cls: 'standard' };
    }

    function ratioDetailHtml(row) {
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

    function syncRowHtml(r) {
      const fmt1RM = (n) => Math.round(n * 10) / 10;
      const delta = (r.currentWeight != null) ? r.derivedWeight - r.currentWeight : null;
      const locked = (r.hasHistory || r.lockedByUser) && !r.isAnchor;
      const source = ratioSourceTag(r);

      let deltaClass = 'fresh';
      let deltaText = 'ใหม่';
      if (r.lockedByUser) {
        deltaClass = 'locked';
        deltaText = 'ค่าที่คุณตั้ง';
      } else if (locked) {
        deltaClass = 'locked';
        deltaText = 'ยึดข้อมูลจริง';
      } else if (delta != null) {
        deltaClass = delta > 0 ? 'up' : delta < 0 ? 'down' : 'same';
        deltaText = delta === 0 ? 'คงเดิม' : `${delta > 0 ? '+' : ''}${delta} กก.`;
      }

      const overrideCell = overrideEditorId === r.exerciseId
        ? `<div class="override-editor">
            <input type="number" class="form-control form-control-sm override-input" min="0" max="500" step="0.5" value="${r.derivedWeight}" />
            <button class="btn btn-xs btn-success override-save-btn">บันทึก</button>
            <button class="btn btn-xs btn-outline override-cancel-btn">ยกเลิก</button>
          </div>`
        : (r.lockedByUser
          ? `<button class="btn btn-xs btn-outline override-btn">🔓 ปลดล็อก</button>`
          : `<button class="btn btn-xs btn-outline override-btn">⚙️ ตั้งเอง</button>`);

      return `
        <tr class="sync-row ${r.isAnchor ? 'is-anchor' : ''} ${r.lockedByUser ? 'is-locked' : ''}">
          <td class="text-muted text-sm" data-label="วันฝึก">${r.dayName}</td>
          <td data-label="ท่า"><strong>${r.name}</strong>${r.note ? ` <span class="text-muted text-sm">(${r.note})</span>` : ''}</td>
          <td data-label="น้ำหนักเดิม">${r.currentWeight != null ? `${r.currentWeight} กก.` : '<span class="text-muted">ยังไม่มีข้อมูล</span>'}</td>
          <td data-label="น้ำหนักที่ระบบเสนอ">
            <strong class="${locked ? 'text-muted' : 'text-accent'}">${r.derivedWeight} กก.</strong>
            <em class="text-muted text-sm">(1RM ≈ ${fmt1RM(r.derived1RM)} กก.)</em>
            <div>${ratioDetailHtml(r)}</div>
          </td>
          <td data-label="เปลี่ยนแปลง"><span class="sync-delta ${deltaClass}">${deltaText}</span></td>
          <td data-label="ที่มาของตัวเลข"><span class="source-tag ${source.cls}">${source.text}</span></td>
          <td data-label="ปรับมือ">${overrideCell}</td>
        </tr>
      `;
    }

    function bindOverrideControls() {
      const wrap = tableWrap;
      if (!wrap) return;

      wrap.querySelectorAll('.sync-row').forEach(tr => {
        const row = lastSyncRows[Array.prototype.indexOf.call(tr.parentNode.children, tr)];
        if (!row) return;

        const startBtn = tr.querySelector('.override-btn');
        if (startBtn) {
          startBtn.onclick = () => { overrideEditorId = row.exerciseId; renderSyncPreview(); };
        }

        const cancelBtn = tr.querySelector('.override-cancel-btn');
        if (cancelBtn) {
          cancelBtn.onclick = () => { overrideEditorId = null; renderSyncPreview(); };
        }

        const saveBtn = tr.querySelector('.override-save-btn');
        if (saveBtn) {
          saveBtn.onclick = () => {
            const input = tr.querySelector('.override-input');
            const weight = parseFloat(input && input.value);
            if (!weight || weight <= 0) {
              alert('กรุณากรอกน้ำหนักที่ต้องการตั้งไว้');
              return;
            }
            if (row.lockedByUser) {
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
            overrideEditorId = null;
            renderSyncPreview();
          };
        }
      });
    }

    function renderSyncPreview() {
      const { plan, est, rows } = computeSync();
      if (!plan) return { rows };

      const anchorEx = getExerciseById(calcExerciseId);
      const anchorName = anchorEx ? anchorEx.nameTh : calcExerciseId;
      const baseline = storage.getExerciseBaseline(calcExerciseId);
      const loggedHere = hasLoggedPerformance(storage.getExerciseHistory(calcExerciseId));
      const affected = rows.filter(r =>
        !r.isAnchor && !r.hasHistory && !r.lockedByUser && r.derivedWeight !== r.currentWeight
      );
      lastSyncRows = rows;

      if (statusEl) {
        statusEl.innerHTML = baseline
          ? `เกณฑ์ที่บันทึกไว้ของ ${anchorName}: <strong>${baseline.weight} กก. × ${baseline.reps} ครั้ง</strong> (1RM ≈ ${baseline.est1RM} กก.) ${loggedHere ? '<span class="source-tag logged">มีข้อมูลการออกกำลังกายจริงแล้ว — ระบบจะใช้ข้อมูลจริงเป็นหลัก</span>' : ''}`
          : `ยังไม่เคยบันทึกเกณฑ์ของ ${anchorName} — กดปุ่มบันทึกเพื่อให้ระบบใช้ค่านี้เป็นพื้นฐานของแผนทั้งหมด`;
      }

      if (summaryEl) {
        const personalised = rows.filter(r =>
          !r.isAnchor && !r.lockedByUser && (r.ratioMode === 'personal' || r.ratioMode === 'own' || r.ratioMode === 'blend')
        ).length;
        const lockedCount = rows.filter(r => r.lockedByUser).length;
        const base = affected.length > 0
          ? `คำนวณจาก 1RM ≈ ${est} กก. • จะปรับ ${affected.length} ท่าในแผน ${plan.name}`
          : (baseline
            ? `คำนวณจาก 1RM ≈ ${est} กก. • บันทึกแล้ว แผน ${plan.name} สอดคล้องกับเกณฑ์ของคุณ`
            : `คำนวณจาก 1RM ≈ ${est} กก. • แผน ${plan.name} ยังไม่ถูกปรับ กดปุ่มบันทึกเพื่อใช้เกณฑ์นี้`);

        const extras = [];
        if (personalised > 0) extras.push(`<span class="text-success">🎯 ปรับอัตโนมัติจากสัดส่วนจริงของคุณเองใน ${personalised} ท่า</span>`);
        if (lockedCount > 0) extras.push(`<span class="text-info">🔒 คุณล็อกน้ำหนักเองไว้ ${lockedCount} ท่า</span>`);

        summaryEl.innerHTML = extras.length ? `${base}<br />${extras.join('<br />')}` : base;
      }

      const syncMeta = document.getElementById('syncMetaNote');
      if (syncMeta) {
        const lastSync = storage.getProfile().lastModelSyncAt;
        syncMeta.innerHTML = lastSync
          ? `📚 อัปเดตโมเดลล่าสุดจากการบันทึกการออกกำลังกายเมื่อ ${new Date(lastSync).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}`
          : '📚 ยังไม่เคยบันทึกการออกกำลังกาย — ระบบยังใช้เกณฑ์มาตรฐานเป็นหลัก แล้วจะค่อย ๆ เปลี่ยนเป็นสัดส่วนของคุณเอง';
      }

      if (tableWrap) {
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
              <tbody>${rows.map(syncRowHtml).join('')}</tbody>
            </table>`
          : '<p class="text-muted">แผนนี้ยังไม่มีท่าออกกำลังกายให้ปรับ</p>';
        bindOverrideControls();
      }

      return { rows, plan, est };
    }

    function updateCalc() {
      const e1rm = estimate1RM(calcWeight, calcReps);
      const tw = getWeightForGoal(e1rm, profile.selectedGoal || 'hypertrophy');
      const el1 = document.getElementById('res1RMVal');
      const el2 = document.getElementById('resTargetVal');
      if (el1) el1.textContent = `${e1rm} กก.`;
      if (el2) el2.textContent = `${tw} กก.`;
      renderSyncPreview();
    }

    if (exSel) {
      exSel.onchange = (e) => {
        calcExerciseId = e.target.value;
        const stored = storage.getExerciseBaseline(calcExerciseId);
        if (stored && stored.source === 'manual' && stored.weight > 0) {
          calcWeight = stored.weight;
          calcReps = stored.reps || calcReps;
          if (wIn) wIn.value = calcWeight;
          if (rIn) rIn.value = calcReps;
        }
        updateCalc();
      };
    }
    if (wIn) wIn.oninput = (e) => { calcWeight = parseFloat(e.target.value) || 0; updateCalc(); };
    if (rIn) rIn.oninput = (e) => { calcReps = parseInt(e.target.value, 10) || 1; updateCalc(); };
    if (planSel) {
      planSel.onchange = (e) => {
        syncPlanId = e.target.value;
        renderSyncPreview();
      };
    }

    if (saveBtn) {
      saveBtn.onclick = () => {
        if (!calcWeight || calcWeight <= 0) {
          alert('กรุณากรอกน้ำหนักที่ยกได้ก่อนบันทึกเกณฑ์');
          return;
        }
        const { rows, est } = computeSync();

        baselineSnapshot = JSON.stringify(storage.getExerciseBaselines());

        const entries = [{
          exerciseId: calcExerciseId,
          weight: calcWeight,
          reps: calcReps,
          est1RM: est,
          source: 'manual',
          anchorId: calcExerciseId
        }];

        rows.filter(r => !r.isAnchor && !r.hasHistory && !r.lockedByUser).forEach(r => {
          entries.push({
            exerciseId: r.exerciseId,
            weight: r.derivedWeight,
            reps: null,
            est1RM: r.derived1RM,
            source: 'derived',
            anchorId: calcExerciseId
          });
        });

        storage.saveExerciseBaseline(entries);
        if (revertBtn) revertBtn.style.display = '';
        renderSyncPreview();
      };
    }

    if (revertBtn) {
      revertBtn.onclick = () => {
        if (!baselineSnapshot) return;
        const restored = JSON.parse(baselineSnapshot);
        storage.saveExerciseBaselines(restored);
        baselineSnapshot = null;
        revertBtn.style.display = 'none';

        // Bring the calculator back to the restored baseline so the preview matches storage
        const restoredAnchor = restored[calcExerciseId];
        if (restoredAnchor && restoredAnchor.source === 'manual' && restoredAnchor.weight > 0) {
          calcWeight = restoredAnchor.weight;
          calcReps = restoredAnchor.reps || calcReps;
          if (wIn) wIn.value = calcWeight;
          if (rIn) rIn.value = calcReps;
        }
        updateCalc();
      };
    }

    renderSyncPreview();
  }

  // --- RENDER EXERCISES (WITH REAL OPEN DATABASE IMAGES) ---
  function renderExercisesView() {
    const container = document.getElementById('view-exercises');
    if (!container) return;

    let filtered = getExercisesByCategory(currentCategory);
    if (exerciseSearchQuery.trim()) {
      const q = exerciseSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(e =>
        e.nameTh.toLowerCase().includes(q) ||
        e.nameEn.toLowerCase().includes(q) ||
        e.equipment.toLowerCase().includes(q) ||
        e.primaryMuscles.some(m => m.toLowerCase().includes(q))
      );
    }

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title">📖 คลังท่าออกกำลังกาย (Exercise Library)</h2>
          <p class="view-subtitle">รวบรวมท่าฝึกมาตรฐานสากล พร้อมภาพถ่ายจริงจากการเคลื่อนไหว กายวิภาค และเทคนิคแบบละเอียด</p>
        </div>
      </div>

      <div class="filter-bar">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input type="text" id="exerciseSearchInput" class="search-input" placeholder="ค้นหาชื่อท่า, กล้ามเนื้อ, อุปกรณ์..." value="${exerciseSearchQuery}" />
          ${exerciseSearchQuery ? '<button id="clearSearchBtn" class="clear-btn">✕</button>' : ''}
        </div>
        <div class="category-tabs">
          <button class="cat-pill ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">ทั้งหมด (${EXERCISES.length})</button>
          <button class="cat-pill ${currentCategory === 'push' ? 'active' : ''}" data-cat="push">Push (อก/ไหล่/หลังแขน)</button>
          <button class="cat-pill ${currentCategory === 'pull' ? 'active' : ''}" data-cat="pull">Pull (หลัง/ปีก/หน้าแขน)</button>
          <button class="cat-pill ${currentCategory === 'legs' ? 'active' : ''}" data-cat="legs">Legs (ขา/ก้น/น่อง)</button>
          <button class="cat-pill ${currentCategory === 'core' ? 'active' : ''}" data-cat="core">Core (หน้าท้อง)</button>
        </div>
      </div>

      <div class="exercise-grid" id="exerciseCardsGrid">
        ${filtered.map(ex => {
          const color = ex.category === 'push' ? '#3b82f6' : ex.category === 'pull' ? '#8b5cf6' : '#10b981';
          const thumb = ex.images && ex.images.length > 0 ? ex.images[0] : '';
          return `
            <div class="exercise-card" data-exercise-id="${ex.id}">
              ${thumb ? `
                <div class="exercise-card-thumb-wrapper">
                  <img src="${thumb}" alt="${ex.nameEn}" loading="lazy" />
                  <span class="thumb-tag-badge">📷 ภาพถ่ายจริง</span>
                </div>
              ` : ''}
              <div class="exercise-card-header">
                <span class="badge-cat" style="background: ${color}22; color: ${color}; border: 1px solid ${color}44">${ex.category.toUpperCase()}</span>
                <span class="badge-diff">${ex.difficulty}</span>
              </div>
              <h3 class="exercise-name-th">${ex.nameTh}</h3>
              <p class="exercise-name-en">${ex.nameEn}</p>
              <div class="exercise-tags">
                ${ex.primaryMuscles.map(m => `<span class="tag-muscle">🎯 ${m}</span>`).join('')}
              </div>
              <div class="exercise-meta">🛠️ ${ex.equipment}</div>
              <button class="btn btn-secondary btn-block view-tech-btn" data-exercise-id="${ex.id}">📖 ดูภาพเคลื่อนไหว & เทคนิค</button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    const searchIn = container.querySelector('#exerciseSearchInput');
    if (searchIn) {
      searchIn.oninput = (e) => {
        exerciseSearchQuery = e.target.value;
        renderExercisesView();
        const newIn = document.getElementById('exerciseSearchInput');
        if (newIn) { newIn.focus(); newIn.setSelectionRange(newIn.value.length, newIn.value.length); }
      };
    }
    const clearBtn = container.querySelector('#clearSearchBtn');
    if (clearBtn) clearBtn.onclick = () => { exerciseSearchQuery = ''; renderExercisesView(); };

    container.querySelectorAll('.cat-pill').forEach(pill => {
      pill.onclick = () => { currentCategory = pill.dataset.cat; renderExercisesView(); };
    });

    container.querySelectorAll('.view-tech-btn, .exercise-card').forEach(btn => {
      btn.onclick = () => {
        const card = btn.closest('.exercise-card');
        if (card) openGlobalExerciseModal(card.dataset.exerciseId);
      };
    });
  }

  // --- RENDER HISTORY & PRS ---
  function renderHistoryView() {
    const container = document.getElementById('view-history');
    if (!container) return;

    const history = storage.getHistory();
    const prs = storage.getPRs();
    const totalVolume = history.reduce((acc, w) => acc + (w.totalVolumeKg || 0), 0);
    const totalMins = history.reduce((acc, w) => acc + (w.durationMinutes || 0), 0);

    container.innerHTML = `
      <div class="view-header">
        <div>
          <h2 class="view-title">📊 ประวัติและสถิติ (History & Analytics)</h2>
          <p class="view-subtitle">ติดตามพัฒนาการ บันทึกการฝึกซ้อม และสถิติส่วนบุคคล (Personal Records)</p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline" id="exportDataBtn">📥 ส่งออก JSON</button>
        </div>
      </div>

      <div class="stats-overview-grid">
        <div class="metric-card"><div class="metric-icon">🏋️</div><div><span class="metric-title">จำนวนเซสชันที่ฝึก</span><h3 class="metric-number">${history.length} ครั้ง</h3></div></div>
        <div class="metric-card"><div class="metric-icon">⚖️</div><div><span class="metric-title">ปริมาณยกสะสม</span><h3 class="metric-number text-success">${totalVolume.toLocaleString()} กก.</h3></div></div>
        <div class="metric-card"><div class="metric-icon">⏳</div><div><span class="metric-title">เวลาฝึกรวม</span><h3 class="metric-number text-accent">${Math.round(totalMins / 60 * 10) / 10} ชม.</h3></div></div>
      </div>

      <div class="card card-elevated mt-4">
        <div class="card-header"><h3 class="card-title">🏆 สถิติสูงสุดส่วนตัว (Personal Records - PRs)</h3></div>
        <div class="table-responsive">
          <table class="table-prs">
            <thead><tr><th>ท่าออกกำลังกาย</th><th>น้ำหนักสูงสุด</th><th>จำนวนครั้ง</th><th>ประมาณการ 1RM</th></tr></thead>
            <tbody>
              ${Object.keys(prs).map(id => {
                const ex = getExerciseById(id);
                const pr = prs[id];
                return `<tr><td><strong>${ex ? ex.nameTh : id}</strong></td><td><span class="pr-weight-badge">${pr.maxWeight} กก.</span></td><td>${pr.maxRepsAtWeight || '-'} ครั้ง</td><td><strong class="text-accent">${pr.estimated1RM} กก.</strong></td></tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <h3 class="section-title mt-4">📅 บันทึกการฝึกซ้อมที่ผ่านมา (${history.length} รายการ):</h3>
      <div class="history-list">
        ${history.map(w => {
          const dateStr = new Date(w.date).toLocaleDateString('th-TH', { weekday: 'short', month: 'short', day: 'numeric' });
          return `
            <div class="history-card">
              <div class="history-card-header">
                <div><span class="badge-cat">${w.dayName}</span><span class="text-muted text-sm ml-2"> • ${dateStr}</span><h4 class="history-workout-title">${w.planName}</h4></div>
                <div class="history-stats-pills">
                  <span class="pill-stat">⏱️ ${w.durationMinutes || 45} นาที</span>
                  <span class="pill-stat text-success">⚖️ ${(w.totalVolumeKg || 0).toLocaleString()} กก.</span>
                  <button class="btn btn-outline-danger btn-xs del-w-btn" data-id="${w.id}">🗑️</button>
                </div>
              </div>
              <div class="history-exercises-summary">
                ${(w.exercises || []).map(exItem => {
                  const ex = getExerciseById(exItem.exerciseId);
                  const valid = (exItem.sets || []).filter(s => s.completed);
                  return `<div class="history-ex-pill"><strong>${ex ? ex.nameTh : exItem.exerciseId}:</strong> <span>${valid.length} เซ็ต (${valid.map(s => `${s.weight}×${s.reps}`).join(', ')})</span></div>`;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.querySelectorAll('.del-w-btn').forEach(btn => {
      btn.onclick = () => {
        if (confirm('ต้องการลบบันทึกนี้หรือไม่?')) {
          storage.saveHistory(storage.getHistory().filter(w => w.id !== btn.dataset.id));
          renderHistoryView();
        }
      };
    });

    const expBtn = container.querySelector('#exportDataBtn');
    if (expBtn) {
      expBtn.onclick = () => {
        const json = storage.exportAllDataJSON();
        const blob = new Blob([json], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `fit-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
      };
    }
  }

  // วัดความสูง header/nav จริง แล้วส่งให้ CSS ใช้เป็น offset ของ sticky quick bar
  function syncStickyOffsets() {
    const header = document.querySelector('.app-header');
    const nav = document.querySelector('.bottom-nav');
    const sessionBar = document.querySelector('#view-workout .active-session-bar');
    const root = document.documentElement.style;
    if (header) root.setProperty('--app-header-h', `${Math.round(header.offsetHeight)}px`);
    if (nav && getComputedStyle(nav).display !== 'none') {
      root.setProperty('--bottom-nav-h', `${Math.round(nav.offsetHeight)}px`);
    }
    // บนมือถือ session bar เลื่อนตามหน้า (static) จึงไม่ต้องกันพื้นที่ sticky
    const sessSticky = sessionBar && getComputedStyle(sessionBar).position === 'sticky';
    root.setProperty('--session-bar-h', sessSticky ? `${Math.round(sessionBar.offsetHeight)}px` : '0px');
  }

  let screenDimmer = null;

  // --- INIT DOM ---
  document.addEventListener('DOMContentLoaded', () => {
    screenDimmer = new ScreenDimmer();

    document.querySelectorAll('.nav-btn, .bottom-nav-item').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    syncStickyOffsets();
    window.addEventListener('resize', syncStickyOffsets);
    window.addEventListener('orientationchange', () => setTimeout(syncStickyOffsets, 120));

    const activeDraft = storage.getActiveWorkout();
    if (activeDraft) {
      const banner = document.getElementById('resumeWorkoutBanner');
      if (banner) {
        banner.classList.remove('hidden');
        document.getElementById('resumeBtn').onclick = () => {
          banner.classList.add('hidden');
          switchTab('workout');
        };
      }
    }

    switchTab('plans');
  });

})();
