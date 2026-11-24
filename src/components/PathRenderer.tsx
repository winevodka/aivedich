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
            r={7}
            fill="#FFF8EA"
            stroke={
              (revealWinner && p.isWinner) || highlightAnimal === p.animalId
                ? '#FF7F6A'
                : '#1C7D88'
            }
            strokeWidth={3.5}
          />
          {!p.isWinner && (
            <circle
              cx={p.endPoint.x}
              cy={p.endPoint.y}
              r={5.5}
              fill="#FFF8EA"
              stroke="#1C7D88"
              strokeWidth={3}
            />
          )}
        </g>
      ))}

      {/* Finish Flag + ĐÍCH badge at bottom-right */}
      <g transform={`translate(${puzzle.finishPoint.x}, ${puzzle.finishPoint.y})`}>
        <motion.g
          initial={{ scale: 0.94 }}
          animate={{ scale: revealWinner ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 0.35 }}
        >
          {/* Flagpole */}
          <line
            x1={0}
            y1={-34}
            x2={0}
            y2={12}
            stroke="#D9822B"
            strokeWidth={4.5}
            strokeLinecap="round"
          />
          {/* Base */}
          <ellipse cx={0} cy={13} rx={13} ry={4.5} fill="#E6A13C" />

          {/* Checkered Flag (2 rows x 4 cols) */}
          <g transform="translate(2, -34)">
            {[0, 1].map((row) =>
              [0, 1, 2, 3].map((col) => {
                const isRed = (row + col) % 2 === 0;
                const waveY = Math.sin(col * 0.7) * 2 + row * 7.5;
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={col * 6.5}
                    y={waveY}
                    width={6.5}
                    height={7.5}
                    fill={isRed ? '#FF5A4E' : '#FFFFFF'}
                    stroke="#E55347"
                    strokeWidth={0.4}
                  />
                );
              })
            )}
          </g>

          {/* ĐÍCH pill */}
          <rect
            x={-24}
            y={20}
            width={48}
            height={20}
            rx={10}
            fill="#FAD4CE"
          />
          <text
            x={0}
            y={34}
            textAnchor="middle"
            fontSize="11"
            fontWeight="900"
            fill="#D9534F"
          >
            ĐÍCH
          </text>
        </motion.g>
      </g>
    </g>
  );
}