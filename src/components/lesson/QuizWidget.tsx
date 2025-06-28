import React, { useState } from 'react';
import { LessonQuiz } from '../../types';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';
import MathRenderer from '../common/MathRenderer';
import useGamificationStore from '../../store/gamificationStore';

interface QuizWidgetProps {
  quizData: LessonQuiz[];
  onComplete: (score: number) => void;
}

const QuizWidget: React.FC<QuizWidgetProps> = ({ quizData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quizData.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { addExperience } = useGamificationStore();

  const handleAnswerSelect = (answerIndex: number) => {
    if (submitted || showFeedback) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (submitted || showFeedback || selectedAnswers[currentQuestion] === -1) return;
    
    const currentQuiz = quizData[currentQuestion];
    const selectedAnswer = selectedAnswers[currentQuestion];
    const correct = selectedAnswer === currentQuiz.correctAnswer;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Award XP for correct answer
    if (correct) {
      try {
        await addExperience(50);
      } catch (error) {
        console.error('Error awarding XP:', error);
      }
    }
    
    // Auto-advance after showing feedback
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        // Move to next question
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
      } else {
        // Quiz completed - calculate final score
        let finalScore = 0;
        for (let i = 0; i < quizData.length; i++) {
          if (selectedAnswers[i] === quizData[i].correctAnswer) {
            finalScore++;
          }
        }
        // Add current answer to final score if correct
        if (correct) {
          finalScore = Math.max(finalScore, score + 1);
        }
        
        setScore(finalScore);
        setSubmitted(true);
        setShowFeedback(false);
        onComplete(finalScore);
      }
    }, 2000); // Show feedback for 2 seconds
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(quizData.length).fill(-1));
    setSubmitted(false);
    setScore(0);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  // Function to render text with math expressions
  const renderTextWithMath = (text: string) => {
    // Split text by math expressions (both inline and display)
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|\\[\[\(][\s\S]*?\\[\]\)])/);
    
    return parts.map((part, index) => {
      // Check if this part is a math expression
      if (part.match(/^\$\$[\s\S]*\$\$$/) || part.match(/^\\[\[\(][\s\S]*\\[\]\)]$/)) {
        // Display math
        return <MathRenderer key={index} inline={false}>{part}</MathRenderer>;
      } else if (part.match(/^\$[\s\S]*\$$/)) {
        // Inline math
        return <MathRenderer key={index} inline={true}>{part}</MathRenderer>;
      } else {
        // Regular text
        return <span key={index}>{part}</span>;
      }
    });
  };

  const currentQuiz = quizData[currentQuestion];
  const hasSelected = selectedAnswers[currentQuestion] !== -1;

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="text-center py-8">
          <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6 ${
            score === quizData.length ? 'bg-green-100' : score >= Math.ceil(quizData.length / 2) ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            {score === quizData.length ? (
              <Trophy className="h-10 w-10 text-yellow-600" />
            ) : score >= Math.ceil(quizData.length / 2) ? (
              <CheckCircle className="h-10 w-10 text-yellow-600" />
            ) : (
              <XCircle className="h-10 w-10 text-red-600" />
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz completat!
          </h3>
          
          <p className="text-lg text-gray-600 mb-4">
            Ai răspuns corect la {score} din {quizData.length} întrebări
          </p>

          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            score === quizData.length 
              ? 'bg-green-100 text-green-800' 
              : score >= Math.ceil(quizData.length / 2) 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            {score === quizData.length ? 'Excelent!' : score >= Math.ceil(quizData.length / 2) ? 'Bine!' : 'Mai încearcă!'}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRetry}
              className="px-6 py-2 text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors"
            >
              Încearcă din nou
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz rapid</h3>

      {quizData.length > 1 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Întrebarea {currentQuestion + 1} din {quizData.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h4 className="text-base font-medium text-gray-800 mb-4">
          {renderTextWithMath(currentQuiz.question)}
        </h4>
        
        <div className="space-y-3">
          {currentQuiz.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index;
            const isCorrectAnswer = index === currentQuiz.correctAnswer;
            
            let buttonClass = 'flex items-center p-3 rounded-md border cursor-pointer transition-all duration-200';
            
            if (showFeedback) {
              if (isSelected && isCorrectAnswer) {
                buttonClass += ' bg-green-50 border-green-500';
              } else if (isSelected && !isCorrectAnswer) {
                buttonClass += ' bg-red-50 border-red-500';
              } else if (isCorrectAnswer) {
                buttonClass += ' bg-green-50 border-green-300';
              } else {
                buttonClass += ' border-gray-300 opacity-60';
              }
            } else {
              if (isSelected) {
                buttonClass += ' bg-indigo-50 border-indigo-500';
              } else {
                buttonClass += ' border-gray-300 hover:bg-gray-50';
              }
            }
            
            return (
              <div 
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
              >
                <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                  showFeedback
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
                  {showFeedback && (isCorrectAnswer || (isSelected && isCorrectAnswer)) && (
                    <CheckCircle className="h-3 w-3 text-white" />
                  )}
                  {showFeedback && isSelected && !isCorrectAnswer && (
                    <XCircle className="h-3 w-3 text-white" />
                  )}
                  {!showFeedback && isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className={`ml-3 text-sm ${
                  showFeedback
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

      {/* Feedback Message */}
      {showFeedback && (
        <div className={`mb-4 p-3 rounded-md ${
          isCorrect 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 mr-2" />
            )}
            <span className={`text-sm font-medium ${
              isCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {isCorrect 
                ? '🎉 Corect! +50 XP' 
                : `Greșit. Răspunsul corect era: ${currentQuiz.options[currentQuiz.correctAnswer]}`
              }
            </span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      {!showFeedback && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!hasSelected}
            className="px-6 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Trimite răspuns
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizWidget;