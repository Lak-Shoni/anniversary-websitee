import config from "@/config";
import { SectionWrapper } from "./SectionWrapper";
import { motion } from "framer-motion";

export function Timeline() {
  console.log(config.milestones);
  console.log("Timeline render");
  console.log(config.milestones.length);
  return (
    <SectionWrapper className="min-h-screen flex justify-center py-24 px-8">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-title text-6xl text-rose-600">
            Perjalanan Kita
          </h2>

          <p className="mt-4 text-gray-500 text-lg">
            Semua berawal dari kejadian itu ....
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-rose-200 rounded-full" />

          <div className="space-y-20">
            {config.milestones.map((item, index) => {
              const left = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-500 border-4 border-white shadow-lg z-10" />

                  {/* Connector */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-rose-300 ${left
                      ? "left-[calc(50%-80px)] w-20"
                      : "right-[calc(50%-80px)] w-20"
                      }`}
                  />

                  <div className="grid grid-cols-2 items-center gap-12">
                    {/* LEFT CARD */}
                    <div className={`${left ? "" : "invisible"}`}>
                      <Card item={item} />
                    </div>

                    {/* RIGHT CARD */}
                    <div className={`${left ? "invisible" : ""}`}>                     
                      <Card item={item} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

interface CardProps {
  item: {
    date: string;
    title: string;
    description: string;
    photo?: string;
    photoFit?: "cover" | "contain";
  };
}

function Card({ item }: CardProps) {
  return (
    <div
      className="
      max-w-[440px]
      bg-white/50
      backdrop-blur-xl
      rounded-3xl
      border
      border-white/40
      overflow-hidden
      shadow-xl
      hover:-translate-y-2
      hover:shadow-2xl
      transition-all
      duration-300
    "
    >
      {/* Photo */}
      {item.photo ? (
        <img
          src={item.photo}
          alt={item.title}
          className={`
    w-full
    h-52
    ${item.photoFit === "contain"
              ? "object-contain bg-neutral-900 p-2"
              : "object-cover object-center"
            }
  `}
          loading="lazy"
        />
      ) : (
        <div className="h-40 bg-gradient-to-br from-rose-50 to-amber-50 flex flex-col items-center justify-center">
          <div className="text-5xl mb-3">📷</div>

          <p className="text-rose-500 font-semibold">
            No Photo Yet
          </p>
        </div>
      )}

      {/* Content */}
      <div className="p-7">
        <p className="text-rose-500 text-sm font-semibold">
          {item.date}
        </p>

        <h3 className="mt-2 text-3xl font-serif-elegant text-gray-800">
          {item.title}
        </h3>

        <p className="mt-4 leading-8 text-gray-600">
          {item.description}
        </p>
      </div>
    </div>
  );
}