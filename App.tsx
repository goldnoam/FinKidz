import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, Home, Settings, Coins, Search, Mail, Flame, Award, ExternalLink, WifiOff, Globe } from 'lucide-react';
import LessonModal from './components/LessonModal';
import { LESSONS, CATEGORIES, BADGES, EXTERNAL_LINKS } from './constants';
import { Lesson, UserStats, Category, Badge } from './types';
import { getIcon } from './components/Icons';
import { playSound } from './utils/sounds';

function App() {
  // State
  const [currentView, setCurrentView] = useState<'home' | 'lessons'>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
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

  const filteredLessons = LESSONS.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesSearch = lesson.title.includes(searchQuery) || lesson.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const renderHome = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden ring-1 ring-white/10 group">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
             <div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">
                   היי אלוף הפיננסים! 👋
                </h1>
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
                  <Trophy className="w-8 h-8 text-white" />
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
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              className="bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-blue-500/50 p-4 rounded-2xl flex flex-col items-center gap-3 text-center transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/10 relative overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${link.color}`}></div>
              <div className={`p-3 rounded-xl text-white shadow-lg ${link.color} group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 relative z-10`}>
                {getIcon(link.iconName, "w-6 h-6")}
              </div>
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
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl opacity-30 group-focus-within:opacity-100 transition duration-300 blur"></div>
            <div className="relative flex items-center bg-slate-900 rounded-xl">
              <input 
                type="text" 
                placeholder="חפש שיעור..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white text-sm px-4 py-3 pr-10 focus:outline-none placeholder-slate-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute top-3.5 right-3" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <button 
            onClick={() => { playSound('click'); setSelectedCategory('all'); }}
            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-md ${
              selectedCategory === 'all' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-900/40 ring-2 ring-blue-400/30' 
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750 hover:text-white'
            }`}
          >
            הכל
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { playSound('click'); setSelectedCategory(cat.id as Category); }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-md ${
                selectedCategory === cat.id 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-purple-900/40 ring-2 ring-purple-400/30' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-750 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson, index) => (
            <div 
              key={lesson.id}
              onClick={() => { playSound('click'); setSelectedLesson(lesson); }}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
              className={`
                bg-slate-800/60 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-slate-700/50 
                hover:border-slate-500/50 hover:bg-slate-800/80 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]
                transition-all duration-300 cursor-pointer relative overflow-hidden group h-full flex flex-col 
                animate-in fade-in slide-in-from-bottom-8
              `}
            >
              {/* Dynamic colorful background blob */}
              <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br opacity-20 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-30
                ${lesson.category === 'basics' ? 'from-green-400 to-emerald-600' : 
                  lesson.category === 'banking' ? 'from-blue-400 to-indigo-600' : 
                  'from-purple-400 to-pink-600'}`} 
              />
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3.5 rounded-2xl shadow-inner ${
                  userStats.completedLessons.includes(lesson.id) 
                    ? 'bg-green-500/20 text-green-400 ring-1 ring-green-500/30' 
                    : 'bg-slate-900/50 text-slate-300 ring-1 ring-white/10'
                }`}>
                  {getIcon(lesson.iconName)}
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold tracking-wide border shadow-sm ${
                  lesson.difficulty === 'מתחיל' ? 'border-green-500/30 text-green-300 bg-green-500/10' :
                  lesson.difficulty === 'מתקדם' ? 'border-yellow-500/30 text-yellow-300 bg-yellow-500/10' :
                  'border-red-500/30 text-red-300 bg-red-500/10'
                }`}>
                  {lesson.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{lesson.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 relative z-10">{lesson.description}</p>
              
              <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between text-sm relative z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound('click');
                    setSelectedLesson(lesson);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-blue-500/40 flex items-center gap-2 group/btn"
                >
                  למד עוד
                  <span className="group-hover/btn:-translate-x-1 transition-transform">←</span>
                </button>
                {userStats.completedLessons.includes(lesson.id) && (
                  <span className="flex items-center gap-1.5 text-green-400 font-bold bg-green-900/20 px-2 py-1 rounded-lg">
                    <Trophy className="w-3.5 h-3.5" />
                    הושלם
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="bg-slate-800/50 inline-block p-6 rounded-full mb-4">
               <Search className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-300">לא נמצאו שיעורים</h3>
            <p className="text-slate-500 mt-2">נסה לחפש מילה אחרת או שנה את הקטגוריה</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 pb-24 md:pb-0 font-sans selection:bg-pink-500/30 selection:text-pink-200">
      
      {/* Desktop Sidebar / Mobile Topbar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen">
        
        {/* Navigation Sidebar (Desktop) */}
        <div className="hidden md:flex flex-col w-72 bg-[#0f1422] border-l border-slate-800 h-screen sticky top-0 p-6 z-20 shadow-2xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-blue-900/20">
              <Settings className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">FinKidz</span>
          </div>

          <nav className="space-y-3 flex-1">
            <button 
              onClick={() => handleNavClick('home')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                currentView === 'home' 
                  ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-400 font-bold border border-blue-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Home className={`w-5 h-5 ${currentView === 'home' ? 'text-blue-500' : 'group-hover:text-slate-300'}`} />
              דף הבית
            </button>
            <button 
              onClick={() => handleNavClick('lessons')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                currentView === 'lessons' 
                  ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-400 font-bold border border-blue-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <BookOpen className={`w-5 h-5 ${currentView === 'lessons' ? 'text-blue-500' : 'group-hover:text-slate-300'}`} />
              שיעורים
            </button>
            
            {/* Offline Indicator in Menu */}
            {!isOnline && (
              <div className="mt-4 px-4 py-3 bg-red-900/20 border border-red-900/50 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <WifiOff className="w-4 h-4" />
                <span>מצב לא מקוון</span>
              </div>
            )}
            
            {/* Offline Capable Note */}
            <div className="mt-2 px-4 py-2 text-xs text-slate-500 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               השיעורים זמינים גם ללא אינטרנט
            </div>
          </nav>

          {/* Footer Desktop */}
          <div className="mt-8 mb-6 text-xs text-slate-500 space-y-3 border-t border-slate-800/50 pt-6">
            <p className="font-medium">(C) Noam Gold AI 2025</p>
            <a href="mailto:gold.noam@gmail.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
              <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              שלח משוב
            </a>
            <div className="text-[10px] text-slate-600 bg-slate-900/50 p-2 rounded-lg break-all border border-slate-800">gold.noam@gmail.com</div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-5 rounded-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl -mr-5 -mt-5"></div>
            <div className="text-xs text-slate-400 mb-1 relative z-10">הנקודות שלי</div>
            <div className="text-3xl font-black flex items-center gap-2 relative z-10">
              <Coins className="text-yellow-400 w-6 h-6 fill-yellow-400" />
              {userStats.points}
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden bg-[#0f1422]/95 backdrop-blur-md border-b border-slate-800 p-4 sticky top-0 z-30 shadow-lg flex items-center justify-between">
          <div className="font-bold text-xl text-white flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-1.5 rounded-lg">
               <Settings className="w-5 h-5" />
            </div>
            FinKidz
          </div>
          <div className="flex items-center gap-2">
            {!isOnline && <WifiOff className="w-4 h-4 text-red-400" />}
            <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 text-white shadow-sm">
              <Coins className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {userStats.points}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-10 max-w-6xl mx-auto w-full">
          {currentView === 'home' && renderHome()}
          {currentView === 'lessons' && renderLessons()}

          {/* Footer Mobile */}
          <div className="md:hidden mt-16 text-center text-xs text-slate-500 space-y-3 pb-8 border-t border-slate-800 pt-8">
            <p className="font-medium text-slate-400">(C) Noam Gold AI 2025</p>
            <div className="flex justify-center items-center gap-2 text-slate-600">
               <Mail className="w-3.5 h-3.5" />
               <span>gold.noam@gmail.com</span>
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f1422]/95 backdrop-blur-lg border-t border-slate-800 p-2 z-30 flex justify-around shadow-[0_-4px_20px_-1px_rgba(0,0,0,0.3)] safe-area-bottom">
           <button 
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center p-2 rounded-xl w-24 transition-colors ${currentView === 'home' ? 'text-blue-400' : 'text-slate-500'}`}
          >
            <Home className={`w-6 h-6 mb-1 ${currentView === 'home' ? 'fill-blue-400/20' : ''}`} />
            <span className="text-[10px] font-bold">בית</span>
          </button>
           <button 
            onClick={() => handleNavClick('lessons')}
            className={`flex flex-col items-center p-2 rounded-xl w-24 transition-colors ${currentView === 'lessons' ? 'text-blue-400' : 'text-slate-500'}`}
          >
            <BookOpen className={`w-6 h-6 mb-1 ${currentView === 'lessons' ? 'fill-blue-400/20' : ''}`} />
            <span className="text-[10px] font-bold">למידה</span>
          </button>
        </div>

      </div>

      {/* Modals */}
      <LessonModal 
        lesson={selectedLesson}
        isOpen={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        onComplete={handleLessonComplete}
        isCompleted={selectedLesson ? userStats.completedLessons.includes(selectedLesson.id) : false}
      />
    </div>
  );
}

export default App;