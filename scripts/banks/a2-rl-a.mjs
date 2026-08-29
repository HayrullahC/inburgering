// A2 (Inburgering Lezen) authored source bank A: 30 original reading texts.
// Format mirrors scripts/banks/b1-rl.mjs. All texts are original work.

export const LEZEN_A = [
  {
    id: 'a2ra01',
    type: 'brief',
    title: 'Uitnodiging voor de griepprik',
    text: `Huisartsenpraktijk De Linde
Dorpsstraat 12, Westdorp

Westdorp, 3 oktober

Beste heer Yilmaz,

Elk jaar geven wij de griepprik aan mensen met een hogere kans op ziekte. U krijgt dit jaar ook een uitnodiging, omdat u medicijnen voor uw longen gebruikt.

U kunt de griepprik halen op donderdag 9 november tussen 15.00 en 19.00 uur. U hoeft geen afspraak te maken. Neem deze brief en uw identiteitsbewijs mee. De prik is gratis.

Kunt u niet op 9 november? Bel dan met de assistente op 0598-234567. Zij plant een nieuw moment voor u, bijvoorbeeld op dinsdag 14 november.

Bent u verkouden of heeft u koorts? Kom dan niet naar de praktijk, maar bel ons eerst.

Met vriendelijke groet,
J. Prins, huisarts`,
    qs: [
      { q: 'Waarom krijgt meneer Yilmaz deze brief?', o: ['Hij heeft om een afspraak gevraagd', 'Hij is al lang niet bij de huisarts geweest', 'Hij gebruikt medicijnen voor zijn longen', 'Hij heeft nu griep'], a: 2 },
      { q: 'Wanneer kan meneer Yilmaz de griepprik halen zonder afspraak?', o: ['Op 9 november tussen 15.00 en 19.00 uur', 'Op 3 oktober om 15.00 uur', 'Op 14 november de hele dag', 'Elke werkdag tussen 9.00 en 17.00 uur'], a: 0 },
      { q: 'Wat moet hij meenemen naar de praktijk?', o: ['Zijn medicijnen en zijn zorgpas', 'Deze brief en zijn identiteitsbewijs', 'Alleen geld voor de prik', 'Een verwijzing van het ziekenhuis'], a: 1 },
      { q: 'Wat moet hij doen als hij niet kan komen op 9 november?', o: ['Wachten op een nieuwe brief', 'Naar het ziekenhuis gaan', 'Volgend jaar de prik halen', 'De assistente bellen voor een nieuw moment'], a: 3 },
      { q: 'Wat moet hij doen als hij koorts heeft?', o: ['Toch naar de praktijk komen', 'Eerst de praktijk bellen', 'Een e-mail sturen naar de huisarts', 'De prik zelf thuis zetten'], a: 1 },
      { q: 'Hoeveel kost de griepprik?', o: ['10 euro', 'Niets, de prik is gratis', 'Dat staat niet in de brief', 'Alleen de eerste prik is gratis'], a: 1 },
    ],
  },
  {
    id: 'a2ra02',
    type: 'brief',
    title: 'Uw nieuwe afvalpas',
    text: `Gemeente Westdorp
Afdeling Afval en Milieu

Onderwerp: uw nieuwe afvalpas

Geachte heer, mevrouw,

Vanaf 1 maart kunt u de ondergrondse containers in uw wijk alleen nog openen met een afvalpas. Bij deze brief zit uw persoonlijke pas. Houd de pas voor het zwarte kastje op de container. Het lampje wordt groen en de klep gaat open.

De pas is gratis. Bent u de pas kwijt? Dan vraagt u via www.westdorp.nl een nieuwe pas aan. Een nieuwe pas kost 10 euro en wordt binnen vijf werkdagen thuisgestuurd.

Grof afval, zoals een oude bank of een koelkast, past niet in de container. Dit kunt u gratis laten ophalen. Maak hiervoor een afspraak via telefoonnummer 14 0567.

Heeft u vragen? Kijk op onze website of bel ons op werkdagen tussen 9.00 en 17.00 uur.

Met vriendelijke groet,
Gemeente Westdorp`,
    qs: [
      { q: 'Waarom stuurt de gemeente deze brief?', o: ['De containers in de wijk worden weggehaald', 'Bewoners hebben vanaf 1 maart een pas nodig voor de container', 'De gemeente gaat afval ophalen op andere dagen', 'Bewoners moeten een nieuwe container kopen'], a: 1 },
      { q: 'Hoe opent u de container met de pas?', o: ['U houdt de pas voor het zwarte kastje', 'U stopt de pas in de klep', 'U belt eerst met de gemeente', 'U typt een code in op het kastje'], a: 0 },
      { q: 'Wat kost een nieuwe pas als u uw pas kwijt bent?', o: ['Niets, de pas is altijd gratis', '5 euro', '10 euro', '14 euro'], a: 2 },
      { q: 'Wat moet u doen met een oude koelkast?', o: ['In de ondergrondse container doen', 'Naast de container zetten', 'Zelf naar de winkel brengen', 'Een afspraak maken om hem op te laten halen'], a: 3 },
      { q: 'Wanneer kunt u de gemeente bellen?', o: ['Alleen op maandag', 'Op werkdagen tussen 9.00 en 17.00 uur', 'Elke dag tot 19.00 uur', 'Alleen via de website'], a: 1 },
    ],
  },
  {
    id: 'a2ra03',
    type: 'brief',
    title: 'Uitnodiging ouderavond',
    text: `Basisschool De Regenboog
Schoolstraat 8, Noorderveld

Beste ouders en verzorgers,

Op dinsdag 12 november is er een ouderavond voor de groepen 5 en 6. De avond begint om 19.30 uur en duurt tot ongeveer 21.00 uur. U bent welkom vanaf 19.15 uur. De koffie en thee staan klaar in de hal.

De juf of meester vertelt eerst over het lesprogramma van dit jaar. Daarna kunt u vragen stellen. Ook laten wij zien hoe u thuis kunt helpen met lezen. Dit is vooral belangrijk voor kinderen die extra oefening nodig hebben.

Wilt u komen? Geef dat dan vóór 5 november door via het formulier op onze website. Zo weten wij hoeveel stoelen wij moeten klaarzetten. Kunt u niet komen? Dan kunt u een gesprek met de leerkracht aanvragen op een ander moment.

Met vriendelijke groet,
Anke de Vries, directeur`,
    qs: [
      { q: 'Voor wie is deze brief bedoeld?', o: ['Voor alle kinderen van de school', 'Voor de juffen en meesters', 'Voor ouders van kinderen in groep 5 en 6', 'Voor ouders van alle groepen'], a: 2 },
      { q: 'Hoe laat begint de ouderavond?', o: ['Om 19.15 uur', 'Om 19.30 uur', 'Om 21.00 uur', 'Om 18.30 uur'], a: 1 },
      { q: 'Wat gebeurt er eerst op de ouderavond?', o: ['De leerkracht vertelt over het lesprogramma', 'De ouders stellen vragen', 'De kinderen laten hun werk zien', 'De directeur houdt een toespraak'], a: 0 },
      { q: 'Waarom moeten ouders zich vóór 5 november aanmelden?', o: ['Anders is de zaal vol', 'Omdat de koffie besteld moet worden', 'Omdat de avond anders niet doorgaat', 'Zodat de school weet hoeveel stoelen er nodig zijn'], a: 3 },
      { q: 'Wat kan een ouder doen die niet kan komen?', o: ['Een brief schrijven aan de directeur', 'Een gesprek op een ander moment aanvragen', 'De vragen aan een andere ouder meegeven', 'Niets, de avond is verplicht'], a: 1 },
      { q: 'Wat is het doel van deze brief?', o: ['Ouders uitnodigen voor een avond op school', 'Ouders vragen om geld voor de school', 'Ouders informeren over het schoolreisje', 'Ouders vragen om te helpen bij de les'], a: 0 },
    ],
  },
  {
    id: 'a2ra04',
    type: 'brief',
    title: 'Wijziging van uw zorgpremie',
    text: `Zorgverzekering Zilverzorg
Postbus 90, Meerstad

Geachte mevrouw Petrova,

Elk jaar mogen zorgverzekeraars hun prijzen aanpassen. Vanaf 1 januari verandert daarom uw premie. U betaalt nu 138 euro per maand. Dat wordt 145 euro per maand.

Uw pakket blijft hetzelfde. U bent verzekerd voor de huisarts, het ziekenhuis en medicijnen. De tandarts zit niet in dit pakket. Wilt u ook een tandartsverzekering? Dan kunt u die vóór 31 december toevoegen via Mijn Zilverzorg op onze website.

Wilt u liever een goedkoper pakket of een andere verzekeraar? Dat kan ook. U kunt uw verzekering opzeggen tot en met 31 december. Uw nieuwe verzekering moet dan vóór 1 februari beginnen.

Doet u niets? Dan loopt uw verzekering gewoon door met de nieuwe premie.

Met vriendelijke groet,
Afdeling Klantenservice Zilverzorg`,
    qs: [
      { q: 'Wat is het belangrijkste nieuws in deze brief?', o: ['De premie wordt hoger', 'Het pakket wordt kleiner', 'De verzekering stopt op 1 januari', 'De tandarts wordt gratis'], a: 0 },
      { q: 'Hoeveel betaalt mevrouw Petrova vanaf 1 januari per maand?', o: ['131 euro', '138 euro', '145 euro', '90 euro'], a: 2 },
      { q: 'Wat zit niet in het pakket van mevrouw Petrova?', o: ['De huisarts', 'Het ziekenhuis', 'Medicijnen', 'De tandarts'], a: 3 },
      { q: 'Tot wanneer kan zij haar verzekering opzeggen?', o: ['Tot en met 31 december', 'Tot 1 januari', 'Tot 1 februari', 'Dat kan het hele jaar'], a: 0 },
      { q: 'Wat gebeurt er als mevrouw Petrova niets doet?', o: ['Haar verzekering stopt', 'Zij krijgt een boete', 'Haar verzekering loopt door met de nieuwe premie', 'Zij krijgt automatisch een tandartsverzekering'], a: 2 },
    ],
  },
  {
    id: 'a2ra05',
    type: 'brief',
    title: 'Uw rijbewijs verloopt binnenkort',
    text: `Gemeente Noorderveld
Afdeling Burgerzaken

Geachte heer Haddad,

Uit onze gegevens blijkt dat uw rijbewijs op 18 april verloopt. Na die datum mag u niet meer autorijden met dit rijbewijs. Vraag daarom op tijd een nieuw rijbewijs aan.

Zo werkt het. Laat eerst een pasfoto maken bij een fotograaf. Kom daarna met uw oude rijbewijs en de pasfoto naar het gemeentehuis. Maak hiervoor een afspraak via www.noorderveld.nl of bel 14 0592. Een nieuw rijbewijs kost 48,15 euro. U betaalt bij de aanvraag.

Na vijf werkdagen kunt u het nieuwe rijbewijs ophalen. Dat moet u zelf doen, ook weer met een afspraak. Iemand anders mag uw rijbewijs niet ophalen.

Let op: in de meivakantie is het erg druk bij Burgerzaken. Wacht dus niet te lang met uw aanvraag.

Met vriendelijke groet,
Gemeente Noorderveld`,
    qs: [
      { q: 'Waarom krijgt meneer Haddad deze brief?', o: ['Hij heeft zijn rijbewijs verloren', 'Zijn rijbewijs is bijna niet meer geldig', 'Hij moet opnieuw rijexamen doen', 'Hij heeft een boete gekregen'], a: 1 },
      { q: 'Wat moet hij eerst doen?', o: ['Naar het gemeentehuis gaan', 'Betalen via de website', 'Een pasfoto laten maken', 'Zijn oude rijbewijs opsturen'], a: 2 },
      { q: 'Hoeveel kost een nieuw rijbewijs?', o: ['14,05 euro', '18 euro', '45,80 euro', '48,15 euro'], a: 3 },
      { q: 'Wanneer kan hij het nieuwe rijbewijs ophalen?', o: ['Na vijf werkdagen', 'Op 18 april', 'Dezelfde dag nog', 'Na de meivakantie'], a: 0 },
      { q: 'Wat is waar over het ophalen van het rijbewijs?', o: ['Zijn vrouw mag het ook ophalen', 'Het rijbewijs wordt thuisgestuurd', 'Hij moet het zelf ophalen met een afspraak', 'Ophalen kan zonder afspraak'], a: 2 },
    ],
  },
  {
    id: 'a2ra06',
    type: 'brief',
    title: 'Tijd voor uw halfjaarlijkse controle',
    text: `Tandartspraktijk Molenzicht
Molenweg 3, Zuidbroek

Beste mevrouw Osei,

Het is weer tijd voor uw halfjaarlijkse controle. Wij hebben voor u een afspraak gepland op woensdag 22 mei om 10.15 uur bij tandarts Van Dam.

Komt de afspraak niet uit? Verzet de afspraak dan minstens 24 uur van tevoren. Dat kan telefonisch op 0598-441122 of via onze website. Zegt u de afspraak te laat af, of komt u niet? Dan moeten wij helaas 25 euro in rekening brengen. Uw verzekering betaalt dit niet.

Wilt u ook een afspraak maken voor uw kinderen? Voor kinderen tot 18 jaar is de controle gratis. Onze assistente helpt u graag.

Poetst u twee keer per dag en gebruikt u tandenstokers of ragers? Dan houdt u uw gebit gezond tussen de controles door.

Met vriendelijke groet,
Tandartspraktijk Molenzicht`,
    qs: [
      { q: 'Waarom stuurt de praktijk deze brief?', o: ['Mevrouw Osei heeft kiespijn gemeld', 'Er staat een controle-afspraak voor haar gepland', 'De praktijk gaat verhuizen', 'Er is een nieuwe tandarts'], a: 1 },
      { q: 'Wanneer is de afspraak?', o: ['Woensdag 22 mei om 10.15 uur', 'Woensdag 22 mei om 12.00 uur', 'Dinsdag 21 mei om 10.15 uur', 'Woensdag 25 mei om 10.15 uur'], a: 0 },
      { q: 'Wat gebeurt er als mevrouw Osei te laat afzegt?', o: ['Zij krijgt een nieuwe uitnodiging', 'De verzekering betaalt de kosten', 'Zij moet 25 euro betalen', 'Er gebeurt niets'], a: 2 },
      { q: 'Hoe lang van tevoren moet zij de afspraak verzetten?', o: ['Een week van tevoren', 'Twee dagen van tevoren', 'Een uur van tevoren', 'Minstens 24 uur van tevoren'], a: 3 },
      { q: 'Wat is waar over kinderen tot 18 jaar?', o: ['Zij betalen 25 euro voor een controle', 'De controle is voor hen gratis', 'Zij mogen niet naar deze praktijk', 'Zij hoeven geen controle te doen'], a: 1 },
    ],
  },
  {
    id: 'a2ra07',
    type: 'brief',
    title: 'Informatie over het schoolreisje',
    text: `Basisschool Het Kompas
Havenstraat 21, Meerstad

Beste ouders en verzorgers van groep 4,

Op vrijdag 14 juni gaan wij met groep 4 op schoolreisje naar dierenpark Vogelrijk. Wij vertrekken om 8.45 uur met de bus vanaf school. Zorg dat uw kind om 8.30 uur op school is. Om ongeveer 16.30 uur zijn wij terug.

Het schoolreisje kost 27,50 euro per kind. Betaal dit vóór 1 juni via de schoolapp. Lukt betalen niet? Neem dan contact op met juf Fatima. Samen zoeken wij een oplossing. Geen enkel kind blijft thuis om geld.

Geef uw kind een rugzak mee met een lunchpakket en een flesje water. Snoep en geld zijn niet nodig; de school trakteert op een ijsje. Doe uw kind makkelijke schoenen aan, want wij lopen veel.

Wilt u mee als begeleider? Meld u dan aan bij de leerkracht. Wij zoeken nog vier ouders.

Met vriendelijke groet,
Team Het Kompas`,
    qs: [
      { q: 'Hoe laat moeten de kinderen op school zijn?', o: ['Om 8.45 uur', 'Om 8.30 uur', 'Om 16.30 uur', 'Om 9.00 uur'], a: 1 },
      { q: 'Wat moeten ouders vóór 1 juni doen?', o: ['Een rugzak kopen', 'Zich aanmelden als begeleider', 'Het geld voor het reisje betalen', 'Juf Fatima bellen'], a: 2 },
      { q: 'Wat moet een ouder doen die niet kan betalen?', o: ['Contact opnemen met juf Fatima', 'Het kind thuishouden', 'Later het dubbele betalen', 'Een brief aan de directeur schrijven'], a: 0 },
      { q: 'Wat moet er in de rugzak van het kind?', o: ['Snoep en geld', 'Een ijsje', 'Reserveschoenen', 'Een lunchpakket en water'], a: 3 },
      { q: 'Waarom staat er informatie over begeleiders in de brief?', o: ['De school zoekt nog ouders die meegaan', 'Begeleiders moeten 27,50 euro betalen', 'Er zijn al genoeg begeleiders', 'Alleen leerkrachten mogen mee'], a: 0 },
      { q: 'Wat is waar over dit schoolreisje?', o: ['De kinderen gaan met de trein', 'De kinderen zijn om 16.30 uur ongeveer terug', 'Het reisje is op 1 juni', 'De kinderen moeten zelf een ijsje kopen'], a: 1 },
    ],
  },
  {
    id: 'a2ra08',
    type: 'email',
    title: 'Nieuw werkrooster vanaf volgende week',
    text: `Van: Peter Smid, teamleider supermarkt Dagvers
Aan: alle medewerkers vulploeg
Onderwerp: nieuw rooster

Beste collega's,

Vanaf maandag 3 februari werken wij met een nieuw rooster. Het oude rooster klopte niet meer, omdat twee collega's zijn gestopt en de winkel op donderdag langer open is.

Het nieuwe rooster hangt vanaf vandaag in de kantine. Je vindt het ook in de personeelsapp. Kijk goed naar je eigen dagen, want voor sommige collega's is de begintijd veranderd. De avonddienst op donderdag duurt voortaan tot 21.30 uur in plaats van 21.00 uur.

Kun je op een dag echt niet werken? Ruil dan eerst zelf met een collega. Lukt dat niet, kom dan uiterlijk woensdag bij mij langs. Na woensdag kan ik het rooster niet meer aanpassen.

Nieuwe collega's stellen wij volgende week voor tijdens het werkoverleg op dinsdag om 9.00 uur.

Groeten,
Peter`,
    qs: [
      { q: 'Waarom is er een nieuw rooster?', o: ['De winkel gaat eerder dicht', 'Er zijn collega’s gestopt en de winkel is langer open', 'De kantine wordt verbouwd', 'De personeelsapp werkt niet meer'], a: 1 },
      { q: 'Waar kunnen medewerkers het nieuwe rooster vinden?', o: ['In de kantine en in de personeelsapp', 'Alleen bij Peter op kantoor', 'Op de website van de winkel', 'Bij de kassa'], a: 0 },
      { q: 'Tot hoe laat duurt de avonddienst op donderdag voortaan?', o: ['Tot 21.00 uur', 'Tot 20.30 uur', 'Tot 21.30 uur', 'Tot 22.00 uur'], a: 2 },
      { q: 'Wat moet je eerst doen als je een dag niet kunt werken?', o: ['Bij Peter langsgaan', 'Een e-mail sturen naar de winkel', 'Gewoon thuisblijven', 'Zelf ruilen met een collega'], a: 3 },
      { q: 'Wat gebeurt er dinsdag om 9.00 uur?', o: ['De nieuwe collega’s worden voorgesteld', 'Het nieuwe rooster wordt opgehangen', 'De winkel gaat later open', 'Peter neemt afscheid'], a: 0 },
    ],
  },
  {
    id: 'a2ra09',
    type: 'email',
    title: 'Onderhoud aan uw cv-ketel',
    text: `Van: Woonbedrijf De Sleutel
Aan: bewoners Iepstraat 10 tot en met 48
Onderwerp: onderhoud cv-ketel

Geachte huurder,

Volgende maand controleert installatiebedrijf Warmtec de cv-ketels in uw straat. Dit onderhoud is gratis en zorgt ervoor dat uw ketel veilig en zuinig blijft werken.

De monteur komt bij u langs op dinsdag 11 maart tussen 8.00 en 12.00 uur. Het bezoek duurt ongeveer 45 minuten. Er moet iemand van 18 jaar of ouder thuis zijn. Zorg ook dat de monteur goed bij de ketel kan komen. Haal dus spullen weg die voor de ketel staan.

Kunt u niet thuis zijn op 11 maart? Bel dan met Warmtec op 0800-6655 om een andere dag af te spreken. Doe dit minstens twee werkdagen van tevoren.

Let op: monteurs van Warmtec kunnen zich altijd legitimeren. Vraag bij de deur naar hun pas.

Met vriendelijke groet,
Woonbedrijf De Sleutel`,
    qs: [
      { q: 'Waarom krijgen de bewoners deze e-mail?', o: ['Zij moeten een nieuwe ketel kopen', 'Hun cv-ketel wordt gecontroleerd', 'De huur gaat omhoog', 'Er is een lekkage in de straat'], a: 1 },
      { q: 'Wanneer komt de monteur langs?', o: ['Op 11 maart tussen 8.00 en 12.00 uur', 'Op 11 maart om 12.00 uur precies', 'Op 8 maart in de ochtend', 'Op 11 maart tussen 12.00 en 17.00 uur'], a: 0 },
      { q: 'Wat moeten bewoners doen vóór het bezoek?', o: ['De ketel zelf schoonmaken', 'De verwarming uitzetten', 'Spullen voor de ketel weghalen', 'Warmtec een e-mail sturen'], a: 2 },
      { q: 'Wat kost het onderhoud?', o: ['45 euro', '18 euro', 'Twee maanden huur', 'Niets, het is gratis'], a: 3 },
      { q: 'Wat moet u doen als u niet thuis kunt zijn op 11 maart?', o: ['Minstens twee werkdagen van tevoren bellen met Warmtec', 'De sleutel bij de buren achterlaten', 'Wachten op een nieuwe brief', 'Zelf een monteur zoeken'], a: 0 },
      { q: 'Waarom staat er iets over de pas van de monteur in de e-mail?', o: ['De monteur vergeet zijn pas vaak', 'Bewoners kunnen zo controleren wie er aan de deur staat', 'Bewoners krijgen zelf ook een pas', 'De pas is nodig om de ketel te openen'], a: 1 },
    ],
  },
  {
    id: 'a2ra10',
    type: 'email',
    title: 'Start van het nieuwe voetbalseizoen',
    text: `Van: Sportclub Blauw-Wit Westdorp
Aan: alle leden en ouders van jeugdleden
Onderwerp: nieuw seizoen en contributie

Beste leden,

Op zaterdag 24 augustus begint het nieuwe seizoen. De eerste training voor de jeugd is die dag om 10.00 uur. De senioren trainen vanaf dinsdag 27 augustus om 20.00 uur.

De contributie is dit jaar iets hoger, omdat de energiekosten van de club zijn gestegen. Jeugdleden betalen 95 euro per jaar, senioren 140 euro. U kunt in twee delen betalen: de helft in september en de helft in januari. Betalen gaat via de link in deze e-mail.

Is de contributie voor u een probleem? De gemeente heeft een fonds dat sport voor kinderen betaalt. Onze penningmeester Ellen helpt u graag met de aanvraag. Stuur haar een bericht via penningmeester@blauwwitwestdorp.nl.

Nieuwe scheidsrechters en trainers zijn altijd welkom. Meld je aan via de website.

Sportieve groet,
Het bestuur`,
    qs: [
      { q: 'Wanneer is de eerste jeugdtraining?', o: ['Dinsdag 27 augustus om 20.00 uur', 'Zaterdag 24 augustus om 10.00 uur', 'Zaterdag 24 augustus om 20.00 uur', 'Maandag 26 augustus om 10.00 uur'], a: 1 },
      { q: 'Waarom is de contributie hoger geworden?', o: ['De club heeft nieuwe shirts gekocht', 'Er zijn meer trainers nodig', 'De energiekosten zijn gestegen', 'De gemeente betaalt niet meer mee'], a: 2 },
      { q: 'Hoeveel betaalt een jeugdlid per jaar?', o: ['140 euro', '120 euro', '47,50 euro', '95 euro'], a: 3 },
      { q: 'Wat kan een ouder doen die de contributie niet kan betalen?', o: ['Contact opnemen met penningmeester Ellen', 'Het kind van de club afhalen', 'Later het hele bedrag betalen', 'Zelf trainer worden'], a: 0 },
      { q: 'Hoe kunt u in delen betalen?', o: ['Elke maand een deel', 'De helft in september en de helft in januari', 'Alles in januari', 'Contant bij de training'], a: 1 },
    ],
  },
  {
    id: 'a2ra11',
    type: 'email',
    title: 'Studiedag: opvang gesloten',
    text: `Van: Kinderopvang De Kleine Beer
Aan: alle ouders
Onderwerp: sluiting op vrijdag 7 juni

Beste ouders,

Op vrijdag 7 juni is onze opvang de hele dag gesloten. Ons team heeft dan een studiedag over veiligheid en eerste hulp aan kinderen. Wij vinden het belangrijk dat alle medewerkers dit elk jaar oefenen.

Wij begrijpen dat de sluiting lastig voor u kan zijn. Daarom melden wij het nu al, zes weken van tevoren. U betaalt voor deze dag niet. Het bedrag wordt automatisch afgetrokken van de factuur van juni.

Kunt u op 7 juni echt geen opvang regelen? Onze locatie De Grote Beer in Meerstad is die dag wel open. Daar zijn tien extra plekken. Wilt u zo'n plek? Stuur dan vóór 24 mei een e-mail naar planning@kleinebeer.nl. Wie het eerst mailt, krijgt de plek.

Op maandag 10 juni bent u weer gewoon welkom op onze eigen locatie.

Met vriendelijke groet,
Team De Kleine Beer`,
    qs: [
      { q: 'Waarom is de opvang op 7 juni gesloten?', o: ['Het gebouw wordt verbouwd', 'Het team heeft een studiedag', 'Er zijn te weinig kinderen', 'Het is een feestdag'], a: 1 },
      { q: 'Wat gebeurt er met de kosten van deze dag?', o: ['Ouders betalen de dag gewoon', 'Ouders krijgen een cadeaubon', 'Het bedrag gaat van de factuur van juni af', 'Ouders betalen de helft'], a: 2 },
      { q: 'Wat kunnen ouders doen die geen opvang kunnen regelen?', o: ['Een plek vragen bij locatie De Grote Beer', 'Het kind toch brengen', 'Een oppas van de opvang thuis krijgen', 'De studiedag laten verzetten'], a: 0 },
      { q: 'Voor wanneer moeten ouders mailen voor een extra plek?', o: ['Vóór 7 juni', 'Vóór 10 juni', 'Vóór 1 juni', 'Vóór 24 mei'], a: 3 },
      { q: 'Wie krijgt een extra plek in Meerstad?', o: ['Ouders die het eerst mailen', 'Ouders met meer dan twee kinderen', 'Ouders die extra betalen', 'Alle ouders die mailen'], a: 0 },
    ],
  },
  {
    id: 'a2ra12',
    type: 'email',
    title: 'Uitnodiging zomerfeest voor het personeel',
    text: `Van: directie Schoonmaakbedrijf Glans
Aan: alle medewerkers
Onderwerp: zomerfeest op 5 juli

Beste collega's,

Ook dit jaar organiseren wij een zomerfeest voor alle medewerkers. Het feest is op vrijdag 5 juli van 17.00 tot 22.00 uur bij restaurant De Waterkant in Meerstad. Er is eten, muziek en een quiz met leuke prijzen.

Het feest is gratis voor medewerkers. Wil je je partner meenemen? Dat kan. Voor een partner betaal je 15 euro. Kinderen kunnen dit jaar helaas niet mee, want het feest duurt tot laat.

Meld je vóór 20 juni aan via het formulier in de bijlage. Geef daarbij door of je vlees, vis of vegetarisch wilt eten. Zonder aanmelding kunnen wij geen eten voor je bestellen.

Werk je op 5 juli in de avond? Overleg dan met je planner. Voor de meeste diensten is die avond vervanging geregeld.

Wij hopen jullie allemaal te zien!

Met vriendelijke groet,
De directie`,
    qs: [
      { q: 'Wat is het doel van deze e-mail?', o: ['Medewerkers uitnodigen voor een feest', 'Medewerkers bedanken voor hun werk', 'Een nieuwe planner voorstellen', 'Het rooster van juli uitleggen'], a: 0 },
      { q: 'Hoeveel betaalt een medewerker voor een partner?', o: ['Niets', '20 euro', '15 euro', '5 euro'], a: 2 },
      { q: 'Waarom kunnen kinderen niet mee?', o: ['Het restaurant is te klein', 'Het feest duurt tot laat', 'Er is geen eten voor kinderen', 'Kinderen vinden de quiz niet leuk'], a: 1 },
      { q: 'Wat moet je bij de aanmelding doorgeven?', o: ['Je telefoonnummer', 'Hoe je naar het feest reist', 'De naam van je planner', 'Wat je wilt eten'], a: 3 },
      { q: 'Wat moet je doen als je op 5 juli in de avond werkt?', o: ['Thuisblijven van het feest', 'Zelf vervanging zoeken op de website', 'Overleggen met je planner', 'De directie een brief sturen'], a: 2 },
      { q: 'Voor wanneer moet je je aanmelden?', o: ['Vóór 5 juli', 'Vóór 20 juni', 'Vóór 17.00 uur', 'Vóór 1 juli'], a: 1 },
    ],
  },
  {
    id: 'a2ra13',
    type: 'email',
    title: 'Huurverhoging per 1 juli',
    text: `Van: Verhuurbedrijf Stadswonen
Aan: mevrouw L. Diallo
Onderwerp: jaarlijkse huurverhoging

Geachte mevrouw Diallo,

Elk jaar mag de huur op 1 juli omhoog. In deze e-mail leest u wat dit voor u betekent.

U huurt de woning aan de Berkenlaan 17. Uw huur is nu 750 euro per maand. Vanaf 1 juli wordt dit 771 euro per maand. Dat is een verhoging van 2,8 procent. De servicekosten van 45 euro veranderen niet.

Betaalt u via automatische incasso? Dan hoeft u niets te doen. Wij passen het bedrag zelf aan. Maakt u de huur zelf over? Verander het bedrag dan vanaf juli.

Bent u het niet eens met de verhoging? Dan kunt u vóór 1 juli bezwaar maken. Op www.stadswonen.nl/bezwaar leest u hoe dat werkt. Let op: u moet de huur wel blijven betalen, ook als u bezwaar maakt.

Heeft u vragen? Reageer op deze e-mail of bel 088-2340011.

Met vriendelijke groet,
Verhuurbedrijf Stadswonen`,
    qs: [
      { q: 'Wat wordt de nieuwe huur per 1 juli?', o: ['750 euro per maand', '795 euro per maand', '771 euro per maand', '745 euro per maand'], a: 2 },
      { q: 'Wat gebeurt er met de servicekosten?', o: ['Die blijven hetzelfde', 'Die gaan ook 2,8 procent omhoog', 'Die vervallen', 'Die worden 71 euro'], a: 0 },
      { q: 'Wat moet mevrouw Diallo doen als zij via automatische incasso betaalt?', o: ['Het nieuwe bedrag zelf instellen', 'De bank bellen', 'Een nieuw contract tekenen', 'Niets, het bedrag wordt aangepast'], a: 3 },
      { q: 'Wat kan zij doen als zij het niet eens is met de verhoging?', o: ['Vóór 1 juli bezwaar maken', 'De huur niet meer betalen', 'Direct de woning verlaten', 'Na 1 juli een brief schrijven'], a: 0 },
      { q: 'Wat is waar als zij bezwaar maakt?', o: ['Zij hoeft geen huur te betalen tot er een antwoord is', 'Zij moet de huur blijven betalen', 'Zij krijgt automatisch gelijk', 'Zij moet de woning uit'], a: 1 },
    ],
  },
  {
    id: 'a2ra14',
    type: 'aankondiging',
    title: 'Taalcafé in het buurthuis',
    text: `Nieuw in buurthuis De Ontmoeting: het Taalcafé!

Wilt u beter Nederlands spreken? Kom dan naar het Taalcafé. U oefent met praten over gewone onderwerpen: boodschappen, werk, gezondheid en de buurt. Vrijwilligers helpen u. Het gaat niet om moeilijke grammatica, maar om durven praten.

Het Taalcafé is er elke woensdagochtend van 9.30 tot 11.00 uur, ook in de schoolvakanties. De eerste keer is op woensdag 5 februari. Meedoen is gratis. U krijgt koffie en thee. Aanmelden is niet nodig, u kunt gewoon binnenlopen.

Het Taalcafé is voor volwassenen van alle niveaus. Neemt u kleine kinderen mee? Dat mag. In de zaal ernaast is een speelhoek, waar een vrijwilliger op de kinderen let.

Wilt u zelf vrijwilliger worden? Meld u aan bij de balie van het buurthuis of mail naar info@deontmoeting.nl.

Buurthuis De Ontmoeting, Lindeplein 2, Westdorp`,
    qs: [
      { q: 'Wat is het doel van het Taalcafé?', o: ['Moeilijke grammatica leren', 'Oefenen met Nederlands spreken', 'Koffie leren zetten', 'Een examen halen'], a: 1 },
      { q: 'Wanneer is het Taalcafé?', o: ['Elke woensdagochtend', 'Elke woensdagmiddag', 'Eén keer per maand', 'Alleen in de schoolvakanties'], a: 0 },
      { q: 'Wat moet u doen om mee te doen?', o: ['Een formulier invullen', 'Eerst een test maken', '5 euro betalen bij de balie', 'Niets, u kunt binnenlopen'], a: 3 },
      { q: 'Wat is er geregeld voor kleine kinderen?', o: ['Zij krijgen ook taalles', 'Een vrijwilliger let op hen in de speelhoek', 'Zij mogen niet mee', 'Er is een aparte juf van school'], a: 1 },
      { q: 'Hoe kunt u vrijwilliger worden?', o: ['Aanmelden bij de balie of via e-mail', 'Bellen met de gemeente', 'Langsgaan op het Lindeplein op zondag', 'Een brief sturen naar de vrijwilligers'], a: 0 },
    ],
  },
  {
    id: 'a2ra15',
    type: 'aankondiging',
    title: 'Openingstijden bibliotheek in de zomer',
    text: `Bibliotheek Meerstad — mededeling voor alle bezoekers

In juli en augustus gelden er andere openingstijden. Veel medewerkers hebben dan vakantie. Daarom zijn wij korter open.

Van 1 juli tot en met 31 augustus:
maandag gesloten, dinsdag tot en met vrijdag open van 10.00 tot 17.00 uur, zaterdag open van 10.00 tot 14.00 uur, zondag gesloten.

Leent u boeken? Denk aan de inleverdatum. Boeken die u in juni leent, mag u deze zomer zes weken houden in plaats van drie weken. Zo komt u niet in de problemen door de kortere openingstijden. Inleveren kan ook via de bus naast de ingang, elke dag, ook op maandag en zondag.

Het Digitaal Spreekuur, waar u hulp krijgt bij de computer en bij websites van de overheid, stopt in de zomer. Vanaf dinsdag 2 september is het spreekuur er weer, elke dinsdag om 14.00 uur.

Wij wensen u een fijne zomer!`,
    qs: [
      { q: 'Waarom is de bibliotheek in de zomer korter open?', o: ['Het gebouw wordt verbouwd', 'Er komen weinig bezoekers', 'Veel medewerkers hebben vakantie', 'De gemeente wil geld besparen'], a: 2 },
      { q: 'Op welke dag is de bibliotheek in de zomer helemaal gesloten behalve zondag?', o: ['Dinsdag', 'Maandag', 'Zaterdag', 'Vrijdag'], a: 1 },
      { q: 'Hoe lang mag u boeken houden die u in juni leent?', o: ['Drie weken', 'Twee weken', 'De hele zomer', 'Zes weken'], a: 3 },
      { q: 'Hoe kunt u boeken inleveren als de bibliotheek dicht is?', o: ['Via de bus naast de ingang', 'Bij de buren van de bibliotheek', 'Dat kan niet in de zomer', 'Via de post'], a: 0 },
      { q: 'Wat is waar over het Digitaal Spreekuur?', o: ['Het is de hele zomer elke dinsdag', 'Het start weer op 2 september', 'Het stopt voor altijd', 'Het is alleen op zaterdag'], a: 1 },
    ],
  },
  {
    id: 'a2ra16',
    type: 'aankondiging',
    title: 'Zwembad een week dicht voor onderhoud',
    text: `Zwembad De Golfslag — belangrijke mededeling

Van maandag 17 tot en met zondag 23 februari is het hele zwembad gesloten. Wij maken de baden schoon, vervangen de tegels in de kleedkamers en repareren de glijbaan.

Alle zwemlessen van die week vervallen. Uw kind mist dus één les. Deze les halen wij in op de zaterdagen 1 en 8 maart. Uw les-app laat zien op welke zaterdag uw kind wordt verwacht. U hoeft hiervoor niets te doen en niets extra te betalen.

Heeft u een abonnement voor vrij zwemmen? Dan mag u in de week van 17 februari gratis zwemmen in zwembad Het Anker in Noorderveld. Laat daar uw abonnement zien bij de kassa.

Vanaf maandag 24 februari om 7.00 uur zijn wij weer open. Door het onderhoud is het water de eerste dagen iets kouder dan normaal.

Vragen? Bel 0598-770022 of kijk op www.degolfslag.nl.`,
    qs: [
      { q: 'Waarom is het zwembad een week dicht?', o: ['Er zijn te weinig bezoekers', 'Er is onderhoud aan het gebouw en de baden', 'Het personeel heeft vakantie', 'Het water is te koud'], a: 1 },
      { q: 'Wat gebeurt er met de gemiste zwemles?', o: ['Die vervalt zonder vervanging', 'Ouders krijgen geld terug', 'Die wordt ingehaald op een zaterdag', 'Die wordt in de zomer ingehaald'], a: 2 },
      { q: 'Hoe weet u wanneer uw kind de les inhaalt?', o: ['Dat staat in de les-app', 'De school geeft het door', 'U moet zelf bellen met het zwembad', 'Dat hoort u bij de kassa'], a: 0 },
      { q: 'Wat kunnen mensen met een abonnement doen in de week van 17 februari?', o: ['Gratis zwemmen in zwembad Het Anker', 'Een week langer gratis parkeren', 'Zwemmen in de kleedkamers', 'Korting krijgen op zwemles'], a: 0 },
      { q: 'Wanneer gaat het zwembad weer open?', o: ['Zondag 23 februari', 'Zaterdag 1 maart', 'Zaterdag 8 maart', 'Maandag 24 februari'], a: 3 },
    ],
  },
  {
    id: 'a2ra17',
    type: 'aankondiging',
    title: 'Verbouwing van de kantine',
    text: `Mededeling voor alle medewerkers van Distributiecentrum Vrachtlijn

Vanaf maandag 3 juni wordt onze kantine verbouwd. De verbouwing duurt ongeveer vier weken. De kantine is in die periode helemaal gesloten.

Wat betekent dit voor u? Tijdens de verbouwing kunt u pauze houden in de vergaderruimte op de eerste verdieping. Daar staan tafels, stoelen en twee koffieautomaten. De warme maaltijden vervallen tijdelijk. Er staat wel elke dag een koelkast met broodjes, fruit en salades. Deze betaalt u met uw personeelspas, net als in de kantine.

Neemt u zelf eten mee? Gebruik dan de koelkast in de vergaderruimte en zet uw naam op uw eten. Op vrijdag wordt de koelkast leeggemaakt. Alles zonder naam gooien wij dan weg.

Na de verbouwing heeft de kantine meer zitplaatsen en een stiltehoek. Wij verwachten dat de kantine op maandag 1 juli weer opengaat.

De bedrijfsleiding`,
    qs: [
      { q: 'Waar kunnen medewerkers pauze houden tijdens de verbouwing?', o: ['In de kantine', 'Buiten op het terrein', 'In de vergaderruimte op de eerste verdieping', 'In het magazijn'], a: 2 },
      { q: 'Wat vervalt er tijdens de verbouwing?', o: ['De warme maaltijden', 'De pauzes', 'De koffie', 'De broodjes en salades'], a: 0 },
      { q: 'Hoe betaalt u de broodjes uit de koelkast?', o: ['Contant bij de kassa', 'Met uw personeelspas', 'Via een app', 'De broodjes zijn gratis'], a: 1 },
      { q: 'Wat gebeurt er op vrijdag met eten zonder naam?', o: ['Het blijft staan tot maandag', 'Het gaat naar de vergaderruimte', 'Het wordt uitgedeeld', 'Het wordt weggegooid'], a: 3 },
      { q: 'Wat is er nieuw na de verbouwing?', o: ['Een tweede koffieautomaat', 'Meer zitplaatsen en een stiltehoek', 'Een grotere koelkast', 'Gratis warme maaltijden'], a: 1 },
      { q: 'Wanneer gaat de kantine waarschijnlijk weer open?', o: ['Op 3 juni', 'Na de zomervakantie', 'Op 1 juli', 'Op 4 juni'], a: 2 },
    ],
  },
  {
    id: 'a2ra18',
    type: 'aankondiging',
    title: 'Onderhoud aan de lift',
    text: `Mededeling voor alle bewoners van flatgebouw De Horizon, Sterrenlaan 100

Beste bewoners,

Op dinsdag 8 april en woensdag 9 april wordt de lift van ons gebouw vervangen. De oude lift is 30 jaar oud en heeft steeds vaker storingen. Tijdens deze twee dagen kunt u de lift helemaal niet gebruiken. U moet dus de trap nemen.

De monteurs werken van 7.30 tot ongeveer 17.00 uur. Zij gebruiken de hal op de begane grond. Zet daar deze dagen geen fietsen of kinderwagens neer.

Kunt u de trap niet gebruiken, bijvoorbeeld door een rolstoel of een ziekte? Meld dit vóór 1 april bij de huismeester, de heer Bakker, op nummer 06-11223344. Hij zoekt samen met u een oplossing. Denk aan boodschappen laten bezorgen of tijdelijk bij familie logeren.

Op donderdag 10 april werkt de nieuwe lift. De nieuwe lift is stiller en heeft een spiegel en een bankje.

De bewonerscommissie`,
    qs: [
      { q: 'Waarom wordt de lift vervangen?', o: ['De lift is oud en heeft vaak storingen', 'De lift is te klein', 'Bewoners klagen over het bankje', 'De lift is te duur in gebruik'], a: 0 },
      { q: 'Op welke dagen kan de lift niet worden gebruikt?', o: ['1 en 2 april', '7 en 8 april', '8 en 9 april', '9 en 10 april'], a: 2 },
      { q: 'Wat mag er niet in de hal staan tijdens het werk?', o: ['Schoenen van bewoners', 'Fietsen en kinderwagens', 'Post van de bewoners', 'Planten'], a: 1 },
      { q: 'Wat moet iemand doen die de trap niet kan gebruiken?', o: ['Twee dagen binnen blijven', 'Zelf een monteur bellen', 'Een brief aan de gemeente schrijven', 'Vóór 1 april de huismeester bellen'], a: 3 },
      { q: 'Wat is waar over de nieuwe lift?', o: ['Hij is stiller en heeft een bankje', 'Hij is groter dan de oude lift', 'Hij werkt vanaf 9 april', 'Hij stopt alleen op even verdiepingen'], a: 0 },
    ],
  },
  {
    id: 'a2ra19',
    type: 'advertentie',
    title: 'Appartement te huur',
    text: `TE HUUR: licht appartement in Zuidbroek

Aan de Kastanjelaan 55 komt per 1 september een appartement vrij op de tweede verdieping. Het appartement heeft een woonkamer, twee slaapkamers, een nieuwe keuken en een balkon op de zon. De oppervlakte is 68 vierkante meter. Er is geen lift.

De huur is 895 euro per maand. Daar komen 60 euro servicekosten bij voor de schoonmaak van het trappenhuis en de verlichting. Gas, water en licht betaalt u zelf. De borg is één maand huur.

De bushalte ligt op twee minuten lopen. Een supermarkt en een basisschool zijn om de hoek. Parkeren op straat is gratis.

Wij zoeken huurders met een vast inkomen van minimaal 2.700 euro netto per maand. Huisdieren zijn niet toegestaan. Roken in het appartement ook niet.

Interesse? Mail naar verhuur@kastanjewonen.nl voor een bezichtiging op zaterdag 12 juli. Vermeld uw naam, telefoonnummer en inkomen.`,
    qs: [
      { q: 'Wat kost het appartement per maand, zonder gas, water en licht?', o: ['895 euro', '955 euro', '835 euro', '2.700 euro'], a: 1 },
      { q: 'Waarvoor zijn de servicekosten?', o: ['Voor gas, water en licht', 'Voor het parkeren', 'Voor de schoonmaak en verlichting van het trappenhuis', 'Voor de nieuwe keuken'], a: 2 },
      { q: 'Wie zoekt de verhuurder als huurder?', o: ['Iemand met een vast inkomen van minimaal 2.700 euro netto', 'Iemand met een huisdier', 'Een student zonder inkomen', 'Iemand die op de tweede verdieping werkt'], a: 0 },
      { q: 'Wat is waar over dit appartement?', o: ['Er is een lift in het gebouw', 'Parkeren op straat kost geld', 'Roken in het appartement mag niet', 'Het balkon ligt in de schaduw'], a: 2 },
      { q: 'Wat moet u doen als u het appartement wilt bekijken?', o: ['Op 1 september langsgaan', 'Bellen met de huismeester', 'De borg alvast betalen', 'Een e-mail sturen met uw gegevens'], a: 3 },
      { q: 'Wanneer is de bezichtiging?', o: ['Op 1 september', 'Op zaterdag 12 juli', 'Elke zaterdag', 'Op 12 augustus'], a: 1 },
    ],
  },
  {
    id: 'a2ra20',
    type: 'advertentie',
    title: 'Vacature bezorger',
    text: `GEZOCHT: bezorgers voor Bakkerij Van Steen in Westdorp

Bakkerij Van Steen zoekt twee bezorgers voor brood en taarten. Je brengt onze bestellingen met de bedrijfsbus naar klanten in Westdorp en de dorpen eromheen.

Wat ga je doen? Je begint om 6.30 uur met het inladen van de bus. Daarna rijd je twee rondes: één in de ochtend en één rond het middaguur. Om 14.00 uur ben je klaar. Je werkt vier of vijf dagen per week. Zaterdag is een vaste werkdag.

Wat vragen wij? Je hebt rijbewijs B en je spreekt genoeg Nederlands om klanten te helpen. Ervaring is niet nodig; wij leren je alles. Je bent op tijd en je werkt netjes.

Wat bieden wij? Een salaris van 14,20 euro per uur, een gratis brood op zaterdag en fijne collega's.

Bel voor een gesprek naar 0598-556677 en vraag naar mevrouw Van Steen. Mailen kan ook: werk@bakkerijvansteen.nl.`,
    qs: [
      { q: 'Wat voor werk staat er in deze advertentie?', o: ['Brood bakken in de nacht', 'Taarten versieren in de winkel', 'Brood en taarten bezorgen bij klanten', 'Klanten helpen achter de kassa'], a: 2 },
      { q: 'Hoe laat begint de werkdag?', o: ['Om 6.30 uur', 'Om 14.00 uur', 'Om 8.00 uur', 'Rond het middaguur'], a: 0 },
      { q: 'Wat heb je nodig voor deze baan?', o: ['Ervaring als bezorger', 'Een eigen bus', 'Een diploma van de bakkersschool', 'Rijbewijs B en genoeg Nederlands'], a: 3 },
      { q: 'Welke dag werk je in elk geval?', o: ['Maandag', 'Zaterdag', 'Zondag', 'Woensdag'], a: 1 },
      { q: 'Wat biedt de bakkerij naast salaris?', o: ['Een gratis brood op zaterdag', 'Een eigen auto', 'Gratis taarten voor familie', 'Een extra vrije week'], a: 0 },
    ],
  },
  {
    id: 'a2ra21',
    type: 'advertentie',
    title: 'Tweedehands fiets te koop',
    text: `TE KOOP: degelijke damesfiets, merk Windster

Ik verkoop de fiets van mijn dochter, omdat zij voor haar werk is verhuisd naar het buitenland. De fiets is drie jaar oud en goed onderhouden. Hij heeft zeven versnellingen, verlichting op de banden en twee fietstassen. De banden zijn vorige maand nieuw gedaan bij de fietsenmaker.

De fiets heeft één klein puntje: op het achterspatbord zit een kras. Dat ziet u ook op de foto's. Verder werkt alles goed, ook de bel en het slot. Bij de fiets krijgt u twee sleutels.

De vraagprijs is 165 euro. De nieuwprijs was 449 euro. U mag de fiets eerst proberen. Ik woon in de wijk Oosterpark in Meerstad, dicht bij het station.

Ophalen kan op dinsdag- en donderdagavond na 18.00 uur, of op zondag in overleg. Ik verstuur de fiets niet. Betalen kan contant of via een betaalverzoek.

Interesse? Stuur een bericht naar 06-99887766.`,
    qs: [
      { q: 'Waarom wordt de fiets verkocht?', o: ['De fiets is kapot', 'De dochter is naar het buitenland verhuisd', 'De verkoper heeft een nieuwe fiets gekocht', 'De fiets is te klein geworden'], a: 1 },
      { q: 'Wat is er niet helemaal in orde aan de fiets?', o: ['De bel doet het niet', 'Er mist een sleutel', 'Er zit een kras op het achterspatbord', 'De banden zijn oud'], a: 2 },
      { q: 'Wat kost de fiets?', o: ['449 euro', '199 euro', '65 euro', '165 euro'], a: 3 },
      { q: 'Wanneer kunt u de fiets ophalen?', o: ['Op dinsdag- en donderdagavond na 18.00 uur', 'Elke ochtend voor 9.00 uur', 'Alleen op zaterdag', 'De fiets wordt thuisgestuurd'], a: 0 },
      { q: 'Wat is waar over deze advertentie?', o: ['De fiets is nieuw', 'U mag de fiets eerst proberen', 'Betalen kan alleen contant', 'De fiets heeft geen versnellingen'], a: 1 },
    ],
  },
  {
    id: 'a2ra22',
    type: 'advertentie',
    title: 'Fietslessen voor volwassenen',
    text: `LEER FIETSEN BIJ FIETSSCHOOL OPWEG!

Bent u volwassen en kunt u nog niet fietsen? U bent niet de enige. Elk jaar leren honderden volwassenen bij ons fietsen. Fietsen is gezond, goedkoop en handig: u bent sneller bij uw werk, de winkel en de school van uw kinderen.

Een cursus duurt tien lessen van één uur. U oefent in een kleine groep van maximaal zes personen, eerst op een rustig plein en later op straat. Onze leraren spreken makkelijk Nederlands en hebben veel geduld. Een leenfiets en een helm zijn gratis.

De cursus kost 75 euro. Heeft u een laag inkomen? Met de stadspas van de gemeente betaalt u maar 15 euro.

Nieuwe groepen starten op maandag 3 maart: een ochtendgroep om 9.30 uur en een avondgroep om 19.00 uur. Er is ook een groep alleen voor vrouwen.

Aanmelden? Bel 06-33445566 of loop binnen bij buurthuis De Ontmoeting, Lindeplein 2.`,
    qs: [
      { q: 'Voor wie is deze cursus bedoeld?', o: ['Voor kinderen die leren fietsen', 'Voor volwassenen die niet kunnen fietsen', 'Voor mensen met een eigen racefiets', 'Voor leraren van de fietsschool'], a: 1 },
      { q: 'Hoeveel mensen zitten er maximaal in een groep?', o: ['Tien', 'Vijftien', 'Zes', 'Drie'], a: 2 },
      { q: 'Wat betaalt iemand met een stadspas?', o: ['15 euro', '75 euro', '60 euro', 'Niets'], a: 0 },
      { q: 'Wat is gratis bij de cursus?', o: ['De stadspas', 'Tien extra lessen', 'Koffie en thee', 'Een leenfiets en een helm'], a: 3 },
      { q: 'Waar oefenen de cursisten eerst?', o: ['Op straat tussen het verkeer', 'Op een rustig plein', 'In het buurthuis', 'In het park'], a: 1 },
      { q: 'Wat is waar over de groepen?', o: ['Er is ook een groep alleen voor vrouwen', 'Alle groepen starten om 9.30 uur', 'De avondgroep is alleen voor mannen', 'De groepen starten in de zomer'], a: 0 },
    ],
  },
  {
    id: 'a2ra23',
    type: 'instructie',
    title: 'Zo gebruikt u deze antibioticakuur',
    text: `Apotheek De Vijzel — informatie bij uw medicijn

U heeft van uw arts een antibioticakuur gekregen: 21 tabletten. Lees deze uitleg goed voordat u begint.

Neem drie keer per dag één tablet: bij het ontbijt, bij het avondeten en voor het slapen gaan. Slik de tablet in zijn geheel door met een glas water. De kuur duurt zeven dagen.

Heel belangrijk: maak de kuur helemaal af, ook als u zich na een paar dagen beter voelt. Stopt u te vroeg, dan kan de ziekte terugkomen.

Drink geen alcohol tijdens de kuur. Melk mag wel, maar niet binnen twee uur na de tablet.

Bent u een tablet vergeten? Neem de tablet alsnog als u het binnen vier uur merkt. Is er meer tijd voorbij? Sla de tablet dan over en ga daarna gewoon verder. Neem nooit twee tabletten tegelijk.

Krijgt u uitslag, jeuk of diarree? Stop dan niet zelf, maar bel eerst uw huisarts of de apotheek: 0598-330099.`,
    qs: [
      { q: 'Hoe vaak moet u een tablet innemen?', o: ['Eén keer per dag', 'Twee keer per dag', 'Drie keer per dag', 'Om de vier uur'], a: 2 },
      { q: 'Waarom moet u de kuur afmaken?', o: ['Anders kan de ziekte terugkomen', 'Anders betaalt de verzekering niet', 'Anders werkt de volgende kuur niet', 'De apotheek neemt tabletten niet terug'], a: 0 },
      { q: 'Wat mag u niet drinken tijdens de kuur?', o: ['Water', 'Melk', 'Koffie', 'Alcohol'], a: 3 },
      { q: 'U merkt na drie uur dat u een tablet bent vergeten. Wat doet u?', o: ['U slaat de tablet over', 'U neemt de tablet alsnog', 'U neemt twee tabletten tegelijk', 'U begint de kuur opnieuw'], a: 1 },
      { q: 'Wat moet u doen bij uitslag of jeuk?', o: ['Direct stoppen met de kuur', 'Een tablet extra nemen', 'Eerst de huisarts of apotheek bellen', 'Twee uur wachten met eten'], a: 2 },
      { q: 'Hoe lang duurt de kuur?', o: ['Eén dag', 'Zeven dagen', 'Eenentwintig dagen', 'Vier dagen'], a: 1 },
    ],
  },
  {
    id: 'a2ra24',
    type: 'instructie',
    title: 'Uw nieuwe wasmachine gebruiken',
    text: `Gebruiksaanwijzing wasmachine Lavamat 300 — snel starten

Lees deze stappen voordat u de machine voor het eerst gebruikt.

Stap 1. Draai de waterkraan achter de machine open. Steek daarna de stekker in het stopcontact.

Stap 2. Doe de was in de trommel. Doe de trommel niet te vol: er moet bovenin een hand ruimte overblijven. Sluit de deur tot u een klik hoort.

Stap 3. Doe het wasmiddel in het bakje links boven. Gebruik voor een normale was één dopje. Bij een kleine was is een half dopje genoeg.

Stap 4. Kies een programma met de draaiknop. Voor gewone kleding kiest u programma B, 40 graden. Voor wol en fijne stoffen kiest u programma D. Druk daarna op de startknop.

Belangrijk: was nieuwe donkere kleding de eerste keer apart, anders kunnen andere kleren verkleuren. U hoeft het filter onderaan de machine niet na elke was schoon te maken; één keer per drie maanden is genoeg.

Storing? Bel de servicedienst: 0800-4321.`,
    qs: [
      { q: 'Wat moet u doen voordat u de stekker in het stopcontact steekt?', o: ['De deur sluiten', 'De waterkraan opendraaien', 'Het filter schoonmaken', 'Een programma kiezen'], a: 1 },
      { q: 'Hoe vol mag de trommel?', o: ['Helemaal vol', 'Maximaal half vol', 'Er moet bovenin een hand ruimte overblijven', 'Maximaal drie kledingstukken'], a: 2 },
      { q: 'Welk programma kiest u voor wol?', o: ['Programma B', 'Programma A', '40 graden', 'Programma D'], a: 3 },
      { q: 'Waarom moet u nieuwe donkere kleding apart wassen?', o: ['Anders kunnen andere kleren verkleuren', 'Anders wordt de machine vies', 'Donkere kleding heeft meer wasmiddel nodig', 'Donkere kleding moet op 40 graden'], a: 0 },
      { q: 'Hoe vaak moet u het filter schoonmaken?', o: ['Na elke was', 'Eén keer per week', 'Eén keer per drie maanden', 'Dat hoeft nooit'], a: 2 },
    ],
  },
  {
    id: 'a2ra25',
    type: 'instructie',
    title: 'Reizen met uw ov-kaart',
    text: `Zo reist u met de bus met uw persoonlijke ov-kaart

Voordat u kunt reizen, zet u geld op de kaart. Dat heet opladen. Opladen kan bij de gele automaat op het station en bij veel supermarkten. Er moet minimaal 4 euro op de kaart staan om met de bus te reizen.

Bij het instappen houdt u de kaart voor de kaartlezer bij de deur. U hoort één piep: u bent ingecheckt. Hoort u twee piepen en ziet u een rood licht? Dan is er iets mis. Vraag de chauffeur om hulp.

Vergeet niet uit te checken bij het uitstappen. Houd de kaart weer voor de kaartlezer. Checkt u niet uit? Dan betaalt u 4 euro extra en krijgt u de kilometers niet terug.

Bent u uw kaart verloren? Blokkeer de kaart dan dezelfde dag nog via www.ovkaart-service.nl. Het geld op de kaart wordt dan overgezet op een nieuwe kaart. Een nieuwe kaart kost 11 euro.`,
    qs: [
      { q: 'Hoeveel geld moet er minimaal op de kaart staan voor de bus?', o: ['11 euro', '4 euro', '2 euro', '10 euro'], a: 1 },
      { q: 'Wat betekent één piep bij de kaartlezer?', o: ['De kaart is leeg', 'U moet de chauffeur roepen', 'U bent ingecheckt', 'U bent uitgecheckt'], a: 2 },
      { q: 'Wat moet u doen bij twee piepen en een rood licht?', o: ['De chauffeur om hulp vragen', 'Snel uitstappen', 'De kaart opnieuw opladen', 'Een nieuwe kaart kopen'], a: 0 },
      { q: 'Wat gebeurt er als u niet uitcheckt?', o: ['Er gebeurt niets', 'De kaart wordt geblokkeerd', 'U mag de bus niet meer in', 'U betaalt 4 euro extra'], a: 3 },
      { q: 'Wat moet u doen als u uw kaart verliest?', o: ['Een dag wachten en dan bellen', 'De kaart dezelfde dag blokkeren via de website', 'Naar de chauffeur gaan', 'Een brief naar het station sturen'], a: 1 },
      { q: 'Waar kunt u de kaart opladen?', o: ['Alleen in de bus', 'Bij de gele automaat en veel supermarkten', 'Alleen via internet', 'Bij de bibliotheek'], a: 1 },
    ],
  },
  {
    id: 'a2ra26',
    type: 'instructie',
    title: 'Het inschrijfformulier invullen',
    text: `Muziekschool Toonladder — uitleg bij het inschrijfformulier

Wilt u uw kind aanmelden voor muziekles? Vul het formulier zo in.

Bij vraag 1 vult u de naam en geboortedatum van uw kind in. Let op: schrijf de datum als dag-maand-jaar, bijvoorbeeld 03-05-2017.

Bij vraag 2 kiest u het instrument. U mag een eerste en een tweede keuze opgeven. Is de les voor de eerste keuze vol, dan krijgt uw kind een plek bij de tweede keuze.

Bij vraag 3 vult u uw eigen naam, telefoonnummer en e-mailadres in. Wij gebruiken het e-mailadres voor de factuur en het lesrooster.

Vergeet uw handtekening onderaan niet. Zonder handtekening kunnen wij het formulier niet verwerken.

Lever het formulier in bij de balie of scan het en mail het naar inschrijven@toonladder.nl. Inleveren kan tot en met 15 augustus. U hoort vóór 1 september in welke groep uw kind zit. De lessen beginnen in de week van 8 september.`,
    qs: [
      { q: 'Hoe moet u de geboortedatum schrijven?', o: ['Als dag-maand-jaar', 'Als jaar-maand-dag', 'Als maand-dag-jaar', 'In letters'], a: 0 },
      { q: 'Waarom mag u een tweede instrument kiezen?', o: ['Uw kind krijgt les op twee instrumenten', 'De tweede keuze is goedkoper', 'Bij een volle les krijgt uw kind een plek bij de tweede keuze', 'De school kiest zelf het instrument'], a: 2 },
      { q: 'Waarvoor gebruikt de school uw e-mailadres?', o: ['Voor reclame van de winkel', 'Voor de factuur en het lesrooster', 'Om uw kind huiswerk te sturen', 'Voor de handtekening'], a: 1 },
      { q: 'Wat gebeurt er met een formulier zonder handtekening?', o: ['Het wordt gewoon verwerkt', 'Het gaat naar de tweede keuze', 'U krijgt een boete', 'Het kan niet worden verwerkt'], a: 3 },
      { q: 'Tot wanneer kunt u het formulier inleveren?', o: ['Tot en met 15 augustus', 'Tot 1 september', 'Tot 8 september', 'Tot 3 mei'], a: 0 },
    ],
  },
  {
    id: 'a2ra27',
    type: 'nieuws',
    title: 'Nieuw park geopend in Zuidbroek',
    text: `Zuidbroek heeft er een groot park bij. Zaterdag opende wethouder Anja Kuiper het Vlinderpark, op de plek waar vroeger een oude fabriek stond. Honderden buurtbewoners kwamen naar de opening.

Het park heeft een grote speeltuin, een veld voor sport en spel, en een tuin waar bewoners samen groente kunnen kweken. Ook is er een pad van twee kilometer voor wandelaars en hardlopers. Honden mogen alleen loslopen op het veld bij de ingang aan de Fabrieksweg.

De naam Vlinderpark is gekozen door kinderen van basisschool De Regenboog. Zij wonnen een wedstrijd waar meer dan tweehonderd namen voor waren ingestuurd. In het park zijn speciale bloemen geplant die vlinders aantrekken.

Niet alles is al klaar. Het kleine café bij de vijver opent pas in het voorjaar. De gemeente zoekt nog vrijwilligers die willen helpen in de groentetuin. Aanmelden kan via www.zuidbroek.nl/vlinderpark.`,
    qs: [
      { q: 'Wat stond er vroeger op de plek van het park?', o: ['Een school', 'Een oude fabriek', 'Een café', 'Een speeltuin'], a: 1 },
      { q: 'Wie hebben de naam van het park gekozen?', o: ['De wethouder', 'De buurtbewoners', 'Kinderen van een basisschool', 'De gemeente'], a: 2 },
      { q: 'Waar mogen honden loslopen?', o: ['Op het veld bij de ingang aan de Fabrieksweg', 'In de groentetuin', 'Op het wandelpad', 'Nergens in het park'], a: 0 },
      { q: 'Wat is er nog niet klaar in het park?', o: ['De speeltuin', 'Het wandelpad', 'De groentetuin', 'Het café bij de vijver'], a: 3 },
      { q: 'Wie zoekt de gemeente nog?', o: ['Vrijwilligers voor de groentetuin', 'Een nieuwe wethouder', 'Kinderen voor een wedstrijd', 'Personeel voor het café'], a: 0 },
      { q: 'Waarom zijn er speciale bloemen geplant?', o: ['Omdat ze goedkoop zijn', 'Om vlinders aan te trekken', 'Voor de wedstrijd van de school', 'Omdat honden er niet van eten'], a: 1 },
    ],
  },
  {
    id: 'a2ra28',
    type: 'nieuws',
    title: 'Wegwerkzaamheden aan de Ringweg',
    text: `Automobilisten in Noorderveld moeten de komende weken rekening houden met extra reistijd. Vanaf maandag 5 mei wordt de Ringweg opnieuw geasfalteerd. Het werk duurt drie weken en is klaar op vrijdag 23 mei.

De weg wordt in delen aangepakt. Eerst is het deel tussen de rotonde en het ziekenhuis dicht. Verkeer wordt omgeleid via de Industrieweg. De omleiding staat met gele borden aangegeven en duurt ongeveer tien minuten extra.

Het ziekenhuis blijft altijd bereikbaar, ook voor ambulances. Bezoekers van het ziekenhuis kunnen het beste via de zuidkant rijden en parkeren op parkeerterrein P2.

Fietsers hebben minder last van het werk. Het fietspad naast de Ringweg blijft open, behalve op 12 en 13 mei. Op die dagen rijden fietsers om via het Vlinderpark.

De bus rijdt tijdens het werk een andere route. Halte Ringweg-Oost vervalt tijdelijk. Reizigers kunnen opstappen bij halte Stationsplein. Kijk voor actuele reistijden op de website van de vervoerder.`,
    qs: [
      { q: 'Wat gebeurt er vanaf 5 mei met de Ringweg?', o: ['De weg krijgt nieuw asfalt', 'De weg wordt breder gemaakt', 'Er komt een nieuwe rotonde', 'De weg gaat voorgoed dicht'], a: 0 },
      { q: 'Hoe rijdt het autoverkeer tijdens het eerste deel van het werk?', o: ['Via het Vlinderpark', 'Via de Industrieweg', 'Via parkeerterrein P2', 'Via het Stationsplein'], a: 1 },
      { q: 'Wat is waar over het ziekenhuis?', o: ['Het is drie weken gesloten', 'Het is alleen via de Ringweg bereikbaar', 'Bezoekers moeten met de bus komen', 'Het blijft altijd bereikbaar'], a: 3 },
      { q: 'Wanneer kunnen fietsers het fietspad niet gebruiken?', o: ['Op 12 en 13 mei', 'Op 5 mei', 'Van 5 tot 23 mei', 'Op 23 mei'], a: 0 },
      { q: 'Waar kunnen busreizigers opstappen nu halte Ringweg-Oost vervalt?', o: ['Bij het ziekenhuis', 'Bij de rotonde', 'Bij halte Stationsplein', 'Bij de Industrieweg'], a: 2 },
    ],
  },
  {
    id: 'a2ra29',
    type: 'nieuws',
    title: 'Buurtfeest groot succes ondanks regen',
    text: `Het jaarlijkse buurtfeest van de wijk Oosterpark was zaterdag opnieuw een succes. Volgens de organisatie kwamen er ongeveer achthonderd bezoekers, meer dan vorig jaar.

Het feest begon om 12.00 uur met een optocht van kinderen in zelfgemaakte kostuums. Daarna was er muziek op het plein, met optredens van bands uit de buurt. Bewoners verkochten eten uit veel verschillende landen. De kraam met Syrische hapjes was al om 15.00 uur uitverkocht.

Rond 16.00 uur begon het hard te regenen. De organisatie verplaatste de muziek snel naar de grote tent. Alleen het straatvoetbaltoernooi kon niet doorgaan; dat wordt later dit jaar alsnog gespeeld. De datum staat nog niet vast.

Organisator Samira El Amrani kijkt tevreden terug. Volgens haar is het feest belangrijk voor de wijk, omdat buren elkaar zo beter leren kennen. Volgend jaar wil de organisatie een tweede tent huren. Bewoners die willen meehelpen, kunnen zich al aanmelden via buurtfeestoosterpark@mail.nl.`,
    qs: [
      { q: 'Hoeveel bezoekers kwamen er ongeveer naar het feest?', o: ['Achthonderd', 'Tweehonderd', 'Vijfhonderd', 'Duizend'], a: 0 },
      { q: 'Waarmee begon het feest?', o: ['Met muziek in de tent', 'Met een optocht van kinderen', 'Met het voetbaltoernooi', 'Met een toespraak van de organisatie'], a: 1 },
      { q: 'Wat gebeurde er toen het ging regenen?', o: ['Het feest stopte meteen', 'Alle bezoekers gingen naar huis', 'De muziek verhuisde naar de grote tent', 'De kramen werden gesloten'], a: 2 },
      { q: 'Wat is waar over het straatvoetbaltoernooi?', o: ['Het werd in de tent gespeeld', 'Het begon om 16.00 uur', 'Het is afgezegd voor dit jaar', 'Het wordt later dit jaar gespeeld'], a: 3 },
      { q: 'Waarom vindt Samira het feest belangrijk?', o: ['Buren leren elkaar beter kennen', 'De wijk verdient er geld mee', 'Kinderen leren voetballen', 'De bands worden beroemd'], a: 0 },
      { q: 'Wat wil de organisatie volgend jaar doen?', o: ['Het feest op een andere plek houden', 'Een tweede tent huren', 'Minder kramen neerzetten', 'Het feest in de zomer houden'], a: 1 },
    ],
  },
  {
    id: 'a2ra30',
    type: 'nieuws',
    title: 'Nieuwe bushalte bij winkelcentrum',
    text: `Goed nieuws voor bewoners van de wijk Sterrenveld in Meerstad. Vanaf zondag 1 december stopt buslijn 8 bij het winkelcentrum. De nieuwe halte heet Sterrenveld-Centrum en ligt direct voor de ingang van de supermarkt.

Bewoners vroegen al jaren om een halte bij het winkelcentrum. Vooral ouderen moesten tot nu toe ver lopen: de dichtstbijzijnde halte lag op vijftien minuten afstand. Een groep bewoners verzamelde vorig jaar ruim duizend handtekeningen. De gemeente en de vervoerder gingen daarna samen op zoek naar een oplossing.

Buslijn 8 rijdt op werkdagen elk kwartier en in het weekend elk halfuur. De eerste bus vertrekt om 6.15 uur, de laatste om 23.45 uur. Door de nieuwe halte verandert de route iets. De halte Parkzicht vervalt daarom. Reizigers van Parkzicht kunnen voortaan opstappen bij de halte Vijverlaan, op vijf minuten lopen.

De nieuwe halte krijgt een abri met een bankje en een digitaal bord met vertrektijden.`,
    qs: [
      { q: 'Wat is het belangrijkste nieuws in dit bericht?', o: ['Buslijn 8 stopt voortaan bij het winkelcentrum', 'Het winkelcentrum krijgt een nieuwe supermarkt', 'Buslijn 8 stopt met rijden', 'De bus wordt duurder'], a: 0 },
      { q: 'Waarom wilden bewoners een halte bij het winkelcentrum?', o: ['De bus was altijd te laat', 'De oude halte was te druk', 'Vooral ouderen moesten ver lopen', 'Het parkeren was te duur'], a: 2 },
      { q: 'Wat deed een groep bewoners vorig jaar?', o: ['Zij blokkeerden de weg', 'Zij verzamelden ruim duizend handtekeningen', 'Zij kochten zelf een bus', 'Zij schreven een brief aan de koning'], a: 1 },
      { q: 'Hoe vaak rijdt buslijn 8 op werkdagen?', o: ['Elk halfuur', 'Elk uur', 'Twee keer per dag', 'Elk kwartier'], a: 3 },
      { q: 'Wat betekent de nieuwe halte voor reizigers van halte Parkzicht?', o: ['Hun halte vervalt, zij gaan naar halte Vijverlaan', 'Hun halte krijgt een nieuw bankje', 'Zij moeten voortaan lopen naar het winkelcentrum', 'Er verandert niets voor hen'], a: 0 },
    ],
  },
];
