export function TermsPage() {
  return (
    <div className="container max-w-3xl py-12 prose prose-slate dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
      
      <p className="text-muted-foreground mb-8">Last updated: May 4, 2026</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using Skyff.io, you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
          <p className="text-muted-foreground">
            Skyff.io provides an AI-powered marketplace connecting clients with service providers across various domains 
            including IT, Creative, Auto, and Health. We reserve the right to modify or discontinue, temporarily or 
            permanently, the Service with or without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. User Conduct</h2>
          <p className="text-muted-foreground">
            You agree to use the Service only for lawful purposes. You are prohibited from violating or attempting to 
            violate the security of the Service, including accessing data not intended for you or logging into a server 
            or account which you are not authorized to access.
          </p>
        </section>
      </div>
    </div>
  );
}
