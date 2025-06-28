import React, { useState } from 'react';
import { LessonQuiz } from '../../types';
import { Play, Trophy } from 'lucide-react';
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
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                lastScore >= 2 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
              }`}>
                {lastScore}/3 corecte
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-indigo-600" />
            </div>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {completed ? 'Quiz completat!' : 'Începe quiz-ul'}
            </h4>
            
            <p className="text-gray-600 mb-6">
              {completed 
                ? `Ai obținut ${lastScore}/3 răspunsuri corecte. Vrei să încerci din nou?`
                : 'Răspunde la 3 întrebări pentru a-ți testa cunoștințele din această lecție.'
              }
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <span className="flex items-center mr-4">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                  3 întrebări
                </span>
                <span className="flex items-center mr-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  50 XP per răspuns corect
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  ~2 minute
                </span>
              </div>

              <button
                onClick={completed ? handleRetakeQuiz : handleStartQuiz}
                className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <Play className="h-4 w-4 mr-2" />
                {completed ? 'Încearcă din nou' : 'Începe quiz-ul'}
              </button>
            </div>
          </div>
        </div>

        {completed && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Sfat:</strong> Poți relua quiz-ul oricând pentru a-ți îmbunătăți scorul și a câștiga mai mult XP!
            </p>
          </div>
        )}
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