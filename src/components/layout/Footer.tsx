import { Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/50 bg-secondary/30">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-accent">
            <Sparkles className="h-3.5 w-3.5 text-accent-foreground" />
          </div>
          <span className="text-sm font-semibold">
            Skyff<span className="text-accent">.io</span>
          </span>
          <span className="text-sm text-muted-foreground">— {t("footer.tagline")}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Skyff.io · Chișinău, Moldova
        </p>
      </div>
    </footer>
  );
}
