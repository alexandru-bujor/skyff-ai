import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

type Scores = {
  reviews: number;
  profile: number;
  response: number;
  experience: number;
  complaints: number;
};

const WEIGHTS = {
  reviews: 30,
  profile: 20,
  response: 20,
  experience: 10,
  complaints: 20,
};

export function AIScoreBreakdown({ scores, total }: { scores: Scores; total: number }) {
  const { t } = useI18n();

  const items = [
    { key: "reviews" as const, label: t("rating.reviews") },
    { key: "profile" as const, label: t("rating.profile") },
    { key: "response" as const, label: t("rating.response") },
    { key: "experience" as const, label: t("rating.experience") },
    { key: "complaints" as const, label: t("rating.complaints") },
  ];

  // Circular progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dash = (total / 100) * circumference;

  return (
    <div className="grid gap-8 rounded-3xl border border-border/60 bg-card p-6 shadow-card md:grid-cols-[200px_1fr] md:p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-44 w-44">
          <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="var(--muted)"
              strokeWidth="12"
            />
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="url(#aiGrad)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - dash }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="aiGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.62 0.19 258)" />
                <stop offset="100%" stopColor="oklch(0.65 0.2 295)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold tracking-tight">{total}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              AI Score
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {t("profile.aiScore")}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{t("rating.title")}</h3>
          <p className="text-sm text-muted-foreground">{t("rating.subtitle")}</p>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => {
            const value = scores[item.key];
            const max = WEIGHTS[item.key];
            const pct = (value / max) * 100;
            return (
              <div key={item.key}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{value}</span> / {max}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-accent"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
