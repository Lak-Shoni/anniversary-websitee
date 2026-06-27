import config from '@/config';
import { useCountdown } from '@/hooks/useCountdown';
import { SectionWrapper } from './SectionWrapper';

interface CountdownBoxProps {
  value: number;
  label: string;
}

function CountdownBox({ value, label }: CountdownBoxProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-rose-100">
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 tabular-nums leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-sm sm:text-base font-medium text-rose-400 tracking-wide">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(config.anniversaryDate);

  return (
    <SectionWrapper className="py-16 px-6 bg-gradient-to-b from-pink-50 to-rose-50">
      <div className="max-w-2xl mx-auto text-center">
        {isPast ? (
          <>
            <h2 className="text-3xl sm:text-4xl font-serif text-rose-700 mb-6">
              Hitung Mundur 💗
            </h2>
            <div className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-lg border border-rose-100 py-12 px-8">
              <p className="text-4xl sm:text-5xl mb-4">🎉</p>
              <p className="text-2xl sm:text-3xl font-serif text-rose-600 mb-3">
                Selamat Hari Jadi!
              </p>
              <p className="text-rose-400 text-lg">
                Hari istimewa kita sudah tiba. Terima kasih sudah hadir dalam hidupku 💕
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl sm:text-4xl font-serif text-rose-700 mb-4">
              Menuju Hari Spesial ⏳
            </h2>
            <p className="text-rose-400 mb-10 text-base sm:text-lg">
              Menghitung setiap detik menuju hari yang kita nantikan 💗
            </p>
            <div className="flex items-start justify-center gap-4 sm:gap-6">
              <CountdownBox value={days} label="Hari" />
              <span className="text-3xl sm:text-4xl font-bold text-rose-300 mt-4 sm:mt-5 select-none">:</span>
              <CountdownBox value={hours} label="Jam" />
              <span className="text-3xl sm:text-4xl font-bold text-rose-300 mt-4 sm:mt-5 select-none">:</span>
              <CountdownBox value={minutes} label="Menit" />
              <span className="text-3xl sm:text-4xl font-bold text-rose-300 mt-4 sm:mt-5 select-none">:</span>
              <CountdownBox value={seconds} label="Detik" />
            </div>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
