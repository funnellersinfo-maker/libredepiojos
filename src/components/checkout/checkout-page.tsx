"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppStore } from "@/store/use-app-store";
import { formatPrice, locations, quizQuestions } from "@/lib/data";
import {
  ShoppingCart,
  Minus,
  Plus,
  X,
  Truck,
  ShieldCheck,
  RefreshCw,
  Lock,
  Package,
  CreditCard,
  Banknote,
  Smartphone,
  MessageCircle,
  Home,
  CheckCircle2,
  ArrowLeft,
  ClipboardCheck,
  Star,
  ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionFadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const modalPop = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 10,
    transition: { duration: 0.2 },
  },
};

const itemSlide = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, x: 16, transition: { duration: 0.2 } },
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FREE_SHIPPING_THRESHOLD = 150000;
const SHIPPING_COST = 15000;

type PaymentMethod = "contra-entrega" | "transferencia" | "nequi-daviplata";

const paymentMethods: {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "contra-entrega",
    label: "Contra Entrega",
    description: "Pagas cuando recibes tu pedido",
    icon: <Banknote className="w-5 h-5" />,
  },
  {
    value: "transferencia",
    label: "Transferencia Bancaria",
    description: "Transferencia directa a nuestra cuenta",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    value: "nequi-daviplata",
    label: "Nequi / Daviplata",
    description: "Pago rápido desde tu celular",
    icon: <Smartphone className="w-5 h-5" />,
  },
];

const trustElements = [
  {
    icon: <Lock className="w-4 h-4" />,
    text: "Compra 100% segura",
  },
  {
    icon: <Package className="w-4 h-4" />,
    text: "Envío a todo Colombia",
  },
  {
    icon: <RefreshCw className="w-4 h-4" />,
    text: "Garantía de satisfacción",
  },
];

// ---------------------------------------------------------------------------
// Checkout Page Component
// ---------------------------------------------------------------------------

export function CheckoutPage() {
  const {
    cart,
    cartTotal,
    cartCount,
    removeFromCart,
    updateQuantity,
    clearCart,
    setView,
    setShowSuccessModal,
    showSuccessModal,
    quizAnswers,
    recommendedProducts,
  } = useAppStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    "contra-entrega"
  );
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderNumber, setOrderNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartTotal();
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = qualifiesForFreeShipping ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  // Resolve quiz answers into human-readable labels
  const diagnosisSummary = useMemo(() => {
    const entries: { question: string; answer: string; icon: string }[] = [];
    for (const q of quizQuestions) {
      const answerId = quizAnswers[q.id];
      if (!answerId) continue;
      const option = q.options.find((o) => o.id === answerId || o.value === answerId);
      if (option) {
        entries.push({
          question: q.question,
          answer: option.label,
          icon: option.icon,
        });
      }
    }
    return entries;
  }, [quizAnswers]);

  const hasDiagnosis = diagnosisSummary.length > 0;

  // Primary recommended product
  const primaryRecommendation = recommendedProducts?.[0] ?? null;

  // Generate order number on confirm
  const generateOrderNumber = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `LDP-${timestamp}-${random}`;
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "El nombre es obligatorio";
    }
    if (!formData.phone.trim()) {
      errors.phone = "El teléfono es obligatorio";
    } else if (!/^[\d\s\-+()]{7,}$/.test(formData.phone.trim())) {
      errors.phone = "Ingresa un teléfono válido";
    }
    if (!formData.email.trim()) {
      errors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Ingresa un email válido";
    }
    if (!formData.city) {
      errors.city = "Selecciona una ciudad";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle confirm
  const handleConfirm = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate brief processing
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  // Handle success modal close
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    clearCart();
    setView("home");
  };

  // Update form field
  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // -----------------------------------------------------------------------
  // Empty Cart State
  // -----------------------------------------------------------------------

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#F3F1F0] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D941A8]/10 to-[#2B8780]/10 flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-[#D941A8]/40" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-500 mb-8">
            Explora nuestros productos y encuentra la solución ideal para ti y
            tu familia.
          </p>
          <Button
            onClick={() => setView("home")}
            className="bg-gradient-to-r from-[#D941A8] to-[#c035a0] hover:brightness-110 text-white font-semibold h-12 px-8 rounded-xl shadow-lg shadow-[#D941A8]/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ver Productos
          </Button>
        </motion.div>
      </section>
    );
  }

  // -----------------------------------------------------------------------
  // Main Checkout
  // -----------------------------------------------------------------------

  return (
    <section className="bg-[#F3F1F0] min-h-screen pb-12">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 h-96"
        style={{
          background:
            "linear-gradient(135deg, rgba(217,65,168,0.06) 0%, rgba(43,135,128,0.04) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView("home")}
            className="text-gray-500 hover:text-[#D941A8] -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Seguir Comprando
          </Button>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-0 sm:gap-2 py-3 px-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#2B8780]">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#2B8780] text-white text-xs">
                ✓
              </span>
              Diagnóstico
            </span>
            <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />
            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#2B8780]">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#2B8780] text-white text-xs">
                ✓
              </span>
              Resultados
            </span>
            <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />
            <span className="flex items-center gap-1.5 text-sm font-bold text-[#D941A8]">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#D941A8] text-white text-xs">
                📍
              </span>
              Confirmación
            </span>
          </div>
        </motion.div>

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Completa Tu Solución
          </h1>
          <p className="text-gray-500 mt-1">
            Confirma tus datos y recibe tu solución personalizada
          </p>
        </motion.div>

        {/* ----------------------------------------------------------- */}
        {/* Tu Diagnóstico Summary Card                                  */}
        {/* ----------------------------------------------------------- */}
        {hasDiagnosis && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <Card className="border-0 shadow-md bg-gradient-to-br from-white to-[#F8E0F0]/20 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="w-8 h-8 rounded-lg bg-[#2B8780]/10 flex items-center justify-center">
                    <ClipboardCheck className="w-4 h-4 text-[#2B8780]" />
                  </div>
                  Tu Diagnóstico
                </CardTitle>
                <CardDescription className="text-xs">
                  Basado en tus respuestas del diagnóstico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {diagnosisSummary.map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-white/70 border border-gray-100"
                    >
                      <span className="text-lg leading-none mt-0.5 shrink-0">
                        {entry.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] text-gray-400 leading-tight mb-0.5">
                          {entry.question}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 leading-snug truncate">
                          {entry.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* ============================================================= */}
          {/* LEFT COLUMN: Form + Payment (3 cols on lg)                    */}
          {/* ============================================================= */}
          <div className="lg:col-span-3 space-y-6">
            {/* ----------------------------------------------------------- */}
            {/* Buyer Information Form                                       */}
            {/* ----------------------------------------------------------- */}
            <motion.div
              custom={0}
              variants={sectionFadeIn}
              initial="hidden"
              animate="visible"
            >
              <Card className="border-0 shadow-md bg-white">
                <CardHeader className="pb-0">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 rounded-lg bg-[#D941A8]/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#D941A8]">1</span>
                    </div>
                    Datos de Envío
                  </CardTitle>
                  <CardDescription>
                    Información para el envío de tu solución
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Nombre completo */}
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName">
                      Nombre completo <span className="text-[#D941A8]">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Ej: María Fernanda López"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={
                        formErrors.fullName
                          ? "border-red-400 focus-visible:border-red-500"
                          : ""
                      }
                    />
                    {formErrors.fullName && (
                      <p className="text-xs text-red-500">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Teléfono + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">
                        Teléfono <span className="text-[#D941A8]">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Ej: 300 123 4567"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className={
                          formErrors.phone
                            ? "border-red-400 focus-visible:border-red-500"
                            : ""
                        }
                      />
                      {formErrors.phone && (
                        <p className="text-xs text-red-500">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">
                        Email <span className="text-[#D941A8]">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Ej: maria@email.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={
                          formErrors.email
                            ? "border-red-400 focus-visible:border-red-500"
                            : ""
                        }
                      />
                      {formErrors.email && (
                        <p className="text-xs text-red-500">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ciudad + Dirección row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="city">
                        Ciudad <span className="text-[#D941A8]">*</span>
                      </Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => updateField("city", value)}
                      >
                        <SelectTrigger
                          className={`w-full ${
                            formErrors.city
                              ? "border-red-400 focus-visible:border-red-500"
                              : ""
                          }`}
                        >
                          <SelectValue placeholder="Selecciona tu ciudad" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((loc) => (
                            <SelectItem key={loc.city} value={loc.city}>
                              {loc.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.city && (
                        <p className="text-xs text-red-500">
                          {formErrors.city}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="address">Dirección de envío</Label>
                      <Input
                        id="address"
                        placeholder="Ej: Calle 105A #14-92, Apto 8"
                        value={formData.address}
                        onChange={(e) => updateField("address", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ----------------------------------------------------------- */}
            {/* Payment Method                                               */}
            {/* ----------------------------------------------------------- */}
            <motion.div
              custom={1}
              variants={sectionFadeIn}
              initial="hidden"
              animate="visible"
            >
              <Card className="border-0 shadow-md bg-white">
                <CardHeader className="pb-0">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 rounded-lg bg-[#D941A8]/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#D941A8]">2</span>
                    </div>
                    Método de Pago
                  </CardTitle>
                  <CardDescription>
                    Selecciona cómo deseas pagar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) =>
                      setPaymentMethod(value as PaymentMethod)
                    }
                    className="space-y-3"
                  >
                    {paymentMethods.map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          paymentMethod === method.value
                            ? "border-[#D941A8] bg-[#D941A8]/5 shadow-sm"
                            : "border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <RadioGroupItem
                          value={method.value}
                          className={
                            paymentMethod === method.value
                              ? "text-[#D941A8] border-[#D941A8]"
                              : ""
                          }
                        />
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            paymentMethod === method.value
                              ? "bg-[#D941A8]/10 text-[#D941A8]"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {method.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-semibold text-sm ${
                              paymentMethod === method.value
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {method.label}
                          </p>
                          <p className="text-xs text-gray-500">
                            {method.description}
                          </p>
                        </div>
                        {paymentMethod === method.value && (
                          <CheckCircle2 className="w-5 h-5 text-[#D941A8] shrink-0" />
                        )}
                      </label>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>

            {/* ----------------------------------------------------------- */}
            {/* Trust Elements (Mobile: show here; Desktop: also sidebar)    */}
            {/* ----------------------------------------------------------- */}
            <motion.div
              custom={2}
              variants={sectionFadeIn}
              initial="hidden"
              animate="visible"
              className="lg:hidden"
            >
              <div className="flex flex-col gap-3">
                {trustElements.map((el, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#2B8780]/10 flex items-center justify-center text-[#2B8780]">
                      {el.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {el.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ----------------------------------------------------------- */}
            {/* Confirm Button (Mobile)                                      */}
            {/* ----------------------------------------------------------- */}
            <motion.div
              custom={3}
              variants={sectionFadeIn}
              initial="hidden"
              animate="visible"
              className="lg:hidden"
            >
              <Button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-[#D941A8] to-[#c035a0] hover:brightness-110 text-white shadow-lg shadow-[#D941A8]/25 transition-all duration-300 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Procesando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirmar Solución · {formatPrice(total)}
                  </span>
                )}
              </Button>
            </motion.div>
          </div>

          {/* ============================================================= */}
          {/* RIGHT COLUMN: Order Summary (2 cols on lg)                    */}
          {/* ============================================================= */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* ----------------------------------------------------------- */}
              {/* Tu Kit Recomendado Badge                                     */}
              {/* ----------------------------------------------------------- */}
              {primaryRecommendation && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card className="border-0 shadow-md bg-gradient-to-br from-[#D941A8]/5 to-[#2B8780]/5 overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 flex items-center justify-center">
                          <Image
                            src={primaryRecommendation.image}
                            alt={primaryRecommendation.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <Badge className="bg-[#D941A8] text-white border-0 text-[10px] px-2 py-0 h-5 font-bold tracking-wide uppercase">
                              <Star className="w-3 h-3 mr-0.5" />
                              Recomendación #1
                            </Badge>
                          </div>
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {primaryRecommendation.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {primaryRecommendation.shortDescription}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ----------------------------------------------------------- */}
              {/* Order Summary Card                                           */}
              {/* ----------------------------------------------------------- */}
              <motion.div
                custom={1}
                variants={sectionFadeIn}
                initial="hidden"
                animate="visible"
              >
                <Card className="border-0 shadow-md bg-white">
                  <CardHeader className="pb-0">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-[#D941A8]" />
                        Tu Solución Personalizada
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-[#D941A8]/10 text-[#D941A8] border-0"
                      >
                        {cartCount()} {cartCount() === 1 ? "artículo" : "artículos"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Cart items list */}
                    <div className="max-h-72 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                      <AnimatePresence mode="popLayout">
                        {cart.map((item, index) => (
                          <motion.div
                            key={item.product.id}
                            custom={index}
                            variants={itemSlide}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            className="flex gap-3 p-3 rounded-xl bg-gray-50/80 border border-gray-100"
                          >
                            {/* Product image */}
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 flex items-center justify-center">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                width={48}
                                height={48}
                                className="h-full w-full object-contain"
                              />
                            </div>

                            {/* Product info + controls */}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-gray-900 truncate">
                                {item.product.name}
                              </p>
                              <p className="text-[#D941A8] font-bold text-sm">
                                {formatPrice(item.product.price)}
                              </p>

                              {/* Quantity controls */}
                              <div className="flex items-center gap-2 mt-1.5">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                  aria-label="Reducir cantidad"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-semibold w-6 text-center text-gray-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                  aria-label="Aumentar cantidad"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="ml-auto text-gray-400 hover:text-red-500 transition-colors p-1"
                                  aria-label="Eliminar producto"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Line total */}
                            <div className="text-right shrink-0">
                              <p className="font-bold text-sm text-gray-900">
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <Separator />

                    {/* Subtotal */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-semibold text-gray-800">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Envío</span>
                      {qualifiesForFreeShipping ? (
                        <span className="font-semibold text-green-600 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" />
                          GRATIS
                        </span>
                      ) : (
                        <span className="font-semibold text-gray-800">
                          {formatPrice(SHIPPING_COST)}
                        </span>
                      )}
                    </div>

                    {/* Free shipping notice */}
                    {!qualifiesForFreeShipping && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                        <p className="text-xs text-amber-700 leading-relaxed">
                          <Truck className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                          Envío GRATIS en compras superiores a{" "}
                          <strong>{formatPrice(FREE_SHIPPING_THRESHOLD)}</strong>
                          <br />
                          Te faltan{" "}
                          <strong className="text-[#D941A8]">
                            {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}
                          </strong>{" "}
                          para envío gratis
                        </p>
                      </div>
                    )}

                    {qualifiesForFreeShipping && (
                      <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                        <p className="text-xs text-green-700 leading-relaxed flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 shrink-0" />
                          Envío GRATIS en compras superiores a{" "}
                          <strong>{formatPrice(FREE_SHIPPING_THRESHOLD)}</strong>
                        </p>
                      </div>
                    )}

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between items-end">
                      <span className="text-base font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-xl font-extrabold text-[#D941A8]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* ----------------------------------------------------------- */}
              {/* Trust Elements (Desktop only)                                */}
              {/* ----------------------------------------------------------- */}
              <motion.div
                custom={2}
                variants={sectionFadeIn}
                initial="hidden"
                animate="visible"
                className="hidden lg:block"
              >
                <div className="space-y-3">
                  {trustElements.map((el, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#2B8780]/10 flex items-center justify-center text-[#2B8780]">
                        {el.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {el.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ----------------------------------------------------------- */}
              {/* Confirm Button (Desktop)                                     */}
              {/* ----------------------------------------------------------- */}
              <motion.div
                custom={3}
                variants={sectionFadeIn}
                initial="hidden"
                animate="visible"
                className="hidden lg:block"
              >
                <Button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-[#D941A8] to-[#c035a0] hover:brightness-110 text-white shadow-lg shadow-[#D941A8]/25 transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Confirmar Solución · {formatPrice(total)}
                    </span>
                  )}
                </Button>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Al confirmar, aceptas nuestros términos y condiciones
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* Success Modal                                                     */}
      {/* ================================================================= */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-md border-0 p-0 overflow-hidden"
        >
          <AnimatePresence>
            {showSuccessModal && (
              <motion.div
                variants={modalPop}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Top celebration banner */}
                <div className="relative bg-gradient-to-r from-[#D941A8] to-[#c035a0] px-6 py-8 text-center text-white overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-white/10 -translate-x-8 -translate-y-8" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/5 translate-x-12 translate-y-12" />

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-3 drop-shadow-lg" />
                  </motion.div>
                  <h2 className="text-2xl font-bold">¡Tu Solución Está en Camino!</h2>
                  <p className="text-white/80 text-sm mt-1">
                    Tu solución personalizada ha sido procesada exitosamente
                  </p>
                </div>

                {/* Order details */}
                <div className="px-6 py-6 space-y-5">
                  {/* Order number */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">
                      Número de pedido
                    </p>
                    <p className="text-lg font-bold text-gray-900 font-mono tracking-wide">
                      {orderNumber}
                    </p>
                  </div>

                  <Separator />

                  {/* Summary */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Artículos</span>
                      <span className="font-medium text-gray-800">
                        {cartCount()} {cartCount() === 1 ? "producto" : "productos"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Envío</span>
                      <span
                        className={`font-medium ${
                          qualifiesForFreeShipping
                            ? "text-green-600"
                            : "text-gray-800"
                        }`}
                      >
                        {qualifiesForFreeShipping
                          ? "GRATIS"
                          : formatPrice(SHIPPING_COST)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base pt-1">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-[#D941A8]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment method selected */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-[#D941A8]/10 flex items-center justify-center text-[#D941A8]">
                      {paymentMethods.find((m) => m.value === paymentMethod)
                        ?.icon || <CreditCard className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {
                          paymentMethods.find(
                            (m) => m.value === paymentMethod
                          )?.label
                        }
                      </p>
                      <p className="text-xs text-gray-500">
                        {
                          paymentMethods.find(
                            (m) => m.value === paymentMethod
                          )?.description
                        }
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/573102720863?text=${encodeURIComponent(
                      `¡Hola! Acabo de confirmar mi solución personalizada (pedido ${orderNumber}) por ${formatPrice(
                        total
                      )}. Mi diagnóstico: ${
                        hasDiagnosis
                          ? diagnosisSummary.map((d) => d.answer).join(", ")
                          : "N/A"
                      }. Quiero hacer seguimiento.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors shadow-md shadow-green-500/20"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Seguimiento por WhatsApp
                  </a>

                  <p className="text-xs text-center text-gray-400">
                    Te enviaremos confirmación y seguimiento de tu pedido a{" "}
                    <strong>{formData.email || "tu email"}</strong>
                  </p>

                  {/* Home CTA */}
                  <Button
                    onClick={handleSuccessClose}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#D941A8] to-[#c035a0] hover:brightness-110 text-white font-semibold shadow-lg shadow-[#D941A8]/20"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Volver al Inicio
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
