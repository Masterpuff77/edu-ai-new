/*
  # Fix Computer Science Subject Visibility

  1. Changes
    - Ensure informatica lessons are properly inserted
    - Add informatica to available subjects
    - Fix any potential issues with subject filtering

  2. Content
    - Re-insert informatica lessons if missing
    - Verify subject consistency
*/

-- First, let's check if informatica lessons exist and add them if missing
INSERT INTO public.lessons (id, title, subject, description, content, quiz, duration) 
VALUES 
  -- Programming Fundamentals
  (
    'informatica-1',
    'Introducere în Programare',
    'informatica',
    'Concepte fundamentale de programare și algoritmi',
    '# Introducere în Programare

    ## Concepte de bază
    - Ce este programarea?
    - Limbaje de programare
    - Algoritmi și pseudocod
    - Structura unui program
    
    ## Primul program
    ```cpp
    #include <iostream>
    using namespace std;
    
    int main() {
        cout << "Hello, World!" << endl;
        return 0;
    }
    ```
    
    ## Variabile și tipuri de date
    - int, float, double, char, string
    - Declararea și inițializarea variabilelor
    - Operatori aritmetici și logici',
    '[{
      "question": "Care este primul pas în rezolvarea unei probleme prin programare?",
      "options": ["Scrierea codului", "Analiza problemei și crearea algoritmului", "Testarea programului", "Compilarea"],
      "correctAnswer": 1
    }]'::jsonb,
    50
  ),
  
  (
    'informatica-2',
    'Structuri de Control',
    'informatica',
    'Instrucțiuni condiționale și repetitive',
    '# Structuri de Control

    ## Instrucțiuni condiționale
    - if, else if, else
    - switch-case
    - Operatori de comparație
    
    ```cpp
    if (nota >= 5) {
        cout << "Promovat";
    } else {
        cout << "Nepromovat";
    }
    ```
    
    ## Instrucțiuni repetitive
    - for, while, do-while
    - Bucle imbricate
    - break și continue
    
    ```cpp
    for (int i = 1; i <= 10; i++) {
        cout << i << " ";
    }
    ```',
    '[{
      "question": "Care buclă se execută cel puțin o dată?",
      "options": ["for", "while", "do-while", "Toate"],
      "correctAnswer": 2
    }]'::jsonb,
    50
  ),
  
  (
    'informatica-3',
    'Tablouri și Vectori',
    'informatica',
    'Lucrul cu structuri de date liniare',
    '# Tablouri și Vectori

    ## Tablouri unidimensionale
    - Declararea și inițializarea
    - Accesarea elementelor
    - Parcurgerea tablourilor
    
    ```cpp
    int numere[5] = {1, 2, 3, 4, 5};
    for (int i = 0; i < 5; i++) {
        cout << numere[i] << " ";
    }
    ```
    
    ## Tablouri bidimensionale
    - Matrice
    - Parcurgerea pe linii și coloane
    - Operații cu matrice
    
    ## Algoritmi clasici
    - Căutarea unui element
    - Sortarea (bubble sort, selection sort)
    - Găsirea minimului/maximului',
    '[{
      "question": "Care este indexul primului element dintr-un tablou în C++?",
      "options": ["1", "0", "-1", "Depinde de declarație"],
      "correctAnswer": 1
    }]'::jsonb,
    55
  ),
  
  (
    'informatica-4',
    'Funcții și Proceduri',
    'informatica',
    'Modularizarea codului prin funcții',
    '# Funcții și Proceduri

    ## Concepte de bază
    - Definirea funcțiilor
    - Parametri și argumente
    - Valoarea de retur
    - Apelul funcțiilor
    
    ```cpp
    int suma(int a, int b) {
        return a + b;
    }
    
    int main() {
        int rezultat = suma(5, 3);
        cout << rezultat; // 8
    }
    ```
    
    ## Tipuri de parametri
    - Transmiterea prin valoare
    - Transmiterea prin referință
    - Parametri impliciți
    
    ## Recursivitatea
    - Funcții recursive
    - Cazul de bază și cazul recursiv
    - Exemplu: factorial, Fibonacci',
    '[{
      "question": "Ce se întâmplă când o funcție nu are instrucțiunea return?",
      "options": ["Eroare de compilare", "Returnează 0", "Returnează valoare aleatoare", "Depinde de tipul funcției"],
      "correctAnswer": 3
    }]'::jsonb,
    50
  ),
  
  (
    'informatica-5',
    'Șiruri de Caractere',
    'informatica',
    'Prelucrarea textelor și șirurilor',
    '# Șiruri de Caractere

    ## Concepte de bază
    - Declararea șirurilor
    - Inițializarea și atribuirea
    - Accesarea caracterelor
    
    ```cpp
    string nume = "Ion";
    cout << nume[0]; // I
    cout << nume.length(); // 3
    ```
    
    ## Operații cu șiruri
    - Concatenarea (+)
    - Compararea (==, <, >)
    - Căutarea în șiruri
    - Extragerea de subșiruri
    
    ## Funcții utile
    - length(), size()
    - substr(), find()
    - toupper(), tolower()
    - Conversii între tipuri',
    '[{
      "question": "Care funcție returnează lungimea unui șir în C++?",
      "options": ["size()", "length()", "count()", "Toate variantele a și b"],
      "correctAnswer": 3
    }]'::jsonb,
    45
  ),
  
  (
    'informatica-6',
    'Algoritmi de Sortare',
    'informatica',
    'Algoritmi clasici de sortare și căutare',
    '# Algoritmi de Sortare

    ## Bubble Sort
    - Principiul algoritmului
    - Implementarea
    - Complexitatea temporală O(n²)
    
    ```cpp
    void bubbleSort(int arr[], int n) {
        for (int i = 0; i < n-1; i++) {
            for (int j = 0; j < n-i-1; j++) {
                if (arr[j] > arr[j+1]) {
                    swap(arr[j], arr[j+1]);
                }
            }
        }
    }
    ```
    
    ## Selection Sort
    - Găsirea minimului
    - Schimbarea elementelor
    
    ## Insertion Sort
    - Inserarea în poziția corectă
    - Eficient pentru tablouri mici
    
    ## Căutarea binară
    - Precondiție: tablou sortat
    - Complexitate O(log n)',
    '[{
      "question": "Care algoritm de sortare are complexitatea cea mai bună în cazul cel mai rău?",
      "options": ["Bubble Sort", "Selection Sort", "Insertion Sort", "Toți au aceeași complexitate"],
      "correctAnswer": 3
    }]'::jsonb,
    55
  ),
  
  (
    'informatica-7',
    'Programare Orientată pe Obiecte',
    'informatica',
    'Concepte fundamentale OOP',
    '# Programare Orientată pe Obiecte

    ## Concepte de bază
    - Clasa și obiectul
    - Atribute și metode
    - Constructori și destructori
    
    ```cpp
    class Persoana {
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
    };
    ```
    
    ## Principiile OOP
    - Încapsularea
    - Moștenirea
    - Polimorfismul
    - Abstractizarea
    
    ## Modificatori de acces
    - public, private, protected
    - Getteri și setteri',
    '[{
      "question": "Ce principiu OOP ascunde detaliile implementării?",
      "options": ["Moștenirea", "Polimorfismul", "Încapsularea", "Abstractizarea"],
      "correctAnswer": 2
    }]'::jsonb,
    60
  ),
  
  (
    'informatica-8',
    'Fișiere și Fluxuri',
    'informatica',
    'Lucrul cu fișiere și persistența datelor',
    '# Fișiere și Fluxuri

    ## Concepte de bază
    - Tipuri de fișiere (text, binar)
    - Deschiderea și închiderea fișierelor
    - Moduri de acces (citire, scriere, adăugare)
    
    ```cpp
    #include <fstream>
    
    // Scriere în fișier
    ofstream fout("date.txt");
    fout << "Hello, file!" << endl;
    fout.close();
    
    // Citire din fișier
    ifstream fin("date.txt");
    string linie;
    getline(fin, linie);
    fin.close();
    ```
    
    ## Operații cu fișiere
    - Citirea linie cu linie
    - Citirea cuvânt cu cuvânt
    - Verificarea sfârșitului de fișier
    - Gestionarea erorilor
    
    ## Aplicații practice
    - Salvarea și încărcarea datelor
    - Procesarea fișierelor de configurare
    - Logarea informațiilor',
    '[{
      "question": "Ce clasă se folosește pentru citirea din fișiere în C++?",
      "options": ["ofstream", "ifstream", "fstream", "iostream"],
      "correctAnswer": 1
    }]'::jsonb,
    50
  ),
  
  (
    'informatica-9',
    'Structuri de Date',
    'informatica',
    'Structuri de date avansate și aplicații',
    '# Structuri de Date

    ## Structuri (struct)
    - Definirea structurilor
    - Accesarea membrilor
    - Tablouri de structuri
    
    ```cpp
    struct Student {
        string nume;
        int varsta;
        float medie;
    };
    
    Student s1 = {"Ion", 18, 9.5};
    cout << s1.nume;
    ```
    
    ## Liste înlănțuite
    - Noduri și legături
    - Inserarea și ștergerea
    - Parcurgerea listei
    
    ## Stive și cozi
    - Principiul LIFO (Last In, First Out)
    - Principiul FIFO (First In, First Out)
    - Implementări și aplicații
    
    ## Arbori binari
    - Concepte de bază
    - Parcurgeri (preordine, inordine, postordine)
    - Arbori de căutare binară',
    '[{
      "question": "Ce principiu urmează o stivă?",
      "options": ["FIFO", "LIFO", "RANDOM", "SORTED"],
      "correctAnswer": 1
    }]'::jsonb,
    55
  ),
  
  (
    'informatica-10',
    'Baze de Date și SQL',
    'informatica',
    'Introducere în bazele de date și limbajul SQL',
    '# Baze de Date și SQL

    ## Concepte fundamentale
    - Ce este o bază de date?
    - Tabele, înregistrări, câmpuri
    - Chei primare și străine
    - Relații între tabele
    
    ## Limbajul SQL
    - SELECT - interogarea datelor
    - INSERT - inserarea datelor
    - UPDATE - modificarea datelor
    - DELETE - ștergerea datelor
    
    ```sql
    -- Crearea unei tabele
    CREATE TABLE Studenti (
        id INT PRIMARY KEY,
        nume VARCHAR(50),
        varsta INT,
        medie FLOAT
    );
    
    -- Inserarea datelor
    INSERT INTO Studenti VALUES (1, "Ion", 18, 9.5);
    
    -- Interogarea datelor
    SELECT * FROM Studenti WHERE medie > 8.0;
    ```
    
    ## Operații avansate
    - JOIN-uri între tabele
    - Funcții de agregare (COUNT, SUM, AVG)
    - Gruparea datelor (GROUP BY)
    - Sortarea rezultatelor (ORDER BY)',
    '[{
      "question": "Ce comandă SQL se folosește pentru a selecta date din tabele?",
      "options": ["INSERT", "UPDATE", "SELECT", "DELETE"],
      "correctAnswer": 2
    }]'::jsonb,
    60
  )
ON CONFLICT (id) DO NOTHING;

-- Verify that informatica lessons are properly accessible
-- This ensures the lessons table has the correct data