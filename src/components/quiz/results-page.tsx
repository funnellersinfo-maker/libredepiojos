'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Check,
  Star,
  ArrowRight,
  Package,
  ShieldCheck,
  Sparkles,
  Phone,
  MapPin,
  MessageCircle,
  ChevronRight,
  Heart,
  Gift,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/use-app-store';
import { formatPrice, quizQuestions, products, locations } from '@/lib/data';
import type { Product } from '@/lib/data';

// ─── Brand Colors ─────────────────────────────────────────────

const PINK = '#D941A8';
const TEAL = '#2B8780';
const CREAM = '#F3F1F0';

// ─── Animation Variants ────────────────────────────────────────

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
};

const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

// ─── Confetti Particle ─────────────────────────────────────────

interface ConfettiParticle {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: 'circle' | 'square' | 'triangle';
}

function ConfettiCelebration() {
  const [particles] = useState<ConfettiParticle[]>(() => {
    const colors = [PINK, TEAL, CREAM, '#F8E0F0', '#E0F2F0', '#FFD700'];
    const shapes: ConfettiParticle['shape'][] = ['circle', 'square', 'triangle'];
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
      size: 4 + Math.random() * 8,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.shape !== 'triangle' ? p.color : 'transparent',
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '0',
            ...(p.shape === 'triangle'
              ? {
                  width: 0,
                  height: 0,
                  borderLeft: `${p.size / 2}px solid transparent`,
                  borderRight: `${p.size / 2}px solid transparent`,
                  borderBottom: `${p.size}px solid ${p.color}`,
                  backgroundColor: 'transparent',
                }
              : {}),
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 40,
            opacity: [1, 1, 0.5, 0],
            rotate: [0, 180, 360, 540],
            x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 60],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Greeting Logic ────────────────────────────────────────────

function getGreeting(symptom: string): string {
  const greetings: Record<string, string> = {
    severe: 'Tu caso requiere atención inmediata',
    'moderate-child': 'Podemos ayudar a tu hijo',
    'moderate-adult': 'Tenemos la solución para ti',
    mild: 'La prevención es tu mejor aliada',
    prevention: 'La prevención es tu mejor aliada',
  };
  return greetings[symptom] || 'Tenemos la solución para ti';
}

function getGreetingEmoji(symptom: string): string {
  const emojis: Record<string, string> = {
    severe: '🚨',
    'moderate-child': '🧒',
    'moderate-adult': '💪',
    mild: '🛡️',
    prevention: '🔄',
  };
  return emojis[symptom] || '✨';
}

// ─── Answer Label Resolver ─────────────────────────────────────

function getAnswerLabel(questionId: string, answerId: string): string {
  const question = quizQuestions.find((q) => q.id === questionId);
  if (!question) return answerId;
  const option = question.options.find((o) => o.id === answerId);
  return option ? `${option.icon} ${option.label}` : answerId;
}

function getQuestionLabel(questionId: string): string {
  const question = quizQuestions.find((q) => q.id === questionId);
  return question ? question.question : questionId;
}

// ─── Social Proof Numbers ──────────────────────────────────────

function getSocialProofCount(symptom: string): number {
  const counts: Record<string, number> = {
    severe: 2847,
    'moderate-child': 5123,
    'moderate-adult': 1938,
    mild: 3456,
    prevention: 4201,
  };
  return counts[symptom] || 2500;
}

// ─── Animated Product Card (secondary) ─────────────────────────

function SecondaryProductCard({
  product,
  index,
  onAddToCart,
  onViewProduct,
}: {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
    >
      <Card className="relative h-full border-2 border-transparent hover:border-brand-pink/20 transition-all duration-300 overflow-hidden group">
        {/* Rank badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-brand-teal text-white text-xs font-semibold shadow-sm">
            Recomendación #{index + 1}
          </Badge>
        </div>

        {/* Hover accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="pb-2 pt-10">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-bold leading-tight">
                {product.name}
              </CardTitle>
              <CardDescription className="mt-1 text-sm line-clamp-2">
                {product.shortDescription}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`size-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Features (compact) */}
          <ul className="space-y-1.5">
            {product.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="size-4 text-brand-teal shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-brand-pink hover:bg-brand-pink-dark text-white font-semibold shadow-sm"
            size="sm"
          >
            <ShoppingCart className="size-4 mr-1.5" />
            Añadir
          </Button>
          <Button
            variant="outline"
            onClick={() => onViewProduct(product)}
            size="sm"
            className="border-brand-teal/30 text-brand-teal hover:bg-brand-teal-light hover:text-brand-teal-dark"
          >
            <ArrowRight className="size-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// ─── Main Results Page Component ───────────────────────────────

export function ResultsPage() {
  const {
    quizAnswers,
    recommendedProducts,
    setView,
    setSelectedProduct,
    addToCart,
    resetQuiz,
  } = useAppStore();

  const [showConfetti, setShowConfetti] = useState(true);
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());

  const symptom = quizAnswers.symptom || 'mild';
  const greeting = getGreeting(symptom);
  const greetingEmoji = getGreetingEmoji(symptom);
  const socialProofCount = getSocialProofCount(symptom);

  // Primary product (first recommendation)
  const primaryProduct = recommendedProducts[0] || products[0];
  // Secondary products (remaining)
  const secondaryProducts = recommendedProducts.slice(1);

  // Combo savings calculation
  const totalIndividualPrice = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  const comboSavings = Math.round(totalIndividualPrice * 0.1); // 10% combo discount simulation
  const comboTotal = totalIndividualPrice - comboSavings;

  // Confetti timer
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Handle add single product to cart
  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(product);
      setAddedProducts((prev) => new Set(prev).add(product.id));
      // Reset animation after 2s
      setTimeout(() => {
        setAddedProducts((prev) => {
          const next = new Set(prev);
          next.delete(product.id);
          return next;
        });
      }, 2000);
    },
    [addToCart]
  );

  // Handle add all to cart
  const handleAddAllToCart = useCallback(() => {
    recommendedProducts.forEach((product) => {
      addToCart(product);
    });
    setAddedProducts(new Set(recommendedProducts.map((p) => p.id)));
    setTimeout(() => {
      setAddedProducts(new Set());
    }, 2000);
  }, [recommendedProducts, addToCart]);

  // Handle view product detail
  const handleViewProduct = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      setView('product');
    },
    [setSelectedProduct, setView]
  );

  // Handle restart
  const handleRestart = useCallback(() => {
    resetQuiz();
    setView('home');
  }, [resetQuiz, setView]);

  return (
    <>
      {/* Confetti celebration */}
      <AnimatePresence>
        {showConfetti && <ConfettiCelebration />}
      </AnimatePresence>

      <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8">
        {/* ─── Personalized Greeting ──────────────────────────── */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-brand-pink/10 px-4 py-1.5 text-sm font-medium text-brand-pink"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <Sparkles className="size-4" />
            Diagnóstico Personalizado
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-4xl sm:text-5xl mr-2">{greetingEmoji}</span>
            <span className="brand-gradient-text">{greeting}</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Basado en tus respuestas, hemos seleccionado los productos ideales para tu situación.
          </motion.p>
        </motion.div>

        {/* ─── Diagnostic Summary Card ────────────────────────── */}
        <motion.div
          variants={slideInLeft}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <Card className="border-brand-teal/20 bg-gradient-to-br from-brand-teal-light/50 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="size-5 text-brand-teal" />
                Tu Diagnóstico
              </CardTitle>
              <CardDescription>
                Resumen de lo que nos contaste
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {Object.entries(quizAnswers).map(([questionId, answerId]) => (
                  <motion.div
                    key={questionId}
                    variants={staggerItem}
                    className="flex items-start gap-3 rounded-lg bg-background/80 p-3 border border-brand-teal/10"
                  >
                    <div className="flex size-6 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal shrink-0 mt-0.5">
                      <Check className="size-3.5" strokeWidth={3} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        {getQuestionLabel(questionId)}
                      </p>
                      <p className="text-sm font-semibold truncate">
                        {getAnswerLabel(questionId, answerId)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── Social Proof ────────────────────────────────────── */}
        <motion.div
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex -space-x-2">
            {['🧑', '👩', '👧', '👨'].map((emoji, i) => (
              <div
                key={i}
                className="flex size-7 items-center justify-center rounded-full bg-brand-cream border-2 border-background text-sm"
              >
                {emoji}
              </div>
            ))}
          </div>
          <span>
            <strong className="text-foreground">{socialProofCount.toLocaleString('es-CO')}</strong> personas con tu mismo caso eligieron este producto
          </span>
        </motion.div>

        {/* ─── Primary Product (Recomendación #1) ─────────────── */}
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.9 }}
        >
          <Card className="relative border-2 border-brand-pink/30 overflow-hidden shadow-lg shadow-brand-pink/5">
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 brand-gradient" />

            {/* #1 Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-brand-pink text-white text-sm font-bold px-3 py-1 shadow-md badge-shine">
                <Sparkles className="size-3.5 mr-1" />
                Recomendación #1
              </Badge>
            </div>

            {primaryProduct.badge && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-brand-teal text-white text-xs font-semibold shadow-sm">
                  {primaryProduct.badge}
                </Badge>
              </div>
            )}

            <CardHeader className="pb-2 pt-8">
              <CardTitle className="text-2xl sm:text-3xl font-bold pr-32">
                {primaryProduct.name}
              </CardTitle>
              <CardDescription className="text-base">
                {primaryProduct.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < Math.floor(primaryProduct.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold">{primaryProduct.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({primaryProduct.reviewCount} reseñas)
                </span>
              </div>

              {/* Features list */}
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Características
                </h4>
                <ul className="space-y-2.5">
                  {primaryProduct.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + i * 0.08 }}
                    >
                      <div className="flex size-5 items-center justify-center rounded-full bg-brand-teal/10 shrink-0 mt-0.5">
                        <Check className="size-3 text-brand-teal" strokeWidth={3} />
                      </div>
                      <span className="text-sm sm:text-base">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Includes section */}
              {primaryProduct.includes && primaryProduct.includes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    ¿Qué incluye?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {primaryProduct.includes.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2.5 rounded-lg bg-brand-pink-light/50 p-3 border border-brand-pink/10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                      >
                        <Package className="size-4 text-brand-pink shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Size info */}
              {primaryProduct.size && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">Tamaño:</span>
                  <Badge variant="outline" className="text-xs">
                    {primaryProduct.size}
                  </Badge>
                </div>
              )}

              {/* Price + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">
                    {formatPrice(primaryProduct.price)}
                  </span>
                  {primaryProduct.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(primaryProduct.originalPrice)}
                    </span>
                  )}
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => handleAddToCart(primaryProduct)}
                    size="lg"
                    className="bg-brand-pink hover:bg-brand-pink-dark text-white font-semibold px-8 shadow-lg shadow-brand-pink/20 relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {addedProducts.has(primaryProduct.id) ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="size-5" />
                          ¡Añadido!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart className="size-5" />
                          Añadir al Carrito
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── Secondary Products ─────────────────────────────── */}
        {secondaryProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">Productos Complementarios</h2>
              <Badge variant="outline" className="text-brand-teal border-brand-teal/30">
                +{secondaryProducts.length}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryProducts.map((product, i) => (
                <SecondaryProductCard
                  key={product.id}
                  product={product}
                  index={i + 1}
                  onAddToCart={handleAddToCart}
                  onViewProduct={handleViewProduct}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Combo Savings Callout ──────────────────────────── */}
        {recommendedProducts.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Card className="border-2 border-dashed border-brand-pink/30 bg-gradient-to-r from-brand-pink-light/30 via-brand-cream/50 to-brand-teal-light/30 overflow-hidden">
              <CardContent className="py-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="flex size-14 items-center justify-center rounded-full bg-brand-pink/10 shrink-0">
                    <Gift className="size-7 text-brand-pink" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold flex items-center gap-2 justify-center sm:justify-start">
                      ¡Ahorra con el Combo Completo!
                      <Badge className="bg-brand-pink text-white text-xs">OFERTA</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Lleva los {recommendedProducts.length} productos recomendados y obtén un
                      ahorro especial de{' '}
                      <span className="font-bold text-brand-pink">{formatPrice(comboSavings)}</span>
                    </p>
                  </div>
                  <div className="text-center sm:text-right shrink-0">
                    <p className="text-xs text-muted-foreground line-through">
                      {formatPrice(totalIndividualPrice)}
                    </p>
                    <p className="text-2xl font-bold text-foreground">{formatPrice(comboTotal)}</p>
                    <p className="text-xs font-semibold text-brand-pink">
                      Ahorras {formatPrice(comboSavings)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ─── Bottom CTAs ────────────────────────────────────── */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Button
              onClick={handleAddAllToCart}
              size="lg"
              className="w-full sm:w-auto bg-brand-pink hover:bg-brand-pink-dark text-white font-semibold px-8 py-6 text-base shadow-lg shadow-brand-pink/20 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {addedProducts.size === recommendedProducts.length && recommendedProducts.length > 0 ? (
                  <motion.span
                    key="all-added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="size-5" />
                    ¡Todos Añadidos al Carrito!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add-all"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="size-5" />
                    Añadir Todo al Carrito
                    <span className="text-sm opacity-80">({formatPrice(comboTotal)})</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <Button
            variant="outline"
            size="lg"
            onClick={handleRestart}
            className="w-full sm:w-auto border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white font-semibold px-8 py-6 text-base transition-colors duration-300"
          >
            <Heart className="size-4 mr-2" />
            Volver al Inicio
          </Button>
        </motion.div>

        {/* ─── Professional Attention Card ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
        >
          <Card className="border-2 border-brand-teal/20 bg-gradient-to-br from-brand-teal-light/30 to-background">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-full bg-brand-teal/10">
                      <Phone className="size-5 text-brand-teal" />
                    </div>
                    <h3 className="text-lg font-bold">¿Prefieres atención profesional?</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nuestros especialistas en Cabellos Sanos ofrecen tratamiento profesional
                    presencial, sin tóxicos y con resultados garantizados. Agenda tu cita hoy mismo.
                  </p>

                  {/* WhatsApp CTA */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <a
                      href="https://wa.me/573001234567?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita%20para%20tratamiento%20profesional"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold shadow-md"
                        size="lg"
                      >
                        <MessageCircle className="size-5 mr-2" />
                        Escríbenos por WhatsApp
                        <ChevronRight className="size-4 ml-1" />
                      </Button>
                    </a>
                  </motion.div>
                </div>

                {/* Locations */}
                <div className="md:w-64 space-y-2">
                  <h4 className="text-sm font-semibold flex items-center gap-1.5 text-brand-teal">
                    <MapPin className="size-4" />
                    Nuestras Sedes
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {locations
                      .filter((loc) => loc.address !== 'Próximamente')
                      .map((loc) => (
                        <div
                          key={loc.city}
                          className="rounded-lg bg-background/80 p-2.5 border border-brand-teal/10"
                        >
                          <p className="text-sm font-semibold">{loc.city}</p>
                          <p className="text-xs text-muted-foreground leading-snug">
                            {loc.address}
                          </p>
                        </div>
                      ))}
                    <p className="text-xs text-muted-foreground italic">
                      Próximamente en Cali, Ibagué y Bucaramanga
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── Trust Indicators Footer ────────────────────────── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
        >
          {[
            { icon: <ShieldCheck className="size-4" />, text: 'Sin Tóxicos' },
            { icon: <Heart className="size-4" />, text: 'Para Toda la Familia' },
            { icon: <Check className="size-4" />, text: 'Garantía de Efectividad' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground"
            >
              <span className="text-brand-teal">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}

export default ResultsPage;
