import React from 'react';
import { X } from 'lucide-react';
import { Lesson } from '../types';
import { getIcon } from './Icons';

interface LessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (id: string) => void;
  isCompleted: boolean;
}

const LessonModal: React.FC<LessonModalProps> = ({ lesson, isOpen, onClose, onComplete, isCompleted }) => {
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
            <div>
              <h2 className="text-2xl font-bold">{lesson.title}</h2>
              <span className="text-blue-100 text-sm bg-blue-900/50 px-2 py-1 rounded-full border border-blue-400/30">
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
          {/* We use a custom class for prose invert to make it look good in dark mode */}
          <div className="prose prose-lg prose-invert max-w-none text-right [&>h3]:text-blue-400 [&>strong]:text-white" dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div className="text-sm text-slate-500">
             קראת הכל? סמן כהושלם וקבל נקודות!
          </div>
          <button
            onClick={() => {
              onComplete(lesson.id);
              onClose();
            }}
            disabled={isCompleted}
            className={`px-6 py-2 rounded-xl font-bold transition-all transform active:scale-95 ${
              isCompleted 
                ? 'bg-green-900/30 text-green-400 border border-green-500/30 cursor-default' 
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/30'
            }`}
          >
            {isCompleted ? 'הושלם! 🎉' : 'סיימתי ללמוד ✓'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;