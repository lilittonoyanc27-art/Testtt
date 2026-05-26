import { GameMetadata } from './types';

export const GAMES_METADATA: Record<string, GameMetadata> = {
  numbers: {
    id: 'numbers',
    titleArm: 'Թվեր և Հաշվարկ',
    titleSpan: 'Números y Cuentas',
    titleRus: 'Числа и Счет',
    descriptionArm: 'Իմացիր իսպաներեն թվերը 1-ից մինչև 100-ը և հաշվելու կանոնները խաղային թեստերի միջոցով:',
    descriptionRus: 'Изучайте испанские числа от 1 до 100 и числительные с помощью интерактивных игровых тестов.',
    explanationArm: 'Իսպաներենում 1-ից 15 թվերն ունեն ինքնուրույն անվանումներ (uno, dos... quince): 16-ից 19 թվերը կազմվում են «diez» (տասը) + թվի համադրությամբ (diecisiete = 10 + 7): 20-ը «veinte»-ն է, իսկ 21-29 թվերը գրվում են միասին (veintiuno, veintidós): 30-ից սկսած տասնավորներն ու միավորները կապվում են «y» (և) շաղկապով (treinta y uno = thirty and one):',
    explanationRus: 'В испанском языке числа от 1 до 15 уникальны (uno, dos... quince). Числа от 16 до 19 строятся на основе десятка "diez" (dieciséis = 10 + 6). 20 — это "veinte", а числа от 21 до 29 пишутся слитно (veintidós). Начиная с 30 десятки и единицы пишутся раздельно через союз "y" (treinta y uno = 31).',
    icon: 'Binary',
    difficulty: 'A1_EASY',
  },
  accents: {
    id: 'accents',
    titleArm: 'Շեշտադրության Կանոններ',
    titleSpan: 'Reglas de Acentuación',
    titleRus: 'Правила Ударения',
    descriptionArm: 'Բացահայտիր իսպաներենի շեշտի 3 հիմնական կանոնները (Agudas, Llanas, Esdrújulas):',
    descriptionRus: 'Освойте 3 главных правила ударения в испанском: распределение слов по слогам и типам.',
    explanationArm: 'Իսպաներենում շեշտի 3 ոսկե կանոններն են.\n1. Agudas (վերջնաշեշտ)՝ եթե բառն ավարտվում է բաղաձայնով (բացի N կամ S), շեշտն ընկնում է վերջին վանկի վրա (օր.` español, hablar):\n2. Llanas (նախավերջնաշեշտ)՝ եթե բառն ավարտվում է ձայնավորով կամ N, S տառերով, շեշտն ընկնում է նախավերջին վանկի վրա (օր.` mesa, hablan):\n3. Esdrújulas (ապավերջնաշեշտ)՝ եթե շեշտն ընկնում է երրորդ վանկի վրա, այն միշտ ունենում է գրավոր շեշտ (tilde) (օր.` música, teléfono):\nԿանոններից շեղումների դեպքում միշտ դրվում է գրավոր շեշտ (tilde):',
    explanationRus: 'Три золотых правила ударения в испанском:\n1. Agudas (ударение на последний слог) — если слово оканчивается на согласную (кроме N, S). Например: hablar, español.\n2. Llanas (ударение на предпоследний слог) — если слово оканчивается на гласную или на N, S. Например: mesa, joven.\n3. Esdrújulas (ударение на 3-й слог с конца) — графический знак ставится ВСЕГДА. Например: música, rápido.\nЛюбое отклонение от правил требует графического знака ударения (tilde).',
    icon: 'Sparkles',
    difficulty: 'A1_HARD',
  },
  months: {
    id: 'months',
    titleArm: 'Տարվա Ամիսներ',
    titleSpan: 'Meses del Año',
    titleRus: 'Месяцы Года',
    descriptionArm: 'Սովորիր 12 ամիսները, դրանց գրելաձևն ու արտասանությունը իսպաներենում:',
    descriptionRus: 'Выучите 12 месяцев года, их правильное написание и соответствие испанскому произношению.',
    explanationArm: 'Իսպաներենում ամիսների անվանումները միշտ գրվում են փոքրատառով (օրինակ՝ «enero» - հունվար): Դրանք արական սեռի են, սակայն սովորաբար օգտագործվում են առանց որոշյալ հոդի: «Ինչ-որ ամսին» ասելու համար օգտագործում ենք «en» նախդիրը (օրինակ՝ «en mayo» - մայիսին):',
    explanationRus: 'Все названия месяцев в испанском языке пишутся со строчной (маленькой) буквы (напр., "enero" — январь). Они мужского рода, но употребляются в основном без артикля. Чтобы сказать "в мае", используется предлог "en" ("en mayo").',
    icon: 'Calendar',
    difficulty: 'A1_EASY',
  },
  days: {
    id: 'days',
    titleArm: 'Շաբաթվա Օրեր',
    titleSpan: 'Días de la Semana',
    titleRus: 'Дни Недели',
    descriptionArm: 'Դասավորիր շաբաթվա օրերը ճիշտ հաջորդականությամբ և սովորիր դրանց թարգմանությունները:',
    descriptionRus: 'Расставьте дни недели в правильном порядке и закрепите их переводы на армянский.',
    explanationArm: 'Իսպաներենում շաբաթվա օրերը նույնպես գրվում են փոքրատառով և բոլորն արական սեռի են (el lunes, el martes...): Շաբաթն սկսվում է երկուշաբթիից (lunes): «Երկուշաբթի օրը» արտահայտելու համար իսպաներենում ասում ենք պարզապես «el lunes» (առանց նախդիրների):',
    explanationRus: 'В испанском дни недели всегда со строчной буквы и все они мужского рода (el lunes, el martes...). Неделя начинается с понедельника. Чтобы сказать "в понедельник", мы используем артикль "el" перед днем недели: "el lunes" (буквально: "этот понедельник", без предлога).',
    icon: 'CalendarDays',
    difficulty: 'A1_EASY',
  },
  time: {
    id: 'time',
    titleArm: 'Ժամը Քանիսն Է',
    titleSpan: '¿Qué hora es?',
    titleRus: 'Который Час',
    descriptionArm: 'Իմացիր, թե ինչպես պատասխանել ժամի մասին հարցերին՝ օգտագործելով իրական հավաքատախտակը:',
    descriptionRus: 'Научитесь называть время по-испански, используя интерактивный циферблат часов.',
    explanationArm: '1. Ժամի հարցն է` «¿Qué hora es?» (Ժամը քանիսն է?):\n2. Ժամը մեկի դեպքում օգտագործվում է եզակի թիվ` «Es la una» (Մեկն է):\n3. Մնացած բոլոր ժամերի համար` հոգնակի` «Son las dos» (Երկուսն է), «Son las cinco» (Հինգն է):\n4. Կեսն ասելու համար` «y media» (Son las dos y media = 2:30):\n5. Քառորդն ասելու համար` «y cuarto» (Son las tres y cuarto = 3:15):\n6. Պակաս քառորդի համար` «menos cuarto» (Son las cuatro menos cuarto = 3:45):',
    explanationRus: '1. Вопрос "Который час?" звучит как "¿Qué hora es?".\n2. Для одного часа используется единственное число: "Es la una" (Сейчас час).\n3. Для остальных часов — множественное: "Son las dos" (Сейчас два), "Son las cinco" (Сейчас пять).\n4. Половина часа обозначается как "y media" (Son las tres y media = 3:30).\n5. Четверть часа — "y cuarto" (Son las cuatro y cuarto = 4:15).\n6. Без четверти — "menos cuarto" (Son las пять menos cuarto = 4:45).',
    icon: 'Clock',
    difficulty: 'A1_MEDIUM',
  },
  translations: {
    id: 'translations',
    titleArm: 'Բառապաշարի Թարգմանություն',
    titleSpan: 'Vocabulario Esencial',
    titleRus: 'Перевод Слов',
    descriptionArm: 'Հարստացրու բառապաշարը A1 մակարդակի ամենակարևոր բառերով և արտահայտություններով:',
    descriptionRus: 'Обогатите лексику ключевыми словами уровня А1: приветствия, полезные выражения и глаголы.',
    explanationArm: 'Իսպաներենի բառապաշարը սերտելու լավագույն տարբերակը թեմատիկ քարտերով սովորելն է: Ուշադրություն դարձրեք գոյականների արական (o-ով վերջացող) և իգական (a-ով վերջացող) սեռերին, ինչպես նաև հարցական նշաններին, որոնք դրվում են նախադասության սկզբում շրջված տեսքով (¿...?) և վերջում (?:):',
    explanationRus: 'Учите базовые выражения с помощью интерактивных флеш-карт и тестов на сопоставление. Обращайте внимание на мужской род (оканчиваются на -o) и женский род (оканчиваются на -a) существительных, а также на перевернутые знаки вопроса в начале предложений (¿...?).',
    icon: 'Languages',
    difficulty: 'A1_EASY',
  },
};

// 1. Numbers Game Data
export interface NumberGameItem {
  num: number;
  spanish: string;
  armenian: string;
  russian: string;
}

export const NUMBERS_DATA: NumberGameItem[] = [
  { num: 1, spanish: 'uno', armenian: 'մեկ', russian: 'один' },
  { num: 2, spanish: 'dos', armenian: 'երկու', russian: 'два' },
  { num: 3, spanish: 'tres', armenian: 'երեք', russian: 'три' },
  { num: 4, spanish: 'cuatro', armenian: 'չորս', russian: 'четыре' },
  { num: 5, spanish: 'cinco', armenian: 'հինգ', russian: 'пять' },
  { num: 6, spanish: 'seis', armenian: 'վեց', russian: 'шесть' },
  { num: 7, spanish: 'siete', armenian: 'յոթ', russian: 'семь' },
  { num: 8, spanish: 'ocho', armenian: 'ութ', russian: 'восемь' },
  { num: 9, spanish: 'nueve', armenian: 'ինը', russian: 'девять' },
  { num: 10, spanish: 'diez', armenian: 'տասը', russian: 'десять' },
  { num: 11, spanish: 'once', armenian: 'տասնմեկ', russian: 'одиннадцать' },
  { num: 12, spanish: 'doce', armenian: 'տասներկու', russian: 'двенадцать' },
  { num: 13, spanish: 'trece', armenian: 'տասներեք', russian: 'тринадцать' },
  { num: 14, spanish: 'catorce', armenian: 'տասնչորս', russian: 'четырнадцать' },
  { num: 15, spanish: 'quince', armenian: 'տասնհինգ', russian: 'пятнадцать' },
  { num: 16, spanish: 'dieciséis', armenian: 'տասնվեց', russian: 'шестнадцать' },
  { num: 17, spanish: 'diecisiete', armenian: 'տասնյոթ', russian: 'семнадцать' },
  { num: 18, spanish: 'dieciocho', armenian: 'տասնութ', russian: 'восемнадцать' },
  { num: 19, spanish: 'diecinueve', armenian: 'տասնինը', russian: 'девятнадцать' },
  { num: 20, spanish: 'veinte', armenian: 'քսան', russian: 'двадцать' },
  { num: 21, spanish: 'veintiuno', armenian: 'քսանմեկ', russian: 'двадцать один' },
  { num: 30, spanish: 'treinta', armenian: 'երեսուն', russian: 'тридцать' },
  { num: 40, spanish: 'cuarenta', armenian: 'քառասուն', russian: 'сорок' },
  { num: 50, spanish: 'cincuenta', armenian: 'հիսուն', russian: 'пятьдесят' },
  { num: 60, spanish: 'sesenta', armenian: 'վաթսուն', russian: 'шестьдесят' },
  { num: 70, spanish: 'setenta', armenian: 'յոթանասուն', russian: 'семьдесят' },
  { num: 80, spanish: 'ochenta', armenian: 'ութսուն', russian: 'восемьдесят' },
  { num: 90, spanish: 'noventa', armenian: 'իննսուն', russian: 'девяносто' },
  { num: 100, spanish: 'cien', armenian: 'հարյուր', russian: 'сто' }
];

// 2. Accents Game Data
export interface AccentWord {
  word: string; // The complete word, e.g., "teléfono"
  syllables: string[]; // Splitted, e.g., ["te", "lé", "fo", "no"]
  stressedIndex: number; // Index in syllables array (e.g., 1 for "lé")
  rulesType: 'Aguda' | 'Llana' | 'Esdrújula';
  translationArm: string;
  translationRus: string;
  explanationArm: string;
  explanationRus: string;
}

export const ACCENTS_DATA: AccentWord[] = [
  {
    word: 'hablar',
    syllables: ['hab', 'lar'],
    stressedIndex: 1,
    rulesType: 'Aguda',
    translationArm: 'խոսել',
    translationRus: 'говорить',
    explanationArm: 'Ավարտվում է «r» բաղաձայնով, ուստի շեշտվում է վերջին վանկը («lar»): Սա Aguda է:',
    explanationRus: 'Оканчивается на согласную "r" (не N, S), поэтому ударение на последний слог ("lar"). Это Aguda.'
  },
  {
    word: 'español',
    syllables: ['es', 'pa', 'ñol'],
    stressedIndex: 2,
    rulesType: 'Aguda',
    translationArm: 'իսպաներեն / իսպանացի',
    translationRus: 'испанский / испанец',
    explanationArm: 'Ավարտվում է «l» տառով, շեշտն ընկնում է վերջին վանկին («ñol»): Aguda է:',
    explanationRus: 'Оканчивается на согласную "l" (не N, S), ударение падает на последний слог ("ñol"). Aguda.'
  },
  {
    word: 'mesa',
    syllables: ['me', 'sa'],
    stressedIndex: 0,
    rulesType: 'Llana',
    translationArm: 'սեղան',
    translationRus: 'стол',
    explanationArm: 'Ավարտվում է ձայնավոր «a»-ով, ուստի շեշտն ընկնում է նախավերջին վանկին («me»): Llana է:',
    explanationRus: 'Оканчивается на гласную "a", ударение падает на предпоследний слог ("me"). Llana.'
  },
  {
    word: 'hablan',
    syllables: ['ha', 'blan'],
    stressedIndex: 0,
    rulesType: 'Llana',
    translationArm: 'նրանք խոսում են',
    translationRus: 'они говорят',
    explanationArm: 'Ավարտվում է «n» տառով, ուստի շեշտն ընկնում է նախավերջին վանկին («ha»): Llana է:',
    explanationRus: 'Оканчивается на согласную "n", поэтому ударение строго на предпоследнем слоге ("ha"). Llana.'
  },
  {
    word: 'árbol',
    syllables: ['ár', 'bol'],
    stressedIndex: 0,
    rulesType: 'Llana',
    translationArm: 'ծառ',
    translationRus: 'дерево',
    explanationArm: 'Ավարտվում է «l»-ով, որը բաղաձայն է: Կանոնով պետք է շեշտվեր «bol»-ը (Aguda), բայց քանի որ իրականում շեշտվում է նախավերջին վանկը, մենք դնում ենք գրավոր շեշտ նշան («á»): Լինելով նախավերջնաշեշտ` այն Llanas է:',
    explanationRus: 'Оканчивается на сонорную "l" (согласная), но ударение падает на первый слог. Так как это исключение из правила Aguda, пишется графическое ударение "á". По типу ударения это Llana.'
  },
  {
    word: 'música',
    syllables: ['mú', 'si', 'ca'],
    stressedIndex: 0,
    rulesType: 'Esdrújula',
    translationArm: 'երաժշտություն',
    translationRus: 'музыка',
    explanationArm: 'Շեշտն ընկնում է վերջից երրորդ վանկի վրա («mú»): Բոլոր Esdrújula բառերը միշտ ունեն գրավոր շեշտ:',
    explanationRus: 'Ударение на третий слог с конца ("mú"). Все слова типа Esdrújulas всегда пишутся со знаком ударения.'
  },
  {
    word: 'teléfono',
    syllables: ['te', 'lé', 'fo', 'no'],
    stressedIndex: 1,
    rulesType: 'Esdrújula',
    translationArm: 'հեռախոս',
    translationRus: 'телефон',
    explanationArm: 'Շեշտը երրորդ վանկին է («lé»), ուստի միշտ կրում է գրավոր շեշտ: Esdrújula է:',
    explanationRus: 'Ударение падает на третий слог с конца ("lé"), поэтому знак tilde обязателен. Esdrújula.'
  },
  {
    word: 'canción',
    syllables: ['can', 'ción'],
    stressedIndex: 1,
    rulesType: 'Aguda',
    translationArm: 'երգ',
    translationRus: 'песня',
    explanationArm: 'Ավարտվում է «n»-ով: Կանոնով պետք է լիներ Llana («can»), բայց քանի որ արտասանվում է վերջին վանկը («ción»), դրվում է գրավոր շեշտ «ó»: Լինելով վերջնաշեշտ` այն Aguda է:',
    explanationRus: 'Слово оканчивается на "n", но ударение падает на последний слог. Из-за этого пишется графический знак "ó", чтобы перебить стандартное правило Llanas. По факту это Aguda.'
  },
  {
    word: 'difícil',
    syllables: ['di', 'fí', 'cil'],
    stressedIndex: 1,
    rulesType: 'Llana',
    translationArm: 'դժվար',
    translationRus: 'трудный',
    explanationArm: 'Ավարտվում է «l» բաղաձայնով, բայց շեշտն ընկնում է նախավերջին վանկին («fí»), ուստի պահանջվում է գրավոր շեշտ: Լինելով նախավերջնաշեշտ՝ Llana է:',
    explanationRus: 'Заканчивается на "l", но ударение падает на предпоследний слог ("fí"), требуя знак графического ударения. Это Llana.'
  },
  {
    word: 'sábado',
    syllables: ['sá', 'ba', 'do'],
    stressedIndex: 0,
    rulesType: 'Esdrújula',
    translationArm: 'շաբաթ (օր)',
    translationRus: 'суббота',
    explanationArm: 'Շեշտը երրորդ վանկին է («sá»), ուստի միշտ դրվում է գրավոր շեշտ նշան: Esdrújula է:',
    explanationRus: 'Ударение падает на третий слог с конца ("sá"). Все слова этого типа ВСЕГДА пишутся с тильдой. Esdrújula.'
  }
];

// 3. Months Game Data
export interface MonthItem {
  id: number;
  spanish: string;
  armenian: string;
  russian: string;
}

export const MONTHS_DATA: MonthItem[] = [
  { id: 1, spanish: 'enero', armenian: 'հունվար', russian: 'январь' },
  { id: 2, spanish: 'febrero', armenian: 'փետրվար', russian: 'февраль' },
  { id: 3, spanish: 'marzo', armenian: 'մարտ', russian: 'март' },
  { id: 4, spanish: 'abril', armenian: 'ապրիլ', russian: 'апрель' },
  { id: 5, spanish: 'mayo', armenian: 'մայիս', russian: 'май' },
  { id: 6, spanish: 'junio', armenian: 'հունիս', russian: 'июнь' },
  { id: 7, spanish: 'julio', armenian: 'հուլիս', russian: 'июль' },
  { id: 8, spanish: 'agosto', armenian: 'օգոստոս', russian: 'август' },
  { id: 9, spanish: 'septiembre', armenian: 'սեպտեմբեր', russian: 'сентябрь' },
  { id: 10, spanish: 'octubre', armenian: 'հոկտեմբեր', russian: 'октябрь' },
  { id: 11, spanish: 'noviembre', armenian: 'նոյեմբեր', russian: 'ноябрь' },
  { id: 12, spanish: 'diciembre', armenian: 'դեկտեմբեր', russian: 'декабрь' }
];

// 4. Days of the Week Game Data
export interface DayItem {
  id: number; // 1 to 7
  spanish: string;
  armenian: string;
  russian: string;
  pronunciation: string;
}

export const DAYS_DATA: DayItem[] = [
  { id: 1, spanish: 'lunes', armenian: 'երկուշաբթի', russian: 'понедельник', pronunciation: 'լունես' },
  { id: 2, spanish: 'martes', armenian: 'երեքշաբթի', russian: 'вторник', pronunciation: 'մարտես' },
  { id: 3, spanish: 'miércoles', armenian: 'չորեքշաբթի', russian: 'среда', pronunciation: 'միեռկոլես' },
  { id: 4, spanish: 'jueves', armenian: 'հինգշաբթի', russian: 'четверг', pronunciation: 'խուևես' },
  { id: 5, spanish: 'viernes', armenian: 'ուրբաթ', russian: 'пятница', pronunciation: 'վիեռնես' },
  { id: 6, spanish: 'sábado', armenian: 'շաբաթ', russian: 'суббота', pronunciation: 'սաբադո' },
  { id: 7, spanish: 'domingo', armenian: 'կիրակի', russian: 'воскресенье', pronunciation: 'դոմինգո' }
];

// 5. Word Translations Data (A1 vocabulary)
export interface VocabularyItem {
  spanish: string;
  category: 'Greetings' | 'Nouns' | 'Verbs' | 'Phrases';
  armenian: string;
  russian: string;
}

export const VOCABULARY_DATA: VocabularyItem[] = [
  { spanish: '¡Hola!', category: 'Greetings', armenian: 'Ողջո՜ւյն', russian: 'Привет!' },
  { spanish: 'Buenos días', category: 'Greetings', armenian: 'Բարի լույս', russian: 'Доброе утро' },
  { spanish: 'Buenas noches', category: 'Greetings', armenian: 'Բարի գիշեր', russian: 'Доброй ночи / Спокойной ночи' },
  { spanish: 'Gracias', category: 'Phrases', armenian: 'Շնորհակալություն', russian: 'Спасибо' },
  { spanish: 'De nada', category: 'Phrases', armenian: 'Խնդրե՜մ / Չարժե', russian: 'Не за что' },
  { spanish: 'Por favor', category: 'Phrases', armenian: 'Խնդրում եմ', russian: 'Пожалуйста (просьба)' },
  { spanish: '¿Cómo estás?', category: 'Phrases', armenian: 'Ինչպե՞ս ես', russian: 'Как дела? (Как ты?)' },
  { spanish: 'Bien, gracias', category: 'Phrases', armenian: 'Լավ, շնորհակալություն', russian: 'Хорошо, спасибо' },
  { spanish: '¿Qué tal?', category: 'Phrases', armenian: 'Ի՞նչ կա չկա', russian: 'Как поживаешь?' },
  { spanish: 'Adiós', category: 'Greetings', armenian: 'Ցտեսություն / Հաջողություն', russian: 'До свидания / Пока' },
  { spanish: 'Hasta luego', category: 'Greetings', armenian: 'Առայժմ / Մինչ հանդիպում', russian: 'До встречи / До скорого' },
  { spanish: 'el libro', category: 'Nouns', armenian: 'գիրքը', russian: 'книга' },
  { spanish: 'la mesa', category: 'Nouns', armenian: 'սեղանը', russian: 'стол' },
  { spanish: 'la casa', category: 'Nouns', armenian: 'տունը', russian: 'дом' },
  { spanish: 'el agua', category: 'Nouns', armenian: 'ջուրը', russian: 'вода' },
  { spanish: 'comer', category: 'Verbs', armenian: 'ուտել', russian: 'есть / кушать' },
  { spanish: 'vivir', category: 'Verbs', armenian: 'ապրել', russian: 'жить' },
  { spanish: 'beber', category: 'Verbs', armenian: 'խմել', russian: 'пить' },
  { spanish: 'escribir', category: 'Verbs', armenian: 'գրել', russian: 'писать' },
  { spanish: 'aprender', category: 'Verbs', armenian: 'սովորել', russian: 'учить / изучать' }
];

// Time Telling Test cases
export interface TimeTestCase {
  hour: number;
  minute: number;
  spanish: string;
  armenianExplanation: string;
  russianExplanation: string;
}

export const TIME_DATA: TimeTestCase[] = [
  {
    hour: 1,
    minute: 0,
    spanish: 'Es la una',
    armenianExplanation: 'Es la una (Մեկն է) - Օգտագործվում է եզակի ձևով «Es la», քանի որ ժամը 1-ն է:',
    russianExplanation: 'Es la una (Сейчас час) - Используется форма единственного числа "Es la", так как час ровно один.'
  },
  {
    hour: 2,
    minute: 0,
    spanish: 'Son las dos',
    armenianExplanation: 'Son las dos (Երկուսն է) - Օգտագործվում է հոգնակի «Son las», քանի որ ժամը 2-ն է (1-ից բացի բոլոր ժամերի դեպքում):',
    russianExplanation: 'Son las dos (Сейчас два часа) - Используется множественное число "Son las", так как это не час дня.'
  },
  {
    hour: 5,
    minute: 30,
    spanish: 'Son las cinco y media',
    armenianExplanation: 'Son las cinco y media (Հինգն անց կես է / Հինգն ու կես) - «y media» նշանակում է «անց կես» (30 րոպե):',
    russianExplanation: 'Son las cinco y media (Полшестого / Пять с половиной) - "y media" означает "с половиной" (30 минут).'
  },
  {
    hour: 8,
    minute: 15,
    spanish: 'Son las ocho y cuarto',
    armenianExplanation: 'Son las ocho y cuarto (Ութն անց քառորդ) - «y cuarto» նշանակում է «անց քառորդ» (15 րոպե):',
    russianExplanation: 'Son las ocho y cuarto (Восемь с четвертью / Пятнадцать минут девятого) - "y cuarto" означает "с четвертью" (15 минут).'
  },
  {
    hour: 9,
    minute: 45,
    spanish: 'Son las diez menos cuarto',
    armenianExplanation: 'Son las diez menos cuarto (Տասին քառորդ պակաս) - «menos cuarto» նշանակում է «պակաս քառորդ» (45 րոպե, ասվում է հաջորդ ժամից հանելով 15):',
    russianExplanation: 'Son las diez menos cuarto (Без четверти десять) - "menos cuarto" означает "минус четверть". Переходим на следующий час (10) и вычитаем 15 минут.'
  },
  {
    hour: 12,
    minute: 0,
    spanish: 'Son las doce',
    armenianExplanation: 'Son las doce (Տասներկուսն է) - Ուղիղ ժամը 12-ն է, օգտագործվում է «Son las»:',
    russianExplanation: 'Son las doce (Сейчас двенадцать часов) - Ровно полдень или полночь.'
  },
  {
    hour: 1,
    minute: 15,
    spanish: 'Es la una y cuarto',
    armenianExplanation: 'Es la una y cuarto (Մեկն անց քառորդ) - Ժամը 1-ն է («Es la una») գումարած քառորդը («y cuarto»):',
    russianExplanation: 'Es la una y cuarto (Час с четвертью / Пятнадцать минут второго) - Ровно час плюс четверть часа.'
  },
  {
    hour: 12,
    minute: 45,
    spanish: 'Es la una menos cuarto',
    armenianExplanation: 'Es la una menos cuarto (Մեկին քառորդ պակաս) - 12-ն անց 45 րոպեն իսպաներենում ասվում է «մեկին քառորդ պակաս»: Քանի որ թիրախային ժամը 1-ն է, օգտագործվում է եզակի ձևը՝ «Es la una menos cuarto»:',
    russianExplanation: 'Es la una menos cuarto (Без четверти час) - Так как следующий час — это час дня (единственное число), используется "Es la" вместо "Son las".'
  }
];
