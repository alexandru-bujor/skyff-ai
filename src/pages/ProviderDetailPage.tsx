import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Star,
  MapPin,
  Calendar,
  ArrowLeft,
  Clock,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { getProvider } from "@/lib/data";
import { AIScoreBreakdown } from "@/components/providers/AIScoreBreakdown";

const portfolioImages = [
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487035839592-bf4ba174d4d2?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80&auto=format&fit=crop",
];

const reviews = [
  { name: "Vlad C.", rating: 5, text: "Profesionist excelent, totul rezolvat rapid și calitativ." },
  { name: "Ana M.", rating: 5, text: "Comunicare clară, preț corect. Recomand cu încredere!" },
  { name: "Sergiu B.", rating: 4, text: "Serviciu bun, va trebui să mai revin pentru detalii." },
];

const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
const days = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"];

export function ProviderDetailPage() {
  const { id } = useParams();
  const provider = getProvider(id!);
  const { t, lang } = useI18n();

  if (!provider) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Provider not found</h1>
        <Button asChild variant="hero" className="mt-6">
          <Link to="/results">Back to results</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Cover */}
      <div className="relative h-56 w-full overflow-hidden md:h-72">
        <img
          src={provider.cover}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="container mx-auto px-4 md:px-6">
          <Link
            to="/results"
            className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-xl bg-card/70 px-3 py-1.5 text-sm backdrop-blur-md transition-smooth hover:bg-card md:left-6"
          >
            <ArrowLeft className="h-4 w-4" /> {t("nav.providers")}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="-mt-16 grid gap-6 rounded-3xl border border-border/60 bg-card p-6 shadow-elevated md:-mt-20 md:grid-cols-[auto_1fr_auto] md:p-8"
        >
          <div className="relative">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="h-24 w-24 rounded-3xl object-cover ring-4 ring-card md:h-28 md:w-28"
            />
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground ring-2 ring-card">
              <BadgeCheck className="h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-1 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
              <BadgeCheck className="h-3.5 w-3.5" />
              {t("profile.verified")}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {provider.name}
            </h1>
            <p className="text-muted-foreground">{provider.title[lang]}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-semibold">{provider.rating}</span>
                <span className="text-muted-foreground">
                  · {provider.reviewCount} {t("profile.reviews")}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {provider.city}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 self-center md:items-end">
            <Button asChild variant="hero" size="lg">
              <Link to={`/book/${provider.id}`}>
                <Calendar className="h-4 w-4" />
                {t("profile.book")}
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* About */}
            <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
              <h2 className="mb-3 text-lg font-semibold">{t("profile.about")}</h2>
              <p className="text-foreground/80">{provider.bio[lang]}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {provider.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Portfolio */}
            <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
              <h2 className="mb-4 text-lg font-semibold">{t("profile.portfolio")}</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {portfolioImages.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group aspect-square overflow-hidden rounded-2xl"
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
              <h2 className="mb-4 text-lg font-semibold">{t("profile.services")}</h2>
              <div className="space-y-2">
                {[
                  { name: "Consultație inițială", price: provider.priceFrom },
                  { name: "Diagnostic complet", price: Math.round(provider.priceFrom * 1.6) },
                  { name: "Intervenție standard", price: Math.round(provider.priceFrom * 2.4) },
                  { name: "Pachet premium", price: Math.round(provider.priceFrom * 4) },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-3 transition-smooth hover:bg-secondary"
                  >
                    <span className="text-sm font-medium">{s.name}</span>
                    <span className="text-sm font-semibold text-accent">
                      {s.price} {provider.currency}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
              <h2 className="mb-4 text-lg font-semibold">
                {provider.reviewCount} {t("profile.reviews")}
              </h2>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="rounded-2xl bg-secondary/40 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="font-medium">{r.name}</div>
                      <div className="inline-flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`h-3.5 w-3.5 ${
                              j < r.rating
                                ? "fill-warning text-warning"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80">{r.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {/* Availability */}
            <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
              <h2 className="mb-4 text-lg font-semibold">{t("profile.availability")}</h2>
              <div className="mb-4 grid grid-cols-7 gap-1.5">
                {days.map((d, i) => (
                  <button
                    key={d}
                    className={`flex flex-col items-center rounded-xl border border-border/60 px-1 py-2 text-xs transition-smooth hover:border-accent hover:bg-accent/5 ${
                      i === 1 ? "border-accent bg-accent/10 text-accent" : ""
                    }`}
                  >
                    <span className="text-muted-foreground">{d}</span>
                    <span className="mt-0.5 text-base font-semibold text-foreground">
                      {15 + i}
                    </span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((s, i) => (
                  <button
                    key={s}
                    className={`inline-flex items-center justify-center gap-1 rounded-xl border border-border/60 px-2 py-2 text-xs font-medium transition-smooth hover:border-accent hover:bg-accent/5 ${
                      i === 2 ? "border-accent bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    {s}
                  </button>
                ))}
              </div>
              <Button asChild variant="hero" className="mt-4 w-full">
                <Link to={`/book/${provider.id}`}>
                  {t("profile.book")}
                </Link>
              </Button>
            </section>

            {/* AI Score compact */}
            <AIScoreBreakdown scores={provider.scores} total={provider.aiScore} />
          </div>
        </div>
      </div>
    </div>
  );
}
