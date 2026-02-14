
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
  completedLessonIds?: string[];
  isOnline?: boolean;
  language?: Language;
}

const AdSlotSmall = () => (
  <div className="my-4 overflow-hidden rounded-lg bg-slate-800/40 border border-slate-700/50 flex items-center justify-center p-2 min-h-[60px] relative">
    <ins className="adsbygoogle"
         style={{ display: 'block', width: '100%' }}
         data-ad-client="ca-pub-0274741291001288"
         data-ad-slot="default"
         data-ad-format="horizontal"
         data-full-width-responsive="true"></ins>
    <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
    <span className="text-slate-600 text-[8px] uppercase font-bold tracking-widest absolute bottom-1 right-2">Ad</span>
  </div>
);

const LessonModal: React.FC<LessonModalProps> = ({ 
  lesson, 
  isOpen, 
  onClose, 
  onComplete, 
  onSelectNext,
  isCompleted, 
  completedLessonIds = [],
  isOnline = true,
  language = 'he'
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = (key: string) => UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS['he']?.[key] || key;

  const nextLesson = useMemo(() => {
    if (!lesson) return null;
    
    // Logic for suggesting the next lesson:
    // 1. Next uncompleted lesson in the same category
    const sameCategoryUncompleted = LESSONS.filter(l => 
      l.category === lesson.category && 
      !completedLessonIds.includes(l.id) &&
      l.id !== lesson.id
    );
    if (sameCategoryUncompleted.length > 0) return sameCategoryUncompleted[0];

    // 2. Next uncompleted lesson overall
    const anyUncompleted = LESSONS.find(l => 
      !completedLessonIds.includes(l.id) && 
      l.id !== lesson.id
    );
    if (anyUncompleted) return anyUncompleted;

    // 3. Fallback to literal next lesson in the array
    const currentIndex = LESSONS.findIndex((l: Lesson) => l.id === lesson.id);
    if (currentIndex !== -1 && currentIndex < LESSONS.length - 1) {
      return LESSONS[currentIndex + 1];
    }
    
    return null;
  }, [lesson, completedLessonIds]);

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

  const isRtl = language === 'he';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-l from-blue-700 to-indigo-800 p-6 text-white flex justify-between items-start">
          <div className={`flex items-center gap-4 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              {getIcon(lesson.iconName, "w-8 h-8 text-white")}
            </div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <div className={`flex items-center gap-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
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
            className={`prose prose-lg prose-invert max-w-none [&>h3]:text-blue-400 [&>strong]:text-white ${isRtl ? 'text-right' : 'text-left'}`} 
            dangerouslySetInnerHTML={{ __html: activeContent.content }} 
          />
          
          <AdSlotSmall />
        </div>

        {/* Footer */}
        <div className={`p-6 border-t border-slate-800 bg-slate-900/50 flex items-center gap-4 justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center gap-3 w-full ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            {!isCompleted ? (
              <button
                onClick={() => onComplete(lesson.id)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95 flex items-center gap-2"
              >
                {t('finishLesson')}
              </button>
            ) : (
              <div className={`flex items-center gap-4 w-full justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="text-green-400 font-bold flex items-center gap-1.5 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                  {t('completed')} 🎉
                </span>
                
                {nextLesson && onSelectNext && (
                  <button
                    onClick={() => onSelectNext(nextLesson)}
                    className="group bg-white text-indigo-900 px-6 py-3 rounded-xl font-black hover:bg-blue-50 shadow-xl shadow-white/5 transition-all transform active:scale-95 flex items-center gap-2 animate-in slide-in-from-bottom-4"
                  >
                    {!isRtl && <ArrowLeft className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />}
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">{t('nextLesson')}</span>
                        <span className="text-sm md:text-base">{nextLesson.translations?.[language]?.title || nextLesson.title}</span>
                    </div>
                    {isRtl && <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />}
                    <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
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
