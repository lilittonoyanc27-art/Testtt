import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { VOCABULARY_DATA, VocabularyItem } from './data';
import { ScoreState } from './types';
import { Languages, HelpCircle, CheckCircle2, XCircle, ArrowRight, RefreshCw, BookOpen } from 'lucide-react';

interface TranslationsGameProps {
  score: ScoreState;
  onUpdateScore: (correct: boolean) => void;
  language: 'arm' | 'rus';
}

export default function TranslationsGame({ score, onUpdateScore, language }: TranslationsGameProps) {
  const isArm = language === 'arm';
  const [activeTab, setActiveTab] = useState<'study' | 'quiz'>('study');

  // STUDY STATE
  const [studyIndex, setStudyIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // QUIZ STATE
  const [quizItem, setQuizItem] = useState<VocabularyItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    generateNewQuiz();
    setIsFlipped(false);
  }, [language, activeTab]);

  const generateNewQuiz = () => {
    setSelectedOption(null);
    setIsQuizCorrect(null);

    const randomItem = VOCABULARY_DATA[Math.floor(Math.random() * VOCABULARY_DATA.length)];
    setQuizItem(randomItem);

    const correctTranslation = isArm ? randomItem.armenian : randomItem.russian;

    // Generate 3 random wrong answers
    const otherTranslations = VOCABULARY_DATA
      .filter(x => x.spanish !== randomItem.spanish)
      .map(x => isArm ? x.armenian : x.russian);

    const pickedWrongs = [...otherTranslations].sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [correctTranslation, ...pickedWrongs].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  const handleQuizAnswer = (option: string) => {
    if (selectedOption !== null || !quizItem) return;
    setSelectedOption(option);

    const correctTranslation = isArm ? quizItem.armenian : quizItem.russian;
    const correct = option === correctTranslation;
    setIsQuizCorrect(correct);
    onUpdateScore(correct);
  };

  const nextStudyCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (studyIndex < VOCABULARY_DATA.length - 1) {
        setStudyIndex(prev => prev + 1);
      } else {
        setStudyIndex(0);
      }
    }, 200);
  };

  const prevStudyCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (studyIndex > 0) {
        setStudyIndex(prev => prev - 1);
      } else {
        setStudyIndex(VOCABULARY_DATA.length - 1);
      }
    }, 200);
  };

  const activeStudyWord = VOCABULARY_DATA[studyIndex];

  return (
    <div className="space-y-6">
      <div className="flex border-b border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab('study')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all pb-3.5 ${
            activeTab === 'study'
              ? 'border-amber-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-500" />
          {isArm ? 'Ուսումնական Քարտեր' : 'Карточки Слов'}
        </button>
        <button
          onClick={() => {
            setActiveTab('quiz');
            generateNewQuiz();
          }}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all pb-3.5 ${
            activeTab === 'quiz'
              ? 'border-amber-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Languages className="w-4 h-4 text-red-500" />
          {isArm ? 'Թարգմանչական Խաղ' : 'Викторина Переводов'}
        </button>
      </div>

      {activeTab === 'study' && activeStudyWord && (
        <div className="space-y-6 max-w-md mx-auto">
          <p className="text-center text-xs text-slate-400">
            {isArm ? 'Սեղմի՛ր քարտի վրա՝ այն շրջելու և հայերեն թարգմանությունը տեսնելու համար:' : 'Нажмите на карточку, чтобы перевернуть её и узнать перевод.'}
          </p>

          {/* 3D PERSPECTIVE CARD MATCH FLIP */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="group cursor-pointer h-64 [perspective:1000px] relative select-none"
          >
            <div className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
              isFlipped ? '[transform:rotateY(180deg)]' : ''
            }`}>
              {/* Front Face (Spanish word) */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between [backface-visibility:hidden] shadow-2xl">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-md text-[10px] text-amber-500 font-bold tracking-widest uppercase font-mono">
                    {activeStudyWord.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {studyIndex + 1} / {VOCABULARY_DATA.length}
                  </span>
                </div>

                <div className="text-center">
                  <h2 className="text-4xl font-extrabold text-white tracking-wide">
                    {activeStudyWord.spanish}
                  </h2>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase font-mono block">
                    {isArm ? 'Սեղմիր շրջելու համար' : 'Нажмите для перевода'}
                  </span>
                </div>
              </div>

              {/* Back Face (Armenian/Russian Translate) */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-amber-950/20 border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] text-emerald-400 font-bold uppercase font-mono">
                    {isArm ? 'Թարգմանություն' : 'Перевод'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Español
                  </span>
                </div>

                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-amber-400">
                    {isArm ? activeStudyWord.armenian : activeStudyWord.russian}
                  </h2>
                  <p className="text-xs text-slate-400 italic">
                    {activeStudyWord.spanish}
                  </p>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase font-mono block">
                    {isArm ? 'Սեղմիր ետ շրջելու համար' : 'Нажмите для возврата'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevStudyCard}
              className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
            >
              {isArm ? 'Նախորդը' : 'Назад'}
            </button>
            <div className="flex gap-1">
              {VOCABULARY_DATA.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === studyIndex ? 'bg-amber-400 w-3' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextStudyCard}
              className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
            >
              {isArm ? 'Հաջորդը' : 'Вперед'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'quiz' && quizItem && (
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-semibold text-slate-500 font-mono tracking-widest">
              {isArm ? 'Ի՞նչպես կթարգմանեք հետևյալ բառը.' : 'Как переводится:'}
            </span>
            <h2 className="text-4xl font-black text-white select-none tracking-wide">
              {quizItem.spanish}
            </h2>
            <div className="inline-block px-3 py-1 bg-slate-900 border border-slate-850 rounded text-xs text-red-400/90 font-mono font-bold lowercase">
              {quizItem.category}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
            {options.map((option) => {
              const isSelected = selectedOption === option;
              const correctTranslation = isArm ? quizItem.armenian : quizItem.russian;
              const isCorrectTarget = option === correctTranslation;

              let btnStyle = 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-200';
              if (selectedOption !== null) {
                if (isCorrectTarget) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500/60 text-rose-300';
                } else {
                  btnStyle = 'bg-slate-1050/20 border-slate-900/40 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={option}
                  disabled={selectedOption !== null}
                  onClick={() => handleQuizAnswer(option)}
                  className={`p-4 border font-bold text-left rounded-xl transition-all flex items-center justify-between text-sm md:text-base capitalize ${btnStyle}`}
                >
                  <span>{option}</span>
                  {selectedOption !== null && isCorrectTarget && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {selectedOption !== null && isSelected && !isCorrectTarget && (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="pt-4 border-t border-slate-905 flex justify-between items-center bg-slate-900/20 p-4 rounded-xl max-w-xl mx-auto">
              <div className="text-xs">
                <span className="font-bold flex items-center gap-1">
                  {isQuizCorrect ? (
                    <span className="text-emerald-500">✓ {isArm ? 'Ճիշտ պատասխան' : 'Правильно'}!</span>
                  ) : (
                    <span className="text-rose-500">✗ {isArm ? 'Սխալ է, փորձիր էլի' : 'Неверно'}!</span>
                  )}
                </span>
                <p className="text-slate-400 mt-1">
                  <strong className="text-white capitalize">{quizItem.spanish}</strong> = {isArm ? quizItem.armenian : quizItem.russian}
                </p>
              </div>
              <button
                onClick={generateNewQuiz}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold rounded-lg text-xs"
              >
                {isArm ? 'Հաջորդ հարցը' : 'Дальше'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
