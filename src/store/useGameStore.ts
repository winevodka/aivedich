import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AnimalId, Difficulty } from '../types/game';

interface GameState {
  level: number;
  score: number;
  bestScore: number;
  selectedAnimal: AnimalId | null;
  difficulty: Difficulty;
  setSelectedAnimal: (animal: AnimalId | null) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  recordWin: (points: number) => void;
  nextLevel: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      level: 1,
      score: 0,
      bestScore: 0,
      selectedAnimal: null,
      difficulty: 'easy',
      setSelectedAnimal: (animal) => set({ selectedAnimal: animal }),
      setDifficulty: (difficulty) => set({ difficulty, selectedAnimal: null }),
      recordWin: (points) =>
        set((state) => {
          const newScore = state.score + points;
          return {
            score: newScore,
            bestScore: Math.max(state.bestScore, newScore),
          };
        }),
      nextLevel: () =>
        set((state) => ({
          level: state.level + 1,
          selectedAnimal: null,
        })),
      resetGame: () =>
        set({
          level: 1,
          score: 0,
          selectedAnimal: null,
        }),
    }),
    {
      name: 'ai-se-toi-dich-storage',
    }
  )
);