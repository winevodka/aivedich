import { AnimalInfo } from '../types/game';

interface AnimalCardProps {
  animal: AnimalInfo;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center select-none"
      aria-label={animal.name}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl text-3xl sm:h-12 sm:w-12">
        {animal.emoji}
      </span>
      <span
        className="mt-1 rounded-full px-3 py-0.5 text-xs font-extrabold sm:text-sm"
        style={{
          backgroundColor: animal.bgTint,
          color: '#243B40',
        }}
      >
        {animal.name}
      </span>
    </div>
  );
}