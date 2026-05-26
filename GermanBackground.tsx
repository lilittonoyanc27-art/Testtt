import { useState } from 'react';
import { motion } from 'motion/react';
import { Palette, Info } from 'lucide-react';

export type BgTheme = 'berlin-dark' | 'bavarian-flow' | 'rhine-harmony';

interface GermanBackgroundProps {
  theme: BgTheme;
  onChangeTheme: (theme: BgTheme) => void;
}

export default function GermanBackground({ theme, onChangeTheme }: GermanBackgroundProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden select-none transition-colors duration-1000 bg-slate-950">
      {/* Theme Option 1: Berlin Dark Slate (Ultra clean premium dark with German accent lines) */}
      {theme === 'berlin-dark' && (
        <div className="absolute inset-0">
          {/* Subtle colored spotlight blur circles resembling German colors */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] rounded-full bg-red-600/10 blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-amber-500/10 blur-[130px]" />
          <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vh] rounded-full bg-yellow-600/5 blur-[150px]" />
          
          {/* Minimalist Grid lines with premium red-gold crossing paths */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        </div>
      )}

      {/* Theme Option 2: Bavarian Flow (Active glowing German colors: gold-red-black) */}
      {theme === 'bavarian-flow' && (
        <div className="absolute inset-0 bg-slate-950">
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-amber-500/20 blur-[120px]" 
          />
          <motion.div 
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.3, 0.2],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-[5%] right-[15%] w-[550px] h-[550px] rounded-full bg-red-600/20 blur-[140px]" 
          />
          <motion.div 
            animate={{
              opacity: [0.08, 0.15, 0.08],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute top-[30%] left-[40%] w-[650px] h-[650px] rounded-full bg-slate-900/40 blur-[100px]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>
      )}

      {/* Theme Option 3: Romantic Rhine Harmony (Stylized castle outline & flag stripe shadows) */}
      {theme === 'rhine-harmony' && (
        <div className="absolute inset-0 bg-zinc-950">
          {/* Custom vector architectural elements */}
          <div className="absolute inset-x-0 bottom-0 h-96 opacity-[0.06] bg-no-repeat bg-bottom bg-contain" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600' fill='%23ffffff'%3E%3Cpath d='M0,600 L1200,600 L1200,450 L1150,420 L1100,450 L1080,380 L1040,380 L1020,450 L950,450 L900,380 L850,380 L800,450 L700,450 L650,300 L600,300 L550,450 L480,450 L450,350 L400,350 L370,450 L300,450 L250,380 L200,380 L150,450 L80,450 L50,390 L0,450 Z' /%3E%3C/svg%3E")`
          }} />
          {/* Subtle triple color bands symbolizing Black, Red, Gold horizontally across screen top */}
          <div className="absolute top-0 inset-x-0 h-4 bg-black/40" />
          <div className="absolute top-4 inset-x-0 h-4 bg-red-600/20" />
          <div className="absolute top-8 inset-x-0 h-4 bg-amber-500/20" />
          
          <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-red-600/10 blur-[80px]" />
          <div className="absolute top-[45%] right-[25%] w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px]" />
        </div>
      )}

      {/* Interactive Quick Floating Theme Selector Panel */}
      <div className="absolute bottom-6 right-6 z-40 flex items-center gap-2">
        <div className="relative">
          {showTooltip && (
            <div className="absolute bottom-full right-0 mb-2 p-3 bg-slate-950/90 border border-slate-800 text-slate-200 text-xs rounded-lg shadow-xl w-60 backdrop-blur-md pointer-events-none">
              <span className="font-semibold text-amber-500">🇩🇪 «Գերմանական Ֆոն» / Немецкий фон</span>
              <p className="mt-1 text-[10px] leading-relaxed text-slate-300">
                Մենք ստեղծել ենք 3 շքեղ թեմաներ՝ ներշնչված Գերմանիայի դրոշի և գեղագիտության գույներով (սև, կարմիր, ոսկեգույն):
              </p>
            </div>
          )}
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="p-2.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 rounded-full text-slate-400 hover:text-slate-100 transition-colors shadow-lg backdrop-blur-md"
            aria-label="Background Info"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/60 border border-slate-800 rounded-full shadow-lg backdrop-blur-md">
          <Palette className="w-4 h-4 text-amber-500 mx-1.5 opacity-70" />
          {(['berlin-dark', 'bavarian-flow', 'rhine-harmony'] as BgTheme[]).map((t) => (
            <button
              key={t}
              onClick={() => onChangeTheme(t)}
              className={`px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase transition-all duration-300 ${
                theme === t
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {t.split('-')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
