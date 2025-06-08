import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import useGamificationStore from '../../store/gamificationStore';
import supabase from '../../config/supabase';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface SubjectQuizModalProps {
  subject: string;
  onClose: () => void;
  onTestCompleted: (subject: string, score: number) => void;
}

const SubjectQuizModal: React.FC<SubjectQuizModalProps> = ({ subject, onClose, onTestCompleted }) => {
  const { user } = useAuthStore();
  const { addExperience } = useGamificationStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isCompleted, setIsCompleted] = useState(false); // Nou state pentru a controla afișarea

  useEffect(() => {
    generateQuestions();
  }, [subject]);

  const generateQuestions = () => {
    const questionSets: Record<string, Question[]> = {
      matematica: [
        {
          id: '1',
          question: 'Care este rezultatul calculului: 2³ + 3² ?',
          options: ['17', '15', '13', '19'],
          correctAnswer: 0
        },
        {
          id: '2',
          question: 'Dacă x + 5 = 12, care este valoarea lui x?',
          options: ['7', '6', '8', '5'],
          correctAnswer: 0
        },
        {
          id: '3',
          question: 'Care este aria unui dreptunghi cu lungimea 8 cm și lățimea 5 cm?',
          options: ['40 cm²', '26 cm²', '13 cm²', '35 cm²'],
          correctAnswer: 0
        },
        {
          id: '4',
          question: 'Care este perimetrul unui pătrat cu latura de 6 cm?',
          options: ['24 cm', '36 cm', '12 cm', '18 cm'],
          correctAnswer: 0
        },
        {
          id: '5',
          question: 'Care este soluția inecuației 3x - 6 > 0?',
          options: ['x > 2', 'x < 2', 'x > -2', 'x < -2'],
          correctAnswer: 0
        },
        {
          id: '6',
          question: 'Care este rezultatul: √16 + √25?',
          options: ['9', '7', '8', '10'],
          correctAnswer: 0
        },
        {
          id: '7',
          question: 'Dacă un triunghi are unghiurile de 60°, 60° și 60°, ce fel de triunghi este?',
          options: ['Echilateral', 'Isoscel', 'Dreptunghic', 'Obtuzunghic'],
          correctAnswer: 0
        },
        {
          id: '8',
          question: 'Care este formula pentru aria unui triunghi?',
          options: ['(b × h) / 2', 'b × h', '2 × b × h', 'b + h'],
          correctAnswer: 0
        },
        {
          id: '9',
          question: 'Care este rezultatul: (x + 3)² pentru x = 2?',
          options: ['25', '16', '9', '36'],
          correctAnswer: 0
        },
        {
          id: '10',
          question: 'Dacă 2x + 4 = 3x - 1, care este valoarea lui x?',
          options: ['5', '3', '4', '6'],
          correctAnswer: 0
        }
      ],
      romana: [
        {
          id: '1',
          question: 'Care dintre următoarele este o figură de stil?',
          options: ['Metafora', 'Subiectul', 'Predicatul', 'Complementul'],
          correctAnswer: 0
        },
        {
          id: '2',
          question: 'Ce parte de vorbire este cuvântul "frumos" în propoziția "Copilul este frumos"?',
          options: ['Adjectiv', 'Substantiv', 'Verb', 'Adverb'],
          correctAnswer: 0
        },
        {
          id: '3',
          question: 'Care este genul literar al basmului?',
          options: ['Epic', 'Liric', 'Dramatic', 'Didactic'],
          correctAnswer: 0
        },
        {
          id: '4',
          question: 'Ce figură de stil este în expresia "ochii mării"?',
          options: ['Metaforă', 'Personificare', 'Comparație', 'Epitet'],
          correctAnswer: 0
        },
        {
          id: '5',
          question: 'Care dintre următoarele este o parte principală de propoziție?',
          options: ['Predicatul', 'Atributul', 'Complementul', 'Apoziția'],
          correctAnswer: 0
        },
        {
          id: '6',
          question: 'Ce mod de expunere predomină în descrierea unui peisaj?',
          options: ['Descrierea', 'Narațiunea', 'Dialogul', 'Monologul'],
          correctAnswer: 0
        },
        {
          id: '7',
          question: 'Care dintre următoarele este o parte de vorbire flexibilă?',
          options: ['Substantivul', 'Adverbul', 'Prepoziția', 'Conjuncția'],
          correctAnswer: 0
        },
        {
          id: '8',
          question: 'Ce element nu aparține textului narativ?',
          options: ['Rima', 'Acțiunea', 'Personajele', 'Timpul'],
          correctAnswer: 0
        },
        {
          id: '9',
          question: 'Care este primul element al unui text argumentativ?',
          options: ['Ipoteza/Teza', 'Argumentele', 'Exemplele', 'Concluzia'],
          correctAnswer: 0
        },
        {
          id: '10',
          question: 'Ce tip de caracterizare este prezentă în descrierea acțiunilor unui personaj?',
          options: ['Indirectă', 'Directă', 'Fizică', 'Mixtă'],
          correctAnswer: 0
        }
      ],
      fizica: [
        {
          id: '1',
          question: 'Care este unitatea de măsură pentru forță în SI?',
          options: ['Newton (N)', 'Joule (J)', 'Watt (W)', 'Pascal (Pa)'],
          correctAnswer: 0
        },
        {
          id: '2',
          question: 'Care este viteza luminii în vid?',
          options: ['300.000.000 m/s', '150.000.000 m/s', '450.000.000 m/s', '200.000.000 m/s'],
          correctAnswer: 0
        },
        {
          id: '3',
          question: 'Ce este accelerația gravitațională pe Pământ?',
          options: ['9,8 m/s²', '10 m/s²', '8,9 m/s²', '11 m/s²'],
          correctAnswer: 0
        },
        {
          id: '4',
          question: 'Care este prima lege a lui Newton?',
          options: ['Principiul inerției', 'F = ma', 'Acțiune = Reacțiune', 'Conservarea energiei'],
          correctAnswer: 0
        },
        {
          id: '5',
          question: 'Ce este energia cinetică?',
          options: ['Energia datorată mișcării', 'Energia datorată poziției', 'Energia termică', 'Energia electrică'],
          correctAnswer: 0
        },
        {
          id: '6',
          question: 'Care este unitatea de măsură pentru putere?',
          options: ['Watt (W)', 'Joule (J)', 'Newton (N)', 'Volt (V)'],
          correctAnswer: 0
        },
        {
          id: '7',
          question: 'Ce este frecvența unei unde?',
          options: ['Numărul de oscilații pe secundă', 'Distanța între două creste', 'Viteza undei', 'Amplitudinea undei'],
          correctAnswer: 0
        },
        {
          id: '8',
          question: 'Care este legea reflexiei luminii?',
          options: ['Unghiul de incidență = Unghiul de reflexie', 'Lumina se propagă în linie dreaptă', 'Viteza luminii este constantă', 'Lumina are natură duală'],
          correctAnswer: 0
        },
        {
          id: '9',
          question: 'Ce este presiunea?',
          options: ['Forța pe unitatea de suprafață', 'Forța totală', 'Energia pe unitatea de volum', 'Lucrul mecanic'],
          correctAnswer: 0
        },
        {
          id: '10',
          question: 'Care este unitatea de măsură pentru sarcina electrică?',
          options: ['Coulomb (C)', 'Amper (A)', 'Volt (V)', 'Ohm (Ω)'],
          correctAnswer: 0
        }
      ],
      chimie: [
        {
          id: '1',
          question: 'Care sunt particulele subatomice principale?',
          options: ['Protoni, neutroni, electroni', 'Protoni și electroni', 'Neutroni și electroni', 'Doar protoni'],
          correctAnswer: 0
        },
        {
          id: '2',
          question: 'Ce este o legătură ionică?',
          options: ['Transfer de electroni', 'Punere în comun de electroni', 'Electroni liberi', 'Atracție magnetică'],
          correctAnswer: 0
        },
        {
          id: '3',
          question: 'Care este pH-ul unei soluții neutre?',
          options: ['7', '0', '14', '1'],
          correctAnswer: 0
        },
        {
          id: '4',
          question: 'Ce este oxidarea?',
          options: ['Pierdere de electroni', 'Câștig de electroni', 'Pierdere de protoni', 'Câștig de protoni'],
          correctAnswer: 0
        },
        {
          id: '5',
          question: 'Care este simbolul chimic pentru aurul?',
          options: ['Au', 'Ag', 'Al', 'Ar'],
          correctAnswer: 0
        },
        {
          id: '6',
          question: 'Ce sunt hidrocarburile?',
          options: ['Compuși formați din carbon și hidrogen', 'Compuși cu oxigen', 'Compuși cu azot', 'Compuși cu sulf'],
          correctAnswer: 0
        },
        {
          id: '7',
          question: 'Care este numărul atomic al carbonului?',
          options: ['6', '12', '14', '8'],
          correctAnswer: 0
        },
        {
          id: '8',
          question: 'Ce este un catalizator?',
          options: ['O substanță care mărește viteza reacției', 'Un reactant', 'Un produs', 'Un inhibitor'],
          correctAnswer: 0
        },
        {
          id: '9',
          question: 'Care este formula chimică a apei?',
          options: ['H₂O', 'CO₂', 'NaCl', 'CH₄'],
          correctAnswer: 0
        },
        {
          id: '10',
          question: 'Ce este electroliza?',
          options: ['Descompunerea unei substanțe prin curent electric', 'Formarea unei substanțe', 'Oxidarea unei substanțe', 'Reducerea unei substanțe'],
          correctAnswer: 0
        }
      ],
      biologie: [
        {
          id: '1',
          question: 'Care este rolul mitocondriilor?',
          options: ['Producerea de energie', 'Sinteza proteinelor', 'Digestia celulară', 'Depozitarea apei'],
          correctAnswer: 0
        },
        {
          id: '2',
          question: 'Ce este o genă?',
          options: ['O secvență de ADN care codifică o proteină', 'O proteină', 'Un cromozom', 'O celulă'],
          correctAnswer: 0
        },
        {
          id: '3',
          question: 'Care este rolul sistemului circulator?',
          options: ['Transportul substanțelor în organism', 'Digestia alimentelor', 'Respirația', 'Excreția'],
          correctAnswer: 0
        },
        {
          id: '4',
          question: 'Ce este respirația celulară?',
          options: ['Producerea de energie din glucoză', 'Schimbul de gaze', 'Transportul oxigenului', 'Ventilația pulmonară'],
          correctAnswer: 0
        },
        {
          id: '5',
          question: 'Ce este un ecosistem?',
          options: ['Comunitatea de organisme și mediul lor', 'O specie', 'O populație', 'Un habitat'],
          correctAnswer: 0
        },
        {
          id: '6',
          question: 'Ce este selecția naturală?',
          options: ['Supraviețuirea celor mai adaptați', 'Modificări genetice intenționate', 'Reproducerea asexuată', 'Mutații'],
          correctAnswer: 0
        },
        {
          id: '7',
          question: 'Ce sunt bacteriile?',
          options: ['Organisme unicelulare procariote', 'Organisme multicelulare', 'Virusuri', 'Fungi'],
          correctAnswer: 0
        },
        {
          id: '8',
          question: 'Ce este fotosinteza?',
          options: ['Producerea de glucoză folosind energia solară', 'Respirația celulară', 'Transpirația', 'Nutriția minerală'],
          correctAnswer: 0
        },
        {
          id: '9',
          question: 'Care este rolul sistemului digestiv?',
          options: ['Transformarea alimentelor în nutrienți', 'Transportul substanțelor', 'Eliminarea deșeurilor', 'Respirația'],
          correctAnswer: 0
        },
        {
          id: '10',
          question: 'Ce este ingineria genetică?',
          options: ['Modificarea ADN-ului', 'Clonarea organismelor', 'Producerea de anticorpi', 'Cultivarea țesuturilor'],
          correctAnswer: 0
        }
      ]
    };

    setQuestions(questionSets[subject] || []);
  };

  const getSubjectName = (subject: string) => {
    const names: Record<string, string> = {
      matematica: 'Matematică',
      romana: 'Limba Română',
      fizica: 'Fizică',
      chimie: 'Chimie',
      biologie: 'Biologie',
      informatica: 'Informatică',
      geografie: 'Geografie',
      istorie: 'Istorie'
    };
    return names[subject] || subject;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResults) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and show results
      let correctAnswers = 0;
      questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setShowResults(true);
      setIsCompleted(true); // Marchează testul ca fiind completat
      
      // Save test result to database
      try {
        await supabase
          .from('subject_test_results')
          .insert([{
            userId: user?.id,
            subject: subject,
            score: correctAnswers,
            totalQuestions: questions.length,
            completedAt: new Date().toISOString()
          }]);
      } catch (error) {
        console.error('Error saving test result:', error);
      }
      
      // Award XP based on performance
      const xpReward = correctAnswers * 50; // 50 XP per correct answer
      if (xpReward > 0) {
        addExperience(xpReward);
      }

      // Notify parent component
      onTestCompleted(subject, correctAnswers);
      
      // IMPORTANT: Nu închide modalul automat!
      // Modalul va rămâne pe ecran pentru a afișa rezultatele
      // Se va închide doar când utilizatorul apasă "Închide" sau "X"
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers(Array(10).fill(-1));
    setShowResults(false);
    setScore(0);
    setIsCompleted(false);
  };

  const getProgressColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return { message: 'Excelent!', color: 'text-green-600', emoji: '🎉' };
    if (percentage >= 60) return { message: 'Bine!', color: 'text-yellow-600', emoji: '👍' };
    if (percentage >= 40) return { message: 'Satisfăcător', color: 'text-orange-600', emoji: '📚' };
    return { message: 'Trebuie să mai exersezi', color: 'text-red-600', emoji: '💪' };
  };

  // Handle close - doar închidere manuală, niciodată automată
  const handleClose = () => {
    if (!showResults && answers.some(answer => answer !== -1)) {
      const confirmClose = window.confirm('Ești sigur că vrei să închizi testul? Progresul va fi pierdut.');
      if (!confirmClose) return;
    }
    onClose();
  };

  if (questions.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <Trophy className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Test {getSubjectName(subject)}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {!showResults ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Întrebarea {currentQuestion + 1} din {questions.length}</span>
                    <span>{answers.filter(a => a !== -1).length}/{questions.length} răspunsuri</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {questions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          answers[currentQuestion] === index
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            answers[currentQuestion] === index
                              ? 'border-indigo-500 bg-indigo-500'
                              : 'border-gray-300'
                          }`}>
                            {answers[currentQuestion] === index && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className={`${
                            answers[currentQuestion] === index
                              ? 'text-indigo-700 font-medium'
                              : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Înapoi
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={answers[currentQuestion] === -1}
                    className="px-6 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {currentQuestion < questions.length - 1 ? 'Următoarea' : 'Finalizează'}
                  </button>
                </div>
              </>
            ) : (
              // Ecranul de rezultate - identic cu cel de la provocări
              <div className="text-center py-8">
                <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6 ${
                  score >= 8 ? 'bg-green-100' : score >= 6 ? 'bg-yellow-100' : score >= 4 ? 'bg-orange-100' : 'bg-red-100'
                }`}>
                  <Trophy className={`h-10 w-10 ${
                    score >= 8 ? 'text-green-600' : score >= 6 ? 'text-yellow-600' : score >= 4 ? 'text-orange-600' : 'text-red-600'
                  }`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Test completat!
                </h3>
                
                <div className="mb-6">
                  <div className={`text-3xl font-bold mb-2 ${getScoreMessage(score, questions.length).color}`}>
                    {getScoreMessage(score, questions.length).emoji} {getScoreMessage(score, questions.length).message}
                  </div>
                  <p className="text-lg text-gray-600">
                    Ai răspuns corect la {score} din {questions.length} întrebări
                  </p>
                </div>

                {/* Progress Bar with Color Coding */}
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div 
                      className={`h-4 rounded-full transition-all duration-500 ${getProgressColor(score, questions.length)}`}
                      style={{ width: `${(score / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Scor: {Math.round((score / questions.length) * 100)}%
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Rezultate detaliate:</h4>
                  <div className="space-y-2">
                    {questions.map((question, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Întrebarea {index + 1}</span>
                        <div className="flex items-center">
                          {answers[index] === question.correctAnswer ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={answers[index] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                            {answers[index] === question.correctAnswer ? 'Corect' : 'Greșit'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleRetry}
                    className="px-6 py-3 text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors flex items-center"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Încearcă din nou
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    Închide
                  </button>
                </div>

                {/* XP Reward Message */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>+{score * 50} XP</strong> câștigați pentru performanța ta!
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SubjectQuizModal;