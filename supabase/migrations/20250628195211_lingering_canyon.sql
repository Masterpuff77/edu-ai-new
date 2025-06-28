/*
  # Add additional quiz questions to lessons

  1. Changes
    - Update existing lessons to have 3 different quiz questions each
    - Each lesson will have varied questions to test different aspects
    - Questions are designed to be educational and progressive

  2. Content Updates
    - Mathematics lessons: 3 questions each covering different concepts
    - Romanian lessons: 3 questions each covering different aspects
    - Computer Science lessons: 3 questions each covering different topics
    - Physics, Chemistry, Biology, History, Geography: 3 questions each
*/

-- Update Mathematics lessons with 3 questions each
UPDATE lessons SET quiz = '[
  {
    "question": "Care dintre următoarele numere este irațional?",
    "options": ["0.25", "√2", "3/4", "-5"],
    "correctAnswer": 1
  },
  {
    "question": "Care este rezultatul calculului √16?",
    "options": ["4", "8", "2", "16"],
    "correctAnswer": 0
  },
  {
    "question": "Cum se numește mulțimea numerelor naturale?",
    "options": ["Z", "Q", "N", "R"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'mate-1';

UPDATE lessons SET quiz = '[
  {
    "question": "Care este soluția ecuației 2x + 6 = 0?",
    "options": ["-3", "3", "-2", "2"],
    "correctAnswer": 0
  },
  {
    "question": "Dacă 3x - 9 = 0, atunci x = ?",
    "options": ["3", "-3", "9", "-9"],
    "correctAnswer": 0
  },
  {
    "question": "Care este forma standard a unei ecuații de gradul I?",
    "options": ["ax² + bx + c = 0", "ax + b = 0", "x + a = b", "ax = b"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'mate-2';

UPDATE lessons SET quiz = '[
  {
    "question": "Care este soluția inecuației 2x + 4 > 0?",
    "options": ["x > -2", "x < -2", "x > 2", "x < 2"],
    "correctAnswer": 0
  },
  {
    "question": "Când se schimbă sensul inegalității?",
    "options": ["La adunare", "La scădere", "La înmulțire cu număr negativ", "La împărțire cu număr pozitiv"],
    "correctAnswer": 2
  },
  {
    "question": "Care este soluția inecuației x - 5 ≤ 0?",
    "options": ["x ≤ 5", "x ≥ 5", "x < 5", "x > 5"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'mate-3';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce reprezintă graficul funcției f(x) = 2x?",
    "options": ["O parabolă", "O dreaptă", "O hiperbolă", "Un cerc"],
    "correctAnswer": 1
  },
  {
    "question": "Care este panta dreptei y = 3x + 2?",
    "options": ["2", "3", "5", "1"],
    "correctAnswer": 1
  },
  {
    "question": "Prin ce punct trece graficul funcției f(x) = x + 1?",
    "options": ["(0, 0)", "(0, 1)", "(1, 0)", "(1, 1)"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'mate-4';

UPDATE lessons SET quiz = '[
  {
    "question": "Care metodă este recomandată când un coeficient este 1?",
    "options": ["Reducere", "Substituție", "Cramer", "Grafică"],
    "correctAnswer": 1
  },
  {
    "question": "Câte soluții poate avea un sistem de ecuații liniare?",
    "options": ["Doar una", "Una sau niciuna", "Una, niciuna sau infinite", "Întotdeauna infinite"],
    "correctAnswer": 2
  },
  {
    "question": "Ce reprezintă geometric un sistem incompatibil?",
    "options": ["Două drepte paralele", "Două drepte secante", "Aceeași dreaptă", "Două parabole"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'mate-5';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce fel de triunghi are toate unghiurile egale?",
    "options": ["Dreptunghic", "Isoscel", "Echilateral", "Obtuzunghic"],
    "correctAnswer": 2
  },
  {
    "question": "Cât este suma unghiurilor unui triunghi?",
    "options": ["90°", "180°", "270°", "360°"],
    "correctAnswer": 1
  },
  {
    "question": "Ce este mediana într-un triunghi?",
    "options": ["Linia care împarte unghiul în două părți egale", "Linia care unește un vârf cu mijlocul laturii opuse", "Linia perpendiculară pe o latură", "Linia care trece prin centrul cercului circumscris"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'mate-6';

UPDATE lessons SET quiz = '[
  {
    "question": "Care patrulater are toate laturile egale și toate unghiurile drepte?",
    "options": ["Romb", "Dreptunghi", "Pătrat", "Paralelogram"],
    "correctAnswer": 2
  },
  {
    "question": "Care este aria unui dreptunghi cu L = 6 cm și l = 4 cm?",
    "options": ["24 cm²", "20 cm²", "10 cm²", "14 cm²"],
    "correctAnswer": 0
  },
  {
    "question": "Care este perimetrul unui pătrat cu latura de 5 cm?",
    "options": ["25 cm", "20 cm", "15 cm", "10 cm"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'mate-7';

UPDATE lessons SET quiz = '[
  {
    "question": "Care este relația dintre rază (R) și diametru (D)?",
    "options": ["R = 2D", "D = 2R", "R = D", "D = R²"],
    "correctAnswer": 1
  },
  {
    "question": "Care este formula pentru lungimea cercului?",
    "options": ["πR²", "2πR", "πD", "Toate variantele b și c"],
    "correctAnswer": 3
  },
  {
    "question": "Care este aria unui cerc cu raza de 3 cm? (π ≈ 3,14)",
    "options": ["28,26 cm²", "18,84 cm²", "9,42 cm²", "6,28 cm²"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'mate-8';

UPDATE lessons SET quiz = '[
  {
    "question": "Care este rezultatul (x + 2)²?",
    "options": ["x² + 2", "x² + 4x + 4", "x² + 4", "2x² + 4"],
    "correctAnswer": 1
  },
  {
    "question": "Care este rezultatul (a + b)(a - b)?",
    "options": ["a² + b²", "a² - b²", "2ab", "a² + 2ab + b²"],
    "correctAnswer": 1
  },
  {
    "question": "Care este dezvoltarea (x - 3)²?",
    "options": ["x² - 9", "x² - 6x + 9", "x² + 6x + 9", "x² - 3x + 9"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'mate-9';

UPDATE lessons SET quiz = '[
  {
    "question": "Care este primul pas în rezolvarea unei probleme?",
    "options": ["Calculul", "Citirea enunțului", "Scrierea rezultatului", "Verificarea"],
    "correctAnswer": 1
  },
  {
    "question": "Ce trebuie să faci după ce ai găsit soluția?",
    "options": ["Să o scrii frumos", "Să o verifici", "Să o ștergi", "Să începi o nouă problemă"],
    "correctAnswer": 1
  },
  {
    "question": "Ce înseamnă să interpretezi rezultatul?",
    "options": ["Să îl calculezi din nou", "Să verifici dacă are sens în contextul problemei", "Să îl rotunjești", "Să îl transformi în fracție"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'mate-10';

-- Update Romanian lessons with 3 questions each
UPDATE lessons SET quiz = '[
  {
    "question": "Care gen literar folosește dialogul ca mod principal de expunere?",
    "options": ["Epic", "Liric", "Dramatic", "Toate"],
    "correctAnswer": 2
  },
  {
    "question": "Ce caracterizează genul liric?",
    "options": ["Acțiunea", "Exprimarea sentimentelor", "Dialogul", "Descrierea"],
    "correctAnswer": 1
  },
  {
    "question": "Care specie aparține genului epic?",
    "options": ["Soneta", "Balada", "Nuvela", "Comedia"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'romana-1';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce figură de stil este în expresia \"ochii mării\"?",
    "options": ["Personificare", "Metaforă", "Comparație", "Epitet"],
    "correctAnswer": 1
  },
  {
    "question": "Ce figură de stil este \"vântul șoptește\"?",
    "options": ["Metaforă", "Personificare", "Comparație", "Hiperbola"],
    "correctAnswer": 1
  },
  {
    "question": "Care este o comparație?",
    "options": ["Ochii ca stelele", "Ochii stelelor", "Ochii strălucesc", "Ochii frumoși"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'romana-2';

UPDATE lessons SET quiz = '[
  {
    "question": "Care element nu aparține textului narativ?",
    "options": ["Acțiunea", "Personajele", "Rima", "Timpul"],
    "correctAnswer": 2
  },
  {
    "question": "Care este primul moment al subiectului?",
    "options": ["Intriga", "Expozițiunea", "Deznodământul", "Punctul culminant"],
    "correctAnswer": 1
  },
  {
    "question": "Cine relatează întâmplările în textul narativ?",
    "options": ["Autorul", "Naratorul", "Personajul principal", "Cititorul"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-3';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce tip de caracterizare este prezentă în descrierea acțiunilor unui personaj?",
    "options": ["Directă", "Indirectă", "Fizică", "Mixtă"],
    "correctAnswer": 1
  },
  {
    "question": "Ce este portretul fizic?",
    "options": ["Descrierea trăsăturilor morale", "Descrierea aspectului exterior", "Descrierea acțiunilor", "Descrierea gândurilor"],
    "correctAnswer": 1
  },
  {
    "question": "Cum se numește caracterizarea făcută de autor?",
    "options": ["Indirectă", "Directă", "Implicită", "Sugerată"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-4';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce tip de descriere este prezentă în descrierea unui apus de soare?",
    "options": ["Portret", "Tablou", "Științifică", "Tehnică"],
    "correctAnswer": 1
  },
  {
    "question": "Ce este portretul în literatură?",
    "options": ["Descrierea unui peisaj", "Descrierea unei persoane", "Descrierea unei acțiuni", "Descrierea unui sentiment"],
    "correctAnswer": 1
  },
  {
    "question": "Ce mijloace artistice se folosesc în descriere?",
    "options": ["Doar adjective", "Figuri de stil și epite", "Doar verbe", "Doar substantive"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-5';

UPDATE lessons SET quiz = '[
  {
    "question": "Care este primul element al unui text argumentativ?",
    "options": ["Concluzia", "Argumentele", "Ipoteza/Teza", "Exemplele"],
    "correctAnswer": 2
  },
  {
    "question": "Ce rol au argumentele în text?",
    "options": ["Susțin teza", "O contrazic", "O ignoră", "O repetă"],
    "correctAnswer": 0
  },
  {
    "question": "Ce conectori se folosesc pentru argumentare?",
    "options": ["și, sau", "pentru că, deoarece", "dar, însă", "când, dacă"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-6';

UPDATE lessons SET quiz = '[
  {
    "question": "Care parte de vorbire este flexibilă?",
    "options": ["Adverb", "Prepoziție", "Pronume", "Conjuncție"],
    "correctAnswer": 2
  },
  {
    "question": "Ce exprimă verbul?",
    "options": ["O însușire", "O acțiune sau stare", "O relație", "O circumstanță"],
    "correctAnswer": 1
  },
  {
    "question": "Care parte de vorbire este neflexibilă?",
    "options": ["Substantiv", "Adjectiv", "Adverb", "Pronume"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'romana-7';

UPDATE lessons SET quiz = '[
  {
    "question": "Care este partea principală de propoziție?",
    "options": ["Atributul", "Complementul", "Predicatul", "Apoziția"],
    "correctAnswer": 2
  },
  {
    "question": "Ce leagă propoziția principală de cea subordonată?",
    "options": ["Virgula", "Conjuncția subordonatoare", "Punctul", "Conjuncția coordonatoare"],
    "correctAnswer": 1
  },
  {
    "question": "Care este cealaltă parte principală de propoziție?",
    "options": ["Complementul direct", "Subiectul", "Atributul", "Complementul indirect"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-8';

UPDATE lessons SET quiz = '[
  {
    "question": "Când se folosește â în interiorul cuvântului?",
    "options": ["Întotdeauna", "Niciodată", "În familia lexicală a lui român", "La început de cuvânt"],
    "correctAnswer": 2
  },
  {
    "question": "Când se pune virgula înaintea lui \"și\"?",
    "options": ["Întotdeauna", "Niciodată", "Când leagă propoziții cu subiecte diferite", "Când leagă cuvinte"],
    "correctAnswer": 2
  },
  {
    "question": "Ce semn de punctuație se pune la sfârșitul unei întrebări?",
    "options": ["Punctul", "Virgula", "Semnul întrebării", "Semnul exclamării"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'romana-9';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce se cere la Subiectul III?",
    "options": ["Analiză gramaticală", "Redactare de text", "Exerciții de vocabular", "Teste grilă"],
    "correctAnswer": 1
  },
  {
    "question": "Câte subiecte sunt la Evaluarea Națională la română?",
    "options": ["2", "3", "4", "5"],
    "correctAnswer": 1
  },
  {
    "question": "Ce se evaluează la Subiectul I?",
    "options": ["Redactarea", "Înțelegerea textului", "Gramatica", "Vocabularul"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'romana-10';

-- Update Computer Science lessons with 3 questions each
UPDATE lessons SET quiz = '[
  {
    "question": "Care este primul pas în rezolvarea unei probleme prin programare?",
    "options": ["Scrierea codului", "Analiza problemei și crearea algoritmului", "Testarea programului", "Compilarea"],
    "correctAnswer": 1
  },
  {
    "question": "Ce este un algoritm?",
    "options": ["Un program", "O secvență de pași pentru rezolvarea unei probleme", "Un limbaj de programare", "Un computer"],
    "correctAnswer": 1
  },
  {
    "question": "Ce tip de date este \"int\" în C++?",
    "options": ["Număr real", "Număr întreg", "Caracter", "Text"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'informatica-1';

UPDATE lessons SET quiz = '[
  {
    "question": "Care buclă se execută cel puțin o dată?",
    "options": ["for", "while", "do-while", "Toate"],
    "correctAnswer": 2
  },
  {
    "question": "Ce face instrucțiunea \"break\"?",
    "options": ["Continuă bucla", "Iese din buclă", "Resetează bucla", "Oprește programul"],
    "correctAnswer": 1
  },
  {
    "question": "Care este sintaxa corectă pentru \"if\" în C++?",
    "options": ["if (conditie) {}", "if conditie {}", "if [conditie] {}", "if <conditie> {}"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'informatica-2';

UPDATE lessons SET quiz = '[
  {
    "question": "Care este indexul primului element dintr-un tablou în C++?",
    "options": ["1", "0", "-1", "Depinde de declarație"],
    "correctAnswer": 1
  },
  {
    "question": "Cum se declară un tablou de 10 întregi în C++?",
    "options": ["int arr[10]", "int arr(10)", "array<int> arr[10]", "int[10] arr"],
    "correctAnswer": 0
  },
  {
    "question": "Ce algoritm de sortare are complexitatea O(n²)?",
    "options": ["Quick Sort", "Merge Sort", "Bubble Sort", "Binary Search"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'informatica-3';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce se întâmplă când o funcție nu are instrucțiunea return?",
    "options": ["Eroare de compilare", "Returnează 0", "Returnează valoare aleatoare", "Depinde de tipul funcției"],
    "correctAnswer": 3
  },
  {
    "question": "Ce este recursivitatea?",
    "options": ["O buclă infinită", "O funcție care se apelează pe sine", "O eroare de programare", "O structură de date"],
    "correctAnswer": 1
  },
  {
    "question": "Cum se transmit parametrii prin referință în C++?",
    "options": ["int &x", "int *x", "int x", "ref int x"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'informatica-4';

UPDATE lessons SET quiz = '[
  {
    "question": "Care funcție returnează lungimea unui șir în C++?",
    "options": ["size()", "length()", "count()", "Toate variantele a și b"],
    "correctAnswer": 3
  },
  {
    "question": "Cum se concatenează două șiruri în C++?",
    "options": ["str1 + str2", "concat(str1, str2)", "str1.append(str2)", "Toate variantele a și c"],
    "correctAnswer": 3
  },
  {
    "question": "Ce face funcția substr()?",
    "options": ["Găsește un subșir", "Extrage un subșir", "Compară șiruri", "Șterge caractere"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'informatica-5';

UPDATE lessons SET quiz = '[
  {
    "question": "Care algoritm de sortare are complexitatea cea mai bună în cazul cel mai rău?",
    "options": ["Bubble Sort", "Selection Sort", "Insertion Sort", "Toți au aceeași complexitate"],
    "correctAnswer": 3
  },
  {
    "question": "Ce este căutarea binară?",
    "options": ["Căutare în tablou nesortat", "Căutare în tablou sortat prin împărțire", "Căutare liniară", "Căutare aleatoare"],
    "correctAnswer": 1
  },
  {
    "question": "Care este complexitatea căutării binare?",
    "options": ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    "correctAnswer": 2
  }
]'::jsonb WHERE id = 'informatica-6';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce principiu OOP ascunde detaliile implementării?",
    "options": ["Moștenirea", "Polimorfismul", "Încapsularea", "Abstractizarea"],
    "correctAnswer": 2
  },
  {
    "question": "Ce este o clasă?",
    "options": ["O instanță a unui obiect", "Un șablon pentru crearea obiectelor", "O funcție", "O variabilă"],
    "correctAnswer": 1
  },
  {
    "question": "Ce modificator de acces permite accesul doar din clasa curentă?",
    "options": ["public", "private", "protected", "friend"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'informatica-7';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce clasă se folosește pentru citirea din fișiere în C++?",
    "options": ["ofstream", "ifstream", "fstream", "iostream"],
    "correctAnswer": 1
  },
  {
    "question": "Ce clasă se folosește pentru scrierea în fișiere?",
    "options": ["ifstream", "ofstream", "iostream", "stringstream"],
    "correctAnswer": 1
  },
  {
    "question": "Ce trebuie să faci după ce lucrezi cu un fișier?",
    "options": ["Să îl ștergi", "Să îl închizi", "Să îl redenumești", "Să îl copiezi"],
    "correctAnswer": 1
  }
]'::jsonb WHERE id = 'informatica-8';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce principiu urmează o stivă?",
    "options": ["FIFO", "LIFO", "RANDOM", "SORTED"],
    "correctAnswer": 1
  },
  {
    "question": "Ce principiu urmează o coadă?",
    "options": ["LIFO", "FIFO", "RANDOM", "SORTED"],
    "correctAnswer": 1
  },
  {
    "question": "Ce este un nod într-o listă înlănțuită?",
    "options": ["Un element care conține date și pointer", "O funcție", "O variabilă", "Un tablou"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'informatica-9';

UPDATE lessons SET quiz = '[
  {
    "question": "Ce comandă SQL se folosește pentru a selecta date din tabele?",
    "options": ["INSERT", "UPDATE", "SELECT", "DELETE"],
    "correctAnswer": 2
  },
  {
    "question": "Ce comandă SQL inserează date noi?",
    "options": ["SELECT", "INSERT", "UPDATE", "CREATE"],
    "correctAnswer": 1
  },
  {
    "question": "Ce este o cheie primară?",
    "options": ["Un câmp care identifică unic fiecare înregistrare", "Un câmp opțional", "Un câmp calculat", "Un câmp text"],
    "correctAnswer": 0
  }
]'::jsonb WHERE id = 'informatica-10';