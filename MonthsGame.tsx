import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MONTHS_DATA, MonthItem } from './data';
import { ScoreState } from './types';
import { Calendar, Layers, CheckCircle2, RefreshCw, Grid, Play, Zap } from 'lucide-react';

interface MonthsGameProps {
  score: ScoreState;
  onUpdateScore: (correct: boolean) => void;
  language: 'arm' | 'rus';
}

interface MatchMonthsCard {
  id: string;
  label: string;
  type: 'spanish' | 'translation';
  monthId: number;
}

export default function MonthsGame({ score, onUpdateScore, language }: MonthsGameProps) {
  const isArm = language === 'arm';
  const [activeTab, setActiveTab] = useState<'match' | 'sequence'>('match');

  // MATCH MODE STATES
  const [cards, setCards] = useState<MatchMonthsCard[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [matchedMonthIds, setMatchedMonthIds] = useState<number[]>([]);

  // TIMELINE RANGE STATE for sequence order (e.g., Enero -> Febrero ...)
  const [scrambledMonths, setScrambledMonths] = useState<MonthItem[]>([]);
  const [orderedList, setOrderedList] = useState<MonthItem[]>([]);
  const [errorWord, setErrorWord] = useState<number | null>(null);

  useEffect(() => {
    initMatchGame();
    initSequenceGame();
  }, [language]);

  const initMatchGame = () => {
    setSelectedIds([]);
    setMatchedMonthIds([]);
    // Select 6 random months for grid matching to keep it dense and exciting
    const selected = [...MONTHS_DATA].sort(() => 0.5 - Math.random()).slice(0, 6);
    
    const initialCards: MatchMonthsCard[] = [];
    selected.forEach(m => {
      initialCards.push({
        id: `es-${m.id}`,
        label: m.spanish,
        type: 'spanish',
        monthId: m.id
      });
      initialCards.push({
        id: `tr-${m.id}`,
        label: isArm ? m.armenian : m.russian,
        type: 'translation',
        monthId: m.id
      });
    });

    setCards(initialCards.sort(() => 0.5 - Math.random()));
  };

  const initSequenceGame = () => {
    setOrderedList([]);
    setErrorWord(null);
    // Grab 5 adjacent or random months to sequence. Let's do a set of 5 random months
    const randomSubset = [...MONTHS_DATA].sort(() => 0.5 - Math.random()).slice(0, 5);
    // sort them numerically, so we know the correct sequence order relative to each other
    const correctOrder = [...randomSubset].sort((a, b) => a.id - b.id);
    
    // Scramble the original subset
    const scrambled = [...randomSubset].sort(() => 0.5 - Math.random());
    setScrambledMonths(scrambled);
  };

  const handleMatchClick = (card: MatchMonthsCard) => {
    if (matchedMonthIds.includes(card.monthId) || selectedIds.includes(card.id)) return;

    const nextSelected = [...selectedIds, card.id];
    if (nextSelected.length === 1) {
      setSelectedIds(nextSelected);
    } else if (nextSelected.length === 2) {
      setSelectedIds(nextSelected);
      
      const c1 = cards.find(c => c.id === nextSelected[0])!;
      const c2 = cards.find(c => c.id === nextSelected[1])!;

      if (c1.monthId === c2.monthId && c1.type !== c2.type) {
        // Correct match!
        setTimeout(() => {
          setMatchedMonthIds(prev => [...prev, c1.monthId]);
          setSelectedIds([]);
          onUpdateScore(true);
        }, 300);
      } else {
        // Incorrect
        setTimeout(() => {
          setSelectedIds([]);
          onUpdateScore(false);
        }, 1050);
      }
    }
  };

  const handleSequenceClick = (item: MonthItem) => {
    setErrorWord(null);
    
    // Find what the next correct ID should be in our scrambled set
    const remainingCorrect = [...scrambledMonths]
      .filter(x => !orderedList.some(o => o.id === x.id))
      .sort((a, b) => a.id - b.id);

    const correctNext = remainingCorrect[0];

    if (item.id === correctNext.id) {
      // Correct month clicked in chronological timeline!
      const nextOrdered = [...orderedList, item];
      setOrderedList(nextOrdered);
      onUpdateScore(true);
    } else {
      // Incorrect month clicked
      setErrorWord(item.id);
      onUpdateScore(false);
      setTimeout(() => setErrorWord(null), 800);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab('match')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all pb-3.5 ${
            activeTab === 'match'
              ? 'border-amber-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid className="w-4 h-4 text-emerald-500" />
          {isArm ? 'Ամիսների Զույգեր' : 'Пары Месяцев'}
        </button>
        <button
          onClick={() => {
            setActiveTab('sequence');
            initSequenceGame();
          }}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all pb-3.5 ${
            activeTab === 'sequence'
              ? 'border-amber-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-500" />
          {isArm ? 'Ժամանակագրական Դասավորում' : 'Хронология'}
        </button>
      </div>

      {activeTab === 'match' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-slate-900/40 border border-slate-900/60 rounded-xl">
            <span className="text-xs text-slate-400">
              {isArm 
                ? 'Միացրու իսպաներեն ամիսը հայերեն անվանման հետ.' 
                : 'Соедините испанский месяц с соответствующим русским названием.'}
            </span>
            <button
              onClick={initMatchGame}
              className="p-1 px-3 bg-slate-850 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded transition"
            >
              <RefreshCw className="w-3 h-3 inline mr-1" />
              {isArm ? 'Խառնել' : 'Перемешать'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cards.map((card) => {
              const isMatched = matchedMonthIds.includes(card.monthId);
              const isSelected = selectedIds.includes(card.id);

              let styleClass = 'border-slate-800 bg-slate-900/40 text-slate-300 cursor-pointer hover:border-slate-700';
              if (isMatched) {
                styleClass = 'border-emerald-500/20 bg-emerald-950/20 text-emerald-500/40 pointer-events-none line-through';
              } else if (isSelected) {
                styleClass = 'border-amber-500 bg-amber-500/10 text-white';
              }

              return (
                <button
                  key={card.id}
                  onClick={() => handleMatchClick(card)}
                  className={`p-4 border text-center h-20 rounded-xl font-bold flex items-center justify-center transition-all text-sm md:text-base capitalize ${styleClass}`}
                  disabled={isMatched}
                >
                  {card.label}
                </button>
              );
            })}
          </div>

          {matchedMonthIds.length === 6 && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <div>
                <h4 className="font-bold text-lg">{isArm ? 'Գերազանց է' : 'Отлично'}!</h4>
                <p className="text-sm mt-0.5">{isArm ? 'Դուք ճիշտ միացրիք բոլոր ամիսները:' : 'Вы успешно завершили сопоставление месяцев.'}</p>
              </div>
              <button
                onClick={initMatchGame}
                className="mx-auto px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-500 transition-colors"
              >
                {isArm ? 'Խաղալ նորից' : 'Играть снова'}
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'sequence' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900/40 border border-slate-900/80 rounded-xl space-y-1">
            <h4 className="text-sm font-bold text-slate-200">
              {isArm ? 'Դասավորիր ըստ հաջորդականության' : 'Разложите по порядку месяцев'}
            </h4>
            <p className="text-xs text-slate-400">
              {isArm 
                ? 'Սեղմիր ամիսների վրա՝ հունվարից մինչև դեկտեմբեր ճիշտ օրացուցային հաջորդականությամբ:' 
                : 'Нажимайте на слова, начиная с самых ранних в году до самых поздних.'}
            </p>
          </div>

          {/* TIMELINE STATE */}
          <div className="space-y-4 bg-slate-950/40 p-5 border border-slate-900 rounded-xl min-h-[160px] flex flex-col justify-center">
            <span className="text-xs text-amber-500/80 uppercase tracking-wider font-bold mb-2">
              {isArm ? 'Քո Ժամանակացույցը.' : 'Ваша Хронология:'}
            </span>

            {orderedList.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                {isArm ? 'Այստեղ կհայտնվեն քո դասավորած ամիսները...' : 'Здесь будут упорядоченные месяцы...'}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {orderedList.map((month, idx) => (
                  <div
                    key={month.id}
                    className="flex items-center gap-1 bg-gradient-to-r from-red-600/20 to-amber-500/20 border border-amber-500/30 text-amber-200 font-bold px-3 py-1.5 rounded-lg text-xs"
                  >
                    <span className="text-[10px] text-slate-400 font-mono">#{idx+1}</span>
                    <span className="capitalize">{month.spanish}</span>
                    <span className="text-[10px] opacity-75">
                      ({isArm ? month.armenian : month.russian})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SCRAMBLED CHOICE BANK */}
          <div className="space-y-2">
            <span className="text-xs text-slate-500 font-mono">
              {isArm ? 'Ընտրիր հաջորդ ճիշտ ամիսը.' : 'Выберите следующий подходящий месяц:'}
            </span>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {scrambledMonths.map((month) => {
                const isPlaced = orderedList.some(x => x.id === month.id);
                const isError = errorWord === month.id;

                if (isPlaced) return null;

                return (
                  <button
                    key={month.id}
                    onClick={() => handleSequenceClick(month)}
                    className={`px-4 py-3.5 border font-bold rounded-xl text-sm capitalize transition-all duration-300 ${
                      isError
                        ? 'bg-rose-950 border-rose-500 text-rose-300 animate-shake'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-700 hover:border-slate-500 text-white cursor-pointer active:scale-95'
                    }`}
                  >
                    <span>{month.spanish}</span>
                    <span className="text-[10px] block opacity-60 font-normal">
                      ({isArm ? month.armenian : month.russian})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SUCCESS MESSAGE */}
          {orderedList.length === scrambledMonths.length && scrambledMonths.length > 0 && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-200 rounded-xl text-center space-y-2 animate-fadeIn">
              <Zap className="w-8 h-8 text-amber-400 mx-auto" />
              <h4 className="font-bold text-base">{isArm ? 'Հիանալի է' : 'Отличная работа'}!</h4>
              <p className="text-xs text-slate-300">
                {isArm ? 'Դուք դասավորեցիք բոլոր ամիսները անթերի ժամանակագրությամբ:' : 'Вы успешно разложили все месяцы в хронологическом порядке.'}
              </p>
              <button
                onClick={initSequenceGame}
                className="mt-2 text-xs font-bold px-4 py-1.5 bg-gradient-to-r from-red-600 to-amber-500 text-white rounded-lg"
              >
                {isArm ? 'Կրկնել խաղը' : 'Повторить игру'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
