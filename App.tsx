
import React, { useState, useEffect, useRef, useMemo } from 'react';
// Added X to imports from lucide-react to fix line 317 error
import { BookOpen, Trophy, Home, Flame, Award, WifiOff, Check, Sparkles, PiggyBank, Gamepad2, Coins, Search, SortAsc, Moon, Sun, Languages, Heart, ExternalLink, Info, X } from 'lucide-react';
import LessonModal from './components/LessonModal';
import FinancialGame from './components/FinancialGame';
import { LESSONS, CATEGORIES, BADGES, EXTERNAL_LINKS, UI_TRANSLATIONS } from './constants';
import { Lesson, UserStats, Category, Language } from './types';
import { getIcon } from './components/Icons';
import { playSound } from './utils/sounds';

declare var AOS: any;

const LANGS: { id: Language; label: string; flag: string }[] = [
  { id: 'he', label: 'עברית', flag: '🇮🇱' },
  { id: 'en', label: 'English', flag: '🇺🇸' },
  { id: 'zh', label: '中文', flag: '🇨🇳' },
  { id: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
  { id: 'fr', label: 'Français', flag: '🇫🇷' },
];

const EASTER_EGG_FACTS = [
  "הידעת? המטבעות הראשונים הומצאו בממלכת לידיה לפני כ-2,600 שנה!",
  "הידעת? שטרות כסף עשויים בדרך כלל מכותנה ופשתן, לא מנייר רגיל.",
  "הידעת? המילה 'בנק' מגיעה מהמילה האיטלקית 'banco' שפירושה ספסל.",
  "הידעת? מונופול מדפיס יותר כסף בשנה מאשר הבנק המרכזי של ארה״ב!",
  "הידעת? בשנת 1946 בהונגריה הודפס שטר של 100 קווינטיליון פנגה!",
  "הידעת? הכספומט הראשון הותקן בלונדון בשנת 1967."
];

type SortOption = 'default' | 'difficulty-asc' | 'difficulty-desc' | 'title';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'lessons' | 'game'>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loadingLessonId, setLoadingLessonId] = useState<string | null>(null);
  const [justCompletedId, setJustCompletedId] = useState<string | null>(null);
  // Default theme set to dark as requested
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lang, setLang] = useState<Language>('he');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({ 
    points: 0, 
    completedLessons: [],
    favorites: [],
    currentStreak: 1,
    lastLoginDate: new Date().toISOString(),
    badges: []
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [randomFact, setRandomFact] = useState('');
  const logoClickCount = useRef(0);

  const t = (key: string) => UI_TRANSLATIONS[lang][key] || UI_TRANSLATIONS['he'][key] || key;
  const isRtl = lang === 'he';

  const toggleTheme = () => {
    playSound('click');
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleToggleFavorite = (e: React.MouseEvent, lessonId: string) => {
    e.stopPropagation();
    playSound('click');
    setUserStats(prev => {
      const favorites = prev.favorites || [];
      const newFavorites = favorites.includes(lessonId)
        ? favorites.filter(id => id !== lessonId)
        : [...favorites, lessonId];
      return { ...prev, favorites: newFavorites };
    });
  };

  const triggerEasterEgg = () => {
    logoClickCount.current += 1;
    if (logoClickCount.current >= 5) {
      playSound('success');
      setRandomFact(EASTER_EGG_FACTS[Math.floor(Math.random() * EASTER_EGG_FACTS.length)]);
      setShowEasterEgg(true);
      logoClickCount.current = 0;
      setTimeout(() => setShowEasterEgg(false), 8000);
    } else {
      playSound('click');
    }
  };

  useEffect(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, once: true, easing: 'ease-out-quad' });
    }
  }, []);

  useEffect(() => {
    document.title = t('siteTitle');
  }, [lang]);

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

  useEffect(() => {
    const saved = localStorage.getItem('finkidz_stats');
    const savedTheme = localStorage.getItem('finkidz_theme');
    const savedLang = localStorage.getItem('finkidz_lang');
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme as 'light' | 'dark');
    if (savedLang) setLang(savedLang as Language);
    
    if (saved) {
      const parsedStats: UserStats = JSON.parse(saved);
      const lastLogin = new Date(parsedStats.lastLoginDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      let newStreak = parsedStats.currentStreak;
      if (today.getDate() !== lastLogin.getDate()) {
        if (diffDays <= 2) newStreak += 1; else newStreak = 1;
      }

      setUserStats({ 
        ...parsedStats, 
        currentStreak: newStreak, 
        lastLoginDate: today.toISOString(),
        favorites: parsedStats.favorites || []
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('finkidz_stats', JSON.stringify(userStats));
    localStorage.setItem('finkidz_theme', theme);
    localStorage.setItem('finkidz_lang', lang);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [userStats, theme, lang, isRtl]);

  const handleLessonComplete = (id: string) => {
    if (!userStats.completedLessons.includes(id)) {
      playSound('success');
      setJustCompletedId(id);
      setTimeout(() => setJustCompletedId(null), 3000);
      setUserStats(prev => ({
        ...prev,
        points: prev.points + 100,
        completedLessons: [...prev.completedLessons, id]
      }));
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

  const filteredAndSortedLessons = useMemo(() => {
    let result = [...LESSONS].filter(lesson => {
      const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
      const lessonTitle = lesson.translations?.[lang]?.title || lesson.title;
      const lessonDesc = lesson.translations?.[lang]?.description || lesson.description;
      const matchesSearch = lessonTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            lessonDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFavorite = !showOnlyFavorites || (userStats.favorites && userStats.favorites.includes(lesson.id));
      
      return matchesCategory && matchesSearch && matchesFavorite;
    });
    const difficultyMap = { 'מתחיל': 1, 'מתקדם': 2, 'מומחה': 3 };
    if (sortBy === 'difficulty-asc') result.sort((a, b) => (difficultyMap[a.difficulty] || 0) - (difficultyMap[b.difficulty] || 0));
    else if (sortBy === 'difficulty-desc') result.sort((a, b) => (difficultyMap[b.difficulty] || 0) - (difficultyMap[a.difficulty] || 0));
    else if (sortBy === 'title') result.sort((a, b) => (a.translations?.[lang]?.title || a.title).localeCompare(b.translations?.[lang]?.title || b.title));
    return result;
  }, [selectedCategory, searchQuery, sortBy, lang, showOnlyFavorites, userStats.favorites]);

  const renderHome = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="text-center py-6" data-aos="fade-down">
        <h1 className={`text-4xl md:text-6xl font-black mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-sm`}>
          {t('heroTitle')}
        </h1>
        <p className={`text-lg md:text-2xl font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {t('heroSubtitle')}
        </p>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden ring-1 ring-white/10">
        <div className="relative z-10">
          <div className={`flex justify-between items-start ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
             <div className={isRtl ? 'text-right' : 'text-left'}>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-md">
                   {isRtl ? 'היי אלוף הפיננסים! 👋' : 'Hi Finance Champ! 👋'}
                </h1>
                <p className="text-lg md:text-xl font-medium opacity-90 max-w-xl text-purple-50">
                   {isRtl ? 'העולם הפיננסי מחכה לך. בוא נשבור שיאים חדשים היום!' : 'The financial world is waiting for you. Let’s break new records today!'}
                </p>
             </div>
             <div className="hidden md:block">
               <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 flex flex-col items-center">
                 <div className="flex items-center gap-2 text-yellow-300 mb-1">
                   <Flame className="w-6 h-6 fill-yellow-300" />
                   <span className="font-bold text-2xl">{userStats.currentStreak}</span>
                 </div>
                 <span className="text-xs font-medium uppercase tracking-wider text-purple-100">{t('streak')}</span>
               </div>
             </div>
          </div>
          <div className={`flex flex-wrap gap-4 mt-8 ${isRtl ? 'justify-end' : 'justify-start'}`}>
            <button onClick={() => handleNavClick('game')} className="bg-indigo-900/40 backdrop-blur border border-white/20 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-900/60 transition-all transform hover:scale-105 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              {t('game')}
            </button>
            <button onClick={() => handleNavClick('lessons')} className="bg-white text-purple-700 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-50 transition-all transform hover:scale-105 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {t('lessons')}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur border p-6 rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden group transition-colors`}>
          <div className="p-4 bg-yellow-500/20 text-yellow-500 rounded-full group-hover:scale-110 transition-transform"><Coins className="w-8 h-8" /></div>
          <div className={`text-3xl font-black z-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{userStats.points}</div>
          <div className={`text-sm font-medium z-10 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t('points')}</div>
        </div>
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur border p-6 rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden group transition-colors`}>
          <div className="p-4 bg-green-500/20 text-green-500 rounded-full group-hover:scale-110 transition-transform"><Award className="w-8 h-8" /></div>
          <div className={`text-3xl font-black z-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{userStats.completedLessons.length}/{LESSONS.length}</div>
          <div className={`text-sm font-medium z-10 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t('lessons')} {t('completed')}</div>
        </div>
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur border p-6 rounded-2xl flex flex-col gap-4`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isRtl ? 'justify-end' : 'justify-start'} ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
             {isRtl ? 'התגים שלי' : 'My Badges'}
             <Trophy className="w-5 h-5 text-purple-400" />
          </h3>
          <div className={`flex gap-3 overflow-x-auto pb-2 scrollbar-hide ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            {BADGES.map(badge => {
              const isEarned = (userStats.badges || []).includes(badge.id);
              return (
                <div key={badge.id} className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${isEarned ? `bg-gradient-to-br ${badge.color} border-white/20 shadow-lg` : 'bg-slate-700/50 grayscale opacity-40'}`}>
                  {getIcon(badge.icon, "w-8 h-8 text-white drop-shadow-md", `${badge.name}: ${badge.description}`)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* External Resources Section - Disabled when offline */}
      <div className="mt-12">
        <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isRtl ? 'justify-end' : 'justify-start'} ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
           {isRtl ? 'כלים ומשאבים חיצוניים' : 'External Tools & Resources'}
           <ExternalLink className="w-6 h-6 text-blue-400" />
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXTERNAL_LINKS.map(link => (
            <a 
              key={link.id}
              href={isOnline ? link.url : '#'}
              target={isOnline ? "_blank" : "_self"}
              rel="noopener noreferrer"
              onClick={(e) => { if(!isOnline) e.preventDefault(); playSound('click'); }}
              className={`p-5 rounded-2xl border transition-all flex flex-col gap-3 group ${!isOnline ? 'grayscale opacity-60 cursor-not-allowed bg-slate-800 border-slate-700' : 'hover:scale-[1.02] hover:shadow-xl ' + (theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900')}`}
            >
              <div className={`p-3 rounded-xl w-fit ${link.color} text-white`}>{getIcon(link.iconName)}</div>
              <div>
                <div className="font-bold flex items-center gap-2">
                  {link.title}
                  {isOnline && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
                {!isOnline && <span className="text-[10px] text-red-400 font-bold uppercase">{isRtl ? 'זמין רק בחיבור לרשת' : 'Online Only'}</span>}
              </div>
            </a>
          ))}
        </div>
      </div>

      {showEasterEgg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-indigo-600 text-white p-8 rounded-[2.5rem] shadow-2xl border-4 border-yellow-400 animate-in zoom-in slide-in-from-bottom-10 duration-500 flex flex-col items-center gap-6 max-w-sm text-center relative overflow-hidden">
            {/* Confetti Animation Background */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({length: 20}).map((_, i) => (
                <div key={i} className="absolute w-2 h-2 rounded-full animate-celebrate" style={{
                  left: `${Math.random() * 100}%`,
                  top: `110%`,
                  backgroundColor: ['#fbbf24', '#f59e0b', '#ffffff', '#ec4899'][Math.floor(Math.random() * 4)],
                  animationDelay: `${Math.random() * 1.5}s`,
                  animationDuration: `${1 + Math.random()}s`
                }} />
              ))}
            </div>

            <button onClick={() => setShowEasterEgg(false)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white pointer-events-auto">
              <X className="w-5 h-5" />
            </button>

            <div className="bg-yellow-400 p-5 rounded-full shadow-lg">
              <Sparkles className="w-12 h-12 text-indigo-700 animate-bounce" />
            </div>
            
            <div className="z-10">
              <h3 className="text-3xl font-black mb-2">{isRtl ? 'מצאת בונוס סודי! 🎁' : 'You Found a Secret! 🎁'}</h3>
              <div className="h-px w-24 bg-white/30 mx-auto mb-4" />
              <p className="text-xl font-medium leading-relaxed">{randomFact}</p>
            </div>
            
            <button 
              onClick={() => setShowEasterEgg(false)}
              className="mt-4 bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold hover:bg-yellow-50 transition-all pointer-events-auto"
            >
              {isRtl ? 'מגניב!' : 'Cool!'}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-6">
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isRtl ? '' : 'md:flex-row-reverse'}`}>
          <div className="relative w-full md:w-72 group">
            <div className={`relative flex items-center rounded-xl ${theme === 'dark' ? 'bg-slate-900' : 'bg-white border border-slate-200'}`}>
              <input dir={isRtl ? 'rtl' : 'ltr'} type="text" placeholder={t('search')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full bg-transparent border-none text-sm px-4 py-3 focus:outline-none ${theme === 'dark' ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`} />
              <Search className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRtl ? 'right-3' : 'left-3'}`} />
            </div>
          </div>
          <h1 className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('lessons')}</h1>
        </div>
        
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${isRtl ? '' : 'md:flex-row-reverse'}`}>
           <div className={`flex items-center gap-3 p-1 rounded-xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-200 shadow-sm'}`}>
             <div className="px-3 py-1.5 text-slate-500"><SortAsc className="w-4 h-4" /></div>
             <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className={`bg-transparent text-sm font-medium py-1.5 focus:outline-none cursor-pointer ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
               <option value="default">{isRtl ? 'סדר רגיל' : 'Default'}</option>
               <option value="difficulty-asc">{isRtl ? 'קל לכבד' : 'Easy to Hard'}</option>
               <option value="difficulty-desc">{isRtl ? 'כבד לקל' : 'Hard to Easy'}</option>
               <option value="title">{isRtl ? 'לפי שם' : 'By Name'}</option>
             </select>
           </div>
           <div className={`flex gap-3 overflow-x-auto pb-2 scrollbar-hide ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            <button 
              onClick={() => { playSound('click'); setShowOnlyFavorites(!showOnlyFavorites); }} 
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${showOnlyFavorites ? 'bg-pink-600 text-white shadow-lg ring-2 ring-pink-400/30' : 'bg-slate-800 text-slate-400'}`}
            >
              <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
              {t('favorites')}
            </button>
            <div className="w-px h-8 bg-slate-700 self-center" />
            <button onClick={() => { playSound('click'); setSelectedCategory('all'); }} className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>{t('all')} ({LESSONS.length})</button>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => { playSound('click'); setSelectedCategory(cat.id as Category); }} className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>{t(cat.translationKey)}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedLessons.map((lesson, index) => {
          const isCompleted = userStats.completedLessons.includes(lesson.id);
          const isJustCompleted = justCompletedId === lesson.id;
          const isFavorite = (userStats.favorites || []).includes(lesson.id);
          const activeTitle = lesson.translations?.[lang]?.title || lesson.title;
          const activeDesc = lesson.translations?.[lang]?.description || lesson.description;

          return (
            <div 
              key={lesson.id} 
              data-aos="fade-up" 
              onClick={() => handleOpenLesson(lesson)} 
              className={`group relative h-full flex flex-col p-6 rounded-[1.75rem] border shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer 
                ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} 
                ${isCompleted ? 'ring-2 ring-green-500/30' : ''}
                ${isJustCompleted ? 'animate-completion-bounce ring-4 ring-green-500/70 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : ''}
              `}
            >
              <div className={`flex justify-between items-start mb-4 ${isRtl ? '' : 'flex-row-reverse'}`}>
                <div className={`p-3.5 rounded-2xl ${isCompleted ? 'bg-green-500/10 text-green-400' : 'bg-slate-900/60 text-slate-300'}`}>{getIcon(lesson.iconName)}</div>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => handleToggleFavorite(e, lesson.id)} 
                    className={`p-2.5 rounded-full transition-all ${isFavorite ? 'text-pink-500 bg-pink-500/10' : 'text-slate-500 bg-slate-100 hover:bg-slate-200'} ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : ''}`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <span className={`text-xs px-2.5 py-1.5 rounded-full font-bold border ${lesson.difficulty === 'מתחיל' ? 'border-green-500/20 text-green-300' : 'border-yellow-500/20 text-yellow-300'}`}>{lesson.difficulty}</span>
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'} ${isRtl ? 'text-right' : 'text-left'}`}>{activeTitle}</h3>
              <p className={`text-sm leading-relaxed mb-6 flex-1 font-light ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} ${isRtl ? 'text-right' : 'text-left'}`}>{activeDesc}</p>
              <div className={`mt-auto pt-5 border-t flex items-center justify-between text-sm ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                <button className="bg-blue-600 text-white text-sm font-bold py-2.5 px-6 rounded-full transition-all">{t('learnMore')}</button>
                {isCompleted && (
                  <span className={`flex items-center gap-1.5 font-bold transition-all ${isJustCompleted ? 'text-green-300 scale-110' : 'text-green-400'}`}>
                    <Check className={`w-3.5 h-3.5 ${isJustCompleted ? 'animate-glow-checkmark' : ''}`} />
                    {t('completed')}
                  </span>
                )}
              </div>

              {isJustCompleted && (
                <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none overflow-hidden rounded-[1.75rem]">
                   <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
                   {Array.from({ length: 20 }).map((_, i) => (
                     <div key={i} className="absolute w-2 h-2 rounded-full animate-celebrate" style={{
                       left: `${Math.random() * 100}%`,
                       top: `${Math.random() * 100}%`,
                       backgroundColor: ['#ef4444', '#3b82f6', '#fbbf24', '#10b981', '#a855f7', '#ffffff'][Math.floor(Math.random() * 6)],
                       animationDelay: `${Math.random() * 0.4}s`,
                       animationDuration: `${0.8 + Math.random() * 1}s`
                     }} />
                   ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen pb-20 md:pb-0 font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Offline Mode Banner */}
      {!isOnline && (
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 text-center sticky top-0 z-[60] shadow-xl flex items-center justify-center gap-4 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 font-black uppercase tracking-wider text-sm">
            <WifiOff className="w-5 h-5 animate-pulse" />
            {isRtl ? 'מצב לא מקוון פעיל' : 'Offline Mode Active'}
          </div>
          <div className="h-4 w-px bg-white/30 hidden sm:block" />
          <p className="text-xs md:text-sm font-medium">
            {isRtl 
              ? 'שיעורים ומשחקים טעונים זמינים כעת. חלק מהתכונות (קישורים, תרגום AI) מושבתות.' 
              : 'Loaded lessons and games are available. Online features like links are disabled.'}
          </p>
          <button onClick={() => window.location.reload()} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-bold transition-all">
            {isRtl ? 'נסה שוב' : 'Retry'}
          </button>
        </div>
      )}

      <div className={`md:hidden p-4 sticky ${!isOnline ? 'top-[52px]' : 'top-0'} z-40 flex justify-between items-center backdrop-blur-lg border-b ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="flex items-center gap-2 font-black text-xl tracking-tighter cursor-pointer" onClick={triggerEasterEgg}>
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2 rounded-lg text-white"><PiggyBank className="w-6 h-6" /></div>
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme === 'dark' ? 'from-white to-slate-400' : 'from-slate-900 to-slate-600'}`}>FinKidz</span>
        </div>
        <div className="flex items-center gap-2">
           <select value={lang} onChange={(e) => { playSound('click'); setLang(e.target.value as Language); }} className="bg-transparent text-sm border-none focus:outline-none">
              {LANGS.map(l => <option key={l.id} value={l.id} className="text-black">{l.flag}</option>)}
           </select>
           {/* Mobile theme toggle */}
           <button onClick={toggleTheme} className="p-2 transition-transform hover:scale-110 active:scale-90">{theme === 'dark' ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-slate-600" />}</button>
        </div>
      </div>

      <div className="flex">
        <div className={`hidden md:flex flex-col w-72 h-screen border-l fixed ${isRtl ? 'right-0' : 'left-0'} top-0 z-50 p-6 transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
           <div className={`flex items-center gap-3 font-black text-2xl tracking-tighter mb-10 cursor-pointer ${isRtl ? 'flex-row' : 'flex-row-reverse'}`} onClick={triggerEasterEgg}>
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2.5 rounded-xl text-white shadow-lg"><PiggyBank className="w-8 h-8" /></div>
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme === 'dark' ? 'from-white to-slate-400' : 'from-slate-900 to-slate-600'}`}>FinKidz</span>
          </div>
          <nav className="space-y-2 flex-1">
            <button onClick={() => handleNavClick('home')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold ${isRtl ? 'flex-row-reverse' : 'flex-row'} ${currentView === 'home' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Home className="w-5 h-5" /> {t('home')}
            </button>
            <button onClick={() => handleNavClick('lessons')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold ${isRtl ? 'flex-row-reverse' : 'flex-row'} ${currentView === 'lessons' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <BookOpen className="w-5 h-5" /> {t('lessons')}
            </button>
            <button onClick={() => handleNavClick('game')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold ${isRtl ? 'flex-row-reverse' : 'flex-row'} ${currentView === 'game' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <Gamepad2 className="w-5 h-5" /> {t('game')}
            </button>
          </nav>
          
          <div className="space-y-4">
            <div className={`flex items-center gap-2 p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <Languages className="w-5 h-5 text-indigo-400" />
              <select value={lang} onChange={(e) => { playSound('click'); setLang(e.target.value as Language); }} className={`bg-transparent text-sm w-full focus:outline-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {LANGS.map(l => <option key={l.id} value={l.id} className="text-black">{l.flag} {l.label}</option>)}
              </select>
            </div>
            {/* Desktop theme toggle switcher */}
            <button onClick={toggleTheme} className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${theme === 'dark' ? 'bg-slate-800 text-yellow-400 border border-slate-700' : 'bg-slate-100 text-slate-600 border border-slate-200 shadow-sm'}`}>
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {theme === 'dark' ? 'Day Mode' : 'Night Mode'}
            </button>
          </div>

          <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className={`rounded-xl p-4 border text-center ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-xs text-slate-500 mb-1 font-bold">(C) Noam Gold AI 2025</p>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Send Feedback</span>
                <a href="mailto:goldnoamai@gmail.com" className="text-xs text-indigo-400 hover:text-indigo-300 font-bold">goldnoamai@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex-1 md:${isRtl ? 'mr-72' : 'ml-72'} p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col min-h-screen`}>
          <div className="flex-1">
            {currentView === 'home' ? renderHome() : currentView === 'lessons' ? renderLessons() : <FinancialGame />}
          </div>
          
          {/* Mobile Footer with info and email */}
          <footer className={`mt-12 py-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} text-center md:hidden`}>
             <p className="text-xs text-slate-500 mb-1 font-bold">(C) Noam Gold AI 2025</p>
             <div className="flex flex-col gap-1">
               <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Send Feedback</span>
               <a href="mailto:goldnoamai@gmail.com" className="text-xs text-indigo-400 hover:text-indigo-300 font-bold">goldnoamai@gmail.com</a>
             </div>
          </footer>
        </div>
      </div>

      <LessonModal 
        lesson={selectedLesson} 
        isOpen={!!selectedLesson} 
        onClose={() => setSelectedLesson(null)} 
        onComplete={handleLessonComplete} 
        onSelectNext={(next) => {
          setSelectedLesson(null);
          setTimeout(() => handleOpenLesson(next), 300);
        }}
        isCompleted={selectedLesson ? userStats.completedLessons.includes(selectedLesson.id) : false} 
        isOnline={isOnline} 
        language={lang}
      />
    </div>
  );
}

export default App;
