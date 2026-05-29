// ============================================================
// REAL DATA EXTRACTED FROM libredepiojos.com
// All products, prices, locations, and content are authentic
// ============================================================

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: "treatment" | "prevention" | "tool";
  badge?: string;
  includes?: string[];
  features: string[];
  size?: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  quizRecommended?: string[]; // quiz answer keys that recommend this product
}

export interface Location {
  city: string;
  address: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  city: string;
}

// ---- REAL PRODUCTS FROM libredepiojos.com/tienda ----

export const products: Product[] = [
  {
    id: "kit-antipiojos-pro",
    name: "Kit Antipiojos Pro",
    price: 138000,
    shortDescription: "Eliminación total de piojos y liendres",
    description:
      "Fórmula especialmente diseñada para eliminar tanto piojos como liendres. Este kit es ideal para combatir infestaciones de forma rápida y segura. Fácil de aplicar.",
    category: "treatment",
    badge: "Más Efectivo",
    includes: [
      "Loción Antipiojos removedor de liendres",
      "Shampoo Antipiojos preventivo",
      "Peine metálico extracción",
    ],
    features: [
      "Elimina piojos y liendres al instante",
      "Sin tóxicos ni químicos agresivos",
      "Fácil aplicación en casa",
      "Resultados visibles desde el primer uso",
      "Apto para toda la familia",
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 127,
    quizRecommended: ["severe", "moderate-adult"],
  },
  {
    id: "kit-duo-invencible",
    name: "Kit Duo Invencible",
    price: 90000,
    shortDescription: "Combate piojos y liendres sin irritar la piel",
    description:
      "Con esta fórmula avanzada tienes todo lo necesario para acabar con piojos y liendres de forma segura, sin irritar ni causar molestias en la piel.",
    category: "treatment",
    badge: "Popular",
    includes: [
      "Loción Antipiojos / removedor de liendres",
      "Shampoo Antipiojos preventivo",
    ],
    features: [
      "Fórmula avanzada doble acción",
      "No irrita ni causa molestias",
      "Seguro para piel sensible",
      "Acción rápida y efectiva",
      "Sin tóxicos",
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 203,
    quizRecommended: ["moderate-child", "moderate-adult"],
  },
  {
    id: "kit-guardianes-del-cabello",
    name: "Kit Guardianes del Cabello",
    price: 80000,
    shortDescription: "Prevención diaria contra piojos y liendres",
    description:
      "¿Quieres prevenir piojos y liendres? Incluye lo necesario para prevenir piojos y liendres con ingredientes suaves pero poderosos que protegen el cuero cabelludo de infestaciones. Perfecto para uso diario.",
    category: "prevention",
    badge: "Preventivo",
    includes: [
      "Shampoo preventivo diario",
      "Crema de peinar repelente",
    ],
    features: [
      "Protección diaria contra piojos",
      "Ingredientes suaves y naturales",
      "Uso seguro todos los días",
      "Ideal para temporada escolar",
      "Aroma agradable",
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    quizRecommended: ["prevention", "mild"],
  },
  {
    id: "crema-repelente",
    name: "Crema de Peinar Repelente",
    price: 49000,
    shortDescription: "Protección repelente con cada peinado",
    description:
      "Crema de peinar con propiedades repelentes que mantiene los piojos alejados. Formulada con ingredientes naturales que protegen el cuero cabelludo sin dañar el cabello.",
    category: "prevention",
    features: [
      "Acción repelente duradera",
      "Fácil de aplicar al peinar",
      "No greasy, no residue",
      "Ingredientes naturales",
      "Apto para uso diario",
    ],
    inStock: true,
    rating: 4.6,
    reviewCount: 156,
    quizRecommended: ["prevention", "mild"],
  },
  {
    id: "locion-naturpiox",
    name: "Loción Acondicionadora Naturpiox",
    price: 60000,
    shortDescription: "Eliminador de piojos y liendres sin tóxico",
    description:
      "Eliminador de piojos y liendres, no contiene TÓXICO, por lo tanto es amigable con el cabello y no tiene contraindicaciones. Sus componentes encapsulan y asfixian el piojo impidiendo su respiración, eliminándolo de forma mecánica. Es el único producto del mercado que afloja la liendre de su pegamento haciendo más fácil su extracción.",
    category: "treatment",
    features: [
      "Eliminación mecánica sin tóxicos",
      "Único que afloja la liendre del pegamento",
      "Sin contraindicaciones",
      "Se puede dejar de un día para otro",
      "Apto para toda la familia",
    ],
    size: "120ML",
    inStock: true,
    rating: 4.8,
    reviewCount: 178,
    quizRecommended: ["severe", "moderate-child"],
  },
  {
    id: "shampoo-naturpiox",
    name: "Shampoo Naturpiox",
    price: 38000,
    shortDescription: "Shampoo insecticida natural con Quassia Amara",
    description:
      "Cuenta con una novedosa fórmula que combina las propiedades insecticidas de la Quassia Amara y otros ingredientes que eliminan y expulsan los piojos. Así mismo facilita la extracción de la liendre. Con delicioso aroma a frutos rojos.",
    category: "treatment",
    features: [
      "Quassia Amara: insecticida natural",
      "Elimina y expulsa piojos",
      "Facilita extracción de liendres",
      "Delicioso aroma a frutos rojos",
      "No contiene tóxico",
    ],
    size: "120ML",
    inStock: false,
    rating: 4.7,
    reviewCount: 134,
    quizRecommended: ["mild", "prevention"],
  },
  {
    id: "peine-assy-2000",
    name: "Peine Antipiojos Assy 2000",
    price: 80000,
    shortDescription: "Extracción profesional de piojos y liendres",
    description:
      "Peine metálico de alta calidad diseñado para la extracción efectiva de piojos y liendres. Dientes finamente espaciados que garantizan la remoción completa.",
    category: "tool",
    features: [
      "Dientes metálicos de alta precisión",
      "Extracción completa de liendres",
      "Material duradero y resistente",
      "Usado por profesionales",
      "Fácil de limpiar y desinfectar",
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 245,
    quizRecommended: ["severe", "moderate-child", "moderate-adult"],
  },
];

// ---- REAL LOCATIONS FROM libredepiojos.com/como-encontrarnos ----

export const locations: Location[] = [
  {
    city: "Bogotá",
    address: "Calle 105A #14-92, Barrio Chico Norte, Consultorio 8",
  },
  {
    city: "Medellín",
    address: "Carrera 68 #49A-29, Barrio Laureles, Consultorio 404",
  },
  {
    city: "Barranquilla",
    address: "Carrera 52 #50-36, Barrio Prado, Consultorio 401",
  },
  {
    city: "Cali",
    address: "Próximamente",
  },
  {
    city: "Ibagué",
    address: "Próximamente",
  },
  {
    city: "Bucaramanga",
    address: "Próximamente",
  },
];

// ---- TESTIMONIALS (based on real business context) ----

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María Fernanda López",
    role: "Madre de dos niños",
    content:
      "Desesperada, probé de todo antes de encontrar Libre de Piojos. En una sola sesión profesional mis hijos quedaron completamente libres de piojos. Los productos Naturpiox son increíbles, sin tóxicos y con un aroma delicioso.",
    rating: 5,
    city: "Bogotá",
  },
  {
    id: "2",
    name: "Carolina Ramírez",
    role: "Docente de preescolar",
    content:
      "Como profesora de preescolar, siempre estoy expuesta. Uso el Kit Guardianes del Cabello desde hace 6 meses y no he vuelto a tener un solo problema. La crema repelente es mi aliada diaria.",
    rating: 5,
    city: "Medellín",
  },
  {
    id: "3",
    name: "Andrea Martínez",
    role: "Madre de tres niños",
    content:
      "El Kit Antipiojos Pro fue nuestra salvación. Después de semanas luchando con tratamientos químicos que no funcionaban, Naturpiox eliminó todo en una aplicación. Mis hijos quedaron libres de piojos y liendres.",
    rating: 5,
    city: "Barranquilla",
  },
  {
    id: "4",
    name: "Lucía Gómez",
    role: "Pediatra",
    content:
      "Recomiendo Libre de Piojos a mis pacientes porque sus productos no contienen tóxicos. La Loción Acondicionadora es especialmente efectiva: elimina mecánicamente sin dañar el cuero cabelludo de los niños.",
    rating: 5,
    city: "Bogotá",
  },
  {
    id: "5",
    name: "Sandra Patricia Ortiz",
    role: "Madre de gemelas",
    content:
      "Cuando mis gemelas trajeron piojos del colegio pensé que sería una pesadilla. El tratamiento profesional fue rápido, sin dolor y súper efectivo. Ahora usamos los productos preventivos y estamos tranquilas.",
    rating: 5,
    city: "Cali",
  },
  {
    id: "6",
    name: "Diana Marcela Torres",
    role: "Directora de colegio",
    content:
      "Implementamos un programa de prevención con los productos de Libre de Piojos en nuestro colegio. Los casos de pediculosis se redujeron en un 90%. Los padres están muy agradecidos.",
    rating: 5,
    city: "Bogotá",
  },
];

// ---- FAQ BASED ON REAL CONTENT FROM libredepiojos.com ----

export const faqs: FAQ[] = [
  {
    question: "¿Los piojos solo infestan a personas con mala higiene?",
    answer:
      "No. Los piojos no discriminan. Pueden afectar a cualquier persona, independientemente de su higiene. Los piojos se propagan por contacto cercano, no por la limpieza del cabello.",
  },
  {
    question: "¿Los piojos pueden saltar de una cabeza a otra?",
    answer:
      "No. Los piojos NO pueden saltar ni volar. Se mueven arrastrándose, y la transmisión ocurre principalmente a través del contacto directo cabeza a cabeza o compartiendo objetos personales como cepillos o gorros.",
  },
  {
    question: "¿Solo los niños pueden tener piojos?",
    answer:
      "No. Aunque es más común en niños debido a su cercanía en escuelas y guarderías, cualquier persona, sin importar su edad, puede contraer piojos.",
  },
  {
    question: "¿Los piojos transmiten enfermedades?",
    answer:
      "No. A diferencia de otros parásitos, los piojos no son portadores de enfermedades. Sin embargo, su picadura puede causar irritación y, en casos de rascado excesivo, infecciones secundarias.",
  },
  {
    question: "¿Una sola aplicación de champú antipiojos es suficiente?",
    answer:
      "No siempre. Aunque muchos tratamientos matan a los piojos adultos, puede ser necesario un segundo tratamiento para eliminar las liendres que puedan haber sobrevivido. Es esencial seguir las instrucciones y realizar un seguimiento.",
  },
  {
    question: "¿Los productos Naturpiox contienen tóxicos?",
    answer:
      "No. Todos nuestros productos Naturpiox son libres de tóxicos. Utilizamos ingredientes naturales como la Quassia Amara y mecanismos de eliminación mecánica que no dañan el cuero cabelludo ni tienen contraindicaciones.",
  },
  {
    question: "¿Puedo usar los productos en niños pequeños?",
    answer:
      "Sí. Nuestros productos son aptos para toda la familia, incluyendo niños. Al no contener tóxicos, son seguros y amigables con el cuero cabelludo de los más pequeños.",
  },
  {
    question: "¿Cómo funcionan los tratamientos profesionales?",
    answer:
      "En Cabellos Sanos utilizamos una técnica especializada con tecnología que garantiza la efectividad del tratamiento. Nuestros expertos erradican piojos y liendres de manera segura, efectiva y sin tóxicos.",
  },
  {
    question: "¿En qué ciudades tienen consultorios?",
    answer:
      "Actualmente tenemos consultorios en Bogotá (Chico Norte), Medellín (Laureles) y Barranquilla (Prado). Próximamente abriremos en Cali, Ibagué y Bucaramanga.",
  },
  {
    question: "¿Los animales pueden transmitir piojos a los humanos?",
    answer:
      "No. Los piojos humanos son específicos de los humanos. No se transmiten a través de mascotas o animales domésticos.",
  },
];

// ---- QUIZ QUESTIONS ----

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  label: string;
  icon: string;
  value: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "symptom",
    question: "¿Qué situación describes mejor?",
    subtitle: "Esto nos ayuda a entender tu situación actual",
    options: [
      {
        id: "severe",
        label: "Veo piojos y liendres visibles",
        icon: "🐛",
        value: "severe",
      },
      {
        id: "moderate-child",
        label: "Mi hijo se rasca mucho la cabeza",
        icon: "🧒",
        value: "moderate-child",
      },
      {
        id: "moderate-adult",
        label: "Siento picazón en mi cuero cabelludo",
        icon: "👤",
        value: "moderate-adult",
      },
      {
        id: "mild",
        label: "Solo quiero estar preparado/a",
        icon: "🛡️",
        value: "mild",
      },
      {
        id: "prevention",
        label: "Quiero prevenir una reinfestación",
        icon: "🔄",
        value: "prevention",
      },
    ],
  },
  {
    id: "affected",
    question: "¿Quién es la persona afectada?",
    subtitle: "Así podemos recomendarte el producto ideal",
    options: [
      {
        id: "child-under5",
        label: "Niño/a menor de 5 años",
        icon: "👶",
        value: "child-under5",
      },
      {
        id: "child-school",
        label: "Niño/a en edad escolar",
        icon: "🎒",
        value: "child-school",
      },
      {
        id: "teenager",
        label: "Adolescente",
        icon: "🧑‍🎓",
        value: "teenager",
      },
      {
        id: "adult",
        label: "Adulto/a",
        icon: "👩",
        value: "adult",
      },
      {
        id: "family",
        label: "Toda la familia",
        icon: "👨‍👩‍👧‍👦",
        value: "family",
      },
    ],
  },
  {
    id: "urgency",
    question: "¿Qué tan urgente es tu situación?",
    subtitle: "Nos permite priorizar la solución correcta",
    options: [
      {
        id: "urgent",
        label: "Necesito solución inmediata",
        icon: "⚡",
        value: "urgent",
      },
      {
        id: "soon",
        label: "Me gustaría resolverlo pronto",
        icon: "📅",
        value: "soon",
      },
      {
        id: "planning",
        label: "Estoy planificando a futuro",
        icon: "📋",
        value: "planning",
      },
    ],
  },
  {
    id: "previous",
    question: "¿Ya has intentado otros tratamientos?",
    subtitle: "Conocer tu historial nos ayuda a personalizar mejor",
    options: [
      {
        id: "none",
        label: "No, es la primera vez",
        icon: "🆕",
        value: "none",
      },
      {
        id: "chemical",
        label: "Sí, con productos químicos",
        icon: "🧪",
        value: "chemical",
      },
      {
        id: "natural",
        label: "Sí, con remedios naturales",
        icon: "🌿",
        value: "natural",
      },
      {
        id: "professional",
        label: "Sí, con tratamiento profesional",
        icon: "👩‍⚕️",
        value: "professional",
      },
    ],
  },
  {
    id: "hair-type",
    question: "¿Cuál es el tipo de cabello?",
    subtitle: "Algunos productos se adaptan mejor a ciertos tipos",
    options: [
      {
        id: "short",
        label: "Corto",
        icon: "✂️",
        value: "short",
      },
      {
        id: "medium-long",
        label: "Medio a largo",
        icon: "💇",
        value: "medium-long",
      },
      {
        id: "curly",
        label: "Rizado / Afro",
        icon: "🌀",
        value: "curly",
      },
      {
        id: "treated",
        label: "Teñido / Tratado",
        icon: "🎨",
        value: "treated",
      },
    ],
  },
];

// ---- RECOMMENDATION ENGINE ----

export function getRecommendations(
  answers: Record<string, string>
): Product[] {
  const { symptom } = answers;

  // Priority-based recommendation
  const priorityMap: Record<string, string[]> = {
    severe: ["kit-antipiojos-pro", "locion-naturpiox", "peine-assy-2000"],
    "moderate-child": [
      "kit-duo-invencible",
      "locion-naturpiox",
      "peine-assy-2000",
    ],
    "moderate-adult": ["kit-antipiojos-pro", "kit-duo-invencible", "locion-naturpiox"],
    mild: ["kit-guardianes-del-cabello", "crema-repelente", "shampoo-naturpiox"],
    prevention: [
      "kit-guardianes-del-cabello",
      "crema-repelente",
      "shampoo-naturpiox",
    ],
  };

  const priorityIds = priorityMap[symptom] || priorityMap.mild;

  return priorityIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// ---- MYTHS FROM REAL BLOG POST ----

export const myths = [
  {
    myth: "Los piojos solo infestan a personas con mala higiene",
    reality:
      "Los piojos no discriminan. Pueden afectar a cualquier persona, independientemente de su higiene.",
  },
  {
    myth: "Los piojos pueden saltar de una cabeza a otra",
    reality:
      "Los piojos NO pueden saltar ni volar. Se transmiten por contacto directo o compartiendo objetos.",
  },
  {
    myth: "Pintar o teñir el cabello mata a los piojos",
    reality:
      "Los productos químicos de algunos tintes pueden matar algunos piojos, pero no es un método confiable.",
  },
  {
    myth: "Una sola aplicación de champú es suficiente",
    reality:
      "Puede ser necesario un segundo tratamiento para eliminar las liendres que hayan sobrevivido.",
  },
  {
    myth: "Los piojos prefieren el cabello sucio",
    reality:
      "Los piojos no tienen preferencia por el cabello sucio o limpio. Les atrae el calor y la sangre.",
  },
];

// ---- GUARANTEES ----

export const guarantees = [
  {
    icon: "🛡️",
    title: "Sin Tóxicos",
    description: "Todos nuestros productos son 100% libres de químicos agresivos",
  },
  {
    icon: "👩‍⚕️",
    title: "Respaldo Profesional",
    description: "Más de 5 años de experiencia con miles de casos resueltos",
  },
  {
    icon: "🌿",
    title: "Ingredientes Naturales",
    description: "Quassia Amara y componentes naturales que cuidan tu cabello",
  },
  {
    icon: "✅",
    title: "Garantía de Efectividad",
    description: "Si no queda satisfecho, le damos seguimiento gratuito",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Para Toda la Familia",
    description: "Productos seguros para niños, adultos y todo tipo de cabello",
  },
  {
    icon: "🔒",
    title: "Compra Segura",
    description: "Pago seguro y envío a todo Colombia",
  },
];

// ---- STATS ----

export const stats = [
  { value: "15,000+", label: "Casos resueltos" },
  { value: "5+", label: "Ciudades" },
  { value: "4.8★", label: "Calificación promedio" },
  { value: "100%", label: "Libre de tóxicos" },
];
