import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DAYS_DATA, DayItem } from './data';
import { ScoreState } from './types';
import { CalendarDays, HelpCircle, CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface DaysGameProps {
  score: ScoreState;
  onUpdateScore: (correct: boolean) => void;
  language: 'arm' | 'rus';
}

interface SchedulerQuestion {
  questionTextArm: string;
  questionTextRus: string;
  correctAnswer: string;
  options: string[];
}

export default function DaysGame({ score, onUpdateScore, language }: DaysGameProps) {
  const isArm = language === 'arm';
  const [activeTab, setActiveTab] = useState<'match' | 'sequence'>('match');

  // MATCH QUIZ STATE
  const [activeDay, setActiveDay] = useState<DayItem | null>(null);
  const [matchOptions, setMatchOptions] = useState<string[]>([]);
  const [selectedDayOption, setSelectedDayOption] = useState<string | null>(null);
  const [isMatchCorrect, setIsMatchCorrect] = useState<boolean | null>(null);

  // SEQUENCE SCHEDULER STATE
  const [currentSchedQ, setCurrentSchedQ] = useState<SchedulerQuestion | null>(null);
  const [selectedSchedOption, setSelectedSchedOption] = useState<string | null>(null);
  const [isSchedCorrect, setIsSchedCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    generateNewMatchQ();
    generateNewSchedQ();
  }, [language]);

  // Generate Match Question
  const generateNewMatchQ = () => {
    const randomItem = DAYS_DATA[Math.floor(Math.random() * DAYS_DATA.length)];
    setActiveDay(randomItem);
    setSelectedDayOption(null);
    setIsMatchCorrect(null);

    const otherOptions = DAYS_DATA
      .filter(x => x.spanish !== randomItem.spanish)
      .map(x => isArm ? x.armenian : x.russian);

    const randomizedOthers = [...otherOptions].sort(() => 0.5 - Math.random()).slice(0, 3);
    const correctTranslation = isArm ? randomItem.armenian : randomItem.russian;
    
    const allOptions = [...randomizedOthers, correctTranslation].sort(() => 0.5 - Math.random());
    setMatchOptions(allOptions);
  };

  // Generate Scheduler Context Questions
  const generateNewSchedQ = () => {
    setSelectedSchedOption(null);
    setIsSchedCorrect(null);

    // Pick a random reference day
    const refDayIdx = Math.floor(Math.random() * DAYS_DATA.length);
    const refDay = DAYS_DATA[refDayIdx];

    // Determine target day ("after" or "before" type question)
    const isAfter = Math.random() > 0.5;
    let targetIndex = 0;
    let questionTextArm = '';
    let questionTextRus = '';

    if (isAfter) {
      targetIndex = (refDayIdx + 1) % DAYS_DATA.length;
      questionTextArm = `Ո՞ր օրն է գալիս «${refDay.spanish}»-ից անմիջապես ՀԵՏՈ:`;
      questionTextRus = `Какой день идет сразу ПОСЛЕ «${refDay.spanish}»?`;
    } else {
      targetIndex = (refDayIdx - 1 + DAYS_DATA.length) % DAYS_DATA.length;
      questionTextArm = `Ո՞ր օրն է գալիս «${refDay.spanish}»-ից անմիջապես ԱՌԱՋ:`;
      questionTextRus = `Какой день идет прямо ПЕРЕД «${refDay.spanish}»?`;
    }

    const correctDay = DAYS_DATA[targetIndex];
    
    // Generate options in Spanish
    const otherSpanish = DAYS_DATA
      .filter(x => x.spanish !== correctDay.spanish)
      .map(x => x.spanish);

    const pickedOthers = [...otherSpanish].sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [...pickedOthers, correctDay.spanish].sort(() => 0.5 - Math.random());

    setCurrentSchedQ({
      questionTextArm,
      questionTextRus,
      correctAnswer: correctDay.spanish,
      options: allOptions
    });
  };

  const handleMatchAnswer = (option: string) => {
    if (selectedDayOption !== null || !activeDay) return;
    setSelectedDayOption(option);
    
    const correctTranslation = isArm ? activeDay.armenian : activeDay.russian;
    const correct = option === correctTranslation;
    setIsMatchCorrect(correct);
    onUpdateScore(correct);
  };

  const handleSchedAnswer = (option: string) => {
    if (selectedSchedOption !== null || !currentSchedQ) return;
    setSelectedSchedOption(option);
    
    const correct = option === currentSchedQ.correctAnswer;
    setIsSchedCorrect(correct);
    onUpdateScore(correct);
  };

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab('match')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all pb-3.5 ${
            activeTab === 'match'
              ? 'border-amber-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <CalendarDays className="w-4 h-4 text-amber-500" />
          {isArm ? 'Օրերի Թարգմանություն' : 'Переводы Дней'}
        </button>
        <button
          onClick={() => {
            setActiveTab('sequence');
            generateNewSchedQ();
          }}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all pb-3.5 ${
            activeTab === 'sequence'
              ? 'border-amber-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-red-500" />
          {isArm ? 'Օրացուցային Տրամաբանություն' : 'Логика Дней'}
        </button>
      </div>

      {activeTab === 'match' && activeDay && (
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 space-y-6">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold font-mono">
              {isArm ? 'Թարգմանիր շաբաթվա օրը.' : 'Переведите день недели:'}
            </span>
            <h2 className="text-4xl font-extrabold text-white capitalize select-none tracking-wide">
              {activeDay.spanish}
            </h2>
            <div className="inline-block px-3 py-1.5 bg-slate-900/60 rounded-full text-xs text-amber-500 font-medium tracking-wide">
              {isArm ? 'Արտասանություն՝' : 'Произношение:'} <strong>«{activeDay.pronunciation}»</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
            {matchOptions.map((option) => {
              const isSelected = selectedDayOption === option;
              const correctTranslation = isArm ? activeDay.armenian : activeDay.russian;
              const isCorrectTarget = option === correctTranslation;
              
              let btnStyle = 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-200';
              if (selectedDayOption !== null) {
                if (isCorrectTarget) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500/60 text-rose-300';
                } else {
                  btnStyle = 'bg-slate-1050/20 border-slate-900/40 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={option}
                  disabled={selectedDayOption !== null}
                  onClick={() => handleMatchAnswer(option)}
                  className={`p-4 border font-bold rounded-xl transition-all text-sm md:text-base capitalize flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {selectedDayOption !== null && isCorrectTarget && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {selectedDayOption !== null && isSelected && !isCorrectTarget && (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedDayOption !== null && (
            <div className="pt-4 border-t border-slate-900 flex justify-between items-center bg-slate-900/20 p-4 rounded-xl max-w-xl mx-auto">
              <div className="text-xs">
                <span className="font-bold flex items-center gap-1">
                  {isMatchCorrect ? (
                    <span className="text-emerald-500">✓ {isArm ? 'Հրաշալի պատասխան' : 'Правильно'}!</span>
                  ) : (
                    <span className="text-rose-500">✗ {isArm ? 'Արժե կրկին փորձել' : 'Неверно'}!</span>
                  )}
                </span>
                <p className="text-slate-400 mt-1">
                  {isArm ? 'Իսպաներեն` ' : 'Испанский: '} <strong className="text-white capitalize">{activeDay.spanish}</strong> = {isArm ? activeDay.armenian : activeDay.russian}
                </p>
              </div>
              <button
                onClick={generateNewMatchQ}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold rounded-lg text-xs"
              >
                {isArm ? 'Հաջորդ օրը' : 'Дальше'}
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'sequence' && currentSchedQ && (
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-red-400 font-bold font-mono">
              {isArm ? 'Շաբաթվա Ընթացքի Տրամաբանություն.' : 'Календарный порядок дней:'}
            </span>
            <h3 className="text-xl font-bold text-slate-100 max-w-md mx-auto leading-relaxed">
              {isArm ? currentSchedQ.questionTextArm : currentSchedQ.questionTextRus}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
            {currentSchedQ.options.map((option) => {
              const isSelected = selectedSchedOption === option;
              const isCorrectTarget = option === currentSchedQ.correctAnswer;
              
              let btnStyle = 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-200';
              if (selectedSchedOption !== null) {
                if (isCorrectTarget) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500/60 text-rose-300';
                } else {
                  btnStyle = 'bg-slate-950/20 border-slate-900/40 text-slate-500 opacity-55';
                }
              }

              return (
                <button
                  key={option}
                  disabled={selectedSchedOption !== null}
                  onClick={() => handleSchedAnswer(option)}
                  className={`p-4 border font-bold rounded-xl transition-all text-sm capitalize flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {selectedSchedOption !== null && isCorrectTarget && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {selectedSchedOption !== null && isSelected && !isCorrectTarget && (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedSchedOption !== null && (
            <div className="pt-4 border-t border-slate-900 flex justify-between items-center bg-slate-900/20 p-4 rounded-xl max-w-xl mx-auto">
              <div className="text-xs">
                <span className="font-bold flex items-center gap-1">
                  {isSchedCorrect ? (
                    <span className="text-emerald-500">✓ {isArm ? 'Հիանալի՛ է' : 'Верно'}!</span>
                  ) : (
                    <span className="text-rose-500">✗ {isArm ? 'Սխալ է' : 'Неверно'}!</span>
                  )}
                </span>
                <p className="text-slate-400 mt-1">
                  {isArm ? 'Ճիշտ պատասխանն է.' : 'Правильный ответ: '} <strong className="text-white capitalize">{currentSchedQ.correctAnswer}</strong>
                </p>
              </div>
              <button
                onClick={generateNewSchedQ}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold rounded-lg text-xs"
              >
                {isArm ? 'Մյուս Հարցը' : 'Еще вопрос'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
