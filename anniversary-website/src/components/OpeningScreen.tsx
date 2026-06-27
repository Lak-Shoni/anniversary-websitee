import { motion } from "framer-motion";

interface OpeningScreenProps {
  onStart: () => void;
}

export default function OpeningScreen({ onStart }: OpeningScreenProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-100 via-amber-50 to-rose-100 flex items-center justify-center px-6">

      {/* Background Blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      {/* Floating Sparkles */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className="absolute top-24 left-16 text-3xl"
      >
        ✨
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
        className="absolute bottom-24 right-20 text-4xl"
      >
        🌸
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-xl"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.2,
          }}
          className="font-title text-6xl md:text-7xl text-rose-700 mb-6"
        >
          Hai, Cantik
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 1,
          }}
          className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12"
        >
          Aku punya sesuatu buat kamu.
          <br />
          Semoga setelah lihat ini,
          kamu makin sayang sama aku. 😌
        </motion.p>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          onClick={onStart}
          className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-10 py-4 text-lg font-semibold text-white shadow-xl transition"
        >
          ✨ Buka yuk ✨
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{
            delay: 1,
            duration: 1,
          }}
          className="mt-8 text-sm text-gray-500"
        >
          ⚠️ Bisa menyebabkan senyum-senyum sendiri
        </motion.p>
      </motion.div>
    </div>
  );
}