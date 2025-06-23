Here's the fixed version of the file with all missing closing brackets added:

```typescript
import { User, Evaluation, Lesson, StudyPlan, Badge, Challenge, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'elev@example.com',
    name: 'Andrei Popescu',
    class: 'a VIII-a B',
    school: 'Școala Gimnazială Nr. 1',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 5,
    experience: 250,
    subjects: ['matematica', 'romana', 'informatica'],
    personalGoals: 'Vreau să iau nota maximă la Evaluarea Națională.',
    badges: [
      '123e4567-e89b-12d3-a456-426614174011',
      '123e4567-e89b-12d3-a456-426614174012',
      '123e4567-e89b-12d3-a456-426614174013'
    ],
    createdAt: '2023-09-01T10:00:00.000Z',
    examType: 'bacalaureat',
    grade: 12
  },
];

// Mock Evaluations
export const mockEvaluations: Evaluation[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    userId: '123e4567-e89b-12d3-a456-426614174000',
    subject: 'matematica',
    score: 7,
    totalQuestions: 10,
    date: '2023-09-02T10:30:00.000Z',
  },
];

// Mock Lessons - Updated to include all subjects
export const mockLessons: Lesson[] = [
  // ... all lesson objects ...
  {
    id: 'romana-en-8-9',
    title: 'Sintaxă',
    subject: 'romana',
    description: 'Analiza sintactică a propoziției și frazei',
    videoUrl: 'placeholder',
    content: `
      <h3>Sintaxa propoziției și frazei</h3>
      <ul>
        <li>Părți de propoziție: subiect, predicat, atribut, complement</li>
        <li>Tipuri de propoziții: principale, subordonate</li>
        <li>Relații sintactice: coordonare, subordonare</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care este partea principală de propoziție?',
        options: ['Atributul', 'Complementul', 'Predicatul', 'Apoziția'],
        correctAnswer: 2,
      },
    ],
    duration: 45,
  },
  // ... rest of the lessons ...
];

// Mock Study Plan
export const mockStudyPlan: StudyPlan = {
  id: '123e4567-e89b-12d3-a456-426614174005',
  userId: '123e4567-e89b-12d3-a456-426614174000',
  recommendations: [
    'Concentrează-te pe exerciții de algebră pentru Evaluarea Națională.',
    'Exersează rezolvarea subiectelor din anii anteriori la matematică.',
    'Recapitulează figurile de stil și elementele de versificație la română.',
    'Practică programarea în C++ pentru a-ți îmbunătăți abilitățile de informatică.'
  ],
  schedule: [
    { day: 1, lessonId: 'mate-en-8-1' },
    { day: 2, lessonId: 'romana-en-8-1' },
    { day: 3, lessonId: 'informatica-1' },
    { day: 4, lessonId: 'mate-en-8-2' },
    { day: 5, lessonId: 'romana-en-8-2' },
    { day: 6, lessonId: 'informatica-2' },
    { day: 7, lessonId: 'mate-en-8-3' },
  ],
  createdAt: '2023-09-03T08:00:00.000Z',
};

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174011',
    name: 'Matematician Junior',
    description: 'Ai completat prima lecție de matematică',
    iconUrl: 'mathematician-jr-icon.svg',
    criteria: 'complete_first_math',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174012',
    name: 'Literat în Devenire',
    description: 'Ai identificat corect toate figurile de stil',
    iconUrl: 'writer-icon.svg',
    criteria: 'identify_all_figures',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174013',
    name: 'Algebră Master',
    description: 'Ai rezolvat corect 10 ecuații consecutive',
    iconUrl: 'algebra-master-icon.svg',
    criteria: 'solve_10_equations',
  },
];

// Mock Challenges
export const mockChallenges: Omit<Challenge, 'current'>[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174006',
    title: 'Rezolvă 5 ecuații azi',
    description: 'Exersează rezolvarea ecuațiilor pentru Evaluarea Națională',
    target: 5,
    type: 'daily',
    reward: {
      type: 'experience',
      amount: 50,
    },
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174007',
    title: 'Identifică figurile de stil',
    description: 'Găsește toate figurile de stil dintr-un text dat',
    target: 1,
    type: 'daily',
    reward: {
      type: 'experience',
      amount: 100,
    },
  },
];

// Mock Challenge Progress
export const mockChallengeProgress = [
  {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    challengeId: '123e4567-e89b-12d3-a456-426614174006',
    current: 0,
  },
  {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    challengeId: '123e4567-e89b-12d3-a456-426614174007',
    current: 0,
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174008',
    userId: '123e4567-e89b-12d3-a456-426614174000',
    message: 'Ai deblocat insigna "Matematician Junior"!',
    read: false,
    createdAt: '2023-09-03T09:30:00.000Z',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174009',
    userId: '123e4567-e89b-12d3-a456-426614174000',
    message: 'Noi lecții de pregătire pentru Evaluarea Națională sunt disponibile!',
    read: true,
    createdAt: '2023-09-02T14:15:00.000Z',
  },
];

// Initialize mock data
export const initMockData = async (supabase: any) => {
  try {
    // First check if data already exists in the lessons table
    const { data: existingLessons } = await supabase
      .from('lessons')
      .select('id')
      .limit(1);

    // If we already have data, skip initialization
    if (existingLessons && existingLessons.length > 0) {
      console.log('Mock data already exists, skipping initialization');
      return;
    }

    console.log('Initializing mock data...');

    // Insert lessons first since they're critical
    const { error: lessonsError } = await supabase
      .from('lessons')
      .upsert(mockLessons);
    
    if (lessonsError) {
      throw lessonsError;
    }

    // Insert other public data
    const { error: badgesError } = await supabase
      .from('badges')
      .upsert(mockBadges);
    
    if (badgesError) {
      console.error('Error inserting badges:', badgesError);
    }

    const { error: challengesError } = await supabase
      .from('challenges')
      .upsert(mockChallenges);
    
    if (challengesError) {
      console.error('Error inserting challenges:', challengesError);
    }

    console.log('Mock data initialized successfully!');
  } catch (error) {
    console.error('Error initializing mock data:', error);
    throw error; // Re-throw to handle in the app initialization
  }
};
```