import React, { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { supa, subscribe, getAll, getP, setP, onLogin, onLogout } from './lib.js';
import {
  Home, Vocab, Grammar, GrammarTopic, Exams, ExamList, ExamRunner, Auth, ResetPassword, Info,
} from './pages.jsx';
import { GamesHome, Flashcards, MatchGame, Sprint, Spell } from './games.jsx';

// ---------- i18n ----------
const UI = {
  home: { en: 'Home', tr: 'Ana Sayfa' },
  vocab: { en: 'Words', tr: 'Kelimeler' },
  grammar: { en: 'Grammar', tr: 'Gramer' },
  exams: { en: 'Exams', tr: 'Sınavlar' },
  games: { en: 'Games', tr: 'Oyunlar' },
  info: { en: 'Exam Info', tr: 'Sınav Bilgisi' },
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

export default function App() {
  useSyncExternalStore(subscribe, getAll); // re-render on any progress change
  const lang = getP('lang', 'en');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!supa) return;
    supa.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      if (data.session?.user) onLogin(data.session.user);
    });
    const { data: sub } = supa.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) onLogin(session.user);
      else onLogout();
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const t = (k) => UI[k][lang];

  return (
    <LangCtx.Provider value={lang}>
      <UserCtx.Provider value={user}>
        <header className="topbar">
          <Link to="/" className="brand">🇳🇱 Inburgering A2</Link>
          <nav>
            <NavLink to="/">{t('home')}</NavLink>
            <NavLink to="/vocab">{t('vocab')}</NavLink>
            <NavLink to="/grammar">{t('grammar')}</NavLink>
            <NavLink to="/exams">{t('exams')}</NavLink>
            <NavLink to="/games">{t('games')}</NavLink>
            <NavLink to="/info">{t('info')}</NavLink>
          </nav>
          <div className="topbar-right">
            <button
              className="lang-btn"
              onClick={() => setP('lang', lang === 'en' ? 'tr' : 'en')}
              title="Language / Dil"
            >
              {lang === 'en' ? '🇹🇷 TR' : '🇬🇧 EN'}
            </button>
            <Link to="/auth" className="acct-btn">
              {user ? '👤 ' + (user.email || '').split('@')[0] : '👤 ' + t('login')}
            </Link>
          </div>
        </header>
        <main>
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
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </main>
        <footer className="footer">
          Gratis oefenmateriaal — geen officiële examensite. Veel succes! 💪
        </footer>
      </UserCtx.Provider>
    </LangCtx.Provider>
  );
}
