import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, Home, Settings, Coins, Search, Mail, Flame, Award, ExternalLink, WifiOff, Globe, Share2, Star, Crown, RefreshCw, Loader2, CheckCircle, Copy } from 'lucide-react';
import LessonModal from './components/LessonModal';
import { LESSONS, CATEGORIES, BADGES, EXTERNAL_LINKS } from './constants';
import { Lesson, UserStats, Category, Badge } from './types';
import { getIcon } from './components/Icons';
import { playSound } from './utils/sounds';

const DIFFICULTY_TOOLTIPS: Record<string, string> = {
  'מתחיל': 'צעדים ראשונים ומושגי יסוד בעולם הכסף',
  'מתקדם': 'הבנת מנגנונים כלכליים, בנקים ושוק ההון',
  'מומחה': 'אסטרטגיות השקעה וניתוח שוק מעמיק'
};

function App() {
  // State
  const [currentView, setCurrentView] = useState<'home' | 'lessons'>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isLessonLoading, setIsLessonLoading] = useState(false); // Used for transitions inside the modal
  const [loadingLessonId, setLoadingLessonId] = useState<string | null>(null); // Used for loading on the card
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
  
  // Offline/Sync State
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState<string>('');

  // Share feedback state
  const [copiedLessonId, setCopiedLessonId] = useState<string | null>(null);

  // Network status listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('idle');
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkForNewBadges = (currentStats: UserStats): string[] => {
    const earnedNow: string[] = [];
    BADGES.forEach(badge => {
      if (!currentStats.badges.includes(badge.id) && badge.condition(currentStats)) {
        earnedNow.push(badge.id);
        playSound('success'); // Badge sound!
      }
    });
    return earnedNow;
  };

  // Load stats from local storage on mount and calculate streak
  useEffect(() => {
    const saved = localStorage.getItem('finkidz_stats');
    if (saved) {
      const parsedStats: UserStats = JSON.parse(saved);
      
      // Calculate Streak
      const lastLogin = new Date(parsedStats.lastLoginDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      let newStreak = parsedStats.currentStreak;
      
      // If last login was yesterday (approx), increment streak. 
      // Note: This is a simplified logic. 
      if (today.getDate() !== lastLogin.getDate()) {
        if (diffDays <= 2) { // Allow for ~24-48h gap to maintain streak
          newStreak += 1;
        } else {
          newStreak = 1; // Reset streak
        }
      }

      // Check for Streak Badges immediately
      const currentStatsWithStreak = { ...parsedStats, currentStreak: newStreak, lastLoginDate: today.toISOString() };
      const newBadges = checkForNewBadges(currentStatsWithStreak);

      setUserStats({
        ...currentStatsWithStreak,
        badges: [...parsedStats.badges, ...newBadges]
      });
    } else {
      // First time user
      setUserStats(prev => ({ ...prev, lastLoginDate: new Date().toISOString() }));
    }
  }, []);

  // Save stats when changed
  useEffect(() => {
    localStorage.setItem('finkidz_stats', JSON.stringify(userStats));
  }, [userStats]);

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
          badges: [...prev.badges, ...newBadges]
        };
      });
    }
  };

  const handleNavClick = (view: 'home' | 'lessons') => {
    if (currentView !== view) {
      playSound('click');
      setCurrentView(view);
    }
  };

  const handleOpenLesson = (lesson: Lesson) => {
    playSound('click');
    
    if (selectedLesson) {
      // If modal is already open (e.g. Next Lesson), show loading inside the modal
      setIsLessonLoading(true);
      setSelectedLesson(lesson);
      setTimeout(() => {
        setIsLessonLoading(false);
      }, 800);
    } else {
      // If opening from the grid, show loading on the card first
      setLoadingLessonId(lesson.id);
      setTimeout(() => {
        setLoadingLessonId(null);
        setSelectedLesson(lesson);
      }, 800);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncStatus('idle');
    playSound('click');

    // Simulate network sync attempt
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (navigator.onLine) {
      setSyncStatus('success');
      setSyncMessage('החיבור חודש! מסנכרן נתונים...');
      playSound('success');
      
      setIsOnline(true);
      setTimeout(() => {
        setSyncStatus('idle');
      }, 3000);
    } else {
      setSyncStatus('error');
      setSyncMessage('עדיין אין חיבור. נסה שוב מאוחר יותר.');
      
      setTimeout(() => {
        setSyncStatus('idle');
      }, 3000);
    }
    setIsSyncing(false);
  };

  const handleShare = async (e: React.MouseEvent, lesson: Lesson) => {
    e.stopPropagation();
    const shareData = {
      title: `FinKidz: ${lesson.title}`,
      text: `למדתי על "${lesson.title}" ב-FinKidz! בואו ללמוד חינוך פיננסי בכיף.`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setCopiedLessonId(lesson.id);
        playSound('success');
        setTimeout(() => setCopiedLessonId(null), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  const filteredLessons = LESSONS.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = lesson.title.toLowerCase().includes(query) || lesson.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Calculate Next Lesson for Modal
  const currentLessonIndex = selectedLesson ? LESSONS.findIndex(l => l.id === selectedLesson.id) : -1;
  const nextLesson = (currentLessonIndex !== -1 && currentLessonIndex < LESSONS.length - 1) 
    ? LESSONS[currentLessonIndex + 1] 
    : null;

  // Calculate User Rank Title
  const getRankTitle = () => {
    if (userStats.badges.includes('rank_expert')) return { title: 'גורו פיננסי', color: 'text-yellow-400' };
    if (userStats.badges.includes('rank_advanced')) return { title: 'משקיע מתקדם', color: 'text-blue-300' };
    if (userStats.badges.includes('rank_beginner')) return { title: 'מתחיל מבטיח', color: 'text-green-300' };
    return { title: 'טירון פיננסי', color: 'text-slate-300' };
  };

  const rank = getRankTitle();

  const renderHome = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden ring-1 ring-white/10 group">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
             <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
                     היי אלוף! 👋
                  </h1>
                  {userStats.badges.includes('rank_expert') && <Crown className="w-8 h-8 text-yellow-300 animate-bounce" />}
                </div>
                <div className="flex items-center gap-2 mb-4 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                  <span className="text-sm opacity-80">דרגה נוכחית:</span>
                  <span className={`font-bold ${rank.color}`}>{rank.title}</span>
                </div>
                <p className="text-lg md:text-xl font-medium opacity-90 max-w-xl text-purple-50">
                   העולם הפיננסי מחכה לך. בוא נשבור שיאים חדשים היום!
                </p>
             </div>
             <div className="hidden md:block">
               <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 flex flex-col items-center">
                 <div className="flex items-center gap-2 text-yellow-300 mb-1">
                   <Flame className="w-6 h-6 fill-yellow-300" />
                   <span className="font-bold text-2xl">{userStats.currentStreak}</span>
                 </div>
                 <span className="text-xs font-medium uppercase tracking-wider">ימי רצף</span>
               </div>
             </div>
          </div>
          <button 
            onClick={() => handleNavClick('lessons')}
            className="mt-8 bg-white text-purple-700 px-8 py-3 rounded-full font-bold shadow-lg shadow-purple-900/20 hover:bg-purple-50 hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            המשך ללמוד
          </button>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400 mix-blend-overlay opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500 mix-blend-overlay opacity-30 rounded-full blur-3xl"></div>
      </div>

      {/* Stats & Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Points Card */}
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
          <div className="p-4 bg-yellow-500/20 text-yellow-400 rounded-full ring-4 ring-yellow-500/10">
            <Coins className="w-8 h-8" />
          </div>
          <div className="text-3xl font-black text-white z-10">{userStats.points}</div>
          <div className="text-sm text-slate-400 font-medium z-10">נקודות שצברת</div>
        </div>
        
        {/* Progress Card */}
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
          <div className="p-4 bg-green-500/20 text-green-400 rounded-full ring-4 ring-green-500/10">
            <Award className="w-8 h-8" />
          </div>
          <div className="text-3xl font-black text-white z-10">{userStats.completedLessons.length}/{LESSONS.length}</div>
          <div className="text-sm text-slate-400 font-medium z-10">שיעורים הושלמו</div>
        </div>

        {/* Streak Mobile/Small Card */}
        <div className="md:hidden bg-slate-800/80 backdrop-blur border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"></div>
           <div className="p-4 bg-orange-500/20 text-orange-400 rounded-full ring-4 ring-orange-500/10">
             <Flame className="w-8 h-8 fill-orange-400/20" />
           </div>
           <div className="text-3xl font-black text-white z-10">{userStats.currentStreak}</div>
           <div className="text-sm text-slate-400 font-medium z-10">ימי רצף</div>
        </div>

        {/* Badges Preview */}
        <div className="md:col-span-1 bg-slate-800/80 backdrop-blur border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-400" />
            התגים שלי
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {BADGES.map(badge => {
              const isEarned = userStats.badges.includes(badge.id);
              return (
                <div 
                  key={badge.id}
                  className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    isEarned 
                      ? `bg-gradient-to-br ${badge.color} border-white/20 shadow-lg` 
                      : 'bg-slate-700/50 border-slate-600 grayscale opacity-40'
                  }`}
                  title={badge.name + (isEarned ? '' : ' (נעול)')}
                >
                  {getIcon(badge.icon, "w-8 h-8 text-white")}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* External Resources Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-400" />
          כלים וחדשות
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {EXTERNAL_LINKS.map(link => (
            <a 
              key={link.id}
              href={isOnline ? link.url : undefined}
              target={isOnline ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!isOnline) {
                  e.preventDefault();
                } else {
                  playSound('click');
                }
              }}
              className={`
                bg-slate-800 border border-slate-700 p-4 rounded-2xl flex flex-col items-center gap-3 text-center transition-all duration-300 
                relative overflow-hidden
                ${isOnline 
                  ? 'hover:bg-slate-750 hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/10 group cursor-pointer' 
                  : 'opacity-50 cursor-not-allowed grayscale'
                }
              `}
            >
              {isOnline && <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${link.color}`}></div>}
              <div className={`p-3 rounded-xl text-white shadow-lg ${link.color} ${isOnline ? 'group-hover:scale-110 group-hover:shadow-xl' : ''} transition-all duration-300 relative z-10`}>
                {getIcon(link.iconName, "w-6 h-6")}
              </div>
              <span className={`font-bold text-slate-200 text-sm relative z-10 ${isOnline ? 'group-hover:text-white' : ''} transition-colors`}>
                {link.title}
                {!isOnline && <span className="block text-[10px] font-normal text-slate-400 mt-1">(לא מקוון)</span>}
              </span>
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
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl opacity-30 group-focus-within:opacity-100 transition duration-300 blur"></div>
            <div className="relative flex items-center bg-slate-900 rounded-xl">
              <input 
                type="text" 
                placeholder="חפש שיעור..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-white px-4 py-3 pl-10 rounded-xl focus:outline-none border border-slate-700 placeholder-slate-500"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          <button
            onClick={() => { playSound('click'); setSelectedCategory('all'); }}
            className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all font-medium border ${
              selectedCategory === 'all'
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            הכל <span className="text-xs opacity-60 mr-1">({LESSONS.length})</span>
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { playSound('click'); setSelectedCategory(cat.id as Category); }}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all font-medium border flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 border-white shadow-lg'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${cat.color}`}></div>
              {cat.name}
              <span className="text-xs opacity-60 mr-1">({LESSONS.filter(l => l.category === cat.id).length})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => {
            const isCompleted = userStats.completedLessons.includes(lesson.id);
            const categoryColor = CATEGORIES.find(c => c.id === lesson.category)?.color || 'bg-gray-500';
            const isCopied = copiedLessonId === lesson.id;
            const isLoading = loadingLessonId === lesson.id;

            return (
              <div 
                key={lesson.id}
                onClick={() => !isLoading && handleOpenLesson(lesson)}
                onMouseEnter={() => playSound('hover')}
                className={`
                  bg-slate-800 border rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 relative overflow-hidden
                  ${isLoading ? 'scale-[0.98] ring-2 ring-blue-500/50' : ''}
                  ${isCompleted 
                    ? 'border-green-500/50 shadow-green-900/20 bg-green-900/10' 
                    : 'border-slate-700 hover:shadow-purple-500/10'}
                `}
              >
                {/* Loading Overlay on Card */}
                {isLoading && (
                   <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center">
                      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                   </div>
                )}

                {/* Card Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`p-3 rounded-xl ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-300 group-hover:bg-white group-hover:text-purple-600'} transition-colors duration-300`}>
                    {getIcon(lesson.iconName)}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => handleShare(e, lesson)}
                      className={`p-2 rounded-full transition-all duration-300 ${
                        isCopied 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'hover:bg-white/10 text-slate-400 hover:text-white'
                      }`}
                      title={isCopied ? "הועתק!" : "שתף שיעור"}
                    >
                      {isCopied ? <CheckCircle className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    {isCompleted && (
                      <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`h-1.5 w-8 rounded-full ${categoryColor}`}></span>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {CATEGORIES.find(c => c.id === lesson.category)?.name}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                    {lesson.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {lesson.description}
                  </p>

                  <div className="pt-4 flex items-center justify-between">
                    <div 
                      className="text-xs px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-400 cursor-help"
                      title={DIFFICULTY_TOOLTIPS[lesson.difficulty]}
                    >
                      רמה: {lesson.difficulty}
                    </div>
                    <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      התחל ללמוד
                      <span className="text-lg">←</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
            <Search className="w-16 h-16 mb-4 opacity-30" />
            <h3 className="text-xl font-bold text-slate-400 mb-2">לא נמצאו שיעורים</h3>
            <p className="text-sm">נסה לחפש מילה אחרת או שנה את הקטגוריה</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-20 selection:bg-purple-500/30">
      
      {/* Offline/Sync Banner */}
      {!isOnline && (
        <div className="bg-red-500/10 border-b border-red-500/20 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
           <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-right">
             <div className="flex items-center gap-3">
               <WifiOff className="w-5 h-5 text-red-400 shrink-0" />
               <div>
                 <p className="text-sm font-bold text-red-200">
                   {syncStatus === 'success' ? 'החיבור חזר!' : 'מצב לא מקוון'}
                 </p>
                 <p className="text-xs text-red-300/80">
                   {syncStatus === 'success' 
                      ? 'הנתונים מסתנכרנים...' 
                      : 'השיעורים שמורים במכשיר שלך. ניתן להמשיך ללמוד כרגיל.'}
                 </p>
               </div>
             </div>

             <div className="flex items-center gap-3 w-full md:w-auto">
               {syncMessage && (
                 <span className={`text-xs font-medium ${syncStatus === 'success' ? 'text-green-400' : 'text-red-300'}`}>
                   {syncMessage}
                 </span>
               )}
               <button 
                 onClick={handleManualSync}
                 disabled={isSyncing}
                 className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all w-full md:w-auto
                   ${isSyncing 
                     ? 'bg-slate-800 text-slate-400 cursor-wait' 
                     : 'bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:text-white border border-red-500/30'}
                 `}
               >
                 {isSyncing ? (
                   <>
                     <Loader2 className="w-3 h-3 animate-spin" />
                     מסנכרן...
                   </>
                 ) : (
                   <>
                     <RefreshCw className="w-3 h-3" />
                     סנכרן עכשיו
                   </>
                 )}
               </button>
             </div>
           </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* App Header (Mobile Only) */}
        <div className="md:hidden flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">FinKidz</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-white">{userStats.points}</span>
          </div>
        </div>

        {/* Desktop Sidebar / Header */}
        <header className="hidden md:flex justify-between items-center mb-8">
           <div className="flex items-center gap-3">
             <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
               <BookOpen className="text-white w-7 h-7" />
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-2xl text-white tracking-tight leading-none">FinKidz</span>
               <span className="text-sm text-slate-400 tracking-wide">חינוך פיננסי לדור הבא</span>
             </div>
           </div>

           <nav className="flex bg-slate-900/80 backdrop-blur p-1.5 rounded-2xl border border-slate-800">
             <button 
               onClick={() => handleNavClick('home')}
               className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${currentView === 'home' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
             >
               <Home className="w-4 h-4" />
               בית
             </button>
             <button 
               onClick={() => handleNavClick('lessons')}
               className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${currentView === 'lessons' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
             >
               <BookOpen className="w-4 h-4" />
               שיעורים
             </button>
           </nav>
        </header>

        {/* Content Area */}
        <main className="min-h-[60vh]">
          {currentView === 'home' ? renderHome() : renderLessons()}
        </main>
        
        {/* Footer */}
        <footer className="mt-20 border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <p>© 2025 Noam Gold AI. כל הזכויות שמורות.</p>
             <a 
               href="mailto:gold.noam@gmail.com" 
               className="flex items-center gap-2 hover:text-purple-400 transition-colors"
             >
               <Mail className="w-4 h-4" />
               שלח משוב: gold.noam@gmail.com
             </a>
           </div>
        </footer>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 p-4 pb-6 flex justify-around z-30">
        <button 
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-purple-400' : 'text-slate-500'}`}
        >
          <Home className={`w-6 h-6 ${currentView === 'home' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">בית</span>
        </button>
        <button 
          onClick={() => handleNavClick('lessons')}
          className={`flex flex-col items-center gap-1 ${currentView === 'lessons' ? 'text-purple-400' : 'text-slate-500'}`}
        >
          <BookOpen className={`w-6 h-6 ${currentView === 'lessons' ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">שיעורים</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500 opacity-50 cursor-not-allowed">
          <Settings className="w-6 h-6" />
          <span className="text-xs font-medium">הגדרות</span>
        </button>
      </div>

      {/* Lesson Modal */}
      <LessonModal 
        lesson={selectedLesson}
        isOpen={!!selectedLesson}
        isLoading={isLessonLoading}
        onClose={() => setSelectedLesson(null)}
        onComplete={handleLessonComplete}
        isCompleted={selectedLesson ? userStats.completedLessons.includes(selectedLesson.id) : false}
        nextLesson={nextLesson}
        onNext={() => {
          if (nextLesson) {
             handleOpenLesson(nextLesson);
          }
        }}
      />
    </div>
  );
}

export default App;