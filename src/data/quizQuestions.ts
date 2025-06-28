// Quiz questions data with diverse questions for each lesson
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface LessonQuestions {
  [lessonId: string]: QuizQuestion[];
}

export const quizQuestions: LessonQuestions = {
  // Mathematics lessons with completely different questions
  'mate-1': [
    {
      question: "Care dintre următoarele este un număr irațional?",
      options: ["√4", "√9", "√7", "√16"],
      correctAnswer: 2
    },
    {
      question: "Cum se notează mulțimea numerelor raționale?",
      options: ["N", "Z", "Q", "R"],
      correctAnswer: 2
    },
    {
      question: "Care este rezultatul: (-3) × (-4)?",
      options: ["-12", "12", "-7", "7"],
      correctAnswer: 1
    }
  ],
  'mate-2': [
    {
      question: "Dacă 3x - 12 = 0, atunci x este:",
      options: ["3", "4", "-4", "12"],
      correctAnswer: 1
    },
    {
      question: "O ecuație de gradul I are forma generală:",
      options: ["ax² + bx + c = 0", "ax + b = 0 (a ≠ 0)", "x = a", "ax = 0"],
      correctAnswer: 1
    },
    {
      question: "Pentru a verifica soluția unei ecuații:",
      options: ["O înlocuim în ecuația inițială", "O înmulțim cu 2", "O adunăm cu 1", "O ridicăm la pătrat"],
      correctAnswer: 0
    }
  ],
  'mate-3': [
    {
      question: "Soluția inecuației 2x - 8 < 0 este:",
      options: ["x < 4", "x > 4", "x < -4", "x > -4"],
      correctAnswer: 0
    },
    {
      question: "La înmulțirea unei inecuații cu -2:",
      options: ["Sensul rămâne același", "Sensul se schimbă", "Inecuația devine ecuație", "Nu se poate face"],
      correctAnswer: 1
    },
    {
      question: "Care inecuație are soluția x ≥ 3?",
      options: ["x - 3 ≥ 0", "x + 3 ≥ 0", "3 - x ≥ 0", "x - 3 < 0"],
      correctAnswer: 0
    }
  ],
  'mate-4': [
    {
      question: "Funcția f(x) = -2x + 3 are panta:",
      options: ["3", "-2", "2", "-3"],
      correctAnswer: 1
    },
    {
      question: "Graficul funcției f(x) = x intersectează axa Oy în punctul:",
      options: ["(0, 1)", "(1, 0)", "(0, 0)", "(1, 1)"],
      correctAnswer: 2
    },
    {
      question: "O funcție crescătoare are panta:",
      options: ["Negativă", "Pozitivă", "Zero", "Infinită"],
      correctAnswer: 1
    }
  ],
  'mate-5': [
    {
      question: "Sistemul {x + y = 5, x - y = 1} are soluția:",
      options: ["x = 2, y = 3", "x = 3, y = 2", "x = 1, y = 4", "x = 4, y = 1"],
      correctAnswer: 1
    },
    {
      question: "Metoda reducerii constă în:",
      options: ["Înlocuirea unei necunoscute", "Eliminarea unei necunoscute", "Adunarea ecuațiilor", "Toate variantele"],
      correctAnswer: 1
    },
    {
      question: "Un sistem incompatibil are:",
      options: ["O soluție", "Două soluții", "Infinite soluții", "Nicio soluție"],
      correctAnswer: 3
    }
  ],

  // Romanian lessons with diverse questions
  'romana-1': [
    {
      question: "Genul epic se caracterizează prin:",
      options: ["Prezența unui narator", "Exprimarea directă a sentimentelor", "Predominanța dialogului", "Lipsa personajelor"],
      correctAnswer: 0
    },
    {
      question: "Tragedia este o specie a genului:",
      options: ["Epic", "Liric", "Dramatic", "Didactic"],
      correctAnswer: 2
    },
    {
      question: "Romanul se deosebește de nuvelă prin:",
      options: ["Numărul de personaje", "Complexitatea acțiunii", "Lungimea textului", "Toate variantele"],
      correctAnswer: 3
    }
  ],
  'romana-2': [
    {
      question: "\"Pădurea murmură\" conține figura de stil:",
      options: ["Metaforă", "Personificare", "Comparație", "Epitet"],
      correctAnswer: 1
    },
    {
      question: "Hiperbola este:",
      options: ["O exagerare", "O diminuare", "O comparație", "O întrebare"],
      correctAnswer: 0
    },
    {
      question: "\"Rapid ca fulgerul\" este:",
      options: ["Metaforă", "Personificare", "Comparație", "Antiteză"],
      correctAnswer: 2
    }
  ],
  'romana-3': [
    {
      question: "Spațiul în textul narativ poate fi:",
      options: ["Doar real", "Doar imaginar", "Real sau imaginar", "Absent"],
      correctAnswer: 2
    },
    {
      question: "Retrospectiva (flashback-ul) se referă la:",
      options: ["Prezent", "Trecut", "Viitor", "Timp inexistent"],
      correctAnswer: 1
    },
    {
      question: "Conflictul într-un text narativ este:",
      options: ["Lupta dintre personaje", "Opoziția dintre forțe", "Dialogul", "Descrierea"],
      correctAnswer: 1
    }
  ],

  // Computer Science lessons with diverse questions
  'informatica-1': [
    {
      question: "Compilarea unui program înseamnă:",
      options: ["Rularea programului", "Traducerea în limbaj mașină", "Corectarea erorilor", "Salvarea fișierului"],
      correctAnswer: 1
    },
    {
      question: "Comentariile în cod servesc la:",
      options: ["Accelerarea execuției", "Explicarea codului", "Reducerea memoriei", "Compilare"],
      correctAnswer: 1
    },
    {
      question: "Tipul \"bool\" în C++ poate avea valorile:",
      options: ["0 și 1", "true și false", "da și nu", "Toate variantele a și b"],
      correctAnswer: 3
    }
  ],
  'informatica-2': [
    {
      question: "Bucla \"for\" este preferată când:",
      options: ["Nu știm numărul de iterații", "Știm exact numărul de iterații", "Vrem o buclă infinită", "Testăm o condiție"],
      correctAnswer: 1
    },
    {
      question: "Operatorul \"&&\" în C++ reprezintă:",
      options: ["SAU logic", "ȘI logic", "NEGAȚIE", "XOR"],
      correctAnswer: 1
    },
    {
      question: "Instrucțiunea \"else if\" permite:",
      options: ["Testarea unei singure condiții", "Testarea mai multor condiții", "Repetarea codului", "Oprirea programului"],
      correctAnswer: 1
    }
  ],
  'informatica-3': [
    {
      question: "Declarația \"int arr[5] = {1,2,3};\" inițializează:",
      options: ["Doar primele 3 elemente", "Toate cele 5 elemente", "Generează eroare", "Doar ultimele 2 elemente"],
      correctAnswer: 1
    },
    {
      question: "Pentru a parcurge o matrice 3x3 folosim:",
      options: ["O buclă", "Două bucle imbricate", "Trei bucle", "Nicio buclă"],
      correctAnswer: 1
    },
    {
      question: "Insertion Sort este eficient pentru:",
      options: ["Tablouri mari", "Tablouri mici sau aproape sortate", "Tablouri nesortate", "Orice tablou"],
      correctAnswer: 1
    }
  ],

  // Physics lessons
  'fizica-1': [
    {
      question: "Accelerația este:",
      options: ["Viteza pe unitatea de timp", "Variația vitezei pe unitatea de timp", "Distanța parcursă", "Forța aplicată"],
      correctAnswer: 1
    },
    {
      question: "Unitatea SI pentru accelerație este:",
      options: ["m/s", "m/s²", "N", "kg"],
      correctAnswer: 1
    },
    {
      question: "În mișcarea rectilinie uniformă:",
      options: ["Viteza variază", "Accelerația este constantă", "Viteza este constantă", "Nu există viteză"],
      correctAnswer: 2
    }
  ],

  // Chemistry lessons
  'chimie-1': [
    {
      question: "Numărul atomic reprezintă:",
      options: ["Numărul de neutroni", "Numărul de protoni", "Numărul de electroni", "Masa atomică"],
      correctAnswer: 1
    },
    {
      question: "Electronii se găsesc în:",
      options: ["Nucleu", "Învelișul electronic", "Protoni", "Neutroni"],
      correctAnswer: 1
    },
    {
      question: "Izotopii au același:",
      options: ["Număr de masă", "Număr atomic", "Număr de neutroni", "Toate proprietățile"],
      correctAnswer: 1
    }
  ],

  // Biology lessons
  'biologie-1': [
    {
      question: "Ribozomii sunt responsabili pentru:",
      options: ["Respirația celulară", "Sinteza proteinelor", "Fotosinteza", "Diviziunea celulară"],
      correctAnswer: 1
    },
    {
      question: "Membrana celulară este:",
      options: ["Permeabilă", "Impermeabilă", "Semipermeabilă", "Rigidă"],
      correctAnswer: 2
    },
    {
      question: "Nucleul celular conține:",
      options: ["Proteine", "Materialul genetic", "Lipide", "Glucide"],
      correctAnswer: 1
    }
  ]
};

// Function to get random questions for a lesson
export const getRandomQuestions = (lessonId: string, count: number = 3): QuizQuestion[] => {
  const questions = quizQuestions[lessonId];
  if (!questions || questions.length === 0) {
    // Fallback questions if lesson not found
    return [
      {
        question: "Aceasta este o întrebare de test pentru această lecție.",
        options: ["Opțiunea A", "Opțiunea B", "Opțiunea C", "Opțiunea D"],
        correctAnswer: 0
      }
    ];
  }
  
  // If we have enough questions, return them all or shuffle and take count
  if (questions.length <= count) {
    return questions;
  }
  
  // Shuffle and take the first 'count' questions
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Function to get all questions for a lesson
export const getAllQuestions = (lessonId: string): QuizQuestion[] => {
  return quizQuestions[lessonId] || [];
};