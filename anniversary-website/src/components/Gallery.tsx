import config from "@/config";
import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { useAppStore } from "@/store/appStore";
import Lightbox from "./Lightbox";


export default function Gallery() {
  const openLightbox = useAppStore((s) => s.openLightbox);

  return (
    <SectionWrapper className="py-28 px-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-20">

          <h2 className="font-title text-6xl text-rose-600">
            Tembok Kenangan
          </h2>

          <p className="mt-5 text-gray-500 text-lg leading-8">
            bukti kita sepasang kekasih yang bahagia🤗
          </p>

        </div>

        {/* Gallery Wall */}

        <div
          className="
          grid
          grid-cols-6
          auto-rows-[170px]
          gap-8
        "
        >

          {config.photos.map((photo, index) => (

            <motion.div

              key={index}

              initial={{
                opacity:0,
                scale:.9
              }}

              whileInView={{
                opacity:1,
                scale:1
              }}

              viewport={{
                once:true
              }}

              transition={{
                duration:.45,
                delay:index*.05
              }}
            >

              <div

                onClick={()=>openLightbox(photo.src)}

                className="
                group
                bg-white
                rounded-md
                p-3
                shadow-xl
                hover:shadow-2xl
                transition-all
                duration-300
                cursor-pointer
                h-full
                "

              >

                <div
                  className="
                  overflow-hidden
                  rounded
                  h-full
                  "
                >

                  <img

                    src={photo.src}

                    alt="Memory"

                    className="
                    w-full
                    h-full
                    object-cover
                    transition-all
                    duration-500
                    group-hover:scale-110
                    "

                  />

                </div>

              </div>

            </motion.div>
            
          ))}

        </div>

      </div>

      <Lightbox />

    </SectionWrapper>
  );
}
console.log(config.photos.length);
console.log(config.photos[0]);