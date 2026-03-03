import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold" data-testid="text-404">
          404
        </h1>
        <p
          className="text-muted-foreground text-lg"
          data-testid="text-not-found"
        >
          Page not found
        </p>
        <Link
          href="/"
          className="inline-block text-sm underline underline-offset-4"
          data-testid="link-home"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
