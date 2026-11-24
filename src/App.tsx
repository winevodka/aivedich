import { Sparkles, Trophy } from 'lucide-react';
import { AnimalCard } from './components/AnimalCard';
import { AnswerPanel } from './components/AnswerPanel';
import { DifficultySelector } from './components/DifficultySelector';
import { PuzzleBoard } from './components/PuzzleBoard';
import { ResultModal } from './components/ResultModal';
import { usePuzzle } from './hooks/usePuzzle';
import { ANIMALS } from './types/game';

export function App() {
  const {
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
    regenerate,
  } = usePuzzle();

  const highlightedAnimalId =
    status === 'correct'
      ? puzzle.winnerId
      : status === 'wrong'
        ? selectedAnimal
        : null;

  return (
    <div className="min-h-screen bg-[#F7F5EF] px-3 py-4 sm:px-6 sm:py-5">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#1C7D88] sm:text-3xl">
              Ai sẽ tới đích?
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-2xl border-2 border-[#A5D6C4] bg-white px-3 py-1 text-xs font-extrabold sm:text-sm">
              <Sparkles className="h-4 w-4 text-[#FF7F6A]" />
              <span>Màn {level}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl border-2 border-[#A5D6C4] bg-white px-3 py-1 text-xs font-extrabold sm:text-sm">
              <Trophy className="h-4 w-4 text-[#FFB703]" />
              <span>
                {score} đ (Kỷ lục: {bestScore})
              </span>
            </div>
          </div>
        </header>

        {/* Difficulty Bar */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <DifficultySelector difficulty={difficulty} onChange={setDifficulty} />
          <span className="rounded-xl bg-[#A5D6C4]/35 px-3 py-1 text-xs font-extrabold text-[#1C7D88]">
            Số giao cắt: {puzzle.crossings.length}
          </span>
        </div>

        {/* Main Game Area: 4 Animals (non-clickable) + Board */}
        <main className="grid grid-cols-1 items-center gap-2 md:grid-cols-[96px_minmax(0,1fr)] md:gap-1.5">
          <aside className="grid grid-cols-4 gap-2 md:h-[min(68vh,600px)] md:grid-cols-1 md:grid-rows-4 md:gap-0">
            {ANIMALS.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </aside>

          <section className="flex w-full justify-start">
            <PuzzleBoard
              puzzle={puzzle}
              highlightedAnimalId={highlightedAnimalId}
              revealWinner={status === 'correct'}
            />
          </section>
        </main>

        {/* Bottom Answer Selection & Submit */}
        <AnswerPanel
          selectedAnimal={selectedAnimal}
          status={status}
          onSelectAnimal={handleSelectAnimal}
          onSubmit={handleSubmit}
          onRegenerate={regenerate}
        />
      </div>

      <ResultModal
        isOpen={showModal}
        winnerId={puzzle.winnerId}
        level={level}
        score={score}
        onNextLevel={handleNextLevel}
      />
    </div>
  );
}

export default App;