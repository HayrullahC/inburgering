import React, { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import { supa, subscribe, getAll, getP, setP, onLogin, onLogout, LEVELS } from './lib.js';
import {
  Home, Vocab, Grammar, GrammarTopic, Exams, ExamList, ExamRunner, Auth, ResetPassword, Info, Placement, StartRoute,
} from './pages.jsx';
import { GamesHome, Flashcards, MatchGame, Sprint, Spell, Sentence, Article, VerbGame, Dictation, Idioms } from './games.jsx';
import { AdminPage, FeedbackWidget, isAdmin } from './admin.jsx';
import { Practice } from './practice.jsx';
import { Support } from './support.jsx';
import { Dialogues, Dialogue } from './dialogues.jsx';

// ---------- i18n ----------
const UI = {
  home: { en: 'Home', tr: 'Ana Sayfa' },
  start: { en: 'Start here', tr: 'Buradan başla' },
  vocab: { en: 'Words', tr: 'Kelimeler' },
  grammar: { en: 'Grammar', tr: 'Gramer' },
  exams: { en: 'Exams', tr: 'Sınavlar' },
  games: { en: 'Games', tr: 'Oyunlar' },
  practice: { en: 'Practice', tr: 'Pratik' },
  dialogues: { en: 'Dialogues', tr: 'Diyaloglar' },
  info: { en: 'Exam Info', tr: 'Sınav Bilgisi' },
  support: { en: 'Support', tr: 'Destek' },
  account: { en: 'Account', tr: 'Hesap' },
  login: { en: 'Log in', tr: 'Giriş' },
  logout: { en: 'Log out', tr: 'Çıkış' },
};

const LangCtx = createContext('en');
export function useLang() {
  return useContext(LangCtx);
}
// t(obj) picks the current language from a {en,tr} object
export function useT() {
  const lang = useLang();
  return (obj) => (typeof obj === 'string' ? obj : obj?.[lang] ?? obj?.en ?? '');
}

const UserCtx = createContext(null);
export function useUser() {
  return useContext(UserCtx);
}

// Captured at module load, before supabase-js parses (and strips) the URL fragment
// that the password-recovery email link carries.
const RECOVERY_AT_LOAD =
  typeof window !== 'undefined' && window.location.hash.includes('type=recovery');

export default function App() {
  useSyncExternalStore(subscribe, getAll); // re-render on any progress change
  const lang = getP('lang', 'en');
  const level = getP('level', 'A2');
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!supa); // wait for session check before deciding locked/unlocked
  const nav = useNavigate();

  useEffect(() => {
    if (!supa) return;
    if (RECOVERY_AT_LOAD) nav('/reset');
    supa.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      if (data.session?.user) onLogin(data.session.user);
      setReady(true);
    });
    const { data: sub } = supa.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) onLogin(session.user);
      else onLogout();
      if (event === 'PASSWORD_RECOVERY') nav('/reset');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const t = (k) => UI[k][lang];
  // members-only: without a logged-in user (or without Supabase config) everything is locked
  const locked = !user;

  return (
    <LangCtx.Provider value={lang}>
      <UserCtx.Provider value={user}>
        <header className="topbar">
          <Link to="/" className="brand">🇳🇱 Nederlands</Link>
          {!locked && (
            <div className="lvl-switch" title="A2 · B1 · B2">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  className={'lvl' + (l.id === level ? ' on' : '')}
                  onClick={() => { setP('level', l.id); nav('/'); }}
                >
                  {l.id}
                </button>
              ))}
            </div>
          )}
          {!locked && <nav>
            <NavLink to="/">🏠 {t('home')}</NavLink>
            <NavLink to="/start">🚀 {t('start')}</NavLink>
            <span className="sep" />
            <NavLink to="/vocab">📖 {t('vocab')}</NavLink>
            <NavLink to="/grammar">✏️ {t('grammar')}</NavLink>
            <NavLink to="/dialogues">💬 {t('dialogues')}</NavLink>
            <NavLink to="/exams">📝 {t('exams')}</NavLink>
            <NavLink to="/practice">🗣️ {t('practice')}</NavLink>
            <NavLink to="/games">🎮 {t('games')}</NavLink>
            <span className="sep" />
            <NavLink to="/info">ℹ️ {t('info')}</NavLink>
            <NavLink to="/support">🛟 {t('support')}</NavLink>
            {isAdmin(user) && <NavLink to="/admin">⚙️</NavLink>}
          </nav>}
          <div className="topbar-right">
            <button
              className="lang-btn"
              onClick={() => setP('lang', lang === 'en' ? 'tr' : 'en')}
              title="Language / Dil"
            >
              {lang === 'en' ? '🇹🇷 TR' : '🇬🇧 EN'}
            </button>
            <Link to="/auth" className="acct-btn">
              {user ? '👤 ' + (user.user_metadata?.full_name || (user.email || '').split('@')[0]) : '👤 ' + t('login')}
            </Link>
          </div>
        </header>
        <main>
          {!ready ? null : locked ? (
            <Routes>
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="*" element={<Auth />} />
            </Routes>
          ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vocab" element={<Vocab />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/grammar/:id" element={<GrammarTopic />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exams/:mod" element={<ExamList />} />
            <Route path="/exam/:mod/:n" element={<ExamRunner />} />
            <Route path="/games" element={<GamesHome />} />
            <Route path="/games/flashcards" element={<Flashcards />} />
            <Route path="/games/match" element={<MatchGame />} />
            <Route path="/games/sprint" element={<Sprint />} />
            <Route path="/games/spell" element={<Spell />} />
            <Route path="/games/sentence" element={<Sentence />} />
            <Route path="/games/article" element={<Article />} />
            <Route path="/games/verbs" element={<VerbGame />} />
            <Route path="/games/dictation" element={<Dictation />} />
            <Route path="/games/idioms" element={<Idioms />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/info" element={<Info />} />
            <Route path="/placement" element={<Placement />} />
            <Route path="/start" element={<StartRoute />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/support" element={<Support />} />
            <Route path="/dialogues" element={<Dialogues />} />
            <Route path="/dialogues/:id" element={<Dialogue />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          )}
        </main>
        {!locked && <FeedbackWidget />}
        <footer className="footer">
          Gratis oefenmateriaal — geen officiële examensite. Veel succes! 💪
        </footer>
      </UserCtx.Provider>
    </LangCtx.Provider>
  );
}
