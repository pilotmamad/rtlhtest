"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { PreviewPosition } from "@/data/products";
import type { Customization } from "@/lib/pricing";

export function ProductGallery({
  images,
  name,
  selectedImageIndex,
  preview,
  previewPosition
}: {
  images: string[];
  name: string;
  selectedImageIndex?: number | null;
  preview?: Customization;
  previewPosition?: PreviewPosition;
}) {
  const lockedImage =
    typeof selectedImageIndex === "number" ? images[selectedImageIndex] || images[0] : null;

  return (
    <div className="relative h-[min(58vh,460px)] min-h-[320px] w-full min-w-0 overflow-hidden bg-cream md:sticky md:top-[72px] md:h-[calc(100vh-72px)]">
      {lockedImage ? (
        <motion.div
          key={lockedImage}
          className="relative h-full w-full"
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={lockedImage}
            alt={`${name} selected color`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((image, index) => (
              <span
                key={image}
                className={`h-1.5 rounded-full transition-all ${
                  index === selectedImageIndex ? "w-5 bg-champagne" : "w-1.5 bg-charcoal/15"
                }`}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          loop
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          className="h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image}>
              <div className="relative h-full w-full min-w-0">
                <Image
                  src={image}
                  alt={`${name} view ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <CustomizationOverlay preview={preview} position={previewPosition} />
    </div>
  );
}

function CustomizationOverlay({
  preview,
  position
}: {
  preview?: Customization;
  position?: PreviewPosition;
}) {
  const text = previewText(preview);
  if (!text || !position) return null;

  const effect = previewEffect(preview);

  return (
    <motion.div
      key={`${preview?.type}-${text}-${preview?.stampColor}`}
      className="pointer-events-none absolute left-0 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center font-serif uppercase tracking-[0.16em]"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        maxWidth: `${position.maxWidth || 36}%`,
        transform: `translate(-50%, -50%) rotate(${position.rotate || 0}deg) scale(${position.scale || 1})`
      }}
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className={`block truncate text-[clamp(18px,4vw,42px)] leading-none ${effect.className}`}
        style={effect.style}
      >
        {text}
      </span>
    </motion.div>
  );
}

function previewText(preview?: Customization) {
  if (!preview) return "";
  if (preview.type === "stamp") return (preview.stampText || "").slice(0, 3);
  if (preview.type === "engraving") return (preview.engravingText || "").slice(0, 28);
  return "";
}

function previewEffect(preview?: Customization) {
  if (preview?.type === "engraving") {
    return {
      className: "normal-case tracking-[0.08em]",
      style: {
        color: "rgba(28, 26, 24, 0.42)",
        textShadow: "0 1px 0 rgba(255,255,255,0.28), 0 -1px 0 rgba(28,26,24,0.18)",
        mixBlendMode: "multiply" as const
      }
    };
  }

  if (preview?.stampColor === "silver") {
    return {
      className: "",
      style: {
        color: "#D7D5CF",
        textShadow: "0 1px 0 rgba(255,255,255,0.55), 0 7px 18px rgba(0,0,0,0.12)"
      }
    };
  }

  if (preview?.stampColor === "natural") {
    return {
      className: "",
      style: {
        color: "rgba(36, 28, 22, 0.28)",
        textShadow: "0 1px 0 rgba(255,255,255,0.18), inset 0 1px 2px rgba(0,0,0,0.18)",
        mixBlendMode: "multiply" as const
      }
    };
  }

  return {
    className: "",
    style: {
      color: "#E8D5A3",
      textShadow: "0 1px 0 rgba(255,255,255,0.42), 0 8px 20px rgba(93,70,26,0.2)"
    }
  };
}
