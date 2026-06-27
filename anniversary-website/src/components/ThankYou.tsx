import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { useState } from "react";

export default function ThankYou() {
    const [message, setMessage] = useState("");
    const handleSend = () => {
        if (!message.trim()) {
            alert("Isi dulu dongg pesannyaa 🥺");
            return;
        }

        const text = encodeURIComponent(
            `Haloo mas sayangku 🤍

Aku udah selesai lihat website anniversary yang kamu buat.

Pesan buat kamu:

${message}

—
Dikirim dari website anniversary kita ❤️`
        );

        window.open(
            `https://wa.me/6282257168691?text=${text}`,
            "_blank"
        );
    };
    return (

        <SectionWrapper className="py-24 px-6">
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-3xl mx-auto text-center"
            >
                <p className="text-5xl mb-8">❤️</p>

                <h2 className="font-title text-5xl text-rose-600">
                    Terima Kasih Sayang
                </h2>

                <div className="mt-10 space-y-5 text-lg leading-9 text-gray-600">
                    <p>
                        Terima kasih atas segala hal yang telah kita lakukan bersama selama ini <br />
                        Maaf kalau aku belum bisa memberikan yang terbaik, belum bisa menjadi pasangan yang sempurna😞 
                    </p>

                    <p className="font-semibold text-rose-500">
                        Mari kita lanjutkan perjalanan ini sampai waktu yang tidak ditentukan 😍🙌
                    </p>
                </div>


                <div className="mt-20 max-w-2xl mx-auto">

                    <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl p-8">

                        <h3 className="font-title text-4xl text-rose-600 text-center">
                            Your Turn💌
                        </h3>

                        <p className="mt-4 text-center text-gray-500 leading-8">
                            sekarang giliran kamu yang kasih buat aku🤗
                        </p>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ceritakan versi kamuu..."
                            className="
      mt-8
      w-full
      h-44
      rounded-2xl
      border
      border-rose-100
      bg-[#fffdf8]
      p-6
      resize-none
      outline-none
      focus:border-rose-300
      leading-8
      text-gray-700
      "
                        />

                        <div className="flex justify-end mt-2">

                            <span className="text-sm text-gray-400 italic">
                                ♡ untuk Shoni
                            </span>

                        </div>

                        <div className="flex justify-center mt-8">

                            <button
                                onClick={handleSend}
                                className="
        px-10
        py-4
        rounded-full
        bg-rose-500
        hover:bg-rose-600
        text-white
        text-lg
        shadow-xl
        transition-all
        hover:scale-105
        active:scale-95
        "
                            >
                                💌 Balas Surat
                            </button>

                        </div>

                    </div>

                </div>
            </motion.div>
        </SectionWrapper>
    );
}

