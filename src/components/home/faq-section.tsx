"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircleQuestion, X, Check, MessageCircle } from "lucide-react";
import { faqs, myths } from "@/lib/data";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
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

const accordionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const mythCardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ctaVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Myth Card Component
// ---------------------------------------------------------------------------

function MythCard({
  myth,
  reality,
  index,
}: {
  myth: string;
  reality: string;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={mythCardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#2B8780]/20 hover:shadow-md"
    >
      {/* Myth — crossed out in red */}
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
          <X className="h-3.5 w-3.5 text-red-500" />
        </div>
        <p className="text-sm leading-relaxed text-red-500 line-through decoration-red-400 decoration-2">
          {myth}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-auto h-px w-12 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Reality — in green */}
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
        </div>
        <p className="text-sm leading-relaxed text-emerald-700">{reality}</p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// WhatsApp SVG Icon
// ---------------------------------------------------------------------------

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// FAQ Section
// ---------------------------------------------------------------------------

export function FaqSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const accordionRef = useRef<HTMLDivElement>(null);
  const accordionInView = useInView(accordionRef, { once: true, amount: 0.1 });
  const mythsRef = useRef<HTMLDivElement>(null);
  const mythsInView = useInView(mythsRef, { once: true, amount: 0.2 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  // Show only first 4 myths for the subsection
  const displayedMyths = myths.slice(0, 4);

  return (
    <section className="relative w-full overflow-hidden bg-[#F3F1F0] py-16 sm:py-24">
      {/* Subtle decorative gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(43,135,128,0.04) 0%, rgba(217,65,168,0.03) 50%, rgba(43,135,128,0.04) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#2B8780]/10 px-4 py-1.5 text-sm font-medium text-[#2B8780]">
            <MessageCircleQuestion className="h-4 w-4" />
            Resolvemos tus dudas
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Preguntas{" "}
            <span className="bg-gradient-to-r from-[#2B8780] to-[#D941A8] bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Desmentimos mitos y resolvemos tus dudas sobre piojos, tratamientos
            y nuestros productos
          </p>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* FAQ Accordion                                                      */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          ref={accordionRef}
          variants={accordionVariant}
          initial="hidden"
          animate={accordionInView ? "visible" : "hidden"}
          className="mb-16 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-gray-100 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-gray-900 hover:text-[#D941A8] hover:no-underline sm:text-base [&[data-state=open]]:text-[#D941A8]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* Mitos vs Realidad Subsection                                       */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          ref={mythsRef}
          initial="hidden"
          animate={mythsInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#D941A8]/10 px-4 py-1.5 text-sm font-medium text-[#D941A8]">
              <X className="h-3.5 w-3.5" />
              <Check className="h-3.5 w-3.5" />
              Mitos vs Realidad
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              No te dejes engañar
            </h3>
            <p className="mt-2 text-gray-500">
              Conoce la verdad detrás de los mitos más comunes sobre los piojos
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {displayedMyths.map((item, i) => (
              <MythCard
                key={i}
                myth={item.myth}
                reality={item.reality}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* Bottom CTA — WhatsApp                                              */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          ref={ctaRef}
          variants={ctaVariant}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-5 rounded-2xl border border-[#2B8780]/10 bg-gradient-to-br from-white to-[#2B8780]/5 p-8 text-center shadow-sm sm:flex-row sm:text-left"
        >
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#25D366]/10">
            <WhatsAppIcon className="h-7 w-7 text-[#25D366]" />
          </div>

          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 sm:text-xl">
              ¿Aún tienes dudas?
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              Escríbenos por WhatsApp y te asesoramos de forma gratuita y sin
              compromiso
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="gap-2 rounded-xl bg-[#25D366] px-6 text-base font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all duration-300 hover:bg-[#20BD5A] hover:shadow-xl hover:shadow-[#25D366]/30"
          >
            <a
              href="https://wa.me/573102720863?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20sus%20productos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              Escribir por WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
