export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h1
          className="text-4xl font-bold tracking-tight"
          data-testid="text-heading"
        >
          SkillNex
        </h1>
        <p
          className="text-muted-foreground text-lg max-w-md"
          data-testid="text-description"
        >
          A modern SaaS platform for skill development and tracking.
        </p>
        <p className="text-sm text-muted-foreground">
          Get started by editing{" "}
          <code className="font-mono bg-muted px-2 py-1 rounded-md text-sm">
            app/page.tsx
          </code>
        </p>
      </div>
    </main>
  );
}
