import { ArrowUp, Sparkles, Stethoscope, Wrench, Scale, Zap, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

const SUGG_ICONS = [Zap, Stethoscope, Scale, Wrench];

interface ChatHeroProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export function ChatHero({ onSearch, isSearching }: ChatHeroProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Analizez solicitarea ta...",
    "Caut experți verificați în apropiere...",
    "Verific disponibilitatea în timp real...",
    "Generăm recomandările personalizate...",
  ];

  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % steps.length);
      }, 600);
      return () => clearInterval(interval);
    } else {
      setLoadingStep(0);
    }
  }, [isSearching]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q && !isSearching) {
      onSearch(q);
    }
  };

  const pickSuggestion = (s: string) => {
    setQuery(s);
    if (!isSearching) {
      onSearch(s);
    }
  };

  const suggestions = [
    t("sugg.1"),
    t("sugg.2"),
    t("sugg.3"),
    t("sugg.4"),
  ];

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background gradients & shapes */}
      <div className="bg-hero-gradient pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-float-slow absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="animate-pulse-glow absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-chart-4/15 blur-3xl" />
        <div
          className="animate-float-slow absolute bottom-0 left-10 h-64 w-64 rounded-full bg-chart-2/10 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-20 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-1.5 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium tracking-wide">{t("hero.badge")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
          className="max-w-4xl text-center text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t("hero.title.1")}{" "}
          <span className="text-gradient-accent">{t("hero.title.2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-2xl text-center text-base text-muted-foreground sm:text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          onSubmit={submit}
          className="mt-10 w-full max-w-3xl"
        >
          <div className="group glass relative flex items-end gap-2 rounded-3xl p-2.5 shadow-elevated transition-spring focus-within:shadow-glow">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-accent opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-30" />
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isSearching}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(e as unknown as FormEvent);
                }
              }}
              placeholder={t("hero.placeholder")}
              rows={1}
              className="min-h-[52px] flex-1 resize-none bg-transparent px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              aria-label={t("hero.cta")}
              className="flex h-12 shrink-0 items-center gap-2 rounded-2xl bg-gradient-accent px-5 font-medium text-accent-foreground shadow-glow transition-spring hover:scale-[1.03] hover:shadow-elevated disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSearching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline">{t("hero.cta")}</span>
                  <ArrowUp className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </motion.form>

        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{steps[loadingStep]}</span>
              </div>
              <div className="h-1 w-48 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="h-full w-1/2 bg-gradient-accent"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 w-full max-w-3xl"
            >
              <p className="mb-3 text-center text-xs uppercase tracking-widest text-muted-foreground">
                {t("hero.suggestions")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((s, i) => {
                  const Icon = SUGG_ICONS[i] ?? Sparkles;
                  return (
                    <button
                      key={s}
                      onClick={() => pickSuggestion(s)}
                      className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-2 text-sm text-foreground/80 backdrop-blur-md transition-spring hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card hover:text-foreground hover:shadow-soft"
                    >
                      <Icon className="h-3.5 w-3.5 text-accent transition-transform group-hover:scale-110" />
                      {s}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
