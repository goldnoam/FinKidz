import { Lesson, Badge, ResourceLink } from './types';

export const LESSONS: Lesson[] = [
  // Basics
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
    `
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
      <br>
      <p class="bg-indigo-50 p-4 rounded-lg border-r-4 border-indigo-400 text-indigo-900 font-medium">טיפ: נסו את שיטת ה-50/30/20. 50% לדברים שחייבים, 30% לכיף, ו-20% לחיסכון.</p>
    `
  },
  {
    id: 'entrepreneurship',
    title: 'יזמות צעירה',
    description: 'איך הופכים רעיון לעסק קטן שמרוויח כסף?',
    category: 'basics',
    difficulty: 'מתחיל',
    iconName: 'goals',
    content: `
      <h3>מה זה יזם?</h3>
      <p>יזם הוא מישהו שמזהה בעיה או צורך, ומוצא להם פתרון יצירתי.</p>
      <p>למשל: למכור לימונדה ביום חם, להציע שירותי הוצאת כלבים בשכונה, או לבנות אתר אינטרנט לעסק של ההורים.</p>
      <br>
      <h3>צעדים ראשונים בעסק:</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>המוצר:</strong> מה אני מוכר?</li>
        <li><strong>הלקוחות:</strong> מי יקנה ממני?</li>
        <li><strong>המחיר:</strong> כמה זה עולה לי לייצר וכמה ארוויח?</li>
        <li><strong>שיווק:</strong> איך אנשים ידעו שאני קיים?</li>
      </ul>
    `
  },
  
  // Banking & Economy
  {
    id: 'interest',
    title: 'מהי ריבית?',
    description: 'למה כסף גדל בבנק? ומה קורה כשלוקחים הלוואה?',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'chart',
    content: `
      <h3>מה זה ריבית?</h3>
      <p>ריבית היא בעצם ה"מחיר" של הכסף. כשאתם מפקידים כסף בבנק, הבנק "שוכר" מכם את הכסף ומשלם לכם על כך - זו <strong>ריבית זכות</strong>.</p>
      <p>כשאתם לוקחים כסף מהבנק (הלוואה), אתם משלמים לבנק על הזכות להשתמש בכסף - זו <strong>ריבית חובה</strong>.</p>
      <br>
      <p>הריבית היא הכלי המרכזי של הבנקים ושל בנק ישראל כדי להשפיע על המשק.</p>
    `
  },
  {
    id: 'taxes',
    title: 'מיסים - למה זה טוב?',
    description: 'לאן נעלם חלק מהכסף של המבוגרים ומה המדינה עושה איתו?',
    category: 'basics',
    difficulty: 'מתקדם',
    iconName: 'safe',
    content: `
      <h3>מהם מיסים?</h3>
      <p>מס הוא תשלום חובה למדינה. כל מי שמרוויח כסף או קונה מוצרים משלם חלק קטן למדינה.</p>
      <br>
      <h3>מה עושים עם הכסף?</h3>
      <p>המיסים מממנים את כל השירותים שכולנו משתמשים בהם:</p>
      <ul class="list-disc list-inside space-y-2">
        <li>בתי ספר וגני ילדים</li>
        <li>כבישים ומדרכות</li>
        <li>בתי חולים ומרפאות</li>
        <li>הצבא והמשטרה</li>
        <li>פארקים וגינות ציבוריות</li>
      </ul>
      <p>בלי מיסים, המדינה לא הייתה יכולה לתפקד ולדאוג לאזרחים.</p>
    `
  },
  {
    id: 'insurance',
    title: 'ביטוח - הגנה לעתיד',
    description: 'איך מגנים על עצמנו מהפסדים כספיים גדולים כשמשהו משתבש?',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'safe',
    content: `
      <h3>מה זה ביטוח?</h3>
      <p>ביטוח הוא הסכם שבו אנחנו משלמים סכום קטן בכל חודש (פרמיה), ובתמורה חברת הביטוח מבטיחה לשלם לנו סכום גדול אם יקרה נזק.</p>
      <br>
      <h3>דוגמאות נפוצות:</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>ביטוח רכב:</strong> אם הרכב נהרס בתאונה, הביטוח עוזר לקנות חדש.</li>
        <li><strong>ביטוח בריאות:</strong> עוזר לממן טיפולים יקרים או תרופות.</li>
        <li><strong>ביטוח נסיעות:</strong> מגן עלינו כשאנחנו בחו"ל.</li>
      </ul>
      <p>ביטוח הוא דרך "לקנות שקט נפשי" ולהימנע מחובות פתאומיים.</p>
    `
  },
  
  // Investing
  {
    id: 'stock-market',
    title: 'הבורסה',
    description: 'הסופרמרקט של החברות הגדולות.',
    category: 'investing',
    difficulty: 'מתקדם',
    iconName: 'investing',
    content: `
      <p>הבורסה היא מקום (בעיקר דיגיטלי היום) שבו אנשים יכולים לקנות ולמכור חלקים קטנים מחברות.</p>
      <p>חלק קטן כזה נקרא <strong>מניה</strong>. אם קניתם מניה של חברה, אתם שותפים בחברה הזו!</p>
      <br>
      <p>אם החברה מצליחה ומרוויחה, ערך המניה עולה. אם החברה נכשלת, ערך המניה יורד ואפשר להפסיד כסף.</p>
    `
  },
  {
    id: 'crypto',
    title: 'ביטקוין ומטבעות דיגיטליים',
    description: "מה זה כסף דיגיטלי ולמה כולם מדברים על בלוקצ'יין?",
    category: 'investing',
    difficulty: 'מומחה',
    iconName: 'global',
    content: `
      <h3>מה זה מטבע דיגיטלי?</h3>
      <p>זהו כסף שקיים רק במחשב, ולא מודפס על ידי שום ממשלה או בנק מרכזי. המפורסם מכולם הוא <strong>הביטקוין</strong>.</p>
      <br>
      <h3>איך זה עובד? (בלוקצ'יין)</h3>
      <p>הטכנולוגיה מאחורי המטבעות נקראת בלוקצ'יין. זהו "יומן" ענק שבו רשומות כל ההעברות, והוא משותף לאלפי מחשבים בעולם, כך שאי אפשר לרמות או לשנות אותו.</p>
      <br>
      <p class="text-red-400 font-bold">זהירות: השקעה במטבעות דיגיטליים היא מאוד מסוכנת כי הערך שלהם יכול לעלות ולרדת בצורה קיצונית תוך דקות!</p>
    `
  },
  {
    id: 'real-estate',
    title: 'נדל"ן - להשקיע בקירות',
    description: 'איך קונים דירה ואיך מרוויחים מזה כסף לאורך זמן?',
    category: 'investing',
    difficulty: 'מומחה',
    iconName: 'bank',
    content: `
      <h3>מה זה נדל"ן?</h3>
      <p>נדל"ן (נכסי דלא ניידי) הם נכסים שאי אפשר להזיז - קרקעות, דירות, חנויות ומשרדים.</p>
      <br>
      <h3>איך מרוויחים מנדל"ן?</h3>
      <ol class="list-decimal list-inside space-y-2">
        <li><strong>עליית ערך:</strong> אם קניתם דירה והאזור הפך למבוקש יותר, מחיר הדירה יעלה ותוכלו למכור ברווח.</li>
        <li><strong>שכירות:</strong> אם אתם משכירים את הדירה למישהו אחר, הוא משלם לכם כסף בכל חודש.</li>
      </ol>
      <p>זו נחשבת השקעה יציבה יחסית, אבל היא דורשת הרבה מאוד כסף מראש.</p>
    `
  },
  {
    id: 'compound-interest-deep',
    title: 'ריבית דריבית - הפלא השמיני',
    description: 'איך הזמן הופך כסף קטן לכסף גדול (אפקט כדור השלג).',
    category: 'investing',
    difficulty: 'מומחה',
    iconName: 'investing',
    content: `
      <p>אלברט איינשטיין אמר פעם שריבית דריבית היא "הפלא השמיני של העולם". מי שמבין אותה - מרוויח אותה, ומי שלא - משלם אותה.</p>
      <br>
      <h3>איך זה עובד?</h3>
      <p>בריבית רגילה, מקבלים כסף רק על הסכום המקורי שהפקדתם. <strong>בריבית דריבית</strong>, אתם מקבלים ריבית גם על הריבית שכבר צברתם!</p>
      <br>
      <h3>הכוח של הזמן</h3>
      <p>זה כמו כדור שלג שמתגלגל במורד ההר וגדל. בשנים הראשונות השינוי נראה קטן, אבל אחרי 10 או 20 שנה, הכסף גדל בצורה אדירה. לכן, הדבר הכי חשוב בהשקעות הוא <strong>להתחיל מוקדם</strong>.</p>
    `
  },
  {
    id: 'pensions',
    title: 'פנסיה - דואגים לעצמנו בעתיד',
    description: 'למה חשוב לחסוך עכשיו לתקופה שבה כבר לא נעבוד?',
    category: 'advanced',
    difficulty: 'מומחה',
    iconName: 'savings',
    content: `
      <h3>מהי פנסיה?</h3>
      <p>פנסיה היא קצבה חודשית שנקבל כשנהיה זקנים ונפסיק לעבוד. כדי שתהיה לנו פנסיה, אנחנו צריכים לחסוך כסף בכל חודש במהלך כל שנות העבודה שלנו.</p>
      <br>
      <h3>למה לחסוך 40 שנה מראש?</h3>
      <p>1. <strong>כוח הריבית דריבית:</strong> ככל שנתחיל מוקדם יותר, הכסף יגדל להרבה יותר.<br>
      2. <strong>הטבות מס:</strong> המדינה מעודדת אותנו לחסוך לפנסיה ונותנת לנו "הנחות" במיסים על הכסף הזה.</p>
      <p>פנסיה היא הביטחון הכלכלי הכי חשוב של כל אדם מבוגר.</p>
    `
  }
];

export const CATEGORIES = [
  { id: 'basics', name: 'הבסיס', color: 'bg-green-500' },
  { id: 'banking', name: 'בנקים וכלכלה', color: 'bg-blue-500' },
  { id: 'investing', name: 'השקעות', color: 'bg-purple-500' },
  { id: 'advanced', name: 'מתקדם', color: 'bg-indigo-500' },
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
    id: 'rank_beginner',
    name: 'מתחיל',
    description: 'השלמת שיעור למתחילים',
    icon: 'medal',
    color: 'from-green-400 to-emerald-600',
    condition: (stats) => stats.completedLessons.some(id => LESSONS.find(l => l.id === id)?.difficulty === 'מתחיל')
  },
  {
    id: 'rank_advanced',
    name: 'מתקדם',
    description: 'השלמת שיעור למתקדמים',
    icon: 'crown',
    color: 'from-blue-400 to-indigo-600',
    condition: (stats) => stats.completedLessons.some(id => LESSONS.find(l => l.id === id)?.difficulty === 'מתקדם')
  },
  {
    id: 'rank_expert',
    name: 'מומחה',
    description: 'השלמת שיעור למומחים',
    icon: 'star',
    color: 'from-purple-400 to-pink-600',
    condition: (stats) => stats.completedLessons.some(id => LESSONS.find(l => l.id === id)?.difficulty === 'מומחה')
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
    id: 'maya',
    title: 'מאיה - הבורסה לניירות ערך',
    url: 'https://maya.tase.co.il/',
    iconName: 'chart',
    category: 'tools',
    color: 'bg-blue-600'
  },
  {
    id: 'virtual-portfolio-tase',
    title: 'תיק אישי TASE',
    url: 'https://plus.tase.co.il/he/add-portfolio',
    iconName: 'pie',
    category: 'tools',
    color: 'bg-emerald-600'
  },
  {
    id: 'virtual-portfolio-globes',
    title: 'משחק ההשקעות (גלובס)',
    url: 'https://www.globes.co.il/portal/portfolio/',
    iconName: 'game',
    category: 'tools',
    color: 'bg-green-600'
  },
  {
    id: 'virtual-portfolio-bizportal',
    title: 'תיק אישי Bizportal',
    url: 'https://www.bizportal.co.il/myportfolio',
    iconName: 'pie',
    category: 'tools',
    color: 'bg-orange-500'
  },
  {
    id: 'calcalist',
    title: 'כלכליסט',
    url: 'https://www.calcalist.co.il/',
    iconName: 'news',
    category: 'news',
    color: 'bg-red-600'
  },
  {
    id: 'globes',
    title: 'גלובס',
    url: 'https://www.globes.co.il/',
    iconName: 'news',
    category: 'news',
    color: 'bg-pink-600'
  },
  {
    id: 'bizportal',
    title: 'Bizportal',
    url: 'https://www.bizportal.co.il/',
    iconName: 'news',
    category: 'news',
    color: 'bg-orange-600'
  },
  {
    id: 'funder',
    title: 'Funder',
    url: 'https://www.funder.co.il/',
    iconName: 'news',
    category: 'news',
    color: 'bg-indigo-600'
  }
];