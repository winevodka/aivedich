import { motion } from 'framer-motion';
import { RefreshCw, Send } from 'lucide-react';
import { AnswerStatus } from '../hooks/usePuzzle';
import { AnimalId } from '../types/game';

interface AnswerPanelProps {
  selectedAnimal: AnimalId | null;
  status: AnswerStatus;
  onSubmit: () => void;
  onRegenerate: () => void;
}

export function AnswerPanel({
  selectedAnimal,
  status,
  onSubmit,
  onRegenerate,
}: AnswerPanelProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm font-bold text-[#243B40]/80">
        {status === 'wrong' ? (
          <span className="text-red-500">
            Chưa đúng rồi! Hãy dò kỹ lại đường đi nhé.
          </span>
        ) : status === 'correct' ? (
          <span className="text-[#1C7D88]">Chính xác! Tuyệt vời quá!</span>
        ) : selectedAnimal ? (
          <span>Đã chọn đáp án. Bấm kiểm tra để xem kết quả!</span>
        ) : (
          <span>Chọn 1 bạn thú bên trái để dự đoán ai tới đích.</span>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onRegenerate}
          className="inline-flex items-center justify-center gap-1.5 rounded-2xl border-2 border-[#A5D6C4] bg-white px-4 py-3 text-sm font-extrabold text-[#1C7D88] transition hover:bg-[#FFF8EA]"
          title="Tạo màn mới"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">Đổi bảng</span>
        </button>

        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={!selectedAnimal || status === 'correct'}
          whileHover={selectedAnimal ? { scale: 1.03 } : undefined}
          whileTap={selectedAnimal ? { scale: 0.97 } : undefined}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#FF7F6A] px-6 py-3 text-sm font-extrabold text-white shadow-card transition hover:bg-[#F26B55] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-initial"
        >
          <Send className="h-4 w-4" />
          Kiểm tra đáp án
        </motion.button>
      </div>
    </div>
  );
}