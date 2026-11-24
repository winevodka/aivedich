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
      whileHover={{ scale: 1.04, x: 2 }}
      whileTap={{ scale: 0.96 }}
      animate={
        isWrong
          ? { x: [0, -8, 8, -6, 6, 0] }
          : isSelected
            ? { scale: 1.03 }
            : { scale: 1 }
      }
      transition={{ duration: isWrong ? 0.38 : 0.2 }}
      className={`group flex w-full flex-col items-center justify-center rounded-2xl border-2 px-2 py-2 text-center transition-colors sm:px-3 sm:py-2.5 ${
        isWinnerRevealed
          ? 'border-[#1C7D88] bg-[#A5D6C4]/35 shadow-card'
          : isWrong
            ? 'border-red-400 bg-red-50'
            : isSelected
              ? 'border-[#FF7F6A] bg-[#FFF8EA] shadow-card ring-2 ring-[#FF7F6A]/30'
              : 'border-[#A5D6C4]/70 bg-white/95 hover:border-[#1C7D88]/60 hover:bg-[#FFF8EA]'
      }`}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-2xl text-2xl shadow-sm sm:h-12 sm:w-12 sm:text-3xl"
        style={{ backgroundColor: animal.bgTint }}
      >
        {animal.emoji}
      </span>
      <span
        className="mt-1.5 rounded-full px-3 py-0.5 text-xs font-black sm:text-sm"
        style={{
          backgroundColor: animal.bgTint,
          color: '#243B40',
        }}
      >
        {animal.name}
      </span>
    </motion.button>
  );
}