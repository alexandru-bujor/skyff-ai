import { useI18n } from "@/lib/i18n";
import { Sparkles, HelpCircle, BookOpen, MessageCircle } from "lucide-react";

export function HelpPage() {
  const { t } = useI18n();

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{t("help.title")}</h1>
        <p className="text-lg text-muted-foreground">
          {t("help.subtitle")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <BookOpen className="mb-4 h-8 w-8 text-accent" />
          <h3 className="mb-2 text-xl font-semibold">{t("help.gettingStarted.title")}</h3>
          <p className="text-muted-foreground">{t("help.gettingStarted.desc")}</p>
        </div>
        
        <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <HelpCircle className="mb-4 h-8 w-8 text-accent" />
          <h3 className="mb-2 text-xl font-semibold">{t("help.faqs.title")}</h3>
          <p className="text-muted-foreground">{t("help.faqs.desc")}</p>
        </div>
        
        <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <MessageCircle className="mb-4 h-8 w-8 text-accent" />
          <h3 className="mb-2 text-xl font-semibold">{t("help.support.title")}</h3>
          <p className="text-muted-foreground">{t("help.support.desc")}</p>
        </div>
      </div>
    </div>
  );
}
