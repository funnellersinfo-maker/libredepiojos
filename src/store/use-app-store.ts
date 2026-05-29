import { create } from "zustand";
import type { Product } from "@/lib/data";

export type AppView =
  | "home"
  | "quiz"
  | "results"
  | "product"
  | "cart"
  | "checkout";

interface CartItem {
  product: Product;
  quantity: number;
}

interface AppState {
  // Navigation
  currentView: AppView;
  setView: (view: AppView) => void;

  // Quiz
  quizStarted: boolean;
  quizStep: number;
  quizAnswers: Record<string, string>;
  quizCompleted: boolean;
  recommendedProducts: Product[];
  setQuizStarted: (started: boolean) => void;
  setQuizStep: (step: number) => void;
  setQuizAnswer: (questionId: string, answerId: string) => void;
  setQuizCompleted: (completed: boolean) => void;
  setRecommendedProducts: (products: Product[]) => void;
  resetQuiz: () => void;

  // Product detail
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // UI
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Navigation
  currentView: "home",
  setView: (view) => set({ currentView: view }),

  // Quiz
  quizStarted: false,
  quizStep: 0,
  quizAnswers: {},
  quizCompleted: false,
  recommendedProducts: [],
  setQuizStarted: (started) => set({ quizStarted: started }),
  setQuizStep: (step) => set({ quizStep: step }),
  setQuizAnswer: (questionId, answerId) =>
    set((state) => ({
      quizAnswers: { ...state.quizAnswers, [questionId]: answerId },
    })),
  setQuizCompleted: (completed) => set({ quizCompleted: completed }),
  setRecommendedProducts: (products) =>
    set({ recommendedProducts: products }),
  resetQuiz: () =>
    set({
      quizStarted: false,
      quizStep: 0,
      quizAnswers: {},
      quizCompleted: false,
      recommendedProducts: [],
    }),

  // Product detail
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  // Cart
  cart: [],
  addToCart: (product, quantity = 1) =>
    set((state) => {
      const existing = state.cart.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.product.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart:
        quantity <= 0
          ? state.cart.filter((i) => i.product.id !== productId)
          : state.cart.map((i) =>
              i.product.id === productId ? { ...i, quantity } : i
            ),
    })),
  clearCart: () => set({ cart: [] }),
  cartTotal: () =>
    get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),

  // UI
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
  showSuccessModal: false,
  setShowSuccessModal: (show) => set({ showSuccessModal: show }),
}));
