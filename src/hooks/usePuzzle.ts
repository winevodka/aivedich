import { useCallback, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { generatePuzzle } from '../game/PuzzleGenerator';
import { useGameStore } from '../store/useGameStore';
import { AnimalId, DIFFICULTY_CONFIG, PuzzleData } from '../types/game';

export type AnswerStatus = 'idle' | 'correct' | 'wrong';

export function usePuzzle() {
  const {
    level,
    score,
    bestScore,
    selectedAnimal,
    difficulty,
    setSelectedAnimal,
    setDifficulty,
    recordWin,
    nextLevel,
  } = useGameStore();

  const [puzzle, setPuzzle] = useState<PuzzleData>(() =>
    generatePuzzle(level, difficulty)
  );
  const [status, setStatus] = useState<AnswerStatus>('idle');
  const [showModal, setShowModal] = useState(false);

  const rebuildPuzzle = useCallback(
    (targetLevel: number, targetDifficulty = difficulty) => {
      setPuzzle(generatePuzzle(targetLevel, targetDifficulty));
      setStatus('idle');
      setShowModal(false);
      setSelectedAnimal(null);
    },
    [difficulty, setSelectedAnimal]
  );

  useEffect(() => {
    rebuildPuzzle(level, difficulty);
  }, [level, difficulty, rebuildPuzzle]);

  const handleSelectAnimal = (animalId: AnimalId) => {
    if (status === 'correct') return;
    setSelectedAnimal(animalId);
    if (status === 'wrong') {
      setStatus('idle');
    }
  };

  const handleSubmit = () => {
    if (!selectedAnimal || status === 'correct') return;

    if (selectedAnimal === puzzle.winnerId) {
      setStatus('correct');
      recordWin(DIFFICULTY_CONFIG[difficulty].points);
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF7F6A', '#1C7D88', '#A5D6C4', '#FFB703'],
      });
      setTimeout(() => {
        setShowModal(true);
      }, 650);
    } else {
      setStatus('wrong');
    }
  };

  const handleNextLevel = () => {
    nextLevel();
  };

  return {
    puzzle,
    level,
    score,
    bestScore,
    difficulty,
    selectedAnimal,
    status,
    showModal,
    setDifficulty,
    handleSelectAnimal,
    handleSubmit,
    handleNextLevel,
    regenerate: () => rebuildPuzzle(level, difficulty),
  };
}