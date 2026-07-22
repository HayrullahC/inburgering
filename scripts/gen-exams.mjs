// Exam generator: builds src/data/exams/*.json (5 modules x 20 exams x 25 questions).
// Deterministic (seeded) so regeneration is stable. Run: npm run gen
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { VOCAB } from '../src/data/vocab.js';
import { KNM } from '../src/data/knm.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'exams');
const EXAMS = 20;
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

// ---------- SCHRIJVEN ----------
const VERBS = [
  { inf: 'werken', ik: 'werk', hij: 'werkt', imp: 'werkte', part: 'gewerkt', aux: 'heb' },
  { inf: 'maken', ik: 'maak', hij: 'maakt', imp: 'maakte', part: 'gemaakt', aux: 'heb' },
  { inf: 'wonen', ik: 'woon', hij: 'woont', imp: 'woonde', part: 'gewoond', aux: 'heb' },
  { inf: 'leren', ik: 'leer', hij: 'leert', imp: 'leerde', part: 'geleerd', aux: 'heb' },
  { inf: 'koken', ik: 'kook', hij: 'kookt', imp: 'kookte', part: 'gekookt', aux: 'heb' },
  { inf: 'fietsen', ik: 'fiets', hij: 'fietst', imp: 'fietste', part: 'gefietst', aux: 'heb' },
  { inf: 'betalen', ik: 'betaal', hij: 'betaalt', imp: 'betaalde', part: 'betaald', aux: 'heb' },
  { inf: 'kopen', ik: 'koop', hij: 'koopt', imp: 'kocht', part: 'gekocht', aux: 'heb' },
  { inf: 'gaan', ik: 'ga', hij: 'gaat', imp: 'ging', part: 'gegaan', aux: 'ben' },
  { inf: 'komen', ik: 'kom', hij: 'komt', imp: 'kwam', part: 'gekomen', aux: 'ben' },
  { inf: 'doen', ik: 'doe', hij: 'doet', imp: 'deed', part: 'gedaan', aux: 'heb' },
  { inf: 'zien', ik: 'zie', hij: 'ziet', imp: 'zag', part: 'gezien', aux: 'heb' },
  { inf: 'eten', ik: 'eet', hij: 'eet', imp: 'at', part: 'gegeten', aux: 'heb' },
  { inf: 'drinken', ik: 'drink', hij: 'drinkt', imp: 'dronk', part: 'gedronken', aux: 'heb' },
  { inf: 'lezen', ik: 'lees', hij: 'leest', imp: 'las', part: 'gelezen', aux: 'heb' },
  { inf: 'schrijven', ik: 'schrijf', hij: 'schrijft', imp: 'schreef', part: 'geschreven', aux: 'heb' },
  { inf: 'nemen', ik: 'neem', hij: 'neemt', imp: 'nam', part: 'genomen', aux: 'heb' },
  { inf: 'geven', ik: 'geef', hij: 'geeft', imp: 'gaf', part: 'gegeven', aux: 'heb' },
  { inf: 'spreken', ik: 'spreek', hij: 'spreekt', imp: 'sprak', part: 'gesproken', aux: 'heb' },
  { inf: 'slapen', ik: 'slaap', hij: 'slaapt', imp: 'sliep', part: 'geslapen', aux: 'heb' },
];
const PREPS = [
  { s: 'Ik woon ___ Amsterdam.', a: 'in', w: ['op', 'naar', 'bij'] },
  { s: 'Ik wacht ___ de bus.', a: 'op', w: ['in', 'aan', 'van'] },
  { s: 'Wij gaan morgen ___ de markt.', a: 'naar', w: ['op', 'in', 'bij'] },
  { s: 'Het boek ligt ___ de tafel.', a: 'op', w: ['in', 'naar', 'tussen'] },
  { s: 'Ik houd ___ Turkse thee.', a: 'van', w: ['op', 'aan', 'met'] },
  { s: 'Zij kijkt ___ de televisie.', a: 'naar', w: ['op', 'van', 'bij'] },
  { s: 'Hij werkt ___ een fabriek.', a: 'in', w: ['op', 'aan', 'naar'] },
  { s: 'De kat slaapt ___ de bank.', a: 'op', w: ['naar', 'van', 'tussen'] },
  { s: 'Ik ga ___ de fiets naar het werk.', a: 'met', w: ['op', 'in', 'naar'] },
  { s: 'De apotheek is ___ het ziekenhuis.', a: 'naast', w: ['tussen', 'onder', 'naar'] },
  { s: 'Wij eten ___ zes uur.', a: 'om', w: ['op', 'in', 'naar'] },
  { s: 'Zij denkt vaak ___ haar familie.', a: 'aan', w: ['op', 'in', 'naar'] },
  { s: 'De les begint ___ maandag.', a: 'op', w: ['om', 'in', 'naar'] },
  { s: 'Hij praat ___ het weer.', a: 'over', w: ['op', 'aan', 'naar'] },
];
const FORMAL = [
  { q: 'Hoe begin je een formele brief aan een onbekende persoon?', a: 'Geachte heer/mevrouw,', w: ['Hoi!', 'Hé jij,', 'Dag vriend,'] },
  { q: 'Hoe sluit je een formele brief af?', a: 'Met vriendelijke groet,', w: ['Doei!', 'Kusjes,', 'Later,'] },
  { q: 'Je schrijft een brief aan mevrouw Jansen. Hoe begin je?', a: 'Geachte mevrouw Jansen,', w: ['Hoi Jansen!', 'Hallo mevrouw!', 'Hé Jansen,'] },
  { q: 'Welke zin is geschikt voor een formele e-mail?', a: 'Ik wil graag een afspraak maken.', w: ['Ik wil nu een afspraak!', 'Geef me een afspraak.', 'Afspraak. Nu.'] },
  { q: 'Je meldt je kind ziek bij school. Welke zin is goed?', a: 'Mijn zoon is ziek en kan vandaag niet naar school komen.', w: ['Mijn zoon heeft geen zin vandaag.', 'School is saai vandaag.', 'Wij gaan winkelen vandaag.'] },
  { q: 'Je zegt een afspraak af. Welke zin is beleefd?', a: 'Helaas kan ik niet komen. Kunnen we een nieuwe afspraak maken?', w: ['Ik kom niet, punt.', 'Vergeet de afspraak maar.', 'Geen tijd!'] },
  { q: 'Wat schrijf je in de onderwerpregel van een e-mail over je huur?', a: 'Vraag over mijn huurcontract', w: ['hoi', 'lees dit nu', 'belangrijk!!!!'] },
  { q: 'Welke zin is correct Nederlands?', a: 'Ik heb gisteren een brief geschreven.', w: ['Ik heb gisteren een brief geschreven heb.', 'Ik geschreven heb een brief gisteren.', 'Gisteren ik een brief schrijven.'] },
];
const FIELDS = [
  { f: 'achternaam', a: 'Yılmaz', w: ['Amsterdam', '12-05-1990', '06-12345678'] },
  { f: 'voornaam', a: 'Ahmed', w: ['1234 AB', 'Utrecht', 'Kerkstraat 12'] },
  { f: 'geboortedatum', a: '12-05-1990', w: ['Rotterdam', 'Yılmaz', '06-12345678'] },
  { f: 'adres', a: 'Kerkstraat 12', w: ['12-05-1990', 'Ahmed', 'ahmed@mail.nl'] },
  { f: 'postcode', a: '1234 AB', w: ['06-12345678', 'Den Haag', '12-05-1990'] },
  { f: 'woonplaats', a: 'Utrecht', w: ['Kerkstraat 12', '1234 AB', 'Yılmaz'] },
  { f: 'telefoonnummer', a: '06-12345678', w: ['1234 AB', 'ahmed@mail.nl', 'Yılmaz'] },
  { f: 'e-mailadres', a: 'ahmed@mail.nl', w: ['06-12345678', 'Kerkstraat 12', '12-05-1990'] },
  { f: 'handtekening', a: 'je eigen handtekening', w: ['je pasfoto', 'je postcode', 'je banknummer'] },
];
const SENTENCES = [
  { ok: 'Morgen ga ik naar de dokter.', bad: ['Morgen ik ga naar de dokter.', 'Morgen naar de dokter ik ga.', 'Ik morgen ga naar de dokter.'] },
  { ok: 'Ik wil een nieuwe fiets kopen.', bad: ['Ik wil kopen een nieuwe fiets.', 'Ik een nieuwe fiets wil kopen.', 'Wil ik een nieuwe fiets kopen morgen.'] },
  { ok: 'Zij werkt elke dag in de winkel.', bad: ['Zij elke dag werkt in de winkel.', 'Elke dag zij werkt in de winkel.', 'Zij werkt in de winkel elke dag in.'] },
  { ok: 'Ik blijf thuis, omdat ik ziek ben.', bad: ['Ik blijf thuis, omdat ik ben ziek.', 'Ik blijf thuis, omdat ben ik ziek.', 'Ik thuis blijf, omdat ik ziek ben.'] },
  { ok: 'Kunt u dat nog een keer zeggen?', bad: ['U kunt dat nog een keer zeggen?', 'Kunt u dat zeggen nog een keer u?', 'U dat nog een keer zeggen kunt?'] },
  { ok: 'Wij hebben gisteren boodschappen gedaan.', bad: ['Wij hebben gedaan gisteren boodschappen.', 'Wij gisteren hebben boodschappen gedaan.', 'Gisteren wij hebben boodschappen gedaan.'] },
  { ok: 'De kinderen spelen buiten in de tuin.', bad: ['De kinderen buiten spelen in de tuin.', 'Buiten de kinderen spelen in de tuin.', 'De kinderen spelen in de tuin buiten spelen.'] },
  { ok: 'Als het regent, blijf ik thuis.', bad: ['Als het regent, ik blijf thuis.', 'Als regent het, blijf ik thuis.', 'Als het regent, thuis ik blijf.'] },
  { ok: 'Ik sta elke ochtend om zeven uur op.', bad: ['Ik opsta elke ochtend om zeven uur.', 'Ik sta op elke ochtend om zeven uur sta.', 'Elke ochtend ik sta om zeven uur op.'] },
  { ok: 'Hij heeft de rekening al betaald.', bad: ['Hij heeft al betaald de rekening.', 'Hij de rekening al heeft betaald.', 'Hij heeft de rekening al gebetaald.'] },
];

function makeSchrijven(rnd) {
  const nouns = VOCAB.filter((w) => /^(de|het) [a-zà-ü]+$/i.test(w.nl));
  const qs = [];
  let i = 0;
  while (qs.length < QUESTIONS) {
    const kind = i % 5;
    if (kind === 0) {
      const v = pick(rnd, VERBS);
      const form = pick(rnd, ['ik', 'hij', 'perf', 'imp']);
      if (form === 'ik') qs.push(fin(rnd, { q: `Kies de juiste vorm: Ik ___ vandaag. (${v.inf})` }, v.ik, [v.hij, v.inf, v.imp]));
      else if (form === 'hij') qs.push(fin(rnd, { q: `Kies de juiste vorm: Hij ___ nu. (${v.inf})` }, v.hij, [v.ik, v.inf, v.part]));
      else if (form === 'perf') qs.push(fin(rnd, { q: `Kies de juiste vorm: Ik ${v.aux} gisteren ___. (${v.inf})` }, v.part, [v.imp, v.inf, v.hij]));
      else qs.push(fin(rnd, { q: `Kies de juiste vorm: Gisteren ___ ik veel. (${v.inf})` }, v.imp, [v.part, v.ik, v.inf]));
    } else if (kind === 1) {
      const w = pick(rnd, nouns);
      const art = w.nl.startsWith('de ') ? 'de' : 'het';
      const noun = w.nl.replace(/^(de|het) /, '');
      qs.push(fin(rnd, { q: `Welk lidwoord hoort bij '${noun}'?` }, art, [art === 'de' ? 'het' : 'de', 'allebei goed', 'geen lidwoord']));
    } else if (kind === 2) {
      const pr = pick(rnd, PREPS);
      qs.push(fin(rnd, { q: `Vul in: ${pr.s}` }, pr.a, pr.w));
    } else if (kind === 3) {
      const fm = pick(rnd, FORMAL);
      qs.push(fin(rnd, { q: fm.q }, fm.a, fm.w));
      const fl = pick(rnd, FIELDS);
      if (qs.length < QUESTIONS) qs.push(fin(rnd, { q: `Je vult een formulier in. Wat schrijf je bij '${fl.f}'?` }, fl.a, fl.w));
    } else {
      const sn = pick(rnd, SENTENCES);
      qs.push(fin(rnd, { q: 'Welke zin is correct?' }, sn.ok, sn.bad));
    }
    i++;
  }
  return qs.slice(0, QUESTIONS);
}

// ---------- SPREKEN ----------
const SITUATIONS = [
  { q: 'Je bent te laat op je werk. Wat zeg je?', a: 'Sorry dat ik te laat ben. De bus had vertraging.', w: ['Lekker weer vandaag!', 'Dat is jouw probleem.', 'Tot morgen allemaal!'] },
  { q: 'Je buurvrouw heeft je geholpen met een brief. Wat zeg je?', a: 'Heel erg bedankt voor uw hulp!', w: ['Dat was makkelijk voor u.', 'Tot nooit meer!', 'Dat duurde lang, zeg.'] },
  { q: 'Je begrijpt de dokter niet. Wat zeg je?', a: 'Kunt u dat alstublieft nog een keer uitleggen?', w: ['Praat maar tegen mijn hand.', 'Dat is niet mijn probleem.', 'Ik ga naar huis.'] },
  { q: 'Iemand niest naast je. Wat zeg je?', a: 'Gezondheid!', w: ['Eet smakelijk!', 'Welterusten!', 'Gefeliciteerd!'] },
  { q: 'Je collega is jarig. Wat zeg je?', a: 'Gefeliciteerd met je verjaardag!', w: ['Beterschap!', 'Sterkte ermee!', 'Eet smakelijk!'] },
  { q: 'Je collega is ziek naar huis gegaan. Wat zeg je later aan de telefoon?', a: 'Beterschap! Ik hoop dat je snel weer beter bent.', w: ['Gefeliciteerd!', 'Veel plezier!', 'Fijne vakantie!'] },
  { q: 'Je wilt in de winkel iets vragen aan een medewerker. Wat zeg je eerst?', a: 'Pardon, mag ik u iets vragen?', w: ['Hé, kom eens hier!', 'Luister nu naar mij.', 'Snel, ik heb haast!'] },
  { q: 'Je gaat weg bij een afspraak. Wat zeg je?', a: 'Bedankt en tot ziens!', w: ['Goedemorgen!', 'Welkom!', 'Met wie spreek ik?'] },
  { q: 'De bakker vraagt: "Anders nog iets?" Je wilt niets meer. Wat zeg je?', a: 'Nee, dank u. Dat was het.', w: ['Ja, tot ziens!', 'Ik weet het niet, u wel?', 'Doe maar niks nooit.'] },
  { q: 'Je neemt de telefoon op. Wat zeg je?', a: 'Goedemiddag, met Ahmed.', w: ['Wie is daar?! Zeg het snel!', 'Wat wil je?', 'Bel later maar.'] },
  { q: 'Je gast komt binnen. Wat zeg je?', a: 'Welkom! Kom binnen en ga zitten.', w: ['Tot ziens!', 'Waarom ben je hier?', 'Ik heb geen tijd.'] },
  { q: 'Iemand houdt de deur voor je open. Wat zeg je?', a: 'Dank u wel!', w: ['Loop door!', 'Eindelijk!', 'Wat doet u?'] },
  { q: 'Je begint te eten met collega’s. Wat zeg je?', a: 'Eet smakelijk!', w: ['Gezondheid!', 'Welterusten!', 'Goede reis!'] },
  { q: 'Je vriend gaat morgen examen doen. Wat zeg je?', a: 'Veel succes met je examen!', w: ['Beterschap!', 'Gecondoleerd.', 'Welterusten!'] },
  { q: 'Je stoot per ongeluk iemand aan in de bus. Wat zeg je?', a: 'Oh, sorry! Neem me niet kwalijk.', w: ['Kijk zelf uit!', 'De bus is te vol.', 'Niets zeggen en wegkijken.'] },
  { q: 'De kassière geeft je te weinig wisselgeld. Wat zeg je?', a: 'Pardon, ik denk dat het wisselgeld niet klopt.', w: ['Jij steelt van mij!', 'Ik bel nu de politie!', 'Niets, je loopt weg.'] },
  { q: 'Je wilt een dag vrij vragen aan je baas. Wat zeg je?', a: 'Zou ik vrijdag een dag vrij mogen nemen?', w: ['Ik kom vrijdag niet, punt.', 'Vrijdag werk ik nooit meer.', 'Regel het maar.'] },
  { q: 'Iemand vraagt de weg naar het station. Je weet het niet. Wat zeg je?', a: 'Sorry, ik weet het niet. Ik ben hier ook nieuw.', w: ['Loop maar ergens heen.', 'Vraag het niet aan mij!', 'Het station bestaat niet.'] },
  { q: 'Je krijgt een cadeau. Wat zeg je?', a: 'Wat leuk! Dank je wel!', w: ['Heb je de bon nog?', 'Dat had ik al.', 'Volgende keer beter.'] },
  { q: 'De leraar praat te snel. Wat zeg je?', a: 'Kunt u iets langzamer praten, alstublieft?', w: ['Praat normaal!', 'Ik luister toch niet.', 'Stop met praten.'] },
  { q: 'Je belt je werk omdat je ziek bent. Wat zeg je?', a: 'Goedemorgen, ik ben ziek en kan vandaag helaas niet komen werken.', w: ['Ik heb vandaag geen zin.', 'Het is te koud buiten.', 'Ik ga vandaag winkelen.'] },
  { q: 'Iemand zegt: "Fijn weekend!" Wat zeg je terug?', a: 'Dank je, jij ook!', w: ['Nee, bedankt.', 'Dat bepaal ik zelf.', 'Welterusten!'] },
  { q: 'Je wilt afrekenen in een restaurant. Wat zeg je?', a: 'Mogen wij de rekening, alstublieft?', w: ['Wij gaan weg, doei!', 'Het eten was gratis, toch?', 'Breng meer eten!'] },
  { q: 'Je nieuwe collega stelt zich voor. Wat zeg je?', a: 'Aangenaam! Ik ben Ahmed.', w: ['Wat moet je?', 'Ik ken jou niet.', 'Ga weg alsjeblieft.'] },
];
const QA = [
  { vq: 'Hoe heet u?', mk: (rnd) => `Ik heet ${pick(rnd, NAMES)} ${pick(rnd, ['de Vries', 'Yılmaz', 'Jansen', 'Demir'])}.` },
  { vq: 'Waar woont u?', mk: (rnd) => `Ik woon in ${pick(rnd, CITIES)}.` },
  { vq: 'Hoe oud bent u?', mk: (rnd) => `Ik ben ${pick(rnd, ['25', '31', '38', '42', '47'])} jaar.` },
  { vq: 'Wat is uw beroep?', mk: (rnd) => `Ik ben ${pick(rnd, JOBS)}.` },
  { vq: 'Heeft u kinderen?', mk: (rnd) => `Ja, ik heb ${pick(rnd, ['één kind', 'twee kinderen', 'drie kinderen'])}.` },
  { vq: 'Waar komt u vandaan?', mk: (rnd) => `Ik kom uit ${pick(rnd, ['Turkije', 'Syrië', 'Marokko', 'Polen'])}.` },
  { vq: 'Hoe gaat u naar uw werk?', mk: (rnd) => `Ik ga met ${pick(rnd, ['de fiets', 'de bus', 'de trein', 'de auto'])}.` },
  { vq: 'Wat doet u graag in het weekend?', mk: (rnd) => `Ik ${pick(rnd, ['wandel graag in het park', 'kook graag voor mijn familie', 'sport graag', 'lees graag'])}.` },
  { vq: 'Hoe laat staat u op?', mk: (rnd) => `Ik sta om ${pick(rnd, ['zes uur', 'zeven uur', 'half acht'])} op.` },
  { vq: 'Wat is uw telefoonnummer?', mk: (rnd) => `Mijn nummer is ${pick(rnd, PHONES)}.` },
];
const POLITE = [
  { sit: 'Je wilt het raam openen.', a: 'Mag ik het raam openzetten?', w: ['Raam open. Nu.', 'Het raam is dicht.', 'Ik heb het warm, en jij?'] },
  { sit: 'Je wilt de suiker op tafel pakken.', a: 'Kunt u mij de suiker aangeven, alstublieft?', w: ['Geef die suiker!', 'Suiker is lekker.', 'Waarom staat de suiker daar?'] },
  { sit: 'Je wilt eerder weg van je werk.', a: 'Zou ik vandaag iets eerder weg mogen?', w: ['Ik ga nu weg, doei.', 'Werk zelf maar door.', 'Ik kom morgen niet.'] },
  { sit: 'Je wilt dat iemand langzamer praat.', a: 'Kunt u alstublieft iets langzamer praten?', w: ['Praat niet zo raar.', 'Ik hoor je niet, stil!', 'Zeg het in het Engels.'] },
  { sit: 'Je zoekt het station.', a: 'Pardon, weet u waar het station is?', w: ['Waar is dat station nou?!', 'Breng mij naar het station.', 'Het station is weg.'] },
  { sit: 'Je wilt een nieuwe afspraak maken.', a: 'Zou ik een nieuwe afspraak kunnen maken?', w: ['Nieuwe afspraak. Regelen.', 'Ik kom wel een keer langs.', 'De vorige afspraak was stom.'] },
  { sit: 'Je wilt in de bus zitten naast iemand.', a: 'Is deze plaats vrij?', w: ['Ga opzij.', 'Dit is mijn stoel, denk ik.', 'Sta op alsjeblieft nu.'] },
  { sit: 'Je wilt iets teruggeven in de winkel.', a: 'Ik wil dit graag ruilen. Ik heb de bon nog.', w: ['Dit is kapot, geef geld.', 'Jullie winkel is slecht.', 'Ik neem gewoon iets anders mee.'] },
];

function makeSpreken(rnd) {
  const qs = [];
  const sits = shuffleS(rnd, SITUATIONS);
  const pols = shuffleS(rnd, POLITE);
  let si = 0;
  let pi = 0;
  while (qs.length < QUESTIONS) {
    const kind = qs.length % 5;
    if (kind === 0 || kind === 3) {
      const s = sits[si++ % sits.length];
      qs.push(fin(rnd, { q: s.q }, s.a, s.w));
    } else if (kind === 1 || kind === 4) {
      const item = pick(rnd, QA);
      const correct = item.mk(rnd);
      const wrongs = pickN(rnd, QA.filter((x) => x !== item), 3).map((x) => x.mk(rnd));
      qs.push(fin(rnd, { l: item.vq, q: 'Je hoort een vraag. Wat is een goed antwoord?' }, correct, wrongs));
    } else {
      const pz = pols[pi++ % pols.length];
      qs.push(fin(rnd, { q: `${pz.sit} Wat zeg je?` }, pz.a, pz.w));
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

// ---------- build ----------
const builders = {
  lezen: (rnd) => makeFromTemplates(rnd, LEZEN_TEMPLATES),
  luisteren: (rnd) => makeFromTemplates(rnd, LUISTEREN_TEMPLATES),
  schrijven: makeSchrijven,
  spreken: makeSpreken,
};

fs.mkdirSync(OUT, { recursive: true });
for (const mod of ['lezen', 'luisteren', 'schrijven', 'spreken', 'knm']) {
  const exams = [];
  for (let e = 0; e < EXAMS; e++) {
    const rnd = mulberry32(e * 1000 + mod.length * 77 + 1);
    const qs = mod === 'knm' ? makeKnm(rnd, e) : builders[mod](rnd);
    // sanity: every question has 4 options and a valid answer
    for (const q of qs) {
      if (!q.o || q.o.length !== 4 || q.a < 0 || q.a > 3) {
        throw new Error(`Bad question in ${mod} exam ${e + 1}: ${JSON.stringify(q)}`);
      }
    }
    exams.push(qs);
  }
  fs.writeFileSync(path.join(OUT, mod + '.json'), JSON.stringify(exams));
  console.log(`${mod}: ${exams.length} exams x ${exams[0].length} questions`);
}
console.log('Done.');
