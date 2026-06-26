"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { config } from "@/lib/config";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type PhotoSwiperSectionProps = {
  active?: boolean;
};

export default function PhotoSwiperSection({ active = true }: PhotoSwiperSectionProps) {
  const images = config.galleryImages.filter(Boolean);

  return (
    <div
      className={`h-full w-full flex flex-col px-3 py-5 ${active ? "fadeInMove active" : "fadeInMove"}`}
      style={{
        background: "linear-gradient(180deg, #f7f2ea 0%, #efe8dc 100%)",
      }}
    >
      <h2 className="shrink-0 text-center font-ovo text-xl tracking-widest mb-3 text-[#6b1f2b] uppercase">
        Khoảnh khắc của chúng tôi
      </h2>

      <div className="flex min-h-0 flex-1 w-full flex-col">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={1}
          loop={images.length > 1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          className="wedding-gallery-swiper h-full w-full rounded-2xl"
        >
          {images.map((src, index) => (
            <SwiperSlide key={`${src}-${index}`} className="h-full">
              <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={src.trim()}
                  alt={`Ảnh cưới ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="mt-3 shrink-0 text-center text-xs font-legan text-[#6b1f2b]/70">
          Vuốt hoặc bấm mũi tên để xem {images.length} ảnh
        </p>
      </div>
    </div>
  );
}
