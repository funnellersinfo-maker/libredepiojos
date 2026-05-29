"use client";

import { useAppStore } from "@/store/use-app-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { locations } from "@/lib/data";
import {
  Bug,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

export function FooterSection() {
  const { setView } = useAppStore();

  return (
    <footer className="bg-[#1A1A2E] text-white mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D941A8] to-[#2B8780] flex items-center justify-center">
                <Bug className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-lg">Libre de Piojos</p>
                <p className="text-xs text-white/60">by Cabellos Sanos</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Expertos erradicando piojos y liendres de manera segura, efectiva
              y sin tóxicos. Más de 5 años de experiencia y 15,000+ casos
              resueltos.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/organizacioncabellossanos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D941A8] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D941A8] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D941A8] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Inicio", view: "home" as const },
                { label: "Diagnóstico Gratuito", view: "quiz" as const },
              ].map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => setView(link.view)}
                    className="text-sm text-white/70 hover:text-[#D941A8] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#products-section"
                  className="text-sm text-white/70 hover:text-[#D941A8] transition-colors"
                >
                  Productos
                </a>
              </li>
              <li>
                <a
                  href="#faq-section"
                  className="text-sm text-white/70 hover:text-[#D941A8] transition-colors"
                >
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90">
              Nuestras Sedes
            </h3>
            <ul className="space-y-3">
              {locations.slice(0, 3).map((loc) => (
                <li key={loc.city} className="flex gap-2">
                  <MapPin className="w-4 h-4 text-[#2B8780] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{loc.city}</p>
                    <p className="text-xs text-white/60">{loc.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90">
              Contáctanos
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-[#2B8780] shrink-0" />
                <a
                  href="https://wa.me/573001234567"
                  className="text-sm text-white/70 hover:text-[#D941A8] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-[#2B8780] shrink-0" />
                <a
                  href="mailto:info@libredepiojos.com"
                  className="text-sm text-white/70 hover:text-[#D941A8] transition-colors"
                >
                  info@libredepiojos.com
                </a>
              </li>
            </ul>
            <Button
              onClick={() => setView("quiz")}
              className="w-full bg-[#D941A8] hover:bg-[#B0308A] text-white text-sm"
            >
              Diagnóstico Gratuito
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <Separator className="bg-white/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© 2024 Libre de Piojos - Cabellos Sanos. Todos los derechos reservados.</p>
          <a
            href="#"
            className="hover:text-white/80 transition-colors flex items-center gap-1"
          >
            Políticas de Privacidad
          </a>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <motion.a
        href="https://wa.me/573001234567?text=Hola%2C%20necesito%20información%20sobre%20sus%20productos%20antipiojos"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contactar por WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-current"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.742 3.054 9.378L1.056 31.29l6.138-1.964C9.72 30.876 12.764 32 16.004 32 24.826 32 32 24.824 32 16S24.826 0 16.004 0zm9.342 22.616c-.392 1.104-2.002 2.04-3.276 2.312-.872.186-2.01.336-5.848-1.258-4.912-2.04-8.07-7.03-8.31-7.35-.238-.312-1.968-2.624-1.968-5.01s1.248-3.564 1.688-4.052c.44-.488.96-.61 1.28-.61.32 0 .64.002.92.016.296.016.694-.112 1.084.828.392.948 1.33 3.246 1.448 3.48.116.234.194.508.04.818-.156.312-.232.504-.464.778-.234.274-.49.612-.7.82-.234.234-.478.488-.204.956.272.468 1.214 2.002 2.606 3.244 1.79 1.592 3.296 2.084 3.77 2.32.474.234.75.196 1.028-.118.276-.314 1.186-1.382 1.502-1.858.314-.478.628-.396 1.06-.238.43.156 2.738 1.292 3.21 1.526.474.234.79.352.906.546.118.194.118 1.12-.274 2.224z" />
        </svg>
      </motion.a>
    </footer>
  );
}
