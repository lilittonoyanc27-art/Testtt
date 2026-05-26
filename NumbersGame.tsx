import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NUMBERS_DATA, NumberGameItem } from './data';
import { ScoreState } from './types';
import { Award, RefreshCw, CheckCircle2, XCircle, Grid, Play } from 'lucide-react';

interface NumbersGameProps {
  score: ScoreState;
  onUpdateScore: (correct: boolean) => void;
  language: 'arm' | 'rus';
}

interface MatchCard {
  id: string;
  val: string;
  type: 'spanish' | 'number';
  matchId: number;
}

export default function NumbersGame({ score, onUpdateScore, language }: NumbersGameProps) {
  const isArm = language === 'arm';
  const [activeTab, setActiveTab] = useState<'quiz' | 'match'>('quiz');

  // QUIZ STATE
  const [currentItem, setCurrentItem] = useState<NumberGameItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswersCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // MATCH STATE
  const [matchCards, setMatchCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]); // holds ids
  const [matchedIds, setMatchedIds] = useState<number[]>([]); // holds item numbers
  const [matchCount, setMatchCount] = useState(0);

  // Initialize Quiz Question
  const generateNewQuizQuestion = () => {
    const randomIndex = Math.floor(Math.random() * NUMBERS_DATA.length);
    const item = NUMBERS_DATA[randomIndex];
    setCurrentItem(item);
    setSelectedOption(null);
    setIsAnswerCorrect(null);

    // Generate 4 unique options including the correct answer
    const otherOptions = NUMBERS_DATA
      .filter(x => x.spanish !== item.spanish)
      .map(x => x.spanish);
    
    // Shuffle and pick 3 other options
    const shuffledOthers = [...otherOptions].sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [...shuffledOthers, item.spanish].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  // Initialize Match grid
  const initMatchGame = () => {
    setSelectedCards([]);
    setMatchedIds([]);
    setMatchCount(0);
    // Grab 5 random numbers
    const items = [...NUMBERS_DATA].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    const cards: MatchCard[] = [];
    items.forEach((item) => {
      // Spanish card
      cards.push({
        id: `es-${item.num}`,
        val: item.spanish,
        type: 'spanish',
        matchId: item.num,
      });
      // Digit representation card
      cards.push({
        id: `num-${item.num}`,
        val: isArm 
          ? `${item.num} (հայերեն: ${item.armenian})` 
          : `${item.num} (${item.russian})`,
        type: 'number',
        matchId: item.num,
      });
    });

    // Shuffle cards
    setMatchCards(cards.sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    generateNewQuizQuestion();
    initMatchGame();
  }, [language]);

  const handleQuizAnswer = (option: string) => {
    if (selectedOption !== null || !currentItem) return;
    setSelectedOption(option);
    const correct = option === currentItem.spanish;
    setIsAnswerCorrect(correct);
    onUpdateScore(correct);
  };

  const handleCardClick = (card: MatchCard) => {
    if (matchedIds.includes(card.matchId) || selectedCards.includes(card.id)) return;
    
    const nextSelected = [...selectedCards, card.id];
    
    if (nextSelected.length === 1) {
      setSelectedCards(nextSelected);
    } else if (nextSelected.length === 2) {
      setSelectedCards(nextSelected);
      
      const c1 = matchCards.find(c => c.id === nextSelected[0])!;
      const c2 = matchCards.find(c => c.id === nextSelected[1])!;
      
      if (c1.matchId === c2.matchId && c1.type !== c2.type) {
        // Correct pair!
        setTimeout(() => {
          setMatchedIds(prev => [...prev, c1.matchId]);
          setSelectedCards([]);
          onUpdateScore(true);
          const newMatchCount = matchCount + 1;
          setMatchCount(newMatchCount);
          if (newMatchCount === 5) {
            // Completed matching
          }
        }, 300);
      } else {
        // Incorrect pair
        setTimeout(() => {
          setSelectedCards([]);
          onUpdateScore(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Game Mode Selector */}
      <div className="flex border-b border-slate-800 pb-px">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all pb-3.5 ${
            activeTab === 'quiz'
              ? 'border-amber-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Play className="w-4 h-4 text-amber-500" />
          {isArm ? 'Թեստ-Ընտրություն' : 'Тест-Викторина'}
        </button>
        <button
          onClick={() => {
            setActiveTab('match');
            initMatchGame();
          }}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all pb-3.5 ${
            activeTab === 'match'
              ? 'border-amber-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid className="w-4 h-4 text-red-500" />
          {isArm ? 'Զույգերի Միացում' : 'Сопоставление'}
        </button>
      </div>

      {activeTab === 'quiz' && currentItem && (
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-semibold font-mono tracking-widest text-slate-400">
              {isArm ? 'Ի՞նչպես կլինի իսպաներեն.' : 'Как будет по-испански:'}
            </span>
            <div className="flex justify-center items-center gap-4">
              <span className="text-5xl font-black text-amber-500 font-mono select-none">
                {currentItem.num}
              </span>
              <span className="text-slate-300 text-2xl font-bold">
                ({isArm ? currentItem.armenian : currentItem.russian})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.map((option) => {
              const isSelected = selectedOption === option;
              const isCorrectTarget = currentItem.spanish === option;
              let btnClass = 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200';
              
              if (selectedOption !== null) {
                if (isCorrectTarget) {
                  btnClass = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300';
                } else if (isSelected) {
                  btnClass = 'bg-rose-950/60 border-rose-500/80 text-rose-300';
                } else {
                  btnClass = 'bg-slate-950/20 border-slate-900/40 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={option}
                  disabled={selectedOption !== null}
                  onClick={() => handleQuizAnswer(option)}
                  className={`p-4 border text-lg font-bold rounded-xl transition-all flex justify-between items-center ${btnClass}`}
                >
                  <span className="capitalize">{option}</span>
                  {selectedOption !== null && isCorrectTarget && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  )}
                  {selectedOption !== null && isSelected && !isCorrectTarget && (
                    <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="pt-4 border-t border-slate-900 flex justify-between items-center bg-slate-900/20 p-4 rounded-xl">
              <div className="text-sm">
                <span className="font-bold flex items-center gap-1.5 text-slate-300">
                  {isAnswersCorrect ? (
                    <span className="text-emerald-500">✓ {isArm ? 'Ճիշտ է' : 'Правильно'}!</span>
                  ) : (
                    <span className="text-rose-500">✗ {isArm ? 'Սխալ է' : 'Неверно'}!</span>
                  )}
                </span>
                <p className="text-slate-400 mt-1">
                  {isArm ? 'Ճիշտ պատասխանն էր.' : 'Правильный ответ:'} <strong className="text-amber-500 capitalize">{currentItem.spanish}</strong>
                </p>
              </div>
              <button
                onClick={generateNewQuizQuestion}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-500 font-bold text-white rounded-lg text-xs hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {isArm ? 'Հաջորդը' : 'Дальше'}
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'match' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-slate-900/40 border border-slate-900/60 rounded-xl">
            <span className="text-xs text-slate-400">
              {isArm 
                ? 'Միացրու իսպաներեն թիվը նրա համապատասխան թվանշանի հետ.' 
                : 'Соедините заголовок числа на испанском с его цифрой.'}
            </span>
            <button
              onClick={initMatchGame}
              className="p-1 px-3 bg-slate-800 text-slate-300 font-semibold text-xs rounded hover:bg-slate-700 transition"
            >
              {isArm ? 'Թարմացնել' : 'Обновить'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {matchCards.map((card) => {
              const isMatched = matchedIds.includes(card.matchId);
              const isSelected = selectedCards.includes(card.id);
              
              let cardStyle = 'border-slate-800 bg-slate-900/40 text-slate-300 cursor-pointer hover:border-slate-700';
              if (isMatched) {
                cardStyle = 'border-emerald-500/30 bg-emerald-950/20 text-emerald-500/50 pointer-events-none line-through';
              } else if (isSelected) {
                cardStyle = 'border-amber-500 bg-amber-500/10 text-white';
              }

              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`p-4 border text-center rounded-xl font-bold h-24 flex items-center justify-center transition-all text-sm md:text-base ${cardStyle}`}
                  disabled={isMatched}
                >
                  <span className="capitalize leading-snug">{card.val}</span>
                </button>
              );
            })}
          </div>

          {matchedIds.length === 5 && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 rounded-xl text-center space-y-3">
              <Award className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
              <div>
                <h4 className="font-bold text-lg">{isArm ? 'Շնորհավորո՛ւմ ենք' : 'Поздравляем'}!</h4>
                <p className="text-sm mt-0.5">{isArm ? 'Դուք անսխալ միացրիք բոլոր թվերը:' : 'Вы успешно нашли соответствие для всех чисел.'}</p>
              </div>
              <button
                onClick={initMatchGame}
                className="mx-auto px-4 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-500 transition-colors"
              >
                {isArm ? 'Խաղալ նորից' : 'Играть снова'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
