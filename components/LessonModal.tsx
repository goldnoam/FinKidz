import React, { useState } from 'react';
import { X, ArrowLeft, Loader2, Video, Play, AlertCircle } from 'lucide-react';
import { Lesson } from '../types';
import { getIcon } from './Icons';
import { generateLessonVideo } from '../services/geminiService';

interface LessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onComplete: (id: string) => void;
  isCompleted: boolean;
  nextLesson?: Lesson | null;
  onNext?: () => void;
}

const LessonModal: React.FC<LessonModalProps> = ({ 
  lesson, 
  isOpen, 
  isLoading = false,
  onClose, 
  onComplete, 
  isCompleted,
  nextLesson,
  onNext 
}) => {
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("מכין את הסטודיו...");

  // Reset video state when lesson changes
  React.useEffect(() => {
    setVideoUrl(null);
    setVideoError(null);
    setIsGeneratingVideo(false);
  }, [lesson?.id]);

  const handleGenerateVideo = async () => {
    if (!lesson) return;

    // Check for API Key first
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        try {
          await window.aistudio.openSelectKey();
          // We assume success if openSelectKey resolves without throwing
        } catch (e) {
          console.error("User cancelled key selection or error", e);
          return;
        }
      }
    }

    setIsGeneratingVideo(true);
    setVideoError(null);
    
    // Cycle messages to keep user entertained
    const messages = [
      "כותב תסריט...",
      "מצלם סצנות...",
      "עורך את הסרטון...",
      "מוסיף אפקטים מיוחדים...",
      "כמעט מוכן!"
    ];
    let msgIdx = 0;
    setLoadingMessage(messages[0]);
    
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % messages.length;
      setLoadingMessage(messages[msgIdx]);
    }, 4000);

    try {
      const url = await generateLessonVideo(lesson.title, lesson.description);
      if (url) {
        setVideoUrl(url);
      } else {
        setVideoError("לא הצלחנו לייצר את הסרטון הפעם.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found")) {
         setVideoError("הייתה בעיה עם מפתח ה-API. נסה שוב.");
      } else {
         setVideoError("אירעה שגיאה ביצירת הסרטון. ייתכן שאין הרשאות מתאימות.");
      }
    } finally {
      clearInterval(msgInterval);
      setIsGeneratingVideo(false);
    }
  };

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
        <div className="p-6 overflow-y-auto flex-1 text-slate-300 leading-relaxed text-lg relative min-h-[300px]">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-slate-900/50 z-10">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <div className="space-y-3 w-3/4 max-w-md">
                 <div className="h-4 bg-slate-800 rounded animate-pulse w-full"></div>
                 <div className="h-4 bg-slate-800 rounded animate-pulse w-5/6"></div>
                 <div className="h-4 bg-slate-800 rounded animate-pulse w-full"></div>
                 <div className="h-4 bg-slate-800 rounded animate-pulse w-4/6"></div>
              </div>
              <span className="text-sm text-slate-500 font-medium">טוען שיעור...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Video Generator Section */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 overflow-hidden">
                {!videoUrl && !isGeneratingVideo ? (
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-600 p-2 rounded-full">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-sm">
                        <p className="text-white font-bold">רוצה סרטון הסבר?</p>
                        <p className="text-slate-400 text-xs">ייצר סרטון AI קצר שמסביר את הנושא (Veo)</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleGenerateVideo}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      צור סרטון
                    </button>
                  </div>
                ) : isGeneratingVideo ? (
                  <div className="flex flex-col items-center justify-center py-4 space-y-3">
                    <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                    <p className="text-indigo-200 text-sm animate-pulse font-medium">{loadingMessage}</p>
                    <p className="text-slate-500 text-xs">זה עשוי לקחת כדקה...</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                      <Video className="w-4 h-4 text-indigo-400" />
                      סרטון הסבר (AI Generated)
                    </h3>
                    <video 
                      src={videoUrl || undefined} 
                      controls 
                      autoPlay 
                      className="w-full rounded-lg shadow-lg border border-slate-700 bg-black aspect-video"
                    />
                  </div>
                )}
                
                {videoError && (
                  <div className="mt-3 text-red-400 text-xs flex items-center gap-2 bg-red-900/20 p-2 rounded border border-red-900/30">
                    <AlertCircle className="w-4 h-4" />
                    {videoError}
                    <button onClick={handleGenerateVideo} className="underline hover:text-red-300">נסה שוב</button>
                  </div>
                )}
                
                {!videoUrl && !isGeneratingVideo && (
                   <div className="mt-2 text-[10px] text-slate-500 text-center">
                     * השימוש ב-Veo מחייב חיבור לחשבון Google ומפתח API בתשלום
                   </div>
                )}
              </div>

              {/* Text Content */}
              <div 
                className="prose prose-lg prose-invert max-w-none text-right [&>h3]:text-blue-400 [&>strong]:text-white animate-in fade-in slide-in-from-bottom-2 duration-500" 
                dangerouslySetInnerHTML={{ __html: lesson.content }} 
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500 font-medium">
             {!isLoading && !isCompleted && "קראת הכל? סמן כהושלם וקבל נקודות!"}
             {!isLoading && isCompleted && nextLesson && "כל הכבוד! מוכן לאתגר הבא?"}
             {!isLoading && isCompleted && !nextLesson && "סיימת את כל השיעורים! מדהים!"}
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {isCompleted && nextLesson && !isLoading && (
              <button
                onClick={onNext}
                className="flex-1 md:flex-none px-5 py-2 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>השיעור הבא</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>
            )}

            <button
              disabled={isLoading}
              onClick={() => {
                if (!isCompleted) {
                  onComplete(lesson.id);
                  // Note: We intentionally do NOT close the modal here anymore, 
                  // so the user can see the "Next Lesson" button appear.
                } else {
                  onClose();
                }
              }}
              className={`flex-1 md:flex-none px-6 py-2 rounded-xl font-bold transition-all transform active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
                isCompleted 
                  ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/30'
              }`}
            >
              {isLoading ? 'טוען...' : (isCompleted ? 'הושלם! 🎉' : 'סיימתי ללמוד ✓')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;