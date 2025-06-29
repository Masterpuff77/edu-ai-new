import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ProgressSection from '../components/dashboard/ProgressSection';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import ChallengesList from '../components/dashboard/ChallengesList';
import NotificationsList from '../components/dashboard/NotificationsList';
import LearningAssistant from '../components/dashboard/LearningAssistant';
import WeeklyLeaderboard from '../components/dashboard/WeeklyLeaderboard';
import KnowledgeTestingBox from '../components/dashboard/KnowledgeTestingBox';
import TavusAvatarCard from '../components/dashboard/TavusAvatarCard';
import useAuthStore from '../store/authStore';
import useStudyPlanStore from '../store/studyPlanStore';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { studyPlan, lessons, fetchStudyPlan, fetchLessons } = useStudyPlanStore();
  const [nextLesson, setNextLesson] = useState<{ id: string; title: string } | null>(null);
  const [recommendation, setRecommendation] = useState<string>('');

  // ULTIMATE scroll prevention - block ALL automatic scrolling
  useEffect(() => {
    // Store original scroll position
    const originalScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Force immediate scroll to top
    const forceScrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Also handle any scrollable containers
      const scrollableElements = document.querySelectorAll('*');
      scrollableElements.forEach(el => {
        if (el instanceof HTMLElement && (
          el.scrollTop > 0 || 
          getComputedStyle(el).overflowY === 'scroll' ||
          getComputedStyle(el).overflowY === 'auto'
        )) {
          el.scrollTop = 0;
        }
      });
    };

    // Immediate scroll
    forceScrollTop();
    
    // Create a more aggressive scroll prevention
    let scrollBlocked = true;
    
    const preventAnyScroll = (e: Event) => {
      if (scrollBlocked) {
        e.preventDefault();
        e.stopImmediatePropagation();
        forceScrollTop();
        return false;
      }
    };

    // Block all scroll-related events
    const scrollEvents = ['scroll', 'wheel', 'touchmove', 'keydown'];
    scrollEvents.forEach(eventType => {
      window.addEventListener(eventType, preventAnyScroll, { 
        passive: false, 
        capture: true 
      });
      document.addEventListener(eventType, preventAnyScroll, { 
        passive: false, 
        capture: true 
      });
    });

    // Override any programmatic scroll attempts
    const originalScrollTo = window.scrollTo;
    const originalScrollBy = window.scrollBy;
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    
    window.scrollTo = function(...args: any[]) {
      if (scrollBlocked) return;
      return originalScrollTo.apply(this, args);
    };
    
    window.scrollBy = function(...args: any[]) {
      if (scrollBlocked) return;
      return originalScrollBy.apply(this, args);
    };
    
    Element.prototype.scrollIntoView = function(...args: any[]) {
      if (scrollBlocked) return;
      return originalScrollIntoView.apply(this, args);
    };

    // Monitor DOM changes and prevent scroll
    const observer = new MutationObserver(() => {
      if (scrollBlocked) {
        forceScrollTop();
      }
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Use RAF to continuously monitor and prevent scroll
    let rafId: number;
    const monitorScroll = () => {
      if (scrollBlocked && (window.pageYOffset > 0 || document.documentElement.scrollTop > 0)) {
        forceScrollTop();
      }
      rafId = requestAnimationFrame(monitorScroll);
    };
    rafId = requestAnimationFrame(monitorScroll);

    // Allow user scrolling after a delay
    const unblockTimeout = setTimeout(() => {
      scrollBlocked = false;
      
      // Restore original functions
      window.scrollTo = originalScrollTo;
      window.scrollBy = originalScrollBy;
      Element.prototype.scrollIntoView = originalScrollIntoView;
      
      // Remove event listeners
      scrollEvents.forEach(eventType => {
        window.removeEventListener(eventType, preventAnyScroll, { capture: true } as any);
        document.removeEventListener(eventType, preventAnyScroll, { capture: true } as any);
      });
      
      cancelAnimationFrame(rafId);
    }, 2000); // Block for 2 seconds

    return () => {
      scrollBlocked = false;
      clearTimeout(unblockTimeout);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      
      // Restore original functions
      window.scrollTo = originalScrollTo;
      window.scrollBy = originalScrollBy;
      Element.prototype.scrollIntoView = originalScrollIntoView;
      
      // Remove event listeners
      scrollEvents.forEach(eventType => {
        window.removeEventListener(eventType, preventAnyScroll, { capture: true } as any);
        document.removeEventListener(eventType, preventAnyScroll, { capture: true } as any);
      });
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetchStudyPlan(user.id);
    }
  }, [user, fetchStudyPlan]);

  useEffect(() => {
    if (studyPlan) {
      fetchLessons();
      
      if (studyPlan.recommendations.length > 0) {
        setRecommendation(studyPlan.recommendations[0]);
      }
    }
  }, [studyPlan, fetchLessons]);

  useEffect(() => {
    if (lessons.length > 0 && studyPlan) {
      const today = new Date().getDay() || 7;
      const todayLesson = studyPlan.schedule.find(day => day.day === today);
      
      if (todayLesson) {
        const lesson = lessons.find(l => l.id === todayLesson.lessonId);
        if (lesson) {
          setNextLesson({ id: lesson.id, title: lesson.title });
          return;
        }
      }
      
      if (lessons[0]) {
        setNextLesson({ id: lessons[0].id, title: lessons[0].title });
      }
    }
  }, [lessons, studyPlan]);

  const defaultRecommendation = "Îți recomandăm să continui cu lecțiile de matematică pentru a-ți îmbunătăți cunoștințele.";
  const defaultLessonTitle = "Introducere în algebră";

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen pb-8 pt-16"> {/* Added pt-16 to account for fixed navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Salut, {user?.name || 'Elev'}!
            </h1>
            <p className="text-gray-600">
              Nivel: {user?.level || 1} - Continuă să înveți pentru a avansa!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <ProgressSection />
              
              <RecommendationCard 
                recommendation={recommendation || defaultRecommendation}
                nextLessonId={nextLesson?.id || "1"}
                nextLessonTitle={nextLesson?.title || defaultLessonTitle}
              />
              
              <KnowledgeTestingBox />
              
              <ChallengesList />
            </div>
            
            <div className="lg:col-span-4 space-y-6">
              <LearningAssistant />
              <TavusAvatarCard />
              <WeeklyLeaderboard />
              <NotificationsList />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;