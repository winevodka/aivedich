import { BOARD_SIZE } from '../game/PathGenerator';
import { AnimalId, PuzzleData } from '../types/game';
import { PathRenderer } from './PathRenderer';

interface PuzzleBoardProps {
  puzzle: PuzzleData;
  selectedAnimal: AnimalId | null;
  revealWinner: boolean;
}

export function PuzzleBoard({
  puzzle,
  selectedAnimal,
  revealWinner,
}: PuzzleBoardProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border-4 border-[#A5D6C4] bg-[#FFF8EA] shadow-soft">
      <svg
        viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
        className="h-full w-full select-none"
        role="img"
        aria-label="Bảng dò đường tới đích"
      >
        <defs>
          <pattern
            id="soft-dots"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="14" cy="14" r="1.3" fill="#A5D6C4" fillOpacity="0.45" />
          </pattern>
        </defs>
        <rect width={BOARD_SIZE} height={BOARD_SIZE} fill="url(#soft-dots)" />
        <PathRenderer
          puzzle={puzzle}
          highlightAnimal={selectedAnimal}
          revealWinner={revealWinner}
        />
      </svg>
    </div>
  );
}