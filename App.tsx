import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Trophy, Home, Mail, Flame, Award, WifiOff, Globe, Loader2, Share2, Check, ArrowRight, Sparkles, X, PiggyBank, Gamepad2, Coins, Search } from 'lucide-react';
import LessonModal from './components/LessonModal';
import FinancialGame from './components/FinancialGame';
import { LESSONS, CATEGORIES, BADGES, EXTERNAL_LINKS } from './constants';
import { Lesson, UserStats, Category } from './types';
import { getIcon } from './components/Icons';
import { playSound } from './utils/sounds';

const EASTER_EGG_FACTS = [
  "הידעת? המטבעות הראשונים הומצאו בממלכת לידיה (טורקיה של היום) לפני כ-2,600 שנה!",
  "הידעת? שטרות כסף עשויים בכלל מכותנה ופשתן, לא מנייר רגיל, כדי שישרדו כביסה בטעות.",
  "הידעת? המילה 'בנק' מגיעה מהמילה האיטלקית 'banco', שפירושה ספסל או שולחן שעליו היו סופרים כסף בשווקים.",
  "הידעת? הריבית דריבית כונתה על ידי אלברט איינשטיין 'הפלא השמיני של העולם'.",
  "הידעת? בעבר השתמשו בצדפות, מלח, תה ואפילו בשיני לוויתן בתור כסף!",
  "הידעת? מונופול מדפיס יותר כסף כל שנה מאשר ארה״ב מדפיסה דולרים אמיתיים.",
  "הידעת? כרטיס האשראי הראשון הומצא כשאיש עסקים שכח את הארנק שלו במסעדה והחליט שזה לא יקרה שוב."
];

function App() {
  // State
  const [currentView, setCurrentView] = useState<'home' | 'lessons' | 'game'>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loadingLessonId, setLoadingLessonId] = useState<string | null>(null);
  const [copiedLessonId, setCopiedLessonId] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({ 
    points: 0, 
    completedLessons: [],
    currentStreak: 1,
    lastLoginDate: new Date().toISOString(),
    badges: []
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Easter Egg State
  const [logoClicks, setLogoClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [randomFact, setRandomFact] = useState('');
  const logoClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Network status listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load stats from local storage on mount and calculate streak
  useEffect(() => {
    const saved = localStorage.getItem('finkidz_stats');
    if (saved) {
      const parsedStats: UserStats = JSON.parse(saved);
      const lastLogin = new Date(parsedStats.lastLoginDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      let newStreak = parsedStats.currentStreak;
      if (today.getDate() !== lastLogin.getDate()) {
        if (diffDays <= 2) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      }

      const currentStatsWithStreak = { ...parsedStats, currentStreak: newStreak, lastLoginDate: today.toISOString() };
      const newBadges = checkForNewBadges(currentStatsWithStreak);

      setUserStats({
        ...currentStatsWithStreak,
        badges: Array.from(new Set([...parsedStats.badges, ...newBadges]))
      });
    } else {
      setUserStats(prev => ({ ...prev, lastLoginDate: new Date().toISOString() }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('finkidz_stats', JSON.stringify(userStats));
  }, [userStats]);

  const checkForNewBadges = (currentStats: UserStats): string[] => {
    const earnedNow: string[] = [];
    BADGES.forEach(badge => {
      if (!currentStats.badges.includes(badge.id) && badge.condition(currentStats)) {
        earnedNow.push(badge.id);
        playSound('success');
      }
    });
    return earnedNow;
  };

  const handleLessonComplete = (id: string) => {
    if (!userStats.completedLessons.includes(id)) {
      playSound('success');
      setUserStats(prev => {
        const newStats = {
          ...prev,
          points: prev.points + 100,
          completedLessons: [...prev.completedLessons, id]
        };
        const newBadges = checkForNewBadges(newStats);
        return {
          ...newStats,
          badges: Array.from(new Set([...prev.badges, ...newBadges]))
        };
      });
    }
  };

  const handleNavClick = (view: 'home' | 'lessons' | 'game') => {
    if (currentView !== view) {
      playSound('click');
      setCurrentView(view);
    }
  };

  const handleOpenLesson = (lesson: Lesson) => {
    if (loadingLessonId === lesson.id) return;
    playSound('click');
    setLoadingLessonId(lesson.id);
    setTimeout(() => {
      setSelectedLesson(lesson);
      setLoadingLessonId(null);
    }, 800);
  };

  const handleShare = async (e: React.MouseEvent, lesson: Lesson) => {
    e.stopPropagation();
    playSound('click');
    const shareData = {
      title: lesson.title,
      text: `למדתי על ${lesson.title} ב-FinKidz! בואו ללמוד חינוך פיננסי:`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setCopiedLessonId(lesson.id);
        setTimeout(() => setCopiedLessonId(null), 2000);
      } catch (err) {
        console.error('Failed to copy');
      }
    }
  };

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const newCount = prev + 1;
      if (logoClickTimeoutRef.current) clearTimeout(logoClickTimeoutRef.current);
      logoClickTimeoutRef.current = setTimeout(() => setLogoClicks(0), 800);
      if (newCount === 5) {
        setShowEasterEgg(true);
        setRandomFact(EASTER_EGG_FACTS[Math.floor(Math.random() * EASTER_EGG_FACTS.length)]);
        playSound('success');
        return 0;
      }
      return newCount;
    });
  };

  const filteredLessons = LESSONS.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getHighestRank = () => {
    if (userStats.badges.includes('rank_expert')) return { text: 'מומחה פיננסי', icon: 'star', color: 'text-purple-200', desc: 'דרגת מומחה - השלמת שיעורי מומחים' };
    if (userStats.badges.includes('rank_advanced')) return { text: 'משקיע מתקדם', icon: 'crown', color: 'text-blue-200', desc: 'דרגת מתקדם - השלמת שיעורי מתקדמים' };
    if (userStats.badges.includes('rank_beginner')) return { text: 'חוסך מתחיל', icon: 'medal', color: 'text-green-200', desc: 'דרגת מתחיל - השלמת שיעורי מתחילים' };
    return { text: 'טירון פיננסי', icon: 'learn', color: 'text-slate-200', desc: 'התחל ללמוד כדי להתקדם בדרגות!' };
  };

  const currentRank = getHighestRank();

  const renderHome = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden ring-1 ring-white/10 group">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
             <div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">היי אלוף הפיננסים! 👋</h1>
                <p className="text-lg md:text-xl font-medium opacity-90 max-w-xl text-purple-50">העולם הפיננסי מחכה לך. בוא נשבור שיאים חדשים היום!</p>
                <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg hover:bg-white/30 transition-colors cursor-help" title={currentRank.desc}>
                  {getIcon(currentRank.icon, `w-5 h-5 ${currentRank.color} drop-shadow`, currentRank.desc)}
                  <span className="font-bold text-sm md:text-base text-white">{currentRank.text}</span>
                </div>
             </div>
             <div className="hidden md:block">
               <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 flex flex-col items-center shadow-lg">
                 <div className="flex items-center gap-2 text-yellow-300 mb-1">
                   <Flame className="w-6 h-6 fill-yellow-300" />
                   <span className="font-bold text-2xl">{userStats.currentStreak}</span>
                 </div>
                 <span className="text-xs font-medium uppercase tracking-wider text-purple-100">ימי רצף</span>
               </div>
             </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <button onClick={() => handleNavClick('lessons')} className="bg-white text-purple-700 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-50 transition-all transform hover:scale-105 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              המשך ללמוד
            </button>
            <button onClick={() => handleNavClick('game')} className="bg-indigo-900/40 backdrop-blur border border-white/20 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-900/60 transition-all transform hover:scale-105 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              שחק עכשיו
            </button>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400 mix-blend-overlay opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500 mix-blend-overlay opacity-30 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
          <div className="p-4 bg-yellow-500/20 text-yellow-400 rounded-full ring-4 ring-yellow-500/10 group-hover:scale-110 transition-transform"><Coins className="w-8 h-8" /></div>
          <div className="text-3xl font-black text-white z-10">{userStats.points}</div>
          <div className="text-sm text-slate-400 font-medium z-10">נקודות שצברת</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden group hover:border-green-500/30 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
          <div className="p-4 bg-green-500/20 text-green-400 rounded-full ring-4 ring-green-500/10 group-hover:scale-110 transition-transform"><Award className="w-8 h-8" /></div>
          <div className="text-3xl font-black text-white z-10">{userStats.completedLessons.length}/{LESSONS.length}</div>
          <div className="text-sm text-slate-400 font-medium z-10">שיעורים הושלמו</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2"><Trophy className="w-5 h-5 text-purple-400" />התגים שלי</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {BADGES.map(badge => {
              const isEarned = userStats.badges.includes(badge.id);
              return (
                <div key={badge.id} className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all cursor-help ${isEarned ? `bg-gradient-to-br ${badge.color} border-white/20 shadow-lg` : 'bg-slate-700/50 border-slate-600 grayscale opacity-40'}`} title={badge.name + (isEarned ? '' : ' (נעול)') + ' - ' + badge.description}>
                  {getIcon(badge.icon, "w-8 h-8 text-white drop-shadow-md", badge.description)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Globe className="w-6 h-6 text-blue-400" />כלים וחדשות</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {EXTERNAL_LINKS.map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" onClick={(e) => { if (!isOnline) e.preventDefault(); else playSound('click'); }} className={`bg-slate-800 border border-slate-700 p-4 rounded-2xl flex flex-col items-center gap-3 text-center transition-all duration-300 group relative overflow-hidden ${isOnline ? 'hover:bg-slate-750 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-lg' : 'opacity-50 cursor-not-allowed grayscale'}`} title={!isOnline ? 'לא זמין במצב לא מקוון' : link.title}>
              {isOnline && <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${link.color}`}></div>}
              <div className={`p-3 rounded-xl text-white shadow-lg ${link.color} transition-all duration-300 relative z-10`}>{getIcon(link.iconName, "w-6 h-6")}</div>
              <span className="font-bold text-slate-200 text-sm relative z-10 group-hover:text-white transition-colors">{link.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-white tracking-tight">מרכז הלמידה</h1>
          <div className="relative w-full md:w-72 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl opacity-30 group-focus-within:opacity-100 transition duration-300 blur"></div>
            <div className="relative flex items-center bg-slate-900 rounded-xl">
              <input type="text" placeholder="חפש שיעור..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent border-none text-white text-sm px-4 py-3 pr-10 focus:outline-none placeholder-slate-500" />
              <Search className="w-4 h-4 text-slate-400 absolute top-3.5 right-3" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button onClick={() => { playSound('click'); setSelectedCategory('all'); }} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${selectedCategory === 'all' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg ring-2 ring-blue-400/30' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>הכל ({LESSONS.length})</button>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => { playSound('click'); setSelectedCategory(cat.id as Category); }} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg ring-2 ring-purple-400/30' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>{cat.name}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson, index) => (
          <div key={lesson.id} onClick={() => handleOpenLesson(lesson)} style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }} className={`group relative h-full flex flex-col p-6 bg-[#1e293b] rounded-[1.75rem] border border-slate-700 shadow-lg hover:bg-[#253045] hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-8 ${loadingLessonId === lesson.id ? 'scale-[0.98] opacity-90 cursor-wait' : ''}`}>
            {userStats.completedLessons.includes(lesson.id) && <div className="absolute inset-0 border-2 border-green-500/30 rounded-[1.75rem] pointer-events-none z-20"></div>}
            {loadingLessonId === lesson.id && (
              <div className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center rounded-[1.75rem]"><Loader2 className="w-8 h-8 text-blue-400 animate-spin" /></div>
            )}
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3.5 rounded-2xl ${userStats.completedLessons.includes(lesson.id) ? 'bg-green-500/10 text-green-400' : 'bg-slate-900/60 text-slate-300'}`}>{getIcon(lesson.iconName)}</div>
              <div className="flex gap-2">
                <button onClick={(e) => handleShare(e, lesson)} className="p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">{copiedLessonId === lesson.id ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}</button>
                <span className={`text-xs px-2.5 py-1.5 rounded-full font-bold border ${lesson.difficulty === 'מתחיל' ? 'border-green-500/20 text-green-300 bg-green-500/5' : lesson.difficulty === 'מתקדם' ? 'border-yellow-500/20 text-yellow-300 bg-yellow-500/5' : 'border-red-500/20 text-red-300 bg-red-500/5'}`}>{lesson.difficulty}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2 relative z-10">{lesson.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 relative z-10 font-light">{lesson.description}</p>
            <div className="mt-auto pt-5 border-t border-slate-700/50 flex items-center justify-between text-sm relative z-10">
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2.5 px-6 rounded-full transition-all flex items-center gap-2 group/btn">למד עוד <span className="group-hover/btn:-translate-x-1 transition-transform">←</span></button>
              {userStats.completedLessons.includes(lesson.id) && <span className="flex items-center gap-1.5 text-green-400 font-bold bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20"><Check className="w-3.5 h-3.5" />הושלם</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 md:pb-0 font-sans selection:bg-purple-500/30">
      <div className="md:hidden bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 p-4 sticky top-0 z-40 flex justify-between items-center">
        <div className="flex items-center gap-2 font-black text-xl tracking-tighter cursor-pointer active:scale-95 transition-transform" onClick={handleLogoClick}>
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2 rounded-lg text-white"><PiggyBank className="w-6 h-6" /></div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">FinKidz</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
           <Coins className="w-4 h-4 text-yellow-400" />
           <span className="font-bold text-yellow-100">{userStats.points}</span>
        </div>
      </div>

      <div className="flex">
        <div className="hidden md:flex flex-col w-72 h-screen bg-slate-900 border-l border-slate-800 fixed right-0 top-0 z-50 p-6">
           <div className="flex items-center gap-3 font-black text-2xl tracking-tighter mb-10 cursor-pointer hover:scale-105 transition-transform" onClick={handleLogoClick}>
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/20"><PiggyBank className="w-8 h-8" /></div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">FinKidz</span>
          </div>
          <nav className="space-y-2 flex-1">
            <button onClick={() => handleNavClick('home')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-bold ${currentView === 'home' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Home className="w-5 h-5" /> בית
            </button>
            <button onClick={() => handleNavClick('lessons')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-bold ${currentView === 'lessons' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <BookOpen className="w-5 h-5" /> שיעורים
            </button>
            <button onClick={() => handleNavClick('game')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-bold ${currentView === 'game' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Gamepad2 className="w-5 h-5" /> מרוץ החיסכון
            </button>
          </nav>
          <div className="mt-auto pt-6 border-t border-slate-800">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
              <p className="text-xs text-slate-500 mb-1">© 2025 Noam Gold AI</p>
              <a href="mailto:goldnoamai@gmail.com" className="flex items-center justify-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                <Mail className="w-3 h-3" /> שלח משוב
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 md:mr-72 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {currentView === 'home' ? renderHome() : currentView === 'lessons' ? renderLessons() : <FinancialGame />}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-2 z-50">
        <div className="flex justify-around items-center">
          <button onClick={() => handleNavClick('home')} className={`flex flex-col items-center gap-1 p-2 transition-colors ${currentView === 'home' ? 'text-indigo-400' : 'text-slate-500'}`}>
            <Home className={`w-6 h-6 ${currentView === 'home' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">בית</span>
          </button>
          <button onClick={() => handleNavClick('lessons')} className={`flex flex-col items-center gap-1 p-2 transition-colors ${currentView === 'lessons' ? 'text-indigo-400' : 'text-slate-500'}`}>
            <BookOpen className={`w-6 h-6 ${currentView === 'lessons' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">שיעורים</span>
          </button>
          <button onClick={() => handleNavClick('game')} className={`flex flex-col items-center gap-1 p-2 transition-colors ${currentView === 'game' ? 'text-indigo-400' : 'text-slate-500'}`}>
            <Gamepad2 className={`w-6 h-6 ${currentView === 'game' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">משחק</span>
          </button>
        </div>
      </div>

      {!isOnline && (
        <div className="fixed bottom-[80px] md:bottom-8 left-4 right-4 md:right-auto md:left-8 z-[60] animate-in slide-in-from-bottom-10 fade-in duration-500 md:max-w-sm w-full">
           <div className="bg-slate-900/95 backdrop-blur-md border border-red-500/30 text-slate-200 p-4 rounded-2xl shadow-2xl flex items-center gap-4 relative overflow-hidden">
             <div className="p-3 bg-red-500/20 rounded-full shrink-0 relative z-10"><WifiOff className="w-6 h-6 text-red-400" /></div>
             <div className="relative z-10">
               <h3 className="font-bold text-white mb-0.5">מצב לא מקוון</h3>
               <p className="text-xs text-slate-400 leading-tight">חיבור האינטרנט נותק. הקישורים החיצוניים מושבתים, אך ניתן להמשיך ללמוד.</p>
             </div>
           </div>
        </div>
      )}

      <LessonModal lesson={selectedLesson} isOpen={!!selectedLesson} onClose={() => setSelectedLesson(null)} onComplete={handleLessonComplete} isCompleted={selectedLesson ? userStats.completedLessons.includes(selectedLesson.id) : false} isOnline={isOnline} />

      {showEasterEgg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
           <div className="bg-slate-900 border-2 border-yellow-500/50 p-8 rounded-3xl max-w-md w-full text-center relative shadow-[0_0_50px_rgba(234,179,8,0.3)]">
             <button onClick={() => setShowEasterEgg(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X className="w-6 h-6" /></button>
             <div className="mb-6 inline-block p-4 bg-yellow-500/20 rounded-full animate-bounce"><Sparkles className="w-12 h-12 text-yellow-400" /></div>
             <h2 className="text-2xl font-black text-yellow-400 mb-4">מצאת את האוצר הסודי!</h2>
             <p className="text-lg text-slate-300 mb-8 font-medium leading-relaxed">"{randomFact}"</p>
             <button onClick={() => setShowEasterEgg(false)} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105">מגניב!</button>
           </div>
        </div>
      )}
    </div>
  );
}

export default App;