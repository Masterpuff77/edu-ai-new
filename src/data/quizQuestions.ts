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
  // Mathematics lessons - Complete with 3 diverse questions each
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
  'mate-6': [
    {
      question: "Într-un triunghi isoscel:",
      options: ["Toate laturile sunt egale", "Două laturi sunt egale", "Toate unghiurile sunt egale", "Un unghi este de 90°"],
      correctAnswer: 1
    },
    {
      question: "Bisectoarea unui unghi:",
      options: ["Îl împarte în două părți egale", "Este perpendiculară pe latură", "Unește două vârfuri", "Trece prin centrul cercului"],
      correctAnswer: 0
    },
    {
      question: "Teorema lui Pitagora se aplică în triunghiul:",
      options: ["Echilateral", "Isoscel", "Dreptunghic", "Obtuzunghic"],
      correctAnswer: 2
    }
  ],
  'mate-7': [
    {
      question: "Aria unui paralelogram se calculează:",
      options: ["baza × înălțimea", "latura × latura", "(baza × înălțimea) / 2", "2 × (lungimea + lățimea)"],
      correctAnswer: 0
    },
    {
      question: "Un romb are:",
      options: ["Toate unghiurile drepte", "Toate laturile egale", "Diagonalele egale", "Toate variantele"],
      correctAnswer: 1
    },
    {
      question: "Perimetrul unui pătrat cu aria 25 cm² este:",
      options: ["20 cm", "25 cm", "10 cm", "15 cm"],
      correctAnswer: 0
    }
  ],
  'mate-8': [
    {
      question: "Aria unui cerc cu raza 2 cm este (π ≈ 3,14):",
      options: ["6,28 cm²", "12,56 cm²", "25,12 cm²", "4 cm²"],
      correctAnswer: 1
    },
    {
      question: "O coardă a cercului este:",
      options: ["O linie din centru la circumferință", "O linie care trece prin centru", "O linie care unește două puncte de pe circumferință", "O linie tangentă"],
      correctAnswer: 2
    },
    {
      question: "Sectorul circular reprezintă:",
      options: ["Întregul cerc", "O porțiune din cerc", "Circumferința", "Centrul cercului"],
      correctAnswer: 1
    }
  ],
  'mate-9': [
    {
      question: "Expresia (2x + 1)² se dezvoltă:",
      options: ["4x² + 1", "4x² + 4x + 1", "4x² + 2x + 1", "2x² + 4x + 1"],
      correctAnswer: 1
    },
    {
      question: "Factorizarea lui x² - 25 este:",
      options: ["(x - 5)²", "(x + 5)²", "(x - 5)(x + 5)", "x(x - 25)"],
      correctAnswer: 2
    },
    {
      question: "Pentru a calcula (a + b)³ folosim:",
      options: ["a³ + b³", "a³ + 3a²b + 3ab² + b³", "(a + b)(a² + b²)", "a³ + 3ab + b³"],
      correctAnswer: 1
    }
  ],
  'mate-10': [
    {
      question: "Înainte de a rezolva o problemă trebuie să:",
      options: ["Calculezi imediat", "Înțelegi ce se cere", "Scrii răspunsul", "Verifici rezultatul"],
      correctAnswer: 1
    },
    {
      question: "Datele unei probleme sunt:",
      options: ["Informațiile cunoscute", "Rezultatul final", "Calculele efectuate", "Verificarea"],
      correctAnswer: 0
    },
    {
      question: "Un răspuns complet conține:",
      options: ["Doar cifre", "Cifre și unitatea de măsură", "Doar unitatea", "Doar calculele"],
      correctAnswer: 1
    }
  ],

  // Romanian lessons - Complete with 3 diverse questions each
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
  'romana-4': [
    {
      question: "Caracterizarea psihologică se referă la:",
      options: ["Aspectul fizic", "Trăsăturile morale și psihice", "Vârsta personajului", "Numele personajului"],
      correctAnswer: 1
    },
    {
      question: "Monologul interior dezvăluie:",
      options: ["Aspectul fizic", "Gândurile și sentimentele", "Acțiunile", "Dialogul cu alții"],
      correctAnswer: 1
    },
    {
      question: "Un personaj plat este:",
      options: ["Simplu, cu puține trăsături", "Complex și evoluat", "Absent din acțiune", "Naratorul"],
      correctAnswer: 0
    }
  ],
  'romana-5': [
    {
      question: "Descrierea subiectivă conține:",
      options: ["Doar fapte obiective", "Impresii și sentimente personale", "Date științifice", "Cifre exacte"],
      correctAnswer: 1
    },
    {
      question: "Timpul în descriere poate fi:",
      options: ["Doar prezent", "Prezent, trecut sau viitor", "Doar trecut", "Absent"],
      correctAnswer: 1
    },
    {
      question: "Descrierea dinamică prezintă:",
      options: ["Elemente statice", "Elemente în mișcare", "Doar culori", "Doar sunete"],
      correctAnswer: 1
    }
  ],
  'romana-6': [
    {
      question: "Antiteza în argumentare:",
      options: ["Susține teza", "Prezintă punctul de vedere opus", "Repetă teza", "Ignoră teza"],
      correctAnswer: 1
    },
    {
      question: "Un argument prin exemplu folosește:",
      options: ["Cazuri concrete", "Teorii abstracte", "Opinii personale", "Întrebări"],
      correctAnswer: 0
    },
    {
      question: "\"Prin urmare\" este un conector de:",
      options: ["Cauză", "Opoziție", "Concluzie", "Timp"],
      correctAnswer: 2
    }
  ],
  'romana-7': [
    {
      question: "Articolul hotărât pentru \"casă\" este:",
      options: ["casa", "unei case", "case", "casei"],
      correctAnswer: 0
    },
    {
      question: "Verbul la modul conjunctiv exprimă:",
      options: ["O acțiune reală", "O acțiune posibilă/dorită", "Un ordin", "O întrebare"],
      correctAnswer: 1
    },
    {
      question: "Numeralul \"primul\" este:",
      options: ["Cardinal", "Ordinal", "Fracționar", "Multiplicativ"],
      correctAnswer: 1
    }
  ],
  'romana-8': [
    {
      question: "Atributul se acordă cu:",
      options: ["Verbul", "Substantivul determinat", "Subiectul", "Predicatul"],
      correctAnswer: 1
    },
    {
      question: "Complementul circumstanțial de timp răspunde la:",
      options: ["Cine? Ce?", "Unde?", "Când?", "Cum?"],
      correctAnswer: 2
    },
    {
      question: "Propoziția principală poate exista:",
      options: ["Doar cu subordonate", "Și fără subordonate", "Doar în frază", "Doar cu coordonate"],
      correctAnswer: 1
    }
  ],
  'romana-9': [
    {
      question: "Cuvintele \"mâine\" și \"pâine\" se scriu cu:",
      options: ["î", "â", "ai", "âi"],
      correctAnswer: 1
    },
    {
      question: "Ghilimelele se folosesc pentru:",
      options: ["Întrebări", "Citate și cuvinte străine", "Exclamații", "Enumerări"],
      correctAnswer: 1
    },
    {
      question: "Punctul și virgula se pune:",
      options: ["La sfârșitul frazei", "Între propoziții independente", "Înaintea conjuncțiilor", "În enumerări"],
      correctAnswer: 1
    }
  ],
  'romana-10': [
    {
      question: "Textul argumentativ la Subiectul III trebuie să aibă:",
      options: ["Doar introducere", "Introducere, cuprins, încheiere", "Doar cuprins", "Doar încheiere"],
      correctAnswer: 1
    },
    {
      question: "Pentru nota maximă la redactare este important:",
      options: ["Lungimea textului", "Coerența și corectitudinea", "Cuvintele complicate", "Viteza de scriere"],
      correctAnswer: 1
    },
    {
      question: "Planul de idei ajută la:",
      options: ["Scrierea mai rapidă", "Organizarea logică a textului", "Folosirea mai multor cuvinte", "Evitarea greșelilor"],
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
  'informatica-4': [
    {
      question: "Supraîncărcarea funcțiilor permite:",
      options: ["Același nume cu parametri diferiți", "Același nume cu același tip", "Funcții fără parametri", "Funcții fără nume"],
      correctAnswer: 0
    },
    {
      question: "Variabilele locale într-o funcție:",
      options: ["Sunt vizibile în tot programul", "Sunt vizibile doar în funcție", "Nu există", "Sunt întotdeauna globale"],
      correctAnswer: 1
    },
    {
      question: "Cazul de bază în recursivitate:",
      options: ["Oprește recursivitatea", "Continuă recursivitatea", "Generează eroare", "Nu este necesar"],
      correctAnswer: 0
    }
  ],
  'informatica-5': [
    {
      question: "Metoda append() pentru șiruri:",
      options: ["Șterge caractere", "Adaugă la sfârșitul șirului", "Caută în șir", "Compară șiruri"],
      correctAnswer: 1
    },
    {
      question: "Pentru a converti un șir la număr folosim:",
      options: ["toString()", "stoi()", "convert()", "parse()"],
      correctAnswer: 1
    },
    {
      question: "Caracterul de escape \"\\n\" reprezintă:",
      options: ["Spațiu", "Tab", "Linie nouă", "Backslash"],
      correctAnswer: 2
    }
  ],
  'informatica-6': [
    {
      question: "Quick Sort folosește strategia:",
      options: ["Divide et impera", "Forță brută", "Programare dinamică", "Greedy"],
      correctAnswer: 0
    },
    {
      question: "Stabilitatea unui algoritm de sortare înseamnă:",
      options: ["Nu generează erori", "Păstrează ordinea elementelor egale", "Rulează rapid", "Folosește puțină memorie"],
      correctAnswer: 1
    },
    {
      question: "Căutarea ternară împarte intervalul în:",
      options: ["2 părți", "3 părți", "4 părți", "5 părți"],
      correctAnswer: 1
    }
  ],
  'informatica-7': [
    {
      question: "Destructorul unei clase:",
      options: ["Creează obiecte", "Distruge obiecte", "Modifică obiecte", "Copiază obiecte"],
      correctAnswer: 1
    },
    {
      question: "Clasa derivată poate accesa membrii \"protected\" ai clasei de bază:",
      options: ["Da, întotdeauna", "Nu, niciodată", "Doar prin moștenire publică", "Doar prin funcții friend"],
      correctAnswer: 0
    },
    {
      question: "Funcțiile virtuale permit:",
      options: ["Moștenire multiplă", "Polimorfism dinamic", "Încapsulare", "Abstractizare"],
      correctAnswer: 1
    }
  ],
  'informatica-8': [
    {
      question: "Funcția seekg() în C++:",
      options: ["Caută text în fișier", "Poziționează cursorul de citire", "Deschide fișierul", "Închide fișierul"],
      correctAnswer: 1
    },
    {
      question: "Diferența între \">>\" și \"getline()\" este:",
      options: ["Nu există diferență", ">> citește până la spațiu, getline() citește linia", "getline() este mai lent", ">> este pentru numere"],
      correctAnswer: 1
    },
    {
      question: "Fișierele binare sunt utile pentru:",
      options: ["Stocare eficientă", "Citire ușoară", "Editare în notepad", "Debugging"],
      correctAnswer: 0
    }
  ],
  'informatica-9': [
    {
      question: "Avantajul listelor înlănțuite față de tablouri:",
      options: ["Acces mai rapid", "Dimensiune dinamică", "Mai puțină memorie", "Implementare mai simplă"],
      correctAnswer: 1
    },
    {
      question: "Într-un heap binar, părintele unui nod la poziția i este la:",
      options: ["i/2", "(i-1)/2", "i*2", "i+1"],
      correctAnswer: 1
    },
    {
      question: "Parcurgerea BFS (Breadth-First Search) folosește:",
      options: ["Stivă", "Coadă", "Lista", "Tablou"],
      correctAnswer: 1
    }
  ],
  'informatica-10': [
    {
      question: "Clauza GROUP BY în SQL:",
      options: ["Sortează rezultatele", "Grupează rândurile", "Filtrează datele", "Unește tabele"],
      correctAnswer: 1
    },
    {
      question: "Funcția COUNT() returnează:",
      options: ["Suma valorilor", "Numărul de rânduri", "Valoarea maximă", "Media valorilor"],
      correctAnswer: 1
    },
    {
      question: "INNER JOIN returnează:",
      options: ["Toate rândurile din prima tabelă", "Toate rândurile din a doua tabelă", "Doar rândurile care au corespondent în ambele tabele", "Toate rândurile din ambele tabele"],
      correctAnswer: 2
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
  'fizica-2': [
    {
      question: "Prima lege a lui Newton afirmă că:",
      options: ["F = ma", "Un corp în repaus rămâne în repaus", "La orice acțiune există o reacțiune", "Energia se conservă"],
      correctAnswer: 1
    },
    {
      question: "Forța de frecare este:",
      options: ["Întotdeauna utilă", "Întotdeauna dăunătoare", "Poate fi utilă sau dăunătoare", "Nu există"],
      correctAnswer: 2
    },
    {
      question: "Unitatea de măsură pentru forță în SI este:",
      options: ["kg", "m/s²", "Newton", "Joule"],
      correctAnswer: 2
    }
  ],
  'fizica-3': [
    {
      question: "Temperatura se măsoară în:",
      options: ["Joule", "Kelvin", "Newton", "Watt"],
      correctAnswer: 1
    },
    {
      question: "Dilatarea termică a solidelor depinde de:",
      options: ["Doar temperatura", "Temperatura și materialul", "Doar materialul", "Presiune"],
      correctAnswer: 1
    },
    {
      question: "Căldura este:",
      options: ["O formă de energie", "Temperatura", "Masa", "Volumul"],
      correctAnswer: 0
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
  'chimie-2': [
    {
      question: "Legătura ionică se formează între:",
      options: ["Doi nemetale", "Două metale", "Un metal și un nemetal", "Atomi identici"],
      correctAnswer: 2
    },
    {
      question: "Legătura covalentă implică:",
      options: ["Transfer de electroni", "Punerea în comun de electroni", "Electroni liberi", "Protoni"],
      correctAnswer: 1
    },
    {
      question: "Molecula de apă (H₂O) conține:",
      options: ["Legături ionice", "Legături covalente", "Legături metalice", "Nu are legături"],
      correctAnswer: 1
    }
  ],
  'chimie-3': [
    {
      question: "Concentrația molară se exprimă în:",
      options: ["g/L", "mol/L", "mg/mL", "%"],
      correctAnswer: 1
    },
    {
      question: "Solubilitatea depinde de:",
      options: ["Doar temperatura", "Temperatura și natura substanțelor", "Doar presiune", "Doar timpul"],
      correctAnswer: 1
    },
    {
      question: "O soluție saturată conține:",
      options: ["Puțin solut", "Mult solut", "Cantitatea maximă de solut", "Doar solvent"],
      correctAnswer: 2
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
  ],
  'biologie-2': [
    {
      question: "ADN-ul conține informația pentru:",
      options: ["Sinteza lipidelor", "Sinteza proteinelor", "Respirația", "Digestia"],
      correctAnswer: 1
    },
    {
      question: "Cromozomii sunt formați din:",
      options: ["Proteine", "ADN și proteine", "Doar ADN", "Lipide"],
      correctAnswer: 1
    },
    {
      question: "Mutațiile sunt:",
      options: ["Întotdeauna dăunătoare", "Întotdeauna benefice", "Pot fi benefice, neutre sau dăunătoare", "Nu există"],
      correctAnswer: 2
    }
  ],
  'biologie-3': [
    {
      question: "Sistemul nervos central include:",
      options: ["Doar creierul", "Creierul și măduva spinării", "Doar nervii", "Toate nervii"],
      correctAnswer: 1
    },
    {
      question: "Inima are:",
      options: ["2 camere", "3 camere", "4 camere", "5 camere"],
      correctAnswer: 2
    },
    {
      question: "Plămânii sunt organele pentru:",
      options: ["Digestie", "Circulație", "Respirație", "Excreție"],
      correctAnswer: 2
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