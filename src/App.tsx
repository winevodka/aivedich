import { Trophy, Sparkles } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-[#F7F5EF] px-3 py-4 sm:px-6 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#1C7D88] sm:text-3xl">
              Ai sẽ tới đích?
            </h1>
            <p className="text-xs font-bold text-[#243B40]/70 sm:text-sm">
              Dò theo đường dây và tìm bạn thú về đích duy nhất!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 rounded-2xl border-2 border-[#A5D6C4] bg-white px-3.5 py-1.5 text-xs font-extrabold sm:text-sm">
              <Sparkles className="h-4 w-4 text-[#FF7F6A]" />
              <span>Màn {level}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl border-2 border-[#A5D6C4] bg-white px-3.5 py-1.5 text-xs font-extrabold sm:text-sm">
              <Trophy className="h-4 w-4 text-[#FFB703]" />
              <span>
                {score} đ (Kỷ lục: {bestScore})
              </span>
            </div>
          </div>
        </header>

        {/* Difficulty Bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <DifficultySelector difficulty={difficulty} onChange={setDifficulty} />
          <span className="rounded-xl bg-[#A5D6C4]/35 px-3 py-1.5 text-xs font-extrabold text-[#1C7D88]">
            Số giao cắt: {puzzle.crossings.length}
          </span>
        </div>

        {/* Main Game Area */}
        <main className="grid grid-cols-1 items-center gap-4 md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] lg:gap-6">
          {/* Left: 4 Animal Avatars */}
          <aside className="grid grid-cols-2 gap-2.5 md:grid-cols-1 md:gap-3.5">
            {ANIMALS.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                isSelected={selectedAnimal === animal.id}
                isWrong={status === 'wrong' && selectedAnimal === animal.id}
                isWinnerRevealed={
                  status === 'correct' && puzzle.winnerId === animal.id
                }
                onSelect={() => handleSelectAnimal(animal.id)}
              />
            ))}
          </aside>

          {/* Right: Square SVG Puzzle Board */}
          <section className="w-full">
            <PuzzleBoard
              puzzle={puzzle}
              selectedAnimal={selectedAnimal}
              revealWinner={status === 'correct'}
            />
          </section>
        </main>

        {/* Bottom Action Panel */}
        <footer className="mt-5 rounded-3xl border-2 border-[#A5D6C4]/80 bg-white/80 p-4 shadow-sm">
          <AnswerPanel
            selectedAnimal={selectedAnimal}
            status={status}
            onSubmit={handleSubmit}
            onRegenerate={regenerate}
          />
        </footer>
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