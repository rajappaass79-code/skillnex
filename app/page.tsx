"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center space-y-6">
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
        <div>
          <Button asChild>
            <Link href="/login" data-testid="link-get-started">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
