// Complete A2 grammar course, bilingual EN/TR. Examples in Dutch with EN+TR translations.
export const GRAMMAR = [
  {
    id: 'pronouns',
    title: { en: 'Personal pronouns', tr: 'Kişi zamirleri' },
    body: [
      { en: 'Dutch personal pronouns have a subject form (who does the action) and an object form (who receives it). In spoken language "je" is used instead of "jij" when there is no emphasis. "U" is the polite form for one or more people.', tr: 'Hollandaca kişi zamirlerinin özne hali (eylemi yapan) ve nesne hali (eylemden etkilenen) vardır. Konuşma dilinde vurgu yoksa "jij" yerine "je" kullanılır. "U" bir veya birden fazla kişi için kibar hitaptır.' },
      { en: '"Ze" can mean "she" or "they" — the verb tells you which: "ze werkt" (she works), "ze werken" (they work).', tr: '"Ze" hem "o (kadın)" hem "onlar" olabilir — fiil hangisi olduğunu gösterir: "ze werkt" (o çalışıyor), "ze werken" (onlar çalışıyor).' },
    ],
    tables: [
      {
        head: [{ en: 'Subject', tr: 'Özne' }, { en: 'Object', tr: 'Nesne' }, { en: 'Meaning', tr: 'Anlam' }],
        rows: [
          ['ik', 'mij / me', 'I — ben'],
          ['jij / je', 'jou / je', 'you — sen'],
          ['u', 'u', 'you (polite) — siz'],
          ['hij', 'hem', 'he — o (erkek)'],
          ['zij / ze', 'haar', 'she — o (kadın)'],
          ['het', 'het', 'it — o (şey)'],
          ['wij / we', 'ons', 'we — biz'],
          ['jullie', 'jullie', 'you (plural) — sizler'],
          ['zij / ze', 'hen / ze', 'they — onlar'],
        ],
      },
    ],
    ex: [
      { nl: 'Ik zie hem elke dag.', en: 'I see him every day.', tr: 'Onu her gün görüyorum.' },
      { nl: 'Kun je mij helpen?', en: 'Can you help me?', tr: 'Bana yardım edebilir misin?' },
      { nl: 'Wij geven jullie de sleutels.', en: 'We give you (pl.) the keys.', tr: 'Size anahtarları veriyoruz.' },
      { nl: 'Kent u haar?', en: 'Do you (polite) know her?', tr: 'Onu tanıyor musunuz?' },
    ],
  },
  {
    id: 'zijn-hebben',
    title: { en: 'The verbs zijn (to be) and hebben (to have)', tr: 'Zijn (olmak) ve hebben (sahip olmak) fiilleri' },
    body: [
      { en: 'Zijn and hebben are the two most important Dutch verbs. They are irregular, so you must memorise them. They are also used as helper verbs in the perfect tense (see Perfectum).', tr: 'Zijn ve hebben Hollandacanın en önemli iki fiilidir. Düzensizdir, ezberlenmeleri gerekir. Ayrıca geçmiş zamanda (Perfectum) yardımcı fiil olarak kullanılırlar.' },
    ],
    tables: [
      {
        head: ['', 'zijn', 'hebben'],
        rows: [
          ['ik', 'ben', 'heb'],
          ['jij/u', 'bent', 'hebt (u heeft)'],
          ['hij/zij/het', 'is', 'heeft'],
          ['wij/jullie/zij', 'zijn', 'hebben'],
        ],
      },
    ],
    ex: [
      { nl: 'Ik ben moe.', en: 'I am tired.', tr: 'Yorgunum.' },
      { nl: 'Zij is verpleegkundige.', en: 'She is a nurse.', tr: 'O hemşiredir.' },
      { nl: 'Wij hebben twee kinderen.', en: 'We have two children.', tr: 'İki çocuğumuz var.' },
      { nl: 'Heb jij een fiets?', en: 'Do you have a bicycle?', tr: 'Bisikletin var mı?' },
    ],
  },
  {
    id: 'present',
    title: { en: 'Present tense (regular verbs)', tr: 'Şimdiki/geniş zaman (düzenli fiiller)' },
    body: [
      { en: 'Find the stem: infinitive minus -en (werken -> werk). Rules: ik = stem; jij/u = stem + t; hij/zij = stem + t; wij/jullie/zij = infinitive. When jij comes AFTER the verb (question), the -t drops: "Werk jij?"', tr: 'Kök bulunur: mastardan -en atılır (werken -> werk). Kurallar: ik = kök; jij/u = kök + t; hij/zij = kök + t; wij/jullie/zij = mastar. Soru cümlesinde jij fiilden SONRA gelirse -t düşer: "Werk jij?"' },
      { en: 'Spelling: long vowels stay long (maken -> ik maak), v -> f and z -> s at the end (leven -> ik leef, reizen -> ik reis), no double consonant at the end (zitten -> ik zit).', tr: 'Yazım: uzun ünlüler uzun kalır (maken -> ik maak), sonda v -> f ve z -> s olur (leven -> ik leef, reizen -> ik reis), sonda çift ünsüz olmaz (zitten -> ik zit).' },
    ],
    tables: [
      {
        head: ['', 'werken', 'maken', 'wonen'],
        rows: [
          ['ik', 'werk', 'maak', 'woon'],
          ['jij/u/hij/zij', 'werkt', 'maakt', 'woont'],
          ['wij/jullie/zij', 'werken', 'maken', 'wonen'],
        ],
      },
    ],
    ex: [
      { nl: 'Ik woon in Amsterdam.', en: 'I live in Amsterdam.', tr: 'Amsterdam’da oturuyorum.' },
      { nl: 'Hij werkt in een fabriek.', en: 'He works in a factory.', tr: 'O bir fabrikada çalışıyor.' },
      { nl: 'Maak jij het eten?', en: 'Are you making the food?', tr: 'Yemeği sen mi yapıyorsun?' },
      { nl: 'Wij leren Nederlands.', en: 'We are learning Dutch.', tr: 'Hollandaca öğreniyoruz.' },
    ],
  },
  {
    id: 'articles',
    title: { en: 'Articles: de, het, een', tr: 'Tanımlıklar: de, het, een' },
    body: [
      { en: 'Dutch has two definite articles: de and het. About 75% of nouns take de. All plurals take de (het huis -> de huizen). All diminutives take het (het meisje, het kopje). Een (a/an) is used for all nouns.', tr: 'Hollandacada iki belirli tanımlık vardır: de ve het. İsimlerin yaklaşık %75’i de alır. Tüm çoğullar de alır (het huis -> de huizen). Tüm küçültmeler het alır (het meisje, het kopje). Een (bir) tüm isimlerle kullanılır.' },
      { en: 'There is no perfect rule — learn each noun WITH its article. Always de: people (de man), professions, fruits/vegetables, rivers/mountains. Always het: diminutives, languages, metals, words ending in -isme, verbs used as nouns (het eten).', tr: 'Kusursuz bir kural yoktur — her ismi tanımlığıyla BİRLİKTE öğrenin. Hep de: insanlar (de man), meslekler, meyve/sebzeler, nehirler/dağlar. Hep het: küçültmeler, diller, metaller, -isme ile bitenler, isimleşen fiiller (het eten).' },
    ],
    ex: [
      { nl: 'De man leest het boek.', en: 'The man reads the book.', tr: 'Adam kitabı okuyor.' },
      { nl: 'Het kind speelt in de tuin.', en: 'The child plays in the garden.', tr: 'Çocuk bahçede oynuyor.' },
      { nl: 'Ik koop een brood en een krant.', en: 'I buy a bread and a newspaper.', tr: 'Bir ekmek ve bir gazete alıyorum.' },
      { nl: 'Het meisje drinkt het kopje thee.', en: 'The girl drinks the cup of tea.', tr: 'Kız, fincan çayı içiyor.' },
    ],
  },
  {
    id: 'plural',
    title: { en: 'Plural of nouns', tr: 'İsimlerin çoğulu' },
    body: [
      { en: 'Two main endings: -en (most common) and -s. Use -s after unstressed -el, -er, -en, -je and foreign words (de tafel -> de tafels, de auto -> de auto’s). Use -en for most other nouns (de stoel -> de stoelen).', tr: 'İki ana ek vardır: -en (en yaygın) ve -s. Vurgusuz -el, -er, -en, -je ile ve yabancı kelimelerde -s kullanılır (de tafel -> de tafels, de auto -> de auto’s). Diğer çoğu isimde -en (de stoel -> de stoelen).' },
      { en: 'Spelling changes with -en: open the syllable (de maan -> de manen), double the consonant (de man -> de mannen), f -> v and s -> z (de brief -> de brieven, het huis -> de huizen). Vowel + s takes apostrophe: de foto’s.', tr: '-en eklenirken yazım değişir: hece açılır (de maan -> de manen), ünsüz ikizleşir (de man -> de mannen), f -> v ve s -> z olur (de brief -> de brieven, het huis -> de huizen). Ünlü + s kesme işareti alır: de foto’s.' },
    ],
    ex: [
      { nl: 'één kind, twee kinderen', en: 'one child, two children', tr: 'bir çocuk, iki çocuk' },
      { nl: 'één huis, twee huizen', en: 'one house, two houses', tr: 'bir ev, iki ev' },
      { nl: 'één tafel, twee tafels', en: 'one table, two tables', tr: 'bir masa, iki masa' },
      { nl: 'één brief, twee brieven', en: 'one letter, two letters', tr: 'bir mektup, iki mektup' },
    ],
  },
  {
    id: 'adjectives',
    title: { en: 'Adjectives: when to add -e', tr: 'Sıfatlar: ne zaman -e eklenir' },
    body: [
      { en: 'Before a noun the adjective usually gets -e: de grote man, het grote huis, de grote huizen. Exception: NO -e with een + het-word (een groot huis). After the noun (with zijn) never -e: het huis is groot.', tr: 'İsimden önce sıfat genellikle -e alır: de grote man, het grote huis, de grote huizen. İstisna: een + het-kelimesiyle -e YOK (een groot huis). İsimden sonra (zijn ile) asla -e almaz: het huis is groot.' },
      { en: 'Summary: only "een + het-word singular" keeps the adjective bare. Everything else (de-words, plurals, definite article) takes -e.', tr: 'Özet: sadece "een + tekil het-kelimesi" sıfatı yalın bırakır. Diğer her durumda (de-kelimeleri, çoğullar, belirli tanımlık) -e gelir.' },
    ],
    tables: [
      {
        head: ['', 'de-woord', 'het-woord'],
        rows: [
          ['met de/het', 'de grote man', 'het grote huis'],
          ['met een', 'een grote man', 'een groot huis'],
          ['meervoud', 'grote mannen', 'grote huizen'],
        ],
      },
    ],
    ex: [
      { nl: 'Ik zoek een goedkope woning.', en: 'I am looking for a cheap house.', tr: 'Ucuz bir konut arıyorum.' },
      { nl: 'Dat is een mooi huis.', en: 'That is a beautiful house.', tr: 'O güzel bir ev.' },
      { nl: 'De nieuwe collega is aardig.', en: 'The new colleague is nice.', tr: 'Yeni iş arkadaşı nazik.' },
      { nl: 'Het weer is slecht vandaag.', en: 'The weather is bad today.', tr: 'Bugün hava kötü.' },
    ],
  },
  {
    id: 'word-order',
    title: { en: 'Word order: verb in second position', tr: 'Kelime dizilişi: fiil ikinci sırada' },
    body: [
      { en: 'In a Dutch main clause the conjugated verb is ALWAYS the second element. If the sentence starts with something else (time, place), subject and verb switch (inversion): "Morgen ga ik naar de markt."', tr: 'Hollandaca ana cümlede çekimli fiil DAİMA ikinci ögedir. Cümle başka bir şeyle başlarsa (zaman, yer), özne ile fiil yer değiştirir (devrik yapı): "Morgen ga ik naar de markt."' },
      { en: 'Other verbs (infinitives, participles) go to the END: "Ik wil morgen een fiets kopen." Time usually comes before place: "Ik ga morgen naar Utrecht" (Time-Manner-Place).', tr: 'Diğer fiiller (mastarlar, ortaçlar) cümlenin SONUNA gider: "Ik wil morgen een fiets kopen." Zaman genellikle yerden önce gelir: "Ik ga morgen naar Utrecht" (Zaman-Şekil-Yer).' },
    ],
    ex: [
      { nl: 'Ik ga morgen naar de dokter.', en: 'I am going to the doctor tomorrow.', tr: 'Yarın doktora gidiyorum.' },
      { nl: 'Morgen ga ik naar de dokter.', en: 'Tomorrow I am going to the doctor.', tr: 'Yarın doktora gidiyorum (vurgu yarında).' },
      { nl: 'In Nederland fietsen veel mensen.', en: 'In the Netherlands many people cycle.', tr: 'Hollanda’da birçok insan bisiklete biner.' },
      { nl: 'Ik moet vandaag mijn huiswerk maken.', en: 'I have to do my homework today.', tr: 'Bugün ödevimi yapmam gerekiyor.' },
    ],
  },
  {
    id: 'questions',
    title: { en: 'Questions', tr: 'Soru cümleleri' },
    body: [
      { en: 'Yes/no questions: verb first, then subject: "Werk je morgen?" Question-word questions start with the question word, verb second: "Waar woon je?"', tr: 'Evet/hayır soruları: önce fiil, sonra özne: "Werk je morgen?" Soru kelimeli sorular soru kelimesiyle başlar, fiil ikinci sırada: "Waar woon je?"' },
      { en: 'Question words: wie (who), wat (what), waar (where), wanneer (when), waarom (why), hoe (how), hoeveel (how much/many), welke/welk (which).', tr: 'Soru kelimeleri: wie (kim), wat (ne), waar (nerede), wanneer (ne zaman), waarom (neden), hoe (nasıl), hoeveel (ne kadar/kaç), welke/welk (hangi).' },
    ],
    ex: [
      { nl: 'Waar is het station?', en: 'Where is the station?', tr: 'İstasyon nerede?' },
      { nl: 'Hoe laat begint de les?', en: 'What time does the lesson start?', tr: 'Ders saat kaçta başlıyor?' },
      { nl: 'Waarom ben je te laat?', en: 'Why are you late?', tr: 'Neden geç kaldın?' },
      { nl: 'Heeft u een afspraak?', en: 'Do you have an appointment?', tr: 'Randevunuz var mı?' },
    ],
  },
  {
    id: 'negation',
    title: { en: 'Negation: niet and geen', tr: 'Olumsuzluk: niet ve geen' },
    body: [
      { en: 'Use GEEN to negate a noun with "een" or no article: "Ik heb geen auto." Use NIET in all other cases: "Ik werk niet", "Het huis is niet groot", "Ik ga niet naar school."', tr: '"Een" alan veya tanımlıksız bir ismi olumsuzlamak için GEEN kullanılır: "Ik heb geen auto." Diğer tüm durumlarda NIET: "Ik werk niet", "Het huis is niet groot", "Ik ga niet naar school."' },
      { en: 'Niet usually comes after the object and before prepositions/adjectives: "Ik zie de man niet." At the end of a simple sentence: "Ik slaap niet."', tr: 'Niet genellikle nesneden sonra, edat ve sıfatlardan önce gelir: "Ik zie de man niet." Basit cümlede sonda: "Ik slaap niet."' },
    ],
    ex: [
      { nl: 'Ik heb geen tijd.', en: 'I have no time.', tr: 'Vaktim yok.' },
      { nl: 'Zij drinkt geen koffie.', en: 'She does not drink coffee.', tr: 'O kahve içmez.' },
      { nl: 'Hij komt vandaag niet.', en: 'He is not coming today.', tr: 'O bugün gelmiyor.' },
      { nl: 'Het is niet duur.', en: 'It is not expensive.', tr: 'Pahalı değil.' },
    ],
  },
  {
    id: 'possessives',
    title: { en: 'Possessive pronouns', tr: 'İyelik zamirleri' },
    body: [
      { en: 'mijn (my), jouw/je (your), uw (your polite), zijn (his), haar (her), ons/onze (our), jullie (your pl.), hun (their). Ons is used with het-words (ons huis), onze with de-words and plurals (onze auto, onze kinderen).', tr: 'mijn (benim), jouw/je (senin), uw (sizin kibar), zijn (onun-erkek), haar (onun-kadın), ons/onze (bizim), jullie (sizin), hun (onların). Ons het-kelimeleriyle (ons huis), onze de-kelimeleri ve çoğullarla kullanılır (onze auto, onze kinderen).' },
    ],
    ex: [
      { nl: 'Mijn vrouw werkt in het ziekenhuis.', en: 'My wife works in the hospital.', tr: 'Eşim hastanede çalışıyor.' },
      { nl: 'Ons huis heeft een tuin.', en: 'Our house has a garden.', tr: 'Evimizin bahçesi var.' },
      { nl: 'Onze kinderen gaan naar de basisschool.', en: 'Our children go to primary school.', tr: 'Çocuklarımız ilkokula gidiyor.' },
      { nl: 'Wat is uw telefoonnummer?', en: 'What is your phone number?', tr: 'Telefon numaranız nedir?' },
    ],
  },
  {
    id: 'demonstratives',
    title: { en: 'Demonstratives: deze, die, dit, dat', tr: 'İşaret sıfatları: deze, die, dit, dat' },
    body: [
      { en: 'For de-words: deze (this) and die (that). For het-words: dit (this) and dat (that). Plural always uses deze/die: deze boeken, die huizen.', tr: 'De-kelimeleri için: deze (bu) ve die (şu/o). Het-kelimeleri için: dit (bu) ve dat (şu/o). Çoğulda her zaman deze/die: deze boeken, die huizen.' },
    ],
    tables: [
      {
        head: ['', { en: 'near (this)', tr: 'yakın (bu)' }, { en: 'far (that)', tr: 'uzak (şu/o)' }],
        rows: [
          ['de-woord', 'deze man', 'die man'],
          ['het-woord', 'dit huis', 'dat huis'],
          ['meervoud', 'deze huizen', 'die huizen'],
        ],
      },
    ],
    ex: [
      { nl: 'Deze jas is te duur.', en: 'This coat is too expensive.', tr: 'Bu mont çok pahalı.' },
      { nl: 'Dat huis is oud.', en: 'That house is old.', tr: 'O ev eski.' },
      { nl: 'Dit formulier moet u invullen.', en: 'You must fill in this form.', tr: 'Bu formu doldurmalısınız.' },
      { nl: 'Die schoenen zijn mooi.', en: 'Those shoes are nice.', tr: 'O ayakkabılar güzel.' },
    ],
  },
  {
    id: 'modals',
    title: { en: 'Modal verbs: kunnen, moeten, mogen, willen, zullen', tr: 'Kip fiilleri: kunnen, moeten, mogen, willen, zullen' },
    body: [
      { en: 'kunnen = can, moeten = must, mogen = may (permission), willen = want, zullen = shall/will. The modal verb is in second position; the main verb goes to the END as infinitive: "Ik kan goed zwemmen."', tr: 'kunnen = -ebilmek, moeten = -meli, mogen = izinli olmak, willen = istemek, zullen = -ecek (öneri/gelecek). Kip fiili ikinci sırada durur; asıl fiil mastar olarak SONA gider: "Ik kan goed zwemmen."' },
    ],
    tables: [
      {
        head: ['', 'kunnen', 'moeten', 'mogen', 'willen', 'zullen'],
        rows: [
          ['ik', 'kan', 'moet', 'mag', 'wil', 'zal'],
          ['jij/u', 'kunt/kan', 'moet', 'mag', 'wilt', 'zult/zal'],
          ['hij/zij', 'kan', 'moet', 'mag', 'wil', 'zal'],
          ['meervoud', 'kunnen', 'moeten', 'mogen', 'willen', 'zullen'],
        ],
      },
    ],
    ex: [
      { nl: 'Ik moet morgen werken.', en: 'I have to work tomorrow.', tr: 'Yarın çalışmam gerekiyor.' },
      { nl: 'Mag ik hier parkeren?', en: 'May I park here?', tr: 'Buraya park edebilir miyim?' },
      { nl: 'Wij willen een huis kopen.', en: 'We want to buy a house.', tr: 'Bir ev almak istiyoruz.' },
      { nl: 'Kunt u dat herhalen?', en: 'Can you repeat that?', tr: 'Tekrar edebilir misiniz?' },
      { nl: 'Zal ik je helpen?', en: 'Shall I help you?', tr: 'Sana yardım edeyim mi?' },
    ],
  },
  {
    id: 'separable',
    title: { en: 'Separable verbs', tr: 'Ayrılabilen fiiller' },
    body: [
      { en: 'Verbs like opstaan, meenemen, invullen split in the present tense: the prefix goes to the end: "Ik sta om zeven uur op." With a modal verb they stay together at the end: "Ik moet vroeg opstaan."', tr: 'Opstaan, meenemen, invullen gibi fiiller şimdiki zamanda ayrılır: ön ek sona gider: "Ik sta om zeven uur op." Kip fiiliyle kullanılınca sonda bitişik kalır: "Ik moet vroeg opstaan."' },
      { en: 'In the perfectum, ge- goes between prefix and stem: opgestaan, meegenomen, ingevuld. Common separable verbs: aankomen, afspreken, opbellen, uitnodigen, terugkomen, inschrijven.', tr: 'Perfectum’da ge- ön ek ile kök arasına girer: opgestaan, meegenomen, ingevuld. Yaygın ayrılabilen fiiller: aankomen, afspreken, opbellen, uitnodigen, terugkomen, inschrijven.' },
    ],
    ex: [
      { nl: 'De trein komt om tien uur aan.', en: 'The train arrives at ten o’clock.', tr: 'Tren saat onda varıyor.' },
      { nl: 'Ik vul het formulier in.', en: 'I fill in the form.', tr: 'Formu dolduruyorum.' },
      { nl: 'Neem je paspoort mee!', en: 'Take your passport with you!', tr: 'Pasaportunu yanına al!' },
      { nl: 'Wij nodigen jullie uit voor het feest.', en: 'We invite you to the party.', tr: 'Sizi partiye davet ediyoruz.' },
    ],
  },
  {
    id: 'perfectum',
    title: { en: 'Perfect tense (perfectum)', tr: 'Geçmiş zaman (perfectum)' },
    body: [
      { en: 'The perfectum = hebben/zijn + past participle, and is the normal spoken past tense: "Ik heb gewerkt." Regular participle: ge + stem + t/d. Use t if the stem ends in one of ’t kofschip letters (t, k, f, s, ch, p), otherwise d: gewerkt, gemaakt, gewoond, geleerd.', tr: 'Perfectum = hebben/zijn + geçmiş ortaç; konuşmada asıl geçmiş zamandır: "Ik heb gewerkt." Düzenli ortaç: ge + kök + t/d. Kök ’t kofschip harflerinden (t, k, f, s, ch, p) biriyle bitiyorsa t, yoksa d: gewerkt, gemaakt, gewoond, geleerd.' },
      { en: 'Zijn is used with movement/change verbs: gaan (ik ben gegaan), komen, beginnen, blijven, worden. Irregular participles must be learnt: gegeten, gedronken, gekocht, gezien, geweest, gehad, gedaan, gekregen, geschreven, gelezen.', tr: 'Zijn; hareket/değişim fiilleriyle kullanılır: gaan (ik ben gegaan), komen, beginnen, blijven, worden. Düzensiz ortaçlar ezberlenmelidir: gegeten, gedronken, gekocht, gezien, geweest, gehad, gedaan, gekregen, geschreven, gelezen.' },
      { en: 'Verbs starting with be-, ge-, ver-, ont-, her- get NO ge-: betaald, verkocht, ontvangen, begonnen.', tr: 'be-, ge-, ver-, ont-, her- ile başlayan fiiller ge- ALMAZ: betaald, verkocht, ontvangen, begonnen.' },
    ],
    ex: [
      { nl: 'Ik heb gisteren gewerkt.', en: 'I worked yesterday.', tr: 'Dün çalıştım.' },
      { nl: 'Wij zijn naar de markt gegaan.', en: 'We went to the market.', tr: 'Pazara gittik.' },
      { nl: 'Heb je de brief gelezen?', en: 'Have you read the letter?', tr: 'Mektubu okudun mu?' },
      { nl: 'Zij heeft de rekening betaald.', en: 'She paid the bill.', tr: 'O faturayı ödedi.' },
    ],
  },
  {
    id: 'imperfectum',
    title: { en: 'Simple past (imperfectum)', tr: 'Di’li geçmiş (imperfectum)' },
    body: [
      { en: 'Used for stories and descriptions in the past. Regular: stem + te(n) after ’t kofschip letters, otherwise + de(n): werkte, maakte, woonde, leerde. Singular and plural: ik werkte / wij werkten.', tr: 'Geçmişteki anlatım ve betimlemelerde kullanılır. Düzenli: ’t kofschip harflerinden sonra kök + te(n), diğerlerinde + de(n): werkte, maakte, woonde, leerde. Tekil ve çoğul: ik werkte / wij werkten.' },
      { en: 'Important irregular forms: was/waren (zijn), had/hadden (hebben), ging (gaan), kwam (komen), deed (doen), zag (zien), at (eten), kocht (kopen), kon (kunnen), moest (moeten), wilde (willen), mocht (mogen).', tr: 'Önemli düzensiz biçimler: was/waren (zijn), had/hadden (hebben), ging (gaan), kwam (komen), deed (doen), zag (zien), at (eten), kocht (kopen), kon (kunnen), moest (moeten), wilde (willen), mocht (mogen).' },
    ],
    ex: [
      { nl: 'Vroeger woonde ik in Istanbul.', en: 'I used to live in Istanbul.', tr: 'Eskiden İstanbul’da otururdum.' },
      { nl: 'Het was gisteren koud.', en: 'It was cold yesterday.', tr: 'Dün hava soğuktu.' },
      { nl: 'Wij hadden geen tijd.', en: 'We had no time.', tr: 'Vaktimiz yoktu.' },
      { nl: 'Hij ging elke dag met de fiets.', en: 'He went by bike every day.', tr: 'Her gün bisikletle giderdi.' },
    ],
  },
  {
    id: 'future',
    title: { en: 'Future: gaan + infinitive and zullen', tr: 'Gelecek zaman: gaan + mastar ve zullen' },
    body: [
      { en: 'Most common future: gaan + infinitive: "Ik ga morgen werken." Zullen expresses promise/proposal: "Ik zal je bellen", "Zullen we gaan?" The present tense + time word is also very common: "Morgen werk ik."', tr: 'En yaygın gelecek: gaan + mastar: "Ik ga morgen werken." Zullen söz/öneri bildirir: "Ik zal je bellen", "Zullen we gaan?" Şimdiki zaman + zaman zarfı da çok yaygındır: "Morgen werk ik."' },
    ],
    ex: [
      { nl: 'Wij gaan volgend jaar verhuizen.', en: 'We are going to move next year.', tr: 'Gelecek yıl taşınacağız.' },
      { nl: 'Ik zal het formulier opsturen.', en: 'I will send the form.', tr: 'Formu göndereceğim.' },
      { nl: 'Zullen we samen oefenen?', en: 'Shall we practise together?', tr: 'Birlikte alıştırma yapalım mı?' },
      { nl: 'Volgende week begin ik met de cursus.', en: 'Next week I start the course.', tr: 'Gelecek hafta kursa başlıyorum.' },
    ],
  },
  {
    id: 'comparison',
    title: { en: 'Comparative and superlative', tr: 'Karşılaştırma ve üstünlük derecesi' },
    body: [
      { en: 'Comparative: adjective + er (groot -> groter). Use "dan" for than: "groter dan". Superlative: het + adjective + st: "het grootste huis". After -r add -der: duur -> duurder.', tr: 'Karşılaştırma: sıfat + er (groot -> groter). "Daha ... -den" için "dan": "groter dan". Üstünlük: het + sıfat + st: "het grootste huis". -r ile bitenlere -der eklenir: duur -> duurder.' },
      { en: 'Irregular: goed - beter - het best; veel - meer - het meest; weinig - minder - het minst; graag - liever - het liefst.', tr: 'Düzensiz: goed - beter - het best; veel - meer - het meest; weinig - minder - het minst; graag - liever - het liefst.' },
    ],
    ex: [
      { nl: 'De trein is sneller dan de bus.', en: 'The train is faster than the bus.', tr: 'Tren otobüsten daha hızlı.' },
      { nl: 'Dit is het goedkoopste brood.', en: 'This is the cheapest bread.', tr: 'Bu en ucuz ekmek.' },
      { nl: 'Ik drink liever thee dan koffie.', en: 'I prefer tea to coffee.', tr: 'Çayı kahveye tercih ederim.' },
      { nl: 'Nederlands is makkelijker dan je denkt.', en: 'Dutch is easier than you think.', tr: 'Hollandaca sandığından daha kolay.' },
    ],
  },
  {
    id: 'prepositions',
    title: { en: 'Prepositions', tr: 'Edatlar' },
    body: [
      { en: 'Common prepositions: in (in), op (on), aan (at/on), bij (at/near), naar (to), van (from/of), met (with), voor (for/before), na (after), onder (under), boven (above), naast (next to), tussen (between), tegenover (opposite).', tr: 'Yaygın edatlar: in (içinde), op (üstünde), aan (yanında/üzerinde), bij (yanında), naar (-e doğru), van (-den/-in), met (ile), voor (için/önce), na (sonra), onder (altında), boven (üstünde), naast (bitişiğinde), tussen (arasında), tegenover (karşısında).' },
      { en: 'Fixed combinations must be memorised: wachten op (wait for), kijken naar (look at), houden van (love), denken aan (think of), praten over (talk about), beginnen met (start with).', tr: 'Kalıp kullanımlar ezberlenmelidir: wachten op (beklemek), kijken naar (bakmak), houden van (sevmek), denken aan (düşünmek), praten over (hakkında konuşmak), beginnen met (başlamak).' },
    ],
    ex: [
      { nl: 'Het boek ligt op de tafel.', en: 'The book is on the table.', tr: 'Kitap masanın üstünde.' },
      { nl: 'Ik wacht op de bus.', en: 'I am waiting for the bus.', tr: 'Otobüsü bekliyorum.' },
      { nl: 'Zij woont naast de school.', en: 'She lives next to the school.', tr: 'O okulun bitişiğinde oturuyor.' },
      { nl: 'Wij kijken naar het journaal.', en: 'We watch the news.', tr: 'Haberleri izliyoruz.' },
    ],
  },
  {
    id: 'er',
    title: { en: 'The word "er"', tr: '"Er" kelimesi' },
    body: [
      { en: 'Er + zijn introduces something new: "Er is een probleem", "Er zijn veel mensen." Er also means "there" for place: "Ik woon er al twee jaar." With numbers: "Hoeveel kinderen heb je? Ik heb er twee."', tr: 'Er + zijn yeni bir şeyi tanıtır: "Er is een probleem", "Er zijn veel mensen." Er ayrıca yer için "orada" demektir: "Ik woon er al twee jaar." Sayılarla: "Kaç çocuğun var? Ik heb er twee (ondan iki tane var)."' },
    ],
    ex: [
      { nl: 'Er is vandaag geen les.', en: 'There is no lesson today.', tr: 'Bugün ders yok.' },
      { nl: 'Er zijn veel vacatures in de zorg.', en: 'There are many vacancies in healthcare.', tr: 'Sağlık sektöründe çok iş ilanı var.' },
      { nl: 'Ik werk er sinds januari.', en: 'I have worked there since January.', tr: 'Ocak’tan beri orada çalışıyorum.' },
      { nl: 'Heb je broers? Ja, ik heb er drie.', en: 'Do you have brothers? Yes, I have three (of them).', tr: 'Erkek kardeşin var mı? Evet, üç tane var.' },
    ],
  },
  {
    id: 'subclauses',
    title: { en: 'Subordinate clauses: verb to the end', tr: 'Yan cümleler: fiil sona' },
    body: [
      { en: 'After words like omdat (because), als (if/when), dat (that), toen (when-past), terwijl (while), voordat (before) the verb moves to the END: "Ik blijf thuis, omdat ik ziek ben."', tr: 'Omdat (çünkü), als (eğer/-diğinde), dat (ki), toen (geçmişte -dığında), terwijl (-iken), voordat (-meden önce) gibi kelimelerden sonra fiil SONA gider: "Ik blijf thuis, omdat ik ziek ben."' },
      { en: 'If the sentence STARTS with the subclause, the main clause begins with the verb: "Als het regent, blijf ik thuis."', tr: 'Cümle yan cümleyle BAŞLARSA, ana cümle fiille başlar: "Als het regent, blijf ik thuis."' },
    ],
    ex: [
      { nl: 'Ik leer Nederlands, omdat ik hier woon.', en: 'I learn Dutch because I live here.', tr: 'Burada yaşadığım için Hollandaca öğreniyorum.' },
      { nl: 'Als ik tijd heb, ga ik sporten.', en: 'If I have time, I go exercise.', tr: 'Vaktim olursa spora giderim.' },
      { nl: 'Hij zegt dat hij morgen komt.', en: 'He says that he is coming tomorrow.', tr: 'Yarın geleceğini söylüyor.' },
      { nl: 'Bel mij voordat je vertrekt.', en: 'Call me before you leave.', tr: 'Gitmeden önce beni ara.' },
    ],
  },
  {
    id: 'conjunctions',
    title: { en: 'Conjunctions: en, maar, want, of, dus', tr: 'Bağlaçlar: en, maar, want, of, dus' },
    body: [
      { en: 'These five conjunctions connect two main clauses WITHOUT changing word order: en (and), maar (but), want (because), of (or), dus (so). Compare: "want" keeps normal order, "omdat" sends the verb to the end.', tr: 'Bu beş bağlaç iki ana cümleyi kelime dizilişini DEĞİŞTİRMEDEN bağlar: en (ve), maar (ama), want (çünkü), of (veya), dus (bu yüzden). Karşılaştırın: "want" normal diziliş korur, "omdat" fiili sona atar.' },
    ],
    ex: [
      { nl: 'Ik wil komen, maar ik ben ziek.', en: 'I want to come, but I am ill.', tr: 'Gelmek istiyorum ama hastayım.' },
      { nl: 'Zij blijft thuis, want zij is moe.', en: 'She stays home because she is tired.', tr: 'Evde kalıyor çünkü yorgun.' },
      { nl: 'Wil je thee of koffie?', en: 'Do you want tea or coffee?', tr: 'Çay mı kahve mi istersin?' },
      { nl: 'Het regent, dus ik neem de bus.', en: 'It is raining, so I take the bus.', tr: 'Yağmur yağıyor, bu yüzden otobüse biniyorum.' },
    ],
  },
  {
    id: 'om-te',
    title: { en: 'om ... te + infinitive', tr: 'om ... te + mastar' },
    body: [
      { en: 'Expresses purpose (in order to): "Ik ga naar de winkel om brood te kopen." With separable verbs, te goes between prefix and verb: "om in te vullen." Also after adjectives: "Het is moeilijk om Nederlands te leren."', tr: 'Amaç bildirir (-mek için): "Ik ga naar de winkel om brood te kopen." Ayrılabilen fiillerde te ön ek ile fiil arasına girer: "om in te vullen." Sıfatlardan sonra da kullanılır: "Het is moeilijk om Nederlands te leren."' },
    ],
    ex: [
      { nl: 'Ik bel om een afspraak te maken.', en: 'I am calling to make an appointment.', tr: 'Randevu almak için arıyorum.' },
      { nl: 'Zij werkt om geld te verdienen.', en: 'She works to earn money.', tr: 'Para kazanmak için çalışıyor.' },
      { nl: 'Het is belangrijk om op tijd te komen.', en: 'It is important to be on time.', tr: 'Zamanında gelmek önemlidir.' },
      { nl: 'Ik heb geen tijd om te sporten.', en: 'I have no time to exercise.', tr: 'Spor yapacak vaktim yok.' },
    ],
  },
  {
    id: 'imperative',
    title: { en: 'Imperative', tr: 'Emir kipi' },
    body: [
      { en: 'Use the verb stem: "Kom hier!", "Vul het formulier in!" Polite form adds u: "Komt u binnen." Soften commands with "maar", "even", "alstublieft": "Ga maar zitten."', tr: 'Fiil kökü kullanılır: "Kom hier!", "Vul het formulier in!" Kibar biçimde u eklenir: "Komt u binnen." Emirler "maar", "even", "alstublieft" ile yumuşatılır: "Ga maar zitten."' },
    ],
    ex: [
      { nl: 'Neem uw paspoort mee.', en: 'Bring your passport.', tr: 'Pasaportunuzu getirin.' },
      { nl: 'Wacht even, alstublieft.', en: 'Wait a moment, please.', tr: 'Lütfen biraz bekleyin.' },
      { nl: 'Lees de vraag goed.', en: 'Read the question carefully.', tr: 'Soruyu dikkatlice oku.' },
      { nl: 'Komt u maandag terug.', en: 'Come back on Monday (polite).', tr: 'Pazartesi tekrar gelin.' },
    ],
  },
  {
    id: 'reflexive',
    title: { en: 'Reflexive verbs', tr: 'Dönüşlü fiiller' },
    body: [
      { en: 'Some verbs need a reflexive pronoun: zich wassen, zich voelen, zich inschrijven, zich vervelen, zich haasten. Forms: ik me, jij je, u zich/u, hij/zij zich, wij ons, jullie je, zij zich: "Ik voel me goed."', tr: 'Bazı fiiller dönüşlü zamir ister: zich wassen (yıkanmak), zich voelen (hissetmek), zich inschrijven (kaydolmak), zich vervelen (sıkılmak), zich haasten (acele etmek). Biçimler: ik me, jij je, u zich/u, hij/zij zich, wij ons, jullie je, zij zich: "Ik voel me goed."' },
    ],
    ex: [
      { nl: 'Ik voel me vandaag niet lekker.', en: 'I do not feel well today.', tr: 'Bugün kendimi iyi hissetmiyorum.' },
      { nl: 'Hij schrijft zich in voor de cursus.', en: 'He registers for the course.', tr: 'Kursa kaydoluyor.' },
      { nl: 'Wij vervelen ons nooit.', en: 'We are never bored.', tr: 'Biz hiç sıkılmayız.' },
      { nl: 'Was je handen en kleed je aan.', en: 'Wash your hands and get dressed.', tr: 'Ellerini yıka ve giyin.' },
    ],
  },
  {
    id: 'diminutives',
    title: { en: 'Diminutives (-je)', tr: 'Küçültme ekleri (-je)' },
    body: [
      { en: 'Very common in Dutch. Add -je (or -tje, -pje, -etje) to make something small or friendly: het huisje, het kopje, het bloemetje. ALL diminutives are het-words. Also used in fixed phrases: een kopje koffie, een uurtje.', tr: 'Hollandacada çok yaygındır. Bir şeyi küçük veya sevimli yapmak için -je (veya -tje, -pje, -etje) eklenir: het huisje, het kopje, het bloemetje. TÜM küçültmeler het-kelimesidir. Kalıplarda da: een kopje koffie, een uurtje.' },
    ],
    ex: [
      { nl: 'Wil je een kopje thee?', en: 'Would you like a cup of tea?', tr: 'Bir fincan çay ister misin?' },
      { nl: 'Het meisje speelt met het hondje.', en: 'The girl plays with the little dog.', tr: 'Kız, küçük köpekle oynuyor.' },
      { nl: 'Wij maken een uurtje pauze.', en: 'We take a break of about an hour.', tr: 'Bir saatlik mola veriyoruz.' },
      { nl: 'Een momentje, alstublieft.', en: 'One moment, please.', tr: 'Bir saniye lütfen.' },
    ],
  },
  {
    id: 'numbers-time',
    title: { en: 'Numbers, time and dates', tr: 'Sayılar, saat ve tarihler' },
    body: [
      {
        en: 'Start with 0-12, which you simply have to learn: nul, een, twee, drie, vier, vijf, zes, zeven, acht, negen, tien, elf, twaalf. From 13 to 19 you add -tien to the small number: dertien, veertien, vijftien, zestien, zeventien, achttien, negentien. Watch the two irregular ones: 13 is dertien (not drietien) and 14 is veertien (not viertien).',
        tr: 'Önce ezberlenmesi gereken 0-12: nul, een, twee, drie, vier, vijf, zes, zeven, acht, negen, tien, elf, twaalf. 13’ten 19’a kadar küçük sayının sonuna -tien eklenir: dertien, veertien, vijftien, zestien, zeventien, achttien, negentien. İki düzensize dikkat: 13 dertien (drietien değil), 14 veertien (viertien değil).',
      },
      {
        en: 'The tens end in -tig: twintig (20), dertig, veertig, vijftig, zestig, zeventig, tachtig (80 — note the t!), negentig. Then comes the rule that trips everyone up: from 21 to 99 the small number goes FIRST, joined by en: eenentwintig (21 = one-and-twenty), vijfendertig (35), zevenenzeventig (77). Written as one word. If the small number ends in a vowel it takes a trema: drieëntwintig (23), tweeënveertig (42).',
        tr: 'Onluklar -tig ile biter: twintig (20), dertig, veertig, vijftig, zestig, zeventig, tachtig (80 — t harfine dikkat!), negentig. Sonra herkesin takıldığı kural gelir: 21’den 99’a kadar küçük sayı ÖNCE söylenir ve araya en girer: eenentwintig (21 = bir-ve-yirmi), vijfendertig (35), zevenenzeventig (77). Bitişik yazılır. Küçük sayı sesli harfle bitiyorsa üzerine iki nokta konur: drieëntwintig (23), tweeënveertig (42).',
      },
      {
        en: 'Bigger numbers: honderd (100), tweehonderd (200), duizend (1000), tweeduizend (2000), een miljoen. You do not say "een honderd" — honderd on its own is enough. 245 = tweehonderdvijfenveertig. Years are read as one number: 2026 = tweeduizend zesentwintig. Prices: € 12,50 = twaalf euro vijftig.',
        tr: 'Büyük sayılar: honderd (100), tweehonderd (200), duizend (1000), tweeduizend (2000), een miljoen. "een honderd" denmez, tek başına honderd yeterlidir. 245 = tweehonderdvijfenveertig. Yıllar tek sayı gibi okunur: 2026 = tweeduizend zesentwintig. Fiyatlar: € 12,50 = twaalf euro vijftig.',
      },
      {
        en: 'Ordinals (first, second…) add -de or -ste: 1 eerste, 2 tweede, 3 derde, 4 vierde, 5 vijfde, 8 achtste, 20 twintigste. Rule of thumb: -de up to 19, -ste from 20 upwards, with eerste, derde and achtste as the ones to remember.',
        tr: 'Sıra sayıları -de veya -ste alır: 1 eerste, 2 tweede, 3 derde, 4 vierde, 5 vijfde, 8 achtste, 20 twintigste. Pratik kural: 19’a kadar -de, 20’den itibaren -ste; eerste, derde ve achtste ise ezberlenmesi gerekenler.',
      },
      {
        en: 'The clock is the second trap. "half negen" is 8:30, not 9:30 — Dutch counts the half hour TOWARDS the next hour, exactly like Turkish "dokuza yarım". Around the half hour you say it relative to the half: "tien over half negen" = 8:40, "vijf voor half negen" = 8:25.',
        tr: 'İkinci tuzak saattir. "half negen" 8:30 demektir, 9:30 değil — Hollandaca yarım saati bir sonraki saate doğru sayar, tıpkı "dokuza yarım" gibi. Buçuk çevresinde ise buçuğa göre söylenir: "tien over half negen" = 8:40, "vijf voor half negen" = 8:25.',
      },
      {
        en: 'Dates go day-month-year and months are not capitalised: 12 mei 2026. Spoken: "twaalf mei tweeduizend zesentwintig". On a form you usually see 12-05-2026. Phone numbers are read in pairs: 06-12345678 = "nul zes, twaalf, vierendertig, zesenvijftig, achtenzeventig".',
        tr: 'Tarihler gün-ay-yıl sırasıyla yazılır ve aylar küçük harfle başlar: 12 mei 2026. Sözlü: "twaalf mei tweeduizend zesentwintig". Formlarda genelde 12-05-2026 görürsünüz. Telefon numaraları ikişerli okunur: 06-12345678 = "nul zes, twaalf, vierendertig, zesenvijftig, achtenzeventig".',
      },
    ],
    tables: [
      {
        head: [{ en: 'Number', tr: 'Sayı' }, 'Nederlands', { en: 'Number', tr: 'Sayı' }, 'Nederlands'],
        rows: [
          ['0', 'nul', '13', 'dertien'],
          ['1', 'een', '14', 'veertien'],
          ['2', 'twee', '15', 'vijftien'],
          ['3', 'drie', '16', 'zestien'],
          ['4', 'vier', '17', 'zeventien'],
          ['5', 'vijf', '18', 'achttien'],
          ['6', 'zes', '19', 'negentien'],
          ['7', 'zeven', '20', 'twintig'],
          ['8', 'acht', '30', 'dertig'],
          ['9', 'negen', '40', 'veertig'],
          ['10', 'tien', '50', 'vijftig'],
          ['11', 'elf', '80', 'tachtig'],
          ['12', 'twaalf', '100', 'honderd'],
        ],
      },
      {
        head: [{ en: 'Reversed', tr: 'Ters okunuş' }, 'Nederlands'],
        rows: [
          ['21', 'eenentwintig'],
          ['23', 'drieëntwintig'],
          ['35', 'vijfendertig'],
          ['48', 'achtenveertig'],
          ['77', 'zevenenzeventig'],
          ['99', 'negenennegentig'],
          ['245', 'tweehonderdvijfenveertig'],
        ],
      },
      {
        head: [{ en: 'Clock', tr: 'Saat' }, 'Nederlands'],
        rows: [
          ['8:00', 'acht uur'],
          ['8:10', 'tien over acht'],
          ['8:15', 'kwart over acht'],
          ['8:25', 'vijf voor half negen'],
          ['8:30', 'half negen'],
          ['8:40', 'tien over half negen'],
          ['8:45', 'kwart voor negen'],
          ['8:50', 'tien voor negen'],
        ],
      },
    ],
    ex: [
      { nl: 'De les begint om half tien.', en: 'The lesson starts at 9:30.', tr: 'Ders dokuz buçukta başlıyor.' },
      { nl: 'Ik ben geboren op drie maart negentienhonderd tweeënnegentig.', en: 'I was born on the third of March 1992.', tr: 'Üç Mart bin dokuz yüz doksan ikide doğdum.' },
      { nl: 'Mijn huisnummer is achtenveertig.', en: 'My house number is forty-eight.', tr: 'Ev numaram kırk sekiz.' },
      { nl: 'De afspraak is om kwart voor twee.', en: 'The appointment is at a quarter to two.', tr: 'Randevu ikiye çeyrek kala.' },
      { nl: 'Het kost vijfendertig euro.', en: 'It costs thirty-five euros.', tr: 'Otuz beş euro tutuyor.' },
    ],
  },
  {
    id: 'polite',
    title: { en: 'Polite language: u, zou, graag', tr: 'Kibar dil: u, zou, graag' },
    body: [
      { en: 'Use u for strangers, officials, doctors. "Zou ... kunnen/willen" makes polite requests: "Zou u mij kunnen helpen?" "Graag" means gladly/please: "Ik wil graag een afspraak maken." "Alstublieft" (formal) / "alsjeblieft" (informal).', tr: 'Yabancılara, memurlara, doktorlara u ile hitap edilir. "Zou ... kunnen/willen" kibar rica yapar: "Zou u mij kunnen helpen?" "Graag" memnuniyetle/lütfen demektir: "Ik wil graag een afspraak maken." "Alstublieft" (resmi) / "alsjeblieft" (samimi).' },
      { en: 'Formal letters: start "Geachte heer/mevrouw," and end "Met vriendelijke groet," — these appear in the writing exam!', tr: 'Resmi mektuplar: "Geachte heer/mevrouw," ile başlar, "Met vriendelijke groet," ile biter — bunlar yazma sınavında çıkar!' },
    ],
    ex: [
      { nl: 'Zou ik morgen vrij mogen nemen?', en: 'Could I take tomorrow off?', tr: 'Yarın izin alabilir miyim acaba?' },
      { nl: 'Ik wil graag een afspraak maken.', en: 'I would like to make an appointment.', tr: 'Randevu almak istiyorum.' },
      { nl: 'Kunt u iets langzamer spreken?', en: 'Could you speak a bit more slowly?', tr: 'Biraz daha yavaş konuşabilir misiniz?' },
      { nl: 'Geachte mevrouw De Vries, …', en: 'Dear Mrs De Vries, …', tr: 'Sayın Bayan De Vries, …' },
    ],
  },
  {
    id: 'graag-hoeven',
    title: { en: 'graag, hoeven and other A2 essentials', tr: 'graag, hoeven ve diğer A2 temel yapıları' },
    body: [
      { en: '"Graag" + verb = to like doing: "Ik zwem graag" (I like swimming). "Hoeven niet te" = do not have to: "Je hoeft niet te betalen." Compare: "moeten" (must) vs "niet hoeven te" (need not). "Aan het + infinitive" = continuous: "Ik ben aan het koken."', tr: '"Graag" + fiil = yapmayı sevmek: "Ik zwem graag" (yüzmeyi severim). "Hoeven niet te" = zorunda olmamak: "Je hoeft niet te betalen." Karşılaştırın: "moeten" (zorunda) ile "niet hoeven te" (gerek yok). "Aan het + mastar" = şu an yapıyor olmak: "Ik ben aan het koken."' },
    ],
    ex: [
      { nl: 'Ik drink graag Turkse thee.', en: 'I like drinking Turkish tea.', tr: 'Türk çayı içmeyi severim.' },
      { nl: 'U hoeft niet te wachten.', en: 'You do not have to wait.', tr: 'Beklemenize gerek yok.' },
      { nl: 'De kinderen zijn aan het spelen.', en: 'The children are playing (right now).', tr: 'Çocuklar şu anda oynuyor.' },
      { nl: 'Ik help je graag.', en: 'I am happy to help you.', tr: 'Sana memnuniyetle yardım ederim.' },
    ],
  },
  {
    id: 'object-pronouns',
    title: { en: 'Object pronouns: mij, jou, hem, haar…', tr: 'Nesne zamirleri: mij, jou, hem, haar…' },
    body: [
      {
        en: 'Object pronouns receive the action: "Ik zie hem" (I see him). They also come after prepositions: "voor mij" (for me), "met ons" (with us).',
        tr: 'Nesne zamirleri eylemi alan kişiyi gösterir: "Ik zie hem" (Onu görüyorum). Edatlardan sonra da kullanılırlar: "voor mij" (benim için), "met ons" (bizimle).',
      },
      {
        en: 'In everyday speech the short forms me, je, ze are very common: "Bel me morgen." For things (not people) Dutch usually avoids "het/hen" after a preposition and uses er + preposition instead: "ermee" (with it) — see the lesson about "er".',
        tr: 'Günlük konuşmada kısa biçimler me, je, ze çok yaygındır: "Bel me morgen." Eşyalar için edattan sonra "het/hen" yerine er + edat kullanılır: "ermee" (onunla) — "er" dersine bakın.',
      },
    ],
    tables: [
      {
        head: [{ en: 'Subject', tr: 'Özne' }, { en: 'Object', tr: 'Nesne' }, { en: 'Example', tr: 'Örnek' }],
        rows: [
          ['ik', 'mij / me', 'Zij helpt mij.'],
          ['jij', 'jou / je', 'Ik zie jou.'],
          ['u', 'u', 'Ik help u.'],
          ['hij', 'hem', 'Ik bel hem.'],
          ['zij (she)', 'haar', 'Ik ken haar.'],
          ['het', 'het', 'Ik koop het.'],
          ['wij', 'ons', 'Hij helpt ons.'],
          ['jullie', 'jullie', 'Ik zie jullie.'],
          ['zij (they)', 'ze / hen / hun', 'Ik ken ze.'],
        ],
      },
    ],
    ex: [
      { nl: 'Kun je mij helpen?', en: 'Can you help me?', tr: 'Bana yardım edebilir misin?' },
      { nl: 'Ik bel hem vanavond.', en: 'I will call him tonight.', tr: 'Onu bu akşam arayacağım.' },
      { nl: 'Dit cadeau is voor jou.', en: 'This present is for you.', tr: 'Bu hediye senin için.' },
      { nl: 'De juf leest ons een verhaal voor.', en: 'The teacher reads us a story.', tr: 'Öğretmen bize bir hikâye okuyor.' },
      { nl: 'Ik ken ze niet.', en: 'I do not know them.', tr: 'Onları tanımıyorum.' },
    ],
  },
  {
    id: 'relative-clauses',
    title: { en: 'Relative clauses: die and dat', tr: 'İlgi cümleleri: die ve dat' },
    body: [
      {
        en: 'To say more about a noun, use die or dat: de man die daar woont (the man who lives there). Use die for de-words and plurals, dat for het-words. Like all subclauses, the verb goes to the end.',
        tr: 'Bir isim hakkında daha fazla bilgi vermek için die veya dat kullanılır: de man die daar woont (orada oturan adam). De-kelimeleri ve çoğullar için die, het-kelimeleri için dat. Tüm yan cümlelerde olduğu gibi fiil sona gider.',
      },
      {
        en: 'Tip: the choice follows the ARTICLE of the noun, not the meaning: het meisje dat… (because it is "het meisje"), de mensen die… (plural).',
        tr: 'İpucu: seçim anlamı değil, ismin TANIMLIĞINI takip eder: het meisje dat… (çünkü "het meisje"), de mensen die… (çoğul).',
      },
    ],
    tables: [
      {
        head: [{ en: 'Noun', tr: 'İsim' }, { en: 'Pronoun', tr: 'Zamir' }, { en: 'Example', tr: 'Örnek' }],
        rows: [
          ['de-word', 'die', 'de bus die te laat komt'],
          ['het-word', 'dat', 'het huis dat te koop staat'],
          ['plural', 'die', 'de boeken die ik lees'],
        ],
      },
    ],
    ex: [
      { nl: 'De vrouw die naast mij woont, is aardig.', en: 'The woman who lives next to me is kind.', tr: 'Yanımda oturan kadın naziktir.' },
      { nl: 'Het formulier dat u invult, is belangrijk.', en: 'The form that you fill in is important.', tr: 'Doldurduğunuz form önemlidir.' },
      { nl: 'Ik zoek een baan die goed betaalt.', en: 'I am looking for a job that pays well.', tr: 'İyi maaş veren bir iş arıyorum.' },
      { nl: 'Dit is het woord dat ik niet begrijp.', en: 'This is the word that I do not understand.', tr: 'Bu, anlamadığım kelime.' },
    ],
  },
];
