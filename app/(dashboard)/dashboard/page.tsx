"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="p-8" data-testid="text-loading">Loading...</div>;
  }

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen p-8">
      <h1
        className="text-2xl font-bold mb-4"
        data-testid="text-dashboard-title"
      >
        Welcome to SkillNex
      </h1>
      <p className="mb-4" data-testid="text-user-email">
        Logged in as: {user.email}
      </p>
      <Button
        variant="destructive"
        onClick={handleLogout}
        data-testid="button-logout"
      >
        Logout
      </Button>
    </div>
  );
}
