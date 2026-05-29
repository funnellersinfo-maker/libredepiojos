"use client";

import { useAppStore } from "@/store/use-app-store";
import { Header } from "@/components/shared/header";
import { HeroSection } from "@/components/home/hero-section";
import ProductsSection from "@/components/home/products-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { FooterSection } from "@/components/home/footer-section";
import { QuizFlow } from "@/components/quiz/quiz-flow";
import { ResultsPage } from "@/components/quiz/results-page";
import ProductDetail from "@/components/product/product-detail";
import { CheckoutPage } from "@/components/checkout/checkout-page";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { currentView } = useAppStore();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection />
              <ProductsSection />
              <TestimonialsSection />
              <FaqSection />
            </motion.div>
          )}

          {currentView === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizFlow />
            </motion.div>
          )}

          {currentView === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsPage />
            </motion.div>
          )}

          {currentView === "product" && (
            <motion.div
              key="product"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <ProductDetail />
            </motion.div>
          )}

          {currentView === "checkout" && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CheckoutPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <FooterSection />
    </div>
  );
}
