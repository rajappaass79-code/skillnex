"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground" data-testid="text-loading">
          Loading...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            data-testid="text-dashboard-title"
          >
            Dashboard
          </h1>
          <p
            className="text-muted-foreground mt-1"
            data-testid="text-user-email"
          >
            {user.email}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleSignOut}
          data-testid="button-sign-out"
        >
          Sign Out
        </Button>
      </div>
      <div className="rounded-xl border bg-card border-card-border p-6">
        <p className="text-muted-foreground" data-testid="text-welcome">
          Welcome to SkillNex. Start building your skills here.
        </p>
      </div>
    </div>
  );
}
