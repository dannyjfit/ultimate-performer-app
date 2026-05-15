// ═══════════════════════════════════════════════════════════════
// TRAINING DATA
// ═══════════════════════════════════════════════════════════════

const TGV = {
  'Bicycle Crunches':'https://youtu.be/NDeVaEgqyM4','Hollow Rocks':'https://youtu.be/QpiHM7QW26k',
  'Hollow Hold':'https://youtu.be/ZmP70qJCmJE','Leg Raises':'https://youtu.be/zd1P-m_WxWQ',
  'Flutter Kicks':'https://youtu.be/ZoyvU_6lCUQ','Heel Taps':'https://youtu.be/ND22rrhdhWU',
  'Plank Hold':'https://youtu.be/vx08xBP2Mj0','Plank Jacks':'https://youtu.be/95CVpAyHYkk',
  'Plank Taps':'https://youtu.be/ZGo88H4TBgY','Walking Plank':'https://youtu.be/1sUKZtIGEnk',
  'Side Plank':'https://youtu.be/3fM2ci26hBg','Side Plank Hip Dips':'https://youtu.be/8S-k29BuPzw',
  'Russian Twists':'https://youtu.be/rutqTm-4lR4','Butterfly Crunches':'https://youtu.be/yJ-YR0KKhhY',
  'Pilates Sit Up':'https://youtu.be/0gSfp7mKYGw','DB Weighted Sit Ups':'https://youtu.be/WW73gnPc0-0',
  'DB Plank Pull Through':'https://youtu.be/jXGVcMimEXw','Shoulder Taps':'https://youtu.be/bzRSKpYdk6g',
  'Push Ups':'https://youtu.be/lc3SGox8cV4','Incline Push Ups':'https://youtu.be/2JGcbJIKM6w',
  'Hand Release Push Ups':'https://youtu.be/Yc7A2rZf7DA','Half Burpees':'https://youtu.be/B3Aoj_DCg2I',
  'Burpees':'https://youtu.be/WIJNqc-R33A','Dips':'https://youtu.be/eR7rg7QuLVg',
  'DB Skull Crushers':'https://youtu.be/O8Y_DrbNsYo','Overhead Extension':'https://youtu.be/-st8MphtMo4',
  'DB Floor Press':'https://youtu.be/IX8xB8qWMu8','DB Bench Press':'https://youtu.be/LVgNsAjVqjo',
  'DB Incline Press':'https://youtu.be/AhO-_F7IxSE','DB Chest Fly':'https://youtu.be/U8RB53E6JVU',
  'DB Incline Fly':'https://youtu.be/VnlG3wEG9qI','DB Seated Shoulder Press':'https://youtu.be/SYBVQQqlTYY',
  'DB Single Arm Shoulder Press':'https://youtu.be/xX41-zAl8aI','DB Lateral Raise':'https://youtu.be/JHWCjfvmgvg',
  'DB Front Raise':'https://youtu.be/znYyAEbBEns','DB Push Press':'https://youtu.be/yzI5Qgt9ezE',
  'BB Bench Press':'https://youtu.be/Ob6JAaawbMI','BB Incline Bench Press':'https://youtu.be/DWA61Qi_0y0',
  'BB Military Press':'https://youtu.be/-hH8K49fhIU','BB Push Press':'https://youtu.be/YCpfoAGvRYE',
  'DB Single Arm Row':'https://youtu.be/N-0-7Kluk9E','DB Bent Over Row':'https://youtu.be/JAkmQciPSK8',
  'DB Renegade Row w/Push Up':'https://youtu.be/XS5vi6BARbc','DB Renegade Row':'https://youtu.be/3xPlLwkqZrI',
  'DB Single Arm Gorilla Row':'https://youtu.be/BagsW8ac3g4','DB Chest Supported Row':'https://youtu.be/18CUVcCdZPs',
  'DB Reverse Fly':'https://youtu.be/yFhhBjItgA0','DB Upright Row':'https://youtu.be/C8vLTmv3_Cw',
  'DB Alt Bicep Curl':'https://youtu.be/GzO3pfDSI80','DB Bicep Curls':'https://youtu.be/GdETt4HFQ3Q',
  'DB Hammer Curls':'https://youtu.be/jYQ8peSq2Jc','DB Concentrated Curl':'https://youtu.be/eg44sKb8DY4',
  'DB Single Arm Preacher Curl':'https://youtu.be/8S-k29BuPzw','BB Bent Over Row':'https://youtu.be/TVZd8_LeFfo',
  'BB Curl':'https://youtu.be/d-H2Z9e0Qyc','Bodyweight Squat':'https://youtu.be/ef_sL49w7M8',
  'Jumping Squat':'https://youtu.be/CYNsX2nIi0I','Pistol Squat':'https://youtu.be/Jmk9ah8hK6I',
  'Alternating Step Ups':'https://youtu.be/4aKLWcnnl24','Single Leg Glute Bridge':'https://youtu.be/UVEmU7jMPRw',
  'DB Goblet Squat':'https://youtu.be/gs3RYDA4xpo','DB Front Squat':'https://youtu.be/1gXKOOmIcMI',
  'DB Bulgarian Split Squat':'https://youtu.be/lkTWXKctl0o','DB Alt Lunges':'https://youtu.be/LypumsWyWAg',
  'DB Reverse Lunges':'https://youtu.be/Ksa9M-1WA1E','DB Glute Based Step Ups':'https://youtu.be/E4VTlfl7anM',
  'DB Single Leg Deadlift':'https://youtu.be/NkONw4gX8O4','DB Sumo Deadlift':'https://youtu.be/hTdUZrLsZAo',
  'DB Single Leg Hip Thrust':'https://youtu.be/txmvGmkRHGM','DB Single Leg Glute Bridge':'https://youtu.be/mE8H3FU4LPs',
  'DB Hip Thrust':'https://youtu.be/vsbw0veZiBw','BB Hip Thrust':'https://youtu.be/Pu3kO_5TC-k',
  'BB Romanian Deadlift':'https://youtu.be/iRxfazIIOdM','BB Sumo Deadlift':'https://youtu.be/yKkGitOwqoU',
  'BB Good Mornings':'https://youtu.be/-F7LQVISeQc','BB Front Squat':'https://youtu.be/x78dn81BwuA',
  'BB Front Rack Lunge':'https://youtu.be/6wgh8zYemnQ','BB Reverse Lunges':'https://youtu.be/OF1mNJVI6WU',
  'BB Back Squat':'https://youtu.be/g9YR-_fgth4','Walk Outs':'https://youtu.be/HzeIJTEAO4A',
  'DB External Rotations':'https://youtu.be/zE3OjAxysYM','DB Swings':'https://youtu.be/OGiKBrRlSMY',
  'DB Hang Snatch':'https://youtu.be/20-yF9MNeC4','DB Hang Clean & Press':'https://youtu.be/T0Hbkr-fEcU',
  'Single Arm Devils Press':'https://youtu.be/EWSb1gCLiao','BB Hang Clean & Press':'https://youtu.be/M9oA4tvV4_0',
  'Mountain Climbers':'https://youtu.be/nmwgirgXLYM'
};

const TGALTS = {
  'BB Bench Press':'DB Bench Press','BB Incline Bench Press':'DB Incline Press',
  'BB Military Press':'DB Seated Shoulder Press','BB Push Press':'DB Push Press',
  'BB Bent Over Row':'DB Bent Over Row','BB Curl':'DB Bicep Curls',
  'BB Back Squat':'DB Goblet Squat','BB Front Squat':'DB Front Squat',
  'BB Front Rack Lunge':'DB Reverse Lunges','BB Reverse Lunges':'DB Reverse Lunges',
  'BB Romanian Deadlift':'DB Single Leg Deadlift','BB Sumo Deadlift':'DB Sumo Deadlift',
  'BB Hip Thrust':'DB Hip Thrust','BB Good Mornings':'DB Bent Over Row',
  'BB Hang Clean & Press':'DB Hang Clean & Press','Hand Release Push Ups':'Push Ups',
  'Push Ups':'Incline Push Ups','Burpees':'Half Burpees','Pistol Squat':'Jumping Squat',
  'Jumping Squat':'Bodyweight Squat','Dips':'Push Ups'
};

const TGGOALS = {
  loss:{
    label:'Weight Loss',
    intros:{
      beginner:"Your goal is weight loss and you're just getting started — that's the best position to be in. Your plan uses higher rep ranges, shorter rest periods and full body movements. Consistency over 8–12 weeks is what creates real change, not intensity in week one.",
      intermediate:"You've trained before — now we're building a plan that matches your goal. Higher reps, tighter rest, and compound movements that drive your heart rate up while building lean muscle.",
      advanced:"You know that fat loss comes down to consistency, intensity, and progressive overload. Your plan pushes rep ranges and keeps rest tight. Track your weights and push for progression week on week."
    },
    reps:{compound:'12–15',isolation:'15–18',core:'20'},
    rest:'45 seconds rest between tri-sets'
  },
  muscle:{
    label:'Muscle Building',
    intros:{
      beginner:"Your goal is muscle building and you're starting from scratch — you'll see significant results faster than someone who's been training for years. Focus on learning the movements properly. Good form beats sloppy form every time.",
      intermediate:"You're building on an existing base. The 8–12 rep range is the sweet spot for hypertrophy. Progressive overload is the key — if it felt easy last week, add weight this week.",
      advanced:"Your plan uses lower rep ranges with heavier loads and genuine progressive overload. Track your lifts every session — if you're not beating last week on at least one exercise, something needs to change."
    },
    reps:{compound:'8–10',isolation:'10–12',core:'15'},
    rest:'60 seconds rest between tri-sets'
  },
  health:{
    label:'Health & Longevity',
    intros:{
      beginner:"Your goal is to feel better, move better, and build a foundation that keeps paying dividends for decades. Your plan balances strength, mobility, and cardiovascular fitness at a pace that's genuinely sustainable.",
      intermediate:"You're not here to compete, you're here to perform well across everything — work, life, energy, clarity. Moderate reps, full rest, compound focus.",
      advanced:"You've got the discipline, now let's make sure you're training smart not just hard. Challenging, yes. Sustainable, absolutely."
    },
    reps:{compound:'10–12',isolation:'12–15',core:'15–20'},
    rest:'60 seconds rest between tri-sets'
  }
};

function R(n,t,s){return{name:n,type:t,sets:s};}

const TGPLANS = {
  gym_2:{
    beginner:[
      {name:'Day 1 — Upper Body',warmup:['10 DB External Rotations','10 Incline Push Ups','10 DB Lateral Raise'],
       triA:[R('BB Bench Press','compound',3),R('DB Chest Fly','isolation',3),R('Push Ups','compound',3)],triANote:'Back to back. Rest after Push Ups.',
       triB:[R('DB Single Arm Row','compound',3),R('DB Reverse Fly','isolation',3),R('DB Bicep Curls','isolation',3)],triBNote:'Back to back. Rest after Bicep Curls.',
       core:[R('Plank Hold','core',2),R('Shoulder Taps','core',2),R('Heel Taps','core',2)]},
      {name:'Day 2 — Lower Body',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Alt Lunges'],
       triA:[R('DB Goblet Squat','compound',3),R('DB Reverse Lunges','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('DB Single Leg Deadlift','compound',3),R('DB Hip Thrust','compound',3),R('DB Single Leg Glute Bridge','isolation',3)],triBNote:'Back to back. Rest after Single Leg Glute Bridge.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank','core',2)]}
    ],
    intermediate:[
      {name:'Day 1 — Upper Body',warmup:['10 DB External Rotations','10 DB Bench Press (light)','10 DB Lateral Raise'],
       triA:[R('BB Bench Press','compound',3),R('DB Incline Press','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('BB Bent Over Row','compound',3),R('DB Single Arm Row','compound',3),R('DB Hammer Curls','isolation',3)],triBNote:'Back to back. Rest after Hammer Curls.',
       core:[R('Bicycle Crunches','core',2),R('Plank Hold','core',2),R('DB Weighted Sit Ups','core',2)]},
      {name:'Day 2 — Lower Body',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Reverse Lunges'],
       triA:[R('BB Back Squat','compound',3),R('DB Bulgarian Split Squat','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('BB Romanian Deadlift','compound',3),R('DB Single Leg Deadlift','compound',3),R('BB Hip Thrust','compound',3)],triBNote:'Back to back. Rest after Hip Thrust.',
       core:[R('Leg Raises','core',2),R('Russian Twists','core',2),R('Side Plank Hip Dips','core',2)]}
    ],
    advanced:[
      {name:'Day 1 — Upper Body',warmup:['10 DB External Rotations','10 DB Bench Press (light)','10 BB Military Press (light)'],
       triA:[R('BB Bench Press','compound',4),R('BB Incline Bench Press','compound',4),R('DB Chest Fly','isolation',4)],triANote:'Back to back. Rest after Chest Fly.',
       triB:[R('BB Bent Over Row','compound',4),R('DB Renegade Row w/Push Up','compound',4),R('DB Concentrated Curl','isolation',4)],triBNote:'Back to back. Rest after Concentrated Curl.',
       core:[R('Hollow Rocks','core',2),R('DB Plank Pull Through','core',2),R('Side Plank Hip Dips','core',2)]},
      {name:'Day 2 — Lower Body',warmup:['10 Bodyweight Squats','10 BB Good Mornings (light)','10 DB Reverse Lunges'],
       triA:[R('BB Back Squat','compound',4),R('BB Front Squat','compound',4),R('DB Bulgarian Split Squat','compound',4)],triANote:'Back to back. Rest after Bulgarian Split Squat.',
       triB:[R('BB Romanian Deadlift','compound',4),R('BB Sumo Deadlift','compound',4),R('BB Hip Thrust','compound',4)],triBNote:'Back to back. Rest after Hip Thrust.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Russian Twists','core',2)]}
    ]
  },
  gym_3:{
    beginner:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 Incline Push Ups','10 DB Lateral Raise (light)'],
       triA:[R('DB Floor Press','compound',3),R('DB Chest Fly','isolation',3),R('Push Ups','compound',3)],triANote:'Back to back. Rest after Push Ups.',
       triB:[R('DB Seated Shoulder Press','compound',3),R('DB Lateral Raise','isolation',3),R('DB Front Raise','isolation',3)],triBNote:'Back to back. Rest after Front Raise.',
       core:[R('Plank Hold','core',2),R('Heel Taps','core',2),R('Shoulder Taps','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 DB Single Arm Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('DB Single Arm Row','compound',3),R('DB Bent Over Row','compound',3),R('DB Reverse Fly','isolation',3)],triANote:'Back to back. Rest after Reverse Fly.',
       triB:[R('DB Bicep Curls','isolation',3),R('DB Hammer Curls','isolation',3),R('DB Alt Bicep Curl','isolation',3)],triBNote:'Back to back. Rest after Alt Bicep Curl.',
       core:[R('Bicycle Crunches','core',2),R('Flutter Kicks','core',2),R('Side Plank','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Alt Lunges (light)'],
       triA:[R('DB Goblet Squat','compound',3),R('DB Alt Lunges','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('DB Hip Thrust','compound',3),R('DB Single Leg Deadlift','compound',3),R('DB Single Leg Glute Bridge','isolation',3)],triBNote:'Back to back. Rest after Single Leg Glute Bridge.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Plank Taps','core',2)]}
    ],
    intermediate:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 DB Bench Press (light)','10 DB Lateral Raise'],
       triA:[R('BB Bench Press','compound',3),R('DB Incline Fly','isolation',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('DB Seated Shoulder Press','compound',3),R('DB Lateral Raise','isolation',3),R('DB Push Press','compound',3)],triBNote:'Back to back. Rest after Push Press.',
       core:[R('Bicycle Crunches','core',2),R('Plank Hold','core',2),R('Heel Taps','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 DB Single Arm Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('BB Bent Over Row','compound',3),R('DB Single Arm Row','compound',3),R('DB Reverse Fly','isolation',3)],triANote:'Back to back. Rest after Reverse Fly.',
       triB:[R('DB Renegade Row','compound',3),R('DB Bicep Curls','isolation',3),R('DB Hammer Curls','isolation',3)],triBNote:'Back to back. Rest after Hammer Curls.',
       core:[R('Russian Twists','core',2),R('Flutter Kicks','core',2),R('Hollow Hold','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Reverse Lunges'],
       triA:[R('BB Back Squat','compound',3),R('DB Bulgarian Split Squat','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('BB Romanian Deadlift','compound',3),R('DB Single Leg Deadlift','compound',3),R('DB Hip Thrust','compound',3)],triBNote:'Back to back. Rest after Hip Thrust.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank Hip Dips','core',2)]}
    ],
    advanced:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 DB Bench Press (light)','10 BB Military Press (light)'],
       triA:[R('BB Bench Press','compound',4),R('DB Incline Press','compound',4),R('DB Chest Fly','isolation',4)],triANote:'Back to back. Rest after Chest Fly.',
       triB:[R('BB Military Press','compound',4),R('DB Lateral Raise','isolation',4),R('DB Skull Crushers','isolation',4)],triBNote:'Back to back. Rest after Skull Crushers.',
       core:[R('Hollow Rocks','core',2),R('DB Plank Pull Through','core',2),R('Walking Plank','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 BB Bent Over Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('BB Bent Over Row','compound',4),R('DB Single Arm Gorilla Row','compound',4),R('DB Chest Supported Row','compound',4)],triANote:'Back to back. Rest after Chest Supported Row.',
       triB:[R('DB Renegade Row w/Push Up','compound',4),R('DB Single Arm Preacher Curl','isolation',4),R('BB Curl','isolation',4)],triBNote:'Back to back. Rest after BB Curl.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Russian Twists','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 BB Good Mornings (light)','10 DB Bulgarian Split Squat (light)'],
       triA:[R('BB Back Squat','compound',4),R('BB Front Squat','compound',4),R('DB Bulgarian Split Squat','compound',4)],triANote:'Back to back. Rest after Bulgarian Split Squat.',
       triB:[R('BB Romanian Deadlift','compound',4),R('BB Sumo Deadlift','compound',4),R('BB Hip Thrust','compound',4)],triBNote:'Back to back. Rest after Hip Thrust.',
       core:[R('Leg Raises','core',2),R('Side Plank Hip Dips','core',2),R('Hollow Hold','core',2)]}
    ]
  },
  gym_4:{
    beginner:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 Incline Push Ups','10 DB Lateral Raise (light)'],
       triA:[R('DB Floor Press','compound',3),R('DB Chest Fly','isolation',3),R('Push Ups','compound',3)],triANote:'Back to back. Rest after Push Ups.',
       triB:[R('DB Seated Shoulder Press','compound',3),R('DB Lateral Raise','isolation',3),R('Overhead Extension','isolation',3)],triBNote:'Back to back. Rest after Overhead Extension.',
       core:[R('Plank Hold','core',2),R('Heel Taps','core',2),R('Shoulder Taps','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 DB Single Arm Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('DB Single Arm Row','compound',3),R('DB Bent Over Row','compound',3),R('DB Reverse Fly','isolation',3)],triANote:'Back to back. Rest after Reverse Fly.',
       triB:[R('DB Bicep Curls','isolation',3),R('DB Hammer Curls','isolation',3),R('DB Upright Row','compound',3)],triBNote:'Back to back. Rest after Upright Row.',
       core:[R('Bicycle Crunches','core',2),R('Flutter Kicks','core',2),R('Side Plank','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Alt Lunges (light)'],
       triA:[R('DB Goblet Squat','compound',3),R('DB Alt Lunges','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('DB Hip Thrust','compound',3),R('DB Single Leg Deadlift','compound',3),R('DB Single Leg Glute Bridge','isolation',3)],triBNote:'Back to back. Rest after Single Leg Glute Bridge.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank','core',2)]},
      {name:'Day 4 — Full Body Conditioning',warmup:['5 Walk Outs','10 Bodyweight Squats','20 Mountain Climbers'],
       triA:[R('DB Swings','compound',3),R('DB Goblet Squat','compound',3),R('Push Ups','compound',3)],triANote:'Back to back. Rest after Push Ups.',
       triB:[R('DB Hang Clean & Press','compound',3),R('Burpees','compound',3),R('DB Single Arm Row','compound',3)],triBNote:'Back to back. Rest after Single Arm Row.',
       core:[R('Plank Jacks','core',2),R('Flutter Kicks','core',2),R('Hollow Hold','core',2)]}
    ],
    intermediate:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 DB Bench Press (light)','10 DB Lateral Raise'],
       triA:[R('BB Bench Press','compound',3),R('DB Incline Press','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('DB Seated Shoulder Press','compound',3),R('DB Lateral Raise','isolation',3),R('DB Push Press','compound',3)],triBNote:'Back to back. Rest after Push Press.',
       core:[R('Bicycle Crunches','core',2),R('Plank Hold','core',2),R('Heel Taps','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 DB Single Arm Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('BB Bent Over Row','compound',3),R('DB Single Arm Row','compound',3),R('DB Reverse Fly','isolation',3)],triANote:'Back to back. Rest after Reverse Fly.',
       triB:[R('DB Renegade Row','compound',3),R('DB Bicep Curls','isolation',3),R('DB Hammer Curls','isolation',3)],triBNote:'Back to back. Rest after Hammer Curls.',
       core:[R('Russian Twists','core',2),R('Flutter Kicks','core',2),R('Hollow Hold','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Reverse Lunges'],
       triA:[R('BB Back Squat','compound',3),R('DB Bulgarian Split Squat','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('BB Romanian Deadlift','compound',3),R('DB Single Leg Deadlift','compound',3),R('DB Hip Thrust','compound',3)],triBNote:'Back to back. Rest after Hip Thrust.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank Hip Dips','core',2)]},
      {name:'Day 4 — Full Body Conditioning',warmup:['5 Walk Outs','10 Bodyweight Squats','20 Mountain Climbers'],
       triA:[R('DB Hang Snatch','compound',3),R('DB Swings','compound',3),R('Half Burpees','compound',3)],triANote:'Back to back. Rest after Half Burpees.',
       triB:[R('DB Hang Clean & Press','compound',3),R('DB Single Arm Gorilla Row','compound',3),R('Jumping Squat','compound',3)],triBNote:'Back to back. Rest after Jumping Squat.',
       core:[R('Plank Jacks','core',2),R('Flutter Kicks','core',2),R('Hollow Hold','core',2)]}
    ],
    advanced:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 DB Bench Press (light)','10 BB Military Press (light)'],
       triA:[R('BB Bench Press','compound',4),R('BB Incline Bench Press','compound',4),R('DB Chest Fly','isolation',4)],triANote:'Back to back. Rest after Chest Fly.',
       triB:[R('BB Military Press','compound',4),R('DB Lateral Raise','isolation',4),R('DB Skull Crushers','isolation',4)],triBNote:'Back to back. Rest after Skull Crushers.',
       core:[R('Hollow Rocks','core',2),R('DB Plank Pull Through','core',2),R('Walking Plank','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 BB Bent Over Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('BB Bent Over Row','compound',4),R('DB Single Arm Gorilla Row','compound',4),R('DB Chest Supported Row','compound',4)],triANote:'Back to back. Rest after Chest Supported Row.',
       triB:[R('DB Renegade Row w/Push Up','compound',4),R('DB Single Arm Preacher Curl','isolation',4),R('BB Curl','isolation',4)],triBNote:'Back to back. Rest after BB Curl.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Russian Twists','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 BB Good Mornings (light)','10 DB Bulgarian Split Squat (light)'],
       triA:[R('BB Back Squat','compound',4),R('BB Front Squat','compound',4),R('DB Bulgarian Split Squat','compound',4)],triANote:'Back to back. Rest after Bulgarian Split Squat.',
       triB:[R('BB Romanian Deadlift','compound',4),R('BB Sumo Deadlift','compound',4),R('BB Hip Thrust','compound',4)],triBNote:'Back to back. Rest after Hip Thrust.',
       core:[R('Leg Raises','core',2),R('Side Plank Hip Dips','core',2),R('Hollow Hold','core',2)]},
      {name:'Day 4 — Full Body Conditioning',warmup:['5 Walk Outs','10 Bodyweight Squats','20 Mountain Climbers'],
       triA:[R('BB Hang Clean & Press','compound',4),R('DB Hang Snatch','compound',4),R('Burpees','compound',4)],triANote:'Back to back. Rest after Burpees.',
       triB:[R('Single Arm Devils Press','compound',4),R('DB Swings','compound',4),R('Jumping Squat','compound',4)],triBNote:'Back to back. Rest after Jumping Squat.',
       core:[R('Hollow Rocks','core',2),R('Plank Jacks','core',2),R('Flutter Kicks','core',2)]}
    ]
  },
  home_db_2:{
    beginner:[
      {name:'Day 1 — Upper Body',warmup:['10 DB External Rotations','10 Incline Push Ups','10 DB Lateral Raise (light)'],
       triA:[R('DB Floor Press','compound',3),R('DB Chest Fly','isolation',3),R('Push Ups','compound',3)],triANote:'Back to back. Rest after Push Ups.',
       triB:[R('DB Single Arm Row','compound',3),R('DB Reverse Fly','isolation',3),R('DB Bicep Curls','isolation',3)],triBNote:'Back to back. Rest after Bicep Curls.',
       core:[R('Plank Hold','core',2),R('Shoulder Taps','core',2),R('Heel Taps','core',2)]},
      {name:'Day 2 — Lower Body',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Reverse Lunges (light)'],
       triA:[R('DB Goblet Squat','compound',3),R('DB Alt Lunges','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('DB Hip Thrust','compound',3),R('DB Single Leg Deadlift','compound',3),R('DB Single Leg Glute Bridge','isolation',3)],triBNote:'Back to back. Rest after Single Leg Glute Bridge.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank','core',2)]}
    ],
    intermediate:[
      {name:'Day 1 — Upper Body',warmup:['10 DB External Rotations','10 DB Floor Press (light)','10 DB Lateral Raise'],
       triA:[R('DB Bench Press','compound',3),R('DB Incline Press','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('DB Seated Shoulder Press','compound',3),R('DB Single Arm Row','compound',3),R('DB Hammer Curls','isolation',3)],triBNote:'Back to back. Rest after Hammer Curls.',
       core:[R('Bicycle Crunches','core',2),R('Plank Hold','core',2),R('DB Weighted Sit Ups','core',2)]},
      {name:'Day 2 — Lower Body',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Reverse Lunges'],
       triA:[R('DB Goblet Squat','compound',3),R('DB Bulgarian Split Squat','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('DB Single Leg Deadlift','compound',3),R('DB Hip Thrust','compound',3),R('DB Single Leg Hip Thrust','isolation',3)],triBNote:'Back to back. Rest after Single Leg Hip Thrust.',
       core:[R('Leg Raises','core',2),R('Russian Twists','core',2),R('Side Plank Hip Dips','core',2)]}
    ],
    advanced:[
      {name:'Day 1 — Upper Body',warmup:['10 DB External Rotations','10 DB Bench Press (light)','10 DB Push Press (light)'],
       triA:[R('DB Bench Press','compound',4),R('DB Incline Press','compound',4),R('DB Incline Fly','isolation',4)],triANote:'Back to back. Rest after Incline Fly.',
       triB:[R('DB Single Arm Gorilla Row','compound',4),R('DB Chest Supported Row','compound',4),R('DB Concentrated Curl','isolation',4)],triBNote:'Back to back. Rest after Concentrated Curl.',
       core:[R('Hollow Rocks','core',2),R('DB Plank Pull Through','core',2),R('Side Plank Hip Dips','core',2)]},
      {name:'Day 2 — Lower Body',warmup:['10 Bodyweight Squats','10 DB Single Leg Deadlift (light)','10 DB Bulgarian Split Squat (light)'],
       triA:[R('DB Front Squat','compound',4),R('DB Bulgarian Split Squat','compound',4),R('DB Glute Based Step Ups','compound',4)],triANote:'Back to back. Rest after Step Ups.',
       triB:[R('DB Single Leg Deadlift','compound',4),R('DB Hip Thrust','compound',4),R('DB Single Leg Hip Thrust','isolation',4)],triBNote:'Back to back. Rest after Single Leg Hip Thrust.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Russian Twists','core',2)]}
    ]
  },
  home_db_3:{
    beginner:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 Incline Push Ups','10 DB Lateral Raise (light)'],
       triA:[R('DB Floor Press','compound',3),R('DB Chest Fly','isolation',3),R('Push Ups','compound',3)],triANote:'Back to back. Rest after Push Ups.',
       triB:[R('DB Seated Shoulder Press','compound',3),R('DB Lateral Raise','isolation',3),R('Overhead Extension','isolation',3)],triBNote:'Back to back. Rest after Overhead Extension.',
       core:[R('Plank Hold','core',2),R('Heel Taps','core',2),R('Shoulder Taps','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 DB Single Arm Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('DB Single Arm Row','compound',3),R('DB Bent Over Row','compound',3),R('DB Reverse Fly','isolation',3)],triANote:'Back to back. Rest after Reverse Fly.',
       triB:[R('DB Bicep Curls','isolation',3),R('DB Hammer Curls','isolation',3),R('DB Alt Bicep Curl','isolation',3)],triBNote:'Back to back. Rest after Alt Bicep Curl.',
       core:[R('Bicycle Crunches','core',2),R('Flutter Kicks','core',2),R('Side Plank','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Alt Lunges (light)'],
       triA:[R('DB Goblet Squat','compound',3),R('DB Alt Lunges','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('DB Hip Thrust','compound',3),R('DB Single Leg Deadlift','compound',3),R('DB Single Leg Glute Bridge','isolation',3)],triBNote:'Back to back. Rest after Single Leg Glute Bridge.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Plank Taps','core',2)]}
    ],
    intermediate:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 DB Floor Press (light)','10 DB Lateral Raise'],
       triA:[R('DB Bench Press','compound',3),R('DB Incline Press','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('DB Seated Shoulder Press','compound',3),R('DB Lateral Raise','isolation',3),R('DB Push Press','compound',3)],triBNote:'Back to back. Rest after Push Press.',
       core:[R('Bicycle Crunches','core',2),R('Plank Hold','core',2),R('Heel Taps','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 DB Single Arm Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('DB Single Arm Gorilla Row','compound',3),R('DB Bent Over Row','compound',3),R('DB Reverse Fly','isolation',3)],triANote:'Back to back. Rest after Reverse Fly.',
       triB:[R('DB Renegade Row','compound',3),R('DB Bicep Curls','isolation',3),R('DB Hammer Curls','isolation',3)],triBNote:'Back to back. Rest after Hammer Curls.',
       core:[R('Russian Twists','core',2),R('Flutter Kicks','core',2),R('Hollow Hold','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Reverse Lunges'],
       triA:[R('DB Goblet Squat','compound',3),R('DB Bulgarian Split Squat','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('DB Single Leg Deadlift','compound',3),R('DB Hip Thrust','compound',3),R('DB Single Leg Hip Thrust','isolation',3)],triBNote:'Back to back. Rest after Single Leg Hip Thrust.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank Hip Dips','core',2)]}
    ],
    advanced:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 DB Bench Press (light)','10 DB Push Press (light)'],
       triA:[R('DB Bench Press','compound',4),R('DB Incline Press','compound',4),R('DB Incline Fly','isolation',4)],triANote:'Back to back. Rest after Incline Fly.',
       triB:[R('DB Single Arm Shoulder Press','compound',4),R('DB Lateral Raise','isolation',4),R('DB Skull Crushers','isolation',4)],triBNote:'Back to back. Rest after Skull Crushers.',
       core:[R('Hollow Rocks','core',2),R('DB Plank Pull Through','core',2),R('Walking Plank','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 DB Bent Over Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('DB Single Arm Gorilla Row','compound',4),R('DB Chest Supported Row','compound',4),R('DB Reverse Fly','isolation',4)],triANote:'Back to back. Rest after Reverse Fly.',
       triB:[R('DB Renegade Row w/Push Up','compound',4),R('DB Concentrated Curl','isolation',4),R('DB Single Arm Preacher Curl','isolation',4)],triBNote:'Back to back. Rest after Preacher Curl.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Russian Twists','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 DB Single Leg Deadlift (light)','10 DB Bulgarian Split Squat (light)'],
       triA:[R('DB Front Squat','compound',4),R('DB Bulgarian Split Squat','compound',4),R('DB Glute Based Step Ups','compound',4)],triANote:'Back to back. Rest after Step Ups.',
       triB:[R('DB Single Leg Deadlift','compound',4),R('DB Hip Thrust','compound',4),R('DB Single Leg Hip Thrust','isolation',4)],triBNote:'Back to back. Rest after Single Leg Hip Thrust.',
       core:[R('Hollow Hold','core',2),R('Side Plank Hip Dips','core',2),R('Leg Raises','core',2)]}
    ]
  },
  home_db_4:{
    beginner:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 Incline Push Ups','10 DB Lateral Raise (light)'],
       triA:[R('DB Floor Press','compound',3),R('DB Chest Fly','isolation',3),R('Push Ups','compound',3)],triANote:'Back to back. Rest after Push Ups.',
       triB:[R('DB Seated Shoulder Press','compound',3),R('DB Lateral Raise','isolation',3),R('Overhead Extension','isolation',3)],triBNote:'Back to back. Rest after Overhead Extension.',
       core:[R('Plank Hold','core',2),R('Heel Taps','core',2),R('Shoulder Taps','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 DB Single Arm Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('DB Single Arm Row','compound',3),R('DB Bent Over Row','compound',3),R('DB Reverse Fly','isolation',3)],triANote:'Back to back. Rest after Reverse Fly.',
       triB:[R('DB Bicep Curls','isolation',3),R('DB Hammer Curls','isolation',3),R('DB Upright Row','compound',3)],triBNote:'Back to back. Rest after Upright Row.',
       core:[R('Bicycle Crunches','core',2),R('Flutter Kicks','core',2),R('Side Plank','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Alt Lunges (light)'],
       triA:[R('DB Goblet Squat','compound',3),R('DB Alt Lunges','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('DB Hip Thrust','compound',3),R('DB Single Leg Deadlift','compound',3),R('DB Single Leg Glute Bridge','isolation',3)],triBNote:'Back to back. Rest after Single Leg Glute Bridge.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank','core',2)]},
      {name:'Day 4 — Full Body Conditioning',warmup:['5 Walk Outs','10 Bodyweight Squats','20 Mountain Climbers'],
       triA:[R('DB Swings','compound',3),R('DB Goblet Squat','compound',3),R('Push Ups','compound',3)],triANote:'Back to back. Rest after Push Ups.',
       triB:[R('DB Hang Clean & Press','compound',3),R('DB Single Arm Row','compound',3),R('Half Burpees','compound',3)],triBNote:'Back to back. Rest after Half Burpees.',
       core:[R('Plank Jacks','core',2),R('Flutter Kicks','core',2),R('Hollow Hold','core',2)]}
    ],
    intermediate:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 DB Floor Press (light)','10 DB Lateral Raise'],
       triA:[R('DB Bench Press','compound',3),R('DB Incline Press','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('DB Seated Shoulder Press','compound',3),R('DB Lateral Raise','isolation',3),R('DB Push Press','compound',3)],triBNote:'Back to back. Rest after Push Press.',
       core:[R('Bicycle Crunches','core',2),R('Plank Hold','core',2),R('Heel Taps','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 DB Single Arm Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('DB Single Arm Gorilla Row','compound',3),R('DB Bent Over Row','compound',3),R('DB Reverse Fly','isolation',3)],triANote:'Back to back. Rest after Reverse Fly.',
       triB:[R('DB Renegade Row','compound',3),R('DB Bicep Curls','isolation',3),R('DB Hammer Curls','isolation',3)],triBNote:'Back to back. Rest after Hammer Curls.',
       core:[R('Russian Twists','core',2),R('Flutter Kicks','core',2),R('Hollow Hold','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 DB Reverse Lunges'],
       triA:[R('DB Goblet Squat','compound',3),R('DB Bulgarian Split Squat','compound',3),R('DB Sumo Deadlift','compound',3)],triANote:'Back to back. Rest after Sumo Deadlift.',
       triB:[R('DB Single Leg Deadlift','compound',3),R('DB Hip Thrust','compound',3),R('DB Single Leg Hip Thrust','isolation',3)],triBNote:'Back to back. Rest after Single Leg Hip Thrust.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank Hip Dips','core',2)]},
      {name:'Day 4 — Full Body Conditioning',warmup:['5 Walk Outs','10 Bodyweight Squats','20 Mountain Climbers'],
       triA:[R('DB Hang Snatch','compound',3),R('DB Swings','compound',3),R('Half Burpees','compound',3)],triANote:'Back to back. Rest after Half Burpees.',
       triB:[R('DB Hang Clean & Press','compound',3),R('Single Arm Devils Press','compound',3),R('Jumping Squat','compound',3)],triBNote:'Back to back. Rest after Jumping Squat.',
       core:[R('Plank Jacks','core',2),R('Flutter Kicks','core',2),R('Hollow Hold','core',2)]}
    ],
    advanced:[
      {name:'Day 1 — Push',warmup:['10 DB External Rotations','10 DB Bench Press (light)','10 DB Push Press (light)'],
       triA:[R('DB Bench Press','compound',4),R('DB Incline Press','compound',4),R('DB Incline Fly','isolation',4)],triANote:'Back to back. Rest after Incline Fly.',
       triB:[R('DB Single Arm Shoulder Press','compound',4),R('DB Lateral Raise','isolation',4),R('DB Skull Crushers','isolation',4)],triBNote:'Back to back. Rest after Skull Crushers.',
       core:[R('Hollow Rocks','core',2),R('DB Plank Pull Through','core',2),R('Walking Plank','core',2)]},
      {name:'Day 2 — Pull',warmup:['10 DB External Rotations','10 DB Bent Over Row (light)','10 DB Reverse Fly (light)'],
       triA:[R('DB Single Arm Gorilla Row','compound',4),R('DB Chest Supported Row','compound',4),R('DB Reverse Fly','isolation',4)],triANote:'Back to back. Rest after Reverse Fly.',
       triB:[R('DB Renegade Row w/Push Up','compound',4),R('DB Concentrated Curl','isolation',4),R('DB Single Arm Preacher Curl','isolation',4)],triBNote:'Back to back. Rest after Preacher Curl.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Russian Twists','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 DB Single Leg Deadlift (light)','10 DB Bulgarian Split Squat (light)'],
       triA:[R('DB Front Squat','compound',4),R('DB Bulgarian Split Squat','compound',4),R('DB Glute Based Step Ups','compound',4)],triANote:'Back to back. Rest after Step Ups.',
       triB:[R('DB Single Leg Deadlift','compound',4),R('DB Hip Thrust','compound',4),R('DB Single Leg Hip Thrust','isolation',4)],triBNote:'Back to back. Rest after Single Leg Hip Thrust.',
       core:[R('Hollow Hold','core',2),R('Side Plank Hip Dips','core',2),R('Leg Raises','core',2)]},
      {name:'Day 4 — Full Body Conditioning',warmup:['5 Walk Outs','10 Bodyweight Squats','20 Mountain Climbers'],
       triA:[R('Single Arm Devils Press','compound',4),R('DB Hang Snatch','compound',4),R('Burpees','compound',4)],triANote:'Back to back. Rest after Burpees.',
       triB:[R('DB Hang Clean & Press','compound',4),R('DB Swings','compound',4),R('Jumping Squat','compound',4)],triBNote:'Back to back. Rest after Jumping Squat.',
       core:[R('Hollow Rocks','core',2),R('Plank Jacks','core',2),R('Flutter Kicks','core',2)]}
    ]
  },
  home_bw_2:{
    beginner:[
      {name:'Day 1 — Upper Body',warmup:['10 Incline Push Ups','10 Shoulder Taps','10 Walk Outs'],
       triA:[R('Incline Push Ups','compound',3),R('Push Ups','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('Plank Taps','compound',3),R('Walking Plank','compound',3),R('Shoulder Taps','isolation',3)],triBNote:'Back to back. Rest after Shoulder Taps.',
       core:[R('Plank Hold','core',2),R('Heel Taps','core',2),R('Butterfly Crunches','core',2)]},
      {name:'Day 2 — Lower Body',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 Alternating Step Ups'],
       triA:[R('Bodyweight Squat','compound',3),R('Alternating Step Ups','compound',3),R('Single Leg Glute Bridge','compound',3)],triANote:'Back to back. Rest after Glute Bridge.',
       triB:[R('Jumping Squat','compound',3),R('Half Burpees','compound',3),R('Walk Outs','compound',3)],triBNote:'Back to back. Rest after Walk Outs.',
       core:[R('Leg Raises','core',2),R('Flutter Kicks','core',2),R('Side Plank','core',2)]}
    ],
    intermediate:[
      {name:'Day 1 — Upper Body',warmup:['10 Incline Push Ups','10 Shoulder Taps','10 Walk Outs'],
       triA:[R('Push Ups','compound',3),R('Hand Release Push Ups','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('Walking Plank','compound',3),R('Plank Taps','compound',3),R('Shoulder Taps','isolation',3)],triBNote:'Back to back. Rest after Shoulder Taps.',
       core:[R('Bicycle Crunches','core',2),R('Plank Hold','core',2),R('Pilates Sit Up','core',2)]},
      {name:'Day 2 — Lower Body',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 Alternating Step Ups'],
       triA:[R('Jumping Squat','compound',3),R('Alternating Step Ups','compound',3),R('Single Leg Glute Bridge','compound',3)],triANote:'Back to back. Rest after Glute Bridge.',
       triB:[R('Burpees','compound',3),R('Half Burpees','compound',3),R('Walk Outs','compound',3)],triBNote:'Back to back. Rest after Walk Outs.',
       core:[R('Leg Raises','core',2),R('Flutter Kicks','core',2),R('Side Plank Hip Dips','core',2)]}
    ],
    advanced:[
      {name:'Day 1 — Upper Body',warmup:['10 Incline Push Ups','10 Walk Outs','10 Shoulder Taps'],
       triA:[R('Hand Release Push Ups','compound',4),R('Push Ups','compound',4),R('Dips','compound',4)],triANote:'Back to back. Rest after Dips.',
       triB:[R('Walking Plank','compound',4),R('Plank Jacks','compound',4),R('Shoulder Taps','isolation',4)],triBNote:'Back to back. Rest after Shoulder Taps.',
       core:[R('Hollow Rocks','core',2),R('Plank Hold','core',2),R('Side Plank Hip Dips','core',2)]},
      {name:'Day 2 — Lower Body',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 Alternating Step Ups'],
       triA:[R('Pistol Squat','compound',4),R('Jumping Squat','compound',4),R('Alternating Step Ups','compound',4)],triANote:'Back to back. Rest after Step Ups.',
       triB:[R('Burpees','compound',4),R('Single Leg Glute Bridge','compound',4),R('Walk Outs','compound',4)],triBNote:'Back to back. Rest after Walk Outs.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Flutter Kicks','core',2)]}
    ]
  },
  home_bw_3:{
    beginner:[
      {name:'Day 1 — Push',warmup:['10 Incline Push Ups','10 Shoulder Taps','10 Walk Outs'],
       triA:[R('Incline Push Ups','compound',3),R('Push Ups','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('Walking Plank','compound',3),R('Plank Taps','compound',3),R('Half Burpees','compound',3)],triBNote:'Back to back. Rest after Half Burpees.',
       core:[R('Plank Hold','core',2),R('Heel Taps','core',2),R('Shoulder Taps','core',2)]},
      {name:'Day 2 — Pull & Core',warmup:['10 Walk Outs','10 Shoulder Taps','20 Mountain Climbers'],
       triA:[R('Walking Plank','compound',3),R('Plank Taps','compound',3),R('Shoulder Taps','compound',3)],triANote:'Back to back. Rest after Shoulder Taps.',
       triB:[R('Walk Outs','compound',3),R('Butterfly Crunches','compound',3),R('Pilates Sit Up','compound',3)],triBNote:'Back to back. Rest after Pilates Sit Up.',
       core:[R('Bicycle Crunches','core',2),R('Flutter Kicks','core',2),R('Side Plank','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 Alternating Step Ups'],
       triA:[R('Bodyweight Squat','compound',3),R('Alternating Step Ups','compound',3),R('Single Leg Glute Bridge','compound',3)],triANote:'Back to back. Rest after Glute Bridge.',
       triB:[R('Jumping Squat','compound',3),R('Half Burpees','compound',3),R('Walk Outs','compound',3)],triBNote:'Back to back. Rest after Walk Outs.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Plank Taps','core',2)]}
    ],
    intermediate:[
      {name:'Day 1 — Push',warmup:['10 Incline Push Ups','10 Shoulder Taps','10 Walk Outs'],
       triA:[R('Push Ups','compound',3),R('Hand Release Push Ups','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('Walking Plank','compound',3),R('Plank Jacks','compound',3),R('Half Burpees','compound',3)],triBNote:'Back to back. Rest after Half Burpees.',
       core:[R('Bicycle Crunches','core',2),R('Plank Hold','core',2),R('Heel Taps','core',2)]},
      {name:'Day 2 — Pull & Core',warmup:['10 Walk Outs','10 Shoulder Taps','20 Mountain Climbers'],
       triA:[R('Walking Plank','compound',3),R('Plank Taps','compound',3),R('Shoulder Taps','compound',3)],triANote:'Back to back. Rest after Shoulder Taps.',
       triB:[R('Burpees','compound',3),R('Walk Outs','compound',3),R('Pilates Sit Up','compound',3)],triBNote:'Back to back. Rest after Pilates Sit Up.',
       core:[R('Russian Twists','core',2),R('Flutter Kicks','core',2),R('Hollow Hold','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 Alternating Step Ups'],
       triA:[R('Jumping Squat','compound',3),R('Alternating Step Ups','compound',3),R('Single Leg Glute Bridge','compound',3)],triANote:'Back to back. Rest after Glute Bridge.',
       triB:[R('Burpees','compound',3),R('Half Burpees','compound',3),R('Walk Outs','compound',3)],triBNote:'Back to back. Rest after Walk Outs.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank Hip Dips','core',2)]}
    ],
    advanced:[
      {name:'Day 1 — Push',warmup:['10 Incline Push Ups','10 Walk Outs','10 Shoulder Taps'],
       triA:[R('Hand Release Push Ups','compound',4),R('Push Ups','compound',4),R('Dips','compound',4)],triANote:'Back to back. Rest after Dips.',
       triB:[R('Walking Plank','compound',4),R('Plank Jacks','compound',4),R('Burpees','compound',4)],triBNote:'Back to back. Rest after Burpees.',
       core:[R('Hollow Rocks','core',2),R('DB Plank Pull Through','core',2),R('Side Plank Hip Dips','core',2)]},
      {name:'Day 2 — Pull & Core',warmup:['10 Walk Outs','10 Shoulder Taps','20 Mountain Climbers'],
       triA:[R('Walking Plank','compound',4),R('Plank Jacks','compound',4),R('Shoulder Taps','compound',4)],triANote:'Back to back. Rest after Shoulder Taps.',
       triB:[R('Burpees','compound',4),R('Walk Outs','compound',4),R('Half Burpees','compound',4)],triBNote:'Back to back. Rest after Half Burpees.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Russian Twists','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 Alternating Step Ups'],
       triA:[R('Pistol Squat','compound',4),R('Jumping Squat','compound',4),R('Alternating Step Ups','compound',4)],triANote:'Back to back. Rest after Step Ups.',
       triB:[R('Burpees','compound',4),R('Single Leg Glute Bridge','compound',4),R('Walk Outs','compound',4)],triBNote:'Back to back. Rest after Walk Outs.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Flutter Kicks','core',2)]}
    ]
  },
  home_bw_4:{
    beginner:[
      {name:'Day 1 — Push',warmup:['10 Incline Push Ups','10 Shoulder Taps','10 Walk Outs'],
       triA:[R('Incline Push Ups','compound',3),R('Push Ups','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('Walking Plank','compound',3),R('Plank Taps','compound',3),R('Half Burpees','compound',3)],triBNote:'Back to back. Rest after Half Burpees.',
       core:[R('Plank Hold','core',2),R('Heel Taps','core',2),R('Shoulder Taps','core',2)]},
      {name:'Day 2 — Pull & Core',warmup:['10 Walk Outs','10 Shoulder Taps','20 Mountain Climbers'],
       triA:[R('Walking Plank','compound',3),R('Plank Taps','compound',3),R('Shoulder Taps','compound',3)],triANote:'Back to back. Rest after Shoulder Taps.',
       triB:[R('Walk Outs','compound',3),R('Butterfly Crunches','compound',3),R('Pilates Sit Up','compound',3)],triBNote:'Back to back. Rest after Pilates Sit Up.',
       core:[R('Bicycle Crunches','core',2),R('Flutter Kicks','core',2),R('Side Plank','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 Alternating Step Ups'],
       triA:[R('Bodyweight Squat','compound',3),R('Alternating Step Ups','compound',3),R('Single Leg Glute Bridge','compound',3)],triANote:'Back to back. Rest after Glute Bridge.',
       triB:[R('Jumping Squat','compound',3),R('Half Burpees','compound',3),R('Walk Outs','compound',3)],triBNote:'Back to back. Rest after Walk Outs.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank','core',2)]},
      {name:'Day 4 — Full Body Conditioning',warmup:['5 Walk Outs','10 Bodyweight Squats','20 Mountain Climbers'],
       triA:[R('Burpees','compound',3),R('Jumping Squat','compound',3),R('Push Ups','compound',3)],triANote:'Back to back. Rest after Push Ups.',
       triB:[R('Half Burpees','compound',3),R('Walk Outs','compound',3),R('Plank Jacks','compound',3)],triBNote:'Back to back. Rest after Plank Jacks.',
       core:[R('Hollow Hold','core',2),R('Flutter Kicks','core',2),R('Leg Raises','core',2)]}
    ],
    intermediate:[
      {name:'Day 1 — Push',warmup:['10 Incline Push Ups','10 Shoulder Taps','10 Walk Outs'],
       triA:[R('Push Ups','compound',3),R('Hand Release Push Ups','compound',3),R('Dips','compound',3)],triANote:'Back to back. Rest after Dips.',
       triB:[R('Walking Plank','compound',3),R('Plank Jacks','compound',3),R('Half Burpees','compound',3)],triBNote:'Back to back. Rest after Half Burpees.',
       core:[R('Bicycle Crunches','core',2),R('Plank Hold','core',2),R('Heel Taps','core',2)]},
      {name:'Day 2 — Pull & Core',warmup:['10 Walk Outs','10 Shoulder Taps','20 Mountain Climbers'],
       triA:[R('Walking Plank','compound',3),R('Plank Taps','compound',3),R('Shoulder Taps','compound',3)],triANote:'Back to back. Rest after Shoulder Taps.',
       triB:[R('Burpees','compound',3),R('Walk Outs','compound',3),R('Pilates Sit Up','compound',3)],triBNote:'Back to back. Rest after Pilates Sit Up.',
       core:[R('Russian Twists','core',2),R('Flutter Kicks','core',2),R('Hollow Hold','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 Alternating Step Ups'],
       triA:[R('Jumping Squat','compound',3),R('Alternating Step Ups','compound',3),R('Single Leg Glute Bridge','compound',3)],triANote:'Back to back. Rest after Glute Bridge.',
       triB:[R('Burpees','compound',3),R('Half Burpees','compound',3),R('Walk Outs','compound',3)],triBNote:'Back to back. Rest after Walk Outs.',
       core:[R('Leg Raises','core',2),R('Heel Taps','core',2),R('Side Plank Hip Dips','core',2)]},
      {name:'Day 4 — Full Body Conditioning',warmup:['5 Walk Outs','10 Bodyweight Squats','20 Mountain Climbers'],
       triA:[R('Burpees','compound',3),R('Jumping Squat','compound',3),R('Push Ups','compound',3)],triANote:'Back to back. Rest after Push Ups.',
       triB:[R('Half Burpees','compound',3),R('Walk Outs','compound',3),R('Plank Jacks','compound',3)],triBNote:'Back to back. Rest after Plank Jacks.',
       core:[R('Hollow Hold','core',2),R('Flutter Kicks','core',2),R('Leg Raises','core',2)]}
    ],
    advanced:[
      {name:'Day 1 — Push',warmup:['10 Incline Push Ups','10 Walk Outs','10 Shoulder Taps'],
       triA:[R('Hand Release Push Ups','compound',4),R('Push Ups','compound',4),R('Dips','compound',4)],triANote:'Back to back. Rest after Dips.',
       triB:[R('Walking Plank','compound',4),R('Plank Jacks','compound',4),R('Burpees','compound',4)],triBNote:'Back to back. Rest after Burpees.',
       core:[R('Hollow Rocks','core',2),R('DB Plank Pull Through','core',2),R('Side Plank Hip Dips','core',2)]},
      {name:'Day 2 — Pull & Core',warmup:['10 Walk Outs','10 Shoulder Taps','20 Mountain Climbers'],
       triA:[R('Walking Plank','compound',4),R('Plank Jacks','compound',4),R('Shoulder Taps','compound',4)],triANote:'Back to back. Rest after Shoulder Taps.',
       triB:[R('Burpees','compound',4),R('Walk Outs','compound',4),R('Half Burpees','compound',4)],triBNote:'Back to back. Rest after Half Burpees.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Russian Twists','core',2)]},
      {name:'Day 3 — Legs',warmup:['10 Bodyweight Squats','10 Single Leg Glute Bridge','10 Alternating Step Ups'],
       triA:[R('Pistol Squat','compound',4),R('Jumping Squat','compound',4),R('Alternating Step Ups','compound',4)],triANote:'Back to back. Rest after Step Ups.',
       triB:[R('Burpees','compound',4),R('Single Leg Glute Bridge','compound',4),R('Walk Outs','compound',4)],triBNote:'Back to back. Rest after Walk Outs.',
       core:[R('Hollow Hold','core',2),R('Leg Raises','core',2),R('Flutter Kicks','core',2)]},
      {name:'Day 4 — Full Body Conditioning',warmup:['5 Walk Outs','10 Bodyweight Squats','20 Mountain Climbers'],
       triA:[R('Burpees','compound',4),R('Jumping Squat','compound',4),R('Hand Release Push Ups','compound',4)],triANote:'Back to back. Rest after Hand Release Push Ups.',
       triB:[R('Half Burpees','compound',4),R('Pistol Squat','compound',4),R('Plank Jacks','compound',4)],triBNote:'Back to back. Rest after Plank Jacks.',
       core:[R('Hollow Rocks','core',2),R('Leg Raises','core',2),R('Side Plank Hip Dips','core',2)]}
    ]
  }
};
