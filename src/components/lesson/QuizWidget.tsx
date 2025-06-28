import React, { useState } from 'react';
import { LessonQuiz } from '../../types';
import { Play, Trophy, CheckCircle } from 'lucide-react';
import LessonQuizModal from './LessonQuizModal';

interface QuizWidgetProps {
  quizData: LessonQuiz[];
  onComplete: (score: number) => void;
  lessonTitle?: string;
}

const QuizWidget: React.FC<QuizWidgetProps> = ({ quizData, onComplete, lessonTitle = "Lecția curentă" }) => {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [lastScore, setLastScore] = useState<number | null>(null);

  const handleStartQuiz = () => {
    setShowQuizModal(true);
  };

  const handleQuizComplete = (score: number) => {
    setLastScore(score);
    setCompleted(true);
    setShowQuizModal(false);
    onComplete(score);
  };

  const handleRetakeQuiz = () => {
    setCompleted(false);
    setLastScore(null);
    setShowQuizModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg mr-3">
              <Trophy className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Quiz rapid</h3>
              <p className="text-sm text-gray-600">Testează-ți cunoștințele din această lecție</p>
            </div>
          </div>
          
          {completed && lastScore !== null && (
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                lastScore >= 2 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
              }`}>
                <CheckCircle className="h-4 w-4 mr-1" />
                {lastScore}/3 corecte
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <Play className="h-6 w-6 text-indigo-600" />
              </div>
              
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  {completed ? 'Quiz completat!' : 'Începe quiz-ul'}
                </h4>
                
                <p className="text-sm text-gray-600 mb-2">
                  {completed 
                    ? `Ai obținut ${lastScore}/3 răspunsuri corecte`
                    : '3 întrebări • ~2 minute • 50 XP per răspuns corect'
                  }
                </p>

                {completed && (
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Poți relua quiz-ul pentru a-ți îmbunătăți scorul</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <button
                onClick={completed ? handleRetakeQuiz : handleStartQuiz}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <Play className="h-4 w-4 mr-2" />
                {completed ? 'Încearcă din nou' : 'Începe'}
              </button>
              
              {completed && (
                <div className="text-xs text-gray-500">
                  +{(lastScore || 0) * 50} XP câștigat
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showQuizModal && (
        <LessonQuizModal
          lessonTitle={lessonTitle}
          quizData={quizData}
          onClose={() => setShowQuizModal(false)}
          onTestCompleted={handleQuizComplete}
        />
      )}
    </>
  );
};

export default QuizWidget;