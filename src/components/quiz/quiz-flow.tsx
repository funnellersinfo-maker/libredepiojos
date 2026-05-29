'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Check, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/store/use-app-store';
import { quizQuestions, getRecommendations } from '@/lib/data';
import type { QuizQuestion, QuizOption } from '@/lib/data';

// ─── Animation Variants ────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const cardHover = {
  scale: 1.03,
  transition: { type: 'spring', stiffness: 400, damping: 25 },
};

const cardTap = {
  scale: 0.97,
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

// ─── Social Proof Messages ─────────────────────────────────────

const socialProofMessages = [
  'María de Bogotá acaba de encontrar su solución 🎉',
  'Carolina de Medellín ya está libre de piojos ✨',
  'Andrea de Barranquilla completó su diagnóstico ✔️',
  'Lucía de Cali encontró el producto ideal 💚',
  'Diana de Bucaramanga resolvió su problema hoy 🙌',
  'Sandra de Ibagué recomendó Libre de Piojos ⭐',
  'Valentina de Bogotá está viendo sus resultados 🎊',
  'Camila de Medellín protege a su familia ahora 🛡️',
  'Natalia de Barranquilla acaba de comprar su kit 🛒',
  'Patricia de Cali encontró la solución perfecta 💫',
];

// ─── Live Counter Hook ─────────────────────────────────────────

function useLiveCounter() {
  // Lazy init with a random base between 47-73
  const [count, setCount] = useState(() => Math.floor(Math.random() * 27) + 47);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        // Fluctuate between -2 and +2, clamped to 30-99
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return Math.max(30, Math.min(99, next));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return count;
}

// ─── Social Proof Ticker Hook ──────────────────────────────────

function useSocialProofTicker() {
  // Lazy init with a random starting message
  const [index, setIndex] = useState(() => Math.floor(Math.random() * socialProofMessages.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % socialProofMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return socialProofMessages[index];
}

// ─── Live Counter Component ────────────────────────────────────

function LiveCounter() {
  const count = useLiveCounter();

  return (
    <motion.div
      className="flex items-center justify-center gap-2 mb-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <div className="flex items-center gap-1.5 bg-brand-pink/8 border border-brand-pink/15 rounded-full px-3 py-1">
        <span className="relative flex size-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75" />
          <span className="relative inline-flex rounded-full size-2 bg-brand-pink" />
        </span>
        <Users className="size-3.5 text-brand-pink" />
        <span className="text-xs font-medium text-brand-pink-dark">
          <span className="tabular-nums font-bold">{count}</span> personas están haciendo el diagnóstico ahora
        </span>
      </div>
    </motion.div>
  );
}

// ─── Social Proof Ticker Component ─────────────────────────────

function SocialProofTicker() {
  const message = useSocialProofTicker();

  return (
    <div className="w-full overflow-hidden mt-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="flex items-center justify-center gap-2 text-center"
        >
          <span className="relative flex size-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex rounded-full size-2 bg-green-500" />
          </span>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            {message}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Option Card ───────────────────────────────────────────────

function OptionCard({
  option,
  isSelected,
  onSelect,
}: {
  option: QuizOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={cardHover}
      whileTap={cardTap}
    >
      <Card
        onClick={onSelect}
        className={`
          relative cursor-pointer transition-all duration-200 py-5 px-4
          flex flex-col items-center gap-3 text-center
          border-2 rounded-xl
          ${
            isSelected
              ? 'border-brand-pink bg-brand-pink-light shadow-md shadow-brand-pink/10'
              : 'border-transparent bg-card hover:border-brand-pink/30 hover:shadow-sm'
          }
        `}
      >
        {/* Checkmark for selected */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-brand-pink text-white"
            >
              <Check className="size-3" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emoji icon */}
        <span className="text-3xl sm:text-4xl select-none leading-none">
          {option.icon}
        </span>

        {/* Label */}
        <span
          className={`text-sm font-medium leading-snug ${
            isSelected ? 'text-brand-pink-dark' : 'text-foreground'
          }`}
        >
          {option.label}
        </span>
      </Card>
    </motion.div>
  );
}

// ─── Quiz Step ─────────────────────────────────────────────────

function QuizStep({
  question,
  stepIndex,
  selectedValue,
  onSelect,
  direction,
}: {
  question: QuizQuestion;
  stepIndex: number;
  selectedValue: string | undefined;
  onSelect: (option: QuizOption) => void;
  direction: number;
}) {
  return (
    <motion.div
      key={question.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      }}
      className="w-full"
    >
      <div className="flex flex-col items-center text-center mb-8">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold tracking-tight mb-2"
          {...fadeInUp}
          transition={{ delay: 0.1 }}
        >
          {question.question}
        </motion.h2>
        {question.subtitle && (
          <motion.p
            className="text-muted-foreground text-sm sm:text-base"
            {...fadeInUp}
            transition={{ delay: 0.15 }}
          >
            {question.subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {question.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            isSelected={selectedValue === option.id}
            onSelect={() => onSelect(option)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── Step Labels ───────────────────────────────────────────────

const stepLabels = ['Síntoma', 'Persona', 'Urgencia', 'Historial', 'Cabello'];

// ─── Main Quiz Flow ────────────────────────────────────────────

export function QuizFlow() {
  const {
    quizStarted,
    setQuizStarted,
    quizStep,
    setQuizStep,
    quizAnswers,
    setQuizAnswer,
    setQuizCompleted,
    setRecommendedProducts,
    setView,
    resetQuiz,
  } = useAppStore();

  const totalSteps = quizQuestions.length;
  const direction = useAppStore((s) => s.quizStep) >= 0 ? 1 : -1;
  const currentQuestion = quizQuestions[quizStep];
  const progressPercent = ((quizStep + 1) / totalSteps) * 100;

  // ─── Auto-start quiz immediately ───────────────────
  const hasAutoStarted = useRef(false);

  useEffect(() => {
    if (!quizStarted && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      setQuizStarted(true);
      setQuizStep(0);
    }
  }, [quizStarted, setQuizStarted, setQuizStep]);

  const handleSelectOption = useCallback(
    (option: QuizOption) => {
      if (!currentQuestion) return;

      setQuizAnswer(currentQuestion.id, option.id);

      const isLastStep = quizStep === totalSteps - 1;

      if (isLastStep) {
        // Build answers with current selection included
        const allAnswers = {
          ...quizAnswers,
          [currentQuestion.id]: option.id,
        };

        // Small delay for visual feedback before transitioning
        setTimeout(() => {
          const recommendations = getRecommendations(allAnswers);
          setRecommendedProducts(recommendations);
          setQuizCompleted(true);
          setView('results');
        }, 300);
      } else {
        // Auto-advance after short delay
        setTimeout(() => {
          setQuizStep(quizStep + 1);
        }, 300);
      }
    },
    [currentQuestion, quizStep, totalSteps, quizAnswers, setQuizAnswer, setQuizStep, setRecommendedProducts, setQuizCompleted, setView]
  );

  const handleBack = useCallback(() => {
    if (quizStep > 0) {
      setQuizStep(quizStep - 1);
    }
  }, [quizStep, setQuizStep]);

  const handleExit = useCallback(() => {
    resetQuiz();
    setView('home');
  }, [resetQuiz, setView]);

  // ─── Quiz Steps (no welcome screen) ────────────────
  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 py-6">
      {/* Live counter near top */}
      <LiveCounter />

      {/* Top bar: Exit + Progress + Step indicator */}
      <div className="flex items-center gap-3 mb-4">
        {/* Back / Exit button */}
        {quizStep > 0 ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full shrink-0 hover:bg-brand-cream text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExit}
            className="rounded-full shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </Button>
        )}

        {/* Progress bar - more prominent with 3px height */}
        <div className="flex-1 relative">
          <div className="h-[3px] w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full quiz-progress-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Step indicator */}
        <span className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap">
          Paso {quizStep + 1} de {totalSteps}
        </span>
      </div>

      {/* Step dots indicator with labels below */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {quizQuestions.map((q, i) => (
          <div key={q.id} className="flex flex-col items-center gap-1.5">
            <motion.div
              className={`rounded-full transition-all duration-300 ${
                i === quizStep
                  ? 'w-7 h-2 bg-brand-pink'
                  : i < quizStep
                  ? 'w-5 h-2 bg-brand-teal'
                  : 'w-5 h-2 bg-muted-foreground/20'
              }`}
              layout
            />
            <span
              className={`text-[10px] sm:text-xs font-medium transition-colors duration-300 ${
                i === quizStep
                  ? 'text-brand-pink'
                  : i < quizStep
                  ? 'text-brand-teal'
                  : 'text-muted-foreground/40'
              }`}
            >
              {stepLabels[i] || `Paso ${i + 1}`}
            </span>
          </div>
        ))}
      </div>

      {/* Question content with animated transitions */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {currentQuestion && (
            <QuizStep
              key={currentQuestion.id}
              question={currentQuestion}
              stepIndex={quizStep}
              selectedValue={quizAnswers[currentQuestion.id]}
              onSelect={handleSelectOption}
              direction={direction}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation hint */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xs text-muted-foreground">
          {quizStep === totalSteps - 1
            ? 'Selecciona una opción para ver tus resultados'
            : 'Selecciona una opción para continuar'}
        </p>
      </motion.div>

      {/* Social proof ticker */}
      <SocialProofTicker />
    </div>
  );
}

export default QuizFlow;
