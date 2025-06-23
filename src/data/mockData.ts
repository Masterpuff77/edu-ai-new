import { User, Evaluation, Lesson, StudyPlan, Badge, Challenge, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'elev@example.com',
    name: 'Andrei Popescu',
    class: 'a XII-a A',
    school: 'Colegiul Național de Informatică',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
    level: 5,
    experience: 250,
    subjects: ['matematica', 'romana', 'informatica'],
    personalGoals: 'Vreau să iau nota maximă la Bacalaureat.',
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

// Mock Lessons
export const mockLessons: Lesson[] = [
  // Matematică
  {
    id: 'mate-en-8-1',
    title: 'Numere Reale - Operații și Proprietăți',
    subject: 'matematica',
    description: 'Recapitulare numere reale, operații și proprietăți pentru Evaluarea Națională',
    videoUrl: 'placeholder',
    content: `
      <h3>Numere Reale</h3>
      <p>Mulțimea numerelor reale cuprinde:</p>
      <ul>
        <li>Numere naturale (N): 0, 1, 2, 3, ...</li>
        <li>Numere întregi (Z): ..., -2, -1, 0, 1, 2, ...</li>
        <li>Numere raționale (Q): numere care pot fi scrise ca fracții</li>
        <li>Numere iraționale (I): numere cu zecimale infinite și neperiodice (√2, π)</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care dintre următoarele numere este irațional?',
        options: ['0.75', '√2', '3.14159...', '22/7'],
        correctAnswer: 1,
      },
    ],
    duration: 45,
  },
  {
    id: 'mate-en-8-2',
    title: 'Ecuații și Inecuații de Gradul I',
    subject: 'matematica',
    description: 'Rezolvarea ecuațiilor și inecuațiilor de gradul I',
    videoUrl: 'placeholder',
    content: `
      <h3>Ecuații de gradul I</h3>
      <p>O ecuație de gradul I are forma: ax + b = 0, unde a ≠ 0</p>
      <h4>Inecuații de gradul I</h4>
      <p>O inecuație de gradul I are una din formele: ax + b < 0, ax + b > 0, ax + b ≤ 0, ax + b ≥ 0</p>
    `,
    quiz: [
      {
        question: 'Care este soluția inecuației 2x + 3 > 7?',
        options: ['x > 2', 'x < 2', 'x > -2', 'x < -2'],
        correctAnswer: 0,
      },
    ],
    duration: 50,
  },

  // Limba Română
  {
    id: 'romana-en-8-1',
    title: 'Genuri și Specii Literare',
    subject: 'romana',
    description: 'Recapitulare genuri și specii literare',
    videoUrl: 'placeholder',
    content: `
      <h3>Genuri literare</h3>
      <ul>
        <li>Epic: narațiune, personaje, acțiune</li>
        <li>Liric: exprimarea sentimentelor</li>
        <li>Dramatic: conflicte, dialog</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care gen literar folosește dialogul ca mod de expunere principal?',
        options: ['Epic', 'Liric', 'Dramatic', 'Niciuna'],
        correctAnswer: 2,
      },
    ],
    duration: 45,
  },
  {
    id: 'romana-en-8-2',
    title: 'Figuri de Stil',
    subject: 'romana',
    description: 'Identificarea și analiza figurilor de stil',
    videoUrl: 'placeholder',
    content: `
      <h3>Figuri de stil principale</h3>
      <ul>
        <li>Personificarea: atribuirea de însușiri omenești</li>
        <li>Metafora: comparație subînțeleasă</li>
        <li>Epitetul: atribut expresiv</li>
        <li>Comparația: alăturarea a două elemente</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce figură de stil este în "ochii mării"?',
        options: ['Comparație', 'Personificare', 'Metaforă', 'Epitet'],
        correctAnswer: 2,
      },
    ],
    duration: 50,
  },

  // Informatică - Lecții complete pentru Bacalaureat
  {
    id: 'informatica-1',
    title: 'Introducere în Programare',
    subject: 'informatica',
    description: 'Concepte fundamentale de programare și algoritmi',
    videoUrl: 'placeholder',
    content: `
      <h3>Introducere în Programare</h3>
      <h4>Concepte de bază</h4>
      <ul>
        <li>Ce este programarea?</li>
        <li>Limbaje de programare</li>
        <li>Algoritmi și pseudocod</li>
        <li>Structura unui program</li>
      </ul>
      
      <h4>Primul program</h4>
      <pre><code>#include &lt;iostream&gt;
using namespace std;

int main() {
    cout &lt;&lt; "Hello, World!" &lt;&lt; endl;
    return 0;
}</code></pre>
      
      <h4>Variabile și tipuri de date</h4>
      <ul>
        <li>int, float, double, char, string</li>
        <li>Declararea și inițializarea variabilelor</li>
        <li>Operatori aritmetici și logici</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care este primul pas în rezolvarea unei probleme prin programare?',
        options: ['Scrierea codului', 'Analiza problemei și crearea algoritmului', 'Testarea programului', 'Compilarea'],
        correctAnswer: 1,
      },
    ],
    duration: 50,
  },
  {
    id: 'informatica-2',
    title: 'Structuri de Control',
    subject: 'informatica',
    description: 'Instrucțiuni condiționale și repetitive',
    videoUrl: 'placeholder',
    content: `
      <h3>Structuri de Control</h3>
      
      <h4>Instrucțiuni condiționale</h4>
      <ul>
        <li>if, else if, else</li>
        <li>switch-case</li>
        <li>Operatori de comparație</li>
      </ul>
      
      <pre><code>if (nota >= 5) {
    cout << "Promovat";
} else {
    cout << "Nepromovat";
}</code></pre>
      
      <h4>Instrucțiuni repetitive</h4>
      <ul>
        <li>for, while, do-while</li>
        <li>Bucle imbricate</li>
        <li>break și continue</li>
      </ul>
      
      <pre><code>for (int i = 1; i <= 10; i++) {
    cout << i << " ";
}</code></pre>
    `,
    quiz: [
      {
        question: 'Care buclă se execută cel puțin o dată?',
        options: ['for', 'while', 'do-while', 'Toate'],
        correctAnswer: 2,
      },
    ],
    duration: 50,
  },
  {
    id: 'informatica-3',
    title: 'Tablouri și Vectori',
    subject: 'informatica',
    description: 'Lucrul cu structuri de date liniare',
    videoUrl: 'placeholder',
    content: `
      <h3>Tablouri și Vectori</h3>
      
      <h4>Tablouri unidimensionale</h4>
      <ul>
        <li>Declararea și inițializarea</li>
        <li>Accesarea elementelor</li>
        <li>Parcurgerea tablourilor</li>
      </ul>
      
      <pre><code>int numere[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++) {
    cout << numere[i] << " ";
}</code></pre>
      
      <h4>Tablouri bidimensionale</h4>
      <ul>
        <li>Matrice</li>
        <li>Parcurgerea pe linii și coloane</li>
        <li>Operații cu matrice</li>
      </ul>
      
      <h4>Algoritmi clasici</h4>
      <ul>
        <li>Căutarea unui element</li>
        <li>Sortarea (bubble sort, selection sort)</li>
        <li>Găsirea minimului/maximului</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care este indexul primului element dintr-un tablou în C++?',
        options: ['1', '0', '-1', 'Depinde de declarație'],
        correctAnswer: 1,
      },
    ],
    duration: 55,
  },
  {
    id: 'informatica-4',
    title: 'Funcții și Proceduri',
    subject: 'informatica',
    description: 'Modularizarea codului prin funcții',
    videoUrl: 'placeholder',
    content: `
      <h3>Funcții și Proceduri</h3>
      
      <h4>Concepte de bază</h4>
      <ul>
        <li>Definirea funcțiilor</li>
        <li>Parametri și argumente</li>
        <li>Valoarea de retur</li>
        <li>Apelul funcțiilor</li>
      </ul>
      
      <pre><code>int suma(int a, int b) {
    return a + b;
}

int main() {
    int rezultat = suma(5, 3);
    cout << rezultat; // 8
}</code></pre>
      
      <h4>Tipuri de parametri</h4>
      <ul>
        <li>Transmiterea prin valoare</li>
        <li>Transmiterea prin referință</li>
        <li>Parametri impliciți</li>
      </ul>
      
      <h4>Recursivitatea</h4>
      <ul>
        <li>Funcții recursive</li>
        <li>Cazul de bază și cazul recursiv</li>
        <li>Exemplu: factorial, Fibonacci</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce se întâmplă când o funcție nu are instrucțiunea return?',
        options: ['Eroare de compilare', 'Returnează 0', 'Returnează valoare aleatoare', 'Depinde de tipul funcției'],
        correctAnswer: 3,
      },
    ],
    duration: 50,
  },
  {
    id: 'informatica-5',
    title: 'Șiruri de Caractere',
    subject: 'informatica',
    description: 'Prelucrarea textelor și șirurilor',
    videoUrl: 'placeholder',
    content: `
      <h3>Șiruri de Caractere</h3>
      
      <h4>Concepte de bază</h4>
      <ul>
        <li>Declararea șirurilor</li>
        <li>Inițializarea și atribuirea</li>
        <li>Accesarea caracterelor</li>
      </ul>
      
      <pre><code>string nume = "Ion";
cout << nume[0]; // I
cout << nume.length(); // 3</code></pre>
      
      <h4>Operații cu șiruri</h4>
      <ul>
        <li>Concatenarea (+)</li>
        <li>Compararea (==, <, >)</li>
        <li>Căutarea în șiruri</li>
        <li>Extragerea de subșiruri</li>
      </ul>
      
      <h4>Funcții utile</h4>
      <ul>
        <li>length(), size()</li>
        <li>substr(), find()</li>
        <li>toupper(), tolower()</li>
        <li>Conversii între tipuri</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care funcție returnează lungimea unui șir în C++?',
        options: ['size()', 'length()', 'count()', 'Toate variantele a și b'],
        correctAnswer: 3,
      },
    ],
    duration: 45,
  },
  {
    id: 'informatica-6',
    title: 'Algoritmi de Sortare',
    subject: 'informatica',
    description: 'Algoritmi clasici de sortare și căutare',
    videoUrl: 'placeholder',
    content: `
      <h3>Algoritmi de Sortare</h3>
      
      <h4>Bubble Sort</h4>
      <ul>
        <li>Principiul algoritmului</li>
        <li>Implementarea</li>
        <li>Complexitatea temporală O(n²)</li>
      </ul>
      
      <pre><code>void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}</code></pre>
      
      <h4>Selection Sort</h4>
      <ul>
        <li>Găsirea minimului</li>
        <li>Schimbarea elementelor</li>
      </ul>
      
      <h4>Insertion Sort</h4>
      <ul>
        <li>Inserarea în poziția corectă</li>
        <li>Eficient pentru tablouri mici</li>
      </ul>
      
      <h4>Căutarea binară</h4>
      <ul>
        <li>Precondiție: tablou sortat</li>
        <li>Complexitate O(log n)</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Care algoritm de sortare are complexitatea cea mai bună în cazul cel mai rău?',
        options: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Toți au aceeași complexitate'],
        correctAnswer: 3,
      },
    ],
    duration: 55,
  },
  {
    id: 'informatica-7',
    title: 'Programare Orientată pe Obiecte',
    subject: 'informatica',
    description: 'Concepte fundamentale OOP',
    videoUrl: 'placeholder',
    content: `
      <h3>Programare Orientată pe Obiecte</h3>
      
      <h4>Concepte de bază</h4>
      <ul>
        <li>Clasa și obiectul</li>
        <li>Atribute și metode</li>
        <li>Constructori și destructori</li>
      </ul>
      
      <pre><code>class Persoana {
private:
    string nume;
    int varsta;
public:
    Persoana(string n, int v) {
        nume = n;
        varsta = v;
    }
    void afiseaza() {
        cout << nume << " - " << varsta << " ani";
    }
};</code></pre>
      
      <h4>Principiile OOP</h4>
      <ul>
        <li>Încapsularea</li>
        <li>Moștenirea</li>
        <li>Polimorfismul</li>
        <li>Abstractizarea</li>
      </ul>
      
      <h4>Modificatori de acces</h4>
      <ul>
        <li>public, private, protected</li>
        <li>Getteri și setteri</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce principiu OOP ascunde detaliile implementării?',
        options: ['Moștenirea', 'Polimorfismul', 'Încapsularea', 'Abstractizarea'],
        correctAnswer: 2,
      },
    ],
    duration: 60,
  },
  {
    id: 'informatica-8',
    title: 'Fișiere și Fluxuri',
    subject: 'informatica',
    description: 'Lucrul cu fișiere și persistența datelor',
    videoUrl: 'placeholder',
    content: `
      <h3>Fișiere și Fluxuri</h3>
      
      <h4>Concepte de bază</h4>
      <ul>
        <li>Tipuri de fișiere (text, binar)</li>
        <li>Deschiderea și închiderea fișierelor</li>
        <li>Moduri de acces (citire, scriere, adăugare)</li>
      </ul>
      
      <pre><code>#include &lt;fstream&gt;

// Scriere în fișier
ofstream fout("date.txt");
fout << "Hello, file!" << endl;
fout.close();

// Citire din fișier
ifstream fin("date.txt");
string linie;
getline(fin, linie);
fin.close();</code></pre>
      
      <h4>Operații cu fișiere</h4>
      <ul>
        <li>Citirea linie cu linie</li>
        <li>Citirea cuvânt cu cuvânt</li>
        <li>Verificarea sfârșitului de fișier</li>
        <li>Gestionarea erorilor</li>
      </ul>
      
      <h4>Aplicații practice</h4>
      <ul>
        <li>Salvarea și încărcarea datelor</li>
        <li>Procesarea fișierelor de configurare</li>
        <li>Logarea informațiilor</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce clasă se folosește pentru citirea din fișiere în C++?',
        options: ['ofstream', 'ifstream', 'fstream', 'iostream'],
        correctAnswer: 1,
      },
    ],
    duration: 50,
  },
  {
    id: 'informatica-9',
    title: 'Structuri de Date',
    subject: 'informatica',
    description: 'Structuri de date avansate și aplicații',
    videoUrl: 'placeholder',
    content: `
      <h3>Structuri de Date</h3>
      
      <h4>Structuri (struct)</h4>
      <ul>
        <li>Definirea structurilor</li>
        <li>Accesarea membrilor</li>
        <li>Tablouri de structuri</li>
      </ul>
      
      <pre><code>struct Student {
    string nume;
    int varsta;
    float medie;
};

Student s1 = {"Ion", 18, 9.5};
cout << s1.nume;</code></pre>
      
      <h4>Liste înlănțuite</h4>
      <ul>
        <li>Noduri și legături</li>
        <li>Inserarea și ștergerea</li>
        <li>Parcurgerea listei</li>
      </ul>
      
      <h4>Stive și cozi</h4>
      <ul>
        <li>Principiul LIFO (Last In, First Out)</li>
        <li>Principiul FIFO (First In, First Out)</li>
        <li>Implementări și aplicații</li>
      </ul>
      
      <h4>Arbori binari</h4>
      <ul>
        <li>Concepte de bază</li>
        <li>Parcurgeri (preordine, inordine, postordine)</li>
        <li>Arbori de căutare binară</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce principiu urmează o stivă?',
        options: ['FIFO', 'LIFO', 'RANDOM', 'SORTED'],
        correctAnswer: 1,
      },
    ],
    duration: 55,
  },
  {
    id: 'informatica-10',
    title: 'Baze de Date și SQL',
    subject: 'informatica',
    description: 'Introducere în bazele de date și limbajul SQL',
    videoUrl: 'placeholder',
    content: `
      <h3>Baze de Date și SQL</h3>
      
      <h4>Concepte fundamentale</h4>
      <ul>
        <li>Ce este o bază de date?</li>
        <li>Tabele, înregistrări, câmpuri</li>
        <li>Chei primare și străine</li>
        <li>Relații între tabele</li>
      </ul>
      
      <h4>Limbajul SQL</h4>
      <ul>
        <li>SELECT - interogarea datelor</li>
        <li>INSERT - inserarea datelor</li>
        <li>UPDATE - modificarea datelor</li>
        <li>DELETE - ștergerea datelor</li>
      </ul>
      
      <pre><code>-- Crearea unei tabele
CREATE TABLE Studenti (
    id INT PRIMARY KEY,
    nume VARCHAR(50),
    varsta INT,
    medie FLOAT
);

-- Inserarea datelor
INSERT INTO Studenti VALUES (1, "Ion", 18, 9.5);

-- Interogarea datelor
SELECT * FROM Studenti WHERE medie > 8.0;</code></pre>
      
      <h4>Operații avansate</h4>
      <ul>
        <li>JOIN-uri între tabele</li>
        <li>Funcții de agregare (COUNT, SUM, AVG)</li>
        <li>Gruparea datelor (GROUP BY)</li>
        <li>Sortarea rezultatelor (ORDER BY)</li>
      </ul>
    `,
    quiz: [
      {
        question: 'Ce comandă SQL se folosește pentru a selecta date din tabele?',
        options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
        correctAnswer: 2,
      },
    ],
    duration: 60,
  },
];

// Mock Study Plan
export const mockStudyPlan: StudyPlan = {
  id: '123e4567-e89b-12d3-a456-426614174005',
  userId: '123e4567-e89b-12d3-a456-426614174000',
  recommendations: [
    'Concentrează-te pe exerciții de algebră pentru Bacalaureat.',
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
    { day: 7, lessonId: 'informatica-3' },
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
    name: 'Programator Începător',
    description: 'Ai completat prima lecție de informatică',
    iconUrl: 'programmer-icon.svg',
    criteria: 'complete_first_programming',
  },
];

// Mock Challenges
export const mockChallenges: Omit<Challenge, 'current'>[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174006',
    title: 'Rezolvă 5 ecuații azi',
    description: 'Exersează rezolvarea ecuațiilor pentru Bacalaureat',
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
  {
    id: '123e4567-e89b-12d3-a456-426614174008',
    title: 'Scrie primul program',
    description: 'Completează prima lecție de programare',
    target: 1,
    type: 'daily',
    reward: {
      type: 'experience',
      amount: 75,
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
  {
    userId: '123e4567-e89b-12d3-a456-426614174000',
    challengeId: '123e4567-e89b-12d3-a456-426614174008',
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
    message: 'Noi lecții de pregătire pentru Bacalaureat sunt disponibile!',
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