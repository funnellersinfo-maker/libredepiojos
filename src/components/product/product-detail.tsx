"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/use-app-store";
import {
  products,
  formatPrice,
  type Product,
} from "@/lib/data";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Check,
  Sparkles,
  ShieldCheck,
  Users,
  Bell,
  Package,
  Heart,
} from "lucide-react";

// ── Category helpers ──────────────────────────────────────────
const categoryIcons: Record<Product["category"], string> = {
  treatment: "\u{1F9F4}",
  prevention: "\u{1F6E1}\uFE0F",
  tool: "\u2728",
};

const categoryGradients: Record<Product["category"], string> = {
  treatment: "from-pink-500/20 to-rose-400/10",
  prevention: "from-teal-500/20 to-emerald-400/10",
  tool: "from-amber-400/20 to-yellow-300/10",
};

const categoryLabels: Record<Product["category"], string> = {
  treatment: "Tratamiento",
  prevention: "Prevenci\u00F3n",
  tool: "Herramienta",
};

// ── Star Rating sub-component ─────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars)
            return (
              <Star
                key={i}
                className="size-4 fill-amber-400 text-amber-400"
              />
            );
          if (i === fullStars && hasHalf)
            return (
              <Star
                key={i}
                className="size-4 fill-amber-400/50 text-amber-400"
              />
            );
          return <Star key={i} className="size-4 text-muted-foreground/30" />;
        })}
      </div>
      <span className="text-sm text-muted-foreground">
        {rating} ({count} rese\u00F1as)
      </span>
    </div>
  );
}

// ── Trust signals ─────────────────────────────────────────────
const trustSignals = [
  { icon: ShieldCheck, label: "Sin T\u00F3xicos", color: "#2B8780" },
  { icon: Users, label: "Para Toda la Familia", color: "#D941A8" },
  { icon: Heart, label: "Garant\u00EDa de Efectividad", color: "#2B8780" },
];

// ── Fade-in animation variants ────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// ── Main Component ────────────────────────────────────────────
export default function ProductDetail() {
  const { selectedProduct, setView, addToCart, setCartOpen } = useAppStore();
  const [quantity, setQuantity] = useState(1);
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  // ── No product selected ──
  if (!selectedProduct) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-4 text-6xl">{"\u{1F6E1}\uFE0F"}</div>
          <h2 className="text-2xl font-bold text-foreground">
            Producto no encontrado
          </h2>
          <p className="mt-2 text-muted-foreground">
            Selecciona un producto para ver sus detalles
          </p>
          <Button
            className="mt-6 gap-2 text-white"
            style={{ backgroundColor: "#D941A8" }}
            onClick={() => setView("home")}
          >
            <ArrowLeft className="size-4" />
            Volver a la Tienda
          </Button>
        </motion.div>
      </div>
    );
  }

  const product = selectedProduct;

  // ── Related products (same category, exclude current) ──
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setCartOpen(true);
    setQuantity(1);
  };

  const handleBack = () => {
    setView("home");
  };

  const handleNotifyMe = () => {
    setNotifySubmitted(true);
  };

  const handleViewRelated = (p: Product) => {
    useAppStore.setState({ selectedProduct: p });
    setQuantity(1);
    setNotifySubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="min-h-screen bg-[#F3F1F0] pb-28 md:pb-12">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          {/* ── Back Button ── */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
              onClick={handleBack}
            >
              <ArrowLeft className="size-4" />
              Volver
            </Button>
          </motion.div>

          {/* ══════════════════════════════════════════════════════
              PRODUCT HERO SECTION
          ══════════════════════════════════════════════════════ */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* ── Product Visual + Info Card ── */}
            <Card className="overflow-hidden border-border/50 bg-white shadow-md">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* ── Visual Area ── */}
                  <motion.div
                    custom={0}
                    variants={fadeInUp}
                    className={`relative flex items-center justify-center bg-gradient-to-br ${categoryGradients[product.category]} p-10 md:w-2/5 md:min-h-[360px]`}
                  >
                    {/* Badge */}
                    {product.badge && (
                      <Badge
                        className="absolute left-4 top-4 border-0 font-semibold shadow-sm"
                        style={{ backgroundColor: "#D941A8", color: "#fff" }}
                      >
                        {product.badge}
                      </Badge>
                    )}

                    {/* Out of stock overlay */}
                    {!product.inStock && (
                      <Badge
                        variant="destructive"
                        className="absolute right-4 top-4 font-semibold"
                      >
                        Agotado
                      </Badge>
                    )}

                    {/* Category Emoji */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2,
                      }}
                      className="text-8xl md:text-9xl"
                    >
                      {categoryIcons[product.category]}
                    </motion.div>

                    {/* Size badge */}
                    {product.size && (
                      <span className="absolute bottom-4 right-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                        {product.size}
                      </span>
                    )}
                  </motion.div>

                  {/* ── Product Info ── */}
                  <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                    {/* Category label */}
                    <span
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#2B8780" }}
                    >
                      {categoryLabels[product.category]}
                    </span>

                    {/* Product name */}
                    <motion.h1
                      custom={1}
                      variants={fadeInUp}
                      className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl"
                    >
                      {product.name}
                    </motion.h1>

                    {/* Rating */}
                    <motion.div custom={2} variants={fadeInUp}>
                      <StarRating
                        rating={product.rating}
                        count={product.reviewCount}
                      />
                    </motion.div>

                    {/* Price */}
                    <motion.div custom={3} variants={fadeInUp}>
                      <p
                        className="text-3xl font-extrabold md:text-4xl"
                        style={{ color: "#D941A8" }}
                      >
                        {formatPrice(product.price)}
                      </p>
                      {product.originalPrice && (
                        <p className="mt-1 text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </motion.div>

                    {/* Short description */}
                    <motion.p
                      custom={4}
                      variants={fadeInUp}
                      className="text-sm leading-relaxed text-muted-foreground md:text-base"
                    >
                      {product.shortDescription}
                    </motion.p>

                    <Separator className="my-1" />

                    {/* ── Full description ── */}
                    <motion.p
                      custom={5}
                      variants={fadeInUp}
                      className="text-sm leading-relaxed text-foreground/80"
                    >
                      {product.description}
                    </motion.p>

                    {/* ── Quantity Selector + Add to Cart ── */}
                    <motion.div custom={6} variants={fadeInUp}>
                      {product.inStock ? (
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          {/* Quantity */}
                          <div className="flex items-center rounded-lg border border-border bg-background">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-10 rounded-l-lg rounded-r-none"
                              onClick={() =>
                                setQuantity((q) => Math.max(1, q - 1))
                              }
                              disabled={quantity <= 1}
                            >
                              <Minus className="size-4" />
                            </Button>
                            <span className="flex h-10 w-12 items-center justify-center text-sm font-semibold">
                              {quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-10 rounded-l-none rounded-r-lg"
                              onClick={() => setQuantity((q) => q + 1)}
                            >
                              <Plus className="size-4" />
                            </Button>
                          </div>

                          {/* Add to Cart CTA */}
                          <Button
                            size="lg"
                            className="flex-1 gap-2 text-white shadow-lg transition-transform active:scale-95"
                            style={{ backgroundColor: "#D941A8" }}
                            onClick={handleAddToCart}
                          >
                            <ShoppingCart className="size-5" />
                            A\u00F1adir al Carrito
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div
                            className="rounded-lg border px-4 py-3 text-center text-sm font-semibold"
                            style={{
                              borderColor: "#D941A8",
                              color: "#D941A8",
                              backgroundColor: "#D941A810",
                            }}
                          >
                            Producto agotado temporalmente
                          </div>
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full gap-2"
                            style={{
                              borderColor: "#2B8780",
                              color: "#2B8780",
                            }}
                            onClick={handleNotifyMe}
                            disabled={notifySubmitted}
                          >
                            <Bell className="size-4" />
                            {notifySubmitted
                              ? "\u00A1Te notificaremos!"
                              : "Notificarme cuando est\u00E9 disponible"}
                          </Button>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ══════════════════════════════════════════════════════
                QUÉ INCLUYE SECTION
            ══════════════════════════════════════════════════════ */}
            <AnimatePresence>
              {product.includes && product.includes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="border-border/50 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <Package
                          className="size-5"
                          style={{ color: "#2B8780" }}
                        />
                        <h2 className="text-lg font-bold text-foreground">
                          Qu\u00E9 Incluye
                        </h2>
                      </div>
                      <ul className="space-y-3">
                        {product.includes.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: 0.4 + i * 0.08,
                            }}
                            className="flex items-start gap-3"
                          >
                            <span
                              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
                              style={{ backgroundColor: "#2B878020" }}
                            >
                              <Check
                                className="size-3"
                                style={{ color: "#2B8780" }}
                              />
                            </span>
                            <span className="text-sm text-foreground/90">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ══════════════════════════════════════════════════════
                CARACTERÍSTICAS SECTION
            ══════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-border/50 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles
                      className="size-5"
                      style={{ color: "#D941A8" }}
                    />
                    <h2 className="text-lg font-bold text-foreground">
                      Caracter\u00EDsticas
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.5 + i * 0.08,
                        }}
                        className="flex items-start gap-3"
                      >
                        <span
                          className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: "#D941A820" }}
                        >
                          <Sparkles
                            className="size-3"
                            style={{ color: "#D941A8" }}
                          />
                        </span>
                        <span className="text-sm text-foreground/90">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* ══════════════════════════════════════════════════════
                TRUST SIGNALS ROW
            ══════════════════════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="grid grid-cols-3 gap-3"
            >
              {trustSignals.map((signal, i) => {
                const Icon = signal.icon;
                return (
                  <motion.div
                    key={signal.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.6 + i * 0.1,
                    }}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-white p-4 text-center shadow-sm"
                  >
                    <Icon
                      className="size-6"
                      style={{ color: signal.color }}
                    />
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      {signal.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ══════════════════════════════════════════════════════
                PRODUCTOS RELACIONADOS
            ══════════════════════════════════════════════════════ */}
            {relatedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="space-y-5"
              >
                <h2 className="text-xl font-bold text-foreground">
                  Productos Relacionados
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {relatedProducts.map((rp, i) => (
                    <motion.div
                      key={rp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.7 + i * 0.1,
                      }}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Card className="group cursor-pointer overflow-hidden border-border/50 bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-pink-500/5">
                        <CardContent className="p-4">
                          {/* Icon + Badge row */}
                          <div className="mb-3 flex items-start justify-between">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${categoryGradients[rp.category]} text-2xl transition-transform duration-300 group-hover:scale-110`}
                            >
                              {categoryIcons[rp.category]}
                            </div>
                            {rp.badge && (
                              <Badge
                                className="border-0 text-[10px] font-semibold"
                                style={{
                                  backgroundColor: "#D941A8",
                                  color: "#fff",
                                }}
                              >
                                {rp.badge}
                              </Badge>
                            )}
                          </div>

                          <h3 className="mb-1 text-sm font-bold text-foreground line-clamp-1">
                            {rp.name}
                          </h3>

                          <StarRating
                            rating={rp.rating}
                            count={rp.reviewCount}
                          />

                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                            {rp.shortDescription}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <p
                              className="text-lg font-extrabold"
                              style={{ color: "#D941A8" }}
                            >
                              {formatPrice(rp.price)}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 border-border/60 text-xs hover:bg-pink-50 hover:text-pink-700 hover:border-pink-200"
                              onClick={() => handleViewRelated(rp)}
                            >
                              Ver
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FLOATING STICKY CTA BAR (MOBILE ONLY)
      ══════════════════════════════════════════════════════════ */}
      {product.inStock && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border/50 bg-white/95 px-4 py-3 backdrop-blur-md md:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground line-clamp-1">
                {product.name}
              </p>
              <p
                className="text-lg font-extrabold"
                style={{ color: "#D941A8" }}
              >
                {formatPrice(product.price * quantity)}
              </p>
            </div>
            <Button
              size="lg"
              className="gap-2 text-white shadow-lg transition-transform active:scale-95"
              style={{ backgroundColor: "#D941A8" }}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="size-4" />
              A\u00F1adir ({quantity})
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
