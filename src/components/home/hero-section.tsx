"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star, MapPin, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/use-app-store";
import { stats } from "@/lib/data";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.1 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ---------------------------------------------------------------------------
// Floating decorative blob component
// ---------------------------------------------------------------------------

function FloatingBlob({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -12, 0, 12, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Stat icon mapper
// ---------------------------------------------------------------------------

function getStatIcon(index: number) {
  const icons = [Heart, MapPin, Star, ShieldCheck];
  return icons[index % icons.length];
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------

export function HeroSection() {
  const setView = useAppStore((s) => s.setView);

  const handlePrimaryCTA = () => {
    setView("quiz");
  };

  const handleSecondaryCTA = () => {
    const el = document.getElementById("products-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F3F1F0]">
      {/* ----------------------------------------------------------------- */}
      {/* Gradient background layer                                         */}
      {/* ----------------------------------------------------------------- */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(217,65,168,0.10) 0%, rgba(217,65,168,0.04) 35%, rgba(43,135,128,0.06) 65%, rgba(43,135,128,0.12) 100%)",
        }}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Floating decorative blobs                                         */}
      {/* ----------------------------------------------------------------- */}
      <FloatingBlob
        className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#D941A8]/10 blur-3xl"
        delay={0}
      />
      <FloatingBlob
        className="absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-[#2B8780]/10 blur-3xl"
        delay={1.5}
      />
      <FloatingBlob
        className="absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-[#D941A8]/8 blur-3xl"
        delay={3}
      />
      <FloatingBlob
        className="absolute top-10 right-1/3 h-48 w-48 rounded-full bg-[#2B8780]/8 blur-3xl"
        delay={2}
      />

      {/* Small decorative circles */}
      <motion.div
        className="absolute top-[15%] left-[8%] h-3 w-3 rounded-full bg-[#D941A8]/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[25%] right-[12%] h-2 w-2 rounded-full bg-[#2B8780]/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.4, 1], scale: [1, 1.5, 1] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[15%] h-2.5 w-2.5 rounded-full bg-[#2B8780]/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.3, 1], scale: [1, 1.2, 1] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-[60%] right-[8%] h-3.5 w-3.5 rounded-full bg-[#D941A8]/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.3, 0.8], scale: [1, 1.4, 1] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Content                                                            */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* --------------------------------------------------------------- */}
          {/* Left: Copy + CTAs                                                */}
          {/* --------------------------------------------------------------- */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
            >
              <Badge
                variant="secondary"
                className="mb-6 gap-1.5 border-[#D941A8]/20 bg-[#D941A8]/10 px-4 py-1.5 text-sm font-medium text-[#D941A8]"
              >
                <ShieldCheck className="h-4 w-4" />
                Diagn&oacute;stico Gratuito &middot; Sin Compromiso
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block">Libre de</span>
              <span
                className="bg-gradient-to-r from-[#D941A8] to-[#2B8780] bg-clip-text text-transparent"
              >
                Piojos
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={2}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl"
            >
              Expertos erradicando piojos y liendres de manera segura, efectiva
              y sin t&oacute;xicos
            </motion.p>

            {/* CTA Group */}
            <motion.div
              custom={3}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              {/* Primary CTA — Pink gradient with pulse */}
              <Button
                size="lg"
                onClick={handlePrimaryCTA}
                className="group relative h-13 overflow-hidden rounded-xl bg-gradient-to-r from-[#D941A8] to-[#c035a0] px-8 text-base font-semibold text-white shadow-lg shadow-[#D941A8]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#D941A8]/30 hover:brightness-110 focus-visible:ring-[#D941A8]/40"
              >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-xl animate-ping bg-white/20 opacity-0 group-hover:opacity-100" />

                <span className="relative flex items-center gap-2">
                  Diagn&oacute;stica Tu Caso Gratis
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>

              {/* Secondary CTA — Outline teal */}
              <Button
                size="lg"
                variant="outline"
                onClick={handleSecondaryCTA}
                className="h-13 rounded-xl border-[#2B8780]/40 px-8 text-base font-semibold text-[#2B8780] transition-all duration-300 hover:border-[#2B8780] hover:bg-[#2B8780]/5 hover:text-[#2B8780] focus-visible:ring-[#2B8780]/30"
              >
                Ver Productos
              </Button>
            </motion.div>

            {/* Micro social-proof line */}
            <motion.p
              custom={4}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mt-5 flex items-center gap-2 text-sm text-gray-500"
            >
              <span className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </span>
              <span>M&aacute;s de 15,000 familias conf&iacute;an en nosotros</span>
            </motion.p>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* Right: Trust stats card                                          */}
          {/* --------------------------------------------------------------- */}
          <motion.div
            custom={2}
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col items-center justify-center gap-4 lg:justify-end"
          >
            {/* Hero Image */}
            <div className="w-full max-w-lg relative">
              <Image
                src="/hero-family.png"
                alt="Familia libre de piojos - Tratamiento natural y efectivo"
                width={672}
                height={384}
                className="rounded-2xl shadow-lg"
                priority
              />
            </div>
            <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-black/[0.04] backdrop-blur-md sm:p-8">
              <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-gray-400">
                Nuestros N&uacute;meros Hablan
              </h3>

              <div className="grid grid-cols-2 gap-5">
                {stats.map((stat, i) => {
                  const Icon = getStatIcon(i);
                  return (
                    <motion.div
                      key={stat.label}
                      custom={i}
                      variants={scaleIn}
                      initial="hidden"
                      animate="visible"
                      className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white/80 p-4 transition-all duration-300 hover:border-[#D941A8]/20 hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D941A8]/10 to-[#2B8780]/10 text-[#D941A8] transition-colors duration-300 group-hover:from-[#D941A8]/20 group-hover:to-[#2B8780]/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {stat.value}
                      </span>
                      <span className="text-center text-xs leading-tight text-gray-500 sm:text-sm">
                        {stat.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Guarantee strip */}
              <motion.div
                custom={4}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#2B8780]/5 px-4 py-3"
              >
                <ShieldCheck className="h-4 w-4 text-[#2B8780]" />
                <span className="text-xs font-medium text-[#2B8780] sm:text-sm">
                  100% Libre de t&oacute;xicos &middot; Garant&iacute;a de efectividad
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom wave divider                                                */}
      {/* ----------------------------------------------------------------- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
