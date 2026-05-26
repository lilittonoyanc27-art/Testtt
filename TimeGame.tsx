import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TIME_DATA, TimeTestCase } from './data';
import { ScoreState } from './types';
import { Clock, RefreshCw, CheckCircle2, XCircle, Info, HelpCircle } from 'lucide-react';

interface TimeGameProps {
  score: ScoreState;
  onUpdateScore: (correct: boolean) => void;
  language: 'arm' | 'rus';
}

export default function TimeGame({ score, onUpdateScore, language }: TimeGameProps) {
  const isArm = language === 'arm';
  const [currentTest, setCurrentTest] = useState<TimeTestCase | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const initNewTimeChallenge = () => {
    setSelectedOption(null);
    setIsAnswerCorrect(null);

    // Pick a random time case
    const testCase = TIME_DATA[Math.floor(Math.random() * TIME_DATA.length)];
    setCurrentTest(testCase);

    // Pick 3 random wrong answers from standard time tests
    const wrongAnswers = TIME_DATA
      .filter(x => x.spanish !== testCase.spanish)
      .map(x => x.spanish);

    const pickedWrongs = [...wrongAnswers].sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [testCase.spanish, ...pickedWrongs].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  useEffect(() => {
    initNewTimeChallenge();
  }, [language]);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null || !currentTest) return;
    setSelectedOption(option);
    
    const correct = option === currentTest.spanish;
    setIsAnswerCorrect(correct);
    onUpdateScore(correct);
  };

  if (!currentTest) return null;

  // Clock Hand calculations:
  // Minute hand angle: minute * 6 (360 degrees / 60 minutes)
  const minuteAngle = currentTest.minute * 6;
  // Hour hand angle: (hour % 12) * 30 + minute * 0.5 (30 deg per hour, plus 0.5 deg per minute)
  const hourAngle = (currentTest.hour % 12) * 30 + currentTest.minute * 0.5;

  return (
    <div className="space-y-6">
      <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* SVG ANALOG CLOCK VIEWPORT */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative w-56 h-56 bg-slate-900 border-4 border-slate-800 rounded-full shadow-2xl flex items-center justify-center p-2">
            
            {/* Clock Face SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Outer dial ring */}
              <circle cx="100" cy="100" r="92" className="fill-none stroke-slate-800 stroke-2" />
              
              {/* Hour notch points */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x1 = 100 + 82 * Math.sin(angle);
                const y1 = 100 - 82 * Math.cos(angle);
                const x2 = 100 + 90 * Math.sin(angle);
                const y2 = 100 - 90 * Math.cos(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className="stroke-amber-500/80 stroke-2"
                  />
                );
              })}

              {/* Major Numbers (12, 3, 6, 9) */}
              <text x="100" y="28" textAnchor="middle" className="fill-slate-500 font-bold text-lg font-mono">12</text>
              <text x="178" y="106" textAnchor="middle" className="fill-slate-500 font-bold text-lg font-mono">3</text>
              <text x="100" y="184" textAnchor="middle" className="fill-slate-500 font-bold text-lg font-mono">6</text>
              <text x="22" y="106" textAnchor="middle" className="fill-slate-500 font-bold text-lg font-mono">9</text>

              {/* Hour Hand (shorter, solid ruby red) */}
              <line
                x1="100"
                y1="100"
                x2={100 + 50 * Math.sin((hourAngle * Math.PI) / 180)}
                y2={100 - 50 * Math.cos((hourAngle * Math.PI) / 180)}
                className="stroke-red-600 stroke-[5] stroke-linecap-round"
              />

              {/* Minute Hand (longer, bright Amber) */}
              <line
                x1="100"
                y1="100"
                x2={100 + 72 * Math.sin((minuteAngle * Math.PI) / 180)}
                y2={100 - 72 * Math.cos((minuteAngle * Math.PI) / 180)}
                className="stroke-amber-500 stroke-[3] stroke-linecap-round"
              />

              {/* Central pin pivot */}
              <circle cx="100" cy="100" r="5" className="fill-white" />
            </svg>
          </div>

          <div className="text-center">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              {isArm ? 'Թվային ցուցիչ՝' : 'Цифровое время:'}
            </span>
            <div className="text-2xl font-black text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg inline-block mt-1 tracking-widest font-mono">
              {String(currentTest.hour).padStart(2, '0')}:{String(currentTest.minute).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* MULTIPLE CHOICE & FEEDBACK PANEL */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs uppercase font-semibold text-amber-500 font-mono tracking-widest block">
              ¿Qué hora es?
            </span>
            <h3 className="text-sm text-slate-300">
              {isArm 
                ? 'Ընտրիր պատկերված ժամի ճիշտ իսպաներեն թարգմանությունը.' 
                : 'Выберите правильный вариант ответа для времени на циферблате.'}
            </h3>
          </div>

          <div className="space-y-2.5">
            {options.map((option) => {
              const isSelected = selectedOption === option;
              const isCorrectTarget = currentTest.spanish === option;
              
              let btnStyle = 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-200';
              if (selectedOption !== null) {
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
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full p-4 border font-bold text-left rounded-xl transition-all flex items-center justify-between text-base ${btnStyle}`}
                >
                  <span>{option}</span>
                  {selectedOption !== null && isCorrectTarget && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {selectedOption !== null && isSelected && !isCorrectTarget && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DETAILED LESSON CORRECTION BOX (Explanations game each) */}
      {selectedOption !== null && (
        <div className="bg-slate-900/50 border border-slate-800/80 p-5 rounded-2xl space-y-4 animate-slideDown">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-500" />
              <h4 className="font-bold text-slate-200 text-sm">
                {isArm ? 'Ժամի քերականական վերլուծություն.' : 'Грамматический разбор:'}
              </h4>
            </div>
            <button
              onClick={initNewTimeChallenge}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold text-xs rounded-xl hover:shadow-lg transition-all"
            >
              {isArm ? 'Հաջորդ ժամը' : 'Дальше'}
            </button>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-slate-300 text-xs md:text-sm leading-relaxed space-y-2">
            <div>
              <span className="text-amber-500 font-bold block mb-1">
                {isArm ? 'Կանոնի Բացատրություն.' : 'Правило времени:'}
              </span>
              <p className="whitespace-pre-line text-slate-200">
                {isArm ? currentTest.armenianExplanation : currentTest.russianExplanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
