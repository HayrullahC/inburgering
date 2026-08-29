// A2 reading bank, part B: brieven, e-mails, folders, roosters, instructies, verhaaltjes.
// All texts are original and written for this app; format mirrors scripts/banks/b1-rl.mjs.

export const LEZEN_B = [
  {
    id: 'a2rb01',
    type: 'brief',
    title: 'Herinnering tandartscontrole',
    text: `Tandartspraktijk Molenzicht
Beukenlaan 12, Arnhem

Geachte mevrouw Demir,

Het is weer tijd voor uw halfjaarlijkse controle. Wij hebben voor u een afspraak gepland op dinsdag 14 oktober om 9.30 uur bij tandarts Van Leeuwen.

Kunt u op dit moment niet komen? Bel ons dan minimaal 24 uur van tevoren op 026-3456789. U kunt dan direct een nieuwe afspraak maken. Zegt u de afspraak te laat af, dan moeten wij helaas 25 euro in rekening brengen.

Neem uw verzekeringspas mee naar de afspraak. Bent u van zorgverzekering veranderd? Geef dit dan door aan de balie.

Met vriendelijke groet,
Tandartspraktijk Molenzicht`,
    qs: [
      { q: 'Wat is het doel van deze brief?', o: ['Een rekening sturen', 'Een afspraak voor een controle doorgeven', 'Een nieuwe tandarts voorstellen', 'Vragen naar een nieuwe zorgverzekering'], a: 1 },
      { q: 'Wanneer is de afspraak van mevrouw Demir?', o: ['Dinsdag 14 oktober om 9.30 uur', 'Donderdag 14 oktober om 9.00 uur', 'Dinsdag 24 oktober om 9.30 uur', 'Maandag 14 oktober om 10.30 uur'], a: 0 },
      { q: 'Wat moet mevrouw Demir doen als zij niet kan komen?', o: ['Een e-mail sturen naar de balie', 'Gewoon niet komen', 'Minimaal 24 uur van tevoren bellen', '25 euro betalen aan de balie'], a: 2 },
      { q: 'Wat gebeurt er als zij de afspraak te laat afzegt?', o: ['Zij krijgt geen nieuwe afspraak meer', 'De controle duurt langer', 'De tandarts belt haar op', 'Zij moet 25 euro betalen'], a: 3 },
      { q: 'Wat moet mevrouw Demir meenemen?', o: ['Haar verzekeringspas', 'Haar rijbewijs', 'De brief van de praktijk', 'Haar bankpas'], a: 0 },
    ],
  },
  {
    id: 'a2rb02',
    type: 'brief',
    title: 'Medicijnen liggen klaar',
    text: `Apotheek De Vijzel
Marktstraat 8, Ede

Geachte heer Kaya,

De medicijnen die uw huisarts op 3 maart heeft voorgeschreven, liggen voor u klaar. U kunt ze afhalen tot en met vrijdag 14 maart. Daarna gaan de medicijnen terug en moet u een nieuw recept vragen.

Onze apotheek is open van maandag tot en met vrijdag van 8.00 tot 17.30 uur. Op zaterdag zijn wij open van 10.00 tot 13.00 uur.

Neem bij het afhalen uw identiteitsbewijs mee. Haalt iemand anders uw medicijnen op? Dan heeft die persoon een briefje met uw handtekening nodig en ook uw identiteitsbewijs.

Een van uw medicijnen is nieuw voor u. De apotheker geeft u daarom aan de balie graag uitleg over het gebruik.

Met vriendelijke groet,
Apotheek De Vijzel`,
    qs: [
      { q: 'Waarom krijgt de heer Kaya deze brief?', o: ['Zijn recept is verlopen', 'Zijn medicijnen liggen klaar bij de apotheek', 'Hij moet naar de huisarts komen', 'Hij heeft een rekening niet betaald'], a: 1 },
      { q: 'Tot wanneer kan hij de medicijnen afhalen?', o: ['Tot en met 3 maart', 'Tot en met 10 maart', 'Tot en met 14 maart', 'Tot en met 17 maart'], a: 2 },
      { q: 'Hoe laat sluit de apotheek op zaterdag?', o: ['Om 17.30 uur', 'Om 8.00 uur', 'Om 10.00 uur', 'Om 13.00 uur'], a: 3 },
      { q: 'Wat heeft iemand anders nodig om de medicijnen op te halen?', o: ['Een briefje met handtekening en het identiteitsbewijs van de heer Kaya', 'Alleen zijn eigen identiteitsbewijs', 'Een nieuw recept van de huisarts', 'Een pasje van de apotheek'], a: 0 },
      { q: 'Waarom wil de apotheker de heer Kaya spreken?', o: ['Omdat hij te laat is', 'Omdat een medicijn nieuw voor hem is', 'Omdat het recept niet klopt', 'Omdat hij moet betalen'], a: 1 },
    ],
  },
  {
    id: 'a2rb03',
    type: 'brief',
    title: 'Geef uw nieuwe adres door',
    text: `Dienst Studiezaken
Postbus 410, Groningen

Geachte mevrouw Osman,

U ontvangt studiefinanciering voor uw mbo-opleiding. Uit onze gegevens blijkt dat u vanaf 1 september niet meer bij uw ouders woont.

Woont u op uzelf, dan heeft u recht op een hogere beurs: 310 euro per maand in plaats van 95 euro per maand. Wij hebben uw nieuwe adres nog niet ontvangen. Daarom kunnen wij het hogere bedrag nu niet uitbetalen.

Geef uw nieuwe adres vóór 15 augustus door via uw account op onze website. Doet u dat niet, dan blijft u het lagere bedrag ontvangen.

Heeft u vragen? Bel ons op werkdagen tussen 9.00 en 16.00 uur op 050-1234567.

Met vriendelijke groet,
Dienst Studiezaken`,
    qs: [
      { q: 'Wie heeft deze brief geschreven?', o: ['De school van mevrouw Osman', 'De gemeente Groningen', 'Dienst Studiezaken', 'De ouders van mevrouw Osman'], a: 2 },
      { q: 'Hoeveel beurs krijgt een student die op zichzelf woont?', o: ['95 euro per maand', '310 euro per maand', '410 euro per maand', '150 euro per maand'], a: 1 },
      { q: 'Waarom betaalt de dienst het hogere bedrag nog niet?', o: ['Het nieuwe adres is nog niet doorgegeven', 'Mevrouw Osman is gestopt met haar opleiding', 'De opleiding is te kort', 'Er is geen geld meer'], a: 0 },
      { q: 'Wat moet mevrouw Osman vóór 15 augustus doen?', o: ['Bellen met haar school', 'Een nieuw account maken', 'Naar het kantoor in Groningen gaan', 'Haar adres doorgeven via de website'], a: 3 },
      { q: 'Wanneer kan mevrouw Osman bellen met vragen?', o: ['Op werkdagen tussen 9.00 en 16.00 uur', 'Alleen op maandag', 'Elke dag tot 17.00 uur', 'In het weekend tussen 9.00 en 16.00 uur'], a: 0 },
    ],
  },
  {
    id: 'a2rb04',
    type: 'brief',
    title: 'Uw jaarafrekening komt eraan',
    text: `EnergieDirect
Postbus 900, Utrecht

Geachte heer Nowak,

In de week van 20 januari ontvangt u uw jaarafrekening. Daarop ziet u hoeveel gas en stroom u het afgelopen jaar heeft gebruikt.

Om de afrekening te maken, hebben wij uw meterstanden nodig. Geef deze vóór 10 januari door via onze app of website. Geeft u geen standen door, dan maken wij een schatting. Die kan hoger uitvallen dan uw echte verbruik.

Uw maandbedrag is nu 145 euro. Heeft u meer gebruikt dan verwacht, dan moet u bijbetalen. Heeft u minder gebruikt, dan krijgt u geld terug op uw rekening.

Wilt u uw maandbedrag aanpassen? Dat kan eenvoudig in de app onder Mijn Gegevens.

Met vriendelijke groet,
EnergieDirect`,
    qs: [
      { q: 'Wat ontvangt de heer Nowak in de week van 20 januari?', o: ['Een nieuwe meter', 'Een aanbieding voor een nieuw contract', 'De jaarafrekening', 'Een brief over de app'], a: 2 },
      { q: 'Wat moet hij vóór 10 januari doen?', o: ['Zijn meterstanden doorgeven', 'Zijn maandbedrag verhogen', '145 euro betalen', 'Een nieuwe app installeren'], a: 0 },
      { q: 'Wat gebeurt er als hij geen meterstanden doorgeeft?', o: ['Hij krijgt geen stroom meer', 'De afrekening komt later', 'Het bedrijf maakt een schatting', 'Hij moet 145 euro extra betalen'], a: 2 },
      { q: 'Wanneer krijgt hij geld terug?', o: ['Als hij de app gebruikt', 'Als hij minder heeft gebruikt dan verwacht', 'Als hij vóór 10 januari betaalt', 'Als hij zijn maandbedrag verhoogt'], a: 1 },
      { q: 'Waar kan hij zijn maandbedrag aanpassen?', o: ['Aan de balie in Utrecht', 'Via een brief aan Postbus 900', 'Bij de meteropnemer', 'In de app onder Mijn Gegevens'], a: 3 },
    ],
  },
  {
    id: 'a2rb05',
    type: 'brief',
    title: 'Verhoging van uw huur',
    text: `Woningstichting Goed Wonen
Stationsweg 3, Amersfoort

Geachte mevrouw Silva,

Elk jaar op 1 juli passen wij de huren aan. Uw huur is nu 720 euro per maand. Vanaf 1 juli wordt dat 738 euro per maand. Dat is een verhoging van 2,5 procent.

De servicekosten blijven gelijk: 48 euro per maand. In dat bedrag zitten de schoonmaak van het trappenhuis en de verlichting van de galerij.

Betaalt u via automatische incasso? Dan hoeft u niets te doen. Wij passen het bedrag zelf aan. Maakt u de huur elke maand zelf over? Vergeet dan niet het nieuwe bedrag te gebruiken.

Bent u het niet eens met de verhoging? Dan kunt u vóór 1 juli een brief sturen naar ons kantoor.

Met vriendelijke groet,
Woningstichting Goed Wonen`,
    qs: [
      { q: 'Waar gaat deze brief over?', o: ['Een verhuizing', 'De jaarlijkse huurverhoging', 'Nieuwe servicekosten', 'Een klacht van mevrouw Silva'], a: 1 },
      { q: 'Hoe hoog is de huur vanaf 1 juli?', o: ['720 euro per maand', '748 euro per maand', '738 euro per maand', '768 euro per maand'], a: 2 },
      { q: 'Wat zit er in de servicekosten?', o: ['De schoonmaak van het trappenhuis en de verlichting', 'Gas en water', 'De verzekering van de woning', 'Kleine reparaties in huis'], a: 0 },
      { q: 'Wie hoeft niets te doen na deze brief?', o: ['Huurders die zelf overmaken', 'Huurders die het niet eens zijn met de verhoging', 'Huurders die net verhuisd zijn', 'Huurders met automatische incasso'], a: 3 },
      { q: 'Wat kan mevrouw Silva doen als zij het niet eens is met de verhoging?', o: ['Vóór 1 juli een brief sturen', 'Stoppen met betalen', 'Bellen met de schoonmaker', 'Na 1 juli een e-mail sturen'], a: 0 },
      { q: 'Met hoeveel procent gaat de huur omhoog?', o: ['4,8 procent', '2,5 procent', '1,5 procent', '7,2 procent'], a: 1 },
    ],
  },
  {
    id: 'a2rb06',
    type: 'brief',
    title: 'Boeken te laat',
    text: `Bibliotheek Het Baken
Kerkplein 5, Zwolle

Beste mevrouw Petrova,

Volgens onze administratie heeft u drie boeken geleend die u op 12 mei moest inleveren. Wij hebben de boeken nog niet terug.

Voor elk boek betaalt u 30 cent per dag te laat. Op dit moment staat er 5,40 euro open op uw pas. Zolang dit bedrag open staat, kunt u geen nieuwe boeken lenen.

Lukt het niet om langs te komen? U kunt de boeken ook inleveren bij onze kleine vestiging in de wijk Stadshagen. Die is open op dinsdag en donderdag van 13.00 tot 17.00 uur.

Wilt u de boeken langer houden? Verleng ze dan gratis via de website of de app. Dat kan alleen als niemand anders het boek heeft gereserveerd.

Met vriendelijke groet,
Bibliotheek Het Baken`,
    qs: [
      { q: 'Waarom schrijft de bibliotheek deze brief?', o: ['Mevrouw Petrova heeft boeken te laat', 'Er is een nieuwe vestiging geopend', 'De pas van mevrouw Petrova is verlopen', 'Er zijn nieuwe boeken binnen'], a: 0 },
      { q: 'Hoeveel moet mevrouw Petrova nu betalen?', o: ['30 cent', '3,60 euro', '5,40 euro', '12 euro'], a: 2 },
      { q: 'Wat kan zij niet doen zolang het bedrag open staat?', o: ['De website bezoeken', 'Nieuwe boeken lenen', 'Naar Stadshagen gaan', 'Boeken inleveren'], a: 1 },
      { q: 'Wanneer is de vestiging in Stadshagen open?', o: ['Elke dag van 13.00 tot 17.00 uur', 'Op maandag en woensdag', 'Op zaterdag van 13.00 tot 17.00 uur', 'Op dinsdag en donderdag van 13.00 tot 17.00 uur'], a: 3 },
      { q: 'Wanneer kan een boek niet verlengd worden?', o: ['Als iemand anders het heeft gereserveerd', 'Als het boek ouder is dan een jaar', 'Als het via de app gaat', 'Als het boek uit Stadshagen komt'], a: 0 },
    ],
  },
  {
    id: 'a2rb07',
    type: 'brief',
    title: 'Geef uw meterstand door',
    text: `Waterbedrijf Rivierland
Postbus 250, Nijmegen

Geachte heer Hassan,

Eén keer per jaar vragen wij u de stand van uw watermeter door te geven. Zo weten wij precies hoeveel water u heeft gebruikt.

Geef uw meterstand door tussen 1 juni en 15 juni. Dat kan via onze website of telefonisch op 024-7654321. Houd uw klantnummer bij de hand. Dat nummer staat bovenaan deze brief.

De watermeter zit meestal in de meterkast bij de voordeur of onder de trap. Op de meter ziet u zwarte en rode cijfers. Geef alleen de zwarte cijfers door.

Geeft u geen stand door, dan schatten wij uw verbruik op basis van vorig jaar. Uw jaarafrekening ontvangt u in juli.

Met vriendelijke groet,
Waterbedrijf Rivierland`,
    qs: [
      { q: 'Wat moet de heer Hassan doorgeven?', o: ['Zijn nieuwe adres', 'De stand van zijn watermeter', 'Zijn klantnummer wijzigen', 'Een klacht over de rekening'], a: 1 },
      { q: 'Wanneer moet hij dat doen?', o: ['Vóór 1 juni', 'In juli', 'Tussen 1 juni en 15 juni', 'Vóór het einde van het jaar'], a: 2 },
      { q: 'Waar staat het klantnummer?', o: ['Op de watermeter', 'In de meterkast', 'Op de website', 'Bovenaan de brief'], a: 3 },
      { q: 'Welke cijfers van de meter moet hij doorgeven?', o: ['Alleen de zwarte cijfers', 'Alleen de rode cijfers', 'De zwarte en de rode cijfers', 'De cijfers van vorig jaar'], a: 0 },
      { q: 'Wat doet het waterbedrijf als hij geen stand doorgeeft?', o: ['Het water wordt afgesloten', 'Hij krijgt een boete', 'Het verbruik wordt geschat', 'De afrekening komt later'], a: 2 },
    ],
  },
  {
    id: 'a2rb08',
    type: 'email',
    title: 'Uitnodiging ouderavond',
    text: `Van: Basisschool De Regenboog
Aan: ouders van groep 5
Onderwerp: ouderavond op 12 november

Beste ouders,

Op woensdag 12 november is er een ouderavond over de resultaten van uw kind. De gesprekken duren tien minuten en zijn tussen 18.30 en 21.00 uur in het lokaal van groep 5.

U kunt zich tot en met vrijdag 7 november aanmelden via de schoolapp. Kies daar zelf een tijd die u past. Wie zich niet aanmeldt, krijgt van de juf een tijd toegewezen.

Komt u samen met uw partner? Dat mag natuurlijk. Neemt u uw kind mee, dan kan het wachten in de aula. Daar is een leerkracht aanwezig.

Kunt u op 12 november echt niet? Stuur dan een e-mail naar juf Annemiek. Zij plant met u een telefonisch gesprek op een ander moment.

Met vriendelijke groet,
Basisschool De Regenboog`,
    qs: [
      { q: 'Waar gaat de ouderavond over?', o: ['De nieuwe schoolapp', 'Een schoolreisje van groep 5', 'De resultaten van de kinderen', 'Het afscheid van juf Annemiek'], a: 2 },
      { q: 'Hoe lang duurt een gesprek?', o: ['Tien minuten', 'Een half uur', 'Een kwartier', 'Twintig minuten'], a: 0 },
      { q: 'Hoe kunnen ouders zich aanmelden?', o: ['Via een brief aan de juf', 'Via de schoolapp', 'Aan de balie van de school', 'Via een telefoontje naar school'], a: 1 },
      { q: 'Wat gebeurt er als ouders zich niet aanmelden?', o: ['Zij mogen niet komen', 'Zij krijgen een nieuwe uitnodiging', 'Het gesprek gaat niet door', 'De juf kiest een tijd voor hen'], a: 3 },
      { q: 'Wat kunnen ouders doen als zij op 12 november niet kunnen?', o: ['Een e-mail sturen naar juf Annemiek', 'Op een andere avond langskomen', 'Hun kind alleen sturen', 'Wachten in de aula'], a: 0 },
      { q: 'Waar kunnen kinderen wachten tijdens het gesprek?', o: ['In het lokaal van groep 5', 'Thuis', 'In de aula', 'Op het schoolplein'], a: 2 },
    ],
  },
  {
    id: 'a2rb09',
    type: 'email',
    title: 'Wil je ruilen?',
    text: `Van: Mehmet
Aan: Joanna
Onderwerp: dienst ruilen zaterdag

Hoi Joanna,

Ik heb een vraag. Ik sta zaterdag 21 juni ingeroosterd voor de late dienst in het magazijn, van 14.00 tot 22.00 uur. Maar die dag is het huwelijk van mijn broer en daar wil ik graag bij zijn.

Jij hebt die zaterdag de vroege dienst, van 6.00 tot 14.00 uur. Zullen wij ruilen? Dan werk ik de vroege dienst en jij de late. Volgende maand mag jij natuurlijk een keer met mij ruilen als jou dat uitkomt.

Als je akkoord bent, geef ik het vandaag nog door aan planner Ruud. Hij moet de ruil vóór woensdag goedkeuren, anders blijft het oude rooster gelden.

Laat je het mij vandaag of morgen weten? Alvast bedankt!

Groetjes,
Mehmet`,
    qs: [
      { q: 'Waarom wil Mehmet ruilen?', o: ['Hij is ziek', 'Zijn broer gaat trouwen', 'Hij werkt liever in de avond', 'Hij heeft een afspraak met Ruud'], a: 1 },
      { q: 'Welke dienst heeft Joanna nu op 21 juni?', o: ['De late dienst', 'Geen dienst', 'De vroege dienst', 'De nachtdienst'], a: 2 },
      { q: 'Wat wil Mehmet precies?', o: ['Dat Joanna zijn late dienst overneemt', 'Dat Joanna vrij neemt', 'Dat Ruud zijn dienst overneemt', 'Dat hij een dag later mag werken'], a: 0 },
      { q: 'Wie moet de ruil goedkeuren?', o: ['De broer van Mehmet', 'Joanna', 'De directeur', 'Planner Ruud'], a: 3 },
      { q: 'Wanneer moet de ruil goedgekeurd zijn?', o: ['Vóór woensdag', 'Vóór zaterdag 21 juni', 'Vandaag nog', 'Vóór volgende maand'], a: 0 },
    ],
  },
  {
    id: 'a2rb10',
    type: 'email',
    title: 'Verrassingsfeest voor Fatima',
    text: `Van: Elena
Aan: Amira
Onderwerp: feestje voor Fatima, niet doorvertellen!

Lieve Amira,

Fatima wordt op 3 mei veertig jaar. Ik wil een verrassingsfeest voor haar organiseren. Het feest is op zaterdag 4 mei bij mij thuis, Tulpstraat 17. We beginnen om 19.30 uur, maar kom alsjeblieft uiterlijk 19.15 uur. Fatima komt om 19.45 uur, dan moet iedereen er al zijn.

Vertel het haar dus niet! Het moet echt een verrassing blijven.

Ik zorg voor hapjes en drinken. Wil jij misschien de taart meenemen? Jij kunt zo lekker bakken. We geven ook samen een cadeau: iedereen betaalt 10 euro mee. Je kunt het geld aan mij geven op het feest.

Kun je even laten weten of je komt? Graag vóór 25 april, dan weet ik hoeveel mensen er komen.

Liefs,
Elena`,
    qs: [
      { q: 'Waarom schrijft Elena deze e-mail?', o: ['Zij wil taart leren bakken', 'Zij nodigt Amira uit voor een verrassingsfeest', 'Zij vraagt Amira om hapjes te maken', 'Zij is jarig op 3 mei'], a: 1 },
      { q: 'Hoe laat moet Amira uiterlijk binnen zijn?', o: ['Om 19.45 uur', 'Om 19.30 uur', 'Om 19.15 uur', 'Om 19.00 uur'], a: 2 },
      { q: 'Wat mag Amira niet doen?', o: ['Het feest aan Fatima vertellen', 'Later dan 25 april antwoorden', 'Zonder cadeau komen', 'Haar partner meenemen'], a: 0 },
      { q: 'Wat vraagt Elena aan Amira mee te nemen?', o: ['Hapjes', 'Drinken', 'Een bos bloemen', 'De taart'], a: 3 },
      { q: 'Waarom wil Elena vóór 25 april een antwoord?', o: ['Dan is het cadeau al gekocht', 'Dan weet zij hoeveel mensen er komen', 'Dan is Fatima nog op vakantie', 'Dan kan zij de zaal reserveren'], a: 1 },
    ],
  },
  {
    id: 'a2rb11',
    type: 'email',
    title: 'Antwoord op uw klacht',
    text: `Van: Klantenservice Webshop Domino
Aan: mevrouw Jansen
Onderwerp: uw melding over bestelling 58213

Geachte mevrouw Jansen,

Bedankt voor uw bericht van 2 februari. U schrijft dat de waterkoker die u heeft besteld kapot is aangekomen. Dat vinden wij heel vervelend.

U hoeft de kapotte waterkoker niet terug te sturen. U mag hem weggooien of naar een inleverpunt voor elektrische apparaten brengen.

Wij sturen u gratis een nieuwe waterkoker. Die wordt binnen drie werkdagen bezorgd. U ontvangt een e-mail met een track-and-tracecode zodra het pakket onderweg is.

Wilt u liever uw geld terug? Antwoord dan op deze e-mail met het woord terugbetaling. Het bedrag van 34,95 euro staat dan binnen vijf werkdagen op uw rekening.

Onze excuses voor het ongemak.

Met vriendelijke groet,
Tim de Vries, klantenservice`,
    qs: [
      { q: 'Waarom heeft mevrouw Jansen contact opgenomen?', o: ['Haar bestelling is niet aangekomen', 'Zij wil een waterkoker bestellen', 'Haar waterkoker kwam kapot aan', 'Zij heeft te veel betaald'], a: 2 },
      { q: 'Wat moet zij met de kapotte waterkoker doen?', o: ['Terugsturen naar de webshop', 'Weggooien of naar een inleverpunt brengen', 'Bewaren tot het nieuwe pakket komt', 'Naar de winkel brengen'], a: 1 },
      { q: 'Wanneer wordt de nieuwe waterkoker bezorgd?', o: ['Binnen drie werkdagen', 'Binnen vijf werkdagen', 'Op 2 februari', 'Binnen twee weken'], a: 0 },
      { q: 'Wat moet zij doen als zij haar geld terug wil?', o: ['Bellen met Tim de Vries', 'Een brief sturen', 'Naar de website gaan', 'Antwoorden met het woord terugbetaling'], a: 3 },
      { q: 'Hoeveel kostte de waterkoker?', o: ['34,95 euro', '43,95 euro', '39,45 euro', '35,94 euro'], a: 0 },
    ],
  },
  {
    id: 'a2rb12',
    type: 'email',
    title: 'Start van het nieuwe seizoen',
    text: `Van: Sportclub Blauw-Wit
Aan: alle leden
Onderwerp: informatie nieuwe seizoen

Beste leden,

Het nieuwe voetbalseizoen begint op maandag 18 augustus. Vanaf die dag gelden de nieuwe trainingstijden. Die staan vanaf 1 augustus op onze website.

De contributie blijft dit jaar gelijk: 160 euro voor volwassenen en 95 euro voor kinderen tot en met 15 jaar. U betaalt vóór 1 september. Wie in termijnen wil betalen, stuurt een e-mail naar de penningmeester.

Let op: spelers zonder geldige spelerspas mogen niet meedoen aan wedstrijden. Controleer dus of uw pas nog geldig is. Een nieuwe pas vraagt u aan bij de ledenadministratie. Stuur daarvoor een recente pasfoto mee.

Op zaterdag 23 augustus houden wij een open dag. Vrienden en familie zijn welkom om gratis mee te trainen. Aanmelden is niet nodig.

Met sportieve groet,
Het bestuur van Sportclub Blauw-Wit`,
    qs: [
      { q: 'Wanneer begint het nieuwe seizoen?', o: ['Op 1 augustus', 'Op 23 augustus', 'Op 18 augustus', 'Op 1 september'], a: 2 },
      { q: 'Hoeveel contributie betaalt een kind van 12 jaar?', o: ['160 euro', '95 euro', '65 euro', 'Niets'], a: 1 },
      { q: 'Wat moet een lid doen om in termijnen te betalen?', o: ['Vóór 1 augustus betalen', 'Naar de open dag komen', 'Bellen met het bestuur', 'De penningmeester een e-mail sturen'], a: 3 },
      { q: 'Wat is er nodig voor een nieuwe spelerspas?', o: ['Een recente pasfoto', 'Een betaalbewijs', 'Een handtekening van de trainer', 'Een oude spelerspas'], a: 0 },
      { q: 'Wat is waar over de open dag?', o: ['Alleen leden mogen komen', 'Aanmelden is verplicht', 'Vrienden en familie mogen gratis meetrainen', 'De open dag is op 18 augustus'], a: 2 },
    ],
  },
  {
    id: 'a2rb13',
    type: 'email',
    title: 'Kun je mijn pakket aannemen?',
    text: `Van: Karim
Aan: Sofia
Onderwerp: pakketje donderdag

Hoi Sofia,

Ik heb een vraag aan jou als buurvrouw. Donderdag komt er een pakket voor mij, ergens tussen 12.00 en 15.00 uur. Maar ik ben die dag op mijn werk tot 17.30 uur.

Zou jij het pakket willen aannemen? Je hoeft niet thuis te blijven: de bezorger belt eerst bij mij aan en daarna bij jou. Ben je er niet, dan gaat het pakket naar het afhaalpunt in de supermarkt en dat is voor mij lastig, want die is doordeweeks maar tot 18.00 uur open.

Het is geen zwaar pakket, gewoon een doos met boeken. Ik haal het donderdagavond meteen bij je op, rond 18.00 uur. Als bedankje neem ik iets lekkers voor je mee.

Lukt het niet, geen probleem. Stuur me dan even een berichtje, dan vraag ik het aan de overburen.

Groetjes,
Karim`,
    qs: [
      { q: 'Wat vraagt Karim aan Sofia?', o: ['Boeken voor hem te kopen', 'Zijn pakket aan te nemen', 'Hem naar zijn werk te brengen', 'Donderdag thuis te blijven'], a: 1 },
      { q: 'Waarom kan Karim het pakket zelf niet aannemen?', o: ['Hij is op vakantie', 'Hij is naar de supermarkt', 'Hij moet werken tot 17.30 uur', 'Hij is bij de overburen'], a: 2 },
      { q: 'Wat gebeurt er als Sofia ook niet thuis is?', o: ['Het pakket gaat naar het afhaalpunt', 'De bezorger komt vrijdag terug', 'Het pakket gaat terug naar de winkel', 'De overburen nemen het aan'], a: 0 },
      { q: 'Wat zit er in het pakket?', o: ['Iets lekkers', 'Kleding', 'Een cadeau voor Sofia', 'Boeken'], a: 3 },
      { q: 'Wanneer wil Karim het pakket ophalen?', o: ['Donderdagavond rond 18.00 uur', 'Vrijdagochtend', 'Donderdag om 15.00 uur', 'Zaterdag'], a: 0 },
    ],
  },
  {
    id: 'a2rb14',
    type: 'folder',
    title: 'De huisartsenpost: alleen voor spoed',
    text: `Huisartsenpost Regio Oosterdal

Uw eigen huisarts is gesloten in de avond, in de nacht en in het weekend. Heeft u dan dringend een dokter nodig? Bel de huisartsenpost: 0900-8844.

Bel eerst, kom niet zomaar langs. Een assistent stelt u vragen aan de telefoon. Zij bepaalt of u langs moet komen, of dat een advies aan de telefoon genoeg is. Soms komt een dokter bij u thuis.

De huisartsenpost is er alleen voor klachten die niet kunnen wachten tot de volgende werkdag. Denk aan hoge koorts bij een baby of een wond die blijft bloeden. Heeft u een vraag over medicijnen of een klacht die al weken duurt? Bel dan uw eigen huisarts op een werkdag.

Neem mee naar de huisartsenpost: uw identiteitsbewijs, uw verzekeringspas en een lijst van uw medicijnen.

Bij een levensbedreigende situatie belt u altijd 112.`,
    qs: [
      { q: 'Wanneer belt u de huisartsenpost?', o: ['Als uw eigen huisarts open is', 'Voor een vraag over medicijnen', 'Als u dringend een dokter nodig heeft buiten kantoortijden', 'Als u een nieuwe huisarts zoekt'], a: 2 },
      { q: 'Wat moet u eerst doen?', o: ['Bellen met 0900-8844', 'Naar de post toe gaan', '112 bellen', 'Een e-mail sturen'], a: 0 },
      { q: 'Wie bepaalt of u langs moet komen?', o: ['De dokter van de post', 'U zelf', 'Uw eigen huisarts', 'De assistent aan de telefoon'], a: 3 },
      { q: 'Welke klacht is een voorbeeld van spoed?', o: ['Een klacht die al weken duurt', 'Hoge koorts bij een baby', 'Een vraag over medicijnen', 'Een verlopen recept'], a: 1 },
      { q: 'Wat neemt u mee naar de huisartsenpost?', o: ['Alleen uw bankpas', 'Uw identiteitsbewijs, verzekeringspas en medicijnlijst', 'Een brief van uw huisarts', 'Uw eigen medicijnen'], a: 1 },
      { q: 'Wanneer belt u 112?', o: ['Bij een levensbedreigende situatie', 'Als de lijn van de post bezet is', 'In het weekend', 'Als de assistent niet opneemt'], a: 0 },
    ],
  },
  {
    id: 'a2rb15',
    type: 'folder',
    title: 'Kom naar het Taalcafé',
    text: `Taalcafé De Praatstoel

Wilt u beter Nederlands spreken? Kom dan naar het Taalcafé! In het Taalcafé praat u in kleine groepjes over gewone onderwerpen: boodschappen doen, werk, het weer of uw hobby. Nederlandse vrijwilligers helpen u.

Het Taalcafé is elke dinsdagochtend van 10.00 tot 11.30 uur in buurthuis De Klinker aan de Meidoornlaan 2. Meedoen is gratis en u hoeft zich niet aan te melden. U komt gewoon binnen wanneer u wilt. Koffie en thee kosten 50 cent per kopje.

Het Taalcafé is geen les. U krijgt geen huiswerk en geen toetsen. Het gaat om durven praten. Iedereen is welkom, van beginner tot gevorderd.

Kunt u op dinsdag niet? In wijkcentrum Oosterhof is er ook een Taalcafé, op donderdagavond van 19.00 tot 20.30 uur.

Meer weten? Loop binnen bij De Klinker of kijk op de website van de bibliotheek.`,
    qs: [
      { q: 'Voor wie is het Taalcafé bedoeld?', o: ['Voor mensen die beter Nederlands willen spreken', 'Voor Nederlandse vrijwilligers', 'Alleen voor beginners', 'Voor mensen die een toets moeten doen'], a: 0 },
      { q: 'Wat kost het Taalcafé?', o: ['50 cent per keer', '10 euro per maand', 'Meedoen is gratis', '1,50 euro per kopje koffie'], a: 2 },
      { q: 'Wat moet u doen om mee te doen op dinsdag?', o: ['U aanmelden via de website', 'Gewoon binnenkomen', 'Eerst een toets maken', 'Bellen met het buurthuis'], a: 1 },
      { q: 'Wat is waar over het Taalcafé?', o: ['U krijgt elke week huiswerk', 'Het is een officiële les', 'Alleen gevorderden mogen komen', 'Het gaat om durven praten'], a: 3 },
      { q: 'Waar kunt u terecht als u op dinsdag niet kunt?', o: ['In wijkcentrum Oosterhof op donderdagavond', 'In de bibliotheek op zaterdag', 'Bij De Klinker op vrijdag', 'Nergens, er is één Taalcafé'], a: 0 },
    ],
  },
  {
    id: 'a2rb16',
    type: 'folder',
    title: 'Cursus Positief Opvoeden',
    text: `Cursus Positief Opvoeden
Voor ouders van kinderen van 4 tot 12 jaar

Luistert uw kind niet? Zijn er vaak ruzies over schermtijd, eten of naar bed gaan? U bent niet de enige. In de cursus Positief Opvoeden leert u hoe u rustig blijft en duidelijke regels maakt.

De cursus bestaat uit vijf bijeenkomsten op woensdagavond, van 19.30 tot 21.30 uur. We starten op 5 februari in het Ouder- en Kindcentrum aan de Lindelaan 30. De groep is klein: maximaal twaalf ouders.

Deelname kost 15 euro voor het hele programma, inclusief koffie, thee en een werkboek. Heeft u een laag inkomen? Dan is de cursus gratis. Neem daarvoor uw bewijs van de gemeente mee.

Aanmelden kan tot 22 januari via opvoeden@okc-lindelaan.nl. Vermeld uw naam, telefoonnummer en de leeftijd van uw kind. Er is geen kinderopvang tijdens de bijeenkomsten.`,
    qs: [
      { q: 'Voor wie is deze cursus?', o: ['Voor kinderen van 4 tot 12 jaar', 'Voor ouders van kinderen van 4 tot 12 jaar', 'Voor leerkrachten', 'Voor ouders van pubers'], a: 1 },
      { q: 'Uit hoeveel bijeenkomsten bestaat de cursus?', o: ['Twaalf', 'Twee', 'Vijf', 'Vijftien'], a: 2 },
      { q: 'Wat zit er bij de prijs van 15 euro in?', o: ['Koffie, thee en een werkboek', 'Kinderopvang', 'Een diploma', 'Een gesprek met de gemeente'], a: 0 },
      { q: 'Wanneer is de cursus gratis?', o: ['Als u zich vóór 22 januari aanmeldt', 'Als u meer dan twee kinderen heeft', 'Als de groep niet vol is', 'Als u een laag inkomen heeft'], a: 3 },
      { q: 'Hoe kunt u zich aanmelden?', o: ['Via een e-mail met naam, telefoonnummer en leeftijd van uw kind', 'Door op 5 februari langs te komen', 'Via een brief aan de gemeente', 'Door te bellen met het centrum'], a: 0 },
      { q: 'Wat is waar over kinderopvang?', o: ['Kinderopvang kost 15 euro', 'Er is geen kinderopvang tijdens de bijeenkomsten', 'Kinderopvang is gratis', 'Kinderen mogen meedoen met de cursus'], a: 1 },
    ],
  },
  {
    id: 'a2rb17',
    type: 'folder',
    title: 'Sportdag in het Vaartpark',
    text: `Sportdag voor de hele buurt
Zaterdag 14 juni, Vaartpark

Kom sporten en kijken! Op zaterdag 14 juni organiseert Stichting Buurtsport een grote sportdag in het Vaartpark. Er is van alles te doen: voetbal, hardlopen, fietsen en yoga op het gras.

Het programma begint om 10.00 uur en duurt tot 16.00 uur. Om 11.00 uur start de hardloopwedstrijd van 5 kilometer. Hiervoor moet u zich vooraf aanmelden via www.buurtsport-vaartpark.nl. Deelname aan de wedstrijd kost 3 euro. Alle andere activiteiten zijn gratis en zonder aanmelding.

Voor kinderen tot 10 jaar is er een apart programma met spelletjes, elk uur begeleid door onze vrijwilligers. Ouders blijven zelf in het park aanwezig.

Neem zelf een flesje water en sportschoenen mee. Bij slecht weer gaat de sportdag niet door. Kijk die ochtend vanaf 8.00 uur op de website.`,
    qs: [
      { q: 'Wie organiseert de sportdag?', o: ['De gemeente', 'Stichting Buurtsport', 'Een sportschool', 'De school in de buurt'], a: 1 },
      { q: 'Voor welke activiteit is aanmelden verplicht?', o: ['Yoga op het gras', 'Voetbal', 'De hardloopwedstrijd', 'De kinderspelletjes'], a: 2 },
      { q: 'Hoeveel kost de hardloopwedstrijd?', o: ['3 euro', 'Niets', '5 euro', '10 euro'], a: 0 },
      { q: 'Wat geldt er voor ouders van jonge kinderen?', o: ['Zij betalen 3 euro', 'Zij helpen als vrijwilliger', 'Zij mogen niet meedoen', 'Zij blijven zelf in het park'], a: 3 },
      { q: 'Hoe weet u of de sportdag doorgaat bij slecht weer?', o: ['U belt de stichting', 'U kijkt vanaf 8.00 uur op de website', 'U krijgt een e-mail', 'U gaat gewoon naar het park'], a: 1 },
    ],
  },
  {
    id: 'a2rb18',
    type: 'folder',
    title: 'Nationale Museumdag',
    text: `Nationale Museumdag
Zondag 6 april

Op zondag 6 april is het Nationale Museumdag. Meer dan tweehonderd musea in het hele land openen dan gratis hun deuren. Ook in onze stad doen drie musea mee.

Het Speelgoedmuseum aan de Havenkade is open van 10.00 tot 17.00 uur. Kinderen kunnen er zelf spelen met oud speelgoed. Het Stadsmuseum op de Grote Markt is open van 11.00 tot 17.00 uur. Om 13.00 uur en om 15.00 uur is er een gratis rondleiding. Vol is vol: haal een kaartje bij de kassa. Het Molenmuseum buiten het centrum is open van 12.00 tot 16.00 uur.

Let op: gratis toegang geldt alleen op 6 april en alleen met een toegangskaart. Die haalt u vanaf 20 maart op www.museumdag.nl. Print de kaart of laat hem zien op uw telefoon. Per persoon kunt u kaarten voor maximaal twee musea bestellen.`,
    qs: [
      { q: 'Wat is er bijzonder op 6 april?', o: ['Er opent een nieuw museum', 'De musea zijn gratis toegankelijk', 'Alle musea zijn gesloten', 'Het Speelgoedmuseum bestaat honderd jaar'], a: 1 },
      { q: 'Hoe laat opent het Stadsmuseum?', o: ['Om 10.00 uur', 'Om 12.00 uur', 'Om 11.00 uur', 'Om 13.00 uur'], a: 2 },
      { q: 'Wat moet u doen voor de rondleiding in het Stadsmuseum?', o: ['Een kaartje halen bij de kassa', 'Reserveren via de website', 'Om 12.00 uur aanwezig zijn', 'Extra betalen'], a: 0 },
      { q: 'Hoe krijgt u gratis toegang op 6 april?', o: ['Door uw identiteitsbewijs te laten zien', 'Door vóór 20 maart te betalen', 'Door lid te worden van een museum', 'Met een toegangskaart van de website'], a: 3 },
      { q: 'Voor hoeveel musea kan één persoon kaarten bestellen?', o: ['Maximaal twee', 'Maximaal drie', 'Eén', 'Onbeperkt'], a: 0 },
    ],
  },
  {
    id: 'a2rb19',
    type: 'rooster',
    title: 'Werkrooster week 23',
    text: `Supermarkt Dagvers, vestiging Zuidplein
Rooster week 23 voor: Ahmed Barzani, afdeling vulploeg

Maandag: vrij.
Dinsdag: 7.00 tot 12.00 uur, vakken vullen.
Woensdag: 13.00 tot 18.00 uur, vakken vullen.
Donderdag: 7.00 tot 12.00 uur, magazijn opruimen samen met Youssef.
Vrijdag: vrij.
Zaterdag: 15.00 tot 21.00 uur, vakken vullen en om 20.30 uur samen afsluiten met teamleider Petra.
Zondag: vrij.

Totaal deze week: 21 uur.

Pauze: bij een dienst van vijf uur of langer heb je recht op een kwartier pauze. De pauze is betaald.

Ruilen mag alleen met iemand van je eigen afdeling. Geef een ruil minimaal twee dagen van tevoren door aan Petra. Ben je ziek? Bel dan vóór 6.30 uur naar de winkel, ook in het weekend. Het rooster voor week 24 hangt vanaf donderdag in de kantine.`,
    qs: [
      { q: 'Op welke dagen is Ahmed vrij?', o: ['Maandag, vrijdag en zondag', 'Maandag, woensdag en zondag', 'Dinsdag en donderdag', 'Alleen op zondag'], a: 0 },
      { q: 'Wat doet Ahmed op donderdag?', o: ['Vakken vullen', 'Afsluiten met Petra', 'Magazijn opruimen met Youssef', 'Hij is vrij'], a: 2 },
      { q: 'Hoeveel uur werkt Ahmed deze week in totaal?', o: ['18 uur', '23 uur', '24 uur', '21 uur'], a: 3 },
      { q: 'Wanneer heeft Ahmed recht op pauze?', o: ['Bij elke dienst', 'Bij een dienst van vijf uur of langer', 'Alleen op zaterdag', 'Alleen in het magazijn'], a: 1 },
      { q: 'Wat moet Ahmed doen als hij ziek is?', o: ['Een berichtje sturen naar Youssef', 'Wachten tot maandag', 'Zelf een vervanger regelen', 'Vóór 6.30 uur naar de winkel bellen'], a: 3 },
      { q: 'Waar hangt het rooster voor week 24?', o: ['In het magazijn', 'In de kantine', 'Bij de kassa', 'Op de website'], a: 1 },
    ],
  },
  {
    id: 'a2rb20',
    type: 'rooster',
    title: 'Openingstijden rond de feestdagen',
    text: `Zwembad De Golfslag
Aangepaste openingstijden rond de feestdagen

In de kerstvakantie gelden andere openingstijden dan u van ons gewend bent.

Dinsdag 24 december: open van 9.00 tot 15.00 uur.
Woensdag 25 december, eerste kerstdag: gesloten.
Donderdag 26 december, tweede kerstdag: open van 10.00 tot 16.00 uur, alleen vrij zwemmen.
Vrijdag 27 tot en met maandag 30 december: gewone tijden, van 7.00 tot 21.00 uur.
Dinsdag 31 december: open van 9.00 tot 13.00 uur.
Woensdag 1 januari: gesloten.
Vanaf donderdag 2 januari gelden weer de gewone openingstijden.

Alle zwemlessen vervallen van 24 december tot en met 1 januari. De lessen beginnen weer op donderdag 2 januari. Gemiste lessen worden niet ingehaald, maar u betaalt voor deze periode ook geen lesgeld.

Op 26 december is het vaak druk. Koop uw kaartje die dag vooraf online, dan hoeft u niet te wachten bij de kassa.`,
    qs: [
      { q: 'Wanneer is het zwembad gesloten?', o: ['Op 24 en 31 december', 'Op 25 december en 1 januari', 'Op 26 en 27 december', 'De hele kerstvakantie'], a: 1 },
      { q: 'Hoe laat sluit het zwembad op 31 december?', o: ['Om 15.00 uur', 'Om 21.00 uur', 'Om 13.00 uur', 'Om 16.00 uur'], a: 2 },
      { q: 'Wat kan er op 26 december alleen?', o: ['Vrij zwemmen', 'Zwemles volgen', 'Baantjes trekken', 'Kaartjes kopen bij de kassa'], a: 0 },
      { q: 'Wat geldt er voor de zwemlessen in deze periode?', o: ['Ze gaan gewoon door', 'Ze worden later ingehaald', 'Ze zijn alleen op 26 december', 'Ze vervallen en kosten geen lesgeld'], a: 3 },
      { q: 'Waarom is het slim om op 26 december online een kaartje te kopen?', o: ['Dan hoeft u niet te wachten bij de kassa', 'Online is het kaartje goedkoper', 'De kassa is die dag dicht', 'Alleen online kaartjes zijn geldig'], a: 0 },
    ],
  },
  {
    id: 'a2rb21',
    type: 'rooster',
    title: 'Buslijn 14 naar het ziekenhuis',
    text: `Busmaatschappij Streekvervoer Oost
Lijn 14: Station - Centrum - Ziekenhuis Westerpoort

Op werkdagen rijdt lijn 14 elk kwartier. De eerste bus vertrekt om 6.15 uur van het station. De laatste bus vertrekt om 23.45 uur. Tussen 9.00 en 16.00 uur rijdt de bus elke tien minuten.

Op zaterdag rijdt lijn 14 elk half uur, van 7.30 tot 23.30 uur. Op zondag en op feestdagen rijdt de bus één keer per uur, van 9.00 tot 22.00 uur.

De rit van het station naar het ziekenhuis duurt 18 minuten. De halte Ziekenhuis Westerpoort ligt direct voor de hoofdingang.

Let op: van maandag 3 tot en met vrijdag 14 maart is de Brugstraat opgebroken. De bus stopt dan niet bij de halte Centrum. Reizigers voor het centrum stappen uit bij de halte Waagplein, op vijf minuten lopen van de Grote Markt.

Een kaartje kopen bij de chauffeur kan alleen met pin.`,
    qs: [
      { q: 'Hoe vaak rijdt lijn 14 op zaterdag?', o: ['Elk kwartier', 'Elke tien minuten', 'Elk half uur', 'Eén keer per uur'], a: 2 },
      { q: 'Hoe laat vertrekt op werkdagen de eerste bus?', o: ['Om 7.30 uur', 'Om 6.15 uur', 'Om 9.00 uur', 'Om 6.45 uur'], a: 1 },
      { q: 'Hoe lang duurt de rit van het station naar het ziekenhuis?', o: ['18 minuten', '10 minuten', '15 minuten', '30 minuten'], a: 0 },
      { q: 'Wat is er aan de hand van 3 tot en met 14 maart?', o: ['De bus rijdt helemaal niet', 'Het ziekenhuis is dicht', 'De bus rijdt alleen op werkdagen', 'De bus stopt niet bij de halte Centrum'], a: 3 },
      { q: 'Waar stappen reizigers voor het centrum in die periode uit?', o: ['Bij de halte Waagplein', 'Bij het station', 'Bij het ziekenhuis', 'Bij de Brugstraat'], a: 0 },
      { q: 'Hoe betaalt u een kaartje bij de chauffeur?', o: ['Met contant geld', 'Met pin', 'Met een app', 'Bij de chauffeur kan niet betaald worden'], a: 1 },
    ],
  },
  {
    id: 'a2rb22',
    type: 'rooster',
    title: 'Lesrooster Taalschool Spreekvaardig',
    text: `Taalschool Spreekvaardig
Lesrooster periode september tot en met december
Groep A2, docent: meneer Willems, lokaal 1.04

Maandag: 9.00 tot 11.30 uur, lezen en schrijven.
Woensdag: 9.00 tot 11.30 uur, spreken en luisteren.
Vrijdag: 9.00 tot 10.30 uur, oefenen voor het examen. Deze les is niet verplicht, maar wij raden hem sterk aan.

In de herfstvakantie, van 20 tot en met 24 oktober, is er geen les.

Op maandag 8 december maakt u een proefexamen lezen. Kom die dag uiterlijk om 8.45 uur, want om 9.00 uur precies beginnen we. Wie te laat komt, mag niet meer naar binnen.

Bent u ziek? Meld dit vóór 8.30 uur via een bericht aan de administratie, niet aan de docent. Wie drie keer zonder bericht afwezig is, krijgt een gesprek met de teamleider.

Boeken koopt u zelf. De boekenlijst staat op de website van de school.`,
    qs: [
      { q: 'Wat staat er op woensdag op het rooster?', o: ['Lezen en schrijven', 'Spreken en luisteren', 'Oefenen voor het examen', 'Een proefexamen'], a: 1 },
      { q: 'Welke les is niet verplicht?', o: ['De les op maandag', 'De les op woensdag', 'Het proefexamen', 'De les op vrijdag'], a: 3 },
      { q: 'Hoe laat moet u op 8 december uiterlijk aanwezig zijn?', o: ['Om 8.45 uur', 'Om 9.00 uur', 'Om 8.30 uur', 'Om 9.15 uur'], a: 0 },
      { q: 'Bij wie meldt u zich ziek?', o: ['Bij meneer Willems', 'Bij de teamleider', 'Bij de administratie', 'Bij een klasgenoot'], a: 2 },
      { q: 'Wat gebeurt er als u drie keer zonder bericht afwezig bent?', o: ['U moet de opleiding stoppen', 'U krijgt een gesprek met de teamleider', 'U betaalt een boete', 'U mag het examen niet doen'], a: 1 },
    ],
  },
  {
    id: 'a2rb23',
    type: 'instructie',
    title: 'Zo gebruikt u de wasmachine',
    text: `Wasmachine gebruiken in de wasruimte
Woongebouw De Linde, kelderverdieping

Stap 1: Doe uw was in de trommel. Vul de trommel maximaal voor driekwart, anders wordt de was niet goed schoon.

Stap 2: Doe het wasmiddel in het linkervakje van de lade. Gebruikt u wasverzachter? Die gaat in het rechtervakje.

Stap 3: Kies een programma met de draaiknop. Voor gewone was kiest u programma 2, katoen 40 graden. Dit programma duurt ongeveer twee uur. Voor sportkleding kiest u programma 5, dat wast korter en kouder.

Stap 4: Houd uw woonpas tegen de lezer naast de machine. Per wasbeurt betaalt u 2,50 euro via de pas. De machine start daarna vanzelf.

Haal uw was binnen een half uur na afloop uit de machine. Andere bewoners wachten vaak op een vrije machine. De wasruimte is open van 7.00 tot 22.00 uur.

Storing? Bel de huismeester en zet een briefje op de machine.`,
    qs: [
      { q: 'Hoe vol mag de trommel?', o: ['Helemaal vol', 'Maximaal voor driekwart', 'Voor de helft', 'Maximaal twee kilo'], a: 1 },
      { q: 'Waar gaat de wasverzachter in?', o: ['In het rechtervakje van de lade', 'In het linkervakje van de lade', 'Direct in de trommel', 'In een apart flesje bovenop'], a: 0 },
      { q: 'Welk programma kiest u voor gewone was?', o: ['Programma 5', 'Programma 4', 'Programma 2', 'Programma 7'], a: 2 },
      { q: 'Hoe betaalt u voor een wasbeurt?', o: ['Met muntgeld in de machine', 'Bij de huismeester', 'Via een app', 'Met de woonpas bij de lezer'], a: 3 },
      { q: 'Waarom moet u de was snel uit de machine halen?', o: ['Anders gaat de machine kapot', 'Andere bewoners wachten op een vrije machine', 'Anders betaalt u extra', 'De wasruimte sluit om 22.00 uur'], a: 1 },
      { q: 'Wat doet u bij een storing?', o: ['De huismeester bellen en een briefje op de machine zetten', 'De machine opnieuw starten', 'Zelf de machine repareren', 'Naar een andere wasruimte gaan'], a: 0 },
    ],
  },
  {
    id: 'a2rb24',
    type: 'instructie',
    title: 'Betalen bij de parkeerautomaat',
    text: `Parkeren in het centrum
Zo betaalt u bij de automaat

In het centrum betaalt u voor parkeren van maandag tot en met zaterdag, tussen 9.00 en 21.00 uur. Op zondag is parkeren gratis.

Zo werkt de automaat:
1. Toets het kenteken van uw auto in. Controleer de letters en cijfers goed op het scherm.
2. Kies hoelang u wilt parkeren. Een uur parkeren kost 2,80 euro. De eerste tien minuten zijn gratis: kies daarvoor de groene knop.
3. Betaal met uw pinpas of telefoon. De automaat neemt geen muntgeld aan.
4. Klaar! U krijgt geen papieren kaartje. De controle gaat via uw kenteken, dus u hoeft niets achter uw voorruit te leggen.

Is de automaat kapot? Gebruik dan de automaat aan de andere kant van de straat, of betaal met een parkeerapp. Een kapotte automaat is geen reden om niet te betalen. Zonder betaling riskeert u een naheffing van 76,70 euro.`,
    qs: [
      { q: 'Wanneer is parkeren in het centrum gratis?', o: ['Op zaterdag', 'Na 18.00 uur', 'Op zondag', 'In de ochtend'], a: 2 },
      { q: 'Wat toetst u eerst in bij de automaat?', o: ['De parkeertijd', 'Het kenteken van uw auto', 'Uw pincode', 'Uw telefoonnummer'], a: 1 },
      { q: 'Hoe kunt u betalen bij de automaat?', o: ['Met pinpas of telefoon', 'Alleen met muntgeld', 'Met een papieren kaartje', 'Alleen met de parkeerapp'], a: 0 },
      { q: 'Wat legt u achter uw voorruit?', o: ['Het betaalbewijs', 'Een papieren kaartje', 'Uw kenteken op een briefje', 'Niets'], a: 3 },
      { q: 'Wat doet u als de automaat kapot is?', o: ['Gratis parkeren', 'Een andere automaat of een parkeerapp gebruiken', 'Een briefje achter de voorruit leggen', 'De gemeente bellen'], a: 1 },
      { q: 'Hoe hoog is de naheffing als u niet betaalt?', o: ['76,70 euro', '2,80 euro', '67,70 euro', '76,20 euro'], a: 0 },
    ],
  },
  {
    id: 'a2rb25',
    type: 'instructie',
    title: 'Ziek melden: zo doet u dat',
    text: `Schoonmaakbedrijf Glans en Co
Instructie voor alle medewerkers: ziek melden

Bent u ziek en kunt u niet werken? Volg dan deze stappen.

1. Bel vóór 7.00 uur naar uw teamleider. Bel zelf, laat het niet door iemand anders doen. Een appje of e-mail is niet genoeg: u moet echt bellen.
2. Vertel op welke locatie u die dag zou werken. De teamleider zoekt dan een vervanger.
3. Geef door op welk telefoonnummer u bereikbaar bent. De arbodienst kan u bellen tussen 9.00 en 17.00 uur. Neem altijd op.
4. Bent u langer dan drie dagen ziek? Dan maakt de arbodienst een afspraak met u bij de bedrijfsarts.

Bent u weer beter? Meld u dan de avond van tevoren beter bij uw teamleider, uiterlijk om 20.00 uur. Dan staat u de volgende dag weer op de planning.

Werkt u die dag pas vanaf 13.00 uur? Ook dan geldt: ziek melden vóór 7.00 uur.`,
    qs: [
      { q: 'Hoe moet u zich ziek melden?', o: ['Met een appje aan de teamleider', 'Via een e-mail aan kantoor', 'Zelf bellen met de teamleider', 'Door een collega laten bellen'], a: 2 },
      { q: 'Voor hoe laat moet u zich ziek melden?', o: ['Vóór 7.00 uur', 'Vóór 9.00 uur', 'Vóór 13.00 uur', 'Vóór 20.00 uur'], a: 0 },
      { q: 'Waarom moet u doorgeven waar u die dag zou werken?', o: ['Voor de bedrijfsarts', 'Zodat de teamleider een vervanger kan zoeken', 'Voor uw loonstrook', 'Zodat de arbodienst langs kan komen'], a: 1 },
      { q: 'Wat gebeurt er als u langer dan drie dagen ziek bent?', o: ['U krijgt geen loon meer', 'U moet een brief schrijven', 'Uw teamleider komt langs', 'De arbodienst maakt een afspraak bij de bedrijfsarts'], a: 3 },
      { q: 'Wanneer meldt u zich beter?', o: ['De avond van tevoren, uiterlijk om 20.00 uur', 'Op de ochtend zelf vóór 7.00 uur', 'Bij de bedrijfsarts', 'Binnen drie dagen'], a: 0 },
    ],
  },
  {
    id: 'a2rb26',
    type: 'instructie',
    title: 'Afval scheiden in uw wijk',
    text: `Afvalwijzer voor de wijk Bloemenbuurt

Goed afval scheiden is belangrijk. Zo werkt het in uw wijk.

Groente-, fruit- en tuinafval (gft): doe dit in de groene container bij uw huis. Deze wordt elke maandag geleegd. Zet de container vóór 7.30 uur aan de weg, met het handvat naar de straat.

Papier en karton: doe dit in de blauwe container. Deze wordt één keer per vier weken geleegd. Kijk voor de data op de afvalkalender. Geen pizzadozen met vet erin: die horen bij het restafval.

Glas: breng flessen en potten naar de glasbak op de hoek van de Rozenstraat. Deksels mogen erop blijven.

Restafval: breng dit in een gesloten zak naar de ondergrondse container. U opent de container met uw afvalpas.

Grof afval, zoals een oude bank of kast: maak een afspraak via 14 038. Het ophalen is gratis, maximaal vier keer per jaar. Zet grof afval nooit zomaar op straat: daar staat een boete op.`,
    qs: [
      { q: 'Wanneer wordt de groene container geleegd?', o: ['Elke maandag', 'Eén keer per vier weken', 'Elke woensdag', 'Elke dag'], a: 0 },
      { q: 'Waar horen vette pizzadozen bij?', o: ['Bij papier en karton', 'Bij het gft-afval', 'Bij het restafval', 'Bij het grof afval'], a: 2 },
      { q: 'Wat heeft u nodig om de ondergrondse container te openen?', o: ['Een sleutel van de gemeente', 'Uw afvalpas', 'Een muntje', 'Niets, de container is open'], a: 1 },
      { q: 'Wat moet u doen met een oude kast?', o: ['Naar de glasbak brengen', 'In de blauwe container doen', 'Op straat zetten op maandag', 'Een afspraak maken via 14 038'], a: 3 },
      { q: 'Hoe vaak per jaar wordt grof afval gratis opgehaald?', o: ['Maximaal vier keer', 'Eén keer', 'Elke maand', 'Onbeperkt'], a: 0 },
    ],
  },
  {
    id: 'a2rb27',
    type: 'verhaaltje',
    title: 'Mijn eerste werkdag',
    text: `Vorige maand had ik mijn eerste werkdag bij een bakkerij in het centrum. Ik was heel zenuwachtig. De avond ervoor heb ik slecht geslapen en ik stond al om vijf uur op, twee uur te vroeg.

Mijn collega Ellen wachtte bij de deur op mij. Zij liet mij eerst de winkel zien: de oven, het magazijn en de kleine keuken waar we koffie drinken. Daarna mocht ik meteen broodjes inpakken. Dat klinkt makkelijk, maar ik deed het eerst veel te langzaam. Ellen zei: rustig maar, snelheid komt vanzelf.

Om twaalf uur kwam er een grote groep klanten tegelijk binnen. Ik moest voor het eerst zelf afrekenen. Mijn handen trilden een beetje, maar het ging goed. Eén klant zei zelfs dat ik vriendelijk was. Daar was ik trots op.

Aan het einde van de dag was ik moe, maar blij. Ik heb die avond mijn moeder gebeld en alles verteld. Zij zei: zie je wel, je kunt het gewoon.`,
    qs: [
      { q: 'Waar werkt de schrijver van dit verhaal?', o: ['In een supermarkt', 'In een bakkerij', 'In een restaurant', 'In een kledingwinkel'], a: 1 },
      { q: 'Waarom stond de schrijver om vijf uur op?', o: ['De winkel opende om vijf uur', 'Ellen had dat gevraagd', 'De schrijver was zenuwachtig', 'De bus ging heel vroeg'], a: 2 },
      { q: 'Wat was de eerste taak van de schrijver?', o: ['Koffie zetten', 'Afrekenen bij de kassa', 'De oven schoonmaken', 'Broodjes inpakken'], a: 3 },
      { q: 'Wat gebeurde er om twaalf uur?', o: ['Er kwam een grote groep klanten binnen', 'De winkel ging dicht', 'Ellen ging naar huis', 'De schrijver kreeg pauze'], a: 0 },
      { q: 'Waar was de schrijver trots op?', o: ['Op het snelle inpakken', 'Op het compliment van een klant', 'Op het telefoontje met moeder', 'Op het vroege opstaan'], a: 1 },
      { q: 'Hoe voelde de schrijver zich aan het einde van de dag?', o: ['Boos en teleurgesteld', 'Zenuwachtig en bang', 'Moe, maar blij', 'Ziek en moe'], a: 2 },
    ],
  },
  {
    id: 'a2rb28',
    type: 'verhaaltje',
    title: 'Onze verhuizing',
    text: `In maart zijn wij verhuisd van een flat op de vierde verdieping naar een rijtjeshuis met een kleine tuin. We wilden al lang meer ruimte, want onze twee kinderen deelden één slaapkamer.

De verhuizing zelf was zwaar. We hadden geen verhuisbedrijf, want dat vonden we te duur. Gelukkig hielpen mijn broer en twee vrienden. Mijn broer regelde een busje via zijn werk. We zijn om acht uur begonnen en pas om negen uur in de avond klaar.

Eén ding ging mis: de wasmachine paste niet door de deur van de nieuwe badkamer. Die staat nu voorlopig in de schuur. Verder ging alles goed, er is niets kapotgegaan.

De kinderen zijn het meest blij met de tuin. Ze spelen er elke dag, ook als het regent. Zelf moet ik nog wennen aan de nieuwe buurt. De buren hebben zich al voorgesteld en dat vond ik heel aardig. Volgende maand geven we een klein feestje voor de familie in ons nieuwe huis.`,
    qs: [
      { q: 'Waarom wilde de familie verhuizen?', o: ['De flat was te duur', 'Ze wilden meer ruimte', 'Ze kregen ruzie met de buren', 'De flat werd gesloopt'], a: 1 },
      { q: 'Waarom was er geen verhuisbedrijf?', o: ['Dat vonden ze te duur', 'De broer werkte bij een verhuisbedrijf', 'Er was geen bedrijf beschikbaar', 'Ze hadden weinig spullen'], a: 0 },
      { q: 'Wat ging er mis bij de verhuizing?', o: ['Het busje ging kapot', 'Er brak een kast', 'De wasmachine paste niet door de deur', 'De vrienden kwamen niet'], a: 2 },
      { q: 'Waar staat de wasmachine nu?', o: ['In de badkamer', 'In de keuken', 'Bij de broer', 'In de schuur'], a: 3 },
      { q: 'Waar zijn de kinderen het meest blij mee?', o: ['Met de tuin', 'Met hun eigen slaapkamer', 'Met de nieuwe school', 'Met het feestje'], a: 0 },
    ],
  },
  {
    id: 'a2rb29',
    type: 'verhaaltje',
    title: 'Het feest van de buren',
    text: `Vorige week zaterdag gaven onze buren een feest in hun tuin. Ze wonen al twintig jaar in de straat en dat wilden ze vieren. Alle buren waren uitgenodigd met een kaartje in de brievenbus.

Ik twijfelde eerst of ik zou gaan. Ik woon hier pas acht maanden en ik kende bijna niemand. Mijn dochter zei: ga nou gewoon, je hoeft niet lang te blijven. Dus ik ging, met een bos bloemen voor de buren.

Het was heel gezellig. Iedereen had eten meegenomen uit zijn eigen keuken. Ik had dolma gemaakt en die was snel op. Een oudere man, meneer De Wit, vroeg zelfs om het recept. We hebben lang gepraat over koken en over de straat.

Ik ben uiteindelijk tot middernacht gebleven. Nu groet ik elke dag mensen die ik eerst niet kende. Volgende maand drink ik koffie bij mevrouw Smit van nummer 12. Ik ben blij dat ik gegaan ben.`,
    qs: [
      { q: 'Waarom gaven de buren een feest?', o: ['Ze gingen verhuizen', 'Ze woonden twintig jaar in de straat', 'Ze waren jarig', 'Ze hadden een nieuwe tuin'], a: 1 },
      { q: 'Waarom twijfelde de schrijver om te gaan?', o: ['De schrijver kende bijna niemand', 'De schrijver moest werken', 'Er was geen uitnodiging', 'De dochter wilde niet mee'], a: 0 },
      { q: 'Wat nam de schrijver mee naar het feest?', o: ['Een taart', 'Een fles wijn', 'Een bos bloemen', 'Een kaartje'], a: 2 },
      { q: 'Wat vroeg meneer De Wit?', o: ['Of de schrijver koffie kwam drinken', 'Waar de schrijver woonde', 'Of de schrijver vaker wilde koken', 'Het recept van de dolma'], a: 3 },
      { q: 'Wat is er veranderd na het feest?', o: ['De schrijver groet nu mensen in de straat', 'De schrijver geeft zelf een feest', 'De buren komen elke week eten', 'De schrijver is verhuisd naar nummer 12'], a: 0 },
    ],
  },
  {
    id: 'a2rb30',
    type: 'verhaaltje',
    title: 'Een dagje strand',
    text: `Vorige zomer zijn we met het hele gezin een dag naar het strand geweest. We gingen met de trein, want parkeren aan zee is duur en de trein stopt dicht bij het strand.

We vertrokken al om half negen. Dat was een goed idee, want in de trein terug zagen we hoe druk het later werd. Op het strand zochten we een plek dicht bij de zee. Mijn man had een parasol gehuurd voor negen euro, want onze jongste dochter kan niet goed tegen de zon.

De kinderen hebben uren in het water gespeeld. Ik heb vooral gelezen en een beetje geslapen. Rond één uur aten we onze eigen boterhammen. Alleen het ijs kochten we bij een strandtent. Vier ijsjes voor tien euro, dat viel me mee.

Aan het einde van de middag stak er wind op. Het zand waaide overal in, ook in onze tassen. We besloten om vijf uur naar huis te gaan. Thuis vonden we nog dagen zand in de schoenen. Toch willen de kinderen deze zomer weer.`,
    qs: [
      { q: 'Waarom ging het gezin met de trein?', o: ['Ze hebben geen auto', 'Parkeren aan zee is duur', 'De kinderen vinden de trein leuk', 'De auto was kapot'], a: 1 },
      { q: 'Waarom huurde de man een parasol?', o: ['De jongste dochter kan niet goed tegen de zon', 'Het ging regenen', 'Er was geen plek in de schaduw', 'De parasol was gratis'], a: 0 },
      { q: 'Hoeveel kostte de parasol?', o: ['Tien euro', 'Vier euro', 'Negen euro', 'Vijf euro'], a: 2 },
      { q: 'Wat kocht het gezin bij de strandtent?', o: ['Boterhammen', 'Drinken', 'Een parasol', 'Ijsjes'], a: 3 },
      { q: 'Waarom gingen ze om vijf uur naar huis?', o: ['De trein ging niet later', 'Er stak wind op en het zand waaide overal in', 'De kinderen waren moe', 'Het begon te regenen'], a: 1 },
      { q: 'Wat is waar aan het einde van het verhaal?', o: ['De kinderen willen nooit meer naar het strand', 'Het gezin gaat volgende keer met de auto', 'De kinderen willen deze zomer weer naar het strand', 'De schoenen zijn weggegooid'], a: 2 },
    ],
  },
];
