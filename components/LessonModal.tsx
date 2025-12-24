
import React, { useMemo, useState, useEffect } from 'react';
import { X, WifiOff, ArrowLeft, Sparkles, Volume2, VolumeX } from 'lucide-react';
import type { Lesson, Language } from '../types';
import { getIcon } from './Icons';
import { LESSONS, UI_TRANSLATIONS } from '../constants';

interface LessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (id: string) => void;
  onSelectNext?: (lesson: Lesson) => void;
  isCompleted: boolean;
  isOnline?: boolean;
  language?: Language;
}

const LessonModal: React.FC<LessonModalProps> = ({ 
  lesson, 
  isOpen, 
  onClose, 
  onComplete, 
  onSelectNext,
  isCompleted, 
  isOnline = true,
  language = 'he'
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = (key: string) => UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS['he']?.[key] || key;

  const nextLesson = useMemo(() => {
    if (!lesson) return null;
    const currentIndex = LESSONS.findIndex((l: Lesson) => l.id === lesson.id);
    
    const sameCategoryLessons = LESSONS.filter((l: Lesson) => l.category === lesson.category);
    const indexInCat = sameCategoryLessons.findIndex((l: Lesson) => l.id === lesson.id);
    if (indexInCat !== -1 && indexInCat < sameCategoryLessons.length - 1) {
      return sameCategoryLessons[indexInCat + 1];
    }
    
    if (currentIndex !== -1 && currentIndex < LESSONS.length - 1) {
      return LESSONS[currentIndex + 1];
    }
    
    return null;
  }, [lesson]);

  const activeContent = useMemo(() => {
    if (!lesson) return null;
    if (language === 'he' || !lesson.translations?.[language]) {
      return { title: lesson.title, content: lesson.content };
    }
    return lesson.translations[language];
  }, [lesson, language]);

  const toggleSpeech = () => {
    if (!activeContent) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = activeContent.content;
      const plainText = `${activeContent.title}. ${tempDiv.textContent || tempDiv.innerText}`;
      
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.lang = language === 'he' ? 'he-IL' : 
                       language === 'en' ? 'en-US' : 
                       language === 'fr' ? 'fr-FR' : 
                       language === 'de' ? 'de-DE' : 
                       language === 'es' ? 'es-ES' : 
                       language === 'zh' ? 'zh-CN' : 'hi-IN';
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!isOpen || !lesson || !activeContent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-l from-blue-700 to-indigo-800 p-6 text-white flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              {getIcon(lesson.iconName, "w-8 h-8 text-white")}
            </div>
            <div className={language === 'he' ? 'text-right' : 'text-left'}>
              <div className={`flex items-center gap-2 ${language === 'he' ? 'justify-end' : 'justify-start'}`}>
                {!isOnline && (
                  <div className="bg-red-500/20 px-2 py-0.5 rounded text-xs font-bold text-red-200 flex items-center gap-1 border border-red-500/30" title="Offline">
                    <WifiOff className="w-3 h-3" />
                    <span>offline</span>
                  </div>
                )}
                <h2 className="text-2xl font-bold">{activeContent.title}</h2>
              </div>
              <span className="text-blue-100 text-sm bg-blue-900/50 px-2 py-1 rounded-full border border-blue-400/30 inline-block mt-1">
                {lesson.difficulty}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={toggleSpeech}
              title={isSpeaking ? "Stop" : "Speak"}
              className={`p-2 rounded-full transition-all ${isSpeaking ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-300 leading-relaxed text-lg">
          <div 
            className={`prose prose-lg prose-invert max-w-none [&>h3]:text-blue-400 [&>strong]:text-white ${language === 'he' ? 'text-right' : 'text-left'}`} 
            dangerouslySetInnerHTML={{ __html: activeContent.content }} 
          />
        </div>

        {/* Footer */}
        <div className={`p-6 border-t border-slate-800 bg-slate-900/50 flex items-center gap-4 justify-between ${language === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-3 w-full ${language === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
            {!isCompleted ? (
              <button
                onClick={() => onComplete(lesson.id)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95 flex items-center gap-2"
              >
                {t('finishLesson')}
              </button>
            ) : (
              <div className={`flex items-center gap-4 w-full justify-between ${language === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="text-green-400 font-bold flex items-center gap-1.5 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                  {t('completed')} 🎉
                </span>
                
                {nextLesson && onSelectNext && (
                  <button
                    onClick={() => onSelectNext(nextLesson)}
                    className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-black hover:bg-blue-50 shadow-xl shadow-white/5 transition-all transform active:scale-95 flex items-center gap-2 animate-in slide-in-from-right-4"
                  >
                    {language !== 'he' && <ArrowLeft className="w-5 h-5 rotate-180" />}
                    <span>{t('nextLesson')} {nextLesson.translations?.[language]?.title || nextLesson.title}</span>
                    {language === 'he' && <ArrowLeft className="w-5 h-5" />}
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
