"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { locations } from "@/lib/data";
import { useAppStore } from "@/store/use-app-store";
import Image from "next/image";

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
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ---------------------------------------------------------------------------
// Location Card
// ---------------------------------------------------------------------------

const cityImages: Record<string, string> = {
  Bogotá: "/images/locations/bogota.jpg",
  Medellín: "/images/locations/medellin.jpg",
  Barranquilla: "/images/locations/barranquilla.jpg",
  Cali: "/images/locations/cali.jpg",
  Ibagué: "/images/locations/instagram5.jpg",
  Bucaramanga: "/images/locations/instagram6.jpg",
};

function LocationCard({
  location,
  index,
}: {
  location: (typeof locations)[number];
  index: number;
}) {
  const isComingSoon = location.address === "Próximamente";

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg ${
          isComingSoon
            ? "border-gray-200 bg-gray-50/80 opacity-75"
            : "border-gray-100 bg-white hover:border-[#D941A8]/20 hover:shadow-[#D941A8]/5"
        }`}
      >
        {/* City image */}
        <div className="relative h-32 w-full overflow-hidden">
          <Image
            src={cityImages[location.city] || "/images/locations/bogota.jpg"}
            alt={`Sede Libre de Piojos ${location.city}`}
            width={400}
            height={160}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-white" />
            <span className="text-sm font-bold text-white">{location.city}</span>
          </div>

          {/* Badge */}
          {isComingSoon && (
            <Badge className="absolute right-3 top-3 bg-amber-500 text-white border-0 text-[10px] font-semibold">
              Próximamente
            </Badge>
          )}
          {!isComingSoon && (
            <Badge className="absolute right-3 top-3 bg-[#2B8780] text-white border-0 text-[10px] font-semibold">
              Sede Activa
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#D941A8] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">{location.address}</p>
          </div>

          {location.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#2B8780] shrink-0" />
              <a
                href={`tel:${location.phone.replace(/\s/g, "")}`}
                className="text-xs font-medium text-[#2B8780] hover:text-[#1D6B66] transition-colors"
              >
                {location.phone}
              </a>
            </div>
          )}

          {!isComingSoon && (
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-gray-400 shrink-0" />
              <span className="text-xs text-gray-400">Lun-Sáb: 8am - 6pm</span>
            </div>
          )}

          {!isComingSoon && (
            <a
              href={`https://wa.me/573102720863?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20en%20${encodeURIComponent(location.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#25D366]/10 px-3 py-2 text-xs font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/20"
            >
              <Phone className="h-3.5 w-3.5" />
              Agendar Cita
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Locations Section
// ---------------------------------------------------------------------------

export function LocationsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const setView = useAppStore((s) => s.setView);

  const activeLocations = locations.filter((l) => l.address !== "Próximamente");
  const comingSoonLocations = locations.filter((l) => l.address === "Próximamente");

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-24">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(243,241,240,0.3) 0%, rgba(255,255,255,1) 30%, rgba(43,135,128,0.03) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          variants={sectionHeaderVariant}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#2B8780]/10 px-4 py-1.5 text-sm font-medium text-[#2B8780]">
            <MapPin className="h-4 w-4" />
            Encuéntranos
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Nuestras{" "}
            <span className="bg-gradient-to-r from-[#2B8780] to-[#D941A8] bg-clip-text text-transparent">
              Sedes
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Visítanos en cualquiera de nuestras sedes para un tratamiento
            profesional sin tóxicos. Atención personalizada y resultados
            garantizados.
          </p>
        </motion.div>

        {/* Active locations grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {activeLocations.map((location, i) => (
            <LocationCard key={location.city} location={location} index={i} />
          ))}
        </div>

        {/* Coming soon cities */}
        {comingSoonLocations.length > 0 && (
          <div className="mt-8">
            <p className="mb-4 text-center text-sm font-medium text-gray-400">
              Próximamente en:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {comingSoonLocations.map((loc) => (
                <div
                  key={loc.city}
                  className="flex items-center gap-2 rounded-full border border-dashed border-gray-200 bg-gray-50 px-4 py-2"
                >
                  <MapPin className="h-3.5 w-3.5 text-gray-300" />
                  <span className="text-sm text-gray-400">{loc.city}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <div className="rounded-2xl border border-[#2B8780]/20 bg-gradient-to-r from-white to-[#2B8780]/5 p-8 shadow-sm">
            <p className="mb-1 text-lg font-bold text-gray-900">
              ¿No hay sede cerca de ti?
            </p>
            <p className="mb-6 text-sm text-gray-500">
              Enviamos nuestros productos a todo Colombia. Diagnóstico gratuito
              online y asesoría personalizada por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="gap-2 text-white shadow-md"
                style={{ backgroundColor: "#2B8780" }}
                onClick={() => setView("quiz")}
              >
                Diagnóstico Gratuito
                <ArrowRight className="size-4" />
              </Button>
              <a
                href="https://wa.me/573102720863?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20env%C3%ADos%20a%20mi%20ciudad"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                >
                  <Phone className="size-4" />
                  Escribir por WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
