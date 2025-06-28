/*
  # Add More Diverse Quiz Questions

  1. Changes
    - Update all lessons with 3 unique and diverse questions
    - Ensure questions are different and cover various aspects of each lesson
    - Add more variety in question types and difficulty levels

  2. Content Updates
    - Mathematics: Different calculation types, theory, and applications
    - Romanian: Grammar, literature analysis, and writing techniques
    - Computer Science: Programming concepts, algorithms, and theory
*/

-- Update Mathematics lessons with more diverse questions
UPDATE lessons SET quiz = '[
  {
    "question": "Care dintre următoarele numere este irațional?",
    "options": ["0.25", "√2", "3/4", "-5"],
    "correctAnswer": 1
  },
  {
    "question": "Cum se notează mulțimea numerelor întregi?",
    "options": ["N", "Z", "Q", "R"],
    "correctAnswer": 1
  },
  {
    "question": "Care este rezultatul calculului: 2³ + 3²?",
    "options": ["17", "15", "13", "19"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'mate-1';

UPDATE lessons SET quiz = '[
  {
    "question": "Dacă 2x + 6 = 0, atunci x = ?",
    "options": ["-3", "3", "-2", "2"],
    "correctAnswer": 0
  },
  {
    "question": "Care este forma generală a unei ecuații de gradul I?",
    "options": ["ax² + bx + c = 0", "ax + b = 0, a ≠ 0", "x + a = b", "ax = b"],
    "correctAnswer": 1
  },
  {
    "question": "Dacă 5x - 15 = 0, care este valoarea lui x?",
    "options": ["3", "-3", "5", "-5"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'mate-2';

UPDATE lessons SET quiz = '[
  {
    "question": "Care este soluția inecuației 3x - 6 > 0?",
    "options": ["x > 2", "x < 2", "x > -2", "x < -2"],
    "correctAnswer": 0
  },
  {
    "question": "Când se schimbă sensul unei inegalități?",
    "options": ["La adunare cu un număr", "La înmulțire cu un număr pozitiv", "La înmulțire cu un număr negativ", "Niciodată"],
    "correctAnswer": 2
  },
  {
    "question": "Care este soluția inecuației x + 4 ≤ 7?",
    "options": ["x ≤ 3", "x ≥ 3", "x < 3", "x > 3"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'mate-3';

UPDATE lessons SET quiz = '[
  {
    "question": "Graficul funcției f(x) = 2x + 1 este:",
    "options": ["O parabolă", "O dreaptă care trece prin origine", "O dreaptă care nu trece prin origine", "Un cerc"],
    "correctAnswer": 2
  },
  {
    "question": "Care este panta dreptei y = -3x + 5?",
    "options": ["5", "-3", "3", "-5"],
    "correctAnswer": 1
  },
  {
    "question": "Prin ce punct trece graficul funcției f(x) = x - 2?",
    "options": ["(0, -2)", "(2, 0)", "(0, 2)", "Ambele a și b"],
    "correctAnswer": 3
  }
]'::jsonb WHERE id = 'mate-4';

UPDATE lessons SET quiz = '[
  {
    "question": "Un sistem de ecuații poate avea:",
    "options": ["Doar o soluție", "O soluție sau nicio soluție", "O soluție, nicio soluție sau infinite soluții", "Întotdeauna infinite soluții"],
    "correctAnswer": 2
  },
  {
    "question": "Metoda substituției este eficientă când:",
    "options": ["Toate coeficienții sunt mari", "Un coeficient este 1 sau -1", "Sistemul are multe ecuații", "Nu există soluție"],
    "correctAnswer": 1
  },
  {
    "question": "Două drepte paralele în plan formează un sistem:",
    "options": ["Compatibil determinat", "Compatibil nedeterminat", "Incompatibil", "Cu soluție unică"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'mate-5';

UPDATE lessons SET quiz = '[
  {
    "question": "Un triunghi echilateral are toate unghiurile de:",
    "options": ["90°", "60°", "45°", "120°"],
    "correctAnswer": 1
  },
  {
    "question": "Suma unghiurilor unui triunghi este:",
    "options": ["90°", "180°", "270°", "360°"],
    "correctAnswer": 1
  },
  {
    "question": "Înălțimea unui triunghi este:",
    "options": ["Linia care împarte unghiul în două", "Perpendiculara din vârf pe latura opusă", "Linia care unește mijloacele laturilor", "Linia care trece prin centrul cercului"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'mate-6';

UPDATE lessons SET quiz = '[
  {
    "question": "Un pătrat cu latura de 4 cm are aria:",
    "options": ["16 cm²", "8 cm²", "12 cm²", "20 cm²"],
    "correctAnswer": 0
  },
  {
    "question": "Perimetrul unui dreptunghi cu L = 7 cm și l = 3 cm este:",
    "options": ["21 cm", "10 cm", "20 cm", "14 cm"],
    "correctAnswer": 2
  },
  {
    "question": "Care patrulater are diagonalele egale și perpendiculare?",
    "options": ["Dreptunghi", "Romb", "Pătrat", "Paralelogram"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'mate-7';

UPDATE lessons SET quiz = '[
  {
    "question": "Dacă raza unui cerc este 5 cm, diametrul este:",
    "options": ["5 cm", "10 cm", "15 cm", "25 cm"],
    "correctAnswer": 1
  },
  {
    "question": "Lungimea unui cerc cu raza 4 cm este (π ≈ 3,14):",
    "options": ["12,56 cm", "25,12 cm", "50,24 cm", "6,28 cm"],
    "correctAnswer": 1
  },
  {
    "question": "Aria unui cerc cu diametrul 6 cm este (π ≈ 3,14):",
    "options": ["28,26 cm²", "18,84 cm²", "113,04 cm²", "9,42 cm²"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'mate-8';

UPDATE lessons SET quiz = '[
  {
    "question": "Dezvoltarea (x + 3)² este:",
    "options": ["x² + 9", "x² + 6x + 9", "x² + 3x + 9", "x² + 6x + 3"],
    "correctAnswer": 1
  },
  {
    "question": "Formula (a - b)² = ?",
    "options": ["a² - b²", "a² - 2ab + b²", "a² + 2ab - b²", "a² - ab + b²"],
    "correctAnswer": 1
  },
  {
    "question": "Factorizarea expresiei x² - 9 este:",
    "options": ["(x - 3)²", "(x + 3)²", "(x - 3)(x + 3)", "x(x - 9)"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'mate-9';

UPDATE lessons SET quiz = '[
  {
    "question": "Prima etapă în rezolvarea unei probleme este:",
    "options": ["Calculele", "Înțelegerea enunțului", "Scrierea răspunsului", "Verificarea"],
    "correctAnswer": 1
  },
  {
    "question": "Ce trebuie să conțină răspunsul la o problemă?",
    "options": ["Doar numărul", "Numărul cu unitatea de măsură", "Doar calculele", "Doar formula"],
    "correctAnswer": 1
  },
  {
    "question": "De ce este importantă verificarea rezultatului?",
    "options": ["Pentru a pierde timp", "Pentru a confirma corectitudinea", "Nu este necesară", "Pentru a complica problema"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'mate-10';

-- Update Romanian lessons with more diverse questions
UPDATE lessons SET quiz = '[
  {
    "question": "Genul dramatic se caracterizează prin:",
    "options": ["Narațiune", "Exprimarea sentimentelor", "Dialog și conflict", "Descriere"],
    "correctAnswer": 2
  },
  {
    "question": "Care specie aparține genului liric?",
    "options": ["Romanul", "Soneta", "Comedia", "Nuvela"],
    "correctAnswer": 1
  },
  {
    "question": "Basmul este o specie a genului:",
    "options": ["Liric", "Dramatic", "Epic", "Didactic"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'romana-1';

UPDATE lessons SET quiz = '[
  {
    "question": "\"Vântul dansează prin frunze\" conține:",
    "options": ["Metaforă", "Personificare", "Comparație", "Epitet"],
    "correctAnswer": 1
  },
  {
    "question": "\"Alb ca zăpada\" este:",
    "options": ["Metaforă", "Personificare", "Comparație", "Hiperbola"],
    "correctAnswer": 2
  },
  {
    "question": "\"Frumoasa fată\" conține:",
    "options": ["Epitet", "Metaforă", "Personificare", "Comparație"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'romana-2';

UPDATE lessons SET quiz = '[
  {
    "question": "Elementele textului narativ sunt:",
    "options": ["Doar acțiunea", "Acțiunea, personajele, timpul, spațiul", "Doar personajele", "Doar timpul"],
    "correctAnswer": 1
  },
  {
    "question": "Punctul culminant este:",
    "options": ["Începutul acțiunii", "Momentul de maximă tensiune", "Sfârșitul acțiunii", "Prezentarea personajelor"],
    "correctAnswer": 1
  },
  {
    "question": "Naratorul la persoana I este:",
    "options": ["Obiectiv", "Subiectiv", "Omniscient", "Absent"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-3';

UPDATE lessons SET quiz = '[
  {
    "question": "Caracterizarea directă se face prin:",
    "options": ["Acțiunile personajului", "Descrierea explicită a trăsăturilor", "Dialogul personajului", "Gândurile personajului"],
    "correctAnswer": 1
  },
  {
    "question": "Evoluția personajului înseamnă:",
    "options": ["Schimbarea aspectului fizic", "Transformarea morală de-a lungul acțiunii", "Schimbarea numelui", "Dispariția din acțiune"],
    "correctAnswer": 1
  },
  {
    "question": "Personajul principal se numește:",
    "options": ["Antagonist", "Protagonist", "Narator", "Autor"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-4';

UPDATE lessons SET quiz = '[
  {
    "question": "Tabloul descrie:",
    "options": ["O persoană", "Un peisaj sau o scenă", "O acțiune", "Un sentiment"],
    "correctAnswer": 1
  },
  {
    "question": "În descrierea literară predomină:",
    "options": ["Verbele", "Adjectivele și figurile de stil", "Substantivele", "Adverbele"],
    "correctAnswer": 1
  },
  {
    "question": "Descrierea științifică este:",
    "options": ["Subiectivă și expresivă", "Obiectivă și precisă", "Emotivă", "Artistică"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-5';

UPDATE lessons SET quiz = '[
  {
    "question": "Structura textului argumentativ include:",
    "options": ["Doar teza", "Teza, argumentele, concluzia", "Doar argumentele", "Doar concluzia"],
    "correctAnswer": 1
  },
  {
    "question": "Argumentele servesc la:",
    "options": ["Contrazicerea tezei", "Susținerea tezei", "Ignorarea tezei", "Repetarea tezei"],
    "correctAnswer": 1
  },
  {
    "question": "\"În primul rând\" este un conector de:",
    "options": ["Concluzie", "Opoziție", "Enumerare", "Cauză"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'romana-6';

UPDATE lessons SET quiz = '[
  {
    "question": "Substantivul exprimă:",
    "options": ["O acțiune", "O însușire", "O ființă, lucru sau noțiune", "O circumstanță"],
    "correctAnswer": 2
  },
  {
    "question": "Adjectivul se acordă cu:",
    "options": ["Verbul", "Substantivul", "Adverbul", "Prepoziția"],
    "correctAnswer": 1
  },
  {
    "question": "Care dintre următoarele este parte de vorbire neflexibilă?",
    "options": ["Substantivul", "Verbul", "Conjuncția", "Pronumele"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'romana-7';

UPDATE lessons SET quiz = '[
  {
    "question": "Părțile principale ale propoziției sunt:",
    "options": ["Subiectul și predicatul", "Subiectul și complementul", "Predicatul și atributul", "Toate părțile"],
    "correctAnswer": 0
  },
  {
    "question": "Complementul direct răspunde la întrebările:",
    "options": ["Cine? Ce?", "Pe cine? Ce?", "Cui? La ce?", "Unde? Când?"],
    "correctAnswer": 1
  },
  {
    "question": "Propoziția subordonată este introdusă prin:",
    "options": ["Conjuncție coordonatoare", "Conjuncție subordonatoare", "Prepoziție", "Adverb"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-8';

UPDATE lessons SET quiz = '[
  {
    "question": "Se scrie cu î la început și sfârșit de cuvânt, EXCEPT:",
    "options": ["În familia lexicală a lui român", "În toate cazurile", "Niciodată", "Doar la început"],
    "correctAnswer": 0
  },
  {
    "question": "Virgula se pune înaintea lui \"și\" când:",
    "options": ["Întotdeauna", "Leagă propoziții cu subiecte diferite", "Niciodată", "Leagă doar cuvinte"],
    "correctAnswer": 1
  },
  {
    "question": "Două puncte se pun înaintea:",
    "options": ["Unei întrebări", "Unei enumerări sau explicații", "Unei exclamații", "Unei negații"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-9';

UPDATE lessons SET quiz = '[
  {
    "question": "La Evaluarea Națională, Subiectul II se referă la:",
    "options": ["Înțelegerea textului", "Redactare", "Cunoștințe de limbă", "Toate variantele"],
    "correctAnswer": 2
  },
  {
    "question": "Timpul alocat pentru Evaluarea Națională la română este:",
    "options": ["2 ore", "3 ore", "4 ore", "1 oră"],
    "correctAnswer": 1
  },
  {
    "question": "Pentru o redactare reușită este important să:",
    "options": ["Scrii mult", "Respecti structura și coerența", "Folosești cuvinte complicate", "Scrii repede"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-10';

-- Update Computer Science lessons with more diverse questions
UPDATE lessons SET quiz = '[
  {
    "question": "Un algoritm trebuie să fie:",
    "options": ["Doar corect", "Finit, precis și eficient", "Doar rapid", "Doar simplu"],
    "correctAnswer": 1
  },
  {
    "question": "Pseudocodul este:",
    "options": ["Un limbaj de programare", "O descriere informală a algoritmului", "Un tip de date", "O eroare de program"],
    "correctAnswer": 1
  },
  {
    "question": "Variabila în programare este:",
    "options": ["O constantă", "Un spațiu de memorie cu nume", "O funcție", "Un comentariu"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'informatica-1';

UPDATE lessons SET quiz = '[
  {
    "question": "Bucla \"while\" se execută:",
    "options": ["Întotdeauna o dată", "Cât timp condiția este adevărată", "Un număr fix de ori", "Niciodată"],
    "correctAnswer": 1
  },
  {
    "question": "Instrucțiunea \"continue\" în buclă:",
    "options": ["Oprește bucla", "Sare la următoarea iterație", "Resetează bucla", "Nu face nimic"],
    "correctAnswer": 1
  },
  {
    "question": "Switch-case este util când:",
    "options": ["Avem multe condiții if-else", "Testăm o variabilă cu mai multe valori", "Vrem să optimizăm codul", "Toate variantele"],
    "correctAnswer": 3
  }
]'::jsonb WHERE id = 'informatica-2';

UPDATE lessons SET quiz = '[
  {
    "question": "Dimensiunea unui tablou în C++ este:",
    "options": ["Variabilă", "Fixă la declarare", "Infinită", "Depinde de conținut"],
    "correctAnswer": 1
  },
  {
    "question": "Pentru a accesa ultimul element dintr-un tablou de n elemente:",
    "options": ["arr[n]", "arr[n-1]", "arr[1]", "arr[0]"],
    "correctAnswer": 1
  },
  {
    "question": "Bubble Sort compară:",
    "options": ["Primul cu ultimul element", "Elemente adiacente", "Elemente aleatoare", "Toate elementele odată"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'informatica-3';

UPDATE lessons SET quiz = '[
  {
    "question": "O funcție void în C++:",
    "options": ["Returnează întotdeauna 0", "Nu returnează nimic", "Returnează void", "Este o eroare"],
    "correctAnswer": 1
  },
  {
    "question": "Parametrii unei funcții sunt:",
    "options": ["Valorile pe care le primește", "Valorile pe care le returnează", "Numele funcției", "Tipul funcției"],
    "correctAnswer": 0
  },
  {
    "question": "Recursivitatea poate înlocui:",
    "options": ["Funcțiile", "Variabilele", "Buclele", "Condițiile"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'informatica-4';

UPDATE lessons SET quiz = '[
  {
    "question": "În C++, string este:",
    "options": ["Un tip de date primitiv", "O clasă pentru șiruri", "Un tablou de caractere", "Toate variantele b și c"],
    "correctAnswer": 3
  },
  {
    "question": "Pentru a compara două șiruri folosim:",
    "options": ["=", "==", "compare()", "Toate variantele b și c"],
    "correctAnswer": 3
  },
  {
    "question": "Funcția find() returnează:",
    "options": ["Caracterul găsit", "Poziția caracterului", "True/false", "Numărul de apariții"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'informatica-5';

UPDATE lessons SET quiz = '[
  {
    "question": "Selection Sort găsește:",
    "options": ["Elementul maxim", "Elementul minim", "Elementul din mijloc", "Depinde de implementare"],
    "correctAnswer": 3
  },
  {
    "question": "Căutarea binară funcționează pe:",
    "options": ["Orice tablou", "Tablouri sortate", "Tablouri mici", "Tablouri mari"],
    "correctAnswer": 1
  },
  {
    "question": "Complexitatea O(n log n) este specifică pentru:",
    "options": ["Căutarea liniară", "Bubble Sort", "Merge Sort", "Căutarea binară"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'informatica-6';

UPDATE lessons SET quiz = '[
  {
    "question": "Moștenirea în OOP permite:",
    "options": ["Crearea de obiecte", "Preluarea proprietăților unei clase", "Ascunderea datelor", "Supraîncărcarea funcțiilor"],
    "correctAnswer": 1
  },
  {
    "question": "Constructorul unei clase:",
    "options": ["Distruge obiectul", "Inițializează obiectul", "Modifică obiectul", "Copiază obiectul"],
    "correctAnswer": 1
  },
  {
    "question": "Polimorfismul permite:",
    "options": ["Același nume pentru funcții diferite", "Moștenire multiplă", "Încapsulare", "Abstractizare"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'informatica-7';

UPDATE lessons SET quiz = '[
  {
    "question": "Modul \"ios::app\" la deschiderea unui fișier:",
    "options": ["Șterge conținutul", "Adaugă la sfârșitul fișierului", "Citește fișierul", "Creează fișier nou"],
    "correctAnswer": 1
  },
  {
    "question": "Pentru a verifica dacă un fișier s-a deschis corect:",
    "options": ["is_open()", "good()", "fail()", "Toate variantele"],
    "correctAnswer": 3
  },
  {
    "question": "getline() citește:",
    "options": ["Un caracter", "Un cuvânt", "O linie întreagă", "Tot fișierul"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'informatica-8';

UPDATE lessons SET quiz = '[
  {
    "question": "Într-o coadă, primul element introdus:",
    "options": ["Este primul ieșit", "Este ultimul ieșit", "Nu iese niciodată", "Depinde de implementare"],
    "correctAnswer": 0
  },
  {
    "question": "Un arbore binar are maximum:",
    "options": ["Un copil per nod", "Doi copii per nod", "Trei copii per nod", "Oricâți copii"],
    "correctAnswer": 1
  },
  {
    "question": "Parcurgerea inordine a unui arbore vizitează:",
    "options": ["Rădăcina, stânga, dreapta", "Stânga, rădăcina, dreapta", "Stânga, dreapta, rădăcina", "Aleatoriu"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'informatica-9';

UPDATE lessons SET quiz = '[
  {
    "question": "Comanda UPDATE în SQL:",
    "options": ["Adaugă înregistrări noi", "Modifică înregistrări existente", "Șterge înregistrări", "Creează tabele"],
    "correctAnswer": 1
  },
  {
    "question": "WHERE în SQL este folosit pentru:",
    "options": ["Sortare", "Filtrare", "Grupare", "Unire"],
    "correctAnswer": 1
  },
  {
    "question": "JOIN în SQL unește:",
    "options": ["Rânduri din aceeași tabelă", "Coloane din aceeași tabelă", "Date din tabele diferite", "Baze de date"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'informatica-10';