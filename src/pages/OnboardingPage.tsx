import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, ArrowLeft, GraduationCap, CheckCircle } from 'lucide-react';
import useAuthStore from '../store/authStore';
import AvatarSelector from '../components/onboarding/AvatarSelector';
import SubjectSelector from '../components/onboarding/SubjectSelector';
import useEvaluationStore from '../store/evaluationStore';

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [examType, setExamType] = useState<'evaluareNationala' | 'bacalaureat' | null>(null);
  const [grade, setGrade] = useState<number | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [personalGoals, setPersonalGoals] = useState('');
  const { user, updateUser } = useAuthStore();
  const { 
    questions, 
    currentQuestion, 
    answers, 
    isCompleted, 
    fetchQuestions, 
    answerQuestion, 
    nextQuestion, 
    submitEvaluation 
  } = useEvaluationStore();
  const navigate = useNavigate();

  // Pre-fill form if user data exists
  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name);
      if (user.avatar) setAvatar(user.avatar);
      if (user.subjects?.length) setSelectedSubjects(user.subjects);
      if (user.personalGoals) setPersonalGoals(user.personalGoals);
      if (user.examType) setExamType(user.examType);
      if (user.grade) setGrade(user.grade);
    }
  }, [user]);

  // Fetch questions for evaluation when subjects are selected and step is 4
  useEffect(() => {
    if (step === 4 && selectedSubjects.length > 0) {
      fetchQuestions(selectedSubjects[0]);
    }
  }, [step, selectedSubjects, fetchQuestions]);

  const handleContinue = async () => {
    // Validation for each step
    if (step === 1 && (!name.trim() || !avatar)) {
      return;
    }
    if (step === 2 && (!examType || !grade)) {
      return;
    }
    if (step === 3 && selectedSubjects.length === 0) {
      return;
    }

    try {
      // Save profile data at step 3
      if (step === 3) {
        await updateUser({
          name,
          avatar,
          examType,
          grade,
          subjects: selectedSubjects
        });
      }
      
      // Submit evaluation at step 4
      if (step === 4 && user && questions.length > 0) {
        await submitEvaluation(user.id, selectedSubjects[0]);
      }
      
      // Save personal goals at step 5 and complete onboarding
      if (step === 5) {
        await updateUser({ personalGoals });
        navigate('/dashboard');
        return;
      }
      
      setStep(prev => prev + 1);
    } catch (error) {
      console.error('Error during onboarding:', error);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleAnswerSelect = (answerIndex: number) => {
    answerQuestion(currentQuestion, answerIndex);
  };

  const getGradeOptions = () => {
    if (examType === 'evaluareNationala') {
      return [5, 6, 7, 8];
    } else if (examType === 'bacalaureat') {
      return [9, 10, 11, 12];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left side - Colorful illustration */}
            <div className="lg:w-1/2 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute top-32 right-16 w-16 h-16 bg-yellow-300/30 rounded-full animate-bounce"></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 bg-pink-300/40 rounded-full animate-pulse"></div>
                <div className="absolute bottom-32 right-12 w-24 h-24 bg-blue-300/30 rounded-full animate-bounce"></div>
              </div>
              
              {/* Main illustration */}
              <div className="relative z-10 h-full flex items-center justify-center p-8">
                <div className="text-center">
                  {/* Happy students illustration using Pexels image */}
                  <div className="mb-8">
                    <img 
                      src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Elevi fericiți"
                      className="w-80 h-80 object-cover rounded-full mx-auto shadow-2xl border-8 border-white/30"
                    />
                  </div>
                  
                  {/* Motivational text */}
                  <div className="text-white">
                    <h2 className="text-3xl font-bold mb-4">
                      Începe călătoria ta de învățare!
                    </h2>
                    <p className="text-lg text-white/90 leading-relaxed">
                      Alătură-te miilor de elevi care își ating obiectivele cu ajutorul AI-ului nostru educațional.
                    </p>
                  </div>
                  
                  {/* Floating achievement badges */}
                  <div className="absolute top-16 left-8 bg-white/20 backdrop-blur-sm rounded-xl p-3 animate-float">
                    <div className="flex items-center text-white">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-300" />
                      <span className="text-sm font-medium">+1000 XP</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-16 right-8 bg-white/20 backdrop-blur-sm rounded-xl p-3 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center text-white">
                      <GraduationCap className="h-5 w-5 mr-2 text-green-300" />
                      <span className="text-sm font-medium">Succes garantat</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mr-4">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {step === 1 && 'Bun venit la EduVibe'}
                      {step === 2 && 'Alege tipul de examen'}
                      {step === 3 && 'Alege materiile de interes'}
                      {step === 4 && 'Evaluare inițială'}
                      {step === 5 && 'Obiective personale'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {step === 1 && 'Hai să începem prin a-ți configura profilul.'}
                      {step === 2 && 'Pentru ce examen te pregătești?'}
                      {step === 3 && 'Selectează materiile care te interesează.'}
                      {step === 4 && 'Un scurt test pentru a identifica nivelul tău.'}
                      {step === 5 && 'Definește obiectivele tale de învățare.'}
                    </p>
                  </div>
                </div>
                
                {/* Step progress indicator */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-3">
                    <span>Pasul {step} din 5</span>
                    <span>{Math.round((step / 5) * 100)}% completat</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-in-out shadow-sm"
                      style={{ width: `${(step / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div>
                  <div className="mb-6">
                    <label htmlFor="name\" className="block text-sm font-medium text-gray-700 mb-2">
                      Cum te numești?
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Nume și prenume"
                    />
                  </div>
                  
                  <AvatarSelector 
                    selectedAvatar={avatar} 
                    onSelect={setAvatar}
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tipul de examen</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={() => setExamType('evaluareNationala')}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          examType === 'evaluareNationala'
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <GraduationCap className="h-6 w-6 text-indigo-600 mr-3" />
                          <div>
                            <h4 className="font-medium text-gray-900">Evaluarea Națională</h4>
                            <p className="text-sm text-gray-500">Pregătire pentru examenul de clasa a 8-a</p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setExamType('bacalaureat')}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          examType === 'bacalaureat'
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <GraduationCap className="h-6 w-6 text-indigo-600 mr-3" />
                          <div>
                            <h4 className="font-medium text-gray-900">Bacalaureat</h4>
                            <p className="text-sm text-gray-500">Pregătire pentru examenul de bacalaureat</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {examType && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">În ce clasă ești?</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {getGradeOptions().map((gradeOption) => (
                          <button
                            key={gradeOption}
                            onClick={() => setGrade(gradeOption)}
                            className={`p-4 rounded-lg border-2 text-center transition-all ${
                              grade === gradeOption
                                ? 'border-indigo-600 bg-indigo-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="text-lg font-medium">
                              {gradeOption}
                            </span>
                            <span className="block text-sm text-gray-500">
                              Clasa a {gradeOption}-a
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {step === 3 && (
                <SubjectSelector
                  selectedSubjects={selectedSubjects}
                  onToggle={handleSubjectToggle}
                  examType={examType}
                  grade={grade}
                />
              )}
              
              {step === 4 && questions.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {isCompleted ? 'Evaluare completă!' : 'Evaluare inițială'}
                  </h3>
                  
                  {!isCompleted ? (
                    <div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                          <span>Întrebarea {currentQuestion + 1} din {questions.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-indigo-600 h-1.5 rounded-full"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-base font-medium text-gray-800 mb-4">
                          {questions[currentQuestion].text}
                        </h4>
                        
                        <div className="space-y-3">
                          {questions[currentQuestion].options.map((option, index) => (
                            <div 
                              key={index}
                              onClick={() => handleAnswerSelect(index)}
                              className={`flex items-center p-3 rounded-md border cursor-pointer ${
                                answers[currentQuestion] === index 
                                  ? 'bg-indigo-50 border-indigo-600' 
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full border ${
                                answers[currentQuestion] === index 
                                  ? 'border-indigo-600 bg-indigo-600' 
                                  : 'border-gray-400'
                              }`}>
                                {answers[currentQuestion] === index && (
                                  <span className="flex items-center justify-center text-white text-xs">
                                    ✓
                                  </span>
                                )}
                              </div>
                              <span className={`ml-3 text-sm ${
                                answers[currentQuestion] === index 
                                  ? 'text-indigo-700 font-medium' 
                                  : 'text-gray-700'
                              }`}>
                                {option}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          onClick={handleBack}
                          disabled={currentQuestion === 0}
                          className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ArrowLeft className="h-4 w-4 inline-block mr-1" /> Înapoi
                        </button>
                        
                        <button
                          onClick={currentQuestion < questions.length - 1 ? nextQuestion : handleContinue}
                          disabled={answers[currentQuestion] === -1}
                          className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {currentQuestion < questions.length - 1 ? 'Următoarea' : 'Finalizare'} <ArrowRight className="h-4 w-4 inline-block ml-1" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 mx-auto flex items-center justify-center bg-green-100 rounded-full mb-4">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h4 className="text-xl font-medium text-gray-900 mb-2">
                        Evaluare finalizată!
                      </h4>
                      <p className="text-gray-600 mb-6">
                        Mulțumim pentru completarea evaluării. Am analizat răspunsurile tale și îți vom genera un plan personalizat.
                      </p>
                      <button
                        onClick={handleContinue}
                        className="px-6 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Continuă <ArrowRight className="h-4 w-4 inline-block ml-1" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {step === 5 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Care sunt obiectivele tale de învățare?
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Împărtășește cu noi ce vrei să realizezi pentru ca AI-ul să poată crea un plan personalizat pentru tine.
                  </p>
                  
                  <div className="mb-6">
                    <textarea
                      value={personalGoals}
                      onChange={(e) => setPersonalGoals(e.target.value)}
                      placeholder="Ex: Să învăț tabla înmulțirii până la finalul lunii"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-36"
                    ></textarea>
                  </div>
                </div>
              )}
            </motion.div>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 text-sm font-medium rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 inline-block mr-1" /> Înapoi
                </button>
              )}
              
              <button
                onClick={handleContinue}
                disabled={(step === 1 && (!name.trim() || !avatar)) || 
                        (step === 2 && (!examType || !grade)) ||
                        (step === 3 && selectedSubjects.length === 0) ||
                        (step === 4 && !isCompleted && answers[currentQuestion] === -1)}
                className="ml-auto px-8 py-3 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
              >
                {step < 5 ? 'Continuă' : 'Finalizare'} <ArrowRight className="h-4 w-4 inline-block ml-1" />
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;