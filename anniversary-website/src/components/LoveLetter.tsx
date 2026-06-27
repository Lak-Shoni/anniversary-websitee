import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "@/config";
import { SectionWrapper } from "./SectionWrapper";

export function LoveLetter() {
  const [opened, setOpened] = useState(false);

  const paragraphs = config.loveLetter
    .split("\n\n")
    .filter(Boolean);

  return (
    <SectionWrapper className="min-h-screen flex items-center justify-center px-8 py-20">

      <div className="w-full max-w-4xl">

        <AnimatePresence mode="wait">

          {!opened ? (

            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: .95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: .5 }}
              className="rounded-[36px] bg-white/35 backdrop-blur-3xl border border-white/40 shadow-[0_25px_80px_rgba(0,0,0,.12)] p-16 text-center"
            >

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                }}
                className="text-7xl mb-8"
              >
                ✉️
              </motion.div>

              <h2 className="font-serif-elegant text-5xl text-rose-700 mb-4">
                Permisi, Pakett
              </h2>

              <p className="text-xl text-gray-500 mb-12">
                atas nama Lailatul Cantik Mubarokah
              </p>

              <button
                onClick={() => setOpened(true)}
                className="px-10 py-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-lg shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                💌 Buka Paket
              </button>

            </motion.div>

          ) : (

            <motion.div
              key="letter"
              initial={{
                opacity: 0,
                y: 50,
                scale: .95
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                duration: .6
              }}
              className="rounded-[36px] bg-white/35 backdrop-blur-3xl border border-white/40 shadow-[0_25px_80px_rgba(0,0,0,.12)] p-16"
            >

              <div className="bg-[#fffdf8] rounded-2xl shadow-inner p-14">

                <h2 className="font-title text-6xl text-center text-rose-600 mb-10">
                  Happy Anniversary ❤️
                </h2>

                <div className="space-y-6 text-xl leading-10 text-gray-700 font-serif-elegant">

                  {paragraphs.map((paragraph, index) => (

                    <p key={index}>
                      {paragraph}
                    </p>

                  ))}

                </div>

                <div className="mt-16 text-right">

                  <p className="font-title text-4xl text-rose-500">
                    With Love,
                  </p>

                  <p className="font-serif-elegant text-2xl text-gray-700 mt-2">
                    Shoni ❤️
                  </p>

                </div>

              </div>

              <motion.div
                className="flex flex-col items-center mt-16 text-gray-400"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="text-sm mb-2 tracking-wide">
                  eitss lanjutt boss....
                </p>

                <span className="text-3xl">
                  ⌄
                </span>
              </motion.div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </SectionWrapper>
  );
}