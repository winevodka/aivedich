import { AnimalId, ANIMALS, Difficulty, DIFFICULTY_CONFIG, Point } from '../types/game';

export const BOARD_SIZE = 600;
export const FINISH_POINT: Point = { x: 552, y: 540 };

export const START_Y_POSITIONS: Record<AnimalId, number> = {
  rabbit: 105,
  cat: 225,
  dog: 345,
  bear: 465,
};

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface RawAnimalWaypoints {
  animalId: AnimalId;
  waypoints: Point[];
  isWinner: boolean;
}

export function generateAnimalWaypoints(
  difficulty: Difficulty,
  winnerId: AnimalId
): RawAnimalWaypoints[] {
  const targetCrossings = DIFFICULTY_CONFIG[difficulty].targetCrossings;
  const columns = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : difficulty === 'hard' ? 8 : 10;

  const startX = 28;
  const endX = 512;
  const stepX = (endX - startX) / columns;

  const laneYs = [90, 210, 330, 450];
  const animalIds = ANIMALS.map((a) => a.id);

  const waypointsMap: Record<AnimalId, Point[]> = {
    rabbit: [{ x: startX, y: START_Y_POSITIONS.rabbit }],
    cat: [{ x: startX, y: START_Y_POSITIONS.cat }],
    dog: [{ x: startX, y: START_Y_POSITIONS.dog }],
    bear: [{ x: startX, y: START_Y_POSITIONS.bear }],
  };

  for (let col = 1; col <= columns; col++) {
    const shuffledLanes = shuffleArray(laneYs);
    const xBase = startX + col * stepX;

    animalIds.forEach((id, idx) => {
      const jitterX = col === columns ? 0 : randomRange(-stepX * 0.22, stepX * 0.22);
      const jitterY = randomRange(-36, 36);
      const yVal = Math.max(55, Math.min(525, shuffledLanes[idx] + jitterY));

      waypointsMap[id].push({
        x: Math.max(startX + 20, Math.min(endX, xBase + jitterX)),
        y: yVal,
      });
    });
  }

  // Add extra detours for higher difficulties to boost crossing density
  if (targetCrossings >= 25) {
    animalIds.forEach((id) => {
      const pts = waypointsMap[id];
      const midIndex = Math.floor(pts.length / 2);
      const midPt = pts[midIndex];
      const detourY = midPt.y > 300 ? randomRange(70, 220) : randomRange(340, 500);
      pts.splice(midIndex, 0, {
        x: Math.max(70, midPt.x - 18),
        y: detourY,
      });
    });
  }

  // Dead-end positions for non-winning animals (away from finish flag)
  const deadEndCandidates: Point[] = shuffleArray([
    { x: 485, y: 85 },
    { x: 520, y: 185 },
    { x: 470, y: 295 },
    { x: 515, y: 395 },
    { x: 420, y: 525 },
  ]);

  let deadEndIdx = 0;

  return animalIds.map((id) => {
    const isWinner = id === winnerId;
    const pts = waypointsMap[id];

    if (isWinner) {
      pts.push({ x: 530, y: 515 });
      pts.push({ ...FINISH_POINT });
    } else {
      const deadEnd = deadEndCandidates[deadEndIdx % deadEndCandidates.length];
      deadEndIdx += 1;
      pts.push({
        x: deadEnd.x + randomRange(-10, 10),
        y: deadEnd.y + randomRange(-10, 10),
      });
    }

    return {
      animalId: id,
      waypoints: pts,
      isWinner,
    };
  });
}