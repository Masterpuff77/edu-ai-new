import React, { useState, useCallback, useEffect } from 'react';
import { LessonQuiz } from '../../types';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import MathRenderer from '../common/MathRenderer';
import useGamificationStore from '../../store/gamificationStore';

interface QuizWidgetProps {
  quizData: LessonQuiz[];
  onComplete: (score: number) => void;
}

// Enum pentru stările quiz-ului
enum QuizState {
  ANSWERING = 'answering',
  SHOWING_FEEDBACK = 'showing_feedback',
  COMPLETED = 'completed'
}

const QuizWidget: React.FC<QuizWidgetProps> = ({ quizData, onComplete }) => {
  // State management complet refăcut
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(quizData.length).fill(null));
  const [quizState, setQuizState] = useState<QuizState>(QuizState.ANSWERING);
  const [finalScore, setFinalScore] = useState(0);
  const [currentQuestionCorrect, setCurrentQuestionCorrect] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { addExperience } = useGamificationStore();

  // Reset quiz când se schimbă datele
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quizData.length).fill(null));
    setQuizState(QuizState.ANSWERING);
    setFinalScore(0);
    setCurrentQuestionCorrect(null);
    setIsProcessing(false);
  }, [quizData]);

  // Funcție pentru renderizarea textului cu matematică
  const renderTextWithMath = useCallback((text: string) => {
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|\\[\[\(][\s\S]*?\\[\]\)])/);
    
    return parts.map((part, index) => {
      if (part.match(/^\$\$[\s\S]*\$\$$/) || part.match(/^\\[\[\(][\s\S]*\\[\]\)]$/)) {
        return <MathRenderer key={index} inline={false}>{part}</MathRenderer>;
      } else if (part.match(/^\$[\s\S]*\$$/)) {
        return <MathRenderer key={index} inline={true}>{part}</MathRenderer>;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  }, []);

  // Selectarea unui răspuns
  const selectAnswer = useCallback((answerIndex: number) => {
    if (quizState !== QuizState.ANSWERING || isProcessing) {
      return;
    }

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  }, [quizState, isProcessing, userAnswers, currentQuestionIndex]);

  // Verificarea răspunsului
  const checkAnswer = useCallback(async () => {
    if (quizState !== QuizState.ANSWERING || isProcessing || userAnswers[currentQuestionIndex] === null) {
      return;
    }

    setIsProcessing(true);

    try {
      const currentQuestion = quizData[currentQuestionIndex];
      const selectedAnswer = userAnswers[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      
      setCurrentQuestionCorrect(isCorrect);
      setQuizState(QuizState.SHOWING_FEEDBACK);

      // Acordă XP pentru răspuns corect
      if (isCorrect) {
        await addExperience(50);
      }
    } catch (error) {
      console.error('Eroare la verificarea răspunsului:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [quizState, isProcessing, userAnswers, currentQuestionIndex, quizData, addExperience]);

  // Trecerea la următoarea întrebare sau finalizarea quiz-ului
  const proceedToNext = useCallback(() => {
    if (quizState !== QuizState.SHOWING_FEEDBACK) {
      return;
    }

    if (currentQuestionIndex < quizData.length - 1) {
      // Următoarea întrebare
      setCurrentQuestionIndex(prev => prev + 1);
      setQuizState(QuizState.ANSWERING);
      setCurrentQuestionCorrect(null);
    } else {
      // Finalizează quiz-ul
      const score = userAnswers.reduce((total, answer, index) => {
        return total + (answer === quizData[index].correctAnswer ? 1 : 0);
      }, 0);
      
      setFinalScore(score);
      setQuizState(QuizState.COMPLETED);
      onComplete(score);
    }
  }, [quizState, currentQuestionIndex, quizData, userAnswers, onComplete]);

  // Reînceperea quiz-ului
  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quizData.length).fill(null));
    setQuizState(QuizState.ANSWERING);
    setFinalScore(0);
    setCurrentQuestionCorrect(null);
    setIsProcessing(false);
  }, [quizData.length]);

  // Navigarea înapoi (doar în modul de răspuns)
  const goToPreviousQuestion = useCallback(() => {
    if (quizState === QuizState.ANSWERING && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [quizState, currentQuestionIndex]);

  const currentQuestion = quizData[currentQuestionIndex];
  const hasSelectedAnswer = userAnswers[currentQuestionIndex] !== null;

  // Render pentru starea completată
  if (quizState === QuizState.COMPLETED) {
    const percentage = Math.round((finalScore / quizData.length) * 100);
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="text-center py-8">
          <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6 ${
            percentage >= 80 ? 'bg-green-100' : 
            percentage >= 60 ? 'bg-yellow-100' : 
            percentage >= 40 ? 'bg-orange-100' : 'bg-red-100'
          }`}>
            {percentage >= 80 ? (
              <Trophy className="h-10 w-10 text-yellow-600" />
            ) : percentage >= 60 ? (
              <CheckCircle className="h-10 w-10 text-yellow-600" />
            ) : (
              <XCircle className="h-10 w-10 text-red-600" />
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz completat!
          </h3>
          
          <p className="text-lg text-gray-600 mb-4">
            Ai răspuns corect la {finalScore} din {quizData.length} întrebări ({percentage}%)
          </p>

          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            percentage >= 80 ? 'bg-green-100 text-green-800' : 
            percentage >= 60 ? 'bg-yellow-100 text-yellow-800' : 
            percentage >= 40 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
          }`}>
            {percentage >= 80 ? 'Excelent!' : 
             percentage >= 60 ? 'Foarte bine!' : 
             percentage >= 40 ? 'Bine!' : 'Mai încearcă!'}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Rezultate detaliate:</h4>
            <div className="space-y-2">
              {quizData.map((question, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Întrebarea {index + 1}</span>
                  <div className="flex items-center">
                    {userAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={userAnswers[index] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                      {userAnswers[index] === question.correctAnswer ? 'Corect' : 'Greșit'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={restartQuiz}
            className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Încearcă din nou
          </button>
        </div>
      </div>
    );
  }

  // Render principal pentru întrebări
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz rapid</h3>

      {/* Progress bar */}
      {quizData.length > 1 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Întrebarea {currentQuestionIndex + 1} din {quizData.length}</span>
            <span>{userAnswers.filter(a => a !== null).length}/{quizData.length} răspunsuri</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Întrebarea curentă */}
      <div className="mb-6">
        <h4 className="text-base font-medium text-gray-800 mb-4">
          {renderTextWithMath(currentQuestion.question)}
        </h4>
        
        {/* Opțiunile de răspuns */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = userAnswers[currentQuestionIndex] === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswer;
            const showResults = quizState === QuizState.SHOWING_FEEDBACK;
            
            let buttonClass = 'flex items-center p-3 rounded-md border-2 transition-all duration-200 select-none';
            
            if (quizState === QuizState.ANSWERING) {
              buttonClass += ' cursor-pointer hover:bg-gray-50';
              if (isSelected) {
                buttonClass += ' bg-indigo-50 border-indigo-500';
              } else {
                buttonClass += ' border-gray-300';
              }
            } else {
              buttonClass += ' cursor-default';
              if (showResults) {
                if (isSelected && isCorrectAnswer) {
                  buttonClass += ' bg-green-50 border-green-500';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += ' bg-red-50 border-red-500';
                } else if (isCorrectAnswer) {
                  buttonClass += ' bg-green-50 border-green-300';
                } else {
                  buttonClass += ' border-gray-300 opacity-60';
                }
              }
            }
            
            return (
              <div 
                key={index}
                onClick={() => selectAnswer(index)}
                className={buttonClass}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center mr-3 ${
                  showResults
                    ? isSelected && isCorrectAnswer
                      ? 'border-green-500 bg-green-500'
                      : isSelected && !isCorrectAnswer
                        ? 'border-red-500 bg-red-500'
                        : isCorrectAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-400'
                    : isSelected
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-gray-400'
                }`}>
                  {showResults && (isCorrectAnswer || (isSelected && isCorrectAnswer)) && (
                    <CheckCircle className="h-3 w-3 text-white" />
                  )}
                  {showResults && isSelected && !isCorrectAnswer && (
                    <XCircle className="h-3 w-3 text-white" />
                  )}
                  {!showResults && isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className={`text-sm ${
                  showResults
                    ? isSelected && isCorrectAnswer
                      ? 'text-green-700 font-medium'
                      : isSelected && !isCorrectAnswer
                        ? 'text-red-700 font-medium'
                        : isCorrectAnswer
                          ? 'text-green-700 font-medium'
                          : 'text-gray-500'
                    : isSelected
                      ? 'text-indigo-700 font-medium'
                      : 'text-gray-700'
                }`}>
                  {renderTextWithMath(option)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback pentru răspuns */}
      {quizState === QuizState.SHOWING_FEEDBACK && (
        <div className={`mb-4 p-4 rounded-lg border-2 ${
          currentQuestionCorrect 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center mb-2">
            {currentQuestionCorrect ? (
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            ) : (
              <XCircle className="h-6 w-6 text-red-600 mr-3" />
            )}
            <span className={`text-base font-semibold ${
              currentQuestionCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {currentQuestionCorrect ? '🎉 Corect!' : 'Greșit!'}
            </span>
          </div>
          
          {currentQuestionCorrect ? (
            <div className="text-sm text-green-700">
              <p className="font-medium">+50 XP câștigați!</p>
              <p>Felicitări pentru răspunsul corect!</p>
            </div>
          ) : (
            <div className="text-sm text-red-700">
              <p className="font-medium">Răspunsul corect era:</p>
              <p className="mt-1 p-2 bg-green-100 text-green-800 rounded border border-green-300">
                {renderTextWithMath(currentQuestion.options[currentQuestion.correctAnswer])}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Butoanele de navigare */}
      <div className="flex justify-between items-center">
        {/* Buton înapoi */}
        {quizData.length > 1 && currentQuestionIndex > 0 && quizState === QuizState.ANSWERING && (
          <button
            onClick={goToPreviousQuestion}
            className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Înapoi
          </button>
        )}

        {/* Buton principal */}
        <div className="ml-auto">
          {quizState === QuizState.ANSWERING ? (
            <button
              onClick={checkAnswer}
              disabled={!hasSelectedAnswer || isProcessing}
              className="px-6 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? 'Se verifică...' : 'Verifică răspunsul'}
            </button>
          ) : (
            <button
              onClick={proceedToNext}
              className="px-6 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              {currentQuestionIndex < quizData.length - 1 ? 'Următoarea întrebare' : 'Vezi rezultatele'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizWidget;