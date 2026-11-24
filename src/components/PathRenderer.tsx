import { motion } from 'framer-motion';
import { AnimalId, PuzzleData } from '../types/game';

interface PathRendererProps {
  puzzle: PuzzleData;
  highlightAnimal: AnimalId | null;
  revealWinner: boolean;
}

export function PathRenderer({
  puzzle,
  highlightAnimal,
  revealWinner,
}: PathRendererProps) {
  return (
    <g>
      {/* Layer 1: Under path segments (with gaps cut beneath crossings) */}
      {puzzle.renderedPieces.map((piece) => {
        const isHighlighted =
          (revealWinner && piece.animalId === puzzle.winnerId) ||
          highlightAnimal === piece.animalId;

        return (
          <path
            key={piece.id}
            d={piece.d}
            fill="none"
            stroke={isHighlighted ? '#FF7F6A' : '#1C7D88'}
            strokeWidth={isHighlighted ? 6.5 : 5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={highlightAnimal && !isHighlighted ? 0.45 : 1}
            className="transition-all duration-200"
          />
        );
      })}

      {/* Layer 2: Over-under bridge arcs */}
      {puzzle.bridges.map((bridge) => {
        const isHighlighted =
          (revealWinner && bridge.animalId === puzzle.winnerId) ||
          highlightAnimal === bridge.animalId;

        return (
          <g key={bridge.id}>
            {/* Soft board-colored halo to separate overlapping cables */}
            <path
              d={bridge.underlayD}
              fill="none"
              stroke="#FFF8EA"
              strokeWidth={11}
              strokeLinecap="round"
            />
            <path
              d={bridge.d}
              fill="none"
              stroke={isHighlighted ? '#FF7F6A' : '#1C7D88'}
              strokeWidth={isHighlighted ? 6.5 : 5}
              strokeLinecap="round"
              opacity={highlightAnimal && !isHighlighted ? 0.45 : 1}
              className="transition-all duration-200"
            />
          </g>
        );
      })}

      {/* Start & Dead-end nodes */}
      {puzzle.paths.map((p) => (
        <g key={`nodes-${p.animalId}`}>
          <circle
            cx={p.startPoint.x}
            cy={p.startPoint.y}
            r={6}
            fill="#1C7D88"
            stroke="#FFF8EA"
            strokeWidth={2.5}
          />
          {!p.isWinner && (
            <circle
              cx={p.endPoint.x}
              cy={p.endPoint.y}
              r={5}
              fill="#A5D6C4"
              stroke="#1C7D88"
              strokeWidth={2}
            />
          )}
        </g>
      ))}

      {/* Finish Flag at bottom-right */}
      <motion.g
        initial={{ scale: 0.9 }}
        animate={{ scale: revealWinner ? [1, 1.18, 1] : 1 }}
        transition={{ duration: 0.4 }}
        transform={`translate(${puzzle.finishPoint.x}, ${puzzle.finishPoint.y})`}
      >
        <circle
          r={22}
          fill="#FF7F6A"
          fillOpacity={0.18}
          stroke="#FF7F6A"
          strokeWidth={2}
          strokeDasharray="4 3"
        />
        <circle r={14} fill="#FF7F6A" />
        <text
          x={0}
          y={5}
          textAnchor="middle"
          fontSize="16"
          role="img"
          aria-label="Đích"
        >
          🏁
        </text>
      </motion.g>
    </g>
  );
}