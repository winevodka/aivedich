import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';
import { ANIMALS, AnimalId } from '../types/game';

interface ResultModalProps {
  isOpen: boolean;
  winnerId: AnimalId;
  level: number;
  score: number;
  onNextLevel: () => void;
}

export function ResultModal({
  isOpen,
  winnerId,
  level,
  score,
  onNextLevel,
}: ResultModalProps) {
  const winner = ANIMALS.find((a) => a.id === winnerId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#243B40]/40 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 10 }}
            className="w-full max-w-sm rounded-3xl border-4 border-[#A5D6C4] bg-[#FFF8EA] p-6 text-center shadow-soft"
          >
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF7F6A]/15 text-4xl">
              {winner?.emoji}
            </div>
            <h2 className="text-2xl font-black text-[#243B40]">
              {winner?.name} đã tới đích!
            </h2>
            <p className="mt-1 text-sm font-bold text-[#243B40]/70">
              Hoàn thành màn {level} xuất sắc
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm">
              <Trophy className="h-5 w-5 text-[#FFB703]" />
              <span className="text-base font-extrabold text-[#1C7D88]">
                Tổng điểm: {score}
              </span>
            </div>

            <button
              type="button"
              onClick={onNextLevel}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF7F6A] px-6 py-3.5 text-base font-extrabold text-white shadow-card transition hover:bg-[#F26B55]"
            >
              Màn tiếp theo
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}