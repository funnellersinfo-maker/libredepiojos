"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/use-app-store";
import { products, formatPrice, type Product } from "@/lib/data";
import { Star, ShoppingCart, Eye, ArrowRight } from "lucide-react";

// ── Category helpers ──────────────────────────────────────────
type CategoryFilter = "all" | "treatment" | "prevention" | "tool";

const filters: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "treatment", label: "Tratamiento" },
  { value: "prevention", label: "Prevención" },
  { value: "tool", label: "Herramientas" },
];

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
                className="size-3.5 fill-amber-400 text-amber-400"
              />
            );
          if (i === fullStars && hasHalf)
            return (
              <Star
                key={i}
                className="size-3.5 fill-amber-400/50 text-amber-400"
              />
            );
          return <Star key={i} className="size-3.5 text-muted-foreground/30" />;
        })}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating} ({count})
      </span>
    </div>
  );
}

// ── Badge shine animation ─────────────────────────────────────
function ShinyBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative overflow-hidden ${className ?? ""}`}>
      {children}
      <span className="absolute inset-0 -translate-x-full animate-[shine_2.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </span>
  );
}

// ── Product Card sub-component ────────────────────────────────
function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { setSelectedProduct, setView, addToCart, setCartOpen } = useAppStore();

  const handleViewDetail = () => {
    setSelectedProduct(product);
    setView("product");
  };

  const handleAddToCart = () => {
    addToCart(product);
    setCartOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
        className="h-full"
      >
        <Card className="group relative h-full overflow-hidden border-border/50 bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-pink-500/5">
          {/* ── Badge ── */}
          {product.badge && (
            <ShinyBadge className="absolute right-3 top-3 z-10">
              <Badge
                className="border-0 font-semibold shadow-sm"
                style={{ backgroundColor: "#D941A8", color: "#fff" }}
              >
                {product.badge}
              </Badge>
            </ShinyBadge>
          )}

          {/* ── Out of stock overlay ── */}
          {!product.inStock && (
            <div className="absolute right-3 top-3 z-10">
              <Badge variant="destructive" className="font-semibold">
                Agotado
              </Badge>
            </div>
          )}

          <CardHeader className="p-4 pb-2">
            {/* Product image */}
            <div className="mb-3 flex h-40 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="object-contain h-full w-full p-4 transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="text-lg font-bold leading-tight text-foreground">
              {product.name}
            </h3>

            <StarRating rating={product.rating} count={product.reviewCount} />
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>

            <p
              className="text-2xl font-extrabold"
              style={{ color: "#D941A8" }}
            >
              {formatPrice(product.price)}
            </p>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 pt-0 sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 border-border/60 text-foreground hover:bg-pink-50 hover:text-pink-700 hover:border-pink-200"
              onClick={handleViewDetail}
            >
              <Eye className="size-4" />
              Ver Detalle
            </Button>

            <Button
              size="sm"
              className="w-full gap-1.5 text-white disabled:opacity-50"
              style={{ backgroundColor: "#D941A8" }}
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="size-4" />
              {product.inStock ? "Añadir al Carrito" : "Agotado"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const { setView, resetQuiz } = useAppStore();

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  const handleQuizCTA = () => {
    resetQuiz();
    setView("quiz");
  };

  return (
    <section
      id="products-section"
      className="w-full scroll-mt-20 bg-[#F3F1F0] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:mb-14"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Nuestra Línea de Productos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            Sin tóxicos, 100% natural, efectividad comprobada
          </p>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2 md:mb-14"
        >
          {filters.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-md"
                    : "bg-white text-muted-foreground hover:bg-white/80 hover:text-foreground"
                }`}
                style={
                  isActive
                    ? { backgroundColor: "#D941A8" }
                    : undefined
                }
              >
                {f.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Products Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Empty state (just in case) ── */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            No hay productos en esta categoría por el momento.
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex flex-col items-center gap-4 text-center md:mt-20"
        >
          <div className="rounded-2xl border border-[#2B8780]/20 bg-white p-8 shadow-sm md:p-10">
            <p className="mb-1 text-lg font-bold text-foreground md:text-xl">
              ¿No sabes cuál elegir?
            </p>
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              Haz nuestro diagnóstico gratuito y te recomendamos el producto
              ideal para ti
            </p>
            <Button
              size="lg"
              className="gap-2 text-white shadow-md"
              style={{ backgroundColor: "#2B8780" }}
              onClick={handleQuizCTA}
            >
              Diagnóstico Gratuito
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
