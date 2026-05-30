"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star, Users, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionHeaderVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const trustBarVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Testimonial Card
// ---------------------------------------------------------------------------

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group flex w-[320px] flex-shrink-0 snap-start flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#D941A8]/20 hover:shadow-lg sm:w-[360px]"
    >
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4.5 w-4.5 ${
              i < testimonial.rating
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Quote content */}
      <p className="flex-1 text-sm leading-relaxed italic text-gray-600">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author info */}
      <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
        {/* Real testimonial photo */}
        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-gray-900">
            {testimonial.name}
          </span>
          <span className="text-xs text-gray-500">{testimonial.role}</span>
        </div>

        {/* City badge */}
        <div className="ml-auto flex items-center gap-1 rounded-full bg-[#2B8780]/5 px-2.5 py-1">
          <MapPin className="h-3 w-3 text-[#2B8780]" />
          <span className="text-xs font-medium text-[#2B8780]">
            {testimonial.city}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Testimonials Section
// ---------------------------------------------------------------------------

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const trustBarRef = useRef<HTMLDivElement>(null);
  const trustBarInView = useInView(trustBarRef, { once: true, amount: 0.5 });

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-24">
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(243,241,240,0.5) 0%, rgba(255,255,255,1) 40%, rgba(243,241,240,0.3) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ----------------------------------------------------------------- */}
        {/* Section Header                                                     */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          ref={headerRef}
          variants={sectionHeaderVariant}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-[#D941A8]/10 px-4 py-1.5 text-sm font-medium text-[#D941A8]">
            Testimonios Reales
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Lo Que Dicen Nuestras{" "}
            <span className="bg-gradient-to-r from-[#D941A8] to-[#2B8780] bg-clip-text text-transparent">
              Clientes
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Miles de familias ya confiaron en nosotros. Descubre sus
            experiencias y resultados con nuestros tratamientos profesionales.
          </p>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* Scroll Navigation Arrows                                           */}
        {/* ----------------------------------------------------------------- */}
        <div className="mb-4 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="h-9 w-9 rounded-full border-gray-200 text-gray-500 transition-all hover:border-[#D941A8]/30 hover:text-[#D941A8]"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="h-9 w-9 rounded-full border-gray-200 text-gray-500 transition-all hover:border-[#D941A8]/30 hover:text-[#D941A8]"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Horizontally Scrollable Carousel                                   */}
        {/* ----------------------------------------------------------------- */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#D941A8]/40 hover:scrollbar-thumb-[#D941A8]/70"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(217,65,168,0.4) transparent",
          }}
        >
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Trust Bar                                                          */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          ref={trustBarRef}
          variants={trustBarVariant}
          initial="hidden"
          animate={trustBarInView ? "visible" : "hidden"}
          className="mt-12 flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#D941A8]/10 bg-gradient-to-r from-[#D941A8]/5 via-[#F3F1F0] to-[#2B8780]/5 px-6 py-6 sm:flex-row sm:gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D941A8] to-[#2B8780] shadow-lg shadow-[#D941A8]/20">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              Únete a{" "}
              <span className="bg-gradient-to-r from-[#D941A8] to-[#2B8780] bg-clip-text text-transparent">
                15,000+
              </span>{" "}
              Familias Libre de Piojos
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Resultados comprobados con tratamientos seguros y sin tóxicos
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
