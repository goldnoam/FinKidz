
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
    cat_basics: 'Basics',
    cat_banking: 'Banking',
    cat_investing: 'Investing',
    cat_advanced: 'Advanced'
  },
  zh: { home: '首页', lessons: '课程', siteTitle: 'FinKidz', heroTitle: '儿童理财', heroSubtitle: '年轻一代的金融教育' },
  hi: { home: 'होम', lessons: 'पाठ', siteTitle: 'FinKidz', heroTitle: 'बच्चों के लिए निवेश', heroSubtitle: 'युवा पीढ़ी के लिए वित्तीय शिक्षा' },
  de: { home: 'Startseite', lessons: 'Lektionen', siteTitle: 'FinKidz', heroTitle: 'Investitionen für Kinder', heroSubtitle: 'Finanzielle Bildung für die junge Generation' },
  es: { home: 'Inicio', lessons: 'Lecciones', siteTitle: 'FinKidz', heroTitle: 'Inversiones para Niños', heroSubtitle: 'Educación Financiera para la Generation Joven' },
  fr: { home: 'Accueil', lessons: 'Leçons', siteTitle: 'FinKidz', heroTitle: 'Investissements pour Enfants', heroSubtitle: 'Éducation financière pour la jeune génération' }
};

export const LESSONS: Lesson[] = [
  {
    id: 'income-expense',
    title: 'הכנסות והוצאות',
    description: 'מה ההבדל בין כסף שנכנס לכסף שיוצא, ואיך מנהלים את זה?',
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
        description: 'What is the difference between money coming in and money going out?',
        content: '<p><strong>Income</strong> is any money we receive. <strong>Expenses</strong> are the money we pay for things.</p>'
      }
    }
  },
  {
    id: 'inflation',
    title: 'אינפלציה: הכוח שמשנה מחירים',
    description: 'למה מה שקנינו בשקל פעם עולה היום חמישה? בואו נלמד על אינפלציה.',
    category: 'basics',
    difficulty: 'מתקדם',
    iconName: 'chart',
    content: `
      <h3>מהי אינפלציה?</h3>
      <p>אינפלציה היא עלייה מתמשכת במחירים של מוצרים ושירותים. כשיש אינפלציה, הכוח של הכסף שלנו לקנות דברים (כוח הקנייה) יורד.</p>
      <br>
      <h3>איך מודדים אותה?</h3>
      <p>המדד המפורסם ביותר הוא <strong>מדד המחירים לצרכן (CPI)</strong>. המדינה בודקת "סל" של מוצרים ושירותים שמשפחה ממוצעת צורכת (אוכל, דיור, בגדים) ובודקת כמה הוא התייקר.</p>
      <br>
      <h3>השפעות האינפלציה:</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>עליית מחירים:</strong> הכל נהיה יקר יותר.</li>
        <li><strong>שחיקת חסכונות:</strong> אם הכסף "שוכב" בבנק בלי להרוויח ריבית, הוא שווה פחות.</li>
        <li><strong>שינוי בריביות:</strong> הבנקים המרכזיים מעלים ריבית כדי להילחם באינפלציה גבוהה.</li>
      </ul>
    `,
    translations: {
      en: {
        title: 'Inflation: The Force Behind Rising Prices',
        description: 'Why do things cost more today than they did years ago? Let\'s learn about inflation.',
        content: `
          <h3>What is Inflation?</h3>
          <p>Inflation is the general increase in prices and fall in the purchasing value of money. When inflation occurs, each unit of currency buys fewer goods and services.</p>
          <br>
          <h3>How is it measured?</h3>
          <p>Economists use the <strong>Consumer Price Index (CPI)</strong>. This index tracks the price of a "basket" of common goods and services like housing, food, and transportation.</p>
          <br>
          <h3>Effects of Inflation:</h3>
          <ul class="list-disc list-inside space-y-2">
            <li><strong>Rising Prices:</strong> Goods and services become more expensive over time.</li>
            <li><strong>Erosion of Savings:</strong> If your money doesn't grow faster than inflation, you lose purchasing power.</li>
            <li><strong>Interest Rates:</strong> Central banks often raise interest rates to control high inflation.</li>
          </ul>
        `
      }
    }
  },
  {
    id: 'cpi',
    title: 'מדד המחירים לצרכן',
    description: 'איך המדינה מודדת אם הכל מתייקר? הכירו את "הסל" של כולנו.',
    category: 'basics',
    difficulty: 'מתקדם',
    iconName: 'chart',
    content: `
      <p>המדד בודק כמה עולה "סל מוצרים" ממוצע של משפחה. אם מחיר הסל עולה - יש <strong>אינפלציה</strong>.</p>
      
      <div class="bg-slate-800 p-4 rounded-xl my-4 border border-slate-700 shadow-inner">
        <h4 class="text-indigo-400 font-bold mb-3 text-center">מה יש בתוך "סל המדד"?</h4>
        <div class="grid grid-cols-4 gap-3 text-center">
          <div class="flex flex-col items-center"><span class="text-3xl mb-1">🏠</span><span class="text-[10px]">דיור</span></div>
          <div class="flex flex-col items-center"><span class="text-3xl mb-1">🍕</span><span class="text-[10px]">מזון</span></div>
          <div class="flex flex-col items-center"><span class="text-3xl mb-1">🚌</span><span class="text-[10px]">תחבורה</span></div>
          <div class="flex flex-col items-center"><span class="text-3xl mb-1">🎭</span><span class="text-[10px]">תרבות</span></div>
        </div>
      </div>

      <h3>למה זה חשוב?</h3>
      <p>כשהמדד עולה, הכסף שלנו "שווה פחות" כי אפשר לקנות איתו פחות דברים מאותו סל.</p>
      
      <div class="mt-6">
        <h4 class="text-blue-400 font-bold mb-2">שינוי המדד לאורך זמן (דוגמה):</h4>
        <div class="h-32 flex items-end gap-2 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div class="flex-1 flex flex-col items-center gap-1">
            <div class="bg-indigo-500 w-full h-[30%] rounded-t-md opacity-60"></div>
            <span class="text-[9px]">2021</span>
          </div>
          <div class="flex-1 flex flex-col items-center gap-1">
            <div class="bg-indigo-500 w-full h-[65%] rounded-t-md opacity-80"></div>
            <span class="text-[9px]">2022</span>
          </div>
          <div class="flex-1 flex flex-col items-center gap-1">
            <div class="bg-indigo-500 w-full h-[45%] rounded-t-md"></div>
            <span class="text-[9px]">2023</span>
          </div>
          <div class="flex-1 flex flex-col items-center gap-1">
            <div class="bg-pink-500 w-full h-[85%] rounded-t-md animate-pulse"></div>
            <span class="text-[9px]">היום</span>
          </div>
        </div>
      </div>
    `,
    translations: {
      en: {
        title: 'Consumer Price Index (CPI)',
        description: 'How do we measure if prices are going up? Meet the national "Basket".',
        content: `
          <p>The CPI measures the average price of a "basket of goods". If prices go up, it is called <strong>inflation</strong>.</p>
          <div class="bg-slate-800 p-4 rounded-xl my-4 border border-slate-700 shadow-inner">
            <h4 class="text-indigo-400 font-bold mb-3 text-center">What is inside the "CPI Basket"?</h4>
            <div class="grid grid-cols-4 gap-3 text-center">
              <div class="flex flex-col items-center"><span class="text-3xl mb-1">🏠</span><span class="text-[10px]">Housing</span></div>
              <div class="flex flex-col items-center"><span class="text-3xl mb-1">🍕</span><span class="text-[10px]">Food</span></div>
              <div class="flex flex-col items-center"><span class="text-3xl mb-1">🚌</span><span class="text-[10px]">Transport</span></div>
              <div class="flex flex-col items-center"><span class="text-3xl mb-1">🎭</span><span class="text-[10px]">Culture</span></div>
            </div>
          </div>
          <h3>Historical Changes (Example):</h3>
          <div class="h-32 flex items-end gap-2 bg-slate-800/50 p-4 rounded-lg border border-slate-700 mt-4">
            <div class="flex-1 flex flex-col items-center gap-1"><div class="bg-indigo-500 w-full h-[30%] rounded-t-md"></div><span class="text-[9px]">2021</span></div>
            <div class="flex-1 flex flex-col items-center gap-1"><div class="bg-indigo-500 w-full h-[65%] rounded-t-md"></div><span class="text-[9px]">2022</span></div>
            <div class="flex-1 flex flex-col items-center gap-1"><div class="bg-indigo-500 w-full h-[45%] rounded-t-md"></div><span class="text-[9px]">2023</span></div>
            <div class="flex-1 flex flex-col items-center gap-1"><div class="bg-pink-500 w-full h-[85%] rounded-t-md"></div><span class="text-[9px]">Now</span></div>
          </div>
        `
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
          <div class="flex justify-center gap-6 text-4xl my-4">
            <span>💵</span><span>↔️</span><span>💷</span>
          </div>
          <h3>The Exchange Rate</h3>
          <p>The exchange rate is the price of one currency in terms of another. It fluctuates based on supply and demand.</p>
        `
      }
    }
  },
  {
    id: 'unemployment',
    title: 'תעסוקה ואבטלה',
    description: 'מה זה אומר לעבוד, ומה קורה כשאנשים לא מוצאים עבודה?',
    category: 'basics',
    difficulty: 'מתחיל',
    iconName: 'goals',
    content: `
      <h3>כוח העבודה</h3>
      <p>אלו כל האנשים בגיל העבודה שרוצים ויכולים לעבוד.</p>
      <h3>מהי אבטלה?</h3>
      <p>מצב שבו אדם רוצה לעבוד ומחפש עבודה, אך לא מוצא. אחוז האבטלה הוא מדד חשוב לבריאות של הכלכלה.</p>
      <br>
      <p class="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500 italic">"כשיש הרבה עבודה, לאנשים יש כסף לבזבז, והעסקים צומחים!"</p>
    `,
    translations: {
      en: {
        title: 'Employment & Unemployment',
        description: 'What it means to work, and what happens when people cannot find jobs.',
        content: `
          <h3>Labor Force</h3>
          <p>The labor force includes everyone who is working or actively looking for a job.</p>
          <h3>What is Unemployment?</h3>
          <p>Unemployment occurs when someone wants a job but cannot find one. High unemployment is usually a sign of a struggling economy.</p>
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
        description: 'Lending money to the government or companies. A solid investment tool.',
        content: `
          <h3>What is a Bond?</h3>
          <p>A bond is like a loan that you provide to a government or a corporation. In return, they pay you interest over time.</p>
          <h3>Key Terms:</h3>
          <ul class="list-disc list-inside">
            <li><strong>Issuer:</strong> The one who borrows the money.</li>
            <li><strong>Investor:</strong> You, the one who lends.</li>
            <li><strong>Coupon:</strong> The interest rate paid.</li>
          </ul>
        `
      }
    }
  },
  {
    id: 'budget',
    title: 'מהו תקציב?',
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
        title: 'What is a Budget?',
        description: 'How to plan ahead so we have money for what we really want.',
        content: '<p>A budget is an action plan for your money. Instead of just spending, you decide in advance where your money goes.</p>'
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
        content: '<p>The stock market is a place where shares of public companies are issued and traded. A share represents ownership in a company.</p>'
      }
    }
  }
];

export const CATEGORIES = [
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
