import React, { useMemo } from 'react';
import { X, WifiOff, ArrowLeft, Sparkles } from 'lucide-react';
import { Lesson } from '../types';
import { getIcon } from './Icons';
import { LESSONS } from '../constants';

interface LessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (id: string) => void;
  onSelectNext?: (lesson: Lesson) => void;
  isCompleted: boolean;
  isOnline?: boolean;
}

const LessonModal: React.FC<LessonModalProps> = ({ 
  lesson, 
  isOpen, 
  onClose, 
  onComplete, 
  onSelectNext,
  isCompleted, 
  isOnline = true 
}) => {
  const nextLesson = useMemo(() => {
    if (!lesson) return null;
    const currentIndex = LESSONS.findIndex(l => l.id === lesson.id);
    
    // 1. Try to find the next lesson in the same category
    const sameCategoryLessons = LESSONS.filter(l => l.category === lesson.category);
    const indexInCat = sameCategoryLessons.findIndex(l => l.id === lesson.id);
    if (indexInCat !== -1 && indexInCat < sameCategoryLessons.length - 1) {
      return sameCategoryLessons[indexInCat + 1];
    }
    
    // 2. Otherwise, just the next one in the overall list
    if (currentIndex !== -1 && currentIndex < LESSONS.length - 1) {
      return LESSONS[currentIndex + 1];
    }
    
    return null;
  }, [lesson]);

  if (!isOpen || !lesson) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-l from-blue-700 to-indigo-800 p-6 text-white flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              {getIcon(lesson.iconName, "w-8 h-8 text-white")}
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                {!isOnline && (
                  <div className="bg-red-500/20 px-2 py-0.5 rounded text-xs font-bold text-red-200 flex items-center gap-1 border border-red-500/30" title="מצב לא מקוון">
                    <WifiOff className="w-3 h-3" />
                    <span>offline</span>
                  </div>
                )}
                <h2 className="text-2xl font-bold">{lesson.title}</h2>
              </div>
              <span className="text-blue-100 text-sm bg-blue-900/50 px-2 py-1 rounded-full border border-blue-400/30 inline-block mt-1">
                {lesson.difficulty}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-300 leading-relaxed text-lg">
          <div className="prose prose-lg prose-invert max-w-none text-right [&>h3]:text-blue-400 [&>strong]:text-white" dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex flex-row-reverse justify-between items-center gap-4">
          <div className="flex flex-row-reverse items-center gap-3">
            {!isCompleted ? (
              <button
                onClick={() => onComplete(lesson.id)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95 flex items-center gap-2"
              >
                סיימתי ללמוד ✓
              </button>
            ) : (
              <div className="flex flex-row-reverse items-center gap-4">
                <span className="text-green-400 font-bold flex items-center gap-1.5 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                  הושלם! 🎉
                </span>
                
                {nextLesson && onSelectNext && (
                  <button
                    onClick={() => onSelectNext(nextLesson)}
                    className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-black hover:bg-blue-50 shadow-xl shadow-white/5 transition-all transform active:scale-95 flex items-center gap-2 animate-in slide-in-from-right-4"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    השיעור הבא: {nextLesson.title}
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </button>
                )}
              </div>
            )}
          </div>
          
          <div className="text-sm text-slate-500 text-right hidden sm:block">
             {!isCompleted ? 'קראת הכל? סמן כהושלם וקבל נקודות!' : 'מעולה! אתה בדרך הנכונה.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;