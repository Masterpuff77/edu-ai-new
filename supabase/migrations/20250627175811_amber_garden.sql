/*
  # Actualizare completă a lecțiilor pentru toate materiile

  1. Ștergerea lecțiilor existente pentru a elimina duplicatele
  2. Adăugarea a 15 lecții noi pentru fiecare materie
  3. Organizarea lecțiilor pe capitole relevante pentru examene

  Materii acoperite:
  - Matematică (Evaluarea Națională și Bacalaureat)
  - Limba Română (Evaluarea Națională și Bacalaureat)
  - Informatică (Bacalaureat)
  - Fizică (Bacalaureat)
  - Chimie (Bacalaureat)
  - Biologie (Bacalaureat)
  - Istorie (Bacalaureat)
  - Geografie (Bacalaureat)
*/

-- Ștergerea lecțiilor existente pentru a elimina duplicatele
DELETE FROM lessons WHERE subject IN ('matematica', 'romana', 'informatica', 'fizica', 'chimie', 'biologie', 'istorie', 'geografie');

-- MATEMATICĂ - 15 lecții pentru Evaluarea Națională și Bacalaureat
INSERT INTO lessons (id, title, subject, description, content, quiz, duration) VALUES
('mate-01', 'Mulțimi de Numere', 'matematica', 'Mulțimile de numere și operații cu numere reale',
'<h2>Mulțimi de Numere</h2>
<h3>Mulțimea numerelor naturale (ℕ)</h3>
<p>ℕ = {0, 1, 2, 3, 4, ...} sau ℕ* = {1, 2, 3, 4, ...}</p>
<ul>
<li>Operații: adunare, înmulțire</li>
<li>Proprietăți: comutativitate, asociativitate, distributivitate</li>
</ul>

<h3>Mulțimea numerelor întregi (ℤ)</h3>
<p>ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}</p>
<ul>
<li>Include toate numerele naturale și opusele lor</li>
<li>Operații: adunare, scădere, înmulțire</li>
</ul>

<h3>Mulțimea numerelor raționale (ℚ)</h3>
<p>ℚ = {a/b | a, b ∈ ℤ, b ≠ 0}</p>
<ul>
<li>Fracții ordinare și zecimale finite sau periodice</li>
<li>Operații: toate operațiile aritmetice</li>
</ul>

<h3>Mulțimea numerelor iraționale (ℝ\ℚ)</h3>
<p>Numere cu dezvoltare zecimală infinită neperiodică</p>
<ul>
<li>Exemple: √2, π, e</li>
<li>Nu pot fi exprimate ca fracții</li>
</ul>

<h3>Mulțimea numerelor reale (ℝ)</h3>
<p>ℝ = ℚ ∪ (ℝ\ℚ)</p>
<ul>
<li>Include toate numerele raționale și iraționale</li>
<li>Proprietatea completitudinii</li>
</ul>',
'[{"question": "Care dintre următoarele numere este irațional?", "options": ["0.25", "√2", "3/4", "-5"], "correctAnswer": 1}]'::jsonb, 45),

('mate-02', 'Operații cu Numere Reale', 'matematica', 'Operații fundamentale și proprietățile lor',
'<h2>Operații cu Numere Reale</h2>
<h3>Adunarea și scăderea</h3>
<ul>
<li>Proprietatea comutativă: a + b = b + a</li>
<li>Proprietatea asociativă: (a + b) + c = a + (b + c)</li>
<li>Elementul neutru: a + 0 = a</li>
<li>Elementul opus: a + (-a) = 0</li>
</ul>

<h3>Înmulțirea și împărțirea</h3>
<ul>
<li>Proprietatea comutativă: a × b = b × a</li>
<li>Proprietatea asociativă: (a × b) × c = a × (b × c)</li>
<li>Elementul neutru: a × 1 = a</li>
<li>Elementul invers: a × (1/a) = 1, a ≠ 0</li>
</ul>

<h3>Distributivitatea</h3>
<p>a × (b + c) = a × b + a × c</p>

<h3>Puteri cu exponenți întregi</h3>
<ul>
<li>a^m × a^n = a^(m+n)</li>
<li>(a^m)^n = a^(m×n)</li>
<li>a^m / a^n = a^(m-n)</li>
<li>a^0 = 1, a ≠ 0</li>
<li>a^(-n) = 1/a^n</li>
</ul>

<h3>Radicali</h3>
<ul>
<li>√(a×b) = √a × √b</li>
<li>√(a/b) = √a / √b</li>
<li>^n√(a^m) = a^(m/n)</li>
</ul>',
'[{"question": "Care este rezultatul calculului 2³ × 2²?", "options": ["2⁵", "2⁶", "4⁵", "8"], "correctAnswer": 0}]'::jsonb, 45),

('mate-03', 'Ecuații de Gradul I', 'matematica', 'Rezolvarea ecuațiilor liniare cu o necunoscută',
'<h2>Ecuații de Gradul I</h2>
<h3>Forma generală</h3>
<p>ax + b = 0, unde a, b ∈ ℝ și a ≠ 0</p>

<h3>Metoda de rezolvare</h3>
<ol>
<li>Transpunerea termenilor: ax = -b</li>
<li>Împărțirea la coeficientul lui x: x = -b/a</li>
</ol>

<h3>Exemple rezolvate</h3>
<p><strong>Exemplul 1:</strong> 3x + 6 = 0</p>
<ul>
<li>3x = -6</li>
<li>x = -6/3 = -2</li>
</ul>

<p><strong>Exemplul 2:</strong> 2x - 8 = x + 1</p>
<ul>
<li>2x - x = 1 + 8</li>
<li>x = 9</li>
</ul>

<h3>Verificarea soluției</h3>
<p>Se înlocuiește valoarea găsită în ecuația inițială pentru a verifica corectitudinea.</p>

<h3>Ecuații cu parametri</h3>
<p>mx + n = 0</p>
<ul>
<li>Dacă m ≠ 0: x = -n/m</li>
<li>Dacă m = 0 și n = 0: ecuația are o infinitate de soluții</li>
<li>Dacă m = 0 și n ≠ 0: ecuația nu are soluții</li>
</ul>',
'[{"question": "Care este soluția ecuației 2x + 6 = 0?", "options": ["-3", "3", "-2", "2"], "correctAnswer": 0}]'::jsonb, 45),

('mate-04', 'Inecuații de Gradul I', 'matematica', 'Rezolvarea inecuațiilor liniare',
'<h2>Inecuații de Gradul I</h2>
<h3>Forme generale</h3>
<ul>
<li>ax + b > 0</li>
<li>ax + b < 0</li>
<li>ax + b ≥ 0</li>
<li>ax + b ≤ 0</li>
</ul>

<h3>Reguli de rezolvare</h3>
<ol>
<li>Se rezolvă ca o ecuație pentru a găsi punctul critic</li>
<li>Se determină semnul expresiei ax + b</li>
<li>Se scrie mulțimea soluțiilor</li>
</ol>

<h3>Proprietăți importante</h3>
<ul>
<li>Adunarea/scăderea unui număr nu schimbă sensul inegalității</li>
<li>Înmulțirea/împărțirea cu un număr pozitiv păstrează sensul</li>
<li>Înmulțirea/împărțirea cu un număr negativ schimbă sensul</li>
</ul>

<h3>Exemple rezolvate</h3>
<p><strong>Exemplul 1:</strong> 2x + 4 > 0</p>
<ul>
<li>2x > -4</li>
<li>x > -2</li>
<li>S = (-2, +∞)</li>
</ul>

<p><strong>Exemplul 2:</strong> -3x + 6 ≤ 0</p>
<ul>
<li>-3x ≤ -6</li>
<li>x ≥ 2 (se schimbă sensul)</li>
<li>S = [2, +∞)</li>
</ul>',
'[{"question": "Care este soluția inecuației 2x + 4 > 0?", "options": ["x > -2", "x < -2", "x > 2", "x < 2"], "correctAnswer": 0}]'::jsonb, 45),

('mate-05', 'Sisteme de Ecuații Liniare', 'matematica', 'Rezolvarea sistemelor cu două necunoscute',
'<h2>Sisteme de Ecuații Liniare</h2>
<h3>Forma generală</h3>
<p>ax + by = c<br>dx + ey = f</p>

<h3>Metoda substituției</h3>
<ol>
<li>Se exprimă o necunoscută din prima ecuație</li>
<li>Se înlocuiește în a doua ecuație</li>
<li>Se rezolvă ecuația cu o necunoscută</li>
<li>Se găsește cealaltă necunoscută</li>
</ol>

<h3>Metoda reducerii</h3>
<ol>
<li>Se înmulțesc ecuațiile cu numere convenabile</li>
<li>Se adună/scad ecuațiile pentru a elimina o necunoscută</li>
<li>Se rezolvă ecuația rezultată</li>
<li>Se găsește cealaltă necunoscută</li>
</ol>

<h3>Interpretarea geometrică</h3>
<ul>
<li>Sistem compatibil determinat: două drepte secante</li>
<li>Sistem compatibil nedeterminat: două drepte coincidente</li>
<li>Sistem incompatibil: două drepte paralele distincte</li>
</ul>

<h3>Exemplu rezolvat</h3>
<p>x + y = 5<br>2x - y = 1</p>
<p><strong>Prin reducere:</strong></p>
<ul>
<li>Adunăm ecuațiile: 3x = 6, deci x = 2</li>
<li>Din prima ecuație: y = 5 - 2 = 3</li>
<li>Soluția: (2, 3)</li>
</ul>',
'[{"question": "Care metodă este recomandată când un coeficient este 1?", "options": ["Reducere", "Substituție", "Cramer", "Grafică"], "correctAnswer": 1}]'::jsonb, 45),

('mate-06', 'Funcții. Funcția de Gradul I', 'matematica', 'Studiul funcțiilor liniare și afine',
'<h2>Funcții. Funcția de Gradul I</h2>
<h3>Noțiuni generale despre funcții</h3>
<ul>
<li>Definiție: f: A → B, f(x) = y</li>
<li>Domeniul de definiție: D(f)</li>
<li>Mulțimea valorilor: Im(f)</li>
</ul>

<h3>Funcția liniară</h3>
<p>f: ℝ → ℝ, f(x) = ax, a ∈ ℝ*</p>
<ul>
<li>Graficul: dreaptă prin origine</li>
<li>Panta: a</li>
<li>Monotonia: crescătoare dacă a > 0, descrescătoare dacă a < 0</li>
</ul>

<h3>Funcția afină</h3>
<p>f: ℝ → ℝ, f(x) = ax + b, a ∈ ℝ*, b ∈ ℝ</p>
<ul>
<li>Graficul: dreaptă</li>
<li>Panta: a</li>
<li>Ordonata la origine: b</li>
<li>Abscisa la origine: -b/a</li>
</ul>

<h3>Proprietăți</h3>
<ul>
<li>Monotonia depinde de semnul lui a</li>
<li>Funcția este bijectivă</li>
<li>Are funcție inversă</li>
</ul>

<h3>Aplicații</h3>
<ul>
<li>Probleme de mișcare uniformă</li>
<li>Probleme economice</li>
<li>Dependențe liniare în fizică</li>
</ul>',
'[{"question": "Ce reprezintă graficul funcției f(x) = 2x + 1?", "options": ["O parabolă", "O dreaptă", "O hiperbolă", "Un cerc"], "correctAnswer": 1}]'::jsonb, 45),

('mate-07', 'Funcția de Gradul II', 'matematica', 'Studiul funcțiilor pătratice',
'<h2>Funcția de Gradul II</h2>
<h3>Forma generală</h3>
<p>f: ℝ → ℝ, f(x) = ax² + bx + c, a ≠ 0</p>

<h3>Graficul funcției</h3>
<ul>
<li>Parabola cu vârful în V(-b/2a, -Δ/4a)</li>
<li>Axa de simetrie: x = -b/2a</li>
<li>Discriminantul: Δ = b² - 4ac</li>
</ul>

<h3>Studiul semnului</h3>
<ul>
<li>Δ > 0: două rădăcini reale distincte</li>
<li>Δ = 0: o rădăcină dublă</li>
<li>Δ < 0: nu are rădăcini reale</li>
</ul>

<h3>Monotonia</h3>
<ul>
<li>Dacă a > 0: descrescătoare pe (-∞, -b/2a], crescătoare pe [-b/2a, +∞)</li>
<li>Dacă a < 0: crescătoare pe (-∞, -b/2a], descrescătoare pe [-b/2a, +∞)</li>
</ul>

<h3>Extremele funcției</h3>
<ul>
<li>Dacă a > 0: minimum în x = -b/2a</li>
<li>Dacă a < 0: maximum în x = -b/2a</li>
</ul>

<h3>Ecuația ax² + bx + c = 0</h3>
<p>Soluțiile: x₁,₂ = (-b ± √Δ)/2a</p>',
'[{"question": "Care este vârful parabolei y = x² - 4x + 3?", "options": ["(2, -1)", "(-2, 1)", "(4, 3)", "(0, 3)"], "correctAnswer": 0}]'::jsonb, 45),

('mate-08', 'Progresii Aritmetice și Geometrice', 'matematica', 'Studiul șirurilor cu regularități',
'<h2>Progresii Aritmetice și Geometrice</h2>
<h3>Progresia aritmetică</h3>
<p>Șir în care diferența dintre termeni consecutivi este constantă</p>
<ul>
<li>Termenul general: aₙ = a₁ + (n-1)r</li>
<li>Rația: r = aₙ₊₁ - aₙ</li>
<li>Suma primilor n termeni: Sₙ = n(a₁ + aₙ)/2</li>
<li>Proprietatea: aₙ = (aₙ₋₁ + aₙ₊₁)/2</li>
</ul>

<h3>Progresia geometrică</h3>
<p>Șir în care raportul dintre termeni consecutivi este constant</p>
<ul>
<li>Termenul general: aₙ = a₁ × q^(n-1)</li>
<li>Rația: q = aₙ₊₁/aₙ</li>
<li>Suma primilor n termeni: Sₙ = a₁(q^n - 1)/(q - 1), q ≠ 1</li>
<li>Proprietatea: aₙ² = aₙ₋₁ × aₙ₊₁</li>
</ul>

<h3>Progresii speciale</h3>
<ul>
<li>Progresie aritmetică cu r = 0: șir constant</li>
<li>Progresie geometrică cu q = 1: șir constant</li>
<li>Progresie geometrică cu |q| < 1: suma la infinit S = a₁/(1-q)</li>
</ul>

<h3>Aplicații</h3>
<ul>
<li>Probleme de dobândă</li>
<li>Creștere demografică</li>
<li>Probleme de mișcare</li>
</ul>',
'[{"question": "În progresia aritmetică 2, 5, 8, ..., care este al 10-lea termen?", "options": ["29", "32", "35", "38"], "correctAnswer": 0}]'::jsonb, 45),

('mate-09', 'Geometrie Plană - Triunghiuri', 'matematica', 'Proprietăți și teoreme despre triunghiuri',
'<h2>Geometrie Plană - Triunghiuri</h2>
<h3>Clasificarea triunghiurilor</h3>
<p><strong>După laturi:</strong></p>
<ul>
<li>Echilateral: toate laturile egale</li>
<li>Isoscel: două laturi egale</li>
<li>Scalen: toate laturile diferite</li>
</ul>

<p><strong>După unghiuri:</strong></p>
<ul>
<li>Ascuțitunghic: toate unghiurile ascuțite</li>
<li>Dreptunghic: un unghi drept</li>
<li>Obtuzunghic: un unghi obtuz</li>
</ul>

<h3>Linii importante în triunghi</h3>
<ul>
<li>Medianele: se intersectează în centrul de greutate</li>
<li>Înălțimile: se intersectează în ortocentru</li>
<li>Bisectoarele: se intersectează în incentru</li>
<li>Mediatoarele: se intersectează în circumcentru</li>
</ul>

<h3>Teoreme fundamentale</h3>
<ul>
<li>Suma unghiurilor: α + β + γ = 180°</li>
<li>Teorema lui Pitagora: a² + b² = c² (în triunghiul dreptunghic)</li>
<li>Inegalitatea triunghiului: |a - b| < c < a + b</li>
</ul>

<h3>Arii și perimetru</h3>
<ul>
<li>Aria: A = (baza × înălțimea)/2</li>
<li>Formula lui Heron: A = √[p(p-a)(p-b)(p-c)]</li>
<li>Perimetrul: P = a + b + c</li>
</ul>',
'[{"question": "Ce fel de triunghi are toate unghiurile egale?", "options": ["Dreptunghic", "Isoscel", "Echilateral", "Obtuzunghic"], "correctAnswer": 2}]'::jsonb, 45),

('mate-10', 'Geometrie Plană - Patrulatere', 'matematica', 'Studiul patrulaterelor și proprietățile lor',
'<h2>Geometrie Plană - Patrulatere</h2>
<h3>Clasificarea patrulaterelor</h3>
<ul>
<li>Paralelogram: laturile opuse paralele și egale</li>
<li>Dreptunghi: paralelogram cu toate unghiurile drepte</li>
<li>Romb: paralelogram cu toate laturile egale</li>
<li>Pătrat: dreptunghi cu toate laturile egale</li>
<li>Trapez: o pereche de laturi paralele</li>
</ul>

<h3>Proprietăți ale paralelogramului</h3>
<ul>
<li>Laturile opuse sunt egale și paralele</li>
<li>Unghiurile opuse sunt egale</li>
<li>Diagonalele se înjumătățesc reciproc</li>
<li>Suma unghiurilor: 360°</li>
</ul>

<h3>Proprietăți speciale</h3>
<p><strong>Dreptunghiul:</strong></p>
<ul>
<li>Toate unghiurile sunt drepte</li>
<li>Diagonalele sunt egale</li>
</ul>

<p><strong>Rombul:</strong></p>
<ul>
<li>Toate laturile sunt egale</li>
<li>Diagonalele sunt perpendiculare</li>
</ul>

<p><strong>Pătratul:</strong></p>
<ul>
<li>Reunește proprietățile dreptunghiului și rombului</li>
</ul>

<h3>Formule pentru arii</h3>
<ul>
<li>Paralelogram: A = baza × înălțimea</li>
<li>Dreptunghi: A = lungimea × lățimea</li>
<li>Pătrat: A = latura²</li>
<li>Romb: A = (d₁ × d₂)/2</li>
<li>Trapez: A = (B + b) × h/2</li>
</ul>',
'[{"question": "Care patrulater are toate laturile egale și toate unghiurile drepte?", "options": ["Romb", "Dreptunghi", "Pătrat", "Paralelogram"], "correctAnswer": 2}]'::jsonb, 45),

('mate-11', 'Geometrie Plană - Cercul', 'matematica', 'Proprietăți ale cercului și calculul ariilor',
'<h2>Geometrie Plană - Cercul</h2>
<h3>Elemente ale cercului</h3>
<ul>
<li>Centrul: punctul O</li>
<li>Raza: segmentul de la centru la circumferință</li>
<li>Diametrul: coarda care trece prin centru</li>
<li>Coarda: segment cu extremitățile pe circumferință</li>
<li>Tangenta: dreaptă cu un singur punct comun cu cercul</li>
</ul>

<h3>Relații importante</h3>
<ul>
<li>Diametrul = 2 × raza</li>
<li>Lungimea cercului: L = 2πr = πd</li>
<li>Aria cercului: A = πr²</li>
<li>Aria sectorului: A = (α/360°) × πr²</li>
</ul>

<h3>Unghiuri în cerc</h3>
<ul>
<li>Unghi la centru: vârful în centrul cercului</li>
<li>Unghi înscris: vârful pe circumferință</li>
<li>Teorema unghiului înscris: măsura = jumătate din arcul corespunzător</li>
</ul>

<h3>Poziții relative</h3>
<p><strong>Dreaptă și cerc:</strong></p>
<ul>
<li>Secantă: două puncte comune</li>
<li>Tangentă: un punct comun</li>
<li>Exterioară: niciun punct comun</li>
</ul>

<p><strong>Două cercuri:</strong></p>
<ul>
<li>Exterioare, tangente exterior, secante, tangente interior, interioare</li>
</ul>',
'[{"question": "Care este relația dintre rază (r) și diametru (d)?", "options": ["r = 2d", "d = 2r", "r = d", "d = r²"], "correctAnswer": 1}]'::jsonb, 45),

('mate-12', 'Trigonometrie', 'matematica', 'Funcții trigonometrice și aplicații',
'<h2>Trigonometrie</h2>
<h3>Funcțiile trigonometrice în triunghiul dreptunghic</h3>
<ul>
<li>sin α = cateta opusă / ipotenuza</li>
<li>cos α = cateta alăturată / ipotenuza</li>
<li>tg α = cateta opusă / cateta alăturată</li>
<li>ctg α = cateta alăturată / cateta opusă</li>
</ul>

<h3>Relații fundamentale</h3>
<ul>
<li>sin²α + cos²α = 1</li>
<li>tg α = sin α / cos α</li>
<li>ctg α = cos α / sin α</li>
<li>tg α × ctg α = 1</li>
</ul>

<h3>Valori particulare</h3>
<table border="1">
<tr><th>α</th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr>
<tr><th>sin α</th><td>0</td><td>1/2</td><td>√2/2</td><td>√3/2</td><td>1</td></tr>
<tr><th>cos α</th><td>1</td><td>√3/2</td><td>√2/2</td><td>1/2</td><td>0</td></tr>
<tr><th>tg α</th><td>0</td><td>√3/3</td><td>1</td><td>√3</td><td>∞</td></tr>
</table>

<h3>Aplicații</h3>
<ul>
<li>Rezolvarea triunghiurilor</li>
<li>Calculul înălțimilor și distanțelor</li>
<li>Probleme de navigație</li>
</ul>',
'[{"question": "Care este valoarea sin 30°?", "options": ["1/2", "√2/2", "√3/2", "1"], "correctAnswer": 0}]'::jsonb, 45),

('mate-13', 'Combinatorică și Probabilități', 'matematica', 'Numărarea și calculul probabilităților',
'<h2>Combinatorică și Probabilități</h2>
<h3>Principiile numărării</h3>
<ul>
<li>Principiul adunării: pentru evenimente disjuncte</li>
<li>Principiul înmulțirii: pentru evenimente independente</li>
</ul>

<h3>Aranjamente, permutări, combinări</h3>
<ul>
<li>Permutări: P_n = n!</li>
<li>Aranjamente: A_n^k = n!/(n-k)!</li>
<li>Combinări: C_n^k = n!/[k!(n-k)!]</li>
</ul>

<h3>Probabilități</h3>
<ul>
<li>Probabilitatea unui eveniment: P(A) = cazuri favorabile / cazuri posibile</li>
<li>0 ≤ P(A) ≤ 1</li>
<li>P(Ω) = 1, P(∅) = 0</li>
</ul>

<h3>Operații cu evenimente</h3>
<ul>
<li>Reuniunea: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</li>
<li>Evenimente incompatibile: P(A ∩ B) = 0</li>
<li>Evenimente independente: P(A ∩ B) = P(A) × P(B)</li>
</ul>

<h3>Aplicații</h3>
<ul>
<li>Jocuri de noroc</li>
<li>Probleme de selecție</li>
<li>Analize statistice</li>
</ul>',
'[{"question": "Câte moduri sunt de a aranja 5 persoane într-o fotografie?", "options": ["25", "120", "625", "3125"], "correctAnswer": 1}]'::jsonb, 45),

('mate-14', 'Statistică Descriptivă', 'matematica', 'Prelucrarea și interpretarea datelor',
'<h2>Statistică Descriptivă</h2>
<h3>Noțiuni de bază</h3>
<ul>
<li>Populația statistică</li>
<li>Eșantionul</li>
<li>Caracterul statistic</li>
<li>Modalitățile caracterului</li>
</ul>

<h3>Reprezentarea datelor</h3>
<ul>
<li>Tabelul de frecvențe</li>
<li>Diagrame cu bare</li>
<li>Histograme</li>
<li>Diagrame circulare</li>
</ul>

<h3>Indicatori statistici</h3>
<p><strong>Tendința centrală:</strong></p>
<ul>
<li>Media aritmetică: x̄ = (x₁ + x₂ + ... + xₙ)/n</li>
<li>Mediana: valoarea din mijloc</li>
<li>Modul: valoarea cu frecvența maximă</li>
</ul>

<p><strong>Dispersia:</strong></p>
<ul>
<li>Amplitudinea: max - min</li>
<li>Varianța: σ² = Σ(xᵢ - x̄)²/n</li>
<li>Abaterea standard: σ = √σ²</li>
</ul>

<h3>Interpretarea rezultatelor</h3>
<ul>
<li>Analiza tendințelor</li>
<li>Compararea grupurilor</li>
<li>Identificarea valorilor extreme</li>
</ul>',
'[{"question": "Care indicator măsoară tendința centrală?", "options": ["Varianța", "Media", "Amplitudinea", "Abaterea standard"], "correctAnswer": 1}]'::jsonb, 45),

('mate-15', 'Probleme de Sinteză și Aplicații', 'matematica', 'Rezolvarea problemelor complexe',
'<h2>Probleme de Sinteză și Aplicații</h2>
<h3>Strategii de rezolvare</h3>
<ol>
<li>Citirea atentă a enunțului</li>
<li>Identificarea datelor și necunoscutelor</li>
<li>Alegerea metodei de rezolvare</li>
<li>Aplicarea metodei</li>
<li>Verificarea rezultatului</li>
<li>Interpretarea soluției</li>
</ol>

<h3>Tipuri de probleme</h3>
<p><strong>Probleme de mișcare:</strong></p>
<ul>
<li>Mișcare uniformă: d = v × t</li>
<li>Probleme cu întâlnire</li>
<li>Probleme cu ajungere din urmă</li>
</ul>

<p><strong>Probleme cu procente:</strong></p>
<ul>
<li>Calculul procentului</li>
<li>Probleme cu dobândă</li>
<li>Probleme cu reduceri și majorări</li>
</ul>

<p><strong>Probleme de geometrie:</strong></p>
<ul>
<li>Calculul ariilor și perimetrelor</li>
<li>Probleme cu asemănare</li>
<li>Aplicații ale teoremei lui Pitagora</li>
</ul>

<h3>Modelarea matematică</h3>
<ul>
<li>Traducerea problemei în limbaj matematic</li>
<li>Construirea modelului</li>
<li>Rezolvarea modelului</li>
<li>Interpretarea soluției în contextul problemei</li>
</ul>',
'[{"question": "Care este primul pas în rezolvarea unei probleme?", "options": ["Calculul", "Citirea enunțului", "Scrierea rezultatului", "Verificarea"], "correctAnswer": 1}]'::jsonb, 45);

-- LIMBA ROMÂNĂ - 15 lecții pentru Evaluarea Națională și Bacalaureat
INSERT INTO lessons (id, title, subject, description, content, quiz, duration) VALUES
('romana-01', 'Comunicarea. Funcțiile limbajului', 'romana', 'Elementele și funcțiile comunicării',
'<h2>Comunicarea. Funcțiile limbajului</h2>
<h3>Elementele comunicării</h3>
<ul>
<li><strong>Emițătorul:</strong> cel care transmite mesajul</li>
<li><strong>Receptorul:</strong> cel care primește mesajul</li>
<li><strong>Mesajul:</strong> informația transmisă</li>
<li><strong>Codul:</strong> sistemul de semne folosit</li>
<li><strong>Canalul:</strong> mijlocul de transmitere</li>
<li><strong>Contextul:</strong> situația comunicării</li>
</ul>

<h3>Funcțiile limbajului (Roman Jakobson)</h3>
<ul>
<li><strong>Referențială (denotativă):</strong> transmite informații despre realitate</li>
<li><strong>Emotivă (expresivă):</strong> exprimă sentimentele emițătorului</li>
<li><strong>Conativă (apelativă):</strong> influențează receptorul</li>
<li><strong>Fatică:</strong> stabilește/menține contactul</li>
<li><strong>Metalingvistică:</strong> explică codul folosit</li>
<li><strong>Poetică (estetică):</strong> pune accent pe forma mesajului</li>
</ul>

<h3>Tipuri de comunicare</h3>
<ul>
<li>Verbală și nonverbală</li>
<li>Directă și indirectă</li>
<li>Formală și informală</li>
<li>Unidirecțională și bidirecțională</li>
</ul>

<h3>Bariere în comunicare</h3>
<ul>
<li>Fizice (zgomot, distanță)</li>
<li>Psihologice (prejudecăți, emoții)</li>
<li>Lingvistice (diferențe de cod)</li>
<li>Culturale (diferențe de context)</li>
</ul>',
'[{"question": "Care funcție a limbajului pune accent pe forma mesajului?", "options": ["Referențială", "Emotivă", "Poetică", "Fatică"], "correctAnswer": 2}]'::jsonb, 45),

('romana-02', 'Genuri și specii literare', 'romana', 'Clasificarea operelor literare',
'<h2>Genuri și specii literare</h2>
<h3>Genul epic</h3>
<p><strong>Caracteristici:</strong></p>
<ul>
<li>Prezența naratorului</li>
<li>Existența unei acțiuni</li>
<li>Personaje în evoluție</li>
<li>Cadrul spațio-temporal</li>
</ul>

<p><strong>Specii epice:</strong></p>
<ul>
<li><strong>Romanul:</strong> operă amplă, acțiune complexă</li>
<li><strong>Nuvela:</strong> operă de dimensiuni medii</li>
<li><strong>Schița:</strong> operă scurtă, descriptivă</li>
<li><strong>Povestirea:</strong> operă scurtă, narativă</li>
<li><strong>Basmul:</strong> operă cu elemente fantastice</li>
</ul>

<h3>Genul liric</h3>
<p><strong>Caracteristici:</strong></p>
<ul>
<li>Subiectivitate</li>
<li>Expresia sentimentelor</li>
<li>Prezența eului liric</li>
<li>Muzicalitate</li>
</ul>

<p><strong>Specii lirice:</strong></p>
<ul>
<li><strong>Elegia:</strong> poem melancolic</li>
<li><strong>Oda:</strong> poem solemn, de laudă</li>
<li><strong>Soneta:</strong> poem cu formă fixă</li>
<li><strong>Balada:</strong> poem narativ-liric</li>
</ul>

<h3>Genul dramatic</h3>
<p><strong>Caracteristici:</strong></p>
<ul>
<li>Dialogul ca mod principal de expunere</li>
<li>Conflictul dramatic</li>
<li>Destinația scenică</li>
<li>Didascaliile</li>
</ul>

<p><strong>Specii dramatice:</strong></p>
<ul>
<li><strong>Tragedia:</strong> sfârșitul tragic</li>
<li><strong>Comedia:</strong> efectul comic</li>
<li><strong>Drama:</strong> amestec de tragic și comic</li>
</ul>',
'[{"question": "Care gen literar folosește dialogul ca mod principal de expunere?", "options": ["Epic", "Liric", "Dramatic", "Didactic"], "correctAnswer": 2}]'::jsonb, 45),

('romana-03', 'Figuri de stil și mijloace artistice', 'romana', 'Identificarea și analiza figurilor de stil',
'<h2>Figuri de stil și mijloace artistice</h2>
<h3>Figuri de stil bazate pe asemănare</h3>
<ul>
<li><strong>Comparația:</strong> raportare explicită între două elemente<br>
<em>Exemplu: "Alb ca zăpada"</em></li>
<li><strong>Metafora:</strong> comparație fără termen de comparație<br>
<em>Exemplu: "Ochii mării"</em></li>
<li><strong>Personificarea:</strong> atribuirea de însușiri omenești<br>
<em>Exemplu: "Vântul șoptește"</em></li>
</ul>

<h3>Figuri de stil bazate pe contiguitate</h3>
<ul>
<li><strong>Metonimia:</strong> înlocuirea unui cuvânt cu altul<br>
<em>Exemplu: "A citit tot Eminescu" (opera lui Eminescu)</em></li>
<li><strong>Sinecdoca:</strong> partea pentru întreg sau invers<br>
<em>Exemplu: "Toate mâinile la lucru" (oamenii)</em></li>
</ul>

<h3>Figuri de stil bazate pe opoziție</h3>
<ul>
<li><strong>Antiteza:</strong> opunerea unor idei contrare<br>
<em>Exemplu: "Tânăr la față, bătrân la minte"</em></li>
<li><strong>Oxomoronul:</strong> asocierea unor termeni contradictorii<br>
<em>Exemplu: "Tăcere gălăgioasă"</em></li>
</ul>

<h3>Figuri de stil bazate pe amplificare</h3>
<ul>
<li><strong>Hiperbola:</strong> exagerarea<br>
<em>Exemplu: "Plânge cu lacrimi cât nucile"</em></li>
<li><strong>Gradația:</strong> trecerea treptată de la o idee la alta<br>
<em>Exemplu: "Veni, văzu, învinge"</em></li>
</ul>

<h3>Alte figuri importante</h3>
<ul>
<li><strong>Epitetul:</strong> atribut expresiv</li>
<li><strong>Enumerația:</strong> înșiruirea de elemente</li>
<li><strong>Repetiția:</strong> reluarea unor cuvinte</li>
<li><strong>Interogația retorică:</strong> întrebare fără răspuns</li>
</ul>',
'[{"question": "Ce figură de stil este în expresia \"ochii mării\"?", "options": ["Personificare", "Metaforă", "Comparație", "Epitet"], "correctAnswer": 1}]'::jsonb, 45),

('romana-04', 'Textul narativ literar', 'romana', 'Analiza elementelor narative',
'<h2>Textul narativ literar</h2>
<h3>Elementele textului narativ</h3>
<ul>
<li><strong>Acțiunea:</strong> succesiunea de evenimente</li>
<li><strong>Personajele:</strong> ființele care participă la acțiune</li>
<li><strong>Timpul:</strong> când se petrec evenimentele</li>
<li><strong>Spațiul:</strong> unde se petrec evenimentele</li>
<li><strong>Naratorul:</strong> cel care povestește</li>
</ul>

<h3>Structura subiectului epic</h3>
<ol>
<li><strong>Expozițiunea:</strong> prezentarea situației inițiale</li>
<li><strong>Intriga:</strong> elementul perturbator</li>
<li><strong>Desfășurarea acțiunii:</strong> dezvoltarea conflictului</li>
<li><strong>Punctul culminant:</strong> momentul de maximă tensiune</li>
<li><strong>Deznodământul:</strong> rezolvarea conflictului</li>
</ol>

<h3>Tipuri de narator</h3>
<ul>
<li><strong>Narator omniscient:</strong> știe totul despre personaje</li>
<li><strong>Narator obiectiv:</strong> relatează doar faptele</li>
<li><strong>Narator subiectiv:</strong> își exprimă opiniile</li>
<li><strong>Narator personaj:</strong> participă la acțiune</li>
</ul>

<h3>Perspectiva narativă</h3>
<ul>
<li><strong>Persoana I:</strong> "eu" narativ</li>
<li><strong>Persoana a II-a:</strong> "tu" narativ (rar)</li>
<li><strong>Persoana a III-a:</strong> "el/ea" narativ</li>
</ul>

<h3>Tehnici narative</h3>
<ul>
<li><strong>Analepsa:</strong> întoarcerea în trecut</li>
<li><strong>Prolepsa:</strong> anticiparea viitorului</li>
<li><strong>Monologul interior:</strong> gândurile personajului</li>
<li><strong>Fluxul conștiinței:</strong> asocieri libere de idei</li>
</ul>',
'[{"question": "Care element nu aparține textului narativ?", "options": ["Acțiunea", "Personajele", "Rima", "Timpul"], "correctAnswer": 2}]'::jsonb, 45),

('romana-05', 'Caracterizarea personajelor', 'romana', 'Tehnici de prezentare a personajelor',
'<h2>Caracterizarea personajelor</h2>
<h3>Tipuri de caracterizare</h3>
<ul>
<li><strong>Caracterizarea directă:</strong> prin descriere explicită</li>
<li><strong>Caracterizarea indirectă:</strong> prin acțiuni, gesturi, vorbire</li>
<li><strong>Autocaracterizarea:</strong> personajul se prezintă singur</li>
<li><strong>Caracterizarea prin alți personaje:</strong> prin opiniile celorlalți</li>
</ul>

<h3>Aspecte ale caracterizării</h3>
<p><strong>Portretul fizic:</strong></p>
<ul>
<li>Înfățișarea generală</li>
<li>Trăsături particulare</li>
<li>Vestimentația</li>
<li>Gesturile și mimică</li>
</ul>

<p><strong>Portretul moral:</strong></p>
<ul>
<li>Trăsături de caracter</li>
<li>Sentimente și emoții</li>
<li>Convingeri și principii</li>
<li>Comportamentul social</li>
</ul>

<h3>Clasificarea personajelor</h3>
<p><strong>După importanță:</strong></p>
<ul>
<li>Personaje principale (protagoniști)</li>
<li>Personaje secundare</li>
<li>Personaje episodice</li>
</ul>

<p><strong>După evoluție:</strong></p>
<ul>
<li>Personaje statice (nu se schimbă)</li>
<li>Personaje dinamice (evoluează)</li>
</ul>

<p><strong>După complexitate:</strong></p>
<ul>
<li>Personaje simple (o trăsătură dominantă)</li>
<li>Personaje complexe (multiple trăsături)</li>
</ul>

<h3>Relațiile dintre personaje</h3>
<ul>
<li>Relații de prietenie/iubire</li>
<li>Relații de conflict/rivalitate</li>
<li>Relații de dependență</li>
<li>Relații sociale/familiale</li>
</ul>',
'[{"question": "Ce tip de caracterizare este prezentă în descrierea acțiunilor unui personaj?", "options": ["Directă", "Indirectă", "Fizică", "Mixtă"], "correctAnswer": 1}]'::jsonb, 45),

('romana-06', 'Textul descriptiv', 'romana', 'Analiza descrierilor literare și nonliterare',
'<h2>Textul descriptiv</h2>
<h3>Tipuri de descriere</h3>
<ul>
<li><strong>Portretul:</strong> descrierea unei persoane</li>
<li><strong>Tabloul:</strong> descrierea unui peisaj/ambient</li>
<li><strong>Descrierea de obiect:</strong> prezentarea unui lucru</li>
<li><strong>Descrierea științifică:</strong> obiectivă, precisă</li>
</ul>

<h3>Funcțiile descrierii</h3>
<ul>
<li><strong>Funcția informativă:</strong> oferă date despre realitate</li>
<li><strong>Funcția estetică:</strong> creează frumusețe artistică</li>
<li><strong>Funcția simbolică:</strong> sugerează sensuri ascunse</li>
<li><strong>Funcția psihologică:</strong> reflectă stări sufletești</li>
</ul>

<h3>Tehnici descriptive</h3>
<ul>
<li><strong>Descrierea statică:</strong> prezentarea unui moment fix</li>
<li><strong>Descrierea dinamică:</strong> surprinderea mișcării</li>
<li><strong>Descrierea obiectivă:</strong> fără implicare emoțională</li>
<li><strong>Descrierea subiectivă:</strong> cu implicare emoțională</li>
</ul>

<h3>Mijloace artistice în descriere</h3>
<ul>
<li>Figuri de stil (metafore, comparații)</li>
<li>Epitetele expresive</li>
<li>Sinesteziile (amestecul simțurilor)</li>
<li>Personificările</li>
<li>Gradațiile</li>
</ul>

<h3>Organizarea descrierii</h3>
<ul>
<li><strong>Spațială:</strong> de la general la particular</li>
<li><strong>Temporală:</strong> în succesiune cronologică</li>
<li><strong>Logică:</strong> după importanță</li>
<li><strong>Psihologică:</strong> după impresiile subiective</li>
</ul>',
'[{"question": "Ce tip de descriere este prezentă în descrierea unui apus de soare?", "options": ["Portret", "Tablou", "Științifică", "Tehnică"], "correctAnswer": 1}]'::jsonb, 45),

('romana-07', 'Textul argumentativ', 'romana', 'Structura și redactarea argumentației',
'<h2>Textul argumentativ</h2>
<h3>Structura textului argumentativ</h3>
<ol>
<li><strong>Introducerea:</strong> prezentarea temei și a tezei</li>
<li><strong>Dezvoltarea:</strong> argumentele și exemplele</li>
<li><strong>Concluzia:</strong> reafirmarea tezei</li>
</ol>

<h3>Elementele argumentării</h3>
<ul>
<li><strong>Tema:</strong> subiectul discutat</li>
<li><strong>Teza:</strong> punctul de vedere susținut</li>
<li><strong>Argumentele:</strong> dovezile care susțin teza</li>
<li><strong>Exemplele:</strong> ilustrări concrete</li>
<li><strong>Antiteza:</strong> punctul de vedere opus</li>
</ul>

<h3>Tipuri de argumente</h3>
<ul>
<li><strong>Argumentul logic:</strong> bazat pe raționament</li>
<li><strong>Argumentul de autoritate:</strong> bazat pe prestigiu</li>
<li><strong>Argumentul prin exemplu:</strong> bazat pe cazuri concrete</li>
<li><strong>Argumentul prin analogie:</strong> bazat pe asemănări</li>
<li><strong>Argumentul prin consecințe:</strong> bazat pe efecte</li>
</ul>

<h3>Conectori argumentativi</h3>
<ul>
<li><strong>De introducere:</strong> în primul rând, mai întâi</li>
<li><strong>De adăugare:</strong> în plus, de asemenea, mai mult</li>
<li><strong>De opoziție:</strong> însă, totuși, cu toate acestea</li>
<li><strong>De concluzie:</strong> prin urmare, în concluzie, deci</li>
</ul>

<h3>Calitățile argumentării</h3>
<ul>
<li>Claritatea și precizia</li>
<li>Logica și coerența</li>
<li>Forța de convingere</li>
<li>Respectarea structurii</li>
</ul>',
'[{"question": "Care este primul element al unui text argumentativ?", "options": ["Concluzia", "Argumentele", "Teza", "Exemplele"], "correctAnswer": 2}]'::jsonb, 45),

('romana-08', 'Morfologia - Părțile de vorbire flexibile', 'romana', 'Studiul substantivului, adjectivului, pronumelui',
'<h2>Morfologia - Părțile de vorbire flexibile</h2>
<h3>Substantivul</h3>
<p><strong>Definiție:</strong> partea de vorbire care denumește ființe, lucruri, fenomene</p>
<p><strong>Categorii gramaticale:</strong></p>
<ul>
<li><strong>Genul:</strong> masculin, feminin, neutru</li>
<li><strong>Numărul:</strong> singular, plural</li>
<li><strong>Cazul:</strong> nominativ, acuzativ, genitiv, dativ, vocativ</li>
<li><strong>Articolul:</strong> hotărât, nehotărât</li>
</ul>

<h3>Adjectivul</h3>
<p><strong>Definiție:</strong> partea de vorbire care exprimă o însușire</p>
<p><strong>Tipuri:</strong></p>
<ul>
<li><strong>Calificative:</strong> exprimă calități (frumos, înalt)</li>
<li><strong>Relaționale:</strong> exprimă relații (românesc, școlar)</li>
</ul>
<p><strong>Gradele de comparație:</strong></p>
<ul>
<li>Pozitivul: frumos</li>
<li>Comparativul: mai frumos</li>
<li>Superlativul: cel mai frumos</li>
</ul>

<h3>Pronumele</h3>
<p><strong>Definiție:</strong> partea de vorbire care înlocuiește substantivul</p>
<p><strong>Tipuri:</strong></p>
<ul>
<li><strong>Personale:</strong> eu, tu, el</li>
<li><strong>Posesive:</strong> meu, tău, său</li>
<li><strong>Demonstrative:</strong> acesta, aceea</li>
<li><strong>Relative:</strong> care, ce</li>
<li><strong>Interogative:</strong> cine?, ce?</li>
<li><strong>Nehotărâte:</strong> cineva, ceva</li>
<li><strong>Negative:</strong> nimeni, nimic</li>
</ul>

<h3>Numeralul</h3>
<p><strong>Tipuri:</strong></p>
<ul>
<li><strong>Cardinale:</strong> unu, doi, trei</li>
<li><strong>Ordinale:</strong> primul, al doilea</li>
<li><strong>Multiplicative:</strong> înoit, îndoit</li>
<li><strong>Fracționare:</strong> jumătate, treime</li>
</ul>',
'[{"question": "Care parte de vorbire este flexibilă?", "options": ["Adverb", "Prepoziție", "Pronume", "Conjuncție"], "correctAnswer": 2}]'::jsonb, 45),

('romana-09', 'Morfologia - Verbul', 'romana', 'Studiul verbului și conjugărilor',
'<h2>Morfologia - Verbul</h2>
<h3>Definiția verbului</h3>
<p>Partea de vorbire care exprimă o acțiune, o stare sau o existență</p>

<h3>Categorii gramaticale</h3>
<ul>
<li><strong>Persoana:</strong> I, a II-a, a III-a</li>
<li><strong>Numărul:</strong> singular, plural</li>
<li><strong>Modul:</strong> indicativ, conjunctiv, imperativ, infinitiv, gerunziu, participiu</li>
<li><strong>Timpul:</strong> prezent, trecut, viitor</li>
<li><strong>Diateza:</strong> activă, pasivă, reflexivă</li>
</ul>

<h3>Modurile verbale</h3>
<p><strong>Moduri personale:</strong></p>
<ul>
<li><strong>Indicativul:</strong> exprimă realitatea</li>
<li><strong>Conjunctivul:</strong> exprimă posibilitatea, dorința</li>
<li><strong>Imperativul:</strong> exprimă comanda, rugămintea</li>
</ul>

<p><strong>Moduri nepersonale:</strong></p>
<ul>
<li><strong>Infinitivul:</strong> forma de bază a verbului</li>
<li><strong>Gerunziul:</strong> exprimă o acțiune simultană</li>
<li><strong>Participiul:</strong> are valoare de adjectiv</li>
</ul>

<h3>Timpurile verbale</h3>
<p><strong>La indicativ:</strong></p>
<ul>
<li>Prezent, imperfect, perfect simplu, perfect compus</li>
<li>Mai mult ca perfect, viitor I, viitor II</li>
</ul>

<h3>Conjugările</h3>
<ul>
<li><strong>Conjugarea I:</strong> verbe în -a (a cânta)</li>
<li><strong>Conjugarea II:</strong> verbe în -ea (a vedea)</li>
<li><strong>Conjugarea III:</strong> verbe în -e (a face)</li>
<li><strong>Conjugarea IV:</strong> verbe în -i/-î (a veni, a coborî)</li>
</ul>',
'[{"question": "Ce exprimă verbul în propoziție?", "options": ["O însușire", "O acțiune sau o stare", "O relație", "O circumstanță"], "correctAnswer": 1}]'::jsonb, 45),

('romana-10', 'Morfologia - Părțile de vorbire neflexibile', 'romana', 'Studiul adverbului, prepoziției, conjuncției',
'<h2>Morfologia - Părțile de vorbire neflexibile</h2>
<h3>Adverbul</h3>
<p><strong>Definiție:</strong> partea de vorbire care determină verbul, adjectivul sau alt adverb</p>
<p><strong>Tipuri după sens:</strong></p>
<ul>
<li><strong>De mod:</strong> bine, frumos, repede</li>
<li><strong>De timp:</strong> azi, mâine, ieri</li>
<li><strong>De loc:</strong> aici, acolo, undeva</li>
<li><strong>De cantitate:</strong> mult, puțin, destul</li>
<li><strong>De afirmare:</strong> da, într-adevăr</li>
<li><strong>De negare:</strong> nu, nicidecum</li>
<li><strong>De îndoială:</strong> poate, probabil</li>
</ul>

<h3>Prepoziția</h3>
<p><strong>Definiție:</strong> partea de vorbire care exprimă relații între cuvinte</p>
<p><strong>Tipuri:</strong></p>
<ul>
<li><strong>Simple:</strong> de, la, cu, în, pe, pentru</li>
<li><strong>Compuse:</strong> deasupra, dedesubt, înaintea</li>
<li><strong>Locuțiuni prepoziționale:</strong> în fața, în spatele</li>
</ul>

<h3>Conjuncția</h3>
<p><strong>Definiție:</strong> partea de vorbire care leagă cuvinte sau propoziții</p>
<p><strong>Tipuri:</strong></p>
<ul>
<li><strong>Coordinatoare:</strong> și, sau, dar, ci</li>
<li><strong>Subordinatoare:</strong> că, să, dacă, când, unde</li>
</ul>

<h3>Interjecția</h3>
<p><strong>Definiție:</strong> partea de vorbire care exprimă sentimente, stări</p>
<p><strong>Exemple:</strong> ah!, oh!, vai!, bravo!, ura!</p>

<h3>Caracteristici comune</h3>
<ul>
<li>Nu se schimbă forma (sunt invariabile)</li>
<li>Au rol gramatical în propoziție</li>
<li>Contribuie la coeziunea textului</li>
</ul>',
'[{"question": "Care dintre următoarele este o parte de vorbire neflexibilă?", "options": ["Substantivul", "Adjectivul", "Adverbul", "Pronumele"], "correctAnswer": 2}]'::jsonb, 45),

('romana-11', 'Sintaxa - Propoziția simplă', 'romana', 'Analiza sintactică a propoziției',
'<h2>Sintaxa - Propoziția simplă</h2>
<h3>Definiția propoziției</h3>
<p>Unitatea sintactică care exprimă o idee completă și conține un predicat</p>

<h3>Părțile principale de propoziție</h3>
<ul>
<li><strong>Subiectul:</strong> despre cine/ce se vorbește</li>
<li><strong>Predicatul:</strong> ce se spune despre subiect</li>
</ul>

<h3>Tipuri de predicate</h3>
<ul>
<li><strong>Predicatul verbal:</strong> exprimat prin verb predicativ</li>
<li><strong>Predicatul nominal:</strong> copulă + nume predicativ</li>
<li><strong>Predicatul mixt:</strong> verb copulativ + nume predicativ</li>
</ul>

<h3>Părțile secundare de propoziție</h3>
<ul>
<li><strong>Atributul:</strong> determină substantivul</li>
<li><strong>Complementul direct:</strong> răspunde la întrebările pe cine?, ce?</li>
<li><strong>Complementul indirect:</strong> răspunde la întrebări cu prepoziție</li>
<li><strong>Complementul circumstanțial:</strong> exprimă circumstanțe</li>
</ul>

<h3>Părțile de propoziție cu rol dublu</h3>
<ul>
<li><strong>Apoziția:</strong> determină un substantiv prin alt substantiv</li>
<li><strong>Predicatul secundar:</strong> se referă la subiect sau complement</li>
</ul>

<h3>Clasificarea propozițiilor</h3>
<p><strong>După sens:</strong></p>
<ul>
<li>Enunțiative, interogative, exclamative, imperativе</li>
</ul>

<p><strong>După formă:</strong></p>
<ul>
<li>Afirmative, negative</li>
</ul>',
'[{"question": "Care este partea principală de propoziție?", "options": ["Atributul", "Complementul", "Predicatul", "Apoziția"], "correctAnswer": 2}]'::jsonb, 45),

('romana-12', 'Sintaxa - Fraza', 'romana', 'Studiul propozițiilor în cadrul frazei',
'<h2>Sintaxa - Fraza</h2>
<h3>Definiția frazei</h3>
<p>Unitatea sintactică formată din una sau mai multe propoziții legate logic și gramatical</p>

<h3>Tipuri de fraze</h3>
<ul>
<li><strong>Fraza simplă:</strong> o singură propoziție</li>
<li><strong>Fraza compusă:</strong> mai multe propoziții</li>
</ul>

<h3>Raporturile sintactice în frază</h3>
<p><strong>Coordonarea:</strong></p>
<ul>
<li>Propoziții de același rang sintactic</li>
<li>Legate prin conjuncții coordinatoare</li>
<li>Tipuri: copulativă, disjunctivă, adversativă, conclusivă</li>
</ul>

<p><strong>Subordonarea:</strong></p>
<ul>
<li>O propoziție depinde de alta</li>
<li>Propoziția principală și propoziția subordonată</li>
<li>Legate prin conjuncții subordinatoare sau pronume relative</li>
</ul>

<h3>Tipuri de propoziții subordonate</h3>
<ul>
<li><strong>Subiective:</strong> îndeplinesc funcția de subiect</li>
<li><strong>Predicative:</strong> îndeplinesc funcția de nume predicativ</li>
<li><strong>Completive directe:</strong> funcția de complement direct</li>
<li><strong>Completive indirecte:</strong> funcția de complement indirect</li>
<li><strong>Circumstanțiale:</strong> funcția de complement circumstanțial</li>
<li><strong>Atributive:</strong> funcția de atribut</li>
</ul>

<h3>Mijloace de exprimare a raporturilor</h3>
<ul>
<li>Conjuncții și locuțiuni conjuncționale</li>
<li>Pronume și adverbe relative</li>
<li>Conjunctivul și infinitivul</li>
<li>Gerunziul și participiul</li>
</ul>',
'[{"question": "Ce tip de raport sintactic există între propozițiile \"Știu că vii mâine\"?", "options": ["Coordonare", "Subordonare", "Juxtapunere", "Incidență"], "correctAnswer": 1}]'::jsonb, 45),

('romana-13', 'Ortografia și punctuația', 'romana', 'Regulile de scriere corectă',
'<h2>Ortografia și punctuația</h2>
<h3>Scrierea cu â și î</h3>
<ul>
<li><strong>Î:</strong> la începutul și sfârșitul cuvintelor (înalt, a urî)</li>
<li><strong>Â:</strong> în interiorul cuvintelor (pământ, râu)</li>
<li><strong>Excepții:</strong> cuvintele din familia lui "român" (România, românesc)</li>
</ul>

<h3>Scrierea cu s și z</h3>
<ul>
<li><strong>S:</strong> în general (casă, masă)</li>
<li><strong>Z:</strong> în cuvinte de origine străină (zero, zonă)</li>
<li>La sfârșitul cuvintelor: -s (frumos, gelos)</li>
</ul>

<h3>Scrierea cu x</h3>
<ul>
<li>În cuvinte de origine latină (examen, exercițiu)</li>
<li>În prefixul ex- (ex-ministru)</li>
<li>În cuvinte de origine greacă (axiomă)</li>
</ul>

<h3>Semnele de punctuație</h3>
<ul>
<li><strong>Punctul (.):</strong> sfârșitul propoziției enunțiative</li>
<li><strong>Virgula (,):</strong> pauză scurtă, separare</li>
<li><strong>Punctul și virgula (;):</strong> pauză medie</li>
<li><strong>Două puncte (:):</strong> înaintea unei enumerări sau explicații</li>
<li><strong>Semnul întrebării (?):</strong> sfârșitul propoziției interogative</li>
<li><strong>Semnul exclamării (!):</strong> sfârșitul propoziției exclamative</li>
<li><strong>Liniuța de dialog (—):</strong> în dialoguri</li>
<li><strong>Ghilimelele („"):</strong> pentru citate</li>
<li><strong>Parantezele ():</strong> pentru explicații</li>
</ul>

<h3>Folosirea virgulei</h3>
<ul>
<li>Între părțile de propoziție omogene</li>
<li>Pentru izolarea apoziției</li>
<li>Pentru izolarea vocativului</li>
<li>Înaintea conjuncțiilor adversative</li>
</ul>',
'[{"question": "Când se folosește â în interiorul cuvântului?", "options": ["Întotdeauna", "Niciodată", "În familia lexicală a lui român", "La început de cuvânt"], "correctAnswer": 2}]'::jsonb, 45),

('romana-14', 'Stilistica și registrele limbii', 'romana', 'Varietățile funcționale ale limbii',
'<h2>Stilistica și registrele limbii</h2>
<h3>Stilurile funcționale</h3>
<ul>
<li><strong>Stilul beletristic:</strong> literatura artistică</li>
<li><strong>Stilul științific:</strong> lucrări științifice</li>
<li><strong>Stilul publicistic:</strong> presă, mass-media</li>
<li><strong>Stilul oficial:</strong> acte, documente</li>
<li><strong>Stilul conversațional:</strong> vorbirea curentă</li>
</ul>

<h3>Caracteristicile stilurilor</h3>
<p><strong>Stilul beletristic:</strong></p>
<ul>
<li>Expresivitate și subiectivitate</li>
<li>Figuri de stil</li>
<li>Originalitate și creativitate</li>
</ul>

<p><strong>Stilul științific:</strong></p>
<ul>
<li>Obiectivitate și precizie</li>
<li>Terminologie specializată</li>
<li>Claritate și logică</li>
</ul>

<p><strong>Stilul publicistic:</strong></p>
<ul>
<li>Actualitate și impact</li>
<li>Accesibilitate</li>
<li>Funcție informativă și persuasivă</li>
</ul>

<h3>Registrele limbii</h3>
<ul>
<li><strong>Registrul familiar:</strong> în familie, cu prietenii</li>
<li><strong>Registrul standard:</strong> în situații normale</li>
<li><strong>Registrul solemn:</strong> în situații oficiale</li>
</ul>

<h3>Varietățile teritoriale</h3>
<ul>
<li>Limba literară (norma)</li>
<li>Dialectele</li>
<li>Graiul</li>
<li>Regionalismele</li>
</ul>

<h3>Varietățile sociale</h3>
<ul>
<li>Jargonul profesional</li>
<li>Argoul</li>
<li>Limbajul tinerilor</li>
</ul>',
'[{"question": "Care stil se caracterizează prin obiectivitate și terminologie specializată?", "options": ["Beletristic", "Științific", "Publicistic", "Conversațional"], "correctAnswer": 1}]'::jsonb, 45),

('romana-15', 'Comentariul literar și eseul', 'romana', 'Tehnici de analiză și interpretare literară',
'<h2>Comentariul literar și eseul</h2>
<h3>Comentariul literar</h3>
<p><strong>Definiție:</strong> analiza sistematică a unui text literar</p>

<p><strong>Structura:</strong></p>
<ol>
<li><strong>Introducerea:</strong> prezentarea operei și autorului</li>
<li><strong>Dezvoltarea:</strong> analiza pe nivele</li>
<li><strong>Concluzia:</strong> sinteza și aprecierea</li>
</ol>

<p><strong>Nivelele de analiză:</strong></p>
<ul>
<li><strong>Tematic:</strong> tema, motivele, ideile</li>
<li><strong>Structural:</strong> compoziția, structura</li>
<li><strong>Stilistic:</strong> limbajul, figurile de stil</li>
<li><strong>Interpretativ:</strong> sensurile, simbolurile</li>
</ul>

<h3>Eseul literar</h3>
<p><strong>Caracteristici:</strong></p>
<ul>
<li>Subiectivitate și originalitate</li>
<li>Stil personal</li>
<li>Libertate în abordare</li>
<li>Caracter reflexiv</li>
</ul>

<p><strong>Tipuri de eseu:</strong></p>
<ul>
<li>Eseul descriptiv</li>
<li>Eseul narativ</li>
<li>Eseul argumentativ</li>
<li>Eseul explicativ</li>
</ul>

<h3>Tehnici de redactare</h3>
<ul>
<li>Planificarea ideilor</li>
<li>Structurarea logică</li>
<li>Folosirea exemplelor</li>
<li>Respectarea normelor lingvistice</li>
</ul>

<h3>Criterii de evaluare</h3>
<ul>
<li>Înțelegerea textului</li>
<li>Calitatea analizei</li>
<li>Originalitatea interpretării</li>
<li>Corectitudinea lingvistică</li>
<li>Structura și coerența</li>
</ul>',
'[{"question": "Ce caracterizează eseul literar?", "options": ["Obiectivitatea", "Subiectivitatea", "Rigiditatea", "Impersonalitatea"], "correctAnswer": 1}]'::jsonb, 45);

-- INFORMATICĂ - 15 lecții pentru Bacalaureat
INSERT INTO lessons (id, title, subject, description, content, quiz, duration) VALUES
('info-01', 'Introducere în Programare și Algoritmi', 'informatica', 'Concepte fundamentale de programare',
'<h2>Introducere în Programare și Algoritmi</h2>
<h3>Ce este programarea?</h3>
<p>Programarea este procesul de creare a unui set de instrucțiuni pe care un computer le poate executa pentru a rezolva o problemă sau a îndeplini o sarcină specifică.</p>

<h3>Algoritmul</h3>
<p><strong>Definiție:</strong> Succesiune finită de pași elementari, neambigui, care duc la rezolvarea unei probleme.</p>
<p><strong>Proprietăți:</strong></p>
<ul>
<li>Finitudine: se termină într-un număr finit de pași</li>
<li>Determinism: fiecare pas este clar definit</li>
<li>Eficiență: folosește resurse rezonabile</li>
<li>Generalitate: rezolvă o clasă de probleme</li>
</ul>

<h3>Reprezentarea algoritmilor</h3>
<ul>
<li><strong>Limbaj natural:</strong> descriere în cuvinte</li>
<li><strong>Pseudocod:</strong> notație structurată</li>
<li><strong>Schemă logică:</strong> reprezentare grafică</li>
<li><strong>Cod sursă:</strong> într-un limbaj de programare</li>
</ul>

<h3>Primul program în C++</h3>
<pre><code>#include &lt;iostream&gt;
using namespace std;

int main() {
    cout &lt;&lt; "Hello, World!" &lt;&lt; endl;
    return 0;
}</code></pre>

<h3>Structura unui program</h3>
<ul>
<li>Directivele preprocesorului (#include)</li>
<li>Declarațiile de namespace</li>
<li>Funcția main()</li>
<li>Instrucțiunile programului</li>
</ul>',
'[{"question": "Care este primul pas în rezolvarea unei probleme prin programare?", "options": ["Scrierea codului", "Analiza problemei și crearea algoritmului", "Testarea programului", "Compilarea"], "correctAnswer": 1}]'::jsonb, 50),

('info-02', 'Tipuri de Date și Variabile', 'informatica', 'Lucrul cu date în programare',
'<h2>Tipuri de Date și Variabile</h2>
<h3>Tipuri de date fundamentale</h3>
<ul>
<li><strong>int:</strong> numere întregi (-2147483648 la 2147483647)</li>
<li><strong>float:</strong> numere reale cu precizie simplă</li>
<li><strong>double:</strong> numere reale cu precizie dublă</li>
<li><strong>char:</strong> caractere (un singur caracter)</li>
<li><strong>bool:</strong> valori logice (true/false)</li>
</ul>

<h3>Declararea variabilelor</h3>
<pre><code>int varsta;           // declarare
int numar = 10;       // declarare cu inițializare
float nota = 9.5;
char litera = \'A\';
bool valid = true;</code></pre>

<h3>Constante</h3>
<pre><code>const int MAX_SIZE = 100;
const float PI = 3.14159;</code></pre>

<h3>Operatori aritmetici</h3>
<ul>
<li><strong>+</strong> (adunare)</li>
<li><strong>-</strong> (scădere)</li>
<li><strong>*</strong> (înmulțire)</li>
<li><strong>/</strong> (împărțire)</li>
<li><strong>%</strong> (restul împărțirii)</li>
</ul>

<h3>Operatori de comparație</h3>
<ul>
<li><strong>==</strong> (egal)</li>
<li><strong>!=</strong> (diferit)</li>
<li><strong>&lt;</strong> (mai mic)</li>
<li><strong>&gt;</strong> (mai mare)</li>
<li><strong>&lt;=</strong> (mai mic sau egal)</li>
<li><strong>&gt;=</strong> (mai mare sau egal)</li>
</ul>

<h3>Operatori logici</h3>
<ul>
<li><strong>&&</strong> (și logic)</li>
<li><strong>||</strong> (sau logic)</li>
<li><strong>!</strong> (negația logică)</li>
</ul>',
'[{"question": "Care tip de date se folosește pentru numere întregi?", "options": ["float", "int", "char", "double"], "correctAnswer": 1}]'::jsonb, 45),

('info-03', 'Structuri de Control - Instrucțiuni Condiționale', 'informatica', 'Instrucțiuni de decizie în programare',
'<h2>Structuri de Control - Instrucțiuni Condiționale</h2>
<h3>Instrucțiunea if</h3>
<pre><code>if (conditie) {
    // instrucțiuni dacă condiția este adevărată
}</code></pre>

<h3>Instrucțiunea if-else</h3>
<pre><code>if (conditie) {
    // instrucțiuni dacă condiția este adevărată
} else {
    // instrucțiuni dacă condiția este falsă
}</code></pre>

<h3>Instrucțiunea if-else if</h3>
<pre><code>if (nota >= 9) {
    cout &lt;&lt; "Foarte bine";
} else if (nota >= 7) {
    cout &lt;&lt; "Bine";
} else if (nota >= 5) {
    cout &lt;&lt; "Suficient";
} else {
    cout &lt;&lt; "Insuficient";
}</code></pre>

<h3>Instrucțiunea switch</h3>
<pre><code>switch (variabila) {
    case valoare1:
        // instrucțiuni
        break;
    case valoare2:
        // instrucțiuni
        break;
    default:
        // instrucțiuni implicite
}</code></pre>

<h3>Operatorul ternar</h3>
<pre><code>rezultat = (conditie) ? valoare_daca_true : valoare_daca_false;</code></pre>

<h3>Exemple practice</h3>
<pre><code>// Verificarea parității unui număr
int numar;
cin &gt;&gt; numar;
if (numar % 2 == 0) {
    cout &lt;&lt; "Numărul este par";
} else {
    cout &lt;&lt; "Numărul este impar";
}</code></pre>',
'[{"question": "Ce instrucțiune se folosește pentru a testa multiple valori ale unei variabile?", "options": ["if", "while", "switch", "for"], "correctAnswer": 2}]'::jsonb, 45),

('info-04', 'Structuri de Control - Instrucțiuni Repetitive', 'informatica', 'Bucle și iterații în programare',
'<h2>Structuri de Control - Instrucțiuni Repetitive</h2>
<h3>Bucla for</h3>
<pre><code>for (initializare; conditie; incrementare) {
    // instrucțiuni care se repetă
}</code></pre>

<p><strong>Exemplu:</strong></p>
<pre><code>for (int i = 1; i &lt;= 10; i++) {
    cout &lt;&lt; i &lt;&lt; " ";
}</code></pre>

<h3>Bucla while</h3>
<pre><code>while (conditie) {
    // instrucțiuni care se repetă
    // actualizarea variabilei de control
}</code></pre>

<p><strong>Exemplu:</strong></p>
<pre><code>int i = 1;
while (i &lt;= 10) {
    cout &lt;&lt; i &lt;&lt; " ";
    i++;
}</code></pre>

<h3>Bucla do-while</h3>
<pre><code>do {
    // instrucțiuni care se repetă
} while (conditie);</code></pre>

<p><strong>Exemplu:</strong></p>
<pre><code>int numar;
do {
    cout &lt;&lt; "Introduceți un număr pozitiv: ";
    cin &gt;&gt; numar;
} while (numar &lt;= 0);</code></pre>

<h3>Instrucțiuni de control</h3>
<ul>
<li><strong>break:</strong> ieșirea forțată din buclă</li>
<li><strong>continue:</strong> sărirea la următoarea iterație</li>
</ul>

<h3>Bucle imbricate</h3>
<pre><code>for (int i = 1; i &lt;= 3; i++) {
    for (int j = 1; j &lt;= 3; j++) {
        cout &lt;&lt; "(" &lt;&lt; i &lt;&lt; "," &lt;&lt; j &lt;&lt; ") ";
    }
    cout &lt;&lt; endl;
}</code></pre>',
'[{"question": "Care buclă se execută cel puțin o dată?", "options": ["for", "while", "do-while", "Toate"], "correctAnswer": 2}]'::jsonb, 50),

('info-05', 'Tablouri Unidimensionale (Vectori)', 'informatica', 'Lucrul cu structuri de date liniare',
'<h2>Tablouri Unidimensionale (Vectori)</h2>
<h3>Declararea vectorilor</h3>
<pre><code>int v[100];           // vector cu 100 de elemente
int numere[5] = {1, 2, 3, 4, 5};  // cu inițializare</code></pre>

<h3>Accesarea elementelor</h3>
<pre><code>v[0] = 10;    // primul element (indexul 0)
v[1] = 20;    // al doilea element
int x = v[0]; // citirea unui element</code></pre>

<h3>Citirea unui vector</h3>
<pre><code>int n, v[100];
cout &lt;&lt; "Numărul de elemente: ";
cin &gt;&gt; n;
for (int i = 0; i &lt; n; i++) {
    cout &lt;&lt; "v[" &lt;&lt; i &lt;&lt; "] = ";
    cin &gt;&gt; v[i];
}</code></pre>

<h3>Afișarea unui vector</h3>
<pre><code>cout &lt;&lt; "Elementele vectorului: ";
for (int i = 0; i &lt; n; i++) {
    cout &lt;&lt; v[i] &lt;&lt; " ";
}
cout &lt;&lt; endl;</code></pre>

<h3>Operații comune cu vectori</h3>
<p><strong>Căutarea unui element:</strong></p>
<pre><code>int cautat, pozitie = -1;
cin &gt;&gt; cautat;
for (int i = 0; i &lt; n; i++) {
    if (v[i] == cautat) {
        pozitie = i;
        break;
    }
}</code></pre>

<p><strong>Găsirea minimului:</strong></p>
<pre><code>int minim = v[0];
for (int i = 1; i &lt; n; i++) {
    if (v[i] &lt; minim) {
        minim = v[i];
    }
}</code></pre>

<p><strong>Suma elementelor:</strong></p>
<pre><code>int suma = 0;
for (int i = 0; i &lt; n; i++) {
    suma += v[i];
}</code></pre>',
'[{"question": "Care este indexul primului element dintr-un vector în C++?", "options": ["1", "0", "-1", "Depinde de declarație"], "correctAnswer": 1}]'::jsonb, 50),

('info-06', 'Tablouri Bidimensionale (Matrice)', 'informatica', 'Lucrul cu structuri de date bidimensionale',
'<h2>Tablouri Bidimensionale (Matrice)</h2>
<h3>Declararea matricelor</h3>
<pre><code>int m[10][10];        // matrice 10x10
int a[3][3] = {{1,2,3}, {4,5,6}, {7,8,9}}; // cu inițializare</code></pre>

<h3>Citirea unei matrice</h3>
<pre><code>int n, m, a[100][100];
cout &lt;&lt; "Numărul de linii și coloane: ";
cin &gt;&gt; n &gt;&gt; m;
for (int i = 0; i &lt; n; i++) {
    for (int j = 0; j &lt; m; j++) {
        cout &lt;&lt; "a[" &lt;&lt; i &lt;&lt; "][" &lt;&lt; j &lt;&lt; "] = ";
        cin &gt;&gt; a[i][j];
    }
}</code></pre>

<h3>Afișarea unei matrice</h3>
<pre><code>for (int i = 0; i &lt; n; i++) {
    for (int j = 0; j &lt; m; j++) {
        cout &lt;&lt; a[i][j] &lt;&lt; " ";
    }
    cout &lt;&lt; endl;
}</code></pre>

<h3>Operații cu matrice</h3>
<p><strong>Suma elementelor de pe diagonala principală:</strong></p>
<pre><code>int suma = 0;
for (int i = 0; i &lt; n; i++) {
    suma += a[i][i];
}</code></pre>

<p><strong>Transpusa unei matrice:</strong></p>
<pre><code>int t[100][100];
for (int i = 0; i &lt; n; i++) {
    for (int j = 0; j &lt; m; j++) {
        t[j][i] = a[i][j];
    }
}</code></pre>

<p><strong>Verificarea dacă o matrice este simetrică:</strong></p>
<pre><code>bool simetrica = true;
for (int i = 0; i &lt; n && simetrica; i++) {
    for (int j = 0; j &lt; n && simetrica; j++) {
        if (a[i][j] != a[j][i]) {
            simetrica = false;
        }
    }
}</code></pre>',
'[{"question": "Cum se accesează elementul de pe linia 2, coloana 3 dintr-o matrice a?", "options": ["a[2][3]", "a[3][2]", "a(2,3)", "a[2,3]"], "correctAnswer": 0}]'::jsonb, 50),

('info-07', 'Funcții și Proceduri', 'informatica', 'Modularizarea codului prin subprograme',
'<h2>Funcții și Proceduri</h2>
<h3>Definirea unei funcții</h3>
<pre><code>tip_returnat nume_functie(parametri) {
    // corpul funcției
    return valoare;
}</code></pre>

<h3>Exemplu de funcție</h3>
<pre><code>int suma(int a, int b) {
    return a + b;
}

int main() {
    int rezultat = suma(5, 3);
    cout &lt;&lt; rezultat; // afișează 8
    return 0;
}</code></pre>

<h3>Funcții fără valoare de retur (proceduri)</h3>
<pre><code>void afiseaza_mesaj() {
    cout &lt;&lt; "Salut din funcție!" &lt;&lt; endl;
}

void afiseaza_numar(int n) {
    cout &lt;&lt; "Numărul este: " &lt;&lt; n &lt;&lt; endl;
}</code></pre>

<h3>Transmiterea parametrilor</h3>
<p><strong>Prin valoare:</strong></p>
<pre><code>void modifica_valoare(int x) {
    x = 100; // nu modifică variabila originală
}</code></pre>

<p><strong>Prin referință:</strong></p>
<pre><code>void modifica_referinta(int &x) {
    x = 100; // modifică variabila originală
}</code></pre>

<h3>Funcții cu vectori</h3>
<pre><code>void afiseaza_vector(int v[], int n) {
    for (int i = 0; i &lt; n; i++) {
        cout &lt;&lt; v[i] &lt;&lt; " ";
    }
    cout &lt;&lt; endl;
}

int suma_vector(int v[], int n) {
    int s = 0;
    for (int i = 0; i &lt; n; i++) {
        s += v[i];
    }
    return s;
}</code></pre>

<h3>Recursivitatea</h3>
<pre><code>int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}</code></pre>',
'[{"question": "Ce se întâmplă când o funcție nu are instrucțiunea return?", "options": ["Eroare de compilare", "Returnează 0", "Returnează valoare aleatoare", "Depinde de tipul funcției"], "correctAnswer": 3}]'::jsonb, 55),

('info-08', 'Șiruri de Caractere (String)', 'informatica', 'Prelucrarea textelor în programare',
'<h2>Șiruri de Caractere (String)</h2>
<h3>Declararea șirurilor</h3>
<pre><code>#include &lt;string&gt;
string nume = "Ion";
string prenume;
char sir[100];</code></pre>

<h3>Operații de bază</h3>
<pre><code>string s1 = "Hello";
string s2 = "World";
string s3 = s1 + " " + s2; // concatenare
cout &lt;&lt; s3; // "Hello World"</code></pre>

<h3>Funcții utile pentru string</h3>
<ul>
<li><strong>length() / size():</strong> lungimea șirului</li>
<li><strong>substr(pos, len):</strong> subșir</li>
<li><strong>find(str):</strong> căutarea unui subșir</li>
<li><strong>replace(pos, len, str):</strong> înlocuirea</li>
</ul>

<pre><code>string text = "Programare";
cout &lt;&lt; text.length();     // 10
cout &lt;&lt; text.substr(0, 7); // "Program"
cout &lt;&lt; text.find("gram");  // 3</code></pre>

<h3>Parcurgerea caracterelor</h3>
<pre><code>string cuvant = "Hello";
for (int i = 0; i &lt; cuvant.length(); i++) {
    cout &lt;&lt; cuvant[i] &lt;&lt; " ";
}

// sau cu range-based for (C++11)
for (char c : cuvant) {
    cout &lt;&lt; c &lt;&lt; " ";
}</code></pre>

<h3>Funcții pentru caractere</h3>
<pre><code>#include &lt;cctype&gt;
char c = \'a\';
cout &lt;&lt; toupper(c);  // \'A\'
cout &lt;&lt; tolower(\'B\'); // \'b\'
cout &lt;&lt; isdigit(\'5\'); // true
cout &lt;&lt; isalpha(\'a\'); // true</code></pre>

<h3>Compararea șirurilor</h3>
<pre><code>string s1 = "abc";
string s2 = "def";
if (s1 == s2) {
    cout &lt;&lt; "Egale";
} else if (s1 &lt; s2) {
    cout &lt;&lt; "s1 este mai mic lexicografic";
}</code></pre>',
'[{"question": "Care funcție returnează lungimea unui șir în C++?", "options": ["size()", "length()", "count()", "Toate variantele a și b"], "correctAnswer": 3}]'::jsonb, 50),

('info-09', 'Algoritmi de Sortare', 'informatica', 'Algoritmi clasici pentru ordonarea datelor',
'<h2>Algoritmi de Sortare</h2>
<h3>Bubble Sort</h3>
<p>Compară elemente adiacente și le interschimbă dacă sunt în ordine greșită.</p>
<pre><code>void bubbleSort(int arr[], int n) {
    for (int i = 0; i &lt; n-1; i++) {
        for (int j = 0; j &lt; n-i-1; j++) {
            if (arr[j] &gt; arr[j+1]) {
                // interschimbarea
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}</code></pre>

<h3>Selection Sort</h3>
<p>Găsește minimul și îl plasează la început.</p>
<pre><code>void selectionSort(int arr[], int n) {
    for (int i = 0; i &lt; n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j &lt; n; j++) {
            if (arr[j] &lt; arr[min_idx]) {
                min_idx = j;
            }
        }
        // interschimbarea
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}</code></pre>

<h3>Insertion Sort</h3>
<p>Inserează fiecare element în poziția corectă.</p>
<pre><code>void insertionSort(int arr[], int n) {
    for (int i = 1; i &lt; n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j &gt;= 0 && arr[j] &gt; key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}</code></pre>

<h3>Complexitatea algoritmilor</h3>
<ul>
<li><strong>Bubble Sort:</strong> O(n²)</li>
<li><strong>Selection Sort:</strong> O(n²)</li>
<li><strong>Insertion Sort:</strong> O(n²) în cazul cel mai rău, O(n) în cazul cel mai bun</li>
</ul>

<h3>Funcția sort() din STL</h3>
<pre><code>#include &lt;algorithm&gt;
int arr[] = {64, 34, 25, 12, 22, 11, 90};
int n = sizeof(arr)/sizeof(arr[0]);
sort(arr, arr + n);</code></pre>',
'[{"question": "Care algoritm de sortare are complexitatea cea mai bună în cazul cel mai bun?", "options": ["Bubble Sort", "Selection Sort", "Insertion Sort", "Toți au aceeași complexitate"], "correctAnswer": 2}]'::jsonb, 55),

('info-10', 'Algoritmi de Căutare', 'informatica', 'Tehnici de căutare în structuri de date',
'<h2>Algoritmi de Căutare</h2>
<h3>Căutarea liniară (secvențială)</h3>
<p>Parcurge vectorul element cu element.</p>
<pre><code>int cautare_liniara(int arr[], int n, int x) {
    for (int i = 0; i &lt; n; i++) {
        if (arr[i] == x) {
            return i; // returnează poziția
        }
    }
    return -1; // nu a fost găsit
}</code></pre>

<h3>Căutarea binară</h3>
<p>Funcționează doar pe vectori sortați. Împarte repetat intervalul de căutare la jumătate.</p>
<pre><code>int cautare_binara(int arr[], int l, int r, int x) {
    while (l &lt;= r) {
        int m = l + (r - l) / 2;
        
        if (arr[m] == x) {
            return m;
        }
        
        if (arr[m] &lt; x) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return -1;
}</code></pre>

<h3>Căutarea binară recursivă</h3>
<pre><code>int cautare_binara_rec(int arr[], int l, int r, int x) {
    if (r &gt;= l) {
        int mid = l + (r - l) / 2;
        
        if (arr[mid] == x) {
            return mid;
        }
        
        if (arr[mid] &gt; x) {
            return cautare_binara_rec(arr, l, mid - 1, x);
        }
        
        return cautare_binara_rec(arr, mid + 1, r, x);
    }
    return -1;
}</code></pre>

<h3>Complexitatea algoritmilor</h3>
<ul>
<li><strong>Căutarea liniară:</strong> O(n)</li>
<li><strong>Căutarea binară:</strong> O(log n)</li>
</ul>

<h3>Căutarea în șiruri de caractere</h3>
<pre><code>string text = "Acesta este un text de test";
string cuvant = "test";
size_t pozitie = text.find(cuvant);
if (pozitie != string::npos) {
    cout &lt;&lt; "Găsit la poziția: " &lt;&lt; pozitie;
}</code></pre>',
'[{"question": "Care este complexitatea căutării binare?", "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"], "correctAnswer": 1}]'::jsonb, 50),

('info-11', 'Structuri de Date Avansate', 'informatica', 'Liste, stive, cozi și arbori',
'<h2>Structuri de Date Avansate</h2>
<h3>Structuri (struct)</h3>
<pre><code>struct Student {
    string nume;
    int varsta;
    float medie;
};

Student s1;
s1.nume = "Ion";
s1.varsta = 18;
s1.medie = 9.5;</code></pre>

<h3>Stiva (Stack)</h3>
<p>Principiul LIFO (Last In, First Out)</p>
<pre><code>#include &lt;stack&gt;
stack&lt;int&gt; st;
st.push(10);    // adaugă element
st.push(20);
int top = st.top(); // accesează vârful
st.pop();       // elimină vârful</code></pre>

<h3>Coada (Queue)</h3>
<p>Principiul FIFO (First In, First Out)</p>
<pre><code>#include &lt;queue&gt;
queue&lt;int&gt; q;
q.push(10);     // adaugă la sfârșitul cozii
q.push(20);
int front = q.front(); // accesează primul element
q.pop();        // elimină primul element</code></pre>

<h3>Vector dinamic</h3>
<pre><code>#include &lt;vector&gt;
vector&lt;int&gt; v;
v.push_back(10);  // adaugă element
v.push_back(20);
cout &lt;&lt; v[0];     // accesează primul element
cout &lt;&lt; v.size(); // dimensiunea vectorului</code></pre>

<h3>Lista înlănțuită (conceptual)</h3>
<pre><code>struct Nod {
    int data;
    Nod* next;
};

Nod* cap = nullptr;

void adauga_la_inceput(int valoare) {
    Nod* nou = new Nod;
    nou-&gt;data = valoare;
    nou-&gt;next = cap;
    cap = nou;
}</code></pre>

<h3>Set și Map</h3>
<pre><code>#include &lt;set&gt;
#include &lt;map&gt;

set&lt;int&gt; s;
s.insert(10);
s.insert(20);

map&lt;string, int&gt; m;
m["Ion"] = 18;
m["Ana"] = 17;</code></pre>',
'[{"question": "Ce principiu urmează o stivă?", "options": ["FIFO", "LIFO", "RANDOM", "SORTED"], "correctAnswer": 1}]'::jsonb, 55),

('info-12', 'Programare Orientată pe Obiecte', 'informatica', 'Concepte fundamentale OOP în C++',
'<h2>Programare Orientată pe Obiecte</h2>
<h3>Clasa și obiectul</h3>
<pre><code>class Persoana {
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
    void afiseaza() {
        cout &lt;&lt; nume &lt;&lt; " - " &lt;&lt; varsta &lt;&lt; " ani" &lt;&lt; endl;
    }
    
    // Getteri și setteri
    string getNume() { return nume; }
    void setVarsta(int v) { varsta = v; }
};</code></pre>

<h3>Crearea obiectelor</h3>
<pre><code>Persoana p1("Ion", 25);
Persoana p2("Ana", 22);
p1.afiseaza();
p2.setVarsta(23);</code></pre>

<h3>Încapsularea</h3>
<ul>
<li><strong>private:</strong> accesibil doar în clasă</li>
<li><strong>public:</strong> accesibil din exterior</li>
<li><strong>protected:</strong> accesibil în clasă și clasele derivate</li>
</ul>

<h3>Moștenirea</h3>
<pre><code>class Student : public Persoana {
private:
    float medie;
    
public:
    Student(string n, int v, float m) : Persoana(n, v) {
        medie = m;
    }
    
    void afiseaza_student() {
        afiseaza();
        cout &lt;&lt; "Media: " &lt;&lt; medie &lt;&lt; endl;
    }
};</code></pre>

<h3>Polimorfismul</h3>
<pre><code>class Animal {
public:
    virtual void sunet() {
        cout &lt;&lt; "Animalul face un sunet" &lt;&lt; endl;
    }
};

class Caine : public Animal {
public:
    void sunet() override {
        cout &lt;&lt; "Ham ham!" &lt;&lt; endl;
    }
};</code></pre>

<h3>Constructori și destructori</h3>
<pre><code>class Exemplu {
public:
    Exemplu() {  // Constructor implicit
        cout &lt;&lt; "Obiect creat" &lt;&lt; endl;
    }
    
    ~Exemplu() { // Destructor
        cout &lt;&lt; "Obiect distrus" &lt;&lt; endl;
    }
};</code></pre>',
'[{"question": "Ce principiu OOP ascunde detaliile implementării?", "options": ["Moștenirea", "Polimorfismul", "Încapsularea", "Abstractizarea"], "correctAnswer": 2}]'::jsonb, 60),

('info-13', 'Fișiere și Fluxuri de Date', 'informatica', 'Lucrul cu fișiere pentru persistența datelor',
'<h2>Fișiere și Fluxuri de Date</h2>
<h3>Tipuri de fișiere</h3>
<ul>
<li><strong>Fișiere text:</strong> conțin caractere lizibile</li>
<li><strong>Fișiere binare:</strong> conțin date în format binar</li>
</ul>

<h3>Scrierea în fișiere</h3>
<pre><code>#include &lt;fstream&gt;

ofstream fout("date.txt");
if (fout.is_open()) {
    fout &lt;&lt; "Hello, file!" &lt;&lt; endl;
    fout &lt;&lt; "Linia 2" &lt;&lt; endl;
    fout.close();
} else {
    cout &lt;&lt; "Eroare la deschiderea fișierului!" &lt;&lt; endl;
}</code></pre>

<h3>Citirea din fișiere</h3>
<pre><code>ifstream fin("date.txt");
string linie;
if (fin.is_open()) {
    while (getline(fin, linie)) {
        cout &lt;&lt; linie &lt;&lt; endl;
    }
    fin.close();
}</code></pre>

<h3>Citirea cuvânt cu cuvânt</h3>
<pre><code>ifstream fin("date.txt");
string cuvant;
while (fin &gt;&gt; cuvant) {
    cout &lt;&lt; cuvant &lt;&lt; " ";
}</code></pre>

<h3>Lucrul cu numere în fișiere</h3>
<pre><code>// Scriere
ofstream fout("numere.txt");
for (int i = 1; i &lt;= 10; i++) {
    fout &lt;&lt; i &lt;&lt; " ";
}
fout.close();

// Citire
ifstream fin("numere.txt");
int numar;
while (fin &gt;&gt; numar) {
    cout &lt;&lt; numar &lt;&lt; " ";
}
fin.close();</code></pre>

<h3>Verificarea sfârșitului de fișier</h3>
<pre><code>ifstream fin("date.txt");
char c;
while (!fin.eof()) {
    fin.get(c);
    cout &lt;&lt; c;
}</code></pre>

<h3>Moduri de deschidere</h3>
<ul>
<li><strong>ios::in:</strong> citire</li>
<li><strong>ios::out:</strong> scriere</li>
<li><strong>ios::app:</strong> adăugare la sfârșitul fișierului</li>
<li><strong>ios::binary:</strong> mod binar</li>
</ul>',
'[{"question": "Ce clasă se folosește pentru citirea din fișiere în C++?", "options": ["ofstream", "ifstream", "fstream", "iostream"], "correctAnswer": 1}]'::jsonb, 50),

('info-14', 'Recursivitate și Algoritmi Recursivi', 'informatica', 'Tehnici de programare recursivă',
'<h2>Recursivitate și Algoritmi Recursivi</h2>
<h3>Conceptul de recursivitate</h3>
<p>O funcție este recursivă dacă se apelează pe ea însăși.</p>

<h3>Structura unei funcții recursive</h3>
<ul>
<li><strong>Cazul de bază:</strong> condiția de oprire</li>
<li><strong>Cazul recursiv:</strong> apelul funcției cu parametri modificați</li>
</ul>

<h3>Factorialul unui număr</h3>
<pre><code>int factorial(int n) {
    // Cazul de bază
    if (n == 0 || n == 1) {
        return 1;
    }
    // Cazul recursiv
    return n * factorial(n - 1);
}</code></pre>

<h3>Șirul lui Fibonacci</h3>
<pre><code>int fibonacci(int n) {
    if (n &lt;= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}</code></pre>

<h3>Suma cifrelor unui număr</h3>
<pre><code>int suma_cifre(int n) {
    if (n == 0) {
        return 0;
    }
    return n % 10 + suma_cifre(n / 10);
}</code></pre>

<h3>Căutarea binară recursivă</h3>
<pre><code>int cautare_binara(int arr[], int l, int r, int x) {
    if (r &gt;= l) {
        int mid = l + (r - l) / 2;
        
        if (arr[mid] == x) {
            return mid;
        }
        
        if (arr[mid] &gt; x) {
            return cautare_binara(arr, l, mid - 1, x);
        }
        
        return cautare_binara(arr, mid + 1, r, x);
    }
    return -1;
}</code></pre>

<h3>Turnurile din Hanoi</h3>
<pre><code>void hanoi(int n, char sursa, char destinatie, char auxiliar) {
    if (n == 1) {
        cout &lt;&lt; "Mută discul 1 de la " &lt;&lt; sursa 
             &lt;&lt; " la " &lt;&lt; destinatie &lt;&lt; endl;
        return;
    }
    hanoi(n-1, sursa, auxiliar, destinatie);
    cout &lt;&lt; "Mută discul " &lt;&lt; n &lt;&lt; " de la " 
         &lt;&lt; sursa &lt;&lt; " la " &lt;&lt; destinatie &lt;&lt; endl;
    hanoi(n-1, auxiliar, destinatie, sursa);
}</code></pre>',
'[{"question": "Ce este esențial într-o funcție recursivă?", "options": ["Bucla for", "Cazul de bază", "Vectorii", "Fișierele"], "correctAnswer": 1}]'::jsonb, 55),

('info-15', 'Baze de Date și SQL', 'informatica', 'Introducere în bazele de date și limbajul SQL',
'<h2>Baze de Date și SQL</h2>
<h3>Concepte fundamentale</h3>
<ul>
<li><strong>Baza de date:</strong> colecție organizată de date</li>
<li><strong>Tabelul:</strong> structură bidimensională cu linii și coloane</li>
<li><strong>Înregistrarea:</strong> o linie din tabel</li>
<li><strong>Câmpul:</strong> o coloană din tabel</li>
<li><strong>Cheia primară:</strong> identifică unic o înregistrare</li>
</ul>

<h3>Crearea unei tabele</h3>
<pre><code>CREATE TABLE Studenti (
    id INT PRIMARY KEY,
    nume VARCHAR(50) NOT NULL,
    prenume VARCHAR(50),
    varsta INT,
    medie FLOAT
);</code></pre>

<h3>Inserarea datelor</h3>
<pre><code>INSERT INTO Studenti (id, nume, prenume, varsta, medie)
VALUES (1, "Popescu", "Ion", 18, 9.5);

INSERT INTO Studenti VALUES 
(2, "Ionescu", "Ana", 17, 8.7),
(3, "Georgescu", "Mihai", 19, 7.2);</code></pre>

<h3>Interogarea datelor (SELECT)</h3>
<pre><code>-- Selectarea tuturor datelor
SELECT * FROM Studenti;

-- Selectarea anumitor coloane
SELECT nume, prenume, medie FROM Studenti;

-- Selectarea cu condiții
SELECT * FROM Studenti WHERE medie &gt; 8.0;

-- Ordonarea rezultatelor
SELECT * FROM Studenti ORDER BY medie DESC;</code></pre>

<h3>Actualizarea datelor</h3>
<pre><code>UPDATE Studenti 
SET medie = 9.0 
WHERE id = 2;</code></pre>

<h3>Ștergerea datelor</h3>
<pre><code>DELETE FROM Studenti WHERE varsta &lt; 18;</code></pre>

<h3>Funcții de agregare</h3>
<pre><code>-- Numărul de studenți
SELECT COUNT(*) FROM Studenti;

-- Media notelor
SELECT AVG(medie) FROM Studenti;

-- Nota maximă și minimă
SELECT MAX(medie), MIN(medie) FROM Studenti;

-- Gruparea datelor
SELECT varsta, COUNT(*) 
FROM Studenti 
GROUP BY varsta;</code></pre>

<h3>Conectarea la baza de date din C++</h3>
<p>Pentru conectarea la baze de date din C++, se folosesc biblioteci specializate precum MySQL Connector/C++ sau SQLite.</p>',
'[{"question": "Ce comandă SQL se folosește pentru a selecta date din tabele?", "options": ["INSERT", "UPDATE", "SELECT", "DELETE"], "correctAnswer": 2}]'::jsonb, 60);

-- Continuă cu restul materiilor...
-- FIZICĂ, CHIMIE, BIOLOGIE, ISTORIE, GEOGRAFIE vor fi adăugate în următoarea parte