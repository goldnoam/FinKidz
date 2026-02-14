
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
    cat_advanced: 'מתקדם',
    highScores: 'שיאי המשחק',
    shield: 'מגן פעיל!',
    multiplier: 'מכפיל X2!',
    extraLife: 'חיים נוספים'
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
    cat_advanced: 'Advanced',
    highScores: 'High Scores',
    shield: 'Shield Active!',
    multiplier: 'X2 Multiplier!',
    extraLife: 'Extra Life'
  },
  zh: {
    siteTitle: 'FinKidz - 金融教育',
    heroTitle: '儿童投资',
    heroSubtitle: '年轻一代的金融教育',
    home: '首页',
    lessons: '课程',
    game: '储蓄竞赛',
    points: '积分',
    completed: '已完成',
    learnMore: '了解更多',
    nextLesson: '下一课：',
    finishLesson: '完成课程 ✓',
    streak: '连续天数',
    search: '搜索课程...',
    feedback: '反馈',
    all: '全部',
    favorites: '收藏夹',
    cat_starter: '第一步',
    cat_basics: '基础',
    cat_banking: '银行',
    cat_investing: '投资',
    cat_advanced: '高级',
    highScores: '最高分',
    shield: '护盾已激活！',
    multiplier: 'X2 倍数！',
    extraLife: '额外生命'
  },
  hi: {
    siteTitle: 'FinKidz - वित्तीय शिक्षा',
    heroTitle: 'बच्चों के लिए निवेश',
    heroSubtitle: 'युवा पीढ़ी के लिए वित्तीय शिक्षा',
    home: 'होम',
    lessons: 'पाठ',
    game: 'बचत रेस',
    points: 'अंक',
    completed: 'पूरा हुआ',
    learnMore: 'और जानें',
    nextLesson: 'अगला पाठ:',
    finishLesson: 'पाठ समाप्त करें ✓',
    streak: 'लगातार दिन',
    search: 'पाठ खोजें...',
    feedback: 'प्रतिक्रिया',
    all: 'सभी',
    favorites: 'पसंदीदा',
    cat_starter: 'पहला कदम',
    cat_basics: 'बुनियादी',
    cat_banking: 'बैंकिंग',
    cat_investing: 'निवेश',
    cat_advanced: 'उन्नत',
    highScores: 'उच्च स्कोर',
    shield: 'शील्ड सक्रिय!',
    multiplier: 'X2 गुणक!',
    extraLife: 'अतिरिक्त जीवन'
  },
  de: {
    siteTitle: 'FinKidz - Finanzielle Bildung',
    heroTitle: 'Investitionen für Kinder',
    heroSubtitle: 'Finanzielle Bildung für die junge Generation',
    home: 'Startseite',
    lessons: 'Lektionen',
    game: 'Spar-Rennen',
    points: 'Punkte',
    completed: 'Abgeschlossen',
    learnMore: 'Mehr erfahren',
    nextLesson: 'Nächste Lektion:',
    finishLesson: 'Lektion beenden ✓',
    streak: 'Serie',
    search: 'Lektion suchen...',
    feedback: 'Feedback',
    all: 'Alle',
    favorites: 'Favoriten',
    cat_starter: 'Erste Schritte',
    cat_basics: 'Grundlagen',
    cat_banking: 'Banking',
    cat_investing: 'Investieren',
    cat_advanced: 'Fortgeschritten',
    highScores: 'Bestenlisten',
    shield: 'Schild aktiv!',
    multiplier: 'X2 Multiplikator!',
    extraLife: 'Extra Leben'
  },
  es: {
    siteTitle: 'FinKidz - Educación Financiera',
    heroTitle: 'Inversiones para Niños',
    heroSubtitle: 'Educación Financiera para la Joven Generación',
    home: 'Inicio',
    lessons: 'Lecciones',
    game: 'Carrera de Ahorro',
    points: 'Puntos',
    completed: 'Completado',
    learnMore: 'Saber más',
    nextLesson: 'Siguiente lección:',
    finishLesson: 'Terminar lección ✓',
    streak: 'Racha',
    search: 'Buscar lección...',
    feedback: 'Comentarios',
    all: 'Todo',
    favorites: 'Favoritos',
    cat_starter: 'Primeros pasos',
    cat_basics: 'Conceptos básicos',
    cat_banking: 'Banca',
    cat_investing: 'Inversión',
    cat_advanced: 'Avanzado',
    highScores: 'Puntuaciones altas',
    shield: '¡Escudo activo!',
    multiplier: '¡Multiplicador X2!',
    extraLife: 'Vida extra'
  },
  fr: {
    siteTitle: 'FinKidz - Éducation Financière',
    heroTitle: 'Investissements pour Enfants',
    heroSubtitle: 'Éducation Financière pour la Jeune Génération',
    home: 'Accueil',
    lessons: 'Leçons',
    game: 'Course à l\'Épargne',
    points: 'Points',
    completed: 'Terminé',
    learnMore: 'En savoir plus',
    nextLesson: 'Leçon suivante :',
    finishLesson: 'Terminer la leçon ✓',
    streak: 'Série',
    search: 'Rechercher une leçon...',
    feedback: 'Commentaires',
    all: 'Tout',
    favorites: 'Favoris',
    cat_starter: 'Premiers pas',
    cat_basics: 'Bases',
    cat_banking: 'Banque',
    cat_investing: 'Investissement',
    cat_advanced: 'Avancé',
    highScores: 'Meilleurs scores',
    shield: 'Bouclier actif !',
    multiplier: 'Multiplicateur X2 !',
    extraLife: 'Vie supplémentaire'
  }
};

export const LESSONS: Lesson[] = [
  // --- STARTER ---
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
        content: '<p>Long ago, money didn\'t exist. People used to swap things. This was called <strong>bartering</strong>. Money was invented to make trading easier!</p>'
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
    `,
    translations: {
      en: {
        title: 'Piggy Bank Secrets',
        description: 'Why save money instead of spending it all at once?',
        content: '<p>Saving means keeping money for later. If you save a little bit every week, you can eventually buy something much bigger and better!</p>'
      }
    }
  },
  {
    id: 'needs-vs-wants',
    title: 'צריך או רוצה?',
    description: 'איך להבדיל בין דברים שאנחנו חייבים לכאלה שסתם כיף שיהיה לנו.',
    category: 'starter',
    difficulty: 'מתחיל',
    iconName: 'goals',
    content: `
      <h3>מה באמת חשוב?</h3>
      <p><strong>צרכים:</strong> דברים שאי אפשר בלעדיהם, כמו אוכל, בגדים, ובית.</p>
      <p><strong>רצונות:</strong> דברים שכיף שיהיו לנו אבל אפשר להסתדר בלעדיהם, כמו צעצועים חדשים או ממתקים.</p>
      <p>ילדים חכמים דואגים קודם כל לצרכים, ורק אז לרצונות!</p>
    `,
    translations: {
      en: {
        title: 'Needs vs. Wants',
        description: 'Learning the difference between things we must have and things that are just fun.',
        content: '<p><strong>Needs</strong> are things like food and a home. <strong>Wants</strong> are things like toys. Smart kids prioritize needs first!</p>'
      }
    }
  },
  {
    id: 'sharing-is-caring',
    title: 'כוחה של הנתינה',
    description: 'למה חשוב להקצות חלק מהכסף שלנו לעזרה לאחרים?',
    category: 'starter',
    difficulty: 'מתחיל',
    iconName: 'global',
    content: `
      <h3>לתת זה לקבל</h3>
      <p>כסף יכול לעשות המון טוב בעולם. כשאנחנו תורמים חלק קטן מהכסף שלנו לצדקה, אנחנו עוזרים לאנשים שאין להם.</p>
      <p>זה גורם לנו להרגיש טוב ומשפר את העולם לכולם!</p>
    `,
    translations: {
      en: {
        title: 'The Power of Giving',
        description: 'Why it\'s important to set aside some money to help others.',
        content: '<p>Giving to charity helps people in need and makes the world a better place. It also makes you feel great!</p>'
      }
    }
  },
  {
    id: 'where-from',
    title: 'מאיפה מגיע הכסף?',
    description: 'הכסף לא צומח על העצים (חבל...). אז איך הוא מגיע לארנק?',
    category: 'starter',
    difficulty: 'מתחיל',
    iconName: 'money',
    content: `
      <h3>עבודה ומאמץ</h3>
      <p>רוב האנשים מקבלים כסף כי הם <strong>עובדים</strong>. הם עוזרים לאחרים או מייצרים דברים, ובתמורה מקבלים שכר.</p>
      <p>ככל שלומדים יותר ומתאמנים יותר, אפשר למצוא עבודות שבהן מרוויחים יותר כסף.</p>
    `,
    translations: {
      en: {
        title: 'Where Does Money Come From?',
        description: 'Money doesn\'t grow on trees! Let\'s find out how it gets into a wallet.',
        content: '<p>People earn money by working. They use their skills to help others or make things, and they get paid for it.</p>'
      }
    }
  },

  // --- BASICS ---
  {
    id: 'income-expense',
    title: 'הכנסות והוצאות',
    description: 'הבסיס לכל ארנק: מה נכנס ומה יוצא?',
    category: 'basics',
    difficulty: 'מתחיל',
    iconName: 'money',
    content: `
      <p><strong>הכנסה</strong> היא כל כסף שאנחנו מקבלים. למשל: דמי כיס או שכר.</p>
      <p><strong>הוצאה</strong> היא כסף שאנחנו משלמים כדי לקנות דברים.</p>
      <p>כדי להיות עשירים, אנחנו צריכים שההכנסות יהיו תמיד גדולות מההוצאות!</p>
    `,
    translations: {
      en: {
        title: 'Income and Expenses',
        description: 'The foundation: what comes in and what goes out?',
        content: '<p><strong>Income</strong> is money coming in. <strong>Expenses</strong> are money going out. Aim to have more income than expenses!</p>'
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
      <p>אנחנו מחליטים מראש כמה נשמור לחיסכון, כמה נוציא על אוכל וכמה על בילויים.</p>
    `,
    translations: {
      en: {
        title: 'Smart Budgeting',
        description: 'How to plan ahead so you have money for what you really want.',
        content: '<p>A budget is an action plan. It helps you decide in advance where your money should go instead of wondering where it went!</p>'
      }
    }
  },
  {
    id: 'savings-goals',
    title: 'מטרות חיסכון',
    description: 'איך להציב מטרה ולהגיע אליה בלי להתייאש.',
    category: 'basics',
    difficulty: 'מתחיל',
    iconName: 'goals',
    content: `
      <h3>לחלום בגדול</h3>
      <p>כשחוסכים למשהו ספציפי, כמו אופניים חדשים, הרבה יותר קל להתמיד.</p>
      <p>תכתבו את המטרה שלכם ותראו איך בכל פעם שאתם מוסיפים כסף לקופה, אתם מתקרבים אליה!</p>
    `,
    translations: {
      en: {
        title: 'Savings Goals',
        description: 'How to set a target and reach it without giving up.',
        content: '<p>Setting a specific goal, like a new bike, makes saving fun. Track your progress and watch your money grow!</p>'
      }
    }
  },
  {
    id: 'what-is-a-bank',
    title: 'מה זה בנק?',
    description: 'המבצר ששומר על הכסף של כולם.',
    category: 'basics',
    difficulty: 'מתחיל',
    iconName: 'bank',
    content: `
      <p>בנק הוא עסק מיוחד ששומר לנו על הכסף. זה הרבה יותר בטוח מאשר לשמור הכל מתחת למזרן!</p>
      <p>בבנק יש כספות ענקיות ומערכות מחשב חכמות שעוקבות אחרי כל שקל.</p>
    `,
    translations: {
      en: {
        title: 'What is a Bank?',
        description: 'The fortress that keeps everyone\'s money safe.',
        content: '<p>A bank is a business that keeps your money safe. It\'s much more secure than keeping it under your mattress!</p>'
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
    `,
    translations: {
      en: {
        title: 'Inflation: Rising Prices',
        description: 'Why did chocolate cost 1 shekel years ago and 5 today?',
        content: '<p>Inflation means prices go up over time. It means your money buys less than it used to. This is why saving and investing are important!</p>'
      }
    }
  },

  // --- BANKING ---
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
        content: '<p>Interest is the price paid for using someone else\'s money. Banks pay you interest for your savings, but charge you interest if you borrow!</p>'
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
        title: 'Bank of Israel',
        description: 'Who guards the country\'s money and sets interest rates?',
        content: '<p>The Bank of Israel is the country\'s central bank. It prints money and sets the basic interest rate to keep the economy stable.</p>'
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
    `,
    translations: {
      en: {
        title: 'What is a Loan?',
        description: 'Get money today, pay it back in the future.',
        content: '<p>A loan is borrowed money that you must pay back over time, usually with extra money called interest.</p>'
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
        content: '<p>A mortgage is a long-term loan for buying a house. The house acts as security for the bank until the loan is paid off.</p>'
      }
    }
  },
  {
    id: 'credit-vs-debit',
    title: 'אשראי מול דביט',
    description: 'מה ההבדל בין כרטיס ש"מגהץ" עכשיו לכזה שמשלם אחר כך?',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'exchange',
    content: `
      <h3>הכרטיס שבכיס</h3>
      <p><strong>דביט (חיוב מיידי):</strong> הכסף יורד מחשבון הבנק שלכם באותו רגע.</p>
      <p><strong>אשראי (Credit):</strong> הבנק משלם במקומכם, ואתם מחזירים לו את כל הסכום פעם בחודש.</p>
    `,
    translations: {
      en: {
        title: 'Credit vs. Debit',
        description: 'What\'s the difference between "pay now" and "pay later" cards?',
        content: '<p><strong>Debit</strong> cards take money from your bank account instantly. <strong>Credit</strong> cards let you borrow money to pay back at the end of the month.</p>'
      }
    }
  },

  // --- INVESTING ---
  {
    id: 'stock-market',
    title: 'הבורסה',
    description: 'הסופרמרקט של החברות הגדולות.',
    category: 'investing',
    difficulty: 'מתקדם',
    iconName: 'investing',
    content: `
      <p>הבורסה היא מקום שבו אנשים יכולים לקנות ולמכור חלקים קטנים מחברות. חלק קטן כזה נקרא <strong>מניה</strong>.</p>
      <p>אם החברה מצליחה ומרוויחה, ערך המניה עולה. אם החברה נכשלת, ערך המניה יורד.</p>
    `,
    translations: {
      en: {
        title: 'The Stock Market',
        description: 'The supermarket for large companies.',
        content: '<p>The stock market is where people buy and sell small pieces of companies called <strong>stocks</strong>. If the company does well, the stock value grows!</p>'
      }
    }
  },
  {
    id: 'stocks-shares',
    title: 'מהן מניות?',
    description: 'להיות הבעלים של אפל או גוגל (קצת).',
    category: 'investing',
    difficulty: 'מתקדם',
    iconName: 'pie',
    content: `
      <p>מניה היא תעודה המעידה על בעלות בחלק קטן מהחברה. כשאתם קונים מניה, אתם הופכים ל"שותפים" בחברה.</p>
    `,
    translations: {
      en: {
        title: 'What are Stocks?',
        description: 'Owning a tiny piece of Apple or Google.',
        content: '<p>A stock represents partial ownership of a company. When you buy a share, you become a "shareholder" and own a small slice of that business!</p>'
      }
    }
  },
  {
    id: 'bonds',
    title: 'אגרות חוב (אג"ח)',
    description: 'להלוות כסף לממשלה ולקבל עליו ריבית.',
    category: 'investing',
    difficulty: 'מומחה',
    iconName: 'safe',
    content: `
      <p>אג"ח היא הלוואה שאתם נותנים למדינה או לחברה. בתמורה, הם מבטיחים להחזיר לכם את הכסף בתוספת ריבית קבועה.</p>
    `,
    translations: {
      en: {
        title: 'Bonds',
        description: 'Lending money to the government for interest.',
        content: '<p>A bond is like a loan you give to a government or company. In return, they promise to pay you back with interest over time.</p>'
      }
    }
  },
  {
    id: 'risk-reward',
    title: 'סיכון מול סיכוי',
    description: 'למה השקעות שיכולות להרוויח המון הן גם מסוכנות יותר?',
    category: 'investing',
    difficulty: 'מתקדם',
    iconName: 'target',
    content: `
      <p>בעולם הכסף, אם רוצים להרוויח הרבה, בדרך כלל צריך לקחת סיכון גדול יותר. השקעות בטוחות מניבות בדרך כלל רווח קטן.</p>
    `,
    translations: {
      en: {
        title: 'Risk vs. Reward',
        description: 'Why high-profit investments are also riskier.',
        content: '<p>Generally, the more money you hope to make, the more risk you have to take. Safe investments usually grow slowly!</p>'
      }
    }
  },
  {
    id: 'compound-interest',
    title: 'ריבית דריבית',
    description: 'הפלא השמיני של העולם - איך הכסף צומח מעצמו.',
    category: 'investing',
    difficulty: 'מומחה',
    iconName: 'chart',
    content: `
      <p>ריבית דריבית היא ריבית שמחושבת לא רק על הסכום המקורי, אלא גם על הריבית שכבר נצברה. זה כמו כדור שלג שגדל וגדל!</p>
    `,
    translations: {
      en: {
        title: 'Compound Interest',
        description: 'The 8th wonder of the world - how money grows on its own.',
        content: '<p>Compound interest is interest earned on interest. Over a long time, it can turn small savings into a huge fortune!</p>'
      }
    }
  },
  {
    id: 'mutual-funds',
    title: 'קרנות נאמנות',
    description: 'לשים את כל הביצים בסלים שונים.',
    category: 'investing',
    difficulty: 'מתקדם',
    iconName: 'pie',
    content: `
      <p>קרן נאמנות אוספת כסף מהרבה אנשים ומשקיעה אותו בהרבה חברות שונות. זה עוזר לפזר את הסיכון.</p>
    `,
    translations: {
      en: {
        title: 'Mutual Funds',
        description: 'Putting your eggs in many different baskets.',
        content: '<p>A mutual fund pools money from many investors to buy a mix of stocks and bonds, spreading out the risk.</p>'
      }
    }
  },

  // --- ADVANCED ---
  {
    id: 'deficit',
    title: 'מהו גרעון?',
    description: 'כשמדינה מבזבזת יותר ממה שהיא מרוויחה.',
    category: 'advanced',
    difficulty: 'מומחה',
    iconName: 'chart',
    content: `
      <h3>החשבון של המדינה</h3>
      <p><strong>גרעון</strong> קורה כשההוצאות גדולות מההכנסות. המדינה צריכה להלוות כסף כדי לסגור את הפער.</p>
    `,
    translations: {
      en: {
        title: 'What is a Deficit?',
        description: 'When a country spends more than it earns.',
        content: '<p>A deficit happens when a government spends more money than it collects in taxes. It must borrow money to cover the difference.</p>'
      }
    }
  },
  {
    id: 'devaluation-appreciation',
    title: 'פיחות ותיסוף',
    description: 'למה השקל לפעמים חזק ולפעמים חלש מול הדולר?',
    category: 'advanced',
    difficulty: 'מומחה',
    iconName: 'exchange',
    content: `
      <h3>כוחו של השקל</h3>
      <p><strong>תיסוף:</strong> כשערך השקל עולה. <strong>פיחות:</strong> כשערך השקל יורד.</p>
    `,
    translations: {
      en: {
        title: 'Devaluation & Appreciation',
        description: 'Why the Shekel is sometimes strong and sometimes weak.',
        content: '<p>Appreciation means the currency\'s value is rising. Devaluation means its value is falling relative to others like the Dollar.</p>'
      }
    }
  },
  {
    id: 'taxes',
    title: 'מהם מיסים?',
    description: 'הדמי מנוי שאנחנו משלמים למדינה.',
    category: 'advanced',
    difficulty: 'מתקדם',
    iconName: 'global',
    content: `
      <p>מיסים הם כסף שהאזרחים משלמים לממשלה כדי לממן שירותים כמו כבישים, בתי ספר ומשטרה.</p>
    `,
    translations: {
      en: {
        title: 'What are Taxes?',
        description: 'The "subscription fee" we pay to the state.',
        content: '<p>Taxes are money paid to the government to fund public services like schools, hospitals, roads, and the police.</p>'
      }
    }
  },
  {
    id: 'cryptocurrency',
    title: 'מה זה קריפטו?',
    description: 'הכסף הדיגיטלי המסתורי של העתיד.',
    category: 'advanced',
    difficulty: 'מומחה',
    iconName: 'money',
    content: `
      <p>מטבעות דיגיטליים (כמו ביטקוין) שאינם נשלטים על ידי בנקים או ממשלות. הם מבוססים על טכנולוגיה חכמה שנקראת בלוקצ'יין.</p>
    `,
    translations: {
      en: {
        title: 'What is Crypto?',
        description: 'The mysterious digital money of the future.',
        content: '<p>Cryptocurrencies like Bitcoin are digital currencies not controlled by any government. They use a secure technology called blockchain.</p>'
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
    description: 'סיימת 5 שיעורים',
    icon: 'book',
    color: 'from-purple-400 to-pink-400',
    condition: (stats) => stats.completedLessons.length >= 5
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
