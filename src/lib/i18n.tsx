import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ro" | "ru" | "en";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  ro: {
    "nav.explore": "Explorează",
    "nav.providers": "Profesioniști",
    "nav.dashboard": "Panou",
    "nav.signin": "Autentificare",
    "nav.signup": "Înregistrare",
    "nav.history": "Istoric",
    "nav.help": "Centru Ajutor",
    "nav.releases": "Noutăți",
    "nav.terms": "Termeni și condiții",
    "nav.privacy": "Politica de confidențialitate",

    "hero.badge": "Marketplace AI pentru Moldova",
    "hero.title.1": "Găsește profesionistul potrivit",
    "hero.title.2": "în câteva secunde",
    "hero.subtitle": "Descrie de ce ai nevoie. AI-ul nostru îți găsește cei mai buni experți verificați.",
    "hero.placeholder": "Am nevoie de un mecanic BMW în Râșcani cu recenzii bune...",
    "hero.cta": "Găsește experți",
    "hero.suggestions": "Sugestii populare",
    "sugg.1": "Electrician aproape de mine",
    "sugg.2": "Cel mai bun stomatolog în Chișinău",
    "sugg.3": "Avocat pentru contracte",
    "sugg.4": "Specialist renovări apartament",

    "results.title": "Cei mai buni experți pentru tine",
    "results.subtitle": "Recomandări AI bazate pe cererea ta",
    "results.aiTag": "Recomandat pentru cererea ta",
    "results.viewProfile": "Vezi profilul",
    "results.book": "Rezervă acum",
    "results.next": "Următorul slot",
    "results.from": "de la",

    "profile.verified": "Verificat",
    "profile.reviews": "recenzii",
    "profile.about": "Despre",
    "profile.services": "Servicii și prețuri",
    "profile.portfolio": "Portofoliu",
    "profile.availability": "Disponibilitate",
    "profile.book": "Rezervă consultație",
    "profile.aiScore": "Scorul AI Skyff",

    "book.title": "Rezervă o programare",
    "book.date": "Selectează data",
    "book.time": "Selectează ora",
    "book.summary": "Sumar rezervare",
    "book.confirm": "Confirmă rezervarea",
    "book.with": "cu",

    "dash.title": "Panou de control",
    "dash.overview": "Privire de ansamblu",
    "dash.bookings": "Rezervări",
    "dash.calendar": "Calendar",
    "dash.reviews": "Recenzii",
    "dash.settings": "Setări",
    "dash.totalBookings": "Rezervări totale",
    "dash.earnings": "Câștiguri lunare",
    "dash.rating": "Scor mediu",
    "dash.profileViews": "Vizualizări profil",

    "rating.title": "Cum se calculează scorul tău AI",
    "rating.subtitle": "Transparență totală — algoritmul Skyff evaluează 5 dimensiuni",
    "rating.reviews": "Recenzii clienți",
    "rating.profile": "Calitatea profilului",
    "rating.response": "Reactivitate",
    "rating.experience": "Experiență",
    "rating.complaints": "Gestionare reclamații",

    "footer.tagline": "Marketplace inteligent pentru servicii profesionale.",
    "results.empty.title": "Nu s-au găsit rezultate pentru",
    "results.empty.subtitle": "Încearcă să ajustezi termenii căutării sau ajută-ne să ne creștem comunitatea.",
    "contribute.title": "Cunoști un expert excelent?",
    "contribute.subtitle": "Lasă-ne numărul de telefon și îl vom invita să se alăture Skyff.io",
    "contribute.placeholder": "Număr de telefon (ex: +373...)",
    "contribute.submit": "Trimite",
    "contribute.sending": "Se trimite...",
    "contribute.success.title": "Mulțumim pentru contribuție!",
    "contribute.success.subtitle": "Echipa noastră va contacta expertul și îl va verifica în curând. Împreună facem Skyff mai bun.",
    "contribute.success.another": "Trimite alt expert",
  },
  ru: {
    "nav.explore": "Обзор",
    "nav.providers": "Специалисты",
    "nav.dashboard": "Панель",
    "nav.signin": "Войти",
    "nav.signup": "Регистрация",
    "nav.history": "История",
    "nav.help": "Центр помощи",
    "nav.releases": "Обновления",
    "nav.terms": "Условия использования",
    "nav.privacy": "Политика конфиденциальности",

    "hero.badge": "AI-маркетплейс для Молдовы",
    "hero.title.1": "Найдите нужного специалиста",
    "hero.title.2": "за несколько секунд",
    "hero.subtitle": "Опишите, что вам нужно. Наш AI подберёт лучших проверенных экспертов.",
    "hero.placeholder": "Мне нужен механик BMW в Рышкановке с хорошими отзывами...",
    "hero.cta": "Найти экспертов",
    "hero.suggestions": "Популярные запросы",
    "sugg.1": "Электрик рядом",
    "sugg.2": "Лучший стоматолог в Кишинёве",
    "sugg.3": "Юрист по договорам",
    "sugg.4": "Специалист по ремонту",

    "results.title": "Лучшие эксперты для вас",
    "results.subtitle": "AI-рекомендации на основе вашего запроса",
    "results.aiTag": "Рекомендовано по вашему запросу",
    "results.viewProfile": "Открыть профиль",
    "results.book": "Забронировать",
    "results.next": "Ближайшее время",
    "results.from": "от",

    "profile.verified": "Проверен",
    "profile.reviews": "отзывов",
    "profile.about": "О специалисте",
    "profile.services": "Услуги и цены",
    "profile.portfolio": "Портфолио",
    "profile.availability": "Доступность",
    "profile.book": "Записаться",
    "profile.aiScore": "AI-рейтинг Skyff",

    "book.title": "Запись на приём",
    "book.date": "Выберите дату",
    "book.time": "Выберите время",
    "book.summary": "Сводка",
    "book.confirm": "Подтвердить запись",
    "book.with": "к",

    "dash.title": "Панель управления",
    "dash.overview": "Обзор",
    "dash.bookings": "Бронирования",
    "dash.calendar": "Календарь",
    "dash.reviews": "Отзывы",
    "dash.settings": "Настройки",
    "dash.totalBookings": "Всего бронирований",
    "dash.earnings": "Доход за месяц",
    "dash.rating": "Средний рейтинг",
    "dash.profileViews": "Просмотры профиля",

    "rating.title": "Как рассчитывается ваш AI-рейтинг",
    "rating.subtitle": "Полная прозрачность — алгоритм Skyff оценивает 5 параметров",
    "rating.reviews": "Отзывы клиентов",
    "rating.profile": "Качество профиля",
    "rating.response": "Отзывчивость",
    "rating.experience": "Опыт",
    "rating.complaints": "Работа с жалобами",

    "footer.tagline": "Умный маркетплейс профессиональных услуг.",
    "results.empty.title": "Результаты не найдены по запросу",
    "results.empty.subtitle": "Попробуйте изменить параметры поиска или помогите нам расширить сообщество.",
    "contribute.title": "Знаете отличного специалиста?",
    "contribute.subtitle": "Оставьте его номер телефона, и мы пригласим его присоединиться к Skyff.io",
    "contribute.placeholder": "Номер телефона (напр. +373...)",
    "contribute.submit": "Отправить",
    "contribute.sending": "Отправка...",
    "contribute.success.title": "Спасибо за ваш вклад!",
    "contribute.success.subtitle": "Наша команда свяжется со специалистом и проверит его в ближайшее время. Вместе мы делаем Skyff лучше.",
    "contribute.success.another": "Предложить другого специалиста",
  },
  en: {
    "nav.explore": "Explore",
    "nav.providers": "Pros",
    "nav.dashboard": "Dashboard",
    "nav.signin": "Sign in",
    "nav.signup": "Sign up",
    "nav.history": "History",
    "nav.help": "Help Center",
    "nav.releases": "Release Notes",
    "nav.terms": "Terms of Service",
    "nav.privacy": "Privacy Policy",

    "hero.badge": "AI marketplace for Moldova",
    "hero.title.1": "Find the right professional",
    "hero.title.2": "in seconds",
    "hero.subtitle": "Describe what you need. Our AI finds the best verified experts for you.",
    "hero.placeholder": "I need a BMW mechanic in Rascani with good reviews...",
    "hero.cta": "Find experts",
    "hero.suggestions": "Popular prompts",
    "sugg.1": "Electrician near me",
    "sugg.2": "Best dentist in Chisinau",
    "sugg.3": "Lawyer for contracts",
    "sugg.4": "Home renovation specialist",

    "results.title": "Top experts for you",
    "results.subtitle": "AI recommendations based on your request",
    "results.aiTag": "Recommended based on your request",
    "results.viewProfile": "View profile",
    "results.book": "Book now",
    "results.next": "Next slot",
    "results.from": "from",

    "profile.verified": "Verified",
    "profile.reviews": "reviews",
    "profile.about": "About",
    "profile.services": "Services & pricing",
    "profile.portfolio": "Portfolio",
    "profile.availability": "Availability",
    "profile.book": "Book consultation",
    "profile.aiScore": "Skyff AI score",

    "book.title": "Book an appointment",
    "book.date": "Select date",
    "book.time": "Select time",
    "book.summary": "Booking summary",
    "book.confirm": "Confirm booking",
    "book.with": "with",

    "dash.title": "Provider dashboard",
    "dash.overview": "Overview",
    "dash.bookings": "Bookings",
    "dash.calendar": "Calendar",
    "dash.reviews": "Reviews",
    "dash.settings": "Settings",
    "dash.totalBookings": "Total bookings",
    "dash.earnings": "Monthly earnings",
    "dash.rating": "Average rating",
    "dash.profileViews": "Profile views",

    "rating.title": "How your AI score is calculated",
    "rating.subtitle": "Full transparency — Skyff's algorithm evaluates 5 dimensions",
    "rating.reviews": "Client reviews",
    "rating.profile": "Profile quality",
    "rating.response": "Responsiveness",
    "rating.experience": "Experience",
    "rating.complaints": "Complaint handling",

    "footer.tagline": "The intelligent marketplace for professional services.",
    "results.empty.title": "No results found for",
    "results.empty.subtitle": "Try adjusting your search terms or help us grow our community.",
    "contribute.title": "Know a great expert?",
    "contribute.subtitle": "Leave their phone number and we'll invite them to join Skyff.io",
    "contribute.placeholder": "Phone number (e.g. +373...)",
    "contribute.submit": "Submit",
    "contribute.sending": "Sending...",
    "contribute.success.title": "Thank you for contributing!",
    "contribute.success.subtitle": "Our team will reach out to the expert and verify them shortly. Together we make Skyff better.",
    "contribute.success.another": "Submit another expert",
  },
};

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ro");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("skyff.lang") as Lang | null;
    if (saved && ["ro", "ru", "en"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("skyff.lang", l);
  };

  const t = (key: string) => dictionaries[lang][key] ?? key;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
