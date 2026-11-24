export type AnimalId = 'rabbit' | 'cat' | 'dog' | 'bear';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface AnimalInfo {
  id: AnimalId;
  name: string;
  emoji: string;
  accentColor: string;
  bgTint: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface CubicBezierSegment {
  p0: Point;
  c1: Point;
  c2: Point;
  p1: Point;
}

export interface AnimalPath {
  animalId: AnimalId;
  segments: CubicBezierSegment[];
  isWinner: boolean;
  startPoint: Point;
  endPoint: Point;
}

export interface Crossing {
  id: string;
  point: Point;
  topAnimalId: AnimalId;
  bottomAnimalId: AnimalId;
  topAngleRad: number;
  bottomAngleRad: number;
  topSegmentIndex: number;
  bottomSegmentIndex: number;
  topT: number;
  bottomT: number;
}

export interface RenderedPathPiece {
  id: string;
  animalId: AnimalId;
  d: string;
  layer: 'under' | 'over';
}

export interface BridgeArc {
  id: string;
  animalId: AnimalId;
  d: string;
  underlayD: string;
}

export interface PuzzleData {
  level: number;
  difficulty: Difficulty;
  winnerId: AnimalId;
  finishPoint: Point;
  paths: AnimalPath[];
  crossings: Crossing[];
  renderedPieces: RenderedPathPiece[];
  bridges: BridgeArc[];
}

export const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; targetCrossings: number; points: number }
> = {
  easy: { label: 'Dễ', targetCrossings: 8, points: 10 },
  medium: { label: 'Trung bình', targetCrossings: 15, points: 20 },
  hard: { label: 'Khó', targetCrossings: 25, points: 35 },
  expert: { label: 'Chuyên gia', targetCrossings: 35, points: 50 },
};

export const ANIMALS: AnimalInfo[] = [
  {
    id: 'rabbit',
    name: 'Thỏ',
    emoji: '🐰',
    accentColor: '#FF8FA3',
    bgTint: '#FFF0F3',
  },
  {
    id: 'cat',
    name: 'Mèo',
    emoji: '🐱',
    accentColor: '#FFB703',
    bgTint: '#FFF8E1',
  },
  {
    id: 'dog',
    name: 'Chó',
    emoji: '🐶',
    accentColor: '#8ECAE6',
    bgTint: '#EDF8FC',
  },
  {
    id: 'bear',
    name: 'Gấu',
    emoji: '🐻',
    accentColor: '#C98A5B',
    bgTint: '#F9F1EB',
  },
];