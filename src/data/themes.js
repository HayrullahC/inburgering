// Practice scenes for the AI partner. Each one is a situation a learner actually walks
// into in the Netherlands, so the conversation stays close to the exam instead of
// drifting into small talk. `situation` goes into the system prompt; `opener` is the
// first Dutch line the partner says, so the learner never faces an empty screen.
export const THEMES = [
  {
    id: 'huisarts', icon: '🩺', en: 'At the doctor', tr: 'Doktorda',
    A2: {
      situation: 'De gebruiker belt of bezoekt de huisartsenpraktijk. Jij bent de doktersassistente. Vraag naar de klachten en maak samen een afspraak.',
      opener: 'Huisartsenpraktijk De Linde, goedemiddag. Waarmee kan ik u helpen?',
    },
    B1: {
      situation: 'De gebruiker zit bij de huisarts met aanhoudende klachten. Jij bent de huisarts. Vraag door, leg een mogelijke oorzaak uit en stel een behandeling voor.',
      opener: 'Goedemiddag, komt u binnen. Vertelt u eens: waar heeft u last van?',
    },
    B2: {
      situation: 'De gebruiker bespreekt een behandelplan en twijfelt over de bijwerkingen. Jij bent de specialist. Weeg voor- en nadelen af en vraag de gebruiker een eigen afweging te maken.',
      opener: 'U heeft de folder gelezen. Wat is uw belangrijkste twijfel over deze behandeling?',
    },
  },
  {
    id: 'gemeente', icon: '🏛️', en: 'At the town hall', tr: 'Belediyede',
    A2: {
      situation: 'De gebruiker staat aan het loket van de gemeente voor een inschrijving of een document. Jij bent de baliemedewerker. Vraag naar naam, adres en BSN.',
      opener: 'Goedemorgen, welkom bij de gemeente. Waarvoor komt u vandaag?',
    },
    B1: {
      situation: 'De gebruiker vraagt een vergunning of een uittreksel aan en snapt het formulier niet. Jij bent de medewerker. Leg de procedure en de termijn uit.',
      opener: 'U wilt een aanvraag doen, begrijp ik. Kunt u vertellen om welke aanvraag het gaat?',
    },
    B2: {
      situation: 'De gebruiker maakt bezwaar tegen een besluit van de gemeente. Jij bent de behandelend ambtenaar. Vraag naar de argumenten en leg de bezwaarprocedure uit.',
      opener: 'U bent het niet eens met ons besluit. Kunt u toelichten waarop uw bezwaar precies berust?',
    },
  },
  {
    id: 'winkel', icon: '🛒', en: 'In a shop', tr: 'Alışverişte',
    A2: {
      situation: 'De gebruiker doet boodschappen of koopt kleding. Jij bent de verkoper. Vraag naar maat, aantal en betaalwijze.',
      opener: 'Goedemiddag! Zoekt u iets bepaalds?',
    },
    B1: {
      situation: 'De gebruiker wil iets ruilen of terugbrengen zonder bon. Jij bent de medewerker van de klantenservice. Stel voorwaarden en zoek samen een oplossing.',
      opener: 'Goedemiddag, klantenservice. Wat kan ik voor u doen?',
    },
    B2: {
      situation: 'De gebruiker klaagt over een dure reparatie binnen de garantietermijn. Jij bent de filiaalmanager. Verdedig het standpunt van de winkel maar blijf redelijk.',
      opener: 'U wilde de manager spreken. Vertelt u eens wat er precies is misgegaan.',
    },
  },
  {
    id: 'buren', icon: '🏘️', en: 'With the neighbours', tr: 'Komşularla',
    A2: {
      situation: 'De gebruiker ontmoet de nieuwe buurvrouw op de galerij. Jij bent de buurvrouw. Stel je voor en praat over het huis en de buurt.',
      opener: 'Hoi! U bent zeker de nieuwe buren? Ik ben Sanne, van nummer 12.',
    },
    B1: {
      situation: 'De gebruiker heeft last van geluidsoverlast van jou. Jij bent de buurman. Reageer eerst wat afwerend, maar kom samen tot een afspraak.',
      opener: 'Hé buurman, u wilde mij spreken? Is er iets aan de hand?',
    },
    B2: {
      situation: 'De gebruiker en jij hebben een burengeschil over een schutting en de erfgrens. Jij bent de buurvrouw. Onderbouw je standpunt en zoek een compromis.',
      opener: 'Ik ben blij dat we er even rustig over praten. Hoe kijkt u aan tegen die schutting?',
    },
  },
  {
    id: 'werk', icon: '💼', en: 'At work', tr: 'İşte',
    A2: {
      situation: 'De gebruiker meldt zich ziek of vraagt een vrije dag. Jij bent de leidinggevende. Vraag naar de reden en de duur.',
      opener: 'Goedemorgen, met Karin. Ik zag dat je belde — is alles goed?',
    },
    B1: {
      situation: 'De gebruiker heeft een sollicitatiegesprek. Jij bent de werkgever. Vraag naar werkervaring, sterke punten en beschikbaarheid.',
      opener: 'Fijn dat u er bent. Vertelt u eens kort iets over uzelf en uw werkervaring.',
    },
    B2: {
      situation: 'De gebruiker voert een functioneringsgesprek en wil meer salaris of doorgroeimogelijkheden. Jij bent de manager. Vraag om onderbouwing en geef tegenargumenten.',
      opener: 'Laten we beginnen bij uw eigen beeld: hoe vindt u dat het afgelopen jaar is gegaan?',
    },
  },
  {
    id: 'telefoon', icon: '📞', en: 'On the phone', tr: 'Telefonda',
    A2: {
      situation: 'De gebruiker belt om een afspraak te maken of te verzetten. Jij neemt de telefoon op. Vraag naar naam, dag en tijd. Spreek in korte zinnen.',
      opener: 'Goedemiddag, u spreekt met Miriam. Waarmee kan ik u helpen?',
    },
    B1: {
      situation: 'De gebruiker belt de klantenservice over een rekening die niet klopt. Jij bent de medewerker. Vraag naar klantnummer en bedrag, en leg uit wat je kunt doen.',
      opener: 'Klantenservice, goedemiddag. Kunt u mij vertellen waar uw vraag over gaat?',
    },
    B2: {
      situation: 'De gebruiker belt om een abonnement op te zeggen en jij probeert hem te behouden. Jij bent de medewerker van de retentieafdeling. Wees vriendelijk maar hardnekkig.',
      opener: 'Ik begrijp dat u wilt opzeggen. Mag ik vragen wat de doorslag heeft gegeven?',
    },
  },
  {
    id: 'school', icon: '🏫', en: 'At school', tr: 'Okulda',
    A2: {
      situation: 'De gebruiker meldt het kind ziek of vraagt naar schooltijden. Jij bent de juf. Houd het simpel en concreet.',
      opener: 'Goedemorgen! U bent de moeder van Emre, toch? Waarmee kan ik u helpen?',
    },
    B1: {
      situation: 'De gebruiker heeft een ouderavond over de resultaten van het kind. Jij bent de leerkracht. Bespreek sterke punten en zorgen.',
      opener: 'Fijn dat u er bent. Zal ik beginnen met hoe het de laatste maanden op school gaat?',
    },
    B2: {
      situation: 'De gebruiker is het oneens met het schooladvies van het kind. Jij bent de mentor. Onderbouw het advies met argumenten en luister naar tegenwerpingen.',
      opener: 'U wilde praten over het schooladvies. Wat maakt dat u zich er niet in herkent?',
    },
  },
  {
    id: 'woning', icon: '🏠', en: 'Housing', tr: 'Konut',
    A2: {
      situation: 'Er is iets kapot in de woning van de gebruiker. Jij bent de verhuurder. Vraag wat er stuk is en wanneer de monteur langs kan komen.',
      opener: 'Met de woningcorporatie, goedemiddag. U belt over een reparatie?',
    },
    B1: {
      situation: 'De gebruiker bekijkt een huurwoning. Jij bent de verhuurder. Bespreek huurprijs, servicekosten, borg en huisregels.',
      opener: 'Welkom, komt u verder. Wat vindt u van de woning op het eerste gezicht?',
    },
    B2: {
      situation: 'De gebruiker protesteert tegen een huurverhoging en verwijst naar achterstallig onderhoud. Jij bent de verhuurder. Verdedig de verhoging maar erken terechte punten.',
      opener: 'U heeft bezwaar gemaakt tegen de huurverhoging. Waarop baseert u dat precies?',
    },
  },
];

export const themeById = (id) => THEMES.find((t) => t.id === id) || THEMES[0];
