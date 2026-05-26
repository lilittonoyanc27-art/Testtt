import { BookOpen, X, AlertCircle } from 'lucide-react';
import { GameMetadata } from './types';

interface ExplanationDrawerProps {
  game: GameMetadata;
  language: 'arm' | 'rus';
  onSetLanguage: (lang: 'arm' | 'rus') => void;
  onClose: () => void;
}

export default function ExplanationDrawer({ game, language, onSetLanguage, onClose }: ExplanationDrawerProps) {
  const isArm = language === 'arm';

  return (
    <div className="bg-slate-900/95 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-red-600/20 to-amber-500/20 border border-red-500/20 rounded-lg">
            <BookOpen className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-500/80 font-semibold font-mono">
              {isArm ? 'Դասախոսություն և Կանոններ' : 'Теория и Правила'}
            </span>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              {isArm ? game.titleArm : game.titleRus}
              <span className="text-sm font-normal text-slate-400 font-mono">({game.titleSpan})</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher inside explanation */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 border border-slate-800 rounded-lg">
            <button
              onClick={() => onSetLanguage('arm')}
              className={`px-2 py-1 rounded text-xs font-semibold uppercase transition-all ${
                isArm
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ՀԱՅ
            </button>
            <button
              onClick={() => onSetLanguage('rus')}
              className={`px-2 py-1 rounded text-xs font-semibold uppercase transition-all ${
                !isArm
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              РУС
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {/* Main lesson content */}
        <div className="bg-slate-950/60 border border-slate-800/40 p-4 rounded-xl text-slate-200 leading-relaxed text-sm whitespace-pre-line">
          {isArm ? game.explanationArm : game.explanationRus}
        </div>

        {/* Tip banner */}
        <div className="flex gap-3 bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl text-xs text-amber-400/90 leading-normal">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-500" />
          <div>
            <span className="font-bold block mb-0.5">
              {isArm ? 'A1 Ուսումնական խորհուրդ.' : 'Учебный совет уровня A1:'}
            </span>
            <span>
              {isArm
                ? 'Կարդացեք վերը նշված կանոնները նախքան խաղն սկսելը: Այն կօգնի ձեզ կատարել առաջադրանքները բացարձակ անսխալ և բարձրացնել ձեր լավագույն միավորների շարքը (Streak):'
                : 'Внимательно изучите эти правила перед стартом игры. Это поможет вам выполнять задания безошибочно и повысить ваш рекорд непрерывных побед (Streak).'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
