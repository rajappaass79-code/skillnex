"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (!profile) {
      router.push("/complete-profile");
    }
  }, [user, profile, loading, router]);

  if (loading || !user || !profile) {
    return <div className="p-8" data-testid="text-loading">Loading...</div>;
  }

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1
              className="text-2xl font-bold tracking-tight"
              data-testid="text-dashboard-title"
            >
              Welcome, {profile.full_name}
            </h1>
            <p
              className="text-muted-foreground mt-1"
              data-testid="text-user-email"
            >
              {user.email}
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            Logout
          </Button>
        </div>
        <div className="rounded-xl border bg-card border-card-border p-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.institution && (
              <div>
                <p className="text-sm text-muted-foreground">Institution</p>
                <p data-testid="text-institution">{profile.institution}</p>
              </div>
            )}
            {profile.subject && (
              <div>
                <p className="text-sm text-muted-foreground">Subject</p>
                <p data-testid="text-subject">{profile.subject}</p>
              </div>
            )}
            {profile.experience_years > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Experience</p>
                <p data-testid="text-experience">
                  {profile.experience_years} year{profile.experience_years !== 1 ? "s" : ""}
                </p>
              </div>
            )}
            {profile.location && (
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p data-testid="text-location">{profile.location}</p>
              </div>
            )}
          </div>
          {profile.bio && (
            <div>
              <p className="text-sm text-muted-foreground">Bio</p>
              <p data-testid="text-bio">{profile.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
