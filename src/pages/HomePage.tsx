import { useState, useEffect } from "react";
import { ChatHero } from "@/components/home/ChatHero";
import { ProviderCard } from "@/components/providers/ProviderCard";
import { providers } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
                <Link to="/results">
                  Vezi toți experții
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {providers.slice(0, 3).map((p, i) => (
                <ProviderCard key={p.id} provider={p} index={i} />
              ))}
            </div>
            
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
