import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Search,
  CheckCircle2,
  Clock,
  Star,
  ChevronRight,
  MapPin,
  FileText,
  Car,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { providers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function HistoryPage() {
  const { lang } = useI18n();

  const historyItems = [
    {
      id: "1",
      provider: providers[0],
      service: "Diagnostic complet motor",
      date: "12 Mai 2024, 10:30",
      status: "completed",
      price: "1200 MDL",
      rating: 5,
      details: {
        location: "Strada Ismail 88, Chișinău",
        duration: "1h 30m",
        notes: "Problema a fost identificată la sistemul de injecție. S-a recomandat curățarea injectoarelor.",
        vehicle: "BMW X5, 2018",
        transactionId: "#SK-9482-101",
      }
    },
    {
      id: "2",
      provider: providers[1],
      service: "Albire profesională cu laser",
      date: "05 Mai 2024, 14:00",
      status: "completed",
      price: "2400 MDL",
      rating: 4,
      details: {
        location: "Strada Pușkin 12, Chișinău",
        duration: "1h",
        notes: "Procedură efectuată fără sensibilitate. S-a aplicat gel de protecție.",
        transactionId: "#SK-9482-102",
      }
    },
    {
      id: "3",
      provider: providers[2],
      service: "Reparație panou electric",
      date: "28 Aprilie 2024, 09:00",
      status: "completed",
      price: "850 MDL",
      rating: 5,
      details: {
        location: "Bulevardul Dacia 44, Chișinău",
        duration: "45m",
        notes: "S-au înlocuit siguranțele vechi cu modele noi automate. Sistemul este acum sigur.",
        transactionId: "#SK-9482-103",
      }
    },
    {
      id: "4",
      provider: providers[3],
      service: "Consultanță startup",
      date: "15 Aprilie 2024, 16:30",
      status: "cancelled",
      price: "0 MDL",
      rating: null,
      details: {
        location: "Online (Google Meet)",
        reason: "Clientul a solicitat reprogramarea pentru o dată ulterioară.",
        transactionId: "#SK-9482-104",
      }
    },
  ];

  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-10 md:px-6 md:py-14">
      <div className="mb-8 flex flex-col gap-2">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <History className="h-3 w-3" />
          Istoric Activitate
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Comenzile mele
        </h1>
        <p className="text-muted-foreground">
          Gestionează istoricul interacțiunilor tale cu specialiștii de pe platformă.
        </p>
      </div>

      <div className="grid gap-4">
        {historyItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-5 transition-spring hover:shadow-elevated"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              {/* Provider Info */}
              <div className="flex flex-1 items-center gap-4">
                <Avatar className="h-14 w-14 rounded-2xl border-2 border-background shadow-soft transition-transform group-hover:scale-105">
                  <AvatarImage src={item.provider.avatar} alt={item.provider.name} />
                  <AvatarFallback>{item.provider.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.provider.name}</h3>
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                      {item.provider.category[lang]}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground/90 mt-0.5">{item.service}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex flex-col items-end gap-3 md:min-w-[140px]">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{item.price}</span>
                  {item.status === "completed" ? (
                    <Badge className="bg-success/15 text-success hover:bg-success/20 border-none px-2 py-0.5">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Finalizat
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-destructive/15 text-destructive hover:bg-destructive/20 border-none px-2 py-0.5">
                      Anulat
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {item.rating ? (
                    <div className="flex items-center gap-0.5 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < item.rating! ? "fill-warning text-warning" : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  ) : item.status === "completed" ? (
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-accent hover:text-accent">
                      Lasă un review
                    </Button>
                  ) : null}
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    className={`rounded-xl transition-transform ${expandedId === item.id ? "rotate-90 bg-accent text-accent-foreground" : ""}`}
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="mt-5 grid gap-6 border-t border-border/50 pt-5 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Locație</p>
                          <p className="text-sm font-medium">{item.details.location}</p>
                        </div>
                      </div>
                      
                      {item.details.duration && (
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Durată</p>
                            <p className="text-sm font-medium">{item.details.duration}</p>
                          </div>
                        </div>
                      )}

                      {item.details.vehicle && (
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <Car className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Vehicul</p>
                            <p className="text-sm font-medium">{item.details.vehicle}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Detalii Activitate</p>
                          <p className="text-sm text-foreground/80 leading-relaxed mt-1">
                            {item.details.notes || item.details.reason}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-secondary/30 p-3 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">ID Tranzacție</span>
                        <span className="text-xs font-mono font-medium">{item.details.transactionId}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 flex justify-end gap-3">
                    <Button variant="ghost" size="sm" className="rounded-xl text-xs">
                      Descarcă Factura
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl text-xs border-border/50">
                      Re-programează
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {historyItems.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary mb-4">
            <Search className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <h2 className="text-xl font-semibold">Nicio comandă găsită</h2>
          <p className="mt-2 text-muted-foreground">
            Începe prin a căuta un specialist potrivit nevoilor tale.
          </p>
          <Button variant="accent" className="mt-6">
            Explorează specialiști
          </Button>
        </div>
      )}
    </div>
  );
}
