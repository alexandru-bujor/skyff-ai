import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, Star, Clock, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import type { Provider } from "@/lib/data";

export function ProviderCard({ provider, index = 0 }: { provider: Provider; index?: number }) {
  const { t, lang } = useI18n();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-card transition-smooth hover:border-accent/40 hover:shadow-elevated"
    >
      <div className="absolute right-4 top-4 z-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-accent backdrop-blur-md">
          <Sparkles className="h-3 w-3" />
          AI · {provider.aiScore}
        </div>
      </div>

      <div className="flex gap-4 p-5">
        <div className="relative shrink-0">
          <img
            src={provider.avatar}
            alt={provider.name}
            loading="lazy"
            className="h-16 w-16 rounded-2xl object-cover ring-1 ring-border"
          />
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground ring-2 ring-card">
            <BadgeCheck className="h-3 w-3" />
          </div>
        </div>
        <div className="min-w-0 flex-1 pr-12">
          <h3 className="truncate text-base font-semibold">{provider.name}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {provider.title[lang]}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span className="font-semibold text-foreground">{provider.rating}</span>
              <span>({provider.reviewCount})</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {provider.city}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-3 text-sm text-foreground/80 line-clamp-2">
        {provider.bio[lang]}
      </div>

      <div className="flex flex-wrap gap-1.5 px-5 pb-4">
        {provider.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border/60 bg-secondary/30 px-5 py-3 text-xs">
        <div>
          <div className="text-muted-foreground">{t("results.from")}</div>
          <div className="font-semibold text-foreground">
            {provider.priceFrom} {provider.currency}
          </div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground">{t("results.next")}</div>
          <div className="inline-flex items-center gap-1 font-medium text-success">
            <Clock className="h-3 w-3" />
            {provider.nextSlot}
          </div>
        </div>
      </div>

      <div className="flex gap-2 p-3">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link to={`/provider/${provider.id}`}>
            {t("results.viewProfile")}
          </Link>
        </Button>
        <Button asChild variant="hero" size="sm" className="flex-1">
          <Link to={`/book/${provider.id}`}>
            {t("results.book")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}
