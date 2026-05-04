import { useI18n } from "@/lib/i18n";
import { Sparkles, HelpCircle, BookOpen, MessageCircle } from "lucide-react";

export function HelpPage() {
  const { t } = useI18n();

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
        <p className="text-lg text-muted-foreground">
          How can we help you today? Find answers to common questions and guides to use Skyff.io effectively.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <BookOpen className="mb-4 h-8 w-8 text-accent" />
          <h3 className="mb-2 text-xl font-semibold">Getting Started</h3>
          <p className="text-muted-foreground">Learn the basics of Skyff.io and how to set up your account.</p>
        </div>
        
        <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <HelpCircle className="mb-4 h-8 w-8 text-accent" />
          <h3 className="mb-2 text-xl font-semibold">FAQs</h3>
          <p className="text-muted-foreground">Find quick answers to the most frequently asked questions.</p>
        </div>
        
        <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <MessageCircle className="mb-4 h-8 w-8 text-accent" />
          <h3 className="mb-2 text-xl font-semibold">Contact Support</h3>
          <p className="text-muted-foreground">Need more help? Our support team is here for you 24/7.</p>
        </div>
      </div>
    </div>
  );
}
