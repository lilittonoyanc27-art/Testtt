import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GAMES_METADATA } from './data';
import { GameId, ScoreState } from './types';

// Components
import GermanBackground, { BgTheme } from './GermanBackground';
import ExplanationDrawer from './ExplanationDrawer';
import NumbersGame from './NumbersGame';
import AccentsGame from './AccentsGame';
import MonthsGame from './MonthsGame';
import DaysGame from './DaysGame';
import TimeGame from './TimeGame';
import TranslationsGame from './TranslationsGame';

// Icons
import {
  Award,
  BookOpen,
  ArrowLeft,
  RotateCcw,
  Flame,
  Binary,
  Sparkles,
  Calendar,
  CalendarDays,
  Clock,
  Languages,
  HelpCircle
} from 'lucide-react';

export default function App() {
  // Locale / Language State
  const [language, setLanguage] = useState<'arm' | 'rus'>('arm');
  const isArm = language === 'arm';

  // Background Theme State
  const [bgTheme, setBgTheme] = useState<BgTheme>('berlin-dark');

  // Active Game State
  const [activeGameId, setActiveGameId] = useState<GameId | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Score State
  const [score, setScore] = useState<ScoreState>({
    correct: 0,
    total: 0,
    streak: 0,
    bestStreak: 0,
  });

  // Load Score from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('ispaneren_score');
    if (saved) {
      try {
        setScore(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading scores:', e);
      }
    }
  }, []);

  // Sync Score to LocalStorage
  const saveScore = (newScore: ScoreState) => {
    setScore(newScore);
    localStorage.setItem('ispaneren_score', JSON.stringify(newScore));
  };

  // Update Score Handler
  const updateScore = (correct: boolean) => {
    const nextStreak = correct ? score.streak + 1 : 0;
    const nextBest = Math.max(score.bestStreak, nextStreak);
    
    const nextScore: ScoreState = {
      correct: correct ? score.correct + 1 : score.correct,
      total: score.total + 1,
      streak: nextStreak,
      bestStreak: nextBest,
    };
    saveScore(nextScore);
  };

  // Reset Score Handler
  const resetScore = () => {
    const fresh: ScoreState = {
      correct: 0,
      total: 0,
      streak: 0,
      bestStreak: 0,
    };
    saveScore(fresh);
  };

  // Helper to map icon names to Lucide elements
  const getGameIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Binary': return <Binary className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Calendar': return <Calendar className={className} />;
      case 'CalendarDays': return <CalendarDays className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'Languages': return <Languages className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  const activeGameMetadata = activeGameId ? GAMES_METADATA[activeGameId] : null;

  return (
    <div className="relative min-h-screen text-slate-100 font-sans" id="app-wrapper">
      {/* German Dynamic Background */}
      <GermanBackground theme={bgTheme} onChangeTheme={setBgTheme} />

      {/* Main Structural Content Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Navigation & Score Header Panel */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-md">
          {/* Brand Logo & Lang switcher */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-red-600 to-amber-500 rounded-xl shadow-md text-white">
              <span className="font-bold text-lg select-none">🇩🇪🇪🇸</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  Իսպաներեն A1 学习 Hub
                </h1>
                <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-400 font-bold uppercase rounded font-mono">
                  Armenian ed
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isArm 
                  ? '6 ինտերակտիվ խաղեր՝ իսպաներեն սովորելու համար' 
                  : '6 развивающих игр для освоения испанского языка с нуля'}
              </p>
            </div>
          </div>

          {/* Player Progress Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-slate-950/75 p-2 px-4 border border-slate-900 rounded-xl shadow-inner text-xs">
              <div className="text-center">
                <span className="text-slate-500 block uppercase font-bold tracking-wider text-[9px] font-mono">
                  {isArm ? 'Միավորներ' : 'Верно'}
                </span>
                <span className="font-extrabold text-amber-500 text-base font-mono">
                  {score.correct} / {score.total}
                </span>
              </div>

              <div className="h-6 w-px bg-slate-800" />

              <div className="text-center flex items-center gap-1">
                <Flame className={`w-4 h-4 text-red-500 ${score.streak > 0 ? 'animate-pulse' : 'opacity-40'}`} />
                <div className="text-left">
                  <span className="text-slate-500 block uppercase font-bold tracking-wider text-[9px] font-mono">
                    Streak
                  </span>
                  <span className="font-black text-amber-400 font-mono text-sm">
                    {score.streak}
                  </span>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-800" />

              <div className="text-center">
                <span className="text-slate-500 block uppercase font-bold tracking-wider text-[9px] font-mono">
                  {isArm ? 'Լավագույն շարք' : 'Рекорд'}
                </span>
                <span className="font-extrabold text-slate-300 font-mono text-xs">
                  {score.bestStreak}
                </span>
              </div>
            </div>

            {/* Global Actions */}
            <div className="flex items-center gap-2">
              {/* Language toggle selector */}
              <div className="flex rounded-lg bg-slate-950 border border-slate-800 p-0.5">
                <button
                  onClick={() => setLanguage('arm')}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded transition-colors ${
                    isArm ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Armenian"
                >
                  ՀԱՅ
                </button>
                <button
                  onClick={() => setLanguage('rus')}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded transition-colors ${
                    !isArm ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Russian"
                >
                  РУՍ
                </button>
              </div>

              {/* Reset score state progress button */}
              <button
                onClick={resetScore}
                className="p-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-all shadow"
                title={isArm ? 'Զրոյացնել Միավորները' : 'Сбросить прогресс'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Component Renderer */}
        <main className="min-h-[450px]">
          <AnimatePresence mode="wait">
            {!activeGameId ? (
              // STUDY SELECTION HUB GRID
              <motion.div
                key="hub"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Hub Welcome Banner */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-950/20 shadow-lg relative overflow-hidden backdrop-blur-sm">
                  <div className="max-w-xl space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">
                      {isArm ? 'Բարի գալո՜ւստ Իսպաներենի Աշխարհ' : 'Добро пожаловать в мир испанского языка'}
                    </span>
                    <h2 className="text-2xl font-black text-white">
                      {isArm 
                        ? 'Սովորի՛ր իսպաներեն հեշտ, տեսանելի և արագ' 
                        : 'Учите испанский легко, наглядно и эффективно'}
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {isArm
                        ? 'Ընտրեք ստորև ներկայացված 6 թեմաներից ցանկացածը: Յուրաքանչյուր խաղի սկզբում կարող եք կարդալ տեսական կանոնները հայերեն և ռուսերեն լեզուներով:'
                        : 'Выберите одну из 6 лексических и грамматических тем. Перед стартом любой игры можно открыть теоретическую справку с разборами на русском и армянском.'}
                    </p>
                  </div>
                </div>

                {/* Grid layout containing 6 games */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Object.values(GAMES_METADATA).map((game) => {
                    let diffTitle = 'Easy';
                    let diffColor = 'border-emerald-500/25 text-emerald-400 bg-emerald-500/5';
                    if (game.difficulty === 'A1_MEDIUM') {
                      diffTitle = 'Medium';
                      diffColor = 'border-amber-500/25 text-amber-400 bg-amber-500/5';
                    } else if (game.difficulty === 'A1_HARD') {
                      diffTitle = 'Hard';
                      diffColor = 'border-red-500/20 text-red-400 bg-red-500/5';
                    }

                    return (
                      <motion.div
                        key={game.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex flex-col justify-between bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 p-5 rounded-2xl shadow-lg transition-all backdrop-blur-md group"
                      >
                        <div className="space-y-3.5">
                          {/* Top row */}
                          <div className="flex justify-between items-start">
                            <div className="p-3 bg-gradient-to-br from-red-600/10 to-amber-500/10 border border-red-500/10 rounded-xl group-hover:from-red-600/20 group-hover:to-amber-500/20 transition-all">
                              {getGameIcon(game.icon, "w-6 h-6 text-amber-400")}
                            </div>
                            <span className={`px-2.5 py-0.5 border text-[10px] font-bold rounded-md font-mono ${diffColor}`}>
                              {diffTitle}
                            </span>
                          </div>

                          {/* Titles */}
                          <div>
                            <span className="text-[10px] font-extrabold uppercase text-slate-500 font-mono block tracking-wider">
                              {game.titleSpan}
                            </span>
                            <h3 className="text-base font-extrabold text-slate-100 group-hover:text-amber-400 transition-colors mt-0.5">
                              {isArm ? game.titleArm : game.titleRus}
                            </h3>
                            <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed h-10">
                              {isArm ? game.descriptionArm : game.descriptionRus}
                            </p>
                          </div>
                        </div>

                        {/* Trigger button */}
                        <button
                          onClick={() => {
                            setActiveGameId(game.id);
                            setShowExplanation(true); // open grammar lesson on game enter
                          }}
                          className="w-full mt-4 py-2.5 bg-slate-950 hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-500 hover:text-white hover:border-transparent transition-all border border-slate-800 rounded-xl text-xs font-extrabold text-slate-300"
                        >
                          {isArm ? 'Սկսել Խաղը' : 'Начать игру'}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              // ACTIVE GAME LAYOUT
              <motion.div
                key="active-game"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="space-y-6"
                id="active-game-container"
              >
                {/* Back Link & Info Header row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900/40 p-4 border border-slate-800 rounded-2xl shadow-md">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveGameId(null);
                        setShowExplanation(false);
                      }}
                      className="p-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 rounded-xl transition-all"
                      title={isArm ? 'Հետընթաց դեպի խաղերը' : 'Назад к играм'}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-amber-500/80 uppercase font-bold block">
                        {activeGameMetadata?.titleSpan}
                      </span>
                      <h2 className="text-base font-extrabold text-slate-100">
                        {isArm ? activeGameMetadata?.titleArm : activeGameMetadata?.titleRus}
                      </h2>
                    </div>
                  </div>

                  {/* Open lesson explanation button */}
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      showExplanation
                        ? 'bg-amber-500 text-slate-950 shadow-lg'
                        : 'bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    {isArm ? 'Կանոններ և Տեսություն' : 'Правила и Теория'}
                  </button>
                </div>

                {/* Explanation lesson Drawer (Bilingual!) */}
                {showExplanation && activeGameMetadata && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <ExplanationDrawer
                      game={activeGameMetadata}
                      language={language}
                      onSetLanguage={setLanguage}
                      onClose={() => setShowExplanation(false)}
                    />
                  </motion.div>
                )}

                {/* Embedded Game Elements Router */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
                  {activeGameId === 'numbers' && (
                    <NumbersGame score={score} onUpdateScore={updateScore} language={language} />
                  )}
                  {activeGameId === 'accents' && (
                    <AccentsGame score={score} onUpdateScore={updateScore} language={language} />
                  )}
                  {activeGameId === 'months' && (
                    <MonthsGame score={score} onUpdateScore={updateScore} language={language} />
                  )}
                  {activeGameId === 'days' && (
                    <DaysGame score={score} onUpdateScore={updateScore} language={language} />
                  )}
                  {activeGameId === 'time' && (
                    <TimeGame score={score} onUpdateScore={updateScore} language={language} />
                  )}
                  {activeGameId === 'translations' && (
                    <TranslationsGame score={score} onUpdateScore={updateScore} language={language} />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-[11px] text-slate-500 font-mono tracking-widest border-t border-slate-900 pt-6">
          <p>
            {isArm 
              ? 'Իսպաներենի Ուսուցման Կենտրոն | Գեղագիտական Գերմանական Դիզայն' 
              : 'Хаб немецкого дизайна для изучения испанского языка уровня A1'}
          </p>
          <div className="flex justify-center gap-3 mt-2 opacity-65">
            <span>🇦🇲 ՀԱՅԱՍՏԱՆ</span>
            <span>•</span>
            <span>🇩🇪 DEUTSCHLAND</span>
            <span>•</span>
            <span>🇪🇸 ESPAÑA</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
