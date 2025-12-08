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
      <p class="bg-yellow-100 p-4 rounded-lg border-r-4 border-yellow-400">טיפ: נסו את שיטת ה-50/30/20. 50% לדברים שחייבים, 30% לכיף, ו-20% לחיסכון.</p>
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
    id: 'inflation',
    title: 'אינפלציה - שודד הערך',
    description: 'למה מה שאפשר לקנות ב-100 שקל היום, לא יהיה אפשר לקנות בעוד שנה?',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'chart',
    content: `
      <h3>מה זה אינפלציה?</h3>
      <p>אינפלציה היא מצב שבו המחירים במשק עולים לאורך זמן. כשיש אינפלציה, ערך הכסף יורד - כלומר, עם אותו שטר של 100 שקל אפשר לקנות פחות דברים מאשר פעם.</p>
      <br>
      <h3>למה זה קורה?</h3>
      <p>זה קורה כשלאנשים יש הרבה כסף לבזבז והם רוצים לקנות יותר מוצרים ממה שיש בחנויות (ביקוש גבוה), או כשעולה לייצר מוצרים (למשל, הדלק מתייקר).</p>
      <br>
      <p><strong>דוגמה:</strong> אם לפני 10 שנים ארטיק עלה 2 שקלים, והיום הוא עולה 5 שקלים - זו אינפלציה.</p>
    `
  },
  {
    id: 'cpi',
    title: 'מדד המחירים לצרכן',
    description: 'איך המדינה מודדת כמה "יקר" נהיה לחיות כאן?',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'pie',
    content: `
      <p>כדי לדעת כמה האינפלציה עלתה, הלשכה המרכזית לסטטיסטיקה (הלמ"ס) בודקת כל חודש מחירים של "סל מוצרים".</p>
      <br>
      <h3>מה יש בסל?</h3>
      <p>הסל כולל את כל הדברים שמשפחה ישראלית ממוצעת קונה: אוכל, שכר דירה, דלק, חשמל, בגדים, וירקות.</p>
      <br>
      <p>אם המחיר הכולל של הסל הזה עלה ב-1% בחודש מסוים, אומרים ש"המדד עלה ב-1%". זה נתון חשוב כי הרבה משכורות וחוזים צמודים למדד הזה.</p>
    `
  },
  {
    id: 'bank-israel',
    title: 'בנק ישראל',
    description: 'המבוגר האחראי של הכלכלה הישראלית.',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'bank',
    content: `
      <p>בנק ישראל הוא לא בנק רגיל שבו מפקידים כסף. הוא "הבנק של הבנקים" והוא שייך למדינה.</p>
      <br>
      <h3>תפקידים עיקריים:</h3>
      <ul class="list-disc list-inside space-y-2">
        <li><strong>שמירה על יציבות המחירים:</strong> לוודא שהמחירים בחנויות לא עולים מהר מדי (אינפלציה).</li>
        <li><strong>הדפסת כסף:</strong> הוא היחיד שמותר לו להדפיס שטרות של שקלים.</li>
        <li><strong>קביעת הריבית במשק:</strong> זה משפיע על כל ההלוואות והחסכונות במדינה.</li>
      </ul>
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
    id: 'indices-etf',
    title: 'מדדים, סלים וקרנות',
    description: 'איך לקנות את כל השוק בבת אחת בלי להמר על חברה אחת.',
    category: 'investing',
    difficulty: 'מומחה',
    iconName: 'pie',
    content: `
      <h3>מהו מדד (Index)?</h3>
      <p>מדד הוא כמו רשימה של המניות הכי טובות. למשל, מדד ת"א 35 מכיל את 35 החברות הגדולות בישראל. מדד S&P 500 מכיל את 500 החברות הגדולות בארה"ב.</p>
      <br>
      <h3>קרן סל / קרן מחקה (ETF)</h3>
      <p>במקום לנסות לנחש איזו חברה תצליח, אפשר לקנות "סל" שמכיל את כל המניות במדד. זה נקרא <strong>השקעה פסיבית</strong>.</p>
      <p>זה נחשב בטוח יותר לאורך זמן כי גם אם חברה אחת נופלת, האחרות עולות.</p>
      <br>
      <h3>קרן נאמנות</h3>
      <p>כלי שבו מנהל השקעות מקצועי מנהל את הכסף של הרבה אנשים יחד ומחליט איפה להשקיע.</p>
    `
  },
  {
    id: 'forex',
    title: 'מטבע חוץ (מט"ח)',
    description: 'דולר, יורו, שקל - איך הם זזים?',
    category: 'banking',
    difficulty: 'מתקדם',
    iconName: 'exchange',
    content: `
      <p>מט"ח זה כסף של מדינות אחרות. הערך של השקל משתנה כל הזמן לעומת הדולר או היורו.</p>
      <p>אם השקל "חזק", זול יותר לקנות דברים מחו"ל (כמו באמזון). אם השקל "חלש", יקר יותר לטוס לחו"ל ולקנות מוצרים מיובאים.</p>
    `
  }
];

export const CATEGORIES = [
  { id: 'basics', name: 'הבסיס', color: 'bg-green-500' },
  { id: 'banking', name: 'בנקים וכלכלה', color: 'bg-blue-500' },
  { id: 'investing', name: 'השקעות', color: 'bg-purple-500' },
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