import React, { useEffect, useState } from 'react';
import { Brain, Lock, CheckCircle, BookOpen, Trophy, Zap, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import supabase from '../../config/supabase';
import SubjectQuizModal from './SubjectQuizModal';

interface SubjectTestStatus {
  subject: string;
  completedLessons: number;
  canTakeTest: boolean;
  hasInitialEvaluation: boolean;
}

const KnowledgeTestingBox: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [subjectStatuses, setSubjectStatuses] = useState<SubjectTestStatus[]>([]);
  const [hasCompletedInitialEvaluation, setHasCompletedInitialEvaluation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSubjectStatuses();
      checkInitialEvaluation();
    }
  }, [user]);

  const fetchSubjectStatuses = async () => {
    if (!user?.subjects) return;

    try {
      setLoading(true);
      const statuses: SubjectTestStatus[] = [];

      for (const subject of user.subjects) {
        // Get completed lessons count for this subject
        const { data: evaluations } = await supabase
          .from('evaluations')
          .select('lessonId')
          .eq('userId', user.id)
          .eq('subject', subject);

        // Get unique completed lessons to prevent counting duplicates
        const uniqueCompletedLessons = new Set(evaluations?.map(e => e.lessonId) || []);
        const completedCount = uniqueCompletedLessons.size;

        statuses.push({
          subject,
          completedLessons: completedCount,
          canTakeTest: completedCount >= 5,
          hasInitialEvaluation: false
        });
      }

      setSubjectStatuses(statuses);
    } catch (error) {
      console.error('Error fetching subject statuses:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkInitialEvaluation = async () => {
    if (!user) return;

    try {
      // Check if user has completed initial evaluation
      const { data } = await supabase
        .from('evaluations')
        .select('id')
        .eq('userId', user.id)
        .eq('subject', 'initial_evaluation')
        .maybeSingle();

      setHasCompletedInitialEvaluation(!!data);
    } catch (error) {
      console.error('Error checking initial evaluation:', error);
    }
  };

  const getSubjectConfig = (subject: string) => {
    const configs: { [key: string]: { name: string; color: string; bgColor: string } } = {
      matematica: { name: 'Matematică', color: 'text-blue-600', bgColor: 'bg-blue-100' },
      romana: { name: 'Limba Română', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
      fizica: { name: 'Fizică', color: 'text-purple-600', bgColor: 'bg-purple-100' },
      chimie: { name: 'Chimie', color: 'text-orange-600', bgColor: 'bg-orange-100' },
      biologie: { name: 'Biologie', color: 'text-green-600', bgColor: 'bg-green-100' },
      informatica: { name: 'Informatică', color: 'text-slate-600', bgColor: 'bg-slate-100' },
      geografie: { name: 'Geografie', color: 'text-teal-600', bgColor: 'bg-teal-100' },
      istorie: { name: 'Istorie', color: 'text-amber-600', bgColor: 'bg-amber-100' },
      logica: { name: 'Logică', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
      filosofie: { name: 'Filosofie', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
      economie: { name: 'Economie', color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
      sociologie: { name: 'Sociologie', color: 'text-pink-600', bgColor: 'bg-pink-100' },
      psihologie: { name: 'Psihologie', color: 'text-rose-600', bgColor: 'bg-rose-100' }
    };
    return configs[subject] || { name: subject, color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

  const handleSubjectTest = (subject: string, canTakeTest: boolean) => {
    if (!canTakeTest) {
      alert('Trebuie să parcurgi minimum 5 lecții din această materie înainte să îți testezi cunoștințele.');
      return;
    }
    
    setSelectedSubject(subject);
  };

  const handleInitialEvaluation = async () => {
    if (hasCompletedInitialEvaluation) {
      return;
    }

    try {
      // Mark initial evaluation as completed (mockup)
      await supabase
        .from('evaluations')
        .insert([{
          userId: user?.id,
          subject: 'initial_evaluation',
          score: 1,
          totalQuestions: 1
        }]);

      setHasCompletedInitialEvaluation(true);
      alert('Evaluarea inițială a fost completată! Planul de studiu a fost generat în urma rezultatului evaluării inițiale.');
    } catch (error) {
      console.error('Error completing initial evaluation:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-purple-200 rounded-lg mr-3">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Testează-ți cunoștințele</h3>
              <p className="text-sm text-gray-600">Evaluează progresul la materiile tale</p>
            </div>
          </div>

          {/* Initial Evaluation Section */}
          <div className="mb-6">
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg ${
                hasCompletedInitialEvaluation 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 hover:border-indigo-300'
              }`}
              onClick={handleInitialEvaluation}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    hasCompletedInitialEvaluation ? 'bg-green-100' : 'bg-indigo-100'
                  }`}>
                    {hasCompletedInitialEvaluation ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Zap className="h-5 w-5 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Evaluarea Inițială</h4>
                    <p className="text-sm text-gray-600">
                      {hasCompletedInitialEvaluation 
                        ? 'Planul de studiu a fost generat în urma rezultatului evaluării inițiale.'
                        : 'Generează un plan de studiu personalizat'
                      }
                    </p>
                  </div>
                </div>
                {!hasCompletedInitialEvaluation && (
                  <div className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
                    Începe
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subject Tests Section */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Teste pe materii</h4>
            <div className="space-y-3">
              {subjectStatuses.map((status) => {
                const config = getSubjectConfig(status.subject);
                
                return (
                  <div
                    key={status.subject}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg ${
                      status.canTakeTest
                        ? 'bg-white border-gray-200 hover:border-gray-300'
                        : 'bg-gray-50 border-gray-200 opacity-75'
                    }`}
                    onClick={() => handleSubjectTest(status.subject, status.canTakeTest)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-3 ${
                          status.canTakeTest ? config.bgColor : 'bg-gray-100'
                        }`}>
                          {status.canTakeTest ? (
                            <Play className={`h-5 w-5 ${config.color}`} />
                          ) : (
                            <Lock className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h4 className={`font-medium ${
                            status.canTakeTest ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {config.name}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span>{status.completedLessons}/5 lecții parcurse</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {status.canTakeTest ? (
                          <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Începe testul
                          </div>
                        ) : (
                          <div className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                            Blocat
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            status.canTakeTest ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                          style={{ width: `${Math.min(100, (status.completedLessons / 5) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info message */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <strong>Notă:</strong> Pentru a debloca testul la o materie, trebuie să parcurgi minimum 5 lecții din acea materie. Fiecare test conține 10 întrebări și îți oferă XP în funcție de performanță.
            </p>
          </div>
        </div>
      </div>

      {/* Subject Quiz Modal */}
      {selectedSubject && (
        <SubjectQuizModal
          subject={selectedSubject}
          onClose={() => setSelectedSubject(null)}
        />
      )}
    </>
  );
};

export default KnowledgeTestingBox;