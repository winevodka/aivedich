import { ANIMALS, Difficulty, DIFFICULTY_CONFIG, PuzzleData } from '../types/game';
import { buildAnimalPaths } from './BezierBuilder';
import { buildBridgesAndCutPaths } from './BridgeRenderer';
import { detectCrossings } from './IntersectionDetector';
import { FINISH_POINT, generateAnimalWaypoints } from './PathGenerator';

export function generatePuzzle(level: number, difficulty: Difficulty): PuzzleData {
  const target = DIFFICULTY_CONFIG[difficulty].targetCrossings;
  const maxAttempts = 14;

  let bestPuzzle: PuzzleData | null = null;
  let bestDiff = Infinity;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const winnerId = ANIMALS[Math.floor(Math.random() * ANIMALS.length)].id;
    const rawWaypoints = generateAnimalWaypoints(difficulty, winnerId);
    const paths = buildAnimalPaths(rawWaypoints);
    const crossings = detectCrossings(paths);

    const diff = Math.abs(crossings.length - target);
    if (diff < bestDiff) {
      bestDiff = diff;
      const { renderedPieces, bridges } = buildBridgesAndCutPaths(paths, crossings);
      bestPuzzle = {
        level,
        difficulty,
        winnerId,
        finishPoint: FINISH_POINT,
        paths,
        crossings,
        renderedPieces,
        bridges,
      };
    }

    if (diff <= 2) {
      break;
    }
  }

  return bestPuzzle as PuzzleData;
}