'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Check, Sparkles, Shield, Clock } from 'lucide-react';
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

// ─── Welcome Screen ────────────────────────────────────────────

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const benefits = [
    {
      icon: <Sparkles className="size-5 text-brand-pink" />,
      title: 'Personalizado',
      description: 'Recomendaciones adaptadas a tu situación',
    },
    {
      icon: <Shield className="size-5 text-brand-teal" />,
      title: 'Sin compromiso',
      description: 'Sin registro ni datos personales',
    },
    {
      icon: <Clock className="size-5 text-brand-pink" />,
      title: 'Resultados inmediatos',
      description: 'En solo 60 segundos',
    },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Decorative top circle */}
      <motion.div
        className="absolute -top-20 -right-20 size-64 rounded-full bg-brand-pink/5 blur-3xl pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <motion.div
        className="absolute -bottom-20 -left-20 size-48 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center gap-2 rounded-full bg-brand-pink/10 px-4 py-1.5 text-sm font-medium text-brand-pink mb-6"
      >
        <Sparkles className="size-4" />
        Diagnóstico Gratuito
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="brand-gradient-text">Diagnóstico Gratuito</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-muted-foreground text-base sm:text-lg max-w-md mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Descubre la solución ideal para tu caso en solo{' '}
        <span className="font-semibold text-foreground">60 segundos</span>
      </motion.p>

      {/* Benefits */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-10 w-full max-w-lg"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {benefits.map((benefit) => (
          <motion.div
            key={benefit.title}
            variants={staggerItem}
            className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 text-center"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-brand-cream shrink-0">
              {benefit.icon}
            </div>
            <div>
              <p className="font-semibold text-sm">{benefit.title}</p>
              <p className="text-xs text-muted-foreground">{benefit.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative"
      >
        <Button
          onClick={onStart}
          size="lg"
          className="relative bg-brand-pink hover:bg-brand-pink-dark text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-brand-pink/25 transition-all duration-300 pulse-ring"
        >
          Comenzar Diagnóstico
        </Button>
      </motion.div>

      {/* Trust indicator */}
      <motion.p
        className="mt-4 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        +15,000 familias ya encontraron su solución
      </motion.p>
    </motion.div>
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
  const progressPercent = quizStarted ? ((quizStep + 1) / totalSteps) * 100 : 0;

  const handleStart = useCallback(() => {
    setQuizStarted(true);
    setQuizStep(0);
  }, [setQuizStarted, setQuizStep]);

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

  // ─── Welcome Screen ──────────────────────────────
  if (!quizStarted) {
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Exit button (for consistency, though not critical on welcome) */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExit}
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </Button>
        </div>
        <WelcomeScreen onStart={handleStart} />
      </div>
    );
  }

  // ─── Quiz Steps ──────────────────────────────────
  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 py-6">
      {/* Top bar: Exit + Progress + Step indicator */}
      <div className="flex items-center gap-3 mb-6">
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

        {/* Progress bar */}
        <div className="flex-1 relative">
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
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

      {/* Step dots indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {quizQuestions.map((q, i) => (
          <motion.div
            key={q.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === quizStep
                ? 'w-6 bg-brand-pink'
                : i < quizStep
                ? 'w-4 bg-brand-teal'
                : 'w-4 bg-muted-foreground/20'
            }`}
            layout
          />
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
        className="mt-8 text-center"
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
    </div>
  );
}

export default QuizFlow;
