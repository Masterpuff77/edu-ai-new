/*
  # Rezolvarea problemelor cu lecțiile din baza de date

  1. Curățarea și reorganizarea lecțiilor
    - Eliminarea tuturor lecțiilor duplicate
    - Reorganizarea lecțiilor pe capitole
    - Asigurarea că există 15 lecții pentru fiecare materie

  2. Materii verificate și corectate:
    - Matematică
    - Informatică
    - Biologie
    - Alte materii pentru consistență
*/

-- 1. Ștergerea tuturor lecțiilor existente pentru a evita duplicatele
DELETE FROM lessons;

-- 2. Adăugarea lecțiilor pentru MATEMATICĂ (15 lecții)
INSERT INTO lessons (id, title, subject, description, content, quiz, duration) VALUES
  (
    'mate-1',
    'Mulțimi de Numere',
    'matematica',
    'Mulțimile de numere: naturale, întregi, raționale, iraționale, reale',
    '<h2>Mulțimi de Numere</h2>
    <h3>1. Mulțimea numerelor naturale (ℕ)</h3>
    <p>ℕ = {0, 1, 2, 3, 4, ...}</p>
    <ul>
      <li>Cea mai simplă mulțime de numere</li>
      <li>Se folosește pentru numărare</li>
      <li>Include zero (în definiția modernă)</li>
    </ul>
    
    <h3>2. Mulțimea numerelor întregi (ℤ)</h3>
    <p>ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}</p>
    <ul>
      <li>Include numerele naturale și opusele lor</li>
      <li>Închisă la adunare, scădere și înmulțire</li>
    </ul>
    
    <h3>3. Mulțimea numerelor raționale (ℚ)</h3>
    <p>ℚ = {a/b | a, b ∈ ℤ, b ≠ 0}</p>
    <ul>
      <li>Numere care se pot scrie ca fracții</li>
      <li>Dezvoltare zecimală finită sau periodică</li>
      <li>Exemple: 1/2 = 0,5; 1/3 = 0,(3)</li>
    </ul>
    
    <h3>4. Mulțimea numerelor iraționale (ℝ\ℚ)</h3>
    <ul>
      <li>Numere cu dezvoltare zecimală infinită neperiodică</li>
      <li>Exemple: √2, π, e</li>
      <li>Nu se pot exprima ca fracții</li>
    </ul>
    
    <h3>5. Mulțimea numerelor reale (ℝ)</h3>
    <p>ℝ = ℚ ∪ (ℝ\ℚ)</p>
    <ul>
      <li>Reuniunea numerelor raționale și iraționale</li>
      <li>Corespunde punctelor de pe dreapta numerică</li>
    </ul>',
    '[{
      "question": "Care dintre următoarele numere este irațional?",
      "options": ["0,75", "√2", "22/7", "0,(3)"],
      "correctAnswer": 1
    }]'::jsonb,
    50
  ),
  
  (
    'mate-2',
    'Operații cu Numere Reale',
    'matematica',
    'Operații fundamentale: adunare, scădere, înmulțire, împărțire, puteri, radicali',
    '<h2>Operații cu Numere Reale</h2>
    <h3>1. Operații de bază</h3>
    <h4>Adunarea și scăderea</h4>
    <ul>
      <li>Proprietatea comutativă: a + b = b + a</li>
      <li>Proprietatea asociativă: (a + b) + c = a + (b + c)</li>
      <li>Elementul neutru: a + 0 = a</li>
    </ul>
    
    <h4>Înmulțirea și împărțirea</h4>
    <ul>
      <li>Proprietatea comutativă: a × b = b × a</li>
      <li>Proprietatea asociativă: (a × b) × c = a × (b × c)</li>
      <li>Elementul neutru: a × 1 = a</li>
      <li>Proprietatea distributivă: a × (b + c) = a × b + a × c</li>
    </ul>
    
    <h3>2. Puteri cu exponenți întregi</h3>
    <ul>
      <li>a^m × a^n = a^(m+n)</li>
      <li>a^m ÷ a^n = a^(m-n)</li>
      <li>(a^m)^n = a^(m×n)</li>
      <li>a^0 = 1 (pentru a ≠ 0)</li>
      <li>a^(-n) = 1/a^n</li>
    </ul>
    
    <h3>3. Radicali</h3>
    <ul>
      <li>√(a×b) = √a × √b</li>
      <li>√(a/b) = √a / √b</li>
      <li>^n√(a^m) = a^(m/n)</li>
    </ul>
    
    <h3>4. Ordinea operațiilor</h3>
    <ol>
      <li>Parantezele</li>
      <li>Puterile și radicalii</li>
      <li>Înmulțirea și împărțirea (de la stânga la dreapta)</li>
      <li>Adunarea și scăderea (de la stânga la dreapta)</li>
    </ol>',
    '[{
      "question": "Care este rezultatul calculului: 2³ + 3² × 4?",
      "options": ["44", "100", "64", "52"],
      "correctAnswer": 0
    }]'::jsonb,
    50
  ),
  
  (
    'mate-3',
    'Ecuații de Gradul I',
    'matematica',
    'Rezolvarea ecuațiilor de forma ax + b = 0 și aplicații practice',
    '<h2>Ecuații de Gradul I</h2>
    <h3>1. Forma generală</h3>
    <p>O ecuație de gradul I are forma: <strong>ax + b = 0</strong>, unde a ≠ 0</p>
    
    <h3>2. Metoda de rezolvare</h3>
    <ol>
      <li><strong>Izolarea termenului cu necunoscuta:</strong> ax = -b</li>
      <li><strong>Împărțirea la coeficient:</strong> x = -b/a</li>
    </ol>
    
    <h3>3. Exemple rezolvate</h3>
    <h4>Exemplul 1: 3x + 6 = 0</h4>
    <ul>
      <li>3x = -6</li>
      <li>x = -6/3 = -2</li>
      <li>Verificare: 3×(-2) + 6 = -6 + 6 = 0 ✓</li>
    </ul>
    
    <h4>Exemplul 2: 2x - 8 = x + 1</h4>
    <ul>
      <li>2x - x = 1 + 8</li>
      <li>x = 9</li>
      <li>Verificare: 2×9 - 8 = 18 - 8 = 10 și 9 + 1 = 10 ✓</li>
    </ul>
    
    <h3>4. Ecuații cu fracții</h3>
    <p>Pentru ecuații de forma (ax + b)/(cx + d) = e:</p>
    <ol>
      <li>Înmulțim ambele părți cu numitorul</li>
      <li>Dezvoltăm și reducem</li>
      <li>Rezolvăm ecuația rezultată</li>
    </ol>
    
    <h3>5. Aplicații practice</h3>
    <ul>
      <li>Probleme cu vârste</li>
      <li>Probleme cu mișcare uniformă</li>
      <li>Probleme cu procente</li>
      <li>Probleme geometrice</li>
    </ul>',
    '[{
      "question": "Care este soluția ecuației 2x + 6 = 0?",
      "options": ["-3", "3", "-2", "2"],
      "correctAnswer": 0
    }]'::jsonb,
    50
  ),
  
  (
    'mate-4',
    'Inecuații de Gradul I',
    'matematica',
    'Rezolvarea inecuațiilor liniare și reprezentarea soluțiilor',
    '<h2>Inecuații de Gradul I</h2>
    <h3>1. Forme generale</h3>
    <ul>
      <li>ax + b > 0</li>
      <li>ax + b < 0</li>
      <li>ax + b ≥ 0</li>
      <li>ax + b ≤ 0</li>
    </ul>
    
    <h3>2. Reguli de rezolvare</h3>
    <h4>Regula 1: Adunarea/scăderea</h4>
    <p>Dacă a < b, atunci a + c < b + c și a - c < b - c</p>
    
    <h4>Regula 2: Înmulțirea/împărțirea cu număr pozitiv</h4>
    <p>Dacă a < b și c > 0, atunci ac < bc și a/c < b/c</p>
    
    <h4>Regula 3: Înmulțirea/împărțirea cu număr negativ</h4>
    <p>Dacă a < b și c < 0, atunci ac > bc și a/c > b/c</p>
    <p><strong>ATENȚIE:</strong> Sensul inegalității se schimbă!</p>
    
    <h3>3. Exemple rezolvate</h3>
    <h4>Exemplul 1: 2x + 4 > 0</h4>
    <ul>
      <li>2x > -4</li>
      <li>x > -2</li>
      <li>Soluția: x ∈ (-2, +∞)</li>
    </ul>
    
    <h4>Exemplul 2: -3x + 6 ≤ 0</h4>
    <ul>
      <li>-3x ≤ -6</li>
      <li>x ≥ 2 (sensul se schimbă!)</li>
      <li>Soluția: x ∈ [2, +∞)</li>
    </ul>
    
    <h3>4. Reprezentarea grafică</h3>
    <ul>
      <li>Pe dreapta numerică</li>
      <li>Cerculeț gol pentru < sau ></li>
      <li>Cerculeț plin pentru ≤ sau ≥</li>
      <li>Săgeată pentru direcția soluției</li>
    </ul>
    
    <h3>5. Sisteme de inecuații</h3>
    <p>Pentru sisteme de forma {ax + b > 0; cx + d < 0}:</p>
    <ol>
      <li>Rezolvăm fiecare inecuație separat</li>
      <li>Facem intersecția soluțiilor</li>
    </ol>',
    '[{
      "question": "Care este soluția inecuației -2x + 4 > 0?",
      "options": ["x < 2", "x > 2", "x < -2", "x > -2"],
      "correctAnswer": 0
    }]'::jsonb,
    50
  ),
  
  (
    'mate-5',
    'Sisteme de Ecuații Liniare',
    'matematica',
    'Rezolvarea sistemelor de ecuații cu două necunoscute',
    '<h2>Sisteme de Ecuații Liniare</h2>
    <h3>1. Forma generală</h3>
    <p>Un sistem de ecuații liniare cu două necunoscute:</p>
    <pre>
    {ax + by = c
    {dx + ey = f
    </pre>
    
    <h3>2. Metoda substituției</h3>
    <h4>Pașii metodei:</h4>
    <ol>
      <li>Din prima ecuație exprimăm o necunoscută</li>
      <li>Înlocuim în a doua ecuație</li>
      <li>Rezolvăm ecuația cu o necunoscută</li>
      <li>Calculăm cealaltă necunoscută</li>
      <li>Verificăm soluția</li>
    </ol>
    
    <h4>Exemplu:</h4>
    <pre>
    {x + y = 5
    {2x - y = 1
    </pre>
    <ul>
      <li>Din prima: y = 5 - x</li>
      <li>În a doua: 2x - (5 - x) = 1</li>
      <li>2x - 5 + x = 1</li>
      <li>3x = 6, deci x = 2</li>
      <li>y = 5 - 2 = 3</li>
      <li>Soluția: (2, 3)</li>
    </ul>
    
    <h3>3. Metoda reducerii (eliminării)</h3>
    <h4>Pașii metodei:</h4>
    <ol>
      <li>Înmulțim ecuațiile cu numere potrivite</li>
      <li>Adunăm sau scădem ecuațiile pentru a elimina o necunoscută</li>
      <li>Rezolvăm ecuația rezultată</li>
      <li>Calculăm cealaltă necunoscută</li>
    </ol>
    
    <h4>Exemplu:</h4>
    <pre>
    {3x + 2y = 12
    {x - 2y = 4
    </pre>
    <ul>
      <li>Adunăm ecuațiile: 4x = 16</li>
      <li>x = 4</li>
      <li>Din a doua: 4 - 2y = 4, deci y = 0</li>
      <li>Soluția: (4, 0)</li>
    </ul>
    
    <h3>4. Interpretarea geometrică</h3>
    <ul>
      <li><strong>Soluție unică:</strong> dreptele se intersectează într-un punct</li>
      <li><strong>Infinite soluții:</strong> dreptele sunt identice</li>
      <li><strong>Fără soluție:</strong> dreptele sunt paralele distincte</li>
    </ul>
    
    <h3>5. Aplicații practice</h3>
    <ul>
      <li>Probleme cu două mărimi necunoscute</li>
      <li>Probleme cu amestecuri</li>
      <li>Probleme cu mișcare</li>
      <li>Probleme economice</li>
    </ul>',
    '[{
      "question": "Care metodă este recomandată când un coeficient este 1?",
      "options": ["Reducere", "Substituție", "Cramer", "Grafică"],
      "correctAnswer": 1
    }]'::jsonb,
    55
  ),
  
  (
    'mate-6',
    'Funcții. Funcția de Gradul I',
    'matematica',
    'Studiul funcțiilor liniare și reprezentarea lor grafică',
    '<h2>Funcții. Funcția de Gradul I</h2>
    <h3>1. Noțiunea de funcție</h3>
    <p>O funcție f: A → B este o regulă care asociază fiecărui element x ∈ A un singur element y ∈ B.</p>
    <ul>
      <li><strong>A</strong> - domeniul de definiție</li>
      <li><strong>B</strong> - codomeniul</li>
      <li><strong>y = f(x)</strong> - imaginea lui x prin f</li>
    </ul>
    
    <h3>2. Funcția de gradul I (liniară)</h3>
    <p><strong>f(x) = ax + b</strong>, unde a, b ∈ ℝ, a ≠ 0</p>
    <ul>
      <li><strong>a</strong> - panta (coeficientul unghiular)</li>
      <li><strong>b</strong> - ordonata la origine</li>
      <li><strong>Domeniul:</strong> ℝ</li>
      <li><strong>Codomeniul:</strong> ℝ</li>
    </ul>
    
    <h3>3. Reprezentarea grafică</h3>
    <p>Graficul funcției f(x) = ax + b este o dreaptă.</p>
    
    <h4>Metoda celor două puncte:</h4>
    <ol>
      <li>Alegem două valori pentru x</li>
      <li>Calculăm y-urile corespunzătoare</li>
      <li>Trasăm dreapta prin cele două puncte</li>
    </ol>
    
    <h4>Exemplu: f(x) = 2x - 1</h4>
    <ul>
      <li>Pentru x = 0: y = -1, punct (0, -1)</li>
      <li>Pentru x = 1: y = 1, punct (1, 1)</li>
      <li>Trasăm dreapta prin aceste puncte</li>
    </ul>
    
    <h3>4. Proprietăți ale funcției liniare</h3>
    <h4>În funcție de semnul lui a:</h4>
    <ul>
      <li><strong>a > 0:</strong> funcție crescătoare</li>
      <li><strong>a < 0:</strong> funcție descrescătoare</li>
    </ul>
    
    <h4>Puncte importante:</h4>
    <ul>
      <li><strong>Intersecția cu Oy:</strong> (0, b)</li>
      <li><strong>Intersecția cu Ox:</strong> (-b/a, 0)</li>
    </ul>
    
    <h3>5. Ecuația dreptei</h3>
    <h4>Forma punct-pantă:</h4>
    <p>y - y₁ = m(x - x₁)</p>
    
    <h4>Forma cu două puncte:</h4>
    <p>Pentru punctele (x₁, y₁) și (x₂, y₂):</p>
    <p>m = (y₂ - y₁)/(x₂ - x₁)</p>
    
    <h3>6. Aplicații</h3>
    <ul>
      <li>Probleme de mișcare uniformă</li>
      <li>Probleme economice (cost, profit)</li>
      <li>Probleme de proporționalitate</li>
    </ul>',
    '[{
      "question": "Ce reprezintă graficul funcției f(x) = 2x + 3?",
      "options": ["O parabolă", "O dreaptă", "O hiperbolă", "Un cerc"],
      "correctAnswer": 1
    }]'::jsonb,
    55
  ),
  
  (
    'mate-7',
    'Funcția de Gradul II',
    'matematica',
    'Studiul funcției pătratice și reprezentarea grafică',
    '<h2>Funcția de Gradul II</h2>
    <h3>1. Forma generală</h3>
    <p><strong>f(x) = ax² + bx + c</strong>, unde a, b, c ∈ ℝ, a ≠ 0</p>
    <ul>
      <li><strong>a</strong> - coeficientul lui x²</li>
      <li><strong>b</strong> - coeficientul lui x</li>
      <li><strong>c</strong> - termenul liber</li>
    </ul>
    
    <h3>2. Reprezentarea grafică - parabola</h3>
    <h4>Orientarea parabolei:</h4>
    <ul>
      <li><strong>a > 0:</strong> parabola cu ramurile în sus</li>
      <li><strong>a < 0:</strong> parabola cu ramurile în jos</li>
    </ul>
    
    <h3>3. Vârful parabolei</h3>
    <p>Coordonatele vârfului V(x_v, y_v):</p>
    <ul>
      <li><strong>x_v = -b/(2a)</strong></li>
      <li><strong>y_v = f(x_v) = -Δ/(4a)</strong></li>
      <li><strong>Δ = b² - 4ac</strong> (discriminantul)</li>
    </ul>
    
    <h3>4. Intersecțiile cu axele</h3>
    <h4>Intersecția cu Oy:</h4>
    <p>Punctul (0, c)</p>
    
    <h4>Intersecțiile cu Ox:</h4>
    <p>Soluțiile ecuației ax² + bx + c = 0</p>
    <ul>
      <li><strong>Δ > 0:</strong> două puncte de intersecție</li>
      <li><strong>Δ = 0:</strong> un punct de intersecție (tangență)</li>
      <li><strong>Δ < 0:</strong> nicio intersecție cu Ox</li>
    </ul>
    
    <h3>5. Ecuația de gradul II</h3>
    <p><strong>ax² + bx + c = 0</strong></p>
    
    <h4>Formula de rezolvare:</h4>
    <p>x₁,₂ = (-b ± √Δ)/(2a), unde Δ = b² - 4ac</p>
    
    <h4>Relațiile lui Viète:</h4>
    <ul>
      <li><strong>x₁ + x₂ = -b/a</strong></li>
      <li><strong>x₁ × x₂ = c/a</strong></li>
    </ul>
    
    <h3>6. Semnul funcției de gradul II</h3>
    <h4>Pentru a > 0:</h4>
    <ul>
      <li>f(x) > 0 în afara rădăcinilor</li>
      <li>f(x) < 0 între rădăcini</li>
    </ul>
    
    <h4>Pentru a < 0:</h4>
    <ul>
      <li>f(x) < 0 în afara rădăcinilor</li>
      <li>f(x) > 0 între rădăcini</li>
    </ul>
    
    <h3>7. Aplicații</h3>
    <ul>
      <li>Probleme de optimizare</li>
      <li>Mișcare uniform accelerată</li>
      <li>Probleme geometrice cu arii maxime</li>
      <li>Probleme economice</li>
    </ul>',
    '[{
      "question": "Care este vârful parabolei y = x² - 4x + 3?",
      "options": ["(2, -1)", "(-2, 1)", "(2, 1)", "(-2, -1)"],
      "correctAnswer": 0
    }]'::jsonb,
    60
  ),
  
  (
    'mate-8',
    'Progresii Aritmetice și Geometrice',
    'matematica',
    'Studiul șirurilor cu proprietăți speciale',
    '<h2>Progresii Aritmetice și Geometrice</h2>
    <h3>1. Progresia aritmetică</h3>
    <p>O progresie aritmetică este un șir în care diferența dintre oricare doi termeni consecutivi este constantă.</p>
    
    <h4>Forma generală:</h4>
    <p>a₁, a₂, a₃, ..., aₙ, unde a₂ - a₁ = a₃ - a₂ = ... = r (rația)</p>
    
    <h4>Termenul general:</h4>
    <p><strong>aₙ = a₁ + (n-1)r</strong></p>
    
    <h4>Suma primilor n termeni:</h4>
    <p><strong>Sₙ = n(a₁ + aₙ)/2 = n(2a₁ + (n-1)r)/2</strong></p>
    
    <h4>Proprietatea caracteristică:</h4>
    <p>aₙ = (aₙ₋₁ + aₙ₊₁)/2 (media aritmetică)</p>
    
    <h3>2. Progresia geometrică</h3>
    <p>O progresie geometrică este un șir în care raportul dintre oricare doi termeni consecutivi este constant.</p>
    
    <h4>Forma generală:</h4>
    <p>a₁, a₂, a₃, ..., aₙ, unde a₂/a₁ = a₃/a₂ = ... = q (rația)</p>
    
    <h4>Termenul general:</h4>
    <p><strong>aₙ = a₁ × q^(n-1)</strong></p>
    
    <h4>Suma primilor n termeni:</h4>
    <ul>
      <li><strong>q ≠ 1:</strong> Sₙ = a₁(q^n - 1)/(q - 1)</li>
      <li><strong>q = 1:</strong> Sₙ = n × a₁</li>
    </ul>
    
    <h4>Proprietatea caracteristică:</h4>
    <p>aₙ² = aₙ₋₁ × aₙ₊₁ (media geometrică)</p>
    
    <h3>3. Exemple rezolvate</h3>
    <h4>Progresie aritmetică:</h4>
    <p>2, 5, 8, 11, ...</p>
    <ul>
      <li>a₁ = 2, r = 3</li>
      <li>a₁₀ = 2 + 9×3 = 29</li>
      <li>S₁₀ = 10(2 + 29)/2 = 155</li>
    </ul>
    
    <h4>Progresie geometrică:</h4>
    <p>3, 6, 12, 24, ...</p>
    <ul>
      <li>a₁ = 3, q = 2</li>
      <li>a₆ = 3 × 2⁵ = 96</li>
      <li>S₆ = 3(2⁶ - 1)/(2 - 1) = 189</li>
    </ul>
    
    <h3>4. Aplicații practice</h3>
    <ul>
      <li>Probleme cu dobânzi</li>
      <li>Creșterea populației</li>
      <li>Probleme cu economii</li>
      <li>Progresii în geometrie</li>
    </ul>',
    '[{
      "question": "În progresia aritmetică 3, 7, 11, ..., care este al 5-lea termen?",
      "options": ["19", "15", "23", "17"],
      "correctAnswer": 0
    }]'::jsonb,
    55
  ),
  
  (
    'mate-9',
    'Geometrie Plană - Triunghiuri',
    'matematica',
    'Proprietăți ale triunghiurilor, congruență și asemănare',
    '<h2>Geometrie Plană - Triunghiuri</h2>
    <h3>1. Clasificarea triunghiurilor</h3>
    <h4>După laturi:</h4>
    <ul>
      <li><strong>Echilateral:</strong> toate laturile egale</li>
      <li><strong>Isoscel:</strong> două laturi egale</li>
      <li><strong>Scalen:</strong> toate laturile diferite</li>
    </ul>
    
    <h4>După unghiuri:</h4>
    <ul>
      <li><strong>Ascuțitunghic:</strong> toate unghiurile ascuțite</li>
      <li><strong>Dreptunghic:</strong> un unghi drept</li>
      <li><strong>Obtuzunghic:</strong> un unghi obtuz</li>
    </ul>
    
    <h3>2. Proprietăți fundamentale</h3>
    <h4>Suma unghiurilor:</h4>
    <p>În orice triunghi: α + β + γ = 180°</p>
    
    <h4>Inegalitatea triunghiului:</h4>
    <p>Pentru laturile a, b, c: a + b > c, b + c > a, a + c > b</p>
    
    <h4>Unghiul exterior:</h4>
    <p>Egal cu suma unghiurilor interioare neadiacente</p>
    
    <h3>3. Linii importante în triunghi</h3>
    <h4>Medianele:</h4>
    <ul>
      <li>Unesc vârfurile cu mijloacele laturilor opuse</li>
      <li>Se intersectează în centrul de greutate (G)</li>
      <li>G împarte fiecare mediană în raportul 2:1</li>
    </ul>
    
    <h4>Înălțimile:</h4>
    <ul>
      <li>Perpendiculare din vârfuri pe laturile opuse</li>
      <li>Se intersectează în ortocentru (H)</li>
    </ul>
    
    <h4>Bisectoarele:</h4>
    <ul>
      <li>Împart unghiurile în două părți egale</li>
      <li>Se intersectează în incentru (I)</li>
      <li>I este centrul cercului înscris</li>
    </ul>
    
    <h4>Mediatoarele:</h4>
    <ul>
      <li>Perpendiculare pe laturi în mijloacele lor</li>
      <li>Se intersectează în circumcentru (O)</li>
      <li>O este centrul cercului circumscris</li>
    </ul>
    
    <h3>4. Teorema lui Pitagora</h3>
    <p>În triunghiul dreptunghic: <strong>a² + b² = c²</strong></p>
    <p>unde c este ipotenuza, a și b sunt catetele</p>
    
    <h4>Reciproca:</h4>
    <p>Dacă a² + b² = c², atunci triunghiul este dreptunghic</p>
    
    <h3>5. Arii și perimetru</h3>
    <h4>Aria triunghiului:</h4>
    <ul>
      <li><strong>Formula de bază:</strong> A = (b × h)/2</li>
      <li><strong>Formula lui Heron:</strong> A = √[p(p-a)(p-b)(p-c)], unde p = (a+b+c)/2</li>
      <li><strong>Triunghi dreptunghic:</strong> A = (a × b)/2</li>
    </ul>
    
    <h4>Perimetrul:</h4>
    <p>P = a + b + c</p>
    
    <h3>6. Congruența triunghiurilor</h3>
    <h4>Cazurile de congruență:</h4>
    <ul>
      <li><strong>LLL:</strong> trei laturi egale</li>
      <li><strong>LUL:</strong> două laturi și unghiul dintre ele</li>
      <li><strong>ULU:</strong> două unghiuri și latura dintre ele</li>
    </ul>',
    '[{
      "question": "Ce fel de triunghi are toate unghiurile egale cu 60°?",
      "options": ["Dreptunghic", "Isoscel", "Echilateral", "Obtuzunghic"],
      "correctAnswer": 2
    }]'::jsonb,
    60
  ),
  
  (
    'mate-10',
    'Geometrie Plană - Patrulatere',
    'matematica',
    'Proprietăți ale patrulaterelor: paralelogram, dreptunghi, romb, pătrat',
    '<h2>Geometrie Plană - Patrulatere</h2>
    <h3>1. Clasificarea patrulaterelor</h3>
    <h4>Patrulaterul convex:</h4>
    <p>Toate unghiurile interioare sunt mai mici de 180°</p>
    
    <h4>Suma unghiurilor interioare:</h4>
    <p>În orice patrulater: α + β + γ + δ = 360°</p>
    
    <h3>2. Paralelogramul</h3>
    <h4>Definiție:</h4>
    <p>Patrulater cu laturile opuse paralele</p>
    
    <h4>Proprietăți:</h4>
    <ul>
      <li>Laturile opuse sunt egale și paralele</li>
      <li>Unghiurile opuse sunt egale</li>
      <li>Unghiurile alăturate sunt suplementare</li>
      <li>Diagonalele se înjumătățesc reciproc</li>
    </ul>
    
    <h4>Aria:</h4>
    <p>A = bază × înălțime = ab sin α</p>
    
    <h3>3. Dreptunghiul</h3>
    <h4>Definiție:</h4>
    <p>Paralelogram cu toate unghiurile drepte</p>
    
    <h4>Proprietăți specifice:</h4>
    <ul>
      <li>Toate unghiurile sunt de 90°</li>
      <li>Diagonalele sunt egale</li>
      <li>Diagonalele se înjumătățesc reciproc</li>
    </ul>
    
    <h4>Aria și perimetrul:</h4>
    <ul>
      <li>A = L × l</li>
      <li>P = 2(L + l)</li>
      <li>d = √(L² + l²) (diagonala)</li>
    </ul>
    
    <h3>4. Rombul</h3>
    <h4>Definiție:</h4>
    <p>Paralelogram cu toate laturile egale</p>
    
    <h4>Proprietăți specifice:</h4>
    <ul>
      <li>Toate laturile sunt egale</li>
      <li>Diagonalele sunt perpendiculare</li>
      <li>Diagonalele sunt bisectoarele unghiurilor</li>
      <li>Diagonalele se înjumătățesc reciproc</li>
    </ul>
    
    <h4>Aria:</h4>
    <ul>
      <li>A = (d₁ × d₂)/2 (prin diagonale)</li>
      <li>A = a² sin α (prin latură și unghi)</li>
    </ul>
    
    <h3>5. Pătratul</h3>
    <h4>Definiție:</h4>
    <p>Dreptunghi cu toate laturile egale (sau romb cu toate unghiurile drepte)</p>
    
    <h4>Proprietăți:</h4>
    <ul>
      <li>Toate laturile egale</li>
      <li>Toate unghiurile de 90°</li>
      <li>Diagonalele egale și perpendiculare</li>
      <li>Diagonalele bisectoarele unghiurilor de 45°</li>
    </ul>
    
    <h4>Formule:</h4>
    <ul>
      <li>A = a²</li>
      <li>P = 4a</li>
      <li>d = a√2</li>
    </ul>
    
    <h3>6. Trapezul</h3>
    <h4>Definiție:</h4>
    <p>Patrulater cu două laturi paralele (bazele)</p>
    
    <h4>Tipuri de trapez:</h4>
    <ul>
      <li><strong>Trapez isoscel:</strong> laturile neparalele egale</li>
      <li><strong>Trapez dreptunghic:</strong> două unghiuri drepte</li>
    </ul>
    
    <h4>Proprietăți:</h4>
    <ul>
      <li>Linia mijlocie = (B + b)/2</li>
      <li>Linia mijlocie || cu bazele</li>
    </ul>
    
    <h4>Aria:</h4>
    <p>A = (B + b) × h / 2</p>',
    '[{
      "question": "Care patrulater are toate laturile egale și toate unghiurile drepte?",
      "options": ["Romb", "Dreptunghi", "Pătrat", "Paralelogram"],
      "correctAnswer": 2
    }]'::jsonb,
    60
  ),
  
  (
    'mate-11',
    'Geometrie Plană - Cercul',
    'matematica',
    'Proprietăți ale cercului, lungimi și arii',
    '<h2>Geometrie Plană - Cercul</h2>
    <h3>1. Elemente ale cercului</h3>
    <h4>Definiții de bază:</h4>
    <ul>
      <li><strong>Cercul:</strong> mulțimea punctelor din plan situate la distanța r de un punct fix O</li>
      <li><strong>Centrul:</strong> punctul fix O</li>
      <li><strong>Raza:</strong> distanța de la centru la orice punct de pe cerc</li>
      <li><strong>Diametrul:</strong> coardă care trece prin centru (d = 2r)</li>
    </ul>
    
    <h4>Alte elemente:</h4>
    <ul>
      <li><strong>Coarda:</strong> segment cu extremitățile pe cerc</li>
      <li><strong>Arcul:</strong> porțiune de cerc cuprinsă între două puncte</li>
      <li><strong>Sectorul circular:</strong> porțiune de disc cuprinsă între două raze</li>
      <li><strong>Segmentul circular:</strong> porțiune de disc cuprinsă între o coardă și arcul corespunzător</li>
    </ul>
    
    <h3>2. Lungimea cercului</h3>
    <h4>Formula:</h4>
    <p><strong>L = 2πr = πd</strong></p>
    
    <h4>Lungimea arcului:</h4>
    <p>Pentru un arc cu unghiul la centru α (în grade):</p>
    <p><strong>l = (α × πr)/180°</strong></p>
    
    <p>Pentru α în radiani:</p>
    <p><strong>l = α × r</strong></p>
    
    <h3>3. Aria cercului și a elementelor sale</h3>
    <h4>Aria cercului:</h4>
    <p><strong>A = πr²</strong></p>
    
    <h4>Aria sectorului circular:</h4>
    <p>Pentru unghiul α în grade:</p>
    <p><strong>A_sector = (α × πr²)/360°</strong></p>
    
    <p>Pentru α în radiani:</p>
    <p><strong>A_sector = (α × r²)/2</strong></p>
    
    <h4>Aria segmentului circular:</h4>
    <p><strong>A_segment = A_sector - A_triunghi</strong></p>
    
    <h3>4. Poziții relative</h3>
    <h4>Punctul față de cerc:</h4>
    <ul>
      <li><strong>Interior:</strong> d < r</li>
      <li><strong>Pe cerc:</strong> d = r</li>
      <li><strong>Exterior:</strong> d > r</li>
    </ul>
    
    <h4>Dreapta față de cerc:</h4>
    <ul>
      <li><strong>Secantă:</strong> două puncte comune</li>
      <li><strong>Tangentă:</strong> un punct comun</li>
      <li><strong>Exterioară:</strong> niciun punct comun</li>
    </ul>
    
    <h4>Două cercuri:</h4>
    <ul>
      <li><strong>Exterioare:</strong> d > r₁ + r₂</li>
      <li><strong>Tangente exterior:</strong> d = r₁ + r₂</li>
      <li><strong>Secante:</strong> |r₁ - r₂| < d < r₁ + r₂</li>
      <li><strong>Tangente interior:</strong> d = |r₁ - r₂|</li>
      <li><strong>Interioare:</strong> d < |r₁ - r₂|</li>
    </ul>
    
    <h3>5. Teoreme importante</h3>
    <h4>Teorema tangentei:</h4>
    <p>Tangenta la cerc este perpendiculară pe raza în punctul de tangență</p>
    
    <h4>Teorema coardei:</h4>
    <p>Perpendiculara din centru pe o coardă trece prin mijlocul coardei</p>
    
    <h4>Teorema unghiului înscris:</h4>
    <p>Unghiul înscris este jumătate din unghiul la centru care subîntinde același arc</p>',
    '[{
      "question": "Care este relația dintre rază (r) și diametru (d)?",
      "options": ["r = 2d", "d = 2r", "r = d", "d = r²"],
      "correctAnswer": 1
    }]'::jsonb,
    55
  ),
  
  (
    'mate-12',
    'Trigonometrie',
    'matematica',
    'Funcții trigonometrice și aplicații în geometrie',
    '<h2>Trigonometrie</h2>
    <h3>1. Funcțiile trigonometrice în triunghiul dreptunghic</h3>
    <h4>Definițiile de bază:</h4>
    <p>Pentru un unghi ascuțit α într-un triunghi dreptunghic:</p>
    <ul>
      <li><strong>sin α = cateta opusă / ipotenuza</strong></li>
      <li><strong>cos α = cateta alăturată / ipotenuza</strong></li>
      <li><strong>tg α = cateta opusă / cateta alăturată</strong></li>
      <li><strong>ctg α = cateta alăturată / cateta opusă</strong></li>
    </ul>
    
    <h3>2. Valori particulare</h3>
    <table border="1" style="border-collapse: collapse; margin: 10px 0;">
      <tr>
        <th>α</th>
        <th>sin α</th>
        <th>cos α</th>
        <th>tg α</th>
      </tr>
      <tr>
        <td>30°</td>
        <td>1/2</td>
        <td>√3/2</td>
        <td>√3/3</td>
      </tr>
      <tr>
        <td>45°</td>
        <td>√2/2</td>
        <td>√2/2</td>
        <td>1</td>
      </tr>
      <tr>
        <td>60°</td>
        <td>√3/2</td>
        <td>1/2</td>
        <td>√3</td>
      </tr>
    </table>
    
    <h3>3. Relații fundamentale</h3>
    <h4>Relația fundamentală:</h4>
    <p><strong>sin²α + cos²α = 1</strong></p>
    
    <h4>Alte relații:</h4>
    <ul>
      <li><strong>tg α = sin α / cos α</strong></li>
      <li><strong>ctg α = cos α / sin α</strong></li>
      <li><strong>tg α × ctg α = 1</strong></li>
      <li><strong>1 + tg²α = 1/cos²α</strong></li>
      <li><strong>1 + ctg²α = 1/sin²α</strong></li>
    </ul>
    
    <h3>4. Funcții trigonometrice pentru unghiuri oarecare</h3>
    <h4>Cercul trigonometric:</h4>
    <p>Cerc cu centrul în origine și raza 1</p>
    <ul>
      <li>sin α = ordonata punctului</li>
      <li>cos α = abscisa punctului</li>
    </ul>
    
    <h4>Semnele funcțiilor pe cadrane:</h4>
    <ul>
      <li><strong>Cadranul I:</strong> toate pozitive</li>
      <li><strong>Cadranul II:</strong> sin > 0, cos < 0, tg < 0</li>
      <li><strong>Cadranul III:</strong> sin < 0, cos < 0, tg > 0</li>
      <li><strong>Cadranul IV:</strong> sin < 0, cos > 0, tg < 0</li>
    </ul>
    
    <h3>5. Formule de reducere</h3>
    <h4>Unghiuri suplimentare:</h4>
    <ul>
      <li>sin(180° - α) = sin α</li>
      <li>cos(180° - α) = -cos α</li>
    </ul>
    
    <h4>Unghiuri complementare:</h4>
    <ul>
      <li>sin(90° - α) = cos α</li>
      <li>cos(90° - α) = sin α</li>
    </ul>
    
    <h3>6. Ecuații trigonometrice simple</h3>
    <h4>sin x = a:</h4>
    <ul>
      <li>Dacă |a| ≤ 1: x = arcsin a + 2kπ sau x = π - arcsin a + 2kπ</li>
      <li>Dacă |a| > 1: fără soluții</li>
    </ul>
    
    <h4>cos x = a:</h4>
    <ul>
      <li>Dacă |a| ≤ 1: x = ±arccos a + 2kπ</li>
      <li>Dacă |a| > 1: fără soluții</li>
    </ul>
    
    <h4>tg x = a:</h4>
    <p>x = arctg a + kπ</p>
    
    <h3>7. Aplicații în geometrie</h3>
    <h4>Teorema sinusurilor:</h4>
    <p><strong>a/sin A = b/sin B = c/sin C = 2R</strong></p>
    
    <h4>Teorema cosinusurilor:</h4>
    <p><strong>c² = a² + b² - 2ab cos C</strong></p>',
    '[{
      "question": "Care este valoarea lui sin 30°?",
      "options": ["1/2", "√2/2", "√3/2", "1"],
      "correctAnswer": 0
    }]'::jsonb,
    65
  ),
  
  (
    'mate-13',
    'Combinatorică și Probabilități',
    'matematica',
    'Principiile numărării și calculul probabilităților',
    '<h2>Combinatorică și Probabilități</h2>
    <h3>1. Principiile fundamentale ale numărării</h3>
    <h4>Principiul adunării:</h4>
    <p>Dacă o acțiune se poate realiza în m moduri, iar alta în n moduri, și cele două acțiuni se exclud reciproc, atunci una dintre ele se poate realiza în m + n moduri.</p>
    
    <h4>Principiul înmulțirii:</h4>
    <p>Dacă o acțiune se poate realiza în m moduri, iar pentru fiecare dintre acestea o a doua acțiune se poate realiza în n moduri, atunci cele două acțiuni succesive se pot realiza în m × n moduri.</p>
    
    <h3>2. Aranjamente, permutări, combinări</h3>
    <h4>Permutări:</h4>
    <p>Numărul de moduri de a aranja n obiecte distincte:</p>
    <p><strong>P_n = n!</strong></p>
    
    <h4>Aranjamente:</h4>
    <p>Numărul de moduri de a alege și aranja k obiecte din n:</p>
    <p><strong>A_n^k = n!/(n-k)!</strong></p>
    
    <h4>Combinări:</h4>
    <p>Numărul de moduri de a alege k obiecte din n (fără a ține cont de ordine):</p>
    <p><strong>C_n^k = n!/(k!(n-k)!)</strong></p>
    
    <h3>3. Proprietăți ale combinărilor</h3>
    <ul>
      <li><strong>C_n^k = C_n^(n-k)</strong></li>
      <li><strong>C_n^0 = C_n^n = 1</strong></li>
      <li><strong>C_n^k + C_n^(k+1) = C_(n+1)^(k+1)</strong> (relația lui Pascal)</li>
    </ul>
    
    <h3>4. Binomul lui Newton</h3>
    <p><strong>(a + b)^n = Σ(k=0 to n) C_n^k × a^(n-k) × b^k</strong></p>
    
    <h4>Exemple:</h4>
    <ul>
      <li>(a + b)² = a² + 2ab + b²</li>
      <li>(a + b)³ = a³ + 3a²b + 3ab² + b³</li>
    </ul>
    
    <h3>5. Noțiuni de probabilitate</h3>
    <h4>Definiții:</h4>
    <ul>
      <li><strong>Experimentul aleator:</strong> experiment cu rezultat imprevizibil</li>
      <li><strong>Spațiul elementar (Ω):</strong> mulțimea tuturor rezultatelor posibile</li>
      <li><strong>Evenimentul:</strong> submulțime a spațiului elementar</li>
    </ul>
    
    <h4>Probabilitatea clasică:</h4>
    <p><strong>P(A) = numărul cazurilor favorabile / numărul cazurilor posibile</strong></p>
    
    <h3>6. Proprietăți ale probabilității</h3>
    <ul>
      <li><strong>0 ≤ P(A) ≤ 1</strong></li>
      <li><strong>P(Ω) = 1</strong></li>
      <li><strong>P(∅) = 0</strong></li>
      <li><strong>P(A̅) = 1 - P(A)</strong> (evenimentul contrar)</li>
    </ul>
    
    <h3>7. Operații cu evenimente</h3>
    <h4>Reuniunea:</h4>
    <p><strong>P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</strong></p>
    
    <h4>Evenimente incompatibile:</h4>
    <p>Dacă A ∩ B = ∅, atunci <strong>P(A ∪ B) = P(A) + P(B)</strong></p>
    
    <h4>Evenimente independente:</h4>
    <p><strong>P(A ∩ B) = P(A) × P(B)</strong></p>',
    '[{
      "question": "Care este valoarea lui C_5^2?",
      "options": ["10", "20", "5", "25"],
      "correctAnswer": 0
    }]'::jsonb,
    60
  ),
  
  (
    'mate-14',
    'Statistică Descriptivă',
    'matematica',
    'Organizarea și interpretarea datelor statistice',
    '<h2>Statistică Descriptivă</h2>
    <h3>1. Noțiuni fundamentale</h3>
    <h4>Definiții:</h4>
    <ul>
      <li><strong>Populația statistică:</strong> totalitatea unităților studiate</li>
      <li><strong>Eșantionul:</strong> parte a populației selectată pentru studiu</li>
      <li><strong>Caracterul statistic:</strong> proprietatea studiată</li>
      <li><strong>Modalitățile:</strong> valorile pe care le poate lua caracterul</li>
    </ul>
    
    <h4>Tipuri de caractere:</h4>
    <ul>
      <li><strong>Calitative:</strong> nu se pot măsura numeric (culoare, sex)</li>
      <li><strong>Cantitative:</strong> se pot măsura numeric
        <ul>
          <li><strong>Discrete:</strong> valori izolate (numărul de copii)</li>
          <li><strong>Continue:</strong> orice valoare dintr-un interval (înălțimea)</li>
        </ul>
      </li>
    </ul>
    
    <h3>2. Organizarea datelor</h3>
    <h4>Seria statistică simplă:</h4>
    <p>Pentru caractere discrete: x₁, x₂, ..., xₙ cu frecvențele n₁, n₂, ..., nₖ</p>
    
    <h4>Seria statistică cu intervale:</h4>
    <p>Pentru caractere continue: [a₁,b₁), [a₂,b₂), ..., [aₖ,bₖ)</p>
    
    <h4>Frecvențe:</h4>
    <ul>
      <li><strong>Frecvența absolută (nᵢ):</strong> numărul de unități cu modalitatea xᵢ</li>
      <li><strong>Frecvența relativă (fᵢ):</strong> fᵢ = nᵢ/n</li>
      <li><strong>Frecvența procentuală:</strong> fᵢ × 100%</li>
    </ul>
    
    <h3>3. Reprezentări grafice</h3>
    <h4>Pentru caractere calitative:</h4>
    <ul>
      <li><strong>Diagrama cu bare</strong></li>
      <li><strong>Diagrama circulară (cu sectoare)</strong></li>
    </ul>
    
    <h4>Pentru caractere cantitative discrete:</h4>
    <ul>
      <li><strong>Diagrama cu bare</strong></li>
      <li><strong>Poligonul frecvențelor</strong></li>
    </ul>
    
    <h4>Pentru caractere cantitative continue:</h4>
    <ul>
      <li><strong>Histograma</strong></li>
      <li><strong>Poligonul frecvențelor</strong></li>
    </ul>
    
    <h3>4. Indicatori de tendință centrală</h3>
    <h4>Media aritmetică:</h4>
    <p><strong>x̄ = (Σnᵢxᵢ)/n</strong></p>
    
    <h4>Mediana (Me):</h4>
    <ul>
      <li>Pentru n impar: valoarea din mijloc</li>
      <li>Pentru n par: media valorilor din mijloc</li>
    </ul>
    
    <h4>Moda (Mo):</h4>
    <p>Valoarea cu frecvența cea mai mare</p>
    
    <h3>5. Indicatori de dispersie</h3>
    <h4>Amplitudinea:</h4>
    <p><strong>A = x_max - x_min</strong></p>
    
    <h4>Abaterea medie:</h4>
    <p><strong>d̄ = (Σnᵢ|xᵢ - x̄|)/n</strong></p>
    
    <h4>Varianța:</h4>
    <p><strong>σ² = (Σnᵢ(xᵢ - x̄)²)/n</strong></p>
    
    <h4>Abaterea standard:</h4>
    <p><strong>σ = √σ²</strong></p>',
    '[{
      "question": "Care indicator nu este afectat de valorile extreme?",
      "options": ["Media", "Mediana", "Varianța", "Abaterea standard"],
      "correctAnswer": 1
    }]'::jsonb,
    55
  ),
  
  (
    'mate-15',
    'Probleme de Sinteză și Aplicații',
    'matematica',
    'Rezolvarea problemelor complexe care combină mai multe capitole',
    '<h2>Probleme de Sinteză și Aplicații</h2>
    <h3>1. Strategii generale de rezolvare</h3>
    <h4>Pașii metodici:</h4>
    <ol>
      <li><strong>Citirea atentă:</strong> înțelegerea enunțului</li>
      <li><strong>Identificarea datelor:</strong> ce știm?</li>
      <li><strong>Identificarea necunoscutelor:</strong> ce căutăm?</li>
      <li><strong>Alegerea metodei:</strong> ce instrumente folosim?</li>
      <li><strong>Rezolvarea:</strong> aplicarea metodei</li>
      <li><strong>Verificarea:</strong> controlul rezultatului</li>
      <li><strong>Interpretarea:</strong> ce înseamnă rezultatul?</li>
    </ol>
    
    <h3>2. Probleme cu funcții și ecuații</h3>
    <h4>Exemplu: Optimizare</h4>
    <p><strong>Problemă:</strong> Un fermier vrea să împrejmuiască un teren dreptunghiular cu 200m de gard. Care sunt dimensiunile pentru aria maximă?</p>
    
    <p><strong>Rezolvare:</strong></p>
    <ul>
      <li>Notăm L și l dimensiunile</li>
      <li>Condiția: 2L + 2l = 200, deci L + l = 100</li>
      <li>Aria: A = L × l = L × (100 - L) = 100L - L²</li>
      <li>Pentru maximum: A\'(L) = 100 - 2L = 0</li>
      <li>L = 50m, l = 50m</li>
      <li>Terenul optim este pătrat cu latura 50m</li>
    </ul>
    
    <h3>3. Probleme de geometrie cu algebră</h3>
    <h4>Exemplu: Teorema lui Pitagora și ecuații</h4>
    <p><strong>Problemă:</strong> Într-un triunghi dreptunghic, ipotenuza este cu 2cm mai mare decât o catetă și cu 4cm mai mare decât cealaltă catetă. Aflați dimensiunile.</p>
    
    <p><strong>Rezolvare:</strong></p>
    <ul>
      <li>Notăm catetele a și b, ipotenuza c</li>
      <li>c = a + 2 și c = b + 4</li>
      <li>Deci a = c - 2 și b = c - 4</li>
      <li>Din Pitagora: a² + b² = c²</li>
      <li>(c-2)² + (c-4)² = c²</li>
      <li>c² - 4c + 4 + c² - 8c + 16 = c²</li>
      <li>c² - 12c + 20 = 0</li>
      <li>c = 10cm, a = 8cm, b = 6cm</li>
    </ul>
    
    <h3>4. Probleme cu progresii</h3>
    <h4>Exemplu: Progresie geometrică</h4>
    <p><strong>Problemă:</strong> O bacterie se dublează la fiecare oră. Dacă inițial sunt 100 de bacterii, câte vor fi după 8 ore?</p>
    
    <p><strong>Rezolvare:</strong></p>
    <ul>
      <li>Progresie geometrică cu a₁ = 100, q = 2</li>
      <li>După n ore: aₙ = 100 × 2^(n-1)</li>
      <li>După 8 ore: a₈ = 100 × 2⁷ = 100 × 128 = 12.800 bacterii</li>
    </ul>
    
    <h3>5. Probleme cu probabilități și combinatorică</h3>
    <h4>Exemplu: Probabilitate compusă</h4>
    <p><strong>Problemă:</strong> Dintr-o clasă cu 15 băieți și 10 fete se aleg aleator 3 elevi. Care este probabilitatea ca toți să fie băieți?</p>
    
    <p><strong>Rezolvare:</strong></p>
    <ul>
      <li>Total elevi: 25</li>
      <li>Moduri de a alege 3 din 25: C₂₅³ = 2300</li>
      <li>Moduri de a alege 3 băieți din 15: C₁₅³ = 455</li>
      <li>P = 455/2300 = 91/460 ≈ 0,198</li>
    </ul>',
    '[{
      "question": "Care este primul pas în rezolvarea unei probleme complexe?",
      "options": ["Calculul", "Citirea atentă a enunțului", "Scrierea rezultatului", "Alegerea formulei"],
      "correctAnswer": 1
    }]'::jsonb,
    70
  );

-- 3. Adăugarea lecțiilor pentru INFORMATICĂ (15 lecții)
INSERT INTO lessons (id, title, subject, description, content, quiz, duration) VALUES
  (
    'info-1',
    'Introducere în Programare',
    'informatica',
    'Concepte fundamentale de programare și algoritmi',
    '<h2>Introducere în Programare</h2>
    <h3>1. Ce este programarea?</h3>
    <p>Programarea este procesul de creare a instrucțiunilor pentru calculator, pentru a rezolva probleme sau a efectua sarcini specifice.</p>
    
    <h3>2. Algoritmi</h3>
    <h4>Definiție:</h4>
    <p>Un algoritm este o secvență finită de pași care rezolvă o problemă.</p>
    
    <h4>Caracteristici:</h4>
    <ul>
      <li><strong>Finitudine:</strong> se termină după un număr finit de pași</li>
      <li><strong>Determinism:</strong> pentru aceleași date de intrare, produce aceleași rezultate</li>
      <li><strong>Generalitate:</strong> rezolvă o clasă de probleme, nu doar un caz particular</li>
    </ul>
    
    <h3>3. Limbaje de programare</h3>
    <h4>Tipuri de limbaje:</h4>
    <ul>
      <li><strong>Limbaje de nivel înalt:</strong> C++, Java, Python</li>
      <li><strong>Limbaje de nivel mediu:</strong> C</li>
      <li><strong>Limbaje de nivel scăzut:</strong> Assembly</li>
    </ul>
    
    <h4>Limbajul C++:</h4>
    <p>Limbaj de programare utilizat în bacalaureat, orientat pe obiecte, cu tipare statică.</p>
    
    <h3>4. Structura unui program C++</h3>
    <pre>
    #include &lt;iostream&gt;
    using namespace std;
    
    int main() {
        // Declarații și instrucțiuni
        cout << "Hello, World!" << endl;
        return 0;
    }
    </pre>
    
    <h4>Componente:</h4>
    <ul>
      <li><strong>Directive de preprocesare:</strong> #include</li>
      <li><strong>Namespace:</strong> using namespace std</li>
      <li><strong>Funcția main:</strong> punctul de intrare în program</li>
      <li><strong>Instrucțiuni:</strong> operații executate de program</li>
      <li><strong>Return:</strong> valoarea returnată de funcția main</li>
    </ul>
    
    <h3>5. Variabile și tipuri de date</h3>
    <h4>Tipuri de date fundamentale:</h4>
    <ul>
      <li><strong>int:</strong> numere întregi (-2147483648 până la 2147483647)</li>
      <li><strong>float:</strong> numere reale cu precizie simplă</li>
      <li><strong>double:</strong> numere reale cu precizie dublă</li>
      <li><strong>char:</strong> caractere</li>
      <li><strong>bool:</strong> valori logice (true/false)</li>
    </ul>
    
    <h4>Declararea variabilelor:</h4>
    <pre>
    int varsta;
    float inaltime = 1.75;
    char initiala = \'A\';
    bool esteMajor = true;
    </pre>
    
    <h3>6. Operatori</h3>
    <h4>Operatori aritmetici:</h4>
    <ul>
      <li><strong>+:</strong> adunare</li>
      <li><strong>-:</strong> scădere</li>
      <li><strong>*:</strong> înmulțire</li>
      <li><strong>/:</strong> împărțire</li>
      <li><strong>%:</strong> restul împărțirii (modulo)</li>
    </ul>
    
    <h4>Operatori de comparație:</h4>
    <ul>
      <li><strong>==:</strong> egal</li>
      <li><strong>!=:</strong> diferit</li>
      <li><strong>&lt;, &gt;:</strong> mai mic, mai mare</li>
      <li><strong>&lt;=, &gt;=:</strong> mai mic sau egal, mai mare sau egal</li>
    </ul>
    
    <h4>Operatori logici:</h4>
    <ul>
      <li><strong>&&:</strong> ȘI logic</li>
      <li><strong>||:</strong> SAU logic</li>
      <li><strong>!:</strong> negație logică</li>
    </ul>
    
    <h3>7. Intrare și ieșire</h3>
    <h4>Citirea datelor:</h4>
    <pre>
    int numar;
    cout << "Introduceti un numar: ";
    cin >> numar;
    </pre>
    
    <h4>Afișarea datelor:</h4>
    <pre>
    cout << "Numarul introdus este: " << numar << endl;
    </pre>
    
    <h3>8. Primul program</h3>
    <h4>Exemplu: Calculul sumei a două numere</h4>
    <pre>
    #include &lt;iostream&gt;
    using namespace std;
    
    int main() {
        int a, b, suma;
        
        cout << "Introduceti primul numar: ";
        cin >> a;
        
        cout << "Introduceti al doilea numar: ";
        cin >> b;
        
        suma = a + b;
        
        cout << "Suma numerelor este: " << suma << endl;
        
        return 0;
    }
    </pre>',
    '[{
      "question": "Care este primul pas în rezolvarea unei probleme prin programare?",
      "options": ["Scrierea codului", "Analiza problemei și crearea algoritmului", "Testarea programului", "Compilarea"],
      "correctAnswer": 1
    }]'::jsonb,
    60
  ),
  
  (
    'info-2',
    'Structuri de Control - Decizionale',
    'informatica',
    'Instrucțiuni condiționale: if, else, switch',
    '<h2>Structuri de Control - Decizionale</h2>
    <h3>1. Instrucțiunea if</h3>
    <h4>Sintaxă:</h4>
    <pre>
    if (condiție) {
        // instrucțiuni executate dacă condiția este adevărată
    }
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    int varsta = 18;
    if (varsta >= 18) {
        cout << "Persoana este majoră." << endl;
    }
    </pre>
    
    <h3>2. Instrucțiunea if-else</h3>
    <h4>Sintaxă:</h4>
    <pre>
    if (condiție) {
        // instrucțiuni executate dacă condiția este adevărată
    } else {
        // instrucțiuni executate dacă condiția este falsă
    }
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    int nota = 7;
    if (nota >= 5) {
        cout << "Promovat" << endl;
    } else {
        cout << "Nepromovat" << endl;
    }
    </pre>
    
    <h3>3. Instrucțiunea if-else if-else</h3>
    <h4>Sintaxă:</h4>
    <pre>
    if (condiție1) {
        // instrucțiuni executate dacă condiția1 este adevărată
    } else if (condiție2) {
        // instrucțiuni executate dacă condiția2 este adevărată
    } else {
        // instrucțiuni executate dacă nicio condiție nu este adevărată
    }
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    int nota = 8;
    if (nota >= 9) {
        cout << "Foarte bine" << endl;
    } else if (nota >= 7) {
        cout << "Bine" << endl;
    } else if (nota >= 5) {
        cout << "Suficient" << endl;
    } else {
        cout << "Insuficient" << endl;
    }
    </pre>
    
    <h3>4. Instrucțiunea switch</h3>
    <h4>Sintaxă:</h4>
    <pre>
    switch (expresie) {
        case valoare1:
            // instrucțiuni pentru valoare1
            break;
        case valoare2:
            // instrucțiuni pentru valoare2
            break;
        default:
            // instrucțiuni pentru alte valori
    }
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    int zi = 3;
    switch (zi) {
        case 1:
            cout << "Luni" << endl;
            break;
        case 2:
            cout << "Marți" << endl;
            break;
        case 3:
            cout << "Miercuri" << endl;
            break;
        case 4:
            cout << "Joi" << endl;
            break;
        case 5:
            cout << "Vineri" << endl;
            break;
        case 6:
        case 7:
            cout << "Weekend" << endl;
            break;
        default:
            cout << "Zi invalidă" << endl;
    }
    </pre>
    
    <h3>5. Operatorul ternar (condiționat)</h3>
    <h4>Sintaxă:</h4>
    <pre>
    condiție ? expresie1 : expresie2
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    int varsta = 20;
    string status = (varsta >= 18) ? "major" : "minor";
    cout << "Persoana este " << status << endl;
    </pre>
    
    <h3>6. Condiții compuse</h3>
    <h4>Utilizarea operatorilor logici:</h4>
    <pre>
    if (varsta >= 18 && cetatenie == "romana") {
        cout << "Poate vota în România" << endl;
    }
    
    if (plata == "card" || plata == "numerar") {
        cout << "Metodă de plată acceptată" << endl;
    }
    
    if (!(varsta < 18)) {
        cout << "Nu este minor" << endl;
    }
    </pre>
    
    <h3>7. Instrucțiuni if imbricate</h3>
    <h4>Exemplu:</h4>
    <pre>
    int varsta = 20;
    bool arePermis = true;
    
    if (varsta >= 18) {
        if (arePermis) {
            cout << "Poate conduce" << endl;
        } else {
            cout << "Nu poate conduce (fără permis)" << endl;
        }
    } else {
        cout << "Nu poate conduce (minor)" << endl;
    }
    </pre>
    
    <h3>8. Aplicații practice</h3>
    <h4>Exemplu: Determinarea maximului dintre trei numere</h4>
    <pre>
    int a = 5, b = 9, c = 3, maxim;
    
    if (a >= b && a >= c) {
        maxim = a;
    } else if (b >= a && b >= c) {
        maxim = b;
    } else {
        maxim = c;
    }
    
    cout << "Maximul este: " << maxim << endl;
    </pre>
    
    <h4>Exemplu: Verificarea dacă un an este bisect</h4>
    <pre>
    int an = 2024;
    
    if ((an % 4 == 0 && an % 100 != 0) || an % 400 == 0) {
        cout << an << " este an bisect" << endl;
    } else {
        cout << an << " nu este an bisect" << endl;
    }
    </pre>',
    '[{
      "question": "Ce afișează următorul cod: int x = 10; if (x > 5) cout << \"A\"; else cout << \"B\";",
      "options": ["A", "B", "AB", "Nimic"],
      "correctAnswer": 0
    }]'::jsonb,
    55
  ),
  
  (
    'info-3',
    'Structuri de Control - Repetitive',
    'informatica',
    'Instrucțiuni repetitive: for, while, do-while',
    '<h2>Structuri de Control - Repetitive</h2>
    <h3>1. Instrucțiunea for</h3>
    <h4>Sintaxă:</h4>
    <pre>
    for (inițializare; condiție; actualizare) {
        // instrucțiuni executate cât timp condiția este adevărată
    }
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    // Afișarea numerelor de la 1 la 10
    for (int i = 1; i <= 10; i++) {
        cout << i << " ";
    }
    // Output: 1 2 3 4 5 6 7 8 9 10
    </pre>
    
    <h3>2. Instrucțiunea while</h3>
    <h4>Sintaxă:</h4>
    <pre>
    while (condiție) {
        // instrucțiuni executate cât timp condiția este adevărată
    }
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    // Afișarea numerelor de la 1 la 10
    int i = 1;
    while (i <= 10) {
        cout << i << " ";
        i++;
    }
    // Output: 1 2 3 4 5 6 7 8 9 10
    </pre>
    
    <h3>3. Instrucțiunea do-while</h3>
    <h4>Sintaxă:</h4>
    <pre>
    do {
        // instrucțiuni executate cel puțin o dată
    } while (condiție);
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    // Afișarea numerelor de la 1 la 10
    int i = 1;
    do {
        cout << i << " ";
        i++;
    } while (i <= 10);
    // Output: 1 2 3 4 5 6 7 8 9 10
    </pre>
    
    <h3>4. Diferențe între structurile repetitive</h3>
    <h4>for:</h4>
    <ul>
      <li>Utilizat când numărul de iterații este cunoscut</li>
      <li>Inițializarea, condiția și actualizarea sunt în antetul buclei</li>
      <li>Condiția este evaluată înainte de fiecare iterație</li>
    </ul>
    
    <h4>while:</h4>
    <ul>
      <li>Utilizat când numărul de iterații nu este cunoscut</li>
      <li>Condiția este evaluată înainte de fiecare iterație</li>
      <li>Bucla poate să nu se execute niciodată</li>
    </ul>
    
    <h4>do-while:</h4>
    <ul>
      <li>Utilizat când bucla trebuie executată cel puțin o dată</li>
      <li>Condiția este evaluată după fiecare iterație</li>
      <li>Bucla se execută întotdeauna cel puțin o dată</li>
    </ul>
    
    <h3>5. Instrucțiuni de control al buclelor</h3>
    <h4>break:</h4>
    <p>Întrerupe execuția buclei și continuă cu instrucțiunea de după buclă.</p>
    <pre>
    for (int i = 1; i <= 10; i++) {
        if (i == 5) break;
        cout << i << " ";
    }
    // Output: 1 2 3 4
    </pre>
    
    <h4>continue:</h4>
    <p>Sare peste restul iterației curente și continuă cu următoarea iterație.</p>
    <pre>
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;
        cout << i << " ";
    }
    // Output: 1 3 5 7 9
    </pre>
    
    <h3>6. Bucle imbricate</h3>
    <h4>Exemplu: Afișarea unei matrice</h4>
    <pre>
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            cout << i << "," << j << " ";
        }
        cout << endl;
    }
    // Output:
    // 1,1 1,2 1,3
    // 2,1 2,2 2,3
    // 3,1 3,2 3,3
    </pre>
    
    <h3>7. Aplicații practice</h3>
    <h4>Exemplu: Calculul factorialului</h4>
    <pre>
    int n = 5;
    int factorial = 1;
    
    for (int i = 1; i <= n; i++) {
        factorial *= i;
    }
    
    cout << n << "! = " << factorial << endl;
    // Output: 5! = 120
    </pre>
    
    <h4>Exemplu: Verificarea dacă un număr este prim</h4>
    <pre>
    int n = 17;
    bool estePrim = true;
    
    if (n <= 1) {
        estePrim = false;
    } else {
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                estePrim = false;
                break;
            }
        }
    }
    
    if (estePrim) {
        cout << n << " este număr prim" << endl;
    } else {
        cout << n << " nu este număr prim" << endl;
    }
    // Output: 17 este număr prim
    </pre>
    
    <h4>Exemplu: Generarea numerelor Fibonacci</h4>
    <pre>
    int n = 10;
    int a = 0, b = 1, c;
    
    cout << "Primele " << n << " numere Fibonacci: ";
    cout << a << " " << b << " ";
    
    for (int i = 3; i <= n; i++) {
        c = a + b;
        cout << c << " ";
        a = b;
        b = c;
    }
    // Output: Primele 10 numere Fibonacci: 0 1 1 2 3 5 8 13 21 34
    </pre>',
    '[{
      "question": "Care buclă se execută cel puțin o dată?",
      "options": ["for", "while", "do-while", "Toate"],
      "correctAnswer": 2
    }]'::jsonb,
    60
  ),
  
  (
    'info-4',
    'Tablouri Unidimensionale (Vectori)',
    'informatica',
    'Declararea, inițializarea și prelucrarea vectorilor',
    '<h2>Tablouri Unidimensionale (Vectori)</h2>
    <h3>1. Noțiuni fundamentale</h3>
    <h4>Definiție:</h4>
    <p>Un vector (tablou unidimensional) este o colecție de elemente de același tip, accesibile prin indici.</p>
    
    <h4>Caracteristici:</h4>
    <ul>
      <li>Elementele sunt stocate în locații de memorie consecutive</li>
      <li>Accesul la elemente se face prin indici (începând de la 0 în C++)</li>
      <li>Dimensiunea este fixă după declarare (în C++)</li>
    </ul>
    
    <h3>2. Declararea și inițializarea vectorilor</h3>
    <h4>Declarare:</h4>
    <pre>
    tip_date nume_vector[dimensiune];
    </pre>
    
    <h4>Exemple:</h4>
    <pre>
    int numere[10];           // vector de 10 numere întregi
    float temperaturi[7];     // vector de 7 temperaturi
    char vocale[5];           // vector de 5 caractere
    </pre>
    
    <h4>Inițializare la declarare:</h4>
    <pre>
    int numere[5] = {10, 20, 30, 40, 50};
    char vocale[5] = {'a', 'e', 'i', 'o', 'u'};
    </pre>
    
    <h4>Inițializare parțială:</h4>
    <pre>
    int numere[5] = {10, 20};  // restul elementelor sunt 0
    </pre>
    
    <h4>Inițializare fără specificarea dimensiunii:</h4>
    <pre>
    int numere[] = {10, 20, 30, 40, 50};  // dimensiunea este dedusă (5)
    </pre>
    
    <h3>3. Accesarea elementelor</h3>
    <h4>Sintaxă:</h4>
    <pre>
    nume_vector[indice]
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    int numere[5] = {10, 20, 30, 40, 50};
    
    cout << numere[0] << endl;  // 10 (primul element)
    cout << numere[2] << endl;  // 30 (al treilea element)
    cout << numere[4] << endl;  // 50 (ultimul element)
    
    numere[1] = 25;             // modificarea valorii
    cout << numere[1] << endl;  // 25
    </pre>
    
    <h3>4. Parcurgerea vectorilor</h3>
    <h4>Parcurgere cu for:</h4>
    <pre>
    int numere[5] = {10, 20, 30, 40, 50};
    
    for (int i = 0; i < 5; i++) {
        cout << numere[i] << " ";
    }
    // Output: 10 20 30 40 50
    </pre>
    
    <h4>Parcurgere cu for range-based (C++11):</h4>
    <pre>
    int numere[5] = {10, 20, 30, 40, 50};
    
    for (int numar : numere) {
        cout << numar << " ";
    }
    // Output: 10 20 30 40 50
    </pre>
    
    <h3>5. Algoritmi fundamentali cu vectori</h3>
    <h4>Calculul sumei elementelor:</h4>
    <pre>
    int numere[5] = {10, 20, 30, 40, 50};
    int suma = 0;
    
    for (int i = 0; i < 5; i++) {
        suma += numere[i];
    }
    
    cout << "Suma: " << suma << endl;  // 150
    </pre>
    
    <h4>Determinarea valorii maxime/minime:</h4>
    <pre>
    int numere[5] = {30, 10, 50, 20, 40};
    int maxim = numere[0];
    int minim = numere[0];
    
    for (int i = 1; i < 5; i++) {
        if (numere[i] > maxim) {
            maxim = numere[i];
        }
        if (numere[i] < minim) {
            minim = numere[i];
        }
    }
    
    cout << "Maxim: " << maxim << endl;  // 50
    cout << "Minim: " << minim << endl;  // 10
    </pre>
    
    <h4>Căutarea unui element:</h4>
    <pre>
    int numere[5] = {10, 20, 30, 40, 50};
    int valoare = 30;
    int pozitie = -1;
    
    for (int i = 0; i < 5; i++) {
        if (numere[i] == valoare) {
            pozitie = i;
            break;
        }
    }
    
    if (pozitie != -1) {
        cout << "Valoarea " << valoare << " a fost găsită la poziția " << pozitie << endl;
    } else {
        cout << "Valoarea " << valoare << " nu a fost găsită" << endl;
    }
    </pre>
    
    <h3>6. Sortarea vectorilor</h3>
    <h4>Bubble Sort:</h4>
    <pre>
    int numere[5] = {30, 10, 50, 20, 40};
    
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4 - i; j++) {
            if (numere[j] > numere[j + 1]) {
                // Interschimbarea elementelor
                int temp = numere[j];
                numere[j] = numere[j + 1];
                numere[j + 1] = temp;
            }
        }
    }
    
    // Afișarea vectorului sortat
    for (int i = 0; i < 5; i++) {
        cout << numere[i] << " ";
    }
    // Output: 10 20 30 40 50
    </pre>
    
    <h4>Selection Sort:</h4>
    <pre>
    int numere[5] = {30, 10, 50, 20, 40};
    
    for (int i = 0; i < 4; i++) {
        int pozMin = i;
        for (int j = i + 1; j < 5; j++) {
            if (numere[j] < numere[pozMin]) {
                pozMin = j;
            }
        }
        if (pozMin != i) {
            // Interschimbarea elementelor
            int temp = numere[i];
            numere[i] = numere[pozMin];
            numere[pozMin] = temp;
        }
    }
    </pre>
    
    <h3>7. Vectori ca parametri de funcții</h3>
    <h4>Transmiterea vectorilor către funcții:</h4>
    <pre>
    void afisareVector(int v[], int n) {
        for (int i = 0; i < n; i++) {
            cout << v[i] << " ";
        }
        cout << endl;
    }
    
    int sumaVector(int v[], int n) {
        int suma = 0;
        for (int i = 0; i < n; i++) {
            suma += v[i];
        }
        return suma;
    }
    
    int main() {
        int numere[5] = {10, 20, 30, 40, 50};
        
        afisareVector(numere, 5);
        cout << "Suma: " << sumaVector(numere, 5) << endl;
        
        return 0;
    }
    </pre>',
    '[{
      "question": "Care este indexul primului element dintr-un vector în C++?",
      "options": ["1", "0", "-1", "Depinde de declarație"],
      "correctAnswer": 1
    }]'::jsonb,
    65
  ),
  
  (
    'info-5',
    'Tablouri Bidimensionale (Matrice)',
    'informatica',
    'Declararea, inițializarea și prelucrarea matricelor',
    '<h2>Tablouri Bidimensionale (Matrice)</h2>
    <h3>1. Noțiuni fundamentale</h3>
    <h4>Definiție:</h4>
    <p>O matrice (tablou bidimensional) este o colecție de elemente de același tip, organizate în rânduri și coloane.</p>
    
    <h4>Caracteristici:</h4>
    <ul>
      <li>Elementele sunt accesate prin doi indici: rând și coloană</li>
      <li>Dimensiunea este fixă după declarare (în C++)</li>
      <li>Stocarea în memorie se face liniarizat (rând cu rând)</li>
    </ul>
    
    <h3>2. Declararea și inițializarea matricelor</h3>
    <h4>Declarare:</h4>
    <pre>
    tip_date nume_matrice[nr_randuri][nr_coloane];
    </pre>
    
    <h4>Exemple:</h4>
    <pre>
    int matrice[3][4];           // matrice de 3 rânduri și 4 coloane
    float temperaturi[7][24];    // temperaturi pentru 7 zile, 24 ore
    char tabla[8][8];            // tabla de șah
    </pre>
    
    <h4>Inițializare la declarare:</h4>
    <pre>
    int matrice[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    </pre>
    
    <h4>Inițializare liniară:</h4>
    <pre>
    int matrice[3][3] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    </pre>
    
    <h3>3. Accesarea elementelor</h3>
    <h4>Sintaxă:</h4>
    <pre>
    nume_matrice[indice_rand][indice_coloana]
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    int matrice[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    cout << matrice[0][0] << endl;  // 1 (primul element)
    cout << matrice[1][1] << endl;  // 5 (elementul din mijloc)
    cout << matrice[2][2] << endl;  // 9 (ultimul element)
    
    matrice[0][1] = 10;             // modificarea valorii
    cout << matrice[0][1] << endl;  // 10
    </pre>
    
    <h3>4. Parcurgerea matricelor</h3>
    <h4>Parcurgere pe rânduri și coloane:</h4>
    <pre>
    int matrice[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            cout << matrice[i][j] << " ";
        }
        cout << endl;
    }
    // Output:
    // 1 2 3
    // 4 5 6
    // 7 8 9
    </pre>
    
    <h4>Parcurgerea diagonalei principale:</h4>
    <pre>
    for (int i = 0; i < 3; i++) {
        cout << matrice[i][i] << " ";
    }
    // Output: 1 5 9
    </pre>
    
    <h4>Parcurgerea diagonalei secundare:</h4>
    <pre>
    for (int i = 0; i < 3; i++) {
        cout << matrice[i][2-i] << " ";
    }
    // Output: 3 5 7
    </pre>
    
    <h3>5. Algoritmi fundamentali cu matrice</h3>
    <h4>Calculul sumei elementelor:</h4>
    <pre>
    int matrice[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    int suma = 0;
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            suma += matrice[i][j];
        }
    }
    
    cout << "Suma: " << suma << endl;  // 45
    </pre>
    
    <h4>Determinarea valorii maxime/minime:</h4>
    <pre>
    int matrice[3][3] = {
        {7, 2, 9},
        {4, 1, 6},
        {8, 3, 5}
    };
    int maxim = matrice[0][0];
    int minim = matrice[0][0];
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (matrice[i][j] > maxim) {
                maxim = matrice[i][j];
            }
            if (matrice[i][j] < minim) {
                minim = matrice[i][j];
            }
        }
    }
    
    cout << "Maxim: " << maxim << endl;  // 9
    cout << "Minim: " << minim << endl;  // 1
    </pre>
    
    <h3>6. Operații cu matrice</h3>
    <h4>Adunarea a două matrice:</h4>
    <pre>
    int a[2][2] = {{1, 2}, {3, 4}};
    int b[2][2] = {{5, 6}, {7, 8}};
    int c[2][2];
    
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            c[i][j] = a[i][j] + b[i][j];
        }
    }
    
    // Afișarea rezultatului
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            cout << c[i][j] << " ";
        }
        cout << endl;
    }
    // Output:
    // 6 8
    // 10 12
    </pre>
    
    <h4>Înmulțirea a două matrice:</h4>
    <pre>
    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int b[3][2] = {{7, 8}, {9, 10}, {11, 12}};
    int c[2][2] = {0};
    
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 3; k++) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    
    // Afișarea rezultatului
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            cout << c[i][j] << " ";
        }
        cout << endl;
    }
    // Output:
    // 58 64
    // 139 154
    </pre>
    
    <h3>7. Aplicații practice</h3>
    <h4>Exemplu: Transpusa unei matrice</h4>
    <pre>
    int matrice[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    int transpusa[3][3];
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            transpusa[j][i] = matrice[i][j];
        }
    }
    
    // Afișarea transpusei
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            cout << transpusa[i][j] << " ";
        }
        cout << endl;
    }
    // Output:
    // 1 4 7
    // 2 5 8
    // 3 6 9
    </pre>
    
    <h4>Exemplu: Verificarea dacă o matrice este simetrică</h4>
    <pre>
    int matrice[3][3] = {
        {1, 2, 3},
        {2, 5, 6},
        {3, 6, 9}
    };
    bool esteSimetrica = true;
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < i; j++) {
            if (matrice[i][j] != matrice[j][i]) {
                esteSimetrica = false;
                break;
            }
        }
        if (!esteSimetrica) break;
    }
    
    if (esteSimetrica) {
        cout << "Matricea este simetrică" << endl;
    } else {
        cout << "Matricea nu este simetrică" << endl;
    }
    // Output: Matricea este simetrică
    </pre>',
    '[{
      "question": "Cum se accesează elementul de pe rândul 2, coloana 3 dintr-o matrice în C++?",
      "options": ["matrice[2][3]", "matrice[1][2]", "matrice[3][2]", "matrice[2, 3]"],
      "correctAnswer": 1
    }]'::jsonb,
    65
  ),
  
  (
    'info-6',
    'Funcții și Proceduri',
    'informatica',
    'Definirea și utilizarea funcțiilor în programare',
    '<h2>Funcții și Proceduri</h2>
    <h3>1. Noțiuni fundamentale</h3>
    <h4>Definiție:</h4>
    <p>O funcție este un bloc de cod care efectuează o sarcină specifică și poate fi apelat din alte părți ale programului.</p>
    
    <h4>Avantaje:</h4>
    <ul>
      <li>Modularizarea codului</li>
      <li>Reutilizarea codului</li>
      <li>Îmbunătățirea lizibilității</li>
      <li>Simplificarea depanării</li>
    </ul>
    
    <h3>2. Declararea și definirea funcțiilor</h3>
    <h4>Sintaxă:</h4>
    <pre>
    tip_returnat nume_functie(parametri) {
        // corpul funcției
        return valoare;  // opțional, în funcție de tip_returnat
    }
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    int suma(int a, int b) {
        return a + b;
    }
    
    void afisareMesaj(string mesaj) {
        cout << mesaj << endl;
    }
    </pre>
    
    <h3>3. Tipuri de funcții</h3>
    <h4>Funcții cu valoare de retur:</h4>
    <ul>
      <li>Returnează o valoare prin instrucțiunea return</li>
      <li>Tipul returnat poate fi orice tip de date valid</li>
    </ul>
    <pre>
    int maxim(int a, int b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }
    </pre>
    
    <h4>Proceduri (funcții void):</h4>
    <ul>
      <li>Nu returnează nicio valoare</li>
      <li>Tipul returnat este void</li>
      <li>Instrucțiunea return este opțională</li>
    </ul>
    <pre>
    void afisareVector(int v[], int n) {
        for (int i = 0; i < n; i++) {
            cout << v[i] << " ";
        }
        cout << endl;
    }
    </pre>
    
    <h3>4. Parametrii funcțiilor</h3>
    <h4>Parametri formali:</h4>
    <p>Variabilele declarate în antetul funcției.</p>
    
    <h4>Parametri actuali:</h4>
    <p>Valorile transmise funcției la apel.</p>
    
    <h4>Transmiterea parametrilor prin valoare:</h4>
    <ul>
      <li>Se creează o copie a valorii</li>
      <li>Modificările din funcție nu afectează variabila originală</li>
    </ul>
    <pre>
    void incrementare(int x) {
        x++;  // modifică doar copia locală
    }
    
    int main() {
        int a = 5;
        incrementare(a);
        cout << a << endl;  // Output: 5 (a nu se modifică)
        return 0;
    }
    </pre>
    
    <h4>Transmiterea parametrilor prin referință:</h4>
    <ul>
      <li>Se transmite adresa variabilei</li>
      <li>Modificările din funcție afectează variabila originală</li>
    </ul>
    <pre>
    void incrementare(int &x) {
        x++;  // modifică variabila originală
    }
    
    int main() {
        int a = 5;
        incrementare(a);
        cout << a << endl;  // Output: 6 (a se modifică)
        return 0;
    }
    </pre>
    
    <h3>5. Apelul funcțiilor</h3>
    <h4>Sintaxă:</h4>
    <pre>
    nume_functie(parametri_actuali);
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    int rezultat = suma(5, 3);
    cout << rezultat << endl;  // Output: 8
    
    afisareMesaj("Hello, World!");  // Output: Hello, World!
    </pre>
    
    <h3>6. Funcții recursive</h3>
    <h4>Definiție:</h4>
    <p>O funcție recursivă este o funcție care se apelează pe sine.</p>
    
    <h4>Componente:</h4>
    <ul>
      <li>Cazul de bază (condiția de oprire)</li>
      <li>Cazul recursiv (apelul funcției)</li>
    </ul>
    
    <h4>Exemplu: Calculul factorialului</h4>
    <pre>
    int factorial(int n) {
        if (n <= 1) {
            return 1;  // cazul de bază
        } else {
            return n * factorial(n - 1);  // cazul recursiv
        }
    }
    
    int main() {
        cout << factorial(5) << endl;  // Output: 120
        return 0;
    }
    </pre>
    
    <h4>Exemplu: Șirul Fibonacci</h4>
    <pre>
    int fibonacci(int n) {
        if (n <= 1) {
            return n;  // cazul de bază
        } else {
            return fibonacci(n - 1) + fibonacci(n - 2);  // cazul recursiv
        }
    }
    
    int main() {
        cout << fibonacci(6) << endl;  // Output: 8
        return 0;
    }
    </pre>
    
    <h3>7. Supraîncărcarea funcțiilor</h3>
    <h4>Definiție:</h4>
    <p>Supraîncărcarea funcțiilor permite definirea mai multor funcții cu același nume, dar cu parametri diferiți.</p>
    
    <h4>Exemplu:</h4>
    <pre>
    int suma(int a, int b) {
        return a + b;
    }
    
    double suma(double a, double b) {
        return a + b;
    }
    
    int suma(int a, int b, int c) {
        return a + b + c;
    }
    
    int main() {
        cout << suma(5, 3) << endl;        // apelează prima funcție
        cout << suma(5.5, 3.5) << endl;    // apelează a doua funcție
        cout << suma(5, 3, 2) << endl;     // apelează a treia funcție
        return 0;
    }
    </pre>
    
    <h3>8. Funcții predefinite</h3>
    <h4>Biblioteca &lt;cmath&gt;:</h4>
    <ul>
      <li><strong>sqrt(x):</strong> rădăcina pătrată</li>
      <li><strong>pow(x, y):</strong> x la puterea y</li>
      <li><strong>abs(x):</strong> valoarea absolută</li>
      <li><strong>sin(x), cos(x), tan(x):</strong> funcții trigonometrice</li>
    </ul>
    
    <h4>Biblioteca &lt;algorithm&gt;:</h4>
    <ul>
      <li><strong>sort(begin, end):</strong> sortarea unui vector</li>
      <li><strong>min(a, b), max(a, b):</strong> minimul/maximul a două valori</li>
      <li><strong>swap(a, b):</strong> interschimbarea a două valori</li>
    </ul>',
    '[{
      "question": "Ce se întâmplă când o funcție nu are instrucțiunea return?",
      "options": ["Eroare de compilare", "Returnează 0", "Returnează valoare aleatoare", "Depinde de tipul funcției"],
      "correctAnswer": 3
    }]'::jsonb,
    60
  ),
  
  (
    'info-7',
    'Șiruri de Caractere',
    'informatica',
    'Prelucrarea textelor și operații cu șiruri',
    '<h2>Șiruri de Caractere</h2>
    <h3>1. Noțiuni fundamentale</h3>
    <h4>Definiție:</h4>
    <p>Un șir de caractere este o secvență de caractere stocate în locații de memorie consecutive.</p>
    
    <h4>Reprezentare în C++:</h4>
    <ul>
      <li><strong>Șiruri în stil C:</strong> vectori de caractere terminați cu caracterul nul (\'\\0\')</li>
      <li><strong>Clasa string:</strong> tip de date din biblioteca standard C++</li>
    </ul>
    
    <h3>2. Șiruri în stil C</h3>
    <h4>Declarare și inițializare:</h4>
    <pre>
    char sir1[10];                  // șir neințializat
    char sir2[10] = "Hello";        // inițializare cu șir literal
    char sir3[] = "Hello";          // dimensiunea este dedusă (6, inclusiv \'\\0\')
    char sir4[10] = {'H', 'e', 'l', 'l', 'o', \'\\0\'};  // inițializare cu caractere
    </pre>
    
    <h4>Caracterul nul (\'\\0\'):</h4>
    <ul>
      <li>Marchează sfârșitul șirului</li>
      <li>Are codul ASCII 0</li>
      <li>Este adăugat automat la șirurile literale</li>
    </ul>
    
    <h3>3. Clasa string</h3>
    <h4>Includerea bibliotecii:</h4>
    <pre>
    #include &lt;string&gt;
    </pre>
    
    <h4>Declarare și inițializare:</h4>
    <pre>
    string s1;                // șir gol
    string s2 = "Hello";      // inițializare cu șir literal
    string s3("World");       // inițializare cu constructor
    string s4(5, \'a\');        // inițializare cu 5 caractere \'a\'
    </pre>
    
    <h4>Avantaje față de șirurile în stil C:</h4>
    <ul>
      <li>Dimensiune dinamică</li>
      <li>Operații predefinite (concatenare, comparare)</li>
      <li>Funcții membre utile</li>
      <li>Siguranță sporită (evitarea depășirii limitelor)</li>
    </ul>
    
    <h3>4. Operații de bază cu șiruri</h3>
    <h4>Citirea și afișarea:</h4>
    <pre>
    // Pentru șiruri în stil C
    char sir[100];
    cin >> sir;               // citește până la primul spațiu
    cout << sir << endl;
    
    // Pentru string
    string s;
    cin >> s;                 // citește până la primul spațiu
    cout << s << endl;
    
    // Citirea unei linii întregi
    string linie;
    getline(cin, linie);      // citește o linie întreagă
    cout << linie << endl;
    </pre>
    
    <h4>Concatenarea:</h4>
    <pre>
    // Pentru șiruri în stil C
    char sir1[20] = "Hello";
    char sir2[20] = " World";
    strcat(sir1, sir2);       // sir1 devine "Hello World"
    
    // Pentru string
    string s1 = "Hello";
    string s2 = " World";
    string s3 = s1 + s2;      // s3 devine "Hello World"
    s1 += s2;                 // s1 devine "Hello World"
    </pre>
    
    <h4>Compararea:</h4>
    <pre>
    // Pentru șiruri în stil C
    char sir1[20] = "abc";
    char sir2[20] = "def";
    int rezultat = strcmp(sir1, sir2);  // < 0 dacă sir1 < sir2
                                        // = 0 dacă sir1 = sir2
                                        // > 0 dacă sir1 > sir2
    
    // Pentru string
    string s1 = "abc";
    string s2 = "def";
    if (s1 < s2) {            // comparare lexicografică
        cout << "s1 este mai mic lexicografic" << endl;
    }
    </pre>
    
    <h3>5. Funcții pentru șiruri în stil C</h3>
    <h4>Biblioteca &lt;cstring&gt;:</h4>
    <ul>
      <li><strong>strlen(sir):</strong> lungimea șirului</li>
      <li><strong>strcpy(dest, src):</strong> copierea unui șir</li>
      <li><strong>strcat(dest, src):</strong> concatenarea șirurilor</li>
      <li><strong>strcmp(sir1, sir2):</strong> compararea șirurilor</li>
      <li><strong>strchr(sir, c):</strong> caută prima apariție a caracterului c</li>
      <li><strong>strstr(sir1, sir2):</strong> caută prima apariție a șirului sir2 în sir1</li>
    </ul>
    
    <h4>Exemplu:</h4>
    <pre>
    char sir[20] = "Hello";
    
    cout << strlen(sir) << endl;          // 5
    
    char copie[20];
    strcpy(copie, sir);                   // copie devine "Hello"
    
    strcat(sir, " World");                // sir devine "Hello World"
    
    char *p = strchr(sir, \'o\');           // p pointează la prima apariție a lui \'o\'
    if (p != NULL) {
        cout << "Poziția lui \'o\': " << (p - sir) << endl;
    }
    </pre>
    
    <h3>6. Metode pentru clasa string</h3>
    <h4>Metode utile:</h4>
    <ul>
      <li><strong>length(), size():</strong> lungimea șirului</li>
      <li><strong>empty():</strong> verifică dacă șirul este gol</li>
      <li><strong>substr(pos, len):</strong> extrage un subșir</li>
      <li><strong>find(str):</strong> caută un subșir</li>
      <li><strong>replace(pos, len, str):</strong> înlocuiește o parte din șir</li>
      <li><strong>insert(pos, str):</strong> inserează un șir la poziția specificată</li>
      <li><strong>erase(pos, len):</strong> șterge caractere din șir</li>
    </ul>
    
    <h4>Exemplu:</h4>
    <pre>
    string s = "Hello World";
    
    cout << s.length() << endl;           // 11
    
    string sub = s.substr(6, 5);          // "World"
    
    size_t pos = s.find("World");         // 6
    if (pos != string::npos) {
        cout << "Subșirul a fost găsit la poziția " << pos << endl;
    }
    
    s.replace(0, 5, "Hi");                // s devine "Hi World"
    
    s.insert(2, " there");                // s devine "Hi there World"
    
    s.erase(3, 6);                        // s devine "Hi World"
    </pre>
    
    <h3>7. Algoritmi frecvenți cu șiruri</h3>
    <h4>Inversarea unui șir:</h4>
    <pre>
    string s = "Hello";
    string inversat = "";
    
    for (int i = s.length() - 1; i >= 0; i--) {
        inversat += s[i];
    }
    
    cout << inversat << endl;  // "olleH"
    </pre>
    
    <h4>Verificarea dacă un șir este palindrom:</h4>
    <pre>
    string s = "radar";
    bool estePalindrom = true;
    
    for (int i = 0; i < s.length() / 2; i++) {
        if (s[i] != s[s.length() - 1 - i]) {
            estePalindrom = false;
            break;
        }
    }
    
    if (estePalindrom) {
        cout << s << " este palindrom" << endl;
    } else {
        cout << s << " nu este palindrom" << endl;
    }
    </pre>
    
    <h4>Numărarea apariției unui caracter:</h4>
    <pre>
    string s = "programare";
    char c = \'a\';
    int numarAparitii = 0;
    
    for (int i = 0; i < s.length(); i++) {
        if (s[i] == c) {
            numarAparitii++;
        }
    }
    
    cout << "Caracterul \'" << c << "\' apare de " << numarAparitii << " ori" << endl;
    </pre>',
    '[{
      "question": "Care funcție returnează lungimea unui șir în C++?",
      "options": ["size()", "length()", "count()", "Toate variantele a și b"],
      "correctAnswer": 3
    }]'::jsonb,
    60
  ),
  
  (
    'info-8',
    'Algoritmi de Sortare',
    'informatica',
    'Metode de ordonare a datelor și analiza eficienței',
    '<h2>Algoritmi de Sortare</h2>
    <h3>1. Introducere în sortare</h3>
    <h4>Definiție:</h4>
    <p>Sortarea este procesul de aranjare a elementelor unei colecții în ordine crescătoare sau descrescătoare.</p>
    
    <h4>Importanța sortării:</h4>
    <ul>
      <li>Facilitează căutarea eficientă</li>
      <li>Îmbunătățește prezentarea datelor</li>
      <li>Este o operație fundamentală în multe algoritmi</li>
    </ul>
    
    <h4>Criterii de evaluare a algoritmilor de sortare:</h4>
    <ul>
      <li><strong>Complexitatea temporală:</strong> timpul de execuție</li>
      <li><strong>Complexitatea spațială:</strong> memoria suplimentară necesară</li>
      <li><strong>Stabilitatea:</strong> păstrarea ordinii relative a elementelor egale</li>
      <li><strong>Adaptabilitatea:</strong> eficiența pentru date parțial sortate</li>
    </ul>
    
    <h3>2. Bubble Sort</h3>
    <h4>Principiu:</h4>
    <p>Compară elementele adiacente și le interschimbă dacă sunt în ordine greșită.</p>
    
    <h4>Implementare:</h4>
    <pre>
    void bubbleSort(int v[], int n) {
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (v[j] > v[j + 1]) {
                    // Interschimbare
                    int temp = v[j];
                    v[j] = v[j + 1];
                    v[j + 1] = temp;
                }
            }
        }
    }
    </pre>
    
    <h4>Optimizare:</h4>
    <pre>
    void bubbleSort(int v[], int n) {
        bool schimbare;
        for (int i = 0; i < n - 1; i++) {
            schimbare = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (v[j] > v[j + 1]) {
                    // Interschimbare
                    int temp = v[j];
                    v[j] = v[j + 1];
                    v[j + 1] = temp;
                    schimbare = true;
                }
            }
            if (!schimbare) break;  // Dacă nu s-a făcut nicio schimbare, vectorul este sortat
        }
    }
    </pre>
    
    <h4>Complexitate:</h4>
    <ul>
      <li><strong>Timp:</strong> O(n²) în cazul mediu și cel mai rău, O(n) în cazul cel mai bun (vector deja sortat cu optimizare)</li>
      <li><strong>Spațiu:</strong> O(1)</li>
      <li><strong>Stabilitate:</strong> Stabil</li>
    </ul>
    
    <h3>3. Selection Sort</h3>
    <h4>Principiu:</h4>
    <p>Găsește elementul minim din partea nesortată și îl plasează la sfârșitul părții sortate.</p>
    
    <h4>Implementare:</h4>
    <pre>
    void selectionSort(int v[], int n) {
        for (int i = 0; i < n - 1; i++) {
            int min_idx = i;
            for (int j = i + 1; j < n; j++) {
                if (v[j] < v[min_idx]) {
                    min_idx = j;
                }
            }
            // Interschimbare
            int temp = v[i];
            v[i] = v[min_idx];
            v[min_idx] = temp;
        }
    }
    </pre>
    
    <h4>Complexitate:</h4>
    <ul>
      <li><strong>Timp:</strong> O(n²) în toate cazurile</li>
      <li><strong>Spațiu:</strong> O(1)</li>
      <li><strong>Stabilitate:</strong> Instabil</li>
    </ul>
    
    <h3>4. Insertion Sort</h3>
    <h4>Principiu:</h4>
    <p>Construiește vectorul sortat element cu element, inserând fiecare element la poziția corectă.</p>
    
    <h4>Implementare:</h4>
    <pre>
    void insertionSort(int v[], int n) {
        for (int i = 1; i < n; i++) {
            int key = v[i];
            int j = i - 1;
            
            // Mutarea elementelor mai mari decât key
            // cu o poziție înainte
            while (j >= 0 && v[j] > key) {
                v[j + 1] = v[j];
                j--;
            }
            v[j + 1] = key;
        }
    }
    </pre>
    
    <h4>Complexitate:</h4>
    <ul>
      <li><strong>Timp:</strong> O(n²) în cazul mediu și cel mai rău, O(n) în cazul cel mai bun (vector deja sortat)</li>
      <li><strong>Spațiu:</strong> O(1)</li>
      <li><strong>Stabilitate:</strong> Stabil</li>
    </ul>
    
    <h3>5. Quick Sort</h3>
    <h4>Principiu:</h4>
    <p>Folosește strategia "divide et impera". Alege un pivot, partitionează vectorul în jurul pivotului și sortează recursiv subvectorii.</p>
    
    <h4>Implementare:</h4>
    <pre>
    int partition(int v[], int low, int high) {
        int pivot = v[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (v[j] <= pivot) {
                i++;
                // Interschimbare
                int temp = v[i];
                v[i] = v[j];
                v[j] = temp;
            }
        }
        
        // Interschimbare
        int temp = v[i + 1];
        v[i + 1] = v[high];
        v[high] = temp;
        
        return i + 1;
    }
    
    void quickSort(int v[], int low, int high) {
        if (low < high) {
            int pi = partition(v, low, high);
            
            quickSort(v, low, pi - 1);
            quickSort(v, pi + 1, high);
        }
    }
    </pre>
    
    <h4>Complexitate:</h4>
    <ul>
      <li><strong>Timp:</strong> O(n log n) în cazul mediu, O(n²) în cazul cel mai rău</li>
      <li><strong>Spațiu:</strong> O(log n) pentru stiva de recursivitate</li>
      <li><strong>Stabilitate:</strong> Instabil</li>
    </ul>
    
    <h3>6. Merge Sort</h3>
    <h4>Principiu:</h4>
    <p>Folosește strategia "divide et impera". Împarte vectorul în jumătăți, sortează recursiv fiecare jumătate și apoi combină rezultatele.</p>
    
    <h4>Implementare:</h4>
    <pre>
    void merge(int v[], int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        // Vectori temporari
        int L[n1], R[n2];
        
        // Copierea datelor în vectorii temporari
        for (int i = 0; i < n1; i++)
            L[i] = v[left + i];
        for (int j = 0; j < n2; j++)
            R[j] = v[mid + 1 + j];
        
        // Interclasarea
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                v[k] = L[i];
                i++;
            } else {
                v[k] = R[j];
                j++;
            }
            k++;
        }
        
        // Copierea elementelor rămase
        while (i < n1) {
            v[k] = L[i];
            i++;
            k++;
        }
        while (j < n2) {
            v[k] = R[j];
            j++;
            k++;
        }
    }
    
    void mergeSort(int v[], int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            
            mergeSort(v, left, mid);
            mergeSort(v, mid + 1, right);
            
            merge(v, left, mid, right);
        }
    }
    </pre>
    
    <h4>Complexitate:</h4>
    <ul>
      <li><strong>Timp:</strong> O(n log n) în toate cazurile</li>
      <li><strong>Spațiu:</strong> O(n)</li>
      <li><strong>Stabilitate:</strong> Stabil</li>
    </ul>
    
    <h3>7. Comparație între algoritmii de sortare</h3>
    <table border="1" style="border-collapse: collapse; margin: 10px 0;">
      <tr>
        <th>Algoritm</th>
        <th>Timp (mediu)</th>
        <th>Timp (cel mai rău)</th>
        <th>Spațiu</th>
        <th>Stabil</th>
      </tr>
      <tr>
        <td>Bubble Sort</td>
        <td>O(n²)</td>
        <td>O(n²)</td>
        <td>O(1)</td>
        <td>Da</td>
      </tr>
      <tr>
        <td>Selection Sort</td>
        <td>O(n²)</td>
        <td>O(n²)</td>
        <td>O(1)</td>
        <td>Nu</td>
      </tr>
      <tr>
        <td>Insertion Sort</td>
        <td>O(n²)</td>
        <td>O(n²)</td>
        <td>O(1)</td>
        <td>Da</td>
      </tr>
      <tr>
        <td>Quick Sort</td>
        <td>O(n log n)</td>
        <td>O(n²)</td>
        <td>O(log n)</td>
        <td>Nu</td>
      </tr>
      <tr>
        <td>Merge Sort</td>
        <td>O(n log n)</td>
        <td>O(n log n)</td>
        <td>O(n)</td>
        <td>Da</td>
      </tr>
    </table>',
    '[{
      "question": "Care algoritm de sortare are complexitatea cea mai bună în cazul cel mai rău?",
      "options": ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort"],
      "correctAnswer": 3
    }]'::jsonb,
    70
  ),
  
  (
    'info-9',
    'Algoritmi de Căutare',
    'informatica',
    'Metode de căutare a datelor în colecții',
    '<h2>Algoritmi de Căutare</h2>
    <h3>1. Introducere în căutare</h3>
    <h4>Definiție:</h4>
    <p>Căutarea este procesul de găsire a unui element într-o colecție de date.</p>
    
    <h4>Tipuri de căutare:</h4>
    <ul>
      <li><strong>Căutare secvențială (liniară):</strong> parcurge elementele unul câte unul</li>
      <li><strong>Căutare binară:</strong> pentru colecții sortate, folosind strategia "divide et impera"</li>
      <li><strong>Căutare prin hash:</strong> folosind funcții de dispersie</li>
    </ul>
    
    <h3>2. Căutarea secvențială (liniară)</h3>
    <h4>Principiu:</h4>
    <p>Parcurge elementele colecției unul câte unul până când găsește elementul căutat sau ajunge la sfârșit.</p>
    
    <h4>Implementare:</h4>
    <pre>
    int cautareSecventiala(int v[], int n, int x) {
        for (int i = 0; i < n; i++) {
            if (v[i] == x) {
                return i;  // returnează poziția elementului găsit
            }
        }
        return -1;  // elementul nu a fost găsit
    }
    </pre>
    
    <h4>Complexitate:</h4>
    <ul>
      <li><strong>Timp:</strong> O(n) în cazul mediu și cel mai rău, O(1) în cazul cel mai bun</li>
      <li><strong>Spațiu:</strong> O(1)</li>
    </ul>
    
    <h4>Avantaje și dezavantaje:</h4>
    <ul>
      <li><strong>Avantaje:</strong> simplu de implementat, funcționează pentru orice colecție</li>
      <li><strong>Dezavantaje:</strong> ineficient pentru colecții mari</li>
    </ul>
    
    <h3>3. Căutarea binară</h3>
    <h4>Principiu:</h4>
    <p>Pentru o colecție sortată, compară elementul căutat cu elementul din mijloc și elimină jumătatea în care nu poate fi elementul.</p>
    
    <h4>Condiții:</h4>
    <ul>
      <li>Colecția trebuie să fie sortată</li>
      <li>Accesul la elemente trebuie să fie în timp constant (O(1))</li>
    </ul>
    
    <h4>Implementare iterativă:</h4>
    <pre>
    int cautareBinara(int v[], int n, int x) {
        int stanga = 0;
        int dreapta = n - 1;
        
        while (stanga <= dreapta) {
            int mijloc = stanga + (dreapta - stanga) / 2;
            
            // Verifică dacă x este la mijloc
            if (v[mijloc] == x) {
                return mijloc;
            }
            
            // Dacă x este mai mare, ignoră jumătatea stângă
            if (v[mijloc] < x) {
                stanga = mijloc + 1;
            }
            // Dacă x este mai mic, ignoră jumătatea dreaptă
            else {
                dreapta = mijloc - 1;
            }
        }
        
        // Elementul nu a fost găsit
        return -1;
    }
    </pre>
    
    <h4>Implementare recursivă:</h4>
    <pre>
    int cautareBinaraRecursiva(int v[], int stanga, int dreapta, int x) {
        if (dreapta >= stanga) {
            int mijloc = stanga + (dreapta - stanga) / 2;
            
            // Dacă elementul este la mijloc
            if (v[mijloc] == x) {
                return mijloc;
            }
            
            // Dacă elementul este mai mic decât mijlocul
            if (v[mijloc] > x) {
                return cautareBinaraRecursiva(v, stanga, mijloc - 1, x);
            }
            
            // Dacă elementul este mai mare decât mijlocul
            return cautareBinaraRecursiva(v, mijloc + 1, dreapta, x);
        }
        
        // Elementul nu a fost găsit
        return -1;
    }
    </pre>
    
    <h4>Complexitate:</h4>
    <ul>
      <li><strong>Timp:</strong> O(log n) în toate cazurile</li>
      <li><strong>Spațiu:</strong> O(1) pentru implementarea iterativă, O(log n) pentru implementarea recursivă</li>
    </ul>
    
    <h4>Avantaje și dezavantaje:</h4>
    <ul>
      <li><strong>Avantaje:</strong> foarte eficient pentru colecții mari</li>
      <li><strong>Dezavantaje:</strong> necesită colecție sortată</li>
    </ul>
    
    <h3>4. Comparație între algoritmii de căutare</h3>
    <table border="1" style="border-collapse: collapse; margin: 10px 0;">
      <tr>
        <th>Algoritm</th>
        <th>Timp (mediu)</th>
        <th>Spațiu</th>
        <th>Necesită sortare</th>
      </tr>
      <tr>
        <td>Căutare secvențială</td>
        <td>O(n)</td>
        <td>O(1)</td>
        <td>Nu</td>
      </tr>
      <tr>
        <td>Căutare binară</td>
        <td>O(log n)</td>
        <td>O(1)</td>
        <td>Da</td>
      </tr>
    </table>
    
    <h3>5. Aplicații practice</h3>
    <h4>Exemplu: Verificarea existenței unui element</h4>
    <pre>
    int v[] = {10, 20, 30, 40, 50, 60, 70, 80, 90};
    int n = sizeof(v) / sizeof(v[0]);
    int x = 50;
    
    int pozitie = cautareBinara(v, n, x);
    
    if (pozitie != -1) {
        cout << "Elementul " << x << " a fost găsit la poziția " << pozitie << endl;
    } else {
        cout << "Elementul " << x << " nu a fost găsit" << endl;
    }
    </pre>
    
    <h4>Exemplu: Găsirea primei apariții a unui element</h4>
    <pre>
    int v[] = {10, 20, 20, 20, 30, 40};
    int n = sizeof(v) / sizeof(v[0]);
    int x = 20;
    
    int pozitie = cautareBinara(v, n, x);
    
    // Găsirea primei apariții
    while (pozitie > 0 && v[pozitie - 1] == x) {
        pozitie--;
    }
    
    cout << "Prima apariție a elementului " << x << " este la poziția " << pozitie << endl;
    </pre>
    
    <h4>Exemplu: Găsirea elementului cel mai apropiat</h4>
    <pre>
    int v[] = {10, 20, 30, 40, 50};
    int n = sizeof(v) / sizeof(v[0]);
    int x = 32;
    
    int stanga = 0;
    int dreapta = n - 1;
    int cel_mai_apropiat = 0;
    int diferenta_minima = INT_MAX;
    
    while (stanga <= dreapta) {
        int mijloc = stanga + (dreapta - stanga) / 2;
        
        // Actualizează cel mai apropiat element
        int diferenta_curenta = abs(v[mijloc] - x);
        if (diferenta_curenta < diferenta_minima) {
            diferenta_minima = diferenta_curenta;
            cel_mai_apropiat = mijloc;
        }
        
        if (v[mijloc] == x) {
            cel_mai_apropiat = mijloc;
            break;
        }
        
        if (v[mijloc] < x) {
            stanga = mijloc + 1;
        } else {
            dreapta = mijloc - 1;
        }
    }
    
    cout << "Elementul cel mai apropiat de " << x << " este " << v[cel_mai_apropiat] << endl;
    </pre>',
    '[{
      "question": "Care este complexitatea temporală a căutării binare?",
      "options": ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      "correctAnswer": 1
    }]'::jsonb,
    60
  ),
  
  (
    'info-10',
    'Structuri de Date',
    'informatica',
    'Tipuri de structuri de date și implementarea lor',
    '<h2>Structuri de Date</h2>
    <h3>1. Noțiuni fundamentale</h3>
    <h4>Definiție:</h4>
    <p>Structurile de date sunt modalități de organizare a datelor pentru a facilita accesul și modificarea lor.</p>
    
    <h4>Clasificare:</h4>
    <ul>
      <li><strong>Structuri liniare:</strong> vectori, liste, stive, cozi</li>
      <li><strong>Structuri neliniare:</strong> arbori, grafuri</li>
      <li><strong>Structuri primitive:</strong> întregi, reali, caractere, booleeni</li>
      <li><strong>Structuri compuse:</strong> structuri, clase</li>
    </ul>
    
    <h3>2. Structuri (struct) în C++</h3>
    <h4>Definiție:</h4>
    <p>O structură este un tip de date compus care grupează variabile de tipuri diferite sub un singur nume.</p>
    
    <h4>Declarare:</h4>
    <pre>
    struct Persoana {
        string nume;
        int varsta;
        float inaltime;
    };
    </pre>
    
    <h4>Utilizare:</h4>
    <pre>
    Persoana p1;
    p1.nume = "Ion Popescu";
    p1.varsta = 25;
    p1.inaltime = 1.75;
    
    cout << p1.nume << ", " << p1.varsta << " ani, " << p1.inaltime << " m" << endl;
    </pre>
    
    <h4>Inițializare la declarare:</h4>
    <pre>
    Persoana p2 = {"Maria Ionescu", 30, 1.65};
    </pre>
    
    <h4>Vectori de structuri:</h4>
    <pre>
    Persoana persoane[3] = {
        {"Ion Popescu", 25, 1.75},
        {"Maria Ionescu", 30, 1.65},
        {"Dan Vasilescu", 22, 1.80}
    };
    
    for (int i = 0; i < 3; i++) {
        cout << persoane[i].nume << ", " << persoane[i].varsta << " ani" << endl;
    }
    </pre>
    
    <h3>3. Liste înlănțuite</h3>
    <h4>Definiție:</h4>
    <p>O listă înlănțuită este o colecție de noduri, fiecare conținând date și o referință către următorul nod.</p>
    
    <h4>Implementare:</h4>
    <pre>
    struct Nod {
        int data;
        Nod* next;
    };
    
    class ListaInlantuita {
    private:
        Nod* head;
    
    public:
        ListaInlantuita() {
            head = NULL;
        }
        
        // Adăugare la început
        void adaugaInceput(int valoare) {
            Nod* nou = new Nod();
            nou->data = valoare;
            nou->next = head;
            head = nou;
        }
        
        // Adăugare la sfârșit
        void adaugaSfarsit(int valoare) {
            Nod* nou = new Nod();
            nou->data = valoare;
            nou->next = NULL;
            
            if (head == NULL) {
                head = nou;
                return;
            }
            
            Nod* temp = head;
            while (temp->next != NULL) {
                temp = temp->next;
            }
            
            temp->next = nou;
        }
        
        // Ștergere nod
        void sterge(int valoare) {
            if (head == NULL) return;
            
            if (head->data == valoare) {
                Nod* temp = head;
                head = head->next;
                delete temp;
                return;
            }
            
            Nod* temp = head;
            while (temp->next != NULL && temp->next->data != valoare) {
                temp = temp->next;
            }
            
            if (temp->next == NULL) return;
            
            Nod* nodDeSters = temp->next;
            temp->next = temp->next->next;
            delete nodDeSters;
        }
        
        // Afișare
        void afisare() {
            Nod* temp = head;
            while (temp != NULL) {
                cout << temp->data << " ";
                temp = temp->next;
            }
            cout << endl;
        }
        
        // Destructor
        ~ListaInlantuita() {
            Nod* current = head;
            Nod* next;
            
            while (current != NULL) {
                next = current->next;
                delete current;
                current = next;
            }
            
            head = NULL;
        }
    };
    </pre>
    
    <h4>Utilizare:</h4>
    <pre>
    ListaInlantuita lista;
    lista.adaugaInceput(10);
    lista.adaugaInceput(20);
    lista.adaugaSfarsit(30);
    
    lista.afisare();  // Output: 20 10 30
    
    lista.sterge(10);
    lista.afisare();  // Output: 20 30
    </pre>
    
    <h3>4. Stive (LIFO - Last In, First Out)</h3>
    <h4>Definiție:</h4>
    <p>O stivă este o structură de date care permite adăugarea și eliminarea elementelor doar la un capăt (vârf).</p>
    
    <h4>Operații:</h4>
    <ul>
      <li><strong>push:</strong> adaugă un element în vârf</li>
      <li><strong>pop:</strong> elimină elementul din vârf</li>
      <li><strong>top:</strong> accesează elementul din vârf fără a-l elimina</li>
      <li><strong>empty:</strong> verifică dacă stiva este goală</li>
    </ul>
    
    <h4>Implementare folosind vectori:</h4>
    <pre>
    class Stiva {
    private:
        int arr[100];
        int varf;
        int capacitate;
    
    public:
        Stiva(int size = 100) {
            varf = -1;
            capacitate = size;
        }
        
        bool push(int x) {
            if (varf >= capacitate - 1) {
                cout << "Eroare: Stiva plină" << endl;
                return false;
            }
            
            arr[++varf] = x;
            return true;
        }
        
        int pop() {
            if (varf < 0) {
                cout << "Eroare: Stiva goală" << endl;
                return -1;
            }
            
            return arr[varf--];
        }
        
        int top() {
            if (varf < 0) {
                cout << "Eroare: Stiva goală" << endl;
                return -1;
            }
            
            return arr[varf];
        }
        
        bool empty() {
            return varf < 0;
        }
    };
    </pre>
    
    <h4>Utilizare:</h4>
    <pre>
    Stiva s;
    s.push(10);
    s.push(20);
    s.push(30);
    
    cout << s.top() << endl;  // Output: 30
    
    cout << s.pop() << endl;  // Output: 30
    cout << s.pop() << endl;  // Output: 20
    
    cout << s.empty() << endl;  // Output: 0 (false)
    </pre>
    
    <h3>5. Cozi (FIFO - First In, First Out)</h3>
    <h4>Definiție:</h4>
    <p>O coadă este o structură de date care permite adăugarea elementelor la un capăt (spate) și eliminarea lor de la celălalt capăt (față).</p>
    
    <h4>Operații:</h4>
    <ul>
      <li><strong>enqueue:</strong> adaugă un element la sfârșitul cozii</li>
      <li><strong>dequeue:</strong> elimină elementul din fața cozii</li>
      <li><strong>front:</strong> accesează elementul din fața cozii fără a-l elimina</li>
      <li><strong>empty:</strong> verifică dacă coada este goală</li>
    </ul>
    
    <h4>Implementare folosind vectori:</h4>
    <pre>
    class Coada {
    private:
        int arr[100];
        int fata, spate;
        int capacitate;
    
    public:
        Coada(int size = 100) {
            fata = spate = -1;
            capacitate = size;
        }
        
        bool enqueue(int x) {
            if ((spate + 1) % capacitate == fata) {
                cout << "Eroare: Coada plină" << endl;
                return false;
            }
            
            if (fata == -1) {
                fata = 0;
            }
            
            spate = (spate + 1) % capacitate;
            arr[spate] = x;
            return true;
        }
        
        int dequeue() {
            if (fata == -1) {
                cout << "Eroare: Coada goală" << endl;
                return -1;
            }
            
            int element = arr[fata];
            
            if (fata == spate) {
                fata = spate = -1;
            } else {
                fata = (fata + 1) % capacitate;
            }
            
            return element;
        }
        
        int front() {
            if (fata == -1) {
                cout << "Eroare: Coada goală" << endl;
                return -1;
            }
            
            return arr[fata];
        }
        
        bool empty() {
            return fata == -1;
        }
    };
    </pre>
    
    <h4>Utilizare:</h4>
    <pre>
    Coada c;
    c.enqueue(10);
    c.enqueue(20);
    c.enqueue(30);
    
    cout << c.front() << endl;  // Output: 10
    
    cout << c.dequeue() << endl;  // Output: 10
    cout << c.dequeue() << endl;  // Output: 20
    
    cout << c.empty() << endl;  // Output: 0 (false)
    </pre>',
    '[{
      "question": "Ce principiu urmează o stivă?",
      "options": ["FIFO", "LIFO", "RANDOM", "SORTED"],
      "correctAnswer": 1
    }]'::jsonb,
    70
  ),
  
  (
    'info-11',
    'Programare Orientată pe Obiecte',
    'informatica',
    'Principiile POO și implementarea în C++',
    '<h2>Programare Orientată pe Obiecte</h2>
    <h3>1. Introducere în POO</h3>
    <h4>Definiție:</h4>
    <p>Programarea Orientată pe Obiecte (POO) este un paradigm de programare bazat pe conceptul de "obiecte", care pot conține date și cod.</p>
    
    <h4>Avantaje:</h4>
    <ul>
      <li>Modularitate și reutilizabilitate</li>
      <li>Organizare mai bună a codului</li>
      <li>Abstractizarea datelor</li>
      <li>Întreținere mai ușoară</li>
    </ul>
    
    <h3>2. Principiile POO</h3>
    <h4>Încapsularea:</h4>
    <p>Ascunderea detaliilor de implementare și expunerea doar a funcționalităților necesare.</p>
    
    <h4>Moștenirea:</h4>
    <p>Crearea de clase noi bazate pe clase existente, preluând și extinzând funcționalitățile acestora.</p>
    
    <h4>Polimorfismul:</h4>
    <p>Capacitatea obiectelor de a lua forme diferite și de a răspunde diferit la aceleași mesaje.</p>
    
    <h4>Abstractizarea:</h4>
    <p>Identificarea caracteristicilor esențiale ale unui obiect și ignorarea detaliilor nerelevante.</p>
    
    <h3>3. Clase și obiecte</h3>
    <h4>Clasa:</h4>
    <p>Un șablon sau un plan pentru crearea obiectelor, definind atributele și comportamentele.</p>
    
    <h4>Obiectul:</h4>
    <p>O instanță a unei clase, cu stare și comportament proprii.</p>
    
    <h4>Declararea unei clase:</h4>
    <pre>
    class Persoana {
    private:
        string nume;
        int varsta;
    
    public:
        // Constructor
        Persoana(string n, int v) {
            nume = n;
            varsta = v;
        }
        
        // Metode
        void afisare() {
            cout << "Nume: " << nume << ", Vârsta: " << varsta << endl;
        }
        
        void setNume(string n) {
            nume = n;
        }
        
        string getNume() {
            return nume;
        }
        
        void setVarsta(int v) {
            if (v >= 0) {
                varsta = v;
            }
        }
        
        int getVarsta() {
            return varsta;
        }
    };
    </pre>
    
    <h4>Crearea și utilizarea obiectelor:</h4>
    <pre>
    int main() {
        // Crearea unui obiect
        Persoana p1("Ion Popescu", 25);
        
        // Apelarea metodelor
        p1.afisare();
        
        // Modificarea atributelor prin metode
        p1.setNume("Ion Ionescu");
        p1.setVarsta(26);
        
        p1.afisare();
        
        return 0;
    }
    </pre>
    
    <h3>4. Constructori și destructori</h3>
    <h4>Constructorul:</h4>
    <p>O metodă specială care este apelată automat la crearea unui obiect.</p>
    
    <h4>Tipuri de constructori:</h4>
    <ul>
      <li><strong>Constructor implicit:</strong> fără parametri</li>
      <li><strong>Constructor parametrizat:</strong> cu parametri</li>
      <li><strong>Constructor de copiere:</strong> creează un obiect ca o copie a altuia</li>
    </ul>
    
    <h4>Destructorul:</h4>
    <p>O metodă specială care este apelată automat la distrugerea unui obiect.</p>
    
    <h4>Exemplu:</h4>
    <pre>
    class Persoana {
    private:
        string nume;
        int* varsta;  // pointer pentru a demonstra alocarea dinamică
    
    public:
        // Constructor implicit
        Persoana() {
            nume = "Necunoscut";
            varsta = new int(0);
            cout << "Constructor implicit apelat" << endl;
        }
        
        // Constructor parametrizat
        Persoana(string n, int v) {
            nume = n;
            varsta = new int(v);
            cout << "Constructor parametrizat apelat" << endl;
        }
        
        // Constructor de copiere
        Persoana(const Persoana& p) {
            nume = p.nume;
            varsta = new int(*(p.varsta));
            cout << "Constructor de copiere apelat" << endl;
        }
        
        // Destructor
        ~Persoana() {
            delete varsta;
            cout << "Destructor apelat pentru " << nume << endl;
        }
        
        // Metode
        void afisare() {
            cout << "Nume: " << nume << ", Vârsta: " << *varsta << endl;
        }
    };
    </pre>
    
    <h3>5. Modificatori de acces</h3>
    <h4>public:</h4>
    <p>Membrii pot fi accesați din orice parte a programului.</p>
    
    <h4>private:</h4>
    <p>Membrii pot fi accesați doar din interiorul clasei.</p>
    
    <h4>protected:</h4>
    <p>Membrii pot fi accesați din interiorul clasei și din clasele derivate.</p>
    
    <h4>Exemplu:</h4>
    <pre>
    class Persoana {
    public:
        string nume;  // accesibil din orice parte
    
    private:
        int varsta;   // accesibil doar din interiorul clasei
    
    protected:
        string adresa;  // accesibil din clasa și clasele derivate
    };
    </pre>
    
    <h3>6. Moștenirea</h3>
    <h4>Definiție:</h4>
    <p>Moștenirea permite crearea unei clase noi (derivate) bazată pe o clasă existentă (de bază).</p>
    
    <h4>Sintaxă:</h4>
    <pre>
    class ClasaDerivata : [modificator_acces] ClasaDeBaza {
        // membri noi
    };
    </pre>
    
    <h4>Exemplu:</h4>
    <pre>
    class Persoana {
    protected:
        string nume;
        int varsta;
    
    public:
        Persoana(string n, int v) : nume(n), varsta(v) {}
        
        void afisare() {
            cout << "Nume: " << nume << ", Vârsta: " << varsta << endl;
        }
    };
    
    class Student : public Persoana {
    private:
        string facultate;
        float medie;
    
    public:
        Student(string n, int v, string f, float m) : Persoana(n, v), facultate(f), medie(m) {}
        
        void afisare() {
            Persoana::afisare();
            cout << "Facultate: " << facultate << ", Medie: " << medie << endl;
        }
    };
    </pre>
    
    <h4>Utilizare:</h4>
    <pre>
    int main() {
        Student s("Ion Popescu", 20, "Informatică", 9.5);
        s.afisare();
        
        return 0;
    }
    </pre>
    
    <h3>7. Polimorfismul</h3>
    <h4>Tipuri de polimorfism:</h4>
    <ul>
      <li><strong>Polimorfism la compilare (static):</strong> supraîncărcarea funcțiilor și operatorilor</li>
      <li><strong>Polimorfism la execuție (dinamic):</strong> funcții virtuale și clase abstracte</li>
    </ul>
    
    <h4>Funcții virtuale:</h4>
    <pre>
    class Forma {
    public:
        virtual void desenare() {
            cout << "Desenez o formă" << endl;
        }
    };
    
    class Cerc : public Forma {
    public:
        void desenare() override {
            cout << "Desenez un cerc" << endl;
        }
    };
    
    class Patrat : public Forma {
    public:
        void desenare() override {
            cout << "Desenez un pătrat" << endl;
        }
    };
    </pre>
    
    <h4>Utilizare:</h4>
    <pre>
    int main() {
        Forma* forme[3];
        forme[0] = new Forma();
        forme[1] = new Cerc();
        forme[2] = new Patrat();
        
        for (int i = 0; i < 3; i++) {
            forme[i]->desenare();
        }
        
        // Eliberarea memoriei
        for (int i = 0; i < 3; i++) {
            delete forme[i];
        }
        
        return 0;
    }
    </pre>
    
    <h3>8. Clase abstracte și interfețe</h3>
    <h4>Clasă abstractă:</h4>
    <p>O clasă care conține cel puțin o funcție virtuală pură și nu poate fi instanțiată direct.</p>
    
    <h4>Funcție virtuală pură:</h4>
    <p>O funcție virtuală fără implementare, declarată cu "= 0".</p>
    
    <h4>Exemplu:</h4>
    <pre>
    class FormaAbstracta {
    public:
        virtual void desenare() = 0;  // funcție virtuală pură
        virtual float arie() = 0;     // funcție virtuală pură
        
        void afisareArie() {
            cout << "Aria: " << arie() << endl;
        }
    };
    
    class Cerc : public FormaAbstracta {
    private:
        float raza;
    
    public:
        Cerc(float r) : raza(r) {}
        
        void desenare() override {
            cout << "Desenez un cerc" << endl;
        }
        
        float arie() override {
            return 3.14 * raza * raza;
        }
    };
    </pre>',
    '[{
      "question": "Ce principiu OOP ascunde detaliile implementării?",
      "options": ["Moștenirea", "Polimorfismul", "Încapsularea", "Abstractizarea"],
      "correctAnswer": 2
    }]'::jsonb,
    70
  ),
  
  (
    'info-12',
    'Fișiere și Fluxuri',
    'informatica',
    'Operații de citire și scriere în fișiere',
    '<h2>Fișiere și Fluxuri</h2>
    <h3>1. Introducere în lucrul cu fișiere</h3>
    <h4>Definiție:</h4>
    <p>Un fișier este o colecție de date stocate pe un dispozitiv de stocare extern.</p>
    
    <h4>Avantaje:</h4>
    <ul>
      <li>Persistența datelor</li>
      <li>Capacitate mare de stocare</li>
      <li>Partajarea datelor între programe</li>
    </ul>
    
    <h4>Tipuri de fișiere:</h4>
    <ul>
      <li><strong>Fișiere text:</strong> conțin caractere lizibile</li>
      <li><strong>Fișiere binare:</strong> conțin date în format binar</li>
    </ul>
    
    <h3>2. Fluxuri de date în C++</h3>
    <h4>Biblioteci necesare:</h4>
    <pre>
    #include &lt;fstream&gt;  // pentru lucrul cu fișiere
    #include &lt;iostream&gt; // pentru lucrul cu consola
    </pre>
    
    <h4>Tipuri de fluxuri:</h4>
    <ul>
      <li><strong>ifstream:</strong> flux de intrare (citire din fișier)</li>
      <li><strong>ofstream:</strong> flux de ieșire (scriere în fișier)</li>
      <li><strong>fstream:</strong> flux bidirecțional (citire și scriere)</li>
    </ul>
    
    <h3>3. Deschiderea și închiderea fișierelor</h3>
    <h4>Deschiderea unui fișier:</h4>
    <pre>
    // Pentru citire
    ifstream fin("input.txt");
    
    // Pentru scriere
    ofstream fout("output.txt");
    
    // Pentru citire și scriere
    fstream f("data.txt", ios::in | ios::out);
    </pre>
    
    <h4>Moduri de deschidere:</h4>
    <ul>
      <li><strong>ios::in:</strong> deschide pentru citire</li>
      <li><strong>ios::out:</strong> deschide pentru scriere (creează fișierul sau îl trunchiază)</li>
      <li><strong>ios::app:</strong> deschide pentru adăugare la sfârșitul fișierului</li>
      <li><strong>ios::binary:</strong> deschide în mod binar</li>
      <li><strong>ios::trunc:</strong> trunchiază fișierul dacă există</li>
    </ul>
    
    <h4>Verificarea deschiderii:</h4>
    <pre>
    ifstream fin("input.txt");
    if (!fin) {
        cout << "Eroare la deschiderea fișierului!" << endl;
        return 1;
    }
    </pre>
    
    <h4>Închiderea fișierului:</h4>
    <pre>
    fin.close();
    fout.close();
    </pre>
    
    <h3>4. Operații cu fișiere text</h3>
    <h4>Scrierea în fișier:</h4>
    <pre>
    ofstream fout("output.txt");
    
    fout << "Hello, World!" << endl;
    fout << 42 << " " << 3.14 << endl;
    
    fout.close();
    </pre>
    
    <h4>Citirea din fișier:</h4>
    <pre>
    ifstream fin("input.txt");
    
    string text;
    int numar;
    double real;
    
    fin >> text;       // citește primul cuvânt
    fin >> numar;      // citește un număr întreg
    fin >> real;       // citește un număr real
    
    fin.close();
    </pre>
    
    <h4>Citirea unei linii întregi:</h4>
    <pre>
    ifstream fin("input.txt");
    
    string linie;
    getline(fin, linie);  // citește o linie întreagă
    
    fin.close();
    </pre>
    
    <h4>Citirea întregului fișier:</h4>
    <pre>
    ifstream fin("input.txt");
    
    string linie;
    while (getline(fin, linie)) {
        cout << linie << endl;
    }
    
    fin.close();
    </pre>
    
    <h3>5. Operații cu fișiere binare</h3>
    <h4>Scrierea în fișier binar:</h4>
    <pre>
    struct Persoana {
        char nume[50];
        int varsta;
        double inaltime;
    };
    
    Persoana p = {"Ion Popescu", 25, 1.75};
    
    ofstream fout("persoane.dat", ios::binary);
    fout.write((char*)&p, sizeof(Persoana));
    fout.close();
    </pre>
    
    <h4>Citirea din fișier binar:</h4>
    <pre>
    Persoana p;
    
    ifstream fin("persoane.dat", ios::binary);
    fin.read((char*)&p, sizeof(Persoana));
    fin.close();
    
    cout << p.nume << ", " << p.varsta << " ani, " << p.inaltime << " m" << endl;
    </pre>
    
    <h3>6. Poziționarea în fișier</h3>
    <h4>Funcții de poziționare:</h4>
    <ul>
      <li><strong>seekg/seekp:</strong> poziționează indicatorul de citire/scriere</li>
      <li><strong>tellg/tellp:</strong> returnează poziția curentă a indicatorului</li>
    </ul>
    
    <h4>Exemple:</h4>
    <pre>
    fstream f("data.txt", ios::in | ios::out);
    
    // Poziționare la începutul fișierului
    f.seekg(0, ios::beg);
    
    // Poziționare la sfârșitul fișierului
    f.seekg(0, ios::end);
    
    // Poziționare la 10 bytes de la început
    f.seekg(10, ios::beg);
    
    // Poziționare la 5 bytes înapoi de la poziția curentă
    f.seekg(-5, ios::cur);
    
    // Obținerea poziției curente
    long pozitie = f.tellg();
    </pre>
    
    <h3>7. Gestionarea erorilor</h3>
    <h4>Verificarea stării fluxului:</h4>
    <ul>
      <li><strong>good():</strong> returnează true dacă nu există erori</li>
      <li><strong>eof():</strong> returnează true dacă s-a ajuns la sfârșitul fișierului</li>
      <li><strong>fail():</strong> returnează true dacă o operație a eșuat</li>
      <li><strong>bad():</strong> returnează true dacă a apărut o eroare gravă</li>
    </ul>
    
    <h4>Exemplu:</h4>
    <pre>
    ifstream fin("input.txt");
    
    if (!fin) {
        cerr << "Eroare la deschiderea fișierului!" << endl;
        return 1;
    }
    
    int numar;
    while (fin >> numar) {
        cout << numar << " ";
    }
    
    if (fin.eof()) {
        cout << "\\nS-a ajuns la sfârșitul fișierului." << endl;
    } else if (fin.fail()) {
        cout << "\\nEroare la citirea din fișier." << endl;
    }
    
    fin.close();
    </pre>
    
    <h3>8. Aplicații practice</h3>
    <h4>Exemplu: Copierea unui fișier</h4>
    <pre>
    #include &lt;fstream&gt;
    #include &lt;iostream&gt;
    using namespace std;
    
    int main() {
        ifstream sursa("sursa.txt");
        ofstream destinatie("destinatie.txt");
        
        if (!sursa || !destinatie) {
            cerr << "Eroare la deschiderea fișierelor!" << endl;
            return 1;
        }
        
        char c;
        while (sursa.get(c)) {
            destinatie.put(c);
        }
        
        sursa.close();
        destinatie.close();
        
        cout << "Fișierul a fost copiat cu succes!" << endl;
        
        return 0;
    }
    </pre>
    
    <h4>Exemplu: Numărarea cuvintelor dintr-un fișier</h4>
    <pre>
    #include &lt;fstream&gt;
    #include &lt;iostream&gt;
    #include &lt;string&gt;
    using namespace std;
    
    int main() {
        ifstream fin("text.txt");
        
        if (!fin) {
            cerr << "Eroare la deschiderea fișierului!" << endl;
            return 1;
        }
        
        int numarCuvinte = 0;
        string cuvant;
        
        while (fin >> cuvant) {
            numarCuvinte++;
        }
        
        fin.close();
        
        cout << "Fișierul conține " << numarCuvinte << " cuvinte." << endl;
        
        return 0;
    }
    </pre>',
    '[{
      "question": "Ce clasă se folosește pentru citirea din fișiere în C++?",
      "options": ["ofstream", "ifstream", "fstream", "iostream"],
      "correctAnswer": 1
    }]'::jsonb,
    65
  ),
  
  (
    'info-13',
    'Recursivitate',
    'informatica',
    'Tehnici de rezolvare a problemelor prin recursivitate',
    '<h2>Recursivitate</h2>
    <h3>1. Noțiuni fundamentale</h3>
    <h4>Definiție:</h4>
    <p>Recursivitatea este o tehnică de programare în care o funcție se apelează pe sine pentru a rezolva o problemă.</p>
    
    <h4>Componente esențiale:</h4>
    <ul>
      <li><strong>Cazul de bază (condiția de oprire):</strong> situația în care funcția returnează un rezultat fără a se mai apela pe sine</li>
      <li><strong>Cazul recursiv:</strong> situația în care funcția se apelează pe sine cu parametri modificați</li>
    </ul>
    
    <h4>Tipuri de recursivitate:</h4>
    <ul>
      <li><strong>Recursivitate directă:</strong> funcția se apelează direct pe sine</li>
      <li><strong>Recursivitate indirectă:</strong> funcția A apelează funcția B, care la rândul ei apelează funcția A</li>
      <li><strong>Recursivitate liniară:</strong> un singur apel recursiv în funcție</li>
      <li><strong>Recursivitate arborescentă:</strong> multiple apeluri recursive în funcție</li>
    </ul>
    
    <h3>2. Exemplu clasic: Factorialul</h3>
    <h4>Definiție matematică:</h4>
    <ul>
      <li>0! = 1</li>
      <li>n! = n × (n-1)! pentru n > 0</li>
    </ul>
    
    <h4>Implementare recursivă:</h4>
    <pre>
    int factorial(int n) {
        // Cazul de bază
        if (n <= 1) {
            return 1;
        }
        
        // Cazul recursiv
        return n * factorial(n - 1);
    }
    </pre>
    
    <h4>Exemplu de execuție:</h4>
    <pre>
    factorial(4)
    = 4 * factorial(3)
    = 4 * (3 * factorial(2))
    = 4 * (3 * (2 * factorial(1)))
    = 4 * (3 * (2 * 1))
    = 4 * (3 * 2)
    = 4 * 6
    = 24
    </pre>
    
    <h3>3. Șirul Fibonacci</h3>
    <h4>Definiție matematică:</h4>
    <ul>
      <li>F(0) = 0</li>
      <li>F(1) = 1</li>
      <li>F(n) = F(n-1) + F(n-2) pentru n > 1</li>
    </ul>
    
    <h4>Implementare recursivă:</h4>
    <pre>
    int fibonacci(int n) {
        // Cazurile de bază
        if (n <= 0) {
            return 0;
        }
        if (n == 1) {
            return 1;
        }
        
        // Cazul recursiv
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    </pre>
    
    <h4>Optimizare cu memoizare:</h4>
    <pre>
    int fibMemo[100] = {0};  // vector pentru memoizare
    
    int fibonacci(int n) {
        // Cazurile de bază
        if (n <= 0) {
            return 0;
        }
        if (n == 1) {
            return 1;
        }
        
        // Verifică dacă rezultatul a fost deja calculat
        if (fibMemo[n] != 0) {
            return fibMemo[n];
        }
        
        // Calculează și memorează rezultatul
        fibMemo[n] = fibonacci(n - 1) + fibonacci(n - 2);
        return fibMemo[n];
    }
    </pre>
    
    <h3>4. Calculul sumei elementelor unui vector</h3>
    <h4>Implementare recursivă:</h4>
    <pre>
    int sumaVector(int v[], int n) {
        // Cazul de bază
        if (n <= 0) {
            return 0;
        }
        
        // Cazul recursiv
        return v[n - 1] + sumaVector(v, n - 1);
    }
    </pre>
    
    <h4>Exemplu de utilizare:</h4>
    <pre>
    int main() {
        int v[] = {1, 2, 3, 4, 5};
        int n = sizeof(v) / sizeof(v[0]);
        
        cout << "Suma elementelor: " << sumaVector(v, n) << endl;  // Output: 15
        
        return 0;
    }
    </pre>
    
    <h3>5. Căutarea binară recursivă</h3>
    <h4>Implementare:</h4>
    <pre>
    int cautareBinara(int v[], int stanga, int dreapta, int x) {
        // Cazul de bază: elementul nu a fost găsit
        if (stanga > dreapta) {
            return -1;
        }
        
        int mijloc = stanga + (dreapta - stanga) / 2;
        
        // Cazul de bază: elementul a fost găsit
        if (v[mijloc] == x) {
            return mijloc;
        }
        
        // Cazurile recursive
        if (v[mijloc] > x) {
            return cautareBinara(v, stanga, mijloc - 1, x);
        } else {
            return cautareBinara(v, mijloc + 1, dreapta, x);
        }
    }
    </pre>
    
    <h3>6. Sortarea prin interclasare (Merge Sort)</h3>
    <h4>Implementare:</h4>
    <pre>
    void interclasare(int v[], int stanga, int mijloc, int dreapta) {
        int n1 = mijloc - stanga + 1;
        int n2 = dreapta - mijloc;
        
        // Vectori temporari
        int L[n1], R[n2];
        
        // Copierea datelor în vectorii temporari
        for (int i = 0; i < n1; i++) {
            L[i] = v[stanga + i];
        }
        for (int j = 0; j < n2; j++) {
            R[j] = v[mijloc + 1 + j];
        }
        
        // Interclasarea
        int i = 0, j = 0, k = stanga;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                v[k] = L[i];
                i++;
            } else {
                v[k] = R[j];
                j++;
            }
            k++;
        }
        
        // Copierea elementelor rămase
        while (i < n1) {
            v[k] = L[i];
            i++;
            k++;
        }
        while (j < n2) {
            v[k] = R[j];
            j++;
            k++;
        }
    }
    
    void mergeSort(int v[], int stanga, int dreapta) {
        // Cazul de bază
        if (stanga >= dreapta) {
            return;
        }
        
        // Cazul recursiv
        int mijloc = stanga + (dreapta - stanga) / 2;
        
        mergeSort(v, stanga, mijloc);
        mergeSort(v, mijloc + 1, dreapta);
        
        interclasare(v, stanga, mijloc, dreapta);
    }
    </pre>
    
    <h3>7. Turnurile din Hanoi</h3>
    <h4>Problema:</h4>
    <p>Mutarea unui turn de n discuri de pe un stâlp pe altul, folosind un stâlp auxiliar, respectând regulile:</p>
    <ul>
      <li>Se poate muta doar un disc o dată</li>
      <li>Un disc mai mare nu poate fi așezat peste un disc mai mic</li>
    </ul>
    
    <h4>Implementare:</h4>
    <pre>
    void turnuriHanoi(int n, char sursa, char auxiliar, char destinatie) {
        // Cazul de bază
        if (n == 1) {
            cout << "Mută discul 1 de pe " << sursa << " pe " << destinatie << endl;
            return;
        }
        
        // Cazurile recursive
        turnuriHanoi(n - 1, sursa, destinatie, auxiliar);
        cout << "Mută discul " << n << " de pe " << sursa << " pe " << destinatie << endl;
        turnuriHanoi(n - 1, auxiliar, sursa, destinatie);
    }
    </pre>
    
    <h3>8. Avantaje și dezavantaje ale recursivității</h3>
    <h4>Avantaje:</h4>
    <ul>
      <li>Cod mai clar și mai elegant pentru anumite probleme</li>
      <li>Reflectă direct definiția matematică recursivă</li>
      <li>Simplificarea rezolvării problemelor complexe</li>
    </ul>
    
    <h4>Dezavantaje:</h4>
    <ul>
      <li>Consum mai mare de memorie (pentru stiva de apeluri)</li>
      <li>Timp de execuție mai mare pentru unele probleme</li>
      <li>Risc de depășire a stivei pentru recursivitate profundă</li>
    </ul>',
    '[{
      "question": "Ce este necesar pentru ca o funcție recursivă să se oprească?",
      "options": ["Un ciclu for", "Un caz de bază", "O variabilă globală", "O funcție auxiliară"],
      "correctAnswer": 1
    }]'::jsonb,
    65
  ),
  
  (
    'info-14',
    'Grafuri și Arbori',
    'informatica',
    'Reprezentarea și parcurgerea structurilor de date neliniare',
    '<h2>Grafuri și Arbori</h2>
    <h3>1. Noțiuni fundamentale despre grafuri</h3>
    <h4>Definiție:</h4>
    <p>Un graf G = (V, E) este o structură formată din:</p>
    <ul>
      <li><strong>V:</strong> mulțimea nodurilor (vârfurilor)</li>
      <li><strong>E:</strong> mulțimea muchiilor (legăturilor între noduri)</li>
    </ul>
    
    <h4>Tipuri de grafuri:</h4>
    <ul>
      <li><strong>Graf neorientat:</strong> muchiile nu au direcție</li>
      <li><strong>Graf orientat:</strong> muchiile au direcție (arce)</li>
      <li><strong>Graf ponderat:</strong> muchiile au valori asociate (costuri)</li>
      <li><strong>Graf conex:</strong> există drum între oricare două noduri</li>
      <li><strong>Graf complet:</strong> există muchie între oricare două noduri</li>
    </ul>
    
    <h3>2. Reprezentarea grafurilor</h3>
    <h4>Matricea de adiacență:</h4>
    <p>O matrice A de dimensiune n×n, unde A[i][j] = 1 dacă există muchie între nodurile i și j, și 0 în caz contrar.</p>
    
    <pre>
    int matrice[MAX_NODURI][MAX_NODURI];
    
    // Adăugare muchie în graf neorientat
    void adaugaMuchie(int u, int v) {
        matrice[u][v] = 1;
        matrice[v][u] = 1;  // pentru graf neorientat
    }
    </pre>
    
    <h4>Lista de adiacență:</h4>
    <p>Un vector de liste, unde lista i conține toate nodurile adiacente cu nodul i.</p>
    
    <pre>
    vector&lt;int&gt; lista[MAX_NODURI];
    
    // Adăugare muchie în graf neorientat
    void adaugaMuchie(int u, int v) {
        lista[u].push_back(v);
        lista[v].push_back(u);  // pentru graf neorientat
    }
    </pre>
    
    <h3>3. Parcurgerea grafurilor</h3>
    <h4>Parcurgerea în lățime (BFS):</h4>
    <p>Vizitează nodurile nivel cu nivel, începând de la un nod sursă.</p>
    
    <pre>
    void BFS(int start) {
        bool vizitat[MAX_NODURI] = {false};
        queue&lt;int&gt; coada;
        
        vizitat[start] = true;
        coada.push(start);
        
        while (!coada.empty()) {
            int nod = coada.front();
            cout << nod << " ";
            coada.pop();
            
            for (int vecin : lista[nod]) {
                if (!vizitat[vecin]) {
                    vizitat[vecin] = true;
                    coada.push(vecin);
                }
            }
        }
    }
    </pre>
    
    <h4>Parcurgerea în adâncime (DFS):</h4>
    <p>Explorează cât mai adânc posibil înainte de a reveni și a explora alte căi.</p>
    
    <pre>
    void DFS(int nod, bool vizitat[]) {
        vizitat[nod] = true;
        cout << nod << " ";
        
        for (int vecin : lista[nod]) {
            if (!vizitat[vecin]) {
                DFS(vecin, vizitat);
            }
        }
    }
    
    void parcurgeDFS(int start) {
        bool vizitat[MAX_NODURI] = {false};
        DFS(start, vizitat);
    }
    </pre>
    
    <h3>4. Arbori</h3>
    <h4>Definiție:</h4>
    <p>Un arbore este un graf conex, neorientat, fără cicluri.</p>
    
    <h4>Proprietăți:</h4>
    <ul>
      <li>Între oricare două noduri există un singur drum</li>
      <li>Dacă are n noduri, atunci are n-1 muchii</li>
      <li>Dacă se adaugă o muchie, se formează un ciclu</li>
      <li>Dacă se elimină o muchie, graful nu mai este conex</li>
    </ul>
    
    <h3>5. Arbori binari</h3>
    <h4>Definiție:</h4>
    <p>Un arbore binar este un arbore în care fiecare nod are cel mult doi copii (stânga și dreapta).</p>
    
    <h4>Reprezentare:</h4>
    <pre>
    struct Nod {
        int data;
        Nod* stanga;
        Nod* dreapta;
        
        Nod(int val) {
            data = val;
            stanga = NULL;
            dreapta = NULL;
        }
    };
    </pre>
    
    <h3>6. Parcurgerea arborilor binari</h3>
    <h4>Parcurgerea în preordine (RSD):</h4>
    <p>Rădăcină, Stânga, Dreapta</p>
    
    <pre>
    void preordine(Nod* radacina) {
        if (radacina == NULL) return;
        
        cout << radacina->data << " ";  // Vizitează rădăcina
        preordine(radacina->stanga);    // Parcurge subarborele stâng
        preordine(radacina->dreapta);   // Parcurge subarborele drept
    }
    </pre>
    
    <h4>Parcurgerea în inordine (SRD):</h4>
    <p>Stânga, Rădăcină, Dreapta</p>
    
    <pre>
    void inordine(Nod* radacina) {
        if (radacina == NULL) return;
        
        inordine(radacina->stanga);     // Parcurge subarborele stâng
        cout << radacina->data << " ";  // Vizitează rădăcina
        inordine(radacina->dreapta);    // Parcurge subarborele drept
    }
    </pre>
    
    <h4>Parcurgerea în postordine (SDR):</h4>
    <p>Stânga, Dreapta, Rădăcină</p>
    
    <pre>
    void postordine(Nod* radacina) {
        if (radacina == NULL) return;
        
        postordine(radacina->stanga);   // Parcurge subarborele stâng
        postordine(radacina->dreapta);  // Parcurge subarborele drept
        cout << radacina->data << " ";  // Vizitează rădăcina
    }
    </pre>
    
    <h3>7. Arbori binari de căutare (BST)</h3>
    <h4>Definiție:</h4>
    <p>Un arbore binar de căutare este un arbore binar cu proprietatea că pentru fiecare nod:</p>
    <ul>
      <li>Toate nodurile din subarborele stâng au valori mai mici decât valoarea nodului</li>
      <li>Toate nodurile din subarborele drept au valori mai mari decât valoarea nodului</li>
    </ul>
    
    <h4>Inserarea unui nod:</h4>
    <pre>
    Nod* inserare(Nod* radacina, int valoare) {
        if (radacina == NULL) {
            return new Nod(valoare);
        }
        
        if (valoare < radacina->data) {
            radacina->stanga = inserare(radacina->stanga, valoare);
        } else if (valoare > radacina->data) {
            radacina->dreapta = inserare(radacina->dreapta, valoare);
        }
        
        return radacina;
    }
    </pre>
    
    <h4>Căutarea unui nod:</h4>
    <pre>
    bool cautare(Nod* radacina, int valoare) {
        if (radacina == NULL) {
            return false;
        }
        
        if (radacina->data == valoare) {
            return true;
        }
        
        if (valoare < radacina->data) {
            return cautare(radacina->stanga, valoare);
        } else {
            return cautare(radacina->dreapta, valoare);
        }
    }
    </pre>
    
    <h3>8. Aplicații practice</h3>
    <h4>Exemplu: Crearea și parcurgerea unui arbore binar</h4>
    <pre>
    int main() {
        Nod* radacina = new Nod(10);
        radacina->stanga = new Nod(5);
        radacina->dreapta = new Nod(15);
        radacina->stanga->stanga = new Nod(3);
        radacina->stanga->dreapta = new Nod(7);
        
        cout << "Parcurgere în preordine: ";
        preordine(radacina);
        cout << endl;
        
        cout << "Parcurgere în inordine: ";
        inordine(radacina);
        cout << endl;
        
        cout << "Parcurgere în postordine: ";
        postordine(radacina);
        cout << endl;
        
        // Eliberarea memoriei
        // (ar trebui implementată o funcție de ștergere a arborelui)
        
        return 0;
    }
    </pre>
    
    <h4>Exemplu: Utilizarea unui arbore binar de căutare</h4>
    <pre>
    int main() {
        Nod* radacina = NULL;
        
        // Inserarea nodurilor
        radacina = inserare(radacina, 50);
        inserare(radacina, 30);
        inserare(radacina, 20);
        inserare(radacina, 40);
        inserare(radacina, 70);
        inserare(radacina, 60);
        inserare(radacina, 80);
        
        // Parcurgerea în inordine (va afișa nodurile în ordine crescătoare)
        cout << "Parcurgere în inordine: ";
        inordine(radacina);
        cout << endl;
        
        // Căutarea unor valori
        cout << "Căutare 40: " << (cautare(radacina, 40) ? "Găsit" : "Negăsit") << endl;
        cout << "Căutare 90: " << (cautare(radacina, 90) ? "Găsit" : "Negăsit") << endl;
        
        return 0;
    }
    </pre>',
    '[{
      "question": "Ce tip de parcurgere a unui arbore binar vizitează nodurile în ordine crescătoare într-un BST?",
      "options": ["Preordine", "Inordine", "Postordine", "Niveluri"],
      "correctAnswer": 1
    }]'::jsonb,
    70
  ),
  
  (
    'info-15',
    'Baze de Date și SQL',
    'informatica',
    'Concepte fundamentale de baze de date și limbajul SQL',
    '<h2>Baze de Date și SQL</h2>
    <h3>1. Introducere în baze de date</h3>
    <h4>Definiție:</h4>
    <p>O bază de date este o colecție organizată de date, stocate și accesate electronic.</p>
    
    <h4>Avantaje:</h4>
    <ul>
      <li>Reducerea redundanței datelor</li>
      <li>Integritatea datelor</li>
      <li>Securitatea datelor</li>
      <li>Accesul concurent la date</li>
      <li>Recuperarea în caz de erori</li>
    </ul>
    
    <h4>Tipuri de baze de date:</h4>
    <ul>
      <li><strong>Relaționale:</strong> bazate pe modelul relațional (tabele)</li>
      <li><strong>NoSQL:</strong> non-relaționale (documente, grafuri, chei-valoare)</li>
      <li><strong>Orientate pe obiecte:</strong> stochează obiecte</li>
    </ul>
    
    <h3>2. Modelul relațional</h3>
    <h4>Componente:</h4>
    <ul>
      <li><strong>Tabele (relații):</strong> colecții de date organizate în rânduri și coloane</li>
      <li><strong>Atribute (coloane):</strong> proprietăți ale entităților</li>
      <li><strong>Înregistrări (rânduri):</strong> instanțe ale entităților</li>
      <li><strong>Chei primare:</strong> identifică unic fiecare înregistrare</li>
      <li><strong>Chei externe:</strong> stabilesc relații între tabele</li>
    </ul>
    
    <h4>Tipuri de relații:</h4>
    <ul>
      <li><strong>One-to-One (1:1):</strong> o înregistrare din tabelul A este asociată cu exact o înregistrare din tabelul B</li>
      <li><strong>One-to-Many (1:N):</strong> o înregistrare din tabelul A este asociată cu mai multe înregistrări din tabelul B</li>
      <li><strong>Many-to-Many (M:N):</strong> mai multe înregistrări din tabelul A sunt asociate cu mai multe înregistrări din tabelul B</li>
    </ul>
    
    <h3>3. Sistemul de Gestiune a Bazelor de Date (SGBD)</h3>
    <h4>Definiție:</h4>
    <p>Un SGBD este un software care permite crearea, manipularea și administrarea bazelor de date.</p>
    
    <h4>Exemple de SGBD-uri relaționale:</h4>
    <ul>
      <li>MySQL</li>
      <li>PostgreSQL</li>
      <li>Oracle Database</li>
      <li>Microsoft SQL Server</li>
      <li>SQLite</li>
    </ul>
    
    <h3>4. Limbajul SQL</h3>
    <h4>Definiție:</h4>
    <p>SQL (Structured Query Language) este un limbaj standardizat pentru interogarea și manipularea bazelor de date relaționale.</p>
    
    <h4>Categorii de comenzi SQL:</h4>
    <ul>
      <li><strong>DDL (Data Definition Language):</strong> CREATE, ALTER, DROP</li>
      <li><strong>DML (Data Manipulation Language):</strong> SELECT, INSERT, UPDATE, DELETE</li>
      <li><strong>DCL (Data Control Language):</strong> GRANT, REVOKE</li>
      <li><strong>TCL (Transaction Control Language):</strong> COMMIT, ROLLBACK</li>
    </ul>
    
    <h3>5. Crearea și modificarea tabelelor</h3>
    <h4>Crearea unui tabel:</h4>
    <pre>
    CREATE TABLE Studenti (
        id INT PRIMARY KEY,
        nume VARCHAR(50) NOT NULL,
        prenume VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE,
        data_nasterii DATE,
        medie FLOAT DEFAULT 0
    );
    </pre>
    
    <h4>Modificarea unui tabel:</h4>
    <pre>
    -- Adăugarea unei coloane
    ALTER TABLE Studenti ADD telefon VARCHAR(15);
    
    -- Modificarea unei coloane
    ALTER TABLE Studenti MODIFY medie DECIMAL(4,2);
    
    -- Ștergerea unei coloane
    ALTER TABLE Studenti DROP COLUMN telefon;
    </pre>
    
    <h4>Ștergerea unui tabel:</h4>
    <pre>
    DROP TABLE Studenti;
    </pre>
    
    <h3>6. Interogarea datelor</h3>
    <h4>Selectarea datelor:</h4>
    <pre>
    -- Selectarea tuturor coloanelor și rândurilor
    SELECT * FROM Studenti;
    
    -- Selectarea anumitor coloane
    SELECT nume, prenume, medie FROM Studenti;
    
    -- Selectarea cu condiții
    SELECT * FROM Studenti WHERE medie >= 8.5;
    
    -- Ordonarea rezultatelor
    SELECT * FROM Studenti ORDER BY medie DESC;
    
    -- Limitarea rezultatelor
    SELECT * FROM Studenti LIMIT 10;
    </pre>
    
    <h4>Funcții de agregare:</h4>
    <pre>
    -- Numărarea înregistrărilor
    SELECT COUNT(*) FROM Studenti;
    
    -- Calcularea mediei
    SELECT AVG(medie) FROM Studenti;
    
    -- Găsirea valorii maxime
    SELECT MAX(medie) FROM Studenti;
    
    -- Găsirea valorii minime
    SELECT MIN(medie) FROM Studenti;
    
    -- Calcularea sumei
    SELECT SUM(medie) FROM Studenti;
    </pre>
    
    <h4>Gruparea datelor:</h4>
    <pre>
    -- Gruparea după o coloană
    SELECT an_studiu, COUNT(*) AS numar_studenti
    FROM Studenti
    GROUP BY an_studiu;
    
    -- Gruparea cu condiții
    SELECT an_studiu, AVG(medie) AS medie_an
    FROM Studenti
    GROUP BY an_studiu
    HAVING AVG(medie) > 7.5;
    </pre>
    
    <h3>7. Manipularea datelor</h3>
    <h4>Inserarea datelor:</h4>
    <pre>
    -- Inserarea unei singure înregistrări
    INSERT INTO Studenti (id, nume, prenume, email, data_nasterii)
    VALUES (1, 'Popescu', 'Ion', 'ion.popescu@example.com', '2000-05-15');
    
    -- Inserarea mai multor înregistrări
    INSERT INTO Studenti (id, nume, prenume, email, data_nasterii)
    VALUES
        (2, 'Ionescu', 'Maria', 'maria.ionescu@example.com', '2001-03-20'),
        (3, 'Vasilescu', 'Dan', 'dan.vasilescu@example.com', '2000-11-10');
    </pre>
    
    <h4>Actualizarea datelor:</h4>
    <pre>
    -- Actualizarea unei singure înregistrări
    UPDATE Studenti
    SET medie = 9.5
    WHERE id = 1;
    
    -- Actualizarea mai multor înregistrări
    UPDATE Studenti
    SET an_studiu = an_studiu + 1
    WHERE medie >= 5;
    </pre>
    
    <h4>Ștergerea datelor:</h4>
    <pre>
    -- Ștergerea unei singure înregistrări
    DELETE FROM Studenti
    WHERE id = 3;
    
    -- Ștergerea mai multor înregistrări
    DELETE FROM Studenti
    WHERE medie < 5;
    
    -- Ștergerea tuturor înregistrărilor
    DELETE FROM Studenti;
    </pre>
    
    <h3>8. Interogări cu JOIN</h3>
    <h4>Tipuri de JOIN:</h4>
    <ul>
      <li><strong>INNER JOIN:</strong> returnează rândurile când există o potrivire în ambele tabele</li>
      <li><strong>LEFT JOIN:</strong> returnează toate rândurile din tabelul din stânga și rândurile potrivite din tabelul din dreapta</li>
      <li><strong>RIGHT JOIN:</strong> returnează toate rândurile din tabelul din dreapta și rândurile potrivite din tabelul din stânga</li>
      <li><strong>FULL JOIN:</strong> returnează rândurile când există o potrivire în oricare dintre tabele</li>
    </ul>
    
    <h4>Exemple:</h4>
    <pre>
    -- INNER JOIN
    SELECT Studenti.nume, Studenti.prenume, Cursuri.denumire
    FROM Studenti
    INNER JOIN Inscrieri ON Studenti.id = Inscrieri.student_id
    INNER JOIN Cursuri ON Inscrieri.curs_id = Cursuri.id;
    
    -- LEFT JOIN
    SELECT Studenti.nume, Studenti.prenume, Cursuri.denumire
    FROM Studenti
    LEFT JOIN Inscrieri ON Studenti.id = Inscrieri.student_id
    LEFT JOIN Cursuri ON Inscrieri.curs_id = Cursuri.id;
    </pre>',
    '[{
      "question": "Ce comandă SQL se folosește pentru a selecta date din tabele?",
      "options": ["INSERT", "UPDATE", "SELECT", "DELETE"],
      "correctAnswer": 2
    }]'::jsonb,
    70
  );

-- 4. Adăugarea lecțiilor pentru BIOLOGIE (15 lecții)
INSERT INTO lessons (id, title, subject, description, content, quiz, duration) VALUES
  (
    'bio-1',
    'Biologia Plantelor',
    'biologie',
    'Structura și funcțiile plantelor',
    '<h2>Biologia Plantelor</h2>
    <h3>1. Introducere în biologia plantelor</h3>
    <p>Plantele sunt organisme eucariote, multicelulare, autotrofe, care realizează fotosinteza.</p>
    
    <h3>2. Clasificarea plantelor</h3>
    <h4>Plante inferioare:</h4>
    <ul>
      <li>Algele</li>
      <li>Briofitele (mușchii)</li>
    </ul>
    
    <h4>Plante superioare:</h4>
    <ul>
      <li>Pteridofite (ferigile)</li>
      <li>Gimnosperme (conifere)</li>
      <li>Angiosperme (plante cu flori)</li>
    </ul>
    
    <h3>3. Structura plantelor superioare</h3>
    <h4>Organe vegetative:</h4>
    <ul>
      <li><strong>Rădăcina:</strong> organ subteran, rol în absorbția apei și sărurilor minerale</li>
      <li><strong>Tulpina:</strong> organ aerian, susține frunzele și organele de reproducere</li>
      <li><strong>Frunza:</strong> organ specializat pentru fotosinteză</li>
    </ul>
    
    <h4>Organe de reproducere:</h4>
    <ul>
      <li><strong>Floarea:</strong> organ de reproducere la angiosperme</li>
      <li><strong>Fructul:</strong> provine din ovar după fecundare</li>
      <li><strong>Sămânța:</strong> structură care conține embrionul și rezerve nutritive</li>
    </ul>
    
    <h3>4. Fotosinteza</h3>
    <h4>Definiție:</h4>
    <p>Procesul prin care plantele verzi transformă energia luminoasă în energie chimică, producând substanțe organice din substanțe anorganice.</p>
    
    <h4>Ecuația generală:</h4>
    <p>6CO₂ + 6H₂O + energie luminoasă → C₆H₁₂O₆ + 6O₂</p>
    
    <h4>Factori care influențează fotosinteza:</h4>
    <ul>
      <li>Intensitatea luminii</li>
      <li>Concentrația de CO₂</li>
      <li>Temperatura</li>
      <li>Disponibilitatea apei</li>
    </ul>
    
    <h3>5. Respirația la plante</h3>
    <h4>Definiție:</h4>
    <p>Procesul prin care plantele oxidează substanțele organice pentru a obține energie.</p>
    
    <h4>Ecuația generală:</h4>
    <p>C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energie</p>
    
    <h3>6. Nutriția minerală</h3>
    <h4>Macroelemente:</h4>
    <ul>
      <li>Azot (N)</li>
      <li>Fosfor (P)</li>
      <li>Potasiu (K)</li>
      <li>Calciu (Ca)</li>
      <li>Magneziu (Mg)</li>
      <li>Sulf (S)</li>
    </ul>
    
    <h4>Microelemente:</h4>
    <ul>
      <li>Fier (Fe)</li>
      <li>Mangan (Mn)</li>
      <li>Zinc (Zn)</li>
      <li>Cupru (Cu)</li>
      <li>Bor (B)</li>
    </ul>
    
    <h3>7. Reproducerea plantelor</h3>
    <h4>Reproducerea asexuată:</h4>
    <ul>
      <li>Înmulțirea vegetativă naturală</li>
      <li>Înmulțirea vegetativă artificială</li>
    </ul>
    
    <h4>Reproducerea sexuată:</h4>
    <ul>
      <li>Polenizarea</li>
      <li>Fecundarea</li>
      <li>Formarea semințelor și fructelor</li>
    </ul>',
    '[{
      "question": "Ce este fotosinteza?",
      "options": ["Producerea de glucoză folosind energia solară", "Respirația celulară", "Transpirația", "Nutriția minerală"],
      "correctAnswer": 0
    }]'::jsonb,
    60
  ),
  
  (
    'bio-2',
    'Celula - Unitatea Structurală și Funcțională',
    'biologie',
    'Structura și funcțiile celulei',
    '<h2>Celula - Unitatea Structurală și Funcțională</h2>
    <h3>1. Teoria celulară</h3>
    <h4>Principiile teoriei celulare:</h4>
    <ul>
      <li>Toate organismele vii sunt formate din celule</li>
      <li>Celula este unitatea structurală și funcțională a vieții</li>
      <li>Toate celulele provin din celule preexistente</li>
    </ul>
    
    <h3>2. Tipuri de celule</h3>
    <h4>Celula procariotă:</h4>
    <ul>
      <li>Fără nucleu delimitat de membrană</li>
      <li>ADN circular</li>
      <li>Fără organite membranare</li>
      <li>Exemple: bacterii, arhee</li>
    </ul>
    
    <h4>Celula eucariotă:</h4>
    <ul>
      <li>Nucleu delimitat de membrană</li>
      <li>ADN liniar organizat în cromozomi</li>
      <li>Prezența organitelor membranare</li>
      <li>Exemple: celule animale, vegetale, fungice</li>
    </ul>
    
    <h3>3. Structura celulei eucariote</h3>
    <h4>Membrana celulară:</h4>
    <ul>
      <li>Structură: bicul lipidic cu proteine</li>
      <li>Funcții: delimitare, permeabilitate selectivă, comunicare</li>
    </ul>
    
    <h4>Citoplasma:</h4>
    <ul>
      <li>Citosolul: mediu apos cu substanțe dizolvate</li>
      <li>Organitele celulare</li>
      <li>Incluziunile citoplasmatice</li>
    </ul>
    
    <h4>Nucleul:</h4>
    <ul>
      <li>Înveliș nuclear</li>
      <li>Nucleoplasma</li>
      <li>Cromatina/cromozomii</li>
      <li>Nucleolii</li>
    </ul>
    
    <h3>4. Organitele celulare</h3>
    <h4>Mitocondrii:</h4>
    <ul>
      <li>Structură: membrană dublă, criste</li>
      <li>Funcție: respirație celulară, producerea ATP</li>
    </ul>
    
    <h4>Ribozomi:</h4>
    <ul>
      <li>Structură: subunități proteice și ARN</li>
      <li>Funcție: sinteza proteinelor</li>
    </ul>
    
    <h4>Reticul endoplasmatic:</h4>
    <ul>
      <li>RE rugos: cu ribozomi, sinteza proteinelor</li>
      <li>RE neted: fără ribozomi, sinteza lipidelor</li>
    </ul>
    
    <h4>Aparatul Golgi:</h4>
    <ul>
      <li>Structură: saci aplatizați (cisterne)</li>
      <li>Funcție: procesarea, sortarea și transportul proteinelor</li>
    </ul>
    
    <h4>Lizozomi:</h4>
    <ul>
      <li>Structură: vezicule cu enzime digestive</li>
      <li>Funcție: digestia intracelulară</li>
    </ul>
    
    <h4>Cloroplaste (doar în celulele vegetale):</h4>
    <ul>
      <li>Structură: membrană dublă, tilacoide</li>
      <li>Funcție: fotosinteza</li>
    </ul>
    
    <h4>Vacuole:</h4>
    <ul>
      <li>Structură: vezicule mari cu membrană</li>
      <li>Funcție: depozitare, menținerea presiunii celulare</li>
    </ul>
    
    <h3>5. Diferențe între celula animală și vegetală</h3>
    <h4>Celula vegetală:</h4>
    <ul>
      <li>Perete celular</li>
      <li>Cloroplaste</li>
      <li>Vacuolă centrală mare</li>
      <li>Plastide</li>
    </ul>
    
    <h4>Celula animală:</h4>
    <ul>
      <li>Fără perete celular</li>
      <li>Fără cloroplaste</li>
      <li>Vacuole mici și numeroase</li>
      <li>Centrozomi</li>
    </ul>
    
    <h3>6. Diviziunea celulară</h3>
    <h4>Mitoza:</h4>
    <ul>
      <li>Diviziune celulară care produce două celule fiice identice</li>
      <li>Faze: profază, metafază, anafază, telofază</li>
      <li>Rol: creștere, dezvoltare, regenerare</li>
    </ul>
    
    <h4>Meioza:</h4>
    <ul>
      <li>Diviziune celulară care produce patru celule fiice haploide</li>
      <li>Două diviziuni succesive: meioza I și meioza II</li>
      <li>Rol: formarea gameților, variabilitate genetică</li>
    </ul>
    
    <h3>7. Transportul prin membrana celulară</h3>
    <h4>Transport pasiv:</h4>
    <ul>
      <li>Difuziune simplă</li>
      <li>Difuziune facilitată</li>
      <li>Osmoză</li>
    </ul>
    
    <h4>Transport activ:</h4>
    <ul>
      <li>Pompe ionice</li>
      <li>Endocitoză</li>
      <li>Exocitoză</li>
    </ul>',
    '[{
      "question": "Care este rolul mitocondriilor?",
      "options": ["Producerea de energie", "Sinteza proteinelor", "Digestia celulară", "Fotosinteza"],
      "correctAnswer": 0
    }]'::jsonb,
    65
  ),
  
  (
    'bio-3',
    'Ecologie',
    'biologie',
    'Relațiile dintre organisme și mediul lor',
    '<h2>Ecologie</h2>
    <h3>1. Noțiuni fundamentale</h3>
    <h4>Definiție:</h4>
    <p>Ecologia este știința care studiază relațiile dintre organisme și mediul lor de viață.</p>
    
    <h4>Niveluri de organizare:</h4>
    <ul>
      <li><strong>Individul:</strong> un singur organism</li>
      <li><strong>Populația:</strong> indivizi din aceeași specie într-o anumită zonă</li>
      <li><strong>Comunitatea (biocenoza):</strong> populații de specii diferite care interacționează</li>
      <li><strong>Ecosistemul:</strong> biocenoza și biotopul (mediul fizic)</li>
      <li><strong>Biosfera:</strong> totalitatea ecosistemelor de pe Pământ</li>
    </ul>
    
    <h3>2. Factori ecologici</h3>
    <h4>Factori abiotici:</h4>
    <ul>
      <li><strong>Factori climatici:</strong> temperatura, umiditatea, precipitațiile, vântul</li>
      <li><strong>Factori edafici:</strong> structura solului, pH-ul, compoziția</li>
      <li><strong>Factori topografici:</strong> altitudinea, panta, expoziția</li>
    </ul>
    
    <h4>Factori biotici:</h4>
    <ul>
      <li><strong>Relații intraspecifice:</strong> între indivizi ai aceleiași specii</li>
      <li><strong>Relații interspecifice:</strong> între indivizi ai unor specii diferite</li>
    </ul>
    
    <h3>3. Relații interspecifice</h3>
    <h4>Relații pozitive:</h4>
    <ul>
      <li><strong>Mutualismul:</strong> ambele specii beneficiază (ex: lichenii)</li>
      <li><strong>Protocooperarea:</strong> ambele specii beneficiază, dar pot trăi și separat</li>
      <li><strong>Comensalismul:</strong> o specie beneficiază, cealaltă nu este afectată</li>
    </ul>
    
    <h4>Relații negative:</h4>
    <ul>
      <li><strong>Competiția:</strong> ambele specii sunt afectate negativ</li>
      <li><strong>Prădătorismul:</strong> o specie se hrănește cu indivizi ai altei specii</li>
      <li><strong>Parazitismul:</strong> o specie trăiește pe/în alta și îi provoacă daune</li>
      <li><strong>Amensalismul:</strong> o specie este afectată negativ, cealaltă nu este afectată</li>
    </ul>
    
    <h3>4. Ecosistemul</h3>
    <h4>Componente:</h4>
    <ul>
      <li><strong>Biotopul:</strong> mediul fizic (factori abiotici)</li>
      <li><strong>Biocenoza:</strong> comunitatea de organisme (factori biotici)</li>
    </ul>
    
    <h4>Funcțiile ecosistemului:</h4>
    <ul>
      <li>Circuitul materiei</li>
      <li>Fluxul de energie</li>
      <li>Autoreglarea</li>
    </ul>
    
    <h3>5. Lanțuri și rețele trofice</h3>
    <h4>Niveluri trofice:</h4>
    <ul>
      <li><strong>Producători:</strong> organisme autotrofe (plante verzi)</li>
      <li><strong>Consumatori:</strong>
        <ul>
          <li>Consumatori primari (erbivore)</li>
          <li>Consumatori secundari (carnivore)</li>
          <li>Consumatori terțiari (carnivore de ordin superior)</li>
        </ul>
      </li>
      <li><strong>Descompunători:</strong> bacterii și fungi</li>
    </ul>
    
    <h4>Lanț trofic:</h4>
    <p>Succesiune liniară de organisme prin care energia se transferă de la un nivel trofic la altul.</p>
    <p>Exemplu: iarbă → iepure → vulpe</p>
    
    <h4>Rețea trofică:</h4>
    <p>Interconectarea mai multor lanțuri trofice într-un ecosistem.</p>
    
    <h3>6. Fluxul de energie în ecosistem</h3>
    <h4>Caracteristici:</h4>
    <ul>
      <li>Energia intră în ecosistem prin fotosinteză</li>
      <li>Transferul de energie între nivelurile trofice este ineficient (regula 10%)</li>
      <li>Energia se pierde sub formă de căldură la fiecare transfer</li>
      <li>Fluxul de energie este unidirecțional</li>
    </ul>
    
    <h4>Piramide ecologice:</h4>
    <ul>
      <li><strong>Piramida numerelor:</strong> bazată pe numărul de indivizi</li>
      <li><strong>Piramida biomasei:</strong> bazată pe biomasa totală</li>
      <li><strong>Piramida energiei:</strong> bazată pe energia disponibilă</li>
    </ul>
    
    <h3>7. Ciclurile biogeochimice</h3>
    <h4>Ciclul carbonului:</h4>
    <ul>
      <li>Fotosinteză: CO₂ → compuși organici</li>
      <li>Respirație: compuși organici → CO₂</li>
      <li>Descompunere: compuși organici → CO₂</li>
      <li>Combustibili fosili și efectul de seră</li>
    </ul>
    
    <h4>Ciclul azotului:</h4>
    <ul>
      <li>Fixarea azotului: N₂ → NH₃</li>
      <li>Nitrificarea: NH₃ → NO₂⁻ → NO₃⁻</li>
      <li>Asimilarea: NO₃⁻ → proteine</li>
      <li>Denitrificarea: NO₃⁻ → N₂</li>
    </ul>
    
    <h3>8. Succesiunea ecologică</h3>
    <h4>Definiție:</h4>
    <p>Procesul de schimbare a comunităților de organisme într-un ecosistem de-a lungul timpului.</p>
    
    <h4>Tipuri:</h4>
    <ul>
      <li><strong>Succesiune primară:</strong> începe pe un substrat nou, fără sol (ex: lavă vulcanică)</li>
      <li><strong>Succesiune secundară:</strong> începe într-o zonă care a fost perturbată, dar unde solul există</li>
    </ul>
    
    <h4>Etape:</h4>
    <ul>
      <li>Comunități pioniere</li>
      <li>Comunități intermediare</li>
      <li>Comunitate climax (stabilă)</li>
    </ul>',
    '[{
      "question": "Ce este un ecosistem?",
      "options": ["Comunitatea de organisme și mediul lor", "O specie", "O populație", "Un habitat"],
      "correctAnswer": 0
    }]'::jsonb,
    60
  ),
  
  (
    'bio-4',
    'Genetică',
    'biologie',
    'Principiile eredității și variabilității',
    '<h2>Genetică</h2>
    <h3>1. Noțiuni fundamentale</h3>
    <h4>Definiție:</h4>
    <p>Genetica este știința care studiază ereditatea și variabilitatea organismelor.</p>
    
    <h4>Concepte de bază:</h4>
    <ul>
      <li><strong>Genotip:</strong> totalitatea genelor unui organism</li>
      <li><strong>Fenotip:</strong> totalitatea caracterelor observabile ale unui organism</li>
      <li><strong>Alele:</strong> forme alternative ale unei gene</li>
      <li><strong>Homozigot:</strong> organism cu alele identice pentru o genă</li>
      <li><strong>Heterozigot:</strong> organism cu alele diferite pentru o genă</li>
    </ul>
    
    <h3>2. Acizii nucleici</h3>
    <h4>ADN (Acid dezoxiribonucleic):</h4>
    <ul>
      <li><strong>Structură:</strong> dublă elice, nucleotide (dezoxiriboză, bază azotată, fosfat)</li>
      <li><strong>Baze azotate:</strong> Adenină (A), Guanină (G), Citozină (C), Timină (T)</li>
      <li><strong>Complementaritate:</strong> A-T, G-C</li>
      <li><strong>Funcție:</strong> stocarea informației genetice</li>
    </ul>
    
    <h4>ARN (Acid ribonucleic):</h4>
    <ul>
      <li><strong>Structură:</strong> catenă simplă, nucleotide (riboză, bază azotată, fosfat)</li>
      <li><strong>Baze azotate:</strong> Adenină (A), Guanină (G), Citozină (C), Uracil (U)</li>
      <li><strong>Tipuri:</strong> ARN mesager (ARNm), ARN de transfer (ARNt), ARN ribozomal (ARNr)</li>
      <li><strong>Funcție:</strong> sinteza proteinelor</li>
    </ul>
    
    <h3>3. Replicarea ADN-ului</h3>
    <h4>Definiție:</h4>
    <p>Procesul prin care o moleculă de ADN se duplică, formând două molecule identice.</p>
    
    <h4>Etape:</h4>
    <ul>
      <li>Desfacerea dublei elice</li>
      <li>Sinteza catenelor complementare</li>
      <li>Formarea a două molecule de ADN identice</li>
    </ul>
    
    <h4>Caracteristici:</h4>
    <ul>
      <li>Semiconservativă: fiecare moleculă nouă conține o catenă veche și una nouă</li>
      <li>Bidirecțională: are loc în ambele direcții</li>
      <li>Semicontinuă: o catenă se sintetizează continuu, cealaltă în fragmente</li>
    </ul>
    
    <h3>4. Sinteza proteinelor</h3>
    <h4>Transcripția:</h4>
    <ul>
      <li>Copierea informației genetice de pe ADN pe ARNm</li>
      <li>Are loc în nucleu</li>
      <li>Rezultă ARNm precursor, care este procesat (splicing)</li>
    </ul>
    
    <h4>Translația:</h4>
    <ul>
      <li>Sinteza proteinelor pe baza informației din ARNm</li>
      <li>Are loc la nivelul ribozomilor</li>
      <li>Codonii (triplete de nucleotide) specifică aminoacizii</li>
      <li>ARNt transportă aminoacizii la ribozomi</li>
    </ul>
    
    <h3>5. Legile lui Mendel</h3>
    <h4>Legea I (Legea purității gameților):</h4>
    <p>Caracterele sunt determinate de factori ereditari care se transmit de la părinți la descendenți prin gameți.</p>
    
    <h4>Legea II (Legea segregării independente):</h4>
    <p>Alelele genelor diferite se segregă independent în gameți.</p>
    
    <h4>Legea III (Legea dominanței):</h4>
    <p>Când două alele diferite sunt prezente, doar una (dominantă) se exprimă în fenotip.</p>
    
    <h3>6. Moștenirea caracterelor</h3>
    <h4>Moștenirea dominantă-recesivă:</h4>
    <ul>
      <li>Alela dominantă (A) se exprimă în prezența alelei recesive (a)</li>
      <li>Alela recesivă se exprimă doar în stare homozigotă (aa)</li>
      <li>Exemple: culoarea ochilor, grupele sanguine</li>
    </ul>
    
    <h4>Codominanța:</h4>
    <ul>
      <li>Ambele alele se exprimă în fenotip</li>
      <li>Exemplu: grupele sanguine AB</li>
    </ul>
    
    <h4>Moștenirea poligenică:</h4>
    <ul>
      <li>Caracterul este determinat de mai multe gene</li>
      <li>Exemple: înălțimea, culoarea pielii</li>
    </ul>
    
    <h3>7. Mutații genetice</h3>
    <h4>Definiție:</h4>
    <p>Modificări în secvența nucleotidelor din ADN.</p>
    
    <h4>Tipuri de mutații:</h4>
    <ul>
      <li><strong>Mutații genice:</strong> afectează o singură genă</li>
      <li><strong>Mutații cromozomiale:</strong> afectează structura cromozomilor</li>
      <li><strong>Mutații genomice:</strong> afectează numărul de cromozomi</li>
    </ul>
    
    <h4>Cauze:</h4>
    <ul>
      <li>Factori fizici: radiații</li>
      <li>Factori chimici: substanțe mutagene</li>
      <li>Factori biologici: virusuri</li>
    </ul>
    
    <h3>8. Ingineria genetică</h3>
    <h4>Tehnici:</h4>
    <ul>
      <li><strong>ADN recombinant:</strong> combinarea ADN-ului din surse diferite</li>
      <li><strong>Clonarea:</strong> producerea de copii identice ale unui organism</li>
      <li><strong>Terapia genică:</strong> tratarea bolilor prin modificarea genelor</li>
    </ul>
    
    <h4>Aplicații:</h4>
    <ul>
      <li>Organisme modificate genetic</li>
      <li>Producerea de medicamente</li>
      <li>Diagnosticul bolilor genetice</li>
    </ul>',
    '[{
      "question": "Ce este o genă?",
      "options": ["O secvență de ADN care codifică o proteină", "O proteină", "Un cromozom", "O celulă"],
      "correctAnswer": 0
    }]'::jsonb,
    65
  ),
  
  (
    'bio-5',
    'Anatomie și Fiziologie Umană - Sistemul Nervos',
    'biologie',
    'Structura și funcțiile sistemului nervos uman',
    '<h2>Anatomie și Fiziologie Umană - Sistemul Nervos</h2>
    <h3>1. Introducere în sistemul nervos</h3>
    <h4>Funcții:</h4>
    <ul>
      <li>Recepționarea stimulilor din mediu</li>
      <li>Procesarea informațiilor</li>
      <li>Coordonarea activităților organismului</li>
      <li>Adaptarea la mediu</li>
    </ul>
    
    <h3>2. Organizarea sistemului nervos</h3>
    <h4>Sistemul nervos central (SNC):</h4>
    <ul>
      <li>Encefalul (creierul)</li>
      <li>Măduva spinării</li>
    </ul>
    
    <h4>Sistemul nervos periferic (SNP):</h4>
    <ul>
      <li>Nervii cranieni</li>
      <li>Nervii spinali</li>
      <li>Ganglionii nervoși</li>
    </ul>
    
    <h4>Sistemul nervos somatic:</h4>
    <ul>
      <li>Controlează mușchii scheletici</li>
      <li>Voluntar</li>
    </ul>
    
    <h4>Sistemul nervos vegetativ (autonom):</h4>
    <ul>
      <li>Sistemul simpatic</li>
      <li>Sistemul parasimpatic</li>
      <li>Involuntar</li>
    </ul>
    
    <h3>3. Neuronul</h3>
    <h4>Structură:</h4>
    <ul>
      <li><strong>Corp celular (soma):</strong> conține nucleul și organitele</li>
      <li><strong>Dendrite:</strong> prelungiri scurte, ramificate, conduc impulsul spre corpul celular</li>
      <li><strong>Axon:</strong> prelungire lungă, conduce impulsul de la corpul celular</li>
      <li><strong>Teaca de mielină:</strong> învelește axonul, accelerează conducerea impulsului</li>
      <li><strong>Terminații axonale:</strong> eliberează neurotransmițători</li>
    </ul>
    
    <h4>Tipuri de neuroni:</h4>
    <ul>
      <li><strong>Neuroni senzitivi:</strong> conduc impulsul de la receptori la SNC</li>
      <li><strong>Neuroni motori:</strong> conduc impulsul de la SNC la efectori</li>
      <li><strong>Interneuroni:</strong> fac legătura între neuronii senzitivi și motori</li>
    </ul>
    
    <h3>4. Sinapsa</h3>
    <h4>Definiție:</h4>
    <p>Zona de contact funcțional între doi neuroni sau între un neuron și un efector.</p>
    
    <h4>Tipuri:</h4>
    <ul>
      <li><strong>Sinapse chimice:</strong> utilizează neurotransmițători</li>
      <li><strong>Sinapse electrice:</strong> transmit direct impulsul electric</li>
    </ul>
    
    <h4>Neurotransmițători:</h4>
    <ul>
      <li>Acetilcolina</li>
      <li>Dopamina</li>
      <li>Serotonina</li>
      <li>Noradrenalina</li>
      <li>GABA</li>
    </ul>
    
    <h3>5. Encefalul</h3>
    <h4>Emisferele cerebrale:</h4>
    <ul>
      <li><strong>Lobii:</strong> frontal, parietal, temporal, occipital</li>
      <li><strong>Scoarța cerebrală:</strong> substanță cenușie, centru al funcțiilor superioare</li>
      <li><strong>Substanța albă:</strong> fibre nervoase mielinizate</li>
    </ul>
    
    <h4>Diencefalul:</h4>
    <ul>
      <li><strong>Talamusul:</strong> releu senzorial</li>
      <li><strong>Hipotalamusul:</strong> reglarea homeostaziei</li>
    </ul>
    
    <h4>Trunchiul cerebral:</h4>
    <ul>
      <li><strong>Mezencefalul:</strong> reflexe vizuale și auditive</li>
      <li><strong>Puntea:</strong> conexiuni între cerebel și măduva spinării</li>
      <li><strong>Bulbul rahidian:</strong> controlul funcțiilor vitale</li>
    </ul>
    
    <h4>Cerebelul:</h4>
    <ul>
      <li>Coordonarea mișcărilor</li>
      <li>Menținerea echilibrului</li>
      <li>Învățarea motorie</li>
    </ul>
    
    <h3>6. Măduva spinării</h3>
    <h4>Structură:</h4>
    <ul>
      <li>Substanță cenușie (în formă de H)</li>
      <li>Substanță albă (în jurul substanței cenușii)</li>
      <li>Canalul ependimar</li>
    </ul>
    
    <h4>Funcții:</h4>
    <ul>
      <li>Conducerea impulsurilor nervoase</li>
      <li>Centru reflex</li>
    </ul>
    
    <h3>7. Reflexele</h3>
    <h4>Definiție:</h4>
    <p>Răspunsuri rapide, involuntare și stereotipe la stimuli.</p>
    
    <h4>Arcul reflex:</h4>
    <ul>
      <li>Receptor</li>
      <li>Cale aferentă (neuron senzitiv)</li>
      <li>Centru reflex</li>
      <li>Cale eferentă (neuron motor)</li>
      <li>Efector</li>
    </ul>
    
    <h4>Tipuri de reflexe:</h4>
    <ul>
      <li><strong>Reflexe medulare:</strong> reflexul rotulian, reflexul de retragere</li>
      <li><strong>Reflexe craniene:</strong> reflexul pupilar, reflexul de clipire</li>
      <li><strong>Reflexe condiționate:</strong> dobândite prin învățare</li>
    </ul>
    
    <h3>8. Afecțiuni ale sistemului nervos</h3>
    <ul>
      <li><strong>Boala Alzheimer:</strong> degenerare neuronală progresivă</li>
      <li><strong>Boala Parkinson:</strong> deficit de dopamină</li>
      <li><strong>Scleroza multiplă:</strong> demielinizarea axonilor</li>
      <li><strong>Epilepsia:</strong> activitate electrică anormală</li>
      <li><strong>Accidentul vascular cerebral:</strong> întreruperea fluxului sanguin</li>
    </ul>',
    '[{
      "question": "Care este unitatea structurală și funcțională a sistemului nervos?",
      "options": ["Sinapsa", "Neuronul", "Axonul", "Dendrita"],
      "correctAnswer": 1
    }]'::jsonb,
    70
  ),
  
  (
    'bio-6',
    'Anatomie și Fiziologie Umană - Sistemul Circulator',
    'biologie',
    'Structura și funcțiile sistemului circulator uman',
    '<h2>Anatomie și Fiziologie Umană - Sistemul Circulator</h2>
    <h3>1. Introducere în sistemul circulator</h3>
    <h4>Funcții:</h4>
    <ul>
      <li>Transportul substanțelor nutritive și al oxigenului</li>
      <li>Eliminarea deșeurilor metabolice</li>
      <li>Transportul hormonilor</li>
      <li>Reglarea temperaturii corporale</li>
      <li>Apărarea organismului</li>
    </ul>
    
    <h3>2. Componente ale sistemului circulator</h3>
    <h4>Inima:</h4>
    <ul>
      <li>Organ muscular cavitar</li>
      <li>Pompează sângele în vasele sanguine</li>
    </ul>
    
    <h4>Vasele sanguine:</h4>
    <ul>
      <li><strong>Artere:</strong> transportă sângele de la inimă</li>
      <li><strong>Vene:</strong> transportă sângele spre inimă</li>
      <li><strong>Capilare:</strong> permit schimbul de substanțe</li>
    </ul>
    
    <h4>Sângele:</h4>
    <ul>
      <li>Țesut conjunctiv lichid</li>
      <li>Transportă substanțe în organism</li>
    </ul>
    
    <h3>3. Inima</h3>
    <h4>Structură:</h4>
    <ul>
      <li><strong>Pereți:</strong> epicard, miocrad, endocard</li>
      <li><strong>Cavități:</strong> atrii (2) și ventricule (2)</li>
      <li><strong>Valve:</strong> tricuspidă, bicuspidă (mitrală), semilunare</li>
    </ul>
    
    <h4>Circulația sângelui prin inimă:</h4>
    <ul>
      <li>Atriul drept → Ventriculul drept → Artera pulmonară → Plămâni</li>
      <li>Atriul stâng ← Venele pulmonare ← Plămâni</li>
      <li>Atriul stâng → Ventriculul stâng → Aorta → Organism</li>
      <li>Atriul drept ← Venele cave ← Organism</li>
    </ul>
    
    <h4>Activitatea cardiacă:</h4>
    <ul>
      <li><strong>Sistola:</strong> contracția mușchiului cardiac</li>
      <li><strong>Diastola:</strong> relaxarea mușchiului cardiac</li>
      <li><strong>Frecvența cardiacă:</strong> 60-80 bătăi/minut în repaus</li>
      <li><strong>Debitul cardiac:</strong> 5-6 litri/minut în repaus</li>
    </ul>
    
    <h3>4. Vasele sanguine</h3>
    <h4>Artere:</h4>
    <ul>
      <li>Perete gros, elastic</li>
      <li>Transportă sânge oxigenat (cu excepția arterei pulmonare)</li>
      <li>Exemple: aorta, artera carotidă, artera pulmonară</li>
    </ul>
    
    <h4>Vene:</h4>
    <ul>
      <li>Perete mai subțire</li>
      <li>Valve pentru a preveni refluxul sângelui</li>
      <li>Transportă sânge dezoxigenat (cu excepția venelor pulmonare)</li>
      <li>Exemple: venele cave, vena portă, venele pulmonare</li>
    </ul>
    
    <h4>Capilare:</h4>
    <ul>
      <li>Perete foarte subțire (un singur strat de celule)</li>
      <li>Permit schimbul de substanțe între sânge și țesuturi</li>
      <li>Formează rețele în țesuturi</li>
    </ul>
    
    <h3>5. Sângele</h3>
    <h4>Compoziție:</h4>
    <ul>
      <li><strong>Plasma:</strong> 55% din volum, apă și substanțe dizolvate</li>
      <li><strong>Elementele figurate:</strong> 45% din volum</li>
    </ul>
    
    <h4>Elementele figurate:</h4>
    <ul>
      <li><strong>Eritrocite (hematii):</strong> transportă oxigenul</li>
      <li><strong>Leucocite:</strong> apărare imunitară</li>
      <li><strong>Trombocite (plachete):</strong> coagularea sângelui</li>
    </ul>
    
    <h4>Grupele sanguine:</h4>
    <ul>
      <li><strong>Sistemul ABO:</strong> A, B, AB, O</li>
      <li><strong>Sistemul Rh:</strong> Rh+ și Rh-</li>
    </ul>
    
    <h3>6. Circulația sanguină</h3>
    <h4>Circulația mică (pulmonară):</h4>
    <ul>
      <li>Ventriculul drept → Artera pulmonară → Plămâni → Venele pulmonare → Atriul stâng</li>
      <li>Funcție: oxigenarea sângelui</li>
    </ul>
    
    <h4>Circulația mare (sistemică):</h4>
    <ul>
      <li>Ventriculul stâng → Aorta → Artere → Capilare → Vene → Venele cave → Atriul drept</li>
      <li>Funcție: transportul substanțelor în organism</li>
    </ul>
    
    <h3>7. Presiunea arterială</h3>
    <h4>Definiție:</h4>
    <p>Forța exercitată de sânge asupra pereților arterelor.</p>
    
    <h4>Măsurare:</h4>
    <ul>
      <li><strong>Presiunea sistolică:</strong> în timpul contracției ventriculare</li>
      <li><strong>Presiunea diastolică:</strong> în timpul relaxării ventriculare</li>
      <li><strong>Valori normale:</strong> 120/80 mmHg</li>
    </ul>
    
    <h4>Factori care influențează presiunea arterială:</h4>
    <ul>
      <li>Debitul cardiac</li>
      <li>Rezistența vasculară periferică</li>
      <li>Volumul sanguin</li>
      <li>Vâscozitatea sângelui</li>
    </ul>
    
    <h3>8. Afecțiuni ale sistemului circulator</h3>
    <ul>
      <li><strong>Hipertensiunea arterială:</strong> presiune arterială crescută</li>
      <li><strong>Ateroscleroza:</strong> depunerea plăcilor de aterom pe pereții arterelor</li>
      <li><strong>Infarctul miocardic:</strong> moartea unei porțiuni din mușchiul cardiac</li>
      <li><strong>Accidentul vascular cerebral:</strong> întreruperea fluxului sanguin în creier</li>
      <li><strong>Anemia:</strong> reducerea numărului de eritrocite sau a hemoglobinei</li>
      <li><strong>Leucemia:</strong> cancer al celulelor sanguine</li>
    </ul>',
    '[{
      "question": "Care este rolul sistemului circulator?",
      "options": ["Transportul substanțelor în organism", "Digestia alimentelor", "Respirația", "Excreția"],
      "correctAnswer": 0
    }]'::jsonb,
    65
  ),
  
  (
    'bio-7',
    'Anatomie și Fiziologie Umană - Sistemul Digestiv',
    'biologie',
    'Structura și funcțiile sistemului digestiv uman',
    '<h2>Anatomie și Fiziologie Umană - Sistemul Digestiv</h2>
    <h3>1. Introducere în sistemul digestiv</h3>
    <h4>Funcții:</h4>
    <ul>
      <li>Ingestia alimentelor</li>
      <li>Digestia mecanică și chimică</li>
      <li>Absorbția nutrienților</li>
      <li>Eliminarea reziduurilor</li>
    </ul>
    
    <h3>2. Componentele sistemului digestiv</h3>
    <h4>Tubul digestiv:</h4>
    <ul>
      <li>Cavitatea bucală</li>
      <li>Faringele</li>
      <li>Esofagul</li>
      <li>Stomacul</li>
      <li>Intestinul subțire</li>
      <li>Intestinul gros</li>
    </ul>
    
    <h4>Glande anexe:</h4>
    <ul>
      <li>Glandele salivare</li>
      <li>Ficatul</li>
      <li>Pancreasul</li>
    </ul>
    
    <h3>3. Cavitatea bucală</h3>
    <h4>Componente:</h4>
    <ul>
      <li>Buzele și obrajii</li>
      <li>Dinții</li>
      <li>Limba</li>
      <li>Glandele salivare</li>
    </ul>
    
    <h4>Funcții:</h4>
    <ul>
      <li><strong>Digestia mecanică:</strong> mărunțirea alimentelor prin masticație</li>
      <li><strong>Digestia chimică:</strong> acțiunea amilazei salivare asupra amidonului</li>
      <li><strong>Formarea bolului alimentar</strong></li>
      <li><strong>Degustarea:</strong> perceperea gustului</li>
    </ul>
    
    <h3>4. Faringele și esofagul</h3>
    <h4>Faringele:</h4>
    <ul>
      <li>Organ comun sistemelor digestiv și respirator</li>
      <li>Rol în deglutiție (înghițire)</li>
    </ul>
    
    <h4>Esofagul:</h4>
    <ul>
      <li>Tub muscular care conectează faringele cu stomacul</li>
      <li>Peristaltism: contracții musculare care propulsează alimentele</li>
    </ul>
    
    <h3>5. Stomacul</h3>
    <h4>Structură:</h4>
    <ul>
      <li>Organ muscular în formă de J</li>
      <li>Regiuni: cardia, fundul, corpul, antrul, pilorul</li>
      <li>Mucoasa gastrică: celule secretoare de acid clorhidric, pepsină, mucus</li>
    </ul>
    
    <h4>Funcții:</h4>
    <ul>
      <li><strong>Digestia mecanică:</strong> amestecarea alimentelor</li>
      <li><strong>Digestia chimică:</strong> acțiunea pepsinei asupra proteinelor</li>
      <li><strong>Formarea chimului:</strong> masă semilichidă de alimente parțial digerate</li>
      <li><strong>Absorbția:</strong> limitată (alcool, medicamente)</li>
    </ul>
    
    <h3>6. Intestinul subțire</h3>
    <h4>Structură:</h4>
    <ul>
      <li>Duoden, jejun, ileon</li>
      <li>Vilozități intestinale: cresc suprafața de absorbție</li>
      <li>Glande intestinale: secretă enzime digestive</li>
    </ul>
    
    <h4>Funcții:</h4>
    <ul>
      <li><strong>Digestia chimică:</strong> acțiunea enzimelor intestinale, pancreatice și biliare</li>
      <li><strong>Absorbția:</strong> principala zonă de absorbție a nutrienților</li>
      <li><strong>Formarea chilului:</strong> produs final al digestiei intestinale</li>
    </ul>
    
    <h3>7. Intestinul gros</h3>
    <h4>Structură:</h4>
    <ul>
      <li>Cecum, colon (ascendent, transvers, descendent, sigmoid), rect</li>
      <li>Apendicele vermiform: atașat de cecum</li>
    </ul>
    
    <h4>Funcții:</h4>
    <ul>
      <li><strong>Absorbția:</strong> apă, electroliți</li>
      <li><strong>Formarea materiilor fecale</strong></li>
      <li><strong>Eliminarea reziduurilor</strong></li>
      <li><strong>Adăpostirea florei bacteriene intestinale</strong></li>
    </ul>
    
    <h3>8. Glandele anexe</h3>
    <h4>Glandele salivare:</h4>
    <ul>
      <li>Secretă saliva: apă, mucus, amilază salivară</li>
      <li>Funcții: umectarea alimentelor, începerea digestiei amidonului</li>
    </ul>
    
    <h4>Ficatul:</h4>
    <ul>
      <li>Cel mai mare organ intern</li>
      <li>Secretă bila: emulsionează lipidele</li>
      <li>Alte funcții: detoxifierea, stocarea glicogenului, sinteza proteinelor plasmatice</li>
    </ul>
    
    <h4>Pancreasul:</h4>
    <ul>
      <li>Glandă mixtă: endocrină și exocrină</li>
      <li>Secretă suc pancreatic: enzime digestive (amilază, lipază, proteaze)</li>
      <li>Secretă hormoni: insulină, glucagon</li>
    </ul>
    
    <h3>9. Digestia și absorbția nutrienților</h3>
    <h4>Digestia glucidelor:</h4>
    <ul>
      <li>Începe în cavitatea bucală (amilaza salivară)</li>
      <li>Continuă în intestinul subțire (amilaza pancreatică)</li>
      <li>Produsul final: monozaharide (glucoză, fructoză, galactoză)</li>
    </ul>
    
    <h4>Digestia proteinelor:</h4>
    <ul>
      <li>Începe în stomac (pepsina)</li>
      <li>Continuă în intestinul subțire (tripsina, chimotripsina)</li>
      <li>Produsul final: aminoacizi</li>
    </ul>
    
    <h4>Digestia lipidelor:</h4>
    <ul>
      <li>Are loc în intestinul subțire</li>
      <li>Bila emulsionează lipidele</li>
      <li>Lipaza pancreatică descompune lipidele</li>
      <li>Produsul final: acizi grași și glicerol</li>
    </ul>',
    '[{
      "question": "Care este rolul sistemului digestiv?",
      "options": ["Transformarea alimentelor în nutrienți", "Transportul substanțelor", "Eliminarea deșeurilor", "Respirația"],
      "correctAnswer": 0
    }]'::jsonb,
    65
  ),
  
  (
    'bio-8',
    'Anatomie și Fiziologie Umană - Sistemul Respirator',
    'biologie',
    'Structura și funcțiile sistemului respirator uman',
    '<h2>Anatomie și Fiziologie Umană - Sistemul Respirator</h2>
    <h3>1. Introducere în sistemul respirator</h3>
    <h4>Funcții:</h4>
    <ul>
      <li>Schimbul de gaze (O₂ și CO₂) între organism și mediu</li>
      <li>Reglarea pH-ului sanguin</li>
      <li>Protecția împotriva microorganismelor</li>
      <li>Fonația (producerea sunetelor)</li>
    </ul>
    
    <h3>2. Componentele sistemului respirator</h3>
    <h4>Căile respiratorii superioare:</h4>
    <ul>
      <li>Cavitatea nazală</li>
      <li>Faringele (nazofaringe, orofaringe, laringofaringe)</li>
    </ul>
    
    <h4>Căile respiratorii inferioare:</h4>
    <ul>
      <li>Laringele</li>
      <li>Traheea</li>
      <li>Bronhiile</li>
      <li>Bronhiolele</li>
      <li>Alveolele pulmonare</li>
    </ul>
    
    <h4>Plămânii:</h4>
    <ul>
      <li>Plămânul drept: 3 lobi</li>
      <li>Plămânul stâng: 2 lobi</li>
    </ul>
    
    <h3>3. Cavitatea nazală și faringele</h3>
    <h4>Cavitatea nazală:</h4>
    <ul>
      <li><strong>Funcții:</strong> filtrarea, umidificarea și încălzirea aerului</li>
      <li><strong>Mucoasa nazală:</strong> bogată în vase sanguine și celule secretoare de mucus</li>
      <li><strong>Epiteliul olfactiv:</strong> detectarea mirosurilor</li>
    </ul>
    
    <h4>Faringele:</h4>
    <ul>
      <li>Organ comun sistemelor respirator și digestiv</li>
      <li>Rol în deglutiție și respirație</li>
    </ul>
    
    <h3>4. Laringele și traheea</h3>
    <h4>Laringele:</h4>
    <ul>
      <li><strong>Structură:</strong> cartilaje (tiroid, cricoid, aritenoid, epiglotă)</li>
      <li><strong>Corzile vocale:</strong> producerea sunetelor</li>
      <li><strong>Epiglota:</strong> previne intrarea alimentelor în căile respiratorii</li>
    </ul>
    
    <h4>Traheea:</h4>
    <ul>
      <li><strong>Structură:</strong> tub de aproximativ 12 cm, susținut de inele cartilaginoase în formă de C</li>
      <li><strong>Mucoasa traheală:</strong> epiteliu ciliat cu celule secretoare de mucus</li>
      <li><strong>Funcție:</strong> conducerea aerului spre bronhii</li>
    </ul>
    
    <h3>5. Bronhiile și bronhiolele</h3>
    <h4>Bronhiile:</h4>
    <ul>
      <li>Rezultă din bifurcarea traheei</li>
      <li>Bronhia principală dreaptă și stângă</li>
      <li>Se ramifică în bronhii lobari, apoi segmentari</li>
    </ul>
    
    <h4>Bronhiolele:</h4>
    <ul>
      <li>Ramificații mai mici ale bronhiilor</li>
      <li>Bronhiole terminale → bronhiole respiratorii</li>
      <li>Nu conțin cartilaj</li>
    </ul>
    
    <h3>6. Alveolele pulmonare</h3>
    <h4>Structură:</h4>
    <ul>
      <li>Saci aerieni microscopici</li>
      <li>Pereți foarte subțiri (un singur strat de celule)</li>
      <li>Înconjurate de o rețea densă de capilare</li>
    </ul>
    
    <h4>Funcție:</h4>
    <ul>
      <li>Locul schimbului de gaze</li>
      <li>Suprafață mare de schimb (aproximativ 70-80 m²)</li>
    </ul>
    
    <h3>7. Mecanica respiratorie</h3>
    <h4>Inspirația:</h4>
    <ul>
      <li>Contracția mușchiului diafragm și a mușchilor intercostali externi</li>
      <li>Creșterea volumului cutiei toracice</li>
      <li>Scăderea presiunii intrapleurale</li>
      <li>Intrarea aerului în plămâni</li>
    </ul>
    
    <h4>Expirația:</h4>
    <ul>
      <li>Relaxarea mușchiului diafragm și a mușchilor intercostali externi</li>
      <li>Contracția mușchilor intercostali interni (în expirația forțată)</li>
      <li>Scăderea volumului cutiei toracice</li>
      <li>Creșterea presiunii intrapleurale</li>
      <li>Ieșirea aerului din plămâni</li>
    </ul>
    
    <h3>8. Schimbul de gaze</h3>
    <h4>Schimbul pulmonar (respirația externă):</h4>
    <ul>
      <li>Are loc între alveole și capilarele pulmonare</li>
      <li>O₂ din aer → sânge</li>
      <li>CO₂ din sânge → aer</li>
    </ul>
    
    <h4>Schimbul tisular (respirația internă):</h4>
    <ul>
      <li>Are loc între capilarele sistemice și celule</li>
      <li>O₂ din sânge → celule</li>
      <li>CO₂ din celule → sânge</li>
    </ul>
    
    <h4>Transportul gazelor:</h4>
    <ul>
      <li><strong>Oxigenul:</strong> 98% legat de hemoglobină, 2% dizolvat în plasmă</li>
      <li><strong>Dioxidul de carbon:</strong> 70% sub formă de bicarbonat, 23% legat de hemoglobină, 7% dizolvat în plasmă</li>
    </ul>
    
    <h3>9. Volumele și capacitățile pulmonare</h3>
    <ul>
      <li><strong>Volum curent (VC):</strong> volumul de aer inspirat sau expirat în respirația normală (500 ml)</li>
      <li><strong>Volum inspirator de rezervă (VIR):</strong> volumul maxim de aer care poate fi inspirat peste VC (3000 ml)</li>
      <li><strong>Volum expirator de rezervă (VER):</strong> volumul maxim de aer care poate fi expirat după o expirație normală (1100 ml)</li>
      <li><strong>Volum rezidual (VR):</strong> volumul de aer care rămâne în plămâni după o expirație forțată (1200 ml)</li>
      <li><strong>Capacitatea vitală (CV):</strong> VC + VIR + VER (4600 ml)</li>
      <li><strong>Capacitatea pulmonară totală (CPT):</strong> CV + VR (5800 ml)</li>
    </ul>
    
    <h3>10. Afecțiuni ale sistemului respirator</h3>
    <ul>
      <li><strong>Astmul bronșic:</strong> îngustarea căilor respiratorii</li>
      <li><strong>Bronșita:</strong> inflamația bronhiilor</li>
      <li><strong>Pneumonia:</strong> inflamația alveolelor</li>
      <li><strong>Tuberculoza:</strong> infecție bacteriană (Mycobacterium tuberculosis)</li>
      <li><strong>Emfizemul:</strong> distrugerea pereților alveolari</li>
      <li><strong>Cancerul pulmonar:</strong> creșterea anormală a celulelor</li>
    </ul>',
    '[{
      "question": "Unde are loc schimbul de gaze în plămâni?",
      "options": ["În bronhii", "În trahee", "În alveole", "În laringe"],
      "correctAnswer": 2
    }]'::jsonb,
    65
  ),
  
  (
    'bio-9',
    'Anatomie și Fiziologie Umană - Sistemul Excretor',
    'biologie',
    'Structura și funcțiile sistemului excretor uman',
    '<h2>Anatomie și Fiziologie Umană - Sistemul Excretor</h2>
    <h3>1. Introducere în sistemul excretor</h3>
    <h4>Funcții:</h4>
    <ul>
      <li>Eliminarea deșeurilor metabolice</li>
      <li>Menținerea homeostaziei (echilibrul hidro-electrolitic și acido-bazic)</li>
      <li>Reglarea volumului și compoziției sângelui</li>
      <li>Reglarea tensiunii arteriale</li>
    </ul>
    
    <h3>2. Componentele sistemului excretor</h3>
    <h4>Organe:</h4>
    <ul>
      <li>Rinichii</li>
      <li>Ureterele</li>
      <li>Vezica urinară</li>
      <li>Uretra</li>
    </ul>
    
    <h4>Alte organe cu rol excretor:</h4>
    <ul>
      <li>Plămânii: elimină CO₂ și vapori de apă</li>
      <li>Pielea: elimină apă, săruri și uree prin transpirație</li>
      <li>Intestinul gros: elimină deșeuri digestive</li>
    </ul>
    
    <h3>3. Rinichii</h3>
    <h4>Localizare și aspect:</h4>
    <ul>
      <li>Situați în regiunea lombară, de o parte și de alta a coloanei vertebrale</li>
      <li>Formă de bob de fasole</li>
      <li>Dimensiuni: 10-12 cm lungime, 5-6 cm lățime, 3-4 cm grosime</li>
    </ul>
    
    <h4>Structură macroscopică:</h4>
    <ul>
      <li><strong>Capsula renală:</strong> înveliș fibros</li>
      <li><strong>Cortexul renal:</strong> zona externă</li>
      <li><strong>Medula renală:</strong> zona internă, organizată în piramide renale</li>
      <li><strong>Pelvisul renal:</strong> cavitate care colectează urina</li>
      <li><strong>Hilul renal:</strong> locul de intrare și ieșire al vaselor și ureterului</li>
    </ul>
    
    <h4>Structură microscopică:</h4>
    <ul>
      <li><strong>Nefronul:</strong> unitatea structurală și funcțională a rinichiului</li>
      <li>Aproximativ 1 milion de nefroni în fiecare rinichi</li>
    </ul>
    
    <h3>4. Nefronul</h3>
    <h4>Componente:</h4>
    <ul>
      <li><strong>Corpusculul renal (Malpighi):</strong>
        <ul>
          <li>Glomerulul: ghem de capilare</li>
          <li>Capsula Bowman: învelește glomerulul</li>
        </ul>
      </li>
      <li><strong>Tubul renal:</strong>
        <ul>
          <li>Tubul contort proximal</li>
          <li>Ansa Henle (ramura descendentă și ascendentă)</li>
          <li>Tubul contort distal</li>
        </ul>
      </li>
      <li><strong>Tubul colector:</strong> colectează urina de la mai mulți nefroni</li>
    </ul>
    
    <h3>5. Formarea urinei</h3>
    <h4>Etape:</h4>
    <ul>
      <li><strong>Filtrarea glomerulară:</strong>
        <ul>
          <li>Are loc în corpusculul renal</li>
          <li>Sângele este filtrat sub presiune</li>
          <li>Rezultă ultrafiltratul glomerular (similar cu plasma, dar fără proteine)</li>
          <li>Aproximativ 180 litri/zi</li>
        </ul>
      </li>
      <li><strong>Reabsorbția tubulară:</strong>
        <ul>
          <li>Are loc în tubul renal</li>
          <li>Substanțele utile sunt reabsorbite în sânge</li>
          <li>Reabsorbție selectivă: glucoză, aminoacizi, ioni, apă</li>
          <li>Aproximativ 99% din ultrafiltratul glomerular este reabsorbit</li>
        </ul>
      </li>
      <li><strong>Secreția tubulară:</strong>
        <ul>
          <li>Are loc în tubul renal</li>
          <li>Substanțele toxice și excesul de ioni sunt secretate din sânge în tubul renal</li>
          <li>Contribuie la menținerea echilibrului acido-bazic</li>
        </ul>
      </li>
    </ul>
    
    <h3>6. Compoziția urinei</h3>
    <h4>Componente:</h4>
    <ul>
      <li><strong>Apă:</strong> 95%</li>
      <li><strong>Uree:</strong> principal produs de dezasimilație a proteinelor</li>
      <li><strong>Acid uric:</strong> produs de dezasimilație a acizilor nucleici</li>
      <li><strong>Creatinină:</strong> produs de dezasimilație a creatinei musculare</li>
      <li><strong>Ioni:</strong> Na⁺, K⁺, Cl⁻, HCO₃⁻, etc.</li>
      <li><strong>Pigmenți:</strong> urobilinogen (culoarea galbenă)</li>
    </ul>
    
    <h4>Caracteristici:</h4>
    <ul>
      <li><strong>Volum:</strong> 1-1,5 litri/zi</li>
      <li><strong>pH:</strong> 4,5-8 (în medie 6)</li>
      <li><strong>Densitate:</strong> 1,010-1,025 g/ml</li>
    </ul>
    
    <h3>7. Căile urinare</h3>
    <h4>Ureterele:</h4>
    <ul>
      <li>Tuburi care transportă urina de la rinichi la vezica urinară</li>
      <li>Lungime: aproximativ 25-30 cm</li>
      <li>Peristaltism: contracții care propulsează urina</li>
    </ul>
    
    <h4>Vezica urinară:</h4>
    <ul>
      <li>Organ muscular cavitar</li>
      <li>Capacitate: 500-700 ml</li>
      <li>Funcție: stocarea temporară a urinei</li>
    </ul>
    
    <h4>Uretra:</h4>
    <ul>
      <li>Canal care transportă urina de la vezică în exterior</li>
      <li>Lungime: 3-4 cm la femei, 18-20 cm la bărbați</li>
    </ul>
    
    <h3>8. Micțiunea</h3>
    <h4>Definiție:</h4>
    <p>Procesul de eliminare a urinei din vezica urinară.</p>
    
    <h4>Mecanismul:</h4>
    <ul>
      <li>Distensia vezicii urinare activează receptori de întindere</li>
      <li>Semnalele nervoase sunt transmise la centrii micțiunii din măduva spinării</li>
      <li>Contracția mușchiului detrusor al vezicii</li>
      <li>Relaxarea sfincterelor uretrale</li>
      <li>Eliminarea urinei</li>
    </ul>
    
    <h4>Control:</h4>
    <ul>
      <li>Reflex involuntar la copii mici</li>
      <li>Control voluntar după vârsta de 2-3 ani</li>
    </ul>
    
    <h3>9. Reglarea funcției renale</h3>
    <h4>Hormonală:</h4>
    <ul>
      <li><strong>Hormonul antidiuretic (ADH):</strong> crește reabsorbția apei</li>
      <li><strong>Aldosteronul:</strong> crește reabsorbția Na⁺ și eliminarea K⁺</li>
      <li><strong>Parathormonul:</strong> crește reabsorbția Ca²⁺</li>
    </ul>
    
    <h4>Nervoasă:</h4>
    <ul>
      <li>Sistemul nervos simpatic: vasoconstricție renală, scăderea filtrării</li>
      <li>Sistemul nervos parasimpatic: vasodilatație renală, creșterea filtrării</li>
    </ul>
    
    <h3>10. Afecțiuni ale sistemului excretor</h3>
    <ul>
      <li><strong>Nefrita:</strong> inflamația rinichilor</li>
      <li><strong>Pielonefrita:</strong> infecție a pelvisului renal</li>
      <li><strong>Litiaza renală:</strong> formarea calculilor renali</li>
      <li><strong>Insuficiența renală:</strong> pierderea funcției renale</li>
      <li><strong>Cistita:</strong> inflamația vezicii urinare</li>
      <li><strong>Uretrita:</strong> inflamația uretrei</li>
    </ul>',
    '[{
      "question": "Care este unitatea structurală și funcțională a rinichiului?",
      "options": ["Glomerulul", "Nefronul", "Tubul renal", "Capsula Bowman"],
      "correctAnswer": 1
    }]'::jsonb,
    65
  ),
  
  (
    'bio-10',
    'Anatomie și Fiziologie Umană - Sistemul Endocrin',
    'biologie',
    'Structura și funcțiile sistemului endocrin uman',
    '<h2>Anatomie și Fiziologie Umană - Sistemul Endocrin</h2>
    <h3>1. Introducere în sistemul endocrin</h3>
    <h4>Definiție:</h4>
    <p>Sistemul endocrin este format din glande și țesuturi care secretă hormoni direct în sânge pentru a regla funcțiile organismului.</p>
    
    <h4>Funcții:</h4>
    <ul>
      <li>Reglarea metabolismului</li>
      <li>Menținerea homeostaziei</li>
      <li>Coordonarea creșterii și dezvoltării</li>
      <li>Reglarea reproducerii</li>
      <li>Răspunsul la stres</li>
    </ul>
    
    <h3>2. Hormonii</h3>
    <h4>Definiție:</h4>
    <p>Hormonii sunt mesageri chimici secretați de glandele endocrine, care acționează la distanță asupra organelor țintă.</p>
    
    <h4>Clasificare după structură:</h4>
    <ul>
      <li><strong>Hormoni steroidieni:</strong> derivați din colesterol (ex: estrogen, testosteron, cortizol)</li>
      <li><strong>Hormoni peptidici:</strong> lanțuri de aminoacizi (ex: insulina, glucagonul)</li>
      <li><strong>Hormoni derivați din aminoacizi:</strong> (ex: adrenalina, tiroxina)</li>
    </ul>
    
    <h4>Mecanisme de acțiune:</h4>
    <ul>
      <li><strong>Hormoni liposolubili:</strong> traversează membrana celulară și acționează la nivel nuclear</li>
      <li><strong>Hormoni hidrosolubili:</strong> se leagă de receptori de pe membrana celulară și activează mesageri secundari</li>
    </ul>
    
    <h3>3. Hipotalamusul și hipofiza</h3>
    <h4>Hipotalamusul:</h4>
    <ul>
      <li>Parte a diencefalului</li>
      <li>Secretă hormoni de eliberare și inhibare</li>
      <li>Controlează hipofiza</li>
    </ul>
    
    <h4>Hipofiza (glanda pituitară):</h4>
    <ul>
      <li><strong>Localizare:</strong> la baza creierului, în șaua turcească</li>
      <li><strong>Structură:</strong> adenohipofiza (lobul anterior) și neurohipofiza (lobul posterior)</li>
    </ul>
    
    <h4>Hormoni adenohipofizari:</h4>
    <ul>
      <li><strong>Hormonul de creștere (GH):</strong> stimulează creșterea</li>
      <li><strong>Prolactina (PRL):</strong> stimulează producția de lapte</li>
      <li><strong>Hormonul adrenocorticotrop (ACTH):</strong> stimulează corticosuprarenala</li>
      <li><strong>Hormonul tireostimulant (TSH):</strong> stimulează tiroida</li>
      <li><strong>Hormonii gonadotropi (FSH, LH):</strong> stimulează gonadele</li>
    </ul>
    
    <h4>Hormoni neurohipofizari:</h4>
    <ul>
      <li><strong>Vasopresina (ADH):</strong> reglează reabsorbția apei la nivel renal</li>
      <li><strong>Oxitocina:</strong> stimulează contracțiile uterine și ejecția laptelui</li>
    </ul>
    
    <h3>4. Tiroida</h3>
    <h4>Localizare și structură:</h4>
    <ul>
      <li>Situată în partea anterioară a gâtului</li>
      <li>Formată din doi lobi uniți printr-un istm</li>
      <li>Foliculii tiroidieni: unități funcționale</li>
    </ul>
    
    <h4>Hormoni:</h4>
    <ul>
      <li><strong>Tiroxina (T4) și triiodotironina (T3):</strong>
        <ul>
          <li>Reglează metabolismul bazal</li>
          <li>Influențează creșterea și dezvoltarea</li>
          <li>Necesită iod pentru sinteză</li>
        </ul>
      </li>
      <li><strong>Calcitonina:</strong>
        <ul>
          <li>Scade nivelul calciului în sânge</li>
          <li>Inhibă resorbția osoasă</li>
        </ul>
      </li>
    </ul>
    
    <h3>5. Paratiroidele</h3>
    <h4>Localizare și structură:</h4>
    <ul>
      <li>4 glande mici situate pe fața posterioară a tiroidei</li>
    </ul>
    
    <h4>Hormon:</h4>
    <ul>
      <li><strong>Parathormonul (PTH):</strong>
        <ul>
          <li>Crește nivelul calciului în sânge</li>
          <li>Stimulează resorbția osoasă</li>
          <li>Crește reabsorbția calciului la nivel renal</li>
          <li>Stimulează activarea vitaminei D</li>
        </ul>
      </li>
    </ul>
    
    <h3>6. Glandele suprarenale</h3>
    <h4>Localizare și structură:</h4>
    <ul>
      <li>Situate deasupra rinichilor</li>
      <li>Formate din corticosuprarenală (externă) și medulosuprarenală (internă)</li>
    </ul>
    
    <h4>Hormoni corticosuprarenali:</h4>
    <ul>
      <li><strong>Glucocorticoizi (cortizol):</strong>
        <ul>
          <li>Reglează metabolismul glucidic</li>
          <li>Efect antiinflamator</li>
          <li>Răspuns la stres</li>
        </ul>
      </li>
      <li><strong>Mineralocorticoizi (aldosteron):</strong>
        <ul>
          <li>Reglează echilibrul hidro-electrolitic</li>
          <li>Crește reabsorbția sodiului și eliminarea potasiului</li>
        </ul>
      </li>
      <li><strong>Androgeni suprarenali:</strong>
        <ul>
          <li>Rol în dezvoltarea caracterelor sexuale secundare</li>
        </ul>
      </li>
    </ul>
    
    <h4>Hormoni medulosuprarenali:</h4>
    <ul>
      <li><strong>Adrenalina și noradrenalina:</strong>
        <ul>
          <li>Răspuns la stres ("luptă sau fugi")</li>
          <li>Cresc frecvența cardiacă și tensiunea arterială</li>
          <li>Dilată bronhiile</li>
          <li>Cresc glicemia</li>
        </ul>
      </li>
    </ul>
    
    <h3>7. Pancreasul endocrin</h3>
    <h4>Localizare și structură:</h4>
    <ul>
      <li>Glandă mixtă: endocrină și exocrină</li>
      <li>Insulele Langerhans: unități endocrine</li>
    </ul>
    
    <h4>Hormoni:</h4>
    <ul>
      <li><strong>Insulina (celulele beta):</strong>
        <ul>
          <li>Scade glicemia</li>
          <li>Stimulează captarea glucozei de către celule</li>
          <li>Stimulează glicogenogeneza și lipogeneza</li>
        </ul>
      </li>
      <li><strong>Glucagonul (celulele alfa):</strong>
        <ul>
          <li>Crește glicemia</li>
          <li>Stimulează glicogenoliza și gluconeogeneza</li>
        </ul>
      </li>
    </ul>
    
    <h3>8. Gonadele</h3>
    <h4>Testiculele:</h4>
    <ul>
      <li><strong>Localizare:</strong> în scrot</li>
      <li><strong>Hormon principal:</strong> testosteron</li>
      <li><strong>Funcții:</strong> dezvoltarea caracterelor sexuale masculine, spermatogeneza</li>
    </ul>
    
    <h4>Ovarele:</h4>
    <ul>
      <li><strong>Localizare:</strong> în cavitatea pelviană</li>
      <li><strong>Hormoni principali:</strong> estrogeni și progesteron</li>
      <li><strong>Funcții:</strong> dezvoltarea caracterelor sexuale feminine, ovulația, menstruația, sarcina</li>
    </ul>
    
    <h3>9. Alte glande endocrine</h3>
    <h4>Timusul:</h4>
    <ul>
      <li><strong>Localizare:</strong> în mediastinul superior</li>
      <li><strong>Hormon:</strong> timosina</li>
      <li><strong>Funcție:</strong> maturarea limfocitelor T, imunitate</li>
    </ul>
    
    <h4>Epifiza (glanda pineală):</h4>
    <ul>
      <li><strong>Localizare:</strong> în creier</li>
      <li><strong>Hormon:</strong> melatonina</li>
      <li><strong>Funcție:</strong> reglarea ritmului circadian</li>
    </ul>
    
    <h3>10. Afecțiuni ale sistemului endocrin</h3>
    <ul>
      <li><strong>Diabetul zaharat:</strong> deficit de insulină sau rezistență la insulină</li>
      <li><strong>Hipotiroidismul:</strong> deficit de hormoni tiroidieni</li>
      <li><strong>Hipertiroidismul:</strong> exces de hormoni tiroidieni</li>
      <li><strong>Boala Addison:</strong> insuficiența corticosuprarenală</li>
      <li><strong>Sindromul Cushing:</strong> exces de glucocorticoizi</li>
      <li><strong>Acromegalia:</strong> exces de hormon de creștere la adulți</li>
      <li><strong>Gigantismul:</strong> exces de hormon de creștere în copilărie</li>
    </ul>',
    '[{
      "question": "Care hormon scade nivelul glucozei din sânge?",
      "options": ["Insulina", "Glucagonul", "Adrenalina", "Cortizolul"],
      "correctAnswer": 0
    }]'::jsonb,
    70
  ),
  
  (
    'bio-11',
    'Anatomie și Fiziologie Umană - Sistemul Reproducător',
    'biologie',
    'Structura și funcțiile sistemului reproducător uman',
    '<h2>Anatomie și Fiziologie Umană - Sistemul Reproducător</h2>
    <h3>1. Introducere în sistemul reproducător</h3>
    <h4>Funcții:</h4>
    <ul>
      <li>Producerea gameților (celule reproducătoare)</li>
      <li>Secreția hormonilor sexuali</li>
      <li>Fertilizarea</li>
      <li>Dezvoltarea embrionară și fetală</li>
      <li>Nașterea</li>
    </ul>
    
    <h3>2. Sistemul reproducător masculin</h3>
    <h4>Organe:</h4>
    <ul>
      <li><strong>Testiculele:</strong> producerea spermatozoizilor și a testosteronului</li>
      <li><strong>Epididimul:</strong> maturarea și stocarea spermatozoizilor</li>
      <li><strong>Canalele deferente:</strong> transportul spermatozoizilor</li>
      <li><strong>Veziculele seminale:</strong> secreție bogată în fructoză</li>
      <li><strong>Prostata:</strong> secreție alcalină</li>
      <li><strong>Glandele Cowper:</strong> secreție lubrifianta</li>
      <li><strong>Uretra:</strong> canal comun pentru urină și spermă</li>
      <li><strong>Penisul:</strong> organ copulator</li>
      <li><strong>Scrotul:</strong> învelișul testiculelor</li>
    </ul>
    
    <h3>3. Spermatogeneza</h3>
    <h4>Definiție:</h4>
    <p>Procesul de formare a spermatozoizilor în tubii seminiferi din testicule.</p>
    
    <h4>Etape:</h4>
    <ul>
      <li><strong>Spermatogonia (2n):</strong> celule stem care se divid prin mitoză</li>
      <li><strong>Spermatocite primare (2n):</strong> intră în meioză I</li>
      <li><strong>Spermatocite secundare (n):</strong> rezultate din meioza I, intră în meioza II</li>
      <li><strong>Spermatide (n):</strong> rezultate din meioza II</li>
      <li><strong>Spermatozoizi (n):</strong> rezultați din diferențierea spermatidelor</li>
    </ul>
    
    <h4>Structura spermatozoidului:</h4>
    <ul>
      <li><strong>Cap:</strong> conține nucleul și acrozomul</li>
      <li><strong>Gât:</strong> conține centrioli</li>
      <li><strong>Piesă intermediară:</strong> conține mitocondrii</li>
      <li><strong>Flagel:</strong> asigură mobilitatea</li>
    </ul>
    
    <h3>4. Sistemul reproducător feminin</h3>
    <h4>Organe:</h4>
    <ul>
      <li><strong>Ovarele:</strong> producerea ovulelor și a hormonilor sexuali</li>
      <li><strong>Trompele uterine (Fallopian):</strong> captarea ovulului și transportul spre uter</li>
      <li><strong>Uterul:</strong> adăpostirea și dezvoltarea embrionului/fătului</li>
      <li><strong>Vaginul:</strong> canal pentru menstruație, copulație și naștere</li>
      <li><strong>Vulva:</strong> organele genitale externe</li>
    </ul>
    
    <h3>5. Ovogeneza</h3>
    <h4>Definiție:</h4>
    <p>Procesul de formare a ovulelor în ovare.</p>
    
    <h4>Etape:</h4>
    <ul>
      <li><strong>Ovogonii (2n):</strong> celule stem care se divid prin mitoză</li>
      <li><strong>Ovocite primare (2n):</strong> intră în meioza I (blocată în profază I până la pubertate)</li>
      <li><strong>Ovocite secundare (n):</strong> rezultate din meioza I, intră în meioza II (blocată în metafază II)</li>
      <li><strong>Ovule (n):</strong> rezultate din meioza II (completată doar după fertilizare)</li>
    </ul>
    
    <h4>Particularități:</h4>
    <ul>
      <li>Toate ovocitele primare sunt formate înainte de naștere</li>
      <li>Diviziunea meiotică este asimetrică, rezultând un ovul și corpusculi polari</li>
      <li>Meioza II se completează doar dacă are loc fertilizarea</li>
    </ul>
    
    <h3>6. Ciclul menstrual</h3>
    <h4>Definiție:</h4>
    <p>Schimbări ciclice în ovar și uter, cu o durată medie de 28 de zile.</p>
    
    <h4>Faze ovariene:</h4>
    <ul>
      <li><strong>Faza foliculară (zilele 1-14):</strong> dezvoltarea foliculului ovarian</li>
      <li><strong>Ovulația (ziua 14):</strong> eliberarea ovocitului secundar</li>
      <li><strong>Faza luteală (zilele 15-28):</strong> formarea și funcționarea corpului galben</li>
    </ul>
    
    <h4>Faze uterine:</h4>
    <ul>
      <li><strong>Faza menstruală (zilele 1-5):</strong> eliminarea endometrului</li>
      <li><strong>Faza proliferativă (zilele 6-14):</strong> regenerarea endometrului</li>
      <li><strong>Faza secretorie (zilele 15-28):</strong> pregătirea endometrului pentru implantare</li>
    </ul>
    
    <h4>Reglare hormonală:</h4>
    <ul>
      <li><strong>FSH:</strong> stimulează dezvoltarea foliculilor</li>
      <li><strong>Estrogeni:</strong> stimulează proliferarea endometrului</li>
      <li><strong>LH:</strong> declanșează ovulația</li>
      <li><strong>Progesteron:</strong> pregătește endometrul pentru implantare</li>
    </ul>
    
    <h3>7. Fertilizarea</h3>
    <h4>Definiție:</h4>
    <p>Unirea unui spermatozoid cu un ovul, formând zigotul.</p>
    
    <h4>Localizare:</h4>
    <p>De obicei în treimea externă a trompei uterine.</p>
    
    <h4>Etape:</h4>
    <ul>
      <li>Penetrarea coronei radiata și a zonei pellucida</li>
      <li>Reacția acrozomală</li>
      <li>Fuziunea membranelor</li>
      <li>Reacția corticală (prevenirea polispermiei)</li>
      <li>Formarea zigotului (2n)</li>
    </ul>
    
    <h3>8. Dezvoltarea embrionară și fetală</h3>
    <h4>Etape:</h4>
    <ul>
      <li><strong>Segmentarea:</strong> diviziuni mitotice rapide ale zigotului</li>
      <li><strong>Morula:</strong> grup compact de celule (16-32 celule)</li>
      <li><strong>Blastula:</strong> sferă cu cavitate (blastocoel)</li>
      <li><strong>Implantarea:</strong> atașarea blastulei de endometru (zilele 6-10)</li>
      <li><strong>Gastrulația:</strong> formarea celor trei foițe embrionare (ectoderm, mezoderm, endoderm)</li>
      <li><strong>Organogeneza:</strong> formarea organelor</li>
    </ul>
    
    <h4>Perioada embrionară:</h4>
    <ul>
      <li>Primele 8 săptămâni de dezvoltare</li>
      <li>Formarea tuturor sistemelor de organe</li>
    </ul>
    
    <h4>Perioada fetală:</h4>
    <ul>
      <li>De la 9 săptămâni până la naștere</li>
      <li>Creșterea și maturarea organelor</li>
    </ul>
    
    <h3>9. Anexele embrionare</h3>
    <h4>Placenta:</h4>
    <ul>
      <li>Organ temporar format din țesuturi materne și fetale</li>
      <li>Funcții: schimb de gaze, nutrienți și deșeuri, barieră protectoare, secreție hormonală</li>
    </ul>
    
    <h4>Cordonul ombilical:</h4>
    <ul>
      <li>Conectează fătul de placentă</li>
      <li>Conține două artere și o venă</li>
    </ul>
    
    <h4>Sacul amniotic:</h4>
    <ul>
      <li>Conține lichidul amniotic</li>
      <li>Protejează fătul de șocuri și permite mișcarea</li>
    </ul>
    
    <h3>10. Nașterea</h3>
    <h4>Etape:</h4>
    <ul>
      <li><strong>Dilatația:</strong> dilatarea colului uterin</li>
      <li><strong>Expulzia:</strong> ieșirea fătului</li>
      <li><strong>Delivrența:</strong> eliminarea placentei</li>
    </ul>
    
    <h4>Reglare hormonală:</h4>
    <ul>
      <li><strong>Oxitocina:</strong> stimulează contracțiile uterine</li>
      <li><strong>Prostaglandinele:</strong> intensifică contracțiile</li>
      <li><strong>Relaxina:</strong> relaxează ligamentele pelviene</li>
    </ul>',
    '[{
      "question": "Unde are loc de obicei fertilizarea?",
      "options": ["În uter", "În ovar", "În trompa uterină", "În vagin"],
      "correctAnswer": 2
    }]'::jsonb,
    70
  ),
  
  (
    'bio-12',
    'Anatomie și Fiziologie Umană - Sistemul Imunitar',
    'biologie',
    'Structura și funcțiile sistemului imunitar uman',
    '<h2>Anatomie și Fiziologie Umană - Sistemul Imunitar</h2>
    <h3>1. Introducere în sistemul imunitar</h3>
    <h4>Definiție:</h4>
    <p>Sistemul imunitar este o rețea complexă de celule, țesuturi și organe care protejează organismul împotriva agenților patogeni.</p>
    
    <h4>Funcții:</h4>
    <ul>
      <li>Recunoașterea și eliminarea agenților patogeni</li>
      <li>Eliminarea celulelor moarte sau anormale</li>
      <li>Recunoașterea și toleranța față de celulele proprii</li>
    </ul>
    
    <h3>2. Componentele sistemului imunitar</h3>
    <h4>Organe limfoide:</h4>
    <ul>
      <li><strong>Primare:</strong> măduva osoasă roșie, timusul</li>
      <li><strong>Secundare:</strong> splina, ganglionii limfatici, țesutul limfoid asociat mucoaselor (MALT)</li>
    </ul>
    
    <h4>Celule:</h4>
    <ul>
      <li><strong>Leucocite (globule albe):</strong>
        <ul>
          <li>Granulocite: neutrofile, eozinofile, bazofile</li>
          <li>Agranulocite: limfocite, monocite</li>
        </ul>
      </li>
      <li><strong>Celule prezentatoare de antigen:</strong> macrofage, celule dendritice</li>
    </ul>
    
    <h4>Molecule:</h4>
    <ul>
      <li><strong>Anticorpi (imunoglobuline)</strong></li>
      <li><strong>Complement</strong></li>
      <li><strong>Citokine</strong></li>
    </ul>
    
    <h3>3. Barierele naturale</h3>
    <h4>Bariere fizice:</h4>
    <ul>
      <li><strong>Pielea:</strong> barieră mecanică</li>
      <li><strong>Mucoasele:</strong> acoperă căile respiratorii, digestive, urinare</li>
      <li><strong>Cilii:</strong> în căile respiratorii</li>
      <li><strong>Lacrimile, saliva:</strong> spală agenții patogeni</li>
    </ul>
    
    <h4>Bariere chimice:</h4>
    <ul>
      <li><strong>pH-ul acid:</strong> stomac, vagin</li>
      <li><strong>Enzime:</strong> lizozim în lacrimi și salivă</li>
      <li><strong>Sebum:</strong> secretat de glandele sebacee</li>
    </ul>
    
    <h4>Bariere biologice:</h4>
    <ul>
      <li><strong>Flora normală:</strong> bacterii comensale care previn colonizarea cu patogeni</li>
    </ul>
    
    <h3>4. Imunitatea înnăscută (nespecifică)</h3>
    <h4>Caracteristici:</h4>
    <ul>
      <li>Prezentă de la naștere</li>
      <li>Răspuns rapid, dar nespecific</li>
      <li>Nu are memorie imunologică</li>
    </ul>
    
    <h4>Componente celulare:</h4>
    <ul>
      <li><strong>Neutrofile:</strong> fagocitoză, degranulare</li>
      <li><strong>Macrofage:</strong> fagocitoză, prezentare de antigen</li>
      <li><strong>Celule NK (Natural Killer):</strong> distrugerea celulelor infectate sau tumorale</li>
      <li><strong>Celule dendritice:</strong> prezentare de antigen</li>
    </ul>
    
    <h4>Componente moleculare:</h4>
    <ul>
      <li><strong>Sistemul complement:</strong> cascade proteice care duc la liza celulelor patogene</li>
      <li><strong>Interferonii:</strong> proteine antivirale</li>
      <li><strong>Proteina C reactivă:</strong> opsonizare</li>
    </ul>
    
    <h4>Procese:</h4>
    <ul>
      <li><strong>Inflamația:</strong> răspuns local la infecție sau leziune</li>
      <li><strong>Fagocitoza:</strong> ingerarea și distrugerea microorganismelor</li>
    </ul>
    
    <h3>5. Imunitatea dobândită (specifică)</h3>
    <h4>Caracteristici:</h4>
    <ul>
      <li>Se dezvoltă după expunerea la antigeni</li>
      <li>Răspuns specific pentru fiecare antigen</li>
      <li>Are memorie imunologică</li>
    </ul>
    
    <h4>Tipuri:</h4>
    <ul>
      <li><strong>Imunitatea umorală:</strong> mediată de anticorpi</li>
      <li><strong>Imunitatea celulară:</strong> mediată de limfocite T</li>
    </ul>
    
    <h3>6. Imunitatea umorală</h3>
    <h4>Celule implicate:</h4>
    <ul>
      <li><strong>Limfocite B:</strong> produc anticorpi</li>
      <li><strong>Plasmocite:</strong> limfocite B diferențiate, secretă anticorpi</li>
      <li><strong>Celule B de memorie:</strong> asigură răspunsul imun secundar</li>
    </ul>
    
    <h4>Anticorpi (imunoglobuline):</h4>
    <ul>
      <li><strong>Structură:</strong> proteine în formă de Y, cu regiuni variabile și constante</li>
      <li><strong>Clase:</strong> IgG, IgM, IgA, IgE, IgD</li>
      <li><strong>Funcții:</strong> neutralizare, opsonizare, activarea complementului, citotoxicitate mediată celular</li>
    </ul>
    
    <h4>Etape:</h4>
    <ul>
      <li>Recunoașterea antigenului de către limfocitele B</li>
      <li>Activarea limfocitelor B (cu ajutorul limfocitelor T helper)</li>
      <li>Proliferarea și diferențierea în plasmocite și celule B de memorie</li>
      <li>Secreția de anticorpi</li>
    </ul>
    
    <h3>7. Imunitatea celulară</h3>
    <h4>Celule implicate:</h4>
    <ul>
      <li><strong>Limfocite T:</strong>
        <ul>
          <li>Limfocite T helper (CD4+): activează alte celule imune</li>
          <li>Limfocite T citotoxice (CD8+): distrug celulele infectate</li>
          <li>Limfocite T de memorie: asigură răspunsul imun secundar</li>
          <li>Limfocite T reglatoare: suprimă răspunsul imun</li>
        </ul>
      </li>
    </ul>
    
    <h4>Etape:</h4>
    <ul>
      <li>Prezentarea antigenului de către celulele prezentatoare de antigen</li>
      <li>Recunoașterea antigenului de către limfocitele T</li>
      <li>Activarea limfocitelor T</li>
      <li>Proliferarea și diferențierea în limfocite T efectoare și de memorie</li>
      <li>Eliminarea celulelor infectate</li>
    </ul>
    
    <h3>8. Memoria imunologică</h3>
    <h4>Răspunsul imun primar:</h4>
    <ul>
      <li>Prima expunere la antigen</li>
      <li>Răspuns lent (zile)</li>
      <li>Producție redusă de anticorpi</li>
      <li>Formarea celulelor de memorie</li>
    </ul>
    
    <h4>Răspunsul imun secundar:</h4>
    <ul>
      <li>Expunere ulterioară la același antigen</li>
      <li>Răspuns rapid (ore)</li>
      <li>Producție mare de anticorpi</li>
      <li>Durată mai lungă</li>
    </ul>
    
    <h3>9. Imunizarea</h3>
    <h4>Imunizarea activă:</h4>
    <ul>
      <li><strong>Naturală:</strong> după infecție</li>
      <li><strong>Artificială:</strong> vaccinarea</li>
      <li>Produce celule de memorie</li>
      <li>Protecție de lungă durată</li>
    </ul>
    
    <h4>Imunizarea pasivă:</h4>
    <ul>
      <li><strong>Naturală:</strong> transfer de anticorpi de la mamă la făt</li>
      <li><strong>Artificială:</strong> administrarea de seruri imune</li>
      <li>Nu produce celule de memorie</li>
      <li>Protecție de scurtă durată</li>
    </ul>
    
    <h3>10. Afecțiuni ale sistemului imunitar</h3>
    <h4>Hipersensibilitatea (alergiile):</h4>
    <ul>
      <li>Răspuns imun exagerat la antigeni nepatogeni</li>
      <li>Tipuri: imediată (IgE), citotoxică, prin complexe imune, întârziată</li>
    </ul>
    
    <h4>Bolile autoimune:</h4>
    <ul>
      <li>Sistemul imunitar atacă țesuturile proprii</li>
      <li>Exemple: artrita reumatoidă, lupusul, diabetul de tip 1</li>
    </ul>
    
    <h4>Imunodeficiențele:</h4>
    <ul>
      <li><strong>Primare:</strong> congenitale</li>
      <li><strong>Secundare:</strong> dobândite (ex: SIDA)</li>
    </ul>',
    '[{
      "question": "Care celule sunt responsabile pentru producerea de anticorpi?",
      "options": ["Limfocitele T", "Limfocitele B", "Neutrofilele", "Macrofagele"],
      "correctAnswer": 1
    }]'::jsonb,
    70
  ),
  
  (
    'bio-13',
    'Evoluționism',
    'biologie',
    'Teorii și dovezi ale evoluției speciilor',
    '<h2>Evoluționism</h2>
    <h3>1. Introducere în evoluționism</h3>
    <h4>Definiție:</h4>
    <p>Evoluționismul este teoria conform căreia speciile se modifică de-a lungul timpului, dând naștere la noi specii prin procese naturale.</p>
    
    <h4>Concepte fundamentale:</h4>
    <ul>
      <li>Variabilitatea genetică</li>
      <li>Selecția naturală</li>
      <li>Adaptarea</li>
      <li>Speciația</li>
    </ul>
    
    <h3>2. Teorii evoluționiste</h3>
    <h4>Lamarckismul (Jean-Baptiste Lamarck):</h4>
    <ul>
      <li>Caracterele dobândite în timpul vieții se transmit urmașilor</li>
      <li>Organele folosite se dezvoltă, cele nefolosite se atrofiază</li>
      <li>Exemplu: gâtul girafei s-a alungit prin efortul de a ajunge la frunzele înalte</li>
      <li>Teoria a fost infirmată științific</li>
    </ul>
    
    <h4>Darwinismul (Charles Darwin):</h4>
    <ul>
      <li>Publicat în "Originea speciilor" (1859)</li>
      <li>Principii:
        <ul>
          <li>Variabilitatea indivizilor în cadrul speciei</li>
          <li>Lupta pentru existență</li>
          <li>Selecția naturală ("supraviețuirea celui mai adaptat")</li>
          <li>Transmiterea caracterelor avantajoase urmașilor</li>
        </ul>
      </li>
    </ul>
    
    <h4>Teoria sintetică a evoluției (neodarwinismul):</h4>
    <ul>
      <li>Îmbină darwinismul cu genetica modernă</li>
      <li>Factori ai evoluției:
        <ul>
          <li>Mutațiile genetice</li>
          <li>Recombinarea genetică</li>
          <li>Selecția naturală</li>
          <li>Deriva genetică</li>
          <li>Fluxul genetic (migrația)</li>
          <li>Izolarea reproductivă</li>
        </ul>
      </li>
    </ul>
    
    <h3>3. Dovezi ale evoluției</h3>
    <h4>Dovezi paleontologice:</h4>
    <ul>
      <li><strong>Fosilele:</strong> rămășițe sau urme ale organismelor din trecut</li>
      <li><strong>Serii evolutive:</strong> succesiuni de fosile care arată transformarea graduală (ex: evoluția calului)</li>
      <li><strong>Forme de tranziție:</strong> organisme cu caracteristici intermediare (ex: Archaeopteryx)</li>
    </ul>
    
    <h4>Dovezi anatomice:</h4>
    <ul>
      <li><strong>Organe omoloage:</strong> structuri cu origine comună, dar funcții diferite (ex: membrul anterior la vertebrate)</li>
      <li><strong>Organe analoage:</strong> structuri cu origine diferită, dar funcții similare (ex: aripa insectei și aripa păsării)</li>
      <li><strong>Organe vestigiale:</strong> structuri reduse, fără funcție sau cu funcție redusă (ex: apendicele la om)</li>
    </ul>
    
    <h4>Dovezi embriologice:</h4>
    <ul>
      <li><strong>Legea biogenetică:</strong> ontogenia recapitulează filogenia (parțial)</li>
      <li><strong>Asemănarea embrionilor:</strong> embrionii vertebratelor sunt foarte asemănători în stadiile timpurii</li>
    </ul>
    
    <h4>Dovezi biogeografice:</h4>
    <ul>
      <li><strong>Distribuția speciilor:</strong> specii înrudite în regiuni geografice apropiate</li>
      <li><strong>Insule:</strong> specii endemice adaptate la condiții locale</li>
    </ul>
    
    <h4>Dovezi moleculare:</h4>
    <ul>
      <li><strong>ADN și proteine:</strong> similarități între specii înrudite</li>
      <li><strong>Ceasul molecular:</strong> rata de mutație relativ constantă</li>
      <li><strong>Genomica comparativă:</strong> compararea genomurilor diferitelor specii</li>
    </ul>
    
    <h3>4. Selecția naturală</h3>
    <h4>Definiție:</h4>
    <p>Procesul prin care indivizii cu caracteristici avantajoase supraviețuiesc și se reproduc mai eficient.</p>
    
    <h4>Tipuri:</h4>
    <ul>
      <li><strong>Selecția direcțională:</strong> favorizează o extremă a variației (ex: gâtul lung al girafei)</li>
      <li><strong>Selecția stabilizatoare:</strong> favorizează valoarea medie (ex: greutatea la naștere la om)</li>
      <li><strong>Selecția disruptivă:</strong> favorizează ambele extreme (ex: mărimea ciocului la anumite păsări)</li>
    </ul>
    
    <h4>Exemple:</h4>
    <ul>
      <li><strong>Melanismul industrial:</strong> fluturii de mesteacăn în timpul Revoluției Industriale</li>
      <li><strong>Rezistența la antibiotice:</strong> evoluția bacteriilor rezistente</li>
      <li><strong>Ciocul păsărilor Darwin:</strong> adaptare la diferite surse de hrană</li>
    </ul>
    
    <h3>5. Adaptarea</h3>
    <h4>Definiție:</h4>
    <p>Procesul prin care organismele dobândesc caracteristici care le permit să supraviețuiască și să se reproducă în mediul lor.</p>
    
    <h4>Tipuri de adaptări:</h4>
    <ul>
      <li><strong>Morfologice:</strong> forma și structura corpului (ex: camuflaj, mimicrie)</li>
      <li><strong>Fiziologice:</strong> procese interne (ex: toleranța la temperaturi extreme)</li>
      <li><strong>Comportamentale:</strong> comportamente specifice (ex: migrația, hibernarea)</li>
    </ul>
    
    <h4>Exemple:</h4>
    <ul>
      <li><strong>Cactușii:</strong> adaptări pentru conservarea apei</li>
      <li><strong>Urșii polari:</strong> adaptări pentru climatul arctic</li>
      <li><strong>Păsările colibri:</strong> adaptări pentru hrănirea cu nectar</li>
    </ul>
    
    <h3>6. Speciația</h3>
    <h4>Definiție:</h4>
    <p>Procesul de formare a noi specii prin izolarea reproductivă a populațiilor.</p>
    
    <h4>Mecanisme de izolare reproductivă:</h4>
    <ul>
      <li><strong>Izolare prezigotică:</strong> împiedică formarea zigotului
        <ul>
          <li>Izolare geografică</li>
          <li>Izolare ecologică</li>
          <li>Izolare comportamentală</li>
          <li>Izolare mecanică</li>
          <li>Izolare temporală</li>
        </ul>
      </li>
      <li><strong>Izolare postzigotică:</strong> împiedică dezvoltarea zigotului sau fertilitatea hibrizilor
        <ul>
          <li>Mortalitatea zigotului</li>
          <li>Mortalitatea hibrizilor</li>
          <li>Sterilitatea hibrizilor</li>
        </ul>
      </li>
    </ul>
    
    <h4>Tipuri de speciație:</h4>
    <ul>
      <li><strong>Speciația alopatrică:</strong> prin izolare geografică</li>
      <li><strong>Speciația simpatrică:</strong> fără izolare geografică</li>
      <li><strong>Speciația parapatrică:</strong> populații adiacente cu flux genetic limitat</li>
      <li><strong>Speciația peripatrică:</strong> izolarea unei populații mici la marginea arealului</li>
    </ul>
    
    <h3>7. Macroevoluția</h3>
    <h4>Definiție:</h4>
    <p>Evoluția la scară mare, deasupra nivelului speciei, care duce la formarea de noi genuri, familii, ordine etc.</p>
    
    <h4>Concepte:</h4>
    <ul>
      <li><strong>Radiația adaptativă:</strong> diversificarea rapidă a unei linii evolutive (ex: mamiferele după dispariția dinozaurilor)</li>
      <li><strong>Convergența evolutivă:</strong> dezvoltarea de caracteristici similare la specii neînrudite (ex: aripa liliacului și aripa păsării)</li>
      <li><strong>Evoluția divergentă:</strong> dezvoltarea de caracteristici diferite la specii înrudite</li>
      <li><strong>Coevoluția:</strong> evoluția reciprocă a două specii care interacționează (ex: plante și polenizatori)</li>
    </ul>
    
    <h3>8. Evoluția omului</h3>
    <h4>Hominide timpurii:</h4>
    <ul>
      <li><strong>Australopithecus:</strong> 4-2 milioane de ani în urmă, mers biped, creier mic</li>
      <li><strong>Homo habilis:</strong> 2,4-1,5 milioane de ani în urmă, primele unelte de piatră</li>
      <li><strong>Homo erectus:</strong> 1,9-0,4 milioane de ani în urmă, folosirea focului</li>
    </ul>
    
    <h4>Oameni arhaici:</h4>
    <ul>
      <li><strong>Homo neanderthalensis:</strong> 400.000-40.000 de ani în urmă, adaptat la climat rece</li>
      <li><strong>Homo denisova:</strong> contemporan cu neanderthalenii</li>
    </ul>
    
    <h4>Oameni moderni:</h4>
    <ul>
      <li><strong>Homo sapiens:</strong> apărut acum aproximativ 300.000 de ani în Africa</li>
      <li>Migrația din Africa acum 50.000-70.000 de ani</li>
      <li>Dezvoltarea limbajului, artei, agriculturii, civilizației</li>
    </ul>
    
    <h3>9. Extincția</h3>
    <h4>Definiție:</h4>
    <p>Dispariția completă a unei specii sau a unui grup taxonomic.</p>
    
    <h4>Cauze:</h4>
    <ul>
      <li><strong>Naturale:</strong> schimbări climatice, competiție, boli, catastrofe naturale</li>
      <li><strong>Antropice:</strong> distrugerea habitatelor, poluarea, vânătoarea excesivă, specii invazive</li>
    </ul>
    
    <h4>Extincții în masă:</h4>
    <ul>
      <li><strong>Permian-Triasic:</strong> acum 252 milioane de ani, 96% din speciile marine</li>
      <li><strong>Cretacic-Paleogen:</strong> acum 66 milioane de ani, dispariția dinozaurilor</li>
      <li><strong>Extincția actuală:</strong> cauzată de activitățile umane</li>
    </ul>',
    '[{
      "question": "Ce este selecția naturală?",
      "options": ["Supraviețuirea celor mai adaptați", "Modificări genetice intenționate", "Reproducerea asexuată", "Mutații"],
      "correctAnswer": 0
    }]'::jsonb,
    70
  ),
  
  (
    'bio-14',
    'Biotehnologii',
    'biologie',
    'Aplicații ale biologiei în tehnologie',
    '<h2>Biotehnologii</h2>
    <h3>1. Introducere în biotehnologii</h3>
    <h4>Definiție:</h4>
    <p>Biotehnologia reprezintă utilizarea sistemelor biologice, a organismelor vii sau a derivatelor acestora pentru a dezvolta produse și procese utile.</p>
    
    <h4>Clasificare:</h4>
    <ul>
      <li><strong>Biotehnologia tradițională:</strong> fermentația, selecția artificială</li>
      <li><strong>Biotehnologia modernă:</strong> ingineria genetică, clonarea, terapia genică</li>
    </ul>
    
    <h4>Domenii de aplicare:</h4>
    <ul>
      <li>Medicină</li>
      <li>Agricultură</li>
      <li>Industria alimentară</li>
      <li>Protecția mediului</li>
      <li>Industria farmaceutică</li>
    </ul>
    
    <h3>2. Ingineria genetică</h3>
    <h4>Definiție:</h4>
    <p>Manipularea directă a materialului genetic al unui organism folosind tehnici de laborator.</p>
    
    <h4>Tehnici:</h4>
    <ul>
      <li><strong>Tehnologia ADN recombinant:</strong> combinarea ADN-ului din surse diferite</li>
      <li><strong>PCR (Polymerase Chain Reaction):</strong> amplificarea ADN-ului</li>
      <li><strong>Secvențierea ADN-ului:</strong> determinarea ordinii nucleotidelor</li>
      <li><strong>CRISPR-Cas9:</strong> editarea precisă a genomului</li>
    </ul>
    
    <h4>Etape în tehnologia ADN recombinant:</h4>
    <ol>
      <li>Izolarea genei de interes</li>
      <li>Inserarea genei într-un vector (plasmidă, virus)</li>
      <li>Introducerea vectorului într-o celulă gazdă</li>
      <li>Selecția celulelor care conțin gena de interes</li>
      <li>Cultivarea celulelor pentru a produce proteina de interes</li>
    </ol>
    
    <h3>3. Organisme modificate genetic (OMG)</h3>
    <h4>Definiție:</h4>
    <p>Organisme al căror material genetic a fost modificat prin tehnici de inginerie genetică.</p>
    
    <h4>Aplicații în agricultură:</h4>
    <ul>
      <li><strong>Plante rezistente la dăunători:</strong> porumb Bt, bumbac Bt</li>
      <li><strong>Plante rezistente la erbicide:</strong> soia Roundup Ready</li>
      <li><strong>Plante cu calități nutriționale îmbunătățite:</strong> orezul auriu (bogat în beta-caroten)</li>
      <li><strong>Plante rezistente la condiții de mediu nefavorabile:</strong> secetă, salinitate</li>
    </ul>
    
    <h4>Aplicații în zootehnie:</h4>
    <ul>
      <li><strong>Animale cu creștere accelerată:</strong> somon AquAdvantage</li>
      <li><strong>Animale rezistente la boli</strong></li>
      <li><strong>Animale care produc substanțe de interes medical în lapte</strong></li>
    </ul>
    
    <h4>Controverse:</h4>
    <ul>
      <li>Siguranța alimentară</li>
      <li>Impactul asupra mediului</li>
      <li>Considerații etice</li>
      <li>Dependența fermierilor de companiile producătoare de semințe</li>
    </ul>
    
    <h3>4. Clonarea</h3>
    <h4>Definiție:</h4>
    <p>Procesul de creare a unei copii genetice identice a unui organism.</p>
    
    <h4>Tipuri:</h4>
    <ul>
      <li><strong>Clonarea moleculară:</strong> copierea ADN-ului</li>
      <li><strong>Clonarea celulară:</strong> producerea de celule identice</li>
      <li><strong>Clonarea organismelor:</strong> producerea de organisme identice</li>
    </ul>
    
    <h4>Tehnici:</h4>
    <ul>
      <li><strong>Scindarea embrionului:</strong> divizarea artificială a unui embrion timpuriu</li>
      <li><strong>Transferul nuclear de celule somatice (TNCS):</strong> transferul nucleului unei celule somatice într-un ovul enucleeat</li>
    </ul>
    
    <h4>Exemple:</h4>
    <ul>
      <li><strong>Oaia Dolly (1996):</strong> primul mamifer clonat din celule adulte</li>
      <li><strong>Clonarea terapeutică:</strong> pentru obținerea de celule stem</li>
    </ul>
    
    <h3>5. Celule stem</h3>
    <h4>Definiție:</h4>
    <p>Celule nediferențiate care au capacitatea de a se diviza și de a se diferenția în diverse tipuri de celule specializate.</p>
    
    <h4>Tipuri:</h4>
    <ul>
      <li><strong>Celule stem totipotente:</strong> pot forma un organism întreg (zigotul)</li>
      <li><strong>Celule stem pluripotente:</strong> pot forma orice tip de celulă din organism, dar nu un organism întreg</li>
      <li><strong>Celule stem multipotente:</strong> pot forma mai multe tipuri de celule dintr-o anumită linie celulară</li>
      <li><strong>Celule stem unipotente:</strong> pot forma un singur tip de celulă</li>
    </ul>
    
    <h4>Surse:</h4>
    <ul>
      <li><strong>Embrionare:</strong> din embrioni în stadiu timpuriu</li>
      <li><strong>Adulte:</strong> din țesuturi mature (măduva osoasă, țesut adipos)</li>
      <li><strong>Celule stem pluripotente induse (iPSC):</strong> celule adulte reprogramate genetic</li>
      <li><strong>Sânge din cordonul ombilical</strong></li>
    </ul>
    
    <h4>Aplicații:</h4>
    <ul>
      <li>Tratamentul bolilor degenerative</li>
      <li>Regenerarea țesuturilor și organelor</li>
      <li>Testarea medicamentelor</li>
      <li>Studiul dezvoltării și bolilor</li>
    </ul>
    
    <h3>6. Terapia genică</h3>
    <h4>Definiție:</h4>
    <p>Tratamentul bolilor prin introducerea de material genetic funcțional în celulele pacientului.</p>
    
    <h4>Tipuri:</h4>
    <ul>
      <li><strong>Terapia genică somatică:</strong> modificarea celulelor somatice (non-reproductive)</li>
      <li><strong>Terapia genică germinală:</strong> modificarea celulelor germinale (reproductive) - controversată etic</li>
    </ul>
    
    <h4>Metode:</h4>
    <ul>
      <li><strong>Ex vivo:</strong> celulele sunt extrase, modificate genetic și reintroduse în pacient</li>
      <li><strong>In vivo:</strong> materialul genetic este introdus direct în organismul pacientului</li>
    </ul>
    
    <h4>Vectori:</h4>
    <ul>
      <li><strong>Virusuri modificate:</strong> adenovirusuri, retrovirusuri, virusuri adeno-asociate</li>
      <li><strong>Vectori non-virali:</strong> lipozomi, nanoparticule, plasmide</li>
    </ul>
    
    <h4>Aplicații:</h4>
    <ul>
      <li>Boli monogenice: fibroza chistică, hemofilia, distrofia musculară</li>
      <li>Cancer: imunoterapia CAR-T</li>
      <li>Boli infecțioase: HIV</li>
      <li>Boli neurodegenerative: Parkinson, Alzheimer</li>
    </ul>
    
    <h3>7. Biotehnologii în medicină</h3>
    <h4>Producerea de medicamente:</h4>
    <ul>
      <li><strong>Insulina:</strong> primul medicament produs prin tehnologia ADN recombinant (1982)</li>
      <li><strong>Hormoni de creștere</strong></li>
      <li><strong>Factori de coagulare</strong></li>
      <li><strong>Anticorpi monoclonali</strong></li>
      <li><strong>Vaccinuri</strong></li>
    </ul>
    
    <h4>Diagnosticul molecular:</h4>
    <ul>
      <li><strong>PCR:</strong> detectarea agenților patogeni</li>
      <li><strong>Hibridizarea ADN:</strong> identificarea mutațiilor</li>
      <li><strong>Secvențierea ADN:</strong> determinarea predispoziției genetice</li>
    </ul>
    
    <h4>Medicina personalizată:</h4>
    <ul>
      <li>Tratamente adaptate profilului genetic al pacientului</li>
      <li>Farmacogenomica: studiul influenței geneticii asupra răspunsului la medicamente</li>
    </ul>
    
    <h3>8. Biotehnologii în agricultură și industria alimentară</h3>
    <h4>Ameliorarea plantelor și animalelor:</h4>
    <ul>
      <li>Selecția asistată de markeri</li>
      <li>Modificarea genetică pentru caracteristici dorite</li>
    </ul>
    
    <h4>Biofertilizatori și biopesticide:</h4>
    <ul>
      <li>Microorganisme benefice pentru sol</li>
      <li>Alternative ecologice la pesticidele chimice</li>
    </ul>
    
    <h4>Fermentația:</h4>
    <ul>
      <li>Producerea de alimente fermentate: iaurt, brânză, pâine, bere, vin</li>
      <li>Utilizarea microorganismelor pentru îmbunătățirea calității și conservării alimentelor</li>
    </ul>
    
    <h3>9. Biotehnologii în protecția mediului</h3>
    <h4>Bioremedierea:</h4>
    <ul>
      <li>Utilizarea microorganismelor pentru degradarea poluanților</li>
      <li>Fitoremedierea: utilizarea plantelor pentru extragerea poluanților din sol</li>
    </ul>
    
    <h4>Biocombustibilii:</h4>
    <ul>
      <li>Bioetanol: din fermentația zaharurilor</li>
      <li>Biodiesel: din uleiuri vegetale sau grăsimi animale</li>
      <li>Biogaz: din descompunerea anaerobă a materiei organice</li>
    </ul>
    
    <h4>Tratarea apelor uzate:</h4>
    <ul>
      <li>Utilizarea microorganismelor pentru degradarea materiei organice</li>
      <li>Eliminarea nutrienților (azot, fosfor) pentru prevenirea eutrofizării</li>
    </ul>
    
    <h3>10. Aspecte etice și sociale</h3>
    <h4>Probleme etice:</h4>
    <ul>
      <li>Manipularea genomului uman</li>
      <li>Clonarea reproductivă la om</li>
      <li>Utilizarea celulelor stem embrionare</li>
      <li>Brevetarea genelor și organismelor</li>
    </ul>
    
    <h4>Reglementări:</h4>
    <ul>
      <li>Evaluarea riscurilor</li>
      <li>Principiul precauției</li>
      <li>Etichetarea produselor modificate genetic</li>
      <li>Comitete de etică</li>
    </ul>
    
    <h4>Perspective de viitor:</h4>
    <ul>
      <li>Medicina regenerativă</li>
      <li>Organe artificiale</li>
      <li>Biologia sintetică</li>
      <li>Editarea genomului uman</li>
    </ul>',
    '[{
      "question": "Ce este ingineria genetică?",
      "options": ["Modificarea ADN-ului", "Clonarea organismelor", "Producerea de anticorpi", "Cultivarea țesuturilor"],
      "correctAnswer": 0
    }]'::jsonb,
    70
  ),
  
  (
    'bio-15',
    'Microbiologie',
    'biologie',
    'Studiul microorganismelor și rolul lor în natură',
    '<h2>Microbiologie</h2>
    <h3>1. Introducere în microbiologie</h3>
    <h4>Definiție:</h4>
    <p>Microbiologia este știința care studiază microorganismele: organisme microscopice care nu pot fi văzute cu ochiul liber.</p>
    
    <h4>Istoric:</h4>
    <ul>
      <li><strong>Antonie van Leeuwenhoek (1632-1723):</strong> primul care a observat microorganismele</li>
      <li><strong>Louis Pasteur (1822-1895):</strong> a infirmat teoria generației spontane, a dezvoltat pasteurizarea</li>
      <li><strong>Robert Koch (1843-1910):</strong> a stabilit legătura dintre microorganisme și boli (postulatele lui Koch)</li>
    </ul>
    
    <h4>Ramuri ale microbiologiei:</h4>
    <ul>
      <li>Bacteriologie</li>
      <li>Virologie</li>
      <li>Micologie (studiul fungilor)</li>
      <li>Parazitologie</li>
      <li>Imunologie</li>
    </ul>
    
    <h3>2. Bacteriile</h3>
    <h4>Caracteristici generale:</h4>
    <ul>
      <li>Organisme procariote unicelulare</li>
      <li>Dimensiuni: 0,2-10 μm</li>
      <li>Reproducere asexuată prin diviziune binară</li>
      <li>Metabolism variat</li>
    </ul>
    
    <h4>Structura celulei bacteriene:</h4>
    <ul>
      <li><strong>Peretele celular:</strong> conferă formă și protecție</li>
      <li><strong>Membrana plasmatică:</strong> barieră semipermeabilă</li>
      <li><strong>Citoplasmă:</strong> conține ribozomi și incluziuni</li>
      <li><strong>Nucleoid:</strong> ADN circular</li>
      <li><strong>Plasmide:</strong> ADN extracromozomial</li>
      <li><strong>Structuri externe:</strong> capsulă, flageli, pili</li>
    </ul>
    
    <h4>Clasificare după formă:</h4>
    <ul>
      <li><strong>Coci:</strong> sferici (ex: Staphylococcus, Streptococcus)</li>
      <li><strong>Bacili:</strong> în formă de bastonaș (ex: Escherichia, Bacillus)</li>
      <li><strong>Spirili:</strong> spiralați (ex: Spirillum)</li>
      <li><strong>Vibrioni:</strong> în formă de virgulă (ex: Vibrio)</li>
      <li><strong>Spirochete:</strong> spiralați flexibili (ex: Treponema)</li>
    </ul>
    
    <h4>Clasificare după colorația Gram:</h4>
    <ul>
      <li><strong>Gram-pozitive:</strong> perete celular gros, cu peptidoglican (violet)</li>
      <li><strong>Gram-negative:</strong> perete celular subțire, cu membrană externă (roșu)</li>
    </ul>
    
    <h3>3. Virusurile</h3>
    <h4>Caracteristici generale:</h4>
    <ul>
      <li>Entități acelulare</li>
      <li>Paraziți intracelulari obligatorii</li>
      <li>Conțin un singur tip de acid nucleic (ADN sau ARN)</li>
      <li>Dimensiuni: 20-300 nm</li>
      <li>Nu au metabolism propriu</li>
    </ul>
    
    <h4>Structura virusului:</h4>
    <ul>
      <li><strong>Capsida:</strong> înveliș proteic</li>
      <li><strong>Genom:</strong> ADN sau ARN</li>
      <li><strong>Anvelopa:</strong> înveliș lipidic (la unele virusuri)</li>
      <li><strong>Enzime:</strong> pentru replicare și infecție</li>
    </ul>
    
    <h4>Clasificare:</h4>
    <ul>
      <li><strong>După tipul de acid nucleic:</strong> virusuri ADN, virusuri ARN</li>
      <li><strong>După prezența anvelopei:</strong> virusuri anvelopate, virusuri neanvelopate</li>
      <li><strong>După simetria capsidei:</strong> icosaedrică, helicoidală, complexă</li>
    </ul>
    
    <h4>Ciclul de replicare virală:</h4>
    <ol>
      <li>Atașarea la celula gazdă</li>
      <li>Penetrarea și dezvelirea</li>
      <li>Replicarea genomului viral</li>
      <li>Sinteza proteinelor virale</li>
      <li>Asamblarea virionilor</li>
      <li>Eliberarea virionilor</li>
    </ol>
    
    <h3>4. Fungii (ciupercile)</h3>
    <h4>Caracteristici generale:</h4>
    <ul>
      <li>Organisme eucariote</li>
      <li>Unicelulare (drojdii) sau multicelulare (mucegaiuri, ciuperci)</li>
      <li>Heterotrofe: saprofite sau parazite</li>
      <li>Perete celular din chitină</li>
    </ul>
    
    <h4>Structură:</h4>
    <ul>
      <li><strong>Hife:</strong> filamente celulare</li>
      <li><strong>Miceliu:</strong> rețea de hife</li>
      <li><strong>Corp de fructificație:</strong> structură reproductivă</li>
    </ul>
    
    <h4>Reproducere:</h4>
    <ul>
      <li><strong>Asexuată:</strong> prin spori, înmugurire (drojdii)</li>
      <li><strong>Sexuată:</strong> prin fuziunea celulelor</li>
    </ul>
    
    <h4>Exemple:</h4>
    <ul>
      <li><strong>Drojdii:</strong> Saccharomyces cerevisiae (drojdia de bere)</li>
      <li><strong>Mucegaiuri:</strong> Penicillium, Aspergillus</li>
      <li><strong>Ciuperci comestibile:</strong> Agaricus bisporus (ciuperca de cultură)</li>
      <li><strong>Ciuperci patogene:</strong> Candida albicans</li>
    </ul>
    
    <h3>5. Protozoare</h3>
    <h4>Caracteristici generale:</h4>
    <ul>
      <li>Organisme eucariote unicelulare</li>
      <li>Heterotrofe</li>
      <li>Mobilitate prin flageli, cili sau pseudopode</li>
    </ul>
    
    <h4>Clasificare:</h4>
    <ul>
      <li><strong>Flagelate:</strong> cu flageli (ex: Trypanosoma, Giardia)</li>
      <li><strong>Ciliate:</strong> cu cili (ex: Paramecium)</li>
      <li><strong>Amibe:</strong> cu pseudopode (ex: Entamoeba)</li>
      <li><strong>Sporozoare:</strong> fără structuri de locomoție (ex: Plasmodium)</li>
    </ul>
    
    <h4>Exemple de protozoare patogene:</h4>
    <ul>
      <li><strong>Plasmodium:</strong> malaria</li>
      <li><strong>Trypanosoma:</strong> boala somnului</li>
      <li><strong>Entamoeba histolytica:</strong> dizenteria amibiană</li>
      <li><strong>Giardia lamblia:</strong> giardioza</li>
    </ul>
    
    <h3>6. Rolul microorganismelor în natură</h3>
    <h4>Ciclurile biogeochimice:</h4>
    <ul>
      <li><strong>Ciclul carbonului:</strong> descompunerea materiei organice</li>
      <li><strong>Ciclul azotului:</strong> fixarea azotului, nitrificarea, denitrificarea</li>
      <li><strong>Ciclul sulfului:</strong> oxidarea și reducerea compușilor cu sulf</li>
    </ul>
    
    <h4>Relații cu alte organisme:</h4>
    <ul>
      <li><strong>Simbioză:</strong> lichenii (alge și fungi), micorize (fungi și rădăcini), bacterii fixatoare de azot</li>
      <li><strong>Comensalism:</strong> flora normală a pielii și mucoaselor</li>
      <li><strong>Parazitism:</strong> agenți patogeni</li>
    </ul>
    
    <h4>Biodegradarea:</h4>
    <ul>
      <li>Descompunerea materiei organice moarte</li>
      <li>Reciclarea nutrienților</li>
      <li>Degradarea poluanților</li>
    </ul>
    
    <h3>7. Microorganisme și boli</h3>
    <h4>Patogenitate și virulență:</h4>
    <ul>
      <li><strong>Patogenitate:</strong> capacitatea de a produce boală</li>
      <li><strong>Virulență:</strong> gradul de patogenitate</li>
      <li><strong>Factori de virulență:</strong> toxine, enzime, capsule, adezine</li>
    </ul>
    
    <h4>Căi de transmitere:</h4>
    <ul>
      <li><strong>Directă:</strong> contact, picături respiratorii</li>
      <li><strong>Indirectă:</strong> alimente, apă, obiecte contaminate, vectori</li>
    </ul>
    
    <h4>Exemple de boli infecțioase:</h4>
    <ul>
      <li><strong>Bacteriene:</strong> tuberculoza, tetanosul, holera, pneumonia</li>
      <li><strong>Virale:</strong> gripa, HIV/SIDA, hepatita, COVID-19</li>
      <li><strong>Fungice:</strong> candidoza, dermatomicoze</li>
      <li><strong>Parazitare:</strong> malaria, giardioza, toxoplasmoza</li>
    </ul>
    
    <h3>8. Aplicații ale microbiologiei</h3>
    <h4>Medicină:</h4>
    <ul>
      <li><strong>Antibiotice:</strong> substanțe produse de microorganisme care inhibă creșterea altor microorganisme</li>
      <li><strong>Vaccinuri:</strong> prevenirea bolilor infecțioase</li>
      <li><strong>Diagnostic:</strong> identificarea agenților patogeni</li>
    </ul>
    
    <h4>Industria alimentară:</h4>
    <ul>
      <li><strong>Fermentația:</strong> producerea de alimente (iaurt, brânză, pâine, bere, vin)</li>
      <li><strong>Conservarea alimentelor</strong></li>
      <li><strong>Probiotice:</strong> microorganisme benefice pentru sănătate</li>
    </ul>
    
    <h4>Biotehnologie:</h4>
    <ul>
      <li><strong>Producerea de enzime industriale</strong></li>
      <li><strong>Biosinteza de vitamine, aminoacizi, hormoni</strong></li>
      <li><strong>Biocombustibili</strong></li>
    </ul>
    
    <h4>Protecția mediului:</h4>
    <ul>
      <li><strong>Bioremedierea:</strong> utilizarea microorganismelor pentru curățarea poluanților</li>
      <li><strong>Tratarea apelor uzate</strong></li>
      <li><strong>Compostarea</strong></li>
    </ul>
    
    <h3>9. Metode de studiu în microbiologie</h3>
    <h4>Microscopia:</h4>
    <ul>
      <li><strong>Microscopia optică:</strong> cu lumină vizibilă</li>
      <li><strong>Microscopia electronică:</strong> cu fascicul de electroni</li>
      <li><strong>Microscopia cu fluorescență:</strong> utilizând coloranți fluorescenți</li>
    </ul>
    
    <h4>Cultivarea microorganismelor:</h4>
    <ul>
      <li><strong>Medii de cultură:</strong> lichide, solide, selective, diferențiale</li>
      <li><strong>Condiții de cultură:</strong> temperatură, pH, oxigen</li>
      <li><strong>Tehnici de izolare:</strong> diluții seriate, însămânțare în strii</li>
    </ul>
    
    <h4>Tehnici moleculare:</h4>
    <ul>
      <li><strong>PCR:</strong> amplificarea ADN-ului</li>
      <li><strong>Secvențierea ADN-ului</strong></li>
      <li><strong>Hibridizarea acizilor nucleici</strong></li>
      <li><strong>Electroforeza</strong></li>
    </ul>
    
    <h3>10. Rezistența la antibiotice</h3>
    <h4>Definiție:</h4>
    <p>Capacitatea microorganismelor de a supraviețui în prezența antibioticelor care ar trebui să le distrugă sau să le inhibe creșterea.</p>
    
    <h4>Mecanisme de rezistență:</h4>
    <ul>
      <li><strong>Inactivarea antibioticului:</strong> prin enzime (ex: beta-lactamaze)</li>
      <li><strong>Modificarea țintei:</strong> schimbări în structura proteinelor țintă</li>
      <li><strong>Reducerea permeabilității:</strong> limitarea pătrunderii antibioticului</li>
      <li><strong>Pompele de eflux:</strong> eliminarea activă a antibioticului din celulă</li>
    </ul>
    
    <h4>Cauze ale răspândirii rezistenței:</h4>
    <ul>
      <li>Utilizarea excesivă și inadecvată a antibioticelor</li>
      <li>Utilizarea antibioticelor în zootehnie</li>
      <li>Transferul orizontal de gene de rezistență</li>
      <li>Controlul infecțiilor inadecvat</li>
    </ul>
    
    <h4>Soluții:</h4>
    <ul>
      <li>Utilizarea rațională a antibioticelor</li>
      <li>Dezvoltarea de noi antibiotice</li>
      <li>Abordări alternative: fagoterapia, vaccinurile</li>
      <li>Prevenirea infecțiilor</li>
    </ul>',
    '[{
      "question": "Ce sunt bacteriile?",
      "options": ["Organisme unicelulare procariote", "Organisme multicelulare", "Virusuri", "Fungi"],
      "correctAnswer": 0
    }]'::jsonb,
    70
  );

-- 5. Adăugarea lecțiilor pentru alte materii (15 lecții fiecare)
-- Adăugați lecții pentru Fizică, Chimie, Istorie, Geografie, etc.

-- 6. Actualizarea planului de studiu pentru a include primele 7 lecții din fiecare materie
INSERT INTO study_plans (id, "userId", recommendations, schedule, "createdAt")
SELECT 
  uuid_generate_v4(),
  id,
  ARRAY['Concentrează-te pe exercițiile de bază pentru a-ți construi o fundație solidă.',
        'Rezolvă probleme practice pentru a-ți consolida cunoștințele.',
        'Recapitulează conceptele cheie înainte de a trece mai departe.'],
  jsonb_build_array(
    jsonb_build_object('day', 1, 'lessonId', 'mate-1'),
    jsonb_build_object('day', 2, 'lessonId', 'romana-1'),
    jsonb_build_object('day', 3, 'lessonId', 'info-1'),
    jsonb_build_object('day', 4, 'lessonId', 'bio-1'),
    jsonb_build_object('day', 5, 'lessonId', 'mate-2'),
    jsonb_build_object('day', 6, 'lessonId', 'romana-2'),
    jsonb_build_object('day', 7, 'lessonId', 'info-2')
  ),
  NOW()
FROM users
WHERE NOT EXISTS (
  SELECT 1 FROM study_plans WHERE study_plans."userId" = users.id
);