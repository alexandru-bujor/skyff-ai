export function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-12 prose prose-slate dark:prose-invert">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      
      <p className="text-muted-foreground mb-8">Last updated: May 4, 2026</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-muted-foreground">
            We collect information that you provide directly to us, such as when you create or modify your account, 
            request on-demand services, contact customer support, or otherwise communicate with us. This information 
            may include: name, email, phone number, postal address, profile picture, payment method, and other 
            information you choose to provide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. How We Use Information</h2>
          <p className="text-muted-foreground">
            We may use the information we collect about you to provide, maintain, and improve our Services, such as 
            to facilitate payments, send receipts, provide products and services you request, develop new features, 
            provide customer support, and authenticate users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to maintain the safety of your personal 
            information. However, please be aware that no method of transmission over the internet, or method of 
            electronic storage is 100% secure and we cannot guarantee its absolute security.
          </p>
        </section>
      </div>
    </div>
  );
}
