export type Provider = {
  id: string;
  name: string;
  title: { ro: string; ru: string; en: string };
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  currency: string;
  nextSlot: string;
  verified: true;
  avatar: string;
  cover: string;
  bio: { ro: string; ru: string; en: string };
  tags: string[];
  aiScore: number;
  scores: {
    reviews: number;
    profile: number;
    response: number;
    experience: number;
    complaints: number;
  };
};

const portraits = [
  "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80&auto=format&fit=crop",
];

const covers = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80&auto=format&fit=crop",
];

export const providers: Provider[] = [
  {
    id: "andrei-popescu",
    name: "Andrei Popescu",
    title: {
      ro: "Mecanic auto BMW certificat",
      ru: "Сертифицированный механик BMW",
      en: "Certified BMW mechanic",
    },
    category: "auto",
    city: "Chișinău, Râșcani",
    rating: 4.9,
    reviewCount: 218,
    priceFrom: 350,
    currency: "MDL",
    nextSlot: "Mâine, 09:30",
    verified: true,
    avatar: portraits[0],
    cover: covers[0],
    bio: {
      ro: "12 ani experiență cu mărci germane. Diagnostic computerizat, reparații motor și transmisie.",
      ru: "12 лет опыта с немецкими марками. Компьютерная диагностика, ремонт двигателя и КПП.",
      en: "12 years with German brands. Computer diagnostics, engine and transmission repair.",
    },
    tags: ["BMW", "Diagnostic", "Râșcani"],
    aiScore: 96,
    scores: { reviews: 28, profile: 19, response: 20, experience: 10, complaints: 19 },
  },
  {
    id: "maria-ionescu",
    name: "Dr. Maria Ionescu",
    title: {
      ro: "Stomatolog estetic",
      ru: "Эстетический стоматолог",
      en: "Aesthetic dentist",
    },
    category: "health",
    city: "Chișinău, Centru",
    rating: 4.8,
    reviewCount: 412,
    priceFrom: 800,
    currency: "MDL",
    nextSlot: "Vineri, 14:00",
    verified: true,
    avatar: portraits[2],
    cover: covers[1],
    bio: {
      ro: "Specialist în albire profesională, fațete ceramice și implantologie modernă.",
      ru: "Специалист по профессиональному отбеливанию, керамическим винирам и имплантологии.",
      en: "Specialist in professional whitening, ceramic veneers and modern implantology.",
    },
    tags: ["Estetic", "Implant", "Albire"],
    aiScore: 94,
    scores: { reviews: 29, profile: 20, response: 18, experience: 9, complaints: 18 },
  },
  {
    id: "victor-rusu",
    name: "Victor Rusu",
    title: {
      ro: "Electrician autorizat",
      ru: "Лицензированный электрик",
      en: "Licensed electrician",
    },
    category: "home",
    city: "Chișinău, Botanica",
    rating: 4.7,
    reviewCount: 156,
    priceFrom: 250,
    currency: "MDL",
    nextSlot: "Astăzi, 17:00",
    verified: true,
    avatar: portraits[1],
    cover: covers[2],
    bio: {
      ro: "Instalații electrice complete pentru case și apartamente. Răspuns rapid la urgențe.",
      ru: "Полная электрика для домов и квартир. Быстрый отклик на аварийные вызовы.",
      en: "Complete electrical installations for homes and flats. Fast emergency response.",
    },
    tags: ["Urgență", "Tablou", "Iluminat"],
    aiScore: 91,
    scores: { reviews: 27, profile: 18, response: 20, experience: 8, complaints: 18 },
  },
  {
    id: "elena-grosu",
    name: "Elena Grosu",
    title: {
      ro: "Avocat — drept comercial",
      ru: "Адвокат — коммерческое право",
      en: "Lawyer — commercial law",
    },
    category: "legal",
    city: "Chișinău, Centru",
    rating: 4.9,
    reviewCount: 87,
    priceFrom: 1500,
    currency: "MDL",
    nextSlot: "Luni, 11:00",
    verified: true,
    avatar: portraits[3],
    cover: covers[0],
    bio: {
      ro: "Contracte comerciale, dreptul muncii, consultanță pentru startup-uri.",
      ru: "Коммерческие договоры, трудовое право, консультации для стартапов.",
      en: "Commercial contracts, labor law, startup advisory.",
    },
    tags: ["Contracte", "Startup", "Litigii"],
    aiScore: 93,
    scores: { reviews: 28, profile: 20, response: 17, experience: 10, complaints: 18 },
  },
  {
    id: "ion-bologan",
    name: "Ion Bologan",
    title: {
      ro: "Specialist renovări complete",
      ru: "Специалист по ремонту под ключ",
      en: "Full renovation specialist",
    },
    category: "home",
    city: "Chișinău, Buiucani",
    rating: 4.6,
    reviewCount: 142,
    priceFrom: 4500,
    currency: "MDL",
    nextSlot: "Săptămâna viitoare",
    verified: true,
    avatar: portraits[4],
    cover: covers[1],
    bio: {
      ro: "Renovări la cheie pentru apartamente. Echipă proprie, materiale premium.",
      ru: "Ремонт под ключ для квартир. Своя команда, премиальные материалы.",
      en: "Turn-key flat renovations. In-house team, premium materials.",
    },
    tags: ["La cheie", "Premium", "Design"],
    aiScore: 89,
    scores: { reviews: 26, profile: 19, response: 16, experience: 10, complaints: 18 },
  },
];

export function getProvider(id: string) {
  return providers.find((p) => p.id === id);
}
