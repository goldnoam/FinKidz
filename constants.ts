
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
  zh: { home: '首页', lessons: '课程', siteTitle: 'FinKidz', heroTitle: '少儿投资课', heroSubtitle: '为年轻一代提供的金融教育', all: '全部', favorites: '收藏', points: '积分', completed: '已完成' },
  hi: { home: 'होम', lessons: 'पाठ', siteTitle: 'FinKidz', heroTitle: 'बच्चों के लिए निवेश', heroSubtitle: 'युवा पीढ़ी के लिए वित्तीय शिक्षा', all: 'सभी', favorites: 'पसंदीदा', points: 'अंक', completed: 'पूरा हुआ' },
  de: { home: 'Startseite', lessons: 'Lektionen', siteTitle: 'FinKidz', heroTitle: 'Investitionen für Kinder', heroSubtitle: 'Finanzielle Bildung für die junge Generation', all: 'Alle', favorites: 'Favoriten', points: 'Punkte', completed: 'Abgeschlossen' },
  es: { home: 'Inicio', lessons: 'Lecciones', siteTitle: 'FinKidz', heroTitle: 'Inversiones para Niños', heroSubtitle: 'Educación financiera para la generación joven', all: 'Todo', favorites: 'Favoritos', points: 'Puntos', completed: 'Completado' },
  fr: { home: 'Accueil', lessons: 'Leçons', siteTitle: 'FinKidz', heroTitle: 'Investissements pour Enfants', heroSubtitle: 'Éducation financière pour la jeune génération', all: 'Tout', favorites: 'Favoris', points: 'Points', completed: 'Terminé' }
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
        description: 'Where did money come from and why do we need it?',
        content: `
          <p>Long ago, money didn't exist. People used to swap things like apples for eggs. This was called <strong>bartering</strong>.</p>
          <p>But what if you want an apple, but the seller already has enough eggs? That's why money was invented!</p>
          <h3>Why is money useful?</h3>
          <ul class="list-disc list-inside space-y-2">
            <li>It lets us buy what we need.</li>
            <li>It's easy to keep in a pocket or a bank.</li>
            <li>Everyone agrees on its value.</li>
          </ul>
        `
      }
    }
  },
  {
    id: 'interest',
    title: 'מהי ריבית?',
    description: 'הכירו את "דמי השכירות" של הכסף.',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'chart',
    content: `
      <h3>כסף לא עובר בחינם</h3>
      <p>ריבית היא המחיר שמשלמים על שימוש בכסף של מישהו אחר. תחשבו על זה כמו על "שכר דירה" שמשלמים על הכסף.</p>
      <div class="bg-blue-900/20 p-4 rounded-xl my-4 border-r-4 border-blue-500">
        <p><strong>ריבית בזכות:</strong> כשאתם שמים כסף בבנק, הבנק משתמש בו ומשלם לכם קצת כסף בתמורה. הכסף שלכם "עובד" בשבילכם!</p>
        <p class="mt-2"><strong>ריבית בחובה:</strong> כשאתם לוקחים הלוואה מהבנק, אתם צריכים להחזיר לו את הסכום שלקחתם פלוס תוספת של ריבית.</p>
      </div>
    `,
    translations: {
      en: {
        title: 'What is Interest?',
        description: 'Meet the "rent" for money.',
        content: `
          <h3>Money isn't free to borrow</h3>
          <p>Interest is the price you pay to use someone else's money. Think of it like "rent" paid for cash.</p>
          <div class="bg-blue-900/20 p-4 rounded-xl my-4 border-l-4 border-blue-500">
            <p><strong>Earning Interest:</strong> When you put money in a bank, the bank pays you interest. Your money is working for you!</p>
            <p class="mt-2"><strong>Paying Interest:</strong> When you borrow money, you pay it back plus an extra amount called interest.</p>
          </div>
        `
      }
    }
  },
  {
    id: 'bank-of-israel',
    title: 'בנק ישראל: הבנק של הבנקים',
    description: 'מי שומר על הכסף של המדינה וקובע את הריבית?',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'bank',
    content: `
      <h3>הלב הפועם של הכלכלה</h3>
      <p>בנק ישראל הוא הבנק המרכזי של המדינה. הוא אחראי על הדפסת השקלים ועל היציבות הכלכלית שלנו.</p>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>קביעת הריבית:</strong> הוא מחליט אם להעלות או להוריד את הריבית במשק.</li>
        <li><strong>פיקוח:</strong> הוא שומר שהבנקים האחרים יתנהלו באחריות.</li>
      </ul>
    `,
    translations: {
      en: {
        title: 'Bank of Israel: The Central Bank',
        description: 'Who guards the country\'s money and sets the rates?',
        content: `
          <h3>The Heart of the Economy</h3>
          <p>The Bank of Israel is the country's central bank. It is responsible for printing Shekels and ensuring financial stability.</p>
          <ul class="list-disc list-inside space-y-2">
            <li><strong>Setting Interest Rates:</strong> It decides whether to raise or lower the basic interest rate.</li>
            <li><strong>Supervision:</strong> It makes sure other banks operate responsibly.</li>
          </ul>
        `
      }
    }
  },
  {
    id: 'deficit',
    title: 'מהו גרעון?',
    description: 'כשמדינה מבזבזת יותר ממה שהיא מרוויחה.',
    category: 'advanced',
    difficulty: 'מומחה',
    iconName: 'chart',
    content: `
      <h3>החשבון של המדינה</h3>
      <p>המדינה מקבלת כסף ממיסים (הכנסות) ומוציאה כסף על ביטחון, חינוך ובריאות (הוצאות).</p>
      <p><strong>גרעון</strong> קורה כשההוצאות גדולות מההכנסות. המדינה צריכה להלוות כסף כדי לסגור את הפער.</p>
    `,
    translations: {
      en: {
        title: 'What is a Deficit?',
        description: 'When a country spends more than it earns.',
        content: `
          <h3>The National Balance Sheet</h3>
          <p>A government gets money from taxes (income) and spends it on defense, education, and health (expenses).</p>
          <p>A <strong>deficit</strong> occurs when expenses are higher than income. The government must borrow money to close the gap.</p>
        `
      }
    }
  },
  {
    id: 'devaluation-appreciation',
    title: 'פיחות ותיסוף',
    description: 'למה השקל לפעמים חזק ולפעמים חלש מול הדולר?',
    category: 'banking',
    difficulty: 'מומחה',
    iconName: 'exchange',
    content: `
      <h3>כוחו של השקל</h3>
      <p><strong>תיסוף:</strong> כשערך השקל עולה מול הדולר. זה טוב לנו כשאנחנו קונים מוצרים מחו"ל (הם זולים יותר).</p>
      <p><strong>פיחות:</strong> כשערך השקל יורד. זה מייקר את הקניות שלנו בחו"ל אבל עוזר ליצואנים הישראלים.</p>
    `,
    translations: {
      en: {
        title: 'Devaluation & Appreciation',
        description: 'Why is the Shekel sometimes strong and sometimes weak?',
        content: `
          <h3>The Power of the Shekel</h3>
          <p><strong>Appreciation:</strong> When the Shekel's value rises against the Dollar. Importing goods becomes cheaper.</p>
          <p><strong>Devaluation:</strong> When the Shekel's value falls. Imports become more expensive, but it helps Israeli exporters sell abroad.</p>
        `
      }
    }
  },
  {
    id: 'mortgage',
    title: 'מהי משכנתא?',
    description: 'איך קונים בית בישראל?',
    category: 'banking',
    difficulty: 'מומחה',
    iconName: 'safe',
    content: `
      <h3>לקנות קירות משלכם</h3>
      <p>בית עולה המון כסף. משכנתא היא הלוואה גדולה וארוכה מאוד (עד 30 שנה) שמיועדת רק לקניית נכס.</p>
      <p>הבית עצמו משמש כביטחון לבנק - אם לא מחזירים את ההלוואה, הבנק יכול לקחת את הבית.</p>
    `,
    translations: {
      en: {
        title: 'What is a Mortgage?',
        description: 'How do people buy a home?',
        content: `
          <h3>Buying Your Own Walls</h3>
          <p>Homes are very expensive. A mortgage is a very large, long-term loan (up to 30 years) specifically for buying property.</p>
          <p>The house serves as collateral - if you don't pay back the loan, the bank can take the house.</p>
        `
      }
    }
  },
  {
    id: 'loan',
    title: 'מהי הלוואה?',
    description: 'לקבל כסף היום ולהחזיר אותו בעתיד.',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'money',
    content: `
      <h3>צריכים משהו עכשיו?</h3>
      <p>הלוואה היא כסף שמקבלים מגוף מסוים (בנק) ומבטיחים להחזיר בתשלומים לאורך זמן פלוס ריבית.</p>
      <p><strong>כלל חשוב:</strong> לוקחים הלוואה רק אם בטוחים שנוכל להחזיר אותה בכל חודש!</p>
    `,
    translations: {
      en: {
        title: 'What is a Loan?',
        description: 'Get money today, pay it back in the future.',
        content: `
          <h3>Need something now?</h3>
          <p>A loan is money borrowed from a bank with the promise to pay it back in installments over time, plus interest.</p>
          <p><strong>Golden Rule:</strong> Only take a loan if you are certain you can afford the monthly payments!</p>
        `
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
  }
];
