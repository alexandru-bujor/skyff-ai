import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  Star,
  Eye,
  TrendingUp,
  Clock,
  Check,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { providers } from "@/lib/data";
import { AIScoreBreakdown } from "@/components/providers/AIScoreBreakdown";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const { t, lang } = useI18n();
  const me = providers[0];

  const stats = [
    {
      icon: Calendar,
      label: t("dash.totalBookings"),
      value: "182",
      trend: "+12%",
      gradient: "from-accent to-chart-4",
    },
    {
      icon: DollarSign,
      label: t("dash.earnings"),
      value: "48 200 MDL",
      trend: "+8.4%",
      gradient: "from-success to-chart-2",
    },
    {
      icon: Star,
      label: t("dash.rating"),
      value: "4.9",
      trend: "+0.1",
      gradient: "from-warning to-chart-5",
    },
    {
      icon: Eye,
      label: t("dash.profileViews"),
      value: "2 314",
      trend: "+23%",
      gradient: "from-chart-4 to-accent",
    },
  ];

  const upcomingBookings = [
    { client: "Vlad Cernei", service: "Diagnostic complet", date: "Mâine, 09:30", status: "confirmed" },
    { client: "Ana Munteanu", service: "Reparație motor", date: "Mâine, 14:00", status: "confirmed" },
    { client: "Sergiu Bivol", service: "Consultație", date: "Vineri, 10:00", status: "pending" },
    { client: "Maria Roșca", service: "Service complet", date: "Sâmbătă, 11:30", status: "confirmed" },
  ];

  const reviews = [
    { name: "Vlad C.", rating: 5, text: "Excelent, recomand!", time: "acum 2 zile" },
    { name: "Ana M.", rating: 5, text: "Foarte profesionist.", time: "acum 5 zile" },
    { name: "Sergiu B.", rating: 4, text: "Bun, voi reveni.", time: "acum 1 săptămână" },
  ];

  return (
    <div className="container mx-auto px-4 py-10 md:px-6 md:py-14">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={me.avatar}
            alt={me.name}
            className="h-14 w-14 rounded-2xl object-cover ring-2 ring-border"
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t("dash.title")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {me.name} · {me.title[lang]}
            </p>
          </div>
        </div>
        <Button variant="hero">{t("dash.settings")}</Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-5 shadow-card transition-spring hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div
              className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${s.gradient} opacity-15 blur-2xl transition-opacity group-hover:opacity-30`}
            />
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground">
              <s.icon className="h-5 w-5 text-accent" />
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
            <div className="mt-1 text-2xl font-bold tracking-tight">{s.value}</div>
            <div className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-success">
              <TrendingUp className="h-3 w-3" />
              {s.trend}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bookings */}
        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t("dash.bookings")}</h2>
            <Button variant="ghost" size="sm">
              Vezi toate
            </Button>
          </div>
          <div className="space-y-2">
            {upcomingBookings.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/40 p-4 transition-smooth hover:bg-secondary"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      b.status === "confirmed"
                        ? "bg-success/10 text-success"
                        : "bg-warning/15 text-warning"
                    }`}
                  >
                    {b.status === "confirmed" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{b.client}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {b.service}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm font-medium">{b.date}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
          <h2 className="mb-4 text-lg font-semibold">{t("dash.reviews")}</h2>
          <div className="space-y-3">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-2xl bg-secondary/40 p-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium">{r.name}</span>
                  <span className="text-xs text-muted-foreground">{r.time}</span>
                </div>
                <div className="mb-1.5 flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-3 w-3 ${
                        j < r.rating
                          ? "fill-warning text-warning"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-foreground/80">{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* AI score */}
      <div className="mt-6">
        <AIScoreBreakdown scores={me.scores} total={me.aiScore} />
      </div>
    </div>
  );
}
