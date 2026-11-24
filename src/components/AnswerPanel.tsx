import { motion } from 'framer-motion';
import { RefreshCw, Send } from 'lucide-react';
import { AnswerStatus } from '../hooks/usePuzzle';
import { ANIMALS, AnimalId } from '../types/game';

interface AnswerPanelProps {
  selectedAnimal: AnimalId | null;
  status: AnswerStatus;
  onSelectAnimal: (animalId: AnimalId) => void;
  onSubmit: () => void;
  onRegenerate: () => void;
}

export function AnswerPanel({
  selectedAnimal,
  status,
  onSelectAnimal,
  onSubmit,
  onRegenerate,
}: AnswerPanelProps) {
  return (
    <div className="mx-auto mt-4 w-full max-w-2xl">
      <p className="mb-2.5 text-center text-sm font-bold text-[#4A6B6E]">
        Lần theo từng đường đi và chọn một người bạn nhé!
      </p>

      {/* 4 nút đáp án */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {ANIMALS.map((animal) => {
          const isSelected = selectedAnimal === animal.id;
          const isWrongSelected = status === 'wrong' && isSelected;

          return (
            <motion.button
              key={animal.id}
              type="button"
              onClick={() => onSelectAnimal(animal.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              animate={isWrongSelected ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: isWrongSelected ? 0.35 : 0.15 }}
              className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-3 py-2.5 text-sm font-extrabold transition-all sm:text-base ${
                isWrongSelected
                  ? 'border-red-400 bg-red-50 text-red-600'
                  : isSelected
                    ? 'border-[#FF7F6A] bg-[#FFF8EA] text-[#243B40] shadow-card ring-2 ring-[#FF7F6A]/30'
                    : 'border-[#A5D6C4] bg-white text-[#243B40] hover:border-[#1C7D88] hover:bg-[#FFF8EA]/70'
              }`}
            >
              <span className="text-xl">{animal.emoji}</span>
              <span>{animal.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Phản hồi & nút hành động */}
      <div className="mt-3.5 flex flex-col items-center justify-between gap-2.5 sm:flex-row">
        <div className="text-xs font-bold text-[#243B40]/75 sm:text-sm">
          {status === 'wrong' ? (
            <span className="text-red-500">
              Chưa đúng! Đường đi đã được làm nổi bật để bạn dò lại.
            </span>
          ) : status === 'correct' ? (
            <span className="text-[#1C7D88]">Chính xác! Bạn đã tìm đúng đường tới đích!</span>
          ) : selectedAnimal ? (
            <span>Đã chọn đáp án. Bấm &quot;Kiểm tra đáp án&quot; nhé!</span>
          ) : (
            <span>Hãy chọn một bạn thú ở trên.</span>
          )}
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl border-2 border-[#A5D6C4] bg-white px-3.5 py-2.5 text-xs font-extrabold text-[#1C7D88] transition hover:bg-[#FFF8EA] sm:text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Đổi bảng</span>
          </button>

          <motion.button
            type="button"
            onClick={onSubmit}
            disabled={!selectedAnimal || status === 'correct'}
            whileHover={selectedAnimal ? { scale: 1.03 } : undefined}
            whileTap={selectedAnimal ? { scale: 0.97 } : undefined}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#FF7F6A] px-5 py-2.5 text-xs font-extrabold text-white shadow-card transition hover:bg-[#F26B55] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-initial sm:text-sm"
          >
            <Send className="h-4 w-4" />
            <span>Kiểm tra đáp án</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}