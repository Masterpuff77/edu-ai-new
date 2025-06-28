import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import useGamificationStore from '../../store/gamificationStore';
import { LessonQuiz } from '../../types';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface LessonQuizModalProps {
  lessonTitle: string;
  quizData: LessonQuiz[];
  onClose: () => void;
  onTestCompleted: (score: number) => void;
}

const LessonQuizModal: React.FC<LessonQuizModalProps> = ({ 
  lessonTitle, 
  quizData, 
  onClose, 
  onTestCompleted 
}) => {
  const { user } = useAuthStore();
  const { addExperience } = useGamificationStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(3).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Generează 3 întrebări din quizData
    const generateQuestions = () => {
      if (quizData.length === 0) return [];
      
      // Ia primele 3 întrebări sau repetă dacă sunt mai puține
      const selectedQuestions: Question[] = [];
      for (let i = 0; i < 3; i++) {
        const quizIndex = i % quizData.length;
        const quiz = quizData[quizIndex];
        selectedQuestions.push({
          id: `${i + 1}`,
          question: quiz.question,
          options: quiz.options,
          correctAnswer: quiz.correctAnswer
        });
      }
      return selectedQuestions;
    };

    setQuestions(generateQuestions());
    setAnswers(Array(3).fill(-1));
  }, [quizData]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (submitted) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    // Calculează scorul și finalizează
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setSubmitted(true);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = async () => {
    if (saving) return;
    
    try {
      setSaving(true);
      
      // Acordă XP: 50 XP per răspuns corect
      const xpReward = score * 50;
      if (xpReward > 0) {
        await addExperience(xpReward);
      }
      
      onTestCompleted(score);
    } catch (error) {
      console.error('Error in completion:', error);
    } finally {
      setSaving(false);
      onClose();
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers(Array(3).fill(-1));
    setSubmitted(false);
    setScore(0);
  };

  const handleClose = () => {
    if (!submitted && answers.some(answer => answer !== -1)) {
      const confirmClose = window.confirm('Ești sigur că vrei să închizi testul? Progresul va fi pierdut.');
      if (!confirmClose) {
        return;
      }
    }
    onClose();
  };

  if (questions.length === 0) {
    return null;
  }

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
                  Quiz {lessonTitle}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {!submitted ? (
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
                    disabled={answers[currentQuestion] === -1 || saving}
                    className="px-6 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {saving ? 'Se salvează...' : (currentQuestion < questions.length - 1 ? 'Următoarea' : 'Finalizează')}
                  </button>
                </div>
              </>
            ) : (
              // Results screen - exact ca la testele pe materii
              <div className="text-center py-8">
                <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6 ${
                  score >= 3 ? 'bg-green-100' : score >= 2 ? 'bg-yellow-100' : score >= 1 ? 'bg-orange-100' : 'bg-red-100'
                }`}>
                  {score >= 2 ? (
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  ) : (
                    <XCircle className="h-10 w-10 text-red-600" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Quiz completat!
                </h3>
                
                <p className="text-lg text-gray-600 mb-6">
                  Ai răspuns corect la {score} din {questions.length} întrebări
                </p>

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
                    className="px-6 py-3 text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors flex items-center"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Încearcă din nou
                  </button>
                  
                  <button
                    onClick={handleComplete}
                    disabled={saving}
                    className="px-8 py-3 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Se salvează...' : 'Continuă'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LessonQuizModal;