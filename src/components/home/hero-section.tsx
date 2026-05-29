"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star, MapPin, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";
import { stats } from "@/lib/data";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeSlideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

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

  return (
    <section className="relative w-full overflow-hidden bg-[#F3F1F0]">
      {/* Gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(217,65,168,0.08) 0%, rgba(217,65,168,0.03) 40%, rgba(43,135,128,0.04) 60%, rgba(43,135,128,0.08) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Left: Copy + CTA */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            {/* Headline */}
            <motion.h1
              custom={0}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              ¿Tienes{" "}
              <span className="bg-gradient-to-r from-[#D941A8] to-[#2B8780] bg-clip-text text-transparent">
                Piojos?
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={1}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="mt-3 max-w-md text-lg text-gray-600 sm:text-xl"
            >
              Descubre tu solución ideal en 60 segundos
            </motion.p>

            {/* Primary CTA — HUGE, pulsing */}
            <motion.div
              custom={2}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="mt-6"
            >
              <Button
                size="lg"
                onClick={handlePrimaryCTA}
                className="group relative h-16 rounded-2xl bg-gradient-to-r from-[#D941A8] to-[#c035a0] px-10 text-xl font-bold text-white shadow-xl shadow-[#D941A8]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D941A8]/40 hover:brightness-110 focus-visible:ring-[#D941A8]/40 sm:h-[4.25rem] sm:px-12 sm:text-2xl"
              >
                {/* Persistent pulse ring */}
                <span className="absolute inset-0 rounded-2xl animate-pulse bg-white/20" />

                <span className="relative flex items-center gap-3">
                  Diagnosticar Ahora
                  <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>

            {/* Live social proof notification */}
            <motion.div
              custom={3}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mt-4 flex items-center gap-2"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-gray-600">
                23 personas diagnosticadas hoy
              </span>
            </motion.div>

            {/* Stats — single horizontal row */}
            <motion.div
              custom={4}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start"
            >
              {stats.map((stat, i) => {
                const Icon = getStatIcon(i);
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-1.5 text-sm text-gray-500"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#D941A8]/60" />
                    <span className="font-semibold text-gray-700">
                      {stat.value}
                    </span>
                    <span>{stat.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Hero image — smaller */}
          <motion.div
            custom={2}
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            className="flex flex-1 items-center justify-center"
          >
            <div className="w-full max-w-sm lg:max-w-md">
              <Image
                src="/hero-family.png"
                alt="Familia libre de piojos - Tratamiento natural y efectivo"
                width={500}
                height={286}
                className="rounded-2xl shadow-lg"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
