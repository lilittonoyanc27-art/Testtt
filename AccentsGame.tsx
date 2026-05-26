import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ACCENTS_DATA, AccentWord } from './data';
import { ScoreState } from './types';
import { Sparkles, HelpCircle, CheckCircle2, XCircle, ArrowRight, Award } from 'lucide-react';

interface AccentsGameProps {
  score: ScoreState;
  onUpdateScore: (correct: boolean) => void;
  language: 'arm' | 'rus';
}

export default function AccentsGame({ score, onUpdateScore, language }: AccentsGameProps) {
  const isArm = language === 'arm';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeWord, setActiveWord] = useState<AccentWord | null>(null);

  // STEP STATE: 
  // 'stress' (identify the stressed syllable) -> 'type' (identify if Aguda/Llana/Esdrújula) -> 'resolved' (show explanation and path forward)
  const [step, setStep] = useState<'stress' | 'type' | 'resolved'>('stress');

  const [clickedSyllable, setClickedSyllable] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<'Aguda' | 'Llana' | 'Esdrújula' | null>(null);
  const [scoreEarned, setScoreEarned] = useState<boolean>(true); // track if they got it right on first attempt

  useEffect(() => {
    setActiveWord(ACCENTS_DATA[currentIndex]);
    setStep('stress');
    setClickedSyllable(null);
    setSelectedType(null);
    setScoreEarned(true);
  }, [currentIndex]);

  if (!activeWord) return null;

  const handleSyllableClick = (idx: number) => {
    if (step !== 'stress') return;
    setClickedSyllable(idx);

    if (idx === activeWord.stressedIndex) {
      // Correct stress clicked!
      setTimeout(() => {
        setStep('type');
      }, 700);
    } else {
      // Incorrect stress clicked
      onUpdateScore(false);
      setScoreEarned(false);
    }
  };

  const handleTypeSelection = (type: 'Aguda' | 'Llana' | 'Esdrújula') => {
    if (step !== 'type') return;
    setSelectedType(type);

    if (type === activeWord.rulesType) {
      // Correct type chosen!
      onUpdateScore(scoreEarned);
      setStep('resolved');
    } else {
      // Incorrect type
      onUpdateScore(false);
      setScoreEarned(false);
    }
  };

  const nextWord = () => {
    if (currentIndex < ACCENTS_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 space-y-6">
        {/* Main Word Stage */}
        <div className="text-center space-y-3 py-4">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold font-mono">
            {isArm ? 'Իսպաներեն Բառ.' : 'Испанское слово:'}
          </span>
          <h2 className="text-4xl font-extrabold text-white tracking-wider font-sans select-none capitalize">
            {activeWord.word}
          </h2>
          <p className="text-amber-500 font-bold text-sm">
            {isArm ? `Թարգմանություն՝ ${activeWord.translationArm}` : `Перевод: ${activeWord.translationRus}`}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center items-center gap-2">
          <div className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${
            step === 'stress' 
              ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
              : 'bg-slate-900/40 border-slate-800 text-slate-500'
          }`}>
            1. {isArm ? 'Գտիր շեշտվող վանկը' : 'Найдите ударный слог'}
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          <div className={`px-3 py-1 text-xs font-bold rounded-full border transition-all ${
            step === 'type' 
              ? 'bg-red-500/20 border-red-500/80 text-red-300' 
              : step === 'resolved' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                : 'bg-slate-900/40 border-slate-800 text-slate-500'
          }`}>
            2. {isArm ? 'Որոշիր կանոնը' : 'Определите тип'}
          </div>
        </div>

        {/* SYLLABLES BUTTON BOARD */}
        <div className="space-y-2">
          <label className="text-xs text-slate-400 block text-center">
            {step === 'stress' 
              ? (isArm ? 'Սեղմի՛ր այն վանկի վրա, որն արտասանելիս շեշտվում է.' : 'Нажмите на слог, который произносится под ударением.')
              : (isArm ? 'Բառի վանկատումը.' : 'Деление слова на слоги:')}
          </label>
          
          <div className="flex justify-center gap-2.5">
            {activeWord.syllables.map((syllable, idx) => {
              const isSelected = clickedSyllable === idx;
              const isCorrectSyllable = idx === activeWord.stressedIndex;
              
              let styleClass = 'bg-slate-900/60 hover:bg-slate-900 text-slate-200 border-slate-800 hover:border-slate-700 cursor-pointer';
              
              if (clickedSyllable !== null) {
                if (isCorrectSyllable) {
                  styleClass = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 pointer-events-none scale-105 shadow-md shadow-emerald-500/10';
                } else if (isSelected) {
                  styleClass = 'bg-rose-950/60 border-rose-500/60 text-rose-300 pointer-events-none';
                } else {
                  styleClass = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60 pointer-events-none';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSyllableClick(idx)}
                  className={`px-5 py-3 border rounded-xl text-lg font-bold uppercase tracking-wider transition-all duration-300 ${styleClass}`}
                  disabled={step !== 'stress'}
                >
                  {syllable}
                </button>
              );
            })}
          </div>
        </div>

        {/* GAME STEP 2: CATEGORY SELECTOR */}
        {step !== 'stress' && (
          <div className="space-y-3 pt-4 border-t border-slate-900 animate-fadeIn">
            <label className="text-xs text-slate-400 block text-center">
              {isArm 
                ? 'Այս բառը պատկանում է շեշտադրության ո՞ր խմբին.' 
                : 'К какому типу относится это слово по правилам ударения?'}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-xl mx-auto">
              {(['Aguda', 'Llana', 'Esdrújula'] as const).map((type) => {
                const isSelected = selectedType === type;
                const isCorrectType = activeWord.rulesType === type;
                
                let btnClass = 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200';
                if (selectedType !== null) {
                  if (isCorrectType) {
                    btnClass = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300';
                  } else if (isSelected) {
                    btnClass = 'bg-rose-950/60 border-rose-500/60 text-rose-300';
                  } else {
                    btnClass = 'bg-slate-950/20 border-slate-900/40 text-slate-500 opacity-40';
                  }
                }

                return (
                  <button
                    key={type}
                    onClick={() => handleTypeSelection(type)}
                    className={`p-3.5 border rounded-xl font-bold text-sm tracking-wider transition-all ${btnClass}`}
                    disabled={step !== 'type'}
                  >
                    <span className="block capitalize">{type}</span>
                    <span className="text-[10px] font-normal opacity-60 block mt-0.5">
                      {type === 'Aguda' && (isArm ? 'Վերջնաշեշտ' : 'Конечный слог')}
                      {type === 'Llana' && (isArm ? 'Նախավերջնաշեշտ' : 'Предпоследний')}
                      {type === 'Esdrújula' && (isArm ? 'Ապավերջնաշեշտ' : 'Третий с конца')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: EXPLANATORY RESPONSE CARD */}
        {step === 'resolved' && (
          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl space-y-3 animate-slideDown">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <h4 className="font-bold text-emerald-400 text-sm">
                {isArm ? 'Հիանալի՛ է: Այս բառը' : 'Великолепно! Это слово —'} {activeWord.rulesType}
              </h4>
            </div>
            
            <p className="text-slate-200 text-xs md:text-sm leading-relaxed whitespace-pre-line bg-slate-950/50 p-3.5 rounded-lg border border-slate-900">
              <span className="font-semibold text-amber-500 block mb-1">
                {isArm ? 'Ինչո՞ւ է այդպես.' : 'Почему так:'}
              </span>
              {isArm ? activeWord.explanationArm : activeWord.explanationRus}
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={nextWord}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold text-xs rounded-xl hover:shadow-lg hover:shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                {isArm ? 'Հաջորդ բառը' : 'Следующее слово'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Accordion Progress Info */}
      <div className="p-4 bg-slate-900/20 border border-slate-900/50 rounded-xl flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {isArm ? `Բառ՝ ${currentIndex + 1} / ${ACCENTS_DATA.length}` : `Слово: ${currentIndex + 1} из ${ACCENTS_DATA.length}`}
        </span>
        <div className="flex gap-1.5">
          {ACCENTS_DATA.map((_, idx) => (
            <div
              key={idx}
              className={`w-2.5 h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-amber-500 w-6'
                  : idx < currentIndex
                    ? 'bg-emerald-500/50'
                    : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
