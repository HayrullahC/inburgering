// A guided order to work through the course in.
//
// The course is deliberately one A2 track rather than a separate A1 level (there is no
// A1 inburgering exam to aim at), so a complete beginner opening 1100 words and 30
// grammar lessons has no idea where to start. This route answers exactly that: small
// steps, each one a handful of words plus one grammar point plus something to practise
// on. Nothing is ticked by hand — a step counts as done when the underlying work is
// actually done, so progress has to be earned.
//
// task kinds:
//   { k: 'words',   cat, n }   study n words of a category until they stick
//   { k: 'grammar', lesson }   read a grammar lesson and mark it complete
//   { k: 'game',    game }     play a game once
//   { k: 'exam',    mod, n }   sit a practice exam
//   { k: 'dialogue', id }      study a dialogue and pass its comprehension check

import { DIALOGUES } from './dialogues.js';

const P1 = { en: 'First steps', tr: 'İlk adımlar' };
const P2 = { en: 'Everyday life', tr: 'Günlük hayat' };
const P3 = { en: 'Living in the Netherlands', tr: 'Hollanda’da yaşamak' };
const P4 = { en: 'Towards the exam', tr: 'Sınava doğru' };

export const ROUTE_A2 = [
  {
    id: 'a2-01', phase: P1,
    title: { en: 'Numbers and basics', tr: 'Sayılar ve temeller' },
    why: {
      en: 'Prices, times, appointments, house numbers: nothing works without numbers. Start here even if you already know a few Dutch words.',
      tr: 'Fiyat, saat, randevu, ev numarası — sayılar olmadan hiçbir şey yürümüyor. Birkaç Hollandaca kelime biliyor olsan bile buradan başla.',
    },
    tasks: [{ k: 'words', cat: 'basis', n: 30 }, { k: 'game', game: 'flashcards' }],
  },
  {
    id: 'a2-01b', phase: P1,
    title: { en: 'The sounds of Dutch', tr: 'Hollandacanın sesleri' },
    why: {
      en: 'Before the rules, the sounds: short and long vowels, ui, eu, ij. Listen to each group and repeat it out loud — your ear and mouth need this more than your memory does.',
      tr: 'Kurallardan önce sesler: kısa ve uzun ünlüler, ui, eu, ij. Her grubu dinle ve sesli tekrar et — kulağın ve ağzın buna hafızandan daha çok ihtiyaç duyuyor.',
    },
    tasks: [{ k: 'grammar', lesson: 'uitspraak-klinkers' }, { k: 'grammar', lesson: 'uitspraak-tweeklanken' }],
  },
  {
    id: 'a2-02', phase: P1,
    title: { en: 'Greetings and introducing yourself', tr: 'Selamlaşma ve kendini tanıtma' },
    why: {
      en: 'The first Dutch you will actually use out loud: hello, thank you, my name is, I come from.',
      tr: 'Sesli olarak gerçekten kullanacağın ilk Hollandaca: merhaba, teşekkürler, adım…, …’den geliyorum.',
    },
    tasks: [{ k: 'words', cat: 'social', n: 25 }, { k: 'grammar', lesson: 'pronouns' }, { k: 'dialogue', id: 'a2-kennismaken' }],
  },
  {
    id: 'a2-03', phase: P1,
    title: { en: 'zijn and hebben', tr: 'zijn ve hebben' },
    why: {
      en: 'The two verbs that appear in almost every Dutch sentence. Learn these two properly and half the language opens up.',
      tr: 'Neredeyse her Hollandaca cümlede geçen iki fiil. Bu ikisini iyi öğrenirsen dilin yarısı açılır.',
    },
    tasks: [{ k: 'grammar', lesson: 'zijn-hebben' }, { k: 'words', cat: 'verbs', n: 20 }],
  },
  {
    id: 'a2-04', phase: P1,
    title: { en: 'Present tense', tr: 'Geniş zaman' },
    why: {
      en: 'Now you can build your own sentences: ik werk, jij woont, hij komt. This is the engine of everyday Dutch.',
      tr: 'Artık kendi cümleni kurabilirsin: ik werk, jij woont, hij komt. Günlük Hollandacanın motoru bu.',
    },
    tasks: [{ k: 'grammar', lesson: 'present' }, { k: 'game', game: 'spell' }],
  },
  {
    id: 'a2-04b', phase: P1,
    title: { en: 'g, sch, r and word stress', tr: 'g, sch, r ve vurgu' },
    why: {
      en: 'The famous Dutch g, sch, the soft w, and where the stress falls — including the numbers everyone mispronounces (vijftien, veertig, tachtig).',
      tr: 'Meşhur Hollandaca g, sch, yumuşak w ve vurgunun yeri — herkesin yanlış söylediği sayılar dahil (vijftien, veertig, tachtig).',
    },
    tasks: [{ k: 'grammar', lesson: 'uitspraak-medeklinkers' }, { k: 'grammar', lesson: 'uitspraak-klemtoon' }],
  },
  {
    id: 'a2-05', phase: P1,
    title: { en: 'de or het', tr: 'de mi het mi' },
    why: {
      en: 'Every Dutch noun carries de or het and there is no shortcut — you learn it with the word. Better to start early than to relearn 500 words later.',
      tr: 'Her Hollandaca ismin de veya het’i vardır ve kestirme yok — kelimeyle birlikte öğrenilir. Erken başlamak, sonra 500 kelimeyi yeniden öğrenmekten iyidir.',
    },
    tasks: [{ k: 'grammar', lesson: 'articles' }, { k: 'game', game: 'article' }, { k: 'words', cat: 'housing', n: 20 }, { k: 'dialogue', id: 'a2-makelaar' }],
  },

  {
    id: 'a2-06', phase: P2,
    title: { en: 'Plurals', tr: 'Çoğul' },
    why: {
      en: 'One apple, two apples: -en or -s, and a few spelling changes that catch everyone out.',
      tr: 'Bir elma, iki elma: -en veya -s, artı herkesi yanıltan birkaç yazım değişikliği.',
    },
    tasks: [{ k: 'grammar', lesson: 'plural' }, { k: 'words', cat: 'food', n: 25 }],
  },
  {
    id: 'a2-07', phase: P2,
    title: { en: 'Adjectives', tr: 'Sıfatlar' },
    why: {
      en: 'When does an adjective take -e? This one rule shows up in every writing task in the exam.',
      tr: 'Sıfat ne zaman -e alır? Bu tek kural sınavdaki her yazma görevinde karşına çıkıyor.',
    },
    tasks: [{ k: 'grammar', lesson: 'adjectives' }, { k: 'words', cat: 'adjectives', n: 25 }],
  },
  {
    id: 'a2-08', phase: P2,
    title: { en: 'Word order', tr: 'Cümle dizilişi' },
    why: {
      en: 'The verb sits in second place — say it out of order and a Dutch person hears it immediately, even if every word is right.',
      tr: 'Fiil ikinci sırada durur — sırayı bozarsan bütün kelimeler doğru olsa bile Hollandalı bunu hemen fark eder.',
    },
    tasks: [{ k: 'grammar', lesson: 'word-order' }, { k: 'game', game: 'sentence' }, { k: 'dialogue', id: 'a2-cafe' }],
  },
  {
    id: 'a2-09', phase: P2,
    title: { en: 'Asking questions', tr: 'Soru sorma' },
    why: {
      en: 'Wie, wat, waar, hoeveel. The exam is made of questions, so you have to recognise them instantly.',
      tr: 'Wie, wat, waar, hoeveel. Sınav sorulardan oluşuyor; bunları anında tanıman gerekiyor.',
    },
    tasks: [{ k: 'grammar', lesson: 'questions' }, { k: 'words', cat: 'daily', n: 25 }, { k: 'dialogue', id: 'a2-weg-vragen' }],
  },
  {
    id: 'a2-10', phase: P2,
    title: { en: 'Saying no, and your first exam', tr: 'Olumsuzluk ve ilk sınavın' },
    why: {
      en: 'niet or geen — and then try a reading exam. Do not worry about the score: this is to see what an exam looks like from the inside.',
      tr: 'niet mi geen mi — ardından bir okuma sınavı dene. Puanı dert etme: amaç sınavın içeriden nasıl göründüğünü görmek.',
    },
    tasks: [{ k: 'grammar', lesson: 'negation' }, { k: 'exam', mod: 'lezen', n: 1 }],
  },

  {
    id: 'a2-11', phase: P3,
    title: { en: 'My, your, his', tr: 'Benim, senin, onun' },
    why: {
      en: 'Possessives, and the words for the people around you.',
      tr: 'İyelik zamirleri ve çevrendeki insanların adları.',
    },
    tasks: [{ k: 'grammar', lesson: 'possessives' }, { k: 'words', cat: 'family', n: 25 }, { k: 'dialogue', id: 'a2-afspreken' }],
  },
  {
    id: 'a2-12', phase: P3,
    title: { en: 'This and that', tr: 'Bu ve şu' },
    why: {
      en: 'deze, die, dit, dat — pointing at things, which you do constantly at a counter or in a shop.',
      tr: 'deze, die, dit, dat — bir şeyi işaret etmek. Bankoda ya da dükkânda sürekli buna ihtiyacın olur.',
    },
    tasks: [{ k: 'grammar', lesson: 'demonstratives' }, { k: 'words', cat: 'city', n: 20 }, { k: 'dialogue', id: 'a2-winterjas' }],
  },
  {
    id: 'a2-13', phase: P3,
    title: { en: 'can, must, may, want', tr: 'yapabilmek, zorunda olmak, izinli olmak, istemek' },
    why: {
      en: 'Modal verbs turn plain sentences into real requests: kan ik…, mag ik…, ik wil graag. This is how you actually get things done here.',
      tr: 'Kip fiilleri düz cümleyi gerçek bir ricaya çevirir: kan ik…, mag ik…, ik wil graag. Burada işini böyle hallediyorsun.',
    },
    tasks: [{ k: 'grammar', lesson: 'modals' }, { k: 'words', cat: 'health', n: 25 }, { k: 'dialogue', id: 'a2-huisarts' }],
  },
  {
    id: 'a2-14', phase: P3,
    title: { en: 'Separable verbs', tr: 'Ayrılabilen fiiller' },
    why: {
      en: 'opstaan becomes "ik sta om zeven uur op" — the verb splits and half of it flies to the end. Very Dutch, and very common.',
      tr: 'opstaan, "ik sta om zeven uur op" olur — fiil ikiye ayrılır ve yarısı cümlenin sonuna uçar. Çok Hollandaca ve çok yaygın.',
    },
    tasks: [{ k: 'grammar', lesson: 'separable' }, { k: 'words', cat: 'transport', n: 25 }, { k: 'dialogue', id: 'a2-nieuwe-baan' }],
  },
  {
    id: 'a2-15', phase: P3,
    title: { en: 'Numbers, the clock and dates', tr: 'Sayılar, saat ve tarih' },
    why: {
      en: 'half negen means 8:30, not 9:30. Get this wrong and you miss your appointment. Then train your ear with a listening exam.',
      tr: 'half negen 8:30 demek, 9:30 değil. Bunu karıştırırsan randevunu kaçırırsın. Ardından bir dinleme sınavıyla kulağını çalıştır.',
    },
    tasks: [{ k: 'grammar', lesson: 'numbers-time' }, { k: 'game', game: 'dictation' }, { k: 'exam', mod: 'luisteren', n: 1 }],
  },
  {
    id: 'a2-16', phase: P3,
    title: { en: 'Shopping and money', tr: 'Alışveriş ve para' },
    why: {
      en: 'Prices, paying, the bank, benefits. Together with numbers this is most of daily survival.',
      tr: 'Fiyatlar, ödeme, banka, yardımlar. Sayılarla birlikte günlük hayatta ayakta kalmanın büyük kısmı bu.',
    },
    tasks: [{ k: 'words', cat: 'shopping', n: 25 }, { k: 'words', cat: 'money', n: 20 }, { k: 'exam', mod: 'lezen', n: 2 }, { k: 'dialogue', id: 'a2-boodschappen' }],
  },

  {
    id: 'a2-17', phase: P4,
    title: { en: 'The past: perfectum', tr: 'Geçmiş zaman: perfectum' },
    why: {
      en: 'ik heb gewerkt. This is the past tense the Dutch actually speak in, so learn it before the other one.',
      tr: 'ik heb gewerkt. Hollandalıların konuşurken kullandığı geçmiş zaman bu; diğerinden önce bunu öğren.',
    },
    tasks: [{ k: 'grammar', lesson: 'perfectum' }, { k: 'game', game: 'verbs' }, { k: 'dialogue', id: 'a2-vakantie' }],
  },
  {
    id: 'a2-18', phase: P4,
    title: { en: 'The past: imperfectum', tr: 'Geçmiş zaman: imperfectum' },
    why: {
      en: 'ik werkte, ik was. The written past — you will meet it in every letter and story in the reading exam.',
      tr: 'ik werkte, ik was. Yazı dilinin geçmiş zamanı — okuma sınavındaki her mektup ve hikâyede karşına çıkar.',
    },
    tasks: [{ k: 'grammar', lesson: 'imperfectum' }, { k: 'words', cat: 'work', n: 25 }],
  },
  {
    id: 'a2-19', phase: P4,
    title: { en: 'Future and comparing', tr: 'Gelecek ve karşılaştırma' },
    why: {
      en: 'ik ga werken, groter dan, het grootst. Talking about tomorrow, and saying which one is better.',
      tr: 'ik ga werken, groter dan, het grootst. Yarından bahsetmek ve hangisinin daha iyi olduğunu söylemek.',
    },
    tasks: [{ k: 'grammar', lesson: 'future' }, { k: 'grammar', lesson: 'comparison' }, { k: 'words', cat: 'weather', n: 20 }],
  },
  {
    id: 'a2-20', phase: P4,
    title: { en: 'Prepositions and "er"', tr: 'Edatlar ve "er"' },
    why: {
      en: 'The small words that never translate one to one, plus "er", which has no equivalent in Turkish or English at all.',
      tr: 'Birebir çevrilmeyen küçük kelimeler; artı Türkçede ve İngilizcede karşılığı hiç olmayan "er".',
    },
    tasks: [{ k: 'grammar', lesson: 'prepositions' }, { k: 'grammar', lesson: 'er' }, { k: 'words', cat: 'gov', n: 25 }],
  },
  {
    id: 'a2-21', phase: P4,
    title: { en: 'Longer sentences', tr: 'Uzun cümleler' },
    why: {
      en: 'omdat, dat, om te — joining two ideas, and sending the verb to the end. Then write one yourself in a writing exam.',
      tr: 'omdat, dat, om te — iki fikri birleştirmek ve fiili sona göndermek. Sonra bir yazma sınavında kendin kur.',
    },
    tasks: [
      { k: 'grammar', lesson: 'subclauses' }, { k: 'grammar', lesson: 'conjunctions' },
      { k: 'grammar', lesson: 'om-te' }, { k: 'exam', mod: 'schrijven', n: 1 },
    ],
  },
  {
    id: 'a2-22', phase: P4,
    title: { en: 'Speaking naturally', tr: 'Doğal konuşma' },
    why: {
      en: 'Commands, reflexive verbs and the -je ending the Dutch put on everything. Then say something out loud in a speaking exam.',
      tr: 'Emir kipi, dönüşlü fiiller ve Hollandalıların her şeye eklediği -je. Ardından konuşma sınavında sesli bir şeyler söyle.',
    },
    tasks: [
      { k: 'grammar', lesson: 'imperative' }, { k: 'grammar', lesson: 'reflexive' },
      { k: 'grammar', lesson: 'diminutives' }, { k: 'exam', mod: 'spreken', n: 1 },
    ],
  },
  {
    id: 'a2-23', phase: P4,
    title: { en: 'Politeness and the last details', tr: 'Kibarlık ve son ayrıntılar' },
    why: {
      en: 'u instead of je, zou and graag, object pronouns, die and dat. This is the polish that makes an examiner mark you at A2.',
      tr: 'je yerine u, zou ve graag, nesne zamirleri, die ve dat. Değerlendiricinin sana A2 verdiren cilası bu.',
    },
    tasks: [
      { k: 'grammar', lesson: 'polite' }, { k: 'grammar', lesson: 'graag-hoeven' },
      { k: 'grammar', lesson: 'object-pronouns' }, { k: 'grammar', lesson: 'relative-clauses' },
      { k: 'exam', mod: 'knm', n: 1 },
    ],
  },
  {
    id: 'a2-24', phase: P4,
    title: { en: 'Full exam rehearsal', tr: 'Tam sınav provası' },
    why: {
      en: 'One exam from each part, back to back, the way the real day works. After this the route is done — carry on with the exam list until you pass comfortably.',
      tr: 'Her bölümden birer sınav, arka arkaya, gerçek gündeki gibi. Bundan sonra rota biter — rahatça geçene kadar sınav listesinden devam et.',
    },
    tasks: [
      { k: 'exam', mod: 'lezen', n: 3 }, { k: 'exam', mod: 'luisteren', n: 2 },
      { k: 'exam', mod: 'schrijven', n: 2 }, { k: 'exam', mod: 'spreken', n: 2 },
      { k: 'exam', mod: 'knm', n: 2 },
    ],
  },
];

// B1 and B2 learners already know how to study, so their route is built from the course
// itself: three grammar lessons, a batch of words and an exam per step.
export function buildRoute(level, lessons, cats) {
  if (level === 'A2') return ROUTE_A2;
  const mods = ['lezen', 'luisteren', 'schrijven', 'spreken', 'knm'];
  const dialogues = DIALOGUES.filter((d) => d.level === level);
  const steps = [];
  for (let i = 0, s = 0; i < lessons.length; i += 3, s += 1) {
    const chunk = lessons.slice(i, i + 3);
    const cat = cats[s % Math.max(cats.length, 1)];
    steps.push({
      id: `${level}-${String(s + 1).padStart(2, '0')}`,
      phase: { en: `${level} step by step`, tr: `${level} adım adım` },
      title: chunk[0].title,
      why: {
        en: `Three grammar points and a batch of ${cat?.en?.toLowerCase() || 'new'} words, then an exam to check it landed.`,
        tr: `Üç gramer konusu ve bir grup ${cat?.tr?.toLowerCase() || 'yeni'} kelimesi, ardından oturup oturmadığını ölçen bir sınav.`,
      },
      tasks: [
        ...chunk.map((l) => ({ k: 'grammar', lesson: l.id })),
        ...(cat ? [{ k: 'words', cat: cat.id, n: 25 }] : []),
        ...(dialogues[s] ? [{ k: 'dialogue', id: dialogues[s].id }] : []),
        { k: 'exam', mod: mods[s % mods.length], n: s + 1 },
      ],
    });
  }
  return steps;
}
