import React, { useRef, useState, useEffect } from 'react';
import { 
  Calculator, 
  BookOpen, 
  Atom, 
  FlaskConical, 
  Dna, 
  Monitor, 
  Globe, 
  Clock, 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SubjectTabsProps {
  subjects: string[];
  activeSubject: string;
  onSubjectChange: (subject: string) => void;
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({ subjects, activeSubject, onSubjectChange }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const getSubjectConfig = (subject: string) => {
    const configs: { [key: string]: { name: string; icon: React.ComponentType<any>; color: string; bgColor: string; hoverColor: string } } = {
      matematica: { 
        name: 'Matematică', 
        icon: Calculator, 
        color: 'text-blue-600', 
        bgColor: 'bg-blue-100', 
        hoverColor: 'hover:bg-blue-50' 
      },
      romana: { 
        name: 'Limba Română', 
        icon: BookOpen, 
        color: 'text-emerald-600', 
        bgColor: 'bg-emerald-100', 
        hoverColor: 'hover:bg-emerald-50' 
      },
      fizica: { 
        name: 'Fizică', 
        icon: Atom, 
        color: 'text-purple-600', 
        bgColor: 'bg-purple-100', 
        hoverColor: 'hover:bg-purple-50' 
      },
      chimie: { 
        name: 'Chimie', 
        icon: FlaskConical, 
        color: 'text-orange-600', 
        bgColor: 'bg-orange-100', 
        hoverColor: 'hover:bg-orange-50' 
      },
      biologie: { 
        name: 'Biologie', 
        icon: Dna, 
        color: 'text-green-600', 
        bgColor: 'bg-green-100', 
        hoverColor: 'hover:bg-green-50' 
      },
      informatica: { 
        name: 'Informatică', 
        icon: Monitor, 
        color: 'text-slate-600', 
        bgColor: 'bg-slate-100', 
        hoverColor: 'hover:bg-slate-50' 
      },
      geografie: { 
        name: 'Geografie', 
        icon: Globe, 
        color: 'text-teal-600', 
        bgColor: 'bg-teal-100', 
        hoverColor: 'hover:bg-teal-50' 
      },
      istorie: { 
        name: 'Istorie', 
        icon: Clock, 
        color: 'text-amber-600', 
        bgColor: 'bg-amber-100', 
        hoverColor: 'hover:bg-amber-50' 
      },
      logica: { 
        name: 'Logică', 
        icon: Brain, 
        color: 'text-indigo-600', 
        bgColor: 'bg-indigo-100', 
        hoverColor: 'hover:bg-indigo-50' 
      },
      filosofie: { 
        name: 'Filosofie', 
        icon: Lightbulb, 
        color: 'text-yellow-600', 
        bgColor: 'bg-yellow-100', 
        hoverColor: 'hover:bg-yellow-50' 
      },
      economie: { 
        name: 'Economie', 
        icon: TrendingUp, 
        color: 'text-cyan-600', 
        bgColor: 'bg-cyan-100', 
        hoverColor: 'hover:bg-cyan-50' 
      },
      sociologie: { 
        name: 'Sociologie', 
        icon: Users, 
        color: 'text-pink-600', 
        bgColor: 'bg-pink-100', 
        hoverColor: 'hover:bg-pink-50' 
      },
      psihologie: { 
        name: 'Psihologie', 
        icon: Heart, 
        color: 'text-rose-600', 
        bgColor: 'bg-rose-100', 
        hoverColor: 'hover:bg-rose-50' 
      }
    };
    return configs[subject] || { 
      name: subject, 
      icon: BookOpen, 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-100', 
      hoverColor: 'hover:bg-gray-50' 
    };
  };

  // Check if scrolling is needed and update arrow visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
    }
  };

  // Initialize and add resize listener
  useEffect(() => {
    checkScrollPosition();
    
    const handleResize = () => {
      checkScrollPosition();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [subjects]);

  // Scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
      
      // Check scroll position after animation
      setTimeout(checkScrollPosition, 300);
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
      
      // Check scroll position after animation
      setTimeout(checkScrollPosition, 300);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      return () => scrollContainer.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  // Scroll to active subject on mount and when active subject changes
  useEffect(() => {
    if (scrollContainerRef.current && activeSubject) {
      const activeElement = scrollContainerRef.current.querySelector(`[data-subject="${activeSubject}"]`);
      if (activeElement) {
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();
        
        // Calculate the scroll position to center the element
        const scrollLeft = elementRect.left - containerRect.left - (containerRect.width / 2) + (elementRect.width / 2);
        
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollLeft + scrollLeft,
          behavior: 'smooth'
        });
        
        setTimeout(checkScrollPosition, 300);
      }
    }
  }, [activeSubject]);

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200 relative">
        {/* Left scroll arrow */}
        {showLeftArrow && (
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white rounded-full shadow-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 transform hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        
        {/* Right scroll arrow */}
        {showRightArrow && (
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white rounded-full shadow-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 transform hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
        
        {/* Gradient fade effect on left side when scrollable */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-[1] pointer-events-none"></div>
        )}
        
        {/* Gradient fade effect on right side when scrollable */}
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-[1] pointer-events-none"></div>
        )}
        
        {/* Scrollable container with padding for arrows */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide pb-4 -mb-px px-0" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <nav className="flex space-x-2 min-w-max pl-0" aria-label="Materii">
            {subjects.map((subject) => {
              const config = getSubjectConfig(subject);
              const IconComponent = config.icon;
              const isActive = activeSubject === subject;
              
              return (
                <button
                  key={subject}
                  data-subject={subject}
                  onClick={() => onSubjectChange(subject)}
                  className={`flex items-center whitespace-nowrap px-4 py-3 border-b-2 font-medium text-sm transition-all duration-200 transform hover:scale-105 ${
                    isActive
                      ? `border-current ${config.color} ${config.bgColor} rounded-t-lg shadow-sm`
                      : `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 ${config.hoverColor} rounded-lg`
                  }`}
                >
                  <div className={`p-1.5 rounded-full mr-2 transition-colors ${
                    isActive ? 'bg-white shadow-sm' : config.bgColor
                  }`}>
                    <IconComponent className={`h-4 w-4 ${
                      isActive ? config.color : 'text-gray-500'
                    }`} />
                  </div>
                  <span className="font-medium">{config.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SubjectTabs;