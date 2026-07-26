import Card from './ui/Card';
import { DATE } from '../config';

export default function Header() {
  const today = new Date().toLocaleDateString(DATE.LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="text-center mb-6 animate-fade-in-up">
      <Card
        variant="strong"
        rounding="rounded-2xl sm:rounded-3xl"
        padding="p-6 sm:p-10"
        animation={false}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/20 mb-4 sm:mb-5">
          <span className="text-3xl sm:text-4xl" aria-hidden="true">
            🛒
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2 sm:mb-3 drop-shadow-lg tracking-tight">
          Shopping List
        </h1>
        <p className="text-white/70 text-base sm:text-lg drop-shadow-md max-w-md mx-auto">
          Organize your shopping efficiently
        </p>
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs sm:text-sm">
          <span>📅</span>
          <span className="capitalize">{today}</span>
        </div>
      </Card>
    </header>
  );
}
