import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Sparkles, ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { providers } from "@/lib/data";
import { ProviderCard } from "@/components/providers/ProviderCard";
import { CardSkeleton } from "@/components/providers/CardSkeleton";
import { Button } from "@/components/ui/button";

export function ResultsPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const { t } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuery(q ?? "");
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [q]);

  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleContribute = (e: FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setPhone("");
    }, 1200);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = query.trim();
    if (next) {
      navigate(`/results?q=${encodeURIComponent(next)}`);
    } else {
      navigate("/results");
    }
  };

  const filteredProviders = providers.filter((p) => {
    if (!q) return true;
    const cleanQuery = q.toLowerCase().trim();
    const stopWords = ["am", "nevoie", "de", "un", "o", "vreau", "caut", "i", "need", "a", "an", "the", "want", "find", "some"];
    
    const words = cleanQuery.split(/\s+/).filter(word => word.length > 1 && !stopWords.includes(word));
    const searchTerms = words.length > 0 ? words : [cleanQuery];
    
    return searchTerms.some(term => 
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.city.toLowerCase().includes(term) ||
      p.tags.some(tag => tag.toLowerCase().includes(term)) ||
      p.title.ro.toLowerCase().includes(term) ||
      p.title.ru.toLowerCase().includes(term) ||
      p.title.en.toLowerCase().includes(term) ||
      p.bio.ro.toLowerCase().includes(term) ||
      p.bio.ru.toLowerCase().includes(term) ||
      p.bio.en.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container mx-auto px-4 py-10 md:px-6 md:py-14">
      <div className="mb-6 flex items-center gap-3 text-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Skyff
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex flex-col gap-2"
      >
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <Sparkles className="h-3 w-3" />
          {t("results.aiTag")}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("results.title")}
        </h1>
        <p className="text-muted-foreground">{t("results.subtitle")}</p>
      </motion.div>

      <form onSubmit={submit} className="mb-10 max-w-3xl">
        <div className="glass flex items-center gap-2 rounded-2xl p-2 shadow-soft transition-spring focus-within:shadow-glow">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("hero.placeholder")}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="flex h-10 items-center gap-1.5 rounded-xl bg-gradient-accent px-4 text-sm font-medium text-accent-foreground shadow-soft transition-spring hover:-translate-y-0.5 hover:shadow-glow"
          >
            <span className="hidden sm:inline">{t("hero.cta")}</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          : filteredProviders.length > 0 
            ? filteredProviders.map((p, i) => <ProviderCard key={p.id} provider={p} index={i} />)
            : (
                <div className="col-span-full py-12 flex flex-col items-center gap-8">
                  <div className="text-center text-muted-foreground flex flex-col gap-2">
                    <span className="text-xl font-semibold text-foreground">{t("results.empty.title")} "{q}"</span>
                    <span className="text-sm">{t("results.empty.subtitle")}</span>
                  </div>

                  {showSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass max-w-sm rounded-3xl p-8 text-center shadow-glow border-accent/20"
                    >
                      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold">{t("contribute.success.title")}</h3>
                      <p className="text-sm text-muted-foreground">{t("contribute.success.subtitle")}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-6 text-accent hover:text-accent hover:bg-accent/10" 
                        onClick={() => setShowSuccess(false)}
                      >
                        {t("contribute.success.another")}
                      </Button>
                    </motion.div>
                  ) : (
                    <form 
                      onSubmit={handleContribute} 
                      className="glass w-full max-w-md rounded-3xl p-8 shadow-soft border-border/40 transition-all hover:shadow-glow"
                    >
                      <div className="mb-6 text-center">
                        <h3 className="text-lg font-bold">{t("contribute.title")}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{t("contribute.subtitle")}</p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input 
                          type="tel"
                          placeholder={t("contribute.placeholder")}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="flex-1 rounded-2xl border border-border/50 bg-background/50 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                          required
                        />
                        <Button type="submit" disabled={isSubmitting} className="rounded-2xl px-6 py-6 shadow-glow transition-spring hover:scale-[1.02] active:scale-[0.98]">
                          {isSubmitting ? t("contribute.sending") : t("contribute.submit")}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )
        }
      </div>
    </div>
  );
}
