import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Check, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { getProvider } from "@/lib/data";

const days = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"];
const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];

export function BookingPage() {
  const { id } = useParams();
  const provider = getProvider(id!);
  const { t, lang } = useI18n();
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>("12:00");
  const [confirmed, setConfirmed] = useState(false);

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
    <div className="container mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
      <Link
        to={`/provider/${provider.id}`}
        className="mb-6 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {provider.name}
      </Link>

      <h1 className="mb-2 text-3xl font-semibold tracking-tight md:text-4xl">
        {t("book.title")}
      </h1>
      <p className="mb-8 text-muted-foreground">
        {t("book.with")} <span className="font-medium text-foreground">{provider.name}</span>
      </p>

      <AnimatePresence mode="wait">
        {confirmed ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-3xl border border-success/30 bg-card p-10 text-center shadow-elevated"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 ring-4 ring-success/20">
              <Check className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-semibold">Rezervare confirmată!</h2>
            <p className="mt-2 text-muted-foreground">
              {provider.name} · {days[selectedDay]} {15 + selectedDay} · {selectedSlot}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row">
              <Button asChild variant="outline">
                <Link to="/results">{t("nav.providers")}</Link>
              </Button>
              <Button asChild variant="hero">
                <Link to="/history">{t("nav.dashboard")}</Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 lg:grid-cols-[1fr_360px]"
          >
            <div className="space-y-6">
              <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-semibold">{t("book.date")}</h2>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {days.map((d, i) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDay(i)}
                      className={`flex flex-col items-center rounded-2xl border border-border/60 px-1 py-3 transition-spring hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 ${
                        i === selectedDay
                          ? "border-accent bg-accent text-accent-foreground hover:bg-accent"
                          : ""
                      }`}
                    >
                      <span className="text-[10px] uppercase opacity-70">{d}</span>
                      <span className="mt-1 text-lg font-semibold">{15 + i}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
                <div className="mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-semibold">{t("book.time")}</h2>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      className={`rounded-xl border border-border/60 py-3 text-sm font-medium transition-spring hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 ${
                        s === selectedSlot
                          ? "border-accent bg-accent text-accent-foreground hover:bg-accent"
                          : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Summary */}
            <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6 shadow-elevated lg:sticky lg:top-24">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {t("book.summary")}
              </h3>
              <div className="mb-4 flex items-center gap-3 border-b border-border/60 pb-4">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="h-12 w-12 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate font-semibold">{provider.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {provider.title[lang]}
                  </div>
                </div>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{t("book.date")}</dt>
                  <dd className="font-medium">
                    {days[selectedDay]} {15 + selectedDay}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{t("book.time")}</dt>
                  <dd className="font-medium">{selectedSlot ?? "—"}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    Locație
                  </dt>
                  <dd className="text-right font-medium">{provider.city}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-border/60 pt-3">
                  <dt className="font-semibold">Total</dt>
                  <dd className="text-lg font-bold text-accent">
                    {provider.priceFrom} {provider.currency}
                  </dd>
                </div>
              </dl>
              <Button
                variant="hero"
                size="lg"
                className="mt-6 w-full"
                disabled={!selectedSlot}
                onClick={() => setConfirmed(true)}
              >
                {t("book.confirm")}
              </Button>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
