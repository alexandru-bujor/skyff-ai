import { useState, useEffect } from "react";
import { ChatHero } from "@/components/home/ChatHero";
import { ProviderCard } from "@/components/providers/ProviderCard";
import { providers } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function HomePage() {
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useI18n();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setShowResults(false);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      // Scroll to results
      setTimeout(() => {
        document.getElementById("results-anchor")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 2500);
  };

  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setPhone("");
    }, 1200);
  };

  const filteredProviders = providers.filter((p) => {
    if (!searchQuery) return true;
    const cleanQuery = searchQuery.toLowerCase().trim();
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
    <div className="flex flex-col">
      <ChatHero onSearch={handleSearch} isSearching={isSearching} />
      
      <AnimatePresence>
        {showResults && (
          <motion.section
            id="results-anchor"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="container mx-auto px-4 py-20 md:px-6"
          >
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  Recomandări AI
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Specialiști recomandați pentru "{searchQuery}"
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Am selectat cei mai potriviți experți pe baza solicitării tale.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-xl">
                <Link to={`/results?q=${encodeURIComponent(searchQuery)}`}>
                  Vezi toți experții
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {filteredProviders.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProviders.slice(0, 6).map((p, i) => (
                  <ProviderCard key={p.id} provider={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center gap-8">
                <div className="text-center text-muted-foreground flex flex-col gap-2">
                  <span className="text-xl font-semibold text-foreground">{t("results.empty.title")} "{searchQuery}"</span>
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
            )}
            
            <div className="mt-12 text-center">
               <p className="text-sm text-muted-foreground">
                 Nu ai găsit ce căutai? Încearcă să fii mai specific în chat-ul de mai sus.
               </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
