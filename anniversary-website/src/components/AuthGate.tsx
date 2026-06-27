import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import config from '@/config';
import { useAppStore } from '@/store/appStore';
import { useMusicStore } from "@/store/musicStore";

function triggerConfetti(durationMs: number = 5000) {
  const end = Date.now() + durationMs;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff6b9d', '#ff4d8f', '#ff1f7a'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff6b9d', '#ff4d8f', '#ff1f7a'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

export default function AuthGate() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const playMusic = useMusicStore((s) => s.play);

  const addDigit = (digit: string) => {
    if (isUnlocking) return;

    if (pin.length >= 4) return;

    const next = pin + digit;

    setPin(next);

    if (next.length === 4) {
      setTimeout(() => {
        if (next === config.secretCode) {
          setError(null);

          setIsUnlocking(true);
          playMusic(); 

          triggerConfetti(3000);

          setTimeout(() => {
            setAuthenticated();
          }, 700);
        } else {
          setError("Kode salah 🥺");

          setTimeout(() => {
            setPin("");
            setError(null);
          }, 800);
        }
      }, 150);
    }
  };

  const removeDigit = () => {
    if (isUnlocking) return;

    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center px-8 transition-all duration-500 ${isUnlocking ? "opacity-0 scale-95" : "opacity-100"
        }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
w-full
max-w-6xl
rounded-[40px]
border
border-white/50
bg-white/35
backdrop-blur-3xl
shadow-[0_25px_80px_rgba(0,0,0,.12)]
hover:shadow-[0_30px_100px_rgba(244,114,182,.18)]
transition-all
duration-500
overflow-hidden
"
      >
        <div className="grid grid-cols-2 min-h-[650px]">

          {/* LEFT */}
          <div className="flex items-center justify-center bg-gradient-to-br from-pink-100/30 to-rose-100/20">

            <div className="-rotate-6 bg-white rounded-md shadow-2xl p-4">

              <div className="w-80 h-96 rounded bg-gradient-to-br from-rose-50 to-amber-50 overflow-hidden flex flex-col items-center justify-center">

                <img
                  src="/images/auth.jpg"
                  alt="Our Photo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                {/* <div className="absolute flex flex-col items-center">

                  <span className="text-6xl mb-4">
                    📸
                  </span>

                  <p className="text-xl font-semibold text-rose-500">
                    Our Photo
                  </p>

                  <p className="text-gray-400 mt-2">
                    Coming Soon
                  </p>

                </div> */}

              </div>

              <p className="text-center mt-4 font-title text-4xl text-rose-600">
                Selamat Datang
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex flex-col justify-center items-center px-16">

            <h2 className="text-4xl font-serif-elegant text-rose-700 mb-2">
              Eits kuncinya duluu 😁
            </h2>

            <p className="text-gray-500 mb-10 text-lg">
              Parah sihh kalau lupa 🥺
            </p>

            {/* PIN */}

            <div className="flex gap-5 mb-10">

              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.7 }}
                  animate={{
                    scale: pin.length > i ? [1, 1.3, 1] : 1
                  }}
                  transition={{ duration: .2 }}
                  className={`
        w-8
        h-8
        rounded-full
        transition-all
        ${pin.length > i
                      ? "bg-rose-500"
                      : "bg-rose-200"
                    }
    `}
                />
              ))}


            </div>

            {error && (
              <p className="text-rose-500 mb-6">
                {error}
              </p>
            )}

            {/* KEYPAD */}

            <div className="grid grid-cols-3 gap-5">

              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
                <button
                  key={n}
                  onClick={() => addDigit(n)}
                  disabled={isUnlocking}
                  className="
                  disabled:opacity-50
disabled:cursor-not-allowed
                w-20
                h-20
                rounded-2xl
                bg-white/60
                backdrop-blur
                shadow-lg
                hover:scale-105
                transition
                text-2xl
                font-semibold
                text-rose-700
              "
                >
                  {n}
                </button>
              ))}

              <button
                onClick={removeDigit}
                className="w-20 h-20 rounded-2xl bg-white/50 text-3xl shadow-lg"
                disabled={isUnlocking}
              >
                ⌫
              </button>

              <button
                onClick={() => addDigit("0")}
                className="w-20 h-20 rounded-2xl bg-white/60 text-2xl shadow-lg"
              >
                0
              </button>

              <div className="w-20 h-20 rounded-2xl bg-rose-400 flex items-center justify-center text-3xl text-white shadow-lg">
                ❤
              </div>

            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
