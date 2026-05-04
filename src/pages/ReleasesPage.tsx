export function ReleasesPage() {
  return (
    <div className="container max-w-3xl py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Release Notes</h1>
        <p className="text-lg text-muted-foreground">
          Stay up to date with the latest features, improvements, and bug fixes.
        </p>
      </div>

      <div className="space-y-8">
        <div className="relative pl-8 before:absolute before:bottom-0 before:left-[11px] before:top-2 before:w-[2px] before:bg-border">
          <div className="absolute left-0 top-2 h-6 w-6 rounded-full border-4 border-background bg-accent shadow-sm" />
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">v1.2.0 - Platform Update</h2>
              <span className="text-sm text-muted-foreground">May 2026</span>
            </div>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>Added unified help menu and resources section.</li>
              <li>Improved mobile navigation and responsive design.</li>
              <li>Enhanced performance for the provider search algorithm.</li>
            </ul>
          </div>
        </div>

        <div className="relative pl-8 before:absolute before:bottom-0 before:left-[11px] before:top-2 before:w-[2px] before:bg-border">
          <div className="absolute left-0 top-2 h-6 w-6 rounded-full border-4 border-background bg-muted-foreground shadow-sm" />
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">v1.1.0 - Authentication & History</h2>
              <span className="text-sm text-muted-foreground">April 2026</span>
            </div>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>Introduced user authentication flow.</li>
              <li>Added client history page to track past bookings.</li>
              <li>Updated sidebar layout and theming.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
