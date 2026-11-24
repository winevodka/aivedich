import { motion } from 'framer-motion';
import { AnimalInfo } from '../types/game';

interface AnimalCardProps {
  animal: AnimalInfo;
  isSelected: boolean;
  isWrong: boolean;
  isWinnerRevealed: boolean;
  onSelect: () => void;
}

export function AnimalCard({
  animal,
  isSelected,
  isWrong,
  isWinnerRevealed,
  onSelect,
}: AnimalCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.05, x: 3 }}
      whileTap={{ scale: 0.96 }}
      animate={
        isWrong
          ? { x: [0, -8, 8, -6, 6, 0] }
          : isSelected
            ? { scale: 1.04 }
            : { scale: 1 }
      }
      transition={{ duration: isWrong ? 0.38 : 0.2 }}
      className={`group relative flex w-full items-center gap-2.5 rounded-2xl border-2 px-3 py-2.5 text-left transition-colors sm:px-3.5 sm:py-3 ${
        isWinnerRevealed
          ? 'border-[#1C7D88] bg-[#A5D6C4]/30 shadow-card'
          : isWrong
            ? 'border-red-400 bg-red-50'
            : isSelected
              ? 'border-[#FF7F6A] bg-[#FFF8EA] shadow-card ring-2 ring-[#FF7F6A]/30'
              : 'border-[#A5D6C4]/70 bg-white/90 hover:border-[#1C7D88]/60 hover:bg-[#FFF8EA]'
      }`}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-2xl shadow-sm sm:h-11 sm:w-11"
        style={{ backgroundColor: animal.bgTint }}
      >
        {animal.emoji}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold text-[#243B40] sm:text-base">
          {animal.name}
        </p>
        <p className="text-[11px] font-semibold text-[#243B40]/60">
          {isWinnerRevealed
            ? 'Tới đích!'
            : isSelected
              ? 'Đang chọn'
              : 'Chọn bạn này'}
        </p>
      </div>
    </motion.button>
  );
}