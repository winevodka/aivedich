import { Difficulty, DIFFICULTY_CONFIG } from '../types/game';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const LEVELS: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];

export function DifficultySelector({
  difficulty,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border-2 border-[#A5D6C4]/70 bg-white/80 p-1.5">
      {LEVELS.map((lvl) => {
        const active = difficulty === lvl;
        return (
          <button
            key={lvl}
            type="button"
            onClick={() => onChange(lvl)}
            className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all sm:text-sm ${
              active
                ? 'bg-[#1C7D88] text-white shadow-sm'
                : 'text-[#243B40]/75 hover:bg-[#FFF8EA] hover:text-[#243B40]'
            }`}
          >
            {DIFFICULTY_CONFIG[lvl].label}
          </button>
        );
      })}
    </div>
  );
}