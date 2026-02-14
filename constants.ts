
import { Lesson, Badge, ResourceLink, Language } from './types';

export const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  he: {
    siteTitle: 'FinKidz - חינוך פיננסי לדור הבא',
    heroTitle: 'השקעות לקטנטנים',
    heroSubtitle: 'חינוך פיננסי לגיל הצעיר',
    home: 'בית',
    lessons: 'שיעורים',
    game: 'מרוץ החיסכון',
    points: 'נקודות',
    completed: 'הושלם',
    learnMore: 'למד עוד',
    nextLesson: 'השיעור הבא:',
    finishLesson: 'סיימתי ללמוד ✓',
    streak: 'ימי רצף',
    search: 'חפש שיעור...',
    feedback: 'שלח משוב',
    all: 'הכל',
    favorites: 'מועדפים',
    cat_starter: 'צעדים ראשונים',
    cat_basics: 'הבסיס',
    cat_banking: 'בנקים וכלכלה',
    cat_investing: 'השקעות',
    cat_advanced: 'מתקדם'
  },
  en: {
    siteTitle: 'FinKidz - Financial Education',
    heroTitle: 'Investments for Kids',
    heroSubtitle: 'Financial Education for the Young Generation',
    home: 'Home',
    lessons: 'Lessons',
    game: 'Saving Race',
    points: 'Points',
    completed: 'Completed',
    learnMore: 'Learn More',
    nextLesson: 'Next Lesson:',
    finishLesson: 'Finish Lesson ✓',
    streak: 'Streak',
    search: 'Search lesson...',
    feedback: 'Feedback',
    all: 'All',
    favorites: 'Favorites',
    cat_starter: 'First Steps',
    cat_basics: 'Basics',
    cat_banking: 'Banking',
    cat_investing: 'Investing',
    cat_advanced: 'Advanced'
  },
  zh: { home: '首页', lessons: '课程', siteTitle: 'FinKidz', heroTitle: '儿童理财', heroSubtitle: '年轻一代的金融教育' },
  hi: { home: 'होम', lessons: 'पाठ', siteTitle: 'FinKidz', heroTitle: 'बच्चों के लिए निवेश', heroSubtitle: 'युවා पीढ़ी के लिए वित्तीय शिक्षा' },
  de: { home: 'Startseite', lessons: 'Lektionen', siteTitle: 'FinKidz', heroTitle: 'Investitionen für Kinder', heroSubtitle: 'Finanzielle Bildung für die junge Generation' },
  es: { home: 'Inicio', lessons: 'Lecciones', siteTitle: 'FinKidz', heroTitle: 'Inversiones para Niños', heroSubtitle: 'Educación Financiera para la Generation Joven' },
  fr: { home: 'Accueil', lessons: 'Leçons', siteTitle: 'FinKidz', heroTitle: 'Investissements pour Enfants', heroSubtitle: 'Éducation financière pour la jeune génération' }
};

export const LESSONS: Lesson[] = [
  {
    id: 'what-is-money',
    title: 'מה זה בכלל כסף?',
    description: 'לפני הכל - מאיפה הכסף הגיע ולמה אנחנו צריכים אותו?',
    category: 'starter',
    difficulty: 'מתחיל',
    iconName: 'money',
    content: `
      <p>פעם, לפני הרבה שנים, לא היה כסף. אם מישהו רצה תפוח ומישהו אחר רצה ביצה, הם היו פשוט מחליפים ביניהם. זה נקרא <strong>סחר חליפין</strong>.</p>
      <p>אבל מה קורה אם אני רוצה תפוח, אבל למוכר התפוחים יש כבר המון ביצים? כאן הכסף נכנס לתמונה!</p>
      <h3>למה כסף טוב?</h3>
      <ul class="list-disc list-inside space-y-2">
        <li>הוא מאפשר לנו לקנות מה שאנחנו צריכים.</li>
        <li>קל לשמור אותו בכיס או בבנק.</li>
        <li>כולם מסכימים כמה הוא שווה.</li>
      </ul>
    `,
    translations: {
      en: {
        title: 'What is Money Anyway?',
        description: 'First things first - where did money come from and why do we need it?',
        content: '<p>Long ago, there was no money. People used to swap things. This was called bartering. Money was invented to make trading easier!</p>'
      }
    }
  },
  {
    id: 'piggy-bank-secrets',
    title: 'סודות קופת החיסכון',
    description: 'למה כדאי לשמור כסף במקום לבזבז אותו מיד?',
    category: 'starter',
    difficulty: 'מתחיל',
    iconName: 'savings',
    content: `
      <h3>מה זה חיסכון?</h3>
      <p>חיסכון הוא כסף שאנחנו מחליטים <strong>לא לבזבז</strong> עכשיו, כדי שנוכל להשתמש בו למשהו גדול וחשוב יותר בעתיד.</p>
      <div class="my-4 bg-indigo-900/40 p-4 rounded-xl border border-indigo-500/30">
        <p>דמיינו שאתם מקבלים 10 שקלים. אם תקנו סוכריה ב-10 שקלים, הכסף נעלם. אם תשימו אותו בקופה, ובכל שבוע תשימו עוד 10 שקלים, אחרי חודשיים תוכלו לקנות משחק שרציתם המון זמן!</p>
      </div>
      <h3>למה לחסוך?</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>מטרה גדולה:</strong> לקנות אופניים, מחשב או מתנה מיוחדת.</li>
        <li><strong>ביטחון:</strong> שיהיה כסף אם משהו יתקלקל ונצטרך לתקן אותו.</li>
        <li><strong>חופש:</strong> כשיש חיסכון, אתם יכולים לבחור מה לעשות איתו אחר כך.</li>
      </ul>
    `,
    translations: {
      en: {
        title: 'Piggy Bank Secrets',
        description: 'Why save money instead of spending it all at once?',
        content: '<p>Saving is choosing not to spend money now so you can have it for something more important later.</p>'
      }
    }
  },
  {
    id: 'income-expense',
    title: 'הכנסות והוצאות',
    description: 'הבסיס לכל ארנק: מה נכנס ומה יוצא?',
    category: 'basics',
    difficulty: 'מתחיל',
    iconName: 'money',
    content: `
      <p><strong>הכנסה</strong> היא כל כסף שאנחנו מקבלים. למשל: דמי כיס, מתנה מסבתא, או משכורת מעבודה.</p>
      <p><strong>הוצאה</strong> היא כסף שאנחנו משלמים כדי לקנות דברים. למשל: לקנות משחק מחשב, פיצה או בגדים.</p>
      <br>
      <h3>המשוואה הפשוטה:</h3>
      <p>אם ההוצאות שלנו גדולות מההכנסות, אנחנו במינוס (חוב).<br>
      אם ההכנסות גדולות מההוצאות, נשאר לנו <strong>חיסכון</strong>!</p>
    `,
    translations: {
      en: {
        title: 'Income and Expenses',
        description: 'The foundation of every wallet: what comes in and what goes out?',
        content: '<p><strong>Income</strong> is any money we receive. <strong>Expenses</strong> are the money we pay for things.</p>'
      }
    }
  },
  {
    id: 'budget',
    title: 'תכנון תקציב חכם',
    description: 'איך לתכנן מראש כדי שיהיה לנו כסף למה שאנחנו באמת רוצים.',
    category: 'basics',
    difficulty: 'מתחיל',
    iconName: 'budget',
    content: `
      <p>תקציב הוא בעצם <strong>תוכנית פעולה</strong> לכסף שלנו.</p>
      <p>במקום סתם לבזבז ולקוות שנשאר משהו, אנחנו מחליטים מראש כמה כסף נקצה לכל דבר.</p>
      <br>
      <ul class="list-disc list-inside space-y-2">
        <li>כמה נשמור לחיסכון?</li>
        <li>כמה נוציא על בילויים?</li>
        <li>כמה נשמור למקרה חירום?</li>
      </ul>
    `,
    translations: {
      en: {
        title: 'Smart Budgeting',
        description: 'How to plan ahead so we have money for what we really want.',
        content: '<p>A budget is an action plan for your money. Instead of just spending, you decide in advance where your money goes.</p>'
      }
    }
  },
  {
    id: 'unemployment',
    title: 'עולם העבודה',
    description: 'מה זה אומר לעבוד, ולמה כדאי ללמוד מקצוע?',
    category: 'basics',
    difficulty: 'מתחיל',
    iconName: 'goals',
    content: `
      <h3>למה אנשים עובדים?</h3>
      <p>רוב האנשים עובדים כדי לקבל <strong>שכר</strong> (כסף) שמאפשר להם לקנות אוכל, לשלם על הבית ולצאת לחופשות.</p>
      <h3>מהי אבטלה?</h3>
      <p>מצב שבו אדם רוצה לעבוד ומחפש עבודה, אך לא מוצא. כשיש פחות אבטלה, הכלכלה של המדינה חזקה יותר.</p>
      <br>
      <p class="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500 italic">"לימודים עוזרים לנו למצוא עבודה מעניינת שמרוויחים בה יותר!"</p>
    `,
    translations: {
      en: {
        title: 'The World of Work',
        description: 'What it means to work, and why it\'s good to learn a profession.',
        content: `
          <h3>Why do people work?</h3>
          <p>Most people work to earn a salary, which allows them to pay for their needs and wants.</p>
          <h3>Education and Work</h3>
          <p>Learning new skills usually helps people find better-paying and more interesting jobs.</p>
        `
      }
    }
  },
  {
    id: 'inflation',
    title: 'אינפלציה: למה המחירים עולים?',
    description: 'למה שוקולד שעלה פעם שקל עולה היום חמישה?',
    category: 'basics',
    difficulty: 'מתקדם',
    iconName: 'chart',
    content: `
      <h3>מהי אינפלציה?</h3>
      <p>אינפלציה היא מצב שבו המחירים של כמעט הכל עולים לאט לאט. זה אומר שעם אותו שקל, אפשר לקנות פחות דברים מבעבר.</p>
      
      <div class="my-6 not-prose bg-slate-800 p-4 rounded-xl border border-slate-700">
        <h4 class="text-blue-400 font-bold mb-3 text-center">כוח הקנייה של 100 ש"ח לאורך זמן</h4>
        <div class="h-40 flex items-end gap-4 justify-around px-2">
          <div class="flex flex-col items-center gap-1 w-full max-w-[50px]">
            <div class="bg-green-500 w-full h-[90%] rounded-t-md opacity-90 relative group">
              <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">100%</span>
            </div>
            <span class="text-[10px] font-bold text-slate-400 mt-1">1990</span>
          </div>
          <div class="flex flex-col items-center gap-1 w-full max-w-[50px]">
            <div class="bg-yellow-500 w-full h-[65%] rounded-t-md opacity-90 relative">
               <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">72%</span>
            </div>
            <span class="text-[10px] font-bold text-slate-400 mt-1">2005</span>
          </div>
          <div class="flex flex-col items-center gap-1 w-full max-w-[50px]">
            <div class="bg-orange-500 w-full h-[45%] rounded-t-md opacity-90 relative">
               <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">50%</span>
            </div>
            <span class="text-[10px] font-bold text-slate-400 mt-1">2015</span>
          </div>
          <div class="flex flex-col items-center gap-1 w-full max-w-[50px]">
            <div class="bg-red-500 w-full h-[30%] rounded-t-md animate-pulse relative">
               <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold">35%</span>
            </div>
            <span class="text-[10px] font-bold text-slate-400 mt-1">היום</span>
          </div>
        </div>
        <p class="text-[11px] text-center text-slate-500 mt-4 italic">הגרף ממחיש כמה מוצרים ניתן לקנות באותם 100 שקלים ככל שהמחירים עולים.</p>
      </div>
    `,
    translations: {
      en: {
        title: 'Inflation: Why Prices Rise',
        description: 'Why does chocolate cost more today than it used to?',
        content: `
          <h3>What is Inflation?</h3>
          <p>Inflation is when prices for most things go up slowly. It means your money has less "purchasing power" over time.</p>
        `
      }
    }
  },
  {
    id: 'cpi',
    title: 'המדד לצרכן',
    description: 'איך המדינה מודדת אם הכל מתייקר? הכירו את "הסל" שלנו.',
    category: 'basics',
    difficulty: 'מתקדם',
    iconName: 'chart',
    content: `
      <p>המדד בודק כמה עולה "סל מוצרים" ממוצע של משפחה בישראל. אם מחיר הסל עולה - יש <strong>אינפלציה</strong>.</p>
      
      <div class="bg-slate-800 p-4 rounded-xl my-4 border border-slate-700 shadow-inner">
        <h4 class="text-indigo-400 font-bold mb-3 text-center">מה יש בתוך "סל המדד"?</h4>
        <div class="grid grid-cols-4 gap-3 text-center">
          <div class="flex flex-col items-center"><span class="text-3xl mb-1">🏠</span><span class="text-[10px]">דיור</span></div>
          <div class="flex flex-col items-center"><span class="text-3xl mb-1">🍕</span><span class="text-[10px]">מזון</span></div>
          <div class="flex flex-col items-center"><span class="text-3xl mb-1">🚌</span><span class="text-[10px]">תחבורה</span></div>
          <div class="flex flex-col items-center"><span class="text-3xl mb-1">🎭</span><span class="text-[10px]">תרבות</span></div>
        </div>
      </div>
    `,
    translations: {
      en: {
        title: 'The Price Index',
        description: 'How do we measure if prices are going up? Meet our "Basket".',
        content: `<p>The CPI measures the average price of a "basket of goods". If it goes up, we have inflation.</p>`
      }
    }
  },
  {
    id: 'forex',
    title: 'מטבע חוץ (מט"ח)',
    description: 'דולר, אירו או שקל? איך מחליטים כמה שווה כל מטבע.',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'exchange',
    content: `
      <h3>מה זה מט"ח?</h3>
      <p>אלו מטבעות של מדינות אחרות. כשאנחנו טסים לחו"ל, אנחנו צריכים להחליף את השקלים שלנו במטבע המקומי.</p>
      <br>
      <div class="flex justify-center gap-6 text-4xl my-4">
        <span>💵</span><span>↔️</span><span>₪</span>
      </div>
      <h3>שער החליפין</h3>
      <p>זהו המחיר של מטבע אחד במונחים של מטבע אחר. השער משתנה כל הזמן לפי הביקוש וההיצע בעולם. אם כולם רוצים שקלים, השקל מתחזק!</p>
    `,
    translations: {
      en: {
        title: 'Foreign Exchange (Forex)',
        description: 'Dollar, Euro or Shekel? How currency values are determined.',
        content: `
          <h3>What is Forex?</h3>
          <p>Forex stands for Foreign Exchange. It is the global market where currencies are traded.</p>
        `
      }
    }
  },
  {
    id: 'bonds',
    title: 'אגרות חוב (אג"ח)',
    description: 'להלוות כסף לממשלה ולקבל עליו ריבית. הכירו את ההשקעה הסולידית.',
    category: 'investing',
    difficulty: 'מומחה',
    iconName: 'safe',
    content: `
      <h3>מה זה אג"ח?</h3>
      <p>זו בעצם "תעודת התחייבות". כשאתם קונים אג"ח, אתם מלווים כסף למי שהנפיק אותה (מדינה או חברה).</p>
      <br>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>הלווה:</strong> המדינה או החברה שמקבלת את הכסף.</li>
        <li><strong>המלווה:</strong> אתם!</li>
        <li><strong>התמורה:</strong> ריבית קבועה מראש לאורך זמן.</li>
      </ul>
      <p>בסוף התקופה, הלווה מחזיר לכם את כל סכום ההלוואה המקורי פלוס הריבית שנצברה.</p>
    `,
    translations: {
      en: {
        title: 'Bonds',
        description: 'Lending money to the government or companies.',
        content: `
          <h3>What is a Bond?</h3>
          <p>A bond is like a loan that you provide to a government or a corporation. In return, they pay you interest over time.</p>
        `
      }
    }
  },
  {
    id: 'stock-market',
    title: 'הבורסה',
    description: 'הסופרמרקט של החברות הגדולות.',
    category: 'investing',
    difficulty: 'מתקדם',
    iconName: 'investing',
    content: `
      <p>הבורסה היא מקום שבו אנשים יכולים לקנות ולמכור חלקים קטנים מחברות. חלק קטן כזה נקרא <strong>מניה</strong>.</p>
      <p>אם החברה מצליחה ומרוויחה, ערך המניה עולה. אם החברה נכשלת, ערך המניה יורד ואפשר להפסיד כסף.</p>
    `,
    translations: {
      en: {
        title: 'The Stock Market',
        description: 'The supermarket for big companies.',
        content: '<p>The stock market is a place where shares of public companies are issued and traded.</p>'
      }
    }
  }
];

export const CATEGORIES = [
  { id: 'starter', translationKey: 'cat_starter', color: 'bg-emerald-500' },
  { id: 'basics', translationKey: 'cat_basics', color: 'bg-green-500' },
  { id: 'banking', translationKey: 'cat_banking', color: 'bg-blue-500' },
  { id: 'investing', translationKey: 'cat_investing', color: 'bg-purple-500' },
  { id: 'advanced', translationKey: 'cat_advanced', color: 'bg-indigo-500' },
];

export const BADGES: Badge[] = [
  {
    id: 'first_step',
    name: 'צעד ראשון',
    description: 'סיימת את השיעור הראשון שלך!',
    icon: 'target',
    color: 'from-blue-400 to-cyan-400',
    condition: (stats) => stats.completedLessons.length >= 1
  },
  {
    id: 'knowledge_seeker',
    name: 'חוקר פיננסי',
    description: 'סיימת 3 שיעורים',
    icon: 'book',
    color: 'from-purple-400 to-pink-400',
    condition: (stats) => stats.completedLessons.length >= 3
  },
  {
    id: 'expert',
    name: 'מומחה עולמי',
    description: 'סיימת את כל השיעורים!',
    icon: 'trophy',
    color: 'from-yellow-400 to-orange-500',
    condition: (stats) => stats.completedLessons.length === LESSONS.length
  },
  {
    id: 'streak_3',
    name: 'על הגל',
    description: 'למדת 3 ימים ברציפות',
    icon: 'flame',
    color: 'from-red-500 to-orange-500',
    condition: (stats) => stats.currentStreak >= 3
  }
];

export const EXTERNAL_LINKS: ResourceLink[] = [
  {
    id: 'boi',
    title: 'בנק ישראל – האתר הרשמי',
    url: 'https://www.boi.org.il/',
    iconName: 'bank',
    category: 'tools',
    color: 'bg-blue-800'
  },
  {
    id: 'calcalist',
    title: 'כלכליסט (Calcalist)',
    url: 'https://www.calcalist.co.il/',
    iconName: 'news',
    category: 'news',
    color: 'bg-red-600'
  },
  {
    id: 'globes',
    title: 'גלובס (Globes)',
    url: 'https://www.globes.co.il/',
    iconName: 'news',
    category: 'news',
    color: 'bg-orange-600'
  },
  {
    id: 'themarker',
    title: 'דה מרקר (TheMarker)',
    url: 'https://www.themarker.com/',
    iconName: 'news',
    category: 'news',
    color: 'bg-green-700'
  },
  {
    id: 'bizportal',
    title: 'ביזפורטל (Bizportal)',
    url: 'https://www.bizportal.co.il/',
    iconName: 'chart',
    category: 'news',
    color: 'bg-blue-600'
  },
  {
    id: 'kessef-katan',
    title: 'כסף קטן - בנק ישראל',
    url: 'https://www.boi.org.il/information/community-relations/small-moneyar/',
    iconName: 'savings',
    category: 'tools',
    color: 'bg-pink-500'
  }
];
