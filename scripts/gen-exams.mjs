// Exam generator: builds src/data/exams/<level>/<module>.json for A2, B1 and B2.
// A2 questions are generated from templates + the vocabulary; B1/B2 come from the
// authored banks in scripts/banks/. Deterministic (seeded) so regeneration is stable.
// Run: npm run gen
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { VOCAB } from '../src/data/vocab.js';
import { KNM } from '../src/data/knm.js';
import { LEZEN_A } from './banks/a2-rl-a.mjs';
import { LEZEN_B } from './banks/a2-rl-b.mjs';
import { LUISTEREN as A2_LUISTEREN } from './banks/a2-luister.mjs';
import * as B1RL from './banks/b1-rl.mjs';
import * as B1WS from './banks/b1-ws.mjs';
import * as B2RL from './banks/b2-rl.mjs';
import * as B2WS from './banks/b2-ws.mjs';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'exams');
const QUESTIONS = 25;

// ---------- seeded rng ----------
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (rnd, arr) => arr[Math.floor(rnd() * arr.length)];
function pickN(rnd, arr, n, exclude = []) {
  const pool = arr.filter((x) => !exclude.includes(x));
  const out = [];
  while (out.length < n && pool.length) {
    out.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]);
  }
  return out;
}
function shuffleS(rnd, arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// build final question: shuffle options, record answer index
function fin(rnd, base, correct, wrongs) {
  const o = shuffleS(rnd, [correct, ...wrongs.slice(0, 3)]);
  return { ...base, o, a: o.indexOf(correct) };
}

// ---------- parameter pools ----------
const NAMES = ['Jan', 'Fatma', 'Peter', 'Ali', 'Sanne', 'Ayşe', 'Tom', 'Lisa', 'Ahmed', 'Emma', 'Mehmet', 'Julia', 'Kees', 'Zeynep', 'Bram', 'Sara', 'Hasan', 'Anna', 'Mark', 'Elif'];
const DAYS = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
const TIMES = ['8.00', '8.30', '9.00', '9.30', '10.00', '10.30', '11.00', '13.00', '13.30', '14.00', '15.30', '16.00', '17.00', '18.30', '19.00', '20.00'];
const CITIES = ['Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven', 'Groningen', 'Tilburg', 'Almere', 'Breda', 'Nijmegen'];
const SHOPS = ['De supermarkt', 'De bakkerij', 'De slagerij', 'De apotheek', 'De bibliotheek', 'De kledingwinkel', 'De kapsalon'];
const PLACES = ['de tandarts', 'de huisarts', 'het ziekenhuis', 'de gemeente', 'de fysiotherapeut'];
const DOCS = ['identiteitskaart', 'verzekeringspas', 'paspoort', 'afsprakenkaart'];
const JOBS = ['schoonmaker', 'verkoper', 'chauffeur', 'kok', 'kapper', 'magazijnmedewerker'];
const PHONES = ['020-1234567', '010-7654321', '030-2223344', '040-5556677', '06-12345678', '06-98765432'];
const MEDS = ['Paracetamol', 'Hoestdrank', 'Neusspray', 'Ibuprofen'];
const PRODUCTS = ['koffie', 'kaas', 'wasmiddel', 'olijfolie', 'appels', 'kip'];
const WEER = ['regenen', 'sneeuwen', 'waaien', 'de hele dag zonnig blijven'];
const NUMS = ['2', '3', '4', '5', '6', '7', '8', '10', '12', '15', '20', '25', '30'];
const PRICES = ['3', '4', '5', '6', '8', '9', '10', '12', '15', '18', '20', '25'];

// ---------- LEZEN ----------
const LEZEN_TEMPLATES = [
  (rnd) => {
    const shop = pick(rnd, SHOPS);
    const days = pickN(rnd, DAYS, 3).sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b));
    const d1 = days[0], d3 = days[1], d2 = days[2]; // closed day between open range endpoints
    const [t1, t2] = pickN(rnd, TIMES, 2).sort((a, b) => parseFloat(a) - parseFloat(b));
    const p = `${shop} is open van ${d1} tot en met ${d2}, van ${t1} tot ${t2} uur. Op ${d3} zijn wij gesloten.`;
    return [
      fin(rnd, { p, q: 'Op welke dag is de winkel gesloten?' }, d3, pickN(rnd, DAYS, 3, [d3])),
      fin(rnd, { p, q: 'Hoe laat gaat de winkel open?' }, `om ${t1} uur`, pickN(rnd, TIMES, 3, [t1]).map((t) => `om ${t} uur`)),
    ];
  },
  (rnd) => {
    const name = pick(rnd, NAMES);
    const place = pick(rnd, PLACES);
    const day = pick(rnd, DAYS);
    const time = pick(rnd, TIMES);
    const doc = pick(rnd, DOCS);
    const phone = pick(rnd, PHONES);
    const p = `Beste ${name},\nU heeft een afspraak bij ${place} op ${day} om ${time} uur. Neemt u alstublieft uw ${doc} mee. Kunt u niet komen? Bel dan ${phone}.`;
    return [
      fin(rnd, { p, q: 'Wanneer is de afspraak?' }, `op ${day} om ${time} uur`, pickN(rnd, DAYS, 3, [day]).map((d, i) => `op ${d} om ${pick(rnd, TIMES)} uur`)),
      fin(rnd, { p, q: 'Wat moet je meenemen?' }, `je ${doc}`, pickN(rnd, DOCS, 3, [doc]).map((d) => `je ${d}`)),
      fin(rnd, { p, q: 'Wat doe je als je niet kunt komen?' }, `bellen naar ${phone}`, ['een brief schrijven', 'gewoon niet gaan', 'langsgaan zonder afspraak']),
    ];
  },
  (rnd) => {
    const day = pick(rnd, DAYS);
    const day2 = pick(rnd, DAYS.filter((d) => d !== day));
    const time = pick(rnd, TIMES);
    const p = `Beste ouders,\nOp ${day} is de school dicht. Alle kinderen zijn dan vrij. Op ${day2} begint de school weer om ${time} uur.\nMet vriendelijke groet, de directeur`;
    return [
      fin(rnd, { p, q: 'Wanneer is de school dicht?' }, `op ${day}`, pickN(rnd, DAYS, 3, [day]).map((d) => `op ${d}`)),
      fin(rnd, { p, q: 'Hoe laat begint de school weer?' }, `om ${time} uur`, pickN(rnd, TIMES, 3, [time]).map((t) => `om ${t} uur`)),
    ];
  },
  (rnd) => {
    const job = pick(rnd, JOBS);
    const n = pick(rnd, ['16', '20', '24', '32', '36']);
    const amount = pick(rnd, ['13', '14', '15', '16', '17']);
    const name = pick(rnd, NAMES);
    const phone = pick(rnd, PHONES);
    const p = `Vacature: ${job} gezocht voor ${n} uur per week. Salaris: ${amount} euro per uur. Interesse? Bel ${name}: ${phone}.`;
    return [
      fin(rnd, { p, q: 'Voor hoeveel uur per week is de vacature?' }, `${n} uur`, pickN(rnd, ['16', '20', '24', '32', '36', '40'], 3, [n]).map((x) => `${x} uur`)),
      fin(rnd, { p, q: 'Hoeveel verdien je per uur?' }, `${amount} euro`, pickN(rnd, PRICES, 3, [amount]).map((x) => `${x} euro`)),
      fin(rnd, { p, q: 'Wat moet je doen als je interesse hebt?' }, `bellen naar ${name}`, ['een e-mail sturen naar de gemeente', 'langsgaan bij het gemeentehuis', 'een brief schrijven aan DUO']),
    ];
  },
  (rnd) => {
    const city = pick(rnd, CITIES);
    const n = pick(rnd, ['2', '3', '4']);
    const amount = pick(rnd, ['750', '850', '950', '1100', '1250']);
    const p = `Te huur: appartement in ${city}. ${n} kamers, met balkon. Huur: ${amount} euro per maand, inclusief water. Reageren kan via wonen@voorbeeld.nl.`;
    return [
      fin(rnd, { p, q: 'In welke stad is het appartement?' }, city, pickN(rnd, CITIES, 3, [city])),
      fin(rnd, { p, q: 'Hoeveel is de huur per maand?' }, `${amount} euro`, pickN(rnd, ['750', '850', '950', '1100', '1250', '1400'], 3, [amount]).map((x) => `${x} euro`)),
      fin(rnd, { p, q: 'Hoe kun je reageren?' }, 'via e-mail', ['via de telefoon', 'bij het loket', 'met een brief']),
    ];
  },
  (rnd) => {
    const city = pick(rnd, CITIES);
    const time = pick(rnd, TIMES);
    const n = pick(rnd, ['1', '2', '3', '4', '5', '7', '9']);
    const m = pick(rnd, ['5', '10', '15', '20', '30']);
    const p = `Reisinformatie: de trein naar ${city} van ${time} uur vertrekt vandaag van spoor ${n}. De trein heeft ongeveer ${m} minuten vertraging.`;
    return [
      fin(rnd, { p, q: 'Van welk spoor vertrekt de trein?' }, `spoor ${n}`, pickN(rnd, ['1', '2', '3', '4', '5', '7', '9', '11'], 3, [n]).map((x) => `spoor ${x}`)),
      fin(rnd, { p, q: 'Hoeveel vertraging heeft de trein?' }, `${m} minuten`, pickN(rnd, ['5', '10', '15', '20', '30', '45'], 3, [m]).map((x) => `${x} minuten`)),
      fin(rnd, { p, q: 'Waar gaat de trein naartoe?' }, city, pickN(rnd, CITIES, 3, [city])),
    ];
  },
  (rnd) => {
    const name = pick(rnd, NAMES);
    const name2 = pick(rnd, NAMES.filter((x) => x !== name));
    const time = pick(rnd, ['15.00', '16.00', '19.00', '20.00']);
    const p = `Hoi ${name}! Zaterdag ben ik jarig en dat wil ik vieren. Het feest begint om ${time} uur bij mij thuis. Kom je ook? Groetjes, ${name2}`;
    return [
      fin(rnd, { p, q: 'Waarom geeft ' + name2 + ' een feest?' }, `${name2} is jarig`, ['het is Koningsdag', `${name2} gaat verhuizen`, `${name2} heeft een nieuwe baan`]),
      fin(rnd, { p, q: 'Hoe laat begint het feest?' }, `om ${time} uur`, pickN(rnd, TIMES, 3, [time]).map((t) => `om ${t} uur`)),
      fin(rnd, { p, q: 'Waar is het feest?' }, `bij ${name2} thuis`, ['in een restaurant', 'op school', 'in het park']),
    ];
  },
  (rnd) => {
    const med = pick(rnd, MEDS);
    const n = pick(rnd, ['1', '2', '3']);
    const m = pick(rnd, ['1', '2']);
    const moment = pick(rnd, ['voor', 'na', 'bij']);
    const max = pick(rnd, ['4', '6', '8']);
    const p = `${med}: ${n} keer per dag ${m} tablet(ten) innemen, ${moment} het eten. Neem niet meer dan ${max} tabletten per dag.`;
    return [
      fin(rnd, { p, q: 'Hoe vaak per dag neem je dit medicijn?' }, `${n} keer per dag`, pickN(rnd, ['1', '2', '3', '4'], 3, [n]).map((x) => `${x} keer per dag`)),
      fin(rnd, { p, q: 'Wanneer neem je de tabletten in?' }, `${moment} het eten`, ['alleen in de nacht', "alleen 's ochtends vroeg", 'om de twee dagen']),
      fin(rnd, { p, q: 'Wat is het maximum per dag?' }, `${max} tabletten`, pickN(rnd, ['4', '6', '8', '10'], 3, [max]).map((x) => `${x} tabletten`)),
    ];
  },
  (rnd) => {
    const shop = pick(rnd, SHOPS);
    const product = pick(rnd, PRODUCTS);
    const p1 = pick(rnd, ['8', '10', '12', '15']);
    const p2 = String(Number(p1) - pick(rnd, [2, 3, 4]));
    const day = pick(rnd, DAYS);
    const p = `Aanbieding! Alleen deze week bij ${shop.toLowerCase()}: ${product} van ${p1} euro voor ${p2} euro. Op ${day} zijn wij gesloten.`;
    return [
      fin(rnd, { p, q: `Wat kost de ${product} deze week?` }, `${p2} euro`, [`${p1} euro`, ...pickN(rnd, PRICES, 2, [p1, p2]).map((x) => `${x} euro`)]),
      fin(rnd, { p, q: 'Hoe lang geldt de aanbieding?' }, 'alleen deze week', ['de hele maand', 'het hele jaar', 'alleen vandaag']),
    ];
  },
  (rnd) => {
    const day = pick(rnd, DAYS);
    const day2 = pick(rnd, DAYS.filter((d) => d !== day));
    const time = pick(rnd, ['7.00', '7.30', '8.00']);
    const p = `Beste bewoner,\nVanaf volgende week halen wij het afval op ${day} op, niet meer op ${day2}. Zet uw container voor ${time} uur buiten.\nUw gemeente`;
    return [
      fin(rnd, { p, q: 'Op welke dag wordt het afval voortaan opgehaald?' }, day, pickN(rnd, DAYS, 3, [day])),
      fin(rnd, { p, q: 'Hoe laat moet de container buiten staan?' }, `voor ${time} uur`, pickN(rnd, ['7.00', '7.30', '8.00', '9.00'], 3, [time]).map((t) => `voor ${t} uur`)),
    ];
  },
];

// ---------- LUISTEREN ----------
const LUISTEREN_TEMPLATES = [
  (rnd) => {
    const city = pick(rnd, CITIES);
    const n = pick(rnd, ['1', '2', '3', '4', '5', '7']);
    const l = `Attentie reizigers. De trein naar ${city} vertrekt over enkele minuten van spoor ${n}. Vergeet niet in te checken.`;
    return [
      fin(rnd, { l, q: 'Naar welke stad gaat de trein?' }, city, pickN(rnd, CITIES, 3, [city])),
      fin(rnd, { l, q: 'Van welk spoor vertrekt de trein?' }, `spoor ${n}`, pickN(rnd, ['1', '2', '3', '4', '5', '7'], 3, [n]).map((x) => `spoor ${x}`)),
    ];
  },
  (rnd) => {
    const name = pick(rnd, NAMES);
    const place = pick(rnd, PLACES);
    const day = pick(rnd, DAYS);
    const phone = pick(rnd, PHONES);
    const l = `Goedemiddag, u spreekt met ${name} van ${place}. Uw afspraak van ${day} kan helaas niet doorgaan. Belt u ons terug op ${phone} voor een nieuwe afspraak? Dank u wel.`;
    return [
      fin(rnd, { l, q: 'Waarom wordt er gebeld?' }, 'de afspraak gaat niet door', ['de rekening is niet betaald', 'er is een pakketje bezorgd', 'de uitslag is goed']),
      fin(rnd, { l, q: 'Wat moet je doen?' }, 'terugbellen voor een nieuwe afspraak', ['een e-mail sturen', 'direct langskomen', 'niets doen']),
      fin(rnd, { l, q: 'Van welke afspraak gaat het bericht?' }, `de afspraak van ${day}`, pickN(rnd, DAYS, 3, [day]).map((d) => `de afspraak van ${d}`)),
    ];
  },
  (rnd) => {
    const time = pick(rnd, ['9.00', '9.30', '10.00']);
    const l = `Beste ouders, morgen begint de school om ${time} uur, omdat de leraren een vergadering hebben. De lessen eindigen op de normale tijd.`;
    return [
      fin(rnd, { l, q: 'Hoe laat begint de school morgen?' }, `om ${time} uur`, pickN(rnd, ['8.30', '9.00', '9.30', '10.00'], 3, [time]).map((t) => `om ${t} uur`)),
      fin(rnd, { l, q: 'Waarom begint de school later?' }, 'de leraren hebben een vergadering', ['het is slecht weer', 'de school is dicht', 'er is een feest']),
    ];
  },
  (rnd) => {
    const m = pick(rnd, ['10', '15', '30']);
    const l = `Beste klanten, de winkel sluit over ${m} minuten. U kunt uw boodschappen afrekenen bij de kassa. Tot ziens en een fijne avond.`;
    return [
      fin(rnd, { l, q: 'Wat gaat er gebeuren?' }, `de winkel sluit over ${m} minuten`, ['de winkel gaat net open', 'er is een aanbieding', 'de kassa is kapot']),
      fin(rnd, { l, q: 'Wat moet je nu doen?' }, 'afrekenen bij de kassa', ['de winkel binnenkomen', 'wachten bij de ingang', 'morgen terugkomen']),
    ];
  },
  (rnd) => {
    const n = pick(rnd, ['5', '12', '18', '22', '28']);
    const w = pick(rnd, WEER);
    const l = `En dan nu het weerbericht. Morgen wordt het ongeveer ${n} graden en gaat het ${w}. Neem dus je jas of paraplu mee als dat nodig is.`;
    return [
      fin(rnd, { l, q: 'Hoe warm wordt het morgen?' }, `${n} graden`, pickN(rnd, ['5', '12', '18', '22', '28'], 3, [n]).map((x) => `${x} graden`)),
      fin(rnd, { l, q: 'Wat voor weer wordt het morgen?' }, `het gaat ${w}`, pickN(rnd, WEER, 3, [w]).map((x) => `het gaat ${x}`)),
    ];
  },
  (rnd) => {
    const name = pick(rnd, NAMES);
    const day = pick(rnd, DAYS);
    const time = pick(rnd, TIMES);
    const l = `Goedemorgen, met de praktijk van dokter ${name}. U kunt ${day} om ${time} uur bij ons terecht. Neemt u alstublieft uw verzekeringspas mee.`;
    return [
      fin(rnd, { l, q: 'Wanneer is de afspraak?' }, `${day} om ${time} uur`, pickN(rnd, DAYS, 3, [day]).map((d) => `${d} om ${pick(rnd, TIMES)} uur`)),
      fin(rnd, { l, q: 'Wat moet je meenemen?' }, 'je verzekeringspas', ['je bankpas', 'je rijbewijs', 'je huursleutels']),
    ];
  },
  (rnd) => {
    const name = pick(rnd, NAMES);
    const t1 = pick(rnd, ['7.00', '8.00', '9.00']);
    const t2 = pick(rnd, ['10.00', '11.00', '12.00']);
    const l = `Hallo, met ${name}, je teamleider. Kun jij morgen om ${t1} uur beginnen in plaats van om ${t2} uur? Er is een collega ziek. Bel of app me even terug. Bedankt!`;
    return [
      fin(rnd, { l, q: 'Hoe laat moet je morgen beginnen?' }, `om ${t1} uur`, [`om ${t2} uur`, ...pickN(rnd, TIMES, 2, [t1, t2]).map((t) => `om ${t} uur`)]),
      fin(rnd, { l, q: 'Waarom moet je eerder beginnen?' }, 'een collega is ziek', ['de winkel is dicht', 'er is een feest', 'de bus rijdt niet']),
      fin(rnd, { l, q: 'Wat moet je doen na dit bericht?' }, 'terugbellen of een berichtje sturen', ['niets doen', 'een brief schrijven', 'naar de gemeente gaan']),
    ];
  },
  (rnd) => {
    const n = pick(rnd, ['12', '23', '40', '57']);
    const city = pick(rnd, CITIES);
    const l = `Beste reizigers, bus ${n} naar ${city} rijdt vandaag niet via het centrum vanwege een evenement. Reizigers voor het centrum kunnen uitstappen bij de halte Stationsplein.`;
    return [
      fin(rnd, { l, q: 'Welke bus rijdt anders dan normaal?' }, `bus ${n}`, pickN(rnd, ['12', '23', '40', '57', '8'], 3, [n]).map((x) => `bus ${x}`)),
      fin(rnd, { l, q: 'Waar kun je uitstappen voor het centrum?' }, 'bij de halte Stationsplein', ['bij het ziekenhuis', 'bij de laatste halte', 'bij school']),
    ];
  },
];

// ---------- SCHRIJVEN (open writing, scored on criteria like the real exam) ----------
const ZIN = [
  { s: 'Ik leer Nederlands, omdat …', model: 'Ik leer Nederlands, omdat ik in Nederland woon.' },
  { s: 'Morgen ga ik …', model: 'Morgen ga ik boodschappen doen.' },
  { s: 'Ik kan vandaag niet komen, want …', model: 'Ik kan vandaag niet komen, want ik ben ziek.' },
  { s: 'In het weekend …', model: 'In het weekend ga ik naar het park.' },
  { s: 'Als het regent, …', model: 'Als het regent, blijf ik thuis.' },
  { s: 'Mijn favoriete eten is …', model: 'Mijn favoriete eten is rijst met kip.' },
  { s: 'Volgend jaar wil ik …', model: 'Volgend jaar wil ik mijn examen halen.' },
  { s: 'Ik vind de Nederlandse taal …', model: 'Ik vind de Nederlandse taal moeilijk maar leuk.' },
  { s: 'Elke ochtend …', model: 'Elke ochtend drink ik koffie en eet ik brood.' },
  { s: 'Mijn buurman is aardig, want …', model: 'Mijn buurman is aardig, want hij helpt mij vaak.' },
  { s: 'Gisteren heb ik …', model: 'Gisteren heb ik voor mijn familie gekookt.' },
  { s: 'Mijn kinderen …', model: 'Mijn kinderen gaan naar de basisschool.' },
  { s: 'In Nederland is het vaak …', model: 'In Nederland is het vaak koud en nat.' },
  { s: 'Ik spaar geld voor …', model: 'Ik spaar geld voor een auto.' },
  { s: 'Op mijn werk moet ik …', model: 'Op mijn werk moet ik veel met klanten praten.' },
  { s: 'Ik ga naar de dokter, omdat …', model: 'Ik ga naar de dokter, omdat ik hoofdpijn heb.' },
];
const TOPICS = [
  { q: 'uw familie', model: 'Ik heb een vrouw en twee kinderen. Mijn kinderen gaan naar de basisschool. Wij wonen samen in Utrecht.' },
  { q: 'uw werk', model: 'Ik werk als kok in een restaurant. Ik werk vijf dagen per week. Ik vind mijn werk leuk.' },
  { q: 'uw huis', model: 'Ik woon in een flat met drie kamers. Mijn huis heeft een klein balkon. De buren zijn aardig.' },
  { q: 'uw hobby', model: 'Mijn hobby is koken. Ik kook elke dag voor mijn familie. In het weekend probeer ik nieuwe recepten.' },
  { q: 'het weer vandaag', model: 'Vandaag is het koud en het regent. Ik neem mijn paraplu mee. Morgen wordt het beter.' },
  { q: 'uw favoriete eten', model: 'Mijn favoriete eten is rijst met kip. Mijn moeder kookte het vroeger ook. Ik eet het elke week.' },
  { q: 'uw woonplaats', model: 'Ik woon in Rotterdam. Het is een grote stad met een mooie haven. Er zijn veel winkels en parken.' },
  { q: 'uw dag', model: 'Ik sta om zeven uur op. Daarna breng ik de kinderen naar school en ga ik naar mijn werk. Om zes uur eten wij samen.' },
];
const STREETS = ['Kerkstraat', 'Schoolstraat', 'Molenweg', 'Dorpsstraat', 'Beatrixlaan', 'Julianastraat'];
const BDATES = ['12-05-1990', '03-11-1985', '25-01-1995', '17-08-1988', '30-06-1992'];
const SURNAMES = ['Yılmaz', 'de Vries', 'Demir', 'Jansen', 'Kaya', 'Bakker'];
const MSGS = [
  {
    q: 'Schrijf een kort bericht aan uw werkgever. Schrijf: (1) dat u ziek bent, (2) dat u vandaag niet komt werken, (3) wanneer u denkt terug te komen.',
    pts: [
      { d: 'U schrijft dat u ziek bent', kw: [['ziek']] },
      { d: 'U schrijft dat u vandaag niet komt', kw: [['niet'], ['thuis']] },
      { d: 'U schrijft wanneer u terugkomt', kw: [['morgen'], ['maandag'], ['dinsdag'], ['woensdag'], ['donderdag'], ['vrijdag'], ['volgende'], ['beter']] },
    ],
    model: 'Beste meneer De Vries, ik ben ziek. Ik kan vandaag helaas niet komen werken. Ik denk dat ik morgen weer beter ben. Met vriendelijke groet, Ahmed',
  },
  {
    q: 'U gaat twee dagen weg. Schrijf een briefje aan uw buurvrouw. Schrijf: (1) dat u weggaat, (2) of zij de planten water wil geven, (3) bedank haar.',
    pts: [
      { d: 'U schrijft dat u weggaat', kw: [['weg'], ['vakantie'], ['dagen']] },
      { d: 'U vraagt om de planten water te geven', kw: [['plant'], ['water']] },
      { d: 'U bedankt haar', kw: [['dank'], ['bedankt']] },
    ],
    model: 'Beste buurvrouw, wij gaan twee dagen weg. Wilt u alstublieft de planten water geven? Alvast heel erg bedankt! Groetjes, Fatma',
  },
  {
    q: 'Schrijf een e-mail aan uw docent. Schrijf: (1) dat u morgen niet naar de les komt, (2) waarom u niet komt, (3) sluit netjes af met een groet.',
    pts: [
      { d: 'U schrijft dat u niet naar de les komt', kw: [['niet'], ['kom']] },
      { d: 'U schrijft waarom', kw: [['ziek'], ['afspraak'], ['werk'], ['dokter'], ['omdat'], ['want']] },
      { d: 'U sluit af met een groet', kw: [['groet'], ['groetjes']] },
    ],
    model: 'Beste docent, ik kom morgen niet naar de les, omdat ik een afspraak bij de dokter heb. Sorry! Met vriendelijke groet, Ali',
  },
  {
    q: 'Schrijf een bericht aan de huisarts. Schrijf: (1) dat u uw afspraak wilt afzeggen, (2) waarom, (3) dat u een nieuwe afspraak wilt maken.',
    pts: [
      { d: 'U zegt de afspraak af', kw: [['afspraak'], ['afzeggen']] },
      { d: 'U schrijft waarom', kw: [['ziek'], ['werk'], ['omdat'], ['want'], ['kan', 'niet']] },
      { d: 'U vraagt om een nieuwe afspraak', kw: [['nieuwe'], ['andere'], ['wanneer']] },
    ],
    model: 'Geachte heer/mevrouw, ik wil mijn afspraak van dinsdag afzeggen, want ik moet werken. Kan ik een nieuwe afspraak maken? Met vriendelijke groet, Zeynep Kaya',
  },
  {
    q: 'De verwarming in uw huis is kapot. Schrijf een bericht aan de verhuurder. Schrijf: (1) wat het probleem is, (2) dat u wilt dat het gerepareerd wordt, (3) wanneer u thuis bent.',
    pts: [
      { d: 'U schrijft het probleem', kw: [['verwarming'], ['kapot']] },
      { d: 'U vraagt om reparatie', kw: [['repareren'], ['maken'], ['monteur']] },
      { d: 'U schrijft wanneer u thuis bent', kw: [['thuis'], ['uur'], ['morgen'], ['vandaag']] },
    ],
    model: 'Geachte verhuurder, de verwarming in mijn huis is kapot. Kunt u die snel laten repareren? Ik ben morgen de hele dag thuis. Met vriendelijke groet, Hasan Demir',
  },
  {
    q: 'Nodig uw vriend(in) uit om te komen eten. Schrijf: (1) de uitnodiging, (2) wanneer (dag en tijd), (3) vraag of hij/zij komt.',
    pts: [
      { d: 'U nodigt uit om te eten', kw: [['eten'], ['kom']] },
      { d: 'U schrijft dag of tijd', kw: [['zaterdag'], ['zondag'], ['vrijdag'], ['uur']] },
      { d: 'U vraagt of hij/zij komt', kw: [['kom', 'je'], ['laat', 'weten'], ['kun', 'je']] },
    ],
    model: 'Hoi Sara! Kom je zaterdag bij ons eten? Wij eten om zes uur. Laat je even weten of je komt? Groetjes, Elif',
  },
  {
    q: 'Uw kind is ziek. Schrijf een bericht aan de school. Schrijf: (1) dat uw kind ziek is, (2) dat het vandaag niet komt, (3) sluit netjes af.',
    pts: [
      { d: 'U schrijft dat uw kind ziek is', kw: [['ziek']] },
      { d: 'U schrijft dat het niet komt', kw: [['niet'], ['thuis']] },
      { d: 'U sluit netjes af', kw: [['groet'], ['groetjes'], ['dank']] },
    ],
    model: 'Beste juf, mijn zoon Emre is ziek. Hij komt vandaag niet naar school. Met vriendelijke groet, mevrouw Yılmaz',
  },
  {
    q: 'Uw buurman heeft u geholpen met verhuizen. Schrijf een bedankbriefje. Schrijf: (1) waarvoor u bedankt, (2) dat u het erg aardig vond, (3) nodig hem uit voor koffie.',
    pts: [
      { d: 'U bedankt voor de hulp', kw: [['dank'], ['bedankt'], ['helpen'], ['hulp']] },
      { d: 'U schrijft dat u het aardig vond', kw: [['aardig'], ['lief'], ['fijn'], ['blij']] },
      { d: 'U nodigt uit voor koffie', kw: [['koffie'], ['thee'], ['langs']] },
    ],
    model: 'Beste buurman, heel erg bedankt voor uw hulp bij de verhuizing! Dat vond ik erg aardig van u. Komt u zaterdag een kopje koffie drinken? Groetjes, Mehmet',
  },
];
function makeSchrijven(rnd) {
  const qs = [];
  const zin = shuffleS(rnd, ZIN);
  const msgs = shuffleS(rnd, MSGS);
  const topics = shuffleS(rnd, TOPICS);
  let zi = 0, mi = 0, ti = 0;
  while (qs.length < QUESTIONS) {
    const kind = qs.length % 5;
    if (kind === 0 || kind === 2) {
      const z = zin[zi++ % zin.length];
      qs.push({ t: 'zin', q: 'Maak de zin af: ' + z.s, min: 2, model: z.model });
    } else if (kind === 1 || kind === 4) {
      const first = pick(rnd, NAMES);
      const last = pick(rnd, SURNAMES);
      const street = pick(rnd, STREETS);
      const nr = pick(rnd, NUMS);
      const city = pick(rnd, CITIES);
      const date = pick(rnd, BDATES);
      const phone = pick(rnd, PHONES);
      const fields = [
        ['voornaam', [first]],
        ['achternaam', [last]],
        ['straat', [street]],
        ['woonplaats', [city]],
        ['geboortedatum', [date]],
        ['telefoonnummer', [phone]],
      ];
      const [field, acc] = pick(rnd, fields);
      qs.push({
        t: 'form',
        q: `Lees: "Je heet ${first} ${last}. Je woont in de ${street} ${nr} in ${city}. Je bent geboren op ${date}. Je telefoonnummer is ${phone}."\nVul het formulier in bij: ${field}`,
        acc,
        model: acc[0],
      });
    } else if (qs.length % 10 === 3) {
      const tp = topics[ti++ % topics.length];
      qs.push({ t: 'open', q: `Schrijf drie zinnen over ${tp.q}.`, min: 12, model: tp.model });
    } else {
      const m = msgs[mi++ % msgs.length];
      qs.push({ t: 'msg', q: m.q, pts: m.pts, min: 15, model: m.model });
    }
  }
  return qs.slice(0, QUESTIONS);
}

// ---------- SPREKEN (speak into the microphone, like the real exam) ----------
const SP_QA = [
  { l: 'Hoe heet u?', kw: [['heet'], ['naam'], ['ben']], model: 'Ik heet Ahmed Yılmaz.' },
  { l: 'Waar woont u?', kw: [['woon']], model: 'Ik woon in Utrecht.' },
  { l: 'Hoe oud bent u?', kw: [['jaar']], model: 'Ik ben 35 jaar.' },
  { l: 'Wat is uw beroep?', kw: [['ben'], ['werk']], model: 'Ik werk als kok.' },
  { l: 'Heeft u kinderen?', kw: [['ja'], ['nee'], ['kind']], model: 'Ja, ik heb twee kinderen.' },
  { l: 'Waar komt u vandaan?', kw: [['uit']], model: 'Ik kom uit Turkije.' },
  { l: 'Hoe gaat u naar uw werk?', kw: [['fiets'], ['bus'], ['auto'], ['trein'], ['loop']], model: 'Ik ga met de bus naar mijn werk.' },
  { l: 'Wat eet u graag?', kw: [['eet'], ['graag'], ['lekker']], model: 'Ik eet graag rijst met kip.' },
  { l: 'Wat doet u in het weekend?', kw: [['ga'], ['doe'], ['bezoek'], ['speel'], ['wandel'], ['kook'], ['sport']], model: 'In het weekend wandel ik in het park.' },
  { l: 'Hoe laat staat u op?', kw: [['uur'], ['half'], ['sta']], model: 'Ik sta om zeven uur op.' },
  { l: 'Welke taal spreekt u thuis?', kw: [['spreek'], ['turks'], ['nederlands'], ['arabisch'], ['engels']], model: 'Thuis spreek ik Turks.' },
  { l: 'Wat is uw lievelingsseizoen?', kw: [['zomer'], ['winter'], ['lente'], ['herfst']], model: 'Mijn lievelingsseizoen is de zomer.' },
];
const SP_SIT = [
  { l: 'Uw collega is jarig. Wat zegt u?', kw: [['gefeliciteerd']], model: 'Gefeliciteerd met je verjaardag!' },
  { l: 'U bent te laat op uw werk. Wat zegt u?', kw: [['sorry'], ['laat'], ['excuses']], model: 'Sorry dat ik te laat ben.' },
  { l: 'Iemand niest naast u. Wat zegt u?', kw: [['gezondheid']], model: 'Gezondheid!' },
  { l: 'U begint te eten met collega’s. Wat zegt u?', kw: [['smakelijk']], model: 'Eet smakelijk!' },
  { l: 'Uw vriend doet morgen examen. Wat zegt u?', kw: [['succes']], model: 'Veel succes met je examen!' },
  { l: 'Uw collega is ziek. Wat zegt u aan de telefoon?', kw: [['beterschap'], ['beter']], model: 'Beterschap! Word snel beter.' },
  { l: 'U krijgt een cadeau. Wat zegt u?', kw: [['dank'], ['bedankt'], ['leuk']], model: 'Wat leuk! Dank je wel!' },
  { l: 'U wilt het raam openzetten. Wat vraagt u?', kw: [['mag'], ['raam']], model: 'Mag ik het raam openzetten?' },
  { l: 'U zoekt het station. Wat vraagt u?', kw: [['waar'], ['station']], model: 'Pardon, weet u waar het station is?' },
  { l: 'U neemt de telefoon op. Wat zegt u?', kw: [['met'], ['goedemorgen'], ['goedemiddag'], ['hallo']], model: 'Goedemiddag, met Ahmed.' },
  { l: 'De leraar praat te snel. Wat zegt u?', kw: [['langzamer'], ['langzaam'], ['herhalen']], model: 'Kunt u iets langzamer praten, alstublieft?' },
  { l: 'U gaat weg bij een afspraak. Wat zegt u?', kw: [['ziens'], ['bedankt'], ['dag']], model: 'Bedankt en tot ziens!' },
];
const SP_SCENE = [
  { sc: '👩 🚲 🌧️', kw: [['fiets'], ['regen'], ['vrouw']], model: 'Een vrouw fietst in de regen.' },
  { sc: '👨‍🍳 🍲', kw: [['kook'], ['eten'], ['man'], ['keuken']], model: 'Een man kookt eten in de keuken.' },
  { sc: '👧 📖', kw: [['lees'], ['boek'], ['meisje']], model: 'Een meisje leest een boek.' },
  { sc: '👴 🐕 🌳', kw: [['hond'], ['man'], ['wandel'], ['loop'], ['park']], model: 'Een oude man wandelt met zijn hond in het park.' },
  { sc: '👦 ⚽', kw: [['voetbal'], ['speel'], ['jongen'], ['bal']], model: 'Een jongen speelt voetbal.' },
  { sc: '👩‍⚕️ 💉 👶', kw: [['baby'], ['prik'], ['dokter'], ['zuster']], model: 'De baby krijgt een prik van de dokter.' },
  { sc: '🛒 🍎 🥖', kw: [['boodschappen'], ['winkel'], ['koop'], ['supermarkt']], model: 'Iemand doet boodschappen in de supermarkt.' },
  { sc: '☀️ 🏖️ 👨‍👩‍👧', kw: [['strand'], ['zon'], ['familie'], ['vakantie']], model: 'Een familie is op het strand. De zon schijnt.' },
  { sc: '🧹 🏠', kw: [['schoon'], ['huis'], ['poets']], model: 'Iemand maakt het huis schoon.' },
  { sc: '🚌 🕗 🏃', kw: [['bus'], ['rent'], ['haast'], ['laat']], model: 'Een man rent naar de bus, want hij is laat.' },
];
const SP_PREF = [
  { l: 'Wat drinkt u liever: thee of koffie? En waarom?', kw: [['thee'], ['koffie']], model: 'Ik drink liever thee, omdat ik dat lekkerder vind.' },
  { l: 'Wat vindt u leuker: de zomer of de winter? En waarom?', kw: [['zomer'], ['winter']], model: 'Ik vind de zomer leuker, omdat het dan warm is.' },
  { l: 'Wat gebruikt u liever: de fiets of de auto? En waarom?', kw: [['fiets'], ['auto']], model: 'Ik ga liever met de fiets, omdat het gezond is.' },
  { l: 'Waar woont u liever: in de stad of in een dorp? En waarom?', kw: [['stad'], ['dorp']], model: 'Ik woon liever in de stad, omdat alles dichtbij is.' },
  { l: 'Wat eet u liever: pizza of salade? En waarom?', kw: [['pizza'], ['salade']], model: 'Ik eet liever pizza, omdat ik dat heel lekker vind.' },
  { l: 'Wat doet u liever: een film kijken of een boek lezen? En waarom?', kw: [['film'], ['boek']], model: 'Ik kijk liever een film, omdat dat gezellig is.' },
  { l: 'Waar gaat u liever naartoe: het strand of het bos? En waarom?', kw: [['strand'], ['bos']], model: 'Ik ga liever naar het strand, omdat ik van de zee houd.' },
  { l: 'Wanneer sport u liever: in de ochtend of in de avond? En waarom?', kw: [['ochtend'], ['avond']], model: 'Ik sport liever in de ochtend, omdat ik dan energie heb.' },
];

function makeSpreken(rnd) {
  const nazeg = shuffleS(rnd, VOCAB.filter((w) => w.ex.split(' ').length >= 4)).slice(0, 8);
  const qa = shuffleS(rnd, SP_QA);
  const sit = shuffleS(rnd, SP_SIT);
  const scenes = shuffleS(rnd, SP_SCENE);
  const prefs = shuffleS(rnd, SP_PREF);
  const qs = [];
  let ai = 0, si = 0, ci = 0, pi = 0, ni = 0;
  while (qs.length < QUESTIONS) {
    const k = qs.length % 5;
    if (k === 0) {
      const x = qa[ai++ % qa.length];
      qs.push({ t: 'sp', l: x.l, q: 'Luister naar de vraag en geef antwoord.', kw: x.kw, model: x.model });
    } else if (k === 1) {
      const x = sit[si++ % sit.length];
      qs.push({ t: 'sp', l: x.l, q: 'Luister naar de situatie. Wat zegt u?', kw: x.kw, model: x.model });
    } else if (k === 2) {
      const w = nazeg[ni++ % nazeg.length];
      const words = w.ex.replace(/[.!?,]/g, '').split(' ').filter((x) => x.length > 3);
      const kw = [words.slice(-2)];
      qs.push({ t: 'sp', l: w.ex, q: 'Luister en zeg de zin na.', kw, model: w.ex });
    } else if (k === 3) {
      const x = scenes[ci++ % scenes.length];
      qs.push({ t: 'sp', sc: x.sc, q: 'Kijk naar de afbeelding. Wat ziet u? Vertel in één of twee zinnen.', kw: x.kw, model: x.model });
    } else {
      const x = prefs[pi++ % prefs.length];
      qs.push({ t: 'sp', l: x.l, q: 'Luister naar de vraag. Zeg wat u liever heeft en waarom.', kw: x.kw, model: x.model });
    }
  }
  return qs.slice(0, QUESTIONS);
}

function makeFromTemplates(rnd, templates) {
  const qs = [];
  let ti = 0;
  while (qs.length < QUESTIONS) {
    qs.push(...templates[ti % templates.length](rnd));
    ti++;
  }
  return qs.slice(0, QUESTIONS);
}

function makeKnm(rnd, examIdx) {
  const order = shuffleS(mulberry32(examIdx + 999), KNM);
  const qs = [];
  for (let i = 0; i < QUESTIONS; i++) {
    const base = order[(examIdx * 7 + i) % order.length];
    const correct = base.o[base.a];
    qs.push(fin(rnd, { q: base.q }, correct, base.o.filter((_, j) => j !== base.a)));
  }
  return qs;
}

// ---------- B1 / B2: build from the authored source banks ----------
// Passages and listening scripts are stored once per module file and referenced by
// index (pi = visible passage, li = spoken script) — keeps the JSON small.
function makePool() {
  const texts = [];
  const seen = new Map();
  return {
    texts,
    add(t) {
      if (seen.has(t)) return seen.get(t);
      seen.set(t, texts.length);
      texts.push(t);
      return texts.length - 1;
    },
  };
}

// A2 builders emit inline p/l; move those into the pool.
function poolInline(qs, pool) {
  return qs.map((q) => {
    if (q.t === 'sp') return q; // speaking prompts stay inline: short and unique
    const out = { ...q };
    if (out.p != null) { out.pi = pool.add(out.p); delete out.p; }
    if (out.l != null) { out.li = pool.add(out.l); delete out.l; }
    return out;
  });
}

function reshuffle(rnd, base, extra) {
  const wrongs = base.o.filter((_, j) => j !== base.a);
  return fin(rnd, { q: base.q, ...extra }, base.o[base.a], wrongs);
}

function makeBankRead(rnd, examIdx, bank, pool, field, count = QUESTIONS) {
  if (!bank?.length) throw new Error('empty source bank — did scripts/banks/*.mjs finish?');
  const qs = [];
  let ti = examIdx * 3;
  while (qs.length < count) {
    const t = bank[ti % bank.length];
    const body = t.title ? `${t.title}\n\n${t.text}` : t.text || t.script;
    const ref = field === 'pi' ? { pi: pool.add(body) } : { li: pool.add(body) };
    for (const bq of shuffleS(rnd, t.qs)) {
      if (qs.length >= count) break;
      qs.push(reshuffle(rnd, bq, ref));
    }
    ti++;
  }
  return qs;
}

// A2 users compared us with the official exams and found the generated texts short and
// samey. The fix is a hybrid: most of each exam comes from an authored bank written at
// official length and difficulty, topped up with a few template questions — short
// notices with a changing time or price are a genuine part of the real exam, so they
// keep a minority share rather than disappearing.
const A2_LEZEN = [...LEZEN_A, ...LEZEN_B];
function makeMixedRead(rnd, examIdx, bank, templates, pool, field, bankShare) {
  const fromBank = makeBankRead(rnd, examIdx, bank, pool, field, bankShare);
  const fromTemplates = makeFromTemplates(rnd, templates).slice(0, QUESTIONS - fromBank.length);
  return [...fromBank, ...fromTemplates];
}

function cycle(arr, examIdx, offset, count) {
  const out = [];
  for (let i = 0; i < count; i++) out.push({ ...arr[(examIdx * 3 + offset + i) % arr.length] });
  return out;
}

function makeBankSchrijven(_rnd, examIdx, bank) {
  const zin = bank.filter((x) => x.t === 'zin');
  const msg = bank.filter((x) => x.t === 'msg');
  const open = bank.filter((x) => x.t === 'open');
  return [
    ...cycle(zin, examIdx, 0, 15),
    ...cycle(msg, examIdx, 0, 8),
    ...cycle(open, examIdx, 0, 2),
  ].slice(0, QUESTIONS);
}

function makeBankSpreken(_rnd, examIdx, bank) {
  const short = bank.filter((x) => x.sec === 20);
  const med = bank.filter((x) => x.sec === 30);
  const long = bank.filter((x) => x.sec === 120);
  const nLong = long.length ? 2 : 0;
  const nShort = Math.ceil((QUESTIONS - nLong) / 2);
  const nMed = QUESTIONS - nLong - nShort;
  return [
    ...cycle(short, examIdx, 0, nShort),
    ...cycle(med, examIdx, 0, nMed),
    ...(nLong ? cycle(long, examIdx, 0, nLong) : []),
  ].slice(0, QUESTIONS);
}

// ---------- build ----------
const BUILDERS = {
  A2: {
    exams: 50,
    lezen: (rnd, e, pool) => makeMixedRead(rnd, e, A2_LEZEN, LEZEN_TEMPLATES, pool, 'pi', 18),
    luisteren: (rnd, e, pool) => makeMixedRead(rnd, e, A2_LUISTEREN, LUISTEREN_TEMPLATES, pool, 'li', 16),
    schrijven: makeSchrijven,
    spreken: makeSpreken,
    knm: (rnd, e) => makeKnm(rnd, e),
  },
  B1: {
    exams: 40,
    lezen: (rnd, e, pool) => makeBankRead(rnd, e, B1RL.LEZEN, pool, 'pi'),
    luisteren: (rnd, e, pool) => makeBankRead(rnd, e, B1RL.LUISTEREN, pool, 'li'),
    schrijven: (rnd, e) => makeBankSchrijven(rnd, e, B1WS.SCHRIJVEN),
    spreken: (rnd, e) => makeBankSpreken(rnd, e, B1WS.SPREKEN),
    knm: (rnd, e) => makeKnm(rnd, e + 500),
  },
  B2: {
    exams: 30,
    lezen: (rnd, e, pool) => makeBankRead(rnd, e, B2RL.LEZEN, pool, 'pi'),
    luisteren: (rnd, e, pool) => makeBankRead(rnd, e, B2RL.LUISTEREN, pool, 'li'),
    schrijven: (rnd, e) => makeBankSchrijven(rnd, e, B2WS.SCHRIJVEN),
    spreken: (rnd, e) => makeBankSpreken(rnd, e, B2WS.SPREKEN),
  },
};

// drop the old flat A2 files from before levels existed
for (const f of fs.existsSync(OUT) ? fs.readdirSync(OUT) : []) {
  if (f.endsWith('.json')) fs.rmSync(path.join(OUT, f));
}

let totalQ = 0;
for (const [level, cfg] of Object.entries(BUILDERS)) {
  const dir = path.join(OUT, level);
  fs.mkdirSync(dir, { recursive: true });
  const mods = Object.keys(cfg).filter((k) => k !== 'exams');
  for (const mod of mods) {
    const pool = makePool();
    const exams = [];
    for (let e = 0; e < cfg.exams; e++) {
      const rnd = mulberry32(e * 1000 + mod.length * 77 + level.charCodeAt(1) * 13 + 1);
      const qs = poolInline(cfg[mod](rnd, e, pool), pool);
      const open = mod === 'schrijven' || mod === 'spreken';
      for (const q of qs) {
        const bad = open
          ? !q.t || !q.model
          : !q.o || q.o.length < 3 || q.a < 0 || q.a >= q.o.length;
        if (bad) throw new Error(`Bad question in ${level}/${mod} exam ${e + 1}: ${JSON.stringify(q)}`);
      }
      exams.push(qs);
    }
    fs.writeFileSync(path.join(dir, mod + '.json'), JSON.stringify({ texts: pool.texts, exams }));
    totalQ += exams.length * exams[0].length;
    console.log(`${level}/${mod}: ${exams.length} exams x ${exams[0].length} questions` +
      (pool.texts.length ? ` (${pool.texts.length} texts)` : ''));
  }
}
console.log(`Done. ${totalQ} questions total.`);
