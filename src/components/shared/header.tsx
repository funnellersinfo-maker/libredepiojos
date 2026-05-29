"use client";

import { useAppStore } from "@/store/use-app-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { formatPrice } from "@/lib/data";
import {
  ShoppingCart,
  Menu,
  X,
  Bug,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const {
    setView,
    currentView,
    cart,
    setCartOpen,
    isCartOpen,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Inicio", view: "home" as const },
    { label: "Diagnosticar", view: "quiz" as const },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => setView("home")}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D941A8] to-[#2B8780] flex items-center justify-center">
              <Bug className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-foreground">
                Libre de Piojos
              </span>
              <span className="text-[10px] leading-tight text-muted-foreground -mt-0.5">
                by Cabellos Sanos
              </span>
            </div>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.view}
                variant={currentView === item.view ? "default" : "ghost"}
                size="sm"
                onClick={() => setView(item.view)}
                className={
                  currentView === item.view
                    ? "bg-[#D941A8] hover:bg-[#B0308A] text-white"
                    : "text-foreground hover:text-[#D941A8]"
                }
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Phone CTA */}
            <a
              href="https://wa.me/573001234567?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm text-[#2B8780] hover:text-[#1D6B66] font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Agenda tu Cita</span>
            </a>

            {/* Cart */}
            <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative border-[#D941A8]/20 hover:border-[#D941A8] hover:bg-[#F8E0F0]/50"
                  aria-label="Abrir carrito"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount() > 0 && (
                    <Badge className="absolute -top-1.5 -right-1.5 w-5 h-5 p-0 flex items-center justify-center text-[10px] bg-[#D941A8] text-white border-2 border-white">
                      {cartCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetTitle className="text-lg font-bold mb-4">
                  Tu Carrito
                </SheetTitle>
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <ShoppingCart className="w-12 h-12 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">
                      Tu carrito está vacío
                    </p>
                    <Button
                      onClick={() => {
                        setCartOpen(false);
                        setView("quiz");
                      }}
                      className="mt-4 bg-[#D941A8] hover:bg-[#B0308A]"
                    >
                      Encuentra tu solución
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto space-y-3 py-4">
                      <AnimatePresence>
                        {cart.map((item) => (
                          <motion.div
                            key={item.product.id}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex gap-3 p-3 rounded-xl bg-muted/50"
                          >
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#F8E0F0] to-[#E0F2F0] flex items-center justify-center text-2xl shrink-0">
                              {item.product.category === "treatment"
                                ? "🧴"
                                : item.product.category === "prevention"
                                ? "🛡️"
                                : "✨"}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">
                                {item.product.name}
                              </p>
                              <p className="text-[#D941A8] font-bold text-sm">
                                {formatPrice(item.product.price)}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs hover:bg-muted"
                                  aria-label="Reducir cantidad"
                                >
                                  -
                                </button>
                                <span className="text-sm font-medium w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs hover:bg-muted"
                                  aria-label="Aumentar cantidad"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() =>
                                    removeFromCart(item.product.id)
                                  }
                                  className="ml-auto text-muted-foreground hover:text-destructive"
                                  aria-label="Eliminar del carrito"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-[#D941A8]">
                          {formatPrice(cartTotal())}
                        </span>
                      </div>
                      <Button
                        className="w-full bg-[#D941A8] hover:bg-[#B0308A] text-white font-semibold h-12 text-base"
                        onClick={() => {
                          setCartOpen(false);
                          setView("checkout");
                        }}
                      >
                        Proceder al Pago
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        🔒 Pago seguro · Envío a todo Colombia
                      </p>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 py-3 space-y-1"
            >
              {navItems.map((item) => (
                <Button
                  key={item.view}
                  variant={currentView === item.view ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setView(item.view);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <a
                href="https://wa.me/573001234567?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#2B8780] font-medium"
              >
                <Phone className="w-4 h-4" />
                Agenda tu Cita
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
